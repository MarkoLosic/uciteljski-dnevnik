import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Gamepad2, GraduationCap, Palette, Printer } from 'lucide-react';
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
  colors: '/slike/bojanke/oboji-oblike.svg',
};

const GROUP_ORDER: WorksheetGroup[] = ['books', 'tests', 'coloring', 'time', 'writing', 'motor', 'math', 'logic'];

const GROUP_SHORT_LABELS: Record<string, Record<WorksheetGroup, string>> = {
  sr: {
    books: 'Priručnici i vježbanke',
    tests: 'Testovi (3 nivoa)',
    coloring: 'Bojanke',
    writing: 'Pisanje i slova',
    motor: 'Grafomotorika',
    math: 'Matematika',
    logic: 'Logika i pažnja',
    time: 'Vrijeme i sat',
  },
  bs: {
    books: 'Priručnici i vježbanke',
    tests: 'Testovi (3 nivoa)',
    coloring: 'Bojanke',
    writing: 'Pisanje i slova',
    motor: 'Grafomotorika',
    math: 'Matematika',
    logic: 'Logika i pažnja',
    time: 'Vrijeme i sat',
  },
  hr: {
    books: 'Priručnici i vježbenice',
    tests: 'Testovi (3 razine)',
    coloring: 'Bojanke',
    writing: 'Pisanje i slova',
    motor: 'Grafomotorika',
    math: 'Matematika',
    logic: 'Logika i pažnja',
    time: 'Vrijeme i sat',
  },
  en: {
    books: 'Handbooks & Workbooks',
    tests: 'Tests (3 levels)',
    coloring: 'Coloring',
    writing: 'Letters & Writing',
    motor: 'Motor Skills',
    math: 'Math & Numbers',
    logic: 'Logic & Focus',
    time: 'Time & Clock',
  },
  de: {
    books: 'Handbücher & Übungshefte',
    tests: 'Tests (3 Stufen)',
    coloring: 'Ausmalbilder',
    writing: 'Schreiben & Buchstaben',
    motor: 'Feinmotorik',
    math: 'Mathematik',
    logic: 'Logik & Fokus',
    time: 'Zeit & Uhr',
  },
};

