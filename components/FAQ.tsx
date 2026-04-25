"use client";
import { useState } from "react";

export default function FAQ({ items }: { items: any[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section" style={{ background: "#fff", borderTop: "1px solid #02135319" }}>
      <div className="grid-2-text-right">
        <div>
          <div className="eyebrow section-tag">FAQ</div>
          <h2 className="headline headline-m" style={{ marginTop: 12 }}>
            Common <span className="italic">questions</span>.
          </h2>
        </div>
        <div>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ borderTop: i === 0 ? "1px solid #02135326" : "none", borderBottom: "1px solid #02135326", padding: "24px 0" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--serif)", fontSize: "clamp(18px, 2.2vw, 24px)", color: "var(--midnight)",
                  display: "flex", justifyContent: "space-between", alignItems: "center", padding: 0,
                  gap: 16, lineHeight: 1.3,
                }}
              >
                <span>{item.q}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 20, color: "var(--navy)", flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <p style={{ fontSize: 16, opacity: 0.75, marginTop: 16, lineHeight: 1.6, maxWidth: 640 }}>{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
