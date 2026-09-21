import WebSocket from "ws";

export interface TtsHandlers {
  onAudio(pcmBase64: string): void;
  onFinal(): void;
  onError(err: Error): void;
}

export interface TtsConnection {
  sendText(text: string, flush: boolean): void;
  end(): void;
  close(): void;
}

export function connectElevenLabs(
  apiKey: string,
  voiceId: string,
  handlers: TtsHandlers
): Promise<TtsConnection> {
  if (!apiKey || apiKey.trim() === "") {
    console.warn("[TTS] No ELEVENLABS_API_KEY provided; operating in simulated audio mode.");
    return Promise.resolve({
      sendText: () => {},
      end: () => handlers.onFinal(),
      close: () => {},
    });
  }

  const url = new URL(
    `wss://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream-input`
  );
  url.search = new URLSearchParams({
    model_id: process.env.TTS_MODEL ?? "eleven_flash_v2_5",
    output_format: "pcm_16000",
    auto_mode: "true",
  }).toString();

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url, {
      headers: { "xi-api-key": apiKey },
    });

    ws.on("open", () => {
      // First handshake frame
      ws.send(
        JSON.stringify({
          text: " ",
          voice_settings: { stability: 0.5, similarity_boost: 0.8 },
          generation_config: { chunk_length_schedule: [50, 90, 120, 150] },
        })
      );

      resolve({
        sendText: (text: string, flush: boolean) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ text, flush }));
          }
        },
        end: () => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ text: "" }));
          }
        },
        close: () => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.close();
          }
        },
      });
    });

    ws.on("message", (raw) => {
      try {
        const msg = JSON.parse(raw.toString());
        if (msg.audio) {
          handlers.onAudio(msg.audio);
        }
        if (msg.isFinal) {
          handlers.onFinal();
        }
      } catch (err) {
        handlers.onError(err as Error);
      }
    });

    ws.on("error", (err) => handlers.onError(err));
  });
}
