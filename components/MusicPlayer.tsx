"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { KIND_LABEL, SITE, TRACKS, TrackKind, fmtDuration, fmtMonth, fmtPlays, scWidget, trackUrl } from "@/lib/site";
import { PlayIcon } from "./Icons";
import { Eq, PulseRings, Vinyl } from "./Motion";

type Filter = "all" | TrackKind;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "original", label: "Originals" },
  { id: "edit", label: "Edits" },
  { id: "mix", label: "DJ Mixes" },
];

export default function MusicPlayer({ initial = "papi" }: { initial?: string }) {
  const [slug, setSlug] = useState(initial);
  const [autoplay, setAutoplay] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const playerRef = useRef<HTMLElement>(null);

  const current = TRACKS.find((t) => t.slug === slug) ?? TRACKS[0];
  const meta = `${KIND_LABEL[current.kind]} · ${fmtMonth(current.date)} · ${fmtDuration(current.durationMs)} · ${fmtPlays(current.plays)} plays`;

  // Deep links like /music#mob
  useEffect(() => {
    const fromHash = () => {
      const h = decodeURIComponent(location.hash.slice(1));
      if (TRACKS.some((t) => t.slug === h)) {
        setSlug(h);
        setAutoplay(false);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const play = (s: string) => {
    setSlug(s);
    setAutoplay(true);
    history.replaceState(null, "", `#${s}`);
    if (window.innerWidth < 860) playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section className="section--tight" id="player" ref={playerRef}>
        <div className="wrap player-wrap">
          <div className="now-playing reveal">
            <div className="np-deck">
              <div style={{ position: "relative" }}>
                <PulseRings />
                <Vinyl label={current.art} />
              </div>
              <div>
                <span className="eyebrow">Now spinning &nbsp;<Eq bars={4} /></span>
                <h2>{current.title}</h2>
              </div>
            </div>
            <div className="meta">{meta}</div>
            <p>{current.desc}</p>
            <div className="actions">
              <a className="btn btn--red" href={trackUrl(current)} target="_blank" rel="noopener">Open on SoundCloud</a>
              <Link className="btn" href="/book">Book this sound</Link>
            </div>
          </div>
          <iframe
            key={current.slug + String(autoplay)}
            className="player-frame reveal"
            allow="autoplay; encrypted-media"
            title={`SoundCloud player: ${current.title}`}
            src={scWidget(trackUrl(current), { visual: true, autoplay })}
          />
        </div>
      </section>

      <section className="section" id="tracks">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">Every release</span>
              <h2>Press play</h2>
            </div>
            <div className="filters" role="group" aria-label="Filter tracks">
              {FILTERS.map((f) => (
                <button key={f.id} className="filter" type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tracks">
            {TRACKS.map((t) => {
              const on = t.slug === current.slug;
              return (
                <article key={t.slug} id={t.slug} className={`track reveal${on ? " is-playing" : ""}`} hidden={filter !== "all" && filter !== t.kind}>
                  <div className="track-art">
                    <Vinyl label={t.art} />
                    <div className="sleeve-img">
                      <Image src={t.art} alt={`${t.title} cover art`} fill sizes="(max-width: 600px) 100vw, 320px" />
                    </div>
                    <span className="track-kind">{KIND_LABEL[t.kind]}</span>
                    <span className="now-eq"><Eq bars={4} /></span>
                    <button className="play" type="button" aria-pressed={on} aria-label={`Play ${t.title}`} onClick={() => play(t.slug)}>
                      <PlayIcon />
                    </button>
                  </div>
                  <div className="track-body">
                    <h3>{t.title}</h3>
                    <p>{t.desc}</p>
                    <div className="track-meta">
                      <span><time dateTime={t.date}>{fmtMonth(t.date)}</time></span>
                      <span>{fmtDuration(t.durationMs)}</span>
                      <span><b>{fmtPlays(t.plays)}</b> plays</span>
                      <span><b>{t.likes}</b> likes</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="wrap">
          <div className="note-bar reveal">
            <p><strong>Want a download or the extended version?</strong> <span className="muted">Follow and DM @3true4 on Instagram or TikTok.</span></p>
            <div className="hero-ctas">
              <a className="btn" href={SITE.instagram} target="_blank" rel="noopener">Instagram</a>
              <a className="btn" href={SITE.tiktok} target="_blank" rel="noopener">TikTok</a>
              <a className="btn btn--red" href={SITE.soundcloud} target="_blank" rel="noopener">Follow on SoundCloud</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
