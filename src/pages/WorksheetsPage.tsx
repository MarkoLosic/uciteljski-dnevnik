import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Palette, Printer, Sparkles } from 'lucide-react';
import PixelIcon from '../components/PixelIcon';
import { useLocale } from '../i18n/LocaleContext';
import { WORKSHEET_GROUPS, worksheetsFor, type WorksheetGroup } from '../games/ids';
import { usePageMeta } from '../lib/usePageMeta';

export const WORKSHEET_THUMBNAILS: Partial<Record<string, string>> = {
  coloringClassroom: '/slike/bojanke/ucionica-i-skola.jpg',
  coloringSeasons: '/slike/bojanke/cetiri-godisnja-doba.jpg',
  coloringSpring: '/slike/bojanke/prolece-i-pcelice.jpg',
  coloringSummer: '/slike/bojanke/leto-na-plazi.jpg',
  coloringAutumn: '/slike/bojanke/jesen-u-sumi.jpg',
  coloringAnimals: '/slike/bojanke/zivotinje-na-farmi.jpg',
  coloringPets: '/slike/bojanke/kucni-ljubimci.jpg',
  coloringUnderwater: '/slike/bojanke/podvodni-svet.jpg',
  coloringVehicles: '/slike/bojanke/saobracaj-i-vozila.jpg',
  coloringConstruction: '/slike/bojanke/gradjevinske-masine.jpg',
  coloringDino: '/slike/bojanke/dinosauri-avantura.jpg',
  coloringCastle: '/slike/bojanke/dvorac-i-bajka.jpg',
  coloringSpace: '/slike/bojanke/svemir-i-kosmonauti.jpg',
  coloringSports: '/slike/bojanke/sport-i-igra.jpg',
};

const GROUP_ORDER: WorksheetGroup[] = ['coloring', 'writing', 'motor', 'math', 'logic'];

