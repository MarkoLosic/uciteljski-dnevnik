import { FBIH_DJELA, RS_DJELA } from './spiskovi';
import type { LektireSadrzaj } from './types';

const RPZ_PROGRAMI =
  'https://rpz-rs.org/wp-content/uploads/2025/08/%D0%A1%D1%80%D0%BF%D1%81%D0%BA%D0%B8-%D1%98%D0%B5%D0%B7%D0%B8%D0%BA-%D0%BE%D0%B4-II-%D0%B4%D0%BE-IX-%D1%80%D0%B0%D0%B7%D1%80%D0%B5%D0%B4%D0%B0.zip';
const RPZ_PRAVILNIK =
  'https://rpz-rs.org/wp-content/uploads/2025/06/%D0%BD%D0%B0%D1%81%D1%82%D0%B0%D0%B2%D0%BD%D0%B8_%D0%BF%D0%BB%D0%B0%D0%BD_%D0%B8_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC_%D0%B7%D0%B0_%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D0%BE_%D0%B2%D0%B0%D1%81%D0%BF%D0%B8%D1%82%D0%B0%D1%9A%D0%B5_%D0%B8_%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D1%9A%D0%B5.pdf';

export const lektireIzvori = [
  { title: 'RPZ Republike Srpske: Nastavni programi, Srpski jezik od II do IX razreda (ZIP)', url: RPZ_PROGRAMI },
  { title: 'RPZ Republike Srpske: Nastavni plan i program za osnovno vaspitanje i obrazovanje (Službeni glasnik RS, 2023)', url: RPZ_PRAVILNIK },
  { title: 'Kanton Sarajevo: Nastavni planovi i programi za osnovnu školu', url: 'https://mo.ks.gov.ba/nastavni-planovi' },
  { title: 'NPP Kantona Sarajevo za 3. razred devetogodišnje osnovne škole (2018)', url: 'https://mo.ks.gov.ba/sites/mo.ks.gov.ba/files/2021-02/3._razred_0.pdf' },
  { title: 'NPP Kantona Sarajevo za 4. razred devetogodišnje osnovne škole (2018)', url: 'https://mo.ks.gov.ba/sites/mo.ks.gov.ba/files/2024-07/4._razred_0.pdf' },
  { title: 'NPP Kantona Sarajevo za 5. razred devetogodišnje osnovne škole (2018)', url: 'https://mo.ks.gov.ba/sites/mo.ks.gov.ba/files/2024-07/5._razred_0.pdf' },
  { title: 'JU OŠ „Kovačići“ Sarajevo: Spisak lektira (2025/26)', url: 'https://www.oskovacici.edu.ba/spisak-lektira-20152016/' },
];

