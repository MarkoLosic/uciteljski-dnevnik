// Generiše 1200×630 JPG sličice (`public/slike/og-listovi/<id>.jpg`) za sve radne listove
// koji još nemaju sopstvenu JPG/PNG sličicu u `WORKSHEET_THUMBNAILS` (SVG bojanke, testovi,
// matematika, pisanje, vrijeme, grafomotorika, logika i vježbanke), kako bi svaki radni list
// imao bogatu Viber/WhatsApp/Facebook karticu (`og:image`) i ulaz u Google Images pretragu.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function loadTsModule(relPath, mocks = {}) {
  const fullPath = path.join(root, relPath);
  const source = fs.readFileSync(fullPath, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const exportsObj = {};
  const moduleObj = { exports: exportsObj };
  const sandbox = {
    exports: exportsObj,
    module: moduleObj,
    require: (spec) => {
      if (spec in mocks) return mocks[spec];
      throw new Error(`Neočekivan import "${spec}" u ${relPath}`);
    },
    console,
  };
  vm.runInNewContext(outputText, sandbox, { filename: fullPath });
  return moduleObj.exports;
}

const idsMod = loadTsModule('src/games/ids.ts');
const thumbsMod = loadTsModule('src/games/thumbnails.ts');
const aboutMod = loadTsModule('src/i18n/worksheetAbout/sr.ts');
const srMod = loadTsModule('src/i18n/locales/sr.ts', {
  '../worksheetAbout/sr': aboutMod,
});

const { WORKSHEET_IDS, WORKSHEET_GROUPS } = idsMod;
const { WORKSHEET_THUMBNAILS } = thumbsMod;
const { worksheetAboutSr } = aboutMod;
const sheets = srMod.sr.games.worksheet.sheets;

const GROUP_META = {
  books: { label: 'PRIRUČNIK I VJEŽBANKA · A4', accent: '#8b9bff', soft: '#1e2442' },
  tests: { label: 'DIFERENCIRANI TEST · 3 NIVOA', accent: '#34d399', soft: '#0f2d25' },
  coloring: { label: 'BOJANKA ZA ŠTAMPU · A4', accent: '#f59e0b', soft: '#33240d' },
  time: { label: 'VRIJEME I SAT · A4 LIST', accent: '#38bdf8', soft: '#0f293a' },
  writing: { label: 'ČITANJE I PISANJE · A4 LIST', accent: '#a78bfa', soft: '#261d42' },
  motor: { label: 'GRAFOMOTORIKA · A4 LIST', accent: '#fb7185', soft: '#381622' },
  math: { label: 'MATEMATIKA · A4 RADNI LIST', accent: '#34d399', soft: '#0f2d25' },
  logic: { label: 'LOGIKA I PAŽNJA · A4 LIST', accent: '#facc15', soft: '#332b0e' },
};

function groupOf(id) {
  for (const [group, list] of Object.entries(WORKSHEET_GROUPS)) {
    if (list.includes(id)) return group;
  }
  return 'math';
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapLines(text, maxChars, maxLines) {
  const words = String(text).replace(/\s+/g, ' ').trim().split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length <= maxChars) {
      cur = next;
    } else {
      if (cur) lines.push(cur);
      cur = w;
      if (lines.length === maxLines - 1) break;
    }
  }
  const consumed = lines.join(' ').split(' ').filter(Boolean).length;
  const remaining = words.slice(consumed).join(' ');
  if (remaining) {
    lines.push(remaining.length > maxChars ? `${remaining.slice(0, maxChars - 1).replace(/[.,;:\s]+$/, '')}…` : remaining);
  }
  return lines.slice(0, maxLines);
}

function extractInnerSvg(svgFile) {
  const raw = fs.readFileSync(svgFile, 'utf8');
  const viewBoxMatch = /viewBox="([^"]+)"/.exec(raw);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 800 800';
  const inner = raw
    .replace(/^[\s\S]*?<svg[^>]*>/i, '')
    .replace(/<\/svg>\s*$/i, '');
  return { viewBox, inner };
}

