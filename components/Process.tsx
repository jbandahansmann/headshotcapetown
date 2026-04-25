export default function Process({ steps }: { steps: any[] }) {
  return (
    <section style={{ padding: "120px 64px", background: "var(--paper)" }}>
      <div className="eyebrow section-tag">Process</div>
      <h2 className="headline" style={{ fontSize: 64, marginTop: 12, maxWidth: 720 }}>
        How a shoot <span className="italic">actually goes</span>.
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, marginTop: 64 }} className="grid-2">
        {steps.map(step => (
          <div key={step.n} style={{ borderTop: "1px solid #02135333", paddingTop: 24 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--bluegrey)" }}>{step.n}</div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 26, fontWeight: 400, marginTop: 12, lineHeight: 1.2 }}>{step.t}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.75, marginTop: 12 }}>{step.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
