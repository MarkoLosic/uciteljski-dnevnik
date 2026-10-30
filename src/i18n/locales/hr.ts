import type { Dictionary } from './sr';

export const hr: Dictionary = {
  site: {
    tagline: 'O učionici i tehnologiji u nastavi',
    description:
      'Osobni blog o obrazovanju, razrednoj nastavi i tehnologiji u učionici — iz kuta učitelja koji danas radi kao QA inženjer.',
  },
  author: {
    role: 'QA inženjer i učitelj razredne nastave',
    location: 'Banja Luka, BiH',
    intro:
      'Po struci sam učitelj, a onih osam mjeseci provedenih s prvašićima naučilo me dvjema najvažnijim vještinama: beskrajnom strpljenju i oku za detalje. U učionici punoj šestogodišnjaka morate primijetiti svaku sitnicu — tko je tiho zapeo, gdje je zadatak nejasan i kako naizgled mali propust može stvoriti pomutnju. Taj isti način razmišljanja danas unosim u IT kao QA inženjer. Testiranje softvera za mene nije samo klikanje po aplikaciji, nego upravo to: pažljivo promatranje detalja koje drugi previde i strpljivo građenje sustava koji radi bez pogreške. Zato i tehnologiju u obrazovanju gledam iz obaju kutova — gdje stvarno rasterećuje, a gdje zbog lošeg dizajna samo smeta.',
    background: [
      {
        title: 'U IT-u',
        text: 'Više od šest godina radim kao QA inženjer: testiram web i mobilne aplikacije, automatiziram testove i provjeravam AI modele. Posao me naučio da tehnologiji ne vjerujem na riječ — prvo provjerim radi li zaista.',
      },
      {
        title: 'U učionici',
        text: 'Završio sam razrednu nastavu na Sveučilištu u Banjoj Luci i osam mjeseci radio s prvašima u OŠ Grahovo. Ondje sam vidio koliko nastava ovisi o jasnoći, strpljenju i toplini — s tehnologijom ili bez nje.',
      },
    ],
  },
  topics: [
    { title: 'Život u učionici', text: 'Iskustva iz prvog razreda i ideje za razrednu nastavu.' },
    {
      title: 'Tehnologija u nastavi',
      text: 'Alati i aplikacije za nastavu, provjereni okom testera — što radi, a što ne.',
    },
    { title: 'Umjetna inteligencija', text: 'Kako AI može pomoći učiteljima i gdje treba biti oprezan.' },
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
    label: 'Poveznice u podnožju',
    rights: 'Sva prava pridržana.',
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
    greeting: 'Bok, ja sam',
    readBlog: 'Pročitaj blog',
    moreAboutMe: 'Više o meni',
    chips: ['Razredna nastava', 'QA inženjer', 'AI u nastavi'],
    whoEyebrow: '01 — Tko sam ja',
    whoTitle: 'Između učionice i IT-a',
    whoImageAlt:
      'Ilustracija: s jedne strane učitelj se igra s djecom u učionici, a s druge isti čovjek radi za računalom kao QA inženjer — slova i brojevi iz učionice prelaze u kod i testove.',
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
    backToBlog: 'Natrag na blog',
    emptyTitle: 'Još nema članaka',
    emptyMessage: 'Prvi članci su u pripremi. Navratite uskoro!',
    notFoundTitle: 'Članak nije pronađen',
    notFoundMessage: 'Članak koji tražite ne postoji ili je premješten.',
  },
  about: {
    title: 'O meni',
    description:
      'Tko piše blog Iz učionice: učitelj po struci, QA inženjer po zanimanju, iz Banje Luke. Iskustvo, teme i kontakt.',
    blogEyebrow: 'O blogu',
    blogTitle: 'Što ćete ovdje pronaći',
    blogText: (siteName: string) =>
      `${siteName} je mjesto gdje spajam ono što sam naučio u učionici s onim čime se svaki dan bavim u IT-u.`,
    contactEyebrow: 'Kontakt',
    contactTitle: 'Javite se',
    contactText: 'Pitanja, prijedlozi, ideja za temu ili samo pozdrav — rado odgovaram.',
    location: 'Lokacija',
  },
  games: {
    eyebrow: 'Igre · predškolska dob',
    title: 'Igre za male ruke',
    intro:
      'Deset kratkih igara za djecu od 3 do 6 godina. Svaka vježba ponešto: preciznost prsta, koordinaciju oka i ruke, pažnju, brojanje ili logičko zaključivanje. Najbolje rade na tabletu ili mobitelu, ali mogu i mišem.',
    age: 'Dob 3–6 godina · bez reklama i praćenja',
    play: 'Igraj',
    back: 'Sve igre',
    again: 'Igraj ponovno',
    next: 'Sljedeća',
    win: 'Bravo!',
    winText: 'Svaka čast — sve je riješeno!',
    tipsEyebrow: 'Za roditelje i odgojitelje',
    tipsTitle: 'Kako da igra bude korisna',
    tips: [
      {
        title: 'Igrajte zajedno',
        text: 'Sjednite pokraj djeteta, pročitajte mu kako se igra i pohvalite trud, ne samo rezultat. Razgovor o bojama, oblicima i brojevima vrijedi više od same igre.',
      },
      {
        title: 'Kratko i često',
        text: 'Za predškolce je dovoljno 10–15 minuta ekrana odjednom. Bolje je odigrati dvije-tri igre i stati dok je dijete još raspoloženo.',
      },
      {
        title: 'Ekran ne zamjenjuje ruke',
        text: 'Ove igre su dopuna, a ne zamjena za plastelin, škare, kocke i bojice. Prava fina motorika razvija se u stvarnom svijetu.',
      },
    ],
    skills: {
      fine: 'Fina motorika',
      eyeHand: 'Oko i ruka',
      logic: 'Logika',
      memory: 'Pamćenje',
      counting: 'Brojenje',
    },
    colorNames: {
      red: 'crvena',
      blue: 'plava',
      yellow: 'žuta',
      green: 'zelena',
      purple: 'ljubičasta',
      orange: 'narančasta',
    },
    shapeNames: {
      circle: 'krug',
      square: 'kvadrat',
      triangle: 'trokut',
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
      basket: (color: string) => `Košara, boja: ${color}`,
      slot: (shape: string) => `Mjesto za oblik: ${shape}`,
      piece: (shape: string) => `Oblik: ${shape}`,
      dot: (n: number) => `Točka ${n}`,
      traceArea: 'Staza od bube do cvijeta',
      maze: 'Labirint: pomakni zeca do mrkve strelicama ili prstom',
      hiddenCard: 'Zatvorena kartica',
      sequence: 'Niz oblika',
      missing: 'Što dolazi sljedeće?',
      howMany: (thing: string) => `Koliko ih je? (${thing})`,
      sizeItem: (thing: string, n: number, total: number) => `${thing}, veličina ${n} od ${total}`,
      shelf: 'Polica, od najmanjeg do najvećeg',
    },
    worksheet: {
      link: 'Radni list za ispis',
      eyebrow: 'Radni list',
      print: 'Ispiši',
      backToGames: 'Natrag na igre',
      name: 'Ime',
      date: 'Datum',
      page: (n: number, total: number) => `Stranica ${n}/${total}`,
      tip: 'Savjet: ispišite na A4 papiru. Radi i crno-bijelo. Bojice i debela olovka bolje su od tanke kemijske.',
      sectionEyebrow: 'Za ispis',
      sectionTitle: 'Radni listovi',
      sectionText: 'Papirnate verzije igara, vježbe za ruku prije pisanja, brojevi, slova i logički zadaci — za vježbu olovkom, bez ekrana. Otvorite list i ispišite ga.',
      alphabet: ['A a', 'B b', 'C c', 'Č č', 'Ć ć', 'D d', 'Dž dž', 'Đ đ', 'E e', 'F f', 'G g', 'H h', 'I i', 'J j', 'K k', 'L l', 'Lj lj', 'M m', 'N n', 'Nj nj', 'O o', 'P p', 'R r', 'S s', 'Š š', 'T t', 'U u', 'V v', 'Z z', 'Ž ž'],
      groups: {
        motor: 'Motorika i predvježbe pisanja',
        writing: 'Pisanje',
        math: 'Brojevi i računanje',
        logic: 'Logika i pažnja',
      },
      sheets: {
        trace: {
          title: 'Prati stazu',
          text: 'Olovkom ili bojicom prati isprekidanu crtu od bube do cvijeta. Ne žuri i pokušaj ostati na sivoj stazi.',
        },
        dots: {
          title: 'Spoji točke',
          text: 'Spoji točke redom, od 1 do zadnjeg broja, pa se vrati na 1. Zatim oboji sliku.',
        },
        maze: {
          title: 'Zeko u labirintu',
          text: 'Nacrtaj put kojim zeko stiže do mrkve. Kroz živicu ne može.',
        },
        numbers: {
          title: 'Pišemo brojeve',
          text: 'Prvo pogledaj crni broj, pa olovkom prijeđi preko svakoga sivog. Kreni odozgo. Na praznom dijelu retka napiši broj bez pomoći.',
        },
        latin: {
          title: 'Pišemo slova — latinica',
          text: 'Prijeđi olovkom preko sivih slova, pa na kraju retka napiši slovo samostalno. Velika slova dodiruju gornju crtu, mala isprekidanu srednju.',
        },
        cyrillic: {
          title: 'Pišemo slova — ćirilica',
          text: 'Prijeđi olovkom preko sivih slova, pa na kraju retka napiši slovo samostalno. Velika slova dodiruju gornju crtu, mala isprekidanu srednju.',
        },
        lines: {
          title: 'Ravne crte',
          text: 'Povuci crtu od jedne sličice do druge: psa do kosti, zeca do mrkve, kišu od oblaka do cvijeta i raketu do mjeseca. Prati isprekidanu crtu.',
        },
        waves: {
          title: 'Valovi i petlje',
          text: 'Na početku svakog reda je crni uzorak. Prijeđi olovkom preko isprekidanog uzorka do kraja reda, bez podizanja olovke ako možeš.',
        },
        outlines: {
          title: 'Precrtaj oblike',
          text: 'Prvi oblik u redu je uzorak. Prijeđi olovkom preko isprekidanih oblika, pa ih imenuj: krug, kvadrat, trokut, srce, zvijezda.',
        },
        colors: {
          title: 'Oboji oblike',
          text: 'Pogledaj na vrhu koje je boje koji oblik, pa svaki oblik na listu oboji tom bojom.',
        },
        count: {
          title: 'Prebroji i zaokruži',
          text: 'Prebroji sličice u svakom redu i zaokruži točan broj.',
        },
        quantity: {
          title: 'Nacrtaj koliko piše',
          text: 'U svakom okviru nacrtaj onoliko kružića (ili jabuka, ili sunaca) koliko pokazuje broj.',
        },
        adding: {
          title: 'Zbroji sličice',
          text: 'Prebroji sličice lijevo i desno od znaka plus, pa u kvadratić upiši koliko ih ima zajedno.',
        },
        sizes: {
          title: 'Od najmanjeg do najvećeg',
          text: 'U svakom redu upiši ispod sličica brojeve od 1 do 4: 1 ispod najmanje, 4 ispod najveće.',
        },
        pattern: {
          title: 'Nastavi niz',
          text: 'Pogledaj kako se sličice ponavljaju, pa u prazne kvadratiće nacrtaj što dolazi dalje.',
        },
        odd: {
          title: 'Što ne pripada?',
          text: 'U svakom redu jedna sličica nije kao ostale. Pronađi je i zaokruži, pa reci zašto ne pripada.',
        },
        match: {
          title: 'Što ide zajedno?',
          text: 'Spoji crtom sličice koje idu zajedno: psa i kost, kišu i kišobran… Crta ide od točke do točke.',
        },
        shapes: {
          title: 'Pronađi sjenu',
          text: 'Spoji svaku sličicu lijevo s njezinom sjenom desno.',
        },
        differences: {
          title: 'Pronađi 5 razlika',
          text: 'Usporedi gornju i donju sliku. Na donjoj zaokruži 5 stvari koje su drukčije.',
        },
        symmetry: {
          title: 'Dovrši drugu polovicu',
          text: 'Nacrtana je samo lijeva polovica slike. Nacrtaj desnu kao u zrcalu: isprekidana crta je zrcalo. Broji kvadratiće.',
        },
        copy: {
          title: 'Precrtaj sliku',
          text: 'Precrtaj crtež s lijeve mreže na praznu mrežu desno. Broji kvadratiće i kreni od istoga kuta.',
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
        short: 'Povuci svaku kocku u košaru iste boje.',
        howTo: 'Uhvati kocku prstom i povuci je u košaru iste boje. Može i ovako: dodirni kocku, pa dodirni košaru.',
      },
      shapes: {
        title: 'Svaki oblik na svoje mjesto',
        short: 'Krug, kvadrat, trokut… svaki oblik ima svoju sjenu.',
        howTo: 'Povuci svaki oblik na isprekidanu sjenu koja mu odgovara. Imenujte oblike naglas dok igrate.',
      },
      trace: {
        title: 'Prati stazu',
        short: 'Vodi bubu prstom po stazi do cvijeta, polako i pažljivo.',
        howTo: 'Stavi prst na bubu i polako je vodi po stazi do cvijeta. Ako prst skrene, vrati se na stazu i nastavi.',
      },
      dots: {
        title: 'Spoji točke',
        short: 'Dodiruj brojeve redom i otkrij skrivenu sliku.',
        howTo: 'Dodirni broj 1, pa 2, pa 3… Crta spaja točke, a na kraju se pojavi slika. Brojite zajedno naglas.',
      },
      maze: {
        title: 'Zeko u labirintu',
        short: 'Pomozi zeki da kroz labirint stigne do mrkve.',
        howTo: 'Vuci zeku prstom po stazi do mrkve — kroz živicu ne može. Na računalu rade i strelice.',
      },
      memory: {
        title: 'Pronađi par',
        short: 'Okreći kartice i pamti gdje se skriva koja sličica.',
        howTo: 'Dodirni dvije kartice. Ako su iste, ostaju otvorene; ako nisu, okreću se natrag. Pronađi sve parove.',
      },
      pattern: {
        title: 'Što dolazi sljedeće?',
        short: 'Crveno, plavo, crveno… pogodi što nastavlja niz.',
        howTo: 'Pogledaj niz i odaberi oblik koji ide na mjesto upitnika. Pokušajte prvo naglas „pročitati“ niz.',
      },
      count: {
        title: 'Prebroji',
        short: 'Koliko je sličica na ploči? Prebroji i odaberi broj.',
        howTo: 'Prebroji sličice — pokaži prstom svaku redom. Zatim dodirni točan broj.',
      },
      sizes: {
        title: 'Od malog do velikog',
        short: 'Složi sličice na policu od najmanje do najveće.',
        howTo: 'Dodiruj sličice redom: prvo najmanju, pa sve veću i veću. Svaka odlazi na policu.',
      },
    },
  },
  notFound: {
    eyebrow: 'Pogreška',
    title: 'Stranica nije pronađena.',
    backHome: 'Natrag na početnu',
  },
};
