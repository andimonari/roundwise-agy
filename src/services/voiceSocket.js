// RoundWise Frontend WebSocket Voice Client
// Connects to ws://localhost:3001/v1/session?token=sessionId
// Handles real-time server snapshots, live transcript deltas, and streaming audio playback

export class VoiceSocketClient {
  constructor(sessionId, handlers = {}) {
    this.sessionId = sessionId || `session-${Date.now()}`;
    this.handlers = {
      onSnapshot: handlers.onSnapshot || (() => {}),
      onPanelAudio: handlers.onPanelAudio || (() => {}),
      onTranscriptInterim: handlers.onTranscriptInterim || (() => {}),
      onTranscriptFinal: handlers.onTranscriptFinal || (() => {}),
      onError: handlers.onError || (() => {}),
      onOpen: handlers.onOpen || (() => {}),
      onClose: handlers.onClose || (() => {}),
    };

    this.ws = null;
    this.isConnected = false;
    this.audioContext = null;
    this.init();
  }

  init() {
    const wsUrl = `ws://localhost:3001/v1/session?token=${this.sessionId}`;
    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.isConnected = true;
        this.handlers.onOpen();
      };

      this.ws.onmessage = (event) => {
        try {
          const frame = JSON.parse(event.data);
          if (frame.type === "snapshot") {
            this.handlers.onSnapshot(frame.snapshot);
          } else if (frame.type === "panel_audio") {
            this.handlers.onPanelAudio(frame);
          } else if (frame.type === "transcript_interim") {
            this.handlers.onTranscriptInterim(frame.text);
          } else if (frame.type === "transcript_final") {
            this.handlers.onTranscriptFinal(frame);
          } else if (frame.type === "error") {
            this.handlers.onError(new Error(frame.message));
          }
        } catch (e) {
          console.warn("[VoiceSocket frame error]", e);
        }
      };

      this.ws.onerror = (err) => {
        this.handlers.onError(err);
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        this.handlers.onClose();
      };
    } catch (err) {
      console.warn("[VoiceSocket Init Error - Operating in simulation mode]", err);
    }
  }

  sendAudio(pcmBase64) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: "audio", pcmBase64 }));
    }
  }

  requestRepeat() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: "repeat" }));
    }
  }

  pause() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: "pause" }));
    }
  }

  resume() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: "resume" }));
    }
  }

  finishEarly() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: "finish_early" }));
    }
  }

  close() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
