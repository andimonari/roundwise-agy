import WebSocket from "ws";
import {
  InterviewSnapshot,
  InterviewState,
  ServerFrame,
  TimingConfig,
} from "../types.js";
import { inMemoryDb } from "../db.js";
import { Panelist } from "./llm.js";
import { SentenceChunker } from "./text.js";
import { connectElevenLabs, TtsConnection } from "./tts.js";
import { connectDeepgram, SttConnection } from "./stt.js";

export interface SessionEngineOptions {
  sessionId: string;
  socket: WebSocket;
  timing: TimingConfig;
  specialtyCode: string;
  stationTitle: string;
  questionText: string;
  confirmedFacts: string[];
}

export class SessionTurnEngine {
  private sessionId: string;
  private socket: WebSocket;
  private timing: TimingConfig;
  private state: InterviewState = "panel";
  private speakingSeat: number | null = 0; // Chair starts
  private questionIndex = 0;
  private repeatsRemaining: number;
  private answerDeadline: string | null = null;
  private interviewDeadline: string;
  private panelist: Panelist;
  private sttConnection: SttConnection | null = null;
  private ttsConnection: TtsConnection | null = null;
  private transcriptHistory: string[] = [];
  private fullTranscript = "";
  private currentTurnBuffer = "";
  private answerTimer: NodeJS.Timeout | null = null;
  private warningTimer: NodeJS.Timeout | null = null;
  private isClosed = false;

  constructor(options: SessionEngineOptions) {
    this.sessionId = options.sessionId;
    this.socket = options.socket;
    this.timing = options.timing;
    this.repeatsRemaining = options.timing.repeatAllowance;

    const totalSeconds =
      options.timing.questionCount * options.timing.answerSeconds + 120;
    this.interviewDeadline = new Date(
      Date.now() + totalSeconds * 1000
    ).toISOString();

    this.panelist = new Panelist({
      specialty: options.specialtyCode,
      stationTitle: options.stationTitle,
      questionText: options.questionText,
      confirmedFacts: options.confirmedFacts,
    });

    this.initConnections(options);
  }

  private async initConnections(options: SessionEngineOptions) {
    const deepgramKey = process.env.DEEPGRAM_API_KEY ?? "";
    const elevenLabsKey = process.env.ELEVENLABS_API_KEY ?? "";

    this.sttConnection = await connectDeepgram(deepgramKey, {
      onSpeechStarted: () => {
        if (this.state === "candidate" || this.state === "silence") {
          this.logEvent("user_action", { action: "speech_started" });
        }
      },
      onInterim: (text) => {
        this.sendFrame({
          type: "transcript_interim",
          text,
        });
      },
      onFinal: (seg) => {
        this.currentTurnBuffer += " " + seg.text;
        this.sendFrame({
          type: "transcript_final",
          text: seg.text,
          startMs: Math.round(seg.end * 1000 - 1500),
          endMs: Math.round(seg.end * 1000),
        });

        if (seg.speechFinal) {
          this.handleCandidateTurnEnd();
        }
      },
      onError: (err) => {
        console.warn(`[STT Error ${this.sessionId}]`, err.message);
      },
      onClose: () => {},
    });

    // Start by speaking the initial question
    this.startPanelGreeting(options.questionText);
  }

  private startPanelGreeting(greeting: string) {
    this.state = "panel";
    this.speakingSeat = 0;
    this.answerDeadline = null;
    this.broadcastSnapshot();

    this.logEvent("state_transition", { state: "panel", seat: 0 });

    // Stream the question text and audio to client
    setTimeout(() => {
      this.sendFrame({
        type: "panel_audio",
        seatIndex: 0,
        textDelta: greeting,
        isFinal: true,
      });

      // Transition to candidate's turn
      setTimeout(() => {
        this.startCandidateTurn();
      }, 1500);
    }, 500);
  }

  private startCandidateTurn() {
    if (this.isClosed) return;
    this.state = "candidate";
    this.speakingSeat = null;
    const deadlineMs = Date.now() + this.timing.answerSeconds * 1000;
    this.answerDeadline = new Date(deadlineMs).toISOString();

    this.clearTimers();
    this.logEvent("state_transition", {
      state: "candidate",
      deadline: this.answerDeadline,
    });
    this.broadcastSnapshot();

    // Schedule 30s warning timer
    const warnMs = (this.timing.answerSeconds - this.timing.warningSeconds) * 1000;
    if (warnMs > 0) {
      this.warningTimer = setTimeout(() => {
        if (this.state === "candidate") {
          this.state = "warn";
          this.logEvent("state_transition", { state: "warn" });
          this.broadcastSnapshot();
        }
      }, warnMs);
    }

    // Schedule expired timer
    this.answerTimer = setTimeout(() => {
      this.handleAnswerExpired();
    }, this.timing.answerSeconds * 1000);
  }

