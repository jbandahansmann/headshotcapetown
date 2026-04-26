import { Stars } from "./Stars";

export default function TestimonialGrid({ items }: { items: any[] }) {
  return (
    <section className="section-x" style={{ paddingBottom: "clamp(60px, 9vw, 100px)" }}>
      <div className="grid-3">
        {items.map((t, i) => (
          <div key={i} style={{ background: "#fff", padding: "clamp(24px, 3vw, 36px) clamp(20px, 3vw, 32px)", border: "1px solid #02135319", display: "flex", flexDirection: "column", gap: 20 }}>
            <Stars size={14} />
            <p style={{ fontFamily: "var(--serif)", fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.3 }}>"{t.quote}"</p>
            <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid #02135319" }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t.author}</div>
              <div className="eyebrow" style={{ marginTop: 4 }}>{[t.role, t.company].filter(Boolean).join(", ")}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
