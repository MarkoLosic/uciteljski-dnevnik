import { siteConfig } from '../config/site';
import type { Dictionary } from '../i18n/dictionaries';
import type { GameId, WorksheetId } from '../games/ids';
import type { CountryFrontmatter } from '../types/country';

// Deli se između stranica (usePageMeta) i vite.config.ts (statični HTML po ruti, RSS),
// zato ne sme da uvozi ništa što zavisi od okruženja.

export interface PageMetaText {
  title: string | null; // bez imena sajta; `null` = početna („Ime sajta — tagline“)
  description: string;
}

export function documentTitle(title: string | null, t: Dictionary): string {
  return title ? `${title} — ${siteConfig.name}` : `${siteConfig.name} — ${t.site.tagline}`;
}

export const pageMeta = {
  home: (t: Dictionary): PageMetaText => ({ title: null, description: t.site.description }),
  blog: (t: Dictionary): PageMetaText => ({ title: t.blog.title, description: t.blog.description }),
  about: (t: Dictionary): PageMetaText => ({ title: t.about.title, description: t.about.description }),
  games: (t: Dictionary): PageMetaText => ({ title: t.games.title, description: t.games.intro }),
  game: (t: Dictionary, id: GameId): PageMetaText => ({
    title: `${t.games.list[id].title} — ${t.games.title}`,
    description: t.games.list[id].short,
  }),
  world: (t: Dictionary): PageMetaText => ({ title: t.world.title, description: t.world.description }),
  country: (t: Dictionary, country: Pick<CountryFrontmatter, 'name' | 'excerpt'>): PageMetaText => ({
    title: `${country.name} — ${t.world.title}`,
    description: country.excerpt,
  }),
  worksheet: (t: Dictionary, id: WorksheetId): PageMetaText => ({
    title: `${t.games.worksheet.eyebrow}: ${t.games.worksheet.sheets[id].title}`,
    description: t.games.worksheet.sheets[id].text,
  }),
};
