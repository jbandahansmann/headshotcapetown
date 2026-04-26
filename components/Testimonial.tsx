import { Stars } from "./Stars";

export default function Testimonial({ t }: { t: any }) {
  const meta = [t.role, t.company].filter(Boolean).join(", ");
  return (
    <section
      className="section"
      style={{
        textAlign: "center",
        paddingTop: "clamp(72px, 10vw, 120px)",
        paddingBottom: "clamp(72px, 10vw, 120px)",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div className="eyebrow section-tag">Testimonial</div>
        <blockquote
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(22px, 3vw, 36px)",
            fontWeight: 400,
            letterSpacing: "-0.015em",
            lineHeight: 1.3,
            color: "var(--midnight)",
            margin: "32px auto 0",
            padding: 0,
          }}
        >
          "{t.quote}"
        </blockquote>
        <div style={{ marginTop: 36, fontSize: 15, color: "var(--midnight)" }}>
          <div style={{ fontWeight: 600 }}>{t.author}</div>
          {meta && (
            <div className="eyebrow" style={{ marginTop: 4 }}>
              {meta}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginTop: 32,
            flexWrap: "wrap",
          }}
        >
          <Stars size={16} />
          <span className="eyebrow">5.0 ★ from 27 Google reviews</span>
        </div>
      </div>
    </section>
  );
}
