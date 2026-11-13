import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';
import { readingMinutes, validateFrontmatter } from './src/lib/frontmatter';
import { validateCountry } from './src/lib/countryFrontmatter';
import { DEFAULT_LOCALE, isLocale, localeInfo, LOCALES, type Locale } from './src/i18n/config';
import { dictionaries } from './src/i18n/dictionaries';
import { siteConfig } from './src/config/site';
import { documentTitle, pageMeta, type PageMetaText } from './src/lib/seo';
import { GAME_IDS, WORKSHEET_IDS, WORKSHEET_LOCALES } from './src/games/ids';
import type { PostFrontmatter } from './src/types/post';
import type { CountryFrontmatter } from './src/types/country';

// gray-matter zavisi od Node-ovog Buffer-a, pa frontmatter parsiramo ovde (u Node-u),
// a ne u browseru. Validacija ovde znači da neispravan članak obara `npm run build`.
// `x.md?meta` vraća samo podatke o članku (ide u glavni paket), `x.md` samo tekst (zaseban chunk).
function markdownPosts(): Plugin {
  return {
    name: 'markdown-posts',
    transform(code, id) {
      const [file, query] = id.split('?');
      if (!file.endsWith('.md')) return null;
      const { data, content } = matter(code);
      const locale = path.basename(path.dirname(file));
      const name = `${locale}/${path.basename(file)}`;
      if (!isLocale(locale)) {
        throw new Error(`Fajl "${name}" mora biti u folderu jezika: ${LOCALES.join(', ')}`);
      }
      // content/countries/ → zemlje, content/world/ → zaključci (Škole u svetu), sve ostalo → članci bloga.
      if (file.includes('/content/world/')) {
        return { code: `export default ${JSON.stringify(content)};`, map: null };
      }
      if (file.includes('/content/countries/')) {
        validateCountry(data, name);
        const value = query === 'meta' ? { data } : content;
        return { code: `export default ${JSON.stringify(value)};`, map: null };
      }
      validateFrontmatter(data, name);
      const value = query === 'meta' ? { data, readingMinutes: readingMinutes(content) } : content;
      return { code: `export default ${JSON.stringify(value)};`, map: null };
    },
  };
}

interface SourcePost extends PostFrontmatter {
  slug: string;
  locale: Locale;
  image?: { src: string; alt: string }; // prva slika u tekstu → og:image
}

