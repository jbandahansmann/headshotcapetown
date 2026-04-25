# SEO playbook — Headshot Cape Town

## Already implemented

- ✅ Static export = perfect Core Web Vitals
- ✅ Single H1 per page with primary keyword
- ✅ Semantic H2/H3 structure
- ✅ Title + meta description per page
- ✅ Open Graph + Twitter cards
- ✅ Schema.org `LocalBusiness` + `Photographer` + `AggregateRating` on homepage
- ✅ Schema.org `Article` on journal posts
- ✅ Sitemap.xml auto-generated
- ✅ robots.txt
- ✅ Canonical URLs
- ✅ FAQ section with 9 questions = long-tail keyword surface
- ✅ Journal section = ongoing content marketing
- ✅ Footer SEO links to dedicated landing pages

## Week-1 launch checklist

1. **Google Search Console** — verify `headshotcapetown.co.za` (DNS TXT record method)
2. **Submit sitemap** to Search Console: `https://headshotcapetown.co.za/sitemap.xml`
3. **Bing Webmaster** — verify and submit sitemap (carries Yahoo + DuckDuckGo)
4. **Google Business Profile** — create a *new* GBP for "Headshot Cape Town" (separate from the Jürgen's Photography GBP, allowed because it's a distinct service brand). Same address. Different phone optional.
5. **Add GA4 measurement ID** to Vercel env vars (`NEXT_PUBLIC_GA_ID`)

## Month 1–3 actions

- Watch Search Console "Performance" tab — note which queries you're already ranking for
- Build dedicated landing pages for top-performing queries (see `app/.PHASE_2_NOTES.md`)
- Publish 1 journal article every 2 weeks
- Get a backlink from each client's website ("Photography by …")

## Month 3–6 actions

- Add location pages: `/headshot-photographer-woodstock`, `/headshot-photographer-cbd`, etc.
- A/B test hero headline via Vercel's built-in experimentation
- Consider Google Ads for high-intent queries to bridge while organic ranking grows
