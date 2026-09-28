import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { IgIcon, ScIcon, TtIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Image src="/img/logo.jpg" alt="3True4 logo" width={88} height={88} />
            <p>House &amp; tech house from Los Angeles, CA. Dark grooves, heavy bounce, late nights.</p>
            <div className="socials">
              <a href={SITE.instagram} target="_blank" rel="noopener" aria-label="Instagram"><IgIcon /></a>
              <a href={SITE.soundcloud} target="_blank" rel="noopener" aria-label="SoundCloud"><ScIcon /></a>
              <a href={SITE.tiktok} target="_blank" rel="noopener" aria-label="TikTok"><TtIcon /></a>
            </div>
          </div>
          <div>
            <h4>Site</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/music">Music</Link></li>
              <li><Link href="/book">Book 3True4</Link></li>
            </ul>
          </div>
          <div>
            <h4>Booking &amp; Inquiries</h4>
            <ul>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><a href={SITE.instagram} target="_blank" rel="noopener">DM @3true4</a></li>
              <li><a href={SITE.soundcloud} target="_blank" rel="noopener">soundcloud.com/3true4</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-word" aria-hidden="true">3TRUE4</div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} 3True4 &mdash; {SITE.location}</span>
          <span>House / Techno &middot; {SITE.bpm} BPM</span>
        </div>
      </div>
    </footer>
  );
}
