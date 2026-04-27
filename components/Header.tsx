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
      <Link href="/" className="site-logo" aria-label="Headshot Cape Town home">
        <svg
          className="logo-mark"
          viewBox="0 0 240 80"
          aria-hidden="true"
          focusable="false"
        >
          <text
            x="120"
            y="60"
            fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
            fontSize="68"
            fontWeight="700"
            fill="#022672"
            textAnchor="middle"
            letterSpacing="-2"
          >
            h·ct
          </text>
        </svg>
        <span className="logo-wordmark">Headshot Cape Town</span>
      </Link>
      <nav className="site-nav" aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="nav-link">
            {link.label}
          </Link>
        ))}
      </nav>
      <Link href="/contact" className="btn btn-primary site-cta">
        Request a quote →
      </Link>
    </header>
  );
}
