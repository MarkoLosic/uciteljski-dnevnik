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
import {
  GAME_IDS,
  isWorksheetId,
  WORKSHEET_GROUPS,
  WORKSHEET_IDS,
  WORKSHEET_LOCALES,
  worksheetsFor,
  type GameId,
  type WorksheetGroup,
  type WorksheetId,
} from './src/games/ids';
import type { PostFrontmatter } from './src/types/post';
import { COUNTRY_FACTS, PISA_OECD_AVERAGE, type CountryFrontmatter } from './src/types/country';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatDate } from './src/lib/formatDate';
import { worksheetOgImage } from './src/games/thumbnails';
import { LEKTIRE } from './src/lektire';
import { LEKTIRE_LOCALES, LEKTIRE_RAZREDI, LEKTIRE_SISTEMI, LEKTIRE_SLUG, type Djelo } from './src/lektire/types';
import { napraviStranicePriprema, ucitajPripreme, type Priprema, type StranicaPripreme } from './plugins/pripremeStranice';

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
      const img = /!\[([^\]]*)\]\((\/[^\s)]+)/.exec(content);
      const value =
        query === 'meta'
          ? { data, readingMinutes: readingMinutes(content), image: img ? img[2] : undefined }
          : content;
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
      })
      .sort((a, b) =>
        a.reference !== b.reference ? (a.reference ? -1 : 1) : a.name.localeCompare(b.name, localeInfo[locale].dateTag),
      );
  });
}

function readWorldSummaries(): Partial<Record<Locale, string>> {
  const summaries: Partial<Record<Locale, string>> = {};
  for (const locale of LOCALES) {
    const file = path.resolve(__dirname, 'src/content/world', locale, 'zakljucci.md');
    if (fs.existsSync(file)) summaries[locale] = fs.readFileSync(file, 'utf8');
  }
  return summaries;
}

type PageKind = 'home' | 'blog' | 'about' | 'lektire' | 'copyright' | 'contact' | 'games' | 'worksheets' | 'world';

interface Page {
  path: string;
  meta: PageMetaText;
  lastmod?: string;
  kind?: PageKind;
  article?: SourcePost;
  country?: SourceCountry;
  gameId?: GameId;
  worksheetId?: WorksheetId;
  image?: { src: string; alt: string }; // og:image i Google Image Sitemap (jpg/png)
}

type PageGroup = Partial<Record<Locale, Page>>;

const base = (locale: Locale) => (locale === DEFAULT_LOCALE ? '' : `/${locale}`);
const gamesPath = (locale: Locale) => `${base(locale)}/${localeInfo[locale].gamesSlug}`;
const worksheetsPath = (locale: Locale) => `${base(locale)}/${localeInfo[locale].worksheetSlug}`;
const worldPath = (locale: Locale) => `${base(locale)}/${localeInfo[locale].worldSlug}`;

const WORKSHEET_GROUP_ORDER: WorksheetGroup[] = [
  'books',
  'tests',
  'coloring',
  'time',
  'writing',
  'motor',
  'math',
  'logic',
];

function worksheetGroupOf(id: WorksheetId): WorksheetGroup {
  for (const g of WORKSHEET_GROUP_ORDER) {
    if ((WORKSHEET_GROUPS[g] as readonly string[]).includes(id)) return g;
  }
  return 'math';
}

