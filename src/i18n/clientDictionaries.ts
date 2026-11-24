import { DEFAULT_LOCALE, isLocale, type Locale } from './config';
import { sr, type Dictionary } from './locales/sr';

const cache: Partial<Record<Locale, Dictionary>> = { sr };

const loaders: Record<Exclude<Locale, 'sr'>, () => Promise<Dictionary>> = {
  en: () => import('./locales/en').then((m) => m.en),
  hr: () => import('./locales/hr').then((m) => m.hr),
  bs: () => import('./locales/bs').then((m) => m.bs),
  de: () => import('./locales/de').then((m) => m.de),
};

export function getCachedDictionary(locale: Locale): Dictionary | undefined {
  return cache[locale];
}

export async function loadDictionary(locale: Locale): Promise<Dictionary> {
  const existing = cache[locale];
  if (existing) return existing;
  const loaded = await loaders[locale as Exclude<Locale, 'sr'>]();
  cache[locale] = loaded;
  return loaded;
}

export function detectLocaleFromPath(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0];
  return isLocale(first) ? first : DEFAULT_LOCALE;
}

export { sr };
export type { Dictionary };
