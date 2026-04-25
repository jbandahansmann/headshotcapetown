import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function LogoStrip() {
  const dir = path.join(process.cwd(), "content", "client-logos");
  let logos: any[] = [];
  if (fs.existsSync(dir)) {
    logos = fs.readdirSync(dir)
      .filter(f => f.endsWith(".md"))
      .map(f => matter(fs.readFileSync(path.join(dir, f), "utf8")).data)
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  }
  return (
    <section style={{ padding: "0 64px 80px" }}>
      <div className="eyebrow" style={{ textAlign: "center", marginBottom: 28 }}>Photographed for</div>
      {logos.length ? (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(logos.length, 6)}, 1fr)`, gap: 48, alignItems: "center", justifyItems: "center" }}>
          {logos.map((l, i) => (
            <img key={i} src={l.logo} alt={l.name} style={{ height: 32, opacity: 0.55, filter: "grayscale(100%)" }} />
          ))}
        </div>
      ) : (
        <div className="placeholder" style={{ height: 80 }}>Client logos · upload via CMS</div>
      )}
    </section>
  );
}