// Ista stranica na svim jezicima čini jednu grupu; iz nje nastaju hreflang veze.
// Nova vrsta stranice → dodaj je ovde (sitemap i statični HTML se prave iz ovog spiska).
function pageGroups(posts: SourcePost[], countries: SourceCountry[]): PageGroup[] {
  const everywhere = (page: (locale: Locale) => Page, locales: readonly Locale[] = LOCALES): PageGroup =>
    Object.fromEntries(locales.map((locale) => [locale, page(locale)]));
  const t = (locale: Locale) => dictionaries[locale];
  const latestPostDate = (locale: Locale) => posts.find((p) => p.locale === locale)?.date;
  const latestCountryDate = (locale: Locale) =>
    countries
      .filter((c) => c.locale === locale)
      .map((c) => c.checked)
      .sort()
      .at(-1);

  const groups: PageGroup[] = [
    everywhere((l) => ({ path: base(l) || '/', meta: pageMeta.home(t(l)), kind: 'home', lastmod: latestPostDate(l) })),
    everywhere((l) => ({ path: `${base(l)}/blog`, meta: pageMeta.blog(t(l)), kind: 'blog', lastmod: latestPostDate(l) })),
    everywhere((l) => ({ path: `${base(l)}/${localeInfo[l].aboutSlug}`, meta: pageMeta.about(t(l)), kind: 'about' })),
    everywhere((l) => ({
      path: `${base(l)}/${localeInfo[l].copyrightSlug}`,
      meta: pageMeta.copyright(t(l)),
      kind: 'copyright',
      lastmod: siteConfig.copyrightUpdated,
    })),
    everywhere((l) => ({ path: `${base(l)}/${localeInfo[l].contactSlug}`, meta: pageMeta.contact(t(l)), kind: 'contact' })),
    everywhere((l) => ({ path: gamesPath(l), meta: pageMeta.games(t(l)), kind: 'games' })),
    ...GAME_IDS.map((id) => everywhere((l) => ({ path: `${gamesPath(l)}/${id}`, meta: pageMeta.game(t(l), id), gameId: id }))),
    everywhere((l) => ({
      path: worksheetsPath(l),
      meta: pageMeta.worksheets(t(l)),
      kind: 'worksheets',
      lastmod: siteConfig.copyrightUpdated,
    })),
    ...WORKSHEET_IDS.map((id) =>
      everywhere(
        (l) => {
          const meta = pageMeta.worksheet(t(l), id);
          return {
            path: `${worksheetsPath(l)}/${id}`,
            meta,
            worksheetId: id,
            lastmod: siteConfig.copyrightUpdated,
            image: { src: worksheetOgImage(id), alt: meta.title ?? t(l).games.worksheet.sheets[id].title },
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
    everywhere(
      (l) => ({ path: `${base(l)}/${LEKTIRE_SLUG}`, meta: pageMeta.lektire(t(l)), kind: 'lektire', lastmod: LEKTIRE[l]?.checked }),
      LEKTIRE_LOCALES,
    ),
  );
  // Škole u svetu: samo jezici koji imaju bar jednu zemlju.
  const worldLocales = LOCALES.filter((l) => countries.some((c) => c.locale === l));
  if (worldLocales.length > 0) {
    groups.push(everywhere((l) => ({ path: worldPath(l), meta: pageMeta.world(t(l)), kind: 'world', lastmod: latestCountryDate(l) }), worldLocales));
  }
  const byCountry = new Map<string, PageGroup>();
  for (const country of countries) {
    const group = byCountry.get(country.id) ?? {};
    group[country.locale] = {
      path: `${worldPath(country.locale)}/${country.id}`,
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
    ([locale, page]) => `<${tag} rel="alternate" hreflang="${locale}" href="${siteConfig.url}${page.path === '/' ? '' : page.path}"/>`,
  );
  const fallback = group[DEFAULT_LOCALE];
  if (fallback) {
    links.push(`<${tag} rel="alternate" hreflang="x-default" href="${siteConfig.url}${fallback.path === '/' ? '' : fallback.path}"/>`);
  }
  return links;
}

function urlSetXml(groups: PageGroup[]): string {
  const urls = groups.flatMap((group) => {
    const alternates = alternateLinks(group, 'xhtml:link').map((l) => `    ${l}`);
    return groupEntries(group).map(([, page]) => {
      const loc = `${siteConfig.url}${page.path === '/' ? '' : page.path}`;
      const imageBlock = page.image
        ? [
            '    <image:image>',
            `      <image:loc>${siteConfig.url}${escapeXml(page.image.src)}</image:loc>`,
            ...(page.image.alt ? [`      <image:title>${escapeXml(page.image.alt)}</image:title>`] : []),
            '    </image:image>',
          ]
        : [];
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        ...(page.lastmod ? [`    <lastmod>${page.lastmod}</lastmod>`] : []),
        ...alternates,
        ...imageBlock,
        '  </url>',
      ].join('\n');
    });
  });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

function extraSitemapXml(paths: string[], lastmod: string): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((p) => `  <url>\n    <loc>${siteConfig.url}${p}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`),
    '</urlset>',
    '',
  ].join('\n');
}

function sitemapIndexXml(files: { name: string; lastmod: string }[]): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...files.map(
      ({ name, lastmod }) => `  <sitemap>\n    <loc>${siteConfig.url}/${name}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`,
    ),
    '</sitemapindex>',
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

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

function extractExternalCitations(markdown: string): string[] {
  const urls = new Set<string>();
  const re = /\]\((https:\/\/[^\s)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(markdown)) !== null) {
    const u = m[1].replace(/[.,;]+$/, '');
    if (!u.includes('xn--uiteljskidnevnik-s7b.online') && !u.includes('učiteljskidnevnik.online')) {
      urls.add(u);
    }
  }
  return [...urls];
}

interface RenderContext {
  posts: SourcePost[];
  countries: SourceCountry[];
  worldSummaries: Partial<Record<Locale, string>>;
}

// Kompletan tekst i interni linkovi u #root za pretraživače i AI alate bez JS-a (Bing, ChatGPT, Perplexity, Claude).
// React ga pri pokretanju zamijeni (createRoot), pa svaka stranica ima čist semantički HTML i sve <a href> veze.
function prerender(locale: Locale, page: Page, ctx: RenderContext): string {
  const t = dictionaries[locale];
  const wrap = 'wrap min-h-[80vh] max-w-[780px] pt-[96px] sm:pt-[130px]';
  const h1 = 'mt-3.5 mb-4 font-head text-[clamp(32px,5vw,52px)] leading-[1.1] font-bold tracking-[-0.03em] text-balance';
  const lead = 'text-[clamp(16.5px,1.6vw,19px)] text-muted';
  const meta = 'flex flex-wrap items-center gap-2 font-mono text-[12.5px] font-medium text-muted';
  const localePosts = ctx.posts.filter((p) => p.locale === locale);
  const localeCountries = ctx.countries.filter((c) => c.locale === locale);

  if (page.article) {
    const { article } = page;
    const related = localePosts
      .filter((p) => p.slug !== article.slug)
      .sort((a, b) => (a.category === article.category ? -1 : 1) - (b.category === article.category ? -1 : 1))
      .slice(0, 3);
    const relatedHtml =
      related.length > 0
        ? `<nav aria-label="${escapeXml(t.blog.related)}"><h2>${escapeXml(t.blog.related)}</h2><ul>${related
            .map((p) => `<li><a href="${base(locale)}/blog/${p.slug}">${escapeXml(p.title)}</a> — ${escapeXml(p.excerpt)}</li>`)
            .join('')}</ul></nav>`
        : '';
    return `<div class="${wrap}"><p><a href="${base(locale)}/blog">← ${escapeXml(t.blog.allPosts)}</a></p><header class="mb-9 border-b border-line pb-8"><div class="${meta}"><span>${escapeXml(t.categories[article.category])}</span><span>${escapeXml(t.blog.published)} <time datetime="${article.date}">${formatDate(article.date, locale)}</time></span><span>${escapeXml(t.blog.readingTime(readingMinutes(article.content)))}</span></div><h1 class="${h1}">${escapeXml(article.title)}</h1><p class="${lead}">${escapeXml(article.excerpt)}</p></header><article class="prose">${markdownHtml(article.content)}${relatedHtml}</article></div>`;
  }

  if (page.country) {
    const { country } = page;
    const w = t.world;
    const { pisa, timss, pirls } = country.results;
    const factsDl = COUNTRY_FACTS.map(
      (f) => `<dt>${escapeXml(w.facts[f])}</dt><dd>${escapeXml(country.facts[f])}</dd>`,
    ).join('');
    const scores: string[] = [];
    if (pisa) scores.push(`<li><strong>${escapeXml(w.pisa)} ${pisa.year}:</strong> ${escapeXml(w.math)}: ${pisa.math}, ${escapeXml(w.reading)}: ${pisa.reading}, ${escapeXml(w.science)}: ${pisa.science}</li>`);
    if (timss) scores.push(`<li><strong>${escapeXml(w.timss)} ${timss.year}:</strong> ${escapeXml(w.math)}: ${timss.math}, ${escapeXml(w.science)}: ${timss.science}</li>`);
    if (pirls) scores.push(`<li><strong>${escapeXml(w.pirls)} ${pirls.year}:</strong> ${escapeXml(w.reading)}: ${pirls.reading}</li>`);
    const sourcesHtml = `<h2>${escapeXml(w.sources)}</h2><ul>${country.sources
      .map((s) => `<li><a href="${escapeXml(s.url)}">${escapeXml(s.title)}</a></li>`)
      .join('')}</ul>`;
    const others = localeCountries.filter((c) => c.id !== country.id);
    const othersHtml =
      others.length > 0
        ? `<nav aria-label="${escapeXml(w.otherCountries)}"><h2>${escapeXml(w.otherCountries)}</h2><ul>${others
            .map((c) => `<li><a href="${worldPath(locale)}/${c.id}">${escapeXml(c.name)}</a> — ${escapeXml(c.excerpt)}</li>`)
            .join('')}</ul></nav>`
        : '';
    return `<div class="${wrap}"><p><a href="${worldPath(locale)}">← ${escapeXml(w.allCountries)}</a></p><header class="mb-9 border-b border-line pb-8"><h1 class="${h1}">${escapeXml(country.name)}</h1><p class="${lead}">${escapeXml(country.excerpt)}</p><p class="${meta}">${escapeXml(w.checked)}: <time datetime="${country.checked}">${formatDate(country.checked, locale)}</time></p></header><aside><h2>${escapeXml(w.keyIdea)}</h2><p>${escapeXml(country.keyIdea)}</p></aside><section><h2>${escapeXml(w.compareTitle)}</h2><dl>${factsDl}</dl></section><section><h2>${escapeXml(w.resultsTitle)}</h2>${scores.length > 0 ? `<ul>${scores.join('')}</ul>` : ''}${country.resultsNote ? `<p>${escapeXml(country.resultsNote)}</p>` : ''}</section><article class="prose">${markdownHtml(country.content)}${sourcesHtml}${othersHtml}</article></div>`;
  }

  if (page.kind === 'world') {
    const w = t.world;
    const cards = localeCountries
      .map(
        (c) =>
          `<li><a href="${worldPath(locale)}/${c.id}"><strong>${escapeXml(c.name)}</strong></a>: ${escapeXml(c.excerpt)} <em>(${escapeXml(c.keyIdea)})</em></li>`,
      )
      .join('');
    const factRows = COUNTRY_FACTS.map(
      (fact) =>
        `<tr><th scope="row">${escapeXml(w.facts[fact])}</th>${localeCountries
          .map((c) => `<td>${escapeXml(c.facts[fact])}</td>`)
          .join('')}</tr>`,
    ).join('');
    const scoreRows = localeCountries
      .map((c) => {
        const { pisa, timss, pirls } = c.results;
        return `<tr><th scope="row"><a href="${worldPath(locale)}/${c.id}">${escapeXml(c.name)}</a></th><td>${pisa ? `${pisa.math} (${pisa.year})` : '—'}</td><td>${pisa ? `${pisa.reading} (${pisa.year})` : '—'}</td><td>${pisa ? `${pisa.science} (${pisa.year})` : '—'}</td><td>${timss ? `${timss.math} (${timss.year})` : '—'}</td><td>${timss ? `${timss.science} (${timss.year})` : '—'}</td><td>${pirls ? `${pirls.reading} (${pirls.year})` : '—'}</td></tr>`;
      })
      .join('');
    const summaryMd = ctx.worldSummaries[locale];
    return `<div class="${wrap}"><header class="mb-9 border-b border-line pb-8"><h1 class="${h1}">${escapeXml(w.title)}</h1><p class="${lead}">${escapeXml(w.intro)}</p><p>${escapeXml(w.note)}</p></header><article class="prose"><h2>${escapeXml(w.countriesTitle)}</h2><ul>${cards}</ul><h2>${escapeXml(w.compareTitle)}</h2><table><thead><tr><th></th>${localeCountries.map((c) => `<th scope="col">${escapeXml(c.name)}</th>`).join('')}</tr></thead><tbody>${factRows}</tbody></table><h2>${escapeXml(w.resultsTitle)}</h2><p>${escapeXml(w.resultsIntro)}</p><table><thead><tr><th scope="col"></th><th scope="col">PISA ${escapeXml(w.math)}</th><th scope="col">PISA ${escapeXml(w.reading)}</th><th scope="col">PISA ${escapeXml(w.science)}</th><th scope="col">TIMSS ${escapeXml(w.math)}</th><th scope="col">TIMSS ${escapeXml(w.science)}</th><th scope="col">PIRLS ${escapeXml(w.reading)}</th></tr></thead><tbody>${scoreRows}<tr><th scope="row">${escapeXml(w.oecdAverage)} (${PISA_OECD_AVERAGE.year})</th><td>${PISA_OECD_AVERAGE.math}</td><td>${PISA_OECD_AVERAGE.reading}</td><td>${PISA_OECD_AVERAGE.science}</td><td colspan="3">${escapeXml(w.scaleNote)}</td></tr></tbody></table>${summaryMd ? markdownHtml(summaryMd) : ''}</article></div>`;
  }

  if (page.kind === 'home') {
    const h = t.home;
    const stats = h.stats.map((s) => `<li><strong>${escapeXml(s.value)} — ${escapeXml(s.label)}:</strong> ${escapeXml(s.detail)}</li>`).join('');
    const pillars = h.pillars
      .map(
        (p) =>
          `<li><h3><a href="${escapeXml(p.href)}">${escapeXml(p.title)}</a></h3><p>${escapeXml(p.text)}</p></li>`,
      )
      .join('');
    const grades = h.gradesList
      .map(
        (g) =>
          `<li><a href="/pripreme/${g.grade}-razred"><strong>${escapeXml(g.title)} (${escapeXml(g.count)})</strong></a> — ${escapeXml(g.desc)}</li>`,
      )
      .join('');
    const recent = localePosts
      .slice(0, 3)
      .map(
        (p) =>
          `<li><a href="${base(locale)}/blog/${p.slug}"><strong>${escapeXml(p.title)}</strong></a> (<time datetime="${p.date}">${formatDate(p.date, locale)}</time>) — ${escapeXml(p.excerpt)}</li>`,
      )
      .join('');
    const extraLinks = [
      `<a href="/pripreme">${escapeXml(h.ctaPripreme)}</a>`,
      `<a href="${worksheetsPath(locale)}">${escapeXml(h.ctaWorksheets)}</a>`,
      `<a href="${gamesPath(locale)}">${escapeXml(t.nav.games)}</a>`,
      `<a href="${base(locale)}/blog">${escapeXml(h.readBlog)}</a>`,
      ...(localeCountries.length > 0 ? [`<a href="${worldPath(locale)}">${escapeXml(t.nav.world)}</a>`] : []),
      ...((LEKTIRE_LOCALES as readonly string[]).includes(locale) ? [`<a href="${base(locale)}/${LEKTIRE_SLUG}">${escapeXml(t.nav.lektire)}</a>`] : []),
      `<a href="${base(locale)}/${localeInfo[locale].aboutSlug}">${escapeXml(t.nav.about)}</a>`,
    ].join(' · ');
    return `<div class="${wrap}"><header class="mb-9 border-b border-line pb-8"><p class="${meta}">${escapeXml(h.heroBadge)}</p><h1 class="${h1}">${escapeXml(`${h.heroTitleBefore}${h.heroTitleHighlight}`)}</h1><p class="${lead}">${escapeXml(h.heroLead)}</p><nav aria-label="${escapeXml(t.nav.label)}"><p>${extraLinks}</p></nav></header><article class="prose"><ul>${stats}</ul><h2>${escapeXml(h.pillarsTitle)}</h2><p>${escapeXml(h.pillarsIntro)}</p><ul>${pillars}</ul><h2>${escapeXml(h.gradesTitle)}</h2><p>${escapeXml(h.gradesIntro)}</p><ul>${grades}</ul><h2>${escapeXml(h.blogTitle)}</h2><ul>${recent}</ul></article></div>`;
  }

  if (page.kind === 'blog') {
    const items = localePosts
      .map(
        (p) =>
          `<li><article><h2><a href="${base(locale)}/blog/${p.slug}">${escapeXml(p.title)}</a></h2><p class="${meta}"><span>${escapeXml(t.categories[p.category])}</span> · <time datetime="${p.date}">${formatDate(p.date, locale)}</time> · <span>${escapeXml(t.blog.readingTime(readingMinutes(p.content)))}</span></p><p>${escapeXml(p.excerpt)}</p></article></li>`,
      )
      .join('');
    return `<div class="${wrap}"><header class="mb-9 border-b border-line pb-8"><h1 class="${h1}">${escapeXml(t.blog.title)}</h1><p class="${lead}">${escapeXml(t.blog.description)}</p></header><article class="prose"><ul>${items}</ul></article></div>`;
  }

  if (page.kind === 'about') {
    const bg = t.author.background.map((b) => `<h3>${escapeXml(b.title)}</h3><p>${escapeXml(b.text)}</p>`).join('');
    const topics = t.topics.map((tp) => `<li><strong>${escapeXml(tp.title)}:</strong> ${escapeXml(tp.text)}</li>`).join('');
    return `<div class="${wrap}"><header class="mb-9 border-b border-line pb-8"><p class="${meta}">${escapeXml(t.author.role)} · ${escapeXml(t.author.location)}</p><h1 class="${h1}">${escapeXml(`${t.home.greeting} ${siteConfig.author.name}`)}</h1><p class="${lead}">${escapeXml(t.author.intro)}</p></header><article class="prose"><h2>${escapeXml(t.home.whoTitle)}</h2>${bg}<h2>${escapeXml(t.about.blogTitle)}</h2><p>${escapeXml(t.about.blogText(siteConfig.name))}</p><ul>${topics}</ul><p><a href="${base(locale)}/${localeInfo[locale].contactSlug}">${escapeXml(t.contact.cta)}</a> · <a href="${escapeXml(siteConfig.social.linkedin)}" rel="me noopener">LinkedIn</a></p></article></div>`;
  }

  if (page.kind === 'worksheets') {
    const ws = t.games.worksheet;
    const allowed = new Set(worksheetsFor(locale));
    const sections = WORKSHEET_GROUP_ORDER.map((group) => {
      const ids = WORKSHEET_GROUPS[group].filter((id) => allowed.has(id));
      if (ids.length === 0) return '';
      const list = ids
        .map((id) => {
          const s = ws.sheets[id];
          const about = ws.about[id];
          return `<li><a href="${worksheetsPath(locale)}/${id}"><strong>${escapeXml(s.title)}</strong></a>${about?.age ? ` (${escapeXml(about.age)})` : ''} — ${escapeXml(about?.text ?? s.text)}</li>`;
        })
        .join('');
      return `<h2>${escapeXml(ws.groups[group])}</h2><ul>${list}</ul>`;
    }).join('');
    return `<div class="${wrap}"><header class="mb-9 border-b border-line pb-8"><h1 class="${h1}">${escapeXml(ws.sectionTitle)}</h1><p class="${lead}">${escapeXml(ws.sectionText)}</p><p><a href="${gamesPath(locale)}">${escapeXml(t.nav.games)}</a> · <a href="/pripreme">${escapeXml(t.nav.pripreme)}</a></p></header><article class="prose">${sections}</article></div>`;
  }

  if (page.worksheetId) {
    const id = page.worksheetId;
    const ws = t.games.worksheet;
    const sheet = ws.sheets[id];
    const about = ws.about[id];
    const group = worksheetGroupOf(id);
    const allowed = new Set(worksheetsFor(locale));
    const siblings = WORKSHEET_GROUPS[group].filter((sid) => sid !== id && allowed.has(sid)).slice(0, 6);
    const siblingsHtml =
      siblings.length > 0
        ? `<h2>${escapeXml(ws.groups[group])}</h2><ul>${siblings
            .map((sid) => `<li><a href="${worksheetsPath(locale)}/${sid}">${escapeXml(ws.sheets[sid].title)}</a></li>`)
            .join('')}</ul>`
        : '';
    return `<div class="${wrap}"><p><a href="${worksheetsPath(locale)}">← ${escapeXml(ws.backToWorksheets)}</a></p><header class="mb-9 border-b border-line pb-8"><p class="${meta}">${escapeXml(ws.eyebrow)} · ${escapeXml(ws.groups[group])}${about?.age ? ` · ${escapeXml(ws.ageLabel)}: ${escapeXml(about.age)}` : ''}</p><h1 class="${h1}">${escapeXml(sheet.title)}</h1><p class="${lead}">${escapeXml(sheet.text)}</p></header><article class="prose">${about ? `<section><h2>${escapeXml(ws.aboutTitle)}</h2><p>${escapeXml(about.text)}</p></section>` : ''}<p><img src="${escapeXml(worksheetOgImage(id))}" alt="${escapeXml(sheet.title)}" loading="lazy" /></p><p>${escapeXml(ws.tip)}</p>${siblingsHtml}</article></div>`;
  }

  if (page.kind === 'games') {
    const g = t.games;
    const list = GAME_IDS.map(
      (id) =>
        `<li><a href="${gamesPath(locale)}/${id}"><strong>${escapeXml(g.list[id].title)}</strong></a> — ${escapeXml(g.list[id].short)}</li>`,
    ).join('');
    return `<div class="${wrap}"><header class="mb-9 border-b border-line pb-8"><h1 class="${h1}">${escapeXml(g.title)}</h1><p class="${lead}">${escapeXml(g.intro)}</p></header><article class="prose"><ul>${list}</ul><p><a href="${worksheetsPath(locale)}">${escapeXml(g.worksheet.sectionTitle)}</a></p></article></div>`;
  }

  if (page.gameId) {
    const id = page.gameId;
    const g = t.games;
    const info = g.list[id];
    const sheetLink = isWorksheetId(id)
      ? `<p><a href="${worksheetsPath(locale)}/${id}">${escapeXml(g.worksheet.sheets[id].title)}</a></p>`
      : '';
    return `<div class="${wrap}"><p><a href="${gamesPath(locale)}">← ${escapeXml(g.title)}</a></p><header class="mb-9 border-b border-line pb-8"><h1 class="${h1}">${escapeXml(info.title)}</h1><p class="${lead}">${escapeXml(info.short)}</p></header><article class="prose"><p>${escapeXml(info.howTo)}</p>${sheetLink}</article></div>`;
  }

  if (page.kind === 'copyright') {
    const c = t.copyright;
    const list = (items: readonly string[]) => `<ul>${items.map((i) => `<li>${escapeXml(i)}</li>`).join('')}</ul>`;
    const example = `${c.credit.source}: ${siteConfig.author.name}, ${siteConfig.name}, ${siteConfig.displayDomain}${worksheetsPath(locale)}`;
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
      return `<h2 id="razred-${r}">${escapeXml(l.grade(r))}</h2><p><a href="/pripreme/${r}-razred">Dnevne pripreme za ${r}. razred →</a></p>${sistemi}<h3>${escapeXml(l.recommendedTitle)}</h3><ul>${preporuke}</ul>`;
    }).join('');
    const savjeti = lektire.savjeti.map((s) => `<h3>${escapeXml(s.title)}</h3><p>${escapeXml(s.text)}</p>`).join('');
    const izvori = lektire.izvori.map((s) => `<li><a href="${escapeXml(s.url)}">${escapeXml(s.title)}</a></li>`).join('');
    return `<div class="${wrap}"><header class="mb-9 border-b border-line pb-8"><h1 class="${h1}">${escapeXml(l.title)}</h1><p class="${lead}">${escapeXml(lektire.intro)}</p></header><article class="prose">${razredi}<h2>${escapeXml(l.tipsTitle)}</h2>${savjeti}<h2>${escapeXml(l.sourcesTitle)}</h2><ul>${izvori}</ul></article></div>`;
  }

  return `<div class="${wrap}"><h1 class="${h1}">${escapeXml(page.meta.title ?? siteConfig.name)}</h1><p class="${lead}">${escapeXml(page.meta.description)}</p><p><a href="${base(locale) || '/'}">${escapeXml(t.nav.home)}</a></p></div>`;
}

