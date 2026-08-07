import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../site-chrome";

export const metadata: Metadata = {
  title: "Our Work | VIRGO Podcast Studio",
  description: "Watch podcast, educational and social video work created by VIRGO Podcast Studio in Midtown Manhattan.",
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <main className="work-page">
        <section className="work-hero">
          <div className="container work-hero-inner">
            <p className="eyebrow light">Our work</p>
            <h1>Stories designed for the full episode and the feed.</h1>
            <p>Long-form conversations, focused lessons and short-form social edits—recorded and finished with the same attention to sound, pacing and presentation.</p>
          </div>
        </section>

        <section className="section social-portfolio" id="social-work">
          <div className="container">
            <div className="section-heading split-heading">
              <div><p className="eyebrow">Recent social work</p><h2>Built to stop the scroll.</h2></div>
              <p>Vertical edits combine the speaker’s strongest take with captions, data and supporting visuals—without losing the voice that made the moment worth sharing.</p>
            </div>
            <div className="reel-showcase-grid">
              <article className="reel-case" id="buzelis-reel">
                <div className="phone-frame">
                  <video controls preload="metadata" playsInline poster="/posters/matas-buzelis.jpg">
                    <source src="/videos/matas-buzelis-reel.mp4" type="video/mp4" />
                    Your browser does not support HTML video.
                  </video>
                </div>
                <div className="reel-case-copy">
                  <p className="eyebrow light">Sports analysis · 00:41</p>
                  <h2>Matas Buzelis: shooting & versatility</h2>
                  <p>A concise NBA analysis edit combining a strong take with Basketball Savant data, game imagery and a clean vertical composition.</p>
                  <ul className="tag-list tag-list-dark"><li>Hook edit</li><li>Data graphics</li><li>Captions</li><li>Vertical master</li></ul>
                </div>
              </article>
              <article className="reel-case reel-case-reverse" id="ai-reel">
                <div className="phone-frame">
                  <video controls preload="metadata" playsInline poster="/posters/ai-physical-world.jpg">
                    <source src="/videos/ai-physical-world-reel.mp4" type="video/mp4" />
                    Your browser does not support HTML video.
                  </video>
                </div>
                <div className="reel-case-copy">
                  <p className="eyebrow light">Technology podcast · 01:04</p>
                  <h2>AI Enters the Physical World</h2>
                  <p>A thought-leadership moment shaped for the feed with tighter pacing, supporting visuals, deliberate framing and readable captions.</p>
                  <ul className="tag-list tag-list-dark"><li>Story edit</li><li>B-roll</li><li>Captions</li><li>Platform delivery</li></ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section portfolio-section">
          <div className="container">
            <article className="portfolio-item" id="nba-redraft">
              <div className="portfolio-copy">
                <p className="eyebrow">Sports podcast · 45:02</p>
                <h2>2025 NBA Redraft</h2>
                <p>A full-length sports conversation shaped into a cleaner, faster episode with stronger pacing, polished sound, screen inserts and a finished visual identity.</p>
                <ul className="tag-list"><li>Multi-camera edit</li><li>Audio cleanup</li><li>Screen inserts</li><li>Intro & outro</li></ul>
              </div>
              <div className="portfolio-player">
                <iframe
                  src="https://www.youtube.com/embed/j0mB_KZjdDA"
                  title="2025 NBA Redraft"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </article>

            <article className="portfolio-item reverse" id="bible-lesson">
              <div className="portfolio-copy">
                <p className="eyebrow">Educational video · 16:04</p>
                <h2>Lessons in Bible #3</h2>
                <p>A screen-led lesson refined for clarity and focus, with tightened dead time, balanced audio, gentle transitions and a professional opening and close.</p>
                <ul className="tag-list"><li>Pacing cleanup</li><li>Audio polish</li><li>Transitions</li><li>Delivery master</li></ul>
              </div>
              <div className="portfolio-player">
                <video controls preload="metadata" poster="/posters/bible-lesson.jpg" playsInline>
                  <source src="/videos/lessons-in-bible-3.mp4" type="video/mp4" />
                  Your browser does not support HTML video.
                </video>
              </div>
            </article>
          </div>
        </section>

        <section className="work-principles">
          <div className="container">
            <p className="eyebrow">What every project gets</p>
            <div className="principle-grid">
              <article><span>Listen</span><h3>The story leads.</h3><p>We protect the strongest ideas and remove what gets in their way.</p></article>
              <article><span>Refine</span><h3>The details matter.</h3><p>Sound, color, pacing, captions and graphics should feel like one system.</p></article>
              <article><span>Deliver</span><h3>Your idea stays current.</h3><p>In-studio videos are finished in less than 24 hours so you can share them while the conversation is still moving.</p></article>
            </div>
          </div>
        </section>

        <section className="final-cta work-cta">
          <div className="container final-cta-inner">
            <p className="eyebrow light">Let’s make yours next</p>
            <h2>Reserve the room. Build the story.</h2>
            <p>Choose your package and reserve a time directly through the live studio calendar.</p>
            <div className="button-row centered-buttons">
              <Link className="button button-primary" href="/book">Book the studio</Link>
              <Link className="button button-ghost" href="/#pricing">Compare packages</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
