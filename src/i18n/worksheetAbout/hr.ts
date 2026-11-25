import type { WorksheetAbout } from './sr';

// „O ovom listu“ — opis za roditelje i učitelje: dob, što dijete vježba i kada se list koristi.
// Ne ispisuje se (uputa za dijete na listu je `t.games.worksheet.sheets[id].text`); ide na stranicu lista
// i u meta opis. Dijeli se s vite.config.ts, pa ne smije uvoziti ništa ovisno o okruženju.
export const worksheetAboutHr: WorksheetAbout = {
  // Diferencirani ispiti
  testGrade1: {
    age: '1. razred',
    text: 'Isti ispit u tri razine težine: svako dijete rješava zadatke koji odgovaraju njegovu znanju, a učitelj odmah vidi tko je usvojio osnove, a tko je spreman za više. Obuhvaća brojeve, slova i glasove, zbrajanje i oduzimanje do 20 te prve rečenice. Pogodan za provjeru na kraju polugodišta ili ponavljanje kod kuće.',
  },
  testGrade2: {
    age: '2. razred',
    text: 'Diferencirana provjera za drugi razred: račun do 100 s prijelazom i bez njega, vrste riječi, rečenica i godišnja doba. Svaka razina ima svoje zadatke, pa list dobiva cijeli razred, a svaki učenik rješava dio koji može svladati. Koristan za pisanu provjeru, ponavljanje pred kraj nastavne godine ili rad kod kuće.',
  },
  testGrade3: {
    age: '3. razred',
    text: 'Provjera za treći razred na tri razine: tablica množenja i dijeljenja, izrazi sa zagradama, imenice, glagoli i pridjevi, orijentacija u prostoru i plan naselja. Prva razina provjerava osnove, a treća traži tekstualne zadatke s nepoznatim faktorom. Dobar za pisanu provjeru ili usustavljivanje gradiva.',
  },
  testGrade4: {
    age: '4. razred',
    text: 'Diferencirani ispit za četvrti razred: višeznamenkasti brojevi, pisano množenje i dijeljenje, pravopis, subjekt i predikat, čovjek i ekosustavi. Zadaci su raspoređeni u tri razine, pa se iz rezultata lako vidi kome treba dodatna podrška, a kome veći izazov.',
  },
  testGrade5: {
    age: '5. razred',
    text: 'Provjera za peti razred na tri razine: razlomci, kutovi i geometrijski zadaci, vrste i služba riječi, padeži, stilska izražajna sredstva i rad sa zemljovidom. Pogodan za završnu provjeru razredne nastave i ponavljanje u petom razredu.',
  },
  testMathOperations: {
    age: '1.–2. razred',
    text: 'Provjera iz zbrajanja i oduzimanja na tri razine: od osnovnog računa do 20, preko računa do 100 sa zagradama i nepoznatim brojem, do tekstualnog zadatka i magičnog kvadrata. Može poslužiti kao pisana provjera, domaća zadaća ili ponavljanje.',
  },
  testLanguageGrammar: {
    age: '2.–3. razred',
    text: 'Provjera iz hrvatskoga jezika na tri razine: vrste rečenica i veliko slovo, imenice, glagoli i pridjevi (rod i broj), te ispravljanje pogrešaka i kratak opis. Isti list rješava cijeli razred, a svako dijete dio koji mu odgovara.',
  },
  testNatureSociety: {
    age: '1.–3. razred',
    text: 'Diferencirani ispit iz prirode i društva: dijelovi biljke, staništa i korist domaćih životinja, godišnja doba, hranidbeni lanac te zaštita vode i šuma. Treća razina traži objašnjenje vlastitim riječima, pa dobro pokazuje tko gradivo razumije, a tko ga samo pamti.',
  },
  testReadingComprehension: {
    age: '2.–4. razred',
    text: 'Ispit čitanja s razumijevanjem uz kratku basnu: glavni likovi i mjesto radnje, redoslijed događaja i uzroci, te pouka basne i osobni stav. Pomaže vidjeti čita li dijete samo ili i razumije pročitano.',
  },
  testMultiplicationDivision: {
    age: '2.–3. razred',
    text: 'Provjera množenja i dijeljenja na tri razine: tablica do 5, tablica do 10 s redoslijedom računskih operacija i uspoređivanjem, te jednadžbe s nepoznatim faktorom i tekstualni zadatak. Dobra za pisanu provjeru nakon učenja tablice množenja.',
  },

  // Priručnici i vježbenice
  coloringBasketball: {
    age: '4–8 godina',
    text: 'Bojanka od 7 stranica o košarci: šut na koš, vođenje lopte, početak utakmice, zakucavanje, slavlje, navijačice i pehar. Ispod svake slike je pitanje ili zadatak (brojanje, pronalaženje detalja) koji otvara razgovor o igri, momčadi i poštenoj igri.',
  },
  coloringSummerDays: {
    age: '3–7 godina',
    text: 'Bojanka od 7 stranica o ljetu: sunce s naočalama, plaža, bazen, sladoled, dvorac od pijeska, kampiranje i štand s limunadom. Dobra je za kraj nastavne godine i ljetne praznike; ispod svake slike je pitanje ili zadatak za razgovor.',
  },
  coloringFamily: {
    age: '3–7 godina',
    text: 'Bojanka od 7 stranica o obitelji: društvena igra, ručak, šetnja, filmska večer, priprema kolača, piknik i odlazak u školu. Pitanja ispod slika potiču dijete da priča o svojoj obitelji, pa je bojanka dobra i uz temu „Moja obitelj“.',
  },
  coloringFathersDay: {
    age: '3–7 godina',
    text: 'Bojanka od 7 stranica za Dan očeva: natpis „Volimo tatu“, igra loptom, priča za laku noć, vožnja bicikla, nošenje na ramenima, gradnja kućice na drvetu i pecanje. Može poslužiti i kao dar tati.',
  },
  coloringEarth: {
    age: '4–8 godina',
    text: 'Bojanka od 7 stranica o planetu Zemlji: Zemlja u svemiru, sadnja drveća, recikliranje, astronauti i djeca iz cijelog svijeta. Dobra je za Dan planeta Zemlje i nastavne satove o zaštiti prirode; ispod svake slike je pitanje ili zadatak.',
  },
  coloringBicycle: {
    age: '3–7 godina',
    text: 'Bojanka od 7 stranica o biciklu: brdski bicikl, vožnja u parku, obiteljska vožnja, pomoćni kotači, utrka, starinski bicikl i sladoled na biciklu. Pitanja ispod slika otvaraju razgovor i o kacigi i sigurnoj vožnji.',
  },
  coloringWeather: {
    age: '3–7 godina',
    text: 'Bojanka od 7 stranica o vremenskim prilikama: oluja, sunčan dan, kiša, vjetar, snijeg, igra na kiši i duga. Dobra je uz nastavne satove o godišnjim dobima i vremenu; ispod svake slike je pitanje ili zadatak s brojanjem.',
  },
  coloringTools: {
    age: '3–7 godina',
    text: 'Bojanka od 7 stranica s alatima iz kuće i vrta: ključ i odvijač, kliješta, lopata i ašov, valjak za bojenje zidova, tačke, ručna pila i veseli čekić. Uz svaku sliku je pitanje o tome čemu alat služi — dobra prilika za razgovor o sigurnosti i pomaganju odraslima.',
  },
  coloringFlowers: {
    age: '3–8 godina',
    text: 'Bojanka od 7 stranica s cvijećem: ptičica na rascvjetaloj grani, cvjetna mandala, vaza, srce, košara, pčela iznad livade i cvjetni vijenac. Mandala i vijenac imaju više sitnih detalja, pa su dobri i za stariju djecu.',
  },
  coloringInsects: {
    age: '3–7 godina',
    text: 'Bojanka od 7 stranica o malim stanovnicima livade: pčelica, gusjenica, puž i leptir, leptir, bubamara, mrav i vilin konjic. Uz svaku sliku je kratka zanimljivost ili pitanje za razgovor o prirodi.',
  },
  coloringPizza: {
    age: '3–7 godina',
    text: 'Bojanka od 7 stranica o pizzi: komad pizze, pizza na dasci i u kutiji, majstor za pizzu, djeca za stolom, veseli komad i sastojci. Zadaci uz slike vježbaju brojanje i razgovor o hrani.',
  },
  coloringManners: {
    age: '3–7 godina',
    text: 'Bojanka od 7 stranica o lijepom ponašanju: briga o biljci, pomoć u dvorištu i kuhinji, pomoć starijima, red na stolu, čarobne riječi (oprosti, hvala, molim) i dijeljenje igračaka. Svaka slika ima pitanje za razgovor o lijepim navikama.',
  },
  coloringCars: {
    age: '3–7 godina',
    text: 'Bojanka od 9 stranica s veselim vozilima: trkaći automobil, vatrogasno vozilo, policijski automobil, školski autobus, bager, kamion kiper, traktor i terenac. Ispod svake slike je pitanje ili mali zadatak (brojanje, pronalaženje detalja, brojevi za hitne slučajeve 192 i 193) za razgovor s djetetom dok boji.',
  },
  coloringFruitVeg: {
    age: '3–7 godina',
    text: 'Bojanka od 9 stranica s nasmijanim voćem i povrćem: jabuka i kruška, jagoda i trešnje, banana i grožđe, lubenica, rajčica i paprika, mrkva i bundeva, brokula i kupus, krastavac i grašak. Dobra je uz temu zdrave prehrane, a ispod svake slike je pitanje ili zadatak s brojanjem.',
  },
  coloringLeaves: {
    age: '4–8 godina',
    text: 'Bojanka od 9 stranica o lišću i prirodi: listovi hrasta, javora, breze, ginka i palme, veliki list sa žilicama za strpljivo bojenje, jesenska šumska staza i životinje uz lišće. Lijepa je za jesen i za satove o biljkama; ispod svake slike je pitanje ili zadatak.',
  },
  coloringNumbers: {
    age: '3–6 godina',
    text: 'Bojanka od 11 stranica s brojevima od 0 do 9: svaki je broj veseli lik s nečim što se može prebrojiti ili dopuniti. Ispod svake slike je mali zadatak (prebroji, nacrtaj još, pokaži prstima), pa dijete uz bojenje vježba i brojanje.',
  },
  coloringBunnies: {
    age: '3–7 godina',
    text: 'Bojanka od 9 stranica sa zečićima: u košari, ispod duge, u vrtu, u utrci s kornjačom, na livadi i s obitelji. Ispod svake slike je pitanje ili mali zadatak (brojanje, redoslijed boja duge, basna o zecu i kornjači) za razgovor s djetetom dok boji. Lijepa je i za proljeće i Uskrs.',
  },
  coloringPuppies: {
    age: '3–7 godina',
    text: 'Bojanka od 9 stranica s razigranim štencima: igra s loptom, spavanje u košari, kupanje, šetnja po kiši, ljuljačka, skejtbord i prijateljstvo s mačkom. Ispod svake slike je pitanje ili mali zadatak koji potiče razgovor s djetetom dok boji.',
  },
  coloringForestAnimals: {
    age: '3–7 godina',
    text: 'Bojanka od 9 stranica sa šumskim životinjama: medo, lisica, jež, sova, zečić, lane, vjeverica, rakun i žabica. Crteži imaju debele, jasne obrise pa su pogodni i za najmlađe, a ispod svake slike je kratka zanimljivost koju roditelj ili učitelj može pročitati djetetu.',
  },
  coloringWildAnimals: {
    age: '4–8 godina',
    text: 'Bojanka od 14 stranica: naslovna stranica, 12 divljih životinja (medvjed, vuk, sova, jež i vjeverica iz naših šuma, te žirafa, lav, zebra, krokodil, slon, pingvin i majmun) i stranica za crtanje vlastite životinje. Ispod svake slike je ime životinje u slovima za bojenje i kratka zanimljivost za čitanje s djetetom.',
  },
  winterBreakPack: {
    age: '5–7 godina',
    text: 'Paket od 14 stranica za zimske praznike: plan s 12 pahuljica, zatim svaki dan po jedan listić (zimska bojanka, labirint, brojanje, spajanje točaka, zbrajanje i oduzimanje sa sličicama, logika, godišnja doba, razlike, simetrija i nizovi) i diploma na kraju. Dovoljno je 15 do 20 minuta dnevno, a dijete samo prati što je riješilo.',
  },
  homeWorkbookMath2: {
    age: '2. razred',
    text: 'Vježbenica od 16 stranica za rad kod kuće: 12 dana po jedna stranica, a kroz zadatke dijete vodi pas Njuško. Obuhvaća gradivo matematike drugog razreda, od računa do 100 do sata, kalendara i novca u KM. Na kraju su veliki izazov, diploma i rješenja, pa roditelj može sam provjeriti rad.',
  },
  writingHandbookLatin: {
    age: '3.–5. razred',
    text: 'Priručnik od 15 stranica za djecu koja vole pisati ili tek trebaju zavoljeti pisanje. Kroz 12 tema objašnjava kako nastaje priča, od ideje i junaka do zapleta, dijaloga i prepravljanja, uz primjere, preporuke knjiga i vježbe. Koristan za literarnu skupinu, dodatnu nastavu ili pisanje sastavaka kod kuće.',
  },
  writingHandbookCyrillic: {
    age: '3.–5. razred',
    text: 'Priručnik „Kako nastaje priča“ pripremljen za ispis na ćirilici: 12 tema o pisanju priče, primjeri, preporuke za čitanje, vježbe, plan priče i popis za provjeru. Pogodan za razrede koji pišu ćirilicom i za vježbanje obaju pisama.',
  },

  // Bojanke
  coloringClassroom: {
    age: '4–7 godina',
    text: 'Bojanka za predškolce i prvašiće pred polazak u školu: učionica, učiteljica, učenici u klupama, školska ploča i globus. Dobra prilika za razgovor o tome što dijete čeka u školi i kako izgleda prvi nastavni dan.',
  },
  coloringSeasons: {
    age: '4–7 godina',
    text: 'Četiri godišnja doba na jednom listu, uz temu godišnjih doba u vrtiću i prvom razredu. Dok boji, dijete može reći što se mijenja u prirodi i kakvo je vrijeme u svakom godišnjem dobu.',
  },
  coloringSpring: {
    age: '3–7 godina',
    text: 'Proljetna bojanka s rascvjetalim drvećem, pčelicom, leptirom i suncem. Uz bojenje se lijepo uklapa razgovor o buđenju prirode i o tome zašto su pčele važne.',
  },
  coloringSummer: {
    age: '3–7 godina',
    text: 'Ljetna bojanka s morem, dvorcem od pijeska, suncobranom i loptom. Zgodna za kraj nastavne godine, ljetne praznike ili putovanje, kad djetetu treba mirna aktivnost.',
  },
  coloringAutumn: {
    age: '3–7 godina',
    text: 'Jesenska bojanka s ježićem, vjevericom, sovom i lišćem. Prati teme o jeseni i životinjama koje se spremaju za zimu, a jesensko je lišće dobra prilika za igru s više nijansi iste boje.',
  },
  coloringWinter: {
    age: '3–7 godina',
    text: 'Zimska bojanka sa sanjkanjem, pahuljama, kapom i šalom. Pogodna za prosinac, zimske praznike i razgovor o tome kako se odijevamo kad je hladno.',
  },
  coloringAnimals: {
    age: '3–6 godina',
    text: 'Domaće životinje na farmi: krava, ovca, štene i pijetao. Dok boji, dijete može imenovati životinje, oponašati njihovo glasanje i reći što nam koja životinja daje.',
  },
  coloringSafari: {
    age: '4–7 godina',
    text: 'Divlje životinje afričke savane: lav, žirafa, slon i majmun. Dobar povod za razgovor o tome po čemu se divlje životinje razlikuju od domaćih i gdje žive.',
  },
  coloringPets: {
    age: '3–6 godina',
    text: 'Kućni ljubimci: maca, pas i zlatna ribica. Uz bojanku se može razgovarati o tome kako se brinemo o ljubimcu i što mu je potrebno svaki dan.',
  },
  coloringUnderwater: {
    age: '3–7 godina',
    text: 'Morski svijet s dupinom, kornjačom, hobotnicom, morskim zvijezdama i školjkama. Ima više sitnih detalja, pa je dobra za djecu koja već boje unutar crta.',
  },
  coloringSubmarine: {
    age: '4–7 godina',
    text: 'Podmornica na dnu oceana i škrinja s blagom. Bojanka koja potiče maštu: dijete može smisliti priču o tome što je u škrinji i tko ju je ondje ostavio.',
  },
  coloringVehicles: {
    age: '3–6 godina',
    text: 'Prijevozna sredstva na kopnu, vodi i u zraku: vlak s lokomotivom, zrakoplov, jedrenjak i automobil. Pogodna uz temu prometa i za razvrstavanje vozila prema tome gdje se kreću.',
  },
  coloringConstruction: {
    age: '3–6 godina',
    text: 'Građevinski strojevi: bager, kamion kiper i dizalica. Omiljena tema mnoge djece i dobar povod za razgovor o tome čemu služi koji stroj.',
  },
  coloringDino: {
    age: '4–7 godina',
    text: 'Dinosauri i mladunče dinosaura koje izlazi iz jajeta. Bojanka za male ljubitelje prapovijesti, uz koju se može razgovarati o tome kako znamo da su dinosauri postojali.',
  },
  coloringCastle: {
    age: '3–7 godina',
    text: 'Dvorac iz bajke s kulama, zastavicama, veselim zmajem i dugom. Dobar uvod u pričanje bajki ili izmišljanje vlastite.',
  },
  coloringSpace: {
    age: '4–7 godina',
    text: 'Astronaut, raketa, planeti i prijateljski izvanzemaljac. Povod za prva pitanja o svemiru, planetima i tome kako se leti u svemir.',
  },
  coloringProfessions: {
    age: '4–7 godina',
    text: 'Vatrogasac, liječnik i kuhar. Bojanka uz temu zanimanja: dijete može reći što tko radi, što mu treba za posao i čime bi se ono voljelo baviti kad odraste.',
  },
  coloringSports: {
    age: '4–7 godina',
    text: 'Lopte, bicikl, tenisice i pobjednički pehar. Pogodna uz temu sporta i zdravog života ili kao nagrada nakon sata tjelesne i zdravstvene kulture.',
  },
  coloringMusic: {
    age: '4–7 godina',
    text: 'Gitara, klavir, bubnjevi, violina i note. Dobra uz glazbenu kulturu: dijete imenuje instrumente i pokazuje kako se na kojem svira.',
  },
  coloringBakery: {
    age: '3–7 godina',
    text: 'Torta sa svjećicama, krafne, muffini i sladoled. Vesela bojanka za rođendane i proslave u vrtiću ili razredu.',
  },
  coloringLatin: {
    age: '5–7 godina, 1. razred',
    text: 'Šuplja velika i mala slova abecede sa sličicom uz svako slovo i crtom za pisanje. Dijete kroz bojenje upoznaje oblik slova, povezuje ga s glasom i zatim ga samostalno napiše.',
  },
  coloringCyrillic: {
    age: '5–7 godina, 1. razred',
    text: 'Šuplja slova azbuke sa sličicom i riječju uz svako slovo te crtom za pisanje. Dijete upoznaje oblik ćiriličnog slova, čita prvu riječ i povezuje slovo s glasom.',
  },
  colorByNumber: {
    age: '4–7 godina',
    text: 'Bojanka po brojevima od 1 do 6: dijete čita broj u polju i bira boju iz legende. Istodobno vježba prepoznavanje brojeva, pažnju i preciznost bojenja.',
  },
  coloringScenes: {
    age: '3–7 godina',
    text: 'Velika bojanka s više prizora: priroda sa životinjama, svemir i more. Za dulje, mirne aktivnosti, kad dijete želi bojiti više od jedne slike.',
  },
  coloringHandWash: {
    age: '3–6 godina',
    text: 'Četiri sličice koje pokazuju kako se pravilno peru ruke. Bojanka potiče higijensku naviku: dijete boji, a zatim redom prepričava korake.',
  },
  coloringTraffic: {
    age: '4–7 godina',
    text: 'Semafor i pješački prijelaz: dijete boji svjetla pravim redom i uči kada se prelazi cesta. Korisna pred polazak u školu, kad dijete počinje samostalno ići u promet.',
  },
  coloringFood: {
    age: '4–7 godina',
    text: 'Zdrava hrana na tanjuru i slatkiši koji se jedu samo ponekad. Bojanka otvara razgovor o tome što jedemo svaki dan, a što rijetko, bez zabrana i grižnje savjesti.',
  },
  coloringRecycle: {
    age: '4–8 godina',
    text: 'Razvrstavanje otpada: papir, plastika i staklo idu u spremnike odgovarajuće boje. Dijete spaja predmete sa spremnicima i boji ih, pa uči prve korake u čuvanju prirode.',
  },
  coloringFeelings: {
    age: '3–7 godina',
    text: 'Lica s različitim osjećajima i prazan krug u koji dijete crta kako se danas osjeća. Pomaže djetetu imenovati osjećaje, a odrasloj osobi otvoriti razgovor.',
  },
  coloringCircus: {
    age: '4–8 godina',
    text: 'Cirkuska šatra, slonić na lopti, zečić u mađioničarskom šeširu i klaun s balonima. Raznovrsni detalji vježbaju strpljenje i precizno bojenje unutar crte.',
  },
  coloringJungle: {
    age: '4–8 godina',
    text: 'Tropska prašuma s tukanom, papigom arom, lijanama i cvjetovima. Pogodna uz razgovor o divljim životinjama i toplim krajevima svijeta.',
  },
  coloringRobot: {
    age: '4–8 godina',
    text: 'Prijateljski robot sa zaslonom, gumbićima i malim letećim dronom u svemiru. Dobra za vježbanje geometrijskih likova i uredno bojenje manjih polja.',
  },
  coloringGarden: {
    age: '3–7 godina',
    text: 'Vrtno strašilo, suncokret, kanta za zalijevanje, mrkve i bundeva u gredici. Lijepo prati teme o biljkama, povrću, proljeću i jesenskim plodovima.',
  },
  coloringPirates: {
    age: '4–8 godina',
    text: 'Jedrenjak na valovima, otok s palmom i otvorena škrinja s blagom. Potiče maštu i pričanje priče dok dijete boji prizor.',
  },
  coloringFair: {
    age: '4–8 godina',
    text: 'Zabavni park s panoramskim kotačem, vrtuljkom s konjićima i kolicima s balonima. Sitniji detalji vježbaju kontrolu olovke i kombiniranje boja.',
  },
  colors: {
    age: '3–5 godina',
    text: 'Bojenje likova prema legendi: dijete prepoznaje krug, kvadrat, trokut i druge oblike, imenuje boje i povezuje jedno s drugim. Verzija za ispis igre s ove stranice.',
  },

  // Snalaženje u vremenu
  timeSequence: {
    age: '4–7 godina',
    text: 'Nizovi sličica koje dijete slaže po redu: što je bilo prvo, a što poslije. Razvija osjećaj za vrijeme te za uzrok i posljedicu, a priprema i za prepričavanje.',
  },
  timeDayParts: {
    age: '4–7 godina',
    text: 'Jutro, podne, večer i noć kroz svakodnevne aktivnosti. Dijete povezuje dio dana s onim što tada radi i uči riječi kojima govorimo o vremenu.',
  },
  timeRoutine: {
    age: '5–7 godina',
    text: 'Dnevna rutina od buđenja do spavanja, sa satom pokraj svake sličice. Dijete crta kazaljke i povezuje vrijeme na satu s onim što radi tijekom dana.',
  },
  timeClock: {
    age: '1.–2. razred',
    text: 'Uvod u čitanje sata na dvije stranice: upisivanje vremena i crtanje kazaljki. Jasno razlikuje kratku kazaljku za sate i dugu za minute, pa je dobar za prvi susret sa satom.',
  },
  timeClockRead: {
    age: '1.–2. razred',
    text: 'Vježba čitanja sata za pune sate i pola sata: upisivanje vremena i spajanje sata s točnim zapisom. Pogodna nakon uvodne lekcije o satu.',
  },
  timeClockMath: {
    age: '2.–3. razred',
    text: 'Računanje s vremenom: koliko će biti sati nakon nekoliko sati i koliko je bilo prije. Povezuje sat sa zbrajanjem i oduzimanjem te priprema za tekstualne zadatke o vremenu.',
  },
  timeWeek: {
    age: '5–7 godina, 1. razred',
    text: 'Dani u tjednu na gusjenici: dijete boji nastavne dane i vikend, čita dane redom te dopunjava jučer, danas i sutra.',
  },
  timeDaysOrder: {
    age: '1.–2. razred',
    text: 'Dani u tjednu i mjeseci u godini redom: dan prije i poslije, mjeseci koji nedostaju i povezivanje mjeseci s godišnjim dobima.',
  },
  timeCalendar: {
    age: '1.–3. razred',
    text: 'Čitanje kalendara jednog mjeseca: dijete pronalazi datume i dane u tjednu te broji dane. Vježba snalaženja u kalendaru kakav viđa kod kuće i u školi.',
  },
  timeYear: {
    age: '1.–2. razred',
    text: 'Mjeseci i godišnja doba na jednom listu: dijete boji mjesece prema godišnjim dobima, pronalazi mjesec svog rođendana i dopunjava rečenicu.',
  },

  // Pisanje
  latin: {
    age: '5–7 godina, 1. razred',
    text: 'Vježba pisanja slova latinice u crtovlju: uzorak, siva slova za precrtavanje i prazno mjesto za samostalno pisanje. Pomaže djetetu od početka usvojiti pravilan oblik i veličinu slova.',
  },
  cyrillic: {
    age: '5–7 godina, 1. razred',
    text: 'Vježba pisanja slova ćirilice u crtovlju: uzorak, siva slova za precrtavanje i prazno mjesto za samostalno pisanje. Pomaže djetetu od početka usvojiti pravilan oblik i veličinu slova.',
  },
  initialLetterLatin: {
    age: '5–7 godina, 1. razred',
    text: 'Glasovna analiza na latinici: dijete imenuje sličicu, čuje početni glas i bira točno slovo. Važna vještina prije čitanja jer povezuje glas sa slovom.',
  },
  initialLetterCyrillic: {
    age: '5–7 godina, 1. razred',
    text: 'Glasovna analiza na ćirilici: dijete imenuje sličicu, čuje početni glas i bira točno slovo. Važna vještina prije čitanja jer povezuje glas sa slovom.',
  },
  letterMatchLatin: {
    age: '1. razred',
    text: 'Povezivanje velikih i malih slova latinice: spajanje crtom i dopisivanje malog slova pokraj velikoga. Za utvrđivanje kad su sva slova obrađena.',
  },
  letterMatchCyrillic: {
    age: '1.–2. razred',
    text: 'Povezivanje velikih i malih slova ćirilice: spajanje crtom i dopisivanje malog slova pokraj velikoga. Za utvrđivanje kad su sva slova obrađena.',
  },
  syllablesLatin: {
    age: '1. razred',
    text: 'Čitanje tablice slogova i spajanje slogova u riječi na latinici. Most između poznavanja slova i tečnog čitanja, za djecu koja poznaju slova, ali ih još sporo spajaju.',
  },
  syllablesCyrillic: {
    age: '1. razred',
    text: 'Čitanje tablice slogova i spajanje slogova u riječi na ćirilici. Most između poznavanja slova i tečnog čitanja, za djecu koja poznaju slova, ali ih još sporo spajaju.',
  },
  scriptBridge: {
    age: '2.–3. razred',
    text: 'Latinica i ćirilica jedna pokraj druge: spajanje istih slova i prepisivanje riječi drugim pismom. Za učenike koji uče drugo pismo i za utvrđivanje obaju pisama.',
  },
  numbers: {
    age: '5–7 godina, 1. razred',
    text: 'Pisanje znamenki u redovima: uzorak, siva znamenka za precrtavanje i prazno mjesto za samostalno pisanje. Dijete uči pravilan smjer poteza, odozgo prema dolje.',
  },

  // Grafomotorika
  trace: {
    age: '3–5 godina',
    text: 'Praćenje staza od lakših prema težima. Jača kontrolu olovke i koordinaciju oka i ruke, osnovu za kasnije pisanje. Verzija za ispis igre „Prati stazu“ s ove stranice.',
  },
  lines: {
    age: '3–5 godina',
    text: 'Ravne crte od jedne sličice do druge. Prva grafomotorička vježba za dijete koje tek uči držati olovku.',
  },
  waves: {
    age: '4–6 godina',
    text: 'Valovi, petlje i uzorci u redovima. Vježba ritmičan, povezan pokret ruke, isti onaj koji poslije treba za pisana slova.',
  },
  outlines: {
    age: '3–5 godina',
    text: 'Precrtavanje osnovnih oblika: krug, kvadrat, trokut, srce i zvijezda. Dijete vježba potez i usput uči nazive oblika.',
  },
  dots: {
    age: '4–6 godina',
    text: 'Spajanje točaka po brojevima dok ne nastane slika. Vježba redoslijed brojeva, pažnju i precizan potez, a na kraju slijedi bojenje.',
  },
  maze: {
    age: '4–6 godina',
    text: 'Labirinti u kojima dijete olovkom vodi zečića do mrkve. Razvija planiranje, pažnju i kontrolu olovke bez prelaska preko crta.',
  },

  // Matematika
  count: {
    age: '3–5 godina',
    text: 'Brojanje sličica i zaokruživanje točnog broja. Povezuje količinu s brojem, što je prvi korak prema računanju.',
  },
  quantity: {
    age: '4–6 godina',
    text: 'Obrnut zadatak od brojanja: dijete vidi broj i crta toliko predmeta. Tako se provjerava razumije li doista što broj znači.',
  },
  adding: {
    age: '5–7 godina, 1. razred',
    text: 'Zbrajanje uz sličice: dijete broji obje skupine i upisuje koliko ih je ukupno. Prvo zbrajanje, prije računa sa samim brojevima.',
  },
  subtraction: {
    age: '5–7 godina, 1. razred',
    text: 'Oduzimanje uz prekrižene sličice: koliko ih je bilo, koliko je oduzeto i koliko je ostalo. Uvod u oduzimanje kroz sliku.',
  },
  compareNumbers: {
    age: '1. razred',
    text: 'Usporedba skupina i brojeva znakovima <, > i =. Dijete najprije broji, a zatim upisuje znak, pa znak dobiva jasno značenje.',
  },
  missingNumbers: {
    age: '1. razred',
    text: 'Brojevni niz do 10, prethodnik i sljedbenik. Utvrđuje redoslijed brojeva i pojmove „za jedan manji“ i „za jedan veći“.',
  },
  sizes: {
    age: '3–5 godina',
    text: 'Slaganje predmeta od najmanjeg do najvećeg. Vježba uspoređivanje po veličini i nizanje, pojmove koji prethode mjerenju.',
  },
  mathNumberLine: {
    age: '1.–2. razred',
    text: 'Brojevni pravac sa skokovima naprijed i natrag. Dijete vidi zbrajanje i oduzimanje kao kretanje po brojevnom pravcu, što pomaže kod računa s prijelazom desetice.',
  },
  mathHouses: {
    age: '1. razred',
    text: 'Kućice brojeva: rastavljanje broja na dva pribrojnika. Ključna vježba za brzo računanje do 10 i do 20.',
  },
  mathAdd10: {
    age: '1. razred',
    text: '96 zadataka zbrajanja do 10 na dvije stranice. Za utvrđivanje i uvježbavanje, dok dijete račun do 10 ne svlada napamet.',
  },
  mathSub10: {
    age: '1. razred',
    text: '96 zadataka oduzimanja do 10 na dvije stranice. Za utvrđivanje i uvježbavanje, dok dijete račun do 10 ne svlada napamet.',
  },
  mathMissing: {
    age: '1. razred',
    text: 'Jednakosti s brojem koji nedostaje, do 10 i do 20. Razvija razumijevanje veze između zbrajanja i oduzimanja.',
  },
  mathAddSub20: {
    age: '1. razred',
    text: 'Zbrajanje i oduzimanje do 20: prva stranica bez prijelaza, druga s prijelazom desetice. Pogodno za utvrđivanje i domaću zadaću.',
  },
  mathPyramids: {
    age: '1.–2. razred',
    text: 'Brojevne piramide do 20 i do 100. Zanimljiviji oblik vježbanja zbrajanja i oduzimanja jer dijete samo otkriva koju računsku radnju treba primijeniti.',
  },
  mathAddSub100: {
    age: '2. razred',
    text: 'Zbrajanje i oduzimanje do 100, bez prijelaza i s prijelazom desetice. Za utvrđivanje gradiva drugog razreda.',
  },
  mathMultiply: {
    age: '2.–3. razred',
    text: '96 zadataka iz tablice množenja: prva stranica do 5, druga do 10. Za utvrđivanje i uvježbavanje tablice.',
  },
  mathDivide: {
    age: '2.–3. razred',
    text: '96 zadataka dijeljenja: prva stranica brojevima do 5, druga do 10. Najbolje ide uz tablicu množenja.',
  },
  mathWordProblems: {
    age: '2.–3. razred',
    text: 'Tekstualni zadaci iz svakodnevnog života: hrana, sat, dani, promet i priroda. Dijete čita zadatak, zapisuje račun i odgovara punom rečenicom.',
  },
  mathFractions: {
    age: '3.–5. razred',
    text: 'Uvod u razlomke kroz bojenje i čitanje dijelova lika (polovine, trećine, četvrtine, šestine i osmine) uz uspoređivanje razlomaka jednakih nazivnika.',
  },
  mathGeometry: {
    age: '1.–3. razred',
    text: 'Ravni geometrijski likovi (stranice i vrhovi), povezivanje geometrijskih tijela s predmetima iz okruženja te prepoznavanje dužine, pravca, polupravca i zakrivljene crte.',
  },
  mathEvenOdd: {
    age: '1.–2. razred',
    text: 'Parni i neparni brojevi do 100: bojenje balona prema parnosti, spajanje predmeta u parove po dvoje te nastavljanje parnih i neparnih nizova.',
  },
  mathMoney: {
    age: '1.–2. razred',
    text: 'Zbrajanje novčanica i kovanica (KM), računanje cijene školskog pribora prema cjeniku i vraćanje ostatka na blagajni.',
  },
  mathRomanNumerals: {
    age: '3.–4. razred',
    text: 'Rimski brojevi do XX: povezivanje s arapskim znamenkama, zapisivanje brojeva rimskim znakovima te jednostavno zbrajanje i oduzimanje.',
  },
  mathMultiplicationGrid: {
    age: '2.–3. razred',
    text: 'Množenje kao zbroj jednakih pribrojnika, prebrojavanje točkica po redovima i stupcima te popunjavanje male tablice množenja do 5.',
  },

  // Logika
  pattern: {
    age: '3–6 godina',
    text: 'Nastavljanje niza sličica koje se ponavljaju. Razvija uočavanje pravila, osnovu matematičkog mišljenja.',
  },
  odd: {
    age: '3–6 godina',
    text: 'Pronalaženje sličice koja ne pripada skupini. Vježba razvrstavanje i govor jer dijete objašnjava zašto je odabralo baš tu sličicu.',
  },
  match: {
    age: '3–5 godina',
    text: 'Spajanje predmeta koji idu zajedno. Razvija logičko povezivanje i obogaćuje rječnik.',
  },
  shapes: {
    age: '3–5 godina',
    text: 'Spajanje sličica s njihovim sjenama. Vježba opažanje oblika, važno poslije za prepoznavanje slova.',
  },
  differences: {
    age: '4–7 godina',
    text: 'Pet razlika između dviju slika. Vježba pažnju i pažljivo promatranje detalja.',
  },
  symmetry: {
    age: '5–8 godina',
    text: 'Docrtavanje druge polovice slike na mreži, kao u zrcalu. Uvod u simetriju i orijentaciju u prostoru.',
  },
  copy: {
    age: '5–8 godina',
    text: 'Precrtavanje crteža na mrežu, kvadratić po kvadratić. Razvija prostornu orijentaciju, pažnju i preciznost.',
  },
};