export default function WorksheetsPage() {
  const { locale, t, paths } = useLocale();
  const g = t.games;
  const sheetIds = worksheetsFor(locale);
  const [selectedGroup, setSelectedGroup] = useState<WorksheetGroup | 'all'>('all');

  usePageMeta({
    title: `${g.worksheet.sectionTitle} | ${t.site.tagline}`,
    description: g.worksheet.sectionText,
  });

  const displayedGroups = selectedGroup === 'all' ? GROUP_ORDER : [selectedGroup];

  return (
    <div className="wrap pt-[130px]">
      <header className="max-w-[800px]">
        <div className="flex items-center gap-2">
          <span className="eyebrow">{g.worksheet.sectionEyebrow}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
            <Sparkles aria-hidden="true" className="h-3 w-3" />
            A4 štampa
          </span>
        </div>
        <h1 className="page-title mt-2 mb-5">{g.worksheet.sectionTitle}</h1>
        <p className="text-lg text-muted sm:text-xl">{g.worksheet.sectionText}</p>
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13.5px] text-muted">
            <Printer aria-hidden="true" className="h-4 w-4 text-accent" />
            {sheetIds.length} radnih listova i bojanki
          </p>
          <Link
            to={paths.games}
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-accent/40 bg-surface-2 px-3.5 py-1.5 text-[13.5px] font-semibold text-accent transition-colors hover:border-accent"
          >
            <Gamepad2 aria-hidden="true" className="h-4 w-4" />
            {t.nav.games}
          </Link>
        </div>
      </header>

      {/* Filter kategorija */}
      <nav aria-label="Kategorije bojanki i radnih listova" className="mt-10 flex flex-wrap gap-2 border-b border-line pb-4">
        <button
          type="button"
          onClick={() => setSelectedGroup('all')}
          className={`focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
            selectedGroup === 'all'
              ? 'bg-accent text-accent-ink shadow-sm'
              : 'border border-line bg-surface text-muted hover:bg-surface-2 hover:text-ink'
          }`}
        >
          Sve ({sheetIds.length})
        </button>
        {GROUP_ORDER.map((group) => {
          const count = WORKSHEET_GROUPS[group].filter((id) => sheetIds.includes(id)).length;
          if (count === 0) return null;
          const isActive = selectedGroup === group;
          return (
            <button
              key={group}
              type="button"
              onClick={() => setSelectedGroup(group)}
              className={`focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-accent text-accent-ink shadow-sm'
                  : 'border border-line bg-surface text-muted hover:bg-surface-2 hover:text-ink'
              }`}
            >
              {group === 'coloring' && <Palette aria-hidden="true" className="h-4 w-4" />}
              {g.worksheet.groups[group]} ({count})
            </button>
          );
        })}
      </nav>

      {/* Spisak listova po grupama */}
      <div className="mt-10 space-y-14">
        {displayedGroups.map((group) => {
          const ids = WORKSHEET_GROUPS[group].filter((id) => sheetIds.includes(id));
          if (!ids.length) return null;

          return (
            <section key={group} aria-labelledby={`naslov-${group}`}>
              <div className="mb-5 flex items-center justify-between border-b border-line/60 pb-3">
                <h2 id={`naslov-${group}`} className="text-xl font-bold tracking-tight sm:text-2xl flex items-center gap-2.5">
                  {group === 'coloring' && <Palette aria-hidden="true" className="h-6 w-6 text-accent" />}
                  {g.worksheet.groups[group]}
                </h2>
                <span className="font-mono text-xs font-semibold text-muted">
                  {ids.length} {group === 'coloring' ? 'bojanki' : 'listova'}
                </span>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {ids.map((id) => {
                  const thumb = WORKSHEET_THUMBNAILS[id];
                  const sheetInfo = g.worksheet.sheets[id];
                  return (
                    <li key={id}>
                      <Link
                        to={paths.worksheet(id)}
                        className="card focus-ring group flex h-full flex-col justify-between p-4 transition-transform hover:-translate-y-1"
                      >
                        <div className="flex items-start gap-3.5">
                          {thumb ? (
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line bg-white shadow-xs group-hover:scale-105 transition-transform">
                              <img src={thumb} alt="" className="h-full w-full object-cover" />
                            </div>
                          ) : (
                            <span className="icon-tile shrink-0">
                              {group === 'coloring' ? (
                                <Palette aria-hidden="true" className="h-6 w-6 text-accent" />
                              ) : (
                                <Printer aria-hidden="true" className="h-6 w-6" />
                              )}
                            </span>
                          )}
                          <div className="min-w-0 flex-1">
                            <span className="inline-block rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-semibold text-muted">
                              {group === 'coloring' ? 'Bojanka · A4' : `${g.worksheet.eyebrow} · A4`}
                            </span>
                            <h3 className="mt-1 text-[16px] font-semibold tracking-tight leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                              {sheetInfo.title}
                            </h3>
                          </div>
                        </div>
                        <p className="mt-3 text-xs text-muted line-clamp-2">
                          {sheetInfo.text}
                        </p>
                        <div className="mt-3.5 flex items-center justify-between border-t border-line/50 pt-2.5 text-xs font-semibold text-accent">
                          <span className="inline-flex items-center gap-1.5">
                            <Printer aria-hidden="true" className="h-3.5 w-3.5" />
                            Otvori za štampu
                          </span>
                          <PixelIcon name="arrow" size={12} />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Promotivni baner za digitalne igre */}
      <section className="pt-20 sm:pt-24" aria-labelledby="igre-promo">
        <div className="card border-accent/30 bg-surface-2/60 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-[620px]">
            <span className="eyebrow">{g.eyebrow}</span>
            <h2 id="igre-promo" className="section-title mt-1.5 mb-2.5">
              {g.title}
            </h2>
            <p className="text-[15.5px] text-muted">{g.intro}</p>
          </div>
          <Link to={paths.games} className="btn btn-primary focus-ring shrink-0">
            <Gamepad2 aria-hidden="true" className="h-5 w-5" />
            {t.nav.games}
            <PixelIcon name="arrow" />
          </Link>
        </div>
      </section>

      {/* Promotivni baner za pripreme */}
      <section className="pt-12 sm:pt-16 pb-16" aria-labelledby="pripreme-za-nastavu">
        <div className="card border-line p-6 sm:p-8">
          <span className="eyebrow">{t.pripremePromo.eyebrow}</span>
          <h2 id="pripreme-za-nastavu" className="section-title mt-2 mb-3">
            {t.pripremePromo.title}
          </h2>
          <p className="max-w-[760px] text-[15.5px] text-muted">{t.pripremePromo.desc}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <a href="/pripreme/index.html" className="btn btn-primary focus-ring">
              {t.pripremePromo.ctaAll}
              <PixelIcon name="arrow" />
            </a>
            {[1, 2, 3, 4, 5].map((r) => (
              <a
                key={r}
                href={`/pripreme/index.html?razred=${r}`}
                className="btn btn-ghost focus-ring text-sm"
              >
                {t.pripremePromo.gradeLabel(r)}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
