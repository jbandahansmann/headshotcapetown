import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import WhatsAppFloat from "../../../components/WhatsAppFloat";
import { getJournalSlugs, getJournalPost } from "../../../lib/mdx";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
  return getJournalSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getJournalPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function JournalPost({ params }: { params: { slug: string } }) {
  const post = await getJournalPost(params.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: "Jürgen Banda-Hansmann" },
    publisher: { "@type": "Organization", name: "Headshot Cape Town" },
  };

  return (
    <main>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(48px, 7vw, 80px) clamp(20px, 5vw, 32px) clamp(64px, 10vw, 120px)" }}>
        <Link href="/journal" style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--bluegrey)", textDecoration: "none" }}>← All articles</Link>
        <div className="eyebrow" style={{ marginTop: 32 }}>{post.tag} · {post.readTime}</div>
        <h1 className="headline headline-l" style={{ marginTop: 16 }}>{post.title}</h1>
        <p style={{ fontSize: "clamp(16px, 1.8vw, 20px)", opacity: 0.75, marginTop: 24, lineHeight: 1.5 }}>{post.excerpt}</p>
        <div className="prose" style={{ marginTop: 48, fontSize: "clamp(16px, 1.6vw, 18px)", lineHeight: 1.7 }}
             dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
