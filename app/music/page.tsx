import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import { BeatLeds, Waveform } from "@/components/Motion";
import MusicPlayer from "@/components/MusicPlayer";
import { SITE, TOTAL_PLAYS, TRACKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Music | Tracks, Edits & DJ Mixes",
  description:
    "Stream every 3True4 release: Papi, Like That, MOB, Deep State, Mind, the Rock With You edit and full-length DJ mixes. House and tech house from Los Angeles.",
  alternates: { canonical: "/music" },
};

export default function MusicPage() {
  return (
    <>
      <section className="page-hero">
        <div className="beams" aria-hidden="true"><span /><span /><span /></div>
        <div className="wrap">
          <BeatLeds bpm={SITE.bpm} />
          <div style={{ marginTop: 14 }}><span className="eyebrow">Originals &middot; Edits &middot; Mixes</span></div>
          <h1>The<br /><span className="red">Catalog</span></h1>
          <p className="lede">
            {TRACKS.length} uploads and {TOTAL_PLAYS.toLocaleString("en-US")} plays so far. Hit play on anything below, and DM us on Instagram for extended versions and downloads.
          </p>
        </div>
      </section>
      <Waveform seed={21} label="Side A — 3True4" right={`${TRACKS.length} tracks`} />
      <MusicPlayer />
      <CtaBand title="Like what you hear?" text="This is the sound we bring to the room. Lock in a date and let's build the night around it." />
    </>
  );
}
