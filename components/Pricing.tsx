export default function Pricing({ packages }: { packages: any[] }) {
  return (
    <section className="section">
      <div className="eyebrow section-tag">Pricing</div>
      <h2 className="headline headline-l" style={{ marginTop: 12, maxWidth: 720 }}>
        Transparent <span className="italic">pricing</span>, no surprises.
      </h2>
      <div className="grid-3" style={{ marginTop: "clamp(40px, 6vw, 64px)" }}>
        {packages.map((p, i) => (
          <div key={i} className="pricing-card" style={{
            background: i === 1 ? "var(--midnight)" : "#fff",
            color: i === 1 ? "var(--paper)" : "var(--midnight)",
          }}>
            <div className="eyebrow" style={{ color: i === 1 ? "#9ba0aa" : "var(--bluegrey)" }}>
              {i === 1 ? "Most booked" : `0${i + 1}`}
            </div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 400, marginTop: 12 }}>{p.name}</h3>
            <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 5.5vw, 56px)", marginTop: 16, lineHeight: 1 }}>
              {p.price_from ? "From " : ""}R{(p.price ?? p.price_from).toLocaleString()}
            </div>
            <p style={{ fontSize: 14, opacity: 0.75, marginTop: 12 }}>{p.blurb}</p>
            <ul style={{ listStyle: "none", marginTop: 28, display: "flex", flexDirection: "column", gap: 12, fontSize: 14, flex: 1 }}>
              {p.features.map((f: string) => (
                <li key={f} style={{ display: "flex", gap: 10 }}>
                  <span style={{ color: i === 1 ? "var(--paper)" : "var(--navy)", fontFamily: "var(--mono)" }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="#enquire" className="btn" style={{
              marginTop: 32,
              background: i === 1 ? "var(--paper)" : "transparent",
              color: i === 1 ? "var(--midnight)" : "var(--midnight)",
              border: i === 1 ? "none" : "1px solid var(--midnight)",
            }}>
              Book {p.name}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
