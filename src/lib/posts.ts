import type { Category, Post, PostMeta } from '../types/post';
import { isLocale, localeInfo, type Locale } from '../i18n/config';
import { validateFrontmatter } from './frontmatter';

// Frontmatter je već parsiran u vite.config.ts (plugin markdown-posts).
// Članci su po jezicima: content/posts/<jezik>/<slug>.md; prevod istog članka ima isti slug.
const modules = import.meta.glob('../content/posts/*/*.md', {
  import: 'default',
  eager: true,
}) as Record<string, { data: unknown; content: string }>;

let cachedPosts: Post[] | null = null;

function loadPosts(): Post[] {
  if (cachedPosts) return cachedPosts;

  const posts = Object.entries(modules).map(([filepath, { data, content }]): Post => {
    const [locale, filename] = filepath.split('/').slice(-2);
    if (!isLocale(locale)) throw new Error(`Nepoznat jezik članka "${locale}/${filename}"`);
    const frontmatter = validateFrontmatter(data, `${locale}/${filename}`);
    return { slug: filename.replace(/\.md$/, ''), locale, ...frontmatter, content };
  });

  cachedPosts = posts.sort((a, b) =>
    a.date === b.date ? a.title.localeCompare(b.title, localeInfo[a.locale].tag) : b.date.localeCompare(a.date),
  );
  return cachedPosts;
}

function toMeta({ content: _content, ...meta }: Post): PostMeta {
  return meta;
}

export function getAllPosts(locale: Locale): PostMeta[] {
  return loadPosts()
    .filter((post) => post.locale === locale)
    .map(toMeta);
}

export function getPostBySlug(locale: Locale, slug: string): Post | null {
  return loadPosts().find((post) => post.locale === locale && post.slug === slug) ?? null;
}

export function getPostsByCategory(locale: Locale, category: Category): PostMeta[] {
  return getAllPosts(locale).filter((post) => post.category === category);
}

export function getAllCategories(locale: Locale): Category[] {
  return [...new Set(getAllPosts(locale).map((post) => post.category))];
}

export function getRecentPosts(locale: Locale, count: number): PostMeta[] {
  return getAllPosts(locale).slice(0, count);
}
