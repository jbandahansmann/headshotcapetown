import Link from "next/link";

export default function Journal({ posts }: { posts: any[] }) {
  return (
    <section className="section" style={{ background: "#fff", borderTop: "1px solid #02135319" }}>
      <div className="journal-head">
        <div>
          <div className="eyebrow section-tag">Journal</div>
          <h2 className="headline headline-m" style={{ marginTop: 12 }}>
            Notes from the <span className="italic">studio</span>.
          </h2>
        </div>
        <Link href="/journal" style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--midnight)", borderBottom: "1px solid var(--midnight)", textDecoration: "none" }}>
          All articles →
        </Link>
      </div>
      <div className="grid-3" style={{ gap: "clamp(24px, 3vw, 32px)" }}>
        {posts.map(p => (
          <Link key={p.slug} href={`/journal/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="placeholder" style={{ height: 240, marginBottom: 20 }}>{p.cover ? <img src={p.cover} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : `journal · ${p.tag}`}</div>
            <div className="eyebrow">{p.tag} · {p.readTime}</div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 2.6vw, 26px)", fontWeight: 400, marginTop: 10, lineHeight: 1.2 }}>{p.title}</h3>
            <p style={{ fontSize: 15, opacity: 0.7, marginTop: 12, lineHeight: 1.55 }}>{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
