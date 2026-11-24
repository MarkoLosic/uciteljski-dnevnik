import { CATEGORIES, type Category, type PostMeta } from '../types/post';
import { isLocale, localeInfo, type Locale } from '../i18n/config';
import { validateFrontmatter } from './frontmatter';

// Frontmatter parsira plugin markdown-posts u vite.config.ts. Isti .md fajl se uvozi dvaput:
// `?meta` (naslov, datum… — mali, odmah u glavnom paketu) i bez upita (tekst — zaseban chunk,
// učitava se tek kad se članak otvori). Putanja: content/posts/<jezik>/<slug>.md.
const metaModules = import.meta.glob('../content/posts/*/*.md', {
  query: '?meta',
  import: 'default',
  eager: true,
}) as Record<string, { data: unknown; readingMinutes: number; image?: string }>;

const contentModules = import.meta.glob('../content/posts/*/*.md', { import: 'default' }) as Record<
  string,
  () => Promise<string>
>;

interface Entry extends PostMeta {
  loadContent: () => Promise<string>;
}

let cachedEntries: Entry[] | null = null;

function loadEntries(): Entry[] {
  if (cachedEntries) return cachedEntries;

  const entries = Object.entries(metaModules).map(([filepath, { data, readingMinutes, image }]): Entry => {
    const file = filepath.replace(/\?.*$/, '');
    const [locale, filename] = file.split('/').slice(-2);
    if (!isLocale(locale)) throw new Error(`Nepoznat jezik članka "${locale}/${filename}"`);
    const frontmatter = validateFrontmatter(data, `${locale}/${filename}`);
    const loadContent = contentModules[file];
    if (!loadContent) throw new Error(`Nema sadržaja za članak "${locale}/${filename}"`);
    return { slug: filename.replace(/\.md$/, ''), locale, ...frontmatter, readingMinutes, image, loadContent };
  });

  cachedEntries = entries.sort((a, b) =>
    a.date === b.date ? a.title.localeCompare(b.title, localeInfo[a.locale].tag) : b.date.localeCompare(a.date),
  );
  return cachedEntries;
}

function toMeta({ loadContent: _loadContent, ...meta }: Entry): PostMeta {
  return meta;
}

export function getAllPosts(locale: Locale): PostMeta[] {
  return loadEntries()
    .filter((post) => post.locale === locale)
    .map(toMeta);
}

export function getPostBySlug(locale: Locale, slug: string): PostMeta | null {
  const entry = loadEntries().find((post) => post.locale === locale && post.slug === slug);
  return entry ? toMeta(entry) : null;
}

// Sirovi Markdown članka; `null` ako članak ne postoji.
export function loadPostContent(locale: Locale, slug: string): Promise<string> | null {
  return loadEntries().find((post) => post.locale === locale && post.slug === slug)?.loadContent() ?? null;
}

export function getPostsByCategory(locale: Locale, category: Category): PostMeta[] {
  return getAllPosts(locale).filter((post) => post.category === category);
}

export function getAllCategories(locale: Locale): Category[] {
  const used = new Set(getAllPosts(locale).map((post) => post.category));
  return CATEGORIES.filter((category) => used.has(category));
}

export function getRecentPosts(locale: Locale, count: number): PostMeta[] {
  return getAllPosts(locale).slice(0, count);
}

// Za kraj članka: prvo iz iste kategorije, pa najnoviji ostali.
export function getRelatedPosts(post: PostMeta, count: number): PostMeta[] {
  const others = getAllPosts(post.locale).filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  return [...same, ...others.filter((p) => p.category !== post.category)].slice(0, count);
}
