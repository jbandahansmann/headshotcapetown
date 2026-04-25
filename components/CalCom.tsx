"use client";
import { useEffect } from "react";
import { siteConfig } from "../lib/siteConfig";

const NAMESPACE = "headshot-cape-town";

export default function CalCom() {
  useEffect(() => {
    // Cal.com's modern embed snippet — self-initialises window.Cal so the
    // race condition that produced "Cal is not defined" can't happen.
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    // @ts-ignore
    window.Cal("init", NAMESPACE, { origin: "https://cal.com" });
    // @ts-ignore
    window.Cal.ns[NAMESPACE]("inline", {
      elementOrSelector: "#cal-inline",
      calLink: siteConfig.calUsername,
      layout: "month_view",
      config: { theme: "light" },
    });
    // @ts-ignore
    window.Cal.ns[NAMESPACE]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
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
