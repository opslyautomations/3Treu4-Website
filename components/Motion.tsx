// Small, server-safe music motifs. All animation lives in CSS and is locked to --beat.
import Image from "next/image";

export function Eq({ bars = 4, large = false, className = "" }: { bars?: number; large?: boolean; className?: string }) {
  return (
    <span className={`eq${large ? " eq--lg" : ""} ${className}`} aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => <i key={i} />)}
    </span>
  );
}

export function BeatLeds({ bpm }: { bpm: number }) {
  return (
    <span className="bpm">
      <span className="leds" aria-hidden="true"><i /><i /><i /><i /></span>
      <span><b>{bpm}</b> BPM &middot; 4/4</span>
    </span>
  );
}

export function PulseRings() {
  return <span className="pulse-rings" aria-hidden="true"><i /><i /></span>;
}

export function Vinyl({ label, alt = "", priority = false }: { label: string; alt?: string; priority?: boolean }) {
  return (
    <div className="vinyl" aria-hidden={alt ? undefined : true}>
      <div className="disc">
        <div className="label">
          <Image src={label} alt={alt} fill sizes="200px" priority={priority} />
        </div>
      </div>
      <div className="shine" />
    </div>
  );
}

export function Tonearm() {
  return (
    <div className="tonearm" aria-hidden="true">
      <svg viewBox="0 0 120 220" fill="none">
        <circle cx="94" cy="26" r="20" fill="#1c1c1c" stroke="#3a3a3a" strokeWidth="2" />
        <circle cx="94" cy="26" r="8" fill="#9b968d" />
        <path d="M94 26 L88 150 L58 196" stroke="#cfcac1" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="40" y="188" width="30" height="18" rx="3" transform="rotate(-32 55 197)" fill="#e0261b" />
      </svg>
    </div>
  );
}

// Deterministic pseudo-random so server and client markup always match.
function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

export function Waveform({ bars = 140, seed = 7, label = "3True4 — Papi", right = "124 BPM" }: { bars?: number; seed?: number; label?: string; right?: string }) {
  const rnd = seeded(seed);
  const w = 1000 / bars;
  const heights = Array.from({ length: bars }, (_, i) => {
    // kick-shaped envelope every 8 bars + noise, like a real house track overview
    const beatShape = 0.55 + 0.45 * Math.abs(Math.sin((i / bars) * Math.PI * 6));
    return Math.max(0.12, Math.min(1, beatShape * (0.5 + rnd() * 0.6)));
  });
  return (
    <div className="wave-wrap" aria-hidden="true">
      <svg className="wave" viewBox="0 0 1000 80" preserveAspectRatio="none">
        {heights.map((h, i) => (
          <rect
            key={i}
            x={i * w + w * 0.2}
            y={40 - h * 38}
            width={w * 0.6}
            height={h * 76}
            rx={1}
            fill="currentColor"
            opacity={0.55}
            style={{ animationDelay: `calc(var(--beat) * ${-((i * 7) % 16) / 4})` }}
          />
        ))}
      </svg>
      <span className="playhead" />
      <div className="wave-meta wrap"><span>{label}</span><span>{right}</span></div>
    </div>
  );
}
