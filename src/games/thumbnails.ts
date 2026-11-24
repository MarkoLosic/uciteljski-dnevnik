import type { WorksheetId } from './ids';

// Sličice radnih listova (kartice na stranici listova i og:image u statičnom HTML-u — vite.config.ts).
// Deli se sa vite.config.ts, pa ne sme uvoziti ništa zavisno od okruženja.
export const WORKSHEET_THUMBNAILS: Partial<Record<string, string>> = {
  coloringClassroom: '/slike/bojanke/ucionica-i-skola.jpg',
  coloringSeasons: '/slike/bojanke/cetiri-godisnja-doba.jpg',
  coloringSpring: '/slike/bojanke/prolece-i-pcelice.jpg',
  coloringSummer: '/slike/bojanke/leto-na-plazi.jpg',
  coloringAutumn: '/slike/bojanke/jesen-u-sumi.jpg',
  coloringWinter: '/slike/bojanke/zimske-radosti.svg',
  coloringAnimals: '/slike/bojanke/zivotinje-na-farmi.jpg',
  coloringSafari: '/slike/bojanke/safari-dzungla.svg',
  coloringPets: '/slike/bojanke/kucni-ljubimci.jpg',
  coloringUnderwater: '/slike/bojanke/podvodni-svet.jpg',
  coloringSubmarine: '/slike/bojanke/podmornica-i-blago.svg',
  coloringVehicles: '/slike/bojanke/saobracaj-i-vozila.jpg',
  coloringConstruction: '/slike/bojanke/gradjevinske-masine.jpg',
  coloringDino: '/slike/bojanke/dinosauri-avantura.jpg',
  coloringCastle: '/slike/bojanke/dvorac-i-bajka.jpg',
  coloringSpace: '/slike/bojanke/svemir-i-kosmonauti.jpg',
  coloringProfessions: '/slike/bojanke/zanimanja-ljudi.svg',
  coloringSports: '/slike/bojanke/sport-i-igra.jpg',
  coloringMusic: '/slike/bojanke/muzika-i-instrumenti.svg',
  coloringBakery: '/slike/bojanke/pekara-i-kolaci.svg',
  coloringLatin: '/slike/bojanke/slova-latinica.svg',
  coloringCyrillic: '/slike/bojanke/slova-cirilica.svg',
  colorByNumber: '/slike/bojanke/bojenje-po-brojevima.svg',
  coloringScenes: '/slike/bojanke/velika-bojanka.svg',
  coloringCircus: '/slike/bojanke/cirkus-i-madjionicar.svg',
  coloringJungle: '/slike/bojanke/tropska-dzungla.svg',
  coloringRobot: '/slike/bojanke/prijateljski-robot.svg',
  coloringGarden: '/slike/bojanke/veseli-vrt.svg',
  coloringPirates: '/slike/bojanke/gusarski-brod.svg',
  coloringFair: '/slike/bojanke/zabavni-park.svg',
  colors: '/slike/bojanke/oboji-oblike.svg',
  coloringForestAnimals: '/slike/bojanke/sumske-zivotinje/02-lisica.jpg',
  coloringPuppies: '/slike/bojanke/stenci/02-igra-s-loptom.jpg',
  coloringBunnies: '/slike/bojanke/zecici/04-ispod-duge.jpg',
  coloringCars: '/slike/bojanke/auta/02-trkaci-auto.jpg',
  coloringFruitVeg: '/slike/bojanke/voce-i-povrce/01-veseli-prijatelji.jpg',
  coloringLeaves: '/slike/bojanke/lisce/08-vjeverica-na-ljuljasci.jpg',
  coloringNumbers: '/slike/bojanke/brojevi/01-jedan-dva-tri.jpg',
  coloringBasketball: '/slike/bojanke/kosarka/01-sut-na-kos.jpg',
  coloringSummerDays: '/slike/bojanke/ljeto/05-dvorac-od-pijeska.jpg',
  coloringFamily: '/slike/bojanke/porodica/06-piknik.jpg',
  coloringFathersDay: '/slike/bojanke/dan-oceva/05-na-tatinim-ramenima.jpg',
  coloringEarth: '/slike/bojanke/planeta-zemlja/07-prijatelji-planete.jpg',
  coloringBicycle: '/slike/bojanke/bicikl/03-porodicna-voznja.jpg',
  coloringWeather: '/slike/bojanke/vrijeme/07-duga-poslije-kise.jpg',
  coloringManners: '/slike/bojanke/lijepo-ponasanje/06-lijepe-rijeci.jpg',
  coloringTools: '/slike/bojanke/alati/07-cekic.jpg',
  coloringFlowers: '/slike/bojanke/cvijece/04-cvjetno-srce.jpg',
  coloringInsects: '/slike/bojanke/insekti/04-leptir.jpg',
  coloringPizza: '/slike/bojanke/pica/06-veselo-parce-pice.jpg',
};

// Svaki radni list ima JPG sličicu za og:image i Google Slike: postojeću ilustraciju ili generisanu 1200×630 karticu.
export function worksheetOgImage(id: WorksheetId): string {
  const thumb = WORKSHEET_THUMBNAILS[id];
  if (thumb && (thumb.endsWith('.jpg') || thumb.endsWith('.png'))) return thumb;
  return `/slike/og-listovi/${id}.jpg`;
}
