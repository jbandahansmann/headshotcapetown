import type { Metadata } from "next";
import "../styles/globals.css";
import { siteConfig } from "../lib/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Corporate Headshots Cape Town | Headshot Cape Town",
    template: "%s | Headshot Cape Town",
  },
  description: siteConfig.description,
  keywords: [
    "corporate headshot photographer cape town",
    "headshot photographer cape town",
    "team headshots cape town",
    "linkedin photographer cape town",
    "professional headshots woodstock",
    "on-location headshots cape town",
    "business portrait photographer cape town",
  ],
  authors: [{ name: "Jürgen Banda-Hansmann" }],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Corporate Headshot Photographer Cape Town",
    description: siteConfig.description,
    images: [{ url: "/images/og-cover.jpg?v=2", width: 1200, height: 630, alt: "Headshot Cape Town" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Headshot Photographer Cape Town",
    description: siteConfig.description,
    images: ["/images/og-cover.jpg?v=2"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Photographer"],
  name: siteConfig.name,
  image: `${siteConfig.url}/images/og-cover.jpg?v=2`,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  priceRange: "R1,950 – R4,500+",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${siteConfig.studio.name}, ${siteConfig.studio.street}`,
    addressLocality: siteConfig.studio.suburb,
    addressRegion: "Western Cape",
    postalCode: siteConfig.studio.postal,
    addressCountry: siteConfig.studio.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: siteConfig.studio.lat, longitude: siteConfig.studio.lng },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    opens: "08:00", closes: "18:00",
  }],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: siteConfig.rating.value,
    reviewCount: siteConfig.rating.count,
    bestRating: 5, worstRating: 1,
  },
  founder: { "@type": "Person", name: "Jürgen Banda-Hansmann" },
  foundingDate: siteConfig.founded,
  areaServed: { "@type": "City", name: "Cape Town" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {siteConfig.ga ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.ga}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${siteConfig.ga}');`,
              }}
            />
          </>
        ) : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
