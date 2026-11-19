// Bojanke od autorovih ilustracija (public/slike/bojanke/<folder>/NN-ime.jpg, 896×1200, sivo).
// Mali potpis autora (donji desni ugao) je upisan u same slike (ImageMagick).
// Ispod slike: naslov i kratak tekst (zanimljivost ili pitanje za razgovor) iz rječnika.
import type { ReactNode } from 'react';
import type { Dictionary } from '../i18n/dictionaries';

type Labels = Dictionary['games']['worksheet']['labels'];

export const FOREST_ANIMALS = ['bear', 'fox', 'hedgehog', 'owl', 'rabbit', 'fawn', 'squirrel', 'raccoon', 'frog'] as const;
export type ForestAnimal = (typeof FOREST_ANIMALS)[number];

const FOREST_FILES: Record<ForestAnimal, string> = {
  bear: '01-medo',
  fox: '02-lisica',
  hedgehog: '03-jez',
  owl: '04-sova',
  rabbit: '05-zeko',
  fawn: '06-lane',
  squirrel: '07-vjeverica',
  raccoon: '08-rakun',
  frog: '09-zabica',
};

export const PUPPIES = ['bone', 'ball', 'basket', 'glasses', 'bath', 'rain', 'swing', 'skateboard', 'friends'] as const;
export type Puppy = (typeof PUPPIES)[number];

const PUPPY_FILES: Record<Puppy, string> = {
  bone: '01-stene-i-koska',
  ball: '02-igra-s-loptom',
  basket: '03-slatki-snovi',
  glasses: '04-stene-s-naocarima',
  bath: '05-kupanje',
  rain: '06-setnja-po-kisi',
  swing: '07-ljuljaska',
  skateboard: '08-skejtbord',
  friends: '09-najbolji-prijatelji',
};

export const BUNNIES = ['carrot', 'wreath', 'basket', 'rainbow', 'garden', 'tortoise', 'sleepy', 'tophat', 'family'] as const;
export type Bunny = (typeof BUNNIES)[number];

const BUNNY_FILES: Record<Bunny, string> = {
  carrot: '01-zecic-i-sargarepa',
  wreath: '02-cvjetni-vijenac',
  basket: '03-zecic-u-korpi',
  rainbow: '04-ispod-duge',
  garden: '05-zecic-u-basti',
  tortoise: '06-zec-i-kornjaca',
  sleepy: '07-uspavani-zecic',
  tophat: '08-zecic-u-cilindru',
  family: '09-porodica-zecica',
};

function ImagePage({ src, title, note }: { src: string; title: string; note: string }) {
  return (
    <figure className="mx-auto grid w-full max-w-[142mm] gap-[2.5mm]">
      {/* Slika 3:4; širina 142 mm daje ~189 mm visine, pa sa naslovom i tekstom staje na A4. */}
      <img src={src} alt={title} loading="eager" decoding="sync" className="block h-auto w-full" />
      <figcaption className="text-center">
        <span className="block font-head text-[22px] leading-tight font-bold">{title}</span>
        <span className="mt-1 block text-[14px] leading-snug text-[#374151]">💡 {note}</span>
      </figcaption>
    </figure>
  );
}

export function forestAnimalsPages(labels: Labels): ReactNode[] {
  return FOREST_ANIMALS.map((id) => {
    const a = labels.forestAnimals[id];
    return <ImagePage key={id} src={`/slike/bojanke/sumske-zivotinje/${FOREST_FILES[id]}.jpg`} title={a.name} note={a.fact} />;
  });
}

export function puppiesPages(labels: Labels): ReactNode[] {
  return PUPPIES.map((id) => {
    const p = labels.puppies[id];
    return <ImagePage key={id} src={`/slike/bojanke/stenci/${PUPPY_FILES[id]}.jpg`} title={p.title} note={p.note} />;
  });
}

export function bunniesPages(labels: Labels): ReactNode[] {
  return BUNNIES.map((id) => {
    const b = labels.bunnies[id];
    return <ImagePage key={id} src={`/slike/bojanke/zecici/${BUNNY_FILES[id]}.jpg`} title={b.title} note={b.note} />;
  });
}

export const CARS = ['car', 'race', 'fire', 'police', 'bus', 'excavator', 'dumper', 'tractor', 'jeep'] as const;
export type Car = (typeof CARS)[number];

const CAR_FILES: Record<Car, string> = {
  car: '01-veseli-auto',
  race: '02-trkaci-auto',
  fire: '03-vatrogasni-kamion',
  police: '04-policijski-auto',
  bus: '05-skolski-autobus',
  excavator: '06-bager',
  dumper: '07-kamion-kiper',
  tractor: '08-traktor',
  jeep: '09-terenski-dzip',
};