export const lektireSr: LektireSadrzaj = {
  intro:
    'Spisak lektira od 1. do 5. razreda po važećim nastavnim programima u Republici Srpskoj i Federaciji BiH, uz knjige koje vrijedi pročitati i van spiska i savjete kako da čitanje kod kuće ne postane muka.',
  note: 'Spiskovi su prepisani iz nastavnih programa, navedenih na dnu stranice. Programi ostavljaju učitelju izbor, pa konačan spisak za vaše odjeljenje daje učitelj.',
  checked: '2026-11-15',
  sistemi: {
    rs: {
      naziv: 'Republika Srpska',
      opis: 'Nastavni program Srpski jezik (RPZ RS)',
    },
    fbih: {
      naziv: 'Federacija BiH',
      opis: 'NPP Kantona Sarajevo; ostali kantoni se mogu razlikovati',
    },
  },
  razredi: {
    1: {
      rs: {
        djela: RS_DJELA[1],
        napomena:
          'U prvom razredu djeca tek uče slova. Program za 1. razred (Govor, izražavanje, stvaranje) nije objavljen uz ostale programe na sajtu RPZ-a, pa ovdje nema spiska — knjige se čitaju zajedno, naglas.',
      },
      fbih: {
        djela: FBIH_DJELA[1],
        napomena: 'Program za 1. razred ne propisuje lektiru: učenici se tek uvode u čitanje, a knjige se upoznaju kroz čitanje u razredu.',
      },
      preporuke: [
        { autor: 'Julija Donaldson', naslov: 'Grufalo', zasto: 'Rima i ponavljanje, pa dijete brzo „čita“ zajedno sa vama.' },
        { autor: 'Sem Mekbratni', naslov: 'Pogodi koliko te volim', zasto: 'Kratka i nježna, idealna za čitanje prije spavanja.' },
        { autor: 'Erik Karl', naslov: 'Vrlo gladna gusjenica', zasto: 'Dani u sedmici, brojanje i hrana u jednoj slikovnici.' },
        { autor: 'Grigor Vitez', naslov: 'Kad bi drveće hodalo', zasto: 'Pjesme za čitanje naglas i igru riječima.' },
      ],
    },
    2: {
      rs: {
        djela: RS_DJELA[2],
        napomena: 'Učitelj može izabrati i druga srodna djela koja su mu dostupna.',
      },
      fbih: {
        djela: FBIH_DJELA[2],
        napomena:
          'Program za 2. razred još ne uvodi lektiru u klasičnom smislu (šest časova pripreme za lektiru). Ova djela škole u Kantonu Sarajevo navode za zajedničko čitanje.',
      },
      preporuke: [
        { autor: 'A. A. Milin', naslov: 'Vini Pu', zasto: 'Kratka poglavlja: jedno veče, jedna zgoda.' },
        { autor: 'Astrid Lindgren', naslov: 'Emil iz Leneberge', zasto: 'Vragolije zbog kojih djeca sama traže još jedno poglavlje.' },
        { autor: 'Leo Lioni', naslov: 'Frederik', zasto: 'Slikovnica o mišu koji za zimu skuplja boje i riječi — dobar uvod u poeziju.' },
      ],
    },
    3: {
      rs: {
        djela: RS_DJELA[3],
        napomena: 'Učitelj može izabrati i druga srodna djela; za svaku lektiru predviđena su tri časa.',
      },
      fbih: {
        djela: FBIH_DJELA[3],
        napomena: 'Škole najčešće obrađuju četiri djela tokom godine.',
      },
      preporuke: [
        { autor: 'E. B. Vajt', naslov: 'Šarlotina mreža', zasto: 'Priča o prijateljstvu koja otvara razgovor o gubitku i brizi za druge.' },
        { autor: 'Roald Dal', naslov: 'Fantastični gospodin Lisac', zasto: 'Kratka, duhovita i napeta — za djecu koja „ne vole da čitaju“.' },
        { autor: 'Uroš Petrović', naslov: 'Zagonetne priče', zasto: 'Svaka priča je zagonetka, pa dijete čita pažljivo da bi je riješilo.' },
      ],
    },
    4: {
      rs: {
        djela: RS_DJELA[4],
        napomena:
          'Učitelj u dogovoru sa učenicima bira 5 od 9 naslova, a ostale nudi za slobodno čitanje. Učenici mogu i sami predložiti jedno djelo i utiske podijeliti sa odjeljenjem.',
      },
      fbih: {
        djela: FBIH_DJELA[4],
        napomena: 'Za pet naslova predviđeno je 15 časova.',
      },
      preporuke: [
        { autor: 'Erih Kestner', naslov: 'Emil i detektivi', zasto: 'Djeca rješavaju slučaj sama — klasik detektivske priče za ovaj uzrast.' },
        { autor: 'Roald Dal', naslov: 'Čarli i fabrika čokolade', zasto: 'Mašta bez granica i jasna pouka o pohlepi i skromnosti.' },
        { autor: 'Antoan de Sent Egziperi', naslov: 'Mali princ', zasto: 'Najbolje uz odraslog: svako poglavlje je povod za razgovor.' },
      ],
    },
    5: {
      rs: {
        djela: RS_DJELA[5],
        napomena: 'Učitelj u dogovoru sa učenicima bira 7 od 12 djela. Uz lektiru učenici vode dnevnik (bilješke) čitanja.',
      },
      fbih: {
        djela: FBIH_DJELA[5],
        napomena: 'Svih šest djela je predviđeno za obradu tokom godine.',
      },
      preporuke: [
        { autor: 'Mark Tven', naslov: 'Doživljaji Toma Sojera', zasto: 'Avantura, prijateljstvo i dječije nestašluke prepoznaje svaka generacija.' },
        { autor: 'Mihael Ende', naslov: 'Momo', zasto: 'Priča o vremenu i slušanju drugih — za razgovor koji traje i poslije knjige.' },
        { autor: 'K. S. Luis', naslov: 'Lav, vještica i orman', zasto: 'Ulaz u fantastiku za djecu koja su „prerasla“ bajke.' },
        { autor: 'Žil Vern', naslov: 'Put oko svijeta za 80 dana', zasto: 'Avantura uz geografiju: pratite put na karti dok čitate.' },
      ],
    },
  },
  savjeti: [
    {
      title: 'Čitajte naglas, i kad dijete već zna da čita',
      text: 'Deset do petnaest minuta dnevno je dovoljno. Dijete koje sluša priču uči riječi i rečenice koje još ne može samo da pročita.',
    },
    {
      title: 'Krenite na vrijeme, ne veče prije',
      text: 'Podijelite knjigu na male dijelove, npr. jedno poglavlje dnevno. Lektira pročitana na brzinu ne ostavi traga — a program traži baš to da knjiga ostane u sjećanju.',
    },
    {
      title: 'Razgovarajte, ne ispitujte',
      text: 'Umjesto „Kako se zove glavni lik?“ pitajte „Šta bi ti uradio na njegovom mjestu?“ ili „Koji dio ti je bio najsmješniji?“. Razgovor razvija razumijevanje više od nabrajanja likova.',
    },
    {
      title: 'Vodite dnevnik čitanja',
      text: 'Datum, naslov, jedna rečenica o tome šta se desilo i mali crtež. U 5. razredu u Republici Srpskoj dnevnik čitanja je i dio programa.',
    },
    {
      title: 'Pustite dijete da bira',
      text: 'Pored lektire, neka dijete bira i samo: strip, enciklopedija o životinjama ili knjiga o fudbalu se računaju. Dijete koje voli da čita lakše pročita i lektiru.',
    },
    {
      title: 'Upišite dijete u biblioteku',
      text: 'Školska i gradska biblioteka imaju lektiru u više primjeraka. Odlazak po knjigu može postati mali ritual — i ušteda za kućni budžet.',
    },
  ],
  izvori: lektireIzvori,
};
