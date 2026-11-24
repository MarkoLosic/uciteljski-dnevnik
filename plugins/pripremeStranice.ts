// Statične stranice biblioteke priprema (za pretraživače i preglede linkova).
// Biblioteka u pripreme/index.html otvara pripremu preko #priprema=<slug>, a Google sve iza # odbacuje,
// pa bez ovoga za njega postoji samo jedna stranica. Pri buildu iz istih podataka (podaci.js + banka zadataka)
// nastaju:
//   /pripreme/<razred>-razred                 — predmeti razreda
//   /pripreme/<razred>-razred/<predmet>       — sve pripreme predmeta po cjelinama (RS i FBiH)
//   /pripreme/<slug>                          — jedna priprema; dugme vodi u biblioteku (štampa, Word, e-Dnevnik)
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { siteConfig } from '../src/config/site';

export interface Priprema {
  id: number;
  slug: string;
  sistem: string[];
  razred: string;
  predmet: string;
  cjelina: string;
  naziv: string;
  tipCasa: string;
  cilj: string;
  ishodi: string;
  metodeOblici: string;
  uvodniDio: string;
  glavniDio: string;
  zavrsniDio: string;
  korelacija: string;
}

interface Nivo {
  lista: string[];
}

interface Zadaci {
  o: Nivo;
  s: Nivo;
  n: Nivo;
}

interface Banka {
  zaJedinicu(jedinica: Priprema): Zadaci | null;
}

export interface StranicaPripreme {
  path: string;
  html: string;
}

const PREDMETI: Record<string, { slug: string; kratko: string }> = {
  'Maternji jezik i književnost': { slug: 'maternji-jezik', kratko: 'Maternji jezik' },
  Matematika: { slug: 'matematika', kratko: 'Matematika' },
  'Moja okolina / Priroda i društvo': { slug: 'moja-okolina-priroda-i-drustvo', kratko: 'Moja okolina / Priroda i društvo' },
  'Likovna kultura': { slug: 'likovna-kultura', kratko: 'Likovna kultura' },
  'Muzička kultura': { slug: 'muzicka-kultura', kratko: 'Muzička kultura' },
  'Tjelesni i zdravstveni odgoj': { slug: 'tjelesni-i-zdravstveni-odgoj', kratko: 'Tjelesni i zdravstveni odgoj' },
};

const SISTEMI: Record<string, { kratko: string; puno: string; bedz: string }> = {
  RS: { kratko: 'RS', puno: 'Republika Srpska (RPZ)', bedz: 'badge-system-rs' },
  FBiH: { kratko: 'FBiH', puno: 'Federacija BiH (ZJNPP)', bedz: 'badge-system-fbih' },
};

const RAZREDI = ['1', '2', '3', '4', '5'];

const NIVOI: [keyof Zadaci, string, string][] = [
  ['o', 'level-osnovni', 'I nivo — osnovni'],
  ['s', 'level-srednji', 'II nivo — srednji'],
  ['n', 'level-napredni', 'III nivo — napredni'],
];

const BIBLIOTEKA = '/pripreme';
const razredPutanja = (r: string) => `${BIBLIOTEKA}/${r}-razred`;
const predmetPutanja = (r: string, predmet: string) => `${razredPutanja(r)}/${PREDMETI[predmet].slug}`;
const pripremaPutanja = (j: Priprema) => `${BIBLIOTEKA}/${j.slug}`;

