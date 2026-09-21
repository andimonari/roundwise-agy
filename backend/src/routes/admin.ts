import { FastifyPluginAsync } from "fastify";
import { inMemoryDb } from "../db.js";
import { TimingConfig } from "../types.js";

export const DEFAULT_TIMING: TimingConfig = {
  answerSeconds: 180,
  warningSeconds: 30,
  questionCount: 7,
  panelSeats: 3,
  repeatAllowance: 2,
};

export const adminRoutes: FastifyPluginAsync = async (app) => {
  // Get all question bank items
  app.get("/questions", async () => {
    return {
      questions: Array.from(inMemoryDb.questionBanks.values()),
    };
  });

  // Create question bank item
  app.post("/questions", async (req, reply) => {
    const body = req.body as any;
    const id = `q-${body.specialtyCode}-${Date.now()}`;
    const question = {
      id,
      specialtyCode: body.specialtyCode,
      pathway: body.pathway,
      level: body.level || "ST1 / CT1",
      stationType: body.stationType || "clinical",
      title: body.title,
      questionText: body.questionText,
      promptTemplate: body.promptTemplate,
      rubricRef: body.rubricRef || "GEN-1",
      followUpProbes: body.followUpProbes || null,
      version: 1,
      active: true,
      createdAt: new Date(),
    };

    inMemoryDb.questionBanks.set(id, question);
    return { success: true, question };
  });

  // Get active session count and metrics
  app.get("/metrics", async () => {
    return {
      totalUsers: inMemoryDb.users.size,
      totalSessions: inMemoryDb.sessions.size,
      totalEvents: inMemoryDb.sessionEvents.length,
      questionsCount: inMemoryDb.questionBanks.size,
      uptimeSeconds: process.uptime(),
    };
  });
};