function sheetPreviewGraphic(id, group, svgThumbPath) {
  if (svgThumbPath && fs.existsSync(svgThumbPath)) {
    const { viewBox, inner } = extractInnerSvg(svgThumbPath);
    return `
      <rect x="28" y="96" width="344" height="364" rx="12" fill="#ffffff" stroke="#111827" stroke-width="2.5" />
      <svg x="38" y="106" width="324" height="344" viewBox="${viewBox}">
        ${inner}
      </svg>
    `;
  }

  if (group === 'tests') {
    return `
      <g transform="translate(28, 98)">
        <rect x="0" y="0" width="344" height="44" rx="8" fill="#f9fafb" stroke="#111827" stroke-width="2" />
        <text x="14" y="20" font-family="Helvetica Neue, Arial, sans-serif" font-size="11" font-weight="700" fill="#047857">DIFERENCIRANA PROVJERA ZNANJA</text>
        <text x="14" y="36" font-family="Helvetica Neue, Arial, sans-serif" font-size="11" fill="#374151">Bodovi: ____ / 30   ·   3 nivoa postignuća</text>

        <rect x="0" y="56" width="344" height="88" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="2" />
        <circle cx="16" cy="74" r="5" fill="#059669" />
        <text x="28" y="78" font-family="Helvetica Neue, Arial, sans-serif" font-size="12" font-weight="700" fill="#065f46">NIVO I — OSNOVNI (10 bodova)</text>
        <line x1="14" y1="102" x2="210" y2="102" stroke="#6ee7b7" stroke-width="5" stroke-linecap="round" />
        <line x1="14" y1="122" x2="290" y2="122" stroke="#a7f3d0" stroke-width="5" stroke-linecap="round" />

        <rect x="0" y="156" width="344" height="88" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
        <circle cx="16" cy="174" r="5" fill="#2563eb" />
        <text x="28" y="178" font-family="Helvetica Neue, Arial, sans-serif" font-size="12" font-weight="700" fill="#1e40af">NIVO II — SREDNJI (10 bodova)</text>
        <line x1="14" y1="202" x2="240" y2="202" stroke="#93c5fd" stroke-width="5" stroke-linecap="round" />
        <line x1="14" y1="222" x2="310" y2="222" stroke="#bfdbfe" stroke-width="5" stroke-linecap="round" />

        <rect x="0" y="256" width="344" height="92" rx="8" fill="#faf5ff" stroke="#7c3aed" stroke-width="2" />
        <circle cx="16" cy="274" r="5" fill="#7c3aed" />
        <text x="28" y="278" font-family="Helvetica Neue, Arial, sans-serif" font-size="12" font-weight="700" fill="#5b21b6">NIVO III — NAPREDNI (10 bodova)</text>
        <line x1="14" y1="302" x2="270" y2="302" stroke="#c4b5fd" stroke-width="5" stroke-linecap="round" />
        <line x1="14" y1="324" x2="220" y2="324" stroke="#ddd6fe" stroke-width="5" stroke-linecap="round" />
      </g>
    `;
  }

  if (group === 'time') {
    return `
      <g transform="translate(28, 102)">
        <rect x="0" y="0" width="344" height="352" rx="12" fill="#f9fafb" stroke="#111827" stroke-width="2" />
        <circle cx="172" cy="135" r="88" fill="#ffffff" stroke="#111827" stroke-width="4" />
        <text x="172" y="68" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="18" font-weight="700" fill="#111827">12</text>
        <text x="242" y="141" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="18" font-weight="700" fill="#111827">3</text>
        <text x="172" y="212" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="18" font-weight="700" fill="#111827">6</text>
        <text x="102" y="141" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="18" font-weight="700" fill="#111827">9</text>
        <line x1="172" y1="135" x2="172" y2="76" stroke="#111827" stroke-width="4" stroke-linecap="round" />
        <line x1="172" y1="135" x2="218" y2="135" stroke="#047857" stroke-width="5" stroke-linecap="round" />
        <circle cx="172" cy="135" r="6" fill="#111827" />
        <rect x="102" y="256" width="140" height="52" rx="10" fill="#ffffff" stroke="#111827" stroke-width="2.5" stroke-dasharray="6 5" />
        <text x="172" y="290" text-anchor="middle" font-family="Courier, monospace" font-size="26" font-weight="700" fill="#111827">03 : 00</text>
      </g>
    `;
  }

  if (group === 'writing') {
    const isCyr = id.toLowerCase().includes('cyrillic');
    const sample = isCyr ? ['А а', 'Б б', 'В в'] : ['A a', 'B b', 'C c'];
    return `
      <g transform="translate(28, 102)">
        ${sample
          .map(
            (letters, idx) => `
          <g transform="translate(0, ${idx * 116})">
            <rect x="0" y="0" width="344" height="96" rx="10" fill="#ffffff" stroke="#d1d5db" stroke-width="1.8" />
            <line x1="12" y1="24" x2="332" y2="24" stroke="#9ca3af" stroke-width="1.5" />
            <line x1="12" y1="48" x2="332" y2="48" stroke="#9ca3af" stroke-width="1.5" stroke-dasharray="5 5" />
            <line x1="12" y1="74" x2="332" y2="74" stroke="#111827" stroke-width="2" />
            <text x="24" y="68" font-family="Helvetica Neue, Arial, sans-serif" font-size="40" font-weight="700" fill="#111827">${letters}</text>
            <text x="132" y="68" font-family="Helvetica Neue, Arial, sans-serif" font-size="40" font-weight="700" fill="#d1d5db">${letters}</text>
            <text x="236" y="68" font-family="Helvetica Neue, Arial, sans-serif" font-size="40" font-weight="700" fill="#e5e7eb">${letters}</text>
          </g>
        `,
          )
          .join('')}
      </g>
    `;
  }

  if (group === 'motor') {
    return `
      <g transform="translate(28, 102)">
        <rect x="0" y="0" width="344" height="352" rx="12" fill="#ffffff" stroke="#111827" stroke-width="2" />
        <path d="M 34 88 C 95 20, 145 156, 206 88 C 250 40, 285 130, 312 88" fill="none" stroke="#e5e7eb" stroke-width="22" stroke-linecap="round" />
        <path d="M 34 88 C 95 20, 145 156, 206 88 C 250 40, 285 130, 312 88" fill="none" stroke="#111827" stroke-width="3" stroke-dasharray="8 8" stroke-linecap="round" />
        <path d="M 34 210 L 90 160 L 146 210 L 202 160 L 258 210 L 312 160" fill="none" stroke="#e5e7eb" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 34 210 L 90 160 L 146 210 L 202 160 L 258 210 L 312 160" fill="none" stroke="#111827" stroke-width="3" stroke-dasharray="8 8" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="96" cy="296" r="34" fill="none" stroke="#111827" stroke-width="2.5" stroke-dasharray="6 6" />
        <rect x="156" y="262" width="68" height="68" rx="8" fill="none" stroke="#111827" stroke-width="2.5" stroke-dasharray="6 6" />
        <polygon points="282,260 318,328 246,328" fill="none" stroke="#111827" stroke-width="2.5" stroke-dasharray="6 6" />
      </g>
    `;
  }

  if (group === 'books') {
    return `
      <g transform="translate(28, 98)">
        <rect x="14" y="14" width="330" height="340" rx="12" fill="#e5e7eb" stroke="#111827" stroke-width="2" />
        <rect x="7" y="7" width="330" height="340" rx="12" fill="#f3f4f6" stroke="#111827" stroke-width="2" />
        <rect x="0" y="0" width="330" height="340" rx="12" fill="#ffffff" stroke="#111827" stroke-width="2.5" />
        <rect x="24" y="28" width="282" height="54" rx="8" fill="#ecfdf5" stroke="#047857" stroke-width="2" />
        <text x="165" y="61" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="16" font-weight="700" fill="#047857">VIŠESTRANO IZDANJE · A4</text>
        <line x1="34" y1="118" x2="296" y2="118" stroke="#111827" stroke-width="2.5" />
        <line x1="34" y1="154" x2="260" y2="154" stroke="#9ca3af" stroke-width="4" stroke-linecap="round" />
        <line x1="34" y1="184" x2="290" y2="184" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" />
        <rect x="34" y="216" width="122" height="92" rx="10" fill="#f9fafb" stroke="#111827" stroke-width="2" />
        <rect x="174" y="216" width="122" height="92" rx="10" fill="#f9fafb" stroke="#111827" stroke-width="2" />
      </g>
    `;
  }

  if (group === 'logic') {
    return `
      <g transform="translate(28, 102)">
        <rect x="0" y="0" width="344" height="352" rx="12" fill="#ffffff" stroke="#111827" stroke-width="2" />
        <circle cx="58" cy="76" r="24" fill="#111827" />
        <rect x="108" y="52" width="48" height="48" rx="6" fill="none" stroke="#111827" stroke-width="3" />
        <circle cx="206" cy="76" r="24" fill="#111827" />
        <rect x="260" y="48" width="56" height="56" rx="10" fill="none" stroke="#047857" stroke-width="3" stroke-dasharray="6 5" />
        <text x="288" y="85" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" font-weight="700" fill="#047857">?</text>
        <line x1="24" y1="146" x2="320" y2="146" stroke="#e5e7eb" stroke-width="2" />
        <g transform="translate(46, 178)">
          <rect x="0" y="0" width="116" height="136" rx="8" fill="#f9fafb" stroke="#111827" stroke-width="2" />
          <line x1="116" y1="-8" x2="116" y2="144" stroke="#047857" stroke-width="3" stroke-dasharray="6 5" />
          <rect x="116" y="0" width="116" height="136" rx="8" fill="#ffffff" stroke="#111827" stroke-width="2" />
          <polygon points="116,24 64,70 86,70 86,114 116,114" fill="#d1fae5" stroke="#111827" stroke-width="2.5" />
          <polygon points="116,24 168,70 146,70 146,114 116,114" fill="none" stroke="#9ca3af" stroke-width="2" stroke-dasharray="5 5" />
        </g>
      </g>
    `;
  }

  // Math default
  return `
    <g transform="translate(28, 102)">
      <rect x="0" y="0" width="344" height="352" rx="12" fill="#ffffff" stroke="#111827" stroke-width="2" />
      <g transform="translate(24, 24)">
        <circle cx="46" cy="46" r="40" fill="#ffffff" stroke="#111827" stroke-width="3" />
        <path d="M 46 46 L 46 6 A 40 40 0 0 1 86 46 Z" fill="#93c5fd" stroke="#111827" stroke-width="3" />
        <line x1="6" y1="46" x2="86" y2="46" stroke="#111827" stroke-width="2.5" />
        <line x1="46" y1="6" x2="46" y2="86" stroke="#111827" stroke-width="2.5" />
        <text x="128" y="42" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="#111827">14 + 28 = ___</text>
        <text x="128" y="80" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="#111827">7 × 8 = ___</text>
      </g>
      <line x1="20" y1="138" x2="324" y2="138" stroke="#e5e7eb" stroke-width="2" />
      <g transform="translate(68, 162)">
        <rect x="68" y="0" width="72" height="44" rx="8" fill="#ecfdf5" stroke="#047857" stroke-width="2.5" />
        <text x="104" y="29" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" font-weight="700" fill="#065f46">20</text>
        <rect x="24" y="54" width="72" height="44" rx="8" fill="#ffffff" stroke="#111827" stroke-width="2" />
        <text x="60" y="83" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" font-weight="700" fill="#111827">12</text>
        <rect x="112" y="54" width="72" height="44" rx="8" fill="#ffffff" stroke="#111827" stroke-width="2" stroke-dasharray="6 4" />
        <text x="148" y="83" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" font-weight="700" fill="#047857">?</text>
      </g>
      <rect x="24" y="286" width="296" height="44" rx="8" fill="#f9fafb" stroke="#111827" stroke-width="1.8" />
      <text x="172" y="314" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="16" font-weight="700" fill="#111827">2,  4,  6,  [ __ ],  10,  [ __ ]</text>
    </g>
  `;
}

