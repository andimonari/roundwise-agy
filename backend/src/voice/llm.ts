import Anthropic from "@anthropic-ai/sdk";

export interface PanelistOptions {
  model?: string;
  specialty: string;
  stationTitle: string;
  questionText: string;
  confirmedFacts?: string[];
  seatName?: string;
}

export interface ReplyHandlers {
  onFirstToken(): void;
  onText(delta: string): void;
}

export interface Reply {
  text: string;
  outputTokens: number;
}

export class Panelist {
  private client: Anthropic | null = null;
  private history: Anthropic.MessageParam[] = [];
  private options: PanelistOptions;

  constructor(options: PanelistOptions) {
    this.options = options;
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (apiKey && apiKey.trim() !== "") {
      this.client = new Anthropic({ apiKey });
    }
  }

  private buildSystemPrompt(): string {
    const factsBlock =
      this.options.confirmedFacts && this.options.confirmedFacts.length > 0
        ? `\nCandidate verified CV facts (you may refer to these appropriately):\n- ${this.options.confirmedFacts.join(
            "\n- "
          )}`
        : "\nCandidate has no portfolio facts verified for this station.";

    return `You are an interview panel member for a UK medical specialty interview (${this.options.specialty}).
Station Title: ${this.options.stationTitle}
Initial Core Scenario: ${this.options.questionText}
${factsBlock}

Rules:
1. You are simulating an official UK interview panel. Speak plainly, professionally, and realistically.
2. Ask one concise follow-up question or probe at a time. Keep responses under 45 words.
3. No bullet points, markdown formatting, or stage directions (e.g. do not say *nods* or [pause]).
4. Evaluate and probe the candidate's clinical prioritisation, safety, escalation, and communication.
5. If the candidate asks for clarification or repeat, summarize or repeat the key clinical details.`;
  }

  async reply(
    candidateUtterance: string,
    handlers: ReplyHandlers,
    signal?: AbortSignal
  ): Promise<Reply> {
    if (!this.client) {
      // Mock simulation mode when no API key is provided
      handlers.onFirstToken();
      const mockReplies = [
        "Thank you. Can you specify which investigations you would prioritise within the first 15 minutes?",
        "Understood. If the blood pressure remains 88/50 despite a 500ml fluid bolus, who would you escalate to next?",
        "Good. How would you document this clinical decision and communicate your plan to the nursing team?",
        "Thank you. Let us move to the ethical aspect of this scenario: what if the family disputes your plan?",
      ];
      const selected = mockReplies[this.history.length % mockReplies.length];
      handlers.onText(selected);
      this.history.push(
        { role: "user", content: candidateUtterance },
        { role: "assistant", content: selected }
      );
      return { text: selected, outputTokens: 30 };
    }

    const messages: Anthropic.MessageParam[] = [
      ...this.history,
      { role: "user", content: candidateUtterance },
    ];

    const stream = this.client.messages.stream(
      {
        model: this.options.model ?? process.env.LLM_MODEL ?? "claude-haiku-4-5",
        max_tokens: 180,
        system: this.buildSystemPrompt(),
        messages,
      },
      signal ? { signal } : undefined
    );

    let first = true;
    stream.on("text", (delta) => {
      if (first) {
        first = false;
        handlers.onFirstToken();
      }
      handlers.onText(delta);
    });

    const finalMessage = await stream.finalMessage();
    const text = finalMessage.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");

    this.history.push(
      { role: "user", content: candidateUtterance },
      { role: "assistant", content: text }
    );

    return { text, outputTokens: finalMessage.usage.output_tokens };
  }
}
