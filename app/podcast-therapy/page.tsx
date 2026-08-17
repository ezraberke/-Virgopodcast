import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../site-chrome";

export const metadata: Metadata = {
  title: "Podcast Therapy | Tell Your Story at VIRGO",
  description:
    "A guided, professionally produced podcast experience for telling your story—kept private or prepared to share, always on your terms.",
};

const bookingLink = "/book?experience=podcast-therapy#booking-calendar";

export default function PodcastTherapyPage() {
  return (
    <>
      <Header />
      <main className="podcast-therapy-page">
        <section className="therapy-hero">
          <div className="container therapy-hero-grid">
            <div className="therapy-hero-copy">
              <p className="eyebrow light">A personal podcast experience</p>
              <h1>Talk it out. Tell your story. Record something real.</h1>
              <p className="therapy-hero-lead">
                Create a professionally produced episode about your life, relationships,
                passions, or turning points—with thoughtful guidance from a producer and
                complete control over whether it stays private or reaches an audience.
              </p>
              <div className="button-row">
                <Link className="button button-primary" href={bookingLink}>
                  Create my episode <span aria-hidden="true">→</span>
                </Link>
                <a className="button button-ghost" href="#how-it-works">
                  See how it works
                </a>
              </div>
              <p className="therapy-hero-note">
                Creative storytelling and recording—not mental-health treatment.
              </p>
            </div>
            <figure className="therapy-hero-visual">
              <img
                src="/assets/studio-camera-bts-2026.webp"
                alt="A guest speaking into a studio microphone during a podcast recording"
              />
              <figcaption>
                <span>One room.</span>
                <strong>Your voice, your story, your choice.</strong>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section therapy-intro">
          <div className="container therapy-intro-grid">
            <div>
              <p className="eyebrow">What Podcast Therapy means here</p>
              <h2>A space to speak with intention.</h2>
            </div>
            <div className="therapy-intro-copy">
              <p className="lead">
                Sometimes the easiest way to understand a chapter of your life is to tell it
                out loud. A VIRGO producer helps you shape the conversation, asks thoughtful
                prompts, and keeps the recording moving—without turning your story into a
                clinical session.
              </p>
              <p>
                Come with a fully formed idea or simply a part of your life you want to explore.
                We help turn it into an episode that sounds considered, honest, and unmistakably
                yours.
              </p>
            </div>
          </div>
        </section>

        <section className="section therapy-options" aria-labelledby="therapy-options-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow light">Choose your comfort level</p>
                <h2 id="therapy-options-title">Private reflection or a story you share.</h2>
              </div>
              <p>You decide what happens after the recording. Nothing is published without your final approval.</p>
            </div>
            <div className="therapy-option-grid">
              <article>
                <span>01</span>
                <p className="therapy-option-label">Private reflection episode</p>
                <h3>Make it for yourself.</h3>
                <p>
                  Record a personal episode that VIRGO does not publish. Use the studio and
                  guided conversation to preserve a memory, process a turning point, or say
                  something you have wanted to put into words.
                </p>
              </article>
              <article>
                <span>02</span>
                <p className="therapy-option-label">Share your story episode</p>
                <h3>Make it for an audience.</h3>
                <p>
                  Shape your experience into a polished episode that can reach other people.
                  You review the final edit and approve it before anything is publicly released.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section therapy-process" id="how-it-works">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">How it works</p>
              <h2>We make the room feel easy.</h2>
            </div>
            <div className="therapy-process-grid">
              <article>
                <span>01</span>
                <h3>Plan the story</h3>
                <p>Tell us what you want to explore. We create a loose arc and prompts so you never have to perform from a script.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Have the conversation</h3>
                <p>Record for 60–90 minutes with a producer who listens, asks follow-ups, and helps you stay present.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Choose what happens next</h3>
                <p>We professionally edit the episode. You review it, request changes, and choose whether it stays private or gets shared.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section therapy-included">
          <div className="container two-column">
            <div className="image-stack">
              <img
                className="image-main image-main-landscape"
                src="/assets/studio-hero-2026.webp"
                alt="The VIRGO podcast studio set with two blue chairs and professional microphones"
              />
              <div className="image-note"><span>60–90</span>minutes to speak without rushing</div>
            </div>
            <div className="story-copy">
              <p className="eyebrow">Your experience includes</p>
              <h2>Guidance before, during, and after recording.</h2>
              <ul className="check-list">
                <li>Pre-session story planning</li>
                <li>60–90 minute studio recording</li>
                <li>Producer-guided prompts</li>
                <li>Professional audio and video edit</li>
                <li>Final approval before publication</li>
                <li>Optional social clips</li>
              </ul>
              <Link className="button button-dark" href={bookingLink}>Start planning my episode</Link>
            </div>
          </div>
        </section>

        <section className="therapy-boundary" aria-labelledby="therapy-boundary-title">
          <div className="container therapy-boundary-grid">
            <p className="eyebrow light">A clear boundary</p>
            <div>
              <h2 id="therapy-boundary-title">Story support, not clinical care.</h2>
              <p>
                Podcast Therapy is a creative storytelling and recording experience—not
                psychotherapy, counseling, medical care, or crisis support. VIRGO Podcast
                Studio does not diagnose or treat mental-health conditions. Your session is
                guided by a producer and story facilitator, not a licensed therapist.
              </p>
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-grid">
            <div>
              <p className="eyebrow">Good to know</p>
              <h2>Questions before you record.</h2>
            </div>
            <div className="faq-list">
              <details>
                <summary>Do I need podcast experience?</summary>
                <p>No. We prepare the conversation with you and guide the recording from start to finish.</p>
              </details>
              <details>
                <summary>Does my episode have to be published?</summary>
                <p>No. Choose the private reflection format and VIRGO will not publish the finished episode.</p>
              </details>
              <details>
                <summary>Can I change my mind about sharing?</summary>
                <p>Yes. Public release requires your final approval after you have reviewed the edit.</p>
              </details>
              <details>
                <summary>Is this a therapy or counseling session?</summary>
                <p>No. It is a producer-guided storytelling and recording experience and is not a substitute for professional mental-health care.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="final-cta therapy-cta">
          <div className="container final-cta-inner">
            <p className="eyebrow light">Your story is enough to begin</p>
            <h2>Bring the chapter. We&apos;ll help shape the episode.</h2>
            <p>Reserve a studio time now, then we&apos;ll follow up to plan the story and the level of privacy that feels right for you.</p>
            <div className="button-row centered-buttons">
              <Link className="button button-primary" href={bookingLink}>Create my episode</Link>
              <a className="button button-ghost" href="mailto:ezraberke@virgopodcast.com?subject=Podcast%20Therapy%20question">Ask a question first</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
