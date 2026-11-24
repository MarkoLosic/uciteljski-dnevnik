import type { Locale } from '../i18n/config';

// Polja koja ima svaka zemlja — od njih nastaju kartica i tabela za poređenje.
// Nova činjenica: dodaj ključ ovde i oznaku u t.world.facts (svih pet rečnika).
export const COUNTRY_FACTS = [
  'schoolStart',
  'compulsory',
  'tracking',
  'primaryTeacher',
  'teacherEducation',
  'grading',
  'testing',
] as const;

export type CountryFact = (typeof COUNTRY_FACTS)[number];

export interface CountrySource {
  title: string;
  url: string;
}

export interface PisaScores {
  year: number;
  math: number;
  reading: number;
  science: number;
}

export interface TimssScores {
  year: number; // 4. razred
  math: number;
  science: number;
}

export interface PirlsScores {
  year: number; // 4. razred
  reading: number;
}

/** Međunarodna testiranja; izostavljeno = zemlja nije učestvovala. */
export interface CountryResults {
  pisa?: PisaScores;
  timss?: TimssScores;
  pirls?: PirlsScores;
}

// Prosek OECD-a za poslednji PISA ciklus (OECD, PISA 2025 Results, Volume I).
// TIMSS i PIRLS nemaju „prosek OECD-a“; centralna tačka njihove skale je 500.
export const PISA_OECD_AVERAGE: PisaScores = { year: 2025, math: 463, reading: 461, science: 482 };

export interface CountryFrontmatter {
  name: string;
  code: string; // ISO 3166-1 alpha-2, npr. "FI"
  excerpt: string;
  checked: string; // kada su podaci provereni, YYYY-MM-DD
  reference: boolean; // BiH: poredi se sa ostalima, ide prva
  keyIdea: string;
  facts: Record<CountryFact, string>;
  results: CountryResults;
  resultsNote?: string; // npr. „TIMSS bez RS i ZHK“
  sources: CountrySource[];
}

export interface CountryMeta extends CountryFrontmatter {
  id: string;
  locale: Locale;
}
