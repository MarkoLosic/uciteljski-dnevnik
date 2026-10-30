import type { Dictionary } from './sr';

export const de: Dictionary = {
  site: {
    tagline: 'Über das Klassenzimmer und Technologie im Unterricht',
    description:
      'Ein persönlicher Blog über Bildung, Grundschulunterricht und Technologie im Klassenzimmer — von einem Lehrer, der heute als QA-Ingenieur arbeitet.',
  },
  author: {
    role: 'QA-Ingenieur und Grundschullehrer',
    location: 'Banja Luka, Bosnien und Herzegowina',
    intro:
      'Von Beruf bin ich Grundschullehrer, und die acht Monate mit Erstklässlern haben mich die zwei wichtigsten Fähigkeiten gelehrt: grenzenlose Geduld und ein Auge fürs Detail. In einem Klassenzimmer voller Sechsjähriger muss man jede Kleinigkeit bemerken — wer still hängen geblieben ist, wo eine Aufgabe unklar ist und wie ein scheinbar kleines Versehen für Durcheinander sorgen kann. Genau diese Denkweise bringe ich heute als QA-Ingenieur in die IT ein. Softwaretests bedeuten für mich nicht bloß, sich durch eine App zu klicken, sondern genau das: Details aufmerksam beobachten, die andere übersehen, und geduldig an Systemen arbeiten, die fehlerfrei funktionieren. Deshalb betrachte ich Technologie in der Bildung von beiden Seiten — wo sie wirklich entlastet und wo sie wegen schlechten Designs nur stört.',
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
    games: 'Spiele für Kinder',
    gamesShort: 'Spiele',
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
    whoImageAlt:
      'Illustration: Auf der einen Seite spielt ein Lehrer mit Kindern im Klassenzimmer, auf der anderen arbeitet derselbe Mann als QA-Ingenieur am Computer — Buchstaben und Zahlen aus dem Klassenzimmer fließen in Code und Tests.',
    topicsEyebrow: '02 — Themen',
    topicsTitle: 'Worüber ich schreibe',
    blogEyebrow: '03 — Blog',
    blogTitle: 'Neu im Blog',
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Alle Artikel',
    description:
      'Alle Artikel über Grundschulunterricht, Erfahrungen aus dem Klassenzimmer und den sinnvollen Einsatz von Technologie und KI.',
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
    description:
      'Wer hinter Iz učionice steht: Grundschullehrer von Beruf, QA-Ingenieur in der Praxis, aus Banja Luka. Hintergrund, Themen und Kontakt.',
    blogEyebrow: 'Über den Blog',
    blogTitle: 'Was Sie hier finden',
    blogText: (siteName: string) =>
      `${siteName} ist der Ort, an dem ich verbinde, was ich im Klassenzimmer gelernt habe, mit dem, was ich jeden Tag in der IT mache.`,
    contactEyebrow: 'Kontakt',
    contactTitle: 'Schreiben Sie mir',
    contactText: 'Fragen, Vorschläge, eine Themenidee oder einfach ein Hallo — ich antworte gern.',
    location: 'Ort',
  },
  games: {
    eyebrow: 'Spiele · Vorschulalter',
    title: 'Spiele für kleine Hände',
    intro:
      'Zehn kurze Spiele für Kinder von 3 bis 6 Jahren. Jedes übt etwas Kleines: Fingergenauigkeit, Auge-Hand-Koordination, Aufmerksamkeit, Zählen oder logisches Denken. Am besten funktionieren sie auf Tablet oder Handy, aber auch mit der Maus.',
    age: '3–6 Jahre · ohne Werbung und Tracking',
    play: 'Spielen',
    back: 'Alle Spiele',
    again: 'Noch einmal',
    next: 'Weiter',
    win: 'Super!',
    winText: 'Toll gemacht — alles gelöst!',
    tipsEyebrow: 'Für Eltern und Erzieher',
    tipsTitle: 'Damit das Spielen etwas bringt',
    tips: [
      {
        title: 'Gemeinsam spielen',
        text: 'Setzen Sie sich neben Ihr Kind, lesen Sie ihm die Anleitung vor und loben Sie die Mühe, nicht nur das Ergebnis. Ein Gespräch über Farben, Formen und Zahlen ist mehr wert als das Spiel selbst.',
      },
      {
        title: 'Kurz und oft',
        text: 'Für Vorschulkinder reichen 10–15 Minuten Bildschirmzeit am Stück. Spielen Sie lieber zwei, drei Spiele und hören Sie auf, solange Ihr Kind noch Spaß hat.',
      },
      {
        title: 'Der Bildschirm ersetzt keine Hände',
        text: 'Diese Spiele ergänzen Knete, Schere, Bauklötze und Buntstifte, sie ersetzen sie nicht. Echte Feinmotorik entsteht in der echten Welt.',
      },
    ],
    skills: {
      fine: 'Feinmotorik',
      eyeHand: 'Auge und Hand',
      logic: 'Logik',
      memory: 'Gedächtnis',
      counting: 'Zählen',
    },
    colorNames: {
      red: 'rot',
      blue: 'blau',
      yellow: 'gelb',
      green: 'grün',
      purple: 'lila',
      orange: 'orange',
    },
    shapeNames: {
      circle: 'Kreis',
      square: 'Quadrat',
      triangle: 'Dreieck',
      star: 'Stern',
      heart: 'Herz',
    },
    things: {
      cat: 'Katze',
      dog: 'Hund',
      fish: 'Fisch',
      bird: 'Vogel',
      rabbit: 'Hase',
      turtle: 'Schildkröte',
      snail: 'Schnecke',
      apple: 'Apfel',
      star: 'Stern',
      flower: 'Blume',
      sun: 'Sonne',
    },
    ui: {
      round: (n: number, total: number) => `Runde ${n} von ${total}`,
      progress: (n: number, total: number) => `${n} von ${total}`,
      popBalloon: (color: string) => `Ballon, Farbe: ${color}`,
      block: (color: string) => `Klotz, Farbe: ${color}`,
      basket: (color: string) => `Korb, Farbe: ${color}`,
      slot: (shape: string) => `Platz für: ${shape}`,
      piece: (shape: string) => `Form: ${shape}`,
      dot: (n: number) => `Punkt ${n}`,
      traceArea: 'Weg vom Käfer zur Blume',
      maze: 'Labyrinth: den Hasen mit den Pfeiltasten oder dem Finger zur Karotte bewegen',
      hiddenCard: 'Verdeckte Karte',
      sequence: 'Reihe aus Formen',
      missing: 'Was kommt als Nächstes?',
      howMany: (thing: string) => `Wie viele? (${thing})`,
      sizeItem: (thing: string, n: number, total: number) => `${thing}, Größe ${n} von ${total}`,
      shelf: 'Regal, vom kleinsten zum größten',
    },
    worksheet: {
      link: 'Arbeitsblatt zum Ausdrucken',
      eyebrow: 'Arbeitsblatt',
      print: 'Drucken',
      backToGames: 'Zurück zu den Spielen',
      name: 'Name',
      date: 'Datum',
      page: (n: number, total: number) => `Seite ${n}/${total}`,
      tip: 'Tipp: auf A4-Papier drucken. Schwarz-Weiß funktioniert auch. Buntstifte und ein dicker Bleistift sind besser als ein dünner Kuli.',
      sectionEyebrow: 'Zum Ausdrucken',
      sectionTitle: 'Arbeitsblätter',
      sectionText: 'Papierversionen der Spiele und Blätter zum Schreiben von Zahlen und Buchstaben — Übung mit dem Stift, ganz ohne Bildschirm. Blatt öffnen und ausdrucken.',
      alphabet: ['A a', 'B b', 'C c', 'D d', 'E e', 'F f', 'G g', 'H h', 'I i', 'J j', 'K k', 'L l', 'M m', 'N n', 'O o', 'P p', 'Q q', 'R r', 'S s', 'T t', 'U u', 'V v', 'W w', 'X x', 'Y y', 'Z z', 'Ä ä', 'Ö ö', 'Ü ü', 'ß'],
      sheets: {
        trace: {
          title: 'Dem Weg folgen',
          text: 'Mit Bleistift oder Buntstift der gestrichelten Linie vom Käfer zur Blume folgen. Langsam, und möglichst auf dem grauen Weg bleiben.',
        },
        dots: {
          title: 'Punkte verbinden',
          text: 'Die Punkte der Reihe nach verbinden, von 1 bis zur letzten Zahl und zurück zur 1. Dann das Bild ausmalen.',
        },
        maze: {
          title: 'Hasen-Labyrinth',
          text: 'Den Weg einzeichnen, auf dem der Hase zur Karotte kommt. Durch die Hecke geht es nicht.',
        },
        numbers: {
          title: 'Zahlen schreiben',
          text: 'Zuerst die schwarze Zahl anschauen, dann jede graue mit dem Bleistift nachfahren, oben beginnen. Im freien Teil der Zeile die Zahl selbst schreiben.',
        },
        latin: {
          title: 'Buchstaben schreiben',
          text: 'Die grauen Buchstaben nachfahren und am Ende der Zeile den Buchstaben selbst schreiben. Großbuchstaben reichen bis zur oberen Linie, kleine bis zur gestrichelten Mittellinie.',
        },
        cyrillic: {
          title: 'Buchstaben schreiben — Kyrillisch',
          text: 'Die grauen Buchstaben nachfahren und am Ende der Zeile den Buchstaben selbst schreiben. Großbuchstaben reichen bis zur oberen Linie, kleine bis zur gestrichelten Mittellinie.',
        },
      },
    },
    list: {
      balloons: {
        title: 'Luftballons',
        short: 'Ballons steigen in den Himmel — schnell antippen, bevor sie wegfliegen.',
        howTo: 'Einen Ballon antippen, damit er platzt. Nach zehn geplatzten Ballons ist das Spiel geschafft. Keine Eile — es kommen immer neue.',
      },
      colors: {
        title: 'Farben sortieren',
        short: 'Jeden Klotz in den Korb mit der gleichen Farbe ziehen.',
        howTo: 'Einen Klotz mit dem Finger festhalten und in den Korb mit der gleichen Farbe ziehen. Oder: Klotz antippen, dann Korb antippen.',
      },
      shapes: {
        title: 'Jede Form an ihren Platz',
        short: 'Kreis, Quadrat, Dreieck … jede Form hat ihren Schatten.',
        howTo: 'Jede Form auf den gestrichelten Schatten ziehen, der zu ihr passt. Nennen Sie die Formen beim Spielen laut.',
      },
      trace: {
        title: 'Dem Weg folgen',
        short: 'Den Käfer mit dem Finger langsam und vorsichtig zur Blume führen.',
        howTo: 'Den Finger auf den Käfer legen und ihn langsam den Weg entlang zur Blume führen. Rutscht der Finger ab, einfach zurück auf den Weg und weiter.',
      },
      dots: {
        title: 'Punkte verbinden',
        short: 'Die Zahlen der Reihe nach antippen und ein Bild entdecken.',
        howTo: 'Erst die 1 antippen, dann die 2, dann die 3 … Eine Linie verbindet die Punkte, und am Ende erscheint ein Bild. Zählen Sie gemeinsam laut.',
      },
      maze: {
        title: 'Hasen-Labyrinth',
        short: 'Dem Hasen helfen, durch das Labyrinth zur Karotte zu finden.',
        howTo: 'Den Hasen mit dem Finger den Weg entlang zur Karotte ziehen — durch die Hecke geht es nicht. Am Computer gehen auch die Pfeiltasten.',
      },
      memory: {
        title: 'Paare finden',
        short: 'Karten umdrehen und sich merken, wo welches Bild steckt.',
        howTo: 'Zwei Karten antippen. Sind sie gleich, bleiben sie offen; wenn nicht, drehen sie sich zurück. Alle Paare finden.',
      },
      pattern: {
        title: 'Was kommt als Nächstes?',
        short: 'Rot, blau, rot … erraten, was die Reihe fortsetzt.',
        howTo: 'Die Reihe anschauen und die Form wählen, die an die Stelle des Fragezeichens gehört. Versuchen Sie, die Reihe zuerst laut zu „lesen“.',
      },
      count: {
        title: 'Zählen',
        short: 'Wie viele Bilder sind zu sehen? Zählen und die Zahl wählen.',
        howTo: 'Die Bilder zählen — mit dem Finger auf jedes zeigen. Dann die richtige Zahl antippen.',
      },
      sizes: {
        title: 'Von klein nach groß',
        short: 'Die Bilder vom kleinsten bis zum größten ins Regal stellen.',
        howTo: 'Die Bilder der Reihe nach antippen: zuerst das kleinste, dann immer größere. Jedes kommt ins Regal.',
      },
    },
  },
  notFound: {
    eyebrow: 'Fehler',
    title: 'Seite nicht gefunden.',
    backHome: 'Zurück zur Startseite',
  },
};
