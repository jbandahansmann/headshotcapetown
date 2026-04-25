import type { Metadata } from "next";
import "../styles/globals.css";
import { siteConfig } from "../lib/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Corporate Headshot Photographer Cape Town | Headshot Cape Town",
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
  authors: [{ name: "Jurgen Ammerlaan" }],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Corporate Headshot Photographer Cape Town",
    description: siteConfig.description,
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630, alt: "Headshot Cape Town" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Headshot Photographer Cape Town",
    description: siteConfig.description,
    images: ["/images/og-cover.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Photographer"],
  name: siteConfig.name,
  image: `${siteConfig.url}/images/og-cover.jpg`,
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
  founder: { "@type": "Person", name: "Jurgen Ammerlaan" },
  foundingDate: siteConfig.founded,
  areaServed: { "@type": "City", name: "Cape Town" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function ready(cb){if(document.readyState!=="loading"){cb();}else{document.addEventListener("DOMContentLoaded",cb);}}ready(function(){if(!window.netlifyIdentity)return;window.netlifyIdentity.init({APIUrl:"https://curious-fenglisu-beffbf.netlify.app/.netlify/identity"});window.netlifyIdentity.on("init",function(user){if(!user){window.netlifyIdentity.on("login",function(){document.location.href="/admin/";});}});});})();`,
          }}
        />
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
