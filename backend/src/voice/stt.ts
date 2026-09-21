import WebSocket from "ws";

export interface TranscriptSegment {
  text: string;
  end: number;
  speechFinal: boolean;
  receivedAt: number;
}

export interface SttHandlers {
  onInterim(text: string): void;
  onFinal(segment: TranscriptSegment): void;
  onSpeechStarted(): void;
  onError(error: Error): void;
  onClose(): void;
}

export interface SttConnection {
  send(pcm: Buffer): void;
  close(): Promise<void>;
}

export function connectDeepgram(
  apiKey: string,
  handlers: SttHandlers
): Promise<SttConnection> {
  if (!apiKey || apiKey.trim() === "") {
    console.warn("[STT] No DEEPGRAM_API_KEY provided; operating in simulated STT mode.");
    return Promise.resolve({
      send: () => {},
      close: async () => {},
    });
  }

  const url = new URL("wss://api.deepgram.com/v1/listen");
  url.search = new URLSearchParams({
    model: process.env.STT_MODEL ?? "nova-2",
    encoding: "linear16",
    sample_rate: "16000",
    channels: "1",
    interim_results: "true",
    endpointing: "300",
    utterance_end_ms: "1000",
    vad_events: "true",
    smart_format: "true",
    punctuate: "true",
  }).toString();

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url, {
      headers: { Authorization: `Token ${apiKey}` },
    });

    ws.on("open", () => {
      resolve({
        send: (pcm: Buffer) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(pcm);
          }
        },
        close: async () => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.close();
          }
        },
      });
    });

    ws.on("message", (raw) => {
      try {
        const msg = JSON.parse(raw.toString());
        if (msg.type === "SpeechStarted") {
          handlers.onSpeechStarted();
        } else if (msg.type === "Results") {
          const alt = msg.channel?.alternatives?.[0];
          const transcript = alt?.transcript ?? "";
          if (transcript.length > 0) {
            if (msg.is_final) {
              handlers.onFinal({
                text: transcript,
                end: msg.start + msg.duration,
                speechFinal: msg.speech_final ?? false,
                receivedAt: Date.now(),
              });
            } else {
              handlers.onInterim(transcript);
            }
          }
        }
      } catch (err) {
        handlers.onError(err as Error);
      }
    });

    ws.on("error", (err) => handlers.onError(err));
    ws.on("close", () => handlers.onClose());
  });
}
