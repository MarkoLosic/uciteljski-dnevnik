import type { Locale } from '../i18n/config';
import { isLocale, localeInfo } from '../i18n/config';
import type { CountryMeta, PisaScores } from '../types/country';
import { validateCountry } from './countryFrontmatter';

// Isti obrazac kao posts.ts: frontmatter parsira plugin markdown-posts (vite.config.ts),
// `?meta` je mali i ide odmah, tekst se učitava tek kad se zemlja otvori.
// Putanja: content/countries/<jezik>/<id>.md — prevod ima isto ime fajla.
const metaModules = import.meta.glob('../content/countries/*/*.md', {
  query: '?meta',
  import: 'default',
  eager: true,
}) as Record<string, { data: unknown }>;

const contentModules = import.meta.glob('../content/countries/*/*.md', { import: 'default' }) as Record<
  string,
  () => Promise<string>
>;

// Prosek OECD-a za poslednji PISA ciklus (OECD, PISA 2025 Results, Volume I).
// TIMSS i PIRLS nemaju „prosek OECD-a“; centralna tačka njihove skale je 500.
export const PISA_OECD_AVERAGE: PisaScores = { year: 2025, math: 463, reading: 461, science: 482 };

// Uvod i zaključci za stranicu Škole u svetu: content/world/<jezik>/zakljucci.md (bez frontmattera).
const summaryModules = import.meta.glob('../content/world/*/*.md', { import: 'default' }) as Record<
  string,
  () => Promise<string>
>;

export function loadWorldSummary(locale: Locale): Promise<string> | null {
  return summaryModules[`../content/world/${locale}/zakljucci.md`]?.() ?? null;
}

interface Entry extends CountryMeta {
  loadContent: () => Promise<string>;
}

let cachedEntries: Entry[] | null = null;

function loadEntries(): Entry[] {
  if (cachedEntries) return cachedEntries;
  cachedEntries = Object.entries(metaModules)
    .map(([filepath, { data }]): Entry => {
      const file = filepath.replace(/\?.*$/, '');
      const [locale, filename] = file.split('/').slice(-2);
      if (!isLocale(locale)) throw new Error(`Nepoznat jezik zemlje "${locale}/${filename}"`);
      const loadContent = contentModules[file];
      if (!loadContent) throw new Error(`Nema sadržaja za zemlju "${locale}/${filename}"`);
      return {
        id: filename.replace(/\.md$/, ''),
        locale,
        ...validateCountry(data, `${locale}/${filename}`),
        loadContent,
      };
    })
    // Referentna zemlja (BiH) prva, ostale po imenu.
    .sort((a, b) =>
      a.reference !== b.reference ? (a.reference ? -1 : 1) : a.name.localeCompare(b.name, localeInfo[a.locale].tag),
    );
  return cachedEntries;
}

function toMeta({ loadContent: _loadContent, ...meta }: Entry): CountryMeta {
  return meta;
}

export function getAllCountries(locale: Locale): CountryMeta[] {
  return loadEntries()
    .filter((c) => c.locale === locale)
    .map(toMeta);
}

export function hasCountries(locale: Locale): boolean {
  return loadEntries().some((c) => c.locale === locale);
}

export function getCountry(locale: Locale, id: string): CountryMeta | null {
  const entry = loadEntries().find((c) => c.locale === locale && c.id === id);
  return entry ? toMeta(entry) : null;
}

export function loadCountryContent(locale: Locale, id: string): Promise<string> | null {
  return loadEntries().find((c) => c.locale === locale && c.id === id)?.loadContent() ?? null;
}
