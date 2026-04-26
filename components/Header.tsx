"use client";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/corporate-headshots-cape-town", label: "Corporate" },
  { href: "/team-headshots-cape-town", label: "Team" },
  { href: "/linkedin-photographer-cape-town", label: "LinkedIn" },
  { href: "/journal", label: "Journal" },
];

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="site-logo">
        Headshot <span style={{ fontStyle: "italic", color: "var(--navy)" }}>Cape Town</span>
      </Link>
      <nav className="site-nav" aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="nav-link">
            {link.label}
          </Link>
        ))}
      </nav>
      <a href="#enquire" className="btn btn-primary site-cta">
        Request a quote →
      </a>
    </header>
  );
}
