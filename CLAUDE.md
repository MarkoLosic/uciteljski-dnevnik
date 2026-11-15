# CLAUDE.md — Blog nastavnika (BiH): obrazovanje i AI u obrazovanju

> **Namena ovog fajla:** Ovo je kompletno, detaljno uputstvo za Claude Code. Claude Code automatski učitava ovaj fajl na početku svake sesije u ovom direktorijumu. Sadrži opis projekta, tehnološki stack, strukturu fajlova, TypeScript tipove, format članaka, logiku čitanja Markdowna, dizajn sistem, pravila za rad, plan izgradnje korak po korak, scenarije za formatiranje članaka, deployment i održavanje. **Ne briši i ne skraćuj ovaj fajl** — on je izvor istine za projekat. Ako menjaš arhitekturu, ažuriraj relevantne sekcije pre nego što nastaviš sa kodom.

---

## Sadržaj

1. Opis projekta
2. Tehnološki stack
3. Struktura fajlova
4. TypeScript tipovi
5. Format Markdown članaka
6. Logika čitanja članaka
7. Rutiranje
8. Dizajn sistem (Tailwind)
9. Komponente — detaljne specifikacije
10. Stranice — detaljne specifikacije
11. Pristupačnost (a11y)
12. SEO i meta podaci
13. Rukovanje greškama
14. Pravila za Claude Code
15. Formatiranje novih članaka (scenariji)
16. Plan izgradnje — korak po korak
17. Radni tok za dodavanje članaka
18. Proširenja (roadmap)
19. Deployment
20. Održavanje i kvalitet koda
21. Reference
22. Transparentnost sadržaja

> **Napomena:** Sekcije 15–22 još nisu upisane u ovaj fajl (originalni tekst je prekinut posle sekcije 14). Dopuniti kada korisnik dostavi ostatak.

---

## 1. Opis projekta

Ovo je **React + TypeScript blog sajt** koji vodi **Marko Lošić** iz Banje Luke (BiH) — **QA inženjer u IT-u** (6+ godina) i **profesor razredne nastave po struci** (8 meseci predavao u prvom razredu, OŠ Grahovo). Trenutno nije u učionici; piše o obrazovanju i tehnologiji u nastavi iz ugla nekoga ko je bio u oba sveta. Ne tvrditi u tekstovima da trenutno predaje. Blog se bavi temama **obrazovanja i upotrebe veštačke inteligencije u obrazovanju**, ali **ime sajta i identitet nisu AI-orijentisani** — sajt zvuči kao lični/profesionalni nastavnički blog, a AI je jedna od tema, ne cela poenta.

**Ključne činjenice:**
- Sav sadržaj (članci) čuva se kao **Markdown fajlovi** unutar `src/content/posts/`.
- **Nema baze podataka, nema CMS-a** — sve je u kodu i Git-u.
- Korisnik piše članke (tekst, beleške, sirovi sadržaj), a **Claude Code ih formatira** u ispravne `.md` fajlove sa frontmatterom (vidi sekciju 15).
- Claude Code izgrađuje i održava **kod** i **pomaže u formatiranju sadržaja**.
- Sajt je **višejezičan**: srpski (podrazumevani, latinica, **ijekavica** — kako se piše u Republici Srpskoj), engleski, hrvatski, bosanski i njemački — i interfejs i članci (sekcija 7.1).
- **Ton sajta:** ličan, topao, profesionalan, bez korporativnog žargona. Kao da nastavnik piše iz svoje učionice.

**Predlog imena (nije obavezno):** `Iz učionice`, `Nastavničke beleške`, `Moja učionica`, `Tabla i kreda`. Kada korisnik izabere ime, ažuriraj `siteConfig` (sekcija 3) i ovaj opis.

---

## 2. Tehnološki stack

| Sloj | Tehnologija | Verzija | Napomena |
|------|-------------|---------|----------|
| Framework | React | 18.x | Funkcionalne komponente + Hooks |
| Build alat | Vite | 5.x | `import.meta.glob` za čitanje fajlova |
| Jezik | TypeScript | 5.x | `strict: true`, bez `any` |
| Rutiranje | react-router-dom | 6.x | BrowserRouter, Routes, Route, Outlet |
| Markdown | react-markdown | 9.x | + `remark-gfm` za tabele, liste zadataka, strikethrough |
| Frontmatter | gray-matter | 4.x | Parsiranje YAML zaglavlja |
| Stilizovanje | Tailwind CSS | 3.x ili 4.x | Utility klase, Vite plugin |
| Ikone | lucide-react | najnovija | Lagane SVG ikone (opciono) |
| Deploy | Vercel | — | Automatski iz GitHub-a |

**Instalacija (referenca):**

```bash
npm create vite@latest ai-obrazovanje-blog -- --template react-ts
cd ai-obrazovanje-blog
npm install
npm install react-router-dom react-markdown remark-gfm gray-matter
npm install lucide-react
npm install -D tailwindcss @tailwindcss/vite @types/node
```

Napomena: `@types/node` je potreban za `path` module u `vite.config.ts` ako se koristi. Ako Tailwind 4.x, konfiguracija je drugačija nego 3.x — proveri zvaničnu dokumentaciju.

---

## 3. Struktura fajlova (obavezno poštovati)

