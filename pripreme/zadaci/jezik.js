/**
 * Maternji jezik i književnost — zadaci po temama za 1–5. razred.
 * Riječi uz slova biraju se iz RIJECI; za časove ćirilice preslovljavaju se u ćirilicu.
 */
(function (B) {
  'use strict';

  // Tri riječi koje počinju slovom (poznate djeci, bez rijetkih riječi).
  const RIJECI = {
    A: ['auto', 'avion', 'ananas'], B: ['baka', 'balon', 'brod'], C: ['cvijet', 'cipela', 'crv'],
    Č: ['čaša', 'čarapa', 'čekić'], Ć: ['ćup', 'ćuk', 'ćilim'], D: ['drvo', 'djed', 'dan'],
    DŽ: ['džep', 'džem', 'džemper'], Đ: ['đak', 'đon', 'đurđevak'], E: ['Ema', 'ekran', 'eho'],
    F: ['fudbal', 'frula', 'farba'], G: ['grad', 'gljiva', 'guska'], H: ['hljeb', 'haljina', 'hobotnica'],
    I: ['igla', 'iglu', 'Ivan'], J: ['jabuka', 'jaje', 'jež'], K: ['kuća', 'knjiga', 'kapa'],
    L: ['lopta', 'lav', 'list'], LJ: ['ljuljaška', 'ljeto', 'ljubav'], M: ['mama', 'miš', 'more'],
    N: ['nos', 'nebo', 'noga'], NJ: ['njiva', 'njuška', 'njihaljka'], O: ['oko', 'olovka', 'oblak'],
    P: ['pas', 'ptica', 'papuča'], R: ['riba', 'ruka', 'ruža'], S: ['sunce', 'sova', 'sat'],
    Š: ['šuma', 'šešir', 'škola'], T: ['tata', 'tigar', 'torba'], U: ['uho', 'ulica', 'uže'],
    V: ['voda', 'vuk', 'voz'], Z: ['zec', 'zub', 'zima'], Ž: ['žaba', 'žirafa', 'žir'],
  };

  const CIR = { a: 'а', b: 'б', v: 'в', g: 'г', d: 'д', đ: 'ђ', e: 'е', ž: 'ж', z: 'з', i: 'и', j: 'ј', k: 'к', l: 'л', m: 'м', n: 'н', o: 'о', p: 'п', r: 'р', s: 'с', t: 'т', ć: 'ћ', u: 'у', f: 'ф', h: 'х', c: 'ц', č: 'ч', š: 'ш' };
  const LAT = { а: 'A', б: 'B', в: 'V', г: 'G', д: 'D', ђ: 'Đ', е: 'E', ж: 'Ž', з: 'Z', и: 'I', ј: 'J', к: 'K', л: 'L', љ: 'LJ', м: 'M', н: 'N', њ: 'NJ', о: 'O', п: 'P', р: 'R', с: 'S', т: 'T', ћ: 'Ć', у: 'U', ф: 'F', х: 'H', ц: 'C', ч: 'Č', џ: 'DŽ', ш: 'Š' };

  function uCirilicu(tekst) {
    return tekst.replace(/dž|lj|nj|Dž|Lj|Nj|DŽ|LJ|NJ|./g, function (z) {
      const d = { dž: 'џ', lj: 'љ', nj: 'њ' }[z.toLowerCase()];
      const mala = d || CIR[z.toLowerCase()];
      if (!mala) return z;
      return z === z.toLowerCase() ? mala : mala.toUpperCase();
    });
  }

  const klj = (slovo) => String(slovo).toUpperCase();
  const latinskoSlovo = (slovo) => (/[Ѐ-ӿ]/.test(slovo) ? LAT[slovo.toLowerCase()] : klj(slovo));
  const prikazSlova = (slovo) => (slovo.length === 2 ? slovo[0].toUpperCase() + slovo[1].toLowerCase() : slovo.toUpperCase());

  function rijeci(slovo, cirilica) {
    const lista = RIJECI[latinskoSlovo(slovo)] || [];
    return cirilica ? lista.map(uCirilicu) : lista;
  }

  function naslov(naziv) {
    const n = naziv.match(/„[^“”]+[“”]/g) || [];
    if (!n.length) return 'koji ste čitali';
    return n.length === 1 ? n[0] : n.slice(0, 2).join(' ili ');
  }

  // --------------------------- Književnost ---------------------------
  function pjesma(t, r) {
    if (r === 1) {
      return {
        o: ['Nacrtaj ono što zamišljaš dok slušaš pjesmu ' + t + '.', 'Pronađi u pjesmi dvije riječi koje se rimuju (slično zvuče na kraju) i reci ih naglas.'],
        s: ['Nauči napamet prvu strofu pjesme i izgovori je razredu.', 'Napiši štampanim slovima naslov pjesme.'],
        n: ['Smisli još dva stiha koja se rimuju i nastavi pjesmu.', 'Kakvo osjećanje budi pjesma (radost, tugu, smijeh)? Nacrtaj ga i reci jednom rečenicom.'],
      };
    }
    if (r <= 3) {
      return {
        o: ['Napiši naslov pjesme ' + t + ' i ime pjesnika.', 'Koliko strofa ima pjesma? Prepiši prvu strofu.'],
        s: ['Prepiši dva para riječi koje se rimuju.', 'Koja ti se pjesnička slika najviše dopala? Opiši je u 2 rečenice i nacrtaj je.'],
        n: ['Napiši svoju strofu od 4 stiha na istu temu, sa rimom.', 'Kakvo je raspoloženje u pjesmi (veselo, tužno, nježno)? Dokaži jednim stihom.'],
      };
    }
    return {
      o: ['Napiši naslov, pjesnika i temu pjesme ' + t + '.', 'Prepiši stih koji ti se najviše dopao i objasni zašto.'],
      s: ['Pronađi u pjesmi jedno poređenje, epitet ili personifikaciju i prepiši ih.', 'Koliko strofa i stihova ima pjesma? Kakva je rima?'],
      n: ['Napiši osvrt na pjesmu u 5–6 rečenica: o čemu govori, kakve slike stvara i šta osjećaš.', 'Napiši svoju pjesmu od dvije strofe na sličnu temu i upotrijebi jednu stilsku figuru.'],
    };
  }

  function prica(t, r) {
    if (r === 1) {
      return {
        o: ['Nacrtaj glavnog lika iz priče ' + t + '.', 'Nabroji naglas sve likove iz priče.'],
        s: ['Ispričaj šta se desilo na početku, u sredini i na kraju priče.', 'Nacrtaj 3 slike redom kako se priča dešavala.'],
        n: ['Šta bi ti uradio/la na mjestu glavnog lika? Ispričaj razredu.', 'Smisli novi kraj priče i nacrtaj ga.'],
      };
    }
    if (r <= 3) {
      return {
        o: ['Napiši naslov i pisca djela ' + t + '.', 'Ko su glavni likovi? Napiši njihova imena.'],
        s: ['Napiši redom 4 glavna događaja.', 'Opiši glavnog lika sa 3 osobine i za jednu navedi primjer iz teksta.'],
        n: ['Šta bi ti uradio/la na mjestu glavnog lika? Napiši u 4–5 rečenica.', 'Promijeni kraj priče i napiši novi kraj.'],
      };
    }
    return {
      o: ['Napiši naslov, pisca, mjesto i vrijeme radnje djela ' + t + '.', 'Nabroji glavne i sporedne likove.'],
      s: ['Napiši plan prepričavanja u 5 tačaka.', 'Opiši glavnog lika: izgled, osobine i postupke, sa jednim primjerom iz teksta.'],
      n: ['Napiši osvrt na djelo u 6–8 rečenica: poruka, najzanimljiviji događaj i tvoje mišljenje.', 'Uporedi sebe sa glavnim likom: po čemu ste slični, a po čemu različiti?'],
    };
  }

  function basna(t, r) {
    return {
      o: [r === 1 ? 'Nacrtaj likove iz basne ' + t + '.' : 'Napiši likove basne ' + t + '.', r === 1 ? 'Koje su životinje u basni? Imenuj ih naglas.' : 'Šta se desilo na kraju basne? Napiši jednom rečenicom.'],
      s: ['Uz svaki lik ' + (r === 1 ? 'reci' : 'napiši') + ' jednu osobinu (npr. vrijedan, lijen, lukav).', r >= 3 ? 'Koje osobine ljudi predstavljaju životinje u basni?' : 'Ko se u basni ponio dobro, a ko loše? Zašto?'],
      n: ['Koja je pouka basne? ' + (r === 1 ? 'Reci je' : 'Napiši je') + ' jednom rečenicom.', 'Navedi primjer iz života kada vrijedi ta pouka.'],
    };
  }

  function bajka(t, r) {
    return {
      o: ['Nabroji likove bajke ' + t + '. Ko je dobar, a ko zao?', 'Nacrtaj čarobni predmet ili biće iz bajke.'],
      s: [(r === 1 ? 'Reci' : 'Napiši') + ' jedan stvaran i jedan nestvaran (čarobni) događaj iz bajke.', 'Poređaj 4 događaja iz bajke redom.'],
      n: ['Smisli drugačiji kraj bajke i ' + (r <= 2 ? 'ispričaj ga.' : 'napiši ga u 4–5 rečenica.'), 'Koja je poruka bajke? ' + (r <= 2 ? 'Reci je.' : 'Napiši je.')],
    };
  }

  function drama(t, r) {
    const tekst = t === 'koji ste čitali' ? 'u dramskom tekstu koji ste čitali' : 'u tekstu ' + t;
    return {
      o: ['Ko su lica (uloge) ' + tekst + '? Nabroji ih.', 'Pročitaj jedan dijalog u paru, po ulogama.'],
      s: [r >= 3 ? 'Pronađi jednu didaskaliju (uputstvo glumcu) i prepiši je.' : 'Šta radi glumac, a šta je pozornica (scena)? Objasni drugu.', 'Pripremite u grupi kratku scenu iz teksta i odigrajte je.'],
      n: ['Napiši kratak dijalog (4 replike) između dva lika' + (r >= 3 ? ' i dodaj jednu didaskaliju u zagradi.' : '.'), 'Odglumi svoju ulogu i reci šta je tvom liku bilo najvažnije.'],
    };
  }

  function epska(t) {
    return {
      o: ['Ko je glavni junak pjesme ' + t + '?', 'Prepiši jedan stih i prebroj slogove.'],
      s: ['Navedi dvije osobine junaka i dokaži ih stihom.', 'Šta je deseterac? Pronađi u pjesmi jedan primjer.'],
      n: ['Prepričaj pjesmu u 5–6 rečenica.', 'Uporedi junaka epske pjesme sa junakom iz današnjeg vremena.'],
    };
  }

  // --------------------------- Slova ---------------------------
  function stampanoSlovo(slovo) {
    const s = prikazSlova(slovo);
    const w = rijeci(slovo, false);
    const dvoslovno = s.length === 2;
    return {
      o: ['Pređi preko slova, pa napiši 5 velikih i 5 malih štampanih slova ' + s + ', ' + s.toLowerCase() + '.', 'Nacrtaj predmet čiji naziv počinje glasom ' + s + '.'],
      s: ['Zaokruži slovo ' + s + ' u riječima: ' + w.join(', ') + '.', dvoslovno ? 'Slovo ' + s + ' pišemo sa dva znaka, a izgovaramo kao jedan glas. Izgovori ga i napiši 3 puta.' : 'Gdje se čuje glas ' + s + ' u riječi „' + w[1] + '“: na početku, u sredini ili na kraju?  [[! na početku]]'],
      n: ['Smisli i napiši (ili nacrtaj) još 2 riječi koje počinju slovom ' + s + '.', 'Napiši rečenicu od 3 riječi u kojoj je riječ „' + w[0] + '“.'],
    };
  }

  function pisanoSlovo(slovo, cirilica) {
    const lat = latinskoSlovo(slovo);
    const prikaz = cirilica ? uCirilicu(prikazSlova(lat)) : prikazSlova(lat);
    const w = rijeci(lat, cirilica);
    return {
      o: ['Pređi preko pisanog slova ' + prikaz + ' i napiši ga 5 puta (veliko i malo).', 'Prepiši pisanim slovima riječ „' + w[0] + '“.'],
      s: ['Prepiši pisanim slovima riječi: ' + w.join(', ') + '.', 'Poveži pisano slovo ' + prikaz + ' sa slovima ispred i iza u riječi „' + w[1] + '“.'],
      n: ['Napiši pisanim slovima rečenicu u kojoj su bar dvije riječi sa slovom ' + prikaz + '.', 'Smisli i napiši pisanim slovima ime druga ili mjesta sa slovom ' + prikaz + '.'],
    };
  }

  function pisanaSlovaGrupa(m) {
    const cirilica = /ćirilic/i.test(m[1]);
    const slova = m[2].replace(/\(.*?\)/g, '').split(',').map((d) => d.trim().split(/\s+/)[0]).filter(Boolean);
    const lat = slova.map(latinskoSlovo);
    const prikaz = lat.map((s) => (cirilica ? uCirilicu(prikazSlova(s)) : prikazSlova(s)));
    const primjeri = lat.map((s) => rijeci(s, cirilica)[0]).filter(Boolean);
    return {
      o: ['Napiši pisanim slovima 3 puta svako slovo: ' + prikaz.join(', ') + '.', 'Prepiši pisanim slovima riječi: ' + primjeri.slice(0, 3).join(', ') + '.'],
      s: ['Prepiši pisanim slovima riječi: ' + primjeri.join(', ') + '.', 'Napiši pisanim slovima svoje ime i prezime.'],
      n: ['Napiši pisanim slovima dvije rečenice o svom danu i podvuci nova slova.', 'Napiši po jednu riječ za svako slovo: ' + prikaz.join(', ') + '.'],
    };
  }

  // --------------------------- Pravila ---------------------------
  B.dodaj('jezik', [
    {
      id: 'j-grafomotorika', r: [1], t: /grafomotori/i,
      f: (m, j) => {
        const n = j.naziv.toLowerCase();
        if (/zakrivljen|valovit|luk|kru.n/.test(n)) {
          return {
            o: ['Nacrtaj 5 valova kao na moru, od lijeve strane reda do desne.', 'Nacrtaj 5 polukrugova (kao duga) jedan pored drugog.'],
            s: ['Nastavi niz:  ∩ ∩ ∩ ___ ___ ___', 'Nacrtaj puža (spiralu) bez podizanja olovke.'],
            n: ['Nacrtaj petlje kao lančić preko cijelog reda.', 'Nacrtaj sliku samo od zakrivljenih linija (npr. balone i oblake).'],
          };
        }
        if (/kos|cik|izlomljen/.test(n)) {
          return {
            o: ['Povuci 5 kosih linija udesno i 5 kosih linija ulijevo.', 'Nacrtaj krov kuće od dvije kose linije.'],
            s: ['Nacrtaj cik-cak liniju preko cijelog reda (kao zubi testere).', 'Nastavi niz:  / \\ / \\ ___ ___ ___'],
            n: ['Nacrtaj planine i munju od izlomljenih linija.', 'Nacrtaj jelku samo od kosih linija.'],
          };
        }
        return {
          o: ['Povuci 5 uspravnih linija od gornje do donje crte.', 'Povuci 3 vodoravne linije s lijeva na desno.'],
          s: ['Nastavi niz:  | — | — ___ ___ ___', 'Nacrtaj ogradu od uspravnih i vodoravnih linija.'],
          n: ['Nacrtaj kuću i prozore samo od uspravnih i vodoravnih linija.', 'Nacrtaj ljestve sa 6 prečki.'],
        };
      },
    },
    {
      id: 'j-govorna-vjezba', r: [1], t: /govorna vje.ba/i,
      o: ['Reci razredu svoje ime i prezime i koliko imaš godina.', 'Nacrtaj sebe ispred škole.'],
      s: ['Reci u dvije rečenice šta najviše voliš da se igraš.', 'Ispričaj drugu ko te je dopratio u školu prvog dana.'],
      n: ['Nacrtaj svoju porodicu i ispričaj razredu ko je na crtežu.', 'Postavi drugu jedno pitanje o njegovoj porodici i pažljivo saslušaj odgovor.'],
    },
    {
      id: 'j-recenica-rijec', r: [1], t: /re.enica i rije.|re.enica kao misao/i,
      o: ['Slušaj rečenicu „Mama čita knjigu.“ Pljesni za svaku riječ. Koliko je riječi?  [[! 3]]', 'Nacrtaj onoliko kružića koliko riječi ima rečenica „Pas laje.“  [[! 2]]'],
      s: ['Koliko riječi ima rečenica „Moj pas voli da trči.“?  [[! 5]]', 'Složi rečenicu od riječi: lopta, je, crvena.  [[! Lopta je crvena.]]'],
      n: ['Smisli rečenicu od 4 riječi o svojoj školi i reci je naglas.', 'Reci rečenicu o sebi, a drug neka pljesne za svaku riječ.'],
    },
    {
      id: 'j-slog-glas-1', r: [1], t: /rije., slog i glas|slogove i prepoznavanje/i,
      o: ['Pljeskom podijeli na slogove: ma-ma, lop-ta, ku-ća. Koliko slogova ima riječ LOPTA?  [[! 2]]', 'Koji je prvi glas u riječi SUNCE?  [[! S]]'],
      s: ['Koji je posljednji glas u riječi SUNCE?  [[! E]]', 'Gdje čuješ glas M u riječi MAMA, a gdje u riječi DOM: na početku, u sredini ili na kraju?  [[! na početku; na kraju]]'],
      n: ['Smisli 3 riječi koje počinju glasom M.', 'Koja riječ ima više slogova: AUTO ili AUTOBUS?  [[! autobus]]'],
    },
    { id: 'j-stampano-slovo', r: [1], t: /.tampanog slova (Dž|Lj|Nj|[A-ZČĆŠŽĐ]),/, f: (m) => stampanoSlovo(m[1]) },
    {
      id: 'j-pisano-slovo', r: [2], t: /pisanog slova (Dž|Lj|Nj|[A-ZČĆŠŽĐ])(?=[\s(]).*(ćirilica|latinica)/,
      f: (m) => pisanoSlovo(m[1], m[2] === 'ćirilica'),
    },
    { id: 'j-pisana-slova-grupa', r: [3], t: /^Pisana slova (latinice|ćirilice)(?: – [^:]+)?: (.+)$/, f: (m) => pisanaSlovaGrupa(m) },
    {
      id: 'j-ponavljanje-slova', r: [3], t: /ponavljanje .tampanih slova/i,
      o: ['Napiši štampanim slovima abecedu ili azbuku (koju učiš na času).', 'Prepiši štampanim slovima: „Jesen je stigla.“'],
      s: ['Napiši pisanim slovima svoje ime i ime druga.', 'Prepiši pisanim slovima riječi: mama, škola, sunce.'],
      n: ['Napiši pisanim slovima rečenicu o svom omiljenom predmetu.', 'Uporedi štampano i pisano slovo A: po čemu se razlikuju?'],
    },
    {
      id: 'j-abeceda', t: /abeceda|azbuka – redoslijed/i,
      o: ['Napiši prvih 5 slova abecede.  [[! A, B, C, Č, Ć]]', 'Koliko slova ima abeceda?  [[! 30]]'],
      s: ['Poređaj po abecedi: mačka, auto, lopta.  [[! auto, lopta, mačka]]', 'Napiši prvih 5 slova azbuke.  [[! А, Б, В, Г, Д]]'],
      n: ['Poređaj po abecedi imena: Sara, Ana, Luka, Marko.  [[! Ana, Luka, Marko, Sara]]', 'Koliko slova ima azbuka? Da li je redoslijed isti kao u abecedi?  [[! 30; nije]]'],
    },
    {
      id: 'j-preslovljavanje', t: /preslovljavanj|drugog pisma|.tampanim slovima (latinice|.irilice)/i,
      o: ['Prepiši ćirilicom: MAMA, TATA, SUNCE.  [[! МАМА, ТАТА, СУНЦЕ]]', 'Prepiši latinicom: КУЋА, ЛОПТА.  [[! KUĆA, LOPTA]]'],
      s: ['Prepiši latinicom: Јелена чита књигу.  [[! Jelena čita knjigu.]]', 'Napiši slova koja izgledaju isto u oba pisma.  [[! A, E, J, K, M, O, T]]'],
      n: ['Napiši svoje ime i prezime na oba pisma.', 'Napiši dvije rečenice ćirilicom i preslovi ih na latinicu.'],
    },
    {
      id: 'j-diktat', t: /diktat i kontrolni/i,
      o: ['Prepiši pisanim slovima: „Jesen je stigla u naš grad.“', 'Napiši diktat koji čita učitelj (3 rečenice).'],
      s: ['Napiši diktat i podvuci riječi u kojima nisi siguran/na.', 'Provjeri: da li svaka rečenica počinje velikim slovom i završava se tačkom?'],
      n: ['Pročitaj svoj diktat i ispravi greške drugom bojom.', 'Napiši 2 svoje rečenice bez greške i daj drugu da ih provjeri.'],
    },
    {
      id: 'j-sistematizacija', t: /godi.nja sistematizacija|sistematizacija gradiva na kraju|prelazak u predmetnu/i,
      f: (m, j, r) => {
        if (r === 1) {
          return {
            o: ['Pročitaj naglas kratak tekst koji daje učitelj.', 'Prepiši štampanim slovima: „Volim svoju školu.“'],
            s: ['Napiši diktat od 2 rečenice.', 'Odgovori na pitanje o pročitanom tekstu jednom rečenicom.'],
            n: ['Napiši 3 rečenice o sebi.', 'Nacrtaj i potpiši najljepši događaj iz prvog razreda.'],
          };
        }
        if (r === 2) {
          return {
            o: ['Prepiši pisanim slovima: „Ljeto je blizu.“', 'Stavi znak na kraj rečenica: Kako se zoveš___ Danas je lijep dan___  [[! ?  .]]'],
            s: ['Napiši naslov i pisca jedne lektire koju si pročitao/la.', 'Napiši pravilno: marko živi u banjoj luci.  [[! Marko živi u Banjoj Luci.]]'],
            n: ['Napiši 4–5 rečenica o omiljenoj knjizi iz drugog razreda.', 'Napiši 3 rečenice: izjavnu, upitnu i uzvičnu.'],
          };
        }
        if (r === 3) {
          return {
            o: ['Podvuci imenice: „Mačka spava na stolici.“  [[! mačka, stolica]]', 'Napiši naslov i pisca jedne lektire iz trećeg razreda.'],
            s: ['Odredi subjekat i predikat: „Ptice lete visoko.“  [[! ptice; lete]]', 'Napiši suprotno značenje: dan, visok, brzo.  [[! noć, nizak, sporo]]'],
            n: ['Napiši kratak sastav (6–8 rečenica): „Šta sam naučio/la u trećem razredu“.', 'Napiši rečenicu sa upravnim govorom.'],
          };
        }
        return {
          o: ['Razvrstaj riječi na imenice, glagole i pridjeve: kuća, trči, lijep, škola, piše, zelen.  [[! imenice: kuća, škola; glagoli: trči, piše; pridjevi: lijep, zelen]]', 'Napiši naslov i pisca jedne lektire koju si čitao/la ove godine.'],
          s: ['Odredi rečenične članove: „Juče je Ana u parku čitala knjigu.“  [[! subjekat Ana, predikat je čitala, objekat knjigu, odredbe juče i u parku]]', 'Napiši pravilno: nova godina, rijeka drina, osnovna škola „petar kočić“.  [[! Nova godina, rijeka Drina, Osnovna škola „Petar Kočić“]]'],
          n: ['Napiši osvrt (6–8 rečenica) na omiljenu knjigu iz ove godine.', 'Napiši rečenicu u kojoj su imenica, pridjev, glagol i prilog, pa ih podvuci.'],
        };
      },
    },
    {
      id: 'j-pismena-vjezba', t: /pismena (vje.ba|zada.a)/i,
      o: ['Napiši plan sastava: uvod, glavni dio i završetak.', 'Zapiši 5 riječi koje ćeš upotrijebiti u sastavu.'],
      s: ['Napiši sastav na zadatu temu (8–10 rečenica) po svom planu.', 'Daj sastavu naslov koji privlači pažnju.'],
      n: ['Pročitaj svoj sastav i ispravi bar 3 greške drugom bojom.', 'Dodaj u sastav jedno poređenje ili opis koji ga čini zanimljivijim.'],
    },
    {
      id: 'j-medijska', t: /medijska kultura/i,
      f: (m, j, r) => {
        const n = j.naziv.toLowerCase();
        if (/internet|digitaln|bezbjednost|sigurnost/.test(n)) {
          return {
            o: ['Napiši naziv jednog dječijeg časopisa ili emisije koju poznaješ.', 'Napiši jedno pravilo sigurnog ponašanja na internetu.'],
            s: ['Napiši 3 pravila sigurnog ponašanja na internetu.', 'Kako u enciklopediji ili rječniku pronalaziš riječ? Objasni.'],
            n: ['Kako prepoznati da vijest na internetu nije tačna? Navedi 2 načina.', 'Napravi plakat „Siguran na internetu“ sa 4 pravila.'],
          };
        }
        if (/film/.test(n)) {
          return {
            o: ['Napiši naziv jednog crtanog i jednog igranog filma koji si gledao/la.', 'Ko snima film, a ko ga glumi? Objasni drugu.'],
            s: ['Napiši razliku između igranog, animiranog i dokumentarnog filma.', 'Šta radi režiser?  [[! vodi snimanje filma i rad glumaca]]'],
            n: ['Napiši kratku kritiku filma koji si gledao/la (5–6 rečenica).', 'Uporedi knjigu i film o istoj priči: šta je bilo drugačije?'],
          };
        }
        return {
          o: ['Napiši naziv jednog dječijeg časopisa, stripa ili crtanog filma koji poznaješ.', 'Nacrtaj svoj strip od 3 sličice.'],
          s: ['Po čemu se razlikuju strip i slikovnica? Napiši jednu razliku.', 'Napiši šta ti se dopalo u pozorišnoj predstavi koju si gledao/la.'],
          n: ['Napravi naslovnu stranu dječijeg časopisa (naziv, slika, 2 naslova).', 'Napiši 3 pitanja za intervju sa glumcem.'],
        };
      },
    },
    {
      id: 'j-vijest-intervju', t: /vijest, izvje.taj i intervju/i,
      o: ['Napiši vijest o događaju u školi odgovarajući na pitanja: Ko? Šta? Gdje? Kada?', 'Smisli naslov za tu vijest.'],
      s: ['Smisli 5 pitanja za intervju sa školskim bibliotekarom.', 'Napiši izvještaj sa školske priredbe ili izleta (6–8 rečenica).'],
      n: ['Odigrajte u paru intervju i zapišite odgovore.', 'Napiši kratak tekst za debatu: „Da li djeca treba da imaju mobilni telefon?“ — tvoj stav i 2 razloga.'],
    },
    {
      id: 'j-prepricavanje', t: /prepri.avanj/i,
      f: (m, j, r) => ({
        o: ['Napiši plan priče u 3 tačke: uvod, glavni dio i kraj.', 'Napiši ko su glavni likovi i gdje se radnja dešava.'],
        s: ['Prepričaj tekst po planu u 5–6 rečenica.', r >= 4 ? 'Prepričaj tekst sažeto, u 3 rečenice.' : 'Prepričaj tekst usmeno drugu iz klupe.'],
        n: [/promjen|kraj/.test(j.naziv) ? 'Promijeni kraj priče i napiši novi kraj u 4–5 rečenica.' : 'Prepričaj tekst iz ugla drugog lika.', r >= 4 ? 'Prepričaj tekst retrospektivno — počni od kraja.' : 'Nacrtaj strip od 4 sličice po tekstu.'],
      }),
    },
    {
      id: 'j-niz-slika', r: [1], t: /niz(u)? slika/i,
      o: ['Pogledaj niz slika koje pokazuje učitelj i reci šta se desilo prvo.', 'Nacrtaj šta se desilo na kraju priče.'],
      s: ['Ispričaj priču po slikama: početak, sredina, kraj.', 'Daj priči naslov.'],
      n: ['Smisli šta bi se desilo poslije posljednje slike i nacrtaj to.', 'Ispričaj priču tako da počneš rečju „Jednog dana…“.'],
    },
    {
      id: 'j-opisivanje', t: /^kultura[^:–]*[:–].*(opisivanj|opis (drage|lika|pejza)|portret)/i,
      f: (m, j, r) => {
        const n = j.naziv.toLowerCase();
        const sta = /pejza|prirod/.test(n) ? 'pejzaž (prirodu u svom zavičaju)' : /enterijer|prostor/.test(n) ? 'svoju sobu ili učionicu' : /lik|portret|osob/.test(n) ? 'dragu osobu' : /ljubim|.ivotinj/.test(n) ? 'svog ljubimca ili dragu životinju' : 'svoju omiljenu igračku';
        if (r === 1) {
          return {
            o: ['Nacrtaj ' + sta + '.', 'Reci 3 riječi kojima opisuješ ' + sta + '.'],
            s: ['Opiši usmeno ' + sta + ' u 3 rečenice: kako izgleda i šta voliš kod toga.', 'Kakve je boje, veličine i oblika? Reci drugu.'],
            n: ['Opiši ' + sta + ' tako da drug pogodi o čemu govoriš, a da ne kažeš ime.', 'Nacrtaj i potpiši 2 riječi koje opisuju crtež.'],
          };
        }
        return {
          o: ['Napiši 5 riječi kojima opisuješ ' + sta + '.', 'Napiši plan opisa: izgled, osobine, šta voliš.'],
          s: ['Opiši ' + sta + ' u ' + (r <= 3 ? '5–6' : '8–10') + ' rečenica po planu.', 'Upotrijebi u opisu bar 3 pridjeva i podvuci ih.'],
          n: ['Opiši ' + sta + ' tako da čitalac pogodi o čemu pišeš, a da ne napišeš naziv.', r >= 4 ? 'Upotrijebi u opisu jedno poređenje i jednu personifikaciju.' : 'Dodaj opisu jedno poređenje (npr. bijelo kao snijeg).'],
        };
      },
    },
    {
      id: 'j-pricanje-dozivljaja', t: /pri.anje (stvarnog|do.ivljaja)|pri.anje sa elementima|hronolo.ko i retrospektivno pri.anje/i,
      f: (m, j, r) => ({
        o: ['Napiši plan doživljaja: šta se desilo, gdje i sa kim.', 'Smisli naslov za svoj doživljaj.'],
        s: ['Napiši doživljaj u ' + (r <= 3 ? '5–6' : '8–10') + ' rečenica: uvod, glavni dio i kraj.', r >= 5 ? 'Ubaci u priču kratak dijalog sa upravnim govorom.' : 'Napiši kako si se osjećao/la.'],
        n: [/pism|razglednic/.test(j.naziv) ? 'Napiši razglednicu drugu o tom doživljaju (mjesto, šta radiš, pozdrav).' : 'Ispričaj doživljaj retrospektivno — počni od kraja.', 'Pročitaj svoj tekst drugu i dopuni ga po njegovom prijedlogu.'],
      }),
    },
    {
      id: 'j-pismo', t: /^kultura[^:–]*[:–].*(pism|razglednic|.estitk|molb)/i,
      o: ['Napiši čestitku za rođendan drugu (2–3 rečenice).', 'Napiši na koverti adresu: ime i prezime, ulica i broj, poštanski broj i mjesto.'],
      s: ['Napiši razglednicu sa izleta: gdje si, šta radiš i pozdrav.', 'Šta svako pismo ima na početku, a šta na kraju?  [[! mjesto i datum, obraćanje; pozdrav i potpis]]'],
      n: ['Napiši pismo drugu u 6–8 rečenica i adresiraj kovertu.', 'Napiši kratku molbu ili obavještenje za oglasnu tablu škole.'],
    },
    {
      id: 'j-stilske-figure', t: /knji.evni rodovi|stilske figure \(epitet/i,
      o: ['Koja je ovo figura: „Sunce se smije.“  [[! personifikacija]]', 'Koja je ovo figura: „bijel kao snijeg“  [[! poređenje]]'],
      s: ['Razvrstaj na liriku, epiku i dramu: pjesma o proljeću, bajka, pozorišna predstava.  [[! lirika, epika, drama]]', 'Pronađi epitet u: „Zelena livada miriše.“  [[! zelena]]'],
      n: ['Napiši svoj primjer epiteta, poređenja i personifikacije.', 'Šta je hiperbola? Napiši primjer.  [[! preuveličavanje, npr. „Rekao sam ti hiljadu puta.“]]'],
    },
    {
      id: 'j-umotvorine', t: /narodne umotvorine|poslovice, zagonetke/i,
      o: ['Riješi zagonetku: „Bijelo polje, crno sjeme; ko ga sije, mudro zbori.“  [[! knjiga (pismo)]]', 'Izgovori tri puta brzo: „Na vrh brda vrba mrda.“'],
      s: ['Objasni poslovicu „Ko rano rani, dvije sreće grabi.“', 'Napiši jednu poslovicu koju znaš.'],
      n: ['Smisli svoju zagonetku o predmetu iz učionice.', 'Napiši jednu pitalicu sa odgovorom.'],
    },

    // --------------------------- Gramatika i pravopis ---------------------------
    {
      id: 'j-padezi', t: /pade/i,
      f: (m, j) => {
        const n = j.naziv.toLowerCase();
        if (/nominativ i genitiv/.test(n)) {
          return {
            o: ['Postavi pitanje: „Kuća mog djeda je velika.“ — za riječ djeda pitamo ___ i ona je u ___ padežu.  [[! koga? čega?; genitivu]]', 'Napiši imenicu ŠKOLA u nominativu i genitivu jednine.  [[! škola, škole]]'],
            s: ['Napiši imenicu GRAD u nominativu i genitivu množine.  [[! gradovi, gradova]]', 'Podvuci imenicu u genitivu: „Uzeo sam čašu vode.“  [[! vode]]'],
            n: ['Napiši rečenicu u kojoj je imenica u genitivu sa prijedlogom „bez“.', 'Napiši 3 imenice u genitivu množine.'],
          };
        }
        if (/dativ/.test(n)) {
          return {
            o: ['Dopuni dativom: Dao sam knjigu ___ (sestra).  [[! sestri]]', 'Dopuni akuzativom: Vidim ___ (more).  [[! more]]'],
            s: ['Odredi padež: „Pišem pismo baki.“  [[! baki — dativ; pismo — akuzativ]]', 'Napiši imenicu PAS u dativu i akuzativu jednine.  [[! psu, psa]]'],
            n: ['Napiši rečenicu sa imenicom u dativu i rečenicu sa imenicom u akuzativu.', 'Napiši rečenicu u kojoj akuzativ odgovara na pitanje „kuda?“.'],
          };
        }
        if (/vokativ/.test(n)) {
          return {
            o: ['Napiši vokativ: Marko → ___, mama → ___  [[! Marko, mama (Marko!, mamo!)]]', 'Odvoji vokativ zarezom: „Ana dođi ovamo.“  [[! Ana, dođi ovamo.]]'],
            s: ['Dopuni instrumentalom: Pišem ___ (olovka).  [[! olovkom]]', 'Dopuni lokativom: Mislim o ___ (škola).  [[! školi]]'],
            n: ['Napiši rečenicu sa vokativom, instrumentalom i lokativom i podvuci ih.', 'Kada se vokativ odvaja zarezom? Objasni primjerom.'],
          };
        }
        return {
          o: ['Napiši imenicu ŽENA kroz 7 padeža jednine.  [[! žena, žene, ženi, ženu, ženo, ženom, ženi]]', 'Napiši padežna pitanja za nominativ i genitiv.  [[! ko? šta?; koga? čega?]]'],
          s: ['Odredi padeže podvučenih imenica: „Ana daje cvijet mami u bašti.“  [[! Ana N, cvijet A, mami D, bašti L]]', 'Napiši imenicu GRAD kroz padeže množine.'],
          n: ['Napiši rečenicu sa imenicom u svakom od 3 izabrana padeža i odredi ih.', 'Pronađi grešku: „Idem kod tetki.“ Napiši pravilno.  [[! Idem kod tetke.]]'],
        };
      },
    },
    {
      id: 'j-clanovi-sistematizacija', t: /sistematizacija re.eni.nih .lanova/i,
      o: ['Odredi subjekat i predikat: „Ptice lete.“  [[! ptice; lete]]', 'Podvuci objekat: „Mama kuva ručak.“  [[! ručak]]'],
      s: ['Odredi sve rečenične članove: „Juče je Ana u parku čitala knjigu.“  [[! Ana subjekat, je čitala predikat, knjigu objekat, juče i u parku priloške odredbe]]', 'Pronađi atribut: „Visoki dječak trči.“  [[! visoki]]'],
      n: ['Napiši rečenicu sa subjektom, predikatom, objektom, atributom i priloškom odredbom.', 'Proširi rečenicu „Djeca se igraju.“ sa 3 člana.'],
    },
    {
      id: 'j-atribut', t: /atribut/i,
      o: ['Podvuci atribut: „Crvena jabuka je slatka.“  [[! crvena]]', 'Dodaj atribut: ___ pas laje.'],
      s: ['Pronađi atribute: „Moj mlađi brat ima novi bicikl.“  [[! moj, mlađi, novi]]', 'Proširi rečenicu atributima: „Dječak čita knjigu.“'],
      n: ['Napiši rečenicu sa apozicijom (npr. „Ana, moja sestra, ide u školu.“).', 'Zašto se apozicija odvaja zarezima? Objasni.'],
    },
    {
      id: 'j-porodica-rijeci', t: /porodica rije.i|sinonim|antonim/i,
      o: ['Napiši suprotno značenje: dan — ___, visok — ___, brzo — ___  [[! noć, nizak, sporo]]', 'Napiši riječ istog značenja: kuća — ___  [[! dom]]'],
      s: ['Napiši riječ sličnog značenja: brzo — ___, lijep — ___  [[! hitro; zgodan, divan]]', 'Napiši 3 riječi iz porodice riječi ŠKOLA.  [[! npr. školski, školarac, predškolac]]'],
      n: ['Napiši rečenicu u kojoj su dva antonima.', 'Napiši umanjenicu i uvećanicu od riječi KUĆA.  [[! kućica, kućerina]]'],
    },
    {
      id: 'j-umanjenice', t: /umanjenic/i,
      o: ['Napiši umanjenicu: kuća — ___, sto — ___  [[! kućica, stolić]]', 'Napiši umanjenicu: cvijet — ___  [[! cvjetić]]'],
      s: ['Napiši uvećanicu: nos — ___, ruka — ___  [[! nosina, ručerda]]', 'Napiši umanjenicu: prst — ___, ptica — ___  [[! prstić, ptičica]]'],
      n: ['Napiši rečenicu sa jednom umanjenicom i jednom uvećanicom.', 'Zašto u pričama za djecu ima mnogo umanjenica? Napiši svoje mišljenje.'],
    },
    {
      id: 'j-rod-broj-imenica', t: /rod i broj imenica/i,
      o: ['Dopiši taj, ta ili to: ___ prozor, ___ knjiga, ___ sunce  [[! taj, ta, to]]', 'Napiši množinu: kuća — ___  [[! kuće]]'],
      s: ['Napiši množinu: pas — ___, dijete — ___, čovjek — ___  [[! psi, djeca, ljudi]]', 'Odredi rod: more, klupa, grad.  [[! srednji, ženski, muški]]'],
      n: ['Napiši 3 zbirne imenice (npr. lišće).  [[! npr. cvijeće, kamenje, braća]]', 'Koje imenice nemaju množinu? Navedi 2.  [[! npr. mlijeko, zlato]]'],
    },
    {
      id: 'j-imenice', t: /^(vrste riječi – )?imenice|zajedničke i vlastite imenice/i,
      o: ['Podvuci imenice: „Mačka spava na stolici.“  [[! mačka, stolica]]', 'Napiši 2 imenice za bića i 2 za predmete.'],
      s: ['Razvrstaj na zajedničke i vlastite imenice: Sava, rijeka, Ana, djevojčica, Trebinje, grad.  [[! zajedničke: rijeka, djevojčica, grad; vlastite: Sava, Ana, Trebinje]]', 'Napiši vlastite imenice velikim slovom: marko, drina, sarajevo.  [[! Marko, Drina, Sarajevo]]'],
      n: ['Napiši po jednu zbirnu, gradivnu i misaonu imenicu.  [[! npr. lišće, drvo, radost]]', 'Napiši rečenicu sa 3 imenice i podvuci ih.'],
    },
    {
      id: 'j-komparacija', t: /komparacij|komparativa/i,
      o: ['Dopuni: lijep — ljepši — ___  [[! najljepši]]', 'Dopuni: brz — ___ — najbrži  [[! brži]]'],
      s: ['Dopuni: visok — ___ — ___,  dobar — ___ — ___  [[! viši, najviši; bolji, najbolji]]', 'Ispravi grešku: „Ana je najbolja od svih najboljih.“'],
      n: ['Napiši rečenicu sa superlativom.', 'Napiši komparaciju pridjeva: mali, jak, jasan.  [[! manji, najmanji; jači, najjači; jasniji, najjasniji]]'],
    },
    {
      id: 'j-prisvojni', t: /prisvojnih pridjeva/i,
      o: ['Čija je knjiga? Knjiga od Ivana je ___ knjiga.  [[! Ivanova]]', 'Sveska od Ane je ___ sveska.  [[! Anina]]'],
      s: ['Napiši pridjev od: Sarajevo — ___, Banja Luka — ___  [[! sarajevski, banjalučki]]', 'Napiši pridjev od: Mostar — ___, Bihać — ___  [[! mostarski, bihaćki]]'],
      n: ['Napiši rečenicu sa prisvojnim pridjevom izvedenim od imena druga.', 'Zašto „banjalučki“ pišemo malim slovom?  [[! jer je pridjev na -ski/-čki]]'],
    },
    {
      id: 'j-pridjevi', t: /^pridjevi/i,
      o: ['Dopiši pridjev: ___ sunce, ___ more, ___ trava', 'Podvuci pridjev: „Crvena jabuka je slatka.“  [[! crvena, slatka]]'],
      s: ['Razvrstaj: drveni, bratov, veseo → opisni / gradivni / prisvojni  [[! veseo; drveni; bratov]]', 'Odredi rod i broj: lijepa kuća, visoki tornjevi.  [[! ženski, jednina; muški, množina]]'],
      n: ['Opiši svoju torbu sa 4 pridjeva.', 'Napiši rečenicu u kojoj su opisni, gradivni i prisvojni pridjev.'],
    },
    {
      id: 'j-zamjenice', t: /zamjenic/i,
      f: (m, j) => /prisvojne, pokazne/.test(j.naziv)
        ? {
          o: ['Podvuci zamjenice: „Ovaj moj pas je veseo.“  [[! ovaj (pokazna), moj (prisvojna)]]', 'Dopuni prisvojnom zamjenicom: To je ___ knjiga (ja).  [[! moja]]'],
          s: ['Razvrstaj: moj, taj, ko, njihov, onaj, šta → prisvojne / pokazne / upitne  [[! moj, njihov; taj, onaj; ko, šta]]', 'Napiši pitanje sa upitnom zamjenicom „čiji“.'],
          n: ['Napiši rečenicu sa prisvojnom, pokaznom i upitnom zamjenicom.', 'Zamijeni ponovljene imenice zamjenicama: „Ana ima psa. Ana voli psa.“  [[! Ana ima psa. Ona ga voli.]]'],
        }
        : {
          o: ['Zamijeni imenicu zamjenicom: „Ana čita.“ → ___ čita.  [[! Ona]]', 'Dopuni: ___ pišem, ___ pišemo  [[! ja, mi]]'],
          s: ['Dopuni ličnim zamjenicama: ___ pišeš, ___ pišete, ___ pišu  [[! ti, vi, oni/one/ona]]', 'Napiši duži i kraći oblik: mene / ___, tebi / ___  [[! me, ti]]'],
          n: ['Napiši tekst od 3 rečenice o drugu i upotrijebi zamjenice umjesto imena.', 'Zašto koristimo zamjenice? Objasni primjerom.'],
        },
    },
    {
      id: 'j-brojevi', t: /brojevi kao vrsta|brojevi – glavni/i,
      o: ['Napiši riječima: 5, 12, 20  [[! pet, dvanaest, dvadeset]]', 'Napiši redni broj riječima: 3. — ___  [[! treći]]'],
      s: ['Napiši redni broj: 10. — ___, 100. — ___  [[! deseti, stoti]]', 'Napiši zbirni broj: 2 — ___, 3 — ___  [[! dvoje, troje]]'],
      n: ['Napiši datum svog rođenja riječima.', 'Napiši rečenicu sa glavnim, rednim i zbirnim brojem.'],
    },
    {
      id: 'j-glagolski-vid', t: /glagolski vid/i,
      o: ['Svršen ili nesvršen glagol: napisati, pisati  [[! svršen, nesvršen]]', 'Napiši svršeni par: čitati — ___  [[! pročitati]]'],
      s: ['Prelazni ili neprelazni: „Ana čita knjigu.“ / „Ana spava.“  [[! prelazni; neprelazni]]', 'Napiši 2 povratna glagola (npr. umivati se).'],
      n: ['Napiši rečenicu sa povratnim glagolom i rečenicu sa prelaznim glagolom.', 'Odredi vid i rod glagola u rečenici „Pas je pojeo kost.“  [[! svršen, prelazan]]'],
    },
    {
      id: 'j-infinitiv-prezent', t: /infinitiv/i,
      o: ['Napiši infinitiv: čitam — ___, pečem — ___  [[! čitati, peći]]', 'Napiši infinitiv: idem — ___  [[! ići]]'],
      s: ['Napiši prezent glagola PISATI: ja ___, ti ___, on ___  [[! pišem, pišeš, piše]]', 'Napiši prezent glagola MOĆI u 1. licu jednine i množine.  [[! mogu, možemo]]'],
      n: ['Napiši 3 rečenice u prezentu o tome šta radiš poslije škole.', 'Napiši infinitiv na -ći od glagola: rekao, došao.  [[! reći, doći]]'],
    },
    {
      id: 'j-perfekat-futur', t: /perfekat/i,
      o: ['Napiši u perfektu: (ja) igrati — ___  [[! igrao/igrala sam]]', 'Napiši u futuru I: (mi) učiti — ___  [[! učićemo / učit ćemo]]'],
      s: ['Pretvori u perfekat: „Ana piše pismo.“  [[! Ana je pisala pismo.]]', 'Pretvori u futur I: „Djeca idu na izlet.“  [[! Djeca će ići na izlet.]]'],
      n: ['Napiši 3 rečenice o raspustu: dvije u perfektu i jednu u futuru I.', 'Kako se pravilno piše: „radićemo“ ili „radit ćemo“? Napiši oba oblika.  [[! oba su pravilna (srpski / bosanski i hrvatski)]]'],
    },
    {
      id: 'j-glagolska-vremena', t: /glagolska vremena|vremena \(pro.lo/i,
      o: ['Napiši u prošlom vremenu: „Ja čitam.“  [[! Ja sam čitao/čitala.]]', 'Napiši u budućem vremenu: „Mi idemo na izlet.“  [[! Mi ćemo ići na izlet.]]'],
      s: ['Odredi vrijeme: „Juče sam trčao.“, „Sutra ću plivati.“, „Sada pišem.“  [[! prošlo, buduće, sadašnje]]', 'Odredi lice i broj: pišemo, čitaš.  [[! 1. lice množine; 2. lice jednine]]'],
      n: ['Napiši 3 rečenice o svom danu: u prošlom, sadašnjem i budućem vremenu.', 'Promijeni priču „Ana ide u školu i uči.“ u prošlo vrijeme.  [[! Ana je išla u školu i učila.]]'],
    },
    {
      id: 'j-vrste-recenica', t: /vrste re.enica|re.enica – (obavje.tajne|vrste)|potvrdne i odri.ne|rečenica – obavještajne/i,
      o: ['Stavi znak na kraj: Danas pada kiša___ Da li ideš u park___ Kako je lijep dan___  [[! .  ?  !]]', 'Napiši jednu upitnu rečenicu.'],
      s: ['Pretvori u odričnu: „Ana piše zadaću.“  [[! Ana ne piše zadaću.]]', 'Pretvori u upitnu: „Marko voli fudbal.“  [[! Da li Marko voli fudbal?]]'],
      n: ['Napiši jednu izjavnu, jednu upitnu i jednu uzvičnu rečenicu o proljeću.', 'Napiši odričnu rečenicu sa „nemam“ ili „nisam“.'],
    },
    {
      id: 'j-negacija', t: /rije.ce ne|rije.ce li|ne uz glagole|odri.n/i,
      o: ['Napiši odvojeno: (ne)znam — ___, (ne)volim — ___  [[! ne znam, ne volim]]', 'Pretvori u odričnu rečenicu: „Ana piše zadaću.“  [[! Ana ne piše zadaću.]]'],
      s: ['Napiši sastavljeno: neću, nemam, nisam, nemoj — upotrijebi dva u rečenici.', 'Pretvori u upitnu sa LI: „Ti ideš u školu.“  [[! Ideš li u školu?]]'],
      n: ['Napiši 2 rečenice sa NE uz glagol i 2 sa NE uz pridjev (npr. nevaljao).', 'Ispravi greške: „Nemogu da dođem. Neznam put.“  [[! Ne mogu da dođem. Ne znam put.]]'],
    },
    {
      id: 'j-glagoli', t: /^glagoli –/i,
      o: ['Podvuci glagole: „Djeca trče i pjevaju.“  [[! trče, pjevaju]]', 'Šta radi? Dopiši glagol: Ptica ___. Riba ___.  [[! npr. leti, pliva]]'],
      s: ['Razvrstaj glagole: pisati, spavati, grmjeti → radnja / stanje / zbivanje  [[! pisati; spavati; grmjeti]]', 'Napiši 3 glagola koji opisuju šta radiš ujutro.'],
      n: ['Napiši rečenicu sa 3 glagola.', 'Napiši šta radi učitelj, ljekar i kuvar — po jedan glagol.'],
    },
    {
      id: 'j-nepromjenljive', t: /nepromjenljive vrste rije.i: prilozi|promjenljive i nepromjenljive/i,
      o: ['Podvuci priloge: „Juče smo brzo trčali.“  [[! juče, brzo]]', 'Razvrstaj: kuća, brzo, i, lijep, na, trčati → promjenljive / nepromjenljive  [[! kuća, lijep, trčati; brzo, i, na]]'],
      s: ['Pronađi prijedlog i veznik: „Knjiga je na stolu i olovka pored nje.“  [[! prijedlozi na, pored; veznik i]]', 'Napiši rečenicu sa uzvikom.'],
      n: ['Napiši po jedan prilog za mjesto, vrijeme i način.  [[! npr. ovdje, sutra, polako]]', 'Napiši rečenicu u kojoj su prijedlog, veznik i riječca.'],
    },
    {
      id: 'j-objekat-odredbe', t: /objekat|prilo.ke odredbe|zavisni re.eni.ni/i,
      o: ['Podvuci objekat: „Mama kuva ručak.“  [[! ručak]]', 'Na koja pitanja odgovara objekat?  [[! koga? šta?]]'],
      s: ['Odredi priloške odredbe: „Juče smo brzo trčali u parku.“  [[! juče — vrijeme, brzo — način, u parku — mjesto]]', 'Dopuni priloškom odredbom za mjesto: „Djeca se igraju ___.“'],
      n: ['Proširi rečenicu „Djeca se igraju.“ odgovorima na pitanja: kada, gdje i kako.', 'Napiši rečenicu sa bližim i daljim objektom (npr. „Dao sam bratu loptu.“).'],
    },
    {
      id: 'j-subjekat-predikat', t: /subjekat/i,
      o: ['Podvuci predikat: „Dječak piše.“  [[! piše]]', 'Ko piše? Podvuci subjekat: „Dječak piše.“  [[! dječak]]'],
      s: ['U rečenici „Ptice lete visoko.“ subjekat je ___, a predikat ___.  [[! ptice; lete]]', 'Dopuni predikatom: „Sunce ___.“'],
      n: ['Napiši rečenicu sa imenskim predikatom (npr. „Nebo je plavo.“).', 'Napiši 2 rečenice u kojima subjekat nije prva riječ.'],
    },
    {
      id: 'j-recenica-prosirena', t: /prosta.*pro.irena|slo.ena re.enica|predikatske re.enice/i,
      o: ['Proširi rečenicu: „Sunce sija.“ → ___', 'Sažmi rečenicu: „Mali crni mačak spava na toploj peći.“ → Mačak ___  [[! Mačak spava.]]'],
      s: ['Sastavi složenu rečenicu od dvije proste: „Pada kiša. Uzimam kišobran.“  [[! npr. Pada kiša, pa uzimam kišobran.]]', 'Da li je rečenica prosta ili proširena: „Djeca se igraju u dvorištu.“  [[! proširena]]'],
      n: ['Koliko prostih rečenica ima: „Kad je zazvonilo, djeca su izašla i potrčala u dvorište.“  [[! 3]]', 'Napiši složenu rečenicu sa veznikom „jer“ i stavi zarez gdje treba.'],
    },
    {
      id: 'j-veliko-slovo', t: /veliko po.etno slovo|veliko slovo/i,
      o: ['Prepiši pravilno: „marko živi u banjoj luci.“  [[! Marko živi u Banjoj Luci.]]', 'Napiši velikim početnim slovom svoje ime i ime svog mjesta.'],
      s: ['Napiši pravilno: rijeka drina, planina jahorina, grad trebinje.  [[! rijeka Drina, planina Jahorina, grad Trebinje]]', 'Napiši pravilno: nova godina, dan škole.  [[! Nova godina, Dan škole]]'],
      n: ['Napiši pravilno naziv svoje škole i ulice u kojoj živiš.', 'Napiši pravilno: bosna i hercegovina, crveni krst, sjeverna amerika.  [[! Bosna i Hercegovina, Crveni krst, Sjeverna Amerika]]'],
    },
    {
      id: 'j-upravni-govor', t: /upravni govor|upravnog govora/i,
      o: ['Dopiši znake: Mama reče ___Dođi na ručak.___  [[! Mama reče: „Dođi na ručak.“]]', 'Podvuci tuđe riječi: Ana reče: „Umorna sam.“  [[! Umorna sam.]]'],
      s: ['Napiši isto na drugi način, tako da tuđe riječi budu prve.  [[! „Dođi na ručak“, reče mama.]]', 'Napiši rečenicu sa upravnim govorom o razgovoru sa drugom.'],
      n: ['Pretvori u neupravni govor: Ana reče: „Umorna sam.“  [[! Ana reče da je umorna.]]', 'Napiši sva tri modela upravnog govora za istu rečenicu.'],
    },
    {
      id: 'j-pravopisni-znaci', t: /pravopisni znaci|dvota.ka i zarez/i,
      o: ['Dopiši zareze: „U korpi su jabuke kruške šljive i grožđe.“  [[! jabuke, kruške, šljive i grožđe]]', 'Dopiši dvotačku: „Kupili smo ___ hljeb, mlijeko i sir.“  [[! dvotačka iza „smo“]]'],
      s: ['Napiši naslov omiljene knjige u navodnicima.', 'Dopiši znake: „Pročitao sam knjigu Ježeva kućica“  [[! „Ježeva kućica“.]]'],
      n: ['Napiši rečenicu u kojoj nabrajaš 4 stvari i upotrijebi dvotačku i zareze.', 'Napiši rečenicu sa nazivom časopisa u navodnicima.'],
    },
    {
      id: 'j-skracenice', t: /skra.enic/i,
      o: ['Napiši skraćenicu: na primjer — ___, i tako dalje — ___  [[! npr., itd.]]', 'Napiši datum brojevima: 15. septembar 2026.  [[! 15. 9. 2026.]]'],
      s: ['Napiši redni broj pravilno: 3 razred → ___  [[! 3. razred]]', 'Dopiši IJE ili JE: c___vet, ml___ko, m___sec  [[! cvijet, mlijeko, mjesec]]'],
      n: ['Napiši 3 skraćenice koje znaš i šta znače.', 'Napiši datum svog rođenja na dva načina (brojevima i riječima).'],
    },
    {
      id: 'j-glasovi', t: /., ., d., đ|ije \/ je|glasovne promjene|samoglasnic/i,
      f: (m, j) => /samoglasnic/i.test(j.naziv)
        ? {
          o: ['Zaokruži samoglasnike u riječi LIVADA.  [[! I, A, A]]', 'Nabroji samoglasnike.  [[! A, E, I, O, U]]'],
          s: ['Koliko samoglasnika ima riječ UČITELJICA?  [[! 5]]', 'Napiši riječ koja počinje samoglasnikom i riječ koja počinje suglasnikom.'],
          n: ['Napiši riječ koja ima samo jedan samoglasnik.  [[! npr. pas, sat]]', 'Napiši riječ od 3 sloga i podvuci samoglasnike.'],
        }
        : {
          o: ['Dopiši Č ili Ć: no___, ___aša, ku___a  [[! noć, čaša, kuća]]', 'Dopiši DŽ ili Đ: ___ep, ___ak  [[! džep, đak]]'],
          s: ['Dopiši IJE ili JE: c___vet, m___sec, ml___ko  [[! cvijet, mjesec, mlijeko]]', 'Dopiši LJ ili NJ: ___uljaška, ___iva  [[! ljuljaška, njiva]]'],
          n: ['Napiši 2 riječi sa IJE i 2 sa JE.', 'Ispravi greške: „Đak je pojeo ćokoladu i dzem.“  [[! čokoladu, džem]]'],
        },
    },
    {
      id: 'j-slog', t: /slogove|preno.enje/i,
      o: ['Podijeli na slogove: škola, olovka.  [[! ško-la, o-lov-ka]]', 'Koliko slogova ima riječ UČITELJICA?  [[! 5 (u-či-te-lji-ca)]]'],
      s: ['Kako se riječ PROZOR prenosi u novi red?  [[! pro-zor]]', 'Podijeli na slogove: livada, jabuka.  [[! li-va-da, ja-bu-ka]]'],
      n: ['Napiši 3 riječi sa 4 sloga.', 'Može li se riječ „pas“ prenijeti u novi red? Zašto?  [[! ne može, ima jedan slog]]'],
    },

    // --------------------------- Književnost ---------------------------
    { id: 'j-epska', t: /epsk/i, f: (m, j) => epska(naslov(j.naziv)) },
    { id: 'j-drama', t: /dramsk|dramatizacij|drama|radio-igr|lutkarsk/i, f: (m, j, r) => drama(naslov(j.naziv), r) },
    {
      id: 'j-pjesma', t: /pjesm|pesm|lirsk|poezij|poema|sevdalink|balad|Zmaj|Desanka|Kapidžić|Grigor Vitez|Šantić|Dučić|Ćatić|Cesarić|Raičković|Mak Dizdar|Kulenović|Miroslav Antić|Dobrica Erić|Radičević|Krklec|Vojislav Ilić|Ršumović/,
      f: (m, j, r) => pjesma(naslov(j.naziv), r),
    },
    { id: 'j-basna', t: /basn/i, f: (m, j, r) => basna(naslov(j.naziv), r) },
    { id: 'j-bajka', t: /bajk/i, f: (m, j, r) => bajka(naslov(j.naziv), r) },
    { id: 'j-prica', t: /lektir|pri.|pripovijet|roman|predanj|legend|odlomak|slikovnic|„/i, f: (m, j, r) => prica(naslov(j.naziv), r) },
  ]);
})(typeof window !== 'undefined' ? window.BankaZadataka : globalThis.BankaZadataka);
