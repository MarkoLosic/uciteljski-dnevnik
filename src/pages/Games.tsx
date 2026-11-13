import { Link } from 'react-router-dom';
import { Hand, HeartHandshake, Palette, Timer, type LucideIcon } from 'lucide-react';
import PixelIcon from '../components/PixelIcon';
import { useLocale } from '../i18n/LocaleContext';
import { GAME_IDS, worksheetsFor } from '../games/ids';
import { games } from '../games/registry';
import { usePageMeta } from '../lib/usePageMeta';
import { pageMeta } from '../lib/seo';

const tipIcons: LucideIcon[] = [HeartHandshake, Timer, Hand];

export default function Games() {
  const { locale, t, paths } = useLocale();
  const g = t.games;
  const sheetIds = worksheetsFor(locale);
  usePageMeta(pageMeta.games(t));

  return (
    <div className="wrap pt-[130px]">
      <header className="max-w-[760px]">
        <span className="eyebrow">{g.eyebrow}</span>
        <h1 className="page-title mt-2 mb-5">{g.title}</h1>
        <p className="text-lg text-muted sm:text-xl">{g.intro}</p>
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13.5px] text-muted">
            <i className="status-dot" />
            {g.age}
          </p>
          <Link
            to={paths.worksheets}
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-accent/40 bg-surface-2 px-3.5 py-1.5 text-[13.5px] font-semibold text-accent transition-colors hover:border-accent"
          >
            <Palette aria-hidden="true" className="h-4 w-4" />
            {t.nav.worksheets} ({sheetIds.length})
          </Link>
        </div>
      </header>

      <ul className="mt-12 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {GAME_IDS.map((id, i) => {
          const { Icon, color, skills } = games[id];
          const text = g.list[id];
          return (
            <li key={id}>
              <Link
                to={paths.game(id)}
                className="card focus-ring group flex h-full flex-col hover:-translate-y-1"
                style={{ ['--c' as string]: color }}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="grid h-14 w-14 place-items-center rounded-2xl transition-transform group-hover:scale-110 group-hover:-rotate-6"
                    style={{ background: `color-mix(in srgb, ${color} 16%, transparent)`, color }}
                  >
                    <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={2.2} />
                  </span>
                  <span className="font-mono text-xs font-medium tracking-[0.08em] text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="mt-5 text-xl font-semibold tracking-tight">{text.title}</h2>
                <p className="mt-2 flex-1 text-[15px] text-muted">{text.short}</p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="cat">
                      {g.skills[skill]}
                    </span>
                  ))}
                  <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    {g.play}
                    <PixelIcon name="arrow" size={14} />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Promotivni baner koji vodi na zasebnu stranicu Bojanki i radnih listova */}
      <section className="pt-20 sm:pt-28" aria-labelledby="bojanke-promo">
        <div className="card border-accent/30 bg-surface-2/60 p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-[640px]">
            <span className="eyebrow">{g.worksheet.sectionEyebrow}</span>
            <h2 id="bojanke-promo" className="section-title mt-2 mb-3">
              {g.worksheet.sectionTitle}
            </h2>
            <p className="text-[15.5px] text-muted">
              {g.worksheet.sectionText}
            </p>
          </div>
          <Link to={paths.worksheets} className="btn btn-primary focus-ring shrink-0">
            <Palette aria-hidden="true" className="h-5 w-5" />
            {t.nav.worksheets} ({sheetIds.length})
            <PixelIcon name="arrow" />
          </Link>
        </div>
      </section>

      <section className="pt-20 sm:pt-28" aria-labelledby="pripreme-za-nastavu">
        <div className="card border-accent/30 bg-surface-2/60 p-6 sm:p-8">
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

      <section className="pt-20 sm:pt-28" aria-labelledby="za-odrasle">
        <span className="eyebrow">{g.tipsEyebrow}</span>
        <h2 id="za-odrasle" className="section-title mb-9">
          {g.tipsTitle}
        </h2>
        <ul className="grid gap-[18px] md:grid-cols-3">
          {g.tips.map(({ title, text }, i) => {
            const Icon = tipIcons[i] ?? Hand;
            return (
              <li key={title} className="card">
                <span className="icon-tile">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-[19px] font-semibold tracking-tight">{title}</h3>
                <p className="mt-2.5 text-[15px] text-muted">{text}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
