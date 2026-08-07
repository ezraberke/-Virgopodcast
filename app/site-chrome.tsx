import Link from "next/link";

export function Header() {
  return (
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
          <Link href="/#location">Location</Link>
          <Link href="/book">Book</Link>
        </nav>
        <Link className="header-call" href="/book"><span>View availability</span><strong>Book the studio</strong></Link>
      </div>
    </header>
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
        <div><h3>Explore</h3><Link href="/work">Our work</Link><Link href="/#studio">The studio</Link><Link href="/#services">Services</Link><Link href="/#pricing">Pricing</Link><Link href="/book">Book online</Link></div>
        <div><h3>Visit</h3><p>1345 Avenue of the Americas<br />2nd Floor<br />New York, NY</p></div>
        <div><h3>Start a project</h3><a href="tel:+12149036838">(214) 903-6838</a><a href="mailto:ezraberke@virgopodcast.com">ezraberke@virgopodcast.com</a><span>Free consultations</span></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 VIRGO Podcast Studio</span><span>Recorded with care. Ready to share.</span></div>
    </footer>
  );
}
