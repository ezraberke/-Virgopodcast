import Stripe from "stripe";
import { getTestConfig } from "../../../../lib/test-booking/config";
import { settleSession, testStripe } from "../../../../lib/test-booking/service";
import { failure, json } from "../../../../lib/test-booking/http";

export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(request: Request) {
  try {
    const config = getTestConfig();
    const stripe = testStripe();
    const signature = request.headers.get("stripe-signature");
    if (!signature) return json({ error: "Missing signature." }, 400);
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(await request.text(), signature, config.webhookSecret);
    } catch { return json({ error: "Invalid signature." }, 400); }
    if (event.livemode) return json({ error: "Live events are forbidden." }, 400);
    if (["checkout.session.completed", "checkout.session.expired", "checkout.session.async_payment_succeeded", "checkout.session.async_payment_failed"].includes(event.type)) {
      const object = event.data.object as Stripe.Checkout.Session;
      // Retrieve current state: duplicate and out-of-order notifications must be harmless.
      const session = await stripe.checkout.sessions.retrieve(object.id);
      const status = await settleSession(session);
      // Keep Stripe's delivery retries active while a refund is pending.
      if (status === "refund_pending") return json({ error: "Refund is still pending." }, 503);
    }
    return json({ received: true });
  } catch (error) { return failure(error); }
}
