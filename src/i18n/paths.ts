import { DEFAULT_LOCALE, localeInfo, type Locale } from './config';
import { getPostBySlug } from '../lib/posts';
import { getCountry } from '../lib/countries';
import { isGameId, isWorksheetId, worksheetsFor } from '../games/ids';
import { LEKTIRE_SLUG, hasLektire } from '../lektire/types';

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
    worksheets: `${base}/${localeInfo[locale].worksheetSlug}`,
    worksheet: (id: string) => `${base}/${localeInfo[locale].worksheetSlug}/${id}`,
    world: `${base}/${localeInfo[locale].worldSlug}`,
    country: (id: string) => `${base}/${localeInfo[locale].worldSlug}/${id}`,
    lektire: `${base}/${LEKTIRE_SLUG}`,
    copyright: `${base}/${localeInfo[locale].copyrightSlug}`,
    contact: `${base}/${localeInfo[locale].contactSlug}`,
  };
}

export type Paths = ReturnType<typeof pathsFor>;

// Ista stranica na drugom jeziku. Članak bez prevoda vodi na listu članaka tog jezika,
// a zemlja bez prevoda na stranicu Škole u svetu.
export function switchLocalePath(pathname: string, from: Locale, to: Locale): string {
  const target = pathsFor(to);
  const base = localeBase(from);
  const rest = (pathname.startsWith(base) ? pathname.slice(base.length) : pathname).replace(/\/+$/, '');

  if (rest === '') return target.home;
  if (rest === '/blog') return target.blog;
  if (rest === `/${localeInfo[from].aboutSlug}`) return target.about;
  if (rest === `/${localeInfo[from].copyrightSlug}`) return target.copyright;
  if (rest === `/${localeInfo[from].contactSlug}`) return target.contact;

  const worksheetSlug = localeInfo[from].worksheetSlug;
  if (rest === `/${worksheetSlug}` || rest === '/bojanke') return target.worksheets;
  const directSheetMatch = new RegExp(`^/(?:${worksheetSlug}|bojanke)/([^/]+)$`).exec(rest);
  if (directSheetMatch) {
    const id = directSheetMatch[1];
    return isWorksheetId(id) && worksheetsFor(to).includes(id) ? target.worksheet(id) : target.worksheets;
  }

  const gamesSlug = localeInfo[from].gamesSlug;
  if (rest === `/${gamesSlug}`) return target.games;
  const sheetMatch = new RegExp(`^/${gamesSlug}/${localeInfo[from].worksheetSlug}/([^/]+)$`).exec(rest);
  if (sheetMatch) {
    const id = sheetMatch[1];
    return isWorksheetId(id) && worksheetsFor(to).includes(id) ? target.worksheet(id) : target.worksheets;
  }
  const gameMatch = new RegExp(`^/${gamesSlug}/([^/]+)$`).exec(rest);
  if (gameMatch) {
    const id = gameMatch[1];
    return isGameId(id) ? target.game(id) : target.games;
  }

  const worldSlug = localeInfo[from].worldSlug;
  if (rest === `/${worldSlug}`) return target.world;
  const countryMatch = new RegExp(`^/${worldSlug}/([^/]+)$`).exec(rest);
  if (countryMatch) return getCountry(to, countryMatch[1]) ? target.country(countryMatch[1]) : target.world;

  if (rest === `/${LEKTIRE_SLUG}`) return hasLektire(to) ? target.lektire : target.home;

  const postMatch = /^\/blog\/([^/]+)$/.exec(rest);
  if (postMatch) {
    const slug = postMatch[1];
    return getPostBySlug(to, slug) ? target.post(slug) : target.blog;
  }
  return target.home;
}

// Tačan ekvivalent stranice za <link rel="alternate" hreflang="...">:
// vraća null ako stranica ne postoji na ciljnom jeziku (npr. ćirilični list na EN/DE ili /lektire na EN/DE).
export function alternatePathForLocale(pathname: string, from: Locale, to: Locale): string | null {
  const target = pathsFor(to);
  const base = localeBase(from);
  const rest = (pathname.startsWith(base) ? pathname.slice(base.length) : pathname).replace(/\/+$/, '');

  if (rest === '') return target.home;
  if (rest === '/blog') return target.blog;
  if (rest === `/${localeInfo[from].aboutSlug}`) return target.about;
  if (rest === `/${localeInfo[from].copyrightSlug}`) return target.copyright;
  if (rest === `/${localeInfo[from].contactSlug}`) return target.contact;

  const worksheetSlug = localeInfo[from].worksheetSlug;
  if (rest === `/${worksheetSlug}` || rest === '/bojanke') return target.worksheets;
  const directSheetMatch = new RegExp(`^/(?:${worksheetSlug}|bojanke)/([^/]+)$`).exec(rest);
  if (directSheetMatch) {
    const id = directSheetMatch[1];
    return isWorksheetId(id) && worksheetsFor(to).includes(id) ? target.worksheet(id) : null;
  }

  const gamesSlug = localeInfo[from].gamesSlug;
  if (rest === `/${gamesSlug}`) return target.games;
  const sheetMatch = new RegExp(`^/${gamesSlug}/${localeInfo[from].worksheetSlug}/([^/]+)$`).exec(rest);
  if (sheetMatch) {
    const id = sheetMatch[1];
    return isWorksheetId(id) && worksheetsFor(to).includes(id) ? target.worksheet(id) : null;
  }
  const gameMatch = new RegExp(`^/${gamesSlug}/([^/]+)$`).exec(rest);
  if (gameMatch) {
    const id = gameMatch[1];
    return isGameId(id) ? target.game(id) : null;
  }

  const worldSlug = localeInfo[from].worldSlug;
  if (rest === `/${worldSlug}`) return target.world;
  const countryMatch = new RegExp(`^/${worldSlug}/([^/]+)$`).exec(rest);
  if (countryMatch) return getCountry(to, countryMatch[1]) ? target.country(countryMatch[1]) : null;

  if (rest === `/${LEKTIRE_SLUG}`) return hasLektire(to) ? target.lektire : null;

  const postMatch = /^\/blog\/([^/]+)$/.exec(rest);
  if (postMatch) {
    const slug = postMatch[1];
    return getPostBySlug(to, slug) ? target.post(slug) : null;
  }
  return null;
}
