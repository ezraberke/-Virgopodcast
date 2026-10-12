import type { Metadata } from "next";
import { Footer, Header } from "../site-chrome";
import { BOOKING_PAGE } from "../../lib/booking-links";
import { bookingEmail } from "../../lib/contact";

export const metadata: Metadata = {
  title: "Podcast Therapy | Your Story, Your Voice | VIRGO",
  description: "A guided, non-clinical storytelling experience at VIRGO Podcast Studio in Midtown NYC. Keep your episode private or choose to share it. Open seven days a week.",
};

export default function PodcastTherapyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="refresh-home story-page">
        <section className="story-hero">
          <div className="container story-hero-grid">
            <div className="story-hero-copy">
              <p className="eyebrow">Podcast Therapy · At VIRGO</p>
              <h1>Your story.<br />Room to<br /><span>be heard.</span></h1>
              <p className="story-lead">A guided conversation about the moments that make you, you.</p>
              <p>Take a seat, slow down and put your story into words. A VIRGO producer guides the conversation and handles the recording, so you can focus on what you want to say.</p>
              <div className="button-row"><a className="button button-primary" href={BOOKING_PAGE}>Book your session <span aria-hidden="true">↗</span></a><a className="text-link" href="#how-it-works">How it works ↓</a></div>
              <p className="pay-note">Open every day, including weekends. Pay on site, day of.</p>
            </div>
            <figure className="story-hero-photo"><img src="/assets/studio-detail-october-2026.webp" alt="A blue armchair beside a studio microphone, warm lamp and bookshelf in the current VIRGO studio" width="1086" height="1448" fetchPriority="high" /><figcaption>A comfortable room. A thoughtful conversation. Your voice.</figcaption></figure>
          </div>
          <div className="container story-principles"><span>Producer-guided conversation</span><span>No podcast experience needed</span><span>You decide what gets shared</span></div>
        </section>

        <section className="section story-introduction">
          <div className="container story-intro-grid"><div><p className="eyebrow">Make space for your story</p><h2>Some things deserve<br />to be said out loud.</h2></div><div><p className="story-lead">A chapter of your life. A memory you want to keep. Something you’ve been meaning to say.</p><p>You don’t need a script or an audience. Come with an idea, a few notes, or a story you want to explore. We help you find a starting point and follow the conversation from there.</p><p>Podcast Therapy is a creative storytelling and wellness experience guided by a producer. It is a non-clinical service.</p></div></div>
        </section>

        <section className="section story-choice">
          <div className="container"><div className="section-heading price-heading"><div><p className="eyebrow">Your voice. Your choice.</p><h2>Keep it close.<br />Or let it connect.</h2></div><p>Nothing is published without your final approval.</p></div>
            <div className="story-choice-grid"><article><span className="story-number">01 / Just for you</span><h3>A personal keepsake.</h3><p>Preserve a memory, reflect on a turning point, or record a message for someone you love. Keep the recording for yourself or share it with the people you choose. VIRGO will not publish your private episode.</p></article><article><span className="story-number">02 / Ready to share</span><h3>A story with an audience.</h3><p>Give your perspective a place to live beyond the studio. Choose an edited package, review the finished episode and decide what you’re comfortable releasing. You have the final say.</p></article></div>
          </div>
        </section>

        <section className="section story-process" id="how-it-works"><div className="container">
          <div className="section-heading"><p className="eyebrow">How it works</p><h2>We’ll help you find<br />your starting point.</h2></div>
          <div className="story-steps"><article><span className="story-number">01</span><h3>Set the intention.</h3><p>Tell us what you’d like to talk about. We plan a loose direction and thoughtful prompts, with plenty of room to follow your story.</p></article><article><span className="story-number">02</span><h3>Have the conversation.</h3><p>Settle into the studio while your producer guides the session and handles cameras, sound and lighting. Reserve one hour online, or email us for more time.</p></article><article><span className="story-number">03</span><h3>Make it yours.</h3><p>Receive the recording or finished edit included in your chosen package. Decide whether it stays personal or becomes something you share.</p></article></div>
          <figure className="story-room"><img src="/assets/studio-lounge-october-2026.webp" alt="VIRGO’s current recording lounge with a gray sofa, two blue armchairs, microphones and a cream coffee table" width="1448" height="1086" loading="lazy" /><figcaption>This is where your conversation begins. Our Midtown studio, as it is today.</figcaption></figure>
        </div></section>

        <section className="section story-details"><div className="container story-intro-grid"><div><p className="eyebrow">The support behind your story</p><h2>You talk.<br />We take care<br />of the recording.</h2></div><div><dl className="equipment-list"><div><dt>Before</dt><dd>Story planning and prompts shaped around what you want to express.</dd></div><div><dt>In the room</dt><dd>A producer-guided conversation, professional cameras, microphones and studio lighting.</dd></div><div><dt>After</dt><dd>Your recording, with professional editing and optional social clips available through our production packages.</dd></div><div><dt>Always</dt><dd>Your approval before anything is published by VIRGO.</dd></div></dl><a className="text-link" href="/#packages">Compare recording &amp; editing packages ↗</a></div></div></section>

        <section className="section faq-section"><div className="container faq-grid"><div><p className="eyebrow">Before you settle in</p><h2>A few good<br />questions.</h2></div><div className="faq-list">
          <details open><summary>How do I book Podcast Therapy?</summary><p>Choose an available one-hour session in Google Calendar. Enter your production package and add “Podcast Therapy” in the session-format field. Ready to Publish ($125 for one hour) includes a finished episode; Studio Session ($75 for one hour) includes raw footage. We’ll follow up to plan the conversation. Pay at the studio on the day.</p></details>
          <details><summary>Do I need podcast experience?</summary><p>No. Your producer helps prepare the conversation and guides the recording. You can bring notes, but you don’t need to rehearse or read from a script.</p></details>
          <details><summary>Does my episode have to be published?</summary><p>No. Your episode can stay private. If you choose to share it, VIRGO will only publish after you have reviewed and approved the final edit.</p></details>
          <details><summary>Can I book on the weekend or record for longer?</summary><p>Yes. We’re open Monday–Sunday, 9 a.m.–6 p.m. New York time. The calendar shows available one-hour sessions. For 90 minutes or longer, <a href={bookingEmail("Longer Podcast Therapy session")}>email Ezra to arrange the full recording time</a>.</p></details>
          <details><summary>Is this psychotherapy or counseling?</summary><p>No. Podcast Therapy is a non-clinical storytelling and recording service guided by a producer, not a licensed therapist. It is not psychotherapy, counseling, medical care, crisis support, or a substitute for care from a licensed professional. VIRGO does not diagnose or treat mental-health conditions.</p></details>
        </div></div></section>

        <section className="ready-section"><div className="container ready-inner"><div><p className="eyebrow">Make space for what matters</p><h2>Your story is<br />a good place to start.</h2></div><div><a className="button button-primary" href={BOOKING_PAGE}>Book Podcast Therapy <span aria-hidden="true">↗</span></a><p>Choose “Podcast Therapy” as your session format.<br />Pay on site, on the day.</p><a className="email-address" href={bookingEmail("Podcast Therapy question")}>Ask Ezra a question</a></div></div></section>
      </main>
      <Footer />
    </>
  );
}
