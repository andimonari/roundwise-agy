import { z } from "zod";

export const API_VERSION = "v1" as const;

/** 12 Interview states from the spec board */
export const INTERVIEW_STATES = [
  "panel",
  "candidate",
  "processing",
  "silence",
  "repeat",
  "warn",
  "expired",
  "network",
  "mic",
  "paused",
  "completed",
] as const;

export const InterviewStateSchema = z.enum(INTERVIEW_STATES);
export type InterviewState = z.infer<typeof InterviewStateSchema>;

export const INTERVIEW_STATE_SPEC: Readonly<
  Record<InterviewState, { readonly label: string; readonly meaning: string }>
> = {
  panel: { label: "Panel member speaking", meaning: "Answer clock has not started" },
  candidate: { label: "You are speaking", meaning: "Recording; answer clock running" },
  processing: { label: "Processing", meaning: "Panel considering the answer" },
  silence: { label: "Silence detected", meaning: "No audio from the candidate" },
  repeat: {
    label: "Repeat requested",
    meaning: "Question repeated verbatim, once, noted on report",
  },
  warn: { label: "Time warning", meaning: "30 seconds of answer time left" },
  expired: { label: "Answer time expired", meaning: "Window closed; partial answer captured" },
  network: {
    label: "Connection interrupted",
    meaning: "Reconnecting; answer buffered locally; clock paused",
  },
  mic: { label: "Microphone unavailable", meaning: "Audio lost; interview paused" },
  paused: { label: "Interview paused", meaning: "Time not counting; manual resume" },
  completed: {
    label: "Interview complete",
    meaning: "Report generating, usually under two minutes",
  },
};

export const CV_FACT_CATEGORIES = [
  "qualifications",
  "clinical_roles",
  "audits_qip",
  "teaching",
  "research_pubs",
  "leadership",
  "practical_procedures",
  "clinical_governance",
  "critical_incidents",
  "career_reflection",
] as const;

export const CvFactCategorySchema = z.enum(CV_FACT_CATEGORIES);
export type CvFactCategory = z.infer<typeof CvFactCategorySchema>;

export const CvFactStatusSchema = z.enum(["proposed", "confirmed", "removed"]);
export type CvFactStatus = z.infer<typeof CvFactStatusSchema>;

export const TimingConfigSchema = z.object({
  answerSeconds: z.number().int().positive().default(180),
  warningSeconds: z.number().int().nonnegative().default(30),
  questionCount: z.number().int().positive().default(7),
  panelSeats: z.number().int().positive().default(3),
  repeatAllowance: z.number().int().nonnegative().default(2),
});
export type TimingConfig = z.infer<typeof TimingConfigSchema>;

export const InterviewSnapshotSchema = z.object({
  state: InterviewStateSchema,
  speakingSeat: z.number().int().nonnegative().nullable(),
  questionIndex: z.number().int().nonnegative(),
  questionCount: z.number().int().positive(),
  answerDeadline: z.string().nullable(),
  interviewDeadline: z.string(),
  repeatsRemaining: z.number().int().nonnegative(),
  transcript: z.string().default(""),
  panelTurnText: z.string().default(""),
});
export type InterviewSnapshot = z.infer<typeof InterviewSnapshotSchema>;

/** WebSocket Frames */
export const ClientFrameSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("audio"), pcmBase64: z.string() }),
  z.object({ type: z.literal("repeat") }),
  z.object({ type: z.literal("pause") }),
  z.object({ type: z.literal("resume") }),
  z.object({ type: z.literal("finish_early") }),
]);
export type ClientFrame = z.infer<typeof ClientFrameSchema>;

export const ServerFrameSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("snapshot"),
    snapshot: InterviewSnapshotSchema,
  }),
  z.object({
    type: z.literal("panel_audio"),
    seatIndex: z.number(),
    pcmBase64: z.string().optional(),
    audioUrl: z.string().optional(),
    textDelta: z.string(),
    isFinal: z.boolean(),
  }),
  z.object({
    type: z.literal("transcript_interim"),
    text: z.string(),
  }),
  z.object({
    type: z.literal("transcript_final"),
    text: z.string(),
    startMs: z.number(),
    endMs: z.number(),
  }),
  z.object({
    type: z.literal("error"),
    message: z.string(),
  }),
]);
export type ServerFrame = z.infer<typeof ServerFrameSchema>;
