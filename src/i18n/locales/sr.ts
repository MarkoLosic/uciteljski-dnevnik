import type { Category } from '../../types/post';
import type { GameId, GameText, Shape, Skill, ToyColor } from '../../games/ids';
import type { Thing } from '../../games/things';

// KORISNIK: tekstovi o tebi i tekst interfejsa na srpskom. Ostali jezici su u susednim fajlovima
// i moraju imati iste ključeve (tip `Dictionary` se izvodi iz ovog fajla).
export const sr = {
  site: {
    tagline: 'O učionici i tehnologiji u nastavi',
  },
  author: {
    role: 'QA inženjer i profesor razredne nastave',
    location: 'Banja Luka, BiH',
    intro:
      'Po struci sam profesor razredne nastave, a danas radim u IT-u kao QA inženjer. Osam meseci predavao sam prvacima i od tada razmišljam o tome kako tehnologija može da pomogne u učionici — i kada samo smeta.',
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
    blog: 'Blog',
    games: 'Igre',
    about: 'O meni',
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
    readBlog: 'Pročitaj blog',
    moreAboutMe: 'Više o meni',
    chips: ['Razredna nastava', 'QA inženjer', 'AI u nastavi'],
    whoEyebrow: '01 — Ko sam ja',
    whoTitle: 'Između učionice i IT-a',
    topicsEyebrow: '02 — Teme',
    topicsTitle: 'O čemu pišem',
    blogEyebrow: '03 — Blog',
    blogTitle: 'Najnovije sa bloga',
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Svi članci',
    allPosts: 'Svi članci',
    readMore: 'Pročitaj više',
    published: 'Objavljeno',
    backToBlog: 'Nazad na blog',
    emptyTitle: 'Još nema članaka',
    emptyMessage: 'Prvi članci su u pripremi. Navratite uskoro!',
    notFoundTitle: 'Članak nije pronađen',
    notFoundMessage: 'Članak koji tražite ne postoji ili je premešten.',
  },
  about: {
    title: 'O meni',
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
    } satisfies Record<GameId, GameText>,
  },
  notFound: {
    eyebrow: 'Greška',
    title: 'Stranica nije pronađena.',
    backHome: 'Nazad na početnu',
  },
};

export type Dictionary = typeof sr;
