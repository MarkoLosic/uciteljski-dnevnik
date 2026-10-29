// KORISNIK: ovde su ime sajta, kontakt i linkovi — isti su na svim jezicima.
// Tekstovi o tebi (uloga, uvod, „Ko sam ja", teme) su prevedeni u src/i18n/locales/*.ts.
export const siteConfig = {
  name: 'Iz učionice',
  author: {
    name: 'Marko Lošić',
    email: 'markolosic1993@gmail.com',
  },
  url: 'https://example.ba',
  social: {
    linkedin: 'https://www.linkedin.com/in/markolo%C5%A1i%C4%87/',
    twitter: '',
    github: 'https://github.com/MarkoLosic',
  },
} as const;
