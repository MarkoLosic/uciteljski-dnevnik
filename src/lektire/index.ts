import type { Locale } from '../i18n/config';
import { lektireBs } from './bs';
import { lektireSr } from './sr';
import type { LektireSadrzaj } from './types';

export const LEKTIRE: Partial<Record<Locale, LektireSadrzaj>> = { sr: lektireSr, bs: lektireBs };
