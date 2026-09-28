import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import CtaBand from "@/components/CtaBand";
import { IgIcon, MailIcon, PlayIcon, TtIcon } from "@/components/Icons";
import Mixer from "@/components/Mixer";
import { BeatLeds, Eq } from "@/components/Motion";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book 3True4 | House & Tech House DJs for Clubs, Bars & Events",
  description:
    "Book 3True4, a Los Angeles house and tech house DJ act, for club nights, bar takeovers, private parties and brand events across LA and Orange County.",
  alternates: { canonical: "/book" },
};

const I = {
  club: <svg className="icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="20" cy="20" r="15" /><circle cx="20" cy="20" r="4" /><path d="M20 5v6M20 29v6M5 20h6M29 20h6" /></svg>,
  bar: <svg className="icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6h24l-12 15z" /><path d="M20 21v12M13 34h14" /></svg>,
  private: <svg className="icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18 20 7l14 11v15H6z" /><path d="M16 33v-9h8v9" /></svg>,
  brand: <svg className="icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 4l4.5 10 10.5 1-8 7 2.5 11L20 27.5 10.5 33 13 22l-8-7 10.5-1z" /></svg>,
};

const EVENTS = [
  { type: "club", title: "Club Nights", text: "Peak-time tech house, dark grooves and heavy bounce. Solo sets or B2B." },
  { type: "bar", title: "Bars & Lounges", text: "Weekly nights, industry nights and takeovers that keep the room moving till close." },
  { type: "private", title: "Private Events", text: "Birthdays, house parties and celebrations, with the set shaped around your crowd." },
  { type: "brand", title: "Brands & Pop-ups", text: "Launches, activations and day parties that need a sound with some edge." },
] as const;

const FAQ = [
  { q: "What kind of music do you play?", a: <>House and tech house are home base: dark grooves, rolling low end, heavy bounce. We also mix in techno, Latin house and minimal, and can go open format with hip-hop and R&amp;B blends. Check out the <Link href="/music#live-sandbar-mix">Live Sandbar Mix</Link> to hear that side.</> },
  { q: "Where are you based, and do you travel?", a: <>We&apos;re based in Los Angeles and play regularly across LA and Orange County. For events further out, include the location in your inquiry and we&apos;ll work out the details.</> },
  { q: "How far ahead should I book?", a: <>The earlier the better, especially for weekends. Send an inquiry as soon as you have a date and we&apos;ll confirm availability.</> },
  { q: "Do you bring your own equipment?", a: <>Let us know what the venue already has (sound system, decks, booth) in the form, and we&apos;ll sort out the setup together when we reply.</> },
  { q: "Can we request songs or a specific vibe?", a: <>Absolutely. Tell us about your crowd and any must-plays or no-plays. We&apos;ll build the set around your night while keeping the energy where it needs to be.</> },
  { q: "Do you play B2B or with other DJs?", a: <>Yes. We&apos;ve done B2B nights with DJ Jurassick at Woody&apos;s Wharf and shared lineups at District Orange. Let us know who else is on the bill.</> },
];

export default function BookPage() {
  return (
    <>
      <section className="page-hero">
        <div className="beams" aria-hidden="true"><span /><span /><span /></div>
        <div className="wrap has-art">
          <div>
            <BeatLeds bpm={SITE.bpm} />
            <div style={{ marginTop: 14 }}><span className="eyebrow">Booking &amp; Inquiries</span></div>
            <h1>Book<br /><span className="red">3True4</span></h1>
            <p className="lede">From LA to Orange County and beyond. Tell us about your night and we&apos;ll get back to you with availability.</p>
            <div className="hero-ctas" style={{ marginTop: 32 }}>
              <a className="btn btn--red" href="#inquiry">Start your inquiry <span className="arrow">&darr;</span></a>
              <a className="btn" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
          </div>
          <Mixer />
        </div>
      </section>

      <section className="section" id="events">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">What we play</span>
              <h2>Built for<br />your room</h2>
            </div>
            <p className="muted" style={{ maxWidth: "40ch", margin: 0 }}>House and tech house at the core, with Latin house, minimal, and hip-hop/R&amp;B blends ready when the crowd wants them.</p>
          </div>
          <div className="events reveal">
            {EVENTS.map((e, i) => (
              <Link key={e.type} className="event" href={`/book?type=${e.type}#inquiry`} scroll={false} style={{ textDecoration: "none" }}>
                <span className="strip" aria-hidden="true">{Array.from({ length: 10 }, (_, j) => <i key={j} />)}</span>
                <span className="ch-no">CH 0{i + 1}</span>
                {I[e.type]}
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">How it works</span>
              <h2>Three steps<br />to the floor</h2>
            </div>
          </div>
          <div className="steps">
            <div className="step reveal"><h3>Send the details</h3><p>Fill out the form below with your date, venue and the kind of night you&apos;re planning.</p></div>
            <div className="step reveal"><h3>We lock it in</h3><p>We&apos;ll reply with availability and rates, then go over set length, gear and logistics with you.</p></div>
            <div className="step reveal"><h3>We bring the bass</h3><p>Show up, turn up. We&apos;ll read the room and build the night from the first track to the last.</p></div>
          </div>
        </div>
      </section>

      <section className="section section--line" id="inquiry">
        <div className="wrap book-grid">
          <div>
            <div className="reveal" style={{ marginBottom: 40 }}>
              <span className="eyebrow">Inquiry form</span>
              <h2 style={{ marginTop: 18 }}>Tell us about<br />your night</h2>
            </div>
            <Suspense fallback={null}>
              <BookingForm />
            </Suspense>
          </div>

          <aside className="aside reveal">
            <div className="card">
              <h3>Direct line</h3>
              <p>Rather skip the form? Reach us directly and we&apos;ll get back to you.</p>
              <a className="contact-link" href={`mailto:${SITE.email}`}><MailIcon /> {SITE.email}</a>
              <a className="contact-link" href={SITE.instagram} target="_blank" rel="noopener"><IgIcon size={20} /> DM @3true4 on Instagram</a>
              <a className="contact-link" href={SITE.tiktok} target="_blank" rel="noopener"><TtIcon size={20} /> @3true4 on TikTok</a>
            </div>
            <div className="card">
              <h3>Recent rooms <Eq bars={4} /></h3>
              <p>Woody&apos;s Wharf &middot; Newport Beach<br />District &middot; Orange<br />Sandbar &middot; Huntington Beach</p>
              <Link className="contact-link" href="/music#live-sandbar-mix"><PlayIcon /> Hear the Live Sandbar Mix</Link>
            </div>
            <div className="card card--red">
              <h3>Based in LA</h3>
              <p>Regularly playing across Los Angeles and Orange County. Out-of-town dates welcome, just ask.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--line" id="faq">
        <div className="wrap">
          <div className="section-head reveal"><div><span className="eyebrow">FAQ</span><h2>Good to know</h2></div></div>
          <div className="faq reveal">
            {FAQ.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="See you on the floor." text="Got a date in mind? Send it over and let's make it one to remember." />
    </>
  );
}
