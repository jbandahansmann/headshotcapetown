import { Stars } from "./Stars";

export default function Hero({ hero, trust }: { hero: any; trust: any }) {
  return (
    <section style={{ padding: "80px 64px 100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
      <div>
        <div className="eyebrow">{hero?.eyebrow}</div>
        <h1 className="headline" style={{ fontSize: 110, marginTop: 28 }}>
          {hero?.headline_line1}<br />
          {hero?.headline_line2}<br />
          <span className="italic">{hero?.headline_italic}</span>—<br />
          {hero?.headline_line3}
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.55, opacity: 0.78, marginTop: 36, maxWidth: 480 }}>
          {hero?.body}
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: 44 }}>
          <a href="#enquire" className="btn btn-primary">{hero?.primary_cta}</a>
          <a href="https://wa.me/27789190454" className="btn btn-secondary">{hero?.secondary_cta}</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 56, marginTop: 56, paddingTop: 36, borderTop: "1px solid #02135319" }}>
          <div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 36, color: "var(--navy)", lineHeight: 1, display: "flex", alignItems: "center", gap: 8 }}>
              {trust?.rating?.toFixed(1)} <Stars size={16} />
            </div>
            <div className="eyebrow" style={{ marginTop: 6 }}>{trust?.rating_count} Google reviews</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 36, color: "var(--navy)", lineHeight: 1 }}>{trust?.years}<span style={{ fontSize: 22 }}> yrs</span></div>
            <div className="eyebrow" style={{ marginTop: 6 }}>In business</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 36, color: "var(--navy)", lineHeight: 1 }}>{trust?.clients_count}</div>
            <div className="eyebrow" style={{ marginTop: 6 }}>Clients photographed</div>
          </div>
        </div>
      </div>
      <div style={{ aspectRatio: "4/5", background: "#e8e4dc" }} className="placeholder">
        Hero portrait — replace via CMS
      </div>
    </section>
  );
}
