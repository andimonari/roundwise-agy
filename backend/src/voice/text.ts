// Splits an LLM token stream into chunks for low-latency streaming TTS.
// Cuts at sentence ends and clause boundaries.

const SENTENCE_END = /[.!?…]+["')\]]*\s/;
const CLAUSE_END = /[,;:—–]\s/;

export interface ChunkerOptions {
  maxChars?: number;
  firstChunkMinWords?: number;
}

export class SentenceChunker {
  private buffer = "";
  private emitted = 0;
  private readonly maxChars: number;
  private readonly firstChunkMinWords: number;

  constructor(
    private readonly emit: (chunk: string) => void,
    options: ChunkerOptions = {}
  ) {
    this.maxChars = options.maxChars ?? 140;
    this.firstChunkMinWords = options.firstChunkMinWords ?? 0;
  }

  push(delta: string): void {
    this.buffer += delta;
    for (;;) {
      const m = SENTENCE_END.exec(this.buffer);
      if (m) {
        this.cut(m.index + m[0].length);
        continue;
      }
      if (this.emitted === 0 && this.firstChunkMinWords > 0) {
        const c = CLAUSE_END.exec(this.buffer);
        if (c && wordCount(this.buffer.slice(0, c.index)) >= this.firstChunkMinWords) {
          this.cut(c.index + c[0].length);
          continue;
        }
      }
      if (this.buffer.length >= this.maxChars) {
        const cut = this.buffer.lastIndexOf(" ");
        if (cut > 0) {
          this.cut(cut + 1);
          continue;
        }
      }
      return;
    }
  }

  flush(): void {
    const rest = this.buffer;
    this.buffer = "";
    this.send(rest);
  }

  private cut(at: number): void {
    this.send(this.buffer.slice(0, at));
    this.buffer = this.buffer.slice(at);
  }

  private send(text: string): void {
    const trimmed = text.trim();
    if (trimmed.length === 0) return;
    this.emitted += 1;
    this.emit(`${trimmed} `);
  }
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
