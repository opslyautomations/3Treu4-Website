import type { Metadata, Viewport } from "next";
import { Anton, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import { SITE } from "@/lib/site";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-grotesk", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "3True4 | Los Angeles House & Tech House DJs",
    template: "%s | 3True4",
  },
  description:
    "3True4 is a Los Angeles house and tech house DJ/producer act. Dark grooves, dirty bass, late nights. Book 3True4 for clubs, bars, private events and brand activations.",
  openGraph: {
    type: "website",
    siteName: "3True4",
    images: [{ url: "/img/art/papi.jpg", width: 500, height: 500, alt: "3True4 — Papi" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/img/favicon.png", apple: "/img/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#0a0a0a" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/img/logo.jpg`,
  image: `${SITE.url}/img/logo.jpg`,
  genre: ["House", "Tech House", "Techno"],
  email: `mailto:${SITE.email}`,
  location: { "@type": "Place", name: SITE.location },
  sameAs: [SITE.instagram, SITE.soundcloud, SITE.tiktok],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${grotesk.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
