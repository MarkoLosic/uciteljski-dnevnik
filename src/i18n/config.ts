// Deli se između vite.config.ts (Node) i aplikacije, zato ne sme da uvozi ništa što zavisi od okruženja.

export const LOCALES = ['sr', 'en', 'hr', 'bs', 'de'] as const;

export type Locale = (typeof LOCALES)[number];

// Podrazumevani jezik nema prefiks u URL-u (`/blog`); ostali ga imaju (`/en/blog`).
export const DEFAULT_LOCALE: Locale = 'sr';

interface LocaleInfo {
  name: string; // ime jezika na tom jeziku (za izbor jezika)
  tag: string; // BCP 47: <html lang> (bez zaključavanja en/de na jednu državu, radi cijelog DACH i globalnog EN prostora)
  ogLocale: string; // OpenGraph format jezik_REGION (og:locale zahtijeva region)
  dateTag: string; // BCP 47 za Intl.DateTimeFormat (evropski redoslijed dan–mjesec–godina)
  aboutSlug: string;
  gamesSlug: string;
  worksheetSlug: string;
  worldSlug: string; // Škole u svetu
  copyrightSlug: string; // Autorska prava
  contactSlug: string; // Kontakt forma
}

export const localeInfo: Record<Locale, LocaleInfo> = {
  sr: { name: 'Srpski', tag: 'sr-Latn-BA', ogLocale: 'sr_Latn_BA', dateTag: 'sr-Latn-BA', aboutSlug: 'o-meni', gamesSlug: 'igre', worksheetSlug: 'radni-listovi', worldSlug: 'skole-u-svetu', copyrightSlug: 'autorska-prava', contactSlug: 'kontakt' },
  en: { name: 'English', tag: 'en', ogLocale: 'en_GB', dateTag: 'en-GB', aboutSlug: 'about', gamesSlug: 'games', worksheetSlug: 'worksheets', worldSlug: 'schools-worldwide', copyrightSlug: 'copyright', contactSlug: 'contact' },
  hr: { name: 'Hrvatski', tag: 'hr-HR', ogLocale: 'hr_HR', dateTag: 'hr-HR', aboutSlug: 'o-meni', gamesSlug: 'igre', worksheetSlug: 'radni-listovi', worldSlug: 'skole-u-svijetu', copyrightSlug: 'autorska-prava', contactSlug: 'kontakt' },
  bs: { name: 'Bosanski', tag: 'bs-Latn-BA', ogLocale: 'bs_Latn_BA', dateTag: 'bs-Latn-BA', aboutSlug: 'o-meni', gamesSlug: 'igre', worksheetSlug: 'radni-listovi', worldSlug: 'skole-u-svijetu', copyrightSlug: 'autorska-prava', contactSlug: 'kontakt' },
  de: { name: 'Deutsch', tag: 'de', ogLocale: 'de_DE', dateTag: 'de-DE', aboutSlug: 'ueber-mich', gamesSlug: 'spiele', worksheetSlug: 'arbeitsblaetter', worldSlug: 'schulen-weltweit', copyrightSlug: 'urheberrecht', contactSlug: 'kontakt' },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}
