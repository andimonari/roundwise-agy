import { FastifyPluginAsync } from "fastify";
import { inMemoryDb } from "../db.js";

export const billingRoutes: FastifyPluginAsync = async (app) => {
  // Create Stripe checkout session
  app.post("/checkout", async (req, reply) => {
    const body = (req.body as any) || {};
    const plan = body.plan || "single_station"; // 'single_station' (£25) or 'unlimited_pass' (£40)
    const amountPence = plan === "unlimited_pass" ? 4000 : 2500;

    const checkoutSessionId = `cs_test_${Date.now()}`;
    const user = Array.from(inMemoryDb.users.values())[0];

    // Grant instant entitlement in dev/mock mode
    const entitlement = {
      id: `ent-${Date.now()}`,
      userId: user?.id || "user-default-1",
      type: plan,
      stripeCheckoutId: checkoutSessionId,
      creditsRemaining: plan === "unlimited_pass" ? 99 : 1,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
    };
    inMemoryDb.entitlements.set(entitlement.id, entitlement);

    return {
      success: true,
      checkoutUrl: `/checkout?session_id=${checkoutSessionId}`,
      plan,
      amountPence,
      entitlement,
    };
  });

  // Stripe webhook handler
  app.post("/webhook", async (req, reply) => {
    const event = req.body as any;
    if (event?.type === "checkout.session.completed") {
      const session = event.data?.object;
      const entitlement = {
        id: `ent-${Date.now()}`,
        userId: session.client_reference_id || "user-default-1",
        type: session.metadata?.plan || "single_mock",
        stripeCheckoutId: session.id,
        creditsRemaining: 1,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
      };
      inMemoryDb.entitlements.set(entitlement.id, entitlement);
    }
    return { received: true };
  });
};
