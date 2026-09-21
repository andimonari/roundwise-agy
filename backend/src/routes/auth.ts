import { FastifyPluginAsync } from "fastify";
import { inMemoryDb } from "../db.js";

export const authRoutes: FastifyPluginAsync = async (app) => {
  // Current user / profile
  app.get("/session", async (req, reply) => {
    const defaultUser = Array.from(inMemoryDb.users.values())[0];
    return {
      user: defaultUser,
      entitlement: {
        type: "unlimited_pass",
        creditsRemaining: 99,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
    };
  });

  // Record explicit statutory consent
  app.post("/consent", async (req, reply) => {
    const body = req.body as any;
    const user = Array.from(inMemoryDb.users.values())[0];
    if (user) {
      user.consentGDPR = Boolean(body.consentGDPR);
      user.consentAudio = Boolean(body.consentAudio);
      user.consentModel = Boolean(body.consentModel);
      user.consentCaldicott = Boolean(body.consentCaldicott);
      user.consentVersion = body.consentVersion ?? "1.0";
      user.audioRetentionDays = body.audioRetentionDays ?? 90;
      user.updatedAt = new Date();
      return { success: true, user };
    }
    return reply.status(404).send({ error: "User not found" });
  });
};
