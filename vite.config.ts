import { defineConfig, loadEnv, type Plugin } from 'vite';
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
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatDate } from './src/lib/formatDate';
import { WORKSHEET_THUMBNAILS } from './src/games/thumbnails';
import { LEKTIRE } from './src/lektire';
import { LEKTIRE_LOCALES, LEKTIRE_RAZREDI, LEKTIRE_SISTEMI, LEKTIRE_SLUG, type Djelo } from './src/lektire/types';
import { napraviStranicePriprema, type StranicaPripreme } from './plugins/pripremeStranice';

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
  content: string;
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
          content,
        };
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  });
}

interface SourceCountry extends CountryFrontmatter {
  id: string;
  locale: Locale;
  content: string;
}

function readCountries(): SourceCountry[] {
  return LOCALES.flatMap((locale) => {
    const dir = path.resolve(__dirname, 'src/content/countries', locale);
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((file): SourceCountry => {
        const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
        return { id: file.replace(/\.md$/, ''), locale, ...validateCountry(data, `${locale}/${file}`), content };
      });
  });
}

interface Page {
  path: string;
  meta: PageMetaText;
  lastmod?: string;
  kind?: 'home' | 'about' | 'lektire' | 'copyright';
  article?: SourcePost;
  country?: SourceCountry;
  image?: { src: string; alt: string }; // og:image (jpg/png — pregledi linkova ne prikazuju SVG)
}

type PageGroup = Partial<Record<Locale, Page>>;

const base = (locale: Locale) => (locale === DEFAULT_LOCALE ? '' : `/${locale}`);

