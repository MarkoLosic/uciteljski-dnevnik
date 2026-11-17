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
