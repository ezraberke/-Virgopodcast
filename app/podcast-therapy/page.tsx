import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../site-chrome";

export const metadata: Metadata = {
  title: "Podcast Therapy Wellness Experience | VIRGO",
  description:
    "A guided, non-clinical wellness experience built around reflection, self-expression, and telling your story in a professionally produced podcast.",
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
              <p className="eyebrow light">A creative wellness service</p>
              <h1>A wellness experience built around your story.</h1>
              <p className="therapy-hero-lead">
                Slow down, reflect, and put a meaningful part of your life into words. Podcast
                Therapy combines guided conversation, creative self-expression, and professional
                production—with complete control over whether your episode stays private or is shared.
              </p>
              <div className="button-row">
                <Link className="button button-primary" href={bookingLink}>
                  Book a wellness session <span aria-hidden="true">→</span>
                </Link>
                <a className="button button-ghost" href="#how-it-works">
                  See how it works
                </a>
              </div>
              <p className="therapy-hero-note">
                A non-clinical wellness and storytelling service—not mental-health treatment.
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
              <p className="eyebrow">Wellness through storytelling</p>
              <h2>A place to pause, reflect, and express yourself.</h2>
            </div>
            <div className="therapy-intro-copy">
              <p className="lead">
                Sometimes telling a chapter of your life out loud can help you see it more
                clearly. A VIRGO producer creates space for reflection, asks thoughtful prompts,
                and helps shape the conversation into a meaningful creative experience.
              </p>
              <p>
                Come with a fully formed idea or simply a part of your life you want to explore.
                We help you turn reflection into an episode that feels considered, honest, and
                unmistakably yours—without presenting the session as clinical care.
              </p>
            </div>
          </div>
        </section>

        <section className="section therapy-options" aria-labelledby="therapy-options-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow light">Choose your wellness experience</p>
                <h2 id="therapy-options-title">Reflect privately or share your story.</h2>
              </div>
              <p>You decide what happens after the recording. Nothing is published without your final approval.</p>
            </div>
            <div className="therapy-option-grid">
              <article>
                <span>01</span>
                <p className="therapy-option-label">Private reflection experience</p>
                <h3>Create something just for you.</h3>
                <p>
                  Record a personal episode that VIRGO does not publish. Use the studio and
                  guided conversation to reflect on a transition, preserve a memory, celebrate
                  growth, or put something meaningful into words.
                </p>
              </article>
              <article>
                <span>02</span>
                <p className="therapy-option-label">Shared storytelling experience</p>
                <h3>Turn your perspective into connection.</h3>
                <p>
                  Shape your reflections into a polished episode that can encourage, entertain,
                  or connect with other people. You approve the final edit before anything is released.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section therapy-process" id="how-it-works">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">How it works</p>
              <h2>A simple, supported creative process.</h2>
            </div>
            <div className="therapy-process-grid">
              <article>
                <span>01</span>
                <h3>Set an intention</h3>
                <p>Tell us what you want to reflect on or express. We create a loose arc and prompts so you never have to perform from a script.</p>
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
              <p className="eyebrow">Your wellness experience includes</p>
              <h2>Time, space, and creative support for your story.</h2>
              <ul className="check-list">
                <li>Pre-session story planning</li>
                <li>60–90 minute studio recording</li>
                <li>Producer-guided prompts</li>
                <li>Professional audio and video edit</li>
                <li>Final approval before publication</li>
                <li>Optional social clips</li>
              </ul>
              <Link className="button button-dark" href={bookingLink}>Plan my wellness session</Link>
            </div>
          </div>
        </section>

        <section className="therapy-boundary" aria-labelledby="therapy-boundary-title">
          <div className="container therapy-boundary-grid">
            <p className="eyebrow light">A clear boundary</p>
            <div>
              <h2 id="therapy-boundary-title">Creative wellness, with a clear boundary.</h2>
              <p>
                Podcast Therapy is a non-clinical wellness, storytelling, and recording service.
                It is not psychotherapy, counseling, medical care, crisis support, or a substitute
                for care from a licensed professional. VIRGO Podcast Studio does not diagnose or
                treat mental-health conditions. Sessions are guided by a producer and story
                facilitator, not a licensed therapist.
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
                <p>No. Podcast Therapy is a creative wellness and storytelling service guided by a producer. It is not psychotherapy, counseling, or a substitute for professional mental-health care.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="final-cta therapy-cta">
          <div className="container final-cta-inner">
            <p className="eyebrow light">Make space for your story</p>
            <h2>Book a creative wellness experience that sounds like you.</h2>
            <p>Reserve a studio time, then we&apos;ll follow up to set your intention, plan the conversation, and choose the level of privacy that feels right.</p>
            <div className="button-row centered-buttons">
              <Link className="button button-primary" href={bookingLink}>Book my wellness session</Link>
              <a className="button button-ghost" href="mailto:ezraberke@virgopodcast.com?subject=Podcast%20Therapy%20question">Ask a question first</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
