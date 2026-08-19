import Link from "next/link";

export function Header() {
  return (
    <>
    <aside className="promo-bar" aria-label="$10 Start Your Own Podcast Week promotion">
      <div className="container promo-bar-inner">
        <p><strong>$10 Start Your Own Podcast Week</strong><span>August 19–25, 2026 · Limited sessions</span></p>
        <Link href="/book?promo=podcast-week#booking-calendar">Book your $10 session <span aria-hidden="true">→</span></Link>
      </div>
    </aside>
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="VIRGO Podcast Studio home">
          <img src="/assets/virgo-logo.png" alt="" />
          <span><strong>VIRGO</strong><small>Podcast Studio</small></span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/work">Our work</Link>
          <Link href="/#studio">Studio</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/podcast-therapy">Podcast Therapy</Link>
          <Link href="/#location">Location</Link>
          <Link href="/book">Book</Link>
        </nav>
        <Link className="header-call" href="/book?promo=podcast-week#booking-calendar"><span>Book the promotion</span><strong>$10 studio session</strong></Link>
      </div>
    </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" href="/" aria-label="VIRGO Podcast Studio home">
            <img src="/assets/virgo-logo.png" alt="" />
            <span><strong>VIRGO</strong><small>Podcast Studio</small></span>
          </Link>
          <p>Professional podcast and video production in a comfortable Midtown Manhattan studio.</p>
        </div>
        <div><h3>Explore</h3><Link href="/work">Our work</Link><Link href="/#studio">The studio</Link><Link href="/#services">Services</Link><Link href="/#pricing">Pricing</Link><Link href="/podcast-therapy">Podcast Therapy</Link><Link href="/book">Book online</Link></div>
        <div><h3>Visit</h3><p>1345 Avenue of the Americas<br />2nd Floor<br />New York, NY</p></div>
        <div><h3>Start a project</h3><a href="tel:+12149036838">(214) 903-6838</a><a href="mailto:ezraberke@virgopodcast.com">ezraberke@virgopodcast.com</a><span>Free consultations</span></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 VIRGO Podcast Studio</span><span>Recorded with care. Ready to share.</span></div>
    </footer>
  );
}
