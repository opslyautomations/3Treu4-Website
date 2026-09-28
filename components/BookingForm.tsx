"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { Eq } from "./Motion";

export const EVENT_TYPES = [
  { value: "club", label: "Club night" },
  { value: "bar", label: "Bar / lounge night" },
  { value: "private", label: "Private event / party" },
  { value: "brand", label: "Brand event / pop-up" },
  { value: "festival", label: "Festival / day party" },
  { value: "other", label: "Something else" },
];

const VIBES = ["Tech House", "House", "Techno", "Latin House", "Minimal", "Hip-Hop / R&B Blends", "Open Format"];
const REQUIRED = ["name", "email", "event-type", "event-date", "venue"] as const;

export default function BookingForm() {
  const params = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [eventType, setEventType] = useState("");
  const [invalid, setInvalid] = useState<Set<string>>(new Set());
  const [sent, setSent] = useState(false);
  const [minDate, setMinDate] = useState<string>();

  useEffect(() => {
    const t = params.get("type");
    if (t && EVENT_TYPES.some((e) => e.value === t)) setEventType(t);
  }, [params]);

  useEffect(() => setMinDate(new Date().toISOString().split("T")[0]), []);

  const cls = (id: string, extra = "") => `field${extra}${invalid.has(id) ? " invalid" : ""}`;

  const clearInvalid = (id: string) =>
    setInvalid((s) => {
      if (!s.has(id)) return s;
      const n = new Set(s);
      n.delete(id);
      return n;
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const bad = new Set<string>();
    for (const id of REQUIRED) {
      const el = form.elements.namedItem(id) as HTMLInputElement | HTMLSelectElement;
      if (!el.value.trim() || !el.checkValidity()) bad.add(id);
    }
    setInvalid(bad);
    if (bad.size) {
      (form.elements.namedItem([...bad][0]) as HTMLElement).focus();
      return;
    }

    const fd = new FormData(form);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const typeLabel = EVENT_TYPES.find((t) => t.value === v("event-type"))?.label ?? v("event-type");
    const vibes = fd.getAll("vibe").map(String);

    const body = [
      "Hey 3True4, booking inquiry below.",
      "",
      `NAME: ${v("name")}`,
      `EMAIL: ${v("email")}`,
      `PHONE: ${v("phone") || "—"}`,
      "",
      `EVENT TYPE: ${typeLabel}`,
      `DATE: ${v("event-date")}`,
      `SET TIME: ${v("start-time") || "?"} – ${v("end-time") || "?"}`,
      `VENUE / CITY: ${v("venue")}`,
      `EXPECTED GUESTS: ${v("guests") || "—"}`,
      `BUDGET: ${v("budget") || "—"}`,
      `SOUND / DJ GEAR ON SITE: ${v("gear") || "—"}`,
      `SOUND WANTED: ${vibes.length ? vibes.join(", ") : "—"}`,
      "",
      "DETAILS:",
      v("message") || "—",
    ].join("\n");

    const subject = `Booking Inquiry — ${typeLabel} — ${v("event-date")}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  };

  return (
    <form className="form reveal" id="booking-form" ref={formRef} noValidate onSubmit={onSubmit}>
      <div className="ch-head"><b>CH 01</b> You <Eq bars={3} /></div>
      <div className={cls("name")}>
        <label htmlFor="name">Your name <span className="req">*</span></label>
        <input id="name" name="name" autoComplete="name" required onInput={() => clearInvalid("name")} />
        <span className="err">Please add your name.</span>
      </div>
      <div className={cls("email")}>
        <label htmlFor="email">Email <span className="req">*</span></label>
        <input id="email" name="email" type="email" autoComplete="email" required onInput={() => clearInvalid("email")} />
        <span className="err">Please add a valid email.</span>
      </div>
      <div className="field field--full">
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" />
      </div>

      <div className="ch-head"><b>CH 02</b> The Night <Eq bars={3} /></div>
      <div className={cls("event-type")}>
        <label htmlFor="event-type">Event type <span className="req">*</span></label>
        <select id="event-type" name="event-type" required value={eventType} onChange={(e) => { setEventType(e.target.value); clearInvalid("event-type"); }}>
          <option value="">Select one…</option>
          {EVENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <span className="err">Please choose an event type.</span>
      </div>
      <div className={cls("event-date")}>
        <label htmlFor="event-date">Event date <span className="req">*</span></label>
        <input id="event-date" name="event-date" type="date" min={minDate} required onInput={() => clearInvalid("event-date")} />
        <span className="err">Please pick a date.</span>
      </div>
      <div className={cls("venue", " field--full")}>
        <label htmlFor="venue">Venue &amp; city <span className="req">*</span></label>
        <input id="venue" name="venue" placeholder="e.g. Woody's Wharf, Newport Beach" required onInput={() => clearInvalid("venue")} />
        <span className="err">Where&apos;s the party?</span>
      </div>
      <div className="field"><label htmlFor="start-time">Set start</label><input id="start-time" name="start-time" type="time" /></div>
      <div className="field"><label htmlFor="end-time">Set end</label><input id="end-time" name="end-time" type="time" /></div>
      <div className="field">
        <label htmlFor="guests">Expected guests</label>
        <select id="guests" name="guests" defaultValue="">
          <option value="">Select…</option>
          <option>Under 50</option><option>50–150</option><option>150–300</option><option>300–500</option><option>500+</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="budget">Budget range</label>
        <select id="budget" name="budget" defaultValue="">
          <option value="">Prefer to discuss</option>
          <option>Under $500</option><option>$500–$1,000</option><option>$1,000–$2,500</option><option>$2,500+</option>
        </select>
      </div>

      <div className="ch-head"><b>CH 03</b> The Sound <Eq bars={3} /></div>
      <div className="field field--full">
        <label htmlFor="gear">Sound system / DJ gear on site?</label>
        <select id="gear" name="gear" defaultValue="">
          <option value="">Not sure yet</option>
          <option>Yes, full sound + DJ booth</option>
          <option>Sound system only, no decks</option>
          <option>No, we need it provided</option>
        </select>
      </div>
      <fieldset className="field field--full">
        <legend>The sound you want (pick any)</legend>
        <div className="chips" style={{ marginTop: 8 }}>
          {VIBES.map((v) => (
            <label key={v}><input type="checkbox" name="vibe" value={v} /><span>{v}</span></label>
          ))}
        </div>
      </fieldset>
      <div className="field field--full">
        <label htmlFor="message">Anything else?</label>
        <textarea id="message" name="message" placeholder="Tell us about the crowd, the vibe, set length, other acts on the lineup…" />
      </div>

      <div className="form-foot">
        <button className="btn btn--red" type="submit">Send inquiry <span className="arrow">&rarr;</span></button>
        <small>This opens your email app with everything filled in, so just hit send. Prefer to write it yourself? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</small>
      </div>
      <div className={`form-success${sent ? " show" : ""}`} ref={successRef} role="status">
        <h3>Almost there 🪩</h3>
        <p>
          Your email app should have opened with your request filled in. Hit send and we&apos;ll be in touch. If nothing opened, email{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or DM <a href={SITE.instagram} target="_blank" rel="noopener">@3true4</a>.
        </p>
      </div>
    </form>
  );
}
