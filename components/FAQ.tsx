"use client";
import { useState } from "react";

export default function FAQ({ items }: { items: any[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ padding: "100px 64px", background: "#fff", borderTop: "1px solid #02135319" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80 }} className="grid-2">
        <div>
          <div className="eyebrow section-tag">FAQ</div>
          <h2 className="headline" style={{ fontSize: 56, marginTop: 12 }}>
            Common <span className="italic">questions</span>.
          </h2>
        </div>
        <div>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ borderTop: i === 0 ? "1px solid #02135326" : "none", borderBottom: "1px solid #02135326", padding: "28px 0" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--serif)", fontSize: 24, color: "var(--midnight)",
                  display: "flex", justifyContent: "space-between", alignItems: "center", padding: 0,
                }}
              >
                {item.q}
                <span style={{ fontFamily: "var(--mono)", fontSize: 20, color: "var(--navy)" }}>{open === i ? "−" : "+"}</span>
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
