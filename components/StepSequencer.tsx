"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "./Icons";

type RowId = "kick" | "clap" | "hat" | "bass";
type Pattern = Record<RowId, boolean[]>;

const ROWS: { id: RowId; name: string }[] = [
  { id: "kick", name: "Kick" },
  { id: "clap", name: "Clap" },
  { id: "hat", name: "Hat" },
  { id: "bass", name: "Bass" },
];

const p = (s: string) => s.replace(/\s/g, "").split("").map((c) => c === "x");

// Four on the floor, clap on 2 & 4, open hats on the off-beat, rolling bass.
const DEFAULT: Pattern = {
  kick: p("x... x... x... x..."),
  clap: p(".... x... .... x..."),
  hat: p("..x. ..x. ..x. ..xx"),
  bass: p("..x. ..xx ..x. .xx."),
};

// A1 root with a little movement at the end of the bar
const BASS_NOTES = [55, 55, 55, 55, 55, 55, 55, 65.41, 55, 55, 55, 55, 55, 49, 65.41, 73.42];

const MIN_BPM = 110;
const MAX_BPM = 135;
const DEFAULT_BPM = 124;

const clone = (pt: Pattern): Pattern => ({ kick: [...pt.kick], clap: [...pt.clap], hat: [...pt.hat], bass: [...pt.bass] });

