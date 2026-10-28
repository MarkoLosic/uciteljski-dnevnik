import { CATEGORIES, type Category, type PostFrontmatter } from '../types/post';

// Deli se između vite.config.ts (Node, pri buildu) i posts.ts (browser),
// zato ne sme da uvozi ništa što zavisi od okruženja.

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function isCategory(value: unknown): value is Category {
  return typeof value === 'string' && (CATEGORIES as readonly string[]).includes(value);
}

function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

export function validateFrontmatter(data: unknown, filename: string): PostFrontmatter {
  const fail = (reason: string): never => {
    throw new Error(`Neispravan frontmatter u "${filename}": ${reason}`);
  };

  if (typeof data !== 'object' || data === null) fail('frontmatter nedostaje');
  const { title, date, excerpt, category } = data as Record<string, unknown>;

  if (typeof title !== 'string') fail('"title" nedostaje ili nije tekst');
  const t = title as string;
  if (t.length < 10 || t.length > 80) fail(`"title" mora imati 10–80 karaktera (ima ${t.length})`);
  if (t.endsWith('.')) fail('"title" ne sme završavati tačkom');

  if (date instanceof Date) fail('"date" mora biti pod navodnicima, npr. date: "2026-10-27"');
  if (typeof date !== 'string' || !ISO_DATE.test(date)) fail('"date" mora biti u formatu YYYY-MM-DD');
  const d = date as string;
  if (Number.isNaN(new Date(d).getTime())) fail(`"date" nije ispravan datum (${d})`);
  if (d > todayIso()) fail(`"date" je u budućnosti (${d})`);

  if (typeof excerpt !== 'string') fail('"excerpt" nedostaje ili nije tekst');
  const e = excerpt as string;
  if (e.length < 80 || e.length > 200) fail(`"excerpt" mora imati 80–200 karaktera (ima ${e.length})`);

  if (!isCategory(category)) fail(`"category" mora biti jedna od: ${CATEGORIES.join(', ')}`);

  return { title: t, date: d, excerpt: e, category: category as Category };
}
