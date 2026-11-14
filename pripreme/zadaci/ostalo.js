/**
 * Likovna kultura, Muzička kultura i Tjelesni i zdravstveni odgoj.
 * Ovdje su zadaci praktični (rad, pjevanje, vježba), pa se biraju po vrsti aktivnosti iz naziva časa.
 */
(function (B) {
  'use strict';

  function naslov(naziv) {
    const n = naziv.match(/„[^“”]+[“”]/g) || [];
    return n.length ? n.slice(0, 2).join(' ili ') : '';
  }

  // Likovni problem: dio naziva prije motiva u navodnicima („Osnovne boje (crvena, žuta, plava)“).
  function likovniProblem(naziv) {
    return naziv.split('„')[0].replace(/[\s–:-]+$/, '').trim();
  }

  B.dodaj('likovna', [
    {
      id: 'l-izlozba', t: /sistematizacija|izlo.ba/i,
      o: ['Izaberi svoj najljepši rad iz ove godine.', 'Potpiši rad: ime, prezime i naziv rada.'],
      s: ['Napiši uz rad koju si tehniku koristio/la.', 'Pomozi da se radovi lijepo poredaju na izložbi.'],
      n: ['Predstavi svoj rad posjetiocima izložbe u 2–3 rečenice.', 'Izaberi rad druga koji ti se dopada i reci zašto.'],
    },
    {
      id: 'l-rad',
      f: (m, j, r) => {
        const motiv = naslov(j.naziv) || 'sa časa';
        const problem = likovniProblem(j.naziv);
        return {
          o: [(r <= 2 ? 'Nacrtaj, naslikaj ili oblikuj motiv ' : 'Uradi rad na motiv ') + motiv + ' prema uputstvu učitelja.', 'Koristi materijal sa časa i popuni cijeli papir (ili cijeli oblik).'],
          s: ['Primijeni u svom radu ono što smo učili: ' + problem + '.', 'Dovrši rad sa detaljima i potpiši ga.'],
          n: r <= 2
            ? ['Reci razredu šta si napravio/la i šta ti se na radu najviše dopada.', 'Pronađi na radu druga jednu stvar koja ti se dopada i reci zašto.']
            : ['Napiši 2–3 rečenice o svom radu: šta prikazuje, koju tehniku si koristio/la i šta je bilo najteže.', 'Uporedi svoj rad sa radom druga: po čemu se razlikuju?'],
        };
      },
    },
  ]);

  B.dodaj('muzicka', [
    {
      id: 'mu-linijski', t: /linijski sistem/i,
      o: ['Nacrtaj linijski sistem (5 linija) i violinski ključ.', 'Koliko linija i koliko praznina ima linijski sistem?  [[! 5 linija i 4 praznine]]'],
      s: ['Upiši note DO, MI i SOL u linijski sistem.', 'Pokaži na notnom primjeru gdje je violinski ključ.'],
      n: ['Napiši u linijski sistem prvih nekoliko nota poznate pjesme.', 'Zašto se violinski ključ zove i G-ključ?  [[! počinje na liniji tona G (sol)]]'],
    },
    {
      id: 'mu-trajanje', t: /trajanje (tonova|nota)/i,
      o: ['Nacrtaj polovinu, četvrtinu i osminu note.', 'Koja nota traje duže: polovina ili četvrtina?  [[! polovina]]'],
      s: ['Koliko četvrtina traje jedna polovina?  [[! 2]]', 'Otpljeskaj ritam: četvrtina, četvrtina, polovina.'],
      n: ['Napiši ritam od 4 dobe sa četvrtinama i osminama i otpljeskaj ga.', 'Nacrtaj pauzu za četvrtinu i pauzu za polovinu.'],
    },
    {
      id: 'mu-ljestvica', t: /ljestvic/i,
      o: ['Napiši tonove C-dur ljestvice solmizacijom.  [[! do, re, mi, fa, sol, la, si, do]]', 'Otpjevaj C-dur ljestvicu uzlazno.'],
      s: ['Otpjevaj C-dur ljestvicu uzlazno i silazno.', 'Napiši abecedne nazive tonova C-dur ljestvice.  [[! c, d, e, f, g, a, h, c]]'],
      n: ['Koja je razlika između dur i mol ljestvice po zvuku?  [[! dur zvuči vedro, mol tužnije]]', 'Upiši C-dur ljestvicu u linijski sistem.'],
    },
    {
      id: 'mu-takt', t: /vrste taktova|ritam i takt/i,
      o: ['Koliko četvrtina ima u taktu 3/4?  [[! 3]]', 'Taktiraj rukom dvodijelni takt.'],
      s: ['Taktiraj dvodijelni i trodijelni takt dok pjevaš poznatu pjesmu.', 'Koliko osmina stane u takt 2/4?  [[! 4]]'],
      n: ['Napiši jedan takt 4/4 sa različitim notama.', 'Koji takt ima valcer: 2/4 ili 3/4?  [[! 3/4]]'],
    },
    {
      id: 'mu-dinamika-tempo', t: /tempo|dinamik/i,
      o: ['Otpjevaj poznatu pjesmu glasno, pa tiho.', 'Kucaj dobu brzo, pa sporo.'],
      s: ['Šta znače oznake p i f?  [[! p (piano) — tiho, f (forte) — glasno]]', 'Kakav je tempo kompozicije koju slušamo: brz, umjeren ili spor?'],
      n: ['Izvedi brojalicu tako da postepeno postaje sve glasnija (crescendo).', 'Smisli kako bi muzikom prikazao/la oluju, a kako miran dan.'],
    },
    {
      id: 'mu-solmizacija', t: /po notnom tekstu|solmizacij/i,
      o: ['Otpjevaj tonove DO, RE, MI, FA, SOL.', 'Pjevaj pjesmu po notama uz pomoć učitelja.'],
      s: ['Otpjevaj prvi red pjesme po notama samostalno.', 'Pokaži rukom visinu tonova dok pjevaš.'],
      n: ['Napiši note prvog takta pjesme u linijski sistem.', 'Otpjevaj pjesmu po notama i taktiraj.'],
    },
    {
      id: 'mu-koncert', t: /koncert|kviz|sistematizacija/i,
      o: ['Otpjevaj svoju omiljenu pjesmu iz ove godine.', 'Prepoznaj pjesmu po melodiji.'],
      s: ['Prepoznaj 3 pjesme ili kompozicije po melodiji i napiši njihove nazive.', 'Pripremi sa grupom jednu pjesmu za koncert.'],
      n: ['Pripremi nastup za koncert: pjevanje ili sviranje uz pratnju.', 'Najavi jednu tačku koncerta (naziv pjesme i izvođači).'],
    },
    {
      id: 'mu-narodna', t: /narodn/i,
      o: ['Nauči korake narodnog kola i igraj sa razredom.', 'Otpjevaj jednu narodnu dječiju pjesmu.'],
      s: ['Navedi jedan tradicionalni instrument.  [[! npr. frula, tamburica, gusle, šargija]]', 'Otpjevaj narodnu pjesmu i prati se pljeskanjem.'],
      n: ['Pitaj baku ili djeda za jednu narodnu pjesmu i zapiši njen naslov.', 'Uporedi narodnu i umjetničku pjesmu: po čemu se razlikuju?'],
    },
    {
      id: 'mu-brojalica', t: /brojalic|ritam/i,
      f: (m, j) => {
        const t = naslov(j.naziv);
        return {
          o: ['Izgovaraj brojalicu ' + (t || 'sa časa') + ' i kucaj dobu rukom.', 'Izgovaraj brojalicu zajedno sa razredom.'],
          s: ['Kucaj ritam riječi štapićima dok izgovaraš brojalicu.', 'Izgovori brojalicu samostalno.'],
          n: ['Smisli svoju brojalicu od 4 stiha i izvedi je.', 'Izvedi brojalicu tako da jedna grupa kuca dobu, a druga ritam.'],
        };
      },
    },
    {
      id: 'mu-instrumenti', t: /prepoznavanje muzi.kih instrumen|upoznavanje instrumen|gudački i duvački|orkest|ansambl|glasovi u horu|sviranje na orfovom/i,
      o: ['Nacrtaj instrument koji ti se najviše dopada i napiši njegov naziv.', 'Prepoznaj po zvuku jedan instrument koji pušta učitelj.'],
      s: ['Razvrstaj: violina, truba, bubanj, flauta → gudački / duvački / udaraljke  [[! gudački: violina; duvački: truba, flauta; udaraljke: bubanj]]', 'Napiši naziv kompozicije koju smo slušali i ime kompozitora.'],
      n: ['Koji instrument bi ti izabrao/la da predstavlja tebe? Objasni.', 'Odsviraj kratak ritam na udaraljkama.'],
    },
    {
      id: 'mu-stvaralastvo', t: /stvarala.tv|improvizacij|komponovan/i,
      o: ['Otpljeskaj ritam svog imena.', 'Smisli ritam od 4 dobe i otpljeskaj ga.'],
      s: ['Smisli melodiju za dva stiha i otpjevaj je.', 'Ozvuči kratku priču udaraljkama (vjetar, koraci, kiša).'],
      n: ['Komponuj kratku melodiju i zapiši je notama ili crtežom.', 'Izvedi svoju melodiju pred razredom.'],
    },
    {
      id: 'mu-zvukovi', t: /zvukovi/i,
      o: ['Oponašaj visok i nizak zvuk glasom.', 'Kucni tiho, pa glasno po klupi.'],
      s: ['Razvrstaj glasove: ptica, medvjed → visok / nizak  [[! ptica visok, medvjed nizak]]', 'Nađi u učionici predmet koji daje dug zvuk i predmet koji daje kratak zvuk.'],
      n: ['Napravi „orkestar“ od predmeta iz učionice sa drugovima.', 'Zatvori oči i prepoznaj 3 zvuka iz okoline.'],
    },
    {
      id: 'mu-pjesma',
      f: (m, j) => {
        const t = naslov(j.naziv);
        const pjesma = t ? 'pjesmu ' + t : 'pjesmu sa časa';
        if (/slu.anj|slu.aj/i.test(j.naziv)) {
          return {
            o: ['Slušaj ' + (t ? 'kompoziciju ' + t : 'kompoziciju sa časa') + ' i nacrtaj šta zamišljaš.', 'Da li je muzika vesela ili tužna?'],
            s: ['Kakav je tempo (brz ili spor) i dinamika (glasno ili tiho)?', 'Koje instrumente ili glasove prepoznaješ?'],
            n: ['Napiši ili reci šta si osjećao/la dok si slušao/la muziku.', 'Pokretima tijela prikaži karakter kompozicije.'],
          };
        }
        return {
          o: ['Pjevaj ' + pjesma + ' zajedno sa razredom.', 'Kucaj dobu dok pjevaš.'],
          s: ['Otpjevaj prvu strofu samostalno ili u paru.', 'Pjevaj pjesmu i prati se na udaraljkama.'],
          n: ['Smisli pokrete za pjesmu i izvedi ih dok pjevaš.', 'Otpjevaj pjesmu izražajno — tiše i glasnije gdje to odgovara tekstu.'],
        };
      },
    },
  ]);

  const TZO_POSEBNO = [
    [/tr.anj|sprint|kros|start/i, 'Istrči stazu najbrže što možeš i zapiši svoje vrijeme ili mjesto.'],
    [/skok|preskak|vija/i, 'Izmjeri dužinu svog skoka (ili broj preskoka) i zapiši rezultat.'],
    [/bacanj|gađanj|hvatanj|lopt|šut|.ut na/i, 'Pogodi cilj ili uhvati loptu bar 3 puta od 5 pokušaja.'],
    [/ravnote|gred|klup/i, 'Pređi gredu ili klupu do kraja bez silaska.'],
    [/kolut|parter|gimnast|svije.a|vis i upor|penjanj|pu.anj/i, 'Izvedi vježbu pravilno uz pomoć druga ili učitelja.'],
    [/ples|kolo|ritmi|aerobik/i, 'Nauči korake i izvedi ih uz muziku sa razredom.'],
    [/poligon/i, 'Prođi poligon bez greške i bez rušenja prepreka.'],
    [/igr|.tafet|turnir|višeboj/i, 'Igraj fer, poštuj pravila i bodri svoj tim.'],
    [/postrojavanj|hodanj/i, 'Postroji se u vrstu i kolonu na znak učitelja.'],
    [/mjerenj|vježbi oblikovanja|držanj|korektiv/i, 'Uradi vježbe za pravilno držanje tijela kod kuće 5 dana.'],
  ];

  B.dodaj('tjelesni', [
    {
      id: 't-vjezba',
      f: (m, j, r) => {
        const posebno = (TZO_POSEBNO.find((p) => p[0].test(j.naziv)) || [null, 'Izvedi vježbu samostalno 3 puta, pravilno i sigurno.'])[1];
        return {
          o: ['Pažljivo pogledaj kako učitelj pokazuje vježbu, pa je ponovi polako.', 'Čekaj svoj red i pazi na drugove oko sebe.'],
          s: [posebno, 'Izvedi vježbu samostalno 3 puta, pravilno i sigurno.'],
          n: ['Pokaži vježbu drugovima i pomozi im da je pravilno izvedu.', r <= 2 ? 'Smisli novu igru sa istim kretanjem i objasni je drugovima.' : 'Smisli težu varijantu vježbe i objasni kako se izvodi.'],
        };
      },
    },
  ]);
})(typeof window !== 'undefined' ? window.BankaZadataka : globalThis.BankaZadataka);
