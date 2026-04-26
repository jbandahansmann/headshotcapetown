import fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import parse, { Element, HTMLReactParserOptions } from "html-react-parser";
import sizeOf from "image-size";
import Image from "next/image";

function getDimensions(src: string): { width: number; height: number } {
  if (!src.startsWith("/")) return { width: 1200, height: 800 };
  try {
    const fullPath = path.join(process.cwd(), "public", src);
    const buffer = fs.readFileSync(fullPath);
    const dim = sizeOf(buffer);
    return { width: dim.width || 1200, height: dim.height || 800 };
  } catch {
    return { width: 1200, height: 800 };
  }
}

const parseOptions: HTMLReactParserOptions = {
  replace: (node) => {
    if (node instanceof Element && node.name === "img") {
      const src = node.attribs?.src;
      const alt = node.attribs?.alt ?? "";
      if (!src) return undefined;

      // External images skip optimisation (would need next.config domains config)
      if (!src.startsWith("/")) return undefined;

      const { width, height } = getDimensions(src);
      return (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 720px"
          style={{ width: "100%", height: "auto" }}
        />
      );
    }
  },
};

export default async function MarkdownBody({ content }: { content: string }) {
  const processed = await remark().use(remarkGfm).use(html).process(content);
  const htmlString = processed.toString();
  return <>{parse(htmlString, parseOptions)}</>;
}
