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
- Sajt je **višejezičan**: srpski (podrazumevani, latinica, ekavica), engleski, hrvatski, bosanski i njemački — i interfejs i članci (sekcija 7.1).
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
├── vite.config.ts             # sadrži plugin markdown-posts (vidi 6)
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
    │   └── locales/           # sr.ts (izvor tipa Dictionary), en.ts, hr.ts, bs.ts, de.ts
    ├── types/
    │   └── post.ts            # Post, PostMeta, Category
    ├── components/
    │   ├── Layout.tsx         # Header + Outlet + Footer
    │   ├── Header.tsx         # navigacija
    │   ├── Footer.tsx         # copyright, linkovi
    │   ├── PostCard.tsx       # kartica članka
    │   ├── CategoryBadge.tsx  # bedž kategorije
    │   ├── EmptyState.tsx     # prazno stanje (nema članaka)
    │   ├── ScrollToTop.tsx    # skrol na vrh pri promeni rute
    │   ├── ThemeToggle.tsx    # preklopnik tamna/svetla tema
    │   ├── LanguageSwitcher.tsx # izbor jezika (dugme sa kodom + meni sa linkovima)
    │   └── PixelIcon.tsx      # pikselske SVG ikone (9×9) sa markolosic.github.io
    ├── pages/
    │   ├── Home.tsx           # početna
    │   ├── BlogList.tsx       # lista članaka
    │   ├── BlogPost.tsx       # pojedinačni članak
    │   ├── About.tsx          # o sajtu / o autoru
    │   ├── Games.tsx          # lista igara za predškolce
    │   ├── GamePlay.tsx       # jedna igra + ekran „Bravo!“
    │   └── NotFound.tsx       # 404
    ├── games/                 # igre za predškolce (sekcija 10.5)
    │   ├── ids.ts             # GAME_IDS, veštine, boje, oblici (deli se sa rečnicima)
    │   ├── registry.ts        # GameId → komponenta, ikona, boja kartice, veštine
    │   ├── shared.tsx         # toyHex, shuffle, ShapeIcon, RoundDots, useShake, useDragDrop
    │   ├── things.ts          # sličice (lucide) za pamćenje, brojanje, veličine
    │   └── Balloons.tsx, ColorSort.tsx, ShapeMatch.tsx, Trace.tsx, ConnectDots.tsx,
    │       Maze.tsx, Memory.tsx, Pattern.tsx, Count.tsx, Sizes.tsx
    ├── lib/
    │   ├── posts.ts           # čitanje .md fajlova
    │   ├── frontmatter.ts     # validateFrontmatter (deli se sa vite.config.ts)
    │   └── formatDate.ts      # formatiranje datuma (po jeziku)
    └── content/
        └── posts/             # OVDE SE DODAJU ČLANCI, po folderu za svaki jezik
            ├── sr/ai-u-nastavi-od-1-do-5-razreda.md
            ├── en/ai-u-nastavi-od-1-do-5-razreda.md   # prevod = isti slug
            └── hr/ bs/ de/ ...
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
  url: 'https://example.ba',
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

export interface PostMeta {
  slug: string;
  locale: Locale;     // iz foldera: content/posts/<jezik>/
  title: string;
  date: string;       // ISO format: "YYYY-MM-DD"
  excerpt: string;
  category: Category;
}

