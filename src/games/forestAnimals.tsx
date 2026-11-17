// Bojanka „Šumske životinje“: autorove ilustracije (public/slike/bojanke/sumske-zivotinje/).
// Vodeni žig i potpis su upisani u same slike (ImageMagick), pa ostaju i kad se slika preuzme sa sajta.
import type { ReactNode } from 'react';
import type { Dictionary } from '../i18n/dictionaries';

type Labels = Dictionary['games']['worksheet']['labels'];

export const FOREST_ANIMALS = ['bear', 'fox', 'hedgehog', 'owl', 'rabbit', 'fawn', 'squirrel', 'raccoon', 'frog'] as const;

export type ForestAnimal = (typeof FOREST_ANIMALS)[number];

const FILES: Record<ForestAnimal, string> = {
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

export const forestAnimalImage = (id: ForestAnimal) => `/slike/bojanke/sumske-zivotinje/${FILES[id]}.jpg`;

function AnimalPage({ id, labels }: { id: ForestAnimal; labels: Labels }) {
  const a = labels.forestAnimals[id];
  return (
    <figure className="mx-auto grid w-full max-w-[142mm] gap-[2.5mm]">
      {/* Slika 3:4; širina 142 mm daje ~189 mm visine, pa sa imenom i zanimljivošću staje na A4. */}
      <img src={forestAnimalImage(id)} alt={a.name} loading="eager" decoding="sync" className="block h-auto w-full" />
      <figcaption className="text-center">
        <span className="block font-head text-[22px] leading-tight font-bold">{a.name}</span>
        <span className="mt-1 block text-[14px] leading-snug text-[#374151]">💡 {a.fact}</span>
      </figcaption>
    </figure>
  );
}

export function forestAnimalsPages(labels: Labels): ReactNode[] {
  return FOREST_ANIMALS.map((id) => <AnimalPage key={id} id={id} labels={labels} />);
}
