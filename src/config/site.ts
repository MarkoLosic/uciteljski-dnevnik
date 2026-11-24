// KORISNIK: ovdje su ime sajta, kontakt i linkovi — isti su na svim jezicima.
// Tekstovi o tebi (uloga, uvod, „Ko sam ja", teme) su prevedeni u src/i18n/locales/*.ts.
export const siteConfig = {
  name: 'učiteljskidnevnik.online',
  author: {
    name: 'Marko Lošić',
    // Mejl namjerno nije ovdje: poruke idu kroz kontakt formu, a adresa je samo u CONTACT_TO_EMAIL na Vercelu.
  },
  url: 'https://www.xn--uiteljskidnevnik-s7b.online',
  displayDomain: 'www.učiteljskidnevnik.online', // isti domen kako ga čitaoci vide (primjer navođenja izvora)
  indexNowKey: '4f8c92e17a3b6d05c8e41f92a7b3d60e', // ključ za instant indeksiranje (Bing, ChatGPT Search, Copilot)
  copyrightUpdated: '2026-11-16', // datum posljednje izmjene stranice „Autorska prava“
  social: {
    linkedin: 'https://www.linkedin.com/in/markolo%C5%A1i%C4%87/',
    twitter: '',
  },
} as const;
