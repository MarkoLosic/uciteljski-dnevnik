import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';
import { validateFrontmatter } from './src/lib/frontmatter';
import { DEFAULT_LOCALE, isLocale, localeInfo, LOCALES, type Locale } from './src/i18n/config';
import { siteConfig } from './src/config/site';
import { GAME_IDS, WORKSHEET_IDS, WORKSHEET_LOCALES } from './src/games/ids';

// gray-matter zavisi od Node-ovog Buffer-a, pa frontmatter parsiramo ovde (u Node-u),
// a ne u browseru. Validacija ovde znači da neispravan članak obara `npm run build`.
function markdownPosts(): Plugin {
  return {
    name: 'markdown-posts',
    transform(code, id) {
      if (!id.endsWith('.md')) return null;
      const { data, content } = matter(code);
      const locale = path.basename(path.dirname(id));
      const name = `${locale}/${path.basename(id)}`;
      if (!isLocale(locale)) {
        throw new Error(`Članak "${name}" mora biti u folderu jezika: ${LOCALES.join(', ')}`);
      }
      validateFrontmatter(data, name);
      return { code: `export default ${JSON.stringify({ data, content })};`, map: null };
    },
  };
}

type PageGroup = Partial<Record<Locale, { path: string; lastmod?: string }>>;

// Ista stranica na svim jezicima čini jednu grupu; iz nje nastaju hreflang veze u sitemap-u.
function sitemapGroups(): PageGroup[] {
  const base = (locale: Locale) => (locale === DEFAULT_LOCALE ? '' : `/${locale}`);
  const everywhere = (pathFor: (locale: Locale) => string, locales: readonly Locale[] = LOCALES): PageGroup =>
    Object.fromEntries(locales.map((locale) => [locale, { path: pathFor(locale) }]));
  const games = (locale: Locale) => `${base(locale)}/${localeInfo[locale].gamesSlug}`;

  const groups: PageGroup[] = [
    everywhere((locale) => base(locale) || '/'),
    everywhere((locale) => `${base(locale)}/blog`),
    everywhere((locale) => `${base(locale)}/${localeInfo[locale].aboutSlug}`),
    everywhere(games),
    ...GAME_IDS.map((id) => everywhere((locale) => `${games(locale)}/${id}`)),
    ...WORKSHEET_IDS.map((id) =>
      everywhere((locale) => `${games(locale)}/${localeInfo[locale].worksheetSlug}/${id}`, WORKSHEET_LOCALES[id]),
    ),
  ];

  const posts = new Map<string, PageGroup>();
  for (const locale of LOCALES) {
    const dir = path.resolve(__dirname, 'src/content/posts', locale);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      const slug = file.replace(/\.md$/, '');
      const { date } = validateFrontmatter(matter(fs.readFileSync(path.join(dir, file), 'utf8')).data, `${locale}/${file}`);
      const group = posts.get(slug) ?? {};
      group[locale] = { path: `${base(locale)}/blog/${slug}`, lastmod: date };
      posts.set(slug, group);
    }
  }
  return [...groups, ...posts.values()];
}

function sitemapXml(): string {
  const urls = sitemapGroups().flatMap((group) => {
    const entries = Object.entries(group) as [Locale, { path: string; lastmod?: string }][];
    const alternates = entries.map(
      ([locale, { path: p }]) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${siteConfig.url}${p}"/>`,
    );
    const fallback = group[DEFAULT_LOCALE];
    if (fallback) alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${siteConfig.url}${fallback.path}"/>`);
    return entries.map(([, { path: p, lastmod }]) =>
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

// robots.txt i sitemap.xml nastaju pri buildu iz istih podataka kao i rute, pa ih ne treba ručno ažurirati.
// Dok je siteConfig.url placeholder, sitemap se ne pravi (adrese bi bile pogrešne).
function seoFiles(): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /'];
      if (siteConfig.url.includes('example.')) {
        this.warn('siteConfig.url je još placeholder (src/config/site.ts) — sitemap.xml nije napravljen.');
      } else {
        robots.push('', `Sitemap: ${siteConfig.url}/sitemap.xml`);
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() });
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.join('\n')}\n` });
    },
  };
}

export default defineConfig({
  plugins: [markdownPosts(), seoFiles(), react(), tailwindcss()],
});
