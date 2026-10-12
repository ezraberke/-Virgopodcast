import { Footer, Header } from "./site-chrome";
import { BOOKING_EMAIL } from "../lib/contact";
import { BOOKING_PAGE } from "../lib/booking-links";

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

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="refresh-home">
        <section className="intro-section" id="top">
          <div className="container intro-grid">
            <div className="intro-copy">
              <p className="eyebrow">Podcast &amp; video studio · Midtown NYC</p>
              <h1>Great stories<br />start here<span>.</span></h1>
              <p className="intro-lead">A comfortable room. A dedicated producer. Everything you need to record your next great conversation.</p>
              <div className="button-row">
                <a className="button button-primary" href={BOOKING_PAGE}>Book a session <span aria-hidden="true">↗</span></a>
                <a className="text-link" href="#packages">Explore packages <span aria-hidden="true">↓</span></a>
              </div>
              <p className="pay-note">Pay on site on the day of your session.</p>
            </div>
            <figure className="intro-photo">
              <img src="/assets/studio-lounge-october-2026.webp" alt="The current VIRGO studio: two blue armchairs, a gray sofa, microphones and a cream coffee table against softly lit black curtains" width="1448" height="1086" fetchPriority="high" />
              <figcaption><span>Your seat is waiting.</span><span>1345 Avenue of the Americas · 2nd Floor</span></figcaption>
            </figure>
          </div>
          <div className="container studio-facts" aria-label="Studio highlights">
            <div><strong>3 cameras</strong><span>Every conversation, covered</span></div>
            <div><strong>Producer included</strong><span>We handle the technical side</span></div>
            <div><strong>From $75 / hour</strong><span>Choose the support you need</span></div>
            <div><strong>Under 24 hours</strong><span>Ready-to-publish episode delivery</span></div>
          </div>
        </section>

        <section className="section studio-section" id="studio">
          <div className="container studio-grid">
            <figure className="studio-detail"><img src="/assets/studio-detail-october-2026.webp" alt="A closer look at VIRGO's blue armchair, studio microphone, branded monitor and bookshelf" width="1086" height="1448" loading="lazy" /><figcaption>The studio, as it is today.</figcaption></figure>
            <div className="studio-copy" id="technology">
              <p className="eyebrow">Settle in. Press record.</p>
              <h2>You bring the ideas.<br />We run the room.</h2>
              <p>Record interviews, podcasts and creator content in a relaxed Midtown studio. Your producer handles the cameras, sound and lighting, so you can stay in the conversation.</p>
              <dl className="equipment-list">
                <div><dt>Picture</dt><dd>Three Sony cameras and Amaran studio lighting.</dd></div>
                <div><dt>Sound</dt><dd>Shure SM7B microphones, RØDECaster Pro II and individual audio tracks.</dd></div>
                <div><dt>Production</dt><dd>ATEM live switching, remote guest support and an on-site producer.</dd></div>
                <div><dt>Your look</dt><dd>Use our lounge set or ask about a setup that fits your brand.</dd></div>
              </dl>
              <a className="text-link" href={BOOKING_EMAIL}>Tell us what you’re making <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="section pricing-section" id="packages">
          <div className="container">
            <div className="section-heading price-heading"><div><p className="eyebrow">Clear options. Personal support.</p><h2>Record. Publish. Grow.</h2></div><p>Start with the room. Add the editing and launch support you need.</p></div>
            <div className="payment-banner"><strong>Book with Google Calendar. Pay on site.</strong><span>Choose an available time and your package. Payment is due at the studio on the day of your session.</span></div>
            <div className="pricing-grid pricing-grid-four">
              {packages.map((item) => (
                <article className={item.featured ? "price-card featured" : "price-card"} key={item.title}>
                  <p className="price-eyebrow">{item.eyebrow}</p><h3>{item.title}</h3>
                  <p className="price-description">{item.description}</p>
                  <div className="price"><strong>{item.price}</strong><span>/ one hour</span></div>
                  <ul>{item.rows.map((row) => <li key={row}>{row}</li>)}</ul>
                  {item.guarantee && <p className="price-guarantee">{item.guarantee}</p>}
                  <a className={item.featured ? "button button-primary full" : "button button-outline full"} href={BOOKING_PAGE}>Choose a time <span aria-hidden="true">↗</span></a>
                </article>
              ))}
            </div>
            <p className="pricing-note">Custom sets, advanced graphics and additional deliverables are quoted separately. One-hour sessions book directly in Google Calendar. Email us for longer sessions.</p>
          </div>
        </section>

        <section className="section address-section" id="location">
          <div className="container address-grid">
            <figure className="building-photo"><img src="/assets/1345-avenue-of-the-americas.jpg" alt="1345 Avenue of the Americas, the Midtown Manhattan building that houses VIRGO Podcast Studio" width="387" height="516" loading="lazy" /><figcaption>1345 Avenue of the Americas, New York City</figcaption></figure>
            <div className="address-copy">
              <p className="eyebrow light">A little television history</p>
              <h2>Film your podcast from<br />the heart of New York.</h2>
              <p className="office-lead">In the same building as Dunder Mifflin HQ in <em>The Office.</em></p>
              <p>Record at 1345 Avenue of the Americas—the building whose exterior appeared as Dunder Mifflin’s corporate headquarters. A familiar New York address, with a studio ready for your own show.</p>
              <div className="visit-address"><strong>VIRGO Podcast Studio</strong><span>1345 Avenue of the Americas<br />2nd Floor · New York, NY 10105</span></div>
              <div className="button-row"><a className="button button-primary" href="https://www.google.com/maps/dir/?api=1&destination=1345+Avenue+of+the+Americas,+New+York,+NY+10105" target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a><a className="text-link text-link-light" href={BOOKING_PAGE}>Book your visit <span aria-hidden="true">↗</span></a></div>
              <a className="location-source" href="https://sites.google.com/site/theofficefilmlocations/home/season-5" target="_blank" rel="noreferrer">The location in “The Duel” · Season 5 ↗</a>
            </div>
          </div>
        </section>

        <section className="section work-showcase" id="work">
          <div className="container">
            <div className="section-heading price-heading"><div><p className="eyebrow">Made with VIRGO</p><h2>From conversation<br />to content.</h2></div><a className="text-link" href="/work">Explore our work <span aria-hidden="true">↗</span></a></div>
            <div className="clip-grid">
              <article className="clip-card clip-card-vertical"><video controls preload="none" poster="/posters/matas-buzelis.jpg" playsInline aria-label="Matas Buzelis sports analysis reel"><source src="/videos/matas-buzelis-reel.mp4" type="video/mp4" /></video><div><p>Sports · vertical edit</p><h3>Matas Buzelis</h3><span>Data graphics, captions &amp; hook edit</span></div></article>
              <article className="clip-card clip-card-vertical"><video controls preload="none" poster="/posters/ai-physical-world.jpg" playsInline aria-label="AI Enters the Physical World podcast reel"><source src="/videos/ai-physical-world-reel.mp4" type="video/mp4" /></video><div><p>Technology · vertical edit</p><h3>AI Enters the Physical World</h3><span>Supporting visuals &amp; story edit</span></div></article>
              <article className="clip-card clip-card-wide"><iframe src="https://www.youtube.com/embed/j0mB_KZjdDA" title="2025 NBA Redraft produced by VIRGO Podcast Studio" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /><div><p>Sports · full episode</p><h3>2025 NBA Redraft</h3><span>Multi-camera edit &amp; audio polish</span></div></article>
            </div>
            <div className="explore-more"><article id="audience"><p className="eyebrow">After you publish</p><h3>Build your audience.</h3><p>Turn titles, thumbnails and retention data into practical ideas for your next episode.</p><a className="text-link" href="/audience-growth">Explore the Audience Growth Lab ↗</a></article><article id="podcast-therapy"><p className="eyebrow">A space to reflect</p><h3>Tell your own story.</h3><p>Explore Podcast Therapy, our guided, non-clinical storytelling and wellness experience.</p><a className="text-link" href="/podcast-therapy">Explore Podcast Therapy ↗</a></article></div>
          </div>
        </section>

        <section className="section faq-section" id="faq"><div className="container faq-grid"><div><p className="eyebrow">Before your session</p><h2>A few good<br />questions.</h2></div><div className="faq-list">
          <details open><summary>How do I book and pay?</summary><p>Choose “Book a session” to see available one-hour appointments in Google Calendar. Select your time and enter your package and contact details; Google sends your confirmation. For a two-hour, half-day or full-day session, email ezraberke@virgopodcast.com to arrange the full recording time. Pay on site on the day of your session; there is no online checkout.</p></details>
          <details><summary>What comes with a studio session?</summary><p>Your session includes an on-site producer, three-camera recording, microphones, studio lighting and multitrack audio. Studio Session includes raw footage; the other packages include editing.</p></details>
          <details><summary>When will I receive my edited episode?</summary><p>Ready-to-publish videos recorded in the studio are delivered in less than 24 hours. Larger packages, custom sets and advanced graphics may need a custom timeline.</p></details>
          <details><summary>Can a remote guest join?</summary><p>Yes. We can bring a remote guest into the conversation and capture audio and video for the edit. Email us ahead of your session so we can prepare.</p></details>
          <details><summary>What should I bring?</summary><p>Bring your topic, notes and any brand assets you’d like included. We handle the cameras, microphones, lighting and production.</p></details>
        </div></div></section>
        <section className="ready-section"><div className="container ready-inner"><div><p className="eyebrow">Let’s make something worth hearing.</p><h2>Your next episode.<br />Make time for it.</h2></div><div><a className="button button-primary" href={BOOKING_PAGE}>Book your session <span aria-hidden="true">↗</span></a><p>Pay on site, on the day.</p><a className="email-address" href={BOOKING_EMAIL}>ezraberke@virgopodcast.com</a></div></div></section>
      </main>
      <Footer />
    </>
  );
}
