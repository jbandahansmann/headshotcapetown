import Image from "next/image";

export default function Personal({ portrait }: { portrait?: string }) {
  return (
    <section className="section" style={{ background: "#fff", borderTop: "1px solid #02135319", borderBottom: "1px solid #02135319" }}>
      <div className="grid-2-uneven">
        <div>
          <div className="eyebrow section-tag">Personal · For individuals</div>
          <h2 className="headline headline-l" style={{ marginTop: 12 }}>
            Headshots that<br />work as <span className="italic">hard as you do</span>.
          </h2>
          <p style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.6, marginTop: 28, opacity: 0.78, maxWidth: 480 }}>
            Whether it's for LinkedIn, your About page, a speaker bio, or a press kit — a single
            polished portrait pulls double duty for years. We'll spend an hour making sure you
            actually like the result.
          </p>
          <ul style={{ listStyle: "none", marginTop: 32, display: "flex", flexDirection: "column", gap: 14, fontSize: 15 }}>
            {["60-minute studio session","Multiple looks: corporate, casual, B&W","Tethered shoot — choose your selects on the day","Full retouch on 5 final images","48-hour turnaround"].map(s => (
              <li key={s} style={{ display: "flex", gap: 12 }}>
                <span style={{ color: "var(--navy)", fontFamily: "var(--mono)" }}>✓</span> {s}
              </li>
            ))}
          </ul>
        </div>
        {portrait ? (
          <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
            <Image
              src={portrait}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div style={{ aspectRatio: "4/5" }} className="placeholder">Personal portrait — upload via CMS</div>
        )}
      </div>
    </section>
  );
}
