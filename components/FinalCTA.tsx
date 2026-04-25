import { siteConfig } from "../lib/siteConfig";

export default function FinalCTA() {
  return (
    <section style={{ padding: "140px 64px", textAlign: "center", background: "var(--paper)" }}>
      <div className="eyebrow section-tag">Book a session</div>
      <h2 className="headline" style={{ fontSize: 120, marginTop: 18 }}>
        Let's make<br /><span className="italic">something good</span>.
      </h2>
      <p style={{ fontSize: 18, opacity: 0.7, marginTop: 32, maxWidth: 540, marginLeft: "auto", marginRight: "auto", lineHeight: 1.55 }}>
        Tell us a little about your shoot. We'll come back within one working day with a quote and a couple of available times.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 44, flexWrap: "wrap" }}>
        <a href="#enquire" className="btn btn-primary">Request a quote</a>
        <a href={`https://wa.me/${siteConfig.whatsappNumber}`} className="btn btn-secondary">WhatsApp {siteConfig.phoneHuman}</a>
      </div>
    </section>
  );
}
