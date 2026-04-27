import Image from "next/image";
import { Stars } from "./Stars";

export default function Hero({ hero, trust }: { hero: any; trust: any }) {
  return (
    <section className="section grid-2-uneven" style={{ paddingTop: "clamp(48px, 7vw, 80px)", paddingBottom: "clamp(56px, 8vw, 100px)" }}>
      <div>
        <div className="eyebrow">{hero?.eyebrow}</div>
        <h1 className="headline headline-xl" style={{ marginTop: 28 }}>
          {hero?.headline_line1}<br />
          {hero?.headline_line2}<br />
          <span className="italic">{hero?.headline_italic}</span>—<br />
          {hero?.headline_line3}
        </h1>
        <p style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.55, opacity: 0.78, marginTop: "clamp(24px, 3vw, 36px)", maxWidth: 480 }}>
          {hero?.body}
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: "clamp(28px, 4vw, 44px)", flexWrap: "wrap" }}>
          <a href="#enquire" className="btn btn-primary">{hero?.primary_cta}</a>
          <a href="https://wa.me/27789190454" className="btn btn-secondary">{hero?.secondary_cta}</a>
        </div>
        <div className="grid-stats" style={{ marginTop: "clamp(36px, 5vw, 56px)", paddingTop: "clamp(24px, 3vw, 36px)", borderTop: "1px solid #02135319" }}>
          <div>
            <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4.5vw, 36px)", color: "var(--navy)", lineHeight: 1, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              {trust?.rating?.toFixed(1)} <Stars size={16} />
            </div>
            <div className="eyebrow" style={{ marginTop: 6 }}>{trust?.rating_count} Google reviews</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4.5vw, 36px)", color: "var(--navy)", lineHeight: 1 }}>{trust?.years}<span style={{ fontSize: "0.6em" }}> yrs</span></div>
            <div className="eyebrow" style={{ marginTop: 6 }}>In business</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4.5vw, 36px)", color: "var(--navy)", lineHeight: 1 }}>{trust?.clients_count}</div>
            <div className="eyebrow" style={{ marginTop: 6 }}>Clients photographed</div>
          </div>
        </div>
      </div>
      {hero?.portrait ? (
        <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
          <Image
            src={hero.portrait}
            alt={hero.portraitAlt ?? "Corporate headshot example by Headshot Cape Town"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : (
        <div style={{ aspectRatio: "4/5", background: "#e8e4dc" }} className="placeholder">
          Hero portrait — upload via CMS
        </div>
      )}
    </section>
  );
}
