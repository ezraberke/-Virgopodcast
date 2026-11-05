"use client";
import { useEffect, useState } from "react";

export function Result({ sessionId, cancelled }: { sessionId?: string; cancelled: boolean }) {
  const [status, setStatus] = useState("checking");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (cancelled || !sessionId) return;
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    let polls = 0;
    async function check() {
      try {
        const response = await fetch(`/api/test-booking/status?session_id=${encodeURIComponent(sessionId!)}`, { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("Pending");
        const data = await response.json();
        if (controller.signal.aborted) return;
        setStatus(data.status);
        if (data.status === "held" && ++polls < 10) timer = setTimeout(check, 3000);
      } catch {
        if (!controller.signal.aborted) { setStatus("pending"); if (++polls < 10) timer = setTimeout(check, 3000); }
      }
    }
    void check();
    return () => { controller.abort(); clearTimeout(timer); };
  }, [sessionId, cancelled, retry]);
  const title = cancelled ? "Checkout closed." : !sessionId ? "No checkout reference." : status === "confirmed" ? "Test booking confirmed." : status === "needs_review" ? "Test payment received. Review needed." : status === "expired" ? "Checkout expired." : "Checking your test booking…";
  return <><p className="eyebrow">Stripe test mode</p><h1>{title}</h1><p aria-live="polite">{cancelled ? "Returning here does not cancel a payment or release a hold. Unpaid checkouts expire after about 35 minutes; the hold is released when Stripe confirms expiration." : status === "confirmed" ? "Test payment verified and a test calendar event created. No real charge or customer reservation was made." : status === "needs_review" ? "Availability changed before confirmation. No test calendar reservation was made. Contact the studio to review this test." : status === "expired" ? "No payment was completed for this checkout. You can choose another time." : "We only confirm after Stripe verifies payment and the test calendar is updated. If this takes longer, retry the check; do not pay again."}</p>
    {sessionId && !cancelled && ["pending", "held", "checking"].includes(status) && <button className="button button-outline" onClick={() => setRetry(n => n + 1)}>Check again</button>} <a className="button button-primary" href="/book/test">Back to test booking</a></>;
}
