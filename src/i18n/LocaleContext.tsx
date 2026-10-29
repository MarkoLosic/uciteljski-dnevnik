import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { localeInfo, type Locale } from './config';
import { dictionaries, type Dictionary } from './dictionaries';
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
  const value = useMemo(() => ({ locale, t: dictionaries[locale], paths: pathsFor(locale) }), [locale]);

  useEffect(() => {
    document.documentElement.lang = localeInfo[locale].tag;
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale mora biti unutar <LocaleProvider>');
  return value;
}
