import type { Locale } from './config';
import { sr, type Dictionary } from './locales/sr';
import { en } from './locales/en';
import { hr } from './locales/hr';
import { bs } from './locales/bs';
import { de } from './locales/de';

export const dictionaries: Record<Locale, Dictionary> = { sr, en, hr, bs, de };

export type { Dictionary };
