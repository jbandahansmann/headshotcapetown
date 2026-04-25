import { Stars } from "./Stars";

export default function TestimonialGrid({ items }: { items: any[] }) {
  return (
    <section style={{ padding: "0 64px 100px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="grid-2">
        {items.map((t, i) => (
          <div key={i} style={{ background: "#fff", padding: "36px 32px", border: "1px solid #02135319", display: "flex", flexDirection: "column", gap: 20 }}>
            <Stars size={14} />
            <p style={{ fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1.3 }}>"{t.quote}"</p>
            <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid #02135319" }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t.author}</div>
              <div className="eyebrow" style={{ marginTop: 4 }}>{t.role}{t.company ? `, ${t.company}` : ""}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
