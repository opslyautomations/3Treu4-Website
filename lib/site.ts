// Single source of truth for 3True4 content.
// Stats are a snapshot from SoundCloud (Sep 28, 2026). Update here and every page follows.

export const SITE = {
  name: "3True4",
  url: "https://3true4.com", // update when the domain is live
  email: "3240true@gmail.com",
  location: "Los Angeles, CA",
  bpm: 124,
  instagram: "https://www.instagram.com/3true4/",
  soundcloud: "https://soundcloud.com/3true4",
  tiktok: "https://www.tiktok.com/@3true4",
} as const;

export type TrackKind = "original" | "edit" | "mix";

export type Track = {
  slug: string;
  title: string;
  kind: TrackKind;
  desc: string;
  art: string;
  date: string; // ISO
  durationMs: number;
  plays: number;
  likes: number;
  genre: string;
};

export const KIND_LABEL: Record<TrackKind, string> = {
  original: "Original",
  edit: "Edit / Rework",
  mix: "DJ Mix",
};

const sc = (slug: string) => `${SITE.soundcloud}/${slug}`;
export const trackUrl = (t: Track) => sc(t.slug);

export const TRACKS: Track[] = [
  {
    slug: "rock-with-you-3true4-edit-high",
    title: "Rock With You (3True4 Edit)",
    kind: "edit",
    desc: "A tech house flip of an absolute classic: Michael Jackson, but make it house. Uploaded high-pitched; DM us on Instagram for the original.",
    art: "/img/art/rock-with-you-3true4-edit-high.jpg",
    date: "2026-09-18",
    durationMs: 183803,
    plays: 1572,
    likes: 32,
    genre: "Tech House",
  },
  {
    slug: "papi",
    title: "Papi",
    kind: "original",
    desc: "Latin grooves. Dirty bass. Our most-played track to date.",
    art: "/img/art/papi.jpg",
    date: "2026-09-05",
    durationMs: 214202,
    plays: 4502,
    likes: 208,
    genre: "Latin Tech House",
  },
  {
    slug: "like-that-r3work",
    title: "Like That (r3work)",
    kind: "edit",
    desc: "Had to run this one back. A darker, more stripped-down version made for late nights, and rinsed by Sadison at Breakaway Philly.",
    art: "/img/art/like-that-r3work.jpg",
    date: "2026-08-21",
    durationMs: 228969,
    plays: 3964,
    likes: 169,
    genre: "Minimal Tech",
  },
  {
    slug: "like-that",
    title: "Like That",
    kind: "original",
    desc: "Built for the late-night hours. A driving tech house groove with rolling low end, hypnotic energy, and just enough attitude to keep it dirty.",
    art: "/img/art/like-that.jpg",
    date: "2026-08-03",
    durationMs: 247431,
    plays: 2589,
    likes: 105,
    genre: "Tech House",
  },
  {
    slug: "mob",
    title: "MOB",
    kind: "original",
    desc: "Been locked in on this one for a minute. Dark groove, heavy bounce, and straight club energy.",
    art: "/img/art/mob.png",
    date: "2026-05-16",
    durationMs: 181346,
    plays: 2048,
    likes: 47,
    genre: "Tech House",
  },
  {
    slug: "deep-state-radio-edit",
    title: "Deep State (Radio Edit)",
    kind: "original",
    desc: "Hypnotic, acid-leaning grooves, and a completely different sound from our first few tracks.",
    art: "/img/art/deep-state-radio-edit.png",
    date: "2026-04-02",
    durationMs: 206512,
    plays: 1034,
    likes: 41,
    genre: "Acid House",
  },
  {
    slug: "mind",
    title: "Mind",
    kind: "original",
    desc: "High-energy tech house. Produced by 3True4, and the one that kicked off 2026.",
    art: "/img/art/mind.png",
    date: "2026-02-28",
    durationMs: 129890,
    plays: 1057,
    likes: 28,
    genre: "Tech House",
  },
  {
    slug: "live-sandbar-mix",
    title: "Live Sandbar Mix",
    kind: "mix",
    desc: "Live recorded set from Sandbar. Smooth blends with some hip-hop and R&B remixes.",
    art: "/img/art/live-sandbar-mix.jpg",
    date: "2025-12-02",
    durationMs: 4648493,
    plays: 363,
    likes: 14,
    genre: "Open Format",
  },
  {
    slug: "true-spins",
    title: "True Spins",
    kind: "mix",
    desc: "44 minutes of tech house spins.",
    art: "/img/art/true-spins.png",
    date: "2025-07-11",
    durationMs: 2642758,
    plays: 233,
    likes: 5,
    genre: "Tech House",
  },
  {
    slug: "bdosb-m4a",
    title: "¡bDOSb!",
    kind: "mix",
    desc: "A half-hour Dance & EDM session.",
    art: "/img/art/bdosb-m4a.jpg",
    date: "2024-12-03",
    durationMs: 1956833,
    plays: 134,
    likes: 5,
    genre: "Dance & EDM",
  },
  {
    slug: "ready-4-summer",
    title: "Just In Time",
    kind: "mix",
    desc: "A mix that's “Just In Time” for any occasion. Summer vibes, good vibes.",
    art: "/img/art/ready-4-summer.jpg",
    date: "2023-02-11",
    durationMs: 3704816,
    plays: 177,
    likes: 9,
    genre: "House",
  },
];

export const getTrack = (slug: string) => TRACKS.find((t) => t.slug === slug)!;

export const TOTAL_PLAYS = TRACKS.reduce((n, t) => n + t.plays, 0);
export const RELEASES_2026 = TRACKS.filter((t) => t.date.startsWith("2026")).length;
export const MIX_HOURS = TRACKS.filter((t) => t.kind === "mix").reduce((n, t) => n + t.durationMs, 0) / 3.6e6;

export const VENUES = [
  { name: "Woody's Wharf", where: "Newport Beach, CA", note: "B2B w/ DJ Jurassick", kind: "Recurring B2B" },
  { name: "District", where: "Orange, CA", note: "House music all night", kind: "Industry Night" },
  { name: "Sandbar", where: "Huntington Beach, CA", note: "Live recorded set", kind: "Club Set" },
  { name: "Breakaway Philly", where: "Philadelphia, PA", note: "“Like That (r3work)” played by Sadison", kind: "Festival Support" },
];

export const IG_POSTS = [
  { src: "/img/ig/post-10.jpg", alt: "Woody's Wharf flyer: B2B with Jurassick, Newport Beach, 9:30 PM till closing" },
  { src: "/img/ig/post-03.jpg", alt: "Rock With You (3True4 Edit) promo" },
  { src: "/img/ig/post-01.jpg", alt: "Sadison playing a 3True4 track at Breakaway Philly" },
  { src: "/img/ig/post-07.jpg", alt: "Woody's Wharf recap" },
  { src: "/img/ig/post-12.jpg", alt: "District Orange: tonight, all night" },
  { src: "/img/ig/post-05.jpg", alt: "3True4 with DJ Jurassick" },
];

// ---------- formatting ----------
export function fmtDuration(ms: number) {
  const m = Math.round(ms / 60000);
  if (m >= 20) return `${m} min`;
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function fmtPlays(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : String(n);
}

export function fmtMonth(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

export function scWidget(url: string, { visual = false, autoplay = false } = {}) {
  return (
    "https://w.soundcloud.com/player/?url=" +
    encodeURIComponent(url) +
    `&color=%23e0261b&auto_play=${autoplay}&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false` +
    (visual ? "&visual=true" : "")
  );
}
