import cors from "@fastify/cors";
import fastifyWebsocket from "@fastify/websocket";
import dotenv from "dotenv";
import Fastify from "fastify";
import { inMemoryDb } from "./db.js";
import { adminRoutes, DEFAULT_TIMING } from "./routes/admin.js";
import { authRoutes } from "./routes/auth.js";
import { billingRoutes } from "./routes/billing.js";
import { cvRoutes } from "./routes/cv.js";
import { scoringRoutes } from "./routes/scoring.js";
import { sessionRoutes } from "./routes/sessions.js";
import { API_VERSION, ClientFrameSchema } from "./types.js";
import { SessionTurnEngine } from "./voice/turnEngine.js";

dotenv.config();

const port = Number(process.env.PORT || 3001);
const app = Fastify({ logger: true });

await app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
});

await app.register(fastifyWebsocket);

// Health check endpoint
app.get(`/${API_VERSION}/health`, async () => {
  return {
    service: "roundwise-backend",
    status: "ok",
    version: API_VERSION,
    time: new Date().toISOString(),
    uptime: process.uptime(),
  };
});

// Register REST API Route Groups under /v1
await app.register(authRoutes, { prefix: `/${API_VERSION}/auth` });
await app.register(cvRoutes, { prefix: `/${API_VERSION}/cv` });
await app.register(sessionRoutes, { prefix: `/${API_VERSION}/sessions` });
await app.register(scoringRoutes, { prefix: `/${API_VERSION}/scoring` });
await app.register(billingRoutes, { prefix: `/${API_VERSION}/billing` });
await app.register(adminRoutes, { prefix: `/${API_VERSION}/admin` });

// Realtime Stateful WebSocket Voice Turn Engine on /v1/session
app.register(async function (fastify) {
  fastify.get(
    `/${API_VERSION}/session`,
    { websocket: true },
    (connection, req) => {
      const socket = connection;
      const url = new URL(req.url || "", `http://${req.headers.host}`);
      const sessionId = url.searchParams.get("token") || `session-${Date.now()}`;

      // Retrieve or instantiate session parameters
      const existingSession = inMemoryDb.sessions.get(sessionId);
      const question = Array.from(inMemoryDb.questionBanks.values())[0];

      const confirmedFacts = Array.from(inMemoryDb.cvFacts.values())
        .filter((f) => f.status === "confirmed")
        .map((f) => f.editedText || f.claimText);

      const engine = new SessionTurnEngine({
        sessionId,
        socket,
        timing: {
          answerSeconds: existingSession?.answerSeconds || DEFAULT_TIMING.answerSeconds,
          warningSeconds: DEFAULT_TIMING.warningSeconds,
          questionCount: existingSession?.questionCount || DEFAULT_TIMING.questionCount,
          panelSeats: DEFAULT_TIMING.panelSeats,
          repeatAllowance: DEFAULT_TIMING.repeatAllowance,
        },
        specialtyCode: existingSession?.specialtyCode || "imt",
        stationTitle: existingSession?.stationTitle || question?.title || "Clinical Prioritisation",
        questionText:
          existingSession?.questionText ||
          question?.questionText ||
          "Please outline your initial assessment and management plan.",
        confirmedFacts,
      });

      socket.on("message", (raw) => {
        try {
          const data = JSON.parse(raw.toString());
          const frame = ClientFrameSchema.parse(data);

          if (frame.type === "audio") {
            engine.handleClientAudio(frame.pcmBase64);
          } else if (frame.type === "repeat") {
            engine.handleRepeatRequest();
          } else if (frame.type === "pause") {
            engine.handlePause();
          } else if (frame.type === "resume") {
            engine.handleResume();
          } else if (frame.type === "finish_early") {
            engine.completeInterview();
          }
        } catch (err: any) {
          console.warn("[Frame parse warning]", err.message);
        }
      });

      socket.on("close", () => {
        engine.close();
      });
    }
  );
});

try {
  await app.listen({ port, host: "0.0.0.0" });
  console.log(`\n🚀 RoundWise Backend & Realtime Turn Engine live on http://localhost:${port}/${API_VERSION}/`);
  console.log(`🎙️  WebSocket Turn Engine available at ws://localhost:${port}/${API_VERSION}/session\n`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
