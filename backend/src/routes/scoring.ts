import { FastifyPluginAsync } from "fastify";
import { inMemoryDb } from "../db.js";
import { evaluateSessionRubric } from "../scoring/evaluator.js";

export const scoringRoutes: FastifyPluginAsync = async (app) => {
  // Get scores with transcript citations for a session
  app.get("/:sessionId", async (req, reply) => {
    const { sessionId } = req.params as { sessionId: string };
    let scores = inMemoryDb.scores.get(sessionId);

    // If not yet evaluated, run evaluation now
    if (!scores || scores.length === 0) {
      const events = inMemoryDb.sessionEvents.filter(
        (e) => e.sessionId === sessionId
      );
      const transcriptEvents = events.filter(
        (e) => e.eventType === "transcript_delta" || e.eventType === "state_transition"
      );
      const combinedTranscript = transcriptEvents
        .map((e) => JSON.parse(e.payload)?.transcript || "")
        .filter(Boolean)
        .join(" ");

      scores = await evaluateSessionRubric(sessionId, combinedTranscript);
    }

    const totalScore = scores.reduce((sum, d) => sum + d.score, 0);
    const maxScore = scores.reduce((sum, d) => sum + d.maxScore, 0);
    const percentage = Math.round((totalScore / maxScore) * 100);

    return {
      sessionId,
      overallScore: totalScore,
      maxPossible: maxScore,
      percentage,
      outcome: percentage >= 75 ? "Appointable - High Rank" : "Appointable",
      rubricVersion: 1,
      domains: scores,
    };
  });

  // Re-run evaluation from immutable session_event log
  app.post("/rescore/:sessionId", async (req, reply) => {
    const { sessionId } = req.params as { sessionId: string };
    const session = inMemoryDb.sessions.get(sessionId);
    if (!session) {
      return reply.status(404).send({ error: "Session not found" });
    }

    const events = inMemoryDb.sessionEvents.filter((e) => e.sessionId === sessionId);
    const fullTranscript = events
      .map((e) => {
        try {
          return JSON.parse(e.payload)?.transcript || "";
        } catch {
          return "";
        }
      })
      .join(" ");

    const scores = await evaluateSessionRubric(sessionId, fullTranscript);
    return { success: true, rescoreCount: scores.length, scores };
  });
};
