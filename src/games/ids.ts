// Deli se između rečnika (tekst igara) i registra igara, zato je u posebnom fajlu.
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
] as const;

export type GameId = (typeof GAME_IDS)[number];

export const SKILLS = ['fine', 'eyeHand', 'logic', 'memory', 'counting'] as const;

export type Skill = (typeof SKILLS)[number];

export const TOY_COLORS = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'] as const;

export type ToyColor = (typeof TOY_COLORS)[number];

export const SHAPES = ['circle', 'square', 'triangle', 'star', 'heart'] as const;

export type Shape = (typeof SHAPES)[number];

export interface GameText {
  title: string;
  short: string;
  howTo: string;
}

export function isGameId(value: unknown): value is GameId {
  return typeof value === 'string' && (GAME_IDS as readonly string[]).includes(value);
}