export const FRUIT_VEG = [
  'friends',
  'applePear',
  'strawberryCherry',
  'bananaGrapes',
  'watermelon',
  'tomatoPepper',
  'carrotPumpkin',
  'broccoliCabbage',
  'cucumberPeas',
] as const;
export type FruitVeg = (typeof FRUIT_VEG)[number];

const FRUIT_VEG_FILES: Record<FruitVeg, string> = {
  friends: '01-veseli-prijatelji',
  applePear: '02-jabuka-i-kruska',
  strawberryCherry: '03-jagoda-i-tresnje',
  bananaGrapes: '04-banana-i-grozdje',
  watermelon: '05-lubenica',
  tomatoPepper: '06-paradajz-i-paprika',
  carrotPumpkin: '07-mrkva-i-bundeva',
  broccoliCabbage: '08-brokoli-i-kupus',
  cucumberPeas: '09-krastavac-i-grasak',
};

export const LEAVES = ['sprout', 'kinds', 'bigLeaf', 'mouse', 'caterpillar', 'bird', 'path', 'squirrel', 'stream'] as const;
export type Leaf = (typeof LEAVES)[number];

const LEAF_FILES: Record<Leaf, string> = {
  sprout: '01-mladica',
  kinds: '02-vrste-lisca',
  bigLeaf: '03-veliki-list',
  mouse: '04-mis-ispod-lista',
  caterpillar: '05-gusjenica-na-listu',
  bird: '06-ptica-i-gnijezdo',
  path: '07-jesenja-staza',
  squirrel: '08-vjeverica-na-ljuljasci',
  stream: '09-lisce-na-potoku',
};

