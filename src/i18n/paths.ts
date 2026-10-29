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

  const postMatch = /^\/blog\/([^/]+)$/.exec(rest);
  if (postMatch) {
    const slug = postMatch[1];
    return getPostBySlug(to, slug) ? target.post(slug) : target.blog;
  }
  return target.home;
}
