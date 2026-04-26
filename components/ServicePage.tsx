import type { Metadata } from "next";
import { readMarkdown, loadCollection, renderMarkdownBody } from "../lib/mdx";
import { siteConfig } from "../lib/siteConfig";
import Header from "./Header";
import Hero from "./Hero";
import LogoStrip from "./LogoStrip";
import Pricing from "./Pricing";
import Process from "./Process";
import Testimonial from "./Testimonial";
import TestimonialGrid from "./TestimonialGrid";
import FAQ from "./FAQ";
import Booking from "./Booking";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";

function loadService(slug: string): { data: any; content: string } {
  const result = readMarkdown(`services/${slug}.md`);
  return { data: (result?.data as any) ?? {}, content: result?.content ?? "" };
}

export function getServiceMetadata(slug: string): Metadata {
  const { data: service } = loadService(slug);
  const url = `${siteConfig.url}/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url,
      type: "website",
      locale: "en_ZA",
      siteName: siteConfig.name,
      images: [{ url: service.hero?.portrait ?? "/images/og-cover.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({ slug }: { slug: string }) {
  const { data: service, content } = loadService(slug);
  const bodyHtml = content ? await renderMarkdownBody(content) : "";
  const site = readMarkdown("site.md")?.data as any ?? {};
  const pricing = readMarkdown("pricing.md")?.data as any ?? {};
  const pageTag = slug.split("-")[0]; // corporate / team / linkedin
  const allTestimonials = loadCollection("testimonials")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const featuredTestimonial = allTestimonials.find(
    (t) => Array.isArray(t.featuredOn) && t.featuredOn.includes(pageTag)
  );
  const testimonials = allTestimonials
    .filter((t) => Array.isArray(t.pages) && t.pages.includes(pageTag))
    .slice(0, 3);

  const url = `${siteConfig.url}/${service.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.serviceName,
    serviceType: "Photography",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${siteConfig.studio.name}, ${siteConfig.studio.street}`,
        addressLocality: siteConfig.studio.suburb,
        addressRegion: "Western Cape",
        postalCode: siteConfig.studio.postal,
        addressCountry: siteConfig.studio.country,
      },
    },
    areaServed: { "@type": "City", name: "Cape Town" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "ZAR",
      lowPrice: service.priceLow,
      highPrice: service.priceHigh,
    },
    url,
    description: service.metaDescription,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (service.faqs ?? []).map((f: any) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main>
      <Header />
      <Hero hero={service.hero} trust={site.trust} />
      <LogoStrip />
      <ServiceIntro intro={service.intro} />
      {bodyHtml && (
        <section className="section service-prose">
          <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        </section>
      )}
      <Pricing packages={pricing.packages ?? []} />
      <Process steps={site.process?.steps ?? []} />
      {featuredTestimonial && <Testimonial t={featuredTestimonial} />}
      <TestimonialGrid items={testimonials} />
      <FAQ items={service.faqs ?? []} />
      <Booking />
      <FinalCTA />
      <Footer />
      <WhatsAppFloat />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

function ServiceIntro({ intro }: { intro: any }) {
  if (!intro) return null;
  return (
    <section className="section">
      <div className="eyebrow section-tag">{intro.eyebrow ?? "Approach"}</div>
      <h2 className="headline headline-l" style={{ marginTop: 12, maxWidth: 780 }}>
        {intro.heading}
      </h2>
      <div
        className="grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "clamp(24px, 4vw, 48px)",
          marginTop: "clamp(32px, 4vw, 48px)",
          maxWidth: 1080,
        }}
      >
        {(intro.paragraphs ?? []).map((p: string, i: number) => (
          <p key={i} style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.85 }}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