export function ucitajPripreme(dir: string): { jedinice: Priprema[]; banka: Banka } {
  const kontekst = vm.createContext({ console });
  for (const f of ['osnova', 'matematika', 'jezik', 'priroda', 'ostalo']) {
    const fajl = path.join(dir, 'zadaci', `${f}.js`);
    vm.runInContext(fs.readFileSync(fajl, 'utf8'), kontekst, { filename: fajl });
  }
  const jedinice = vm.runInContext(
    `${fs.readFileSync(path.join(dir, 'podaci.js'), 'utf8')};nastavneJedinice`,
    kontekst,
  ) as Priprema[];
  const banka = (kontekst as { BankaZadataka?: Banka }).BankaZadataka;
  if (!banka) throw new Error('pripreme: banka zadataka (BankaZadataka) nije učitana');

  const vidjeni = new Map<string, number>();
  for (const j of jedinice) {
    const prije = vidjeni.get(j.slug);
    if (prije !== undefined) throw new Error(`pripreme: slug "${j.slug}" imaju i #${prije} i #${j.id} — mora biti jedinstven`);
    vidjeni.set(j.slug, j.id);
    if (!/^[a-z0-9-]+$/.test(j.slug)) throw new Error(`pripreme: #${j.id} ima neispravan slug "${j.slug}"`);
    if (!PREDMETI[j.predmet]) throw new Error(`pripreme: #${j.id} ima nepoznat predmet "${j.predmet}" (dodaj ga u PREDMETI)`);
    if (!SISTEMI[j.sistem[0]]) throw new Error(`pripreme: #${j.id} ima nepoznat sistem "${j.sistem[0]}"`);
    if (!RAZREDI.includes(j.razred)) throw new Error(`pripreme: #${j.id} ima nepoznat razred "${j.razred}"`);
  }
  return { jedinice, banka };
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// JSON-LD unutar <script>: `<` kao \u003c da tekst ne može zatvoriti tag.
const jsonLd = (podaci: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(podaci).replace(/</g, '\\u003c')}</script>`;

function skrati(tekst: string, max: number): string {
  const t = tekst.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const rez = t.slice(0, max - 1);
  return `${rez.slice(0, rez.lastIndexOf(' ')).replace(/[,;:.–-]+$/, '')}…`;
}

const sistemOf = (j: Priprema) => SISTEMI[j.sistem[0]];

// Zaglavlje i skripta teme se uzimaju iz pripreme/index.html, da sve stranice priprema imaju isti meni.
function izvuci(html: string, re: RegExp, opis: string): string {
  const m = re.exec(html);
  if (!m) throw new Error(`pripreme: u index.html nije nađen ${opis}`);
  return m[0];
}

interface Okvir {
  zaglavlje: string;
  temaSkripta: string;
}

function okvirIz(dir: string): Okvir {
  const index = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  return {
    zaglavlje: izvuci(index, /<header class="site-header">[\s\S]*?<\/header>/, 'header.site-header'),
    temaSkripta: izvuci(index, /<script>\s*\(function \(\) \{[\s\S]*?localStorage[\s\S]*?<\/script>/, 'inline skripta teme'),
  };
}

interface Stranica {
  putanja: string;
  naslov: string;
  opis: string;
  mrvice: [string, string][]; // [naziv, putanja]; posljednja = trenutna stranica
  sadrzaj: string;
  ld?: unknown;
}

function stranicaHtml(okvir: Okvir, s: Stranica): string {
  const url = `${siteConfig.url}${s.putanja}`;
  const punNaslov = `${s.naslov} — ${siteConfig.name}`;
  const mrvice = s.mrvice
    .map(([naziv, p], i) =>
      i === s.mrvice.length - 1
        ? `<li><span aria-current="page">${esc(naziv)}</span></li>`
        : `<li><a href="${p}">${esc(naziv)}</a></li>`,
    )
    .join('');
  const mrviceLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: s.mrvice.map(([naziv, p], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: naziv,
      item: `${siteConfig.url}${p === '/' ? '' : p}`,
    })),
  };

  return `<!doctype html>
<html lang="sr-Latn-BA" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>${esc(punNaslov)}</title>
    <meta name="description" content="${esc(s.opis)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${esc(punNaslov)}" />
    <meta property="og:description" content="${esc(s.opis)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="${esc(siteConfig.name)}" />
    <meta property="og:locale" content="sr_Latn_BA" />
    <meta property="og:image" content="${siteConfig.url}/slike/og-slika.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    ${okvir.temaSkripta}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@600;700&display=swap" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'" />
    <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet" /></noscript>
    <link rel="stylesheet" href="/pripreme/stil.css" />
    ${jsonLd(mrviceLd)}${s.ld ? `\n    ${jsonLd(s.ld)}` : ''}
  </head>
  <body>
    ${okvir.zaglavlje}

    <main class="container static-page">
      <nav class="crumbs" aria-label="Putanja"><ol>${mrvice}</ol></nav>
${s.sadrzaj}
    </main>

    <footer class="site-footer">
      <div class="container footer-inner">
        <p>© ${new Date().getFullYear()} ${esc(siteConfig.name)} — Biblioteka nastavnih priprema za osnovne škole u BiH. Autor: <a href="/o-meni">${esc(siteConfig.author.name)}</a></p>
        <p><a href="${BIBLIOTEKA}">Biblioteka priprema</a> · ${RAZREDI.map((r) => `<a href="${razredPutanja(r)}">${r}. razred</a>`).join(' · ')}</p>
      </div>
    </footer>
    <script>
      (function () {
        var d = document.getElementById('dugmeTema');
        if (!d) return;
        d.addEventListener('click', function () {
          var nova = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
          document.documentElement.dataset.theme = nova;
          try { localStorage.setItem('theme', nova); } catch (e) {}
        });
      })();
    </script>
    <script src="/pripreme/zaglavlje.js"></script>
  </body>
</html>
`;
}

const mrviceBiblioteke: [string, string][] = [
  ['Početna', '/'],
  ['Pripreme', BIBLIOTEKA],
];

function bedzevi(j: Priprema): string {
  const tip = j.tipCasa
    .toLowerCase()
    .replace(/đ/g, 'dj')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return [
    `<span class="badge badge-grade">${j.razred}. razred</span>`,
    `<span class="badge badge-subject">${esc(PREDMETI[j.predmet].kratko)}</span>`,
    `<span class="badge ${sistemOf(j).bedz}">${esc(sistemOf(j).puno)}</span>`,
    `<span class="badge badge-type-${tip}">${esc(j.tipCasa)}</span>`,
  ].join('');
}

function listaLinkova(jedinice: Priprema[], trenutna?: Priprema): string {
  return `<ul class="lesson-links">${jedinice
    .map((j) =>
      j === trenutna
        ? `<li><span aria-current="page">${esc(j.naziv)}</span> <span class="lesson-links-type">${esc(j.tipCasa)}</span></li>`
        : `<li><a href="${pripremaPutanja(j)}">${esc(j.naziv)}</a> <span class="lesson-links-type">${esc(j.tipCasa)}</span></li>`,
    )
    .join('')}</ul>`;
}

function sekcija(naslov: string, tekst: string, trajanje?: string): string {
  return `      <section class="lesson-section">
        <h2 class="lesson-section-header"><span>${esc(naslov)}</span>${trajanje ? `<span>${esc(trajanje)}</span>` : ''}</h2>
        <div class="lesson-section-content">${esc(tekst.trim())}</div>
      </section>`;
}

// Semantičko uvezivanje pripreme sa odgovarajućim A4 radnim listovima, diferenciranim testovima i lektirama.
function povezaniMaterijali(j: Priprema): [string, string][] {
  const tekst = `${j.naziv} ${j.cjelina}`.toLowerCase();
  const veze: [string, string][] = [
    [`Diferencirani test za ${j.razred}. razred (3 nivoa znanja)`, `/radni-listovi/testGrade${j.razred}`],
  ];

  if (j.predmet === 'Matematika') {
    if (/razlom|dijelov.*cjelin|polovin|četvrtin/.test(tekst)) {
      veze.push(['Radni list: Razlomci i dijelovi cjeline', '/radni-listovi/mathFractions']);
    }
    if (/množenj|tablic/.test(tekst)) {
      veze.push(['Radni list: Množenje i pravougaona mreža', '/radni-listovi/mathMultiplicationGrid']);
      veze.push(['Tablica množenja (96 zadataka)', '/radni-listovi/mathMultiply']);
      veze.push(['Diferencirani test: Množenje i dijeljenje', '/radni-listovi/testMultiplicationDivision']);
    }
    if (/dijeljenj/.test(tekst)) {
      veze.push(['Dijeljenje (96 zadataka)', '/radni-listovi/mathDivide']);
      veze.push(['Diferencirani test: Množenje i dijeljenje', '/radni-listovi/testMultiplicationDivision']);
    }
    if (/rimsk/.test(tekst)) {
      veze.push(['Radni list: Rimski brojevi (I–XX)', '/radni-listovi/mathRomanNumerals']);
    }
    if (/novac|kupovin|mark|kusur/.test(tekst)) {
      veze.push(['Radni list: Novac, kupovina i kusur', '/radni-listovi/mathMoney']);
    }
    if (/parn|neparn/.test(tekst)) {
      veze.push(['Radni list: Parni i neparni brojevi', '/radni-listovi/mathEvenOdd']);
    }
    if (/geometrij|oblic|figur|tijel|troug|kvadrat|pravougaonik|krug|kock|kvadar|valjak|lopt|linij|duž|površin|obim/.test(tekst)) {
      veze.push(['Radni list: Geometrijske figure i tijela', '/radni-listovi/mathGeometry']);
    }
    if (/sat|časovnik|vrijem|minut|kalendar|sedmic|mjesec/.test(tekst)) {
      veze.push(['Radni list: Čitanje sata i vrijeme', '/radni-listovi/timeClockRead']);
      veze.push(['Radni list: Računanje sa vremenom', '/radni-listovi/timeClockMath']);
    }
    if (/tekstualn|problemsk/.test(tekst)) {
      veze.push(['Tekstualni zadaci iz matematike', '/radni-listovi/mathWordProblems']);
    }
    if (j.razred === '1') {
      veze.push(['Sabiranje i oduzimanje do 20', '/radni-listovi/mathAddSub20']);
      veze.push(['Kućice brojeva i brojevna prava', '/radni-listovi/mathHouses']);
    } else if (j.razred === '2') {
      veze.push(['Vježbanka za 2. razred — Vježbam kod kuće (16 strana)', '/radni-listovi/homeWorkbookMath2']);
      veze.push(['Sabiranje i oduzimanje do 100', '/radni-listovi/mathAddSub100']);
    } else {
      veze.push(['Diferencirani test: Sabiranje i oduzimanje', '/radni-listovi/testMathOperations']);
    }
  } else if (j.predmet === 'Maternji jezik i književnost') {
    veze.push([`Lektire za ${j.razred}. razred osnovne škole (RS i FBiH)`, `/lektire#razred-${j.razred}`]);
    if (/ćirilic|azbuk/.test(tekst)) {
      veze.push(['Pišemo slova — ćirilica', '/radni-listovi/cyrillic']);
      veze.push(['Bojanka slova — ćirilica', '/radni-listovi/coloringCyrillic']);
      veze.push(['Most između latinice i ćirilice', '/radni-listovi/scriptBridge']);
    } else if (/latinic|abeced|slov|glas|slog/.test(tekst)) {
      veze.push(['Pišemo slova — latinica', '/radni-listovi/latin']);
      veze.push(['Slogovi i početno slovo', '/radni-listovi/syllablesLatin']);
    }
    if (/imenic|glagol|pridjev|rečenic|padež|pravopis|velik.*slov|subjek|predikat/.test(tekst)) {
      veze.push(['Diferencirani test: Jezik i gramatika (3 nivoa)', '/radni-listovi/testLanguageGrammar']);
    }
    if (/lektir|bajk|basn|prič|pjesm|tekst|čitanj/.test(tekst)) {
      veze.push(['Diferencirani test: Čitanje sa razumijevanjem', '/radni-listovi/testReadingComprehension']);
    }
    if (['3', '4', '5'].includes(j.razred)) {
      veze.push(['Kako nastaje priča — priručnik za mlade pisce', '/radni-listovi/writingHandbookLatin']);
    }
  } else if (j.predmet === 'Moja okolina / Priroda i društvo') {
    veze.push(['Diferencirani test: Priroda i društvo (3 nivoa)', '/radni-listovi/testNatureSociety']);
    if (/godišnj|proljeć|ljet|jesen|zim/.test(tekst)) {
      veze.push(['Bojanka: Četiri godišnja doba', '/radni-listovi/coloringSeasons']);
      veze.push(['Godina: mjeseci i godišnja doba', '/radni-listovi/timeYear']);
    }
    if (/saobraćaj|semafor|pješa|vozil/.test(tekst)) {
      veze.push(['Bojanka: Semafor i pješački prelaz', '/radni-listovi/coloringTraffic']);
    }
    if (/zdrav|hran|higijen|ruk/.test(tekst)) {
      veze.push(['Bojanka: Zdrava hrana', '/radni-listovi/coloringFood']);
      veze.push(['Bojanka: Perem ruke', '/radni-listovi/coloringHandWash']);
    }
    if (/ekolog|otpad|recikl|prirod|šum|vod/.test(tekst)) {
      veze.push(['Bojanka: Čuvam prirodu — razvrstaj otpad', '/radni-listovi/coloringRecycle']);
    }
  } else if (j.predmet === 'Likovna kultura') {
    veze.push(['Zbirka A4 bojanki i crteža za štampu', '/radni-listovi']);
    veze.push(['Crtanje u ogledalu — simetrija na mreži', '/radni-listovi/symmetry']);
  } else if (j.predmet === 'Muzička kultura') {
    veze.push(['Bojanka: Muzički orkestar i instrumenti', '/radni-listovi/coloringMusic']);
  } else if (j.predmet === 'Tjelesni i zdravstveni odgoj') {
    veze.push(['Bojanka: Sport i rekreacija za djecu', '/radni-listovi/coloringSports']);
  }

  const vidjene = new Set<string>();
  return veze.filter(([, href]) => (vidjene.has(href) ? false : (vidjene.add(href), true))).slice(0, 5);
}

