/**
 * Glavna aplikaciona logika za biblioteku nastavnih priprema (pripreme/app.js)
 * - Filtriranje u realnom vremenu i pretraga bez obzira na dijakritičke znakove (č, ć, ž, š, đ)
 * - Prikaz kartica i detaljnog modala
 * - URL Hash podrška (#priprema=<slug>) za direktno dijeljenje linka
 * - Kopiranje za e-Dnevnik, A4 štampa i generisanje/preuzimanje .docx i .pdf fajlova
 */

(function () {
  'use strict';

  // Stanje aktivnih filtera
  const stanjeFiltera = {
    pretraga: '',
    sistem: 'Svi',
    razred: 'Svi',
    predmet: 'Svi',
    tipCasa: 'Svi',
  };

  let trenutnoOtvorenaJedinica = null;

  // DOM elementi
  const elMrezaKartica = document.getElementById('mrezaKartica');
  const elPraznoStanje = document.getElementById('praznoStanje');
  const elBrojacRezultata = document.getElementById('brojacRezultata');
  const elStatUkupno = document.getElementById('statUkupno');

  const elPoljePretraga = document.getElementById('poljePretraga');
  const elObrisiPretragu = document.getElementById('obrisiPretragu');
  const elFilterSistem = document.getElementById('filterSistem');
  const elGrupaRazreda = document.getElementById('grupaRazreda');
  const elFilterPredmet = document.getElementById('filterPredmet');
  const elFilterTipCasa = document.getElementById('filterTipCasa');
  const elDugmeResetuj = document.getElementById('dugmeResetujFiltere');
  const elDugmeResetujPrazno = document.getElementById('dugmeResetujPrazno');

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
  const elAkcijaKopirajLink = document.getElementById('akcijaKopirajLink');
  const elAkcijaStampa = document.getElementById('akcijaStampa');
  const elAkcijaPreuzmiDocx = document.getElementById('akcijaPreuzmiDocx');
  const elAkcijaPreuzmiPdf = document.getElementById('akcijaPreuzmiPdf');

  // Pomoćna funkcija za normalizaciju teksta (uklanja kvačice radi lakše pretrage)
  function normalizujTekst(tekst) {
    if (!tekst) return '';
    return String(tekst)
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
        if (norm === 'RS' || norm.includes('SRPSKA') || norm.includes('RPZ')) return 'Republika Srpska (RPZ)';
        if (norm === 'FBIH' || norm.includes('FEDERACIJA') || norm.includes('ZJNPP')) return 'Federacija BiH (ZJNPP)';
        return s;
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
          return '<span class="badge badge-system-rs">RS (RPZ)</span>';
        }
        if (norm === 'FBIH' || norm.includes('FEDERACIJA') || norm.includes('ZJNPP')) {
          return '<span class="badge badge-system-fbih">FBiH (ZJNPP)</span>';
        }
        return '<span class="badge badge-system">' + escapeHtml(s) + '</span>';
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

  // Iscrtavanje kartica u mreži
  function prikaziKartice() {
    if (!elMrezaKartica) return;

    const ukupno = typeof nastavneJedinice !== 'undefined' ? nastavneJedinice.length : 0;
    if (elStatUkupno) elStatUkupno.textContent = String(ukupno);

    const filtrirane = filtrirajJedinice();

    if (elBrojacRezultata) {
      let dodatakSistem = '';
      if (stanjeFiltera.sistem === 'RS') {
        dodatakSistem = ' · Sistem: <strong>Republika Srpska (RPZ)</strong>';
      } else if (stanjeFiltera.sistem === 'FBiH') {
        dodatakSistem = ' · Sistem: <strong>Federacija BiH (ZJNPP)</strong>';
      }
      elBrojacRezultata.innerHTML =
        'Prikazano <strong>' +
        filtrirane.length +
        '</strong> od <strong>' +
        ukupno +
        '</strong> priprema' +
        dodatakSistem;
    }

    if (filtrirane.length === 0) {
      elMrezaKartica.innerHTML = '';
      if (elPraznoStanje) elPraznoStanje.hidden = false;
      return;
    }

    if (elPraznoStanje) elPraznoStanje.hidden = true;

    elMrezaKartica.innerHTML = filtrirane
      .map(function (jedinica) {
        const klasaTipa = klasaZaTipCasa(jedinica.tipCasa);
        const bedzeviSistemaHtml = kreirajBedzeveSistema(jedinica.sistem);

        return (
          '<article class="lesson-card" tabindex="0" role="button" data-slug="' +
          escapeHtml(jedinica.slug) +
          '" aria-label="Otvori pripremu: ' +
          escapeHtml(jedinica.naziv) +
          '">' +
          '<div>' +
          '<div class="card-badges">' +
          '<span class="badge badge-grade">' +
          escapeHtml(jedinica.razred) +
          '. razred</span>' +
          '<span class="badge badge-subject">' +
          escapeHtml(jedinica.predmet) +
          '</span>' +
          '<span class="badge ' +
          klasaTipa +
          '">' +
          escapeHtml(jedinica.tipCasa) +
          '</span>' +
          bedzeviSistemaHtml +
          '</div>' +
          '<p class="card-unit">' +
          escapeHtml(jedinica.cjelina) +
          '</p>' +
          '<h2 class="card-title">' +
          escapeHtml(jedinica.naziv) +
          '</h2>' +
          '<p class="card-goal">' +
          escapeHtml(jedinica.cilj) +
          '</p>' +
          '</div>' +
          '<div class="card-footer">' +
          '<span class="card-meta">📋 e-Dnevnik · 🖨 A4 · ⬇ DOCX</span>' +
          '<span class="card-open-label">Otvori pripremu →</span>' +
          '</div>' +
          '</article>'
        );
      })
      .join('');
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
      '. razred</span>' +
      '<span class="badge badge-subject">' +
      escapeHtml(jedinica.predmet) +
      '</span>' +
      '<span class="badge ' +
      klasaTipa +
      '">' +
      escapeHtml(jedinica.tipCasa) +
      '</span>' +
      bedzeviSistemaHtml;

    // Popunjavanje zaglavlja za štampu
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
    if (elMetaRazredOdjeljenje) {
      elMetaRazredOdjeljenje.textContent = jedinica.razred + '. razred (odjeljenje: ___)';
    }

    elModalPredmet.textContent = jedinica.predmet;
    elModalSistem.textContent = oznakaSistema;
    elModalCjelina.textContent = jedinica.cjelina;
    elModalNaslov.textContent = jedinica.naziv;
    elModalTipCasa.textContent = jedinica.tipCasa;
    elModalMetode.textContent = jedinica.metodeOblici;
    elModalKorelacija.textContent = jedinica.korelacija || 'Unutarpredmetna i međupredmetna korelacija';
    elModalCilj.textContent = jedinica.cilj;
    elModalIshodi.textContent = jedinica.ishodi;
    elModalUvodni.textContent = jedinica.uvodniDio;
    elModalGlavni.textContent = jedinica.glavniDio;
    elModalZavrsni.textContent = jedinica.zavrsniDio;

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

  // Sastavljanje teksta pripreme za e-Dnevnik
  function sastaviTekstZaEDnevnik(jedinica) {
    return [
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
    ].join('\n');
  }

  // Generisanje .docx dokumenta direktno u browseru pomoću `docx` biblioteke
  window.generisiDocxPripremu = async function (jedinica, zaglavljeOpcije) {
    const opcije = zaglavljeOpcije || {};
    const nazivSkole = opcije.skola || (elMetaSkola ? elMetaSkola.textContent.trim() : '________________________________');
    const imeUcitelja =
      opcije.ucitelj || (elMetaUcitelj ? elMetaUcitelj.textContent.trim() : '________________________________');
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
                  children: [new TextRun({ text: oznaka, bold: true, size: 21, font: 'Calibri' })],
                }),
              ],
            }),
            new TableCell({
              width: { size: 68, type: WidthType.PERCENTAGE },
              borders: okvirTabele,
              children: [
                new Paragraph({
                  children: [new TextRun({ text: String(vrijednost || ''), size: 21, font: 'Calibri' })],
                }),
              ],
            }),
          ],
        });
      }

      function napraviSekcijuPasusa(naslovSekcije, tekstSekcije) {
        const linije = String(tekstSekcije || '').split('\n');
        const pasusi = [
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 100 },
            children: [
              new TextRun({
                text: naslovSekcije,
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

      const oznakaSistema = Array.isArray(jedinica.sistem) ? jedinica.sistem.join(' / ') : String(jedinica.sistem || '');

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
                    text: 'PISMENA PRIPREMA ZA REALIZACIJU NASTAVNOG ČASA',
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
              new Paragraph({
                spacing: { before: 480 },
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'Potpis realizatora: ___________________________',
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
      prikaziObavjestenje('Word dokument (' + imeFajla + ') je uspješno preuzet!');
      return;
    }

    // Rezervni mehanizam ako internet/CDN nije dostupan: provjeri fajl u fajlovi/ ili preuzmi Word-kompatibilan dokument
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
          prikaziObavjestenje('Preuzimanje Word fajla je pokrenuto.');
          return;
        }
      } catch (e) {}
    }

    prikaziObavjestenje('Biblioteka za .docx zahtijeva internet vezu ili koristite opciju Odštampaj pripremu.');
  };

  // Provjera i preuzimanje Radnog listića (.pdf) bez 404 greške
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
          prikaziObavjestenje('Preuzimanje radnog listića (.pdf) je pokrenuto!');
          return;
        }
      } catch (err) {
        // Ako se otvara direktno preko file:// protokola ili fajl još ne postoji
      }
    }

    prikaziObavjestenje(
      'ℹ️ Radni listić (' +
        (putanjaPdf || 'PDF') +
        ') još nije postavljen u folder fajlovi/. Možete odštampati pripremu pomoću dugmeta „Odštampaj pripremu“.'
    );
  }

  // Inicijalizacija događaja (Event Listeners)
  function inicijalizujDogadjaje() {
    // Godina u podnožju
    const elGodina = document.getElementById('trenutnaGodina');
    if (elGodina) elGodina.textContent = String(new Date().getFullYear());

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

    // Tekstualna pretraga u realnom vremenu
    if (elPoljePretraga) {
      elPoljePretraga.addEventListener('input', function (e) {
        stanjeFiltera.pretraga = e.target.value || '';
        if (elObrisiPretragu) {
          elObrisiPretragu.classList.toggle('visible', stanjeFiltera.pretraga.length > 0);
        }
        prikaziKartice();
      });
    }

    if (elObrisiPretragu) {
      elObrisiPretragu.addEventListener('click', function () {
        stanjeFiltera.pretraga = '';
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
        prikaziKartice();
      });
    }

    // Filter za tip časa
    if (elFilterTipCasa) {
      elFilterTipCasa.addEventListener('change', function (e) {
        stanjeFiltera.tipCasa = e.target.value;
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

    // Klik ili Enter na karticu pripreme
    if (elMrezaKartica) {
      elMrezaKartica.addEventListener('click', function (e) {
        const kartica = e.target.closest('.lesson-card');
        if (!kartica) return;
        const slug = kartica.getAttribute('data-slug');
        if (slug) otvoriModalPoSlugu(slug, true);
      });

      elMrezaKartica.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
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
            elAkcijaKopirajEDnevnik.textContent = '✓ Kopirano!';
            prikaziObavjestenje('Kopirano! Sadržaj pripreme je spreman za lijepljenje u e-Dnevnik.');
            setTimeout(function () {
              elAkcijaKopirajEDnevnik.textContent = izvorniTekst;
            }, 2200);
          } else {
            prikaziObavjestenje('Kopiranje nije uspjelo. Pokušajte ručno označiti tekst.');
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
            elAkcijaKopirajLink.textContent = '✓ Link kopiran!';
            prikaziObavjestenje('Direktan link do ove pripreme je kopiran u privremenu memoriju!');
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

    // 5. Preuzmi Radni listić (.pdf)
    if (elAkcijaPreuzmiPdf) {
      elAkcijaPreuzmiPdf.addEventListener('click', function () {
        if (!trenutnoOtvorenaJedinica) return;
        preuzmiRadniListicPdf(trenutnoOtvorenaJedinica);
      });
    }

    // Praćenje promjene URL hash-a
    window.addEventListener('hashchange', provjeriUrlHash);
  }

  // Pokretanje pri učitavanju stranice
  if (elMrezaKartica) {
    inicijalizujDogadjaje();
    prikaziKartice();
    provjeriUrlHash();
  }
})();

