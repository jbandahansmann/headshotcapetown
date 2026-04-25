import Link from "next/link";

export default function Journal({ posts }: { posts: any[] }) {
  return (
    <section style={{ padding: "120px 64px 100px", background: "#fff", borderTop: "1px solid #02135319" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
        <div>
          <div className="eyebrow section-tag">Journal</div>
          <h2 className="headline" style={{ fontSize: 56, marginTop: 12 }}>
            Notes from the <span className="italic">studio</span>.
          </h2>
        </div>
        <Link href="/journal" style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--midnight)", borderBottom: "1px solid var(--midnight)", textDecoration: "none" }}>
          All articles →
        </Link>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="grid-2">
        {posts.map(p => (
          <Link key={p.slug} href={`/journal/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="placeholder" style={{ height: 240, marginBottom: 20 }}>{p.cover ? <img src={p.cover} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : `journal · ${p.tag}`}</div>
            <div className="eyebrow">{p.tag} · {p.readTime}</div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 26, fontWeight: 400, marginTop: 10, lineHeight: 1.2 }}>{p.title}</h3>
            <p style={{ fontSize: 15, opacity: 0.7, marginTop: 12, lineHeight: 1.55 }}>{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
