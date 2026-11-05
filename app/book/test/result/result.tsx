"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { STUDIO_EMAIL } from "../../../../lib/contact";

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
        if (["held", "refund_pending"].includes(data.status) && ++polls < 10) timer = setTimeout(check, 3000);
      } catch {
        if (!controller.signal.aborted) { setStatus("pending"); if (++polls < 10) timer = setTimeout(check, 3000); }
      }
    }
    void check();
    return () => { controller.abort(); clearTimeout(timer); };
  }, [sessionId, cancelled, retry]);
  const title = cancelled ? "Checkout closed." : !sessionId ? "No checkout reference." : status === "confirmed" ? "Test booking confirmed." : status === "refunded" ? "Test payment refunded." : status === "refund_pending" ? "Test refund in progress." : status === "expired" ? "Checkout expired." : "Checking your test booking…";
  return <><p className="eyebrow">Stripe test mode</p><h1>{title}</h1><p aria-live="polite">{cancelled ? "Returning here does not cancel a payment or release a hold. Unpaid checkouts expire after about 35 minutes; the hold is released when Stripe confirms expiration." : status === "confirmed" ? "Test payment verified and a test calendar event created. No real charge or customer reservation was made." : status === "refunded" ? "The calendar changed during checkout, so no booking was made and the full test payment was refunded. No real money moved. You can choose another time." : status === "refund_pending" ? "The calendar changed during checkout. No booking was made. Stripe is processing a full test refund; do not pay again." : status === "expired" ? "No payment was completed for this checkout. You can choose another time." : "We only confirm after Stripe verifies payment and the test calendar is updated. If this takes longer, retry the check; do not pay again."}</p>
    {sessionId && !cancelled && ["pending", "held", "checking", "refund_pending"].includes(status) && <button className="button button-outline" onClick={() => setRetry(n => n + 1)}>Check again</button>} <Link className="button button-primary" href="/book">Back to test booking</Link>
    <p>Need help? <a href={`mailto:${STUDIO_EMAIL}`}>Contact the studio</a>.</p></>;
}
