import type { Category, Post, PostMeta } from '../types/post';
import { validateFrontmatter } from './frontmatter';

// Frontmatter je već parsiran u vite.config.ts (plugin markdown-posts).
const modules = import.meta.glob('../content/posts/*.md', {
  import: 'default',
  eager: true,
}) as Record<string, { data: unknown; content: string }>;

let cachedPosts: Post[] | null = null;

function loadPosts(): Post[] {
  if (cachedPosts) return cachedPosts;

  const posts = Object.entries(modules).map(([filepath, { data, content }]): Post => {
    const filename = filepath.split('/').pop() ?? filepath;
    const frontmatter = validateFrontmatter(data, filename);
    return { slug: filename.replace(/\.md$/, ''), ...frontmatter, content };
  });

  cachedPosts = posts.sort((a, b) =>
    a.date === b.date ? a.title.localeCompare(b.title, 'sr') : b.date.localeCompare(a.date),
  );
  return cachedPosts;
}

function toMeta({ content: _content, ...meta }: Post): PostMeta {
  return meta;
}

export function getAllPosts(): PostMeta[] {
  return loadPosts().map(toMeta);
}

export function getPostBySlug(slug: string): Post | null {
  return loadPosts().find((post) => post.slug === slug) ?? null;
}

export function getPostsByCategory(category: Category): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getAllCategories(): Category[] {
  return [...new Set(getAllPosts().map((post) => post.category))];
}

export function getRecentPosts(count: number): PostMeta[] {
  return getAllPosts().slice(0, count);
}
