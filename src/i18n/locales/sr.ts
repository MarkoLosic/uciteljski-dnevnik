import type { Category } from '../../types/post';
import type { GameId, GameText, Shape, Skill, Thing, ToyColor, WorksheetGroup, WorksheetId } from '../../games/ids';

// KORISNIK: tekstovi o tebi i tekst interfejsa na srpskom. Ostali jezici su u susednim fajlovima
// i moraju imati iste ključeve (tip `Dictionary` se izvodi iz ovog fajla).
export const sr = {
  site: {
    tagline: 'Praktična podrška učiteljima u svakodnevnom radu u školi',
    description:
      'Sajt posvećen učiteljima, razrednoj nastavi i radu u školi — 1.436 dnevnih priprema od 1. do 5. razreda, diferencirana nastava za tri nivoa učenika, radni listovi za štampu, edukativne igre i stručni tekstovi.',
  },
  author: {
    role: 'QA inženjer i profesor razredne nastave',
    location: 'Banja Luka, BiH',
    intro:
      'Po struci sam učitelj, i onih osam meseci provedenih sa prvacima naučilo me je dvema najvažnijim veštinama: beskrajnom strpljenju i oku za detalje. U učionici punoj šestogodišnjaka morate primetiti svaku sitnicu — ko je tiho zapeo, gde je zadatak nejasan i kako naizgled mali propust može stvoriti pometnju. Taj isti mentalni sklop danas unosim u IT kao QA inženjer. Testiranje softvera za mene nije samo kliktanje po aplikaciji, već upravo to: pažljivo posmatranje detalja koje drugi previde i strpljivo građenje sistema koji radi bez greške. Zato i tehnologiju u obrazovanju gledam iz oba ugla — gde stvarno rasterećuje, a gde zbog lošeg dizajna samo smeta.',
    background: [
      {
        title: 'U IT-u',
        text: 'Više od šest godina radim kao QA inženjer: testiram veb i mobilne aplikacije, automatizujem testove i proveravam AI modele. Posao me naučio da tehnologiji ne verujem na reč — prvo proverim da li zaista radi.',
      },
      {
        title: 'U učionici',
        text: 'Završio sam razrednu nastavu na Univerzitetu u Banjoj Luci i osam meseci radio sa prvacima u OŠ Grahovo. Tamo sam video koliko nastava zavisi od jasnoće, strpljenja i topline — sa tehnologijom ili bez nje.',
      },
    ],
  },
  topics: [
    { title: 'Život u učionici', text: 'Iskustva iz prvog razreda i ideje za razrednu nastavu.' },
    {
      title: 'Tehnologija u nastavi',
      text: 'Alati i aplikacije za nastavu, provereni okom testera — šta radi, a šta ne.',
    },
    { title: 'Veštačka inteligencija', text: 'Kako AI može da pomogne nastavnicima, i gde treba biti oprezan.' },
  ],
  nav: {
    label: 'Glavna navigacija',
    home: 'Početna',
    pripreme: 'Pripreme',
    worksheets: 'Bojanke i listovi',
    worksheetsShort: 'Bojanke',
    games: 'Edukativne igre',
    gamesShort: 'Igre', // na telefonu, gde nema mesta za pun naziv
    blog: 'Blog',
    about: 'O meni',
    world: 'Škole u svetu',
  },
  pripremePromo: {
    eyebrow: 'Za učitelje i nastavnike · 1–5. razred (RS i FBiH)',
    title: 'Biblioteka dnevnih priprema za čas (1.436 priprema)',
    desc: 'Kompletna baza metodički razrađenih dnevnih priprema za celu školsku godinu od 1. do 5. razreda osnovne škole, usklađena sa planovima u Republici Srpskoj (RPZ) i Federaciji BiH (ZJNPP). Kopiranje za e-Dnevnik jednim klikom, A4 štampa, radni listići i Word (.docx) preuzimanje.',
    ctaAll: 'Otvori sve pripreme (1.436)',
    gradeLabel: (r: number) => `${r}. razred`,
  },
  language: {
    label: 'Jezik',
    change: 'Promeni jezik',
  },
  theme: {
    toLight: 'Uključi svetlu temu',
    toDark: 'Uključi tamnu temu',
  },
  footer: {
    label: 'Linkovi u podnožju',
    rights: 'Sva prava zadržana.',
    author: 'Autor',
    contact: 'Kontakt',
    rss: 'RSS',
  },
  categories: {
    'AI alati u nastavi': 'AI alati u nastavi',
    'Etika i AI': 'Etika i AI',
    'Iskustva iz prakse': 'Iskustva iz prakse',
    Vijesti: 'Vijesti',
    Resursi: 'Resursi',
  } satisfies Record<Category, string>,
  home: {
    greeting: 'Zdravo, ja sam',
    readBlog: 'Stručni blog i praksa',
    moreAboutMe: 'Više o autoru',
    chips: ['Razredna nastava', 'QA inženjer', 'AI u nastavi'],
    whoEyebrow: '01 — Ko sam ja',
    whoTitle: 'Između učionice i IT-a',
    whoImageAlt:
      'Ilustracija: s jedne strane učitelj se igra s decom u učionici, a s druge isti čovek radi za računarom kao QA inženjer — slova i brojevi iz učionice prelaze u kod i testove.',
    topicsEyebrow: '03 — Teme i oblasti rada',
    topicsTitle: 'O čemu pišemo i šta istražujemo',
    blogEyebrow: '04 — Iz učiteljske prakse',
    blogTitle: 'Najnoviji članci za učitelje',
    heroBadge: 'Portal za učitelje i razrednu nastavu · 1–5. razred osnovne škole',
    heroTitleBefore: 'Mesto koje učiteljima olakšava ',
    heroTitleHighlight: 'svakodnevni rad u školi',
    heroLead:
      'Svaki školski dan traži dobru pripremu, strpljenje i prilagođavanje svakom detetu u učionici. Zato je „Iz učionice“ osmišljen kao praktična baza alata za učitelje: od 1.436 gotovih dnevnih priprema za čas, diferenciranih očekivanja za tri nivoa postignuća učenika i radnih listova za A4 štampu, do edukativnih igara i saveta iz prakse koji štede sate administracije.',
    ctaPripreme: 'Biblioteka priprema (1.436)',
    ctaWorksheets: 'Bojanke i radni listovi (55)',
    stats: [
      {
        value: '1.436',
        label: 'Dnevnih priprema (1–5. razred)',
        detail: 'Pokrivena cela školska godina za svih 6 nastavnih predmeta (RPZ RS i ZJNPP FBiH).',
      },
      {
        value: '3 nivoa',
        label: 'Diferencirana očekivanja',
        detail: 'Jednim klikom kreirajte ishode i zadatke za osnovni, srednji i napredni nivo učenika.',
      },
      {
        value: '55 + 10',
        label: 'A4 bojanke, listovi i igre',
        detail: '55 ilustrovanih bojanki i radnih listova za A4 štampu, uz 10 edukativnih igara bez reklama.',
      },
      {
        value: '1 klik',
        label: 'e-Dnevnik, Word i štampa',
        detail: 'Trenutno kopiranje za e-Dnevnik, preuzimanje u .docx formatu i preslovljavanje LAT ↔ ĆIR.',
      },
    ],
    pillarsEyebrow: '01 — Podrška u svakodnevnom radu',
    pillarsTitle: 'Sve što je učitelju potrebno za čas — na jednom mestu',
    pillarsIntro:
      'Umesto lutanja po desetinama dokumenata i tabelama, ovde su objedinjeni materijali koji prate stvarni ritam školske godine i realne potrebe u učionici.',
    pillars: [
      {
        badge: 'Nastavni plan i program',
        title: 'Dnevne pripreme za celu školsku godinu (1–5. razred)',
        text: 'Kompletno razrađene nastavne jedinice za Maternji jezik, Matematiku, Prirodu i društvo / Moju okolinu, Likovnu kulturu, Muzičku kulturu i Fizičko / Tjelesni odgoj — sa ciljem, ishodima i uvodnim, glavnim i završnim delom časa.',
        linkText: 'Pretraži pripreme →',
        href: '/pripreme/index.html',
      },
      {
        badge: 'Individualizacija i inkluzija',
        title: 'Priprema za 3 nivoa postignuća učenika',
        text: 'U svakom odeljenju sede učenici različitog tempa rada. Na svakoj pripremi jednim klikom generišete posebna očekivanja, prilagođene zadatke i način praćenja za osnovni (I), srednji (II) i napredni (III) nivo.',
        linkText: 'Otvori diferencirane pripreme →',
        href: '/pripreme/index.html',
      },
      {
        badge: 'Manje papirologije',
        title: 'Brz unos u e-Dnevnik, Word (.docx) i A4 štampa',
        text: 'Svaku pripremu možete jednim klikom kopirati u formatu spremnom za e-Dnevnik, preuzeti kao uredan Word dokument sa sačuvanim imenom vaše škole i učitelja, ili prebaciti između latinice i ćirilice.',
        linkText: 'Isprobaj alate za izvoz →',
        href: '/pripreme/index.html',
      },
      {
        badge: 'Materijali za klupe',
        title: 'Automatski A4 radni listići za učenike',
        text: 'Uz svaku pripremu možete odmah otvoriti i odštampati radni listić za učenike sa četiri strukturisana zadatka i skalom samoprocene, kao i poseban diferencirani listić podeljen na tri nivoa težine.',
        linkText: 'Pogledaj radne listiće →',
        href: '/pripreme/index.html',
      },
      {
        badge: 'Prvi koraci u školi',
        title: 'Bojanke za štampu, slova, ćirilica, latinica i igre',
        text: 'Za predškolce i učenike nižih razreda pripremili smo 55 tematskih bojanki i radnih listova za A4 štampu (učionica, 4 doba, životinje, bageri i građevina, morski svet, bajka, kosmos, slova na ćirilici i latinici), uz 10 edukativnih igara.',
        linkText: 'Otvori bojanke i radne listove →',
        href: '/radni-listovi',
      },
      {
        badge: 'Stručno usavršavanje',
        title: 'Iskustva iz učionice, AI alati i škole u svetu',
        text: 'Praktični članci o organizaciji časa, bezbednoj upotrebi veštačke inteligencije u pisanju priprema, zaštiti podataka učenika i poređenju našeg školstva sa Finskom, Estonijom, Japanom i drugim zemljama.',
        linkText: 'Čitaj članke na blogu →',
        href: '/blog',
      },
    ],
    gradesEyebrow: '02 — Baza po razredima',
    gradesTitle: 'Izaberite razred i odmah otvorite pripreme za čas',
    gradesIntro:
      'Svaki razred obuhvata kompletan godišnji fond časova za oba nastavna plana i programa u Bosni i Hercegovini (RPZ Republike Srpske i ZJNPP Federacije BiH).',
    gradesList: [
      {
        grade: 1,
        count: '284 pripreme',
        title: '1. razred osnovne škole',
        desc: 'Adaptacija prvaka, predbukvarski period, obrada slova, brojevi do 20, snalaženje u okolini i razvoj početnih radnih navika.',
      },
      {
        grade: 2,
        count: '296 priprema',
        title: '2. razred osnovne škole',
        desc: 'Drugo pismo (latinica/ćirilica), sabiranje i oduzimanje do 100, množenje i deljenje, godišnja doba, saobraćaj i zavičaj.',
      },
      {
        grade: 3,
        count: '288 priprema',
        title: '3. razred osnovne škole',
        desc: 'Vrste reči i pismeno izražavanje, brojevi do 1.000, geometrijski oblici i merenje, prošlost zavičaja, živa i neživa priroda.',
      },
      {
        grade: 4,
        count: '284 pripreme',
        title: '4. razred osnovne škole',
        desc: 'Služba reči u rečenici, višeocifreni brojevi, površina i zapremina, geografska karta, prirodne i društvene odlike domovine.',
      },
      {
        grade: 5,
        count: '284 pripreme',
        title: '5. razred osnovne škole',
        desc: 'Književni rodovi i vrste, glagolski oblici, razlomci i geometrija, društvene zajednice, energija i priprema za predmetnu nastavu.',
      },
    ],
    workflowEyebrow: '03 — Kako funkcioniše u praksi',
    workflowTitle: 'Od izbora lekcije do spremnog časa u 3 koraka',
    workflowSteps: [
      {
        step: '01',
        title: 'Pronađite nastavnu jedinicu',
        text: 'Filtrirajte bazu po razredu (1–5), nastavnom planu (RPZ RS ili ZJNPP FBiH), predmetu ili tipu časa, ili jednostavno ukucajte pojam u pretragu.',
      },
      {
        step: '02',
        title: 'Uključite 3 nivoa učenika i pismo',
        text: 'Kliknite na „Kreiraj pripremu za 3 nivoa učenika“ da dobijete diferencirana očekivanja i zadatke, izaberite latinicu ili ćirilicu i upišite naziv škole.',
      },
      {
        step: '03',
        title: 'Kopirajte za e-Dnevnik ili odštampajte',
        text: 'Jednim klikom kopirajte pripremu u e-Dnevnik, preuzmite kompletan Word (.docx) fajl ili odštampajte A4 radni listić za učenike.',
      },
    ],
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Svi članci',
    description:
      'Svi članci o nastavi u nižim razredima, iskustvima iz učionice i pametnoj upotrebi tehnologije i veštačke inteligencije.',
    allPosts: 'Svi članci',
    readMore: 'Pročitaj više',
    published: 'Objavljeno',
    backToBlog: 'Nazad na blog',
    emptyTitle: 'Još nema članaka',
    emptyMessage: 'Prvi članci su u pripremi. Navratite uskoro!',
    notFoundTitle: 'Članak nije pronađen',
    notFoundMessage: 'Članak koji tražite ne postoji ili je premešten.',
    readingTime: (n: number) => `${n} min čitanja`,
    filterLabel: 'Filtriraj po kategoriji',
    filterAll: 'Sve',
    related: 'Još sa bloga',
    toc: 'Sadržaj',
    headingLink: (title: string) => `Link na sekciju „${title}“`,
    copyCode: 'Kopiraj',
    codeCopied: 'Kopirano',
    copyFailed: 'Kopiranje nije uspelo',
    share: 'Podeli članak',
    shareNative: 'Podeli',
    shareVia: (app: string) => `Podeli preko aplikacije ${app}`,
    copyLink: 'Kopiraj link',
    linkCopied: 'Link je kopiran',
  },
  about: {
    title: 'O meni',
    description:
      'Ko piše blog Iz učionice: učitelj po struci, QA inženjer po zanimanju, iz Banje Luke. Iskustvo, teme i kontakt.',
    blogEyebrow: 'O blogu',
    blogTitle: 'Šta ćete ovde naći',
    blogText: (siteName: string) =>
      `${siteName} je mesto gde spajam ono što sam naučio u učionici sa onim čime se svaki dan bavim u IT-u.`,
    contactEyebrow: 'Kontakt',
    contactTitle: 'Javite se',
    contactText: 'Pitanja, predlozi, ideja za temu ili samo pozdrav — rado odgovaram.',
    location: 'Lokacija',
  },
  games: {
    eyebrow: 'Igre · predškolski uzrast',
    title: 'Igre za male ruke',
    intro:
      'Deset kratkih igara za decu od 3 do 6 godina. Svaka vežba po nešto: preciznost prsta, koordinaciju oka i ruke, pažnju, brojanje ili logičko zaključivanje. Najbolje rade na tabletu ili telefonu, ali mogu i mišem.',
    age: 'Uzrast 3–6 godina · bez reklama i praćenja',
    play: 'Igraj',
    back: 'Sve igre',
    again: 'Igraj ponovo',
    next: 'Sledeća',
    win: 'Bravo!',
    winText: 'Svaka čast — sve je rešeno!',
    tipsEyebrow: 'Za roditelje i vaspitače',
    tipsTitle: 'Kako da igra bude korisna',
    tips: [
      {
        title: 'Igrajte zajedno',
        text: 'Sedite pored deteta, pročitajte mu kako se igra i pohvalite trud, ne samo rezultat. Razgovor o bojama, oblicima i brojevima vredi više od same igre.',
      },
      {
        title: 'Kratko i često',
        text: 'Za predškolce je dovoljno 10–15 minuta ekrana odjednom. Bolje je odigrati dve-tri igre i stati dok je dete još raspoloženo.',
      },
      {
        title: 'Ekran ne menja ruke',
        text: 'Ove igre su dopuna, a ne zamena za plastelin, makaze, kocke i bojice. Prava fina motorika se razvija u stvarnom svetu.',
      },
    ],
    skills: {
      fine: 'Fina motorika',
      eyeHand: 'Oko i ruka',
      logic: 'Logika',
      memory: 'Pamćenje',
      counting: 'Brojanje',
    } satisfies Record<Skill, string>,
    colorNames: {
      red: 'crvena',
      blue: 'plava',
      yellow: 'žuta',
      green: 'zelena',
      purple: 'ljubičasta',
      orange: 'narandžasta',
    } satisfies Record<ToyColor, string>,
    shapeNames: {
      circle: 'krug',
      square: 'kvadrat',
      triangle: 'trougao',
      star: 'zvezda',
      heart: 'srce',
    } satisfies Record<Shape, string>,
    things: {
      cat: 'mačka',
      dog: 'pas',
      fish: 'riba',
      bird: 'ptica',
      rabbit: 'zec',
      turtle: 'kornjača',
      snail: 'puž',
      apple: 'jabuka',
      star: 'zvezda',
      flower: 'cvet',
      sun: 'sunce',
    } satisfies Record<Thing, string>,
    ui: {
      round: (n: number, total: number) => `Runda ${n} od ${total}`,
      progress: (n: number, total: number) => `${n} od ${total}`,
      popBalloon: (color: string) => `Balon, boja: ${color}`,
      block: (color: string) => `Kocka, boja: ${color}`,
      basket: (color: string) => `Korpa, boja: ${color}`,
      slot: (shape: string) => `Mesto za oblik: ${shape}`,
      piece: (shape: string) => `Oblik: ${shape}`,
      dot: (n: number) => `Tačka ${n}`,
      traceArea: 'Staza od bube do cveta',
      maze: 'Lavirint: pomeri zeca do šargarepe strelicama ili prstom',
      hiddenCard: 'Zatvorena kartica',
      sequence: 'Niz oblika',
      missing: 'Šta dolazi sledeće?',
      howMany: (thing: string) => `Koliko ima? (${thing})`,
      sizeItem: (thing: string, n: number, total: number) => `${thing}, veličina ${n} od ${total}`,
      shelf: 'Polica, od najmanjeg do najvećeg',
    },
    worksheet: {
      link: 'Radni list za štampu',
      eyebrow: 'Radni list',
      print: 'Štampaj',
      backToGames: 'Nazad na igre',
      backToWorksheets: 'Nazad na bojanke i listove',
      name: 'Ime',
      date: 'Datum',
      page: (n: number, total: number) => `Strana ${n}/${total}`,
      tip: 'Savet: štampajte na A4 papiru. Radi i crno-belo. Bojice i debela olovka su bolje od tanke hemijske.',
      sectionEyebrow: 'Za štampu · A4 format',
      sectionTitle: 'Bojanke slova i slika, ćirilica, latinica i radni listovi',
      sectionText: 'Kompletna zbirka od 91 radnih listova, diferenciranih testova i tematskih bojanki spremnih za štampu na A4 formatu: testovi znanja za tri nivoa postignuća učenika (osnovni, srednji i napredni), tematske bojanke, slova azbuke i abecede, grafomotorika i matematika.',
      alphabet: ['A a', 'B b', 'C c', 'Č č', 'Ć ć', 'D d', 'Dž dž', 'Đ đ', 'E e', 'F f', 'G g', 'H h', 'I i', 'J j', 'K k', 'L l', 'Lj lj', 'M m', 'N n', 'Nj nj', 'O o', 'P p', 'R r', 'S s', 'Š š', 'T t', 'U u', 'V v', 'Z z', 'Ž ž'],
      groups: {
        tests: 'Diferencirani testovi znanja (3 nivoa: osnovni, srednji i napredni)',
        coloring: 'Bojanke (tematske slike, slova i brojevi)',
        writing: 'Čitanje i pisanje — ćirilica i latinica',
        motor: 'Motorika i predpisanje',
        math: 'Brojevi i računanje',
        logic: 'Logika i pažnja',
        time: 'Spoznaja vremena — sat, delovi dana, dani, meseci i godišnja doba',
      } satisfies Record<WorksheetGroup, string>,
      labels: {
        dayParts: {
          morning: 'Jutro',
          noon: 'Podne',
          evening: 'Veče',
          night: 'Noć',
        },
        routine: {
          wakeUp: 'Budim se',
          breakfast: 'Doručak',
          school: 'Škola',
          lunch: 'Ručak',
          play: 'Igra',
          sleep: 'Spavanje',
        },
        weekdays: ['ponedeljak', 'utorak', 'sreda', 'četvrtak', 'petak', 'subota', 'nedelja'],
        yesterday: 'Juče:',
        today: 'Danas:',
        tomorrow: 'Sutra:',
        months: ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'],
        seasons: {
          winter: 'zima',
          spring: 'proleće',
          summer: 'leto',
          autumn: 'jesen',
        },
        year: 'Godina',
        birthday: 'Moj rođendan je u mesecu:',
        handWash: {
          wet: 'Pokvasi ruke',
          soap: 'Nasapunjaj',
          rub: 'Trljaj ruke',
          dry: 'Isperi i obriši',
        },
        traffic: {
          stop: 'STANI!',
          wait: 'PAZI!',
          go: 'KRENI!',
        },
        food: {
          everyday: 'Svaki dan',
          sometimes: 'Ponekad',
        },
        bins: {
          paper: 'Papir',
          plastic: 'Plastika',
          glass: 'Staklo',
        },
        feelings: {
          happy: 'Sreća',
          sad: 'Tuga',
          angry: 'Ljutnja',
          scared: 'Strah',
          surprised: 'Iznenađenje',
          calm: 'Mir',
        },
        feelToday: 'Danas se osećam:',
        answer: 'Odgovor:',
        calculation: 'Račun:',
        daysOrder: {
          neighbours: 'Upiši dan koji je pre i dan koji je posle.',
          missingMonth: 'Upiši mesec koji nedostaje.',
          monthSeason: 'Spoji mesec sa godišnjim dobom.',
        },
        calendarTasks: [
          'Koji je dan u sedmici 1. u mesecu?',
          'Koji je dan 15. u mesecu?',
          'Zaokruži sve nedelje. Koliko ih ima u ovom mesecu?',
          'Oboji žutom bojom sve subote i nedelje.',
          'Koliko dana ima ovaj mesec?',
          'Danas je 10. Koji će datum biti tačno za jednu sedmicu?',
          'Koji je datum bio dva dana pre 20.?',
        ],
        wordProblems: [
          'Mia je za užinu pojela 3 jabuke, a Luka 4 banane. Koliko su voćki pojeli zajedno?',
          'Na tanjiru je bilo 12 šargarepa. Deca su pojela 5. Koliko je šargarepa ostalo na tanjiru?',
          'Sedmica ima 7 dana. Koliko dana imaju 3 sedmice?',
          'Ana trenira 2 puta svake sedmice. Koliko treninga ima za 4 sedmice?',
          'Nastava počinje u 8 sati i traje 4 sata. U koliko sati se nastava završava?',
          'Godina ima 12 meseci i 4 godišnja doba. Koliko meseci traje jedno godišnje doba?',
          'Razred je skupio 18 plastičnih flaša i 9 staklenih tegli. Koliko su ambalaže skupili ukupno?',
          'Na semaforu je čekalo 15 automobila. Kad se upalilo zeleno svetlo, prošlo je 9 automobila. Koliko ih je još čekalo?',
          'Ruke peremo najmanje 20 sekundi. Koliko sekundi peremo ruke ako ih tokom dana operemo 3 puta?',
          'Luka je zaspao u 9 sati uveče, a probudio se u 7 sati ujutru. Koliko sati je spavao?',
        ],
      },
      sheets: {
        testGrade1: {
          title: 'Diferencirani test za 1. razred (3 nivoa znanja)',
          text: 'Provera za učenike prvog razreda: I nivo (brojevi do 10, prepoznavanje slova i glasova), II nivo (sabiranje i oduzimanje do 20, spajanje slogova i reči), III nivo (tekstualni zadatak i sastavljanje rečenice).',
        },
        testGrade2: {
          title: 'Diferencirani test za 2. razred (3 nivoa znanja)',
          text: 'Provera za učenike drugog razreda: I nivo (račun do 100 bez prelaza, imenice i rečenice), II nivo (sabiranje i oduzimanje sa prelazom, vrste reči i godišnja doba), III nivo (zadaci u dva koraka i kratak opis).',
        },
        testGrade3: {
          title: 'Diferencirani test za 3. razred (3 nivoa znanja)',
          text: 'Provera za učenike trećeg razreda: I nivo (tablica množenja i deljenja, imenice i glagoli), II nivo (izrazi sa zagradama, pridevi, orijentacija u prostoru), III nivo (tekstualni zadaci sa nepoznatim činiocem i plan naselja).',
        },
        testGrade4: {
          title: 'Diferencirani test za 4. razred (3 nivoa znanja)',
          text: 'Provera za učenike četvrtog razreda: I nivo (višecifreni brojevi, pravopis i rečenice), II nivo (pisano množenje i deljenje, subjekat i predikat, organi i čovek), III nivo (površina geometrijskih tela, analiza teksta i ekosistemi).',
        },
        testGrade5: {
          title: 'Diferencirani test za 5. razred (3 nivoa znanja)',
          text: 'Provera za učenike petog razreda: I nivo (osnovni razlomci, vrste reči i padeži), II nivo (računanje sa razlomcima, služba reči, geografska karta), III nivo (uglovi i geometrijski zadaci, stilske figure i interpretacija).',
        },
        testMathOperations: {
          title: 'Diferencirani test: Sabiranje i oduzimanje (3 nivoa znanja)',
          text: 'Diferencirana kontrolna vežba iz matematike: I nivo (osnovni račun do 20), II nivo (računanje do 100 sa zagradama i nepoznatim brojem), III nivo (složeni tekstualni zadatak i magični kvadrat).',
        },
        testLanguageGrammar: {
          title: 'Diferencirani test: Srpski jezik i gramatika (3 nivoa znanja)',
          text: 'Diferencirana provera iz maternjeg jezika: I nivo (vrste rečenica i veliko slovo), II nivo (imenice, glagoli, pridevi, rod i broj), III nivo (ispravka grešaka i kratak opis sa pridevima).',
        },
        testNatureSociety: {
          title: 'Diferencirani test: Priroda i društvo — Svet oko nas (3 nivoa znanja)',
          text: 'Diferencirani test o prirodi: I nivo (delovi biljke i staništa životinja), II nivo (korist domaćih životinja i godišnja doba), III nivo (lanac ishrane i zaštita čiste vode i šuma).',
        },
        testReadingComprehension: {
          title: 'Diferencirani test: Čitanje sa razumevanjem (3 nivoa znanja)',
          text: 'Diferencirani test razumevanja pročitanog teksta: I nivo (glavni likovi i mesto radnje), II nivo (hronološki redosled događaja i uzroci), III nivo (glavna poruka basne i lični stav).',
        },
        testMultiplicationDivision: {
          title: 'Diferencirani test: Množenje i deljenje (3 nivoa znanja)',
          text: 'Diferencirana provera operacija: I nivo (osnovna tablica do 5), II nivo (tablica do 10, redosled operacija i poređenje), III nivo (jednačine sa nepoznatim činiocem i tekstualni zadatak).',
        },
        coloringClassroom: {
          title: 'Bojanka: Moja učionica i škola',
          text: 'Oboji veselu učionicu, nasmejanu učiteljicu, đake u klupama, školsku tablu i globus svojim najlepšim bojama.',
        },
        coloringSeasons: {
          title: 'Bojanka: Četiri godišnja doba',
          text: 'Četiri slike prirode na jednom listu: proleće sa cvetićima, toplo leto sa suncem, jesenje lišće sa vevericom i snežna zima sa Sneškom Belićem.',
        },
        coloringSpring: {
          title: 'Bojanka: Proleće u cvatu i pčelice',
          text: 'Oboji buđenje prirode, rascvetalo drveće i prolećno cveće, veselu pčelicu, leptira i toplo nasmejano prolećno sunce.',
        },
        coloringSummer: {
          title: 'Bojanka: Leto na plaži i dvorac od peska',
          text: 'Oboji letnje radosti pored mora, veliki dvorac od peska sa kulama, suncobran, šarenu loptu i veselog morskog račića.',
        },
        coloringAutumn: {
          title: 'Bojanka: Jesenja šuma i šumske životinje',
          text: 'Oboji jesenje čarolije u šumi: vrednog ježića sa jabukom na leđima, vevericu sa žirom, mudru sovu i opalo šareno lišće.',
        },
        coloringWinter: {
          title: 'Bojanka: Zimske radosti i sankanje',
          text: 'Oboji zimske igre na snegu, dečje sanke koje jure niz brdo, toplu kapu i šal, pahulje i veselog psa na snegu.',
        },
        coloringAnimals: {
          title: 'Bojanka: Domaće životinje na farmi',
          text: 'Oboji veselu kravicu, mekanu ovčicu, štene, petla na ogradi i seosko imanje.',
        },
        coloringSafari: {
          title: 'Bojanka: Safari i divlje životinje',
          text: 'Upoznaj divlji svet afričke savane: oboji hrabrog lavića sa grivom, visoku žirafu, slonče sa surlom i majmunčića na drvetu.',
        },
        coloringPets: {
          title: 'Bojanka: Kućni ljubimci',
          text: 'Oboji najdraže kućne ljubimce: razigranu macu sa klupkom vune, vernog psa sa koskom u travi i zlatnu ribicu u akvarijumu.',
        },
        coloringUnderwater: {
          title: 'Bojanka: Podvodni svet i morske dubine',
          text: 'Zaroni u morsko plavetnilo i oboji dobroćudnog delfina, morsku kornjaču, hobotnicu, morske zvezde i školjke.',
        },
        coloringSubmarine: {
          title: 'Bojanka: Podmornica i tajanstveno blago',
          text: 'Zaroni žutom podmornicom na samo dno okeana, istraži staru škrinju sa blagom i oboji jata svetlećih ribica.',
        },
        coloringVehicles: {
          title: 'Bojanka: Saobraćaj i prevozna sredstva',
          text: 'Oboji parnu lokomotivu na šinama, avion visoko na nebu, jedrenjak na talasima i auto na drumu.',
        },
        coloringConstruction: {
          title: 'Bojanka: Građevinske mašine i radovi',
          text: 'Oboji velika vozila na gradilištu: snažni bager koji kopa zemlju, kamion kiper pun peska i visoku građevinsku dizalicu.',
        },
        coloringDino: {
          title: 'Bojanka: Dinosaurusi i praistorija',
          text: 'Oboji dobroćudnog dinosaurusa dugog vrata, triceratopsa i slatku bebu dinosaurusa koja tek izviruje iz jajeta.',
        },
        coloringCastle: {
          title: 'Bojanka: Bajkoviti dvorac i zmaj',
          text: 'Oboji čarobni dvorac sa kulama i zastavicama, veselog zmaja sa cvetićem i dugu na nebu.',
        },
        coloringSpace: {
          title: 'Bojanka: Kosmos, raketa i astronaut',
          text: 'Oboji malog astronauta koji lebdi u svemiru, svemirsku raketu, planete sa prstenom i prijateljskog vanzemaljca.',
        },
        coloringProfessions: {
          title: 'Bojanka: Zanimanja i profesije',
          text: 'Ko želiš da budeš kad porasteš? Oboji hrabrog vatrogasca sa šmrkom, doktora sa stetoskopom i veselog kuvara sa kapom.',
        },
        coloringSports: {
          title: 'Bojanka: Sport i rekreacija za decu',
          text: 'Oboji sportski duh i igru: fudbalsku i košarkašku loptu, dečji bicikl, patike za trčanje i zlatni pobednički pehar.',
        },
        coloringMusic: {
          title: 'Bojanka: Muzički orkestar i instrumenti',
          text: 'Zasviraj u bojama: oboji akustičnu gitaru, dirke klavira, bubnjeve, violinu i raspevane note koje lebde u vazduhu.',
        },
        coloringBakery: {
          title: 'Bojanka: Slatka pekara i kolačići',
          text: 'Oboji najslađe đakonije iz pekare: rođendansku tortu sa svećicama, krofne sa posipom, mafine i ukusne sladolede.',
        },
        coloringLatin: {
          title: 'Bojanka slova — latinica (A–Ž)',
          text: 'Oboji velika i mala šuplja slova abecede i sličicu uz svako slovo, a zatim na liniji ispod pređi preko sivih slova i napiši ih samostalno.',
        },
        coloringCyrillic: {
          title: 'Бојанка слова — ћирилица (А–Ш)',
          text: 'Обоји велика и мала шупља слова азбуке и сличицу уз свако слово, прочитај ријеч, а затим на линији испод вјежбај писање слова.',
        },
        colorByNumber: {
          title: 'Bojanka po brojevima (1–6)',
          text: 'Pogledaj na vrhu koji broj označava koju boju, pa oboji svako polje na slici odgovarajućom bojom.',
        },
        coloringScenes: {
          title: 'Velika bojanka — priroda, životinje i svemir',
          text: 'Izaberi omiljene drvene bojice i oboji veselu prirodu sa životinjama, svemirsku raketu sa planetama i morski svet.',
        },
        coloringHandWash: {
          title: 'Bojanka: Perem ruke',
          text: 'Pre jela i posle igre peremo ruke. Oboji sve četiri slike i ispričaj redom kako se pravilno peru ruke.',
        },
        coloringTraffic: {
          title: 'Bojanka: Semafor i pešački prelaz',
          text: 'Oboji svetla na semaforu pravim bojama: gore crveno, u sredini žuto, dole zeleno. Ulicu prelazimo samo na pešačkom prelazu, kad je zeleno.',
        },
        coloringFood: {
          title: 'Bojanka: Zdrava hrana',
          text: 'Oboji zdravu hranu na velikom tanjiru — ona nam daje snagu svaki dan. U donjem polju su slatkiši koje jedemo samo ponekad: zaokruži onaj koji najviše voliš.',
        },
        coloringRecycle: {
          title: 'Bojanka: Čuvam prirodu — razvrstaj otpad',
          text: 'Linijom spoji svaku stvar sa kantom u koju je bacamo. Oboji kantu za papir plavo, za plastiku žuto, a za staklo zeleno.',
        },
        coloringFeelings: {
          title: 'Bojanka: Kako se osećam?',
          text: 'Pogledaj lica i pokaži kako izgleda svako osećanje. Oboji ih, pa u velikom krugu na dnu nacrtaj kako se ti danas osećaš.',
        },
        timeSequence: {
          title: 'Šta je bilo prvo? Redosled događaja',
          text: 'Pogledaj sličice u svakom redu. U kvadratić ispod upiši 1 za ono što se desilo prvo, pa 2, 3 i 4. Zatim oboji sličice.',
        },
        timeDayParts: {
          title: 'Delovi dana: jutro, podne, veče i noć',
          text: 'Oboji šta radiš ujutru, u podne, uveče i noću. Pokaži prstom gde je sunce ujutru, a gde u podne. Šta radiš kad izađe mesec?',
        },
        timeRoutine: {
          title: 'Moj dan i sat',
          text: 'Oboji sličice redom kako ide tvoj dan. Na satu pored svake sličice nacrtaj kazaljke — u koliko sati se budiš, ručaš i ideš na spavanje?',
        },
        timeClock: {
          title: 'Koliko je sati? Učimo sat',
          text: 'Na prvoj strani oboji veliki sat, pa ispod svakog malog sata napiši koliko je sati. Na drugoj strani nacrtaj kazaljke: kratku za sate, dugu za minute.',
        },
        timeWeek: {
          title: 'Dani u sedmici — gusenica',
          text: 'Oboji gusenicu: dane kad ideš u školu jednom bojom, a vikend drugom. Pročitaj dane redom, pored svakog nacrtaj ili napiši šta tada radiš, pa dopuni juče, danas i sutra.',
        },
        timeYear: {
          title: 'Godina: meseci i godišnja doba',
          text: 'Oboji zimske mesece plavo, prolećne zeleno, letnje žuto, a jesenje narandžasto. Pronađi mesec svog rođendana, nacrtaj u njemu srce i dopuni rečenicu.',
        },
        timeClockRead: {
          title: 'Čitam sat: puni sati i pola sata',
          text: 'Na prvoj strani pogledaj kazaljke i upiši koliko je sati (npr. 6:30). Na drugoj strani linijom spoji svaki sat sa tačnim vremenom.',
        },
        timeClockMath: {
          title: 'Računam sa satom: koliko će biti sati?',
          text: 'Pogledaj koliko je sati na prvom satu i koliko sati treba dodati ili oduzeti. Na drugom satu nacrtaj kazaljke i upiši novo vreme.',
        },
        timeDaysOrder: {
          title: 'Dani i meseci redom',
          text: 'Upiši dan pre i posle zadatog dana, dopuni mesece koji nedostaju i linijom spoji svaki mesec sa godišnjim dobom kome pripada.',
        },
        timeCalendar: {
          title: 'Čitam kalendar',
          text: 'Pogledaj kalendar jednog meseca i odgovori na pitanja ispod njega. U prvom redu kalendara su skraćeni nazivi dana.',
        },
        mathNumberLine: {
          title: 'Brojevna prava: skokovi',
          text: 'Upiši brojeve koji nedostaju na brojevnoj pravoj. Luk pokazuje skok napred (+) ili nazad (−) — izračunaj gde skok završava.',
        },
        mathHouses: {
          title: 'Kućice brojeva — rastavljanje broja',
          text: 'Broj na krovu je zbir dva broja na svakom spratu. Upiši broj koji nedostaje da zajedno daju broj sa krova.',
        },
        mathAdd10: {
          title: 'Sabiranje do 10 (96 zadataka)',
          text: 'Saberi brojeve i upiši zbir u kvadratić. Dve strane po 48 zadataka — radi polako i proveri na prstima ili sličicama.',
        },
        mathSub10: {
          title: 'Oduzimanje do 10 (96 zadataka)',
          text: 'Oduzmi i upiši razliku u kvadratić. Dve strane po 48 zadataka.',
        },
        mathMissing: {
          title: 'Koji broj nedostaje? (do 10 i do 20)',
          text: 'Upiši broj koji nedostaje da jednakost bude tačna. Prva strana do 10, druga do 20.',
        },
        mathAddSub20: {
          title: 'Sabiranje i oduzimanje do 20',
          text: 'Prva strana: bez prelaza preko desetice. Druga strana: sa prelazom preko desetice (npr. 8 + 5, 14 − 6).',
        },
        mathPyramids: {
          title: 'Brojevne piramide',
          text: 'Svaka cigla je zbir dve cigle ispod nje. Popuni prazne cigle. Prva strana do 20, druga do 100.',
        },
        mathAddSub100: {
          title: 'Sabiranje i oduzimanje do 100',
          text: 'Prva strana: bez prelaza preko desetice. Druga strana: sa prelazom (npr. 37 + 25, 62 − 18). Računaj prvo desetice, pa jedinice.',
        },
        mathMultiply: {
          title: 'Tablica množenja (96 zadataka)',
          text: 'Prva strana: množenje brojevima od 1 do 5. Druga strana: od 6 do 10. Upiši proizvod u kvadratić.',
        },
        mathDivide: {
          title: 'Deljenje (96 zadataka)',
          text: 'Prva strana: deljenje brojevima od 1 do 5. Druga strana: od 6 do 10. Pomozi se tablicom množenja.',
        },
        mathWordProblems: {
          title: 'Tekstualni zadaci: hrana, vreme, saobraćaj i priroda',
          text: 'Pažljivo pročitaj zadatak, napiši račun i odgovor celom rečenicom. Zadaci su vezani za lekcije o zdravoj hrani, satu, danima, saobraćaju i čuvanju prirode.',
        },
        trace: {
          title: 'Prati stazu',
          text: 'Olovkom ili bojicom prati isprekidanu liniju od bube do cveta. Ne žuri i pokušaj da ostaneš na sivoj stazi.',
        },
        dots: {
          title: 'Spoji tačke',
          text: 'Spoji tačke redom, od 1 do poslednjeg broja, pa se vrati na 1. Zatim oboji sliku.',
        },
        maze: {
          title: 'Zeka u lavirintu',
          text: 'Nacrtaj put kojim zeka stiže do šargarepe. Kroz ogradu ne može.',
        },
        numbers: {
          title: 'Pišemo brojeve',
          text: 'Prvo pogledaj crni broj, pa olovkom pređi preko svakog sivog. Kreni odozgo. Na praznom delu reda napiši broj bez pomoći.',
        },
        latin: {
          title: 'Pišemo slova — latinica',
          text: 'Pređi olovkom preko sivih slova, pa na kraju reda napiši slovo samostalno. Velika slova dodiruju gornju liniju, mala isprekidanu srednju.',
        },
        cyrillic: {
          title: 'Pišemo slova — ćirilica',
          text: 'Pređi olovkom preko sivih slova, pa na kraju reda napiši slovo samostalno. Velika slova dodiruju gornju liniju, mala isprekidanu srednju.',
        },
        initialLetterLatin: {
          title: 'Početno slovo — latinica',
          text: 'Imenuj svaku sličicu, zaokruži tačno početno slovo među tri ponuđena i napiši ga na crti ispred ostatka reči.',
        },
        initialLetterCyrillic: {
          title: 'Почетно слово — ћирилица',
          text: 'Именуј сваку сличицу, заокружи тачно почетно слово међу три понуђена и напиши га на црти испред остатка ријечи.',
        },
        letterMatchLatin: {
          title: 'Spoji velika i mala slova — latinica',
          text: 'U gornjem delu spoji linijom svako veliko slovo sa odgovarajućim malim slovom, a u kućicama ispod dopiši malo slovo pored velikog.',
        },
        letterMatchCyrillic: {
          title: 'Споји велика и мала слова — ћирилица',
          text: 'У горњем дијелу споји линијом свако велико ћирилично слово са његовим малим паром, а у кућицама испод допиши мало слово поред великог.',
        },
        syllablesLatin: {
          title: 'Čitamo i spajamo slogove — latinica',
          text: 'Prvo naglas pročitaj tablicu slogova na vrhu. Zatim spoji slogove u reči, izgovori ih i napiši celu reč na liniji.',
        },
        syllablesCyrillic: {
          title: 'Читамо и спајамо слогове — ћирилица',
          text: 'Прво наглас прочитај таблицу слогова на врху. Затим споји слогове у ријечи, изговори их и напиши цијелу ријеч на линији.',
        },
        scriptBridge: {
          title: 'Most između pisama — latinica i ćirilica',
          text: 'Spoji parove istih slova u latinici i ćirilici, a u donjem delu prepiši zadate reči drugim pismom.',
        },
        lines: {
          title: 'Ravne linije',
          text: 'Povuci liniju od jedne sličice do druge: kucu do koske, zeku do šargarepe, kišu od oblaka do cveta i raketu do meseca. Prati isprekidanu liniju.',
        },
        waves: {
          title: 'Talasi i petlje',
          text: 'Na početku svakog reda je crni uzorak. Pređi olovkom preko isprekidane šare do kraja reda, bez podizanja olovke ako možeš.',
        },
        outlines: {
          title: 'Precrtaj oblike',
          text: 'Prvi oblik u redu je uzorak. Pređi olovkom preko isprekidanih oblika, pa ih imenuj: krug, kvadrat, trougao, srce, zvezda.',
        },
        colors: {
          title: 'Oboji oblike',
          text: 'Pogledaj na vrhu koje je boje koji oblik, pa svaki oblik na listu oboji tom bojom.',
        },
        count: {
          title: 'Prebroj i zaokruži',
          text: 'Prebroj sličice u svakom redu i zaokruži tačan broj.',
        },
        quantity: {
          title: 'Nacrtaj koliko piše',
          text: 'U svakom okviru nacrtaj onoliko kružića (ili jabuka, ili sunaca) koliko pokazuje broj.',
        },
        adding: {
          title: 'Saberi sličice',
          text: 'Prebroj sličice levo i desno od znaka plus, pa u kvadratić upiši koliko ih ima zajedno.',
        },
        subtraction: {
          title: 'Oduzimanje sa sličicama',
          text: 'Pogledaj koliko ukupno ima sličica u redu, a koliko ih je precrtano. Prebroj koliko je ostalo i upiši broj u kvadratić.',
        },
        compareNumbers: {
          title: 'Uporedi grupe i brojeve (<, >, =)',
          text: 'Prebroj sličice na levoj i desnoj strani, pa u kružić u sredini upiši znak < (manje), > (veće) ili = (jednako).',
        },
        missingNumbers: {
          title: 'Brojevni niz, prethodnik i sledbenik',
          text: 'U gornjem delu upiši brojeve koji nedostaju u vagonima od 1 do 10, a dole upiši prethodnik (za 1 manji) i sledbenik (za 1 veći broj).',
        },
        sizes: {
          title: 'Od najmanjeg do najvećeg',
          text: 'U svakom redu upiši ispod sličica brojeve od 1 do 4: 1 ispod najmanje, 4 ispod najveće.',
        },
        pattern: {
          title: 'Nastavi niz',
          text: 'Pogledaj kako se sličice ponavljaju, pa u prazne kvadratiće nacrtaj šta dolazi dalje.',
        },
        odd: {
          title: 'Šta ne pripada?',
          text: 'U svakom redu jedna sličica nije kao ostale. Pronađi je i zaokruži, pa reci zašto ne pripada.',
        },
        match: {
          title: 'Šta ide zajedno?',
          text: 'Spoji linijom sličice koje idu zajedno: kucu i kosku, kišu i kišobran… Linija ide od tačke do tačke.',
        },
        shapes: {
          title: 'Pronađi senku',
          text: 'Spoji svaku sličicu levo sa njenom senkom desno.',
        },
        differences: {
          title: 'Pronađi 5 razlika',
          text: 'Uporedi gornju i donju sliku. Na donjoj zaokruži 5 stvari koje su drugačije.',
        },
        symmetry: {
          title: 'Dovrši drugu polovinu',
          text: 'Nacrtana je samo leva polovina slike. Nacrtaj desnu kao u ogledalu: isprekidana linija je ogledalo. Broji kvadratiće.',
        },
        copy: {
          title: 'Precrtaj sliku',
          text: 'Precrtaj crtež sa leve mreže na praznu mrežu desno. Broji kvadratiće i kreni od istog ugla.',
        },
      } satisfies Record<WorksheetId, { title: string; text: string }>,
    },
    list: {
      balloons: {
        title: 'Baloni',
        short: 'Baloni lete ka nebu — dodirni ih prstom pre nego što odlete.',
        howTo: 'Dodirni balon da pukne. Kada pukne deset balona, igra je gotova. Nema žurbe — novi baloni stalno dolaze.',
      },
      colors: {
        title: 'Razvrstaj boje',
        short: 'Prevuci svaku kocku u korpu iste boje.',
        howTo: 'Uhvati kocku prstom i prevuci je u korpu iste boje. Može i ovako: dodirni kocku, pa dodirni korpu.',
      },
      shapes: {
        title: 'Svaki oblik na svoje mesto',
        short: 'Krug, kvadrat, trougao… svaki oblik ima svoju senku.',
        howTo: 'Prevuci svaki oblik na isprekidanu senku koja mu odgovara. Imenujte oblike naglas dok igrate.',
      },
      trace: {
        title: 'Prati stazu',
        short: 'Vodi bubu prstom po stazi do cveta, polako i pažljivo.',
        howTo: 'Stavi prst na bubu i polako je vodi po stazi do cveta. Ako prst skrene, vrati se na stazu i nastavi.',
      },
      dots: {
        title: 'Spoji tačke',
        short: 'Dodiruj brojeve redom i otkrij skrivenu sliku.',
        howTo: 'Dodirni broj 1, pa 2, pa 3… Linija spaja tačke, a na kraju se pojavi slika. Brojite zajedno naglas.',
      },
      maze: {
        title: 'Zeka u lavirintu',
        short: 'Pomozi zeki da kroz lavirint stigne do šargarepe.',
        howTo: 'Vuci zeku prstom po stazi do šargarepe — kroz živu ogradu ne može. Na računaru rade i strelice.',
      },
      memory: {
        title: 'Pronađi par',
        short: 'Okreći kartice i pamti gde se krije koja sličica.',
        howTo: 'Dodirni dve kartice. Ako su iste, ostaju otvorene; ako nisu, okreću se nazad. Pronađi sve parove.',
      },
      pattern: {
        title: 'Šta dolazi sledeće?',
        short: 'Crveno, plavo, crveno… pogodi šta nastavlja niz.',
        howTo: 'Pogledaj niz i izaberi oblik koji ide na mesto upitnika. Pokušajte prvo naglas da „pročitate“ niz.',
      },
      count: {
        title: 'Prebroj',
        short: 'Koliko je sličica na tabli? Prebroj i izaberi broj.',
        howTo: 'Prebroj sličice — pokaži prstom svaku redom. Zatim dodirni tačan broj.',
      },
      sizes: {
        title: 'Od malog do velikog',
        short: 'Poređaj sličice na policu od najmanje do najveće.',
        howTo: 'Dodiruj sličice redom: prvo najmanju, pa sve veću i veću. Svaka odlazi na policu.',
      },
      coloring: {
        title: 'Bojanka slova i slika (latinica i ćirilica)',
        short: 'Izaberi boju i oboji velika i mala slova, jabuku, sunce, kućicu i raketu.',
        howTo: 'Izaberi pismo (latinica ili ćirilica) na vrhu, klikni na željenu boju u paleti dole, a zatim dodiruj delove slova i crteža da ih obojiš.',
      },
      letters: {
        title: 'Na koje slovo počinje? (latinica i ćirilica)',
        short: 'Pogledaj sličicu i pogodi kojim slovom počinje reč na latinici ili ćirilici.',
        howTo: 'Imenuj ono što vidiš na slici, izaberi pismo na vrhu (latinica ili ćirilica) i dodirni tačno početno slovo među tri ponuđena.',
      },
    } satisfies Record<GameId, GameText>,
  },
  world: {
    eyebrow: 'Škole u svetu',
    title: 'Razredna nastava u svetu',
    description:
      'Kako druge zemlje uče najmlađe đake: polazak u školu, učitelji, ocenjivanje i testiranje — uz poređenje sa Bosnom i Hercegovinom.',
    intro:
      'Kako druge zemlje uče decu u prvim razredima osnovne škole — i šta bismo od toga mogli da primenimo kod nas. Bosna i Hercegovina je referentna tačka.',
    note: 'Podaci su iz zvaničnih izvora (Eurydice, OECD, ministarstva), navedenih uz svaku zemlju. Sistemi se menjaju, pa uz svaku zemlju piše kada su podaci provereni.',
    reference: 'Referentna tačka',
    countriesTitle: 'Zemlje',
    compareEyebrow: 'Poređenje',
    compareTitle: 'Jedno pored drugog',
    compareCaption: 'Poređenje razredne nastave po zemljama',
    compareScroll: 'Tabela se pomera vodoravno.',
    facts: {
      schoolStart: 'Polazak u školu',
      compulsory: 'Obavezno obrazovanje',
      tracking: 'Prvo usmeravanje',
      primaryTeacher: 'Ko predaje u nižim razredima',
      teacherEducation: 'Obrazovanje učitelja',
      grading: 'Ocenjivanje',
      testing: 'Nacionalno testiranje',
    },
    keyIdea: 'Ključna ideja',
    pisa: 'PISA (15-godišnjaci)',
    timss: 'TIMSS (4. razred)',
    pirls: 'PIRLS (4. razred, čitanje)',
    math: 'Matematika',
    reading: 'Čitanje',
    science: 'Prirodne nauke',
    resultsEyebrow: 'Rezultati',
    resultsTitle: 'Međunarodna testiranja',
    resultsIntro:
      'PISA meri znanje 15-godišnjaka, a TIMSS i PIRLS učenika 4. razreda — zato su za razrednu nastavu TIMSS i PIRLS najbliže poređenje.',
    resultsCaption: 'Rezultati na međunarodnim testiranjima po zemljama',
    oecdAverage: 'Prosek OECD-a',
    scaleNote: 'TIMSS i PIRLS nemaju prosek OECD-a; centralna tačka njihove skale je 500.',
    notTaken: 'bez učešća',
    olderCycle: (year: number) => `podatak iz ${year}.`,
    sources: 'Izvori',
    checked: 'Podaci provereni',
    readMore: 'Detaljnije',
    allCountries: 'Sve zemlje',
    otherCountries: 'Ostale zemlje',
    notFoundTitle: 'Zemlja nije pronađena',
    notFoundMessage: 'Ova zemlja još nije opisana ili nije prevedena na ovaj jezik.',
    emptyTitle: 'Uskoro i na ovom jeziku',
    emptyMessage: 'Poređenje školskih sistema za sada postoji samo na srpskom.',
    emptyAction: 'Otvori na srpskom',
  },
  notFound: {
    eyebrow: 'Greška',
    title: 'Stranica nije pronađena.',
    backHome: 'Nazad na početnu',
  },
  error: {
    title: 'Nešto je pošlo naopako',
    message: 'Stranica se nije učitala kako treba. Osvežite je — ako je sajt upravo ažuriran, to obično reši problem.',
    reload: 'Osveži stranicu',
  },
};

export type Dictionary = typeof sr;
