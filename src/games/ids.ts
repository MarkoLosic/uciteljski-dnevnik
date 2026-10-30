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

// Radni listovi za štampu. Prva tri su papirne verzije igara (isti id kao igra), ostali su samostalni.
export const WORKSHEET_IDS = ['trace', 'dots', 'maze', 'numbers', 'latin', 'cyrillic'] as const;

export type WorksheetId = (typeof WORKSHEET_IDS)[number];

// Listovi koji imaju smisla samo na nekim jezicima; ostali su na svim.
export const WORKSHEET_LOCALES: Partial<Record<WorksheetId, readonly Locale[]>> = {
  cyrillic: ['sr', 'bs'],
};

export function isWorksheetId(value: unknown): value is WorksheetId {
  return typeof value === 'string' && (WORKSHEET_IDS as readonly string[]).includes(value);
}

export function hasWorksheet(id: GameId): id is GameId & WorksheetId {
  return isWorksheetId(id);
}

export function worksheetsFor(locale: Locale): WorksheetId[] {
  return WORKSHEET_IDS.filter((id) => WORKSHEET_LOCALES[id]?.includes(locale) ?? true);
}
