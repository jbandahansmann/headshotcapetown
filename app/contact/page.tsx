import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Booking from "../../components/Booking";
import CalCom from "../../components/CalCom";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import { siteConfig } from "../../lib/siteConfig";

const url = `${siteConfig.url}/contact`;
const title = "Contact | Headshot Cape Town";
const description = "Get in touch for corporate, team, or LinkedIn headshots in Cape Town. Studio in Woodstock or on-location across CT. We come back within one working day.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "website",
    locale: "en_ZA",
    siteName: siteConfig.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function ContactPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Contact", item: url },
    ],
  };

  return (
    <main>
      <Header />
      <section
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "clamp(48px, 7vw, 80px) clamp(28px, 6vw, 40px) clamp(24px, 4vw, 40px)",
        }}
      >
        <div className="eyebrow" style={{ color: "var(--bluegrey)" }}>Contact</div>
        <h1 className="headline headline-l" style={{ marginTop: 16 }}>
          Get in touch
        </h1>
        <p
          style={{
            fontSize: "clamp(16px, 1.8vw, 20px)",
            opacity: 0.75,
            marginTop: 24,
            lineHeight: 1.5,
            maxWidth: 640,
          }}
        >
          Tell us about your shoot using the form below, or reach out directly via
          email, phone, or WhatsApp. We come back within one working day with a
          quote and a couple of available times.
        </p>
      </section>
      <Booking />
      <CalCom />
      <Footer />
      <WhatsAppFloat />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </main>
  );
}