```text
Učiteljski_dnevnik/            ← koren projekta (npm ime: uciteljski-dnevnik)
├── CLAUDE.md                  ← ovaj fajl
├── package.json
├── tsconfig.json              # app (src/), referencira tsconfig.node.json
├── tsconfig.node.json         # vite.config.ts + deljeni validator
├── vite.config.ts             # pluginovi markdown-posts (vidi 6) i seo-files (sitemap.xml, robots.txt, RSS, HTML po ruti — vidi 12)
├── plugins/
│   └── pripremeStranice.ts    # statične stranice priprema: /pripreme/<slug>, po razredu i predmetu (vidi 10.8)
├── vercel.json                # SPA rewrite: sve rute → index.html
├── index.html
├── .gitignore
├── README.md                  ← kratak opis za ljude (opciono)
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx               # ulazna tačka, BrowserRouter
    ├── App.tsx                # definicija ruta
    ├── index.css              # Tailwind direktive + globalni stilovi
    ├── vite-env.d.ts          # Vite tipovi
    ├── config/
    │   └── site.ts            # siteConfig: ime sajta, autor (ime, email), linkovi — isto na svim jezicima
    ├── i18n/
    │   ├── config.ts          # LOCALES, DEFAULT_LOCALE, localeInfo (ime, BCP 47 tag, slug „O meni“) — deli se sa vite.config.ts
    │   ├── paths.ts           # localeBase, pathsFor(locale), switchLocalePath
    │   ├── LocaleContext.tsx  # LocaleProvider + useLocale() → { locale, t, paths }
    │   ├── dictionaries.ts    # Record<Locale, Dictionary>
    │   ├── locales/           # sr.ts (izvor tipa Dictionary), en.ts, hr.ts, bs.ts, de.ts
    │   └── worksheetAbout/    # „O ovom listu“ po jeziku (sr.ts; ostali jezici kad se prevede)
    ├── types/
    │   ├── post.ts            # Post, PostMeta, Category
    │   └── country.ts         # COUNTRY_FACTS, CountryFrontmatter, CountryMeta
    ├── components/
    │   ├── Layout.tsx         # Header + ErrorBoundary/Suspense(Outlet) + Footer
    │   ├── ErrorBoundary.tsx  # hvata greške pri iscrtavanju (jedina klasna komponenta)
    │   ├── Header.tsx         # navigacija
    │   ├── Footer.tsx         # copyright, linkovi
    │   ├── PostCard.tsx       # kartica članka
    │   ├── CategoryBadge.tsx  # bedž kategorije
    │   ├── EmptyState.tsx     # prazno stanje (nema članaka)
    │   ├── ScrollToTop.tsx    # skrol na vrh pri promeni rute
    │   ├── ThemeToggle.tsx    # preklopnik tamna/svetla tema
    │   ├── LanguageSwitcher.tsx # izbor jezika (dugme sa kodom + meni sa linkovima)
    │   ├── TableOfContents.tsx # sadržaj članka (## i ###), samo ako ima ≥ 3 sekcije ##
    │   ├── CodeBlock.tsx      # <pre> iz Markdowna sa dugmetom „Kopiraj“
    │   ├── ShareButtons.tsx   # deljenje članka: Viber, WhatsApp, Facebook, kopiraj link, navigator.share
    │   ├── PixelIcon.tsx      # pikselske SVG ikone (9×9) sa markolosic.github.io
    │   ├── CountryCode.tsx    # dvoslovna oznaka zemlje (umesto emoji zastave)
    │   └── ResultsTable.tsx   # tabela PISA / TIMSS / PIRLS + prosek OECD-a
    ├── pages/
    │   ├── Home.tsx           # početna
    │   ├── BlogList.tsx       # lista članaka
    │   ├── BlogPost.tsx       # pojedinačni članak
    │   ├── About.tsx          # o sajtu / o autoru
    │   ├── Games.tsx          # lista igara za predškolce
    │   ├── GamePlay.tsx       # jedna igra + ekran „Bravo!“
    │   ├── Worksheet.tsx      # radni list za štampu (A4)
    │   ├── World.tsx          # Škole u svetu: kartice zemalja + tabela za poređenje
    │   ├── Country.tsx        # jedna zemlja: činjenice, tekst, izvori
    │   ├── Lektire.tsx        # lektire 1–5. razred (RS i FBiH) + preporuke i savjeti (sekcija 10.9)
    │   └── NotFound.tsx       # 404
    ├── games/                 # igre za predškolce (sekcija 10.5)
    │   ├── ids.ts             # GAME_IDS, veštine, boje, oblici (deli se sa rečnicima)
    │   ├── thumbnails.ts      # WORKSHEET_THUMBNAILS — sličice listova (kartice + og:image, deli se sa vite.config.ts)
    │   ├── registry.ts        # GameId → komponenta, ikona, boja kartice, veštine
    │   ├── shared.tsx         # toyHex, shuffle, ShapeIcon, RoundDots, useShake, useDragDrop
    │   ├── things.ts          # sličice (lucide) za pamćenje, brojanje, veličine
    │   ├── worksheets.tsx     # 21 radni list: igre na papiru, predpisanje, pisanje, brojevi, logika
    │   ├── workbook.tsx       # vježbanka „Vježbam kod kuće — matematika, 2. razred“ (16 strana)
    │   ├── writingHandbook.tsx # priručnik „Kako nastaje priča“ za mlade pisce (15 strana, latinica i ćirilica)
    │   └── Balloons.tsx, ColorSort.tsx, ShapeMatch.tsx, Trace.tsx, ConnectDots.tsx,
    │       Maze.tsx, Memory.tsx, Pattern.tsx, Count.tsx, Sizes.tsx
    ├── lektire/               # sadržaj stranice Lektire (sekcija 10.9)
    │   ├── types.ts           # tipovi, LEKTIRE_LOCALES (sr, bs), LEKTIRE_SLUG, hasLektire
    │   ├── spiskovi.ts        # RS_DJELA, FBIH_DJELA — djela iz nastavnih programa
    │   ├── sr.ts, bs.ts       # napomene, preporuke, savjeti, izvori po jeziku
    │   └── index.ts           # LEKTIRE: Locale → sadržaj
    ├── lib/
    │   ├── posts.ts           # čitanje .md fajlova
    │   ├── frontmatter.ts     # validateFrontmatter, readingMinutes (deli se sa vite.config.ts)
    │   ├── seo.ts             # documentTitle, pageMeta.* — naslov/opis stranica (deli se sa vite.config.ts)
    │   ├── usePageMeta.ts     # naslov, opis, Open Graph i canonical po stranici
    │   ├── headings.ts        # extractHeadings, slugifyHeading — id-jevi naslova za sadržaj i sidra
    │   ├── clipboard.ts       # copyText (Clipboard API + rezervna varijanta)
    │   ├── formatDate.ts      # formatiranje datuma (po jeziku)
    │   ├── countries.ts       # čitanje zemalja (isti obrazac kao posts.ts)
    │   └── countryFrontmatter.ts # validateCountry (deli se sa vite.config.ts)
    └── content/
        └── posts/             # OVDE SE DODAJU ČLANCI, po folderu za svaki jezik
            ├── sr/ai-u-nastavi-od-1-do-5-razreda.md
            ├── en/ai-u-nastavi-od-1-do-5-razreda.md   # prevod = isti slug
            └── hr/ bs/ de/ ...
        ├── countries/         # Škole u svetu: jedna zemlja = jedan .md (sekcija 10.7)
        │   └── sr/bosna-i-hercegovina.md, estonija.md, finska.md, holandija.md, japan.md, nemacka.md, singapur.md, slovenija.md
        └── world/             # zaključci ispod tabela na stranici Škole u svetu (bez frontmattera)
            └── sr/zakljucci.md
```

Napomena: Folder `src/content/posts/` je isključivo korisnikov sadržaj. Claude Code ga dira samo kada korisnik eksplicitno zatraži formatiranje novog članka (sekcija 15).

### 3.1. `src/config/site.ts`

Centralno mesto za ime sajta, opis, autora i linkove. Koristi ovo svuda umesto hardkodovanih stringova.

```typescript
export const siteConfig = {
  name: 'Iz učionice',
  tagline: 'O učionici i tehnologiji u nastavi',
  description:
    'Lični blog nastavnika iz Bosne i Hercegovine o obrazovanju, nastavnoj praksi i upotrebi veštačke inteligencije u učionici.',
  author: {
    name: 'Ime Prezime',
    role: 'Profesor razredne nastave',
    intro: '…',            // uvod na početnoj i „O meni"
    bio: 'Profesor razredne nastave sa iskustvom u IT-u. Pišem o učionici i tehnologiji u nastavi.',
    background: [{ title, text }, …], // „Ko sam ja" (IT, razredna nastava)
    email: 'kontakt@example.ba',
  },
  topics: [{ title, text }, …],  // „O čemu pišem"
  url: 'https://www.xn--uiteljskidnevnik-s7b.online',
  locale: 'sr-Latn-BA',
  social: {
    linkedin: '',
    twitter: '',
    github: '',
  },
} as const;
```

**Ažurirano (višejezičnost):** `siteConfig` sada drži samo ono što je isto na svim jezicima: `name`, `author.name`, `author.email`, `url`, `social`. Prevodivi tekstovi (`tagline`, `author.role/location/intro/background`, `topics`) su u `src/i18n/locales/<jezik>.ts`. Komponente ih spajaju: `const author = { ...siteConfig.author, ...t.author }`.

**Pravilo:** Kada korisnik menja tekst o sebi, menjaj ga u **svih pet** rečnika.

---

## 4. TypeScript tipovi (`src/types/post.ts`)

Definiši sledeće interfejse i koristi ih svuda gde se radi sa člancima:

```typescript
export const CATEGORIES = [
  'AI alati u nastavi',
  'Etika i AI',
  'Iskustva iz prakse',
  'Vijesti',
  'Resursi',
] as const;

export type Category = (typeof CATEGORIES)[number];

// slug kategorije u filteru liste: /blog?kategorija=resursi
export const CATEGORY_SLUGS: Record<Category, string> = { … };

export interface PostMeta {
  slug: string;
  locale: Locale;     // iz foldera: content/posts/<jezik>/
  title: string;
  date: string;       // ISO format: "YYYY-MM-DD"
  excerpt: string;
  category: Category;
  readingMinutes: number; // računa plugin markdown-posts (~200 reči/min)
}

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  category: Category;
}
```

