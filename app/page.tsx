import { Footer, Header } from "./site-chrome";

const services = [
  {
    number: "01",
    title: "Record",
    copy: "Professional cameras, broadcast microphones, studio lighting and an on-site producer in a room that feels natural on camera.",
  },
  {
    number: "02",
    title: "Edit",
    copy: "Clean audio, thoughtful camera switching, color, titles and pacing that turn the session into a polished full episode.",
  },
  {
    number: "03",
    title: "Repurpose",
    copy: "Hook-led vertical edits for Shorts, Reels, TikTok and LinkedIn—built from the strongest moments in your recording.",
  },
  {
    number: "04",
    title: "Reach real viewers",
    copy: "The Creator Starter Kit pairs studio production with hands-on distribution so your first content leaves the folder and reaches an audience.",
  },
];

const prices = [
  {
    eyebrow: "Record",
    title: "Studio session",
    description: "A flat one-hour room rate with professional recording and an on-site producer. You leave with the raw footage.",
    price: "$75",
    note: "one hour",
    rows: ["2 hours — $125", "Half day — $200", "Full day — $350"],
    href: "/book",
  },
  {
    eyebrow: "Most popular",
    title: "Ready to publish",
    description: "Studio session plus a professionally edited, upload-ready episode delivered in less than 24 hours.",
    price: "$125",
    note: "one hour",
    rows: ["2 hours — $175", "Half day — $250", "Full day — $395"],
    featured: true,
    href: "/book",
  },
  {
    eyebrow: "For podcasters",
    title: "Podcast Starter Kit",
    description: "A polished full episode, vertical social edits and a managed launch backed by our 100-real-viewer guarantee.",
    price: "$160",
    note: "one hour",
    rows: ["2 hours — $250", "Half day — $350", "Full day — $550"],
    href: "/book",
    podcast: true,
    guarantee: "100 real viewers—or your money back",
  },
  {
    eyebrow: "For creators",
    title: "Creator Starter Kit",
    description: "Record for one hour, leave the editing to us and launch your content through a VIRGO-managed social distribution plan.",
    price: "$160",
    note: "one hour",
    rows: ["2 hours — $250", "Half day — $350", "Full day — $550"],
    href: "/book#creator-kit",
    creator: true,
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero" id="top">
          <img
            className="hero-image"
            src="/assets/studio-hero-2026.webp"
            alt="The updated VIRGO Podcast Studio set with two blue chairs, microphones, wood slat walls and a central screen"
          />
          <div className="hero-shade" />
          <div className="container hero-content">
            <p className="eyebrow light">One week only · August 19–25, 2026</p>
            <h1><span className="hero-price">$10</span> Start Your Own<br />Podcast Week</h1>
            <p className="hero-copy">
              Use our professional studio to create content, build your personal or
              business brand, and share your passion with the world.
            </p>
            <div className="button-row">
              <a className="button button-primary" href="/book?promo=podcast-week#booking-calendar">Book your $10 session <span aria-hidden="true">→</span></a>
              <a className="button button-ghost" href="/work">Watch our work <span aria-hidden="true">↗</span></a>
            </div>
            <p className="hero-terms">New clients only · One 1-hour promotional recording session per person · Studio and equipment use included; editing is not included · Session must take place August 19–25, 2026 · Limited availability</p>
          </div>
          <div className="container proof-strip" aria-label="Studio highlights">
            <div><strong>3 cameras</strong><span>professional coverage</span></div>
            <div><strong>Broadcast mics</strong><span>multitrack audio</span></div>
            <div><strong>Studio lighting</strong><span>camera-ready setup</span></div>
            <div><strong>Midtown</strong><span>on-site producer</span></div>
          </div>
        </section>

        <section className="home-therapy-spotlight" id="podcast-therapy">
          <div className="container home-therapy-grid">
            <figure className="home-therapy-visual">
              <img
                src="/assets/podcast-therapy-listening-space.webp"
                alt="A guest reflecting during a conversation in the VIRGO recording studio"
              />
              <figcaption>Speak without rushing. Keep it private or choose to share.</figcaption>
            </figure>
            <div className="home-therapy-copy">
              <p className="eyebrow light">Podcast Therapy</p>
              <h2>Give what is on your mind somewhere to go.</h2>
              <p className="home-therapy-lead">
                A guided, non-clinical wellness experience built around reflection,
                self-expression, and telling your story in a professionally produced podcast.
              </p>
              <p>
                Take time to put a meaningful part of your life into words. Your episode can
                remain completely private or be shaped into something you choose to share.
              </p>
              <div className="button-row">
                <a className="button button-primary" href="/podcast-therapy">
                  Explore Podcast Therapy <span aria-hidden="true">→</span>
                </a>
                <a className="button button-ghost" href="/book?experience=podcast-therapy#booking-calendar">
                  Book the experience
                </a>
              </div>
              <p className="home-therapy-note">
                A creative wellness and storytelling service—not mental-health treatment.
              </p>
            </div>
          </div>
        </section>

        <section className="section results-section" id="results">
          <div className="container">
            <div className="results-intro">
              <div>
                <p className="eyebrow light">Podcast Starter Kit · proof of reach</p>
                <h2>A launch built to get your podcast seen.</h2>
              </div>
              <p>These are real VIRGO channel results—not stock examples. They show the visibility a coordinated recording, editing and launch workflow can create.</p>
            </div>
            <div className="results-grid">
              <figure>
                <img src="/assets/creator-results-views.webp" alt="Analytics showing 3.6 thousand views, 3.4 thousand more than usual" loading="lazy" />
                <figcaption><strong>3.6K views</strong><span>3.4K more than the channel’s usual performance</span></figcaption>
              </figure>
              <figure>
                <img src="/assets/podcast-starter-kit-results.webp" alt="YouTube Studio analytics showing 3,246 views, 125 watch hours and 8 new subscribers in 28 days" loading="lazy" />
                <figcaption><strong>3,246 views · 125 watch hours</strong><span>Recent VIRGO channel performance across 28 days</span></figcaption>
              </figure>
            </div>
            <div className="guarantee-card">
              <p className="eyebrow light">Podcast Starter Kit guarantee</p>
              <h3>100 real viewers—or your money back.</h3>
              <p>We guarantee at least 100 combined organic views across the short-form launch clips included with your Podcast Starter Kit within 30 days of the first post. If we miss that mark, we refund your Podcast Starter Kit fee. No purchased views and no bots. Recent performance is evidence of our work, not a promise of identical results.</p>
              <a className="button button-primary" href="/book#podcast-starter-kit">Book the Podcast Starter Kit <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section className="promo-details" id="promotion">
          <div className="container promo-details-grid">
            <div><p className="eyebrow">Your idea deserves a microphone</p><h2>Create something<br />worth sharing.</h2></div>
            <div className="promo-details-copy">
              <p className="lead">For $10, experience creating a professional podcast in a studio built for great conversations.</p>
              <ul className="check-list">
                <li>Use our three-camera setup and broadcast microphones</li>
                <li>Record with studio lighting, multitrack audio and on-site support</li>
                <li>Turn your expertise, story or passion into professional content</li>
                <li>Build visibility for your personal brand, business or big idea</li>
              </ul>
              <a className="button button-dark" href="/book?promo=podcast-week#booking-calendar">Claim your $10 session <span aria-hidden="true">→</span></a>
              <p className="promo-fine-print"><strong>Promotion dates:</strong> Wednesday, August 19 through Tuesday, August 25, 2026. New clients only. One 1-hour promotional recording session per person. Includes studio and listed recording equipment; editing and add-ons are not included. Appointment must take place during the promotional period. Limited availability; advance booking required.</p>
            </div>
          </div>
        </section>

        <section className="section work-teaser" id="work">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2>Made to hold attention.</h2>
              </div>
              <p>
                We build the full episode and the moments that travel: clean sound,
                considered pacing, supporting visuals and vertical edits that feel native to the feed.
              </p>
            </div>
            <div className="project-grid project-grid-reels project-grid-text">
              <a className="project-text-card" href="/work#buzelis-reel">
                <span className="project-index">01</span>
                <div><p>Sports analysis</p><h3>Matas Buzelis: shooting &amp; versatility</h3><small>Vertical edit · data graphics · captions</small></div>
                <span className="project-arrow" aria-hidden="true">↗</span>
              </a>
              <a className="project-text-card" href="/work#ai-reel">
                <span className="project-index">02</span>
                <div><p>Technology podcast</p><h3>AI Enters the Physical World</h3><small>Vertical edit · supporting visuals · captions</small></div>
                <span className="project-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="centered-action">
              <a className="text-link" href="/work">Explore the full portfolio <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="section studio-story" id="studio">
          <div className="container two-column">
            <div className="image-stack">
              <img className="image-main image-main-landscape" src="/assets/studio-camera-bts-2026.webp" alt="Sony camera set up to record the updated VIRGO Podcast Studio" />
              <div className="image-note"><span>1345</span>Avenue of the Americas<br />2nd Floor</div>
            </div>
            <div className="story-copy">
              <p className="eyebrow">The actual studio</p>
              <h2>Comfortable in the room. Confident on camera.</h2>
              <p className="lead">
                VIRGO is a calm Midtown recording room—not a cold soundstage. Settle into
                the conversation while your producer handles the cameras, sound and lighting.
              </p>
              <ul className="check-list">
                <li>Three-camera podcast and interview recording</li>
                <li>Broadcast microphones and multitrack audio</li>
                <li>Studio lighting and live production support</li>
                <li>Remote guest capability</li>
              </ul>
              <a className="text-link" href="/book">See available sessions <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section className="section set-flex-section" id="set-design">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">A studio that can become yours</p>
                <h2>Build the set your show calls for.</h2>
              </div>
              <p>
                Use the VIRGO set as it is, bring in your own elements, or work with us to
                shape a repeatable look around your exact creative specifications.
              </p>
            </div>
            <div className="set-flex-grid">
              <article>
                <span>01</span>
                <h3>Flexible set design</h3>
                <p>
                  Customize furniture, backdrops, color, props, and on-camera details to
                  create a set that fits your show, campaign, or brand.
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>Set storage</h3>
                <p>
                  Keep approved set pieces and branded elements with us between sessions,
                  so your setup can be ready when you arrive.
                </p>
              </article>
            </div>
            <div className="set-flex-footer">
              <p>
                Set design, installation, and storage are quoted separately based on scope,
                dimensions, and duration.
              </p>
              <a className="text-link" href="/book?service=set-design#booking-calendar">
                Plan your set <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section process-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow light">One recording, a complete content system</p>
              <h2 className="light">From idea to audience.</h2>
            </div>
            <div className="process-grid">
              <article><span>01</span><h3>Plan</h3><p>Choose the right format, package and deliverables for the idea.</p></article>
              <article><span>02</span><h3>Record</h3><p>Walk in, get comfortable and let an on-site producer run the room.</p></article>
              <article><span>03</span><h3>Package</h3><p>We refine the episode and turn its best moments into platform-ready assets.</p></article>
              <article><span>04</span><h3>Launch</h3><p>Publish it yourself or choose the Creator Kit and let us help get it seen.</p></article>
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading split-heading">
              <div><p className="eyebrow">A full content system</p><h2>More than a room with cameras.</h2></div>
              <p>Start with a session or hand us the entire production and distribution workflow. The package can grow with your ambition.</p>
            </div>
            <div className="service-list">
              {services.map((service) => (
                <article key={service.number}>
                  <span>{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="delivery-banner">
          <div className="container delivery-inner">
            <div>
              <p className="eyebrow light">Built for fast publishing</p>
              <h2>Recorded today.<br />Ready tomorrow.</h2>
            </div>
            <div className="delivery-number"><strong>&lt;24</strong><span>hour delivery for videos<br />recorded in studio</span></div>
          </div>
        </section>

        <section className="section pricing-section" id="pricing">
          <div className="container">
            <div className="section-heading centered-heading">
              <p className="eyebrow">Straightforward pricing</p>
              <h2>Choose how far you want us to take it.</h2>
              <p>Book recording time, leave with a finished episode or turn one visit into a complete social launch.</p>
            </div>
            <div className="pricing-grid pricing-grid-four">
              {prices.map((price) => (
                <article className={`${price.featured ? "price-card featured" : "price-card"}${price.podcast ? " podcast-kit-card" : ""}${price.creator ? " creator-card" : ""}`} key={price.title}>
                  <p className="price-eyebrow">{price.eyebrow}</p>
                  <h3>{price.title}</h3>
                  <p className="price-description">{price.description}</p>
                  {price.guarantee && <p className="price-guarantee"><span aria-hidden="true">✓</span>{price.guarantee}</p>}
                  <div className="price"><strong>{price.price}</strong><span>/{price.note}</span></div>
                  <ul>{price.rows.map((row) => <li key={row}>{row}</li>)}</ul>
                  <a className={price.featured ? "button button-primary full" : "button button-dark full"} href={price.href}>
                    {price.creator ? "Start the Creator Kit" : price.podcast ? "Book the Podcast Starter Kit" : "Check availability"}
                  </a>
                </article>
              ))}
            </div>
            <p className="pricing-note">The Podcast and Creator Starter Kits share the same session rates. Custom backdrops and advanced graphics are quoted separately.</p>
          </div>
        </section>

        <section className="section location-section" id="location">
          <div className="container location-grid">
            <div className="location-copy">
              <p className="eyebrow">Midtown Manhattan</p>
              <h2>A professional setting in a convenient location.</h2>
              <p>Record at 1345 Avenue of the Americas, 2nd Floor—near Bryant Park, Rockefeller Center, Times Square, Grand Central and major subway lines.</p>
              <div className="button-row">
                <a className="button button-dark" href="/book">Book the studio</a>
                <a className="button button-outline" href="tel:+12149036838">Call (214) 903-6838</a>
              </div>
            </div>
            <div className="location-images">
              <img src="/assets/building.webp" alt="1345 Avenue of the Americas building exterior" loading="lazy" />
              <img src="/assets/midtown.webp" alt="Midtown Manhattan near VIRGO Podcast Studio" loading="lazy" />
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-grid">
            <div><p className="eyebrow">Before you book</p><h2>A few helpful answers.</h2></div>
            <div className="faq-list">
              <details><summary>How fast will I receive my video?</summary><p>Videos recorded in the studio are delivered in less than 24 hours. Larger packages or advanced graphics may need a custom timeline.</p></details>
              <details><summary>Can a remote guest join?</summary><p>Yes. We can bring a remote guest into the conversation with clean audio and video.</p></details>
              <details><summary>What is the Podcast Starter Kit?</summary><p>It combines a studio recording, a polished full episode, vertical social edits and a managed launch designed to introduce your podcast to real viewers.</p></details>
              <details><summary>How does the 100-viewer guarantee work?</summary><p>We guarantee at least 100 combined organic views across the short-form launch clips included with your Podcast Starter Kit within 30 days of the first post. If we miss that mark, we refund your Podcast Starter Kit fee. Final deliverables are confirmed in your booking agreement.</p></details>
            </div>
          </div>
        </section>

        <section className="final-cta" id="contact">
          <div className="container final-cta-inner">
            <p className="eyebrow light">Your next video starts here</p>
            <h2>Bring the idea.<br />Share it with the world.</h2>
            <p>Choose a package, see live studio availability and reserve a time directly through the VIRGO booking calendar.</p>
            <div className="button-row centered-buttons">
              <a className="button button-primary" href="/book">Book now</a>
              <a className="button button-ghost" href="/work">See recent work</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
