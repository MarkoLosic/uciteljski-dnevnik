import type { WorksheetId } from '../../games/ids';

// „O ovom listu“ — opis za roditelje i učitelje: uzrast, šta dijete vježba i kada se list koristi.
// Ne štampa se (uputstvo za dijete na listu je `t.games.worksheet.sheets[id].text`); ide na stranicu lista
// i u meta opis. Deli se sa vite.config.ts, pa ne sme uvoziti ništa zavisno od okruženja.
export interface SheetAbout {
  age: string;
  text: string;
}

export type WorksheetAbout = Partial<Record<WorksheetId, SheetAbout>>;

export const worksheetAboutSr: WorksheetAbout = {
  // Diferencirani testovi
  testGrade1: {
    age: '1. razred',
    text: 'Isti test u tri težine: svako dijete radi zadatke koji odgovaraju njegovom znanju, a učitelj odmah vidi ko je usvojio osnovno, a ko je spreman za više. Obuhvata brojeve, slova i glasove, sabiranje i oduzimanje do 20 i prve rečenice. Pogodan za provjeru na kraju polugodišta ili ponavljanje kod kuće.',
  },
  testGrade2: {
    age: '2. razred',
    text: 'Diferencirana provjera za drugi razred: račun do 100 sa prelazom i bez njega, vrste riječi, rečenica i godišnja doba. Svaki nivo ima svoje zadatke, pa list dobija cijelo odjeljenje, a svaki učenik radi dio koji može savladati. Koristan za kontrolni, ponavljanje pred kraj godine ili rad kod kuće.',
  },
  testGrade3: {
    age: '3. razred',
    text: 'Provjera za treći razred na tri nivoa: tablica množenja i dijeljenja, izrazi sa zagradama, imenice, glagoli i pridjevi, orijentacija u prostoru i plan naselja. Prvi nivo provjerava osnovu, a treći traži tekstualne zadatke sa nepoznatim činiocem. Dobar za kontrolni ili sistematizaciju gradiva.',
  },
  testGrade4: {
    age: '4. razred',
    text: 'Diferencirani test za četvrti razred: višecifreni brojevi, pisano množenje i dijeljenje, pravopis, subjekat i predikat, čovjek i ekosistemi. Zadaci su raspoređeni u tri nivoa, pa se iz rezultata lako vidi kome treba dodatna podrška, a kome veći izazov.',
  },
  testGrade5: {
    age: '5. razred',
    text: 'Provjera za peti razred na tri nivoa: razlomci, uglovi i geometrijski zadaci, vrste i služba riječi, padeži, stilske figure i rad sa geografskom kartom. Pogodan za završnu provjeru razredne nastave i ponavljanje pred prelazak u predmetnu nastavu.',
  },
  testMathOperations: {
    age: '1–2. razred',
    text: 'Kontrolna vježba iz sabiranja i oduzimanja u tri nivoa: od osnovnog računa do 20, preko računa do 100 sa zagradama i nepoznatim brojem, do tekstualnog zadatka i magičnog kvadrata. Može poslužiti kao kontrolni, domaći zadatak ili ponavljanje.',
  },
  testLanguageGrammar: {
    age: '2–3. razred',
    text: 'Provjera iz maternjeg jezika na tri nivoa: vrste rečenica i veliko slovo, imenice, glagoli i pridjevi (rod i broj), pa ispravljanje grešaka i kratak opis. Isti list radi cijelo odjeljenje, a svako dijete dio koji mu odgovara.',
  },
  testNatureSociety: {
    age: '1–3. razred',
    text: 'Diferencirani test iz prirode i društva: dijelovi biljke, staništa i korist domaćih životinja, godišnja doba, lanac ishrane i zaštita vode i šuma. Treći nivo traži objašnjenje svojim riječima, pa dobro pokazuje ko gradivo razumije, a ko ga samo pamti.',
  },
  testReadingComprehension: {
    age: '2–4. razred',
    text: 'Test čitanja sa razumijevanjem uz kratku basnu: glavni likovi i mjesto radnje, redoslijed događaja i uzroci, pa poruka basne i lični stav. Pomaže da se vidi da li dijete samo čita ili i razumije pročitano.',
  },
  testMultiplicationDivision: {
    age: '2–3. razred',
    text: 'Provjera množenja i dijeljenja na tri nivoa: tablica do 5, tablica do 10 sa redoslijedom računskih operacija i poređenjem, pa jednačine sa nepoznatim činiocem i tekstualni zadatak. Dobra za kontrolni poslije učenja tablice množenja.',
  },

  // Priručnici i vježbanke
  coloringBasketball: {
    age: '4–8 godina',
    text: 'Bojanka od 7 strana o košarci: šut na koš, vođenje lopte, početak utakmice, zakucavanje, slavlje, navijačice i pehar. Ispod svake slike je pitanje ili zadatak (brojanje, pronalaženje detalja) koji otvara razgovor o igri, timu i fer-pleju.',
  },
  coloringSummerDays: {
    age: '3–7 godina',
    text: 'Bojanka od 7 strana o ljetu: sunce s naočarima, plaža, bazen, sladoled, dvorac od pijeska, kampovanje i štand sa limunadom. Dobra je za kraj školske godine i ljetni raspust; ispod svake slike je pitanje ili zadatak za razgovor.',
  },
  coloringFamily: {
    age: '3–7 godina',
    text: 'Bojanka od 7 strana o porodici: društvena igra, ručak, šetnja, filmsko veče, pravljenje kolača, piknik i polazak u školu. Pitanja ispod slika podstiču dijete da priča o svojoj porodici, pa je bojanka dobra i uz temu „Moja porodica“.',
  },
  coloringFathersDay: {
    age: '3–7 godina',
    text: 'Bojanka od 7 strana za Dan očeva: transparent „Volimo tatu“, igra loptom, priča za laku noć, vožnja bicikla, nošenje na ramenima, gradnja kućice na drvetu i pecanje. Može poslužiti i kao poklon tati.',
  },
  coloringEarth: {
    age: '4–8 godina',
    text: 'Bojanka od 7 strana o planeti Zemlji: Zemlja u svemiru, sadnja drveća, recikliranje, astronauti i djeca iz cijelog svijeta. Dobra je za Dan planete Zemlje i časove o zaštiti prirode; ispod svake slike je pitanje ili zadatak.',
  },
  coloringBicycle: {
    age: '3–7 godina',
    text: 'Bojanka od 7 strana o biciklu: brdski bicikl, vožnja u parku, porodična vožnja, pomoćni točkovi, trka, starinski bicikl i sladoled na biciklu. Pitanja ispod slika otvaraju razgovor i o kacigi i bezbjednoj vožnji.',
  },
  coloringWeather: {
    age: '3–7 godina',
    text: 'Bojanka od 7 strana o vremenskim prilikama: oluja, sunčan dan, kiša, vjetar, snijeg, igra po kiši i duga. Dobra je uz časove o godišnjim dobima i vremenu; ispod svake slike je pitanje ili zadatak sa brojanjem.',
  },
  coloringManners: {
    age: '3–7 godina',
    text: 'Bojanka od 7 strana o lijepom ponašanju: briga o biljci, pomoć u dvorištu i kuhinji, pomoć starijima, red na stolu, čarobne riječi (izvini, hvala, molim) i dijeljenje igračaka. Svaka slika ima pitanje za razgovor o lijepim navikama.',
  },
  coloringCars: {
    age: '3–7 godina',
    text: 'Bojanka od 9 strana sa veselim vozilima: trkaći auto, vatrogasni kamion, policijski auto, školski autobus, bager, kiper, traktor i terenski džip. Ispod svake slike je pitanje ili mali zadatak (brojanje, pronalaženje detalja, brojevi za hitne slučajeve 122 i 123) za razgovor sa djetetom dok boji.',
  },
  coloringFruitVeg: {
    age: '3–7 godina',
    text: 'Bojanka od 9 strana sa nasmijanim voćem i povrćem: jabuka i kruška, jagoda i trešnje, banana i grožđe, lubenica, paradajz i paprika, mrkva i bundeva, brokoli i kupus, krastavac i grašak. Dobra je uz temu zdrave ishrane, a ispod svake slike je pitanje ili zadatak sa brojanjem.',
  },
  coloringLeaves: {
    age: '4–8 godina',
    text: 'Bojanka od 9 strana o lišću i prirodi: listovi hrasta, javora, breze, ginka i palme, veliki list sa žilicama za strpljivo bojenje, jesenja šumska staza i životinje uz lišće. Lijepa je za jesen i za časove o biljkama; ispod svake slike je pitanje ili zadatak.',
  },
  coloringNumbers: {
    age: '3–6 godina',
    text: 'Bojanka od 11 strana sa brojevima od 0 do 9: svaki broj je veseli lik sa nečim što se može prebrojati ili dopuniti. Ispod svake slike je mali zadatak (prebroj, nacrtaj još, pokaži prstima), pa dijete uz bojenje vježba i brojanje.',
  },
  coloringBunnies: {
    age: '3–7 godina',
    text: 'Bojanka od 9 strana sa veselim zečićima: u korpi, ispod duge, u bašti, u trci sa kornjačom, na livadi i sa porodicom. Ispod svake slike je pitanje ili mali zadatak (brojanje, redoslijed boja duge, basna o zecu i kornjači) za razgovor sa djetetom dok boji. Lijepa je i za proljeće i Uskrs.',
  },
  coloringPuppies: {
    age: '3–7 godina',
    text: 'Bojanka od 9 strana sa razigranim štencima: igra s loptom, spavanje u korpi, kupanje, šetnja po kiši, ljuljaška, skejtbord i drugarstvo sa mačkom. Ispod svake slike je pitanje ili mali zadatak koji podstiče razgovor sa djetetom dok boji.',
  },
  coloringForestAnimals: {
    age: '3–7 godina',
    text: 'Bojanka od 9 strana sa šumskim životinjama: medo, lisica, jež, sova, zeko, lane, vjeverica, rakun i žabica. Crteži imaju debele, jasne obrise, pa su pogodni i za najmlađe, a ispod svake slike je kratka zanimljivost koju roditelj ili učitelj može pročitati djetetu.',
  },
  coloringWildAnimals: {
    age: '4–8 godina',
    text: 'Bojanka od 14 strana: naslovna strana, 12 divljih životinja (medvjed, vuk, sova, jež i vjeverica iz naših šuma, pa žirafa, lav, zebra, krokodil, slon, pingvin i majmun) i strana za crtanje vlastite životinje. Ispod svake slike je ime životinje u slovima za bojenje i kratka zanimljivost za čitanje sa djetetom.',
  },
  winterBreakPack: {
    age: '5–7 godina',
    text: 'Paket od 14 strana za zimski raspust: plan sa 12 pahuljica, pa svaki dan po jedan list (zimska bojanka, lavirint, brojanje, spajanje tačaka, sabiranje i oduzimanje sa sličicama, logika, godišnja doba, razlike, simetrija i nizovi) i diploma na kraju. Dovoljno je 15 do 20 minuta dnevno, a dijete samo prati šta je uradilo.',
  },
  homeWorkbookMath2: {
    age: '2. razred',
    text: 'Vježbanka od 16 strana za rad kod kuće: 12 dana po jedna strana, a kroz zadatke dijete vodi pas Njuško. Obuhvata gradivo matematike drugog razreda, od računa do 100 do sata, kalendara i novca u KM. Na kraju su veliki izazov, diploma i rješenja, pa roditelj može sam provjeriti rad.',
  },
  writingHandbookLatin: {
    age: '3–5. razred',
    text: 'Priručnik od 15 strana za djecu koja vole da pišu ili tek treba da zavole pisanje. Kroz 12 tema objašnjava kako nastaje priča, od ideje i junaka do zapleta, dijaloga i prepravljanja, uz primjere, preporuke knjiga i vježbe. Koristan za literarnu sekciju, dodatnu nastavu ili pisanje sastava kod kuće.',
  },
  writingHandbookCyrillic: {
    age: '3–5. razred',
    text: 'Priručnik „Kako nastaje priča“ štampan ćirilicom: 12 tema o pisanju priče, primjeri, preporuke za čitanje, vježbe, plan priče i lista za provjeru. Pogodan za odjeljenja koja pišu ćirilicom i za vježbanje oba pisma.',
  },

  // Bojanke
  coloringClassroom: {
    age: '4–7 godina',
    text: 'Bojanka za predškolce i prvake pred polazak u školu: učionica, učiteljica, đaci u klupama, tabla i globus. Dobra prilika za razgovor o tome šta dijete čeka u školi i kako izgleda prvi dan.',
  },
  coloringSeasons: {
    age: '4–7 godina',
    text: 'Četiri godišnja doba na jednom listu, uz temu godišnjih doba u vrtiću i prvom razredu. Dok boji, dijete može reći šta se mijenja u prirodi i kakvo je vrijeme u svakom godišnjem dobu.',
  },
  coloringSpring: {
    age: '3–7 godina',
    text: 'Proljećna bojanka sa rascvjetalim drvećem, pčelicom, leptirom i suncem. Uz bojenje se lijepo uklapa razgovor o buđenju prirode i o tome zašto su pčele važne.',
  },
  coloringSummer: {
    age: '3–7 godina',
    text: 'Ljetna bojanka sa morem, dvorcem od pijeska, suncobranom i loptom. Zgodna za kraj školske godine, raspust ili put, kad djetetu treba mirna aktivnost.',
  },
  coloringAutumn: {
    age: '3–7 godina',
    text: 'Jesenja bojanka sa ježićem, vjevericom, sovom i lišćem. Prati teme o jeseni i životinjama koje se spremaju za zimu, a jesenje lišće je dobra prilika za igru sa više nijansi iste boje.',
  },
  coloringWinter: {
    age: '3–7 godina',
    text: 'Zimska bojanka sa sankanjem, pahuljama, kapom i šalom. Pogodna za decembar, zimski raspust i razgovor o tome kako se oblačimo kad je hladno.',
  },
  coloringAnimals: {
    age: '3–6 godina',
    text: 'Domaće životinje na farmi: krava, ovca, štene i petao. Dok boji, dijete može imenovati životinje, oponašati njihove glasove i reći šta nam koja životinja daje.',
  },
  coloringSafari: {
    age: '4–7 godina',
    text: 'Divlje životinje afričke savane: lav, žirafa, slon i majmun. Dobar povod za razgovor o tome po čemu se divlje životinje razlikuju od domaćih i gdje žive.',
  },
  coloringPets: {
    age: '3–6 godina',
    text: 'Kućni ljubimci: maca, pas i zlatna ribica. Uz bojanku se može razgovarati o tome kako se brinemo o ljubimcu i šta mu je potrebno svaki dan.',
  },
  coloringUnderwater: {
    age: '3–7 godina',
    text: 'Morski svijet sa delfinom, kornjačom, hobotnicom, morskim zvijezdama i školjkama. Ima više sitnih detalja, pa je dobra za djecu koja već boje unutar linija.',
  },
  coloringSubmarine: {
    age: '4–7 godina',
    text: 'Podmornica na dnu okeana i škrinja sa blagom. Bojanka koja podstiče maštu: dijete može smisliti priču o tome šta je u škrinji i ko ju je tu ostavio.',
  },
  coloringVehicles: {
    age: '3–6 godina',
    text: 'Prevozna sredstva na kopnu, vodi i u vazduhu: lokomotiva, avion, jedrenjak i auto. Pogodna uz temu saobraćaja i za razvrstavanje vozila po tome gdje se kreću.',
  },
  coloringConstruction: {
    age: '3–6 godina',
    text: 'Građevinske mašine: bager, kamion kiper i dizalica. Omiljena tema mnoge djece i dobar povod za razgovor o tome čemu služi koja mašina.',
  },
  coloringDino: {
    age: '4–7 godina',
    text: 'Dinosaurusi i beba dinosaurusa koja izlazi iz jajeta. Bojanka za male ljubitelje praistorije, uz koju se može pričati o tome kako znamo da su dinosaurusi postojali.',
  },
  coloringCastle: {
    age: '3–7 godina',
    text: 'Dvorac iz bajke sa kulama, zastavicama, veselim zmajem i dugom. Dobar uvod u pričanje bajki ili izmišljanje sopstvene.',
  },
  coloringSpace: {
    age: '4–7 godina',
    text: 'Astronaut, raketa, planete i prijateljski vanzemaljac. Povod za prva pitanja o svemiru, planetama i tome kako se leti u kosmos.',
  },
  coloringProfessions: {
    age: '4–7 godina',
    text: 'Vatrogasac, doktor i kuvar. Bojanka uz temu zanimanja: dijete može reći šta ko radi, šta mu treba za posao i čime bi ono voljelo da se bavi kad poraste.',
  },
  coloringSports: {
    age: '4–7 godina',
    text: 'Lopte, bicikl, patike i pobjednički pehar. Pogodna uz temu sporta i zdravog života ili kao nagrada poslije časa fizičkog vaspitanja.',
  },
  coloringMusic: {
    age: '4–7 godina',
    text: 'Gitara, klavir, bubnjevi, violina i note. Dobra uz muzičku kulturu: dijete imenuje instrumente i pokazuje kako se na kojem svira.',
  },
  coloringBakery: {
    age: '3–7 godina',
    text: 'Torta sa svjećicama, krofne, mafini i sladoled. Vesela bojanka za rođendane i proslave u vrtiću ili odjeljenju.',
  },
  coloringLatin: {
    age: '5–7 godina, 1. razred',
    text: 'Šuplja velika i mala slova abecede sa sličicom uz svako slovo i linijom za pisanje. Dijete kroz bojenje upoznaje oblik slova, povezuje ga sa glasom i zatim ga samo napiše.',
  },
  coloringCyrillic: {
    age: '5–7 godina, 1. razred',
    text: 'Šuplja slova azbuke sa sličicom i riječju uz svako slovo i linijom za pisanje. Dijete upoznaje oblik ćiriličnog slova, čita prvu riječ i povezuje slovo sa glasom.',
  },
  colorByNumber: {
    age: '4–7 godina',
    text: 'Bojanka po brojevima od 1 do 6: dijete čita broj u polju i bira boju iz legende. Istovremeno vježba prepoznavanje brojeva, pažnju i preciznost bojenja.',
  },
  coloringScenes: {
    age: '3–7 godina',
    text: 'Velika bojanka sa više scena: priroda sa životinjama, svemir i more. Za duže, mirne aktivnosti, kad dijete želi da boji više od jedne slike.',
  },
  coloringHandWash: {
    age: '3–6 godina',
    text: 'Četiri sličice koje pokazuju kako se pravilno peru ruke. Bojanka uči higijensku naviku: dijete boji, a zatim redom prepričava korake.',
  },
  coloringTraffic: {
    age: '4–7 godina',
    text: 'Semafor i pješački prelaz: dijete boji svjetla pravim redom i uči kada se prelazi ulica. Korisna pred polazak u školu, kad dijete počinje samo da ide ulicom.',
  },
  coloringFood: {
    age: '4–7 godina',
    text: 'Zdrava hrana na tanjiru i slatkiši koji se jedu samo ponekad. Bojanka otvara razgovor o tome šta jedemo svaki dan, a šta rijetko, bez zabrana i griže savjesti.',
  },
  coloringRecycle: {
    age: '4–8 godina',
    text: 'Razvrstavanje otpada: papir, plastika i staklo idu u kante svoje boje. Dijete spaja predmete sa kantama i boji ih, pa uči prve korake u čuvanju prirode.',
  },
  coloringFeelings: {
    age: '3–7 godina',
    text: 'Lica sa različitim osjećanjima i prazan krug u koji dijete crta kako se danas osjeća. Pomaže djetetu da imenuje osjećanja, a odraslom da otvori razgovor.',
  },
  colors: {
    age: '3–5 godina',
    text: 'Bojenje oblika prema legendi: dijete prepoznaje krug, kvadrat, trougao i druge oblike, imenuje boje i povezuje jedno sa drugim. Papirna verzija igre sa ovog sajta.',
  },

  // Spoznaja vremena
  timeSequence: {
    age: '4–7 godina',
    text: 'Nizovi sličica koje dijete slaže po redu: šta je bilo prvo, a šta poslije. Razvija osjećaj za vrijeme i za uzrok i posljedicu, a priprema i za prepričavanje.',
  },
  timeDayParts: {
    age: '4–7 godina',
    text: 'Jutro, podne, veče i noć kroz svakodnevne aktivnosti. Dijete povezuje dio dana sa onim što tada radi i uči riječi kojima govorimo o vremenu.',
  },
  timeRoutine: {
    age: '5–7 godina',
    text: 'Dnevna rutina od buđenja do spavanja, sa satom pored svake sličice. Dijete crta kazaljke i povezuje vrijeme na satu sa onim što radi u toku dana.',
  },
  timeClock: {
    age: '1–2. razred',
    text: 'Uvod u čitanje sata na dvije strane: upisivanje vremena i crtanje kazaljki. Jasno razlikuje kratku kazaljku za sate i dugu za minute, pa je dobar za prvi susret sa satom.',
  },
  timeClockRead: {
    age: '1–2. razred',
    text: 'Vježba čitanja sata za pune sate i pola sata: upisivanje vremena i spajanje sata sa tačnim zapisom. Pogodna poslije uvodne lekcije o satu.',
  },
  timeClockMath: {
    age: '2–3. razred',
    text: 'Računanje sa vremenom: koliko će biti sati poslije nekoliko sati i koliko je bilo prije. Povezuje sat sa sabiranjem i oduzimanjem i priprema za tekstualne zadatke o vremenu.',
  },
  timeWeek: {
    age: '5–7 godina, 1. razred',
    text: 'Dani u sedmici na gusjenici: dijete boji školske dane i vikend, čita dane redom i dopunjava juče, danas i sutra.',
  },
  timeDaysOrder: {
    age: '1–2. razred',
    text: 'Dani u sedmici i mjeseci u godini redom: dan prije i poslije, mjeseci koji nedostaju i povezivanje mjeseci sa godišnjim dobima.',
  },
  timeCalendar: {
    age: '1–3. razred',
    text: 'Čitanje kalendara jednog mjeseca: dijete pronalazi datume i dane u sedmici i broji dane. Vježba snalaženja u kalendaru kakav viđa kod kuće i u školi.',
  },
  timeYear: {
    age: '1–2. razred',
    text: 'Mjeseci i godišnja doba na jednom listu: dijete boji mjesece po godišnjim dobima, pronalazi mjesec svog rođendana i dopunjava rečenicu.',
  },

  // Pisanje
  latin: {
    age: '5–7 godina, 1. razred',
    text: 'Vježba pisanja slova latinice u linijama: uzorak, siva slova za precrtavanje i prazno mjesto za samostalno pisanje. Pomaže da dijete od početka usvoji pravilan oblik i veličinu slova.',
  },
  cyrillic: {
    age: '5–7 godina, 1. razred',
    text: 'Vježba pisanja slova ćirilice u linijama: uzorak, siva slova za precrtavanje i prazno mjesto za samostalno pisanje. Pomaže da dijete od početka usvoji pravilan oblik i veličinu slova.',
  },
  initialLetterLatin: {
    age: '5–7 godina, 1. razred',
    text: 'Glasovna analiza na latinici: dijete imenuje sličicu, čuje prvi glas i bira tačno slovo. Važna vještina prije čitanja, jer povezuje glas sa slovom.',
  },
  initialLetterCyrillic: {
    age: '5–7 godina, 1. razred',
    text: 'Glasovna analiza na ćirilici: dijete imenuje sličicu, čuje prvi glas i bira tačno slovo. Važna vještina prije čitanja, jer povezuje glas sa slovom.',
  },
  letterMatchLatin: {
    age: '1. razred',
    text: 'Povezivanje velikih i malih slova latinice: spajanje linijom i dopisivanje malog slova pored velikog. Za utvrđivanje kad su sva slova obrađena.',
  },
  letterMatchCyrillic: {
    age: '1–2. razred',
    text: 'Povezivanje velikih i malih slova ćirilice: spajanje linijom i dopisivanje malog slova pored velikog. Za utvrđivanje kad su sva slova obrađena.',
  },
  syllablesLatin: {
    age: '1. razred',
    text: 'Čitanje tablice slogova i spajanje slogova u riječi na latinici. Most između poznavanja slova i tečnog čitanja, za djecu koja znaju slova, ali ih još sporo spajaju.',
  },
  syllablesCyrillic: {
    age: '1. razred',
    text: 'Čitanje tablice slogova i spajanje slogova u riječi na ćirilici. Most između poznavanja slova i tečnog čitanja, za djecu koja znaju slova, ali ih još sporo spajaju.',
  },
  scriptBridge: {
    age: '2–3. razred',
    text: 'Latinica i ćirilica jedna pored druge: spajanje istih slova i prepisivanje riječi drugim pismom. Za učenike koji uče drugo pismo i za utvrđivanje oba pisma.',
  },
  numbers: {
    age: '5–7 godina, 1. razred',
    text: 'Pisanje cifara u redovima: uzorak, siva cifra za precrtavanje i prazno mjesto za samostalno pisanje. Dijete uči pravilan smjer poteza, odozgo nadolje.',
  },

  // Grafomotorika
  trace: {
    age: '3–5 godina',
    text: 'Praćenje staza od lakših ka težim. Jača kontrolu olovke i koordinaciju oka i ruke, osnovu za kasnije pisanje. Papirna verzija igre „Prati stazu“ sa ovog sajta.',
  },
  lines: {
    age: '3–5 godina',
    text: 'Ravne linije od jedne sličice do druge. Prva grafomotorička vježba za dijete koje tek uči da drži olovku.',
  },
  waves: {
    age: '4–6 godina',
    text: 'Talasi, petlje i šare u redovima. Vježba ritmičan, povezan pokret ruke, isti onaj koji kasnije treba za pisana slova.',
  },
  outlines: {
    age: '3–5 godina',
    text: 'Precrtavanje osnovnih oblika: krug, kvadrat, trougao, srce i zvijezda. Dijete vježba potez i usput uči nazive oblika.',
  },
  dots: {
    age: '4–6 godina',
    text: 'Spajanje tačaka po brojevima dok ne nastane slika. Vježba redoslijed brojeva, pažnju i precizan potez, a na kraju slijedi bojenje.',
  },
  maze: {
    age: '4–6 godina',
    text: 'Lavirinti u kojima dijete olovkom vodi zeku do šargarepe. Razvija planiranje, pažnju i kontrolu olovke bez prelaska preko linija.',
  },

  // Matematika
  count: {
    age: '3–5 godina',
    text: 'Brojanje sličica i zaokruživanje tačnog broja. Povezuje količinu sa brojem, što je prvi korak ka računanju.',
  },
  quantity: {
    age: '4–6 godina',
    text: 'Obrnut zadatak od brojanja: dijete vidi broj i crta toliko predmeta. Tako se provjerava da li zaista razumije šta broj znači.',
  },
  adding: {
    age: '5–7 godina, 1. razred',
    text: 'Sabiranje uz sličice: dijete broji obje grupe i upisuje koliko ih ima ukupno. Prvo sabiranje, prije računa sa samim brojevima.',
  },
  subtraction: {
    age: '5–7 godina, 1. razred',
    text: 'Oduzimanje uz precrtane sličice: koliko je bilo, koliko je oduzeto i koliko je ostalo. Uvod u oduzimanje kroz sliku.',
  },
  compareNumbers: {
    age: '1. razred',
    text: 'Poređenje grupa i brojeva znakovima <, > i =. Dijete prvo broji, a zatim upisuje znak, pa znak dobija jasno značenje.',
  },
  missingNumbers: {
    age: '1. razred',
    text: 'Brojevni niz do 10, prethodnik i sljedbenik. Utvrđuje redoslijed brojeva i pojmove „za jedan manji“ i „za jedan veći“.',
  },
  sizes: {
    age: '3–5 godina',
    text: 'Slaganje predmeta od najmanjeg do najvećeg. Vježba poređenje po veličini i ređanje, pojmove koji prethode mjerenju.',
  },
  mathNumberLine: {
    age: '1–2. razred',
    text: 'Brojevna prava sa skokovima naprijed i nazad. Dijete vidi sabiranje i oduzimanje kao kretanje po pravoj, što pomaže kod računa preko desetice.',
  },
  mathHouses: {
    age: '1. razred',
    text: 'Kućice brojeva: rastavljanje broja na dva sabirka. Ključna vježba za brz račun do 10 i do 20.',
  },
  mathAdd10: {
    age: '1. razred',
    text: '96 zadataka sabiranja do 10 na dvije strane. Za utvrđivanje i uvježbavanje, dok dijete račun do 10 ne zna napamet.',
  },
  mathSub10: {
    age: '1. razred',
    text: '96 zadataka oduzimanja do 10 na dvije strane. Za utvrđivanje i uvježbavanje, dok dijete račun do 10 ne zna napamet.',
  },
  mathMissing: {
    age: '1. razred',
    text: 'Jednakosti sa brojem koji nedostaje, do 10 i do 20. Razvija razumijevanje veze između sabiranja i oduzimanja.',
  },
  mathAddSub20: {
    age: '1. razred',
    text: 'Sabiranje i oduzimanje do 20: prva strana bez prelaza, druga sa prelazom preko desetice. Pogodno za utvrđivanje i domaći rad.',
  },
  mathPyramids: {
    age: '1–2. razred',
    text: 'Brojevne piramide do 20 i do 100. Zanimljiviji oblik vježbanja sabiranja i oduzimanja, jer dijete samo otkriva koji račun treba.',
  },
  mathAddSub100: {
    age: '2. razred',
    text: 'Sabiranje i oduzimanje do 100, bez prelaza i sa prelazom preko desetice. Za utvrđivanje gradiva drugog razreda.',
  },
  mathMultiply: {
    age: '2–3. razred',
    text: '96 zadataka iz tablice množenja: prva strana do 5, druga do 10. Za utvrđivanje i uvježbavanje tablice.',
  },
  mathDivide: {
    age: '2–3. razred',
    text: '96 zadataka dijeljenja: prva strana brojevima do 5, druga do 10. Najbolje ide uz tablicu množenja.',
  },
  mathWordProblems: {
    age: '2–3. razred',
    text: 'Tekstualni zadaci iz svakodnevnog života: hrana, sat, dani, saobraćaj i priroda. Dijete čita zadatak, piše račun i odgovor cijelom rečenicom.',
  },

  // Logika
  pattern: {
    age: '3–6 godina',
    text: 'Nastavljanje niza sličica koje se ponavljaju. Razvija uočavanje pravila, osnovu matematičkog mišljenja.',
  },
  odd: {
    age: '3–6 godina',
    text: 'Pronalaženje sličice koja ne pripada grupi. Vježba razvrstavanje i govor, jer dijete objašnjava zašto je izabralo baš tu sličicu.',
  },
  match: {
    age: '3–5 godina',
    text: 'Spajanje predmeta koji idu zajedno. Razvija logičko povezivanje i bogati rječnik.',
  },
  shapes: {
    age: '3–5 godina',
    text: 'Spajanje sličica sa njihovim sjenkama. Vježba opažanje oblika, važno kasnije za prepoznavanje slova.',
  },
  differences: {
    age: '4–7 godina',
    text: 'Pet razlika između dvije slike. Vježba pažnju i pažljivo posmatranje detalja.',
  },
  symmetry: {
    age: '5–8 godina',
    text: 'Docrtavanje druge polovine slike na mreži, kao u ogledalu. Uvod u simetriju i orijentaciju u prostoru.',
  },
  copy: {
    age: '5–8 godina',
    text: 'Precrtavanje crteža na mrežu, kvadratić po kvadratić. Razvija prostornu orijentaciju, pažnju i preciznost.',
  },
};
