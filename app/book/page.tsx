import type { Metadata } from "next";
import { Footer, Header } from "../site-chrome";
import { BOOKING_EMAIL } from "../../lib/contact";

export const metadata: Metadata = {
  title: "Book by Email | VIRGO Podcast Studio",
  description: "Email Ezra to arrange your VIRGO studio session. Confirm your package and date by email, then pay on site on the day of your session.",
};
export default function BookPage() {
  return (<><Header /><main id="main-content" className="email-booking-page"><section className="container email-booking-intro"><p className="eyebrow">Your next session starts here</p><h1>Book by email.<br />Pay on site.</h1><p>Tell Ezra what you’re making, your preferred date and how long you’d like to record. We’ll confirm availability, your package and the session details by email.</p><div className="button-row"><a className="button button-primary" href={BOOKING_EMAIL}>Open a booking email ↗</a><a className="text-link" href="/#packages">Compare packages</a></div><p className="booking-payment"><strong>Payment is due on site on the day of your session.</strong> No online payment or checkout is required.</p><div className="email-steps"><article><span>01</span><h2>Send your ideas.</h2><p>The button opens an email draft with room for your preferred date, package, guests and session length.</p></article><article><span>02</span><h2>Confirm the details.</h2><p>We’ll reply with availability and work out the right setup for your recording. An inquiry is not a confirmed booking.</p></article><article><span>03</span><h2>Come in. Create.</h2><p>Meet us at 1345 Avenue of the Americas, 2nd Floor, and pay at the studio on the day.</p></article></div><p className="email-fallback">If the draft doesn’t open, email <a href={BOOKING_EMAIL}>ezraberke@virgopodcast.com</a> from your preferred email app.</p></section></main><Footer /></>);
}
