// Deli se između rečnika (tekst igara), registra igara i vite.config.ts (sitemap), zato je u posebnom fajlu.
import type { Locale } from '../i18n/config';

export const GAME_IDS = [
  'balloons',
  'colors',
  'shapes',
  'trace',
  'dots',
  'maze',
  'memory',
  'pattern',
  'count',
  'sizes',
  'coloring',
  'letters',
] as const;

export type GameId = (typeof GAME_IDS)[number];

export const SKILLS = ['fine', 'eyeHand', 'logic', 'memory', 'counting'] as const;

export type Skill = (typeof SKILLS)[number];

export const TOY_COLORS = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'] as const;

export type ToyColor = (typeof TOY_COLORS)[number];

export const SHAPES = ['circle', 'square', 'triangle', 'star', 'heart'] as const;

export type Shape = (typeof SHAPES)[number];

// Sličice iz things.ts; ovde je samo spisak imena da rečnici ne bi uvozili ikone (i JSX).
export const THING_IDS = ['cat', 'dog', 'fish', 'bird', 'rabbit', 'turtle', 'snail', 'apple', 'star', 'flower', 'sun'] as const;

export type Thing = (typeof THING_IDS)[number];

export interface GameText {
  title: string;
  short: string;
  howTo: string;
}

export function isGameId(value: unknown): value is GameId {
  return typeof value === 'string' && (GAME_IDS as readonly string[]).includes(value);
}

// Radni listovi za štampu. Listovi sa istim id kao igra su njene papirne verzije (GamePlay linkuje na njih).
export const WORKSHEET_IDS = [
  'coloringClassroom',
  'coloringSeasons',
  'coloringSpring',
  'coloringSummer',
  'coloringAutumn',
  'coloringWinter',
  'coloringAnimals',
  'coloringSafari',
  'coloringPets',
  'coloringUnderwater',
  'coloringSubmarine',
  'coloringVehicles',
  'coloringConstruction',
  'coloringDino',
  'coloringCastle',
  'coloringSpace',
  'coloringProfessions',
  'coloringSports',
  'coloringMusic',
  'coloringBakery',
  'coloringLatin',
  'coloringCyrillic',
  'colorByNumber',
  'coloringScenes',
  'trace',
  'dots',
  'maze',
  'numbers',
  'latin',
  'cyrillic',
  'initialLetterLatin',
  'initialLetterCyrillic',
  'letterMatchLatin',
  'letterMatchCyrillic',
  'syllablesLatin',
  'syllablesCyrillic',
  'scriptBridge',
  'lines',
  'waves',
  'outlines',
  'colors',
  'count',
  'quantity',
  'adding',
  'subtraction',
  'compareNumbers',
  'missingNumbers',
  'sizes',
  'pattern',
  'odd',
  'match',
  'shapes',
  'differences',
  'symmetry',
  'copy',
  'testGrade1',
  'testGrade2',
  'testGrade3',
  'testGrade4',
  'testGrade5',
  'testMathOperations',
  'testLanguageGrammar',
  'testNatureSociety',
  'testReadingComprehension',
  'testMultiplicationDivision',
] as const;

export type WorksheetId = (typeof WORKSHEET_IDS)[number];

// Listovi koji imaju smisla samo na nekim jezicima; ostali su na svim.
export const WORKSHEET_LOCALES: Partial<Record<WorksheetId, readonly Locale[]>> = {
  cyrillic: ['sr', 'bs', 'hr'],
  coloringCyrillic: ['sr', 'bs', 'hr'],
  initialLetterCyrillic: ['sr', 'bs', 'hr'],
  letterMatchCyrillic: ['sr', 'bs', 'hr'],
  syllablesCyrillic: ['sr', 'bs', 'hr'],
  scriptBridge: ['sr', 'bs', 'hr'],
};

// Grupe na stranici igara; naslov grupe je u `t.games.worksheet.groups`.
export const WORKSHEET_GROUPS = {
  tests: [
    'testGrade1',
    'testGrade2',
    'testGrade3',
    'testGrade4',
    'testGrade5',
    'testMathOperations',
    'testLanguageGrammar',
    'testNatureSociety',
    'testReadingComprehension',
    'testMultiplicationDivision',
  ],
  coloring: [
    'coloringClassroom',
    'coloringSeasons',
    'coloringSpring',
    'coloringSummer',
    'coloringAutumn',
    'coloringWinter',
    'coloringAnimals',
    'coloringSafari',
    'coloringPets',
    'coloringUnderwater',
    'coloringSubmarine',
    'coloringVehicles',
    'coloringConstruction',
    'coloringDino',
    'coloringCastle',
    'coloringSpace',
    'coloringProfessions',
    'coloringSports',
    'coloringMusic',
    'coloringBakery',
    'coloringLatin',
    'coloringCyrillic',
    'colorByNumber',
    'coloringScenes',
    'colors',
  ],
  writing: [
    'latin',
    'cyrillic',
    'initialLetterLatin',
    'initialLetterCyrillic',
    'letterMatchLatin',
    'letterMatchCyrillic',
    'syllablesLatin',
    'syllablesCyrillic',
    'scriptBridge',
    'numbers',
  ],
  motor: ['trace', 'lines', 'waves', 'outlines', 'dots', 'maze'],
  math: ['count', 'quantity', 'adding', 'subtraction', 'compareNumbers', 'missingNumbers', 'sizes'],
  logic: ['pattern', 'odd', 'match', 'shapes', 'differences', 'symmetry', 'copy'],
} as const satisfies Record<string, readonly WorksheetId[]>;

export type WorksheetGroup = keyof typeof WORKSHEET_GROUPS;

export function isWorksheetId(value: unknown): value is WorksheetId {
  return typeof value === 'string' && (WORKSHEET_IDS as readonly string[]).includes(value);
}

export function hasWorksheet(id: GameId): id is GameId & WorksheetId {
  return isWorksheetId(id);
}

export function worksheetsFor(locale: Locale): WorksheetId[] {
  return WORKSHEET_IDS.filter((id) => WORKSHEET_LOCALES[id]?.includes(locale) ?? true);
}