function person(locale: Locale) {
  const t = dictionaries[locale];
  return {
    '@type': 'Person',
    '@id': `${siteConfig.url}/#autor`,
    name: siteConfig.author.name,
    jobTitle: t.author.role,
    description: t.about.description,
    url: `${siteConfig.url}${base(locale)}/${localeInfo[locale].aboutSlug}`,
    image: `${siteConfig.url}/slike/marko-losic.jpg`,
    homeLocation: {
      '@type': 'Place',
      name: 'Banja Luka, Bosna i Hercegovina',
      address: { '@type': 'PostalAddress', addressLocality: 'Banja Luka', addressCountry: 'BA' },
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Univerzitet u Banjoj Luci',
    },
    knowsAbout: [
      'Razredna nastava',
      'Metodika razredne nastave',
      'Diferencirana nastava',
      'Vještačka inteligencija u obrazovanju',
      'Osiguranje kvaliteta softvera (QA)',
    ],
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

function breadcrumbLd(locale: Locale, page: Page): unknown | null {
  if (page.kind === 'home') return null;
  const t = dictionaries[locale];
  const homePath = base(locale) || '/';
  const crumbs: [string, string][] = [[t.nav.home, homePath]];

  if (page.article) {
    crumbs.push([t.nav.blog, `${base(locale)}/blog`], [page.article.title, page.path]);
  } else if (page.country) {
    crumbs.push([t.nav.world, worldPath(locale)], [page.country.name, page.path]);
  } else if (page.worksheetId) {
    crumbs.push([t.nav.worksheets, worksheetsPath(locale)], [t.games.worksheet.sheets[page.worksheetId].title, page.path]);
  } else if (page.gameId) {
    crumbs.push([t.nav.games, gamesPath(locale)], [t.games.list[page.gameId].title, page.path]);
  } else {
    crumbs.push([page.meta.title ?? siteConfig.name, page.path]);
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(([name, p], idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name,
      item: `${siteConfig.url}${p === '/' ? '' : p}`,
    })),
  };
}

function structuredData(locale: Locale, page: Page, url: string, ctx: RenderContext): unknown[] {
  const t = dictionaries[locale];
  const inLanguage = localeInfo[locale].tag;
  const licenseUrl = `${siteConfig.url}${base(locale)}/${localeInfo[locale].copyrightSlug}`;
  const crumbs = breadcrumbLd(locale, page);
  const items: unknown[] = crumbs ? [crumbs] : [];

  if (page.kind === 'home') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#sajt`,
        name: siteConfig.name,
        alternateName: ['Učiteljski dnevnik', 'uciteljskidnevnik.online', siteConfig.displayDomain],
        url,
        inLanguage,
        description: page.meta.description,
        author: { '@id': `${siteConfig.url}/#autor` },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteConfig.url}/pripreme?pretraga={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      { '@context': 'https://schema.org', ...person(locale) },
    ];
  }

  if (page.kind === 'about') {
    items.push({ '@context': 'https://schema.org', '@type': 'ProfilePage', url, inLanguage, mainEntity: person(locale) });
    return items;
  }

  if (page.article) {
    const a = page.article;
    const citations = extractExternalCitations(a.content);
    items.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.excerpt,
      datePublished: a.date,
      dateModified: a.date,
      inLanguage,
      url,
      mainEntityOfPage: url,
      wordCount: wordCount(a.content),
      timeRequired: `PT${readingMinutes(a.content)}M`,
      isAccessibleForFree: true,
      license: licenseUrl,
      image: `${siteConfig.url}${a.image?.src ?? '/slike/og-slika.jpg'}`,
      articleSection: t.categories[a.category],
      author: person(locale),
      publisher: { '@type': 'Person', name: siteConfig.author.name, url: person(locale).url },
      ...(citations.length > 0 ? { citation: citations } : {}),
    });
    return items;
  }

  if (page.country) {
    const c = page.country;
    items.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${c.name} — ${t.world.title}`,
      description: c.excerpt,
      datePublished: c.checked,
      dateModified: c.checked,
      inLanguage,
      url,
      mainEntityOfPage: url,
      wordCount: wordCount(c.content),
      isAccessibleForFree: true,
      about: { '@type': 'Country', name: c.name },
      author: person(locale),
      citation: c.sources.map((s) => ({ '@type': 'CreativeWork', name: s.title, url: s.url })),
    });
    return items;
  }

  if (page.worksheetId) {
    const id = page.worksheetId;
    const group = worksheetGroupOf(id);
    const about = t.games.worksheet.about[id];
    const resourceType = group === 'tests' ? 'Assessment' : group === 'books' ? 'Workbook' : 'Worksheet';
    items.push({
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: t.games.worksheet.sheets[id].title,
      description: page.meta.description,
      url,
      inLanguage,
      learningResourceType: resourceType,
      educationalUse: group === 'tests' ? 'Assessment' : 'Practice',
      ...(about?.age ? { educationalLevel: about.age } : {}),
      isAccessibleForFree: true,
      license: licenseUrl,
      image: `${siteConfig.url}${worksheetOgImage(id)}`,
      audience: [
        { '@type': 'EducationalAudience', educationalRole: 'teacher' },
        { '@type': 'EducationalAudience', educationalRole: 'parent' },
        { '@type': 'EducationalAudience', educationalRole: 'student' },
      ],
      author: person(locale),
    });
    return items;
  }

  if (page.gameId) {
    const id = page.gameId;
    items.push({
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: t.games.list[id].title,
      description: t.games.list[id].short,
      url,
      inLanguage,
      learningResourceType: 'Educational game',
      interactivityType: 'active',
      typicalAgeRange: '3-7',
      isAccessibleForFree: true,
      author: person(locale),
    });
    return items;
  }

  if (page.kind === 'world') {
    const localeCountries = ctx.countries.filter((c) => c.locale === locale);
    items.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: t.world.title,
      description: page.meta.description,
      url,
      inLanguage,
      author: person(locale),
      hasPart: localeCountries.map((c) => ({
        '@type': 'Article',
        name: c.name,
        url: `${siteConfig.url}${worldPath(locale)}/${c.id}`,
      })),
    });
    return items;
  }

  if (page.kind === 'lektire') {
    const lek = LEKTIRE[locale];
    items.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: t.lektire.title,
      description: page.meta.description,
      url,
      inLanguage,
      ...(lek?.checked ? { dateModified: lek.checked } : {}),
      educationalLevel: '1–5. razred osnovne škole',
      isAccessibleForFree: true,
      author: person(locale),
      ...(lek ? { citation: lek.izvori.map((s) => ({ '@type': 'CreativeWork', name: s.title, url: s.url })) } : {}),
    });
    return items;
  }

  if (page.kind === 'worksheets' || page.kind === 'blog' || page.kind === 'games') {
    items.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: page.meta.title ?? siteConfig.name,
      description: page.meta.description,
      url,
      inLanguage,
      isAccessibleForFree: true,
      author: person(locale),
    });
    return items;
  }

  return items;
}

// Statični HTML po ruti: isti index.html, ali sa naslovom, opisom, og:* tagovima, punim sadržajem i JSON-LD te stranice.
function pageHtml(template: string, locale: Locale, page: Page, group: PageGroup, hasRss: boolean, ctx: RenderContext): string {
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
  meta('property', 'og:locale', localeInfo[locale].ogLocale);
  replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`);

  const image = page.image;
  if (image) {
    meta('property', 'og:image', `${siteConfig.url}${image.src}`);
    meta('property', 'og:image:alt', image.alt);
    if (!image.src.startsWith('/slike/og-listovi/') && image.src !== '/slike/og-slika.jpg') {
      html = html.replace(/\s*<meta property="og:image:(width|height)"[^>]*>/g, '');
    }
  }

  const ogImageUrl = `${siteConfig.url}${image?.src ?? '/slike/og-slika.jpg'}`;
  const extra = [
    `<meta name="twitter:title" content="${escapeXml(title)}" />`,
    `<meta name="twitter:description" content="${escapeXml(page.meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeXml(ogImageUrl)}" />`,
    ...alternateLinks(group, 'link'),
    ...(hasRss ? [`<link rel="alternate" type="application/rss+xml" title="${escapeXml(siteConfig.name)}" href="${siteConfig.url}${rssPath(locale)}"/>`] : []),
    ...(page.article ? [`<meta property="article:published_time" content="${page.article.date}" />`] : []),
  ];
  if (!html.includes('<div id="root"></div>')) throw new Error('seo-files: index.html nema <div id="root"></div>');
  html = html.replace('<div id="root"></div>', `<div id="root">${prerender(locale, page, ctx)}</div>`);
  extra.push(...structuredData(locale, page, url, ctx).map(ldScript));
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

