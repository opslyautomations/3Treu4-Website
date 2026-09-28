"use client";

import { useEffect, useRef, useState } from "react";

// Counts up from 0 when scrolled into view, easing out like a filter sweep.
export default function CountUp({ to, decimals = 0, suffix = "", duration = 1600 }: { to: number; decimals?: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setValue(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        setValue(to * (1 - Math.pow(1 - p, 4)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);

  return <b ref={ref}>{value.toFixed(decimals)}{suffix}</b>;
}
