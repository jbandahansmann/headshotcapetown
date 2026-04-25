"use client";
import Link from "next/link";
import { siteConfig } from "../lib/siteConfig";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="header-back" style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", color: "var(--midnight)" }}>
        ← Jurgen.co.za
      </Link>
      <Link href="/" style={{ fontFamily: "var(--serif)", fontSize: "clamp(18px, 3vw, 22px)", color: "var(--midnight)", textDecoration: "none", textAlign: "center" }}>
        Headshot <span style={{ fontStyle: "italic", color: "var(--navy)" }}>Cape Town</span>
      </Link>
      <a href="#enquire" className="btn btn-primary" style={{ justifySelf: "end", padding: "12px 18px", fontSize: 12 }}>
        Request a quote →
      </a>
    </header>
  );
}
