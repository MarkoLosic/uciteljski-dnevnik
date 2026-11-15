// Lektire za 1–5. razred: tipovi i spiskovi iz nastavnih programa.
// Bez React-a i import.meta — koristi ga i vite.config.ts (statični HTML i sitemap).

import type { Locale } from '../i18n/config';

// Stranica postoji samo na jezicima za koje je sadržaj napisan (BiH programi: srpski i bosanski).
export const LEKTIRE_LOCALES: readonly Locale[] = ['sr', 'bs'];
export const LEKTIRE_SLUG = 'lektire';
export const hasLektire = (locale: Locale) => LEKTIRE_LOCALES.includes(locale);

export const LEKTIRE_RAZREDI = [1, 2, 3, 4, 5] as const;
export type LektireRazred = (typeof LEKTIRE_RAZREDI)[number];

export const LEKTIRE_SISTEMI = ['rs', 'fbih'] as const;
export type LektireSistem = (typeof LEKTIRE_SISTEMI)[number];

export interface Djelo {
  autor?: string; // narodne bajke, zbirke i izbori nemaju jednog autora
  naslov: string;
  napomena?: string; // „po izboru“, „dvije bajke“…
}

export interface Spisak {
  djela: Djelo[];
  napomena?: string; // npr. „Učitelj bira 5 od 9 naslova.“ ili zašto spiska nema
}

export interface Preporuka extends Djelo {
  zasto: string;
}

export interface Izvor {
  title: string;
  url: string;
}

export interface LektireSadrzaj {
  intro: string;
  note: string;
  checked: string; // datum provjere spiskova, YYYY-MM-DD
  sistemi: Record<LektireSistem, { naziv: string; opis: string }>;
  razredi: Record<LektireRazred, { rs: Spisak; fbih: Spisak; preporuke: Preporuka[] }>;
  savjeti: { title: string; text: string }[];
  izvori: Izvor[];
}
