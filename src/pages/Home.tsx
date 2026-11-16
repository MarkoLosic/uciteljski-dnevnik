import { Link } from 'react-router-dom';
import {
  BookOpen,
  BookOpenCheck,
  ClipboardList,
  FileCheck2,
  FileSpreadsheet,
  GraduationCap,
  Layers,
  Printer,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { getRecentPosts } from '../lib/posts';
import PostCard from '../components/PostCard';
import EmptyState from '../components/EmptyState';
import Icon from '../components/Icon';
import { useLocale } from '../i18n/LocaleContext';
import { usePageMeta } from '../lib/usePageMeta';
import { pageMeta } from '../lib/seo';

const statIcons: LucideIcon[] = [BookOpenCheck, Layers, Printer, FileCheck2];
const pillarIcons: LucideIcon[] = [BookOpen, Users, FileSpreadsheet, ClipboardList, Sparkles, GraduationCap];

export default function Home() {
  const { locale, t, paths } = useLocale();
  const recentPosts = getRecentPosts(locale, 3);
  usePageMeta(pageMeta.home(t));

  return (
    <>
      {/* Uvodna sekcija posvećena učiteljima i svakodnevnom radu u školi */}
      <section className="wrap grid items-center gap-8 sm:gap-10 pt-[96px] sm:pt-[120px] pb-12 sm:pb-16 lg:min-h-[88svh] lg:grid-cols-[1.12fr_.88fr] lg:gap-12 lg:pt-[134px]">
        <div>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13.5px] font-medium text-muted">
            <i className="status-dot" />
            {t.home.heroBadge}
          </span>
          <h1 className="mt-5 mb-5 font-head text-[clamp(34px,5.2vw,64px)] leading-[1.06] font-bold tracking-[-0.035em] text-balance">
            {t.home.heroTitleBefore}
            <span className="grad">{t.home.heroTitleHighlight}</span>
          </h1>
          <p className="max-w-[620px] text-[clamp(16px,1.5vw,18.5px)] leading-relaxed text-muted">
            {t.home.heroLead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/pripreme" className="btn btn-primary focus-ring">
              {t.home.ctaPripreme}
              <Icon name="arrow" />
            </a>
            <Link to={paths.worksheets} className="btn btn-ghost focus-ring">
              {t.home.ctaWorksheets}
            </Link>
            <Link to={paths.blog} className="btn btn-ghost focus-ring">
              {t.home.readBlog}
            </Link>
          </div>
        </div>

        {/* Pregled ključnih alata za učitelje */}
        <div className="grid gap-3.5 sm:grid-cols-2">
          {t.home.stats.map(({ value, label, detail }, i) => {
            const Icon = statIcons[i] ?? BookOpenCheck;
            return (
              <a
                key={label}
                href={i === 2 ? paths.worksheets : '/pripreme'}
                className="card hoverable focus-ring flex flex-col p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="icon-tile">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="font-head text-2xl font-bold tracking-tight text-accent sm:text-3xl">
                    {value}
                  </span>
                </div>
                <div className="mt-4">
                  {/* Naslov uvijek zauzima dva reda, da naslovi i opisi u istom redu kartica počinju na istoj visini. */}
                  <h2 className="min-h-[2.75em] text-[17px] leading-snug font-semibold tracking-tight">{label}</h2>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{detail}</p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* 01 — Kako sajt pomaže učiteljima u svakodnevnom poslu */}
      <section className="wrap pt-14 sm:pt-24" aria-labelledby="podrska-uciteljima">
        <span className="eyebrow">{t.home.pillarsEyebrow}</span>
        <h2 id="podrska-uciteljima" className="section-title mb-4">
          {t.home.pillarsTitle}
        </h2>
        <p className="mb-11 max-w-[740px] text-lg text-muted">{t.home.pillarsIntro}</p>

        <ul className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {t.home.pillars.map(({ badge, title, text, linkText, href }, i) => {
            const Icon = pillarIcons[i] ?? BookOpen;
            const isInternal = !href.startsWith('/pripreme');
            return (
              <li key={title} className="card hoverable flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="icon-tile">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="cat">{badge}</span>
                  </div>
                  <h3 className="mt-5 text-[19px] leading-snug font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{text}</p>
                </div>
                <div className="mt-5 border-t border-line pt-4">
                  {isInternal ? (
                    <Link
                      to={href}
                      className="focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                    >
                      {linkText}
                    </Link>
                  ) : (
                    <a
                      href={href}
                      className="focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                    >
                      {linkText}
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 02 — Baza nastavnih priprema po razredima (1–5. razred) */}
      <section className="wrap pt-20 sm:pt-28" aria-labelledby="baza-po-razredima">
        <span className="eyebrow">{t.home.gradesEyebrow}</span>
        <h2 id="baza-po-razredima" className="section-title mb-4">
          {t.home.gradesTitle}
        </h2>
        <p className="mb-10 max-w-[760px] text-lg text-muted">{t.home.gradesIntro}</p>

        <ul className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {t.home.gradesList.map(({ grade, count, title, desc }) => (
            <li key={grade}>
              <a
                href={`/pripreme/${grade}-razred`}
                className="card hoverable focus-ring group flex h-full flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent font-head text-lg font-bold text-accent-ink">
                      {grade}.
                    </span>
                    <span className="rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-xs font-semibold text-accent">
                      {count}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[19px] font-semibold tracking-tight group-hover:text-accent">
                    {title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{desc}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  {t.pripremePromo.gradeLabel(grade)} <Icon name="arrow" size={14} />
                </span>
              </a>
            </li>
          ))}

          {/* Kartica za otvaranje kompletne biblioteke svih razreda */}
          <li>
            <a
              href="/pripreme"
              className="card hoverable focus-ring flex h-full flex-col justify-between border-accent/40 bg-surface-2/70"
            >
              <div>
                <span className="cat">{t.pripremePromo.eyebrow}</span>
                <h3 className="mt-4 text-[19px] font-semibold tracking-tight">{t.pripremePromo.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{t.pripremePromo.desc}</p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                {t.pripremePromo.ctaAll} <Icon name="arrow" size={14} />
              </span>
            </a>
          </li>
        </ul>
      </section>

      {/* 03 — Kako izgleda priprema časa u 3 koraka */}
      <section className="wrap pt-20 sm:pt-28" aria-labelledby="kako-funkcionise">
        <span className="eyebrow">{t.home.workflowEyebrow}</span>
        <h2 id="kako-funkcionise" className="section-title mb-10">
          {t.home.workflowTitle}
        </h2>
        <ul className="grid gap-[18px] sm:grid-cols-3">
          {t.home.workflowSteps.map(({ step, title, text }) => (
            <li key={step} className="card">
              <span className="mb-3.5 inline-block font-mono text-xs font-semibold tracking-[0.08em] text-accent">
                {step}
              </span>
              <h3 className="text-[19px] leading-snug font-semibold tracking-tight">{title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 04 — Najnoviji članci sa bloga */}
      <section className="wrap pt-20 sm:pt-28" aria-labelledby="najnovije">
        <span className="eyebrow">{t.home.blogEyebrow}</span>
        <div className="mb-11 flex flex-wrap items-end justify-between gap-4">
          <h2 id="najnovije" className="section-title">
            {t.home.blogTitle}
          </h2>
          {recentPosts.length > 0 && (
            <Link
              to={paths.blog}
              className="focus-ring inline-flex items-center gap-2 rounded font-semibold text-accent hover:underline"
            >
              {t.blog.allPosts} <Icon name="arrow" size={16} />
            </Link>
          )}
        </div>
        {recentPosts.length > 0 ? (
          <ul className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState headingLevel={3} title={t.blog.emptyTitle} message={t.blog.emptyMessage} />
        )}
      </section>
    </>
  );
}
