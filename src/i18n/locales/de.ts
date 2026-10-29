import type { Dictionary } from './sr';

export const de: Dictionary = {
  site: {
    tagline: 'Über das Klassenzimmer und Technologie im Unterricht',
  },
  author: {
    role: 'QA-Ingenieur und Grundschullehrer',
    location: 'Banja Luka, Bosnien und Herzegowina',
    intro:
      'Von Beruf bin ich Grundschullehrer, heute arbeite ich in der IT als QA-Ingenieur. Acht Monate lang habe ich Erstklässler unterrichtet, und seitdem denke ich darüber nach, wie Technologie im Klassenzimmer helfen kann — und wann sie nur stört.',
    background: [
      {
        title: 'In der IT',
        text: 'Seit mehr als sechs Jahren arbeite ich als QA-Ingenieur: Ich teste Web- und Mobile-Apps, automatisiere Tests und prüfe KI-Modelle. Der Beruf hat mich gelehrt, Technologie nicht aufs Wort zu glauben — ich prüfe zuerst, ob sie wirklich funktioniert.',
      },
      {
        title: 'Im Klassenzimmer',
        text: 'Ich habe Grundschulpädagogik an der Universität Banja Luka studiert und acht Monate mit Erstklässlern an der Grundschule Grahovo gearbeitet. Dort habe ich gesehen, wie sehr Unterricht von Klarheit, Geduld und Wärme abhängt — mit oder ohne Technologie.',
      },
    ],
  },
  topics: [
    { title: 'Alltag im Klassenzimmer', text: 'Erfahrungen aus der ersten Klasse und Ideen für die Grundschule.' },
    {
      title: 'Technologie im Unterricht',
      text: 'Werkzeuge und Apps für den Unterricht, mit den Augen eines Testers geprüft — was funktioniert und was nicht.',
    },
    { title: 'Künstliche Intelligenz', text: 'Wie KI Lehrkräften helfen kann und wo Vorsicht geboten ist.' },
  ],
  nav: {
    label: 'Hauptnavigation',
    home: 'Start',
    blog: 'Blog',
    about: 'Über mich',
  },
  language: {
    label: 'Sprache',
    change: 'Sprache ändern',
  },
  theme: {
    toLight: 'Helles Design aktivieren',
    toDark: 'Dunkles Design aktivieren',
  },
  footer: {
    label: 'Links in der Fußzeile',
    rights: 'Alle Rechte vorbehalten.',
    author: 'Autor',
    contact: 'Kontakt',
  },
  categories: {
    'AI alati u nastavi': 'KI-Werkzeuge im Unterricht',
    'Etika i AI': 'Ethik und KI',
    'Iskustva iz prakse': 'Aus der Praxis',
    Vijesti: 'Neuigkeiten',
    Resursi: 'Materialien',
  },
  home: {
    greeting: 'Hallo, ich bin',
    readBlog: 'Zum Blog',
    moreAboutMe: 'Mehr über mich',
    chips: ['Grundschule', 'QA-Ingenieur', 'KI im Unterricht'],
    whoEyebrow: '01 — Wer ich bin',
    whoTitle: 'Zwischen Klassenzimmer und IT',
    topicsEyebrow: '02 — Themen',
    topicsTitle: 'Worüber ich schreibe',
    blogEyebrow: '03 — Blog',
    blogTitle: 'Neu im Blog',
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Alle Artikel',
    allPosts: 'Alle Artikel',
    readMore: 'Weiterlesen',
    published: 'Veröffentlicht am',
    backToBlog: 'Zurück zum Blog',
    emptyTitle: 'Noch keine Artikel',
    emptyMessage: 'Die ersten Artikel sind in Arbeit. Schauen Sie bald wieder vorbei!',
    notFoundTitle: 'Artikel nicht gefunden',
    notFoundMessage: 'Der gesuchte Artikel existiert nicht oder wurde verschoben.',
  },
  about: {
    title: 'Über mich',
    blogEyebrow: 'Über den Blog',
    blogTitle: 'Was Sie hier finden',
    blogText: (siteName: string) =>
      `${siteName} ist der Ort, an dem ich verbinde, was ich im Klassenzimmer gelernt habe, mit dem, was ich jeden Tag in der IT mache.`,
    contactEyebrow: 'Kontakt',
    contactTitle: 'Schreiben Sie mir',
    contactText: 'Fragen, Vorschläge, eine Themenidee oder einfach ein Hallo — ich antworte gern.',
    location: 'Ort',
  },
  notFound: {
    eyebrow: 'Fehler',
    title: 'Seite nicht gefunden.',
    backHome: 'Zurück zur Startseite',
  },
};
