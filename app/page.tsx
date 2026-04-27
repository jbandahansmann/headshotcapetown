import { readMarkdown, loadCollection, getAllJournalPosts } from "../lib/mdx";
import Header from "../components/Header";
import Hero from "../components/Hero";
import LogoStrip from "../components/LogoStrip";
import Personal from "../components/Personal";
import Pricing from "../components/Pricing";
import Process from "../components/Process";
import OnLocation from "../components/OnLocation";
import Testimonial from "../components/Testimonial";
import TestimonialGrid from "../components/TestimonialGrid";
import StudioInfo from "../components/StudioInfo";
import Journal from "../components/Journal";
import FAQ from "../components/FAQ";
import Booking from "../components/Booking";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";

export default async function Home() {
  const site = readMarkdown("site.md")?.data ?? {};
  const pricing = readMarkdown("pricing.md")?.data ?? {};
  const testimonials = loadCollection("testimonials").sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
  const featured = testimonials.find((t: any) => Array.isArray(t.featuredOn) && t.featuredOn.includes("homepage"));
  const others = testimonials.filter((t: any) => Array.isArray(t.pages) && t.pages.includes("homepage")).slice(0, 3);
  const journal = (await getAllJournalPosts()).slice(0, 3);

  return (
    <main>
      <Header />
      <Hero hero={site.hero} trust={site.trust} />
      <LogoStrip />
      <Personal portrait={site.personal?.portrait} />
      <Pricing packages={pricing.packages ?? []} />
      <Process steps={site.process?.steps ?? []} />
      <OnLocation data={site.on_location} />
      {featured && <Testimonial t={featured} />}
      <TestimonialGrid items={others} />
      <StudioInfo />
      <Journal posts={journal} />
      <FAQ items={site.faq ?? []} />
      <Booking />
      <FinalCTA />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
