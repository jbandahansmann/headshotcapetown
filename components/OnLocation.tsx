export default function OnLocation({ data }: { data: any }) {
  return (
    <section className="section-x">
      <div className="grid-2-uneven" style={{ background: "var(--midnight)", color: "var(--paper)", padding: "clamp(48px, 7vw, 80px) clamp(28px, 5vw, 64px)" }}>
        <div>
          <div className="eyebrow section-tag" style={{ color: "#9ba0aa" }}>{data?.eyebrow}</div>
          <h2 className="headline headline-l" style={{ color: "var(--paper)", marginTop: 12 }}>
            {data?.headline}<br /><span className="italic" style={{ color: "var(--paper)" }}>{data?.headline_italic}</span>.
          </h2>
          <p style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.6, marginTop: 28, opacity: 0.78, maxWidth: 480 }}>{data?.body}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 44 }}>
            {data?.stats?.map((s: any) => (
              <div key={s.k} style={{ borderTop: "1px solid #ffffff26", paddingTop: 16 }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.1 }}>{s.k}</div>
                <div className="eyebrow" style={{ color: "#9ba0aa", marginTop: 6 }}>{s.v}</div>
              </div>
            ))}
          </div>
          <a href="#enquire" className="btn" style={{ marginTop: 44, background: "var(--paper)", color: "var(--midnight)" }}>Get a team quote →</a>
        </div>
        <div className="onloc-images">
          {data?.image_1 ? (
            <div style={{ position: "absolute", top: 0, right: 0, width: 380, height: 280, overflow: "hidden" }}>
              <img src={data.image_1} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ) : (
            <div className="placeholder" style={{ position: "absolute", top: 0, right: 0, width: 380, height: 280 }}>Team shot 1 — upload via CMS</div>
          )}
          {data?.image_2 ? (
            <div style={{ position: "absolute", bottom: 0, left: 0, width: 320, height: 360, overflow: "hidden" }}>
              <img src={data.image_2} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ) : (
            <div className="placeholder" style={{ position: "absolute", bottom: 0, left: 0, width: 320, height: 360 }}>Team shot 2 — upload via CMS</div>
          )}
        </div>
      </div>
    </section>
  );
}
