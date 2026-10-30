import { Link } from 'react-router-dom';
import { Hand, HeartHandshake, Timer, type LucideIcon } from 'lucide-react';
import PixelIcon from '../components/PixelIcon';
import { useLocale } from '../i18n/LocaleContext';
import { GAME_IDS } from '../games/ids';
import { games } from '../games/registry';

const tipIcons: LucideIcon[] = [HeartHandshake, Timer, Hand];

export default function Games() {
  const { t, paths } = useLocale();
  const g = t.games;

  return (
    <div className="wrap pt-[130px]">
      <header className="max-w-[760px]">
        <span className="eyebrow">{g.eyebrow}</span>
        <h1 className="page-title mt-2 mb-5">{g.title}</h1>
        <p className="text-lg text-muted sm:text-xl">{g.intro}</p>
        <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13.5px] text-muted">
          <i className="status-dot" />
          {g.age}
        </p>
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
