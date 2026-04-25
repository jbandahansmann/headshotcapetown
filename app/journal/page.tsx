import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import { getAllJournalPosts } from "../../lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal — Notes from the studio",
  description: "Articles on corporate headshot photography in Cape Town: wardrobe guides, pricing, behind-the-scenes notes from the studio.",
};

export default async function JournalIndex() {
  const posts = await getAllJournalPosts();
  return (
    <main>
      <Header />
      <section style={{ padding: "100px 64px 60px" }}>
        <div className="eyebrow section-tag">Journal</div>
        <h1 className="headline" style={{ fontSize: 96, marginTop: 18, maxWidth: 900 }}>
          Notes from the <span className="italic">studio</span>.
        </h1>
        <p style={{ fontSize: 18, marginTop: 28, maxWidth: 600, opacity: 0.78, lineHeight: 1.55 }}>
          Wardrobe, pricing, process. The questions we hear most, answered in plain language.
        </p>
      </section>
      <section style={{ padding: "20px 64px 120px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="grid-2">
          {posts.map(p => (
            <Link key={p.slug} href={`/journal/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="placeholder" style={{ height: 240, marginBottom: 20 }}>
                {p.cover ? <img src={p.cover} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : `journal · ${p.tag}`}
              </div>
              <div className="eyebrow">{p.tag} · {p.readTime}</div>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400, marginTop: 10, lineHeight: 1.2 }}>{p.title}</h2>
              <p style={{ fontSize: 15, opacity: 0.7, marginTop: 12, lineHeight: 1.55 }}>{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
