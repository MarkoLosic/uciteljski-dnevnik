import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { localeInfo, type Locale } from './config';
import { getCachedDictionary, loadDictionary, sr, type Dictionary } from './clientDictionaries';
import { pathsFor, type Paths } from './paths';

interface LocaleContextValue {
  locale: Locale;
  t: Dictionary;
  paths: Paths;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  locale: Locale;
  children: ReactNode;
}

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  const [loaded, setLoaded] = useState<{ locale: Locale; dict: Dictionary } | null>(() => {
    const cached = getCachedDictionary(locale);
    return cached ? { locale, dict: cached } : null;
  });

  useEffect(() => {
    document.documentElement.lang = localeInfo[locale].tag;
    const cached = getCachedDictionary(locale);
    if (cached) {
      setLoaded({ locale, dict: cached });
      return;
    }
    let active = true;
    loadDictionary(locale).then((dict) => {
      if (active) setLoaded({ locale, dict });
    });
    return () => {
      active = false;
    };
  }, [locale]);

  const dict = (loaded?.locale === locale ? loaded.dict : getCachedDictionary(locale)) ?? loaded?.dict ?? sr;
  const value = useMemo(() => ({ locale, t: dict, paths: pathsFor(locale) }), [locale, dict]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale mora biti unutar <LocaleProvider>');
  return value;
}