function buildOgCardSvg(id) {
  const group = groupOf(id);
  const gm = GROUP_META[group] ?? GROUP_META.math;
  const info = sheets[id];
  const about = worksheetAboutSr[id];
  const rawTitle = info?.title ?? id;
  const rawDesc = about?.text ?? info?.text ?? '';
  const age = about?.age;

  const titleLines = wrapLines(rawTitle, 26, 3);
  const descLines = wrapLines(rawDesc, 46, 4);

  const thumb = WORKSHEET_THUMBNAILS[id];
  const svgThumbPath = thumb && thumb.endsWith('.svg') ? path.join(root, 'public', thumb) : null;
  const sheetTitle = wrapLines(rawTitle.replace(/^(Bojanka|Matematika|Diferencirani test):\s*/i, ''), 26, 1)[0];

  const titleStartY = titleLines.length === 1 ? 235 : titleLines.length === 2 ? 210 : 190;
  const descStartY = titleStartY + titleLines.length * 52 + 22;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#07090d" />
      <stop offset="100%" stop-color="#101726" />
    </linearGradient>
    <radialGradient id="glow" cx="0.8" cy="0.2" r="0.65">
      <stop offset="0%" stop-color="${gm.accent}" stop-opacity="0.22" />
      <stop offset="100%" stop-color="${gm.accent}" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#glow)" />

  <!-- Diskretna mreža u pozadini -->
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    <line x1="0" y1="126" x2="1200" y2="126" />
    <line x1="0" y1="252" x2="1200" y2="252" />
    <line x1="0" y1="378" x2="1200" y2="378" />
    <line x1="0" y1="504" x2="1200" y2="504" />
    <line x1="240" y1="0" x2="240" y2="630" />
    <line x1="480" y1="0" x2="480" y2="630" />
    <line x1="720" y1="0" x2="720" y2="630" />
    <line x1="960" y1="0" x2="960" y2="630" />
  </g>

  <!-- Lijeva strana: bedž, naslov, opis i brend -->
  <rect x="64" y="68" width="${gm.label.length * 9.5 + 36}" height="38" rx="19" fill="${gm.soft}" stroke="${gm.accent}" stroke-width="1.5" />
  <text x="82" y="92" font-family="Helvetica Neue, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="0.8" fill="${gm.accent}">${esc(gm.label)}</text>

  ${
    age
      ? `<g transform="translate(${64 + gm.label.length * 9.5 + 50}, 68)">
          <rect x="0" y="0" width="${age.length * 9.5 + 32}" height="38" rx="19" fill="#131a25" stroke="#2c374b" stroke-width="1.5" />
          <text x="16" y="24" font-family="Helvetica Neue, Arial, sans-serif" font-size="14" font-weight="600" fill="#d3dce8">${esc(age)}</text>
        </g>`
      : ''
  }

  ${titleLines
    .map(
      (line, idx) =>
        `<text x="64" y="${titleStartY + idx * 52}" font-family="Helvetica Neue, Arial, sans-serif" font-size="42" font-weight="800" fill="#f3f6fc">${esc(line)}</text>`,
    )
    .join('\n  ')}

  ${descLines
    .map(
      (line, idx) =>
        `<text x="64" y="${descStartY + idx * 31}" font-family="Helvetica Neue, Arial, sans-serif" font-size="21" fill="#9aa5b8">${esc(line)}</text>`,
    )
    .join('\n  ')}

  <!-- Brend traka dole lijevo -->
  <g transform="translate(64, 530)">
    <rect x="0" y="0" width="42" height="42" rx="11" fill="#047857" />
    <rect x="11" y="9" width="16" height="24" rx="2" fill="none" stroke="#ffffff" stroke-width="2.4" />
    <line x1="8" y1="14" x2="13" y2="14" stroke="#ffffff" stroke-width="2.2" />
    <line x1="8" y1="21" x2="13" y2="21" stroke="#ffffff" stroke-width="2.2" />
    <line x1="8" y1="28" x2="13" y2="28" stroke="#ffffff" stroke-width="2.2" />
    <text x="56" y="19" font-family="Helvetica Neue, Arial, sans-serif" font-size="19" font-weight="700" fill="#f3f6fc">učiteljskidnevnik.online</text>
    <text x="56" y="38" font-family="Helvetica Neue, Arial, sans-serif" font-size="14" fill="#8f99ab">Besplatan radni list za A4 štampu · Marko Lošić</text>
  </g>

  <!-- Desna strana: A4 list papira -->
  <g transform="translate(724, 48)">
    <rect x="8" y="10" width="400" height="534" rx="14" fill="#000000" fill-opacity="0.38" />
    <rect x="0" y="0" width="400" height="534" rx="14" fill="#ffffff" stroke="#d1d5db" stroke-width="2" />

    <!-- Zaglavlje A4 lista -->
    <text x="28" y="32" font-family="Courier, monospace" font-size="10" font-weight="700" fill="#6b7280">UČITELJSKIDNEVNIK.ONLINE · RADNI LIST</text>
    <text x="28" y="54" font-family="Helvetica Neue, Arial, sans-serif" font-size="17" font-weight="800" fill="#111827">${esc(sheetTitle)}</text>
    <line x1="28" y1="76" x2="230" y2="76" stroke="#111827" stroke-width="1.5" />
    <line x1="248" y1="76" x2="372" y2="76" stroke="#111827" stroke-width="1.5" />
    <text x="28" y="71" font-family="Helvetica Neue, Arial, sans-serif" font-size="10" font-weight="600" fill="#4b5563">Ime:</text>
    <text x="248" y="71" font-family="Helvetica Neue, Arial, sans-serif" font-size="10" font-weight="600" fill="#4b5563">Datum:</text>

    ${sheetPreviewGraphic(id, group, svgThumbPath)}

    <!-- Podnožje A4 lista -->
    <text x="28" y="508" font-family="Helvetica Neue, Arial, sans-serif" font-size="10" fill="#6b7280">© Marko Lošić · www.učiteljskidnevnik.online</text>
    <text x="372" y="508" text-anchor="end" font-family="Helvetica Neue, Arial, sans-serif" font-size="10" font-weight="600" fill="#047857">A4 ŠTAMPA</text>
  </g>
</svg>`;
}

const outDir = path.join(root, 'public/slike/og-listovi');
const tmpDir = '/tmp/uciteljski-og-svg';
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(tmpDir, { recursive: true });

const pairs = [];
const ogMap = {};

for (const id of WORKSHEET_IDS) {
  const existing = WORKSHEET_THUMBNAILS[id];
  if (existing && (existing.endsWith('.jpg') || existing.endsWith('.png'))) {
    ogMap[id] = existing;
    continue;
  }
  const svgPath = path.join(tmpDir, `${id}.svg`);
  const jpgRel = `/slike/og-listovi/${id}.jpg`;
  const jpgPath = path.join(root, 'public', jpgRel);
  fs.writeFileSync(svgPath, buildOgCardSvg(id), 'utf8');
  pairs.push([svgPath, jpgPath]);
  ogMap[id] = jpgRel;
}

if (pairs.length > 0) {
  const pairsFile = path.join(tmpDir, 'pairs.json');
  fs.writeFileSync(pairsFile, JSON.stringify(pairs), 'utf8');
  const jxa = `
ObjC.import("Cocoa");
ObjC.import("Foundation");
var jsonStr = $.NSString.stringWithContentsOfFileEncodingError("${pairsFile}", $.NSUTF8StringEncoding, null).js;
var pairs = JSON.parse(jsonStr);
var props = $.NSDictionary.dictionaryWithObjectForKey($(0.84), $.NSImageCompressionFactor);
for (var i = 0; i < pairs.length; i++) {
  var svgUrl = $.NSURL.fileURLWithPath(pairs[i][0]);
  var srcImg = $.NSImage.alloc.initWithContentsOfURL(svgUrl);
  if (!srcImg || srcImg.isNil()) throw new Error("Ne mogu učitati SVG: " + pairs[i][0]);
  srcImg.setSize($.NSMakeSize(1200, 630));
  var tiff = srcImg.TIFFRepresentation;
  var rep = $.NSBitmapImageRep.imageRepWithData(tiff);
  rep.setSize($.NSMakeSize(1200, 630));
  var data = rep.representationUsingTypeProperties($.NSBitmapImageFileTypeJPEG, props);
  data.writeToFileAtomically(pairs[i][1], true);
}
console.log("Izrenderovano JPG kartica:", pairs.length);
`;
  execFileSync('osascript', ['-l', 'JavaScript', '-e', jxa], { stdio: 'inherit' });
}

console.log(`Ukupno pokrivenih radnih listova u OG mapi: ${Object.keys(ogMap).length}`);