function readPosts(): SourcePost[] {
  return LOCALES.flatMap((locale) => {
    const dir = path.resolve(__dirname, 'src/content/posts', locale);
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((file): SourcePost => {
        const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
        const img = /!\[([^\]]*)\]\((\/[^\s)]+)/.exec(content);
        return {
          slug: file.replace(/\.md$/, ''),
          locale,
          ...validateFrontmatter(data, `${locale}/${file}`),
          image: img ? { src: img[2], alt: img[1] } : undefined,
        };
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  });
}

interface SourceCountry extends CountryFrontmatter {
  id: string;
  locale: Locale;
}

function readCountries(): SourceCountry[] {
  return LOCALES.flatMap((locale) => {
    const dir = path.resolve(__dirname, 'src/content/countries', locale);
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((file): SourceCountry => ({
        id: file.replace(/\.md$/, ''),
        locale,
        ...validateCountry(matter(fs.readFileSync(path.join(dir, file), 'utf8')).data, `${locale}/${file}`),
      }));
  });
}

interface Page {
  path: string;
  meta: PageMetaText;
  lastmod?: string;
  article?: SourcePost;
}

type PageGroup = Partial<Record<Locale, Page>>;

const base = (locale: Locale) => (locale === DEFAULT_LOCALE ? '' : `/${locale}`);

// Ista stranica na svim jezicima čini jednu grupu; iz nje nastaju hreflang veze.
// Nova vrsta stranice → dodaj je ovde (sitemap i statični HTML se prave iz ovog spiska).
function pageGroups(posts: SourcePost[], countries: SourceCountry[]): PageGroup[] {
  const everywhere = (page: (locale: Locale) => Page, locales: readonly Locale[] = LOCALES): PageGroup =>
    Object.fromEntries(locales.map((locale) => [locale, page(locale)]));
  const games = (locale: Locale) => `${base(locale)}/${localeInfo[locale].gamesSlug}`;
  const t = (locale: Locale) => dictionaries[locale];

  const groups: PageGroup[] = [
    everywhere((l) => ({ path: base(l) || '/', meta: pageMeta.home(t(l)) })),
    everywhere((l) => ({ path: `${base(l)}/blog`, meta: pageMeta.blog(t(l)) })),
    everywhere((l) => ({ path: `${base(l)}/${localeInfo[l].aboutSlug}`, meta: pageMeta.about(t(l)) })),
    everywhere((l) => ({ path: games(l), meta: pageMeta.games(t(l)) })),
    ...GAME_IDS.map((id) => everywhere((l) => ({ path: `${games(l)}/${id}`, meta: pageMeta.game(t(l), id) }))),
    ...WORKSHEET_IDS.map((id) =>
      everywhere(
        (l) => ({ path: `${games(l)}/${localeInfo[l].worksheetSlug}/${id}`, meta: pageMeta.worksheet(t(l), id) }),
        WORKSHEET_LOCALES[id],
      ),
    ),
  ];

  const bySlug = new Map<string, PageGroup>();
  for (const post of posts) {
    const group = bySlug.get(post.slug) ?? {};
    group[post.locale] = {
      path: `${base(post.locale)}/blog/${post.slug}`,
      meta: { title: post.title, description: post.excerpt },
      lastmod: post.date,
      article: post,
    };
    bySlug.set(post.slug, group);
  }
  // Škole u svetu: samo jezici koji imaju bar jednu zemlju.
  const world = (locale: Locale) => `${base(locale)}/${localeInfo[locale].worldSlug}`;
  const worldLocales = LOCALES.filter((l) => countries.some((c) => c.locale === l));
  if (worldLocales.length > 0) {
    groups.push(everywhere((l) => ({ path: world(l), meta: pageMeta.world(t(l)) }), worldLocales));
  }
  const byCountry = new Map<string, PageGroup>();
  for (const country of countries) {
    const group = byCountry.get(country.id) ?? {};
    group[country.locale] = {
      path: `${world(country.locale)}/${country.id}`,
      meta: pageMeta.country(t(country.locale), country),
      lastmod: country.checked,
    };
    byCountry.set(country.id, group);
  }

  return [...groups, ...byCountry.values(), ...bySlug.values()];
}

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const groupEntries = (group: PageGroup) => Object.entries(group) as [Locale, Page][];

function alternateLinks(group: PageGroup, tag: 'xhtml:link' | 'link'): string[] {
  const links = groupEntries(group).map(
    ([locale, page]) => `<${tag} rel="alternate" hreflang="${locale}" href="${siteConfig.url}${page.path}"/>`,
  );
  const fallback = group[DEFAULT_LOCALE];
  if (fallback) links.push(`<${tag} rel="alternate" hreflang="x-default" href="${siteConfig.url}${fallback.path}"/>`);
  return links;
}

function sitemapXml(groups: PageGroup[]): string {
  const urls = groups.flatMap((group) => {
    const alternates = alternateLinks(group, 'xhtml:link').map((l) => `    ${l}`);
    return groupEntries(group).map(([, { path: p, lastmod }]) =>
      ['  <url>', `    <loc>${siteConfig.url}${p}</loc>`, ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []), ...alternates, '  </url>'].join('\n'),
    );
  });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

const rssPath = (locale: Locale) => `${base(locale)}/rss.xml`;

function rssXml(locale: Locale, posts: SourcePost[]): string {
  const t = dictionaries[locale];
  const items = posts.map((post) => {
    const url = `${siteConfig.url}${base(locale)}/blog/${post.slug}`;
    return [
      '    <item>',
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>`,
      `      <category>${escapeXml(t.categories[post.category])}</category>`,
      `      <description>${escapeXml(post.excerpt)}</description>`,
      '    </item>',
    ].join('\n');
  });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(siteConfig.name)}</title>`,
    `    <link>${siteConfig.url}${base(locale)}/blog</link>`,
    `    <description>${escapeXml(t.site.description)}</description>`,
    `    <language>${localeInfo[locale].tag}</language>`,
    `    <atom:link href="${siteConfig.url}${rssPath(locale)}" rel="self" type="application/rss+xml"/>`,
    ...(posts[0] ? [`    <lastBuildDate>${new Date(`${posts[0].date}T00:00:00Z`).toUTCString()}</lastBuildDate>`] : []),
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
}

// Statični HTML po ruti: isti index.html, ali sa naslovom, opisom i og:* tagovima te stranice.
// Pregledi linkova (Viber, Facebook, WhatsApp) ne izvršavaju JS, pa bez ovoga svi linkovi izgledaju isto.
function pageHtml(template: string, locale: Locale, page: Page, group: PageGroup, hasRss: boolean): string {
  const t = dictionaries[locale];
  const title = documentTitle(page.meta.title, t);
  const url = `${siteConfig.url}${page.path === '/' ? '' : page.path}`;
  let html = template;

  const replace = (pattern: RegExp, value: string) => {
    if (!pattern.test(html)) throw new Error(`seo-files: index.html nema ${pattern}`);
    html = html.replace(pattern, value);
  };
  const meta = (attr: 'name' | 'property', name: string, content: string) =>
    replace(new RegExp(`<meta\\s+${attr}="${name}"\\s+content="[^"]*"\\s*/>`), `<meta ${attr}="${name}" content="${escapeXml(content)}" />`);

  replace(/<html lang="[^"]*"/, `<html lang="${localeInfo[locale].tag}"`);
  replace(/<title>[^<]*<\/title>/, `<title>${escapeXml(title)}</title>`);
  meta('name', 'description', page.meta.description);
  meta('property', 'og:title', title);
  meta('property', 'og:description', page.meta.description);
  meta('property', 'og:type', page.article ? 'article' : 'website');
  meta('property', 'og:url', url);
  meta('property', 'og:locale', localeInfo[locale].tag.replace(/-/g, '_'));
  replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`);

  const image = page.article?.image;
  if (image) {
    meta('property', 'og:image', `${siteConfig.url}${image.src}`);
    meta('property', 'og:image:alt', image.alt);
    html = html.replace(/\s*<meta property="og:image:(width|height)"[^>]*>/g, '');
  }

  const extra = [
    ...alternateLinks(group, 'link'),
    ...(hasRss ? [`<link rel="alternate" type="application/rss+xml" title="${escapeXml(siteConfig.name)}" href="${siteConfig.url}${rssPath(locale)}"/>`] : []),
    ...(page.article ? [`<meta property="article:published_time" content="${page.article.date}" />`] : []),
  ];
  return html.replace('</head>', `  ${extra.join('\n    ')}\n  </head>`);
}

// robots.txt, sitemap.xml, RSS po jeziku i statični HTML po ruti nastaju pri buildu iz istih podataka
// kao i rute, pa ih ne treba ručno ažurirati. Dok je siteConfig.url placeholder, prave se samo robots.txt.
function seoFiles(): Plugin {
  const placeholder = siteConfig.url.includes('example.');
  let posts: SourcePost[] = [];
  let groups: PageGroup[] = [];
  const postsOf = (locale: Locale) => posts.filter((p) => p.locale === locale);

  return {
    name: 'seo-files',
    apply: 'build',
    enforce: 'post',
    buildStart() {
      posts = readPosts();
      groups = pageGroups(posts, readCountries());
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /'];
      if (placeholder) {
        this.warn('siteConfig.url je još placeholder (src/config/site.ts) — sitemap.xml, RSS i HTML po ruti nisu napravljeni.');
      } else {
        robots.push('', `Sitemap: ${siteConfig.url}/sitemap.xml`);
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml(groups) });
        for (const locale of LOCALES) {
          if (postsOf(locale).length === 0) continue;
          this.emitFile({ type: 'asset', fileName: rssPath(locale).slice(1), source: rssXml(locale, postsOf(locale)) });
        }
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.join('\n')}\n` });
    },
    writeBundle(options, bundle) {
      const index = bundle['index.html'];
      if (placeholder || !options.dir || index?.type !== 'asset') return;
      const template = String(index.source);
      for (const group of groups) {
        for (const [locale, page] of groupEntries(group)) {
          const file = path.join(options.dir, page.path, 'index.html');
          fs.mkdirSync(path.dirname(file), { recursive: true });
          fs.writeFileSync(file, pageHtml(template, locale, page, group, postsOf(locale).length > 0));
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [markdownPosts(), seoFiles(), react(), tailwindcss()],
});
