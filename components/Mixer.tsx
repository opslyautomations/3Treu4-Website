// Animated two-channel DJ mixer: knobs twist, faders ride, VU meters bounce on the beat.
export default function Mixer() {
  const channel = (n: number) => (
    <div className="ch">
      <div className="knobs">
        <span className="label">CH {n}</span>
        <span className="knob" /><span className="knob" /><span className="knob" />
        <div className="fader-track"><span className="fader-cap" /></div>
      </div>
      <div className="vu">{Array.from({ length: 10 }, (_, i) => <i key={i} />)}</div>
    </div>
  );
  return (
    <div className="mixer reveal" aria-hidden="true">
      {channel(1)}
      {channel(2)}
      <div className="xfader">
        <span className="label">Crossfader</span>
        <div className="rail"><span className="cap" /></div>
        <div className="ends"><span className="label">A &middot; You</span><span className="label">B &middot; 3True4</span></div>
      </div>
    </div>
  );
}