**Pravila:**
- Nigde ne koristi `any`. Ako tip nije poznat, koristi `unknown` i suzi ga proverom.
- `Category` je union type iz `CATEGORIES` — dodavanje nove kategorije menja samo taj niz.
- `PostFrontmatter` je tip za rezultat gray-matter parsiranja; validiraj ga pre nego što ga pretvoriš u `PostMeta`.

---

## 5. Format Markdown članaka

Svaki članak je `.md` fajl u `src/content/posts/<jezik>/` (`sr`, `en`, `hr`, `bs`, `de`). Ime fajla postaje URL slug (npr. `sr/ai-u-nastavi.md` → `/blog/ai-u-nastavi`, `en/ai-u-nastavi.md` → `/en/blog/ai-u-nastavi`). **Prevod istog članka ima isto ime fajla** u folderu drugog jezika — po tome izbor jezika nalazi prevod. Članak bez prevoda se jednostavno ne pojavljuje na tom jeziku. `category` je uvek srpski ključ iz `CATEGORIES`; prevod oznake je u `t.categories`. Fajl van foldera jezika obara build.

### 5.1. Obavezan frontmatter

Na vrhu svakog fajla, između `---` linija:

```yaml
---
title: "Naslov članka"
date: "2026-10-27"
excerpt: "Kratak opis za listu članaka (1-2 rečenice)."
category: "AI alati u nastavi"
---
```

### 5.2. Pravila za frontmatter

| Polje | Tip | Pravilo |
|-------|-----|---------|
| `title` | string | 10–80 karaktera, bez tačke na kraju |
| `date` | string | ISO `YYYY-MM-DD`; ne u budućnosti |
| `excerpt` | string | 80–200 karaktera, 1–2 rečenice, bez Markdowna |
| `category` | string | Tačno jedna iz `CATEGORIES` (sekcija 4) |

Ako bilo koje polje nedostaje ili je neispravno, `posts.ts` baca grešku sa imenom fajla (sekcija 6.3).

### 5.3. Pravila za slug (ime fajla)

- Mala slova, bez dijakritika (č→c, ć→c, ž→z, š→s, đ→dj).
- Reči razdvojene crticom (`-`), bez razmaka, bez podvlaka.
- Samo `a-z`, `0-9`, `-`. Bez tačaka, bez specijalnih znakova.
- Dužina: 3–80 karaktera.
- Primer: `kako-koristiti-chatgpt-u-nastavi.md` → `/blog/kako-koristiti-chatgpt-u-nastavi`.
- Ako slug već postoji, pitaj korisnika pre nego što prepišeš fajl.

### 5.4. Struktura sadržaja (preporuka, ne obaveza)

```markdown
## Uvod

Kratak uvod — zašto je tema važna, šta ćeš pokriti.

## Glavna sekcija 1

Tekst...

### Podsekcija

Tekst...

## Glavna sekcija 2

Tekst...

## Zaključak

Kratak zaključak ili pitanje čitaocima.
```

**Pravila:**
- `##` za glavne sekcije, `###` za podsekcije. Ne preskakati nivoe (`##` → `####`).
- Liste: `-` za nabrajanje, `1.` za numerisane.
- Linkovi: `[tekst](https://url)`.
- Naglašavanje: `**bold**` i `*italic*` štedljivo.
- Slike: `![alt tekst](/slike/ime.jpg)` — slike idu u `public/slike/`.
- Tabele: GFM tabele su podržane (`remark-gfm`).
- Liste zadataka: `- [ ]` i `- [x]` su podržane.

### 5.5. Primer celog članka

```markdown
---
title: "Zašto AI u obrazovanju nije samo trend"
date: "2026-10-27"
excerpt: "Kratak pregled stanja veštačke inteligencije u obrazovanju u Bosni i Hercegovini i regionu."
category: "Vijesti"
---

## Uvod

Veštačka inteligencija polako ulazi u učionice, ali...

## Šta to znači za nastavnike?

Prva stvar koju treba razumeti je...

### Praktični primer

- Alat 1: ...
- Alat 2: ...

## Zaključak

...
```

---

## 6. Logika čitanja članaka (`src/lib/posts.ts`)

**Važno — gray-matter se NE izvršava u browseru.** gray-matter zavisi od Node-ovog `Buffer`-a, pa bi u browseru pukao (`Buffer is not defined`). Zato frontmatter parsira Vite plugin `markdownPosts` u `vite.config.ts` (radi u Node-u): za svaki `.md` modul pozove `matter()`, pozove `validateFrontmatter()` i vrati `export default { data, content }`. Posledica: **neispravan članak obara `npm run build` i dev server** sa porukom iz sekcije 6.3.

Svaki `.md` se uvozi dvaput (code-splitting): `x.md?meta` → `{ data, readingMinutes }` (mali, eager, u glavnom paketu) i `x.md` → sirovi Markdown string (lazy, zaseban chunk po članku, učitava ga `BlogPost`):

```typescript
const metaModules = import.meta.glob('../content/posts/*/*.md', {
  query: '?meta', import: 'default', eager: true,
}) as Record<string, { data: unknown; readingMinutes: number }>;
const contentModules = import.meta.glob('../content/posts/*/*.md', { import: 'default' })
  as Record<string, () => Promise<string>>;
```

**Ne uvozi tekst članaka eager** — svih 5 jezika bi završilo u glavnom paketu.

`validateFrontmatter` živi u `src/lib/frontmatter.ts` i ne sme uvoziti ništa zavisno od okruženja (koristi ga i Node i browser). `posts.ts` ga ponovo poziva da bi dobio ispravan `PostFrontmatter` tip.

### 6.1. Parsiranje

Za svaki fajl:
1. Frontmatter parsira plugin `markdownPosts` (gray-matter, pri buildu).
2. Validiraj frontmatter (sekcija 6.3).
3. Slug = ime fajla bez `.md` (npr. `ai-u-nastavi.md` → `ai-u-nastavi`).
4. Sačuvaj sirovi Markdown sadržaj kao `content`.

### 6.2. Funkcije koje `posts.ts` mora da izloži

| Funkcija | Potpis | Opis |
|----------|--------|------|
| `getAllPosts` | `(locale: Locale): PostMeta[]` | Svi članci jezika, sortirano po `date` opadajuće |
| `getPostBySlug` | `(locale: Locale, slug: string): PostMeta \| null` | Podaci o članku ili `null` |
| `loadPostContent` | `(locale: Locale, slug: string): Promise<string> \| null` | Sirovi Markdown (lazy chunk) |
| `getRelatedPosts` | `(post: PostMeta, count: number): PostMeta[]` | Za kraj članka: ista kategorija, pa najnoviji |
| `getPostsByCategory` | `(locale: Locale, category: Category): PostMeta[]` | Filtrirano, sortirano po datumu |
| `getAllCategories` | `(locale: Locale): Category[]` | Kategorije sa bar jednim člankom, redom iz `CATEGORIES` |
| `getRecentPosts` | `(locale: Locale, count: number): PostMeta[]` | Najnovijih `count` članaka |

### 6.3. Validacija frontmattera

Funkcija `validateFrontmatter(data: unknown, filename: string): PostFrontmatter`:
- Baca `Error` sa porukom: `Neispravan frontmatter u "ime-fajla.md": <razlog>`.
- Proverava:
  - `title` je string, 10–80 karaktera, bez tačke na kraju.
  - `date` je string u formatu `YYYY-MM-DD` i nije u budućnosti. **Datum mora biti pod navodnicima** — bez njih YAML ga pretvara u `Date` objekat i validacija javlja grešku.
  - `excerpt` je string, 80–200 karaktera.
  - `category` je jedan od `CATEGORIES`.

