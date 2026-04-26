import fs from "fs";
import path from "path";
import matter from "gray-matter";
import sizeOf from "image-size";
import Image from "next/image";

function getDimensions(src: string): { width: number; height: number } {
  if (!src.startsWith("/")) return { width: 300, height: 100 };
  try {
    const fullPath = path.join(process.cwd(), "public", src);
    const buffer = fs.readFileSync(fullPath);
    const dim = sizeOf(buffer);
    return { width: dim.width || 300, height: dim.height || 100 };
  } catch {
    return { width: 300, height: 100 };
  }
}

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
    <section className="section-x" style={{ paddingBottom: "clamp(48px, 7vw, 80px)" }}>
      <div className="eyebrow" style={{ textAlign: "center", marginBottom: 28 }}>Photographed for</div>
      {logos.length ? (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(110px, 1fr))`, gap: "clamp(20px, 4vw, 48px)", alignItems: "center", justifyItems: "center" }}>
          {logos.map((l, i) => {
            const { width, height } = getDimensions(l.logo);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: l.darkBg ? "10px 16px" : 0,
                  background: l.darkBg ? "var(--midnight)" : "transparent",
                  borderRadius: l.darkBg ? 4 : 0,
                  width: "100%",
                }}
              >
                <Image
                  src={l.logo}
                  alt={l.name}
                  width={width}
                  height={height}
                  sizes="200px"
                  style={{
                    maxHeight: 36,
                    maxWidth: 150,
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    opacity: l.darkBg ? 1 : 0.85,
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="placeholder" style={{ height: 80 }}>Client logos · upload via CMS</div>
      )}
    </section>
  );
}
