/**
 * Banka zadataka za diferenciranu pripremu (3 nivoa) — osnova.
 *
 * Svaka tema časa ima svoje zadatke (pravila po predmetu u matematika.js, jezik.js, priroda.js, ostalo.js).
 * Zadaci su pisani za učenika: kratka naredba, jedna radnja, konkretni brojevi i riječi.
 *
 * Oznake u tekstu zadatka (računa ih banka, pa rješenja ne mogu biti pogrešna):
 *   [[34 + 5]]                 → „34 + 5 = ___“, rješenje 39
 *   [[14 + 3 ? 20 - 2]]        → „14 + 3 ___ 20 - 2“, rješenje znak <, > ili =
 *   [[x + 24 = 60 | 36]]       → jednačina; banka provjeri da je 36 tačno rješenje
 *   [[6 + ___ = 10 | 4]]       → dopuna; isto se provjerava
 *   [[ost 17 : 5]]             → „17 : 5 = ___ i ostatak ___“
 *   [[dio 1/4 od 20]]          → „1/4 od 20 = ___“
 *   [[= 4 + 5]]                → ne prikazuje se; računa rješenje tekstualnog zadatka
 *   [[! tekst]]                → ne prikazuje se; rješenje za učitelja koje se ne računa
 */
(function (koren) {
  'use strict';

  function uJs(izraz) {
    const js = String(izraz)
      .replace(/(\d) (?=\d{3}(?!\d))/g, '$1')
      .replace(/[·×]/g, '*')
      .replace(/:/g, '/')
      .replace(/−/g, '-')
      .replace(/(\d),(\d)/g, '$1.$2')
      .replace(/\s+/g, '');
    if (!/^[\d+\-*/().]+$/.test(js)) throw new Error('Neispravan izraz: ' + izraz);
    return js;
  }

  function izracunaj(izraz) {
    const v = Function('"use strict"; return (' + uJs(izraz) + ');')();
    if (typeof v !== 'number' || !isFinite(v)) throw new Error('Izraz nema rezultat: ' + izraz);
    return Math.round(v * 1e6) / 1e6;
  }

  // 24 000 i 3,75 — razmak za hiljade (od pet cifara) i zapeta za decimale, kao u udžbenicima.
  function formatBroj(v) {
    const dijelovi = Math.abs(v).toString().split('.');
    let cijeli = dijelovi[0];
    if (cijeli.length > 4) cijeli = cijeli.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return (v < 0 ? '-' : '') + cijeli + (dijelovi[1] ? ',' + dijelovi[1] : '');
  }

  function obradi(tekst, rjesenja) {
    const izlaz = tekst.replace(/\[\[(.+?)\]\]/g, function (_, unutra) {
      const s = unutra.trim();
      if (s[0] === '!') {
        rjesenja.push(s.slice(1).trim());
        return '\u0000';
      }
      if (s[0] === '=') {
        const izraz = s.slice(1).trim();
        rjesenja.push(izraz + ' = ' + formatBroj(izracunaj(izraz)));
        return '\u0000';
      }
      let m = /^ost (.+?) : (.+)$/.exec(s);
      if (m) {
        const djeljenik = izracunaj(m[1]);
        const djelilac = izracunaj(m[2]);
        const kolicnik = Math.floor(djeljenik / djelilac);
        rjesenja.push(m[1] + ' : ' + m[2] + ' = ' + formatBroj(kolicnik) + ', ostatak ' + formatBroj(djeljenik - kolicnik * djelilac));
        return m[1] + ' : ' + m[2] + ' = ___ i ostatak ___';
      }
      m = /^dio (\d+)\/(\d+) od (.+)$/.exec(s);
      if (m) {
        const v = izracunaj('(' + m[3] + ') * ' + m[1] + ' / ' + m[2]);
        rjesenja.push(m[1] + '/' + m[2] + ' od ' + m[3] + ' = ' + formatBroj(v));
        return m[1] + '/' + m[2] + ' od ' + m[3] + ' = ___';
      }
      if (s.indexOf('|') !== -1) {
        const dio = s.split('|');
        const jednacina = dio[0].trim();
        const vrijednost = dio[1].trim();
        const strane = jednacina.split(/(?<![<>])=(?!=)/);
        if (strane.length !== 2) throw new Error('Jednačina mora imati jedan znak =: ' + s);
        const uvrsti = function (strana) {
          return strana.replace(/x|___/g, '(' + vrijednost + ')');
        };
        if (Math.abs(izracunaj(uvrsti(strane[0])) - izracunaj(uvrsti(strane[1]))) > 1e-6) {
          throw new Error('Netačno rješenje jednačine: ' + s);
        }
        rjesenja.push(/x/.test(jednacina) ? 'x = ' + vrijednost : jednacina.replace('___', vrijednost));
        return jednacina;
      }
      if (s.indexOf(' ? ') !== -1) {
        const lijevo = s.split(' ? ')[0].trim();
        const desno = s.split(' ? ')[1].trim();
        const a = izracunaj(lijevo);
        const b = izracunaj(desno);
        const znak = a < b ? '<' : a > b ? '>' : '=';
        rjesenja.push(lijevo + ' ' + znak + ' ' + desno);
        return lijevo + ' ___ ' + desno;
      }
      rjesenja.push(s + ' = ' + formatBroj(izracunaj(s)));
      return s + ' = ___';
    });
    return izlaz.replace(/ *\u0000/g, '').trim();
  }

  function normalizuj(tekst) {
    return String(tekst || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/đ/g, 'dj');
  }

  function grupaPredmeta(predmet) {
    const p = normalizuj(predmet);
    if (p.includes('matematika')) return 'matematika';
    if (p.includes('jezik') || p.includes('maternji')) return 'jezik';
    if (p.includes('priroda') || p.includes('okolina') || p.includes('drustvo')) return 'priroda';
    if (p.includes('likovna')) return 'likovna';
    if (p.includes('muzick')) return 'muzicka';
    return 'tjelesni';
  }

  const pravila = { matematika: [], jezik: [], priroda: [], likovna: [], muzicka: [], tjelesni: [] };

  function dodaj(grupa, lista) {
    pravila[grupa].push.apply(pravila[grupa], lista);
  }

  // Prvo pravilo čiji obrazac odgovara nazivu časa (i razredu, ako je naveden).
  function pronadjiPravilo(jedinica) {
    const grupa = grupaPredmeta(jedinica.predmet);
    const razred = Number(jedinica.razred) || 1;
    const naziv = String(jedinica.naziv || '');
    for (let i = 0; i < pravila[grupa].length; i++) {
      const p = pravila[grupa][i];
      if (p.r && p.r.indexOf(razred) === -1) continue;
      const m = p.t ? p.t.exec(naziv) : [naziv];
      if (m) return { pravilo: p, poklapanje: m, grupa: grupa, razred: razred };
    }
    return null;
  }

  function zaJedinicu(jedinica) {
    const nadjeno = pronadjiPravilo(jedinica);
    if (!nadjeno) return null;
    const p = nadjeno.pravilo;
    const sirovo = p.f ? p.f(nadjeno.poklapanje, jedinica, nadjeno.razred) : p;
    const rezultat = { pravilo: p.id || nadjeno.grupa, grupa: nadjeno.grupa };
    ['o', 's', 'n'].forEach(function (k) {
      const rjesenja = [];
      const lista = (sirovo[k] || []).map(function (z) {
        return obradi(z, rjesenja);
      });
      rezultat[k] = { lista: lista, rjesenja: rjesenja };
    });
    return rezultat;
  }

  // „1) … 2) …“ za e-Dnevnik i Word, gdje je sve u jednom pasusu.
  function uTekst(lista) {
    return lista
      .map(function (z, i) {
        return i + 1 + ') ' + z;
      })
      .join(' ');
  }

  koren.BankaZadataka = {
    dodaj: dodaj,
    zaJedinicu: zaJedinicu,
    pronadjiPravilo: pronadjiPravilo,
    uTekst: uTekst,
    izracunaj: izracunaj,
    formatBroj: formatBroj,
    normalizuj: normalizuj,
    pravila: pravila,
  };
})(typeof window !== 'undefined' ? window : globalThis);
