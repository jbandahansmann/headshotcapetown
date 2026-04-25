"use client";
import Link from "next/link";
import { siteConfig } from "../lib/siteConfig";

export default function Header() {
  return (
    <header style={{
      display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center",
      padding: "32px 64px", borderBottom: "1px solid #02135319",
    }}>
      <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", color: "var(--midnight)" }}>
        ← Jurgen.co.za
      </Link>
      <Link href="/" style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--midnight)", textDecoration: "none", textAlign: "center" }}>
        Headshot <span style={{ fontStyle: "italic", color: "var(--navy)" }}>Cape Town</span>
      </Link>
      <a href="#enquire" className="btn btn-primary" style={{ justifySelf: "end", padding: "12px 22px", fontSize: 12 }}>
        Request a quote →
      </a>
    </header>
  );
}
