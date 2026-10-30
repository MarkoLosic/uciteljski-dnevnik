import { Apple, Bird, Cat, Dog, Fish, Flower, Rabbit, Snail, Star, Sun, Turtle, type LucideIcon } from 'lucide-react';
import { toyHex } from './shared';

// Sličice za pamćenje, brojanje i redanje po veličini. Ime (ključ) se prevodi u `t.games.things`.
export const THINGS = {
  cat: { Icon: Cat, color: toyHex.orange },
  dog: { Icon: Dog, color: toyHex.blue },
  fish: { Icon: Fish, color: toyHex.blue },
  bird: { Icon: Bird, color: toyHex.red },
  rabbit: { Icon: Rabbit, color: toyHex.purple },
  turtle: { Icon: Turtle, color: toyHex.green },
  snail: { Icon: Snail, color: toyHex.orange },
  apple: { Icon: Apple, color: toyHex.red },
  star: { Icon: Star, color: toyHex.yellow },
  flower: { Icon: Flower, color: toyHex.purple },
  sun: { Icon: Sun, color: toyHex.yellow },
} satisfies Record<string, { Icon: LucideIcon; color: string }>;

export type Thing = keyof typeof THINGS;

export const THING_NAMES = Object.keys(THINGS) as Thing[];