export default function StepSequencer() {
  const [pattern, setPattern] = useState<Pattern>(() => clone(DEFAULT));
  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [playing, setPlaying] = useState(false);
  const [now, setNow] = useState(-1);

  const patternRef = useRef(pattern);
  const bpmRef = useRef(bpm);
  const ctxRef = useRef<AudioContext | null>(null);
  const outRef = useRef<GainNode | null>(null);
  const noiseRef = useRef<AudioBuffer | null>(null);
  const timerRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const nextTimeRef = useRef(0);
  const stepRef = useRef(0);
  const queueRef = useRef<{ step: number; time: number }[]>([]);

  patternRef.current = pattern;
  bpmRef.current = bpm;

  // Keep every CSS loop on the site locked to the sequencer tempo.
  useEffect(() => {
    document.documentElement.style.setProperty("--beat", `${(60 / bpm).toFixed(4)}s`);
  }, [bpm]);
  useEffect(() => () => { document.documentElement.style.removeProperty("--beat"); }, []);

  // ---------- synth voices ----------
  const kick = (ctx: AudioContext, out: AudioNode, t: number) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    g.gain.setValueAtTime(1, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + 0.5);
  };

  const noise = (ctx: AudioContext) => {
    const src = ctx.createBufferSource();
    src.buffer = noiseRef.current;
    return src;
  };

  const clap = (ctx: AudioContext, out: AudioNode, t: number) => {
    const src = noise(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1200;
    bp.Q.value = 0.8;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    for (let i = 0; i < 3; i++) {
      g.gain.setValueAtTime(0.7, t + i * 0.011);
      g.gain.exponentialRampToValueAtTime(0.08, t + i * 0.011 + 0.01);
    }
    g.gain.setValueAtTime(0.6, t + 0.034);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.26);
    src.connect(bp).connect(g).connect(out);
    src.start(t);
    src.stop(t + 0.3);
  };

  const hat = (ctx: AudioContext, out: AudioNode, t: number, open: boolean) => {
    const src = noise(ctx);
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 7000;
    const g = ctx.createGain();
    const len = open ? 0.22 : 0.05;
    g.gain.setValueAtTime(open ? 0.28 : 0.2, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + len);
    src.connect(hp).connect(g).connect(out);
    src.start(t);
    src.stop(t + len + 0.02);
  };

  const bass = (ctx: AudioContext, out: AudioNode, t: number, f: number) => {
    const o = ctx.createOscillator();
    const lp = ctx.createBiquadFilter();
    const g = ctx.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(f, t);
    lp.type = "lowpass";
    lp.Q.value = 6;
    lp.frequency.setValueAtTime(900, t);
    lp.frequency.exponentialRampToValueAtTime(160, t + 0.16);
    g.gain.setValueAtTime(0.38, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    o.connect(lp).connect(g).connect(out);
    o.start(t);
    o.stop(t + 0.22);
  };

  const playStep = (step: number, t: number) => {
    const ctx = ctxRef.current!;
    const out = outRef.current!;
    const pt = patternRef.current;
    if (pt.kick[step]) kick(ctx, out, t);
    if (pt.clap[step]) clap(ctx, out, t);
    if (pt.hat[step]) hat(ctx, out, t, step % 4 === 2);
    if (pt.bass[step]) bass(ctx, out, t, BASS_NOTES[step]);
  };

  // ---------- look-ahead scheduler ----------
  const schedule = () => {
    const ctx = ctxRef.current!;
    const stepDur = 60 / bpmRef.current / 4;
    while (nextTimeRef.current < ctx.currentTime + 0.12) {
      playStep(stepRef.current, nextTimeRef.current);
      queueRef.current.push({ step: stepRef.current, time: nextTimeRef.current });
      nextTimeRef.current += stepDur;
      stepRef.current = (stepRef.current + 1) % 16;
    }
  };

  const stop = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    queueRef.current = [];
    ctxRef.current?.suspend();
    setPlaying(false);
  }, []);

  const start = async () => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -10;
      comp.ratio.value = 4;
      const master = ctx.createGain();
      master.gain.value = 0.7;
      master.connect(comp).connect(ctx.destination);
      const buf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      ctxRef.current = ctx;
      outRef.current = master;
      noiseRef.current = buf;
    }
    const ctx = ctxRef.current;
    await ctx.resume();
    stepRef.current = 0;
    queueRef.current = [];
    nextTimeRef.current = ctx.currentTime + 0.06;
    schedule();
    timerRef.current = window.setInterval(schedule, 25);
    setPlaying(true);
  };

  // ---------- playhead: audio clock when playing, silent visual clock otherwise ----------
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draw = () => {
      if (playing && ctxRef.current) {
        const t = ctxRef.current.currentTime;
        let cur: number | null = null;
        while (queueRef.current.length && queueRef.current[0].time <= t) cur = queueRef.current.shift()!.step;
        if (cur !== null) setNow(cur);
      } else if (!reduce) {
        const stepMs = 60000 / bpmRef.current / 4;
        setNow(Math.floor(performance.now() / stepMs) % 16);
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  useEffect(() => () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    ctxRef.current?.close();
  }, []);

  const toggle = (row: RowId, i: number) =>
    setPattern((pt) => {
      const next = clone(pt);
      next[row][i] = !next[row][i];
      return next;
    });

  const clear = () => setPattern({ kick: Array(16).fill(false), clap: Array(16).fill(false), hat: Array(16).fill(false), bass: Array(16).fill(false) });

  return (
    <div className="seq" role="group" aria-label="3True4 step sequencer">
      <div className="seq-top">
        <div className="model">TR-3T4<small>Rhythm Composer</small></div>
        <div className="seq-controls">
          <div className="tempo" aria-label="Tempo">
            <button type="button" aria-label="Slower" onClick={() => setBpm((b) => Math.max(MIN_BPM, b - 1))}>&minus;</button>
            <output aria-live="polite">{bpm} BPM</output>
            <button type="button" aria-label="Faster" onClick={() => setBpm((b) => Math.min(MAX_BPM, b + 1))}>+</button>
          </div>
          <button type="button" className="btn" onClick={() => setPattern(clone(DEFAULT))}>Reset</button>
          <button type="button" className="btn" onClick={clear}>Clear</button>
          <button type="button" className="btn btn--red" onClick={playing ? stop : start} aria-pressed={playing}>
            {playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />} {playing ? "Stop" : "Play groove"}
          </button>
        </div>
      </div>

      <div className="seq-grid">
        <div className="seq-row seq-row--steps" aria-hidden="true">
          <span className="name spacer" />
          {Array.from({ length: 16 }, (_, i) => <span key={i} className={`led${now === i ? " now" : ""}`} />)}
        </div>
        {ROWS.map((row) => (
          <div className="seq-row" key={row.id}>
            <span className="name">{row.name}</span>
            {pattern[row.id].map((on, i) => (
              <button
                key={i}
                type="button"
                className={`pad${on ? " on" : ""}${now === i ? " now" : ""}`}
                aria-pressed={on}
                aria-label={`${row.name}, step ${i + 1}`}
                onClick={() => toggle(row.id, i)}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="seq-foot">
        <span>{playing ? "● Live: the whole site is moving at your tempo" : "Muted. Press play for sound (use headphones)"}</span>
        <span>1 bar &middot; 16 steps &middot; 4/4</span>
      </div>
    </div>
  );
}
