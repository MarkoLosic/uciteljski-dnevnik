import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { localeInfo } from '../i18n/config';
import { useLocale } from '../i18n/LocaleContext';

interface PageMeta {
  title: string | null; // bez imena sajta; `null` = početna („Ime sajta — tagline“)
  description: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const meta = (key: 'name' | 'property', name: string, content: string) =>
  setTag(
    `meta[${key}="${name}"]`,
    () => {
      const el = document.createElement('meta');
      el.setAttribute(key, name);
      return el;
    },
    'content',
    content,
  );

// Naslov i meta tagovi po stranici, bez dodatne biblioteke. Google izvršava JS i vidi ih;
// pregledi linkova na društvenim mrežama (bez JS-a) i dalje čitaju tagove iz index.html.
export function usePageMeta({ title, description, type = 'website', noindex = false }: PageMeta) {
  const { locale, t } = useLocale();
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} — ${siteConfig.name}` : `${siteConfig.name} — ${t.site.tagline}`;
    const url = `${siteConfig.url}${pathname === '/' ? '' : pathname.replace(/\/+$/, '')}`;

    document.title = fullTitle;
    meta('name', 'description', description);
    meta('property', 'og:title', fullTitle);
    meta('property', 'og:description', description);
    meta('property', 'og:type', type);
    meta('property', 'og:url', url);
    meta('property', 'og:site_name', siteConfig.name);
    meta('property', 'og:locale', localeInfo[locale].tag.replace(/-/g, '_'));
    setTag(
      'link[rel="canonical"]',
      () => {
        const el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        return el;
      },
      'href',
      url,
    );

    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) meta('name', 'robots', 'noindex');
    else robots?.remove();
  }, [title, description, type, noindex, locale, t, pathname]);
}
