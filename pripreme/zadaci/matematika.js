/**
 * Matematika — zadaci po temama za 1–5. razred (I osnovni, II srednji, III napredni nivo).
 * Redoslijed je važan: prvo pravilo koje odgovara nazivu časa se koristi.
 */
(function (B) {
  'use strict';

  const kruzica = (n) => (n === 1 ? 'kružić' : 'kružića');

  function niz(od, doBroja, prazno) {
    const brojevi = [];
    for (let i = od; i <= doBroja; i++) brojevi.push(prazno.indexOf(i) !== -1 ? '___' : String(i));
    return brojevi.join(', ');
  }

  // Obrada broja i cifre N (1. razred).
  function brojN(n) {
    const o = ['Nacrtaj ' + n + ' ' + kruzica(n) + ' i oboji ' + (n === 1 ? 'ga' : 'ih') + '.', 'Napiši cifru ' + n + ' pet puta: ' + n + '  ___  ___  ___  ___'];
    let s;
    let nap;
    if (n === 1) {
      s = ['Nacrtaj jedno sunce, jednu kuću i jedno drvo.', 'Zaokruži grupu u kojoj je tačno 1 predmet:   ●●   ●   ●●●  [[! grupa sa jednim kružićem]]'];
      nap = ['Pronađi u učionici nešto čega ima samo jedno (na primjer tabla) i nacrtaj to.', 'Šta imaš samo jedno na tijelu? Nacrtaj.  [[! nos, usta…]]'];
    } else if (n === 2) {
      s = ['Nacrtaj 2 stvari koje uvijek idu u paru.  [[! čarape, cipele, rukavice…]]', 'Zaokruži grupu u kojoj su tačno 2 predmeta:   ●   ●●●   ●●  [[! grupa sa dva kružića]]'];
      nap = ['Koliko imaš očiju, a koliko ušiju? Napiši brojeve: oči ___, uši ___  [[! 2 i 2]]', 'Nacrtaj 1 kružić, pa 2 kružića. Gdje ih ima više?  [[! gdje su 2]]'];
    } else {
      s = ['Dopuni niz brojeva: ' + niz(1, n, [n - 1, Math.max(1, n - 3)]) + '  [[! ' + niz(1, n, []) + ']]', 'Nacrtaj ' + n + ' tačkica u dva reda.'];
      nap = n >= 5
        ? ['Sastav broja ' + n + ':   [[' + n + ' = 1 + ___ | ' + (n - 1) + ']]   [[' + n + ' = 2 + ___ | ' + (n - 2) + ']]   [[' + n + ' = ' + (n - 1) + ' + ___ | 1]]', 'Nacrtaj ' + n + ' kružića tako da neki budu crveni, a neki plavi. Napiši koliko je kojih.']
        : ['Koji broj dolazi poslije broja ' + n + '? Nacrtaj toliko tačkica.  [[! ' + (n + 1) + ']]', 'Nacrtaj ' + n + ' jabuke i ' + n + ' kruške. Kojih ima više?  [[! jednako mnogo]]'];
      if (n === 3) s.push('Nacrtaj 3 jabuke i 3 kruške. Upiši znak: 3 ___ 3  [[! =]]');
    }
    return { o: o, s: s, n: nap };
  }

  // Množenje i dijeljenje brojem N (2. razred).
  const TABLICA_PRICE = {
    2: ['Koliko je čarapa u 8 pari? [[= 8 · 2]]', 'Polovina broja 16 je ___. [[= 16 : 2]]'],
    3: ['Tricikl ima 3 točka. Koliko točkova ima 6 tricikala? [[= 6 · 3]]', 'Trećina broja 27 je ___. [[= 27 : 3]]'],
    4: ['Auto ima 4 točka. Koliko točkova ima 7 automobila? [[= 7 · 4]]', '24 učenika sjede za stolovima, po 4 za svakim. Koliko je stolova? [[= 24 : 4]]'],
    5: ['Ruka ima 5 prstiju. Koliko prstiju ima 9 ruku? [[= 9 · 5]]', 'Za 35 KM kupljeno je 5 jednakih knjiga. Koliko košta jedna? [[= 35 : 5]]'],
    6: ['U kutiji je 6 jaja. Koliko je jaja u 8 kutija? [[= 8 · 6]]', '42 olovke podijeli jednako na 6 učenika. Koliko dobija svaki? [[= 42 : 6]]'],
    7: ['Sedmica ima 7 dana. Koliko dana ima 5 sedmica? [[= 5 · 7]]', 'Koliko sedmica ima 63 dana? [[= 63 : 7]]'],
    8: ['Pauk ima 8 nogu. Koliko nogu ima 6 pauka? [[= 6 · 8]]', '56 bombona spakuj u kese po 8. Koliko je kesa? [[= 56 : 8]]'],
    9: ['U jednom redu je 9 stolica. Koliko je stolica u 7 redova? [[= 7 · 9]]', '81 jabuku rasporedi jednako u 9 korpi. Koliko je jabuka u jednoj korpi? [[= 81 : 9]]'],
  };

  function tablica(n) {
    return {
      o: ['Izračunaj:   [[' + n + ' · 3]]   [[' + n + ' · 7]]   [[' + n + ' · 5]]', 'Izračunaj:   [[' + n * 4 + ' : ' + n + ']]   [[' + n * 6 + ' : ' + n + ']]'],
      s: [
        'Izračunaj:   [[9 · ' + n + ']]   [[' + n * 8 + ' : ' + n + ']]   [[' + n + ' · 10]]',
        'Dopuni:   [[' + n + ' · ___ = ' + n * 7 + ' | 7]]   [[___ : ' + n + ' = 6 | ' + n * 6 + ']]',
      ],
      n: TABLICA_PRICE[n],
    };
  }

  B.dodaj('matematika', [
    // ============================ 1. RAZRED ============================
    {
      id: 'm1-gore-dolje', r: [1], t: /gore\s*[–-]\s*dolje/i,
      o: ['Nacrtaj sunce gore na papiru, a travu dolje.', 'Nacrtaj loptu na stolu.'],
      s: ['Nacrtaj kuću. Iznad kuće nacrtaj oblak, a ispod prozora cvijet.', 'Dopuni riječju GORE ili DOLJE: Ptica leti ___. Korijen drveta je ___.  [[! gore, dolje]]'],
      n: ['Nacrtaj policu sa tri reda. Gore stavi loptu, u sredinu knjigu, a dolje autić.', 'Reci drugu gdje je tvoja torba, koristeći riječi iznad, ispod ili na.'],
    },
    {
      id: 'm1-ispred-iza', r: [1], t: /ispred\s*[–-]\s*iza/i,
      o: ['Nacrtaj tri kružića u redu. Oboji srednji — on je IZMEĐU.', 'Nacrtaj drvo, a ispred drveta cvijet.'],
      s: ['Nacrtaj kuću. Ispred kuće nacrtaj psa, a iza kuće drvo (vidi se samo krošnja).', 'Nacrtaj tri životinje u redu: mačku, psa i zeca. Ko je između?  [[! pas]]'],
      n: ['U redu stoje: Ana, Ivo, Mia, Luka. Ana je prva. Ko stoji između Ive i Luke? Ko je iza Ive?  [[! Mia; Mia]]', 'Postavite se u grupi u red i recite ko je ispred, a ko iza vas.'],
    },
    {
      id: 'm1-lijevo-desno', r: [1], t: /lijevo\s*[–-]\s*desno/i,
      o: ['Podigni desnu ruku. Na papiru nacrtaj obris svoje lijeve ruke.', 'Nacrtaj loptu na lijevoj strani papira, a cvijet na desnoj.'],
      s: ['Nacrtaj kuću u sredini. Lijevo od kuće nacrtaj drvo, a desno od kuće auto.', 'Nacrtaj 2 strelice koje pokazuju ulijevo i 3 strelice koje pokazuju udesno.'],
      n: ['Koliko si strelica nacrtao/la ukupno? Napiši broj.  [[! 5]]', 'Opiši drugu put od klupe do vrata koristeći riječi lijevo, desno i pravo.'],
    },
    {
      id: 'm1-unutra-vani', r: [1], t: /unutra\s*[–-]\s*vani|izvan/i,
      o: ['Nacrtaj veliki krug. U krug nacrtaj 2 jabuke, a izvan kruga 1 jabuku.', 'Nacrtaj kuću, a u kući sebe.'],
      s: ['Nacrtaj kuću i dva drveta: jedno blizu kuće, a drugo daleko od kuće.', 'Nacrtaj ogradu. Unutra nacrtaj 3 ovce, a vani 2 ovce.'],
      n: ['Koliko je ovaca ukupno na tvom crtežu? Napiši broj.  [[! 5]]', 'Šta je u tvojoj učionici blizu table, a šta daleko? Navedi po jednu stvar.'],
    },
    {
      id: 'm1-uporedjivanje-predmeta', r: [1], t: /upore.ivanje predmeta/i,
      o: ['Nacrtaj veliku i malu loptu.', 'Nacrtaj dvije olovke: dugu i kratku. Zaokruži dužu.'],
      s: ['Poređaj od najmanjeg do najvećeg (upiši 1, 2, 3): slon ___, miš ___, mačka ___  [[! miš 1, mačka 2, slon 3]]', 'Šta je teže: knjiga ili pero? Zaokruži.  [[! knjiga]]'],
      n: ['Nacrtaj tri drveta: nisko, više i najviše.', 'Izmjeri pedljem dužinu svoje klupe. Koliko pedalja je duga?'],
    },
    {
      id: 'm1-lopta-valjak', r: [1], t: /lopte.*valjka/i,
      o: ['Zaokruži predmete oblika lopte: lubenica, kutija, narandža, cigla.  [[! lubenica, narandža]]', 'Nacrtaj jedan predmet oblika lopte.'],
      s: ['Nacrtaj 2 predmeta oblika valjka koje imaš kod kuće.', 'Šta se kotrlja: lopta, valjak ili oboje? Zaokruži.  [[! oboje]]'],
      n: ['Koje tijelo može i da stoji mirno i da se kotrlja: lopta ili valjak? Pokaži drugu.  [[! valjak]]', 'Napravi od plastelina loptu i valjak.'],
    },
    {
      id: 'm1-kocka-kvadar', r: [1], t: /kocke.*kvadra/i,
      o: ['Zaokruži predmet oblika kocke: kockica za igru, lopta, olovka.  [[! kockica za igru]]', 'Nacrtaj kutiju (kvadar).'],
      s: ['Spoji predmet i tijelo: kutija za cipele — ___, kockica — ___, krov kule — ___  [[! kvadar, kocka, piramida]]', 'Pronađi u učionici jedan predmet oblika kvadra.'],
      n: ['Koliko strana ima kocka? Prebroj na kockici za igru.  [[! 6]]', 'Napravi od papira ili plastelina kocku ili piramidu.'],
    },
    {
      id: 'm1-likovi', r: [1], t: /likovi u ravni|krug, trougao, kvadrat/i,
      o: ['Nacrtaj krug i oboji ga žuto. Nacrtaj trougao i oboji ga crveno.', 'Zaokruži kvadrat:  ○  △  □  [[! □]]'],
      s: ['Nacrtaj kuću od likova: zid je kvadrat, krov trougao, vrata pravougaonik, a prozor krug.', 'Koliko trouglova si nacrtao/la na kući? Napiši broj.  [[! 1]]'],
      n: ['Koliko uglova ima trougao, a koliko kvadrat? Trougao ___, kvadrat ___  [[! 3, 4]]', 'Pronađi u učionici 2 predmeta oblika pravougaonika.'],
    },
    {
      id: 'm1-linije-prava-kriva', r: [1], t: /prava \(ravna\) i kriva/i,
      o: ['Nacrtaj 3 tačke.', 'Nacrtaj lenjirom jednu pravu liniju.'],
      s: ['Nacrtaj crvenom bojom pravu liniju, a plavom krivu liniju.', 'Spoji dvije tačke pravom linijom, a druge dvije krivom.'],
      n: ['Nacrtaj put od kuće do škole koji ima i prave i krive dijelove. Prave dijelove oboji crveno.', 'Koliko pravih linija možeš nacrtati kroz jednu tačku? Pokušaj.  [[! mnogo (bezbroj)]]'],
    },
    {
      id: 'm1-otvorene-zatvorene', r: [1], t: /otvorene i zatvorene/i,
      o: ['Nacrtaj jednu zatvorenu liniju (kao ogradu) i jednu otvorenu liniju (kao put).', 'Oboji zelenom bojom unutrašnjost zatvorene linije.'],
      s: ['Nacrtaj ogradu (zatvorenu liniju). Unutra nacrtaj 3 kružića, a vani 2 kružića. Koliko ih je ukupno? [[3 + 2]]', 'Nacrtaj cvijet unutar zatvorene linije i sunce izvan nje.'],
      n: ['Unutra je 6 jabuka. Dopuni kružiće do 10:  ●●●●●● ○○○○   [[6 + ___ = 10 | 4]]', 'Nacrtaj zatvorenu liniju u kojoj su 4 zvjezdice, a izvan nje 3. Koliko ih je izvan, a koliko unutra?  [[! izvan 3, unutra 4]]'],
    },
    {
      id: 'm1-skup', r: [1], t: /skup i elementi/i,
      o: ['Nacrtaj 3 jabuke i zaokruži ih jednom linijom — to je skup.', 'Koliko elemenata ima tvoj skup? Napiši broj.  [[! 3]]'],
      s: ['Nacrtaj skup igračaka sa 4 elementa i skup voća sa 2 elementa.', 'U kojem skupu ima više elemenata?  [[! u skupu igračaka]]'],
      n: ['U skupu su: mačka, pas, jabuka, zec. Precrtaj element koji ne pripada skupu životinja.  [[! jabuka]]', 'Nacrtaj skup od 5 elemenata i daj mu ime.'],
    },
    {
      id: 'm1-pripadnost', r: [1], t: /pripadnost i nepripadnost/i,
      o: ['Nacrtaj skup od 3 crvena kružića. Pored skupa nacrtaj 1 plavi kružić koji ne pripada skupu.', 'Pripada li plavi kružić skupu crvenih kružića? Zaokruži DA ili NE.  [[! NE]]'],
      s: ['Skup igračaka: lopta, autić, lutka. Pripada li jabuka ovom skupu? DA / NE  [[! NE]]', 'Pripada li lutka ovom skupu? DA / NE  [[! DA]]'],
      n: ['Nacrtaj skup od 5 elemenata u kojem jedan element ne pripada (uljez). Neka drug pronađe uljeza.', 'Smisli skup čiji elementi počinju glasom M i nacrtaj 3 elementa.'],
    },
    {
      id: 'm1-uporedjivanje-skupova', r: [1], t: /upore.ivanje skupova/i,
      o: ['Nacrtaj 3 šoljice i 3 tanjirića. Spoji linijom svaku šoljicu sa jednim tanjirićem.', 'Čega ima više: šoljica ili tanjirića?  [[! jednako mnogo]]'],
      s: ['Nacrtaj 4 zeca i 2 šargarepe. Spoji parove. Čega ima više?  [[! zečeva]]', 'Koliko zečeva nema šargarepu?  [[! 2]]'],
      n: ['Nacrtaj dva skupa: u jednom 5 kružića, a u drugom 3. Koliko kružića treba dodati drugom skupu da ih bude jednako mnogo?  [[! 2]]', 'Nacrtaj dva skupa koja imaju jednako mnogo elemenata.'],
    },
    {
      id: 'm1-broj-10', r: [1], t: /broja 10|pojam desetice/i,
      o: ['Nacrtaj 10 kružića: 5 crvenih i 5 plavih.', 'Prebroj prste na obje ruke. Koliko ih je?  [[! 10]]'],
      s: ['Sastav broja 10:   [[10 = 6 + ___ | 4]]   [[10 = 3 + ___ | 7]]   [[10 = 8 + ___ | 2]]', 'Dopuni niz:  1, 2, ___, 4, 5, ___, 7, 8, ___, 10  [[! 3, 6, 9]]'],
      n: ['Ana ima 7 bombona. Koliko joj treba još da ima 10? [[= 10 - 7]]', 'Napiši sve načine da sastaviš 10 od dva broja (1 + 9, …).'],
    },
    {
      id: 'm1-nula', r: [1], t: /cifre 0|nulom/i,
      o: ['Na tanjiru su bile 2 jabuke. Pojeli smo obje. Nacrtaj prazan tanjir. Koliko je ostalo? [[= 2 - 2]]', 'Napiši cifru 0 pet puta.'],
      s: ['Izračunaj:   [[3 + 0]]   [[4 - 0]]   [[2 - 2]]   [[0 + 5]]', 'Dopuni:   [[5 - ___ = 0 | 5]]   [[___ + 0 = 4 | 4]]'],
      n: ['Napiši dva računa čiji je rezultat 0.', 'Koji je broj manji od 1? Napiši ga.  [[! 0]]'],
    },
    {
      id: 'm1-broj-n', r: [1], t: /broja i cifre (\d+)/i,
      f: (m) => brojN(Number(m[1])),
    },
    {
      id: 'm1-uporedjivanje-5', r: [1], t: /upore.ivanje brojeva do 5/i,
      o: ['Upiši znak <, > ili =:   [[3 ? 5]]   [[4 ? 4]]   [[5 ? 2]]', 'Nacrtaj 4 kruga i 2 trougla. Čega ima više?  [[! krugova]]'],
      s: ['Pet djece trči. Mia je stigla treća. Koliko je djece stiglo prije nje?  [[! 2]]', 'Poređaj od najmanjeg: 4, 1, 5, 2, 3  [[! 1, 2, 3, 4, 5]]'],
      n: ['Napiši brojeve od 1 do 5 koji su manji od 4.  [[! 1, 2, 3]]', 'Upiši broj da bude tačno:  3 < ___ < 5  [[! 4]]'],
    },
    {
      id: 'm1-sabiranje-oduzimanje-5', r: [1], t: /sabiranje i oduzimanje u skupu brojeva do 5/i,
      o: ['Izračunaj:   [[2 + 2]]   [[5 - 1]]   [[3 + 1]]', 'Nacrtaj 3 kruga i dodaj još 2. Koliko ih je?   [[3 + 2]]'],
      s: ['Izračunaj:   [[4 + 1]]   [[5 - 3]]   [[2 + 3]]   [[4 - 4]]', 'Upiši znak <, > ili =:   [[2 + 2 ? 5]]   [[5 - 1 ? 4]]'],
      n: ['Luka je imao 5 sličica. Dao je 2 drugu, a onda dobio 1. Koliko sada ima? [[= 5 - 2 + 1]]', 'Dopuni:   [[3 + ___ = 5 | 2]]   [[___ - 1 = 3 | 4]]'],
    },
    {
      id: 'm1-sabiranje-5', r: [1], t: /sabiranje u skupu brojeva do 5/i,
      o: ['Nacrtaj 2 kruške i još 1 krušku. Koliko ih je?   [[2 + 1]]', 'Izračunaj:   [[1 + 1]]   [[2 + 2]]'],
      s: ['Izračunaj:   [[1 + 3]]   [[4 + 1]]   [[3 + 2]]   [[2 + 3]]', 'Dopuni:   [[2 + ___ = 4 | 2]]'],
      n: ['U korpi su 2 jabuke. Mama je stavila još 3. Koliko je jabuka u korpi? [[= 2 + 3]]', 'Napiši dva različita računa sabiranja čiji je zbir 5.'],
    },
    {
      id: 'm1-oduzimanje-5', r: [1], t: /oduzimanje u skupu brojeva do 5/i,
      o: ['Nacrtaj 4 balona. Precrtaj 1 balon. Koliko je ostalo?   [[4 - 1]]', 'Izračunaj:   [[3 - 1]]   [[2 - 1]]'],
      s: ['Izračunaj:   [[5 - 2]]   [[3 - 1]]   [[5 - 4]]   [[4 - 2]]', 'Dopuni:   [[5 - ___ = 1 | 4]]'],
      n: ['Na grani je 5 ptica. Odletjele su 3. Koliko ih je ostalo? [[= 5 - 3]]', 'Napiši dva računa oduzimanja čiji je rezultat 2.'],
    },
    {
      id: 'm1-niz-0-10', r: [1], t: /brojevni niz od 0 do 10/i,
      o: ['Dopuni niz:  0, 1, 2, ___, 4, ___, 6, 7, ___, 9, 10  [[! 3, 5, 8]]', 'Napiši broj koji dolazi poslije 6.  [[! 7]]'],
      s: ['Napiši prethodnik i sljedbenik:   ___ 5 ___    ___ 8 ___  [[! 4 i 6; 7 i 9]]', 'Djeca stoje u redu. Ko je peti, ako brojiš od prvog? Nacrtaj 7 djece i zaokruži petog.'],
      n: ['Koji broj je između 6 i 8?  [[! 7]]', 'Napiši brojeve od 10 do 0 unazad.  [[! 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]]'],
    },
    {
      id: 'm1-sabiranje-10', r: [1], t: /sabiranje u skupu brojeva do 10/i,
      o: ['Izračunaj:   [[3 + 4]]   [[5 + 2]]   [[6 + 1]]', 'Nacrtaj 4 kružića i još 4. Koliko ih je?   [[4 + 4]]'],
      s: ['Izračunaj i uporedi:   [[2 + 7]]   [[7 + 2]]', 'Izračunaj:   [[4 + 5]]   [[3 + 6]]   [[8 + 2]]'],
      n: ['Luka ima 4 autića, a Ivan 5. Koliko imaju zajedno? [[= 4 + 5]]', 'Napiši 3 različita računa čiji je zbir 8.'],
    },
    {
      id: 'm1-oduzimanje-10', r: [1], t: /oduzimanje u skupu brojeva do 10/i,
      o: ['Izračunaj:   [[7 - 2]]   [[9 - 3]]   [[10 - 4]]', 'Nacrtaj 8 balona i precrtaj 3. Koliko je ostalo?   [[8 - 3]]'],
      s: ['Izračunaj:   [[8 - 5]]   [[10 - 7]]   [[9 - 6]]   [[6 - 6]]', 'Dopuni:   [[10 - ___ = 6 | 4]]'],
      n: ['Na grani je bilo 10 jabuka. Palo je 4. Koliko je ostalo? [[= 10 - 4]]', 'Napiši 2 računa oduzimanja čiji je rezultat 3.'],
    },
    {
      id: 'm1-veza-nepoznati', r: [1], t: /veza izme.u sabiranja i oduzimanja do 10/i,
      o: ['Dopuni kružiće do 10 i upiši broj:  ●●●●●● ○○○○   [[6 + ___ = 10 | 4]]', 'Dopuni:   [[3 + ___ = 5 | 2]]'],
      s: ['Od računa 3 + 5 = 8 napiši dva računa oduzimanja:   [[8 - 5]]   [[8 - 3]]', 'Dopuni:   [[___ + 4 = 9 | 5]]   [[7 - ___ = 2 | 5]]'],
      n: ['Dopuni:   [[___ - 4 = 5 | 9]]', 'Zamislio sam broj. Kad mu dodam 3, dobijem 9. Koji sam broj zamislio? [[= 9 - 3]]'],
    },
    {
      id: 'm1-tekstualni-10', r: [1], t: /tekstualni.*do 10/i,
      o: ['U vazi su 3 crvena i 4 žuta cvijeta. Koliko je cvjetova? Nacrtaj i izračunaj. [[= 3 + 4]]', 'Na stolu je 5 čaša. Djeca su uzela 2. Koliko je ostalo? [[= 5 - 2]]'],
      s: ['Mama je kupila 9 jaja. Za kolač je potrošila 5. Koliko je jaja ostalo? [[= 9 - 5]]', 'U parku je 6 djece. Došlo je još 4. Koliko je djece u parku? [[= 6 + 4]]'],
      n: ['Mia ima 6 sličica. Dobila je još 3, a zatim je 2 poklonila sestri. Koliko sličica sada ima? [[= 6 + 3 - 2]]', 'Smisli priču za račun 7 - 3 i nacrtaj je.'],
    },
    {
      id: 'm1-tri-broja', r: [1], t: /tri broja/i,
      o: ['Izračunaj:   [[2 + 3 + 1]]   [[4 + 1 + 2]]', 'Nacrtaj 2, pa 2, pa još 3 kružića. Koliko ih je?   [[2 + 2 + 3]]'],
      s: ['Izračunaj:   [[9 - 4 + 3]]   [[8 - 2 - 3]]   [[5 + 4 - 6]]', 'Izračunaj:   [[10 - 5 - 5]]   [[3 + 3 + 3]]'],
      n: ['U autobusu je bilo 6 putnika. Na stanici su ušla 3, a izašla 4. Koliko je putnika sada? [[= 6 + 3 - 4]]', 'Dopuni:   [[4 + 2 + ___ = 10 | 4]]'],
    },
    {
      id: 'm1-do-20', r: [1], t: /od 11 do 20/i,
      o: ['Dopuni niz:  11, 12, ___, 14, ___, 16, 17, ___, 19, 20  [[! 13, 15, 18]]', 'Napiši brojem: jedanaest ___, petnaest ___, dvadeset ___  [[! 11, 15, 20]]'],
      s: ['Upiši znak <, > ili =:   [[13 ? 17]]   [[20 ? 12]]   [[15 ? 15]]', 'Napiši prethodnik i sljedbenik broja 16.  [[! 15 i 17]]'],
      n: ['Koliko desetica i koliko jedinica ima broj 16?  ___ D  ___ J  [[! 1 D 6 J]]', 'Napiši broj koji ima 1 deseticu i 9 jedinica.  [[! 19]]'],
    },
    {
      id: 'm1-sistematizacija', r: [1], t: /sistematizacija/i,
      o: ['Izračunaj:   [[4 + 3]]   [[9 - 5]]   [[6 + 4]]', 'Nacrtaj krug, trougao i kvadrat.'],
      s: ['Izračunaj:   [[8 - 3 + 2]]   [[10 - 6]]   [[5 + 5]]', 'Upiši znak <, > ili =:   [[14 ? 11]]   [[7 + 2 ? 9]]'],
      n: ['U razredu je 10 djece. 6 su djevojčice. Koliko je dječaka? [[= 10 - 6]]', 'Dopuni niz:  20, 19, 18, ___, ___, 15  [[! 17, 16]]'],
    },

    // ============================ 2. RAZRED ============================
    {
      id: 'm2-ponavljanje', r: [2], t: /ponavljanje gradiva iz 1/i,
      o: ['Izračunaj:   [[12 + 5]]   [[18 - 6]]   [[14 + 3]]', 'Dopuni niz:  10, 11, ___, 13, ___, 15  [[! 12, 14]]'],
      s: ['Upiši znak <, > ili =:   [[13 + 4 ? 20 - 2]]   [[19 - 5 ? 14]]', 'Dopuni:   [[19 - ___ = 15 | 4]]   [[11 + ___ = 18 | 7]]'],
      n: ['U razredu je 12 djevojčica i 7 dječaka. Koliko je učenika? [[= 12 + 7]]', 'Napiši sve brojeve od 11 do 20 koji imaju cifru 1 dva puta.  [[! 11]]'],
    },
    {
      id: 'm2-desetice', r: [2], t: /desetice prve stotine/i,
      o: ['Dopuni niz:  10, 20, ___, 40, ___, 60, ___, 80, 90, ___  [[! 30, 50, 70, 100]]', 'Napiši riječima broj 70.  [[! sedamdeset]]'],
      s: ['Upiši znak <, > ili =:   [[40 ? 70]]   [[90 ? 60]]   [[50 ? 50]]', 'Koliko desetica ima broj 80?  [[! 8]]'],
      n: ['Koliko jedinica ima u 3 desetice?  [[! 30]]', 'Koliko desetica treba dodati broju 60 da dobiješ 100?  [[! 4]]'],
    },
    {
      id: 'm2-do-100', r: [2], t: /od 21 do 100/i,
      o: ['Napiši broj: 4 desetice i 7 jedinica = ___  [[! 47]]', 'Napiši riječima broj 35.  [[! trideset pet]]'],
      s: ['Rastavi broj: 68 = ___ D ___ J  [[! 6 D 8 J]]', 'Dopuni niz:  46, 47, ___, ___, 50  [[! 48, 49]]'],
      n: ['Napiši najmanji i najveći dvocifreni broj.  [[! 10 i 99]]', 'Koji dvocifreni broj ima obje cifre 7?  [[! 77]]'],
    },
    {
      id: 'm2-uporedjivanje-100', r: [2], t: /upore.ivanje brojeva do 100/i,
      o: ['Upiši znak <, > ili =:   [[45 ? 54]]   [[72 ? 27]]   [[60 ? 60]]', 'Napiši sljedbenik broja 39.  [[! 40]]'],
      s: ['Napiši prethodnik i sljedbenik:   ___ 39 ___    ___ 80 ___  [[! 38 i 40; 79 i 81]]', 'Zaokruži parne brojeve: 12, 17, 24, 35, 40  [[! 12, 24, 40]]'],
      n: ['Napiši sve neparne brojeve između 30 i 40.  [[! 31, 33, 35, 37, 39]]', 'Poređaj od najvećeg: 58, 85, 50, 80  [[! 85, 80, 58, 50]]'],
    },
    {
      id: 'm2-rimski', r: [2], t: /rimski brojevi od i do xii/i,
      o: ['Napiši rimskim brojem:  3 = ___   5 = ___   10 = ___  [[! III, V, X]]', 'Napiši redni broj riječima: 2. = ___  [[! drugi]]'],
      s: ['Pročitaj i napiši arapskim brojem:  IV = ___   IX = ___   XII = ___  [[! 4, 9, 12]]', 'Napiši rimskim brojem 7 i 11.  [[! VII, XI]]'],
      n: ['Na satu sa rimskim brojevima mala kazaljka je na VII, a velika na XII. Koliko je sati?  [[! 7 sati]]', 'Koji si po redu u imeniku? Napiši rednim brojem.'],
    },
    {
      id: 'm2-visestruke-desetice', r: [2], t: /vi.estrukih desetica do 100/i,
      o: ['Izračunaj:   [[40 + 30]]   [[80 - 50]]   [[20 + 60]]', 'Izračunaj:   [[50 + 50]]   [[90 - 10]]'],
      s: ['Izračunaj:   [[90 - 70]]   [[30 + 40 + 20]]   [[100 - 60]]', 'Dopuni:   [[70 + ___ = 100 | 30]]'],
      n: ['U jednoj kutiji je 30 olovaka, a u drugoj 50. Koliko je olovaka ukupno? [[= 30 + 50]] Koliko još treba do 100? [[= 100 - 80]]', 'Napiši 3 računa sa deseticama čiji je rezultat 60.'],
    },
    {
      id: 'm2-dj-plus-j-bez', r: [2], t: /sabiranje dvocifrenog i jednocifrenog broja bez prelaza/i,
      o: ['Izračunaj:   [[34 + 5]]   [[52 + 6]]   [[71 + 3]]', 'Izračunaj:   [[23 + 4]]   [[60 + 8]]'],
      s: ['Izračunaj:   [[43 + 6]]   [[85 + 4]]   [[6 + 62]]', 'Dopuni:   [[31 + ___ = 38 | 7]]'],
      n: ['Na parkingu su 42 auta. Došlo je još 7. Koliko je auta? [[= 42 + 7]]', 'Napiši 2 računa sabiranja dvocifrenog i jednocifrenog broja sa rezultatom 59.'],
    },
    {
      id: 'm2-dj-minus-j-bez', r: [2], t: /oduzimanje jednocifrenog od dvocifrenog broja bez prelaza/i,
      o: ['Izračunaj:   [[39 - 5]]   [[48 - 6]]   [[57 - 3]]', 'Izračunaj:   [[26 - 4]]   [[99 - 9]]'],
      s: ['Izračunaj:   [[68 - 7]]   [[76 - 4]]   [[85 - 5]]', 'Dopuni:   [[47 - ___ = 42 | 5]]'],
      n: ['U voćnjaku je 38 stabala. Posječeno je 5 suhih. Koliko je ostalo? [[= 38 - 5]]', 'Napiši 2 računa oduzimanja čiji je rezultat 61.'],
    },
    {
      id: 'm2-desetica-plus', r: [2], t: /dvocifrenog broja i desetice/i,
      o: ['Izračunaj:   [[43 + 20]]   [[63 - 20]]   [[25 + 30]]', 'Izračunaj:   [[17 + 40]]   [[88 - 50]]'],
      s: ['Izračunaj:   [[78 - 40]]   [[56 + 30]]   [[91 - 50]]', 'Dopuni:   [[34 + ___ = 74 | 40]]'],
      n: ['Petar je imao 64 KM. Potrošio je 30 KM. Koliko mu je ostalo? [[= 64 - 30]]', 'Od broja 95 oduzmi 3 desetice, pa dodaj 2 desetice. Koji si broj dobio/la? [[= 95 - 30 + 20]]'],
    },
    {
      id: 'm2-dd-plus-bez', r: [2], t: /sabiranje dva dvocifrena broja bez prelaza/i,
      o: ['Izračunaj:   [[34 + 25]]   [[41 + 36]]   [[22 + 15]]', 'Izračunaj:   [[50 + 27]]'],
      s: ['Izračunaj:   [[53 + 24]]   [[62 + 37]]   [[45 + 43]]', 'Dopuni:   [[32 + ___ = 57 | 25]]'],
      n: ['Na izletu su 34 djece iz jednog i 25 iz drugog odjeljenja. Koliko je djece? [[= 34 + 25]]', 'Koja dva dvocifrena broja daju zbir 66? Napiši 2 primjera.'],
    },
    {
      id: 'm2-dd-minus-bez', r: [2], t: /oduzimanje dva dvocifrena broja bez prelaza/i,
      o: ['Izračunaj:   [[59 - 25]]   [[78 - 34]]   [[46 - 23]]', 'Izračunaj:   [[90 - 40]]'],
      s: ['Izračunaj:   [[87 - 52]]   [[99 - 48]]   [[65 - 31]]', 'Dopuni:   [[68 - ___ = 23 | 45]]'],
      n: ['Biblioteka je imala 86 knjiga. Učenici su posudili 42. Koliko je knjiga ostalo? [[= 86 - 42]]', 'Provjeri sabiranjem da je 77 - 35 = 42.  [[= 42 + 35]]'],
    },
    {
      id: 'm2-dopuna-desetice', r: [2], t: /dopuna dvocifrenog broja/i,
      o: ['Izračunaj:   [[36 + 4]]   [[52 + 8]]   [[40 - 6]]', 'Izračunaj:   [[70 - 3]]'],
      s: ['Dopuni do desetice:   [[27 + ___ = 30 | 3]]   [[64 + ___ = 70 | 6]]', 'Izračunaj:   [[80 - 4]]   [[60 - 9]]'],
      n: ['Ana ima 45 sličica. Koliko joj treba do 50? [[= 50 - 45]] A do 60? [[= 60 - 45]]', 'Dopuni:   [[90 - ___ = 82 | 8]]'],
    },
    {
      id: 'm2-dj-plus-j-sa', r: [2], t: /sabiranje dvocifrenog i jednocifrenog broja sa prelazom/i,
      o: ['Izračunaj:   [[27 + 6]]   [[38 + 5]]   [[49 + 3]]', 'Izračunaj (prvo do desetice):   27 + 3 + 3 = ___  [[! 33]]'],
      s: ['Izračunaj:   [[56 + 8]]   [[65 + 7]]   [[9 + 74]]', 'Dopuni:   [[46 + ___ = 52 | 6]]'],
      n: ['Na drvetu su 47 ptica. Doletjelo je još 8. Koliko ih je? [[= 47 + 8]]', 'Napiši 2 računa sa prelazom preko desetice čiji je zbir 41.'],
    },
    {
      id: 'm2-dj-minus-j-sa', r: [2], t: /oduzimanje jednocifrenog od dvocifrenog broja sa prelazom/i,
      o: ['Izračunaj:   [[33 - 6]]   [[42 - 5]]   [[51 - 4]]', 'Izračunaj (prvo do desetice):   33 - 3 - 3 = ___  [[! 27]]'],
      s: ['Izračunaj:   [[64 - 7]]   [[80 - 3]]   [[75 - 9]]', 'Dopuni:   [[52 - ___ = 45 | 7]]'],
      n: ['U kutiji su 32 bombone. Djeca su pojela 7. Koliko je ostalo? [[= 32 - 7]]', 'Napiši 2 računa oduzimanja sa prelazom preko desetice čiji je rezultat 28.'],
    },
    {
      id: 'm2-dd-plus-sa', r: [2], t: /sabiranje dva dvocifrena broja sa prelazom/i,
      o: ['Izračunaj:   [[38 + 25]]   [[47 + 16]]   [[29 + 34]]', 'Izračunaj:   [[15 + 15]]'],
      s: ['Izračunaj:   [[56 + 37]]   [[48 + 48]]   [[19 + 64]]', 'Dopuni:   [[27 + ___ = 65 | 38]]'],
      n: ['U jednoj vreći je 28 kg brašna, a u drugoj 35 kg. Koliko je ukupno? [[= 28 + 35]]', 'Zbir dva broja je 90. Jedan je 46. Koji je drugi? [[= 90 - 46]]'],
    },
    {
      id: 'm2-dd-minus-sa', r: [2], t: /oduzimanje dva dvocifrena broja sa prelazom/i,
      o: ['Izračunaj:   [[63 - 27]]   [[52 - 18]]   [[71 - 35]]', 'Izračunaj:   [[40 - 15]]'],
      s: ['Izračunaj:   [[90 - 46]]   [[84 - 59]]   [[65 - 38]]', 'Dopuni:   [[73 - ___ = 45 | 28]]'],
      n: ['Voz je imao 82 putnika. Na stanici je izašlo 37. Koliko je putnika ostalo? [[= 82 - 37]]', 'Provjeri sabiranjem: 61 - 24 = 37.  [[= 37 + 24]]'],
    },
    {
      id: 'm2-veza-provjera', r: [2], t: /veza izme.u sabiranja i oduzimanja; provjera/i,
      o: ['Izračunaj:   [[46 + 23]]   Provjeri oduzimanjem:   [[69 - 23]]', 'Izračunaj:   [[58 - 31]]'],
      s: ['Izračunaj:   [[85 - 38]]   Provjeri sabiranjem:   [[47 + 38]]', 'Od računa 35 + 27 = 62 napiši dva računa oduzimanja.  [[! 62 - 27 = 35; 62 - 35 = 27]]'],
      n: ['Mirza je izračunao 54 - 27 = 37. Provjeri sabiranjem i ispravi grešku.  [[! tačno je 54 - 27 = 27]]', 'Smisli račun sabiranja i provjeri ga oduzimanjem.'],
    },
    {
      id: 'm2-nepoznati-sabirak', r: [2], t: /nepoznatog sabirka/i,
      o: ['Riješi:   [[x + 24 = 60 | 36]]', 'Dopuni:   [[35 + ___ = 50 | 15]]'],
      s: ['Riješi:   [[x - 18 = 35 | 53]]   [[52 - x = 28 | 24]]', 'Riješi:   [[x + 17 = 43 | 26]]'],
      n: ['Zamislio sam broj, oduzeo 15 i dobio 40. Koji sam broj zamislio? [[= 40 + 15]]', 'Napiši jednačinu za zadatak: „Imao sam neke bombone, dobio još 12 i sada imam 30.“ Riješi je.  [[! x + 12 = 30; x = 18]]'],
    },
    {
      id: 'm2-zamjena-zdruzivanje', r: [2], t: /zamjena mjesta i zdru.ivanje/i,
      o: ['Izračunaj na dva načina:   [[23 + 45]]   [[45 + 23]]', 'Izračunaj:   [[(10 + 5) + 4]]'],
      s: ['Izračunaj:   [[(17 + 3) + 25]]   [[17 + (3 + 25)]]', 'Izračunaj:   [[60 - (20 + 10)]]'],
      n: ['Izračunaj na najlakši način:   [[36 + 18 + 4]]', 'Postavi zagrade da bude tačno:  50 - 20 + 10 = 20  [[! 50 - (20 + 10) = 20]]'],
    },
    {
      id: 'm2-prava-duz', r: [2], t: /prava, poluprava i du/i,
      o: ['Nacrtaj lenjirom duž AB i označi tačke A i B.', 'Nacrtaj pravu i označi je slovom p.'],
      s: ['Nacrtaj polupravu sa početkom u tački O.', 'Nacrtaj duž CD dugu 5 cm.'],
      n: ['Nacrtaj 3 tačke koje nisu na istoj pravoj i spoji ih dužima. Koliko duži si nacrtao/la?  [[! 3]]', 'Koja je razlika između prave i duži? Napiši jednom rečenicom.  [[! duž ima početak i kraj, prava nema]]'],
    },
    {
      id: 'm2-mjerenje-duzine', r: [2], t: /mjerenje du/i,
      o: ['Izmjeri lenjirom svoju olovku: ___ cm', 'Nacrtaj duž dugu 6 cm.'],
      s: ['Dopuni:   1 m = ___ dm,   1 dm = ___ cm,   1 m = ___ cm  [[! 10, 10, 100]]', 'Šta je duže: 1 m ili 90 cm?  [[! 1 m]]'],
      n: ['Nacrtaj duž dugu 7 cm i duž za 3 cm kraću. Koliko je duga druga duž? [[= 7 - 3]]', 'Izmjeri dužinu i širinu svoje klupe u centimetrima.'],
    },
    {
      id: 'm2-izlomljena-mnogougao', r: [2], t: /izlomljena linija i mnogougao/i,
      o: ['Nacrtaj izlomljenu liniju od 3 duži.', 'Nacrtaj trougao.'],
      s: ['Nacrtaj trougao i četvorougao. Koliko stranica ima svaki?  [[! 3 i 4]]', 'Nacrtaj kvadrat i pravougaonik.'],
      n: ['Izlomljena linija ima duži od 3 cm, 4 cm i 5 cm. Kolika je njena dužina? [[= 3 + 4 + 5]]', 'Nacrtaj zatvorenu izlomljenu liniju od 5 duži. Kako se zove taj lik?  [[! petougao]]'],
    },
    {
      id: 'm2-pojam-mnozenja', r: [2], t: /pojam mno.enja/i,
      o: ['Zapiši kao množenje:  2 + 2 + 2 = ___ · ___  [[! 3 · 2 = 6]]', 'Nacrtaj 3 tanjira i na svaki 2 jabuke. Koliko je jabuka?   [[3 · 2]]'],
      s: ['Zapiši kao množenje i izračunaj:  5 + 5 + 5 + 5 = ___ · ___ = ___  [[! 4 · 5 = 20]]', 'Zapiši kao zbir i izračunaj:  3 · 4 = ___ + ___ + ___ = ___  [[! 4 + 4 + 4 = 12]]'],
      n: ['Na 4 stola su po 3 jabuke. Koliko je jabuka? Zapiši sabiranjem i množenjem. [[= 4 · 3]]', 'Kako se zovu brojevi u računu 2 · 5 = 10?  [[! činioci 2 i 5, proizvod 10]]'],
    },
    {
      id: 'm2-pojam-dijeljenja', r: [2], t: /pojam dijeljenja/i,
      o: ['Podijeli 8 bombona jednako na 2 djece. Nacrtaj.   [[8 : 2]]', 'Podijeli 6 jabuka na 3 tanjira jednako.   [[6 : 3]]'],
      s: ['Izračunaj:   [[12 : 3]]   [[10 : 5]]', 'Koliko puta 4 ima u broju 12?  [[! 3]]'],
      n: ['15 jabuka stavljamo u kese po 5. Koliko kesa nam treba? [[= 15 : 5]]', 'Kako se zovu brojevi u računu 12 : 3 = 4?  [[! djeljenik 12, djelilac 3, količnik 4]]'],
    },
    {
      id: 'm2-tablica-10-1-0', r: [2], t: /brojem 10, brojem 1 i mno.enje nulom/i,
      o: ['Izračunaj:   [[6 · 10]]   [[8 · 1]]   [[5 · 0]]', 'Izračunaj:   [[40 : 10]]   [[7 : 1]]'],
      s: ['Izračunaj:   [[10 · 9]]   [[0 · 7]]   [[90 : 10]]   [[1 · 1]]', 'Dopuni:   [[___ · 10 = 70 | 7]]   [[___ · 1 = 4 | 4]]'],
      n: ['U 7 kutija je po 10 olovaka. Koliko je olovaka? [[= 7 · 10]]', 'Koliko je 0 · 100? Objasni drugu zašto.  [[! 0]]'],
    },
    {
      id: 'm2-tablica-n', r: [2], t: /mno.enje i dijeljenje brojem (\d)\b/i,
      f: (m) => tablica(Number(m[1])),
    },
    {
      id: 'm2-relacije', r: [2], t: /toliko puta ve/i,
      o: ['Broj 6 povećaj za 3: ___. Broj 6 povećaj 3 puta: ___  [[= 6 + 3]] [[= 6 · 3]]', 'Broj 20 umanji za 4: ___. Broj 20 umanji 4 puta: ___  [[= 20 - 4]] [[= 20 : 4]]'],
      s: ['Za koliko je broj 40 veći od 8? [[= 40 - 8]] Koliko puta je veći? [[= 40 : 8]]', 'Izračunaj:   [[7 · 8]]   [[63 : 9]]   [[6 · 6]]'],
      n: ['Ana ima 4 olovke, a Mira 3 puta više. Koliko olovaka imaju zajedno? [[= 4 + 4 · 3]]', 'Ivan ima 18 sličica, a Lana 3 puta manje. Koliko sličica ima Lana? [[= 18 : 3]]'],
    },
    {
      id: 'm2-redoslijed', r: [2], t: /redoslijed ra.unskih operacija/i,
      o: ['Izračunaj:   [[3 + 4 · 2]]   [[20 - 12 : 3]]', 'Izračunaj:   [[(3 + 4) · 2]]'],
      s: ['Izračunaj:   [[36 : 6 + 7]]   [[50 - 5 · 8]]   [[(9 - 4) · 6]]', 'Izračunaj:   [[4 · 5 - 3 · 2]]'],
      n: ['Postavi zagrade da bude tačno:  2 · 3 + 4 = 14  [[! 2 · (3 + 4) = 14]]', 'Mama je kupila 3 hljeba po 2 KM i mlijeko za 3 KM. Koliko je platila? [[= 3 · 2 + 3]]'],
    },
    {
      id: 'm2-nepoznati-cinilac', r: [2], t: /nepoznatog .inioca/i,
      o: ['Riješi:   [[3 · x = 21 | 7]]', 'Dopuni:   [[___ · 5 = 30 | 6]]'],
      s: ['Riješi:   [[x : 4 = 6 | 24]]   [[32 : x = 8 | 4]]', 'Riješi:   [[x · 7 = 56 | 8]]'],
      n: ['Kojim brojem treba pomnožiti 9 da dobiješ 54? [[= 54 : 9]]', 'Zamislio sam broj, podijelio ga sa 5 i dobio 8. Koji je broj? [[= 8 · 5]]'],
    },
    {
      id: 'm2-mjerenje', r: [2], t: /mjerenje mase/i,
      o: ['Koliko feninga ima 1 KM?  [[! 100]]', 'Koliko dana ima sedmica?  [[! 7]]'],
      s: ['Dopuni:  1 sat = ___ minuta,   1 godina = ___ mjeseci  [[! 60, 12]]', 'Mlijeko košta 2 KM, a hljeb 1 KM. Koliko plaćamo za oboje? [[= 2 + 1]]'],
      n: ['Imaš 10 KM. Kupiš sok za 3 KM i keks za 4 KM. Koliko ti ostaje? [[= 10 - 3 - 4]]', 'U posudi je 5 l vode. Koliko flaša od 1 l možeš napuniti?  [[! 5]]'],
    },
    {
      id: 'm2-sistematizacija', r: [2], t: /sistematizacija/i,
      o: ['Izračunaj:   [[45 + 32]]   [[86 - 54]]   [[6 · 7]]', 'Izračunaj:   [[36 : 4]]   [[9 · 3]]'],
      s: ['Izračunaj:   [[38 + 27]]   [[63 - 28]]   [[(45 + 15) - 24]]', 'Riješi:   [[x + 19 = 52 | 33]]'],
      n: ['U voćnjaku je ubrano 35 kg jabuka i 12 kg manje krušaka. Koliko je voća ubrano ukupno? [[= 35 + (35 - 12)]]', 'Riješi:   [[x : 6 = 7 | 42]]'],
    },

    // ============================ 3. RAZRED ============================
    {
      id: 'm3-ponavljanje', r: [3], t: /ponavljanje gradiva iz 2/i,
      o: ['Izračunaj:   [[45 + 32]]   [[87 - 54]]   [[6 · 7]]', 'Izračunaj:   [[56 : 8]]'],
      s: ['Izračunaj:   [[63 - 28]]   [[4 · 9 + 15]]   [[72 : 9 · 3]]', 'Riješi:   [[x · 6 = 48 | 8]]'],
      n: ['Ana je kupila 3 sveske po 4 KM i olovku za 2 KM. Koliko je platila? [[= 3 · 4 + 2]]', 'Riješi:   [[x - 37 = 45 | 82]]'],
    },
    {
      id: 'm3-stotine', r: [3], t: /stotine prve hiljade/i,
      o: ['Dopuni niz:  100, 200, ___, 400, ___, 600, ___, 800, 900, ___  [[! 300, 500, 700, 1000]]', 'Napiši riječima broj 600.  [[! šest stotina]]'],
      s: ['Upiši znak <, > ili =:   [[300 ? 700]]   [[900 ? 600]]', 'Koliko desetica ima broj 400?  [[! 40]]'],
      n: ['Koliko stotina ima u 1000?  [[! 10]]', 'Izračunaj:   [[1000 - 300]]   [[400 + 500]]'],
    },
    {
      id: 'm3-visekratnici-10', r: [3], t: /vi.ekratnici broja 10/i,
      o: ['Napiši ciframa:  dvjesta trideset = ___,  petsto osamdeset = ___  [[! 230, 580]]', 'Dopuni niz:  230, 240, ___, ___, 270  [[! 250, 260]]'],
      s: ['Upiši znak <, > ili =:   [[480 ? 840]]   [[650 ? 560]]', 'Napiši riječima broj 370.  [[! trista sedamdeset]]'],
      n: ['Napiši sve višekratnike broja 10 između 350 i 400.  [[! 360, 370, 380, 390]]', 'Koliko desetica ima broj 580?  [[! 58]]'],
    },
    {
      id: 'm3-trocifreni', r: [3], t: /trocifrenih brojeva do 1000 .* mjesna/i,
      o: ['Napiši broj: 4 S, 7 D, 5 J = ___  [[! 475]]', 'Pročitaj i napiši riječima: 306  [[! trista šest]]'],
      s: ['U broju 638 cifra 3 označava ___, a cifra 6 ___.  [[! desetice; stotine]]', 'Napiši broj: 9 S, 0 D, 4 J = ___  [[! 904]]'],
      n: ['Napiši najveći i najmanji trocifreni broj od cifara 2, 7 i 5 (svaka jednom).  [[! 752 i 257]]', 'Koliko je trocifrenih brojeva sa cifrom stotina 9?  [[! 100 (od 900 do 999)]]'],
    },
    {
      id: 'm3-rastavljanje', r: [3], t: /rastavljanje trocifrenih/i,
      o: ['Rastavi broj:  362 = ___ + ___ + ___  [[! 300 + 60 + 2]]', 'Sastavi broj:   [[800 + 40 + 9]]'],
      s: ['Rastavi:  906 = ___ + ___  [[! 900 + 6]]', 'Sastavi:   [[500 + 8]]   [[700 + 70 + 7]]'],
      n: ['Koji broj ima 5 stotina, 0 desetica i 8 jedinica?  [[! 508]]', 'Rastavi broj 475 na dva različita načina.  [[! npr. 400 + 75; 470 + 5]]'],
    },
    {
      id: 'm3-uporedjivanje-1000', r: [3], t: /upore.ivanje trocifrenih/i,
      o: ['Upiši znak <, > ili =:   [[456 ? 465]]   [[799 ? 801]]', 'Napiši sljedbenik broja 499.  [[! 500]]'],
      s: ['Napiši prethodnik i sljedbenik:   ___ 500 ___    ___ 999 ___  [[! 499 i 501; 998 i 1000]]', 'Zaokruži neparne brojeve: 314, 527, 680, 999  [[! 527, 999]]'],
      n: ['Poređaj od najmanjeg: 709, 790, 970, 907  [[! 709, 790, 907, 970]]', 'Napiši sve parne brojeve između 395 i 405.  [[! 396, 398, 400, 402, 404]]'],
    },
    {
      id: 'm3-rimski', r: [3], t: /rimski brojevi do 100 i do 1000/i,
      o: ['Napiši rimskim brojem:  4 = ___   9 = ___   40 = ___   50 = ___  [[! IV, IX, XL, L]]', 'Napiši arapskim brojem:  XX = ___  [[! 20]]'],
      s: ['Pročitaj:  XXIV = ___   LXX = ___   XC = ___  [[! 24, 70, 90]]', 'Napiši rimskim brojem 100 i 500.  [[! C, D]]'],
      n: ['Napiši rimskim brojem:  349 = ___   1000 = ___  [[! CCCXLIX, M]]', 'Napiši rimskim brojem svoj razred i datum rođenja (dan i mjesec).'],
    },
    {
      id: 'm3-usmeno-stotine', r: [3], t: /usmeno sabiranje i oduzimanje stotina/i,
      o: ['Izračunaj:   [[300 + 400]]   [[900 - 500]]   [[340 + 200]]', 'Izračunaj:   [[600 + 300]]'],
      s: ['Izračunaj:   [[650 - 300]]   [[470 + 500]]   [[1000 - 600]]', 'Dopuni:   [[350 + ___ = 950 | 600]]'],
      n: ['Jedna škola ima 340 učenika, a druga 200 više. Koliko učenika ima druga škola? [[= 340 + 200]] Koliko imaju zajedno? [[= 340 + 540]]', 'Izračunaj:   [[1000 - 200 - 300]]'],
    },
    {
      id: 'm3-usmeno-bez', r: [3], t: /usmeno sabiranje i oduzimanje u prvoj hiljadi bez/i,
      o: ['Izračunaj:   [[432 + 5]]   [[432 + 40]]   [[324 + 253]]', 'Izračunaj:   [[768 - 5]]'],
      s: ['Izračunaj:   [[768 - 40]]   [[879 - 543]]   [[615 + 274]]', 'Dopuni:   [[245 + ___ = 789 | 544]]'],
      n: ['Prodavnica je imala 586 jaja i prodala 254. Koliko je ostalo? [[= 586 - 254]]', 'Izračunaj:   [[123 + 456 - 202]]'],
    },
    {
      id: 'm3-usmeno-sa', r: [3], t: /usmeno sabiranje i oduzimanje sa prelazom/i,
      o: ['Izračunaj:   [[257 + 6]]   [[380 + 50]]   [[430 - 50]]', 'Izračunaj:   [[495 + 8]]'],
      s: ['Izračunaj:   [[620 - 70]]   [[701 - 3]]   [[586 + 40]]', 'Dopuni:   [[470 + ___ = 520 | 50]]'],
      n: ['Prodavnica je imala 380 jaja. Stiglo je još 70, a prodato je 150. Koliko jaja ima sada? [[= 380 + 70 - 150]]', 'Izračunaj:   [[999 + 1]]   [[1000 - 1]]'],
    },
    {
      id: 'm3-pismeno-plus-bez', r: [3], t: /pismeno sabiranje trocifrenih brojeva bez/i,
      o: ['Potpiši brojeve jedan ispod drugog i saberi:   [[342 + 526]]', 'Saberi:   [[213 + 145]]'],
      s: ['Saberi:   [[413 + 275]]   [[251 + 634 + 103]]', 'Saberi:   [[602 + 296]]'],
      n: ['U voćnjaku su 324 jabuke, a krušaka je 152 više. Koliko je krušaka? [[= 324 + 152]] Koliko je voćki ukupno? [[= 324 + 476]]', 'Napiši dva trocifrena broja čiji je zbir 999.'],
    },
    {
      id: 'm3-pismeno-minus-bez', r: [3], t: /pismeno oduzimanje trocifrenih brojeva bez/i,
      o: ['Potpiši i oduzmi:   [[879 - 543]]', 'Oduzmi:   [[658 - 234]]'],
      s: ['Oduzmi:   [[968 - 325]]   [[795 - 462]]', 'Provjeri sabiranjem:   [[333 + 462]]'],
      n: ['Put je dug 586 km. Prešli smo 245 km. Koliko je ostalo? [[= 586 - 245]]', 'Riješi:   [[x + 312 = 978 | 666]]'],
    },
    {
      id: 'm3-pismeno-plus-jedan', r: [3], t: /pismeno sabiranje trocifrenih brojeva sa jednim/i,
      o: ['Saberi:   [[248 + 325]]', 'Saberi:   [[372 + 465]]'],
      s: ['Saberi:   [[156 + 238]]   [[427 + 381]]', 'Saberi:   [[509 + 284]]'],
      n: ['Prvog dana prodato je 286 karata, a drugog 153. Koliko ukupno? [[= 286 + 153]]', 'Napiši zadatak sa sabiranjem trocifrenih brojeva i riješi ga.'],
    },
    {
      id: 'm3-pismeno-plus-dva', r: [3], t: /pismeno sabiranje trocifrenih brojeva sa dva/i,
      o: ['Saberi:   [[468 + 375]]', 'Saberi:   [[257 + 168]]'],
      s: ['Saberi:   [[589 + 256]]   [[125 + 236 + 318]]', 'Saberi:   [[399 + 401]]'],
      n: ['Fabrika je prvog dana napravila 378, drugog 455, a trećeg 167 komada. Koliko ukupno? [[= 378 + 455 + 167]]', 'Koji broj treba dodati broju 467 da dobiješ 1000? [[= 1000 - 467]]'],
    },
    {
      id: 'm3-pismeno-minus-jedan', r: [3], t: /pismeno oduzimanje trocifrenih brojeva sa jednim/i,
      o: ['Oduzmi:   [[562 - 237]]', 'Oduzmi:   [[628 - 354]]'],
      s: ['Oduzmi:   [[745 - 318]]   [[930 - 510]]', 'Provjeri sabiranjem:   [[427 + 318]]'],
      n: ['U bazenu je bilo 640 l vode. Isteklo je 218 l. Koliko je ostalo? [[= 640 - 218]]', 'Riješi:   [[x - 236 = 517 | 753]]'],
    },
    {
      id: 'm3-pismeno-minus-dva', r: [3], t: /pismeno oduzimanje trocifrenih brojeva sa dva/i,
      o: ['Oduzmi:   [[732 - 468]]', 'Oduzmi:   [[600 - 247]]'],
      s: ['Oduzmi:   [[1000 - 386]]   [[805 - 579]]', 'Provjeri sabiranjem:   [[226 + 579]]'],
      n: ['Imali smo 1000 KM. Za ekskurziju smo dali 468 KM. Koliko je ostalo? [[= 1000 - 468]]', 'Razlika dva broja je 275. Umanjilac je 389. Koliki je umanjenik? [[= 389 + 275]]'],
    },
    {
      id: 'm3-jednacine-plus', r: [3], t: /svojstva sabiranja, veza sabiranja i oduzimanja i jedna/i,
      o: ['Riješi:   [[x + 245 = 680 | 435]]', 'Izračunaj na lakši način:   [[198 + 37 + 2]]'],
      s: ['Riješi:   [[x - 318 = 425 | 743]]   [[810 - x = 365 | 445]]', 'Riješi:   [[x + 99 = 500 | 401]]'],
      n: ['Kojem broju treba dodati 276 da dobiješ 900? [[= 900 - 276]]', 'Zamislio sam broj, oduzeo 150 i dobio 600. Koji je broj? [[= 600 + 150]]'],
    },
    {
      id: 'm3-tablica-ponavljanje', r: [3], t: /mno.enje i dijeljenje u skupu brojeva do 100/i,
      o: ['Izračunaj:   [[7 · 8]]   [[6 · 9]]   [[56 : 7]]', 'Izračunaj:   [[4 · 6]]'],
      s: ['Izračunaj:   [[9 · 9]]   [[72 : 8]]   [[48 : 6]]', 'Dopuni:   [[8 · ___ = 64 | 8]]'],
      n: ['U 8 kutija je po 9 jaja. Koliko je jaja? [[= 8 · 9]] Koliko kutija po 6 jaja treba za ista jaja? [[= 72 : 6]]', 'Napiši sve načine da dobiješ 24 množenjem dva broja.  [[! 1·24, 2·12, 3·8, 4·6]]'],
    },
    {
      id: 'm3-ostatak', r: [3], t: /dijeljenje sa ostatkom/i,
      o: ['Izračunaj:   [[ost 17 : 5]]', 'Nacrtaj 13 kružića i podijeli ih u grupe po 4. Koliko je grupa, a koliko ostaje?  [[! 3 grupe, ostaje 1]]'],
      s: ['Izračunaj:   [[ost 29 : 4]]   [[ost 50 : 6]]', 'Provjeri: 29 = 7 · 4 + ___  [[! 1]]'],
      n: ['34 učenika ide na izlet čamcima u koje stane po 6. Koliko čamaca treba?  [[! 34 : 6 = 5 i ostatak 4, pa treba 6 čamaca]]', 'Koji najveći ostatak može biti pri dijeljenju sa 7?  [[! 6]]'],
    },
    {
      id: 'm3-puta-10-100', r: [3], t: /brojevima 10 i 100 u skupu/i,
      o: ['Izračunaj:   [[34 · 10]]   [[7 · 100]]   [[560 : 10]]', 'Izračunaj:   [[800 : 100]]'],
      s: ['Izračunaj:   [[45 · 10]]   [[900 : 10]]   [[3 · 100]]', 'Dopuni:   [[___ · 10 = 670 | 67]]'],
      n: ['Jedna sveska košta 3 KM. Koliko košta 100 svezaka? [[= 3 · 100]]', '780 kg brašna spakovano je u vreće od po 10 kg. Koliko je vreća? [[= 780 : 10]]'],
    },
    {
      id: 'm3-mnozenje-visestrukih', r: [3], t: /mno.enje vi.estrukih desetica/i,
      o: ['Izračunaj:   [[30 · 3]]   [[40 · 6]]', 'Izračunaj:   [[200 · 4]]'],
      s: ['Izračunaj:   [[70 · 8]]   [[300 · 3]]   [[90 · 5]]', 'Dopuni:   [[___ · 6 = 480 | 80]]'],
      n: ['U kutiji je 40 olovaka. Koliko je olovaka u 9 kutija? [[= 40 · 9]]', 'Karta za bioskop košta 5 KM. Koliko plaća 120 učenika? [[= 120 · 5]]'],
    },
    {
      id: 'm3-dijeljenje-visestrukih', r: [3], t: /dijeljenje vi.estrukih desetica/i,
      o: ['Izračunaj:   [[80 : 4]]   [[240 : 6]]', 'Izračunaj:   [[800 : 2]]'],
      s: ['Izračunaj:   [[360 : 9]]   [[900 : 3]]   [[480 : 8]]', 'Dopuni:   [[___ : 5 = 70 | 350]]'],
      n: ['560 jaja treba spakovati u 8 jednakih kutija. Koliko je jaja u kutiji? [[= 560 : 8]]', '420 KM podijeljeno je jednako na 6 učenika. Koliko je dobio svaki? [[= 420 : 6]]'],
    },
    {
      id: 'm3-distributivnost', r: [3], t: /mno.enje zbira i razlike/i,
      o: ['Izračunaj na dva načina:   [[(4 + 3) · 5]]   [[4 · 5 + 3 · 5]]', 'Izračunaj:   [[(10 + 2) · 3]]'],
      s: ['Izračunaj:   [[(20 + 6) · 3]]   [[(10 - 2) · 7]]', 'Izračunaj na dva načina:   [[(30 - 4) · 2]]'],
      n: ['Izračunaj pametno:  13 · 6 = (10 + 3) · 6 = ___  [[= (10 + 3) · 6]]', 'U 6 korpi je po 15 jaja. Izračunaj kao (10 + 5) · 6. [[= (10 + 5) · 6]]'],
    },
    {
      id: 'm3-usmeno-mnozenje', r: [3], t: /usmeno mno.enje dvocifrenog i trocifrenog/i,
      o: ['Izračunaj:   [[24 · 3]]   [[132 · 3]]', 'Izračunaj:   [[43 · 2]]'],
      s: ['Izračunaj:   [[212 · 4]]   [[31 · 5]]   [[16 · 6]]', 'Izračunaj:   [[125 · 4]]'],
      n: ['Karta za pozorište košta 12 KM. Koliko plaća 7 učenika? [[= 12 · 7]]', 'Jedna knjiga ima 123 stranice. Koliko stranica imaju 3 takve knjige? [[= 123 · 3]]'],
    },
    {
      id: 'm3-pismeno-mnozenje-bez', r: [3], t: /pismeno mno.enje .* bez prelaza/i,
      o: ['Pomnoži pismeno:   [[42 · 2]]   [[231 · 3]]', 'Pomnoži:   [[33 · 3]]'],
      s: ['Pomnoži:   [[123 · 3]]   [[302 · 3]]   [[211 · 4]]', 'Pomnoži:   [[110 · 5]]'],
      n: ['Autobus ima 43 sjedišta. Koliko sjedišta ima u 2 autobusa? [[= 43 · 2]]', 'Kojim brojem treba pomnožiti 221 da dobiješ 884? [[= 884 : 221]]'],
    },
    {
      id: 'm3-pismeno-mnozenje-sa', r: [3], t: /pismeno mno.enje .* sa prelazom/i,
      o: ['Pomnoži pismeno:   [[37 · 4]]', 'Pomnoži:   [[168 · 5]]'],
      s: ['Pomnoži:   [[59 · 6]]   [[124 · 7]]', 'Pomnoži:   [[85 · 8]]'],
      n: ['Učenik pročita 45 stranica sedmično. Koliko pročita za 8 sedmica? [[= 45 · 8]]', 'Jedna kutija je teška 125 kg. Koliko je teško 8 kutija? [[= 125 · 8]]'],
    },
    {
      id: 'm3-dijeljenje-zbira', r: [3], t: /dijeljenje zbira brojem/i,
      o: ['Izračunaj:   [[48 : 4]]   [[72 : 6]]', 'Izračunaj na dva načina:   [[(40 + 8) : 4]]   [[40 : 4 + 8 : 4]]'],
      s: ['Izračunaj:   [[96 : 8]]   [[85 : 5]]   [[78 : 3]]', 'Izračunaj:   [[(60 + 12) : 6]]'],
      n: ['84 učenika podijeljeno je u 7 jednakih grupa. Koliko je učenika u grupi? [[= 84 : 7]]', 'Izračunaj:   [[(90 + 9) : 9]]'],
    },
    {
      id: 'm3-pismeno-dijeljenje-mala-stotina', r: [3], t: /cifra stotina manja od djelioca/i,
      o: ['Podijeli pismeno:   [[256 : 4]]', 'Podijeli:   [[135 : 5]]'],
      s: ['Podijeli:   [[324 : 6]]   [[273 : 7]]', 'Provjeri množenjem:   [[39 · 7]]'],
      n: ['Za 168 KM kupljeno je 8 jednakih knjiga. Kolika je cijena knjige? [[= 168 : 8]]', 'Riješi:   [[x · 9 = 378 | 42]]'],
    },
    {
      id: 'm3-pismeno-dijeljenje', r: [3], t: /pismeno dijeljenje dvocifrenog i trocifrenog/i,
      o: ['Podijeli pismeno:   [[84 : 4]]   [[648 : 2]]', 'Podijeli:   [[96 : 3]]'],
      s: ['Podijeli:   [[735 : 5]]   [[936 : 3]]', 'Provjeri množenjem:   [[147 · 5]]'],
      n: ['Put od 852 km prešli smo za 4 dana, svaki dan jednako. Koliko km dnevno? [[= 852 : 4]]', 'Riješi:   [[x : 3 = 215 | 645]]'],
    },
    {
      id: 'm3-redoslijed-jednacine', r: [3], t: /redoslijed ra.unskih operacija i jedna/i,
      o: ['Riješi:   [[4 · x = 148 | 37]]', 'Izračunaj:   [[25 + 5 · 8]]'],
      s: ['Riješi:   [[x : 6 = 75 | 450]]   [[420 : x = 7 | 60]]', 'Izračunaj:   [[(120 - 40) : 8]]'],
      n: ['Izračunaj:   [[25 + 5 · 8 - 36 : 4]]', 'Broj pomnožen sa 4 i umanjen za 12 daje 28. Koji je to broj? [[= (28 + 12) : 4]]'],
    },
    {
      id: 'm3-razlomci', r: [3], t: /razlomci \(dijelovi cjeline\)/i,
      o: ['Nacrtaj krug i oboji njegovu polovinu (1/2).', 'Izračunaj:   [[dio 1/2 od 10]]'],
      s: ['Izračunaj:   [[dio 1/4 od 20]]   [[dio 1/3 od 18]]   [[dio 1/10 od 50]]', 'Nacrtaj pravougaonik, podijeli ga na 8 jednakih dijelova i oboji 1/8.'],
      n: ['Mama je ispekla 24 kolača. Trećinu su pojela djeca. Koliko je kolača ostalo? [[= 24 - 24 : 3]]', 'Šta je veće: 1/2 ili 1/4 iste torte? Nacrtaj.  [[! 1/2]]'],
    },
    {
      id: 'm3-ugao', r: [3], t: /kraci i tjeme ugla/i,
      o: ['Nacrtaj ugao i označi tjeme i krakove.', 'Nacrtaj pravu i na njoj duž AB.'],
      s: ['Nacrtaj pravi, oštri i tupi ugao. Pravi ugao nacrtaj pomoću trougaonika.', 'Koji je ugao manji od pravog: oštri ili tupi?  [[! oštri]]'],
      n: ['Koliko pravih uglova ima kvadrat, a koliko pravougaonik?  [[! 4 i 4]]', 'Pronađi u učionici 2 prava ugla i zapiši gdje su.'],
    },
    {
      id: 'm3-paralelne', r: [3], t: /paralelne i normalne/i,
      o: ['Nacrtaj dvije paralelne prave pomoću lenjira i trougaonika.', 'Nacrtaj dvije prave koje se sijeku.'],
      s: ['Nacrtaj pravu a i pravu b okomitu (normalnu) na a.', 'Kakav ugao grade dvije normalne prave?  [[! prav ugao]]'],
      n: ['Pronađi u učionici 2 primjera paralelnih i 2 primjera okomitih ivica.', 'Mogu li se dvije paralelne prave sjeći? Objasni.  [[! ne]]'],
    },
    {
      id: 'm3-krug', r: [3], t: /krug i kru.nica \(centar o, polupre.nik r i pre.nik d\) – crtanje/i,
      o: ['Nacrtaj šestarom kružnicu poluprečnika 3 cm.', 'Označi centar kružnice slovom O.'],
      s: ['Ako je poluprečnik 4 cm, koliki je prečnik? [[= 4 · 2]]', 'Nacrtaj kružnicu i oboji krug zeleno.'],
      n: ['Nacrtaj kružnicu prečnika 6 cm. Koliki je poluprečnik? [[= 6 : 2]]', 'Nacrtaj tri kružnice sa istim centrom: r = 1 cm, 2 cm i 3 cm.'],
    },
    {
      id: 'm3-trougao-pravougaonik', r: [3], t: /trougao, pravougaonik i kvadrat .* osobine/i,
      o: ['Nacrtaj kvadrat stranice 3 cm.', 'Koliko jednakih stranica ima kvadrat?  [[! 4]]'],
      s: ['Nacrtaj pravougaonik sa stranicama 5 cm i 2 cm.', 'Nacrtaj trougao sa jednim pravim uglom.'],
      n: ['Po čemu se razlikuju kvadrat i pravougaonik? Napiši jednu razliku.  [[! kvadrat ima sve stranice jednake]]', 'Nacrtaj 2 trougla tako da zajedno čine kvadrat.'],
    },
    {
      id: 'm3-obim', r: [3], t: /obim trougla/i,
      o: ['Izračunaj obim kvadrata stranice a = 5 cm:   O = 4 · 5 = ___ cm  [[= 4 · 5]]', 'Izračunaj obim trougla sa stranicama 3 cm, 4 cm i 5 cm. [[= 3 + 4 + 5]]'],
      s: ['Izračunaj obim pravougaonika a = 6 cm, b = 4 cm. [[= 2 · 6 + 2 · 4]]', 'Izračunaj obim kvadrata a = 8 cm. [[= 4 · 8]]'],
      n: ['Bašta oblika kvadrata ima stranicu 9 m. Koliko metara ograde treba? [[= 4 · 9]]', 'Obim kvadrata je 28 cm. Kolika je stranica? [[= 28 : 4]]'],
    },
    {
      id: 'm3-jedinice', r: [3], t: /jedinice za du.inu \(km/i,
      o: ['Dopuni:  1 km = ___ m,   1 kg = ___ g,   1 l = ___ dl  [[! 1000, 1000, 10]]', 'Šta je teže: 1 kg ili 900 g?  [[! 1 kg]]'],
      s: ['Dopuni:  3 m = ___ cm,   5 t = ___ kg,   2 hl = ___ l  [[! 300, 5000, 200]]', 'Dopuni:  1 h = ___ min  [[! 60]]'],
      n: ['Flaša ima 2 l soka. Koliko čaša od 2 dl može da se napuni? [[= 20 : 2]]', 'Put do škole je dug 850 m. Koliko metara pređeš do škole i nazad? [[= 850 · 2]]'],
    },
    {
      id: 'm3-sistematizacija', r: [3], t: /sistematizacija/i,
      o: ['Izračunaj:   [[456 + 378]]   [[900 - 257]]', 'Izračunaj:   [[7 · 8]]   [[63 : 9]]'],
      s: ['Izračunaj:   [[70 - 7 · 8]]   [[48 : 6 + 25]]', 'Riješi:   [[x · 8 = 56 | 7]]   Uporedi:   [[8 · 6 ? 50 - 3]]'],
      n: ['U skladištu je 58 kg brašna. Pakuje se u vrećice po 6 kg. Koliko je vrećica napunjeno i koliko kg je ostalo?  [[ost 58 : 6]]', 'Obim pravougaonika je 30 cm, a jedna stranica 9 cm. Kolika je druga? [[= (30 - 2 · 9) : 2]]'],
    },

    // ============================ 4. RAZRED ============================
    {
      id: 'm4-ponavljanje', r: [4], t: /ponavljanje gradiva iz 3/i,
      o: ['Izračunaj:   [[456 + 378]]   [[900 - 257]]', 'Izračunaj:   [[125 · 6]]'],
      s: ['Izračunaj:   [[864 : 4]]   [[(350 - 150) · 3]]', 'Riješi:   [[x + 268 = 1000 | 732]]'],
      n: ['Kupljeno je 6 bicikala po 145 KM. Koliko je plaćeno? [[= 6 · 145]]', 'Riješi:   [[x : 7 = 125 | 875]]'],
    },
    {
      id: 'm4-visestruke-hiljade', r: [4], t: /vi.estruke hiljade/i,
      o: ['Napiši ciframa:  deset hiljada = ___,  sto hiljada = ___,  milion = ___  [[! 10 000, 100 000, 1 000 000]]', 'Dopuni niz:  1000, 2000, ___, 4000, ___  [[! 3000, 5000]]'],
      s: ['Koliko hiljada ima u 10 000? A u 100 000?  [[! 10; 100]]', 'Dopuni niz:  10 000, 20 000, ___, ___, 50 000  [[! 30 000, 40 000]]'],
      n: ['Koliko nula ima broj milion?  [[! 6]]', 'Koliko puta je 100 000 veće od 1000?  [[= 100000 : 1000]]'],
    },
    {
      id: 'm4-citanje-pisanje', r: [4], t: /.itanje i pisanje vi.ecifrenih/i,
      o: ['Napiši ciframa:  četrdeset pet hiljada dvjesta šest = ___  [[! 45 206]]', 'Pročitaj naglas broj 12 345.'],
      s: ['Napiši riječima:  308 450  [[! trista osam hiljada četiristo pedeset]]', 'Koje klase ima broj 704 018?  [[! klasa hiljada 704, klasa jedinica 018]]'],
      n: ['Napiši najveći šestocifreni broj i njegov sljedbenik.  [[! 999 999 i 1 000 000]]', 'Napiši najmanji petocifreni broj sa svim različitim ciframa.  [[! 10 234]]'],
    },
    {
      id: 'm4-mjesna-vrijednost', r: [4], t: /mjesna vrijednost cifre u vi.ecifrenom/i,
      o: ['U broju 254 316 cifra 4 označava ___.  [[! hiljade (4 H)]]', 'Napiši broj: 3 DH, 2 H, 5 S, 0 D, 7 J = ___  [[! 32 507]]'],
      s: ['Napiši u razvijenom obliku:  37 052 = ___  [[! 30 000 + 7000 + 50 + 2]]', 'Koja cifra je na mjestu stotina u broju 981 643?  [[! 6]]'],
      n: ['Koji broj ima 3 SH, 0 DH, 5 H, 2 S, 0 D i 9 J?  [[! 305 209]]', 'Za koliko se promijeni broj 45 678 ako cifru 5 zamijeniš sa 9?  [[= 49678 - 45678]]'],
    },
    {
      id: 'm4-uporedjivanje-zaokruzivanje', r: [4], t: /upore.ivanje vi.ecifrenih brojeva/i,
      o: ['Upiši znak <, > ili =:   [[45 302 ? 45 230]]   [[99 999 ? 100 000]]', 'Napiši prethodnik i sljedbenik broja 70 000.  [[! 69 999 i 70 001]]'],
      s: ['Zaokruži na najbližu hiljadu:  6742 ≈ ___  [[! 7000]]', 'Zaokruži na desetice:  384 ≈ ___,  1255 ≈ ___  [[! 380; 1260]]'],
      n: ['Poređaj od najvećeg:  98 000, 89 999, 100 001, 90 010  [[! 100 001, 98 000, 90 010, 89 999]]', 'Zaokruži 45 499 na hiljade i na desetice hiljada.  [[! 45 000; 50 000]]'],
    },
    {
      id: 'm4-usmeno-plus-minus', r: [4], t: /usmeno sabiranje i oduzimanje vi.ecifrenih/i,
      o: ['Izračunaj:   [[3000 + 5000]]   [[24 000 + 15 000]]', 'Izračunaj:   [[9000 - 4000]]'],
      s: ['Izračunaj:   [[45 000 - 12 000]]   [[70 000 - 35 000]]', 'Dopuni:   [[26 000 + ___ = 60 000 | 34 000]]'],
      n: ['U gradu živi 48 000, a u selu 45 000 stanovnika manje. Koliko ljudi živi u selu? [[= 48 000 - 45 000]] Koliko ukupno? [[= 48 000 + 3000]]', 'Izračunaj:   [[100 000 - 1]]'],
    },
    {
      id: 'm4-pismeno-plus', r: [4], t: /pismeno sabiranje vi.ecifrenih/i,
      o: ['Saberi pismeno:   [[4532 + 2146]]', 'Saberi:   [[3407 + 1528]]'],
      s: ['Saberi:   [[35 847 + 18 276]]   [[6908 + 3095]]', 'Saberi:   [[12 345 + 54 321]]'],
      n: ['Prve godine je posađeno 12 450, a druge 9875 sadnica. Koliko ukupno? [[= 12 450 + 9875]]', 'Kojem broju treba dodati 37 568 da dobiješ 100 000? [[= 100 000 - 37 568]]'],
    },
    {
      id: 'm4-pismeno-minus', r: [4], t: /pismeno oduzimanje vi.ecifrenih/i,
      o: ['Oduzmi pismeno:   [[8765 - 3421]]', 'Oduzmi:   [[6000 - 2450]]'],
      s: ['Oduzmi:   [[10 000 - 4386]]   [[52 304 - 17 658]]', 'Provjeri sabiranjem:   [[34 646 + 17 658]]'],
      n: ['Od 100 000 KM potrošeno je 36 450 KM. Koliko je ostalo? [[= 100 000 - 36 450]]', 'Riješi:   [[x - 12 700 = 45 300 | 58 000]]'],
    },
    {
      id: 'm4-veza-provjera', r: [4], t: /veza izme.u sabiranja i oduzimanja; provjera/i,
      o: ['Izračunaj:   [[7456 + 2318]]   Provjeri:   [[9774 - 2318]]', 'Izračunaj:   [[5000 - 1250]]'],
      s: ['Izračunaj:   [[9000 - 3765]]   Provjeri sabiranjem:   [[5235 + 3765]]', 'Od 4520 + 1380 = 5900 napiši dva računa oduzimanja.  [[! 5900 - 1380 = 4520; 5900 - 4520 = 1380]]'],
      n: ['Pronađi grešku: 6452 - 2879 = 3673. Provjeri i ispravi.  [[= 6452 - 2879]]', 'Smisli zadatak sa oduzimanjem i provjeri rješenje sabiranjem.'],
    },
    {
      id: 'm4-svojstva-sabiranja', r: [4], t: /svojstva sabiranja i oduzimanja/i,
      o: ['Izračunaj na lakši način:   [[2375 + 1400 + 625]]', 'Izračunaj:   [[(3000 + 450) + 550]]'],
      s: ['Izračunaj na dva načina:   [[500 - (200 + 150)]]   [[500 - 200 - 150]]', 'Izračunaj:   [[(800 + 60) - 60]]'],
      n: ['Izračunaj pametno:   [[4999 + 3456 + 1]]', 'Objasni zašto je 7000 - (2000 + 500) isto što i 7000 - 2000 - 500.  [[= 7000 - 2500]]'],
    },
    {
      id: 'm4-jednacine-plus', r: [4], t: /jedna.ine i nejedna.ine sa sabiranjem/i,
      o: ['Riješi:   [[x + 1250 = 4000 | 2750]]', 'Riješi:   [[x - 600 = 900 | 1500]]'],
      s: ['Riješi:   [[x - 3400 = 5600 | 9000]]   [[12 000 - x = 7500 | 4500]]', 'Riješi:   [[x + 45 000 = 100 000 | 55 000]]'],
      n: ['Koji prirodni brojevi zadovoljavaju nejednačinu x + 5 < 9?  [[! 1, 2, 3]]', 'Napiši nejednačinu čija su rješenja brojevi 1, 2 i 3.'],
    },
    {
      id: 'm4-puta-10-100-1000', r: [4], t: /sa 10, 100, 1000 i 10 000/i,
      o: ['Izračunaj:   [[45 · 10]]   [[45 · 100]]   [[45 · 1000]]', 'Izračunaj:   [[3600 : 10]]'],
      s: ['Izračunaj:   [[36 000 : 1000]]   [[7800 : 100]]   [[250 · 100]]', 'Dopuni:   [[___ · 1000 = 92 000 | 92]]'],
      n: ['Kilogram jabuka košta 2 KM. Koliko košta 1000 kg? [[= 2 · 1000]]', 'Koliko puta je 50 000 veće od 50?  [[= 50 000 : 50]]'],
    },
    {
      id: 'm4-usmeno-hiljade', r: [4], t: /usmeno mno.enje i dijeljenje vi.estrukih hiljada/i,
      o: ['Izračunaj:   [[4000 · 6]]   [[3000 · 3]]', 'Izračunaj:   [[8000 : 4]]'],
      s: ['Izračunaj:   [[36 000 : 9]]   [[7000 · 8]]   [[45 000 : 5]]', 'Dopuni:   [[___ · 7 = 63 000 | 9000]]'],
      n: ['Fabrika dnevno proizvede 3000 komada. Koliko proizvede za 7 dana? [[= 3000 · 7]]', '48 000 KM podijeljeno je jednako na 6 škola. Koliko je dobila svaka? [[= 48 000 : 6]]'],
    },
    {
      id: 'm4-pismeno-mnozenje-jedno', r: [4], t: /pismeno mno.enje vi.ecifrenog broja jednocifrenim/i,
      o: ['Pomnoži pismeno:   [[3456 · 4]]', 'Pomnoži:   [[1209 · 5]]'],
      s: ['Pomnoži:   [[24 708 · 6]]   [[7053 · 8]]', 'Pomnoži:   [[12 345 · 3]]'],
      n: ['Avion svaki sat pređe 856 km. Koliko pređe za 6 sati? [[= 856 · 6]]', 'Škola je kupila 9 računara po 1150 KM. Koliko je platila? [[= 9 · 1150]]'],
    },
    {
      id: 'm4-mnozenje-deseticom', r: [4], t: /mno.enje vi.ecifrenog broja vi.estrukom deseticom/i,
      o: ['Izračunaj:   [[234 · 20]]', 'Izračunaj:   [[56 · 40]]'],
      s: ['Izračunaj:   [[145 · 300]]   [[318 · 50]]', 'Izračunaj:   [[1200 · 30]]'],
      n: ['U 30 redova je po 125 stolica. Koliko je stolica? [[= 30 · 125]]', 'Jedna kutija ima 250 spajalica. Koliko spajalica ima u 400 kutija? [[= 250 · 400]]'],
    },
    {
      id: 'm4-mnozenje-dvocifrenim', r: [4], t: /pismeno mno.enje vi.ecifrenog broja dvocifrenim/i,
      o: ['Pomnoži pismeno:   [[246 · 35]]', 'Pomnoži:   [[73 · 58]]'],
      s: ['Pomnoži:   [[1428 · 46]]   [[905 · 27]]', 'Pomnoži:   [[608 · 15]]'],
      n: ['Škola je kupila 24 klupe po 85 KM. Koliko je platila? [[= 24 · 85]]', 'Jedan dan ima 24 sata. Koliko sati ima 365 dana? [[= 365 · 24]]'],
    },
    {
      id: 'm4-mnozenje-trocifrenim', r: [4], t: /pismeno mno.enje vi.ecifrenog broja trocifrenim/i,
      o: ['Pomnoži pismeno:   [[324 · 125]]', 'Pomnoži:   [[211 · 103]]'],
      s: ['Pomnoži:   [[405 · 208]]   [[1250 · 112]]', 'Pomnoži:   [[617 · 304]]'],
      n: ['Jedna knjiga ima 248 stranica. Koliko stranica ima 115 knjiga? [[= 248 · 115]]', 'Fabrika napravi 365 igračaka dnevno. Koliko za 250 dana? [[= 365 · 250]]'],
    },
    {
      id: 'm4-svojstva-mnozenja', r: [4], t: /svojstva mno.enja/i,
      o: ['Izračunaj na lakši način:   [[25 · 7 · 4]]', 'Izračunaj:   [[(30 + 4) · 6]]'],
      s: ['Izračunaj pametno:   [[15 · 99]]   (kao 15 · 100 - 15)', 'Izračunaj na dva načina:   [[12 · (50 - 2)]]'],
      n: ['Izračunaj pametno:   [[125 · 37 · 8]]', 'Izračunaj:   [[48 · 101]]'],
    },
    {
      id: 'm4-dijeljenje-nula', r: [4], t: /u koli.niku nula/i,
      o: ['Podijeli pismeno:   [[8036 : 4]]', 'Podijeli:   [[6024 : 3]]'],
      s: ['Podijeli:   [[5035 : 5]]   [[7056 : 7]]', 'Provjeri množenjem:   [[2009 · 4]]'],
      n: ['4824 knjige raspoređene su jednako u 6 biblioteka. Koliko knjiga ima svaka? [[= 4824 : 6]]', 'Zašto u količniku 8036 : 4 ima nula? Objasni.  [[! 0 : 4 = 0 na mjestu stotina]]'],
    },
    {
      id: 'm4-dijeljenje-jednocifrenim', r: [4], t: /pismeno dijeljenje vi.ecifrenog broja jednocifrenim brojem bez/i,
      o: ['Podijeli pismeno:   [[9456 : 4]]', 'Podijeli:   [[7385 : 5]]'],
      s: ['Podijeli:   [[ost 1000 : 7]]   [[2754 : 9]]', 'Provjeri množenjem:   [[1477 · 5]]'],
      n: ['1250 jaja pakuje se po 6 u kutiju. Koliko je punih kutija i koliko jaja ostaje?  [[ost 1250 : 6]]', 'Riješi:   [[x · 8 = 9936 | 1242]]'],
    },
    {
      id: 'm4-dijeljenje-deseticom', r: [4], t: /dijeljenje vi.ecifrenog broja vi.estrukom deseticom/i,
      o: ['Izračunaj:   [[480 : 20]]', 'Izračunaj:   [[3600 : 40]]'],
      s: ['Izračunaj:   [[56 000 : 70]]   [[7200 : 80]]', 'Izračunaj:   [[9000 : 300]]'],
      n: ['Za 1200 KM kupljeno je 30 jednakih lopti. Kolika je cijena lopte? [[= 1200 : 30]]', '4800 m puta podijeljeno je na dionice od 60 m. Koliko je dionica? [[= 4800 : 60]]'],
    },
    {
      id: 'm4-dijeljenje-dvocifrenim', r: [4], t: /pismeno dijeljenje vi.ecifrenog broja dvocifrenim/i,
      o: ['Podijeli pismeno:   [[864 : 24]]', 'Podijeli:   [[945 : 15]]'],
      s: ['Podijeli:   [[15 480 : 36]]   [[2592 : 48]]', 'Provjeri množenjem:   [[430 · 36]]'],
      n: ['672 učenika putuje autobusima sa po 48 mjesta. Koliko autobusa treba? [[= 672 : 48]]', 'Riješi:   [[x · 25 = 3750 | 150]]'],
    },
    {
      id: 'm4-svojstva-dijeljenja', r: [4], t: /svojstva dijeljenja/i,
      o: ['Izračunaj na dva načina:   [[(60 + 24) : 6]]   [[60 : 6 + 24 : 6]]', 'Izračunaj:   [[(90 - 18) : 9]]'],
      s: ['Izračunaj:   [[(8 · 35) : 7]]   [[(400 + 80) : 8]]', 'Izračunaj na dva načina:   [[(700 - 140) : 7]]'],
      n: ['Izračunaj pametno:   [[3600 : 4 : 9]]', 'Provjeri: (36 · 5) : 9 = 4 · 5.  [[= (36 · 5) : 9]]'],
    },
    {
      id: 'm4-redoslijed', r: [4], t: /slo.enim brojnim izrazima/i,
      o: ['Izračunaj:   [[120 + 30 · 4]]', 'Izračunaj:   [[(120 + 30) · 4]]'],
      s: ['Izračunaj:   [[(250 - 50) : 4 + 15]]   [[1000 - 25 · (18 + 12)]]', 'Izračunaj:   [[600 : (20 + 10) · 3]]'],
      n: ['Postavi zagrade da bude tačno:  6 + 4 · 5 - 2 = 48  [[! (6 + 4) · 5 - 2 = 48]]', 'Napiši brojni izraz za: „Zbir brojeva 45 i 15 pomnoži sa 8.“ i izračunaj. [[= (45 + 15) · 8]]'],
    },
    {
      id: 'm4-jednacine-mnozenje', r: [4], t: /jedna.ine i nejedna.ine sa mno.enjem/i,
      o: ['Riješi:   [[6 · x = 14 520 | 2420]]', 'Riješi:   [[x · 5 = 3500 | 700]]'],
      s: ['Riješi:   [[x : 24 = 315 | 7560]]   [[9600 : x = 40 | 240]]', 'Riješi:   [[x : 100 = 46 | 4600]]'],
      n: ['Koji prirodni brojevi zadovoljavaju nejednačinu 7 · x < 30?  [[! 1, 2, 3, 4]]', 'Zamislio sam broj, pomnožio ga sa 12 i dobio 1440. Koji je broj? [[= 1440 : 12]]'],
    },
    {
      id: 'm4-prosjek', r: [4], t: /aritmeti.ke sredine/i,
      o: ['Izračunaj aritmetičku sredinu brojeva 4, 6 i 8. [[= (4 + 6 + 8) : 3]]', 'Izračunaj:   [[(10 + 20) : 2]]'],
      s: ['Marko ima ocjene 5, 4, 5, 3 i 3. Kolika je prosječna ocjena? [[= (5 + 4 + 5 + 3 + 3) : 5]]', 'Za 3 dana prodato je 120, 150 i 180 karata. Koliko prosječno dnevno? [[= (120 + 150 + 180) : 3]]'],
      n: ['Ako karta košta 5 KM, koliko je zarađeno za ta 3 dana? [[= (120 + 150 + 180) · 5]]', 'Otac je 3 puta stariji od sina. Zajedno imaju 48 godina. Koliko godina ima sin? [[= 48 : 4]]'],
    },
    {
      id: 'm4-razlomci', r: [4], t: /razlomci .* zapisivanje/i,
      o: ['U razlomku 2/5 brojnik je ___, a nazivnik ___.  [[! 2 i 5]]', 'Nacrtaj pravougaonik, podijeli ga na 4 jednaka dijela i oboji 3/4.'],
      s: ['Uporedi:   [[3/8 ? 5/8]]   [[2/3 ? 2/5]]', 'Izračunaj:   [[dio 3/4 od 20]]'],
      n: ['Izračunaj:   [[dio 7/10 od 300]]', 'Ana je pojela 2/8 torte, a Ivo 3/8. Ko je pojeo više? Koliki dio je ostao?  [[! Ivo; 3/8]]'],
    },
    {
      id: 'm4-konstrukcije', r: [4], t: /konstrukcija paralelnih i normalnih/i,
      o: ['Nacrtaj pravu p i tačku A van nje. Kroz A nacrtaj pravu paralelnu sa p.', 'Nacrtaj duž AB = 5 cm.'],
      s: ['Konstruiši pravu koja je normalna na pravu a i prolazi kroz tačku M.', 'Nacrtaj pravi ugao pomoću trougaonika i označi tjeme.'],
      n: ['Nacrtaj jedan oštar i jedan tup ugao i označi ih grčkim slovima α i β.', 'Nacrtaj tri prave tako da dvije budu paralelne, a treća ih siječe.'],
    },
    {
      id: 'm4-krug', r: [4], t: /kru.nica .* konstrukcija .estarom/i,
      o: ['Konstruiši kružnicu poluprečnika 2 cm.', 'Označi centar O i nacrtaj jedan poluprečnik.'],
      s: ['Prečnik je 10 cm. Koliki je poluprečnik? [[= 10 : 2]]', 'Nacrtaj kružnicu prečnika 6 cm.'],
      n: ['Nacrtaj dvije kružnice sa istim centrom: r = 2 cm i r = 4 cm. Koliki je prečnik veće? [[= 4 · 2]]', 'Nacrtaj šestarom cvijet od 6 kružnica istog poluprečnika.'],
    },
    {
      id: 'm4-trougao', r: [4], t: /vrste trouglova prema stranicama/i,
      o: ['Izračunaj obim trougla sa stranicama 5 cm, 6 cm i 7 cm. [[= 5 + 6 + 7]]', 'Kako se zove trougao sa sve tri jednake stranice?  [[! jednakostranični]]'],
      s: ['Izračunaj obim jednakokrakog trougla: osnovica 6 cm, krak 5 cm. [[= 6 + 2 · 5]]', 'Konstruiši trougao sa stranicama 4 cm, 5 cm i 6 cm.'],
      n: ['Obim jednakostraničnog trougla je 27 cm. Kolika je stranica? [[= 27 : 3]]', 'Može li trougao imati stranice 2 cm, 3 cm i 6 cm? Pokušaj nacrtati.  [[! ne može]]'],
    },
    {
      id: 'm4-pravougaonik-kvadrat', r: [4], t: /osobine stranica, uglova i dijagonala/i,
      o: ['Koliko dijagonala ima pravougaonik?  [[! 2]]', 'Konstruiši kvadrat stranice 4 cm.'],
      s: ['Konstruiši pravougaonik 6 cm × 3 cm i nacrtaj dijagonale.', 'Izmjeri dijagonale. Da li su jednake?  [[! da]]'],
      n: ['Po čemu su kvadrat i pravougaonik slični, a po čemu različiti?  [[! oba imaju 4 prava ugla; kvadrat ima sve stranice jednake]]', 'Konstruiši kvadrat čija je dijagonala 6 cm.'],
    },
    {
      id: 'm4-obim', r: [4], t: /obim pravougaonika/i,
      o: ['Izračunaj obim kvadrata a = 7 cm. [[= 4 · 7]]', 'Izračunaj obim pravougaonika a = 5 cm, b = 3 cm. [[= 2 · (5 + 3)]]'],
      s: ['Izračunaj obim pravougaonika a = 12 cm, b = 8 cm. [[= 2 · (12 + 8)]]', 'Obim kvadrata je 36 cm. Kolika je stranica? [[= 36 : 4]]'],
      n: ['Obim pravougaonika je 30 cm, a = 9 cm. Kolika je stranica b? [[= (30 - 2 · 9) : 2]]', 'Igralište je dugo 40 m i široko 25 m. Koliko metara pretrči učenik oko igrališta 2 puta? [[= 2 · 2 · (40 + 25)]]'],
    },
    {
      id: 'm4-pojam-povrsine', r: [4], t: /pojam povr.ine/i,
      o: ['Dopuni:  1 m² = ___ dm²,   1 dm² = ___ cm²  [[! 100, 100]]', 'Koliko kvadratića od 1 cm² stane u kvadrat stranice 3 cm?  [[= 3 · 3]]'],
      s: ['Dopuni:  1 ha = ___ a,   3 m² = ___ dm²  [[! 100, 300]]', 'Nacrtaj na kvadratnoj mreži lik od 6 kvadratića.'],
      n: ['Koliko kvadratića od 1 cm² stane u kvadrat stranice 5 cm? [[= 5 · 5]]', 'Poređaj od najmanje: 1 a, 1 m², 1 ha, 1 km²  [[! 1 m², 1 a, 1 ha, 1 km²]]'],
    },
    {
      id: 'm4-povrsina', r: [4], t: /povr.ina pravougaonika \(p = a · b\) i kvadrata \(p = a · a\) – izra/i,
      o: ['Izračunaj površinu kvadrata a = 6 cm. [[= 6 · 6]]', 'Izračunaj površinu pravougaonika a = 8 cm, b = 5 cm. [[= 8 · 5]]'],
      s: ['Soba je duga 5 m i široka 4 m. Koliko m² parketa treba? [[= 5 · 4]]', 'Izračunaj površinu kvadrata a = 12 dm. [[= 12 · 12]]'],
      n: ['Površina pravougaonika je 72 cm², a = 9 cm. Kolika je stranica b? [[= 72 : 9]]', 'Bašta 20 m × 15 m. Na 1 m² sadi se 4 sadnice. Koliko sadnica treba? [[= 20 · 15 · 4]]'],
    },
    {
      id: 'm4-kvadar-kocka', r: [4], t: /kvadar i kocka \(strane, ivice i tjemena\)/i,
      o: ['Kocka ima ___ strana, ___ ivica i ___ tjemena.  [[! 6, 12, 8]]', 'Pronađi u učionici predmet oblika kvadra.'],
      s: ['Nacrtaj mrežu kocke.', 'Koliko strana kvadra može biti kvadrat?  [[! najviše 6 (kocka), obično 2]]'],
      n: ['Koliki je zbir dužina svih ivica kocke čija je ivica 3 cm? [[= 12 · 3]]', 'Napravi od papira kocku po svojoj mreži.'],
    },
    {
      id: 'm4-zapremina-kockice', r: [4], t: /pomo.u jedini.nih kvadrata i kockica/i,
      o: ['Koliko kockica od 1 cm³ čini kocku ivice 2 cm? [[= 2 · 2 · 2]]', 'Kvadar je složen od 3 · 2 · 2 kockice. Koliko je kockica? [[= 3 · 2 · 2]]'],
      s: ['Kutija je duga 4 dm, široka 3 dm i visoka 2 dm. Koliko kockica od 1 dm³ stane u nju? [[= 4 · 3 · 2]]', 'Koliko kvadratića od 1 cm² prekriva sve strane kocke ivice 2 cm? [[= 6 · 2 · 2]]'],
      n: ['Koliko kockica od 1 cm³ čini kocku ivice 5 cm? [[= 5 · 5 · 5]]', 'Složi od 12 kockica dva različita kvadra i zapiši njihove dimenzije.'],
    },
    {
      id: 'm4-mjerne-jedinice', r: [4], t: /sistem mjernih jedinica/i,
      o: ['Dopuni:  2 km = ___ m,   3 kg = ___ g  [[! 2000, 3000]]', 'Dopuni:  1 dan = ___ h  [[! 24]]'],
      s: ['Dopuni:  4 h = ___ min,   5 l = ___ dl,   250 cm = ___ m ___ cm  [[! 240, 50, 2 m 50 cm]]', 'Dopuni:  3 KM 50 f = ___ f  [[! 350]]'],
      n: ['Voz kreće u 8 h 45 min i putuje 2 h 30 min. Kada stiže?  [[! u 11 h 15 min]]', 'Kilogram jabuka košta 2 KM 50 f. Koliko košta 4 kg?  [[! 10 KM (250 f · 4 = 1000 f)]]'],
    },
    {
      id: 'm4-sistematizacija', r: [4], t: /sistematizacija/i,
      o: ['Izračunaj:   [[4532 + 2146]]   [[8765 - 3421]]', 'Izračunaj površinu kvadrata a = 9 cm. [[= 9 · 9]]'],
      s: ['Izračunaj:   [[458 · 24]]   [[2736 : 6]]', 'Riješi:   [[(x + 350) - 180 = 420 | 250]]'],
      n: ['Dva voza kreću istovremeno jedan prema drugom iz gradova udaljenih 360 km. Prvi svaki sat pređe 70 km, a drugi 50 km. Za koliko sati će se sresti? [[= 360 : (70 + 50)]]', 'Obim pravougaonika je 46 cm, a = 15 cm. Izračunaj b i površinu. [[= (46 - 2 · 15) : 2]] [[= 15 · 8]]'],
    },

    // ============================ 5. RAZRED ============================
    {
      id: 'm5-skup-n', r: [5], t: /skup prirodnih brojeva n i n0/i,
      o: ['Napiši ciframa:  tri miliona dvjesta hiljada = ___  [[! 3 200 000]]', 'Upiši znak <, > ili =:   [[4 500 000 ? 45 000 000]]'],
      s: ['Napiši riječima:  2 045 000 000  [[! dvije milijarde četrdeset pet miliona]]', 'Prikaži na brojevnoj polupravoj brojeve 0, 2, 5 i 7 (jedinična duž 1 cm).'],
      n: ['Koji je najmanji broj u skupu N, a koji u skupu N0? Postoji li najveći prirodni broj?  [[! 1; 0; ne postoji]]', 'Koliko miliona ima jedna milijarda?  [[! 1000]]'],
    },
    {
      id: 'm5-sabiranje-n0', r: [5], t: /sabiranje i oduzimanje u skupu n0/i,
      o: ['Izračunaj:   [[345 + 0]]   [[1250 + 750]]', 'Izračunaj:   [[5000 - 5000]]'],
      s: ['Izračunaj pametno:   [[478 + 359 + 522]]', 'Izračunaj:   [[(800 - 250) + 150]]'],
      n: ['Izračunaj:   [[5000 - (1250 + 2750)]]', 'Napiši primjer koji pokazuje da oduzimanje nije komutativno.  [[! npr. 7 - 3 ≠ 3 - 7]]'],
    },
    {
      id: 'm5-mnozenje-n0', r: [5], t: /mno.enje i dijeljenje u skupu n0/i,
      o: ['Izračunaj pametno:   [[25 · 4 · 17]]', 'Izračunaj:   [[0 · 125]]   [[125 : 1]]'],
      s: ['Izračunaj pametno:   [[37 · 99 + 37]]', 'Izračunaj na dva načina:   [[(120 + 48) : 12]]'],
      n: ['Izračunaj:   [[48 · 105]]   (kao 48 · 100 + 48 · 5)', 'Zašto se ne može dijeliti nulom? Objasni primjerom.  [[! nema broja koji pomnožen sa 0 daje npr. 5]]'],
    },
    {
      id: 'm5-izrazi', r: [5], t: /izrazi sa promjenljivom/i,
      o: ['Izračunaj 3 · a + 5 za a = 4. [[= 3 · 4 + 5]]', 'Izračunaj a + b za a = 25, b = 17. [[= 25 + 17]]'],
      s: ['Izračunaj a · b - c za a = 6, b = 7, c = 12. [[= 6 · 7 - 12]]', 'Izračunaj (a + b) · 2 za a = 13, b = 9. [[= (13 + 9) · 2]]'],
      n: ['Za koje a je 2 · a + 3 = 15?  [[! a = 6]]', 'Napiši izraz za obim pravougaonika sa stranicama a i b i izračunaj ga za a = 7, b = 4. [[= 2 · (7 + 4)]]'],
    },
    {
      id: 'm5-jednacine', r: [5], t: /jedna.ine sa sve .etiri ra.unske/i,
      o: ['Riješi:   [[3 · x + 25 = 100 | 25]]', 'Riješi:   [[x - 48 = 152 | 200]]'],
      s: ['Riješi:   [[5 · x - 18 = 42 | 12]]   [[(x + 7) · 4 = 60 | 8]]', 'Riješi:   [[x : 6 + 9 = 20 | 66]]'],
      n: ['Zamislio sam broj, pomnožio ga sa 6 i dodao 14. Dobio sam 80. Koji je broj? [[= (80 - 14) : 6]]', 'Riješi:   [[120 - 4 · x = 40 | 20]]'],
    },
    {
      id: 'm5-nejednacine', r: [5], t: /nejedna.ine u skupu n0/i,
      o: ['Napiši sva rješenja nejednačine x + 3 < 7 u skupu N0.  [[! 0, 1, 2, 3]]', 'Da li je 5 rješenje nejednačine x + 18 < 45?  [[! da]]'],
      s: ['Riješi:  x + 18 < 45  [[! x < 27, tj. 0, 1, …, 26]]', 'Riješi:  4 · x ≥ 36  [[! x ≥ 9]]'],
      n: ['Napiši sve prirodne brojeve za koje važi 10 < 2 · x < 18.  [[! 6, 7, 8]]', 'Prikaži rješenja nejednačine x < 5 (u N0) na brojevnoj polupravoj.'],
    },
    {
      id: 'm5-djeljivost-pojam', r: [5], t: /djeljivost prirodnih brojeva – pojam/i,
      o: ['Napiši sve djelioce broja 12.  [[! 1, 2, 3, 4, 6, 12]]', 'Napiši prvih 5 višekratnika broja 7.  [[! 7, 14, 21, 28, 35]]'],
      s: ['Napiši sve djelioce broja 30.  [[! 1, 2, 3, 5, 6, 10, 15, 30]]', 'Koji brojevi između 20 i 40 su djeljivi sa 6?  [[! 24, 30, 36]]'],
      n: ['Koliko djelilaca ima broj 36?  [[! 9 (1, 2, 3, 4, 6, 9, 12, 18, 36)]]', 'Napiši broj koji ima tačno 3 djelioca.  [[! npr. 4, 9, 25]]'],
    },
    {
      id: 'm5-djeljivost-zbira', r: [5], t: /djeljivost zbira, razlike i proizvoda/i,
      o: ['Da li je (35 + 15) djeljivo sa 5? DA / NE  [[! DA]]', 'Da li je (24 + 16) djeljivo sa 8? DA / NE  [[! DA]]'],
      s: ['Bez računanja: da li je 24 · 17 djeljivo sa 8? Objasni.  [[! DA, jer je 24 djeljivo sa 8]]', 'Da li je (60 - 25) djeljivo sa 5?  [[! DA]]'],
      n: ['Da li je 36 + 25 djeljivo sa 6? Objasni.  [[! NE, 36 jeste, 25 nije]]', 'Napiši zbir dva broja koji nisu djeljivi sa 3, a zbir jeste.  [[! npr. 4 + 5 = 9]]'],
    },
    {
      id: 'm5-djeljivost-10-5-2', r: [5], t: /djeljivosti brojevima 10, 5 i 2/i,
      o: ['Zaokruži brojeve djeljive sa 2: 134, 257, 680, 991  [[! 134, 680]]', 'Zaokruži brojeve djeljive sa 10: 450, 505, 1000, 1010  [[! 450, 1000, 1010]]'],
      s: ['Zaokruži brojeve djeljive sa 5: 345, 502, 790, 1115  [[! 345, 790, 1115]]', 'Koji od njih je djeljiv i sa 2 i sa 5?  [[! 790]]'],
      n: ['Napiši najmanji četvorocifreni broj djeljiv sa 2, 5 i 10.  [[! 1000]]', 'Upiši cifru da broj 47_ bude djeljiv sa 5, ali ne sa 10.  [[! 5]]'],
    },
    {
      id: 'm5-djeljivost-3-9', r: [5], t: /djeljivosti brojevima 3 i 9/i,
      o: ['Da li je 471 djeljiv sa 3? Saberi cifre: 4 + 7 + 1 = ___  [[! 12, DA]]', 'Da li je 729 djeljiv sa 9?  [[! DA (7 + 2 + 9 = 18)]]'],
      s: ['Zaokruži brojeve djeljive sa 9: 729, 803, 1116  [[! 729, 1116]]', 'Zaokruži brojeve djeljive sa 4: 316, 522, 1100  [[! 316, 1100]]'],
      n: ['Upiši cifru da broj 5_4 bude djeljiv sa 9.  [[! 0 ili 9 (504, 594)]]', 'Napiši najveći trocifreni broj djeljiv sa 25.  [[! 975]]'],
    },
    {
      id: 'm5-prosti', r: [5], t: /prosti i slo.eni brojevi/i,
      o: ['Zaokruži proste brojeve: 2, 9, 11, 15, 17, 21  [[! 2, 11, 17]]', 'Zašto broj 1 nije ni prost ni složen?  [[! ima samo jedan djelilac]]'],
      s: ['Rastavi na proste činioce:  60 = ___,  84 = ___  [[! 2 · 2 · 3 · 5; 2 · 2 · 3 · 7]]', 'Napiši sve proste brojeve manje od 20.  [[! 2, 3, 5, 7, 11, 13, 17, 19]]'],
      n: ['Napiši sve proste brojeve između 30 i 50.  [[! 31, 37, 41, 43, 47]]', 'Rastavi na proste činioce:  360 = ___  [[! 2 · 2 · 2 · 3 · 3 · 5]]'],
    },
    {
      id: 'm5-nzd', r: [5], t: /najve.i zajedni.ki djelilac/i,
      o: ['Odredi NZD(12, 18).  [[! 6]]', 'Napiši sve zajedničke djelioce brojeva 8 i 12.  [[! 1, 2, 4]]'],
      s: ['Odredi NZD(24, 36) i NZD(15, 28).  [[! 12; 1]]', 'Da li su 15 i 28 uzajamno prosti?  [[! DA]]'],
      n: ['Imamo 48 crvenih i 36 plavih balona. Koliko najviše jednakih paketa možemo napraviti bez ostatka?  [[! 12]]', 'Odredi NZD(42, 56, 70).  [[! 14]]'],
    },
    {
      id: 'm5-nzs', r: [5], t: /najmanji zajedni.ki sadr.alac/i,
      o: ['Odredi NZS(4, 6).  [[! 12]]', 'Napiši prvih 5 višekratnika brojeva 3 i 4. Koji je najmanji zajednički?  [[! 12]]'],
      s: ['Odredi NZS(8, 12) i NZS(5, 7).  [[! 24; 35]]', 'Odredi NZS(6, 9, 12).  [[! 36]]'],
      n: ['Jedan autobus polazi svakih 12 minuta, a drugi svakih 18 minuta. Krenuli su zajedno u 8:00. Kada će opet krenuti zajedno?  [[! NZS = 36 min, u 8:36]]', 'Odredi NZS(10, 15, 25).  [[! 150]]'],
    },
    {
      id: 'm5-razlomak-pojam', r: [5], t: /razlomci – pojam razlomka/i,
      o: ['U razlomku 5/8 brojnik je ___, a nazivnik ___.  [[! 5 i 8]]', 'Nacrtaj krug i oboji 3/4.'],
      s: ['Zaokruži neprave razlomke: 3/4, 7/5, 2/9, 11/6  [[! 7/5, 11/6]]', 'Zapiši kao mješoviti broj:  7/3 = ___  [[! 2 1/3]]'],
      n: ['Zapiši kao razlomak:  2 3/4 = ___  [[! 11/4]]', 'Koji dio sata je 15 minuta? Zapiši razlomkom.  [[! 1/4]]'],
    },
    {
      id: 'm5-mjesoviti', r: [5], t: /pretvaranje nepravog razlomka/i,
      o: ['Pretvori u mješoviti broj:  9/4 = ___  [[! 2 1/4]]', 'Pretvori u nepravi razlomak:  1 1/2 = ___  [[! 3/2]]'],
      s: ['Pretvori:  17/6 = ___,   3 2/5 = ___  [[! 2 5/6; 17/5]]', 'Uporedi:   [[7/4 ? 2]]'],
      n: ['Prikaži 5/4 na brojevnoj polupravoj (jedinična duž 4 cm).', 'Koji je veći: 13/5 ili 2 1/2?  [[! 13/5, jer je 13/5 = 2,6, a 2 1/2 = 2,5]]'],
    },
    {
      id: 'm5-prosirivanje', r: [5], t: /pro.irivanje i skra.ivanje/i,
      o: ['Skrati razlomak:  6/8 = ___  [[! 3/4]]', 'Proširi 2/3 brojem 4:  ___  [[! 8/12]]'],
      s: ['Skrati do kraja:  18/24 = ___,   20/35 = ___  [[! 3/4; 4/7]]', 'Proširi 3/5 tako da nazivnik bude 20.  [[! 12/20]]'],
      n: ['Svedi na zajednički nazivnik:  1/4 i 5/6  [[! 3/12 i 10/12]]', 'Napiši tri razlomka jednaka 1/2.  [[! npr. 2/4, 3/6, 5/10]]'],
    },
    {
      id: 'm5-uporedjivanje-razlomaka', r: [5], t: /upore.ivanje razlomaka/i,
      o: ['Uporedi:   [[3/7 ? 5/7]]', 'Uporedi:   [[4/5 ? 4/9]]'],
      s: ['Uporedi:   [[2/3 ? 3/4]]   [[5/6 ? 7/9]]', 'Poređaj od najmanjeg: 1/2, 3/8, 3/4  [[! 3/8, 1/2, 3/4]]'],
      n: ['Ana je pročitala 3/5 knjige, a Ivo 2/3 iste knjige. Ko je pročitao više?  [[3/5 ? 2/3]]', 'Napiši razlomak između 1/3 i 1/2.  [[! npr. 5/12]]'],
    },
    {
      id: 'm5-razlomci-jednaki', r: [5], t: /sabiranje i oduzimanje razlomaka jednakih/i,
      o: ['Izračunaj:   [[3/7 + 2/7 = ___ | 5/7]]', 'Izračunaj:   [[5/9 - 1/9 = ___ | 4/9]]'],
      s: ['Izračunaj:   [[9/10 - 4/10 = ___ | 1/2]]', 'Izračunaj:  2 1/5 + 1 3/5 = ___  [[! 3 4/5]]'],
      n: ['Ana je prvog dana pročitala 2/9 knjige, a drugog 4/9. Koliki dio knjige joj je ostao? [[1 - 2/9 - 4/9 = ___ | 1/3]]', 'Izračunaj:  3 - 1 2/7 = ___  [[! 1 5/7]]'],
    },
    {
      id: 'm5-razlomci-razliciti', r: [5], t: /razlomaka razli.itih nazivnika/i,
      o: ['Izračunaj:   [[1/2 + 1/4 = ___ | 3/4]]', 'Izračunaj:   [[1/3 + 1/6 = ___ | 1/2]]'],
      s: ['Izračunaj:   [[2/3 + 3/4 = ___ | 17/12]]   [[5/6 - 1/4 = ___ | 7/12]]', 'Izračunaj:   [[3/5 - 1/2 = ___ | 1/10]]'],
      n: ['Prvog dana je urađena 1/3 posla, a drugog 2/5. Koliki dio posla je ostao? [[1 - 1/3 - 2/5 = ___ | 4/15]]', 'Izračunaj:   [[1/2 + 1/3 + 1/6 = ___ | 1]]'],
    },
    {
      id: 'm5-decimalni-zapis', r: [5], t: /decimalni zapis razlomka/i,
      o: ['Zapiši decimalno:  7/10 = ___,   23/100 = ___  [[! 0,7; 0,23]]', 'Pročitaj broj 3,45.'],
      s: ['U broju 4,375 cifra 7 označava ___.  [[! stotinke]]', 'Zapiši decimalno:  3/1000 = ___,   45/10 = ___  [[! 0,003; 4,5]]'],
      n: ['Zapiši kao razlomak i skrati:  2,5 = ___,   0,75 = ___  [[! 5/2; 3/4]]', 'Zapiši 3/4 kao decimalni broj.  [[! 0,75]]'],
    },
    {
      id: 'm5-decimalni-uporedjivanje', r: [5], t: /upore.ivanje i zaokru.ivanje decimalnih/i,
      o: ['Uporedi:   [[0,7 ? 0,65]]   [[2,3 ? 2,30]]', 'Zaokruži na cijeli broj:  7,51 ≈ ___  [[! 8]]'],
      s: ['Zaokruži na desetine:  3,46 ≈ ___,   12,04 ≈ ___  [[! 3,5; 12,0]]', 'Uporedi:   [[4,09 ? 4,1]]'],
      n: ['Poređaj od najmanjeg: 2,05; 2,5; 2,15; 2,505  [[! 2,05; 2,15; 2,5; 2,505]]', 'Napiši decimalni broj između 3,4 i 3,5.  [[! npr. 3,45]]'],
    },
    {
      id: 'm5-decimalni-plus', r: [5], t: /sabiranje i oduzimanje decimalnih/i,
      o: ['Izračunaj:   [[3,4 + 2,5]]   [[7,8 - 3,2]]', 'Izračunaj:   [[0,5 + 0,5]]'],
      s: ['Izračunaj:   [[12,75 + 4,6]]   [[10 - 3,45]]', 'Izračunaj:   [[8,3 - 2,75]]'],
      n: ['Hljeb košta 1,35 KM, a mlijeko 2,40 KM. Platili smo sa 5 KM. Koliki je kusur? [[= 5 - 1,35 - 2,40]]', 'Riješi:   [[x + 2,5 = 7 | 4,5]]'],
    },
    {
      id: 'm5-decimalni-puta', r: [5], t: /mno.enje i dijeljenje decimalnog broja/i,
      o: ['Izračunaj:   [[3,45 · 10]]   [[3,45 · 100]]', 'Izračunaj:   [[52,3 : 10]]'],
      s: ['Izračunaj:   [[2,4 · 3]]   [[7,5 : 5]]   [[0,8 · 1000]]', 'Izračunaj:   [[12,6 : 3]]'],
      n: ['Sveska košta 1,25 KM. Koliko košta 8 svezaka? [[= 1,25 · 8]]', '4 jednake sveske koštaju 7,40 KM. Kolika je cijena jedne? [[= 7,40 : 4]]'],
    },
    {
      id: 'm5-jednacine-razlomci', r: [5], t: /jedna.ine i tekstualni .* razlomcima i decimalnim/i,
      o: ['Riješi:   [[x + 2,5 = 7 | 4,5]]', 'Riješi:   [[x - 3/8 = 1/8 | 1/2]]'],
      s: ['Riješi:   [[4 · x = 9,2 | 2,3]]', 'Pola puta je 12,5 km. Koliki je cijeli put? [[= 12,5 · 2]]'],
      n: ['Biciklista je prvog dana prešao 2/5 puta, drugog 1/3 puta, a trećeg preostalih 24 km. Koliki je cijeli put?  [[1 - 2/5 - 1/3 = ___ | 4/15]]  [[! 4/15 puta = 24 km, cijeli put = 90 km]]', 'Riješi:   [[x : 4 = 1,5 | 6]]'],
    },
    {
      id: 'm5-skupovi', r: [5], t: /skupovi \(podskup/i,
      o: ['A = {1, 2, 3, 4}, B = {3, 4, 5}. Odredi A ∩ B.  [[! {3, 4}]]', 'Da li je {1, 2} podskup skupa A?  [[! DA]]'],
      s: ['Za iste skupove odredi A ∪ B i A \\ B.  [[! {1, 2, 3, 4, 5}; {1, 2}]]', 'Nacrtaj Venov dijagram za skupove A i B.'],
      n: ['Odredi B \\ A.  [[! {5}]]', 'Kroz dvije tačke koliko pravih možeš povući?  [[! tačno jednu]]'],
    },
    {
      id: 'm5-kruznica', r: [5], t: /kru.nica i krug – tetiva/i,
      o: ['Nacrtaj kružnicu r = 3 cm i jednu tetivu.', 'Koliki je prečnik ako je r = 4,5 cm? [[= 4,5 · 2]]'],
      s: ['Nacrtaj pravu koja siječe kružnicu, pravu koja je dodiruje (tangentu) i pravu koja je ne dodiruje.', 'Označi na kružnici kružni luk i kružni isječak.'],
      n: ['Koja je najduža tetiva kružnice?  [[! prečnik]]', 'Koliko zajedničkih tačaka imaju kružnica i tangenta?  [[! jednu]]'],
    },
    {
      id: 'm5-uglovi-vrste', r: [5], t: /ugao – vrste uglova/i,
      o: ['Komplement ugla od 35° je ___°.  [[= 90 - 35]]', 'Suplement ugla od 120° je ___°.  [[= 180 - 120]]'],
      s: ['Unakrsni uglovi: ako je jedan 70°, drugi je ___°.  [[! 70]]', 'Uporedni uglovi: jedan je 65°, drugi je ___°.  [[= 180 - 65]]'],
      n: ['Uporedni uglovi: jedan je 3 puta veći od drugog. Koliki su?  [[= 180 : 4]] [[= 3 · 45]]', 'Može li ugao biti komplementan sam sebi? Koji?  [[! da, 45°]]'],
    },
    {
      id: 'm5-mjerenje-uglova', r: [5], t: /mjerenje uglova pomo.u uglomjera/i,
      o: ['Nacrtaj uglomjerom ugao od 60°.', 'Izmjeri ugao koji nacrta drug i zapiši mjeru.'],
      s: ['Izračunaj:   45° + 75° = ___°  [[= 45 + 75]]', 'Izračunaj:   180° - 65° = ___°  [[= 180 - 65]]'],
      n: ['Nacrtaj ugao od 130° i odredi njegov suplement.  [[= 180 - 130]]', 'Nacrtaj ugao od 90° bez trougaonika, samo uglomjerom.'],
    },
    {
      id: 'm5-osna-simetrija', r: [5], t: /osna simetrija/i,
      o: ['Nacrtaj osu simetrije slova A i kvadrata.', 'Koliko osa simetrije ima kvadrat?  [[! 4]]'],
      s: ['Konstruiši simetralu duži AB = 6 cm.', 'Koja slova abecede imaju osu simetrije? Navedi 3.  [[! npr. A, M, T, O, H]]'],
      n: ['Konstruiši simetralu ugla od 80°. Koliki su dobijeni uglovi? [[= 80 : 2]]', 'Nacrtaj figuru koja ima tačno 2 ose simetrije.  [[! npr. pravougaonik]]'],
    },
    {
      id: 'm5-trougao-uglovi', r: [5], t: /zbir unutra.njih uglova u trouglu/i,
      o: ['α = 50°, β = 60°. Izračunaj γ.  [[= 180 - 50 - 60]]', 'Koliki je svaki ugao jednakostraničnog trougla?  [[= 180 : 3]]'],
      s: ['U pravouglom trouglu α = 35°. Izračunaj β.  [[= 90 - 35]]', 'Jednakokraki trougao ima ugao pri vrhu 40°. Koliki su uglovi na osnovici?  [[= (180 - 40) : 2]]'],
      n: ['Može li trougao imati dva prava ugla? Objasni.  [[! ne, 90° + 90° = 180°, za treći ne ostaje ništa]]', 'Uglovi trougla odnose se kao 1 : 2 : 3. Koliki su?  [[! 30°, 60°, 90°]]'],
    },
    {
      id: 'm5-cetvorougao', r: [5], t: /.etvorougao, pravougaonik i kvadrat/i,
      o: ['Koliko osa simetrije ima pravougaonik?  [[! 2]]', 'Zbir uglova četvorougla je ___°.  [[! 360]]'],
      s: ['Konstruiši pravougaonik 6 cm × 4 cm i nacrtaj dijagonale.', 'U četvorouglu su tri ugla 80°, 90° i 100°. Koliki je četvrti? [[= 360 - 80 - 90 - 100]]'],
      n: ['Konstruiši kvadrat čija je dijagonala 5 cm.', 'Da li je svaki kvadrat pravougaonik? A obrnuto?  [[! da; ne]]'],
    },
    {
      id: 'm5-obim', r: [5], t: /izra.unavanje obima/i,
      o: ['Izračunaj obim trougla sa stranicama 7 cm, 8 cm i 9 cm. [[= 7 + 8 + 9]]', 'Izračunaj obim kvadrata a = 11 cm. [[= 4 · 11]]'],
      s: ['Izračunaj obim pravougaonika a = 12,5 cm, b = 7,5 cm. [[= 2 · (12,5 + 7,5)]]', 'Obim kvadrata je 46 cm. Kolika je stranica? [[= 46 : 4]]'],
      n: ['Figura je sastavljena od kvadrata 4 cm × 4 cm i pravougaonika 6 cm × 4 cm koji se dodiruju dužom stranicom kvadrata. Nacrtaj je i izračunaj obim. [[= 2 · (4 + 6) + 2 · 4]]', 'Obim pravougaonika je 50 cm, a = 15 cm. Koliko je b? [[= (50 - 30) : 2]]'],
    },
    {
      id: 'm5-povrsina', r: [5], t: /izra.unavanje povr.ine pravougaonika/i,
      o: ['Izračunaj površinu kvadrata a = 9 cm. [[= 9 · 9]]', 'Izračunaj površinu pravougaonika a = 15 m, b = 8 m. [[= 15 · 8]]'],
      s: ['Površina pravougaonika je 72 cm², a = 9 cm. Kolika je stranica b? [[= 72 : 9]]', 'Izračunaj površinu pravougaonika a = 2,5 m, b = 4 m. [[= 2,5 · 4]]'],
      n: ['Zid 5 m × 3 m kreči se, a prozor 2 m × 1 m se ne kreči. Koliko m² treba okrečiti? [[= 5 · 3 - 2 · 1]]', 'Dva pravougaonika imaju istu površinu 24 cm². Napiši moguće stranice.  [[! npr. 6 i 4; 8 i 3; 12 i 2]]'],
    },
    {
      id: 'm5-slozene-figure', r: [5], t: /slo.enih geometrijskih figura/i,
      o: ['Figura je od kvadrata 4 cm × 4 cm i pravougaonika 6 cm × 2 cm. Kolika je površina? [[= 4 · 4 + 6 · 2]]', 'Nacrtaj tu figuru na kvadratnoj mreži.'],
      s: ['Iz pravougaonika 10 cm × 8 cm isječen je kvadrat 3 cm × 3 cm. Kolika je površina ostatka? [[= 10 · 8 - 3 · 3]]', 'Razloži slovo L od kvadratića na dva pravougaonika i izračunaj površinu.'],
      n: ['Nacrtaj na kvadratnoj mreži svoju složenu figuru i izračunaj njenu površinu razlaganjem.', 'Dvorište 20 m × 12 m ima bazen 6 m × 4 m. Kolika je površina oko bazena? [[= 20 · 12 - 6 · 4]]'],
    },
    {
      id: 'm5-tijela', r: [5], t: /geometrijska tijela – kvadar i kocka \(elementi/i,
      o: ['Kvadar ima ___ strana, ___ ivica i ___ tjemena.  [[! 6, 12, 8]]', 'Koja se tijela mogu kotrljati? Zaokruži: kocka, valjak, kupa, lopta, prizma.  [[! valjak, kupa, lopta]]'],
      s: ['Nacrtaj mrežu kvadra 3 cm × 2 cm × 1 cm.', 'Po čemu se razlikuju prizma i piramida?  [[! prizma ima dvije osnove, piramida jednu i vrh]]'],
      n: ['Koliko ivica i tjemena ima trostrana prizma?  [[! 9 ivica, 6 tjemena]]', 'Napravi mrežu kocke od papira i složi je.'],
    },
    {
      id: 'm5-povrsina-kvadra', r: [5], t: /povr.ina kvadra/i,
      o: ['Izračunaj površinu kocke a = 3 cm. [[= 6 · 3 · 3]]', 'Kocka ima 6 jednakih kvadrata. Površina jednog je 4 cm². Kolika je površina kocke? [[= 6 · 4]]'],
      s: ['Izračunaj površinu kvadra a = 5 cm, b = 4 cm, c = 3 cm. [[= 2 · (5 · 4 + 5 · 3 + 4 · 3)]]', 'Izračunaj površinu kocke a = 10 cm. [[= 6 · 10 · 10]]'],
      n: ['Kutiju oblika kocke a = 20 cm treba obložiti papirom. Koliko cm² papira treba? [[= 6 · 20 · 20]]', 'Akvarijum bez poklopca ima dimenzije 50, 30 i 40 cm (visina). Koliko je stakla potrebno? [[= 50 · 30 + 2 · (50 · 40 + 30 · 40)]]'],
    },
    {
      id: 'm5-zapremina', r: [5], t: /zapremina \(volumen\) kvadra/i,
      o: ['Izračunaj zapreminu kocke a = 4 cm. [[= 4 · 4 · 4]]', 'Dopuni:  1 dm³ = ___ l  [[! 1]]'],
      s: ['Izračunaj zapreminu kvadra 6 cm × 5 cm × 2 cm. [[= 6 · 5 · 2]]', 'Dopuni:  1 m³ = ___ dm³  [[! 1000]]'],
      n: ['Akvarijum je 50 cm × 30 cm × 40 cm. Koliko litara vode stane u njega? [[= 50 · 30 · 40 : 1000]]', 'Kocka ima zapreminu 27 cm³. Kolika joj je ivica?  [[! 3 cm]]'],
    },
    {
      id: 'm5-sistematizacija', r: [5], t: /sistematizacija/i,
      o: ['Izračunaj:   [[3/7 + 2/7 = ___ | 5/7]]   [[3,4 + 2,5]]', 'Odredi NZD(12, 18) i NZS(4, 6).  [[! 6; 12]]'],
      s: ['Riješi:   [[3 · x + 25 = 100 | 25]]', 'Izračunaj površinu i obim pravougaonika a = 8 cm, b = 5 cm. [[= 8 · 5]] [[= 2 · (8 + 5)]]'],
      n: ['Izračunaj:   [[2/3 + 3/4 = ___ | 17/12]]', 'Izračunaj zapreminu kvadra 8 cm × 5 cm × 3 cm i iskaži je u litrima. [[= 8 · 5 · 3]]  [[! 120 cm³ = 0,12 l]]'],
    },
  ]);
})(typeof window !== 'undefined' ? window.BankaZadataka : globalThis.BankaZadataka);
