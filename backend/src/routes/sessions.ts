import { FastifyPluginAsync } from "fastify";
import { inMemoryDb } from "../db.js";
import { DEFAULT_TIMING } from "./admin.js";

export const sessionRoutes: FastifyPluginAsync = async (app) => {
  // Create an interview session
  app.post("/", async (req, reply) => {
    const body = (req.body as any) || {};
    const sessionId = `session-${Date.now()}`;
    const specialtyCode = body.specialtyCode || "imt";

    // Find first matching question bank item or fallback
    const question =
      Array.from(inMemoryDb.questionBanks.values()).find(
        (q) => q.specialtyCode === specialtyCode
      ) || Array.from(inMemoryDb.questionBanks.values())[0];

    // Gather ONLY candidate confirmed facts
    const confirmedFacts = Array.from(inMemoryDb.cvFacts.values())
      .filter((f) => f.status === "confirmed")
      .map((f) => f.editedText || f.claimText);

    const session = {
      id: sessionId,
      userId: "user-default-1",
      specialtyCode,
      pathway: question?.pathway || "Internal Medicine Training (IMT)",
      stationType: body.stationType || "clinical",
      currentState: "panel",
      speakingSeat: 0,
      currentQuestionIndex: 0,
      questionCount: body.questionCount || DEFAULT_TIMING.questionCount,
      answerSeconds: body.answerSeconds || DEFAULT_TIMING.answerSeconds,
      warningSeconds: DEFAULT_TIMING.warningSeconds,
      repeatsRemaining: DEFAULT_TIMING.repeatAllowance,
      questionText: question?.questionText || "Please present your initial approach.",
      stationTitle: question?.title || "Clinical Prioritisation Station",
      confirmedFacts,
      createdAt: new Date(),
    };

    inMemoryDb.sessions.set(sessionId, session);

    return {
      success: true,
      session,
      wsUrl: `ws://localhost:3001/v1/session?token=${sessionId}`,
    };
  });

  // Get session details & event history
  app.get("/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const session = inMemoryDb.sessions.get(id);
    if (!session) {
      return reply.status(404).send({ error: "Session not found" });
    }

    const events = inMemoryDb.sessionEvents.filter((e) => e.sessionId === id);
    const scores = inMemoryDb.scores.get(id) || [];

    return {
      session,
      events,
      scores,
    };
  });
};
