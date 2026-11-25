import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { documentTitle } from './seo';
import { DEFAULT_LOCALE, LOCALES, localeInfo } from '../i18n/config';
import { alternatePathForLocale } from '../i18n/paths';
import { useLocale } from '../i18n/LocaleContext';

interface PageMeta {
  title: string | null; // bez imena sajta; `null` = početna („Ime sajta — tagline“)
  description: string;
  type?: 'website' | 'article';
  image?: string; // relativna putanja slike (npr. `/slike/og-listovi/...`), podrazumijevano `/slike/og-slika.jpg`
  noindex?: boolean;
}

const DEFAULT_OG_IMAGE = '/slike/og-slika.jpg';
const initialPath = typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') || '/' : '/';

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

// Naslov, meta tagovi, og:image i hreflang veze po stranici (uključujući klijentsku SPA navigaciju).
export function usePageMeta({ title, description, type = 'website', image, noindex = false }: PageMeta) {
  const { locale, t } = useLocale();
  const { pathname } = useLocation();

  useEffect(() => {
    const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    const fullTitle = documentTitle(title, t);
    const url = `${siteConfig.url}${cleanPath === '/' ? '' : cleanPath}`;
    const imageUrl = `${siteConfig.url}${image ?? DEFAULT_OG_IMAGE}`;

    document.title = fullTitle;
    meta('name', 'description', description);
    meta('property', 'og:title', fullTitle);
    meta('property', 'og:description', description);
    meta('property', 'og:type', type);
    meta('property', 'og:url', url);
    meta('property', 'og:site_name', siteConfig.name);
    meta('property', 'og:locale', localeInfo[locale].ogLocale);
    meta('property', 'og:image', imageUrl);

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

    // Ako je korisnik (ili Googlebot tokom JS renderovanja) prešao na drugu SPA rutu,
    // uklanjamo zastarjeli statični JSON-LD sa početne rute i osvježavamo hreflang linkove.
    if (cleanPath !== initialPath) {
      document.head.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());
      document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

      if (!noindex) {
        for (const targetLocale of LOCALES) {
          const targetPath = alternatePathForLocale(cleanPath, locale, targetLocale);
          if (!targetPath) continue;
          const href = `${siteConfig.url}${targetPath === '/' ? '' : targetPath}`;
          const link = document.createElement('link');
          link.setAttribute('rel', 'alternate');
          link.setAttribute('hreflang', targetLocale);
          link.setAttribute('href', href);
          document.head.appendChild(link);
        }
        const defaultPath = alternatePathForLocale(cleanPath, locale, DEFAULT_LOCALE);
        if (defaultPath) {
          const xDefault = document.createElement('link');
          xDefault.setAttribute('rel', 'alternate');
          xDefault.setAttribute('hreflang', 'x-default');
          xDefault.setAttribute('href', `${siteConfig.url}${defaultPath === '/' ? '' : defaultPath}`);
          document.head.appendChild(xDefault);
        }
      }
    }

    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) meta('name', 'robots', 'noindex');
    else robots?.remove();
  }, [title, description, type, image, noindex, locale, t, pathname]);
}
