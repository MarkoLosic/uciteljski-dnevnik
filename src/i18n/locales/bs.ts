import type { Dictionary } from './sr';

export const bs: Dictionary = {
  site: {
    tagline: 'O učionici i tehnologiji u nastavi',
    description:
      'Lični blog o obrazovanju, razrednoj nastavi i tehnologiji u učionici — iz ugla učitelja koji danas radi kao QA inženjer.',
  },
  author: {
    role: 'QA inženjer i profesor razredne nastave',
    location: 'Banja Luka, BiH',
    intro:
      'Po struci sam učitelj, i onih osam mjeseci provedenih sa prvacima naučilo me je dvjema najvažnijim vještinama: beskrajnom strpljenju i oku za detalje. U učionici punoj šestogodišnjaka morate primijetiti svaku sitnicu — ko je tiho zapeo, gdje je zadatak nejasan i kako naizgled mali propust može stvoriti pometnju. Taj isti mentalni sklop danas unosim u IT kao QA inženjer. Testiranje softvera za mene nije samo klikanje po aplikaciji, već upravo to: pažljivo posmatranje detalja koje drugi previde i strpljivo građenje sistema koji radi bez greške. Zato i tehnologiju u obrazovanju gledam iz oba ugla — gdje stvarno rasterećuje, a gdje zbog lošeg dizajna samo smeta.',
    background: [
      {
        title: 'U IT-u',
        text: 'Više od šest godina radim kao QA inženjer: testiram web i mobilne aplikacije, automatizujem testove i provjeravam AI modele. Posao me naučio da tehnologiji ne vjerujem na riječ — prvo provjerim da li zaista radi.',
      },
      {
        title: 'U učionici',
        text: 'Završio sam razrednu nastavu na Univerzitetu u Banjoj Luci i osam mjeseci radio s prvačićima u OŠ Grahovo. Tamo sam vidio koliko nastava zavisi od jasnoće, strpljenja i topline — s tehnologijom ili bez nje.',
      },
    ],
  },
  topics: [
    { title: 'Život u učionici', text: 'Iskustva iz prvog razreda i ideje za razrednu nastavu.' },
    {
      title: 'Tehnologija u nastavi',
      text: 'Alati i aplikacije za nastavu, provjereni okom testera — šta radi, a šta ne.',
    },
    { title: 'Vještačka inteligencija', text: 'Kako AI može pomoći nastavnicima i gdje treba biti oprezan.' },
  ],
  nav: {
    label: 'Glavna navigacija',
    home: 'Početna',
    blog: 'Blog',
    games: 'Igre za djecu',
    gamesShort: 'Igre',
    about: 'O meni',
  },
  language: {
    label: 'Jezik',
    change: 'Promijeni jezik',
  },
  theme: {
    toLight: 'Uključi svijetlu temu',
    toDark: 'Uključi tamnu temu',
  },
  footer: {
    label: 'Linkovi u podnožju',
    rights: 'Sva prava zadržana.',
    author: 'Autor',
    contact: 'Kontakt',
  },
  categories: {
    'AI alati u nastavi': 'AI alati u nastavi',
    'Etika i AI': 'Etika i AI',
    'Iskustva iz prakse': 'Iskustva iz prakse',
    Vijesti: 'Vijesti',
    Resursi: 'Resursi',
  },
  home: {
    greeting: 'Zdravo, ja sam',
    readBlog: 'Pročitaj blog',
    moreAboutMe: 'Više o meni',
    chips: ['Razredna nastava', 'QA inženjer', 'AI u nastavi'],
    whoEyebrow: '01 — Ko sam ja',
    whoTitle: 'Između učionice i IT-a',
    whoImageAlt:
      'Ilustracija: s jedne strane učitelj se igra s djecom u učionici, a s druge isti čovjek radi za računarom kao QA inženjer — slova i brojevi iz učionice prelaze u kod i testove.',
    topicsEyebrow: '02 — Teme',
    topicsTitle: 'O čemu pišem',
    blogEyebrow: '03 — Blog',
    blogTitle: 'Najnovije s bloga',
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Svi članci',
    description:
      'Svi članci o nastavi u nižim razredima, iskustvima iz učionice i pametnoj upotrebi tehnologije i umjetne inteligencije.',
    allPosts: 'Svi članci',
    readMore: 'Pročitaj više',
    published: 'Objavljeno',
    backToBlog: 'Nazad na blog',
    emptyTitle: 'Još nema članaka',
    emptyMessage: 'Prvi članci su u pripremi. Navratite uskoro!',
    notFoundTitle: 'Članak nije pronađen',
    notFoundMessage: 'Članak koji tražite ne postoji ili je premješten.',
  },
  about: {
    title: 'O meni',
    description:
      'Ko piše blog Iz učionice: učitelj po struci, QA inženjer po zanimanju, iz Banje Luke. Iskustvo, teme i kontakt.',
    blogEyebrow: 'O blogu',
    blogTitle: 'Šta ćete ovdje naći',
    blogText: (siteName: string) =>
      `${siteName} je mjesto gdje spajam ono što sam naučio u učionici s onim čime se svaki dan bavim u IT-u.`,
    contactEyebrow: 'Kontakt',
    contactTitle: 'Javite se',
    contactText: 'Pitanja, prijedlozi, ideja za temu ili samo pozdrav — rado odgovaram.',
    location: 'Lokacija',
  },
  games: {
    eyebrow: 'Igre · predškolski uzrast',
    title: 'Igre za male ruke',
    intro:
      'Deset kratkih igara za djecu od 3 do 6 godina. Svaka vježba po nešto: preciznost prsta, koordinaciju oka i ruke, pažnju, brojanje ili logičko zaključivanje. Najbolje rade na tabletu ili telefonu, ali mogu i mišem.',
    age: 'Uzrast 3–6 godina · bez reklama i praćenja',
    play: 'Igraj',
    back: 'Sve igre',
    again: 'Igraj ponovo',
    next: 'Sljedeća',
    win: 'Bravo!',
    winText: 'Svaka čast — sve je riješeno!',
    tipsEyebrow: 'Za roditelje i odgajatelje',
    tipsTitle: 'Kako da igra bude korisna',
    tips: [
      {
        title: 'Igrajte zajedno',
        text: 'Sjednite pored djeteta, pročitajte mu kako se igra i pohvalite trud, ne samo rezultat. Razgovor o bojama, oblicima i brojevima vrijedi više od same igre.',
      },
      {
        title: 'Kratko i često',
        text: 'Za predškolce je dovoljno 10–15 minuta ekrana odjednom. Bolje je odigrati dvije-tri igre i stati dok je dijete još raspoloženo.',
      },
      {
        title: 'Ekran ne mijenja ruke',
        text: 'Ove igre su dopuna, a ne zamjena za plastelin, makaze, kocke i bojice. Prava fina motorika se razvija u stvarnom svijetu.',
      },
    ],
    skills: {
      fine: 'Fina motorika',
      eyeHand: 'Oko i ruka',
      logic: 'Logika',
      memory: 'Pamćenje',
      counting: 'Brojanje',
    },
    colorNames: {
      red: 'crvena',
      blue: 'plava',
      yellow: 'žuta',
      green: 'zelena',
      purple: 'ljubičasta',
      orange: 'narandžasta',
    },
    shapeNames: {
      circle: 'krug',
      square: 'kvadrat',
      triangle: 'trougao',
      star: 'zvijezda',
      heart: 'srce',
    },
    things: {
      cat: 'mačka',
      dog: 'pas',
      fish: 'riba',
      bird: 'ptica',
      rabbit: 'zec',
      turtle: 'kornjača',
      snail: 'puž',
      apple: 'jabuka',
      star: 'zvijezda',
      flower: 'cvijet',
      sun: 'sunce',
    },
    ui: {
      round: (n: number, total: number) => `Runda ${n} od ${total}`,
      progress: (n: number, total: number) => `${n} od ${total}`,
      popBalloon: (color: string) => `Balon, boja: ${color}`,
      block: (color: string) => `Kocka, boja: ${color}`,
      basket: (color: string) => `Korpa, boja: ${color}`,
      slot: (shape: string) => `Mjesto za oblik: ${shape}`,
      piece: (shape: string) => `Oblik: ${shape}`,
      dot: (n: number) => `Tačka ${n}`,
      traceArea: 'Staza od bube do cvijeta',
      maze: 'Lavirint: pomjeri zeca do mrkve strelicama ili prstom',
      hiddenCard: 'Zatvorena kartica',
      sequence: 'Niz oblika',
      missing: 'Šta dolazi sljedeće?',
      howMany: (thing: string) => `Koliko ih ima? (${thing})`,
      sizeItem: (thing: string, n: number, total: number) => `${thing}, veličina ${n} od ${total}`,
      shelf: 'Polica, od najmanjeg do najvećeg',
    },
    worksheet: {
      link: 'Radni list za štampu',
      eyebrow: 'Radni list',
      print: 'Štampaj',
      backToGames: 'Nazad na igre',
      name: 'Ime',
      date: 'Datum',
      page: (n: number, total: number) => `Strana ${n}/${total}`,
      tip: 'Savjet: štampajte na A4 papiru. Radi i crno-bijelo. Bojice i debela olovka su bolje od tanke hemijske.',
      sectionEyebrow: 'Za štampu',
      sectionTitle: 'Radni listovi',
      sectionText: 'Papirne verzije igara i listovi za pisanje brojeva i slova — za vježbu olovkom, bez ekrana. Otvorite list i odštampajte ga.',
      alphabet: ['A a', 'B b', 'C c', 'Č č', 'Ć ć', 'D d', 'Dž dž', 'Đ đ', 'E e', 'F f', 'G g', 'H h', 'I i', 'J j', 'K k', 'L l', 'Lj lj', 'M m', 'N n', 'Nj nj', 'O o', 'P p', 'R r', 'S s', 'Š š', 'T t', 'U u', 'V v', 'Z z', 'Ž ž'],
      sheets: {
        trace: {
          title: 'Prati stazu',
          text: 'Olovkom ili bojicom prati isprekidanu liniju od bube do cvijeta. Ne žuri i pokušaj ostati na sivoj stazi.',
        },
        dots: {
          title: 'Spoji tačke',
          text: 'Spoji tačke redom, od 1 do zadnjeg broja, pa se vrati na 1. Zatim oboji sliku.',
        },
        maze: {
          title: 'Zeko u lavirintu',
          text: 'Nacrtaj put kojim zeko stiže do mrkve. Kroz ogradu ne može.',
        },
        numbers: {
          title: 'Pišemo brojeve',
          text: 'Prvo pogledaj crni broj, pa olovkom pređi preko svakog sivog. Kreni odozgo. Na praznom dijelu reda napiši broj bez pomoći.',
        },
        latin: {
          title: 'Pišemo slova — latinica',
          text: 'Pređi olovkom preko sivih slova, pa na kraju reda napiši slovo samostalno. Velika slova dodiruju gornju liniju, mala isprekidanu srednju.',
        },
        cyrillic: {
          title: 'Pišemo slova — ćirilica',
          text: 'Pređi olovkom preko sivih slova, pa na kraju reda napiši slovo samostalno. Velika slova dodiruju gornju liniju, mala isprekidanu srednju.',
        },
      },
    },
    list: {
      balloons: {
        title: 'Baloni',
        short: 'Baloni lete prema nebu — dodirni ih prstom prije nego što odlete.',
        howTo: 'Dodirni balon da pukne. Kad pukne deset balona, igra je gotova. Nema žurbe — novi baloni stalno dolaze.',
      },
      colors: {
        title: 'Razvrstaj boje',
        short: 'Prevuci svaku kocku u korpu iste boje.',
        howTo: 'Uhvati kocku prstom i prevuci je u korpu iste boje. Može i ovako: dodirni kocku, pa dodirni korpu.',
      },
      shapes: {
        title: 'Svaki oblik na svoje mjesto',
        short: 'Krug, kvadrat, trougao… svaki oblik ima svoju sjenku.',
        howTo: 'Prevuci svaki oblik na isprekidanu sjenku koja mu odgovara. Imenujte oblike naglas dok igrate.',
      },
      trace: {
        title: 'Prati stazu',
        short: 'Vodi bubu prstom po stazi do cvijeta, polako i pažljivo.',
        howTo: 'Stavi prst na bubu i polako je vodi po stazi do cvijeta. Ako prst skrene, vrati se na stazu i nastavi.',
      },
      dots: {
        title: 'Spoji tačke',
        short: 'Dodiruj brojeve redom i otkrij skrivenu sliku.',
        howTo: 'Dodirni broj 1, pa 2, pa 3… Linija spaja tačke, a na kraju se pojavi slika. Brojite zajedno naglas.',
      },
      maze: {
        title: 'Zeko u lavirintu',
        short: 'Pomozi zeki da kroz lavirint stigne do mrkve.',
        howTo: 'Vuci zeku prstom po stazi do mrkve — kroz živu ogradu ne može. Na računaru rade i strelice.',
      },
      memory: {
        title: 'Pronađi par',
        short: 'Okreći kartice i pamti gdje se krije koja sličica.',
        howTo: 'Dodirni dvije kartice. Ako su iste, ostaju otvorene; ako nisu, okreću se nazad. Pronađi sve parove.',
      },
      pattern: {
        title: 'Šta dolazi sljedeće?',
        short: 'Crveno, plavo, crveno… pogodi šta nastavlja niz.',
        howTo: 'Pogledaj niz i izaberi oblik koji ide na mjesto upitnika. Pokušajte prvo naglas „pročitati“ niz.',
      },
      count: {
        title: 'Prebroj',
        short: 'Koliko je sličica na tabli? Prebroj i izaberi broj.',
        howTo: 'Prebroj sličice — pokaži prstom svaku redom. Zatim dodirni tačan broj.',
      },
      sizes: {
        title: 'Od malog do velikog',
        short: 'Poredaj sličice na policu od najmanje do najveće.',
        howTo: 'Dodiruj sličice redom: prvo najmanju, pa sve veću i veću. Svaka odlazi na policu.',
      },
    },
  },
  notFound: {
    eyebrow: 'Greška',
    title: 'Stranica nije pronađena.',
    backHome: 'Nazad na početnu',
  },
};
