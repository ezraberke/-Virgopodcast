import { BookingError, getTestConfig } from "../../../../lib/test-booking/config";
import { settleSession, testStripe } from "../../../../lib/test-booking/service";
import { failure, json } from "../../../../lib/test-booking/http";

export const runtime = "nodejs";
export const maxDuration = 60;
export async function GET(request: Request) {
  try {
    getTestConfig();
    const id = new URL(request.url).searchParams.get("session_id") ?? "";
    if (!/^cs_test_[A-Za-z0-9]{10,240}$/.test(id)) throw new BookingError("Invalid test checkout reference.");
    const session = await testStripe().checkout.sessions.retrieve(id);
    if (session.metadata?.integration !== "virgo-test-v1" || session.livemode) throw new BookingError("Unknown test booking.", 404);
    // A redirect is not proof of payment. Reconcile with Stripe before displaying a result.
    return json({ status: await settleSession(session) ?? "held" });
  } catch (error) { return failure(error); }
}
