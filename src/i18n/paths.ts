import { DEFAULT_LOCALE, localeInfo, type Locale } from './config';
import { getPostBySlug } from '../lib/posts';

export function localeBase(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '' : `/${locale}`;
}

export function pathsFor(locale: Locale) {
  const base = localeBase(locale);
  return {
    home: base || '/',
    blog: `${base}/blog`,
    post: (slug: string) => `${base}/blog/${slug}`,
    about: `${base}/${localeInfo[locale].aboutSlug}`,
    games: `${base}/${localeInfo[locale].gamesSlug}`,
    game: (id: string) => `${base}/${localeInfo[locale].gamesSlug}/${id}`,
    worksheet: (id: string) => `${base}/${localeInfo[locale].gamesSlug}/${localeInfo[locale].worksheetSlug}/${id}`,
  };
}

export type Paths = ReturnType<typeof pathsFor>;

// Ista stranica na drugom jeziku. Članak bez prevoda vodi na listu članaka tog jezika.
export function switchLocalePath(pathname: string, from: Locale, to: Locale): string {
  const target = pathsFor(to);
  const base = localeBase(from);
  const rest = (pathname.startsWith(base) ? pathname.slice(base.length) : pathname).replace(/\/+$/, '');

  if (rest === '') return target.home;
  if (rest === '/blog') return target.blog;
  if (rest === `/${localeInfo[from].aboutSlug}`) return target.about;

  const gamesSlug = localeInfo[from].gamesSlug;
  if (rest === `/${gamesSlug}`) return target.games;
  const sheetMatch = new RegExp(`^/${gamesSlug}/${localeInfo[from].worksheetSlug}/([^/]+)$`).exec(rest);
  if (sheetMatch) return target.worksheet(sheetMatch[1]);
  const gameMatch = new RegExp(`^/${gamesSlug}/([^/]+)$`).exec(rest);
  if (gameMatch) return target.game(gameMatch[1]);

  const postMatch = /^\/blog\/([^/]+)$/.exec(rest);
  if (postMatch) {
    const slug = postMatch[1];
    return getPostBySlug(to, slug) ? target.post(slug) : target.blog;
  }
  return target.home;
}