// GEO standard (llmstxt.org): sažet i potpun Markdown indeks sajta za AI pretraživače (ChatGPT, Perplexity, Claude, Gemini).
function buildLlmsFiles(posts: SourcePost[], countries: SourceCountry[], jedinice: Priprema[]): { short: string; full: string } {
  const t = dictionaries.sr;
  const srPosts = posts.filter((p) => p.locale === 'sr');
  const srCountries = countries.filter((c) => c.locale === 'sr');
  const rsCount = jedinice.filter((j) => j.sistem[0] === 'RS').length;
  const fbihCount = jedinice.filter((j) => j.sistem[0] === 'FBiH').length;

  const gradeLines = ['1', '2', '3', '4', '5'].map((r) => {
    const count = jedinice.filter((j) => j.razred === r).length;
    return `- [Pripreme za ${r}. razred osnovne škole](${siteConfig.url}/pripreme/${r}-razred): ${count} dnevnih priprema po nastavnim planovima Republike Srpske (RPZ) i Federacije BiH (ZJNPP), sa zadacima za 3 nivoa postignuća.`;
  });

  const postLines = srPosts.map(
    (p) => `- [${p.title}](${siteConfig.url}/blog/${p.slug}) (${p.date}): ${p.excerpt}`,
  );

  const countryLines = srCountries.map((c) => {
    const pisa = c.results.pisa ? `PISA ${c.results.pisa.year}: M ${c.results.pisa.math}, Č ${c.results.pisa.reading}, PN ${c.results.pisa.science}` : '';
    const timss = c.results.timss ? `TIMSS ${c.results.timss.year}: M ${c.results.timss.math}` : '';
    const metric = [pisa, timss].filter(Boolean).join('; ');
    return `- [${c.name}](${siteConfig.url}/skole-u-svetu/${c.id})${metric ? ` [${metric}]` : ''}: ${c.excerpt}`;
  });

  const testLines = WORKSHEET_GROUPS.tests.map(
    (id) => `- [${t.games.worksheet.sheets[id].title}](${siteConfig.url}/radni-listovi/${id}): ${t.games.worksheet.sheets[id].text}`,
  );

  const short = [
    `# ${siteConfig.name} (${siteConfig.displayDomain})`,
    '',
    `> Obrazovni portal i autorski blog Marka Lošića (profesor razredne nastave po struci i QA inženjer iz Banje Luke, Bosna i Hercegovina): ${jedinice.length} gotovih dnevnih priprema za razrednu nastavu (1–5. razred, RPZ RS i ZJNPP FBiH) sa diferenciranim zadacima za 3 nivoa postignuća, ${WORKSHEET_IDS.length} besplatnih A4 radnih listova, bojanki i diferenciranih testova znanja, spiskovi školske lektire, uporedna analiza školskih sistema u svijetu (PISA 2025, TIMSS 2023, PIRLS 2021) i stručni članci o nastavi i vještačkoj inteligenciji u obrazovanju.`,
    '',
    '## O autoru i jezicima',
    '',
    `- Autor: ${siteConfig.author.name} (${siteConfig.url}/o-meni) — profesor razredne nastave (Univerzitet u Banjoj Luci, iskustvo rada u 1. razredu OŠ Grahovo) i QA inženjer u IT industriji (6+ godina iskustva).`,
    `- Jezici sajta: srpski (ijekavica, podrazumijevani: ${siteConfig.url}/), bosanski (${siteConfig.url}/bs), hrvatski (${siteConfig.url}/hr), engleski (${siteConfig.url}/en) i njemački (${siteConfig.url}/de).`,
    `- Autorska prava i navođenje izvora: ${siteConfig.url}/autorska-prava (besplatna nekomercijalna upotreba u nastavi i kod kuće uz obavezno navođenje izvora).`,
    `- Potpuni podatkovni izvještaj za LLM sisteme: ${siteConfig.url}/llms-full.txt`,
    '',
    `## Biblioteka dnevnih priprema za čas (${jedinice.length} priprema: ${rsCount} RPZ RS + ${fbihCount} ZJNPP FBiH)`,
    '',
    `- [Glavna biblioteka i pretraga priprema](${siteConfig.url}/pripreme): Pretraga po razredu, predmetu, nastavnom planu, cjelini, kopiranje za e-Dnevnik, Word (.docx) preuzimanje, A4 štampa i preslovljavanje latinica/ćirilica.`,
    ...gradeLines,
    '',
    '## Školske lektire (1–5. razred, RS i FBiH)',
    '',
    `- [Lektire za osnovnu školu od 1. do 5. razreda](${siteConfig.url}/lektire): Zvanični spiskovi lektira za Republiku Srpsku (RPZ) i Federaciju BiH (NPP KS), uz preporuke za čitanje i savjete za roditelje i učitelje.`,
    '',
    '## Škole u svijetu — uporedna analiza razredne nastave (PISA 2025, TIMSS 2023, PIRLS 2021)',
    '',
    `- [Uporedni pregled i tabele rezultata](${siteConfig.url}/skole-u-svetu): Bosna i Hercegovina u poređenju sa Estonijom, Finskom, Holandijom, Japanom, Njemačkom, Singapurom i Slovenijom (dostupno na sr, bs, hr, en, de).`,
    ...countryLines,
    '',
    `## A4 radni listovi, bojanke, vježbanke i diferencirani testovi (${WORKSHEET_IDS.length} izdanja)`,
    '',
    `- [Svi A4 radni listovi i bojanke za štampu](${siteConfig.url}/radni-listovi): Besplatni materijali za predškolce i učenike od 1. do 5. razreda.`,
    `- [Vježbam kod kuće — matematika za 2. razred (vježbanka od 16 strana)](${siteConfig.url}/radni-listovi/homeWorkbookMath2)`,
    `- [Kako nastaje priča — priručnik kreativnog pisanja za 3–5. razred](${siteConfig.url}/radni-listovi/writingHandbookLatin)`,
    ...testLines,
    '',
    '## Stručni članci na blogu (nastava, metodika i AI u školi)',
    '',
    ...postLines,
    '',
  ].join('\n');

  const countryDetails = srCountries.map((c) => {
    const facts = COUNTRY_FACTS.map((f) => `- **${t.world.facts[f]}:** ${c.facts[f]}`).join('\n');
    const sources = c.sources.map((s) => `- [${s.title}](${s.url})`).join('\n');
    return [
      `### ${c.name} (${c.code}) — ${siteConfig.url}/skole-u-svetu/${c.id}`,
      `Ključna ideja: ${c.keyIdea}`,
      '',
      facts,
      ...(c.resultsNote ? ['', `Napomena o testiranjima: ${c.resultsNote}`] : []),
      '',
      c.content.trim(),
      '',
      'Izvori:',
      sources,
    ].join('\n');
  });

  const full = [
    short.trimEnd(),
    '',
    '---',
    '',
    '## Detaljni profili obrazovnih sistema (Škole u svijetu)',
    '',
    ...countryDetails.flatMap((block) => [block, '']),
    '---',
    '',
    '## Svi radni listovi po oblastima',
    '',
    ...WORKSHEET_GROUP_ORDER.flatMap((group) => [
      `### ${t.games.worksheet.groups[group]}`,
      ...WORKSHEET_GROUPS[group].map(
        (id) => `- [${t.games.worksheet.sheets[id].title}](${siteConfig.url}/radni-listovi/${id}): ${t.games.worksheet.about[id]?.text ?? t.games.worksheet.sheets[id].text}`,
      ),
      '',
    ]),
  ].join('\n');

  return { short, full };
}

