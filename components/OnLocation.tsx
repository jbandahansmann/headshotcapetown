export default function OnLocation({ data }: { data: any }) {
  return (
    <section style={{ padding: "0 64px" }}>
      <div style={{ background: "var(--midnight)", color: "var(--paper)", padding: "80px 64px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, alignItems: "center" }} className="grid-2">
        <div>
          <div className="eyebrow section-tag" style={{ color: "#9ba0aa" }}>{data?.eyebrow}</div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 64, fontWeight: 400, letterSpacing: "-0.02em", marginTop: 12, lineHeight: 1 }}>
            {data?.headline}<br /><span style={{ fontStyle: "italic" }}>{data?.headline_italic}</span>.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, marginTop: 28, opacity: 0.78, maxWidth: 480 }}>{data?.body}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 44 }}>
            {data?.stats?.map((s: any) => (
              <div key={s.k} style={{ borderTop: "1px solid #ffffff26", paddingTop: 16 }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 32, lineHeight: 1 }}>{s.k}</div>
                <div className="eyebrow" style={{ color: "#9ba0aa", marginTop: 6 }}>{s.v}</div>
              </div>
            ))}
          </div>
          <a href="#enquire" className="btn" style={{ marginTop: 44, background: "var(--paper)", color: "var(--midnight)" }}>Get a team quote →</a>
        </div>
        <div style={{ position: "relative", height: 520 }}>
          <div className="placeholder" style={{ position: "absolute", top: 0, right: 0, width: 380, height: 280 }}>Team shot 1</div>
          <div className="placeholder" style={{ position: "absolute", bottom: 0, left: 0, width: 320, height: 360 }}>Team shot 2</div>
        </div>
      </div>
    </section>
  );
}
