import Link from "next/link";
import { siteConfig } from "../lib/siteConfig";

export default function Footer() {
  return (
    <footer style={{ background: "var(--midnight)", color: "var(--paper)", padding: "clamp(48px, 7vw, 64px) var(--gutter) 36px" }}>
      <div className="footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg viewBox="0 0 240 80" aria-hidden="true" focusable="false" style={{ height: 28, width: "auto", flexShrink: 0 }}>
              <text x="120" y="60" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif" fontSize="68" fontWeight="700" fill="#ffffff" textAnchor="middle" letterSpacing="-2">h·ct</text>
            </svg>
            <span style={{ fontSize: "clamp(20px, 2.4vw, 24px)", fontWeight: 500, letterSpacing: "-0.01em" }}>
              Headshot Cape Town
            </span>
          </div>
          <p style={{ fontSize: 14, opacity: 0.65, marginTop: 20, maxWidth: 320, lineHeight: 1.6 }}>
            Corporate headshot photography by Jürgen Banda-Hansmann. Studio in Woodstock, on-location across Cape Town.
          </p>
        </div>
        <div>
          <div className="eyebrow" style={{ color: "#9ba0aa", marginBottom: 16 }}>Sessions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14, opacity: 0.85 }}>
            <span>Essential — R1,950</span>
            <span>Signature — R2,750</span>
            <span>Team — from R3,000</span>
            <span>On-location</span>
          </div>
        </div>
        <div>
          <div className="eyebrow" style={{ color: "#9ba0aa", marginBottom: 16 }}>Contact</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14, opacity: 0.85 }}>
            <a href={`mailto:${siteConfig.email}`} style={{ color: "var(--paper)", textDecoration: "none", wordBreak: "break-word" }}>{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone}`} style={{ color: "var(--paper)", textDecoration: "none" }}>{siteConfig.phoneHuman}</a>
            <a href={`https://wa.me/${siteConfig.whatsappNumber}`} style={{ color: "var(--paper)", textDecoration: "none" }}>WhatsApp</a>
          </div>
        </div>
        <div>
          <div className="eyebrow" style={{ color: "#9ba0aa", marginBottom: 16 }}>Services</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14, opacity: 0.85 }}>
            <Link href="/corporate-headshots-cape-town" style={{ color: "var(--paper)", textDecoration: "none" }}>Corporate headshots Cape Town</Link>
            <Link href="/team-headshots-cape-town" style={{ color: "var(--paper)", textDecoration: "none" }}>Team headshots Cape Town</Link>
            <Link href="/linkedin-photographer-cape-town" style={{ color: "var(--paper)", textDecoration: "none" }}>LinkedIn photographer Cape Town</Link>
            <Link href="/journal" style={{ color: "var(--paper)", textDecoration: "none" }}>Journal</Link>
            <Link href="/contact" style={{ color: "var(--paper)", textDecoration: "none" }}>Contact</Link>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #ffffff14", fontSize: 14, opacity: 0.75, maxWidth: 520, lineHeight: 1.5 }}>
        Headshot Cape Town is an offering from{" "}
        <a href={siteConfig.parent.url} style={{ color: "var(--paper)" }}>{siteConfig.parent.name}</a>. For personal branding, lifestyle or broader work, visit the wider studio at{" "}
        <a href={siteConfig.parent.url} style={{ color: "var(--paper)" }}>{siteConfig.parent.url.replace("https://", "")}</a>.
      </div>
      <div style={{ marginTop: 36, paddingTop: 24, borderTop: "1px solid #ffffff20", display: "flex", justifyContent: "space-between", fontSize: 12, opacity: 0.55, fontFamily: "var(--mono)", flexWrap: "wrap", gap: 12 }}>
        <span>© 2026 Headshot Cape Town · An offering from {siteConfig.parent.name}</span>
        <span>headshotcapetown.co.za</span>
      </div>
    </footer>
  );
}
