"use client";
import { useState } from "react";
import { siteConfig, waLink } from "../lib/siteConfig";

export default function Booking() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch(siteConfig.formEndpoint, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="enquire" className="section" style={{ background: "var(--paper)" }}>
      <div className="grid-2-text-right">
        <div>
          <div className="eyebrow section-tag">Enquire</div>
          <h2 className="headline headline-m" style={{ marginTop: 12 }}>
            Tell us about<br /><span className="italic">your shoot</span>.
          </h2>
          <p style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.6, marginTop: 28, opacity: 0.78, maxWidth: 420 }}>
            We'll come back within one working day with a quote and a couple of available times.
          </p>
          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 18 }}>
            <a href={`mailto:${siteConfig.email}`} style={{ color: "var(--midnight)", textDecoration: "none", display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="eyebrow">Email</span>
              <span style={{ fontFamily: "var(--serif)", fontSize: "clamp(18px, 2vw, 22px)", wordBreak: "break-word" }}>{siteConfig.email}</span>
            </a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} style={{ color: "var(--midnight)", textDecoration: "none", display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="eyebrow">Phone</span>
              <span style={{ fontFamily: "var(--serif)", fontSize: "clamp(18px, 2vw, 22px)" }}>{siteConfig.phoneHuman}</span>
            </a>
            <a href={waLink("Hi Jürgen, I'd like a quote for headshots.")} target="_blank" rel="noopener" style={{ color: "var(--midnight)", textDecoration: "none", display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="eyebrow">WhatsApp</span>
              <span style={{ fontFamily: "var(--serif)", fontSize: "clamp(18px, 2vw, 22px)" }}>Chat now →</span>
            </a>
          </div>
        </div>
        <form onSubmit={onSubmit} className="booking-form">
          <Field label="Your name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Phone (optional)" name="phone" />
          <Field label="Company (optional)" name="company" />
          <FieldSelect label="Type of shoot" name="type" options={["Personal — Essential","Personal — Signature","Team — in studio","Team — on location","Not sure yet"]} required />
          <Field label="Team size (if applicable)" name="size" />
          <Field label="Preferred timing" name="when" placeholder="e.g. Late April, weekday mornings" />
          <Field label="Tell us a bit more" name="notes" textarea />
          <button type="submit" disabled={status === "sending"} className="btn btn-primary" style={{ marginTop: 12 }}>
            {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send enquiry"}
          </button>
          {status === "error" && <p style={{ color: "#b00020", fontSize: 14 }}>Something went wrong. Try WhatsApp or email above.</p>}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required = false, placeholder, textarea }: any) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span className="eyebrow">{label}{required && " *"}</span>
      {textarea ? (
        <textarea name={name} required={required} placeholder={placeholder} rows={4} style={inputStyle} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} style={inputStyle} />
      )}
    </label>
  );
}

function FieldSelect({ label, name, options, required }: any) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span className="eyebrow">{label}{required && " *"}</span>
      <select name={name} required={required} style={inputStyle} defaultValue="">
        <option value="" disabled>Select…</option>
        {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  border: "1px solid #02135326",
  background: "#fff",
  padding: "14px 16px",
  fontSize: 15,
  fontFamily: "var(--sans)",
  color: "var(--midnight)",
  width: "100%",
};
