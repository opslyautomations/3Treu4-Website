import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import CtaBand from "@/components/CtaBand";
import { IgIcon } from "@/components/Icons";
import { BeatLeds, Eq, PulseRings, Tonearm, Vinyl, Waveform } from "@/components/Motion";
import StepSequencer from "@/components/StepSequencer";
import { IG_POSTS, MIX_HOURS, RELEASES_2026, SITE, TOTAL_PLAYS, VENUES, fmtDuration, fmtMonth, fmtPlays, getTrack, scWidget, trackUrl } from "@/lib/site";

const MARQUEE = ["Papi", "Like That", "MOB", "Deep State", "Mind", "Rock With You", "Woody's Wharf", "District Orange", "Sandbar"];

export default function Home() {
  const papi = getTrack("papi");

  return (
    <>
      <section className="hero">
        <div className="beams" aria-hidden="true"><span /><span /><span /></div>
        <div className="kick-glow" aria-hidden="true" />
        <div className="wrap">
          <div>
            <BeatLeds bpm={SITE.bpm} />
            <span className="eyebrow" style={{ display: "flex" }}>House / Tech House &mdash; {SITE.location}</span>
            <h1 className="hero-title" aria-label="3True4">
              {"3True".split("").map((c, i) => <span key={i} className="char" aria-hidden="true">{c}</span>)}
              <span className="char outline" aria-hidden="true">4</span>
            </h1>
            <p className="hero-sub">Dark grooves, dirty bass and straight club energy. Made for late nights, built for the dance floor.</p>
            <div className="hero-ctas">
              <Link className="btn btn--red" href="/book">Book 3True4 <span className="arrow">&rarr;</span></Link>
              <Link className="btn" href="/music">Hear the Music</Link>
            </div>
          </div>

          <div className="deck" aria-label="Now spinning: Papi">
            <div className="rings"><PulseRings /></div>
            <div className="record"><Vinyl label={papi.art} priority /></div>
            <Link className="sleeve" href="/music#papi" aria-label="Play Papi">
              <Image src={papi.art} alt="Papi cover art" width={500} height={500} priority sizes="(max-width: 1000px) 60vw, 360px" />
              <span className="tag"><Eq bars={3} /> Out now</span>
            </Link>
            <Tonearm />
          </div>
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((w, i) => <span key={i}>{w}<i>&#10038;</i></span>)}
          </div>
        </div>
      </section>

      <section className="stats" aria-label="By the numbers">
        <div className="stat"><CountUp to={Math.floor(TOTAL_PLAYS / 1000)} suffix="K+" /><span>SoundCloud plays</span><i className="meter" style={{ ["--fill" as string]: 1 }} /></div>
        <div className="stat"><CountUp to={RELEASES_2026} /><span>Releases in 2026</span><i className="meter" style={{ ["--fill" as string]: 0.7 }} /></div>
        <div className="stat"><CountUp to={papi.plays / 1000} decimals={1} suffix="K" /><span>Plays on &ldquo;Papi&rdquo;</span><i className="meter" style={{ ["--fill" as string]: 0.85 }} /></div>
        <div className="stat"><CountUp to={Math.floor(MIX_HOURS * 10) / 10} decimals={1} suffix=" HRS" /><span>Of recorded sets</span><i className="meter" style={{ ["--fill" as string]: 0.55 }} /></div>
      </section>

      <section className="section" id="about">
        <div className="wrap split">
          <figure className="about-media reveal" style={{ margin: 0 }}>
            <Image src="/img/art/deep-state-radio-edit.png" alt="3True4 under red club lights, from the Deep State artwork" width={500} height={500} sizes="(max-width: 860px) 100vw, 50vw" />
            <figcaption>Deep State &mdash; 2026</figcaption>
          </figure>
          <div className="about-copy reveal">
            <span className="eyebrow">Who we are</span>
            <h2>LA-bred.<br />Club-built.</h2>
            <p className="lede">3True4 is a Los Angeles DJ and production act living in the space between house, tech house and techno.</p>
            <p>
              We make the kind of records we want to hear at 1&nbsp;AM: rolling low end, hypnotic grooves and just enough attitude to keep it dirty. Since our first mix in 2023 we&apos;ve gone from recorded sets to a steady run of originals: <em>Mind</em>, <em>Deep State</em>, <em>MOB</em>, <em>Like That</em> and <em>Papi</em>, plus edits like our tech house flip of Michael Jackson&apos;s <em>Rock With You</em>.
            </p>
            <p>
              Behind the decks you&apos;ll find us across Orange County, from B2B nights with DJ Jurassick at Woody&apos;s Wharf to industry nights at District. We read the room, and we&apos;ll play Latin house, minimal or hip-hop and R&amp;B blends when the night calls for it.
            </p>
            <blockquote className="pull">&ldquo;Where&apos;s the f***ing bass?&rdquo;<small>&mdash; the question every set answers</small></blockquote>
            <Link className="btn" href="/music">Explore the catalog <span className="arrow">&rarr;</span></Link>
          </div>
        </div>
      </section>

      <section className="section section--line" id="groove">
        <div className="wrap seq-wrap">
          <div className="seq-copy reveal">
            <span className="eyebrow">Four on the floor</span>
            <h2 style={{ margin: "18px 0 24px" }}>Make the<br /><span className="red">groove</span></h2>
            <p className="lede">Every 3True4 record starts with the same heartbeat. Hit play, then tap the pads to build your own.</p>
            <ul>
              <li><b>Kick</b> Every beat. The pulse the whole room moves to.</li>
              <li><b>Clap</b> On two and four. Hands in the air.</li>
              <li><b>Hat</b> On the off-beat. That classic house swing.</li>
              <li><b>Bass</b> Rolling between the kicks. Where&apos;s the bass? Right here.</li>
            </ul>
          </div>
          <div className="reveal"><StepSequencer /></div>
        </div>
      </section>

      <section className="section section--line" id="latest">
        <div className="wrap release">
          <div className="release-art reveal">
            <Image src={papi.art} alt="Papi cover art" width={500} height={500} sizes="(max-width: 860px) 100vw, 45vw" />
          </div>
          <div className="release-copy reveal">
            <span className="eyebrow">Latest original &mdash; out now</span>
            <h2>Papi</h2>
            <div className="meta">{fmtMonth(papi.date)} &nbsp;/&nbsp; {fmtDuration(papi.durationMs)} &nbsp;/&nbsp; {papi.genre} &nbsp;/&nbsp; {fmtPlays(papi.plays)} plays</div>
            <p className="lede">Latin grooves. Dirty bass. Our most-played track so far, and a proper warm-up-to-peak-time weapon.</p>
            <iframe className="sc-embed" loading="lazy" allow="autoplay; encrypted-media" title="Play Papi by 3True4 on SoundCloud" src={scWidget(trackUrl(papi))} />
            <div className="hero-ctas">
              <a className="btn btn--red" href={trackUrl(papi)} target="_blank" rel="noopener">Stream on SoundCloud</a>
              <a className="btn" href={SITE.instagram} target="_blank" rel="noopener">DM for the download</a>
            </div>
          </div>
        </div>
      </section>

      <Waveform label="3True4 — Papi" right={`${SITE.bpm} BPM · A min`} />

      <section className="section" id="venues">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">Where we&apos;ve been</span>
              <h2>Rooms we&apos;ve<br />rocked</h2>
            </div>
            <p className="muted" style={{ maxWidth: "38ch", margin: 0 }}>Bangers guaranteed. Swimming discouraged. A few of the rooms and moments we&apos;ve been part of.</p>
          </div>
          <div className="venues">
            {VENUES.map((v, i) => (
              <div className="venue reveal" key={v.name}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.name}<Eq bars={4} /></h3>
                <span className="where">{v.where} &middot; {v.note}</span>
                <span className="kind">{v.kind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--line" id="instagram">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">@3true4</span>
              <h2>On the gram</h2>
            </div>
            <a className="btn" href={SITE.instagram} target="_blank" rel="noopener"><IgIcon /> Follow on Instagram</a>
          </div>
          <div className="ig-grid reveal">
            {IG_POSTS.map((p) => (
              <a key={p.src} href={SITE.instagram} target="_blank" rel="noopener" aria-label={`${p.alt} (opens Instagram)`}>
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 900px) 33vw, 16vw" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
