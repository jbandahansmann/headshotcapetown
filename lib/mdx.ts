import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  date: string;
  cover?: string;
  content: string;
};

export function getJournalSlugs(): string[] {
  const dir = path.join(contentDir, "journal");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}

export async function getJournalPost(slug: string): Promise<JournalPost> {
  const file = fs.readFileSync(path.join(contentDir, "journal", `${slug}.md`), "utf8");
  const { data, content } = matter(file);
  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    tag: data.tag,
    readTime: data.readTime,
    date: data.date,
    cover: data.cover,
    content,
  };
}

export async function getAllJournalPosts(): Promise<JournalPost[]> {
  const slugs = getJournalSlugs();
  const posts = await Promise.all(slugs.map(getJournalPost));
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function loadCollection(folder: string): any[] {
  const dir = path.join(contentDir, folder);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => matter(fs.readFileSync(path.join(dir, f), "utf8")).data);
}

export function readMarkdown(relPath: string) {
  const full = path.join(contentDir, relPath);
  if (!fs.existsSync(full)) return null;
  const { data, content } = matter(fs.readFileSync(full, "utf8"));
  return { data, content };
}
