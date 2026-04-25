"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <span className="header-back" aria-hidden="true" />
      <Link href="/" style={{ fontFamily: "var(--serif)", fontSize: "clamp(18px, 3vw, 22px)", color: "var(--midnight)", textDecoration: "none", textAlign: "center" }}>
        Headshot <span style={{ fontStyle: "italic", color: "var(--navy)" }}>Cape Town</span>
      </Link>
      <a href="#enquire" className="btn btn-primary" style={{ justifySelf: "end", padding: "12px 18px", fontSize: 12 }}>
        Request a quote →
      </a>
    </header>
  );
}
