import Link from "next/link";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const DESTINATIONS = [
  { href: "/corporate-headshots-cape-town", label: "Corporate headshots", note: "Studio sessions in Woodstock or on-location across Cape Town." },
  { href: "/team-headshots-cape-town", label: "Team headshots", note: "Consistent portraits for teams of 5 to 60+ people." },
  { href: "/linkedin-photographer-cape-town", label: "LinkedIn portraits", note: "Profile photos that earn the recruiter click." },
  { href: "/journal", label: "Journal", note: "Articles on briefing, pricing, and planning corporate shoots." },
];

export default function NotFound() {
  return (
    <main>
      <Header />
      <section
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "clamp(64px, 10vw, 120px) clamp(28px, 6vw, 40px) clamp(80px, 12vw, 140px)",
        }}
      >
        <div className="eyebrow" style={{ color: "var(--bluegrey)" }}>404</div>
        <h1 className="headline headline-l" style={{ marginTop: 16 }}>
          Page not found
        </h1>
        <p
          style={{
            fontSize: "clamp(16px, 1.8vw, 20px)",
            opacity: 0.75,
            marginTop: 24,
            lineHeight: 1.5,
          }}
        >
          The page you tried to reach isn&apos;t here. It may have moved, or the link
          you followed might be out of date. The pages below cover most of what
          this site offers.
        </p>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "48px 0 0",
            display: "grid",
            gap: 16,
          }}
        >
          {DESTINATIONS.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                style={{
                  display: "block",
                  padding: "20px 24px",
                  border: "1px solid var(--mist)",
                  borderRadius: 12,
                  textDecoration: "none",
                  color: "inherit",
                  background: "var(--paper)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--bluegrey)",
                  }}
                >
                  →
                </span>{" "}
                <span style={{ fontWeight: 600, fontSize: 18, color: "var(--navy)" }}>
                  {d.label}
                </span>
                <div style={{ marginTop: 6, fontSize: 14, opacity: 0.7 }}>
                  {d.note}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 48, fontSize: 14, opacity: 0.7 }}>
          Or head back to the{" "}
          <Link href="/" style={{ color: "var(--navy)", textDecoration: "underline" }}>
            homepage
          </Link>
          .
        </p>
      </section>
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
