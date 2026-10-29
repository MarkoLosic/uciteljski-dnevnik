import type { Dictionary } from './sr';

export const hr: Dictionary = {
  site: {
    tagline: 'O učionici i tehnologiji u nastavi',
  },
  author: {
    role: 'QA inženjer i učitelj razredne nastave',
    location: 'Banja Luka, BiH',
    intro:
      'Po struci sam učitelj razredne nastave, a danas radim u IT-u kao QA inženjer. Osam mjeseci predavao sam prvašima i od tada razmišljam o tome kako tehnologija može pomoći u učionici — i kada samo smeta.',
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
    topicsEyebrow: '02 — Teme',
    topicsTitle: 'O čemu pišem',
    blogEyebrow: '03 — Blog',
    blogTitle: 'Najnovije s bloga',
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Svi članci',
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
    blogEyebrow: 'O blogu',
    blogTitle: 'Što ćete ovdje pronaći',
    blogText: (siteName: string) =>
      `${siteName} je mjesto gdje spajam ono što sam naučio u učionici s onim čime se svaki dan bavim u IT-u.`,
    contactEyebrow: 'Kontakt',
    contactTitle: 'Javite se',
    contactText: 'Pitanja, prijedlozi, ideja za temu ili samo pozdrav — rado odgovaram.',
    location: 'Lokacija',
  },
  notFound: {
    eyebrow: 'Pogreška',
    title: 'Stranica nije pronađena.',
    backHome: 'Natrag na početnu',
  },
};