export const NUMBERS = ['oneTwoThree', 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'] as const;
export type NumberPage = (typeof NUMBERS)[number];

const NUMBER_FILES: Record<NumberPage, string> = {
  oneTwoThree: '01-jedan-dva-tri',
  zero: '02-nula',
  one: '03-jedan',
  two: '04-dva',
  three: '05-tri',
  four: '06-cetiri',
  five: '07-pet',
  six: '08-sest',
  seven: '09-sedam',
  eight: '10-osam',
  nine: '11-devet',
};

function bookPages<Id extends string>(
  folder: string,
  ids: readonly Id[],
  files: Record<Id, string>,
  text: Record<Id, { title: string; note: string }>,
): ReactNode[] {
  return ids.map((id) => (
    <ImagePage key={id} src={`/slike/bojanke/${folder}/${files[id]}.jpg`} title={text[id].title} note={text[id].note} />
  ));
}

export const carsPages = (labels: Labels) => bookPages('auta', CARS, CAR_FILES, labels.cars);
export const fruitVegPages = (labels: Labels) => bookPages('voce-i-povrce', FRUIT_VEG, FRUIT_VEG_FILES, labels.fruitVeg);
export const leavesPages = (labels: Labels) => bookPages('lisce', LEAVES, LEAF_FILES, labels.leaves);
export const numbersPages = (labels: Labels) => bookPages('brojevi', NUMBERS, NUMBER_FILES, labels.numbers);

// Bojanke od 7 strana: redoslijed strana = redoslijed ključeva u mapi fajlova.
function pagesFrom<Id extends string>(
  folder: string,
  files: Record<Id, string>,
  text: Record<Id, { title: string; note: string }>,
): ReactNode[] {
  return bookPages(folder, Object.keys(files) as Id[], files, text);
}

const BASKETBALL_FILES = {
  shot: '01-sut-na-kos',
  dribble: '02-vodjenje-lopte',
  jumpBall: '03-pocetak-utakmice',
  dunk: '04-zakucavanje',
  celebration: '05-slavlje-poslije-kosa',
  cheerleaders: '06-navijacice',
  trophy: '07-pehar',
};

const SUMMER_FILES = {
  sun: '01-sunce-s-naocarima',
  beach: '02-plaza-i-palme',
  pool: '03-kupanje-u-bazenu',
  iceCream: '04-ljetnji-sladoled',
  sandCastle: '05-dvorac-od-pijeska',
  camping: '06-kampovanje',
  lemonade: '07-limunada',
};

const FAMILY_FILES = {
  boardGame: '01-drustvena-igra',
  lunch: '02-porodicni-rucak',
  park: '03-setnja-u-parku',
  movieNight: '04-filmsko-vece',
  baking: '05-priprema-kolaca',
  picnic: '06-piknik',
  school: '07-odlazak-u-skolu',
};

const FATHERS_DAY_FILES = {
  banner: '01-volimo-tatu',
  ball: '02-igra-loptom',
  bedtime: '03-prica-za-laku-noc',
  bike: '04-voznja-bicikla',
  shoulders: '05-na-tatinim-ramenima',
  treehouse: '06-kucica-na-drvetu',
  fishing: '07-pecanje',
};

const EARTH_FILES = {
  hello: '01-vesela-zemlja',
  hands: '02-cuvajmo-planetu',
  space: '03-zemlja-u-svemiru',
  trees: '04-sadimo-drvece',
  recycling: '05-recikliranje',
  astronauts: '06-putovanje-oko-zemlje',
  friends: '07-prijatelji-planete',
};

const BICYCLE_FILES = {
  mountainBike: '01-brdski-bicikl',
  ride: '02-voznja-bicikla',
  family: '03-porodicna-voznja',
  trainingWheels: '04-pomocni-tockovi',
  race: '05-biciklisticka-trka',
  oldBike: '06-starinski-bicikl',
  iceCream: '07-sladoled-na-biciklu',
};

const WEATHER_FILES = {
  storm: '01-oluja',
  sunny: '02-suncan-dan',
  rain: '03-kisni-oblaci',
  windy: '04-vjetrovit-dan',
  snow: '05-snjezna-zima',
  puddles: '06-igra-na-kisi',
  rainbow: '07-duga-poslije-kise',
};

const MANNERS_FILES = {
  watering: '01-zalijevanje-biljke',
  sweeping: '02-ciscenje-dvorista',
  elderly: '03-pomoc-starijima',
  kitchen: '04-pomoc-u-kuhinji',
  study: '05-ucenje-i-red',
  words: '06-lijepe-rijeci',
  sharing: '07-dijeljenje-igracaka',
};

const TOOLS_FILES = {
  wrench: '01-kljuc-i-odvijac',
  pliers: '02-klijesta',
  shovels: '03-lopata-i-asov',
  roller: '04-valjak-za-krecenje',
  wheelbarrow: '05-kolica',
  saw: '06-rucna-testera',
  hammer: '07-cekic',
};

const FLOWERS_FILES = {
  bird: '01-pticica-na-grani',
  mandala: '02-cvjetna-mandala',
  vase: '03-vaza-sa-cvijecem',
  heart: '04-cvjetno-srce',
  basket: '05-korpa-sa-cvijecem',
  bee: '06-pcela-iznad-cvijeca',
  wreath: '07-cvjetni-vijenac',
};

const INSECTS_FILES = {
  bee: '01-pcelica',
  caterpillar: '02-gusjenica-na-panju',
  snailButterfly: '03-puz-i-leptir',
  butterfly: '04-leptir',
  ladybird: '05-bubamara-na-grani',
  ant: '06-mrav-na-livadi',
  dragonfly: '07-vilin-konjic',
};

const PIZZA_FILES = {
  slice: '01-parce-pice',
  board: '02-pica-na-dasci',
  box: '03-kutija-pice',
  chef: '04-pica-majstor',
  kids: '05-djeca-jedu-picu',
  happySlice: '06-veselo-parce-pice',
  ingredients: '07-sastojci-za-picu',
};

export const basketballPages = (labels: Labels) => pagesFrom('kosarka', BASKETBALL_FILES, labels.basketball);
export const summerPages = (labels: Labels) => pagesFrom('ljeto', SUMMER_FILES, labels.summer);
export const familyPages = (labels: Labels) => pagesFrom('porodica', FAMILY_FILES, labels.family);
export const fathersDayPages = (labels: Labels) => pagesFrom('dan-oceva', FATHERS_DAY_FILES, labels.fathersDay);
export const earthPages = (labels: Labels) => pagesFrom('planeta-zemlja', EARTH_FILES, labels.earth);
export const bicyclePages = (labels: Labels) => pagesFrom('bicikl', BICYCLE_FILES, labels.bicycle);
export const weatherPages = (labels: Labels) => pagesFrom('vrijeme', WEATHER_FILES, labels.weather);
export const mannersPages = (labels: Labels) => pagesFrom('lijepo-ponasanje', MANNERS_FILES, labels.manners);
export const toolsPages = (labels: Labels) => pagesFrom('alati', TOOLS_FILES, labels.tools);
export const flowersPages = (labels: Labels) => pagesFrom('cvijece', FLOWERS_FILES, labels.flowers);
export const insectsPages = (labels: Labels) => pagesFrom('insekti', INSECTS_FILES, labels.insects);
export const pizzaPages = (labels: Labels) => pagesFrom('pica', PIZZA_FILES, labels.pizza);
