import { siteConfig } from "../lib/siteConfig";

export default function StudioInfo() {
  const s = siteConfig.studio;
  const mapsQuery = encodeURIComponent(`${s.name}, ${s.street}, ${s.suburb}, ${s.city}`);
  return (
    <section className="section-x" style={{ paddingBottom: "clamp(64px, 10vw, 120px)" }}>
      <div className="studio-grid">
        <div className="studio-panel">
          <div className="eyebrow section-tag">Studio</div>
          <h3 className="headline headline-s" style={{ marginTop: 12, lineHeight: 1.05 }}>
            {s.name},<br />{s.suburb}.
          </h3>
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 18, fontSize: 15 }}>
            <div><div className="eyebrow" style={{ marginBottom: 4 }}>Address</div>{s.street}, {s.suburb}, {s.city}</div>
            <div><div className="eyebrow" style={{ marginBottom: 4 }}>Hours</div>By appointment, Mon–Fri 8am–6pm</div>
            <div><div className="eyebrow" style={{ marginBottom: 4 }}>Parking</div>Free on-site parking, lift access to studio</div>
            <div><div className="eyebrow" style={{ marginBottom: 4 }}>Travel</div>On-location anywhere in Cape Town · R4,500 setup + R750/head</div>
          </div>
        </div>
        <iframe
          title="Studio location"
          src={`https://maps.google.com/maps?q=${mapsQuery}&output=embed`}
          className="studio-map"
          loading="lazy"
        />
      </div>
    </section>
  );
}
