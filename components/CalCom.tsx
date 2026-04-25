"use client";
import { useEffect } from "react";
import { siteConfig } from "../lib/siteConfig";

export default function CalCom() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      // @ts-ignore
      if (window.Cal) {
        // @ts-ignore
        window.Cal("init", { origin: "https://app.cal.com" });
        // @ts-ignore
        window.Cal("inline", {
          elementOrSelector: "#cal-inline",
          calLink: siteConfig.calUsername,
          config: { theme: "light" },
        });
      }
    };
    return () => {
      try { document.body.removeChild(script); } catch {}
    };
  }, []);

  return (
    <section className="section" style={{ background: "#fff", borderTop: "1px solid #02135319" }}>
      <div className="grid-2-text-right">
        <div>
          <div className="eyebrow section-tag">Or — book a 15-min call</div>
          <h2 className="headline headline-m" style={{ marginTop: 12 }}>
            Rather <span className="italic">talk</span> first?
          </h2>
          <p style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.6, marginTop: 24, opacity: 0.78, maxWidth: 420 }}>
            For team shoots, complex briefs, or if you'd just rather hear a voice — pick a 15-minute slot.
            We'll talk through scope, dates and budget, and you'll have a quote in your inbox the same day.
          </p>
          <ul style={{ listStyle: "none", marginTop: 28, display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
            {["No commitment — it's a chat","Mon–Fri, 10am–4pm SAST","Calendar invite + reminders sent automatically"].map(s => (
              <li key={s} style={{ display: "flex", gap: 12 }}>
                <span style={{ color: "var(--navy)", fontFamily: "var(--mono)" }}>✓</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div id="cal-inline" style={{ minHeight: 600, border: "1px solid #02135326", background: "var(--paper)" }} />
      </div>
    </section>
  );
}
