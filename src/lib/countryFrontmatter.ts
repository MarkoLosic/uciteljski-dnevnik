import {
  COUNTRY_FACTS,
  type CountryFact,
  type CountryFrontmatter,
  type CountryResults,
  type CountrySource,
} from '../types/country';
import { todayIso } from './frontmatter';

// Deli se između vite.config.ts (Node, pri buildu) i countries.ts (browser),
// zato ne sme da uvozi ništa što zavisi od okruženja.

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function validateCountry(data: unknown, filename: string): CountryFrontmatter {
  const fail = (reason: string): never => {
    throw new Error(`Neispravan frontmatter zemlje u "${filename}": ${reason}`);
  };
  const text = (value: unknown, field: string, min: number, max: number): string => {
    if (typeof value !== 'string') return fail(`"${field}" nedostaje ili nije tekst`);
    const v = value.trim();
    if (v.length < min || v.length > max) fail(`"${field}" mora imati ${min}–${max} karaktera (ima ${v.length})`);
    return v;
  };

  if (typeof data !== 'object' || data === null) fail('frontmatter nedostaje');
  const d = data as Record<string, unknown>;

  const name = text(d.name, 'name', 2, 40);
  const code = text(d.code, 'code', 2, 2);
  if (!/^[A-Z]{2}$/.test(code)) fail('"code" mora biti dvoslovna ISO oznaka velikim slovima, npr. "FI"');
  const excerpt = text(d.excerpt, 'excerpt', 80, 200);
  const keyIdea = text(d.keyIdea, 'keyIdea', 20, 220);

  if (d.checked instanceof Date) fail('"checked" mora biti pod navodnicima, npr. checked: "2026-11-13"');
  const checked = text(d.checked, 'checked', 10, 10);
  if (!ISO_DATE.test(checked) || Number.isNaN(new Date(checked).getTime())) fail('"checked" mora biti datum YYYY-MM-DD');
  if (checked > todayIso()) fail(`"checked" je u budućnosti (${checked})`);

  if (d.reference !== undefined && typeof d.reference !== 'boolean') fail('"reference" mora biti true ili false');

  if (typeof d.facts !== 'object' || d.facts === null) fail('"facts" nedostaje');
  const rawFacts = d.facts as Record<string, unknown>;
  const facts = Object.fromEntries(
    COUNTRY_FACTS.map((key) => [key, text(rawFacts[key], `facts.${key}`, 3, 240)]),
  ) as Record<CountryFact, string>;

  const score = (value: unknown, field: string): number => {
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 200 || value > 800) {
      return fail(`"${field}" mora biti ceo broj poena (200–800)`);
    }
    return value;
  };
  const year = (value: unknown, field: string): number => {
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 1995 || value > 2100) {
      return fail(`"${field}" mora biti godina, npr. 2025`);
    }
    return value;
  };
  const block = (value: unknown, field: string): Record<string, unknown> | undefined => {
    if (value === undefined) return undefined;
    if (typeof value !== 'object' || value === null) return fail(`"${field}" mora imati polja (year, …)`);
    return value as Record<string, unknown>;
  };

  if (d.results !== undefined && (typeof d.results !== 'object' || d.results === null)) fail('"results" mora imati polja pisa/timss/pirls');
  const r = (d.results ?? {}) as Record<string, unknown>;
  const pisa = block(r.pisa, 'results.pisa');
  const timss = block(r.timss, 'results.timss');
  const pirls = block(r.pirls, 'results.pirls');
  const results: CountryResults = {
    ...(pisa && {
      pisa: {
        year: year(pisa.year, 'results.pisa.year'),
        math: score(pisa.math, 'results.pisa.math'),
        reading: score(pisa.reading, 'results.pisa.reading'),
        science: score(pisa.science, 'results.pisa.science'),
      },
    }),
    ...(timss && {
      timss: {
        year: year(timss.year, 'results.timss.year'),
        math: score(timss.math, 'results.timss.math'),
        science: score(timss.science, 'results.timss.science'),
      },
    }),
    ...(pirls && {
      pirls: { year: year(pirls.year, 'results.pirls.year'), reading: score(pirls.reading, 'results.pirls.reading') },
    }),
  };
  const resultsNote = d.resultsNote === undefined ? undefined : text(d.resultsNote, 'resultsNote', 10, 240);

  if (!Array.isArray(d.sources) || d.sources.length === 0) fail('"sources" mora imati bar jedan izvor');
  const sources = (d.sources as unknown[]).map((s, i): CountrySource => {
    const { title, url } = (typeof s === 'object' && s !== null ? s : {}) as Record<string, unknown>;
    const u = text(url, `sources[${i}].url`, 10, 300);
    if (!u.startsWith('https://')) fail(`"sources[${i}].url" mora počinjati sa https://`);
    return { title: text(title, `sources[${i}].title`, 3, 140), url: u };
  });

  return { name, code, excerpt, checked, reference: d.reference === true, keyIdea, facts, results, resultsNote, sources };
}
