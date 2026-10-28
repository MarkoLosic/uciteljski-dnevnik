export const CATEGORIES = [
  'AI alati u nastavi',
  'Etika i AI',
  'Iskustva iz prakse',
  'Vijesti',
  'Resursi',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // ISO format: "YYYY-MM-DD"
  excerpt: string;
  category: Category;
}

export interface Post extends PostMeta {
  content: string; // sirovi Markdown
}

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  category: Category;
}