function stranicaPripreme(j: Priprema, zadaci: Zadaci | null, cjelina: Priprema[], predmetNiz: Priprema[]): Stranica {
  const sis = sistemOf(j);
  const predmet = PREDMETI[j.predmet];
  const otvori = `${BIBLIOTEKA}#priprema=${encodeURIComponent(j.slug)}`;
  const i = predmetNiz.indexOf(j);
  const prethodna = predmetNiz[i - 1];
  const sljedeca = predmetNiz[i + 1];

  const nivoi = zadaci
    ? `      <section class="levels-section static-levels" aria-labelledby="naslovNivoa">
        <h2 id="naslovNivoa" class="levels-section-title">Zadaci za 3 nivoa postignuća</h2>
        <p class="levels-section-subtitle">Zadaci za učenike na osnovnom, srednjem i naprednom nivou. Rješenja i radni listić za štampu su u <a href="${otvori}">punoj pripremi</a>.</p>
        <div class="levels-grid">
${NIVOI.map(
  ([k, klasa, oznaka]) => `          <div class="level-card ${klasa}">
            <h3 class="level-card-head"><span>${oznaka}</span></h3>
            <div class="level-card-body"><ol class="level-task-list">${zadaci[k].lista.map((z) => `<li>${esc(z)}</li>`).join('')}</ol></div>
          </div>`,
).join('\n')}
        </div>
      </section>`
    : '';

  const povezani = povezaniMaterijali(j);
  const povezaniBlok = `      <section class="static-block">
        <h2 class="static-title">Prateći A4 radni listovi, testovi i lektira</h2>
        <ul class="lesson-links">${povezani.map(([naziv, href]) => `<li><a href="${href}">${esc(naziv)}</a></li>`).join('')}</ul>
      </section>`;

  const ostale = cjelina.length > 1
    ? `      <section class="static-block">
        <h2 class="static-title">Ostali časovi iz cjeline „${esc(j.cjelina)}“</h2>
${listaLinkova(cjelina, j)}
      </section>`
    : '';

  const sadrzaj = `      <header class="hero-card static-hero">
        <div>
          <div class="card-badges">${bedzevi(j)}</div>
          <h1 class="hero-title">${esc(j.naziv)}</h1>
          <p class="hero-desc">Dnevna priprema za čas — ${esc(j.predmet)}, ${j.razred}. razred osnovne škole, nastavni plan: ${esc(sis.puno)}.</p>
          <div class="static-actions">
            <a class="btn btn-primary" href="${otvori}">📋 Otvori pripremu: e-Dnevnik, štampa, Word</a>
            <a class="btn btn-outline" href="${predmetPutanja(j.razred, j.predmet)}">Sve pripreme: ${esc(predmet.kratko)}, ${j.razred}. razred</a>
          </div>
        </div>
      </header>

      <table class="method-table" aria-label="Metodički podaci o času">
        <tbody>
          <tr><th scope="row">Nastavni predmet</th><td>${esc(j.predmet)}</td></tr>
          <tr><th scope="row">Nastavni plan</th><td>${esc(sis.puno)}</td></tr>
          <tr><th scope="row">Nastavna tema / cjelina</th><td>${esc(j.cjelina)}</td></tr>
          <tr><th scope="row">Nastavna jedinica</th><td><strong>${esc(j.naziv)}</strong></td></tr>
          <tr><th scope="row">Tip časa</th><td>${esc(j.tipCasa)}</td></tr>
          <tr><th scope="row">Oblici i metode rada</th><td>${esc(j.metodeOblici)}</td></tr>
          <tr><th scope="row">Međupredmetna korelacija</th><td>${esc(j.korelacija)}</td></tr>
        </tbody>
      </table>

${sekcija('🎯 Cilj časa', j.cilj)}
${sekcija('✅ Očekivani ishodi učenja', j.ishodi)}
${sekcija('1. Uvodni dio časa', j.uvodniDio, '7–10 min')}
${sekcija('2. Glavni dio časa', j.glavniDio, '25–30 min')}
${sekcija('3. Završni dio časa', j.zavrsniDio, '8–10 min')}

${nivoi}

      <nav class="static-pager" aria-label="Prethodni i sljedeći čas">
        ${prethodna ? `<a href="${pripremaPutanja(prethodna)}"><span>← Prethodni čas</span>${esc(prethodna.naziv)}</a>` : '<span></span>'}
        ${sljedeca ? `<a class="next" href="${pripremaPutanja(sljedeca)}"><span>Sljedeći čas →</span>${esc(sljedeca.naziv)}</a>` : '<span></span>'}
      </nav>

${povezaniBlok}

${ostale}`;

  return {
    putanja: pripremaPutanja(j),
    naslov: `${j.naziv} — priprema za čas, ${j.razred}. razred (${sis.kratko})`,
    opis: skrati(`Priprema za čas (${j.tipCasa.toLowerCase()}), ${predmet.kratko}, ${j.razred}. razred, ${sis.kratko}. ${j.cilj}`, 160),
    mrvice: [
      ...mrviceBiblioteke,
      [`${j.razred}. razred`, razredPutanja(j.razred)],
      [predmet.kratko, predmetPutanja(j.razred, j.predmet)],
      [j.naziv, pripremaPutanja(j)],
    ],
    sadrzaj,
    ld: {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: j.naziv,
      description: j.cilj,
      url: `${siteConfig.url}${pripremaPutanja(j)}`,
      inLanguage: 'sr-Latn-BA',
      learningResourceType: 'Lesson plan',
      educationalLevel: `${j.razred}. razred osnovne škole`,
      about: j.predmet,
      teaches: j.ishodi,
      isAccessibleForFree: true,
      license: `${siteConfig.url}/autorska-prava`,
      audience: { '@type': 'EducationalAudience', educationalRole: 'teacher' },
      isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
      author: { '@type': 'Person', name: siteConfig.author.name, url: `${siteConfig.url}/o-meni` },
    },
  };
}

