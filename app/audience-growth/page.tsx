import type { Metadata } from "next";
import { Footer, Header } from "../site-chrome";

export const metadata: Metadata = {
  title: "Podcast Audience Growth Guide | VIRGO Podcast Studio",
  description: "Learn how to use click-through rate, audience retention, watch time and returning viewers to make stronger podcast episodes and social clips.",
};

const signals = [
  {
    number: "01",
    label: "Packaging",
    title: "Impressions and click-through rate",
    meaning: "Whether the title and thumbnail make the right people curious enough to start.",
    action: "Make one clear promise. Put the strongest tension, outcome or recognizable idea first, then make the thumbnail add information instead of repeating the title.",
  },
  {
    number: "02",
    label: "Opening",
    title: "First-minute retention",
    meaning: "Whether the episode quickly delivers what the title and thumbnail promised.",
    action: "Lead with the most useful or surprising moment, trim housekeeping and tell viewers why this conversation is worth their time before the long introduction.",
  },
  {
    number: "03",
    label: "Pacing",
    title: "Audience-retention curve",
    meaning: "Where attention drops, holds or jumps during the episode.",
    action: "Review the sharpest dips and peaks. Cut repeated points, clarify confusing sections and turn the moments people replay into short-form clips or future topics.",
  },
  {
    number: "04",
    label: "Depth",
    title: "Watch time and percentage viewed",
    meaning: "How much total attention the episode earns and how completely people consume it.",
    action: "Compare episodes of similar length. Use chapters, visual changes and clear transitions to reset attention without interrupting the conversation.",
  },
  {
    number: "05",
    label: "Loyalty",
    title: "Returning viewers",
    meaning: "Whether people who found you once choose to come back.",
    action: "Repeat the formats, questions and topic clusters that create return visits. Give the audience a predictable reason to expect the next episode.",
  },
  {
    number: "06",
    label: "Conversion",
    title: "Subscribers and next-step clicks",
    meaning: "Whether attention becomes an ongoing relationship or meaningful action.",
    action: "Use one relevant call to action at the moment of highest value. Ask for the next step that naturally follows the conversation rather than listing every option.",
  },
];

export default function AudienceGrowthPage() {
  return (
    <>
      <Header />
      <main className="growth-page">
        <section className="growth-hero">
          <div className="container growth-hero-grid">
            <div>
              <p className="eyebrow light">VIRGO Audience Growth Lab</p>
              <h1>Turn the numbers into a better next episode.</h1>
              <p>Analytics are most useful when they change a creative decision. Use this guide to connect the signals in your dashboard to your title, opening, pacing and follow-up content.</p>
              <div className="button-row">
                <a className="button button-primary" href="#signal-guide">Read the signal guide <span aria-hidden="true">↓</span></a>
                <a className="button button-ghost" href="/book">Build a launch with VIRGO <span aria-hidden="true">→</span></a>
              </div>
            </div>
            <div className="growth-hero-scorecard" aria-label="Audience growth framework">
              <p>THE GROWTH LOOP</p>
              <ol>
                <li><span>01</span><strong>Earn the click</strong></li>
                <li><span>02</span><strong>Reward attention</strong></li>
                <li><span>03</span><strong>Create the return</strong></li>
              </ol>
              <small>Measure → learn → improve → repeat</small>
            </div>
          </div>
        </section>

        <section className="section growth-orientation">
          <div className="container growth-orientation-grid">
            <div><p className="eyebrow">Start with the question</p><h2>Do not chase every number at once.</h2></div>
            <div>
              <p className="lead">Choose the metric that matches the problem you are trying to solve.</p>
              <ul className="check-list">
                <li>Not enough people start? Review packaging and click-through.</li>
                <li>People start but leave early? Review the opening and retention curve.</li>
                <li>Good episode, little loyalty? Review returning viewers and the next-step invitation.</li>
                <li>Short clips get attention but do not lift the show? Connect each clip to one clear full-episode promise.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section signal-guide" id="signal-guide">
          <div className="container">
            <div className="section-heading split-heading">
              <div><p className="eyebrow light">Six signals that matter</p><h2>What the metric can teach you.</h2></div>
              <p>Benchmarks vary by platform, topic, format and audience size. The most useful comparison is usually your own recent work against similar episodes.</p>
            </div>
            <div className="signal-list">
              {signals.map((signal) => (
                <article key={signal.number}>
                  <span>{signal.number}</span>
                  <div><p>{signal.label}</p><h3>{signal.title}</h3></div>
                  <div><strong>What it tells you</strong><p>{signal.meaning}</p></div>
                  <div><strong>What to try next</strong><p>{signal.action}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section growth-proof">
          <div className="container">
            <div className="section-heading split-heading">
              <div><p className="eyebrow">Real VIRGO results</p><h2>Measure the work after it leaves the studio.</h2></div>
              <p>Production quality matters. So do the packaging, launch plan and follow-through that put the finished work in front of an audience.</p>
            </div>
            <div className="audience-proof-row audience-proof-row-light">
              <figure>
                <img src="/assets/creator-results-views.webp" alt="VIRGO channel analytics showing 3.6 thousand views" />
                <figcaption><strong>3.6K views</strong><span>3.4K above that channel&apos;s usual performance at the time captured</span></figcaption>
              </figure>
              <figure>
                <img src="/assets/podcast-starter-kit-results.webp" alt="YouTube Studio analytics showing 3,246 views, 125 watch hours and 8 subscribers" />
                <figcaption><strong>3,246 views · 125 watch hours</strong><span>Recent 28-day channel performance at the time captured</span></figcaption>
              </figure>
            </div>
            <p className="results-disclaimer results-disclaimer-dark">These screenshots document prior channel performance and do not guarantee identical results for another show.</p>
          </div>
        </section>

        <section className="section growth-rhythm">
          <div className="container">
            <div className="section-heading centered-heading">
              <p className="eyebrow">A simple review rhythm</p>
              <h2>Use the data without letting it run the show.</h2>
            </div>
            <div className="growth-rhythm-grid">
              <article><span>After 48 hours</span><h3>Check the promise.</h3><p>Look at impressions, click-through and early retention. Confirm that the packaging and opening match.</p></article>
              <article><span>After 7 days</span><h3>Find the moments.</h3><p>Review peaks, dips, comments and search terms. Pull the moments with the strongest response into your clip plan.</p></article>
              <article><span>After 28 days</span><h3>Choose the pattern.</h3><p>Compare similar episodes. Repeat the topic, format or distribution move that created meaningful attention and return visits.</p></article>
            </div>
          </div>
        </section>

        <section className="final-cta growth-cta">
          <div className="container final-cta-inner">
            <p className="eyebrow light">From dashboard to recording plan</p>
            <h2>Build the next episode around what your audience is telling you.</h2>
            <p>The Podcast Starter Kit combines studio production, finished social clips and a managed launch so the learning continues after the record button stops.</p>
            <div className="button-row centered-buttons">
              <a className="button button-primary" href="/book#podcast-starter-kit">Book the Podcast Starter Kit</a>
              <a className="button button-ghost" href="/work">See recent work</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