// Ista stranica na svim jezicima čini jednu grupu; iz nje nastaju hreflang veze.
// Nova vrsta stranice → dodaj je ovde (sitemap i statični HTML se prave iz ovog spiska).
function pageGroups(posts: SourcePost[], countries: SourceCountry[]): PageGroup[] {
  const everywhere = (page: (locale: Locale) => Page, locales: readonly Locale[] = LOCALES): PageGroup =>
    Object.fromEntries(locales.map((locale) => [locale, page(locale)]));
  const games = (locale: Locale) => `${base(locale)}/${localeInfo[locale].gamesSlug}`;
  // Isto kao paths.worksheets u src/i18n/paths.ts (stare adrese /igre/radni-listovi/* preusmjerava vercel.json).
  const worksheets = (locale: Locale) => `${base(locale)}/${localeInfo[locale].worksheetSlug}`;
  const t = (locale: Locale) => dictionaries[locale];

  const groups: PageGroup[] = [
    everywhere((l) => ({ path: base(l) || '/', meta: pageMeta.home(t(l)), kind: 'home' })),
    everywhere((l) => ({ path: `${base(l)}/blog`, meta: pageMeta.blog(t(l)) })),
    everywhere((l) => ({ path: `${base(l)}/${localeInfo[l].aboutSlug}`, meta: pageMeta.about(t(l)), kind: 'about' })),
    everywhere((l) => ({
      path: `${base(l)}/${localeInfo[l].copyrightSlug}`,
      meta: pageMeta.copyright(t(l)),
      kind: 'copyright',
      lastmod: siteConfig.copyrightUpdated,
    })),
    everywhere((l) => ({ path: `${base(l)}/${localeInfo[l].contactSlug}`, meta: pageMeta.contact(t(l)) })),
    everywhere((l) => ({ path: games(l), meta: pageMeta.games(t(l)) })),
    ...GAME_IDS.map((id) => everywhere((l) => ({ path: `${games(l)}/${id}`, meta: pageMeta.game(t(l), id) }))),
    everywhere((l) => ({ path: worksheets(l), meta: pageMeta.worksheets(t(l)) })),
    ...WORKSHEET_IDS.map((id) =>
      everywhere(
        (l) => {
          const thumb = WORKSHEET_THUMBNAILS[id];
          const meta = pageMeta.worksheet(t(l), id);
          return {
            path: `${worksheets(l)}/${id}`,
            meta,
            image: thumb && !thumb.endsWith('.svg') ? { src: thumb, alt: meta.title ?? '' } : undefined,
          };
        },
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
      image: post.image,
    };
    bySlug.set(post.slug, group);
  }
  groups.push(
    everywhere((l) => ({ path: `${base(l)}/${LEKTIRE_SLUG}`, meta: pageMeta.lektire(t(l)), kind: 'lektire', lastmod: LEKTIRE[l]?.checked }), LEKTIRE_LOCALES),
  );
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
      country,
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

// `extra` = stranice samo na srpskom, bez prevoda (biblioteka priprema), pa bez hreflang veza.
function sitemapXml(groups: PageGroup[], extra: string[]): string {
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
    ...extra.map((p) => `  <url>\n    <loc>${siteConfig.url}${p}</loc>\n  </url>`),
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

const markdownHtml = (markdown: string) =>
  renderToStaticMarkup(createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, markdown));

const ldScript = (data: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

// Tekst stranice u #root, za pretraživače i AI alate koji ne izvršavaju JS (Bing, ChatGPT, Perplexity…).
// React ga pri pokretanju zamijeni (createRoot), pa klase prate BlogPost/Country da skok bude što manji.
function prerender(locale: Locale, page: Page): string {
  const t = dictionaries[locale];
  const wrap = 'wrap min-h-[80vh] max-w-[780px] pt-[96px] sm:pt-[130px]';
  const h1 = 'mt-3.5 mb-4 font-head text-[clamp(32px,5vw,52px)] leading-[1.1] font-bold tracking-[-0.03em] text-balance';
  const lead = 'text-[clamp(16.5px,1.6vw,19px)] text-muted';
  const meta = 'flex flex-wrap items-center gap-2 font-mono text-[12.5px] font-medium text-muted';

  const { article, country } = page;
  if (article) {
    return `<div class="${wrap}"><header class="mb-9 border-b border-line pb-8"><div class="${meta}"><span>${escapeXml(t.categories[article.category])}</span><span>${escapeXml(t.blog.published)} <time datetime="${article.date}">${formatDate(article.date, locale)}</time></span></div><h1 class="${h1}">${escapeXml(article.title)}</h1><p class="${lead}">${escapeXml(article.excerpt)}</p></header><article class="prose">${markdownHtml(article.content)}</article></div>`;
  }
  if (country) {
    return `<div class="${wrap}"><header class="mb-9 border-b border-line pb-8"><h1 class="${h1}">${escapeXml(country.name)}</h1><p class="${lead}">${escapeXml(country.excerpt)}</p></header><article class="prose">${markdownHtml(country.content)}</article></div>`;
  }
  if (page.kind === 'copyright') {
    const c = t.copyright;
    const list = (items: readonly string[]) => `<ul>${items.map((i) => `<li>${escapeXml(i)}</li>`).join('')}</ul>`;
    const example = `${c.credit.source}: ${siteConfig.author.name}, ${siteConfig.name}, ${siteConfig.displayDomain}${base(locale)}/${localeInfo[locale].worksheetSlug}`;
    return `<div class="${wrap}"><header class="mb-9 border-b border-line pb-8"><h1 class="${h1}">${escapeXml(c.title)}</h1><p class="${lead}">${escapeXml(c.intro)}</p><p class="${meta}">${escapeXml(c.updated(formatDate(siteConfig.copyrightUpdated, locale)))}</p></header><article class="prose"><h2>${escapeXml(c.owner.title)}</h2><p>${escapeXml(c.owner.text(siteConfig.author.name))}</p>${list(c.owner.items)}<h2>${escapeXml(c.allowed.title)}</h2><p>${escapeXml(c.allowed.text)}</p>${list(c.allowed.items)}<h2>${escapeXml(c.forbidden.title)}</h2><p>${escapeXml(c.forbidden.text)}</p>${list(c.forbidden.items)}<h2>${escapeXml(c.never.title)}</h2>${list(c.never.items)}<h2>${escapeXml(c.credit.title)}</h2><p>${escapeXml(c.credit.text)}</p><blockquote><p>${escapeXml(example)}</p></blockquote><h2>${escapeXml(c.others.title)}</h2>${list(c.others.items)}<h2>${escapeXml(c.report.title)}</h2><p>${escapeXml(c.report.text)}</p><h2>${escapeXml(c.permission.title)}</h2><p>${escapeXml(c.permission.text)}</p></article></div>`;
  }
  const lektire = page.kind === 'lektire' ? LEKTIRE[locale] : undefined;
  if (lektire) {
    const l = t.lektire;
    const djelo = (d: Djelo) =>
      `<li>${d.autor ? `${escapeXml(d.autor)}: ` : ''}<cite>${escapeXml(d.naslov)}</cite>${d.napomena ? ` (${escapeXml(d.napomena)})` : ''}</li>`;
    const razredi = LEKTIRE_RAZREDI.map((r) => {
      const razred = lektire.razredi[r];
      const sistemi = LEKTIRE_SISTEMI.map((s) => {
        const spisak = razred[s];
        const lista = spisak.djela.length > 0 ? `<ol>${spisak.djela.map(djelo).join('')}</ol>` : `<p>${escapeXml(l.noList)}</p>`;
        return `<h3>${escapeXml(lektire.sistemi[s].naziv)}</h3>${lista}${spisak.napomena ? `<p>${escapeXml(spisak.napomena)}</p>` : ''}`;
      }).join('');
      const preporuke = razred.preporuke.map((p) => djelo(p).replace('</li>', ` — ${escapeXml(p.zasto)}</li>`)).join('');
      return `<h2 id="razred-${r}">${escapeXml(l.grade(r))}</h2>${sistemi}<h3>${escapeXml(l.recommendedTitle)}</h3><ul>${preporuke}</ul>`;
    }).join('');
    const savjeti = lektire.savjeti.map((s) => `<h3>${escapeXml(s.title)}</h3><p>${escapeXml(s.text)}</p>`).join('');
    const izvori = lektire.izvori.map((s) => `<li><a href="${escapeXml(s.url)}">${escapeXml(s.title)}</a></li>`).join('');
    return `<div class="${wrap}"><header class="mb-9 border-b border-line pb-8"><h1 class="${h1}">${escapeXml(l.title)}</h1><p class="${lead}">${escapeXml(lektire.intro)}</p></header><article class="prose">${razredi}<h2>${escapeXml(l.tipsTitle)}</h2>${savjeti}<h2>${escapeXml(l.sourcesTitle)}</h2><ul>${izvori}</ul></article></div>`;
  }
  return `<div class="${wrap}"><h1 class="${h1}">${escapeXml(page.meta.title ?? siteConfig.name)}</h1><p class="${lead}">${escapeXml(page.meta.description)}</p></div>`;
}

function person(locale: Locale) {
  const t = dictionaries[locale];
  return {
    '@type': 'Person',
    '@id': `${siteConfig.url}/#autor`,
    name: siteConfig.author.name,
    jobTitle: t.author.role,
    url: `${siteConfig.url}${base(locale)}/${localeInfo[locale].aboutSlug}`,
    image: `${siteConfig.url}/slike/marko-losic.jpg`,
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

function structuredData(locale: Locale, page: Page, url: string): unknown[] {
  const inLanguage = localeInfo[locale].tag;
  if (page.kind === 'home') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url,
        inLanguage,
        description: page.meta.description,
        author: { '@id': `${siteConfig.url}/#autor` },
      },
      { '@context': 'https://schema.org', ...person(locale) },
    ];
  }
  if (page.kind === 'about') {
    return [{ '@context': 'https://schema.org', '@type': 'ProfilePage', url, inLanguage, mainEntity: person(locale) }];
  }
  if (page.article) {
    const a = page.article;
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: a.title,
        description: a.excerpt,
        datePublished: a.date,
        dateModified: a.date,
        inLanguage,
        url,
        mainEntityOfPage: url,
        image: `${siteConfig.url}${a.image?.src ?? '/slike/og-slika.jpg'}`,
        articleSection: dictionaries[locale].categories[a.category],
        author: person(locale),
        publisher: { '@type': 'Person', name: siteConfig.author.name, url: person(locale).url },
      },
    ];
  }
  return [];
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

  const image = page.image;
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
  if (!html.includes('<div id="root"></div>')) throw new Error('seo-files: index.html nema <div id="root"></div>');
  html = html.replace('<div id="root"></div>', `<div id="root">${prerender(locale, page)}</div>`);
  extra.push(...structuredData(locale, page, url).map(ldScript));
  return html.replace('</head>', `  ${extra.join('\n    ')}\n  </head>`);
}

