export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="/" aria-label="VIRGO Podcast Studio home">
          <img src="/assets/virgo-logo.png" alt="" />
          <span><strong>VIRGO</strong><small>Podcast Studio</small></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="/work">Our work</a>
          <a href="/#studio">Studio</a>
          <a href="/#services">Services</a>
          <a href="/#pricing">Pricing</a>
          <a href="/#location">Location</a>
        </nav>
        <a className="header-call" href="tel:+12149036838"><span>Free consultation</span><strong>(214) 903-6838</strong></a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a className="brand footer-brand" href="/" aria-label="VIRGO Podcast Studio home">
            <img src="/assets/virgo-logo.png" alt="" />
            <span><strong>VIRGO</strong><small>Podcast Studio</small></span>
          </a>
          <p>Professional podcast and video production in a comfortable Midtown Manhattan studio.</p>
        </div>
        <div><h3>Explore</h3><a href="/work">Our work</a><a href="/#studio">The studio</a><a href="/#services">Services</a><a href="/#pricing">Pricing</a></div>
        <div><h3>Visit</h3><p>1345 Avenue of the Americas<br />2nd Floor<br />New York, NY</p></div>
        <div><h3>Start a project</h3><a href="tel:+12149036838">(214) 903-6838</a><a href="mailto:ezraberke@virgopodcast.com">ezraberke@virgopodcast.com</a><span>Free consultations</span></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 VIRGO Podcast Studio</span><span>Recorded with care. Delivered with momentum.</span></div>
    </footer>
  );
}