### 6.4. Keširanje

Rezultat `getAllPosts()` izračunaj jednom (modul-level konstanta) da se ne parsira pri svakom pozivu:

```typescript
let cachedPosts: PostMeta[] | null = null;

export function getAllPosts(): PostMeta[] {
  if (cachedPosts) return cachedPosts;
  // ... parsiranje
  cachedPosts = sorted;
  return cachedPosts;
}
```

### 6.5. Sortiranje

Najnoviji članci prvi (po `date` opadajuće). Ako su datumi isti, sortiraj po `title` rastuće (stabilno sortiranje).

### 6.6. Formatiranje datuma (`src/lib/formatDate.ts`)

```typescript
export function formatDate(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat('sr-Latn-BA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
```

Primer izlaza: `27. oktobar 2026.`

Stvarni potpis je `formatDate(iso, locale)` — koristi `localeInfo[locale].tag`. Implementacija dodaje `timeZone: 'UTC'`: `new Date('YYYY-MM-DD')` je UTC ponoć, pa bi bez toga čitaoci u zapadnim vremenskim zonama videli prethodni dan.

---

## 7. Rutiranje (`App.tsx`)

Koristi `react-router-dom`:

| Putanja | Komponenta | Opis |
|---------|------------|------|
| `/` | `<Home />` | Početna — naslov sajta, kratak opis, 3 najnovija članka |
| `/blog` | `<BlogList />` | Lista svih članaka (kartice) |
| `/blog/:slug` | `<BlogPost />` | Pojedinačni članak |
| `/o-meni` | `<About />` | O meni: IT iskustvo, razredna nastava, o blogu, kontakt |
| `/igre` | `<Games />` | Igre za predškolce (sekcija 10.5) |
| `/igre/:gameId` | `<GamePlay />` | Jedna igra; nepoznat `gameId` → `<NotFound />` |
| `/igre/radni-listovi/:sheetId` | `<Worksheet />` | Radni list za štampu (`WORKSHEET_IDS`; ćirilica samo sr i bs) |
| `/skole-u-svetu` | `<World />` | Razredna nastava u svetu (sekcija 10.7) |
| `/skole-u-svetu/:countryId` | `<Country />` | Jedna zemlja |
| `/lektire` | `<Lektire />` | Lektire 1–5. razred (samo sr i bs: `/lektire`, `/bs/lektire`) |
| `*` | `<NotFound />` | 404 stranica |

Sve rute su umotane u `<Layout />` koji koristi `<Outlet />` (unutar `ErrorBoundary` i `Suspense`). `Home`, `BlogList` i `NotFound` su u glavnom paketu; `BlogPost` (react-markdown), `About`, `Games`, `GamePlay` i `Worksheet` se učitavaju preko `React.lazy`.

### 7.1. Jezici

- `App.tsx` pravi isti skup ruta za svaki jezik iz `LOCALES`, umotan u `<LocaleProvider locale>`. Srpski nema prefiks (`/`, `/blog`, `/o-meni`); ostali imaju (`/en`, `/en/blog`, `/en/about`, `/hr/o-meni`, `/bs/o-meni`, `/de/ueber-mich`). Slug stranice „O meni“ je u `localeInfo[locale].aboutSlug`, a stranice igara u `localeInfo[locale].gamesSlug` (`igre`, en `games`, de `spiele`; `gameId` je isti na svim jezicima), a radnih listova u `worksheetSlug` (`radni-listovi`, en `worksheets`, de `arbeitsblaetter`), a Škola u svetu u `worldSlug` (`skole-u-svetu`, hr/bs `skole-u-svijetu`, en `schools-worldwide`, de `schulen-weltweit`).
- **Linkove nikad ne hardkoduj** (`'/blog'`) — koristi `paths` iz `useLocale()`: `paths.home`, `paths.blog`, `paths.post(slug)`, `paths.about`, `paths.games`, `paths.game(id)`, `paths.worksheet(id)`, `paths.world`, `paths.country(id)`.
- **Tekst interfejsa nikad ne hardkoduj** — koristi `t` iz `useLocale()`. Novi string dodaj u `locales/sr.ts`, a TypeScript će tražiti isti ključ u ostala četiri rečnika.
- `LocaleProvider` postavlja `<html lang>` na BCP 47 tag jezika.
- `LanguageSwitcher` vodi na istu stranicu na drugom jeziku (`switchLocalePath`); ako članak nema prevod, vodi na listu članaka tog jezika.
- Varijante: srpski = **ijekavica** (dijete, mjesec, vrijeme, poslije, prije, vježba, uvijek; ali srpska leksika: sedmica, tačno, hiljada, uveče, juče) — važi za interfejs, članke, zemlje i sve radne listove; ekavicu ne koristiti nigdje; hrvatski = ijekavica i hrvatska leksika (tjedan, točno, učitelj); bosanski = ijekavica i bosanska leksika (sedmica, tačno, historija); njemački = „Sie“ forma.
- Ime sajta (`siteConfig.name`) se ne prevodi.
- Za sada nema automatskog preusmeravanja po jeziku browsera.

**Napomena za BlogPost:** ako slug ne postoji, prikaži `<NotFound />` ili poruku „Članak nije pronađen" sa linkom na `/blog`.

**ScrollToTop:** komponenta koja pri svakoj promeni rute skroluje na vrh (`window.scrollTo(0, 0)` u `useEffect` na `pathname`).

---

## 8. Dizajn sistem (Tailwind)

Dizajn prati lični sajt autora **https://markolosic.github.io** (njegovi `styles.css` i `blog/blog.css`). Tamna tema je podrazumevana; svetla se bira preklopnikom u headeru. Pri izmenama dizajna to je referenca.

### 8.1. Paleta boja (CSS promenljive u `index.css`)

Boje su CSS promenljive na `:root` (tamna) i `:root[data-theme='light']` (svetla), izložene Tailwindu kroz `@theme inline` kao `bg-bg`, `bg-surface`, `bg-surface-2`, `border-line`, `border-line-strong`, `text-ink`, `text-muted`, `text-accent`, `text-accent-ink`, `text-accent-2`. **Ne koristi fiksne Tailwind boje (`blue-900`, `gray-600`…)** — ne menjaju se sa temom.

| Uloga | Promenljiva | Tamna | Svetla |
|-------|-------------|-------|--------|
| Pozadina | `--bg` | `#07090d` | `#f6f7fb` |
| Površina (kartice) | `--surface` | `#0d1118` | `#ffffff` |
| Površina 2 (pločice, aktivni link) | `--surface-2` | `#131a25` | `#eef1f7` |
| Tekst | `--text` | `#e9edf4` | `#0e1420` |
| Tekst sekundarni | `--muted` | `#8f99ab` | `#566074` |
| Akcenat (zeleni) | `--accent` | `#34d399` | `#047857` |
| Akcenat 2 (indigo) | `--accent-2` | `#8b9bff` | `#4b57d6` |
| Granice | `--border` / `--border-strong` | bela 8% / 16% | tamna 9% / 20% |

Svetli akcenat je `#047857` (emerald-700), ne `#059669` kao na originalu — zbog kontrasta teksta ≥ 4.5:1.

### 8.2. Tipografija

- Google Fonts (link u `index.html`): **Space Grotesk** za naslove (`font-head`), **Inter** za tekst (`font-sans`), **JetBrains Mono** za meta podatke, bedževe i „eyebrow" oznake (`font-mono`).
- Naslovi: krupni, `tracking` negativan (`-0.03em`), `clamp()` veličine (`.page-title`, `.section-title`).
- Telo članka: 18px, `line-height: 1.75`.
- Eyebrow iznad naslova sekcije: `.eyebrow` (mono, uppercase, akcent), npr. „01 — Ko sam ja".

