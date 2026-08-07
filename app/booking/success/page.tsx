import { Footer, Header } from "../../site-chrome";
import Link from "next/link";

export default function BookingSuccessPage() {
  return (
    <><Header /><main className="booking-result"><div className="container booking-result-card"><span>✓</span><p className="eyebrow">Payment received</p><h1>Your session is booked.</h1><p>You’ll receive a confirmation email with the session details. We look forward to recording with you.</p><div className="button-row centered-buttons"><Link className="button button-dark" href="/">Return home</Link><a className="button button-outline" href="tel:+12149036838">Call the studio</a></div></div></main><Footer /></>
  );
}
