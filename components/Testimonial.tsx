import { Stars } from "./Stars";

export default function Testimonial({ t }: { t: any }) {
  return (
    <section style={{ padding: "120px 64px", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 80, alignItems: "center" }} className="grid-2">
      <div className="placeholder" style={{ height: 520 }}>Testimonial portrait — TBC</div>
      <div>
        <div className="eyebrow section-tag">Testimonial · {t.author}, {t.role}{t.company ? `, ${t.company}` : ""}</div>
        <blockquote style={{ fontFamily: "var(--serif)", fontSize: 40, fontWeight: 400, letterSpacing: "-0.015em", lineHeight: 1.2, marginTop: 24 }}>
          "{t.quote}"
        </blockquote>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 36, paddingTop: 24, borderTop: "1px solid #02135326" }}>
          <Stars size={16} />
          <span className="eyebrow">5.0 ★ from 27 Google reviews</span>
        </div>
      </div>
    </section>
  );
}