// robots.txt, sitemap indeks i pod-mape, llms.txt, RSS po jeziku i statični HTML po ruti.
function seoFiles(): Plugin {
  const placeholder = siteConfig.url.includes('example.');
  let posts: SourcePost[] = [];
  let countries: SourceCountry[] = [];
  let worldSummaries: Partial<Record<Locale, string>> = {};
  let groups: PageGroup[] = [];
  let pripreme: StranicaPripreme[] = [];
  let jedinice: Priprema[] = [];
  const pripremeSrc = path.resolve(__dirname, 'pripreme');
  const postsOf = (locale: Locale) => posts.filter((p) => p.locale === locale);

  return {
    name: 'seo-files',
    apply: 'build',
    enforce: 'post',
    buildStart() {
      posts = readPosts();
      countries = readCountries();
      worldSummaries = readWorldSummaries();
      groups = pageGroups(posts, countries);
      if (fs.existsSync(pripremeSrc)) {
        jedinice = ucitajPripreme(pripremeSrc).jedinice;
        pripreme = napraviStranicePriprema(pripremeSrc);
      } else {
        jedinice = [];
        pripreme = [];
      }
    },
    generateBundle() {
      const robots = [
        'User-agent: *',
        'Allow: /',
        'Disallow: /pripreme/admin.html',
        '',
        '# Eksplicitna dozvola za AI pretraživače koji citiraju i linkuju izvor',
        'User-agent: OAI-SearchBot',
        'Allow: /',
        'User-agent: ChatGPT-User',
        'Allow: /',
        'User-agent: PerplexityBot',
        'Allow: /',
        'User-agent: ClaudeBot',
        'Allow: /',
        'User-agent: Applebot',
        'Allow: /',
      ];
      if (placeholder) {
        this.warn('siteConfig.url je još placeholder (src/config/site.ts) — sitemap.xml, RSS, llms.txt i HTML po ruti nisu napravljeni.');
      } else {
        const pageOnlyGroups = groups.filter((g) => !Object.values(g).some((p) => p?.worksheetId));
        const worksheetGroups = groups.filter((g) => Object.values(g).some((p) => p?.worksheetId));
        const latestPageMod =
          posts[0]?.date ?? siteConfig.copyrightUpdated;
        const pripremeMod = fs.existsSync(path.join(pripremeSrc, 'podaci.js'))
          ? fs.statSync(path.join(pripremeSrc, 'podaci.js')).mtime.toISOString().slice(0, 10)
          : siteConfig.copyrightUpdated;

        const childSitemaps: { name: string; lastmod: string }[] = [
          { name: 'sitemap-stranice.xml', lastmod: latestPageMod },
          { name: 'sitemap-radni-listovi.xml', lastmod: siteConfig.copyrightUpdated },
        ];
        this.emitFile({ type: 'asset', fileName: 'sitemap-stranice.xml', source: urlSetXml(pageOnlyGroups) });
        this.emitFile({ type: 'asset', fileName: 'sitemap-radni-listovi.xml', source: urlSetXml(worksheetGroups) });

        if (pripreme.length > 0) {
          childSitemaps.push({ name: 'sitemap-pripreme.xml', lastmod: pripremeMod });
          this.emitFile({
            type: 'asset',
            fileName: 'sitemap-pripreme.xml',
            source: extraSitemapXml(['/pripreme', ...pripreme.map((p) => p.path)], pripremeMod),
          });
        }

        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapIndexXml(childSitemaps) });
        robots.push('', `Sitemap: ${siteConfig.url}/sitemap.xml`);

        const llms = buildLlmsFiles(posts, countries, jedinice);
        this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llms.short });
        this.emitFile({ type: 'asset', fileName: 'llms-full.txt', source: llms.full });
        this.emitFile({ type: 'asset', fileName: `${siteConfig.indexNowKey}.txt`, source: siteConfig.indexNowKey });

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
      const ctx: RenderContext = { posts, countries, worldSummaries };
      fs.writeFileSync(path.join(options.dir, '404.html'), notFoundHtml(template));
      for (const group of groups) {
        for (const [locale, page] of groupEntries(group)) {
          const file = path.join(options.dir, page.path, 'index.html');
          fs.mkdirSync(path.dirname(file), { recursive: true });
          fs.writeFileSync(file, pageHtml(template, locale, page, group, postsOf(locale).length > 0, ctx));
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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/react-router')) {
              return 'vendor-react';
            }
            if (id.includes('/react-markdown/') || id.includes('/remark-') || id.includes('/micromark') || id.includes('/mdast') || id.includes('/unist')) {
              return 'vendor-markdown';
            }
          }
        },
      },
    },
  },
});