function stranicaPredmeta(r: string, predmet: string, jedinice: Priprema[]): Stranica {
  const p = PREDMETI[predmet];
  const poSistemu = Object.keys(SISTEMI).map((sis) => {
    const niz = jedinice.filter((j) => j.sistem[0] === sis);
    const cjeline = new Map<string, Priprema[]>();
    for (const j of niz) cjeline.set(j.cjelina, [...(cjeline.get(j.cjelina) ?? []), j]);
    return `      <section class="static-block">
        <h2 class="static-title">${esc(SISTEMI[sis].puno)} <span class="static-count">${niz.length} priprema</span></h2>
${[...cjeline]
  .map(([cjelina, lista]) => `        <h3 class="static-subtitle">${esc(cjelina)}</h3>\n${listaLinkova(lista)}`)
  .join('\n')}
      </section>`;
  });

  return {
    putanja: predmetPutanja(r, predmet),
    naslov: `${p.kratko} — pripreme za ${r}. razred (RS i FBiH)`,
    opis: skrati(
      `${jedinice.length} dnevnih priprema za čas: ${predmet}, ${r}. razred osnovne škole, po nastavnim planovima Republike Srpske i Federacije BiH. Cilj, ishodi, tok časa i zadaci za 3 nivoa.`,
      160,
    ),
    mrvice: [...mrviceBiblioteke, [`${r}. razred`, razredPutanja(r)], [p.kratko, predmetPutanja(r, predmet)]],
    sadrzaj: `      <header class="hero-card static-hero">
        <div>
          <span class="hero-eyebrow">${r}. razred · RPZ (RS) i ZJNPP (FBiH)</span>
          <h1 class="hero-title">${esc(predmet)} — pripreme za ${r}. razred</h1>
          <p class="hero-desc">Sve dnevne pripreme iz predmeta ${esc(predmet)} za ${r}. razred, poredane po nastavnim cjelinama, kako idu kroz školsku godinu. Svaku pripremu možete kopirati za e-Dnevnik, odštampati ili preuzeti u Wordu.</p>
          <div class="static-actions">
            <a class="btn btn-primary" href="${BIBLIOTEKA}?razred=${r}">Pretraži u biblioteci</a>
            <a class="btn btn-outline" href="${razredPutanja(r)}">Svi predmeti za ${r}. razred</a>
            <a class="btn btn-outline" href="/radni-listovi/testGrade${r}">Diferencirani test za ${r}. razred</a>
          </div>
        </div>
      </header>
${poSistemu.join('\n')}`,
    ld: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${p.kratko} — pripreme za ${r}. razred (RS i FBiH)`,
      url: `${siteConfig.url}${predmetPutanja(r, predmet)}`,
      inLanguage: 'sr-Latn-BA',
      isAccessibleForFree: true,
      about: predmet,
      educationalLevel: `${r}. razred osnovne škole`,
      author: { '@type': 'Person', name: siteConfig.author.name, url: `${siteConfig.url}/o-meni` },
    },
  };
}

function stranicaRazreda(r: string, jedinice: Priprema[]): Stranica {
  const predmeti = Object.keys(PREDMETI).filter((p) => jedinice.some((j) => j.predmet === p));
  const kartice = predmeti
    .map((p) => {
      const niz = jedinice.filter((j) => j.predmet === p);
      const primjeri = niz.filter((j) => j.sistem[0] === 'RS').slice(0, 3);
      return `        <a class="hub-card" href="${predmetPutanja(r, p)}">
          <span class="hub-card-title">${esc(p)}</span>
          <span class="hub-card-count">${niz.length} priprema · RS i FBiH</span>
          <span class="hub-card-examples">${primjeri.map((j) => esc(j.naziv)).join(' · ')} …</span>
        </a>`;
    })
    .join('\n');

  return {
    putanja: razredPutanja(r),
    naslov: `Pripreme za ${r}. razred osnovne škole (RS i FBiH)`,
    opis: skrati(
      `${jedinice.length} dnevnih priprema za ${r}. razred: ${predmeti.map((p) => PREDMETI[p].kratko.toLowerCase()).join(', ')}. Po nastavnim planovima Republike Srpske i Federacije BiH.`,
      160,
    ),
    mrvice: [...mrviceBiblioteke, [`${r}. razred`, razredPutanja(r)]],
    sadrzaj: `      <header class="hero-card static-hero">
        <div>
          <span class="hero-eyebrow">Razredna nastava · RPZ (RS) i ZJNPP (FBiH)</span>
          <h1 class="hero-title">Pripreme za ${r}. razred osnovne škole</h1>
          <p class="hero-desc">${jedinice.length} dnevnih priprema za cijelu školsku godinu, po nastavnim planovima Republike Srpske (RPZ) i Federacije BiH (ZJNPP). Izaberite predmet.</p>
          <div class="static-actions">
            <a class="btn btn-primary" href="${BIBLIOTEKA}?razred=${r}">Otvori biblioteku za ${r}. razred</a>
            <a class="btn btn-outline" href="/radni-listovi/testGrade${r}">Diferencirani test za ${r}. razred</a>
            <a class="btn btn-outline" href="/lektire#razred-${r}">Lektira za ${r}. razred</a>
          </div>
        </div>
      </header>
      <div class="hub-grid">
${kartice}
      </div>
      <nav class="static-block" aria-label="Drugi razredi">
        <h2 class="static-title">Drugi razredi</h2>
        <p class="hub-grades">${RAZREDI.filter((x) => x !== r).map((x) => `<a class="btn btn-outline" href="${razredPutanja(x)}">${x}. razred</a>`).join(' ')}</p>
      </nav>`,
    ld: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `Pripreme za ${r}. razred osnovne škole (RS i FBiH)`,
      url: `${siteConfig.url}${razredPutanja(r)}`,
      inLanguage: 'sr-Latn-BA',
      isAccessibleForFree: true,
      educationalLevel: `${r}. razred osnovne škole`,
      author: { '@type': 'Person', name: siteConfig.author.name, url: `${siteConfig.url}/o-meni` },
    },
  };
}

export function napraviStranicePriprema(dir: string): StranicaPripreme[] {
  const { jedinice, banka } = ucitajPripreme(dir);
  const okvir = okvirIz(dir);
  const stranice: Stranica[] = [];

  for (const r of RAZREDI) {
    const razred = jedinice.filter((j) => j.razred === r);
    if (razred.length === 0) continue;
    stranice.push(stranicaRazreda(r, razred));
    for (const predmet of Object.keys(PREDMETI)) {
      const niz = razred.filter((j) => j.predmet === predmet);
      if (niz.length === 0) continue;
      stranice.push(stranicaPredmeta(r, predmet, niz));
      for (const sis of Object.keys(SISTEMI)) {
        const predmetNiz = niz.filter((j) => j.sistem[0] === sis).sort((a, b) => a.id - b.id);
        for (const j of predmetNiz) {
          const cjelina = predmetNiz.filter((x) => x.cjelina === j.cjelina);
          stranice.push(stranicaPripreme(j, banka.zaJedinicu(j), cjelina, predmetNiz));
        }
      }
    }
  }
  return stranice.map((s) => ({ path: s.putanja, html: stranicaHtml(okvir, s) }));
}
