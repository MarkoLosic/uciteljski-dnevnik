// Deli se između vite.config.ts (Node) i aplikacije, zato ne sme da uvozi ništa što zavisi od okruženja.

export const LOCALES = ['sr', 'en', 'hr', 'bs', 'de'] as const;

export type Locale = (typeof LOCALES)[number];

// Podrazumevani jezik nema prefiks u URL-u (`/blog`); ostali ga imaju (`/en/blog`).
export const DEFAULT_LOCALE: Locale = 'sr';

interface LocaleInfo {
  name: string; // ime jezika na tom jeziku (za izbor jezika)
  tag: string; // BCP 47: <html lang> i Intl formatiranje
  aboutSlug: string;
  gamesSlug: string;
  worksheetSlug: string;
  worldSlug: string; // Škole u svetu
  copyrightSlug: string; // Autorska prava
}

export const localeInfo: Record<Locale, LocaleInfo> = {
  sr: { name: 'Srpski', tag: 'sr-Latn-BA', aboutSlug: 'o-meni', gamesSlug: 'igre', worksheetSlug: 'radni-listovi', worldSlug: 'skole-u-svetu', copyrightSlug: 'autorska-prava' },
  en: { name: 'English', tag: 'en-GB', aboutSlug: 'about', gamesSlug: 'games', worksheetSlug: 'worksheets', worldSlug: 'schools-worldwide', copyrightSlug: 'copyright' },
  hr: { name: 'Hrvatski', tag: 'hr-HR', aboutSlug: 'o-meni', gamesSlug: 'igre', worksheetSlug: 'radni-listovi', worldSlug: 'skole-u-svijetu', copyrightSlug: 'autorska-prava' },
  bs: { name: 'Bosanski', tag: 'bs-Latn-BA', aboutSlug: 'o-meni', gamesSlug: 'igre', worksheetSlug: 'radni-listovi', worldSlug: 'skole-u-svijetu', copyrightSlug: 'autorska-prava' },
  de: { name: 'Deutsch', tag: 'de-DE', aboutSlug: 'ueber-mich', gamesSlug: 'spiele', worksheetSlug: 'arbeitsblaetter', worldSlug: 'schulen-weltweit', copyrightSlug: 'urheberrecht' },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}
