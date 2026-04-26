import { Stars } from "./Stars";

export default function Testimonial({ t }: { t: any }) {
  return (
    <section className="section grid-2" style={{ gridTemplateColumns: "1fr 1.3fr" }}>
      {t.portrait ? (
        <div style={{ aspectRatio: "4/5", minHeight: 260, overflow: "hidden" }}>
          <img src={t.portrait} alt={t.author} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      ) : (
        <div className="placeholder" style={{ aspectRatio: "4/5", minHeight: 260 }}>Testimonial portrait — upload via CMS</div>
      )}
      <div>
        <div className="eyebrow section-tag">Testimonial · {[t.author, t.role, t.company].filter(Boolean).join(", ")}</div>
        <blockquote style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 3.4vw, 40px)", fontWeight: 400, letterSpacing: "-0.015em", lineHeight: 1.2, marginTop: 24 }}>
          "{t.quote}"
        </blockquote>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 36, paddingTop: 24, borderTop: "1px solid #02135326", flexWrap: "wrap" }}>
          <Stars size={16} />
          <span className="eyebrow">5.0 ★ from 27 Google reviews</span>
        </div>
      </div>
    </section>
  );
}
