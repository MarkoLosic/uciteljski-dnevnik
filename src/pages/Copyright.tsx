import { Ban, Check, X, type LucideIcon } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useLocale } from '../i18n/LocaleContext';
import { formatDate } from '../lib/formatDate';
import { pageMeta } from '../lib/seo';
import { usePageMeta } from '../lib/usePageMeta';

interface RuleCardProps {
  title: string;
  text?: string;
  items: readonly string[];
  icon: LucideIcon;
  color: string; // Tailwind arbitrary property za --c (boja bedža i ikona)
}

function RuleCard({ title, text, items, icon: ItemIcon, color, className = '' }: RuleCardProps & { className?: string }) {
  return (
    <section className={`card flex flex-col ${color} ${className}`}>
      <h2 className="font-head text-xl font-semibold tracking-tight">{title}</h2>
      {text && <p className="mt-2 text-muted">{text}</p>}
      <ul className={`mt-5 grid gap-3 text-[15.5px] leading-snug ${className ? 'md:grid-cols-2 md:gap-x-8' : ''}`}>
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-[1px] grid h-5 w-5 flex-none place-items-center rounded-full bg-[color-mix(in_srgb,var(--c)_16%,transparent)] text-[var(--c)]">
              <ItemIcon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Copyright() {
  const { locale, t, paths } = useLocale();
  const c = t.copyright;
  usePageMeta(pageMeta.copyright(t));

  const example = `${c.credit.source}: ${siteConfig.author.name}, ${siteConfig.name}, ${siteConfig.displayDomain}${paths.worksheets}`;

  return (
    <div className="wrap pt-[130px]">
      <header className="max-w-[760px]">
        <span className="eyebrow">{c.eyebrow}</span>
        <h1 className="page-title mt-2 mb-5">{c.title}</h1>
        <p className="text-lg text-muted sm:text-xl">{c.intro}</p>
        <p className="mt-6 flex items-center gap-2.5 font-mono text-[13px] text-muted">
          <i className="status-dot flex-none" />
          {c.updated(formatDate(siteConfig.copyrightUpdated, locale))}
        </p>
      </header>

      <article className="prose mt-12 max-w-[780px]">
        <h2>{c.owner.title}</h2>
        <p>
          © {new Date().getFullYear()} {siteConfig.author.name}, {siteConfig.name}. {c.owner.text(siteConfig.author.name)}
        </p>
        <ul>
          {c.owner.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <div className="mt-10 grid gap-[18px] md:grid-cols-2">
        <RuleCard {...c.allowed} icon={Check} color="[--c:var(--accent)]" />
        <RuleCard {...c.forbidden} icon={X} color="[--c:var(--cat-amber)]" />
        <RuleCard {...c.never} icon={Ban} color="[--c:var(--danger)]" className="md:col-span-2" />
      </div>

      <article className="prose mt-12 max-w-[780px]">
        <h2>{c.credit.title}</h2>
        <p>{c.credit.text}</p>
        <blockquote>
          <p>{example}</p>
        </blockquote>

        <h2>{c.others.title}</h2>
        <ul>
          {c.others.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>{c.report.title}</h2>
        <p>{c.report.text}</p>

        <h2>{c.permission.title}</h2>
        <p>{c.permission.text}</p>
      </article>

      <a href={`mailto:${siteConfig.author.email}`} className="btn btn-primary focus-ring mt-8">
        {c.permission.cta}: {siteConfig.author.email}
      </a>
    </div>
  );
}
