import { Footer, Header } from "./site-chrome";

const packages = [
  {
    eyebrow: "Record",
    title: "Studio session",
    description: "Professional recording with an on-site producer. Leave with the raw footage.",
    price: "$75",
    rows: ["2 hours — $125", "Half day — $200", "Full day — $350"],
  },
  {
    eyebrow: "Most popular",
    title: "Ready to publish",
    description: "Studio recording plus a polished, upload-ready episode delivered in less than 24 hours.",
    price: "$125",
    rows: ["2 hours — $175", "Half day — $250", "Full day — $395"],
    featured: true,
  },
  {
    eyebrow: "For podcasters",
    title: "Podcast Starter Kit",
    description: "A finished episode, vertical social edits and a managed launch backed by our viewer guarantee.",
    price: "$160",
    rows: ["2 hours — $250", "Half day — $350", "Full day — $550"],
    guarantee: "100 real viewers—or your money back",
  },
  {
    eyebrow: "For creators",
    title: "Creator Starter Kit",
    description: "Studio recording, finished social content and a VIRGO-managed distribution plan.",
    price: "$160",
    rows: ["2 hours — $250", "Half day — $350", "Full day — $550"],
  },
];

const technology = [
  ["Three-camera coverage", "A Sony camera system gives conversations, interviews and solo content multiple clean angles."],
  ["Shure SM7B microphones", "Warm, close sound with individual tracks for a more precise edit."],
  ["RØDECaster Pro II", "A professional audio console for multitrack recording and remote guests."],
  ["ATEM live switching", "Real-time camera control that keeps production efficient and organized."],
  ["Amaran studio lighting", "Soft, camera-ready light designed to flatter people—not flatten them."],
  ["Customizable set", "Bring your own elements or build a repeatable branded look with us."],
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
            alt="VIRGO Podcast Studio set with two blue chairs, professional microphones and a central screen"
          />
          <div className="hero-shade" />
          <div className="container hero-content">
            <p className="eyebrow light">Midtown Manhattan · Record, publish, grow</p>
            <h1>Make the episode.<br />Build the audience.</h1>
            <p className="hero-copy">
              A producer-supported podcast studio for people who want professional sound,
              polished video and content that keeps working after the recording ends.
            </p>
            <div className="button-row">
              <a className="button button-primary" href="/book">View packages &amp; book <span aria-hidden="true">→</span></a>
              <a className="button button-ghost" href="/work">Watch our work <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="container proof-strip" aria-label="Studio highlights">
            <div><strong>3 cameras</strong><span>professional coverage</span></div>
            <div><strong>&lt;24 hours</strong><span>edited delivery</span></div>
            <div><strong>Broadcast audio</strong><span>individual tracks</span></div>
            <div><strong>Midtown</strong><span>producer included</span></div>
          </div>
        </section>

        <section className="section pricing-section" id="packages">
          <div className="container">
            <div className="section-heading centered-heading">
              <p className="eyebrow">Packages for every stage</p>
              <h2>Choose what you want to walk away with.</h2>
              <p>Book the room, leave with a finished episode or turn one recording into a complete launch.</p>
            </div>
            <div className="pricing-grid pricing-grid-four">
              {packages.map((item) => (
                <article className={item.featured ? "price-card featured" : "price-card"} key={item.title}>
                  <p className="price-eyebrow">{item.eyebrow}</p>
                  <h3>{item.title}</h3>
                  <p className="price-description">{item.description}</p>
                  {item.guarantee && <p className="price-guarantee"><span aria-hidden="true">✓</span>{item.guarantee}</p>}
                  <div className="price"><strong>{item.price}</strong><span>/one hour</span></div>
                  <ul>{item.rows.map((row) => <li key={row}>{row}</li>)}</ul>
                  <a className={item.featured ? "button button-primary full" : "button button-dark full"} href="/book">
                    See times &amp; book
                  </a>
                </article>
              ))}
            </div>
            <p className="pricing-note">The Podcast and Creator Starter Kits share the same session rates. Custom sets, advanced graphics and additional deliverables are quoted separately.</p>
          </div>
        </section>

        <section className="section audience-home" id="audience">
          <div className="container">
            <div className="audience-home-intro">
              <div>
                <p className="eyebrow light">Audience Growth Lab</p>
                <h2>Know what to improve next.</h2>
              </div>
              <div>
                <p>Views tell you what happened. Retention, click-through and returning viewers help explain why. Our new guide turns those signals into practical changes for your next episode.</p>
                <a className="text-link text-link-light" href="/audience-growth">Open the audience growth guide <span aria-hidden="true">→</span></a>
              </div>
            </div>
            <div className="metric-card-grid">
              <article><span>01</span><strong>Packaging</strong><h3>Earn the click.</h3><p>Use impressions and click-through rate to sharpen titles, thumbnails and the promise of each episode.</p></article>
              <article><span>02</span><strong>Retention</strong><h3>Hold attention.</h3><p>Read the first-minute drop and retention curve to find slow openings, detours and standout moments.</p></article>
              <article><span>03</span><strong>Loyalty</strong><h3>Build the return.</h3><p>Track returning viewers and subscriber conversion to learn which formats create a lasting audience.</p></article>
            </div>
            <div className="audience-proof-row">
              <figure>
                <img src="/assets/creator-results-views.webp" alt="VIRGO channel analytics showing 3.6 thousand views" loading="lazy" />
                <figcaption><strong>3.6K views</strong><span>A recent VIRGO channel result</span></figcaption>
              </figure>
              <figure>
                <img src="/assets/podcast-starter-kit-results.webp" alt="YouTube Studio analytics showing 3,246 views and 125 watch hours" loading="lazy" />
                <figcaption><strong>3,246 views · 125 watch hours</strong><span>Measured across a recent 28-day period</span></figcaption>
              </figure>
            </div>
            <p className="results-disclaimer">These are real examples of prior performance, not a promise of identical results. The guide focuses on the signals you can use to make better creative decisions.</p>
          </div>
        </section>

        <section className="section work-showcase" id="work">
          <div className="container">
            <div className="section-heading split-heading">
              <div><p className="eyebrow">Selected work</p><h2>See the work—not just the claims.</h2></div>
              <p>Full conversations and the short clips built to travel, all shaped around clear sound, strong pacing and a reason to keep watching.</p>
            </div>
            <div className="clip-grid">
              <article className="clip-card clip-card-vertical">
                <video controls preload="metadata" poster="/posters/matas-buzelis.jpg" playsInline>
                  <source src="/videos/matas-buzelis-reel.mp4" type="video/mp4" />
                </video>
                <div><p>Sports analysis · vertical edit</p><h3>Matas Buzelis: shooting &amp; versatility</h3><span>Data graphics · captions · hook edit</span></div>
              </article>
              <article className="clip-card clip-card-vertical">
                <video controls preload="metadata" poster="/posters/ai-physical-world.jpg" playsInline>
                  <source src="/videos/ai-physical-world-reel.mp4" type="video/mp4" />
                </video>
                <div><p>Technology podcast · vertical edit</p><h3>AI Enters the Physical World</h3><span>Supporting visuals · captions · story edit</span></div>
              </article>
              <article className="clip-card clip-card-wide">
                <iframe
                  src="https://www.youtube.com/embed/j0mB_KZjdDA"
                  title="2025 NBA Redraft produced by VIRGO Podcast Studio"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <div><p>Sports podcast · full episode</p><h3>2025 NBA Redraft</h3><span>Multi-camera edit · audio polish · screen inserts</span></div>
              </article>
            </div>
            <div className="centered-action"><a className="text-link" href="/work">Explore the full portfolio <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>

        <section className="section technology-section" id="technology">
          <div className="container technology-layout">
            <div className="technology-visual">
              <img src="/assets/studio-camera-bts-2026.webp" alt="Sony camera recording the VIRGO Podcast Studio set" loading="lazy" />
              <div><strong>Built for the conversation.</strong><span>Your producer runs the room while you stay present.</span></div>
            </div>
            <div className="technology-copy">
              <p className="eyebrow light">State-of-the-art production</p>
              <h2>A professional system, ready when you walk in.</h2>
              <p className="technology-lead">Every piece of the room is chosen to make recording feel simple while giving the final edit more control.</p>
              <div className="technology-grid">
                {technology.map(([title, copy], index) => (
                  <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div></article>
                ))}
              </div>
              <a className="button button-primary" href="/book">Book the studio <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section className="section location-section" id="location">
          <div className="container location-map-grid">
            <div className="location-copy">
              <p className="eyebrow">Midtown Manhattan</p>
              <h2>Easy to reach. Ready to record.</h2>
              <p>Visit VIRGO at 1345 Avenue of the Americas, 2nd Floor, New York, NY—near Rockefeller Center, Bryant Park, Times Square, Grand Central and major subway lines.</p>
              <div className="address-block"><span>VIRGO Podcast Studio</span><strong>1345 Avenue of the Americas<br />2nd Floor · New York, NY</strong></div>
              <div className="button-row">
                <a className="button button-dark" href="https://www.google.com/maps/dir/?api=1&destination=1345+Avenue+of+the+Americas,+New+York,+NY+10105" target="_blank" rel="noreferrer">Get Google Maps directions <span aria-hidden="true">↗</span></a>
                <a className="button button-outline" href="tel:+12149036838">Call (214) 903-6838</a>
              </div>
            </div>
            <div className="map-frame">
              <iframe
                title="Google Map showing VIRGO Podcast Studio at 1345 Avenue of the Americas"
                src="https://www.google.com/maps?q=1345+Avenue+of+the+Americas,+New+York,+NY+10105&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-grid">
            <div><p className="eyebrow">Before you book</p><h2>Questions, answered.</h2></div>
            <div className="faq-list">
              <details><summary>What is included in a studio session?</summary><p>An on-site producer, three-camera recording, broadcast microphones, studio lighting and multitrack audio are included. The Studio Session package provides raw footage; editing is included in the other packages.</p></details>
              <details><summary>How fast will I receive my finished episode?</summary><p>Ready-to-publish videos recorded in the studio are delivered in less than 24 hours. Larger packages, custom sets or advanced graphics may need a custom timeline.</p></details>
              <details><summary>Can a remote guest join?</summary><p>Yes. The studio can bring a remote guest into the conversation and capture clean audio and video for the edit.</p></details>
              <details><summary>What should I bring?</summary><p>Bring your topic, any notes you want nearby and brand assets you would like included. We handle the cameras, microphones, lighting and production.</p></details>
              <details><summary>What is the Podcast Starter Kit?</summary><p>It combines recording, a polished full episode, vertical social clips and a managed launch designed to introduce the show to real viewers.</p></details>
              <details><summary>Can the set match my brand?</summary><p>Yes. Use the VIRGO set as it is, bring approved elements or ask about a custom repeatable set. Design, installation and storage are quoted by scope.</p></details>
            </div>
          </div>
        </section>

        <section className="home-therapy-spotlight" id="podcast-therapy">
          <div className="container home-therapy-grid">
            <figure className="home-therapy-visual">
              <img src="/assets/podcast-therapy-listening-space.webp" alt="A guest reflecting during a conversation in the VIRGO recording studio" loading="lazy" />
              <figcaption>Speak without rushing. Keep it private or choose to share.</figcaption>
            </figure>
            <div className="home-therapy-copy">
              <p className="eyebrow light">Podcast Therapy</p>
              <h2>Give what is on your mind somewhere to go.</h2>
              <p className="home-therapy-lead">A guided, non-clinical wellness experience built around reflection, self-expression and telling your story in a professionally produced podcast.</p>
              <p>Take time to put a meaningful part of your life into words. Your episode can remain completely private or be shaped into something you choose to share.</p>
              <div className="button-row">
                <a className="button button-primary" href="/podcast-therapy">Explore Podcast Therapy <span aria-hidden="true">→</span></a>
                <a className="button button-ghost" href="mailto:ezraberke@virgopodcast.com?subject=Podcast%20Therapy%20question">Ask about the experience</a>
              </div>
              <p className="home-therapy-note">A creative wellness and storytelling service—not mental-health treatment.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
