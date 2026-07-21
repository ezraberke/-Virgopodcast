import type { Metadata } from "next";
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
            <h1>Every frame should feel considered.</h1>
            <p>Long-form conversations, focused lessons and short-form social edits—recorded and finished with the same attention to sound, pacing and presentation.</p>
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

        <section className="section short-showcase" id="social-work">
          <div className="container short-grid">
            <div className="short-copy">
              <p className="eyebrow light">Built for the feed</p>
              <h2>One conversation can become your next week of content.</h2>
              <p>We turn strong moments into vertical edits with bold captions, supporting visuals and a hook that lands quickly—ready for YouTube Shorts, Reels, TikTok and LinkedIn.</p>
              <div className="short-title"><span>Recent social edit</span><strong>Revisiting the Jazz decision to take Ace #5</strong></div>
              <div className="button-row">
                <a className="button button-primary" href="https://youtube.com/shorts/vuSSE7D7Bwg" target="_blank" rel="noreferrer">Watch on YouTube</a>
                <a className="button button-ghost" href="tel:+12149036838">Plan your content package</a>
              </div>
            </div>
            <div className="phone-frame">
              <video controls preload="metadata" playsInline>
                <source src="/videos/ace-bailey-short.mp4" type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            </div>
          </div>
        </section>

        <section className="work-principles">
          <div className="container">
            <p className="eyebrow">What every project gets</p>
            <div className="principle-grid">
              <article><span>Listen</span><h3>The story leads.</h3><p>We protect the strongest ideas and remove what gets in their way.</p></article>
              <article><span>Refine</span><h3>The details matter.</h3><p>Sound, color, pacing, captions and graphics should feel like one system.</p></article>
              <article><span>Deliver</span><h3>Momentum matters too.</h3><p>In-studio videos are finished in less than 24 hours so your idea stays current.</p></article>
            </div>
          </div>
        </section>

        <section className="final-cta work-cta">
          <div className="container final-cta-inner">
            <p className="eyebrow light">Let’s make yours next</p>
            <h2>A polished video can start with one free call.</h2>
            <p>Tell us what you want to record, where it needs to live and how quickly you need it.</p>
            <div className="button-row centered-buttons">
              <a className="button button-primary" href="tel:+12149036838">Call (214) 903-6838</a>
              <a className="button button-ghost" href="mailto:ezraberke@virgopodcast.com?subject=VIRGO%20Video%20Project">Email the studio</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