export default function WorksheetsPage() {
  const { locale, t, paths } = useLocale();
  const g = t.games;
  const sheetIds = worksheetsFor(locale);
  const [selectedGroup, setSelectedGroup] = useState<WorksheetGroup | 'all'>('all');

  const shortLabels = GROUP_SHORT_LABELS[locale] || GROUP_SHORT_LABELS.sr;

  usePageMeta({
    title: `${g.worksheet.sectionTitle} | ${t.site.tagline}`,
    description: g.worksheet.sectionText,
  });

  const displayedGroups = selectedGroup === 'all' ? GROUP_ORDER : [selectedGroup];

  return (
    <div className="wrap pt-[96px] sm:pt-[130px]">
      <header className="max-w-[800px]">
        <div className="flex items-center gap-2">
          <span className="eyebrow">{g.worksheet.sectionEyebrow}</span>
        </div>
        <h1 className="page-title mt-2 mb-4 sm:mb-5">{g.worksheet.sectionTitle}</h1>
        <p className="text-base sm:text-xl text-muted leading-relaxed">{g.worksheet.sectionText}</p>
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs sm:px-3.5 sm:py-1.5 sm:text-[13.5px] text-muted">
            <Printer aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
            {sheetIds.length} radnih listova i bojanki
          </p>
          <Link
            to={paths.games}
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-accent/40 bg-surface-2 px-3 py-1 text-xs sm:px-3.5 sm:py-1.5 sm:text-[13.5px] font-semibold text-accent transition-colors hover:border-accent"
          >
            <Gamepad2 aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {t.nav.games}
          </Link>
        </div>
      </header>

      {/* Filter kategorija: Horizontalno skrolovanje na telefonu, raspodela na većim ekranima */}
      <nav aria-label="Kategorije bojanki i radnih listova" className="mt-8 sm:mt-10 flex gap-2 border-b border-line pb-3 sm:pb-4 overflow-x-auto no-scrollbar sm:flex-wrap">
        <button
          type="button"
          onClick={() => setSelectedGroup('all')}
          className={`focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold transition-all ${
            selectedGroup === 'all'
              ? 'bg-accent text-accent-ink shadow-sm'
              : 'border border-line bg-surface text-muted hover:bg-surface-2 hover:text-ink'
          }`}
        >
          {locale === 'en' ? 'All' : locale === 'de' ? 'Alle' : 'Sve'} ({sheetIds.length})
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
              className={`focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-accent text-accent-ink shadow-sm'
                  : 'border border-line bg-surface text-muted hover:bg-surface-2 hover:text-ink'
              }`}
            >
              {group === 'books' && <BookOpen aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              {group === 'tests' && <GraduationCap aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              {group === 'coloring' && <Palette aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              {group === 'time' && <Clock aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              {shortLabels[group]} ({count})
            </button>
          );
        })}
      </nav>

      {/* Spisak listova po grupama */}
      <div className="mt-8 sm:mt-10 space-y-10 sm:space-y-14">
        {displayedGroups.map((group) => {
          const ids = WORKSHEET_GROUPS[group].filter((id) => sheetIds.includes(id));
          if (!ids.length) return null;

          return (
            <section key={group} aria-labelledby={`naslov-${group}`}>
              <div className="mb-4 sm:mb-5 flex items-center justify-between border-b border-line/60 pb-2.5 sm:pb-3">
                <h2 id={`naslov-${group}`} className="text-lg font-bold tracking-tight sm:text-2xl flex items-center gap-2 sm:gap-2.5">
                  {group === 'books' && <BookOpen aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />}
                  {group === 'tests' && <GraduationCap aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />}
                  {group === 'coloring' && <Palette aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />}
                  {group === 'time' && <Clock aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />}
                  {g.worksheet.groups[group]}
                </h2>
                <span className="font-mono text-xs font-semibold text-muted">
                  {ids.length} {group === 'tests' ? 'testova' : group === 'coloring' ? 'bojanki' : group === 'books' ? 'izdanja' : 'listova'}
                </span>
              </div>
              <ul className="grid gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {ids.map((id) => {
                  const thumb = WORKSHEET_THUMBNAILS[id];
                  const sheetInfo = g.worksheet.sheets[id];
                  const cleanTitle = sheetInfo.title.replace(/^Bojanka:\s*/i, '');
                  return (
                    <li key={id}>
                      <Link
                        to={paths.worksheet(id)}
                        className="card focus-ring group flex h-full flex-col justify-between p-3.5 sm:p-4 transition-transform hover:-translate-y-1"
                      >
                        <div className="flex items-start gap-3">
                          {thumb ? (
                            <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border border-line bg-white shadow-xs group-hover:scale-105 transition-transform flex items-center justify-center p-1">
                              <img src={thumb} alt="" className="h-full w-full object-contain" />
                            </div>
                          ) : (
                            <span className="icon-tile shrink-0">
                              {group === 'tests' ? (
                                <GraduationCap aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                              ) : group === 'coloring' ? (
                                <Palette aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                              ) : group === 'time' ? (
                                <Clock aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                              ) : (
                                <Printer aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
                              )}
                            </span>
                          )}
                          <div className="min-w-0 flex-1">
                            <span className="inline-block rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-semibold text-muted">
                              {group === 'tests' ? 'Test · 3 nivoa' : group === 'coloring' ? 'Bojanka · A4' : group === 'books' ? 'Priručnik · A4' : `${g.worksheet.eyebrow} · A4`}
                            </span>
                            <h3 className="mt-1 text-[15px] sm:text-[16px] font-semibold tracking-tight leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                              {cleanTitle}
                            </h3>
                          </div>
                        </div>
                        <p className="mt-2.5 sm:mt-3 text-xs text-muted line-clamp-2">
                          {sheetInfo.text}
                        </p>
                        <div className="mt-3 sm:mt-3.5 flex items-center justify-between border-t border-line/50 pt-2.5 text-xs font-semibold text-accent">
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
