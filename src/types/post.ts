import type { Locale } from '../i18n/config';

export const CATEGORIES = [
  'AI alati u nastavi',
  'Etika i AI',
  'Iskustva iz prakse',
  'Vijesti',
  'Resursi',
] as const;

export type Category = (typeof CATEGORIES)[number];

// Kategorija u URL-u filtera (`/blog?kategorija=resursi`); ista na svim jezicima.
export const CATEGORY_SLUGS: Record<Category, string> = {
  'AI alati u nastavi': 'ai-alati',
  'Etika i AI': 'etika',
  'Iskustva iz prakse': 'iskustva',
  Vijesti: 'vijesti',
  Resursi: 'resursi',
};

export interface PostMeta {
  slug: string;
  locale: Locale; // iz imena foldera: content/posts/<jezik>/
  title: string;
  date: string; // ISO format: "YYYY-MM-DD"
  excerpt: string;
  category: Category;
  readingMinutes: number; // procena iz broja reči (vite.config.ts)
}

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  category: Category;
}
