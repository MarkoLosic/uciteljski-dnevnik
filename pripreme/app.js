/**
 * Glavna aplikaciona logika za biblioteku nastavnih priprema (pripreme/app.js)
 * - Filtriranje u realnom vremenu i pretraga bez obzira na dijakritičke znakove (č, ć, ž, š, đ) i pismo (latinica/ćirilica)
 * - Brzo postepeno iscrtavanje (paginacija po 36 kartica) za trenutno filtriranje 1.436 priprema
 * - Jednim klikom preslovljavanje Latinica ↔ Ћирилица (kartice, modal, e-Dnevnik, Word .docx, A4 radni listić)
 * - Čuvanje omiljenih priprema (⭐ Sačuvane) i podataka o školi/učitelju u localStorage
 * - URL Query (?razred=1&sistem=RS) i Hash (#priprema=<slug>) podrška za direktno dijeljenje linka
 * - Kopiranje za e-Dnevnik, A4 štampa, generisanje .docx fajlova i automatski A4 Radni listić za učenike
 */

(function () {
  'use strict';

  const KORAK_PRIKAZA = 36;
  let trenutniLimit = KORAK_PRIKAZA;

  // Stanje aktivnih filtera
  const stanjeFiltera = {
    pretraga: '',
    sistem: 'Svi',
    razred: 'Svi',
    predmet: 'Svi',
    tipCasa: 'Svi',
    samoSacuvane: false,
  };

  let trenutnoOtvorenaJedinica = null;
  let trenutnoPismo = 'lat'; // 'lat' ili 'cir'
  let sacuvaniSlugovi = [];

  // Učitavanje sačuvanog pisma i omiljenih priprema iz localStorage-a
  try {
    const sacuvanoPismo = localStorage.getItem('pripreme_pismo');
    if (sacuvanoPismo === 'cir' || sacuvanoPismo === 'lat') {
      trenutnoPismo = sacuvanoPismo;
    }
    const sacuvanoJson = localStorage.getItem('pripreme_sacuvane');
    if (sacuvanoJson) {
      const parsirano = JSON.parse(sacuvanoJson);
      if (Array.isArray(parsirano)) {
        sacuvaniSlugovi = parsirano;
      }
    }
  } catch (e) {}

  // DOM elementi
  const elMrezaKartica = document.getElementById('mrezaKartica');
  const elPraznoStanje = document.getElementById('praznoStanje');
  const elBrojacRezultata = document.getElementById('brojacRezultata');
  const elStatUkupno = document.getElementById('statUkupno');

  const elKontejnerUcitajJos = document.getElementById('kontejnerUcitajJos');
  const elStatusPaginacije = document.getElementById('statusPaginacije');
  const elDugmeUcitajJos = document.getElementById('dugmeUcitajJos');
  const elDugmePrikaziSve = document.getElementById('dugmePrikaziSve');

  const elPoljePretraga = document.getElementById('poljePretraga');
  const elObrisiPretragu = document.getElementById('obrisiPretragu');
  const elFilterSistem = document.getElementById('filterSistem');
  const elGrupaRazreda = document.getElementById('grupaRazreda');
  const elFilterPredmet = document.getElementById('filterPredmet');
  const elFilterTipCasa = document.getElementById('filterTipCasa');
  const elDugmeFilterSacuvane = document.getElementById('dugmeFilterSacuvane');
  const elBrojSacuvanih = document.getElementById('brojSacuvanih');
  const elDugmeResetuj = document.getElementById('dugmeResetujFiltere');
  const elDugmeResetujPrazno = document.getElementById('dugmeResetujPrazno');
  const elDugmePismo = document.getElementById('dugmePismo');

  // Modal elementi
  const elModalPozadina = document.getElementById('modalPozadina');
  const elDugmeZatvoriModal = document.getElementById('dugmeZatvoriModal');
  const elModalBedzevi = document.getElementById('modalBedzevi');
  const elModalPredmet = document.getElementById('modalPredmet');
  const elModalSistem = document.getElementById('modalSistem');
  const elModalCjelina = document.getElementById('modalCjelina');
  const elModalNaslov = document.getElementById('modalNaslovJedinice');
  const elModalTipCasa = document.getElementById('modalTipCasa');
  const elModalMetode = document.getElementById('modalMetode');
  const elModalKorelacija = document.getElementById('modalKorelacija');
  const elModalCilj = document.getElementById('modalCilj');
  const elModalIshodi = document.getElementById('modalIshodi');
  const elModalUvodni = document.getElementById('modalUvodni');
  const elModalGlavni = document.getElementById('modalGlavni');
  const elModalZavrsni = document.getElementById('modalZavrsni');

  const elMetaSkola = document.getElementById('metaSkola');
  const elMetaDatum = document.getElementById('metaDatum');
  const elMetaUcitelj = document.getElementById('metaUcitelj');
  const elMetaRazredOdjeljenje = document.getElementById('metaRazredOdjeljenje');

  // Dugmad u modalu
  const elAkcijaKopirajEDnevnik = document.getElementById('akcijaKopirajEDnevnik');
  const elAkcijaTriNivoa = document.getElementById('akcijaTriNivoa');
  const elAkcijaKopirajLink = document.getElementById('akcijaKopirajLink');
  const elAkcijaStampa = document.getElementById('akcijaStampa');
  const elAkcijaPreuzmiDocx = document.getElementById('akcijaPreuzmiDocx');
  const elAkcijaPreuzmiPdf = document.getElementById('akcijaPreuzmiPdf');
  const elAkcijaSacuvaj = document.getElementById('akcijaSacuvaj');
  const elAkcijaPismoModal = document.getElementById('akcijaPismoModal');

  // Elementi za diferenciranu pripremu na 3 nivoa učenika
  const elCtaTriNivoaBox = document.getElementById('ctaTriNivoaBox');
  const elDugmeGenerisiTriNivoa = document.getElementById('dugmeGenerisiTriNivoa');
  const elSekcijaTriNivoa = document.getElementById('sekcijaTriNivoa');
  let triNivoaAktivno = false;

  // ==========================================================================
  // PRESLOVLJAVANJE LATINICA ↔ ĆIRILICA
  // ==========================================================================
  const mapaDigrafa = [
    ['DŽ', 'Џ'],
    ['Dž', 'Џ'],
    ['dž', 'џ'],
    ['LJ', 'Љ'],
    ['Lj', 'Љ'],
    ['lj', 'љ'],
    ['NJ', 'Њ'],
    ['Nj', 'Њ'],
    ['nj', 'њ'],
  ];

  const mapaSlovaLatUCir = {
    A: 'А', a: 'а',
    B: 'Б', b: 'б',
    V: 'В', v: 'в',
    G: 'Г', g: 'г',
    D: 'Д', d: 'д',
    Đ: 'Ђ', đ: 'ђ',
    E: 'Е', e: 'е',
    Ž: 'Ж', ž: 'ж',
    Z: 'З', z: 'з',
    I: 'И', i: 'и',
    J: 'Ј', j: 'ј',
    K: 'К', k: 'к',
    L: 'Л', l: 'л',
    M: 'М', m: 'м',
    N: 'Н', n: 'н',
    O: 'О', o: 'о',
    P: 'П', p: 'п',
    R: 'Р', r: 'р',
    S: 'С', s: 'с',
    T: 'Т', t: 'т',
    Ć: 'Ћ', ć: 'ћ',
    U: 'У', u: 'у',
    F: 'Ф', f: 'ф',
    H: 'Х', h: 'х',
    C: 'Ц', c: 'ц',
    Č: 'Ч', č: 'ч',
    Š: 'Ш', š: 'ш',
  };

  const mapaSlovaCirULat = {
    А: 'A', а: 'a',
    Б: 'B', б: 'b',
    В: 'V', в: 'v',
    Г: 'G', г: 'g',
    Д: 'D', д: 'd',
    Ђ: 'Đ', ђ: 'đ',
    Е: 'E', е: 'e',
    Ж: 'Ž', ж: 'ž',
    З: 'Z', з: 'z',
    И: 'I', и: 'i',
    Ј: 'J', ј: 'j',
    К: 'K', к: 'k',
    Л: 'L', л: 'l',
    Љ: 'Lj', љ: 'lj',
    М: 'M', м: 'm',
    Н: 'N', н: 'n',
    Њ: 'Nj', њ: 'nj',
    О: 'O', о: 'o',
    П: 'P', п: 'p',
    Р: 'R', р: 'r',
    С: 'S', с: 's',
    Т: 'T', т: 't',
    Ћ: 'Ć', ћ: 'ć',
    У: 'U', у: 'u',
    Ф: 'F', ф: 'f',
    Х: 'H', х: 'h',
    Ц: 'C', ц: 'c',
    Ч: 'Č', ч: 'č',
    Џ: 'Dž', џ: 'dž',
    Ш: 'Š', ш: 'š',
  };

  function uCirilicu(tekst) {
    if (!tekst) return '';
    let rez = String(tekst);
    // Sačuvaj poznate skraćenice koje ostaju u izvornom obliku ili se prirodno preslovljavaju
    for (let i = 0; i < mapaDigrafa.length; i++) {
      rez = rez.split(mapaDigrafa[i][0]).join(mapaDigrafa[i][1]);
    }
    let izlaz = '';
    for (let j = 0; j < rez.length; j++) {
      const znak = rez[j];
      izlaz += mapaSlovaLatUCir[znak] || znak;
    }
    return izlaz;
  }

  function uLatinicu(tekst) {
    if (!tekst) return '';
    const s = String(tekst);
    let izlaz = '';
    for (let i = 0; i < s.length; i++) {
      const znak = s[i];
      izlaz += mapaSlovaCirULat[znak] || znak;
    }
    return izlaz;
  }

  // Preslovljava tekst u trenutno aktivno pismo ('lat' ili 'cir')
  function preslovi(tekst) {
    if (!tekst) return '';
    return trenutnoPismo === 'cir' ? uCirilicu(tekst) : String(tekst);
  }

  function azurirajDugmadPisma() {
    const jeCir = trenutnoPismo === 'cir';
    if (elDugmePismo) {
      elDugmePismo.textContent = jeCir ? 'ЋИР → LAT' : 'LAT → ЋИР';
      elDugmePismo.classList.toggle('active-cyr', jeCir);
      elDugmePismo.title = jeCir
        ? 'Trenutno pismo: Ćirilica (kliknite za prebacivanje na latinicu)'
        : 'Trenutno pismo: Latinica (kliknite za prebacivanje na ćirilicu)';
    }
    if (elAkcijaPismoModal) {
      elAkcijaPismoModal.textContent = jeCir ? '🔤 Prebaci na latinicu' : '🔤 Пребаци на ћирилицу';
    }
  }

  function promijeniPismo() {
    trenutnoPismo = trenutnoPismo === 'lat' ? 'cir' : 'lat';
    try {
      localStorage.setItem('pripreme_pismo', trenutnoPismo);
    } catch (e) {}
    azurirajDugmadPisma();
    prikaziKartice();
    if (trenutnoOtvorenaJedinica) {
      otvoriModalPoSlugu(trenutnoOtvorenaJedinica.slug, false);
    }
    prikaziObavjestenje(
      trenutnoPismo === 'cir'
        ? 'Приказ и извоз су пребачени на ћирилицу (АБВ).'
        : 'Prikaz i izvoz su prebačeni na latinicu (ABC).'
    );
  }

  // ==========================================================================
  // SAČUVANE / OMILJENE PRIPREME (localStorage)
  // ==========================================================================
  function jeSacuvana(slug) {
    return sacuvaniSlugovi.indexOf(slug) !== -1;
  }

  function azurirajBrojacSacuvanih() {
    if (elBrojSacuvanih) {
      elBrojSacuvanih.textContent = String(sacuvaniSlugovi.length);
    }
    if (elDugmeFilterSacuvane) {
      elDugmeFilterSacuvane.classList.toggle('btn-saved-active', stanjeFiltera.samoSacuvane);
      elDugmeFilterSacuvane.setAttribute('aria-pressed', stanjeFiltera.samoSacuvane ? 'true' : 'false');
    }
    if (elAkcijaSacuvaj && trenutnoOtvorenaJedinica) {
      const aktivno = jeSacuvana(trenutnoOtvorenaJedinica.slug);
      elAkcijaSacuvaj.textContent = aktivno ? '⭐ Sačuvano' : '☆ Sačuvaj';
      elAkcijaSacuvaj.classList.toggle('btn-saved-active', aktivno);
    }
  }

  function prebaciSacuvanu(slug) {
    if (!slug) return;
    const idx = sacuvaniSlugovi.indexOf(slug);
    let dodato = false;
    if (idx === -1) {
      sacuvaniSlugovi.push(slug);
      dodato = true;
    } else {
      sacuvaniSlugovi.splice(idx, 1);
    }
    try {
      localStorage.setItem('pripreme_sacuvane', JSON.stringify(sacuvaniSlugovi));
    } catch (e) {}

    azurirajBrojacSacuvanih();
    prikaziKartice();
    prikaziObavjestenje(
      dodato
        ? '⭐ Priprema je dodata u vaše sačuvane pripreme.'
        : 'Priprema je uklonjena iz sačuvanih priprema.'
    );
  }

  // ==========================================================================
  // NORMALIZACIJA I FILTRIRANJE
  // ==========================================================================
  // Pomoćna funkcija za normalizaciju teksta (podržava i ćirilični unos u pretrazi i uklanja kvačice)
  function normalizujTekst(tekst) {
    if (!tekst) return '';
    return uLatinicu(String(tekst))
      .toLowerCase()
      .replace(/č/g, 'c')
      .replace(/ć/g, 'c')
      .replace(/ž/g, 'z')
      .replace(/š/g, 's')
      .replace(/đ/g, 'dj');
  }

  // Provjera poklapanja predmeta između kraćeg naziva u filteru i punog naziva u bazi
  function poklapanjePredmeta(predmetJedinice, odabraniFilter) {
    if (odabraniFilter === 'Svi') return true;
    const normPredmet = normalizujTekst(predmetJedinice);
    const normFilter = normalizujTekst(odabraniFilter);

    if (normFilter.includes('maternji')) {
      return (
        normPredmet.includes('maternji') ||
        normPredmet.includes('srpski') ||
        normPredmet.includes('bosanski') ||
        normPredmet.includes('hrvatski') ||
        normPredmet.includes('jezik')
      );
    }
    if (normFilter.includes('moja okolina') || normFilter.includes('pid')) {
      return (
        normPredmet.includes('moja okolina') ||
        normPredmet.includes('priroda i drustvo') ||
        normPredmet.includes('pid')
      );
    }
    if (normFilter.includes('tjelesni')) {
      return normPredmet.includes('tjelesni') || normPredmet.includes('fizicko');
    }
    return normPredmet.includes(normFilter);
  }

  // Klasa bedža prema tipu časa
  function klasaZaTipCasa(tipCasa) {
    const t = normalizujTekst(tipCasa);
    if (t.includes('obrada')) return 'badge-type-obrada';
    if (t.includes('utvrdjivanje')) return 'badge-type-utvrdjivanje';
    if (t.includes('ponavljanje')) return 'badge-type-ponavljanje';
    if (t.includes('sistematizacija')) return 'badge-type-sistematizacija';
    return 'badge-system';
  }

  // Formatiranje oznake sistema (RS / FBiH) za tekstualni prikaz u tabeli
  function formatirajSistem(sistemNiz) {
    const niz = Array.isArray(sistemNiz) ? sistemNiz : [sistemNiz];
    return niz
      .filter(Boolean)
      .map(function (s) {
        const norm = String(s).trim().toUpperCase();
        if (norm === 'RS' || norm.includes('SRPSKA') || norm.includes('RPZ')) {
          return preslovi('Republika Srpska (RPZ)');
        }
        if (norm === 'FBIH' || norm.includes('FEDERACIJA') || norm.includes('ZJNPP')) {
          return preslovi('Federacija BiH (ZJNPP)');
        }
        return preslovi(s);
      })
      .join(' · ');
  }

  // Kreiranje pojedinačnih HTML bedževa za sisteme (RS / FBiH)
  function kreirajBedzeveSistema(sistemNiz) {
    const niz = Array.isArray(sistemNiz) ? sistemNiz : [sistemNiz];
    return niz
      .filter(Boolean)
      .map(function (s) {
        const norm = String(s).trim().toUpperCase();
        if (norm === 'RS' || norm.includes('SRPSKA') || norm.includes('RPZ')) {
          return '<span class="badge badge-system-rs">' + escapeHtml(preslovi('RS (RPZ)')) + '</span>';
        }
        if (norm === 'FBIH' || norm.includes('FEDERACIJA') || norm.includes('ZJNPP')) {
          return '<span class="badge badge-system-fbih">' + escapeHtml(preslovi('FBiH (ZJNPP)')) + '</span>';
        }
        return '<span class="badge badge-system">' + escapeHtml(preslovi(s)) + '</span>';
      })
      .join('');
  }

  // Provjera da li nastavna jedinica pripada odabranom sistemu (RS ili FBiH)
  function poklapanjeSistema(sistemJedinice, odabraniFilter) {
    if (!odabraniFilter || odabraniFilter === 'Svi') return true;
    const trazeni = String(odabraniFilter).trim().toUpperCase();
    const niz = Array.isArray(sistemJedinice) ? sistemJedinice : [sistemJedinice];

    return niz.some(function (stavka) {
      const s = String(stavka || '').trim().toUpperCase();
      if (trazeni === 'RS') {
        return s === 'RS' || s.includes('SRPSKA') || s.includes('RPZ');
      }
      if (trazeni === 'FBIH') {
        return s === 'FBIH' || s.includes('FEDERACIJA') || s.includes('ZJNPP');
      }
      return s === trazeni;
    });
  }

  // Prikaz kratkog obavještenja (Toast)
  function prikaziObavjestenje(poruka) {
    const kontejner = document.getElementById('toastKontejner');
    if (!kontejner) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = poruka;
    kontejner.appendChild(toast);

    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.25s ease';
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 260);
    }, 3200);
  }

  // Bezbijedno escapovanje HTML-a
  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Filtriranje podataka prema aktivnim filterima
  function filtrirajJedinice() {
    if (typeof nastavneJedinice === 'undefined' || !Array.isArray(nastavneJedinice)) {
      return [];
    }

    const pojam = normalizujTekst(stanjeFiltera.pretraga.trim());

    return nastavneJedinice.filter(function (jedinica) {
      // 0. Samo sačuvane
      if (stanjeFiltera.samoSacuvane && !jeSacuvana(jedinica.slug)) {
        return false;
      }

      // 1. Sistem (RS / FBiH)
      if (!poklapanjeSistema(jedinica.sistem, stanjeFiltera.sistem)) {
        return false;
      }

      // 2. Razred
      if (stanjeFiltera.razred !== 'Svi') {
        if (String(jedinica.razred) !== String(stanjeFiltera.razred)) {
          return false;
        }
      }

      // 3. Predmet
      if (!poklapanjePredmeta(jedinica.predmet, stanjeFiltera.predmet)) {
        return false;
      }

      // 4. Tip časa
      if (stanjeFiltera.tipCasa !== 'Svi') {
        if (normalizujTekst(jedinica.tipCasa) !== normalizujTekst(stanjeFiltera.tipCasa)) {
          return false;
        }
      }

      // 5. Tekstualna pretraga (naziv, cjelina, cilj, ishodi)
      if (pojam.length > 0) {
        const spojenoZaPretragu = normalizujTekst(
          [jedinica.naziv, jedinica.cjelina, jedinica.cilj, jedinica.ishodi, jedinica.predmet].join(' ')
        );
        if (!spojenoZaPretragu.includes(pojam)) {
          return false;
        }
      }

      return true;
    });
  }

  // Iscrtavanje kartica u mreži (sa paginacijom po 36 kartica)
  function prikaziKartice() {
    if (!elMrezaKartica) return;

    const ukupno = typeof nastavneJedinice !== 'undefined' ? nastavneJedinice.length : 0;
    if (elStatUkupno) elStatUkupno.textContent = String(ukupno);

    const filtrirane = filtrirajJedinice();
    const zaPrikaz = filtrirane.slice(0, trenutniLimit);

    if (elBrojacRezultata) {
      let dodatakSistem = '';
      if (stanjeFiltera.sistem === 'RS') {
        dodatakSistem = ' · Sistem: <strong>' + escapeHtml(preslovi('Republika Srpska (RPZ)')) + '</strong>';
      } else if (stanjeFiltera.sistem === 'FBiH') {
        dodatakSistem = ' · Sistem: <strong>' + escapeHtml(preslovi('Federacija BiH (ZJNPP)')) + '</strong>';
      }
      if (stanjeFiltera.samoSacuvane) {
        dodatakSistem += ' · <strong>' + escapeHtml(preslovi('⭐ Samo sačuvane')) + '</strong>';
      }
      elBrojacRezultata.innerHTML =
        escapeHtml(preslovi('Pronađeno ')) +
        '<strong>' +
        filtrirane.length +
        '</strong>' +
        escapeHtml(preslovi(' od ukupno ')) +
        '<strong>' +
        ukupno +
        '</strong>' +
        escapeHtml(preslovi(' priprema')) +
        dodatakSistem;
    }

    if (filtrirane.length === 0) {
      elMrezaKartica.innerHTML = '';
      if (elKontejnerUcitajJos) elKontejnerUcitajJos.hidden = true;
      if (elPraznoStanje) elPraznoStanje.hidden = false;
      return;
    }

    if (elPraznoStanje) elPraznoStanje.hidden = true;

    elMrezaKartica.innerHTML = zaPrikaz
      .map(function (jedinica) {
        const klasaTipa = klasaZaTipCasa(jedinica.tipCasa);
        const bedzeviSistemaHtml = kreirajBedzeveSistema(jedinica.sistem);
        const sacuvana = jeSacuvana(jedinica.slug);

        return (
          '<article class="lesson-card" tabindex="0" role="button" data-slug="' +
          escapeHtml(jedinica.slug) +
          '" aria-label="Otvori pripremu: ' +
          escapeHtml(preslovi(jedinica.naziv)) +
          '">' +
          '<div>' +
          '<div class="card-top-row">' +
          '<div class="card-badges">' +
          '<span class="badge badge-grade">' +
          escapeHtml(jedinica.razred) +
          escapeHtml(preslovi('. razred')) +
          '</span>' +
          '<span class="badge badge-subject">' +
          escapeHtml(preslovi(jedinica.predmet)) +
          '</span>' +
          '<span class="badge ' +
          klasaTipa +
          '">' +
          escapeHtml(preslovi(jedinica.tipCasa)) +
          '</span>' +
          bedzeviSistemaHtml +
          '</div>' +
          '<button type="button" class="card-star-btn' +
          (sacuvana ? ' saved' : '') +
          '" data-star-slug="' +
          escapeHtml(jedinica.slug) +
          '" aria-label="Sačuvaj pripremu" title="' +
          escapeHtml(preslovi(sacuvana ? 'Ukloni iz sačuvanih' : 'Sačuvaj pripremu')) +
          '">' +
          (sacuvana ? '★' : '☆') +
          '</button>' +
          '</div>' +
          '<p class="card-unit">' +
          escapeHtml(preslovi(jedinica.cjelina)) +
          '</p>' +
          '<h2 class="card-title">' +
          escapeHtml(preslovi(jedinica.naziv)) +
          '</h2>' +
          '<p class="card-goal">' +
          escapeHtml(preslovi(jedinica.cilj)) +
          '</p>' +
          '</div>' +
          '<div class="card-footer">' +
          '<button type="button" class="btn-card-levels" data-levels-slug="' +
          escapeHtml(jedinica.slug) +
          '" title="' +
          escapeHtml(
            preslovi('Otvori pripremu sa diferenciranim očekivanjima za 3 nivoa učenika (Osnovni, Srednji, Napredni)')
          ) +
          '">📊 ' +
          escapeHtml(preslovi('Priprema za 3 nivoa')) +
          '</button>' +
          '<span class="card-open-label">' +
          escapeHtml(preslovi('Otvori pripremu →')) +
          '</span>' +
          '</div>' +
          '</article>'
        );
      })
      .join('');

    // Kontrola prikaza dugmeta "Prikaži još"
    if (elKontejnerUcitajJos) {
      if (filtrirane.length > zaPrikaz.length) {
        const preostalo = filtrirane.length - zaPrikaz.length;
        const sljedeciKorak = Math.min(KORAK_PRIKAZA, preostalo);
        elKontejnerUcitajJos.hidden = false;
        if (elStatusPaginacije) {
          elStatusPaginacije.innerHTML =
            escapeHtml(preslovi('Prikazano je ')) +
            '<strong>' +
            zaPrikaz.length +
            '</strong>' +
            escapeHtml(preslovi(' od ')) +
            '<strong>' +
            filtrirane.length +
            '</strong>' +
            escapeHtml(preslovi(' pronađenih priprema.'));
        }
        if (elDugmeUcitajJos) {
          elDugmeUcitajJos.textContent = preslovi('Prikaži još priprema (+' + sljedeciKorak + ')');
        }
        if (elDugmePrikaziSve) {
          elDugmePrikaziSve.textContent = preslovi('Prikaži sve (' + filtrirane.length + ')');
        }
      } else {
        elKontejnerUcitajJos.hidden = true;
      }
    }
  }

  // Otvaranje modala za izabranu nastavnu jedinicu
  function otvoriModalPoSlugu(slug, azurirajHash) {
    if (typeof nastavneJedinice === 'undefined') return;
    const jedinica = nastavneJedinice.find(function (j) {
      return j.slug === slug;
    });
    if (!jedinica || !elModalPozadina) return;

    trenutnoOtvorenaJedinica = jedinica;

    const klasaTipa = klasaZaTipCasa(jedinica.tipCasa);
    const oznakaSistema = formatirajSistem(jedinica.sistem);
    const bedzeviSistemaHtml = kreirajBedzeveSistema(jedinica.sistem);

    elModalBedzevi.innerHTML =
      '<span class="badge badge-grade">' +
      escapeHtml(jedinica.razred) +
      escapeHtml(preslovi('. razred')) +
      '</span>' +
      '<span class="badge badge-subject">' +
      escapeHtml(preslovi(jedinica.predmet)) +
      '</span>' +
      '<span class="badge ' +
      klasaTipa +
      '">' +
      escapeHtml(preslovi(jedinica.tipCasa)) +
      '</span>' +
      bedzeviSistemaHtml;

    // Popunjavanje zaglavlja za štampu (uz čitanje sačuvanih podataka o školi i učitelju iz localStorage)
    const danas = new Date();
    const datumStr =
      String(danas.getDate()).padStart(2, '0') +
      '. ' +
      String(danas.getMonth() + 1).padStart(2, '0') +
      '. ' +
      danas.getFullYear() +
      '.';
    if (elMetaDatum && !elMetaDatum.textContent.trim()) {
      elMetaDatum.textContent = datumStr;
    }
    try {
      const sacuvanaSkola = (localStorage.getItem('pripreme_meta_skola') || '').replace(/_+/g, '').trim();
      if (elMetaSkola) {
        elMetaSkola.textContent = sacuvanaSkola;
      }
      const sacuvaniUcitelj = (localStorage.getItem('pripreme_meta_ucitelj') || '').replace(/_+/g, '').trim();
      if (elMetaUcitelj) {
        elMetaUcitelj.textContent = sacuvaniUcitelj;
      }
      const sacuvanoOdjeljenje = (localStorage.getItem('pripreme_meta_odjeljenje') || '').replace(/_+/g, '').trim();
      if (elMetaRazredOdjeljenje) {
        if (sacuvanoOdjeljenje) {
          elMetaRazredOdjeljenje.textContent =
            jedinica.razred + preslovi('. razred (') + sacuvanoOdjeljenje + ')';
        } else {
          elMetaRazredOdjeljenje.textContent = jedinica.razred + preslovi('. razred');
        }
      }
    } catch (e) {
      if (elMetaRazredOdjeljenje) {
        elMetaRazredOdjeljenje.textContent = jedinica.razred + preslovi('. razred');
      }
    }

    elModalPredmet.textContent = preslovi(jedinica.predmet);
    elModalSistem.textContent = oznakaSistema;
    elModalCjelina.textContent = preslovi(jedinica.cjelina);
    elModalNaslov.textContent = preslovi(jedinica.naziv);
    elModalTipCasa.textContent = preslovi(jedinica.tipCasa);
    elModalMetode.textContent = preslovi(jedinica.metodeOblici);
    elModalKorelacija.textContent = preslovi(
      jedinica.korelacija || 'Unutarpredmetna i međupredmetna korelacija'
    );
    elModalCilj.textContent = preslovi(jedinica.cilj);
    elModalIshodi.textContent = preslovi(jedinica.ishodi);
    elModalUvodni.textContent = preslovi(jedinica.uvodniDio);
    elModalGlavni.textContent = preslovi(jedinica.glavniDio);
    elModalZavrsni.textContent = preslovi(jedinica.zavrsniDio);

    // Ako je sekcija za 3 nivoa već bila uključena, osvježi je za novu pripremu; inače prikaži CTA baner
    if (triNivoaAktivno) {
      prikaziSekcijuTriNivoa(jedinica, false);
    } else {
      if (elSekcijaTriNivoa) {
        elSekcijaTriNivoa.hidden = true;
        elSekcijaTriNivoa.innerHTML = '';
      }
      if (elCtaTriNivoaBox) elCtaTriNivoaBox.hidden = false;
    }

    azurirajBrojacSacuvanih();

    elModalPozadina.hidden = false;
    elModalPozadina.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (azurirajHash !== false) {
      const noviHash = '#priprema=' + encodeURIComponent(jedinica.slug);
      if (window.location.hash !== noviHash) {
        history.pushState(null, '', noviHash);
      }
    }

    if (elDugmeZatvoriModal) {
      elDugmeZatvoriModal.focus();
    }
  }

  // Zatvaranje modala
  function zatvoriModal(ukloniHash) {
    if (!elModalPozadina) return;
    elModalPozadina.classList.remove('open');
    elModalPozadina.hidden = true;
    document.body.style.overflow = '';
    trenutnoOtvorenaJedinica = null;

    if (ukloniHash !== false && window.location.hash.startsWith('#priprema=')) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  }

  // Čitanje URL query parametara (?razred=1&sistem=RS&predmet=Matematika&pretraga=...)
  function procitajUrlParametre() {
    try {
      const params = new URLSearchParams(window.location.search);
      const razredParam = params.get('razred');
      if (razredParam && ['1', '2', '3', '4', '5'].indexOf(razredParam.trim()) !== -1) {
        stanjeFiltera.razred = razredParam.trim();
        if (elGrupaRazreda) {
          elGrupaRazreda.querySelectorAll('.pill-btn').forEach(function (d) {
            d.classList.toggle('active', d.getAttribute('data-razred') === stanjeFiltera.razred);
          });
        }
      }

      const sistemParam = params.get('sistem');
      if (sistemParam) {
        const sNorm = sistemParam.trim().toUpperCase();
        if (sNorm === 'RS' || sNorm === 'FBIH') {
          stanjeFiltera.sistem = sNorm === 'RS' ? 'RS' : 'FBiH';
          if (elFilterSistem) elFilterSistem.value = stanjeFiltera.sistem;
        }
      }

      const predmetParam = params.get('predmet');
      if (predmetParam && elFilterPredmet) {
        stanjeFiltera.predmet = predmetParam.trim();
        elFilterPredmet.value = stanjeFiltera.predmet;
      }

      const qParam = params.get('pretraga') || params.get('q');
      if (qParam && elPoljePretraga) {
        stanjeFiltera.pretraga = qParam.trim();
        elPoljePretraga.value = stanjeFiltera.pretraga;
        if (elObrisiPretragu) {
          elObrisiPretragu.classList.toggle('visible', stanjeFiltera.pretraga.length > 0);
        }
      }
    } catch (e) {}
  }

  // Čitanje URL hash-a (#priprema=<slug>)
  function provjeriUrlHash() {
    const hash = window.location.hash || '';
    if (hash.startsWith('#priprema=')) {
      const slug = decodeURIComponent(hash.replace('#priprema=', '').trim());
      if (slug) {
        otvoriModalPoSlugu(slug, false);
      }
    } else if (elModalPozadina && !elModalPozadina.hidden) {
      zatvoriModal(false);
    }
  }

  // Resetovanje svih filtera
  function resetujFiltere() {
    stanjeFiltera.pretraga = '';
    stanjeFiltera.sistem = 'Svi';
    stanjeFiltera.razred = 'Svi';
    stanjeFiltera.predmet = 'Svi';
    stanjeFiltera.tipCasa = 'Svi';
    stanjeFiltera.samoSacuvane = false;
    trenutniLimit = KORAK_PRIKAZA;

    if (elPoljePretraga) elPoljePretraga.value = '';
    if (elObrisiPretragu) elObrisiPretragu.classList.remove('visible');
    if (elFilterSistem) elFilterSistem.value = 'Svi';
    if (elFilterPredmet) elFilterPredmet.value = 'Svi';
    if (elFilterTipCasa) elFilterTipCasa.value = 'Svi';

    if (elGrupaRazreda) {
      const dugmad = elGrupaRazreda.querySelectorAll('.pill-btn');
      dugmad.forEach(function (d) {
        d.classList.toggle('active', d.getAttribute('data-razred') === 'Svi');
      });
    }

    azurirajBrojacSacuvanih();
    prikaziKartice();
  }

  // Kopiranje teksta u clipboard sa rezervnim mehanizmom
  function kopirajUClipboard(tekst, povratniPoziv) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(tekst)
        .then(function () {
          if (povratniPoziv) povratniPoziv(true);
        })
        .catch(function () {
          fallbackKopiranje(tekst, povratniPoziv);
        });
    } else {
      fallbackKopiranje(tekst, povratniPoziv);
    }
  }

  function fallbackKopiranje(tekst, povratniPoziv) {
    try {
      const privremenoPolje = document.createElement('textarea');
      privremenoPolje.value = tekst;
      privremenoPolje.setAttribute('readonly', '');
      privremenoPolje.style.position = 'fixed';
      privremenoPolje.style.opacity = '0';
      document.body.appendChild(privremenoPolje);
      privremenoPolje.select();
      document.execCommand('copy');
      document.body.removeChild(privremenoPolje);
      if (povratniPoziv) povratniPoziv(true);
    } catch (err) {
      if (povratniPoziv) povratniPoziv(false);
    }
  }

  // ==========================================================================
  // DIFERENCIRANA PRIPREMA ZA 3 NIVOA POSTIGNUĆA UČENIKA (OSNOVNI, SREDNJI, NAPREDNI)
  // ==========================================================================
  function generisiTriNivoaZaJedinicu(jedinica) {
    if (!jedinica) return null;

    const ishodiLinije = String(jedinica.ishodi || '')
      .split('\n')
      .map(function (s) {
        return s.replace(/^[-•*]\s*/, '').trim();
      })
      .filter(Boolean);

    const ishod1 = ishodiLinije[0] || 'usvaja osnovne pojmove nastavne jedinice „' + jedinica.naziv + '“';
    const ishod2 = ishodiLinije[1] || 'samostalno primjenjuje stečeno znanje kroz vježbu i primjere';
    const ishod3 = ishodiLinije[2] || 'povezuje naučeno gradivo sa novim situacijama i rješava problemske zadatke';

    const normPredmet = normalizujTekst(jedinica.predmet);
    let zadatakOsnovni = '';
    let zadatakSrednji = '';
    let zadatakNapredni = '';

    if (normPredmet.includes('matematika')) {
      zadatakOsnovni =
        'Uz pomoć očiglednih sredstava, brojevne prave ili ponuđenog modela na tabli rješava osnovne zadatke za lekciju „' +
        jedinica.naziv +
        '“ (prepoznavanje, zapisivanje i direktan račun u jednom koraku).';
      zadatakSrednji =
        'Samostalno rješava standardne zadatke iz udžbenika i radne sveske vezane za „' +
        jedinica.naziv +
        '“, provjerava tačnost rezultata i objašnjava postupak rješavanja.';
      zadatakNapredni =
        'Rješava složenije tekstualne i problemske zadatke sa više operacija u okviru teme „' +
        jedinica.naziv +
        '“, pronalazi različite načine rješavanja i samostalno sastavlja novi matematički zadatak za vršnjake.';
    } else if (
      normPredmet.includes('maternji') ||
      normPredmet.includes('srpski') ||
      normPredmet.includes('bosanski') ||
      normPredmet.includes('hrvatski') ||
      normPredmet.includes('jezik')
    ) {
      zadatakOsnovni =
        'Uz podršku učitelja i podsticajna pitanja uočava osnovne elemente teme „' +
        jedinica.naziv +
        '“, prepoznaje ključne riječi/primjere u tekstu i dopunjava kratke rečenice prema modelu.';
      zadatakSrednji =
        'Samostalno čita, analizira i primjenjuje pravila/sadržaje nastavne jedinice „' +
        jedinica.naziv +
        '“, odgovara potpunim rečenicama i pravilno rješava zadatke na nastavnom listiću.';
      zadatakNapredni =
        'Stvaralački i kritički pristupa temi „' +
        jedinica.naziv +
        '“, samostalno sastavlja kraći autorski tekst ili proširene primjere, uočava dublje značenje i pomaže drugovima u grupi.';
    } else if (normPredmet.includes('priroda') || normPredmet.includes('okolina') || normPredmet.includes('pid')) {
      zadatakOsnovni =
        'Posmatra ilustracije/modele i uz vođenje učitelja imenuje osnovne pojmove i pojave iz lekcije „' +
        jedinica.naziv +
        '“, te rješava zadatke zaokruživanja i spajanja parova.';
      zadatakSrednji =
        'Samostalno opisuje karakteristike i značaj pojmova iz teme „' +
        jedinica.naziv +
        '“, razvrstava primjere u tabelu i povezuje ih sa svakodnevnim životom u svom okruženju.';
      zadatakNapredni =
        'Objašnjava uzročno-posljedične veze u okviru nastavne jedinice „' +
        jedinica.naziv +
        '“, donosi zaključke na osnovu ogleda/istraživanja i predlaže praktična rješenja ili ekološke poruke.';
    } else if (normPredmet.includes('likovna')) {
      zadatakOsnovni =
        'Uz demonstraciju učitelja koristi osnovni likovni materijal, uočava glavni likovni element na temu „' +
        jedinica.naziv +
        '“ i realizuje jednostavniju likovnu kompoziciju.';
      zadatakSrednji =
        'Samostalno oblikuje likovni rad na temu „' +
        jedinica.naziv +
        '“ poštujući zadani likovni problem, tehniku i proporcije, te učestvuje u analizi radova.';
      zadatakNapredni =
        'Kreativno, originalno i sa bogatstvom detalja rješava likovni problem „' +
        jedinica.naziv +
        '“, eksperimentiše sa izražajnim mogućnostima tehnike i obrazlaže estetsku vrijednost rada.';
    } else if (normPredmet.includes('muzicka')) {
      zadatakOsnovni =
        'Pažljivo sluša i uz podršku učitelja/grupe reprodukuje osnovni ritam ili melodijski motiv u okviru jedinice „' +
        jedinica.naziv +
        '“.';
      zadatakSrednji =
        'Samostalno i tačno izvodi pjesmicu/brojalicu ili prepoznaje muzičke elemente (tempo, dinamiku, instrumente) u lekciji „' +
        jedinica.naziv +
        '“.';
      zadatakNapredni =
        'Izražajno i muzikalno izvodi zadatak iz teme „' +
        jedinica.naziv +
        '“, osmišljava ritmičku pratnju, predvodi grupu u izvođenju i uočava fine muzičke nijanse.';
    } else {
      zadatakOsnovni =
        'Uz demonstraciju i asistenciju učitelja pravilno i bezbjedno izvodi osnovne elemente kretanja/vježbe u okviru teme „' +
        jedinica.naziv +
        '“.';
      zadatakSrednji =
        'Samostalno, koordinisano i po pravilima izvodi motorički zadatak „' +
        jedinica.naziv +
        '“ uz poštovanje fer-pleja i saradnju sa vršnjacima.';
      zadatakNapredni =
        'Tehnički precizno i spretno demonstrira vježbu „' +
        jedinica.naziv +
        '“, pomaže vršnjacima u grupi i uspješno rješava složenije motoričke poligone/igre.';
    }

    return {
      osnovni: {
        oznaka: '🟢 I NIVO — Osnovni nivo (Prilagođena očekivanja)',
        ciljnaGrupa: 'Učenici kojima je potrebna dodatna podrška, vizuelni oslonac i postepeno vođenje.',
        ocekivanja:
          '• Učenik prepoznaje i imenuje ključne pojmove lekcije „' +
          jedinica.naziv +
          '“ uz pomoć učitelja ili očiglednih sredstava.\n• Ostvaruje polazni ishod: ' +
          ishod1,
        zadaci: zadatakOsnovni,
        podrska:
          'Postepeno vođenje korak po korak, kraći i jasno strukturisani zahtjevi, rad uz konkretan materijal/slike i stalno ohrabrivanje za svaki tačan korak.',
      },
      srednji: {
        oznaka: '🔵 II NIVO — Srednji nivo (Standardna očekivanja)',
        ciljnaGrupa: 'Učenici koji samostalno prate nastavu i ostvaruju redovne programske zahtjeve.',
        ocekivanja:
          '• Učenik razumije i svojim riječima objašnjava suštinu nastavne jedinice „' +
          jedinica.naziv +
          '“.\n• Samostalno ostvaruje ishode: ' +
          ishod1 +
          '; ' +
          ishod2,
        zadaci: zadatakSrednji,
        podrska:
          'Praćenje samostalnosti, tačnosti i urednosti u radu, usmjeravanje pri samoprovjeri i povratna informacija o kvalitetu urađenog zadatka.',
      },
      napredni: {
        oznaka: '🟣 III NIVO — Napredni nivo (Viša i stvaralačka očekivanja)',
        ciljnaGrupa: 'Učenici koji brže napreduju, povezuju znanja i pokazuju visok stepen samostalnosti.',
        ocekivanja:
          '• Učenik analizira, upoređuje i kritički promišlja sadržaje jedinice „' +
          jedinica.naziv +
          '“ u novim i problemskim situacijama.\n• U potpunosti ostvaruje i proširuje ishod: ' +
          ishod3,
        zadaci: zadatakNapredni,
        podrska:
          'Dodatni problemski i istraživački izazovi, podsticanje kreativnosti, argumentovanog obrazlaganja i vršnjačke podrške u grupi.',
      },
    };
  }

  function prikaziSekcijuTriNivoa(jedinica, skroluj) {
    if (!jedinica || !elSekcijaTriNivoa) return;
    triNivoaAktivno = true;
    const nivoi = generisiTriNivoaZaJedinicu(jedinica);
    if (!nivoi) return;

    if (elCtaTriNivoaBox) elCtaTriNivoaBox.hidden = true;
    elSekcijaTriNivoa.hidden = false;

    elSekcijaTriNivoa.innerHTML =
      '<div class="levels-section-header">' +
      '<div>' +
      '<div class="levels-section-title">📊 ' +
      escapeHtml(
        preslovi('DIFERENCIRANA PRIPREMA ZA 3 NIVOA POSTIGNUĆA UČENIKA (Individualizovana očekivanja)')
      ) +
      '</div>' +
      '<div class="levels-section-subtitle">' +
      escapeHtml(
        preslovi(
          'Polja ispod možete direktno kliknuti i dopuniti prema konkretnim učenicima u vašem odjeljenju prije štampe ili Word izvoza.'
        )
      ) +
      '</div>' +
      '</div>' +
      '<div class="levels-toolbar no-print">' +
      '<button type="button" id="dugmeKopirajTriNivoa" class="btn btn-primary" style="height:34px;font-size:0.84rem">' +
      '📋 ' +
      escapeHtml(preslovi('Kopiraj sa 3 nivoa (e-Dnevnik)')) +
      '</button>' +
      '<button type="button" id="dugmeListicTriNivoa" class="btn btn-outline" style="height:34px;font-size:0.84rem">' +
      '📝 ' +
      escapeHtml(preslovi('Radni listić na 3 nivoa (A4)')) +
      '</button>' +
      '<button type="button" id="dugmeSakrijTriNivoa" class="btn btn-subtle" style="height:34px;font-size:0.84rem">' +
      '✕ ' +
      escapeHtml(preslovi('Sakrij')) +
      '</button>' +
      '</div>' +
      '</div>' +
      '<div class="levels-grid">' +
      // I NIVO
      '<div class="level-card level-osnovni">' +
      '<div class="level-card-head">' +
      '<span>' +
      escapeHtml(preslovi(nivoi.osnovni.oznaka)) +
      '</span>' +
      '</div>' +
      '<div class="level-card-body" contenteditable="true" title="Kliknite za izmjenu teksta">' +
      '<div>' +
      '<div class="level-block-label">' +
      escapeHtml(preslovi('Očekivanja za učenika (ishodi):')) +
      '</div>' +
      '<div class="level-block-text" id="tekstNivoOsnovniOcekivanja">' +
      escapeHtml(preslovi(nivoi.osnovni.ocekivanja)) +
      '</div>' +
      '</div>' +
      '<div>' +
      '<div class="level-block-label">' +
      escapeHtml(preslovi('Prilagođeni zadaci na času:')) +
      '</div>' +
      '<div class="level-block-text" id="tekstNivoOsnovniZadaci">' +
      escapeHtml(preslovi(nivoi.osnovni.zadaci)) +
      '</div>' +
      '</div>' +
      '<div>' +
      '<div class="level-block-label">' +
      escapeHtml(preslovi('Podrška učitelja i praćenje:')) +
      '</div>' +
      '<div class="level-block-text" id="tekstNivoOsnovniPodrska">' +
      escapeHtml(preslovi(nivoi.osnovni.podrska)) +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      // II NIVO
      '<div class="level-card level-srednji">' +
      '<div class="level-card-head">' +
      '<span>' +
      escapeHtml(preslovi(nivoi.srednji.oznaka)) +
      '</span>' +
      '</div>' +
      '<div class="level-card-body" contenteditable="true" title="Kliknite za izmjenu teksta">' +
      '<div>' +
      '<div class="level-block-label">' +
      escapeHtml(preslovi('Očekivanja za učenika (ishodi):')) +
      '</div>' +
      '<div class="level-block-text" id="tekstNivoSrednjiOcekivanja">' +
      escapeHtml(preslovi(nivoi.srednji.ocekivanja)) +
      '</div>' +
      '</div>' +
      '<div>' +
      '<div class="level-block-label">' +
      escapeHtml(preslovi('Standardni zadaci na času:')) +
      '</div>' +
      '<div class="level-block-text" id="tekstNivoSrednjiZadaci">' +
      escapeHtml(preslovi(nivoi.srednji.zadaci)) +
      '</div>' +
      '</div>' +
      '<div>' +
      '<div class="level-block-label">' +
      escapeHtml(preslovi('Podrška učitelja i praćenje:')) +
      '</div>' +
      '<div class="level-block-text" id="tekstNivoSrednjiPodrska">' +
      escapeHtml(preslovi(nivoi.srednji.podrska)) +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      // III NIVO
      '<div class="level-card level-napredni">' +
      '<div class="level-card-head">' +
      '<span>' +
      escapeHtml(preslovi(nivoi.napredni.oznaka)) +
      '</span>' +
      '</div>' +
      '<div class="level-card-body" contenteditable="true" title="Kliknite za izmjenu teksta">' +
      '<div>' +
      '<div class="level-block-label">' +
      escapeHtml(preslovi('Očekivanja za učenika (ishodi):')) +
      '</div>' +
      '<div class="level-block-text" id="tekstNivoNapredniOcekivanja">' +
      escapeHtml(preslovi(nivoi.napredni.ocekivanja)) +
      '</div>' +
      '</div>' +
      '<div>' +
      '<div class="level-block-label">' +
      escapeHtml(preslovi('Problemski i stvaralački zadaci:')) +
      '</div>' +
      '<div class="level-block-text" id="tekstNivoNapredniZadaci">' +
      escapeHtml(preslovi(nivoi.napredni.zadaci)) +
      '</div>' +
      '</div>' +
      '<div>' +
      '<div class="level-block-label">' +
      escapeHtml(preslovi('Podrška učitelja i praćenje:')) +
      '</div>' +
      '<div class="level-block-text" id="tekstNivoNapredniPodrska">' +
      escapeHtml(preslovi(nivoi.napredni.podrska)) +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';

    // Povezivanje dugmadi unutar sekcije za 3 nivoa
    const btnKopiraj3 = document.getElementById('dugmeKopirajTriNivoa');
    if (btnKopiraj3) {
      btnKopiraj3.addEventListener('click', function () {
        const tekst = sastaviTekstZaEDnevnik(jedinica, true);
        kopirajUClipboard(tekst, function (uspjesno) {
          if (uspjesno) {
            prikaziObavjestenje(
              preslovi('Kopirana je kompletna priprema sa očekivanjima za sva 3 nivoa učenika!')
            );
          }
        });
      });
    }

    const btnListic3 = document.getElementById('dugmeListicTriNivoa');
    if (btnListic3) {
      btnListic3.addEventListener('click', function () {
        otvoriRadniListicTriNivoa(jedinica);
      });
    }

    const btnSakrij3 = document.getElementById('dugmeSakrijTriNivoa');
    if (btnSakrij3) {
      btnSakrij3.addEventListener('click', function () {
        triNivoaAktivno = false;
        elSekcijaTriNivoa.hidden = true;
        if (elCtaTriNivoaBox) elCtaTriNivoaBox.hidden = false;
      });
    }

    if (skroluj) {
      setTimeout(function () {
        elSekcijaTriNivoa.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
      prikaziObavjestenje(
        preslovi('Kreirana je diferencirana priprema sa očekivanjima za 3 nivoa postignuća učenika!')
      );
    }
  }

  // Otvaranje A4 radnog listića za učenike podijeljenog na 3 nivoa složenosti
  function otvoriRadniListicTriNivoa(jedinica) {
    if (!jedinica) return;
    const nivoi = generisiTriNivoaZaJedinicu(jedinica);
    const prozor = window.open('', '_blank');
    if (!prozor) {
      prikaziObavjestenje(
        preslovi('Dozvolite otvaranje novog prozora u pregledaču kako biste odštampali radni listić za 3 nivoa.')
      );
      return;
    }

    const htmlSadrzaj =
      '<!doctype html>' +
      '<html lang="sr">' +
      '<head>' +
      '<meta charset="UTF-8">' +
      '<title>' +
      escapeHtml(preslovi('Diferencirani radni listić (3 nivoa) — ' + jedinica.naziv)) +
      '</title>' +
      '<style>' +
      '@page { size: A4 portrait; margin: 12mm 14mm; }' +
      '* { box-sizing: border-box; margin: 0; padding: 0; }' +
      'body { font-family: "Inter", "Segoe UI", Arial, sans-serif; color: #111; background: #f3f6f7; padding: 20px; line-height: 1.45; }' +
      '.toolbar { max-width: 210mm; margin: 0 auto 14px; display: flex; justify-content: space-between; align-items: center; gap: 12px; background: #4c1d95; color: #fff; padding: 12px 18px; border-radius: 10px; }' +
      '.toolbar button { background: #fff; color: #4c1d95; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 14px; }' +
      '.sheet { max-width: 210mm; margin: 0 auto; background: #fff; padding: 14mm; border: 1px solid #ccc; border-radius: 8px; }' +
      '.header-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px; border: 2px solid #111; border-radius: 8px; padding: 10px 14px; margin-bottom: 14px; font-size: 13px; }' +
      '.title-box { text-align: center; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 2px solid #111; }' +
      '.title-eyebrow { font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.05em; color: #4c1d95; font-weight: 700; }' +
      '.title-main { font-size: 19px; font-weight: 800; margin-top: 3px; }' +
      '.level-box { border: 1.5px solid #222; border-radius: 8px; padding: 11px 14px; margin-bottom: 12px; page-break-inside: avoid; }' +
      '.level-1 { border-left: 6px solid #059669; }' +
      '.level-2 { border-left: 6px solid #2563eb; }' +
      '.level-3 { border-left: 6px solid #7c3aed; }' +
      '.level-head { font-weight: 800; font-size: 14px; margin-bottom: 5px; display: flex; justify-content: space-between; }' +
      '.level-expect { font-size: 12.5px; color: #333; margin-bottom: 6px; font-style: italic; }' +
      '.level-task { font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #111; }' +
      '.lines { display: flex; flex-direction: column; gap: 16px; padding-top: 6px; }' +
      '.line { border-bottom: 1px dotted #555; height: 16px; }' +
      '.footer-note { border: 1px solid #444; border-radius: 6px; padding: 8px 12px; font-size: 12.5px; display: flex; justify-content: space-between; margin-top: 10px; }' +
      '@media print { body { background: #fff; padding: 0; } .toolbar { display: none !important; } .sheet { border: none; padding: 0; max-width: none; } }' +
      '</style>' +
      '</head>' +
      '<body>' +
      '<div class="toolbar">' +
      '<span><strong>' +
      escapeHtml(preslovi('📊 Diferencirani radni listić za 3 nivoa postignuća učenika (A4)')) +
      '</strong></span>' +
      '<div style="display:flex;gap:8px">' +
      '<button onclick="window.print()">🖨 ' +
      escapeHtml(preslovi('Odštampaj / Sačuvaj PDF')) +
      '</button>' +
      '<button onclick="window.close()" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.5)">✕ ' +
      escapeHtml(preslovi('Zatvori')) +
      '</button>' +
      '</div>' +
      '</div>' +
      '<div class="sheet">' +
      '<div class="header-grid">' +
      '<div><strong>' +
      escapeHtml(preslovi('Ime i prezime učenika:')) +
      '</strong> ________________________</div>' +
      '<div><strong>' +
      escapeHtml(preslovi('Razred i odjeljenje:')) +
      '</strong> ' +
      escapeHtml(String(jedinica.razred)) +
      escapeHtml(preslovi('. razred (___)')) +
      '</div>' +
      '<div><strong>' +
      escapeHtml(preslovi('Nastavni predmet:')) +
      '</strong> ' +
      escapeHtml(preslovi(jedinica.predmet)) +
      '</div>' +
      '<div><strong>' +
      escapeHtml(preslovi('Odabrani nivo:')) +
      '</strong> ☐ I nivo &nbsp; ☐ II nivo &nbsp; ☐ III nivo</div>' +
      '</div>' +
      '<div class="title-box">' +
      '<div class="title-eyebrow">' +
      escapeHtml(preslovi('DIFERENCIRANI ZADACI ZA TRI NIVOA UČENIKA · ' + jedinica.cjelina)) +
      '</div>' +
      '<div class="title-main">' +
      escapeHtml(preslovi(jedinica.naziv)) +
      '</div>' +
      '</div>' +
      '<div class="level-box level-1">' +
      '<div class="level-head"><span>' +
      escapeHtml(preslovi(nivoi.osnovni.oznaka)) +
      '</span><span>⭐</span></div>' +
      '<div class="level-expect">' +
      escapeHtml(preslovi(nivoi.osnovni.ocekivanja.replace(/\n/g, ' '))) +
      '</div>' +
      '<div class="level-task">' +
      escapeHtml(preslovi('Zadatak (I nivo): ' + nivoi.osnovni.zadaci)) +
      '</div>' +
      '<div class="lines"><div class="line"></div><div class="line"></div><div class="line"></div></div>' +
      '</div>' +
      '<div class="level-box level-2">' +
      '<div class="level-head"><span>' +
      escapeHtml(preslovi(nivoi.srednji.oznaka)) +
      '</span><span>⭐⭐</span></div>' +
      '<div class="level-expect">' +
      escapeHtml(preslovi(nivoi.srednji.ocekivanja.replace(/\n/g, ' '))) +
      '</div>' +
      '<div class="level-task">' +
      escapeHtml(preslovi('Zadatak (II nivo): ' + nivoi.srednji.zadaci)) +
      '</div>' +
      '<div class="lines"><div class="line"></div><div class="line"></div><div class="line"></div></div>' +
      '</div>' +
      '<div class="level-box level-3">' +
      '<div class="level-head"><span>' +
      escapeHtml(preslovi(nivoi.napredni.oznaka)) +
      '</span><span>⭐⭐⭐</span></div>' +
      '<div class="level-expect">' +
      escapeHtml(preslovi(nivoi.napredni.ocekivanja.replace(/\n/g, ' '))) +
      '</div>' +
      '<div class="level-task">' +
      escapeHtml(preslovi('Zadatak (III nivo): ' + nivoi.napredni.zadaci)) +
      '</div>' +
      '<div class="lines"><div class="line"></div><div class="line"></div><div class="line"></div></div>' +
      '</div>' +
      '<div class="footer-note">' +
      '<span><strong>' +
      escapeHtml(preslovi('Zapažanje i povratna informacija učitelja/ice:')) +
      '</strong> ____________________________________________</span>' +
      '<span><strong>' +
      escapeHtml(preslovi('Ostvareni nivo:')) +
      '</strong> I / II / III</span>' +
      '</div>' +
      '</div>' +
      '</body>' +
      '</html>';

    prozor.document.open();
    prozor.document.write(htmlSadrzaj);
    prozor.document.close();
  }

  // Sastavljanje teksta pripreme za e-Dnevnik (poštuje izabrano pismo i uključuje 3 nivoa učenika)
  function sastaviTekstZaEDnevnik(jedinica, prisiliTriNivoa) {
    const nivoi = generisiTriNivoaZaJedinicu(jedinica);
    const ukljuciNivoe = prisiliTriNivoa || triNivoaAktivno;

    const dijelovi = [
      'NASTAVNA JEDINICA: ' + jedinica.naziv,
      'Predmet: ' + jedinica.predmet + ' (' + jedinica.razred + '. razred)',
      'Nastavna cjelina: ' + jedinica.cjelina,
      'Tip časa: ' + jedinica.tipCasa,
      'Metode i oblici rada: ' + jedinica.metodeOblici,
      '',
      'CILJ ČASA:',
      jedinica.cilj,
      '',
      'ISHODI UČENJA:',
      jedinica.ishodi,
      '',
      'TOK ČASA:',
      '1. Uvodni dio: ' + jedinica.uvodniDio,
      '',
      '2. Glavni dio: ' + jedinica.glavniDio,
      '',
      '3. Završni dio: ' + jedinica.zavrsniDio,
      '',
      'Korelacija: ' + jedinica.korelacija,
    ];

    if (ukljuciNivoe && nivoi) {
      dijelovi.push(
        '',
        'DIFERENCIRANA OČEKIVANJA I ZADACI ZA 3 NIVOA POSTIGNUĆA UČENIKA:',
        '1) ' + nivoi.osnovni.oznaka,
        'Očekivanja: ' + nivoi.osnovni.ocekivanja.replace(/\n/g, ' '),
        'Zadaci na času: ' + nivoi.osnovni.zadaci,
        'Podrška i praćenje: ' + nivoi.osnovni.podrska,
        '',
        '2) ' + nivoi.srednji.oznaka,
        'Očekivanja: ' + nivoi.srednji.ocekivanja.replace(/\n/g, ' '),
        'Zadaci na času: ' + nivoi.srednji.zadaci,
        'Podrška i praćenje: ' + nivoi.srednji.podrska,
        '',
        '3) ' + nivoi.napredni.oznaka,
        'Očekivanja: ' + nivoi.napredni.ocekivanja.replace(/\n/g, ' '),
        'Zadaci na času: ' + nivoi.napredni.zadaci,
        'Podrška i praćenje: ' + nivoi.napredni.podrska
      );
    }

    return preslovi(dijelovi.join('\n'));
  }

  // Generisanje .docx dokumenta direktno u browseru pomoću `docx` biblioteke
  window.generisiDocxPripremu = async function (jedinica, zaglavljeOpcije) {
    const opcije = zaglavljeOpcije || {};
    const nazivSkole = preslovi(
      opcije.skola || (elMetaSkola ? elMetaSkola.textContent.trim() : '________________________________')
    );
    const imeUcitelja = preslovi(
      opcije.ucitelj || (elMetaUcitelj ? elMetaUcitelj.textContent.trim() : '________________________________')
    );
    const datumCasa = opcije.datum || (elMetaDatum ? elMetaDatum.textContent.trim() : '________________');

    // Ako je dostupna `docx` biblioteka (sa CDN-a), kreiramo pravi .docx fajl
    if (window.docx && typeof window.saveAs === 'function') {
      const {
        Document,
        Packer,
        Paragraph,
        TextRun,
        Table,
        TableRow,
        TableCell,
        WidthType,
        AlignmentType,
        BorderStyle,
        HeadingLevel,
        ShadingType,
      } = window.docx;

      const okvirTabele = {
        top: { style: BorderStyle.SINGLE, size: 1, color: '888888' },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: '888888' },
        left: { style: BorderStyle.SINGLE, size: 1, color: '888888' },
        right: { style: BorderStyle.SINGLE, size: 1, color: '888888' },
      };

      function napraviRedTabele(oznaka, vrijednost) {
        return new TableRow({
          children: [
            new TableCell({
              width: { size: 32, type: WidthType.PERCENTAGE },
              borders: okvirTabele,
              shading: { fill: 'EDF4F5', type: ShadingType.CLEAR, color: 'auto' },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: preslovi(oznaka), bold: true, size: 21, font: 'Calibri' })],
                }),
              ],
            }),
            new TableCell({
              width: { size: 68, type: WidthType.PERCENTAGE },
              borders: okvirTabele,
              children: [
                new Paragraph({
                  children: [new TextRun({ text: preslovi(String(vrijednost || '')), size: 21, font: 'Calibri' })],
                }),
              ],
            }),
          ],
        });
      }

      function napraviSekcijuPasusa(naslovSekcije, tekstSekcije) {
        const linije = preslovi(String(tekstSekcije || '')).split('\n');
        const pasusi = [
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 100 },
            children: [
              new TextRun({
                text: preslovi(naslovSekcije),
                bold: true,
                size: 24,
                color: '0D6E6E',
                font: 'Calibri',
              }),
            ],
          }),
        ];

        linije.forEach(function (linija) {
          pasusi.push(
            new Paragraph({
              spacing: { after: 100 },
              children: [new TextRun({ text: linija, size: 22, font: 'Calibri' })],
            })
          );
        });

        return pasusi;
      }

      const oznakaSistema = Array.isArray(jedinica.sistem)
        ? jedinica.sistem.join(' / ')
        : String(jedinica.sistem || '');
      const nivoi = generisiTriNivoaZaJedinicu(jedinica);

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 240 },
                children: [
                  new TextRun({
                    text: preslovi('PISMENA PRIPREMA ZA REALIZACIJU NASTAVNOG ČASA'),
                    bold: true,
                    size: 28,
                    font: 'Calibri',
                    color: '0D6E6E',
                  }),
                ],
              }),
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  napraviRedTabele('Osnovna škola:', nazivSkole),
                  napraviRedTabele('Realizator (učitelj/ica):', imeUcitelja),
                  napraviRedTabele('Datum održavanja časa:', datumCasa),
                  napraviRedTabele('Razred:', jedinica.razred + '. razred osnovne škole'),
                  napraviRedTabele('Nastavni plan / Sistem:', oznakaSistema),
                  napraviRedTabele('Nastavni predmet:', jedinica.predmet),
                  napraviRedTabele('Nastavna cjelina / Tema:', jedinica.cjelina),
                  napraviRedTabele('Nastavna jedinica:', jedinica.naziv),
                  napraviRedTabele('Tip nastavnog časa:', jedinica.tipCasa),
                  napraviRedTabele('Nastavne metode i oblici rada:', jedinica.metodeOblici),
                  napraviRedTabele('Međupredmetna korelacija:', jedinica.korelacija),
                ],
              }),
              ...napraviSekcijuPasusa('CILJ ČASA', jedinica.cilj),
              ...napraviSekcijuPasusa('OČEKIVANI ISHODI UČENJA', jedinica.ishodi),
              ...napraviSekcijuPasusa('1. UVODNI DIO ČASA', jedinica.uvodniDio),
              ...napraviSekcijuPasusa('2. GLAVNI DIO ČASA', jedinica.glavniDio),
              ...napraviSekcijuPasusa('3. ZAVRŠNI DIO ČASA', jedinica.zavrsniDio),
              ...(nivoi
                ? [
                    ...napraviSekcijuPasusa(
                      'DIFERENCIRANA PRIPREMA ZA 3 NIVOA POSTIGNUĆA UČENIKA (Individualizovana očekivanja)',
                      [
                        nivoi.osnovni.oznaka,
                        'Očekivanja za učenika: ' + nivoi.osnovni.ocekivanja.replace(/\n/g, ' '),
                        'Prilagođeni zadaci na času: ' + nivoi.osnovni.zadaci,
                        'Podrška i praćenje: ' + nivoi.osnovni.podrska,
                        '',
                        nivoi.srednji.oznaka,
                        'Očekivanja za učenika: ' + nivoi.srednji.ocekivanja.replace(/\n/g, ' '),
                        'Standardni zadaci na času: ' + nivoi.srednji.zadaci,
                        'Podrška i praćenje: ' + nivoi.srednji.podrska,
                        '',
                        nivoi.napredni.oznaka,
                        'Očekivanja za učenika: ' + nivoi.napredni.ocekivanja.replace(/\n/g, ' '),
                        'Problemski i stvaralački zadaci: ' + nivoi.napredni.zadaci,
                        'Podrška i praćenje: ' + nivoi.napredni.podrska,
                      ].join('\n')
                    ),
                  ]
                : []),
              new Paragraph({
                spacing: { before: 480 },
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: preslovi('Potpis realizatora: ___________________________'),
                    size: 21,
                    font: 'Calibri',
                  }),
                ],
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const imeFajla = (jedinica.slug || 'nastavna-priprema') + '.docx';
      window.saveAs(blob, imeFajla);
      prikaziObavjestenje(preslovi('Word dokument (' + imeFajla + ') je uspješno preuzet!'));
      return;
    }

    // Rezervni mehanizam ako internet/CDN nije dostupan: provjeri fajl u fajlovi/
    if (jedinica.fajlDocx) {
      try {
        const odg = await fetch(jedinica.fajlDocx, { method: 'HEAD' });
        if (odg.ok && !(odg.headers.get('content-type') || '').includes('text/html')) {
          const a = document.createElement('a');
          a.href = jedinica.fajlDocx;
          a.download = '';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          prikaziObavjestenje(preslovi('Preuzimanje Word fajla je pokrenuto.'));
          return;
        }
      } catch (e) {}
    }

    prikaziObavjestenje(
      preslovi('Biblioteka za .docx zahtijeva internet vezu ili koristite opciju Odštampaj pripremu.')
    );
  };

  // ==========================================================================
  // AUTOMATSKI GENERATOR A4 RADNOG LISTIĆA ZA UČENIKE (I STATIČKI PDF AKO POSTOJI)
  // ==========================================================================
  function otvoriGeneratorRadnogListica(jedinica) {
    const prozor = window.open('', '_blank');
    if (!prozor) {
      prikaziObavjestenje(
        preslovi('Dozvolite otvaranje novog prozora u pregledaču kako biste odštampali radni listić.')
      );
      return;
    }

    const ishodiNiz = String(jedinica.ishodi || '')
      .split('\n')
      .map(function (s) {
        return s.replace(/^[-•*]\s*/, '').trim();
      })
      .filter(Boolean);

    const prviIshod = ishodiNiz[0] || jedinica.cilj || '';
    const drugiIshod = ishodiNiz[1] || jedinica.glavniDio || '';

    const htmlSadrzaj =
      '<!doctype html>' +
      '<html lang="sr">' +
      '<head>' +
      '<meta charset="UTF-8">' +
      '<title>' +
      escapeHtml(preslovi('Radni listić za učenike — ' + jedinica.naziv)) +
      '</title>' +
      '<style>' +
      '@page { size: A4 portrait; margin: 14mm 15mm; }' +
      '* { box-sizing: border-box; margin: 0; padding: 0; }' +
      'body { font-family: "Inter", "Segoe UI", Arial, sans-serif; color: #111; background: #f3f6f7; padding: 24px; line-height: 1.5; }' +
      '.toolbar { max-width: 210mm; margin: 0 auto 16px; display: flex; justify-content: space-between; align-items: center; gap: 12px; background: #0d6e6e; color: #fff; padding: 12px 18px; border-radius: 10px; }' +
      '.toolbar button { background: #fff; color: #0d6e6e; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 14px; }' +
      '.sheet { max-width: 210mm; margin: 0 auto; background: #fff; padding: 16mm; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0 6px 24px rgba(0,0,0,0.08); }' +
      '.header-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px; border: 2px solid #0d6e6e; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; font-size: 13.5px; }' +
      '.title-box { text-align: center; margin-bottom: 18px; padding-bottom: 10px; border-bottom: 2px solid #0d6e6e; }' +
      '.title-eyebrow { font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #0d6e6e; font-weight: 700; }' +
      '.title-main { font-size: 20px; font-weight: 800; margin-top: 4px; color: #111; }' +
      '.task { border: 1.5px solid #222; border-radius: 8px; padding: 12px 15px; margin-bottom: 14px; page-break-inside: avoid; }' +
      '.task-head { font-weight: 700; font-size: 14.5px; margin-bottom: 6px; color: #0d6e6e; }' +
      '.task-desc { font-size: 13.5px; margin-bottom: 10px; color: #222; }' +
      '.lines { display: flex; flex-direction: column; gap: 18px; padding-top: 8px; }' +
      '.line { border-bottom: 1px dotted #555; height: 18px; }' +
      '.draw-box { height: 115px; border: 1.5px dashed #777; border-radius: 6px; margin-top: 6px; display: flex; align-items: flex-end; justify-content: flex-end; padding: 6px 10px; font-size: 11px; color: #666; }' +
      '.self-eval { border: 1.5px solid #0d6e6e; border-radius: 8px; padding: 10px 14px; margin-top: 16px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; }' +
      '.eval-options { display: flex; gap: 18px; font-weight: 600; }' +
      '@media print { body { background: #fff; padding: 0; } .toolbar { display: none !important; } .sheet { border: none; box-shadow: none; padding: 0; max-width: none; } }' +
      '</style>' +
      '</head>' +
      '<body>' +
      '<div class="toolbar">' +
      '<span><strong>' +
      escapeHtml(preslovi('📝 Radni listić za učenike (A4 format spreman za štampu ili čuvanje u PDF)')) +
      '</strong></span>' +
      '<div style="display:flex;gap:8px">' +
      '<button onclick="window.print()">🖨 ' +
      escapeHtml(preslovi('Odštampaj / Sačuvaj kao PDF')) +
      '</button>' +
      '<button onclick="window.close()" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.5)">✕ ' +
      escapeHtml(preslovi('Zatvori')) +
      '</button>' +
      '</div>' +
      '</div>' +
      '<div class="sheet">' +
      '<div class="header-grid">' +
      '<div><strong>' +
      escapeHtml(preslovi('Ime i prezime učenika:')) +
      '</strong> ________________________</div>' +
      '<div><strong>' +
      escapeHtml(preslovi('Razred i odjeljenje:')) +
      '</strong> ' +
      escapeHtml(String(jedinica.razred)) +
      escapeHtml(preslovi('. razred (___)')) +
      '</div>' +
      '<div><strong>' +
      escapeHtml(preslovi('Nastavni predmet:')) +
      '</strong> ' +
      escapeHtml(preslovi(jedinica.predmet)) +
      '</div>' +
      '<div><strong>' +
      escapeHtml(preslovi('Datum:')) +
      '</strong> ___________________</div>' +
      '</div>' +
      '<div class="title-box">' +
      '<div class="title-eyebrow">' +
      escapeHtml(preslovi('RADNI LISTIĆ ZA UČENIKE · ' + jedinica.cjelina)) +
      '</div>' +
      '<div class="title-main">' +
      escapeHtml(preslovi(jedinica.naziv)) +
      '</div>' +
      '</div>' +
      '<div class="task">' +
      '<div class="task-head">' +
      escapeHtml(preslovi('1. zadatak — Razumijevanje ključnih pojmova')) +
      '</div>' +
      '<div class="task-desc">' +
      escapeHtml(
        preslovi(
          'Pažljivo pročitaj zadatak i svojim riječima odgovori ili dopuni rečenice u vezi sa temom „' +
            jedinica.naziv +
            '“ (' +
            prviIshod +
            '):'
        )
      ) +
      '</div>' +
      '<div class="lines"><div class="line"></div><div class="line"></div><div class="line"></div></div>' +
      '</div>' +
      '<div class="task">' +
      '<div class="task-head">' +
      escapeHtml(preslovi('2. zadatak — Primjena stečenog znanja u praksi')) +
      '</div>' +
      '<div class="task-desc">' +
      escapeHtml(
        preslovi(
          'Riješi zadatak ili navedi dva konkretna primjera koji pokazuju kako primjenjujemo naučeno (' +
            drugiIshod +
            '):'
        )
      ) +
      '</div>' +
      '<div class="lines"><div class="line"></div><div class="line"></div><div class="line"></div></div>' +
      '</div>' +
      '<div class="task">' +
      '<div class="task-head">' +
      escapeHtml(preslovi('3. zadatak — Ilustracija, šema ili postupak rješavanja')) +
      '</div>' +
      '<div class="task-desc">' +
      escapeHtml(
        preslovi(
          'U okviru ispod nacrtaj ilustraciju, šemu, tabelu ili prikaži postupak rješavanja zadatka sa časa:'
        )
      ) +
      '</div>' +
      '<div class="draw-box">' +
      escapeHtml(preslovi('Prostor za crtanje, šemu ili račun')) +
      '</div>' +
      '</div>' +
      '<div class="task">' +
      '<div class="task-head">' +
      escapeHtml(preslovi('4. zadatak — Zaključak i provjera (' + jedinica.tipCasa + ')')) +
      '</div>' +
      '<div class="task-desc">' +
      escapeHtml(
        preslovi(
          'Napiši šta ti je na današnjem času bilo najzanimljivije i formuliši jedno pitanje za druga ili drugaricu iz klupe:'
        )
      ) +
      '</div>' +
      '<div class="lines"><div class="line"></div><div class="line"></div></div>' +
      '</div>' +
      '<div class="self-eval">' +
      '<strong>' +
      escapeHtml(preslovi('Samoprocjena učenika (zaokruži):')) +
      '</strong>' +
      '<div class="eval-options">' +
      '<span>😊 ' +
      escapeHtml(preslovi('Sve razumijem')) +
      '</span>' +
      '<span>🤔 ' +
      escapeHtml(preslovi('Treba mi još malo vježbe')) +
      '</span>' +
      '<span>🙋 ' +
      escapeHtml(preslovi('Treba mi pomoć')) +
      '</span>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</body>' +
      '</html>';

    prozor.document.open();
    prozor.document.write(htmlSadrzaj);
    prozor.document.close();
    prikaziObavjestenje(preslovi('Otvoren je A4 radni listić za učenike spreman za štampu!'));
  }

  // Provjera i preuzimanje Radnog listića (.pdf) ili otvaranje A4 generatora radnog listića
  async function preuzmiRadniListicPdf(jedinica) {
    if (!jedinica) return;
    const putanjaPdf = jedinica.fajlPdf;

    if (putanjaPdf) {
      try {
        const odgovor = await fetch(putanjaPdf, { method: 'HEAD' });
        const tipSadrzaja = odgovor.headers.get('content-type') || '';
        if (odgovor.ok && !tipSadrzaja.includes('text/html')) {
          const link = document.createElement('a');
          link.href = putanjaPdf;
          link.target = '_blank';
          link.rel = 'noopener';
          link.download = putanjaPdf.split('/').pop() || 'radni-listic.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          prikaziObavjestenje(preslovi('Preuzimanje radnog listića (.pdf) je pokrenuto!'));
          return;
        }
      } catch (err) {}
    }

    // Ako statički PDF nije u folderu fajlovi/, automatski generiši A4 radni listić za učenike
    otvoriGeneratorRadnogListica(jedinica);
  }

  // Inicijalizacija događaja (Event Listeners)
  function inicijalizujDogadjaje() {
    // Godina u podnožju
    const elGodina = document.getElementById('trenutnaGodina');
    if (elGodina) elGodina.textContent = String(new Date().getFullYear());

    azurirajDugmadPisma();
    azurirajBrojacSacuvanih();

    // Preklopnik pisma (Latinica / Ćirilica)
    if (elDugmePismo) {
      elDugmePismo.addEventListener('click', promijeniPismo);
    }
    if (elAkcijaPismoModal) {
      elAkcijaPismoModal.addEventListener('click', promijeniPismo);
    }

    // Preklopnik teme (svijetla / tamna)
    const elDugmeTema = document.getElementById('dugmeTema');
    if (elDugmeTema) {
      elDugmeTema.addEventListener('click', function () {
        const trenutna = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
        const nova = trenutna === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = nova;
        try {
          localStorage.setItem('theme', nova);
        } catch (e) {}
      });
    }

    // Čuvanje izmjena zaglavlja škole i učitelja u localStorage
    if (elMetaSkola) {
      elMetaSkola.addEventListener('focus', function () {
        if (elMetaSkola.textContent.indexOf('___') !== -1) {
          elMetaSkola.textContent = elMetaSkola.textContent.replace(/_+/g, '').trim();
        }
      });
      elMetaSkola.addEventListener('blur', function () {
        const vr = elMetaSkola.textContent.replace(/_+/g, '').trim();
        elMetaSkola.textContent = vr;
        try {
          if (vr) {
            localStorage.setItem('pripreme_meta_skola', vr);
          } else {
            localStorage.removeItem('pripreme_meta_skola');
          }
        } catch (e) {}
      });
    }
    if (elMetaUcitelj) {
      elMetaUcitelj.addEventListener('focus', function () {
        if (elMetaUcitelj.textContent.indexOf('___') !== -1) {
          elMetaUcitelj.textContent = elMetaUcitelj.textContent.replace(/_+/g, '').trim();
        }
      });
      elMetaUcitelj.addEventListener('blur', function () {
        const vr = elMetaUcitelj.textContent.replace(/_+/g, '').trim();
        elMetaUcitelj.textContent = vr;
        try {
          if (vr) {
            localStorage.setItem('pripreme_meta_ucitelj', vr);
          } else {
            localStorage.removeItem('pripreme_meta_ucitelj');
          }
        } catch (e) {}
      });
    }

    // Tekstualna pretraga u realnom vremenu
    if (elPoljePretraga) {
      elPoljePretraga.addEventListener('input', function (e) {
        stanjeFiltera.pretraga = e.target.value || '';
        trenutniLimit = KORAK_PRIKAZA;
        if (elObrisiPretragu) {
          elObrisiPretragu.classList.toggle('visible', stanjeFiltera.pretraga.length > 0);
        }
        prikaziKartice();
      });
    }

    if (elObrisiPretragu) {
      elObrisiPretragu.addEventListener('click', function () {
        stanjeFiltera.pretraga = '';
        trenutniLimit = KORAK_PRIKAZA;
        if (elPoljePretraga) {
          elPoljePretraga.value = '';
          elPoljePretraga.focus();
        }
        elObrisiPretragu.classList.remove('visible');
        prikaziKartice();
      });
    }

    // Filter za sistem (RS / FBiH)
    if (elFilterSistem) {
      const promjenaSistema = function (e) {
        stanjeFiltera.sistem = e.target.value;
        trenutniLimit = KORAK_PRIKAZA;
        prikaziKartice();
      };
      elFilterSistem.addEventListener('change', promjenaSistema);
      elFilterSistem.addEventListener('input', promjenaSistema);
    }

    // Filter za razred (dugmad / pilule)
    if (elGrupaRazreda) {
      elGrupaRazreda.addEventListener('click', function (e) {
        const dugme = e.target.closest('.pill-btn');
        if (!dugme) return;
        const odabraniRazred = dugme.getAttribute('data-razred') || 'Svi';
        stanjeFiltera.razred = odabraniRazred;
        trenutniLimit = KORAK_PRIKAZA;

        elGrupaRazreda.querySelectorAll('.pill-btn').forEach(function (d) {
          d.classList.toggle('active', d === dugme);
        });
        prikaziKartice();
      });
    }

    // Filter za predmet
    if (elFilterPredmet) {
      elFilterPredmet.addEventListener('change', function (e) {
        stanjeFiltera.predmet = e.target.value;
        trenutniLimit = KORAK_PRIKAZA;
        prikaziKartice();
      });
    }

    // Filter za tip časa
    if (elFilterTipCasa) {
      elFilterTipCasa.addEventListener('change', function (e) {
        stanjeFiltera.tipCasa = e.target.value;
        trenutniLimit = KORAK_PRIKAZA;
        prikaziKartice();
      });
    }

    // Filter za sačuvane pripreme (⭐)
    if (elDugmeFilterSacuvane) {
      elDugmeFilterSacuvane.addEventListener('click', function () {
        stanjeFiltera.samoSacuvane = !stanjeFiltera.samoSacuvane;
        trenutniLimit = KORAK_PRIKAZA;
        azurirajBrojacSacuvanih();
        prikaziKartice();
      });
    }

    // Paginacija: Prikaži još (+36) i Prikaži sve
    if (elDugmeUcitajJos) {
      elDugmeUcitajJos.addEventListener('click', function () {
        trenutniLimit += KORAK_PRIKAZA;
        prikaziKartice();
      });
    }
    if (elDugmePrikaziSve) {
      elDugmePrikaziSve.addEventListener('click', function () {
        trenutniLimit = 999999;
        prikaziKartice();
      });
    }

    // Reset filtera
    if (elDugmeResetuj) {
      elDugmeResetuj.addEventListener('click', resetujFiltere);
    }
    if (elDugmeResetujPrazno) {
      elDugmeResetujPrazno.addEventListener('click', resetujFiltere);
    }

    // Klik ili Enter na karticu pripreme (ili klik na zvjezdicu ili na CTA za 3 nivoa)
    if (elMrezaKartica) {
      elMrezaKartica.addEventListener('click', function (e) {
        const dugmeZvjezdica = e.target.closest('.card-star-btn');
        if (dugmeZvjezdica) {
          e.stopPropagation();
          const starSlug = dugmeZvjezdica.getAttribute('data-star-slug');
          if (starSlug) prebaciSacuvanu(starSlug);
          return;
        }

        const dugmeTriNivoaKartica = e.target.closest('.btn-card-levels');
        if (dugmeTriNivoaKartica) {
          e.stopPropagation();
          const levelsSlug = dugmeTriNivoaKartica.getAttribute('data-levels-slug');
          if (levelsSlug) {
            triNivoaAktivno = true;
            otvoriModalPoSlugu(levelsSlug, true);
            if (trenutnoOtvorenaJedinica) {
              prikaziSekcijuTriNivoa(trenutnoOtvorenaJedinica, true);
            }
          }
          return;
        }

        const kartica = e.target.closest('.lesson-card');
        if (!kartica) return;
        const slug = kartica.getAttribute('data-slug');
        if (slug) otvoriModalPoSlugu(slug, true);
      });

      elMrezaKartica.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.closest('.card-star-btn')) return;
          const kartica = e.target.closest('.lesson-card');
          if (!kartica) return;
          e.preventDefault();
          const slug = kartica.getAttribute('data-slug');
          if (slug) otvoriModalPoSlugu(slug, true);
        }
      });
    }

    // Zatvaranje modala
    if (elDugmeZatvoriModal) {
      elDugmeZatvoriModal.addEventListener('click', function () {
        zatvoriModal(true);
      });
    }

    if (elModalPozadina) {
      elModalPozadina.addEventListener('click', function (e) {
        if (e.target === elModalPozadina) {
          zatvoriModal(true);
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && elModalPozadina && !elModalPozadina.hidden) {
        zatvoriModal(true);
      }
    });

    // Akcije u modalu:
    // 1. Kopiraj za e-Dnevnik
    if (elAkcijaKopirajEDnevnik) {
      elAkcijaKopirajEDnevnik.addEventListener('click', function () {
        if (!trenutnoOtvorenaJedinica) return;
        const tekst = sastaviTekstZaEDnevnik(trenutnoOtvorenaJedinica);
        kopirajUClipboard(tekst, function (uspjesno) {
          if (uspjesno) {
            const izvorniTekst = elAkcijaKopirajEDnevnik.textContent;
            elAkcijaKopirajEDnevnik.textContent = preslovi('✓ Kopirano!');
            prikaziObavjestenje(
              preslovi('Kopirano! Sadržaj pripreme je spreman za lijepljenje u e-Dnevnik.')
            );
            setTimeout(function () {
              elAkcijaKopirajEDnevnik.textContent = izvorniTekst;
            }, 2200);
          } else {
            prikaziObavjestenje(preslovi('Kopiranje nije uspjelo. Pokušajte ručno označiti tekst.'));
          }
        });
      });
    }

    // 2. Kopiraj direktan link
    if (elAkcijaKopirajLink) {
      elAkcijaKopirajLink.addEventListener('click', function () {
        if (!trenutnoOtvorenaJedinica) return;
        const url =
          window.location.origin +
          window.location.pathname +
          '#priprema=' +
          encodeURIComponent(trenutnoOtvorenaJedinica.slug);
        kopirajUClipboard(url, function (uspjesno) {
          if (uspjesno) {
            const izvorniTekst = elAkcijaKopirajLink.textContent;
            elAkcijaKopirajLink.textContent = preslovi('✓ Link kopiran!');
            prikaziObavjestenje(
              preslovi('Direktan link do ove pripreme je kopiran u privremenu memoriju!')
            );
            setTimeout(function () {
              elAkcijaKopirajLink.textContent = izvorniTekst;
            }, 2200);
          }
        });
      });
    }

    // 3. Odštampaj pripremu (A4)
    if (elAkcijaStampa) {
      elAkcijaStampa.addEventListener('click', function () {
        window.print();
      });
    }

    // 4. Preuzmi Word (.docx)
    if (elAkcijaPreuzmiDocx) {
      elAkcijaPreuzmiDocx.addEventListener('click', function () {
        if (!trenutnoOtvorenaJedinica) return;
        window.generisiDocxPripremu(trenutnoOtvorenaJedinica);
      });
    }

    // 5. Radni listić za učenike (A4 / PDF)
    if (elAkcijaPreuzmiPdf) {
      elAkcijaPreuzmiPdf.addEventListener('click', function () {
        if (!trenutnoOtvorenaJedinica) return;
        preuzmiRadniListicPdf(trenutnoOtvorenaJedinica);
      });
    }

    // 6. Sačuvaj u omiljene iz modala
    if (elAkcijaSacuvaj) {
      elAkcijaSacuvaj.addEventListener('click', function () {
        if (!trenutnoOtvorenaJedinica) return;
        prebaciSacuvanu(trenutnoOtvorenaJedinica.slug);
      });
    }

    // 7. Kreiraj diferenciranu pripremu za 3 nivoa učenika (dugme u traci sa akcijama i u CTA baneru)
    if (elAkcijaTriNivoa) {
      elAkcijaTriNivoa.addEventListener('click', function () {
        if (!trenutnoOtvorenaJedinica) return;
        prikaziSekcijuTriNivoa(trenutnoOtvorenaJedinica, true);
      });
    }
    if (elDugmeGenerisiTriNivoa) {
      elDugmeGenerisiTriNivoa.addEventListener('click', function () {
        if (!trenutnoOtvorenaJedinica) return;
        prikaziSekcijuTriNivoa(trenutnoOtvorenaJedinica, true);
      });
    }

    // Praćenje promjene URL hash-a
    window.addEventListener('hashchange', provjeriUrlHash);
  }

  // Pokretanje pri učitavanju stranice
  if (elMrezaKartica) {
    procitajUrlParametre();
    inicijalizujDogadjaje();
    prikaziKartice();
    provjeriUrlHash();
  }
})();
