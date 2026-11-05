import type { Metadata } from "next";
import { Footer, Header } from "../site-chrome";
import { CANCELLATION_POLICY } from "../../lib/booking-policy";
import { STUDIO_EMAIL } from "../../lib/contact";

export const metadata: Metadata = { title: "Booking policy | VIRGO" };
export default function BookingPolicyPage() {
  return <><Header /><main id="main-content" className="email-booking-page"><section className="container email-booking-intro">
    <p className="eyebrow">Before your session</p><h1>Booking policy.</h1>
    <h2>Cancellations and changes</h2><p>{CANCELLATION_POLICY}</p>
    <p>The cutoff is measured from the scheduled start in New York time. A rescheduling request does not change your reservation until the studio confirms the change.</p>
    <h2>Packages and extras</h2><p>Your selected package price covers its listed duration and deliverables. Custom sets, advanced graphics and additional deliverables require a separate quote.</p>
    <h2>Payment and confirmation</h2><p>Test checkout creates simulated payments and test calendar events only. A test confirmation is not a real reservation. For real sessions, follow the payment instructions provided by the studio.</p>
    <p>Contact <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a> about your booking.</p>
  </section></main><Footer /></>;
}
