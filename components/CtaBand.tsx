import Link from "next/link";
import { SITE } from "@/lib/site";

export default function CtaBand({
  title = "Let's make it loud.",
  text = "Club night, bar takeover, private party or brand event: tell us the date and we'll bring the bass.",
}: { title?: string; text?: string }) {
  return (
    <section className="cta-band">
      <span className="kick-rings" aria-hidden="true"><i /><i /><i /></span>
      <div className="wrap">
        <div className="reveal">
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="hero-ctas reveal">
          <Link className="btn btn--solid" href="/book">Book 3True4 <span className="arrow">&rarr;</span></Link>
          <a className="btn" href={`mailto:${SITE.email}`}>Email Us</a>
        </div>
      </div>
    </section>
  );
}
