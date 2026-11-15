import { FBIH_DJELA, RS_DJELA } from './spiskovi';
import { lektireIzvori } from './sr';
import type { LektireSadrzaj } from './types';

// Bosanska verzija: isti spiskovi i izvori, tekst bosanskom leksikom.
export const lektireBs: LektireSadrzaj = {
  intro:
    'Spisak lektira od 1. do 5. razreda po važećim nastavnim programima u Republici Srpskoj i Federaciji BiH, uz knjige koje vrijedi pročitati i van spiska i savjete kako čitanje kod kuće ne bi postalo muka.',
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
        { autor: 'Julija Donaldson', naslov: 'Grufalo', zasto: 'Rima i ponavljanje, pa dijete brzo „čita“ zajedno s vama.' },
        { autor: 'Sem Mekbratni', naslov: 'Pogodi koliko te volim', zasto: 'Kratka i nježna, idealna za čitanje prije spavanja.' },
        { autor: 'Erik Karl', naslov: 'Vrlo gladna gusjenica', zasto: 'Dani u sedmici, brojanje i hrana u jednoj slikovnici.' },
        { autor: 'Grigor Vitez', naslov: 'Kad bi drveće hodalo', zasto: 'Pjesme za čitanje naglas i igru riječima.' },
      ],
    },
    2: {
      rs: {
        djela: RS_DJELA[2],
        napomena: 'Učitelj može odabrati i druga srodna djela koja su mu dostupna.',
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
        napomena: 'Učitelj može odabrati i druga srodna djela; za svaku lektiru predviđena su tri časa.',
      },
      fbih: {
        djela: FBIH_DJELA[3],
        napomena: 'Škole najčešće obrađuju četiri djela tokom godine.',
      },
      preporuke: [
        { autor: 'E. B. Vajt', naslov: 'Šarlotina mreža', zasto: 'Priča o prijateljstvu koja otvara razgovor o gubitku i brizi za druge.' },
        { autor: 'Roald Dal', naslov: 'Fantastični gospodin Lisac', zasto: 'Kratka, duhovita i napeta — za djecu koja „ne vole čitati“.' },
        { autor: 'Uroš Petrović', naslov: 'Zagonetne priče', zasto: 'Svaka priča je zagonetka, pa dijete čita pažljivo kako bi je riješilo.' },
      ],
    },
    4: {
      rs: {
        djela: RS_DJELA[4],
        napomena:
          'Učitelj u dogovoru s učenicima bira 5 od 9 naslova, a ostale nudi za slobodno čitanje. Učenici mogu i sami predložiti jedno djelo i utiske podijeliti s odjeljenjem.',
      },
      fbih: {
        djela: FBIH_DJELA[4],
        napomena: 'Za pet naslova predviđeno je 15 časova.',
      },
      preporuke: [
        { autor: 'Erih Kestner', naslov: 'Emil i detektivi', zasto: 'Djeca sama rješavaju slučaj — klasik detektivske priče za ovaj uzrast.' },
        { autor: 'Roald Dal', naslov: 'Čarli i fabrika čokolade', zasto: 'Mašta bez granica i jasna pouka o pohlepi i skromnosti.' },
        { autor: 'Antoan de Sent Egziperi', naslov: 'Mali princ', zasto: 'Najbolje uz odraslog: svako poglavlje je povod za razgovor.' },
      ],
    },
    5: {
      rs: {
        djela: RS_DJELA[5],
        napomena: 'Učitelj u dogovoru s učenicima bira 7 od 12 djela. Uz lektiru učenici vode dnevnik (bilješke) čitanja.',
      },
      fbih: {
        djela: FBIH_DJELA[5],
        napomena: 'Svih šest djela je predviđeno za obradu tokom godine.',
      },
      preporuke: [
        { autor: 'Mark Tven', naslov: 'Doživljaji Toma Sojera', zasto: 'Avanturu, prijateljstvo i dječije nestašluke prepoznaje svaka generacija.' },
        { autor: 'Mihael Ende', naslov: 'Momo', zasto: 'Priča o vremenu i slušanju drugih — za razgovor koji traje i poslije knjige.' },
        { autor: 'K. S. Luis', naslov: 'Lav, vještica i orman', zasto: 'Ulaz u fantastiku za djecu koja su „prerasla“ bajke.' },
        { autor: 'Žil Vern', naslov: 'Put oko svijeta za 80 dana', zasto: 'Avantura uz geografiju: pratite put na mapi dok čitate.' },
      ],
    },
  },
  savjeti: [
    {
      title: 'Čitajte naglas, i kad dijete već zna čitati',
      text: 'Deset do petnaest minuta dnevno je dovoljno. Dijete koje sluša priču uči riječi i rečenice koje još ne može samo pročitati.',
    },
    {
      title: 'Krenite na vrijeme, ne veče prije',
      text: 'Podijelite knjigu na male dijelove, npr. jedno poglavlje dnevno. Lektira pročitana na brzinu ne ostavi traga, a program traži upravo to da knjiga ostane u sjećanju.',
    },
    {
      title: 'Razgovarajte, ne ispitujte',
      text: 'Umjesto „Kako se zove glavni lik?“ pitajte „Šta bi ti uradio na njegovom mjestu?“ ili „Koji dio ti je bio najsmješniji?“. Razgovor razvija razumijevanje više nego nabrajanje likova.',
    },
    {
      title: 'Vodite dnevnik čitanja',
      text: 'Datum, naslov, jedna rečenica o tome šta se dogodilo i mali crtež. U 5. razredu u Republici Srpskoj dnevnik čitanja je i dio programa.',
    },
    {
      title: 'Pustite dijete da bira',
      text: 'Osim lektire, neka dijete bira i samo: strip, enciklopedija o životinjama ili knjiga o fudbalu se računaju. Dijete koje voli čitati lakše pročita i lektiru.',
    },
    {
      title: 'Upišite dijete u biblioteku',
      text: 'Školska i gradska biblioteka imaju lektiru u više primjeraka. Odlazak po knjigu može postati mali ritual — i ušteda za kućni budžet.',
    },
  ],
  izvori: lektireIzvori,
};
