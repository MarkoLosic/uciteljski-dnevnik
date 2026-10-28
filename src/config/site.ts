// KORISNIK: ovde su ime, kontakt i tekstovi o tebi — menjaj ih samo na ovom mestu.
export const siteConfig = {
  name: 'Iz učionice',
  tagline: 'O učionici i tehnologiji u nastavi',
  description:
    'Lični blog QA inženjera i profesora razredne nastave iz Banje Luke. Pišem o obrazovanju, o onome što sam naučio u učionici i o tome kako tehnologija može da pomogne u nastavi.',
  author: {
    name: 'Marko Lošić',
    role: 'QA inženjer i profesor razredne nastave',
    intro:
      'Po struci sam profesor razredne nastave, a danas radim u IT-u kao QA inženjer. Osam meseci predavao sam prvacima i od tada razmišljam o tome kako tehnologija može da pomogne u učionici — i kada samo smeta.',
    bio: 'QA inženjer i profesor razredne nastave. Pišem o obrazovanju i tehnologiji u nastavi.',
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
    email: 'markolosic1993@gmail.com',
    location: 'Banja Luka, BiH',
  },
  topics: [
    {
      title: 'Život u učionici',
      text: 'Iskustva iz prvog razreda i ideje za razrednu nastavu.',
    },
    {
      title: 'Tehnologija u nastavi',
      text: 'Alati i aplikacije za nastavu, provereni okom testera — šta radi, a šta ne.',
    },
    {
      title: 'Veštačka inteligencija',
      text: 'Kako AI može da pomogne nastavnicima, i gde treba biti oprezan.',
    },
  ],
  url: 'https://example.ba',
  locale: 'sr-Latn-BA',
  social: {
    linkedin: 'https://www.linkedin.com/in/markolo%C5%A1i%C4%87/',
    twitter: '',
    github: 'https://github.com/MarkoLosic',
  },
} as const;