// 404.html: Vercel ga vraća sa statusom 404 za svaku adresu bez svog fajla; SPA tada prikaže NotFound.
function notFoundHtml(template: string): string {
  const t = dictionaries[DEFAULT_LOCALE];
  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeXml(documentTitle(t.notFound.title.replace(/\.$/, ''), t))}</title>`)
    .replace(/\s*<link rel="canonical"[^>]*>/, '')
    .replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>');
}

// robots.txt, sitemap.xml, RSS po jeziku i statični HTML po ruti nastaju pri buildu iz istih podataka
// kao i rute, pa ih ne treba ručno ažurirati. Dok je siteConfig.url placeholder, prave se samo robots.txt.
function seoFiles(): Plugin {
  const placeholder = siteConfig.url.includes('example.');
  let posts: SourcePost[] = [];
  let groups: PageGroup[] = [];
  let pripreme: StranicaPripreme[] = [];
  const pripremeSrc = path.resolve(__dirname, 'pripreme');
  const postsOf = (locale: Locale) => posts.filter((p) => p.locale === locale);

  return {
    name: 'seo-files',
    apply: 'build',
    enforce: 'post',
    buildStart() {
      posts = readPosts();
      groups = pageGroups(posts, readCountries());
      pripreme = fs.existsSync(pripremeSrc) ? napraviStranicePriprema(pripremeSrc) : [];
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /'];
      if (placeholder) {
        this.warn('siteConfig.url je još placeholder (src/config/site.ts) — sitemap.xml, RSS i HTML po ruti nisu napravljeni.');
      } else {
        robots.push('', `Sitemap: ${siteConfig.url}/sitemap.xml`);
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml(groups, pripreme.length ? ['/pripreme', ...pripreme.map((p) => p.path)] : []) });
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
      fs.writeFileSync(path.join(options.dir, '404.html'), notFoundHtml(template));
      for (const group of groups) {
        for (const [locale, page] of groupEntries(group)) {
          const file = path.join(options.dir, page.path, 'index.html');
          fs.mkdirSync(path.dirname(file), { recursive: true });
          fs.writeFileSync(file, pageHtml(template, locale, page, group, postsOf(locale).length > 0));
        }
      }
      if (fs.existsSync(pripremeSrc)) {
        fs.cpSync(pripremeSrc, path.join(options.dir, 'pripreme'), { recursive: true });
        for (const stranica of pripreme) {
          const file = path.join(options.dir, stranica.path, 'index.html');
          fs.mkdirSync(path.dirname(file), { recursive: true });
          fs.writeFileSync(file, stranica.html);
        }
      }
    },
  };
}

function pripremeDevRoute(): Plugin {
  return {
    name: 'pripreme-dev-route',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url) {
          const [pathname, search] = req.url.split('?');
          if (pathname === '/pripreme' || pathname === '/pripreme/') {
            req.url = `/pripreme/index.html${search ? `?${search}` : ''}`;
          }
          // Statične stranice priprema (u buildu ih piše seo-files); ovdje se prave na zahtjev.
          else if (pathname && /^\/pripreme\/[a-z0-9-]+(\/[a-z0-9-]+)?\/?$/.test(pathname)) {
            const trazena = pathname.replace(/\/$/, '');
            const stranica = napraviStranicePriprema(path.resolve(__dirname, 'pripreme')).find((s) => s.path === trazena);
            if (stranica) {
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(stranica.html);
              return;
            }
          }
        }
        next();
      });
    },
  };
}

// U dev serveru /api/contact poziva istu funkciju kao Vercel (api/contact.ts).
// Ključevi iz .env.local; bez RESEND_API_KEY poruka se samo ispiše u terminal.
function contactApiDev(): Plugin {
  return {
    name: 'contact-api-dev',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '');
      for (const key of ['RESEND_API_KEY', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL']) {
        if (env[key]) process.env[key] = env[key];
      }
      server.middlewares.use('/api/contact', (req, res) => {
        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => chunks.push(chunk));
        req.on('end', async () => {
          const body = Buffer.concat(chunks).toString('utf8');
          if (!process.env.RESEND_API_KEY) {
            server.config.logger.info(`[kontakt] Poruka (nije poslata, nema RESEND_API_KEY):\n${body}`);
            res.setHeader('Content-Type', 'application/json');
            res.end('{"ok":true}');
            return;
          }
          const mod = (await server.ssrLoadModule('/api/contact.ts')) as { POST: (r: Request) => Promise<Response> };
          const host = req.headers.host ?? 'localhost';
          const response = await mod.POST(
            new Request(`http://${host}/api/contact`, {
              method: req.method,
              headers: { 'Content-Type': 'application/json', Origin: req.headers.origin ?? '' },
              body: req.method === 'POST' ? body : undefined,
            }),
          );
          res.statusCode = response.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(await response.text());
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [contactApiDev(), pripremeDevRoute(), markdownPosts(), seoFiles(), react(), tailwindcss()],
});
