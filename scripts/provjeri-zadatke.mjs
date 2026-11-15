// Provjera banke zadataka (pripreme/zadaci) nad svih 1.436 priprema:
//  - svaka priprema iz matematike, jezika i prirode ima zadatke baš za svoju temu (ne opšte),
//  - svaki račun je izračunat i provjeren (banka baca grešku na netačno rješenje),
//  - nema ostataka HTML-a, praznih oznaka, ćirilice usred latinice ni brojeva prevelikih za razred.
// Pokretanje: npm run provjeri:zadatke
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const koren = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'pripreme');
const kontekst = vm.createContext({ console });
const DATOTEKE = ['zadaci/osnova.js', 'zadaci/matematika.js', 'zadaci/jezik.js', 'zadaci/priroda.js', 'zadaci/ostalo.js'];
for (const f of DATOTEKE) vm.runInContext(fs.readFileSync(path.join(koren, f), 'utf8'), kontekst, { filename: f });
const jedinice = vm.runInContext(fs.readFileSync(path.join(koren, 'podaci.js'), 'utf8') + ';nastavneJedinice', kontekst);
const banka = kontekst.BankaZadataka;

const greske = [];
// Slug je adresa stranice pripreme (/pripreme/<slug>) i ključ za #priprema= — mora biti jedinstven.
const slugovi = new Map();
for (const j of jedinice) {
  if (slugovi.has(j.slug)) greske.push(`#${j.id} ${j.naziv}\n    isti slug kao #${slugovi.get(j.slug)}: ${j.slug}`);
  else slugovi.set(j.slug, j.id);
}
const koristeno = new Map();
const OPSEG = { 1: 20, 2: 100, 3: 1000 };

for (const j of jedinice) {
  const oznaka = `#${j.id} ${j.razred}. r. ${j.predmet}: ${j.naziv}`;
  let r;
  try {
    r = banka.zaJedinicu(j);
  } catch (e) {
    greske.push(`${oznaka}\n    ${e.message}`);
    continue;
  }
  if (!r) {
    greske.push(`${oznaka}\n    nema zadataka`);
    continue;
  }
  koristeno.set(r.pravilo, (koristeno.get(r.pravilo) || 0) + 1);
  if (['matematika', 'jezik', 'priroda'].includes(r.grupa) && r.pravilo.startsWith('opste')) {
    greske.push(`${oznaka}\n    nema zadataka za ovu temu (koristi se opšte pravilo ${r.pravilo})`);
  }
  const dozvoljenaCirilica = /[Ѐ-ӿ]/.test(j.naziv) || /ćirilic/i.test(j.naziv);
  for (const k of ['o', 's', 'n']) {
    const { lista } = r[k];
    if (lista.length < 2 || lista.length > 3) greske.push(`${oznaka}\n    nivo ${k}: ${lista.length} zadataka (treba 2–3)`);
    for (const z of lista) {
      const problem =
        (/\[\[|\]\]/.test(z) && 'neobrađena oznaka [[ ]]') ||
        (/&nbsp;|undefined|NaN|null/.test(z) && 'ostatak koda u tekstu') ||
        (!dozvoljenaCirilica && /[Ѐ-ӿ]/.test(z) && 'ćirilica usred latinice') ||
        (z.length > 260 && `predugačak zadatak (${z.length} znakova)`) ||
        (z.length < 12 && 'prekratak zadatak');
      if (problem) greske.push(`${oznaka}\n    ${problem}: ${z}`);
      const granica = r.grupa === 'matematika' && OPSEG[j.razred];
      if (granica) {
        const brojevi = (z.match(/\d+(?: \d{3})*/g) || []).map((b) => Number(b.replace(/ /g, '')));
        const veliki = brojevi.filter((b) => b > granica);
        if (veliki.length) greske.push(`${oznaka}\n    broj veći od ${granica} za ${j.razred}. razred (${veliki.join(', ')}): ${z}`);
      }
    }
  }
}

const nekoristena = [];
for (const [grupa, lista] of Object.entries(banka.pravila)) {
  for (const p of lista) if (p.id && !koristeno.has(p.id) && !p.id.startsWith('opste')) nekoristena.push(`${grupa}/${p.id}`);
}

console.log(`Provjereno priprema: ${jedinice.length}, pravila u upotrebi: ${koristeno.size}`);
if (nekoristena.length) console.log(`\nPravila koja ne odgovaraju nijednoj pripremi (${nekoristena.length}):\n  ${nekoristena.join('\n  ')}`);
if (greske.length) {
  console.log(`\nGreške (${greske.length}):\n  ${greske.join('\n  ')}`);
  process.exit(1);
}
console.log('\nSvi zadaci su ispravni.');