export interface Post extends PostMeta {
  content: string;    // sirovi Markdown
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

`posts.ts` zatim koristi Vite `import.meta.glob` (bez `?raw`):

```typescript
const modules = import.meta.glob('../content/posts/*/*.md', {
  import: 'default',
  eager: true,
}) as Record<string, { data: unknown; content: string }>;
```

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
| `getPostBySlug` | `(locale: Locale, slug: string): Post \| null` | Jedan članak ili `null` |
| `getPostsByCategory` | `(locale: Locale, category: Category): PostMeta[]` | Filtrirano, sortirano po datumu |
| `getAllCategories` | `(locale: Locale): Category[]` | Sve kategorije koje imaju bar jedan članak |
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
| `*` | `<NotFound />` | 404 stranica |

Sve rute su umotane u `<Layout />` koji koristi `<Outlet />`.

### 7.1. Jezici

- `App.tsx` pravi isti skup ruta za svaki jezik iz `LOCALES`, umotan u `<LocaleProvider locale>`. Srpski nema prefiks (`/`, `/blog`, `/o-meni`); ostali imaju (`/en`, `/en/blog`, `/en/about`, `/hr/o-meni`, `/bs/o-meni`, `/de/ueber-mich`). Slug stranice „O meni“ je u `localeInfo[locale].aboutSlug`, a stranice igara u `localeInfo[locale].gamesSlug` (`igre`, en `games`, de `spiele`; `gameId` je isti na svim jezicima).
- **Linkove nikad ne hardkoduj** (`'/blog'`) — koristi `paths` iz `useLocale()`: `paths.home`, `paths.blog`, `paths.post(slug)`, `paths.about`, `paths.games`, `paths.game(id)`.
- **Tekst interfejsa nikad ne hardkoduj** — koristi `t` iz `useLocale()`. Novi string dodaj u `locales/sr.ts`, a TypeScript će tražiti isti ključ u ostala četiri rečnika.
- `LocaleProvider` postavlja `<html lang>` na BCP 47 tag jezika.
- `LanguageSwitcher` vodi na istu stranicu na drugom jeziku (`switchLocalePath`); ako članak nema prevod, vodi na listu članaka tog jezika.
- Varijante: srpski = ekavica; hrvatski = ijekavica i hrvatska leksika (tjedan, točno, učitelj); bosanski = ijekavica i bosanska leksika (sedmica, tačno, historija); njemački = „Sie“ forma.
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

Klasa `.prose` je **sopstvena** (u `index.css`, prati `blog.css` sa originala) — `@tailwindcss/typography` se više ne koristi (paket je ostao u `devDependencies` i može se ukloniti). U `BlogPost.tsx`: `<article className="prose">`. Pokriva naslove, liste (marker u akcentu), citate, kod, slike, tabele, liste zadataka.

### 8.7. Fokus stanja (a11y)

Globalno `:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }`; utility `focus-ring` daje isto na elementima koji to eksplicitno traže.

---

## 9. Komponente — detaljne specifikacije

### 9.1. `Layout.tsx`

- Struktura: `<Header />` + `<main><Outlet /></main>` + `<Footer />`.
- `<main>` ima `min-h-screen` da footer bude na dnu.
- Sadrži `<ScrollToTop />`.

### 9.2. `Header.tsx`

- Plutajuća pilula: `fixed top-3.5`, centrirana, `rounded-full`, poluprozirna `bg-surface/70` + `backdrop-blur`; posle skrola dobija jaču granicu i senku.
- Levo: znak (zeleni kvadrat sa pikselskom kvačicom) + `siteConfig.name` (ime skriveno na < 640px, ostaje za čitače ekrana).
- Desno: Početna, Blog, Igre, O meni (`NavLink`; „Početna“ je skrivena na < 640px jer logo vodi na početnu; aktivni = `bg-surface-2 text-ink` sa unutrašnjom granicom) + `<LanguageSwitcher />` + `<ThemeToggle />`.

### 9.3. `Footer.tsx`

- Copyright: `© {new Date().getFullYear()} {siteConfig.name}. Sva prava zadržana.`
- Linkovi: O meni, Kontakt (mailto), Politika privatnosti (ako postoji).
- Autor: `Autor: {siteConfig.author.name}`.

### 9.4. `PostCard.tsx`

Props:

```typescript
interface PostCardProps {
  post: PostMeta;
}
```

Struktura:
- `<Link to={`/blog/${post.slug}`}>` kao wrapper.
- Kategorija (bedž) — `<CategoryBadge category={post.category} />`.
- Naslov: `<h3 className="text-xl font-bold">{post.title}</h3>`.
- Datum: `<time dateTime={post.date}>{formatDate(post.date)}</time>`.
- Excerpt: `<p className="text-gray-600">{post.excerpt}</p>`.
- „Pročitaj više →" link/tekst.

Stil: `bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6`.

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
- Hero: „Zdravo, ja sam {author.name}" (h1), ispod `author.role`, pa `author.intro`, dugmad „Pročitaj blog" → `/blog` i „Više o meni" → `/o-meni`, krug sa inicijalima (mesto za fotografiju).
- „Ko sam ja": kartice iz `author.background` (IT iskustvo, profesor razredne nastave).
- „O čemu pišem": `siteConfig.topics`.
- „Najnovije sa bloga": 3 najnovija članka preko `getRecentPosts(3)` i `<PostCard />`.
- Ako nema članaka: `<EmptyState />`.
- Link „Svi članci →" → `/blog`.

### 10.2. `BlogList.tsx`

- Naslov: „Blog" ili „Svi članci".
- Lista svih članaka preko `getAllPosts()`.
- Svaki članak u `<PostCard />`.
- Ako nema članaka: `<EmptyState />`.
- (Opciono, kasnije) Filter po kategoriji — dugmad ili dropdown.

### 10.3. `BlogPost.tsx`

- Uzmi `slug` iz `useParams()`.
- `getPostBySlug(slug)` — ako `null`, prikaži poruku „Članak nije pronađen" + link na `/blog`.
- Header članka: naslov (`text-3xl`/`text-4xl`), datum, kategorija (bedž).
- Sadržaj: `<ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>` unutar `<article className="prose prose-lg max-w-none">`.
- Link „← Nazad na blog" na dnu.
- (Opciono) „Sledeći / prethodni članak" — kasnije.

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

- `index.html`: `<title>`, `<meta name="description">`, `<meta name="viewport">`, Open Graph tagovi (`og:title`, `og:description`, `og:type`, `og:url`).
- Kasnije (roadmap): `react-helmet-async` za dinamičke meta tagove po stranici (naslov članka, opis, datum).
- Semantički HTML (sekcija 11) pomaže SEO.
- Sitemap i `robots.txt`: kasnije, preko Vite plugina ili ručno.
- Kanonski URL-ovi: kasnije, ako bude potrebe.

---

## 13. Rukovanje greškama

- **Neispravan frontmatter:** `posts.ts` baca `Error` sa imenom fajla i razlogom (sekcija 6.3). Ovo se vidi pri buildu — bolje nego da sajt prikaže polomljen članak.
- **Nepostojeći slug:** `BlogPost` prikazuje poruku „Članak nije pronađen" + link na `/blog`.
- **Prazan folder članaka:** `EmptyState` na `Home` i `BlogList`.
- **Greške pri buildu:** Claude Code pokreće `npm run build` posle većih izmena i popravlja pre nego što nastavi.
- **Runtime greške:** za sada bez Error Boundary; dodati kasnije ako bude potrebe.

---

## 14. Pravila za Claude Code

1. **Ne diraj fajlove u `src/content/posts/` bez eksplicitnog zahteva korisnika.** Ti fajlovi su sadržaj. Jedini izuzetak je formatiranje novih članaka na zahtev korisnika (sekcija 15) — tada kreiraš ili menjaš `.md` fajl, ali uvek prema korisnikovom tekstu.
2. **Sav kod je TypeScript.** Ne koristi `.jsx`/`.js` za nove fajlove. Strogi režim (`strict: true` u `tsconfig.json`). Bez `any`.
3. **Koristi funkcionalne komponente i React Hooks** (ne class komponente). Tipiziraj props interfejsima.
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
