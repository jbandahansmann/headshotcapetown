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
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/journal`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...journal,
  ];
}