  private async handleCandidateTurnEnd() {
    if (this.state !== "candidate" && this.state !== "warn") return;

    this.clearTimers();
    const candidateSpeech = this.currentTurnBuffer.trim();
    this.currentTurnBuffer = "";
    if (!candidateSpeech) return;

    this.state = "processing";
    this.logEvent("state_transition", {
      state: "processing",
      transcript: candidateSpeech,
    });
    this.broadcastSnapshot();

    this.transcriptHistory.push(`Candidate: ${candidateSpeech}`);
    this.fullTranscript += `\nCandidate: ${candidateSpeech}\n`;

    // Rotate speaking seat (0: Chair, 1: Clinical Examiner, 2: Portfolio Assessor)
    this.speakingSeat = (this.questionIndex + 1) % this.timing.panelSeats;

    try {
      this.state = "panel";
      this.logEvent("state_transition", {
        state: "panel",
        seat: this.speakingSeat,
      });
      this.broadcastSnapshot();

      const chunker = new SentenceChunker((chunk) => {
        this.sendFrame({
          type: "panel_audio",
          seatIndex: this.speakingSeat ?? 0,
          textDelta: chunk,
          isFinal: false,
        });
      });

      const reply = await this.panelist.reply(candidateSpeech, {
        onFirstToken: () => {},
        onText: (delta) => chunker.push(delta),
      });
      chunker.flush();

      this.fullTranscript += `Panel (${this.speakingSeat}): ${reply.text}\n`;
      this.sendFrame({
        type: "panel_audio",
        seatIndex: this.speakingSeat,
        textDelta: "",
        isFinal: true,
      });

      this.questionIndex += 1;
      if (this.questionIndex >= this.timing.questionCount) {
        setTimeout(() => this.completeInterview(), 2000);
      } else {
        setTimeout(() => this.startCandidateTurn(), 1500);
      }
    } catch (err: any) {
      console.error("[LLM Error]", err);
      this.state = "candidate";
      this.broadcastSnapshot();
    }
  }

  private handleAnswerExpired() {
    this.state = "expired";
    this.logEvent("state_transition", { state: "expired" });
    this.broadcastSnapshot();

    setTimeout(() => {
      this.handleCandidateTurnEnd();
    }, 1500);
  }

  handleClientAudio(pcmBase64: string) {
    if (this.sttConnection && (this.state === "candidate" || this.state === "warn")) {
      const buffer = Buffer.from(pcmBase64, "base64");
      this.sttConnection.send(buffer);
    }
  }

  handleRepeatRequest() {
    if (this.repeatsRemaining > 0) {
      this.repeatsRemaining -= 1;
      this.state = "repeat";
      this.logEvent("state_transition", {
        state: "repeat",
        repeatsRemaining: this.repeatsRemaining,
      });
      this.broadcastSnapshot();

      setTimeout(() => {
        this.startCandidateTurn();
      }, 2000);
    }
  }

  handlePause() {
    this.state = "paused";
    this.clearTimers();
    this.logEvent("state_transition", { state: "paused" });
    this.broadcastSnapshot();
  }

  handleResume() {
    if (this.state === "paused") {
      this.startCandidateTurn();
    }
  }

  completeInterview() {
    this.state = "completed";
    this.clearTimers();
    this.speakingSeat = null;
    this.answerDeadline = null;
    this.logEvent("state_transition", {
      state: "completed",
      fullTranscript: this.fullTranscript,
    });
    this.broadcastSnapshot();

    // Trigger async rubric scoring job
    setTimeout(() => {
      import("../scoring/evaluator.js").then(({ evaluateSessionRubric }) => {
        evaluateSessionRubric(this.sessionId, this.fullTranscript);
      });
    }, 500);
  }

  private clearTimers() {
    if (this.answerTimer) {
      clearTimeout(this.answerTimer);
      this.answerTimer = null;
    }
    if (this.warningTimer) {
      clearTimeout(this.warningTimer);
      this.warningTimer = null;
    }
  }

  private broadcastSnapshot() {
    const snapshot: InterviewSnapshot = {
      state: this.state,
      speakingSeat: this.speakingSeat,
      questionIndex: this.questionIndex,
      questionCount: this.timing.questionCount,
      answerDeadline: this.answerDeadline,
      interviewDeadline: this.interviewDeadline,
      repeatsRemaining: this.repeatsRemaining,
      transcript: this.fullTranscript,
      panelTurnText: "",
    };

    this.sendFrame({
      type: "snapshot",
      snapshot,
    });
  }

  private sendFrame(frame: ServerFrame) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(frame));
    }
  }

  private logEvent(eventType: string, payload: any) {
    inMemoryDb.sessionEvents.push({
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sessionId: this.sessionId,
      sequence: inMemoryDb.sessionEvents.length + 1,
      eventType,
      payload: JSON.stringify(payload),
      timestamp: new Date(),
    });
  }

  close() {
    this.isClosed = true;
    this.clearTimers();
    if (this.sttConnection) this.sttConnection.close();
    if (this.ttsConnection) this.ttsConnection.close();
  }
}
