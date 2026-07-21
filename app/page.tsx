import { Footer, Header } from "./site-chrome";

const services = [
  {
    number: "01",
    title: "Podcast & video recording",
    copy: "Producer-supported sessions with professional sound, two-camera video, studio lighting and room for a remote guest.",
  },
  {
    number: "02",
    title: "Professional editing",
    copy: "Audio cleanup, thoughtful camera switching, color, titles, intros and a finished episode that feels intentional.",
  },
  {
    number: "03",
    title: "Social media cutdowns",
    copy: "Captioned vertical edits for YouTube Shorts, Reels, TikTok and LinkedIn—built to hold attention from the first frame.",
  },
  {
    number: "04",
    title: "Corporate video",
    copy: "Interviews, testimonials, training, presentations and internal communications in a calm, professional setting.",
  },
];

const prices = [
  {
    eyebrow: "Record",
    title: "Studio session",
    description: "Professional recording with an on-site producer. You leave with the raw footage.",
    price: "$75",
    note: "one hour",
    rows: ["2 hours — $125", "Half day — $200", "Full day — $350"],
  },
  {
    eyebrow: "Most popular",
    title: "Ready to publish",
    description: "Studio session plus a professionally edited, upload-ready episode delivered in less than 24 hours.",
    price: "$125",
    note: "one hour",
    rows: ["2 hours — $175", "Half day — $250", "Full day — $395"],
    featured: true,
  },
  {
    eyebrow: "Grow",
    title: "Episode + social",
    description: "A polished full episode plus vertical social edits that turn one recording into more content.",
    price: "$160",
    note: "one hour",
    rows: ["2 hours — $250", "Half day — $350", "Full day — $550"],
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
            src="/assets/studio-hero.webp"
            alt="VIRGO Podcast Studio recording set with two blue chairs and professional microphones"
          />
          <div className="hero-shade" />
          <div className="container hero-content">
            <p className="eyebrow light">Midtown Manhattan · Podcast & video production</p>
            <h1>Make what you do best<br />look its best.</h1>
            <p className="hero-copy">
              Walk in with an idea. Leave with professionally recorded content—and a
              polished final video in less than 24 hours.
            </p>
            <div className="button-row">
              <a className="button button-primary" href="/work">See our work <span aria-hidden="true">↗</span></a>
              <a className="button button-ghost" href="tel:+12149036838">Free consultation <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="container proof-strip" aria-label="Studio highlights">
            <div><strong>&lt;24 hr</strong><span>edited delivery</span></div>
            <div><strong>2 cameras</strong><span>professional coverage</span></div>
            <div><strong>On site</strong><span>producer included</span></div>
            <div><strong>Free</strong><span>phone consultation</span></div>
          </div>
        </section>

        <section className="section work-teaser" id="work">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2>See what care looks like.</h2>
              </div>
              <p>
                From long-form conversations to focused lessons and sharp social cutdowns,
                every edit is shaped around the story—not a template.
              </p>
            </div>
            <div className="project-grid">
              <a className="project-card project-card-wide" href="/work#nba-redraft">
                <div className="project-image-wrap">
                  <img src="/posters/nba-redraft.jpg" alt="2025 NBA Redraft podcast thumbnail" />
                  <span className="play-disc" aria-hidden="true">▶</span>
                </div>
                <div className="project-meta">
                  <div><span>Sports podcast</span><h3>2025 NBA Redraft</h3></div>
                  <p>Multi-camera edit · audio polish · graphics · 45 min</p>
                </div>
              </a>
              <a className="project-card" href="/work#bible-lesson">
                <div className="project-image-wrap project-image-scripture">
                  <img src="/posters/bible-lesson.jpg" alt="Genesis 18 scripture used in Lessons in Bible number 3" />
                  <span className="play-disc" aria-hidden="true">▶</span>
                </div>
                <div className="project-meta">
                  <div><span>Educational video</span><h3>Lessons in Bible #3</h3></div>
                  <p>Screen-led lesson · cleanup · pacing · 16 min</p>
                </div>
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
              <img className="image-main" src="/assets/behind-scenes.webp" alt="Cameras and lighting behind the scenes at VIRGO Podcast Studio" />
              <div className="image-note"><span>1345</span>Avenue of the Americas<br />2nd Floor</div>
            </div>
            <div className="story-copy">
              <p className="eyebrow">The actual studio</p>
              <h2>Comfortable in the room. Confident on camera.</h2>
              <p className="lead">
                VIRGO is a calm Midtown recording room—not a cold soundstage. Settle into
                the conversation while your producer handles the technical details.
              </p>
              <ul className="check-list">
                <li>Two-camera podcast and interview recording</li>
                <li>Broadcast microphones and multitrack audio</li>
                <li>Studio lighting and live production support</li>
                <li>Up to two in-studio speakers plus a remote guest</li>
              </ul>
              <a className="text-link" href="tel:+12149036838">Talk through your idea <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section className="section process-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow light">A smoother way to publish</p>
              <h2 className="light">One studio. One team.<br />One finished story.</h2>
            </div>
            <div className="process-grid">
              <article><span>01</span><h3>Plan</h3><p>Start with a free call to shape the format, look and deliverables.</p></article>
              <article><span>02</span><h3>Record</h3><p>Arrive, get comfortable and let an on-site producer run the room.</p></article>
              <article><span>03</span><h3>Polish</h3><p>We clean the sound, refine the pacing, switch cameras and finish the visual story.</p></article>
              <article><span>04</span><h3>Publish</h3><p>Receive ready-to-upload files in less than 24 hours for in-studio recordings.</p></article>
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading split-heading">
              <div><p className="eyebrow">Services</p><h2>Everything your content needs.</h2></div>
              <p>Choose a recording session, a finished episode or a full content package. We can meet you wherever your idea is.</p>
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
              <p className="eyebrow light">Made for momentum</p>
              <h2>Recorded today.<br />Ready tomorrow.</h2>
            </div>
            <div className="delivery-number"><strong>&lt;24</strong><span>hour delivery for videos<br />recorded in studio</span></div>
          </div>
        </section>

        <section className="section pricing-section" id="pricing">
          <div className="container">
            <div className="section-heading centered-heading">
              <p className="eyebrow">Straightforward pricing</p>
              <h2>Choose how finished you want it.</h2>
              <p>No surprise production maze. Pick a starting point and we’ll tailor the details to your project.</p>
            </div>
            <div className="pricing-grid">
              {prices.map((price) => (
                <article className={price.featured ? "price-card featured" : "price-card"} key={price.title}>
                  <p className="price-eyebrow">{price.eyebrow}</p>
                  <h3>{price.title}</h3>
                  <p className="price-description">{price.description}</p>
                  <div className="price"><strong>{price.price}</strong><span>/{price.note}</span></div>
                  <ul>{price.rows.map((row) => <li key={row}>{row}</li>)}</ul>
                  <a className={price.featured ? "button button-primary full" : "button button-dark full"} href={`mailto:ezraberke@virgopodcast.com?subject=${encodeURIComponent(price.title)}`}>Ask about this package</a>
                </article>
              ))}
            </div>
            <p className="pricing-note">Custom backdrops, advanced graphics, extra social clips and specialized corporate productions may require a custom quote.</p>
          </div>
        </section>

        <section className="section brand-section" id="backdrops">
          <div className="container">
            <div className="section-heading split-heading">
              <div><p className="eyebrow">Your show, your identity</p><h2>A backdrop that belongs to your brand.</h2></div>
              <p>Change the tone without changing studios. We can tailor the visual environment to feel warm, executive, modern or distinctly yours.</p>
            </div>
            <div className="backdrop-grid">
              <figure><img src="/assets/backdrop-executive.webp" alt="Executive wood slat podcast backdrop" /><figcaption><strong>Executive wood slat</strong><span>Warm, polished, corporate-ready</span></figcaption></figure>
              <figure><img src="/assets/backdrop-moss.webp" alt="Living moss wall podcast backdrop" /><figcaption><strong>Living moss wall</strong><span>Fresh, modern, brand-friendly</span></figcaption></figure>
            </div>
          </div>
        </section>

        <section className="section location-section" id="location">
          <div className="container location-grid">
            <div className="location-copy">
              <p className="eyebrow">Midtown Manhattan</p>
              <h2>A professional setting in a convenient location.</h2>
              <p>Record at 1345 Avenue of the Americas, 2nd Floor—near Bryant Park, Rockefeller Center, Times Square, Grand Central and major subway lines.</p>
              <div className="button-row">
                <a className="button button-dark" href="tel:+12149036838">Call (214) 903-6838</a>
                <a className="button button-outline" href="mailto:ezraberke@virgopodcast.com">Email the studio</a>
              </div>
            </div>
            <div className="location-images">
              <img src="/assets/building.webp" alt="1345 Avenue of the Americas building exterior" />
              <img src="/assets/midtown.webp" alt="Midtown Manhattan near VIRGO Podcast Studio" />
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-grid">
            <div><p className="eyebrow">Before you book</p><h2>A few helpful answers.</h2></div>
            <div className="faq-list">
              <details><summary>How fast will I receive my video?</summary><p>Videos recorded in the studio are delivered in less than 24 hours. Larger packages or advanced graphics may need a custom timeline.</p></details>
              <details><summary>Can a third person join virtually?</summary><p>Yes. We can bring a remote guest into the conversation with clean audio and video.</p></details>
              <details><summary>Do you create social media clips?</summary><p>Yes. We make captioned vertical edits for YouTube Shorts, Instagram Reels, TikTok and LinkedIn.</p></details>
              <details><summary>How do I start?</summary><p>Call (214) 903-6838 for a free consultation or email the studio with a quick description of your idea.</p></details>
            </div>
          </div>
        </section>

        <section className="final-cta" id="contact">
          <div className="container final-cta-inner">
            <p className="eyebrow light">Your next video starts here</p>
            <h2>Bring the idea.<br />We’ll help finish the story.</h2>
            <p>Free consultations by phone. Tell us what you want to make and we’ll map out the simplest path to a finished video.</p>
            <div className="button-row centered-buttons">
              <a className="button button-primary" href="tel:+12149036838">Call (214) 903-6838</a>
              <a className="button button-ghost" href="mailto:ezraberke@virgopodcast.com?subject=Free%20VIRGO%20Studio%20Consultation">Email the studio</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
