import Link from "next/link";
import { BOOKING_EMAIL } from "../lib/contact";
import { BOOKING_PAGE } from "../lib/booking-links";

export function Header() {
  return (
    <header className="site-header clean-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="VIRGO Podcast Studio home"><img src="/assets/virgo-logo.png" alt="" /><span><strong>VIRGO</strong><small>Podcast Studio</small></span></Link>
        <nav aria-label="Primary navigation"><Link href="/#studio">The studio</Link><Link href="/#packages">Packages</Link><Link href="/work">Our work</Link><Link href="/#location">Visit</Link></nav>
        <a className="header-call" href={BOOKING_PAGE}><strong>Book a session <span aria-hidden="true">↗</span></strong><small>Pay on site, day of</small></a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer clean-footer">
      <div className="container footer-grid">
        <div><Link className="brand footer-brand" href="/" aria-label="VIRGO Podcast Studio home"><img src="/assets/virgo-logo.png" alt="" /><span><strong>VIRGO</strong><small>Podcast Studio</small></span></Link><p>Good conversations.<br />Professionally produced in Midtown.</p></div>
        <div><h3>Explore</h3><Link href="/#packages">Packages</Link><Link href="/work">Our work</Link><Link href="/audience-growth">Audience growth</Link><Link href="/podcast-therapy">Podcast Therapy</Link><Link href="/#faq">Questions &amp; answers</Link></div>
        <div><h3>Visit</h3><p>1345 Avenue of the Americas<br />2nd Floor<br />New York, NY 10105</p></div>
        <div><h3>Let’s record</h3><a href={BOOKING_EMAIL}>ezraberke@virgopodcast.com</a><a href={BOOKING_PAGE}>Book a session ↗</a><p className="footer-payment">Pay on site on the day of your session.</p></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 VIRGO Podcast Studio</span><span>Recorded with care. Ready to share.</span></div>
    </footer>
  );
}
