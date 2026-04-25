import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/siteConfig";
import { getJournalSlugs } from "../lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const journal = getJournalSlugs().map(slug => ({
    url: `${base}/journal/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const services = [
    "corporate-headshots-cape-town",
    "team-headshots-cape-town",
    "linkedin-photographer-cape-town",
  ].map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...services,
    { url: `${base}/journal`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...journal,
  ];
}
