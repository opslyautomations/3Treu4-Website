"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Eq } from "./Motion";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap">
        <Link className="brand" href="/" aria-label="3True4 home">
          <Image src="/img/logo.jpg" alt="" width={42} height={42} />
          <span>3TRUE4</span>
          <Eq bars={3} />
        </Link>
        <button className="menu-toggle" aria-label="Menu" aria-expanded={open} aria-controls="nav" onClick={() => setOpen((o) => !o)}>
          <span /><span /><span />
        </button>
        <nav className="nav" id="nav" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
          <Link className="btn btn--red" href="/book" aria-current={pathname === "/book" ? "page" : undefined}>
            Book Us <span className="arrow">&rarr;</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