### 8.3. Raspored

- Kontejner: utility `wrap` = `width: min(1160px, 100% - 40px)`, centrirano.
- Članci: `max-w-[780px]`.
- Header je fiksiran (plutajuća „pilula"), pa stranice počinju sa `pt-[130px]` (hero `pt-[120px]`).
- Kartice: `.card` (radius 20px, 1px granica, `--surface`), razmak u mrežama `gap-[18px]`.

### 8.4. Breakpoint-i

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

Testirati na: 375px, 768px, 1024px, 1440px. (Headless Chrome ne ide ispod ~500px — za 375px renderuj stranicu u iframe-u te širine.)

### 8.5. Globalni stilovi (`index.css`)

- `@import "tailwindcss";`, tokeni teme (8.1), fontovi u `@theme`.
- Pozadina: `.bg-glow` u `Layout` (dva zamućena kruga + mreža 64px) — fiksno iza sadržaja.
- Komponentne klase: `.card`, `.eyebrow`, `.section-title`, `.page-title`, `.btn` + `.btn-primary`/`.btn-ghost`, `.icon-tile`, `.cat`, `.status-dot`, `.photo-ring`/`.photo`, `.float-chip`; utility `wrap`, `grad` (gradijent tekst), `focus-ring`.
- Linkovi nasleđuju boju (`color: inherit`); u članku su u akcentnoj boji, podvučeni.
- Tema se postavlja inline skriptom u `index.html` pre prvog iscrtavanja: sačuvana (`localStorage.theme`) → sistemska → tamna.
- `prefers-reduced-motion` gasi sve animacije.

### 8.6. Stilizovanje Markdown sadržaja

Klasa `.prose` je **sopstvena** (u `index.css`, prati `blog.css` sa originala) — `@tailwindcss/typography` se ne koristi (uklonjen). U `BlogPost.tsx`: `<article className="prose">`. Pokriva naslove, liste (marker u akcentu), citate, kod, slike, tabele, liste zadataka.

### 8.7. Fokus stanja (a11y)

Globalno `:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }`; utility `focus-ring` daje isto na elementima koji to eksplicitno traže.

---

## 9. Komponente — detaljne specifikacije

### 9.1. `Layout.tsx`

- Struktura: `<Header />` + `<main><ErrorBoundary key={pathname}><Suspense><Outlet /></Suspense></ErrorBoundary></main>` + `<Footer />`.
- Greška pri iscrtavanju (ili neuspelo učitavanje chunk-a posle deploy-a) prikazuje `t.error` sa dugmetom „Osveži stranicu“ umesto belog ekrana.
- `<main>` ima `min-h-screen` da footer bude na dnu.
- Sadrži `<ScrollToTop />`.

### 9.2. `Header.tsx`

- Plutajuća pilula: `fixed top-3.5`, centrirana, `rounded-full`, poluprozirna `bg-surface/70` + `backdrop-blur`; posle skrola dobija jaču granicu i senku.
- Levo: znak (zeleni kvadrat sa pikselskom kvačicom) + `siteConfig.name` (ime skriveno na < 640px, ostaje za čitače ekrana).
- Desno: Početna, Blog, Igre, O meni (`NavLink`; „Početna“ je skrivena na < 640px jer logo vodi na početnu; aktivni = `bg-surface-2 text-ink` sa unutrašnjom granicom) + `<LanguageSwitcher />` + `<ThemeToggle />`.

### 9.3. `Footer.tsx`

- Copyright: `© {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}`.
- Autor: `{t.footer.author}: {siteConfig.author.name}`.
- Linkovi: O meni, Kontakt (mailto), GitHub i LinkedIn (iz `siteConfig.social`, samo neprazni), RSS (`<jezik>/rss.xml`, samo ako jezik ima članke).

### 9.4. `PostCard.tsx`

Props:

```typescript
interface PostCardProps {
  post: PostMeta;
}
```

Struktura:
- `<Link to={paths.post(post.slug)} className="card …">` kao wrapper.
- Gore: `<CategoryBadge />` + `<time>` (`formatDate(post.date, locale)`).
- Naslov `<h3>` (`font-head`), excerpt (`text-muted`).
- Dole: „Pročitaj više →“ levo, `t.blog.readingTime(post.readingMinutes)` desno.

### 9.5. `CategoryBadge.tsx`

Props:

```typescript
interface CategoryBadgeProps {
  category: Category;
}
```

- Klasa `.cat` (mono, pilula, providna pozadina i granica iz boje `--c`); boja po kategoriji preko `[--c:…]`:

| Kategorija | Boja |
|------------|------|
| AI alati u nastavi | `--accent-2` (indigo) |
| Etika i AI | `--cat-purple` |
| Iskustva iz prakse | `--accent` (zelena) |
| Vijesti | `--cat-amber` |
| Resursi | `--muted` |

### 9.6. `EmptyState.tsx`

Props:

```typescript
interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionTo?: string;
  headingLevel?: 1 | 2 | 3; // podrazumevano 2; 1 kada je EmptyState jedini sadržaj stranice
}
```

- Prikazuje se kada nema članaka (npr. prazan `src/content/posts/`).
- Centrirano, sa ikonom (opciono), naslovom, porukom i opcionim linkom.

### 9.7. `ScrollToTop.tsx`

- `useEffect` na `useLocation().pathname` → `window.scrollTo({ top: 0, behavior: 'instant' })`.
- Ne renderuje ništa (`return null`).

---

## 10. Stranice — detaljne specifikacije

### 10.1. `Home.tsx`

Redosled sekcija (lično predstavljanje pa blog):
- Hero: „Zdravo, ja sam {author.name}" (h1), ispod `author.role`, pa `author.intro`, dugmad „Pročitaj blog" → `/blog` i „Više o meni" → `/o-meni`, fotografija autora u „blob" okviru (`public/slike/marko-losic.jpg`).
- „Ko sam ja": ilustracija „učionica → IT" (`public/slike/ucionica-i-it-{1200,2000}.webp`, alt u `t.home.whoImageAlt`), pa kartice iz `author.background` (IT iskustvo, profesor razredne nastave).
- „O čemu pišem": `siteConfig.topics`.
- „Najnovije sa bloga": 3 najnovija članka preko `getRecentPosts(3)` i `<PostCard />`.
- Ako nema članaka: `<EmptyState />`.
- Link „Svi članci →" → `/blog`.

### 10.2. `BlogList.tsx`

- Naslov: „Blog" ili „Svi članci".
- Lista svih članaka preko `getAllPosts()`.
- Svaki članak u `<PostCard />`.
- Ako nema članaka: `<EmptyState />`.
- Filter po kategoriji: pilule-linkovi („Sve“ + `getAllCategories`) u `<nav aria-label={t.blog.filterLabel}>`, stanje u URL-u `?kategorija=<CATEGORY_SLUGS>`; aktivni ima `aria-current="page"`. Prikazuje se samo ako postoje bar 2 kategorije.

### 10.3. `BlogPost.tsx`

- Uzmi `slug` iz `useParams()`.
- `getPostBySlug(slug)` — ako `null`, prikaži poruku „Članak nije pronađen" + link na `/blog`.
- Header članka: kategorija (bedž), datum, vreme čitanja, naslov, excerpt — odmah (iz `getPostBySlug`).
- Sadržaj: `loadPostContent()` u `useEffect`, pa `<ReactMarkdown remarkPlugins={[remarkGfm]} components={…}>` unutar `<article className="prose">`. Slike dobijaju `loading="lazy"`.
- Iznad teksta `<TableOfContents />` (iz `extractHeadings(markdown)`). Naslovi `##`/`###` dobijaju `id` (slug bez dijakritika, duplikati `-2`) i sidro `#`; komponenta naslova nalazi svoj id po broju linije (`node.position.start.line`). Pri učitavanju sa `#sekcija` u URL-u stranica skroluje na nju kada stigne tekst.
- Blokovi koda (`pre`) idu kroz `<CodeBlock />` sa dugmetom „Kopiraj“ (npr. promptovi).
- Posle teksta `<ShareButtons />` — obični linkovi, bez skripti trećih strana i praćenja.
- Link „← Nazad na blog" na dnu, pa sekcija „Još sa bloga“ (`getRelatedPosts(post, 3)` u `<PostCard />`).

### 10.4. `About.tsx`

- Naslov: „O meni".
- `author.intro`, zatim sekcija za svaku stavku `author.background`.
- „O blogu" sa listom `siteConfig.topics`.
- Kontakt (email iz `siteConfig.author.email`).
- Svi tekstovi o autoru su u `src/config/site.ts` (označeno `KORISNIK:`), ne u komponentama.

### 10.5. `Games.tsx` i `GamePlay.tsx` — igre za predškolce

- Deset kratkih interaktivnih igara za uzrast 3–6 (fina motorika, oko–ruka, logika, pamćenje, brojanje): baloni, razvrstavanje boja, oblici, praćenje staze, spajanje tačaka, lavirint, parovi, nizovi, brojanje, od malog do velikog.
- Igra je komponenta sa `GameProps` (`onWin`); runde vodi sama, `GamePlay` prikazuje ekran pobede („Igraj ponovo“ = remount preko `key`, „Sledeća“ = sledeći `GAME_IDS`).
- Nova igra: dodaj id u `GAME_IDS`, komponentu u `registry.ts` i tekst (`title`, `short`, `howTo`) u `t.games.list` u svih pet rečnika.
- Pravila: velike mete (dečji prst), greška samo „odmahne“ (`useShake`), bez tajmera i kazni. Prevlačenje ide kroz `useDragDrop` — radi i „dodirni predmet, pa dodirni cilj“ i tastatura. Boje igračaka (`toyHex`) su sadržaj i ne menjaju se sa temom.
- Bez zvuka, reklama i praćenja. Animacije poštuju `prefers-reduced-motion`.
- Radni listovi (`WORKSHEET_IDS`, 21): list sa istim id kao igra je njena papirna verzija (`trace`, `dots`, `maze`, `shapes`, `colors`, `count`, `pattern`, `sizes`; `GamePlay` linkuje na njih preko `hasWorksheet`); `trace`/`dots`/`maze` dele data sa igrom (`PATHS`, `FIGURES`, `MAZES`). `numbers`, `latin`, `cyrillic` su listovi za pisanje (`WritingRow`: crni uzorak, sive kopije za precrtavanje, linije). Ostali listovi su jedan SVG širine 600 i visine ≤ 660 (`Page`), sa fiksnim (ne nasumičnim) rasporedom da se isto štampaju. Na stranici igara su grupisani po `WORKSHEET_GROUPS` (naslovi u `t.games.worksheet.groups`). `WORKSHEET_LOCALES` ograničava list na jezike (ćirilica: sr, bs); abeceda za `latin` je u `t.games.worksheet.alphabet` (en/de imaju svoju), a list `colors` koristi `t.games.colorNames`. Novi list: id u `WORKSHEET_IDS` i u jednu grupu, komponenta u `worksheets` (`worksheets.tsx`), `title`/`text` u svih pet rečnika.
- Grupa `time` (Spoznaja vremena: `timeSequence`, `timeDayParts`, `timeRoutine`, `timeClock`, `timeWeek`, `timeYear`) i smislene bojanke (`coloringHandWash`, `coloringTraffic`, `coloringFood`, `coloringRecycle`, `coloringFeelings`) crtaju se u kodu (`worksheets.tsx`); isto važi za vežbe uz te lekcije (`timeClockRead`, `timeClockMath`, `timeDaysOrder`, `timeCalendar`) i matematiku sa mnogo zadataka (`mathAdd10`…`mathDivide` po 2 × 48 zadataka iz generatora sa fiksnim semenom — `DRILL_SETS`, da se štampa uvek isto; `mathHouses`, `mathPyramids`, `mathNumberLine`, `mathWordProblems` sa tekstom zadataka u `labels.wordProblems`). Pitanja u `labels.calendarTasks` važe za kalendar od 30 dana koji počinje u sredu (`CALENDAR_START`); natpisi na njima (dani, meseci, delovi dana, osećanja…) su u `t.games.worksheet.labels` i stižu kroz `SheetContext.labels` — imena dana i mjeseci su u rečnicima (ne iz `Intl`), da svaki jezik ima tačno svoje oblike (npr. hr: siječanj).
- Grupa `books` („Priručnici i vježbanke“) je prva na stranici radnih listova i drži izdanja od više strana (vježbanka i priručnik); nova takva izdanja idu u nju, a ne u tematske grupe.
- Vježbanka `homeWorkbookMath2` (`workbook.tsx`, samo sr i bs jer je novac u KM): plan vježbanja, 12 dana po jedna strana sa likom Njuška, koker španijela (SVG `Njusko`), Veliki izazov, diploma i rješenja za roditelje. Brojevi u zadacima su u nizovima na vrhu fajla, a rješenja se iz njih računaju — pri izmjeni zadatka mijenja se samo niz.
- Priručnik „Kako nastaje priča“ (`writingHandbookLatin` / `writingHandbookCyrillic`, `writingHandbook.tsx`, sr i bs): uvod sa mapom, 12 tema (pravilo pisaca, primjer „Iz radionice“, preporuka „Pročitaj“, vježbe), plan priče i strana za pisanje sa listom za provjeru. Tekst se piše latinicom, a ćirilična verzija nastaje funkcijom `toCyrillic`. Primjeri su naš tekst — ne prepisivati odlomke iz knjiga zaštićenih autorskim pravom, nego knjigu samo preporučiti.
- Svaki list vraća niz strana; `Worksheet.tsx` svaku umotava u `.sheet` (A4, uvek beo papir sa fiksnim bojama) sa zaglavljem i prelomom strane. Pri štampi se header, footer i pozadina sakrivaju (`print:hidden`). **Svaka strana mora stati na jedan A4** — proveri sa `chromium --headless --no-pdf-header-footer --print-to-pdf`. Naslov i uputstvo su u `t.games.worksheet.sheets`. Opis „O ovom listu“ za roditelje i učitelje (uzrast + 2–3 rečenice, ne štampa se, koristi se i kao meta opis) je u `src/i18n/worksheetAbout/<jezik>.ts` i stiže kroz `t.games.worksheet.about`; jezik bez opisa ima `about: {}` i prikazuje samo uputstvo. Novi list → dodaj i njegov opis.

### 10.7. `World.tsx` i `Country.tsx` — Škole u svetu

- Ugao: **razredna nastava** (prvi razredi), ne celo školstvo. BiH je referentna tačka (`reference: true`, ide prva i istaknuta je u tabeli).
- Zemlja je `.md` u `src/content/countries/<jezik>/<id>.md`; prevod = isto ime fajla. Plugin `markdown-posts` po putanji (`/content/countries/`) poziva `validateCountry` umesto `validateFrontmatter` — neispravna zemlja obara build. `src/lib/countryFrontmatter.ts` i `src/types/country.ts` su u `tsconfig.node.json`.
- Frontmatter: `name`, `code` (ISO, npr. `FI`), `excerpt` (80–200), `checked` (datum provere podataka, pod navodnicima), `reference` (opciono), `keyIdea`, `facts` (tačno ključevi iz `COUNTRY_FACTS`: `schoolStart`, `compulsory`, `tracking`, `primaryTeacher`, `teacherEducation`, `grading`, `testing`; svaki ≤ 240 karaktera), `results` (brojevi: `pisa: { year, math, reading, science }`, `timss: { year, math, science }`, `pirls: { year, reading }` — izostavljen blok = zemlja nije učestvovala), `resultsNote` (opciono), `sources` (bar jedan `{ title, url }`, `https://`). Telo: tekst sa `##` sekcijama, završava sa „Šta bismo mogli preuzeti“.
- Prosek OECD-a za PISA je konstanta `PISA_OECD_AVERAGE` u `src/lib/countries.ts` — ažuriraj je sa novim PISA ciklusom (i `year` u zemljama). TIMSS/PIRLS nemaju prosek OECD-a (centralna tačka skale 500).
- Zaključci ispod tabela: `src/content/world/<jezik>/zakljucci.md` (bez frontmattera, `##` naslovi); učitava ih `loadWorldSummary`.
- **Svaka činjenica mora imati izvor** (Eurydice, OECD, ministarstvo). Kad nisi siguran, formuliši oprezno („pravila se razlikuju po entitetima“) umesto da izmišljaš broj. Ne tvrditi da autor trenutno predaje.
- Pregled: kartice + tabela za poređenje (`COUNTRY_FACTS` × zemlje, prva kolona lepljiva, vodoravni skrol) + `<ResultsTable />` (redosled po PISA matematici; stariji ciklus = siva vrednost sa godinom) + zaključci. Zemlja: ključna ideja, kartice činjenica, rezultati, tekst, izvori, `<ShareButtons />`, ostale zemlje.
- Jezik bez zemalja: stranica prikazuje `EmptyState` sa linkom na srpsku verziju (`noindex`), link nije u headeru/footeru, a stranica nije u sitemap-u. Link je u headeru (na < 1024px u hamburger meniju) i u footeru.
- Nova činjenica: ključ u `COUNTRY_FACTS` + oznaka u `t.world.facts` (svih pet rečnika) + vrednost u svakoj zemlji.

### 10.8. Pripreme (`pripreme/`) — zadaci za 3 nivoa

- Zaglavlje priprema (`index.html`, `admin.html`, stil u `stil.css`, meni na telefonu u `zaglavlje.js`) je kopija zaglavlja sajta (`Header.tsx`): iste stavke, isti nazivi i iste boje. **Kad se mijenja meni sajta, mijenja se i ovdje.** Alati priprema (LAT/ĆIR, Generator) su u traci ispod zaglavlja, ne u meniju.
- Biblioteka dnevnih priprema je statična aplikacija u `pripreme/` (`podaci.js` = 1.436 priprema, `app.js` = prikaz); Vite je kopira u `dist/`. Adresa biblioteke je `/pripreme` (ne `/pripreme/index.html`, to preusmjerava `vercel.json`); putanje u njenim HTML fajlovima su apsolutne (`/pripreme/stil.css`), da rade i bez kose crte na kraju.
- **Statične stranice priprema** (`plugins/pripremeStranice.ts`, poziva ga `seo-files`): biblioteka otvara pripremu preko `#priprema=<slug>`, a pretraživači sve iza `#` odbacuju. Zato build pravi `/pripreme/<slug>` (cijela priprema u HTML-u + zadaci za 3 nivoa bez rješenja + JSON-LD `LearningResource` i `BreadcrumbList`; dugme vodi u biblioteku), `/pripreme/<r>-razred` i `/pripreme/<r>-razred/<predmet>` (sve pripreme po cjelinama), i dodaje ih u sitemap. Zaglavlje i skriptu teme uzima iz `pripreme/index.html`. U dev serveru se prave na zahtjev. Linkovi na razred u Reactu idu na `/pripreme/<r>-razred`.
- **Slug pripreme mora biti jedinstven** (adresa stranice i ključ za `#priprema=`); build i `provjeri:zadatke` padaju na duplikat. Slova koja se bez dijakritika poklope razlikuju se ovako: š → `sh`, ž → `zh`, č → `ch`, ć → `cj`. Nov predmet → dodaj ga u `PREDMETI` u `pripremeStranice.ts`.
- Zadaci za I, II i III nivo **nisu šablon po predmetu**, nego dolaze iz banke `pripreme/zadaci/` (`osnova.js` + `matematika.js`, `jezik.js`, `priroda.js`, `ostalo.js`): svaka tema časa ima svoje pravilo (`t:` regex nad nazivom časa, `r:` razredi). Prvo pravilo koje odgovara se koristi — specifičnija pravila idu ispred opštijih.
- Zadaci su pisani **za učenika** (kratka naredba, jedna radnja, konkretni brojevi i riječi); ishodi iz plana su za učitelja i ne idu na učenički listić.
- Računi se pišu oznakama (`[[34 + 5]]`, `[[x + 24 = 60 | 36]]`, `[[14 + 3 ? 20 - 2]]`, `[[= 4 + 5]]`, `[[! rješenje]]`…, opis u `osnova.js`); banka ih računa i provjerava, a rješenja vidi samo učitelj.
- Posle svake izmene banke ili `podaci.js`: **`npm run provjeri:zadatke`** — prolazi kroz sve pripreme i javlja temu bez svojih zadataka, netačan račun, ostatke HTML-a (`&nbsp;`), ćirilicu usred latinice i brojeve prevelike za razred (1: ≤ 20, 2: ≤ 100, 3: ≤ 1000).

### 10.9. `Lektire.tsx` — lektire za 1–5. razred

- Stranica postoji samo na jezicima iz `LEKTIRE_LOCALES` (sr, bs); na ostalima ruta ne postoji, link nije u headeru/footeru, a izbor jezika vodi na početnu. Slug je isti (`lektire`).
- Spiskovi (`src/lektire/spiskovi.ts`) se **prepisuju iz nastavnih programa**, ne iz sjećanja: RS = RPZ RS, Nastavni program Srpski jezik (II–V razred; za I razred program nije objavljen na sajtu RPZ-a); FBiH = NPP Kantona Sarajevo (2018) — ostali kantoni se mogu razlikovati; za FBiH 2. razred program ne propisuje lektiru, pa su djela sa spiskova škola u KS. Izvori su u `sr.ts` (`lektireIzvori`).
- Pri izmjeni programa: promijeni spisak, napomene u `sr.ts` i `bs.ts` i datum `checked` u oba.
- Preporuke (van spiska) ne smiju ponavljati djela sa spiskova; savjeti su za roditelje i učitelje.
- Statični HTML (`prerender`, `kind: 'lektire'`) sadrži cijeli spisak za pretraživače; stranica je u sitemap-u sa hreflang sr/bs.
- Link „Lektire“ je i u zaglavlju priprema (`pripreme/index.html`, `admin.html`).

### 10.6. `NotFound.tsx`

- Veliki „404".
- Poruka: „Stranica nije pronađena."
- Link „Nazad na početnu" → `/`.

---

## 11. Pristupačnost (a11y)

- **Slike:** obavezan `alt` tekst. Za dekorativne slike `alt=""`.
- **Kontrast:** tekst na pozadini mora imati kontrast ≥ 4.5:1 (WCAG AA).
- **Fokus:** svi interaktivni elementi imaju vidljiv fokus (sekcija 8.7).
- **Semantički HTML:** `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`, `<h1>`–`<h3>` u logičnom redosledu.
- **Jedan `<h1>` po stranici.**
- **Linkovi:** tekst linka mora imati smisao i van konteksta (ne „klikni ovde").
- **Forme (ako ih bude):** `<label>` povezan sa inputom.
- **Jezik:** `<html lang="sr-Latn-BA">` u `index.html`; `LocaleProvider` ga menja po ruti. Stavke u izboru jezika imaju `lang` i `hrefLang`.

---

## 12. SEO i meta podaci

- `index.html`: `<title>`, `<meta name="description">`, `<meta name="viewport">`, Open Graph tagovi (`og:title`, `og:description`, `og:type`, `og:url`) — podrazumevane vrednosti i ono što vide pregledi linkova bez JS-a.
- **Svaka stranica poziva `usePageMeta({ title, description })`** (`src/lib/usePageMeta.ts`, bez dodatne biblioteke): postavlja `document.title` („Naslov — Iz učionice“), description, `og:*` i `<link rel="canonical">`. Članak koristi `type: 'article'`; 404 i nepostojeći članak `noindex: true`. Opisi stranica su u rečnicima (`site.description`, `blog.description`, `about.description`).
- Naslov i opis stranica su u `src/lib/seo.ts` (`pageMeta.home(t)`, `pageMeta.game(t, id)`…) i koriste ih i stranice i `vite.config.ts`. Nova stranica → dodaj `pageMeta.*` i grupu u `pageGroups()`.
- Radni listovi su na `paths.worksheet(id)` (`/radni-listovi/<id>`, en `/en/worksheets/<id>`…); stare adrese `/igre/radni-listovi/*` i `/bojanke/*` trajno (301) preusmjerava `vercel.json`. `/pripreme/admin.html` ima `noindex` (meta + `X-Robots-Tag`).
- Plugin `seo-files` u `vite.config.ts` pri `npm run build` iz `pageGroups()` (jezici, slugovi, igre, radni listovi, članci) pravi:
  - `sitemap.xml` (sa `lastmod` = `date` i `hreflang` vezama) i `robots.txt`;
  - RSS po jeziku: `/rss.xml`, `/en/rss.xml`… (samo jezici sa člancima);
  - **statični HTML po ruti** (`dist/<putanja>/index.html`): kopija `index.html` sa pravim `lang`, `<title>`, description, `og:*`, canonical, `hreflang` linkovima i RSS linkom; za članak `og:type=article`, `article:published_time` i `og:image` = prva slika iz teksta. Vercel prvo služi statične fajlove, pa tek onda SPA rewrite — zato pregledi linkova (Viber, Facebook, WhatsApp) vide naslov i opis baš tog članka. Ako se promeni `index.html`, regexi u `pageHtml()` moraju i dalje da nađu tagove (inače build pada).
- Domen: `https://www.učiteljskidnevnik.online`, u kodu uvijek kao punycode `https://www.xn--uiteljskidnevnik-s7b.online` (sitemap, canonical i og:* moraju biti ASCII). Bez `www` i `http` preusmjerava Vercel; stara adresa `uciteljski-dnevnik-roan.vercel.app` trajno (301) preusmjerava na domen (`vercel.json`, uslov `has: host`). Ako se domen promeni, menja se u `siteConfig.url`, `index.html` i `pripreme/index.html` (`og:url`, `og:image`, `canonical`) i u preusmjeravanju u `vercel.json`. Dok je `siteConfig.url` placeholder (`example.`), sitemap se ne pravi.
- Slika za deljenje linkova: `public/slike/og-slika.jpg` (1200×630), postavljena u `index.html`.
- **Tekst u statičnom HTML-u:** `prerender()` u `vite.config.ts` upisuje u `#root` naslov i opis stranice, a za članke i zemlje i cijeli tekst (Markdown kroz `react-markdown` + `react-dom/server`). To je za pretraživače i AI alate koji ne izvršavaju JS (Bing, ChatGPT, Perplexity); React ga pri pokretanju zamijeni (`createRoot`, ne `hydrateRoot`), a klase prate `BlogPost` da skok bude minimalan.
- **JSON-LD** (`structuredData()` u `vite.config.ts`): početna = `WebSite` + `Person`, „O meni“ = `ProfilePage`, članak = `BlogPosting` (autor = `Person`). Pripreme imaju `LearningResource` + `BreadcrumbList` (sekcija 10.8).
- **og:image po stranici:** članak = prva slika iz teksta; radni list = sličica iz `src/games/thumbnails.ts` (samo jpg/png — Facebook i Viber ne prikazuju SVG); ostalo = `og-slika.jpg`.
- **Pravi 404:** `vercel.json` više nema rewrite „sve → index.html“; svaka ruta ima svoj statični `index.html`, a sve ostalo dobija `dist/404.html` (status 404, `noindex`, SPA prikaže `NotFound`). **Posljedica: nova vrsta stranice MORA ući u `pageGroups()`**, inače pri direktnom otvaranju vraća 404.
- Semantički HTML (sekcija 11) pomaže SEO.

---

## 13. Rukovanje greškama

- **Neispravan frontmatter:** `posts.ts` baca `Error` sa imenom fajla i razlogom (sekcija 6.3). Ovo se vidi pri buildu — bolje nego da sajt prikaže polomljen članak.
- **Nepostojeći slug:** `BlogPost` prikazuje poruku „Članak nije pronađen" + link na `/blog`.
- **Prazan folder članaka:** `EmptyState` na `Home` i `BlogList`.
- **Greške pri buildu:** Claude Code pokreće `npm run build` posle većih izmena i popravlja pre nego što nastavi.
- **Runtime greške:** `ErrorBoundary` u `Layout` (sekcija 9.1) — poruka iz `t.error` + dugme za osvežavanje.

---

## 14. Pravila za Claude Code

1. **Ne diraj fajlove u `src/content/posts/` bez eksplicitnog zahteva korisnika.** Ti fajlovi su sadržaj. Jedini izuzetak je formatiranje novih članaka na zahtev korisnika (sekcija 15) — tada kreiraš ili menjaš `.md` fajl, ali uvek prema korisnikovom tekstu.
2. **Sav kod je TypeScript.** Ne koristi `.jsx`/`.js` za nove fajlove. Strogi režim (`strict: true` u `tsconfig.json`). Bez `any`.
3. **Koristi funkcionalne komponente i React Hooks** (ne class komponente; jedini izuzetak je `ErrorBoundary`, jer React nema hook za to). Tipiziraj props interfejsima.
4. **Pre dodavanja nove funkcionalnosti, proveri** da li već postoji slična komponenta ili funkcija — ne dupliraj kod.
5. **Posle većih izmena, pokreni `npm run build`** (uključuje `tsc -b && vite build`) da proveriš da nema grešaka. Ako build padne, popravi pre nego što nastaviš.
6. **Kada menjaš strukturu fajlova, ažuriraj ovaj CLAUDE.md** (sekcija 3 i relevantne sekcije).
7. **Ne instaliraj nove biblioteke bez eksplicitnog odobrenja korisnika.** Ako predlažeš novu zavisnost, objasni zašto.
8. **Ne postavljaj analitiku, kolačiće, niti bilo kakvo praćenje** bez eksplicitnog zahteva.
9. **Sav tekst interfejsa ide kroz rečnike** (`src/i18n/locales/*.ts`, sekcija 7.1) — srpski (latinica) je izvor, uz prevode na engleski, hrvatski, bosanski i njemački.
10. **Commit poruke i komentari u kodu** mogu biti na srpskom ili engleskom — konzistentno unutar fajla.
11. **Koristi `siteConfig`** za ime sajta, opis, autora — ne hardkoduj stringove.
12. **Koristi `formatDate`** za prikaz datuma — ne formatuj ručno.
13. **Koristi `CategoryBadge`** za prikaz kategorije — ne piši inline stilove.
14. **Testiraj responsivnost** pre nego što završiš veći zadatak (375px, 768px, 1024px).
15. **Ne dodaj komentare koji samo ponavljaju kod** (npr. `// postavlja state`). Komentari samo za ne-očigledne odluke.
