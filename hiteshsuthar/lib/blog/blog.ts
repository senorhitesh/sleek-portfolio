import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns";

const BLOGS_DIR = path.join(process.cwd(), "data", "blogs");

export interface BlogFrontmatter {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  coverImage?: string;
}
export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  return fs
    .readdirSync(BLOGS_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}
export function getBlogBySlug(slug: string): BlogPost | null {
  const mdxPath = path.join(BLOGS_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOGS_DIR, `${slug}.md`);

  const filePath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
    ? mdPath
    : null;

  if (!filePath) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    content,
  };
}

export function getAllBlogs(): BlogPost[] {
  const slugs = getAllBlogSlugs();
  const blogs = slugs
    .map((slug) => getBlogBySlug(slug))
    .filter((blog): blog is BlogPost => blog !== null);

  return blogs.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date || "").getTime();
    const dateB = new Date(b.frontmatter.date || "").getTime();
    return dateB - dateA;
  });
}

export function formatBlogDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return format(date, "MMMM d, yyyy");
    }
  } catch {
    // fallback
  }
  return dateStr;
}
