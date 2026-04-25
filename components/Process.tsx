export default function Process({ steps }: { steps: any[] }) {
  return (
    <section className="section" style={{ background: "var(--paper)" }}>
      <div className="eyebrow section-tag">Process</div>
      <h2 className="headline headline-l" style={{ marginTop: 12, maxWidth: 720 }}>
        How a shoot <span className="italic">actually goes</span>.
      </h2>
      <div className="grid-4" style={{ marginTop: "clamp(40px, 6vw, 64px)" }}>
        {steps.map(step => (
          <div key={step.n} style={{ borderTop: "1px solid #02135333", paddingTop: 24 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--bluegrey)" }}>{step.n}</div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 2.6vw, 26px)", fontWeight: 400, marginTop: 12, lineHeight: 1.2 }}>{step.t}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.75, marginTop: 12 }}>{step.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
