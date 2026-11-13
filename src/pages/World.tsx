import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import EmptyState from '../components/EmptyState';
import PixelIcon from '../components/PixelIcon';
import CountryCode from '../components/CountryCode';
import ResultsTable from '../components/ResultsTable';
import { useLocale } from '../i18n/LocaleContext';
import { DEFAULT_LOCALE } from '../i18n/config';
import { pathsFor } from '../i18n/paths';
import { getAllCountries, loadWorldSummary } from '../lib/countries';
import { pageMeta } from '../lib/seo';
import { usePageMeta } from '../lib/usePageMeta';
import { COUNTRY_FACTS } from '../types/country';

export default function World() {
  const { locale, t, paths } = useLocale();
  const w = t.world;
  const countries = getAllCountries(locale);
  usePageMeta({ ...pageMeta.world(t), noindex: countries.length === 0 });
  const [summary, setSummary] = useState<{ locale: string; markdown: string } | null>(null);

  useEffect(() => {
    let active = true;
    loadWorldSummary(locale)?.then((markdown) => {
      if (active) setSummary({ locale, markdown });
    });
    return () => {
      active = false;
    };
  }, [locale]);
  const summaryMarkdown = summary?.locale === locale ? summary.markdown : null;

  if (countries.length === 0) {
    return (
      <div className="wrap max-w-[780px] pt-[130px]">
        <EmptyState
          headingLevel={1}
          title={w.emptyTitle}
          message={w.emptyMessage}
          actionLabel={w.emptyAction}
          actionTo={pathsFor(DEFAULT_LOCALE).world}
        />
      </div>
    );
  }

  return (
    <div className="wrap pt-[130px]">
      <header className="max-w-[760px]">
        <span className="eyebrow">{w.eyebrow}</span>
        <h1 className="page-title mt-2 mb-5">{w.title}</h1>
        <p className="text-lg text-muted sm:text-xl">{w.intro}</p>
        <p className="mt-6 flex items-start gap-2.5 text-[14px] text-muted">
          <i className="status-dot mt-[7px] flex-none" />
          {w.note}
        </p>
      </header>

      <section aria-labelledby="zemlje" className="mt-12">
        <h2 id="zemlje" className="sr-only">
          {w.countriesTitle}
        </h2>
        <ul className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {countries.map((c) => (
            <li key={c.id}>
              <Link to={paths.country(c.id)} className="card focus-ring group flex h-full flex-col hover:-translate-y-1">
                {c.reference && <span className="cat mb-4 self-start [--c:var(--accent)]">{w.reference}</span>}
                <div className="flex items-center gap-3.5">
                  <CountryCode code={c.code} />
                  <h3 className="font-head text-xl font-semibold tracking-tight">{c.name}</h3>
                </div>
                <p className="mt-4 text-[15px] text-muted">{c.excerpt}</p>
                <p className="mt-4 flex-1 border-l-2 border-accent pl-3.5 text-[15px]">
                  <span className="sr-only">{w.keyIdea}: </span>
                  {c.keyIdea}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  {w.readMore}
                  <PixelIcon name="arrow" size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {countries.length > 1 && (
        <section aria-labelledby="poredjenje" className="mt-20">
          <span className="eyebrow">{w.compareEyebrow}</span>
          <h2 id="poredjenje" className="section-title mt-2 mb-3">
            {w.compareTitle}
          </h2>
          <p className="mb-6 text-sm text-muted md:hidden">{w.compareScroll}</p>
          <div
            className="card overflow-x-auto !p-0"
            role="region"
            aria-labelledby="poredjenje-naslov"
            tabIndex={0}
          >
            <table
              className="w-full border-collapse text-left text-[14.5px] leading-[1.55]"
              style={{ minWidth: `${150 + countries.length * 230}px` }}
            >
              <caption id="poredjenje-naslov" className="sr-only">
                {w.compareCaption}
              </caption>
              <thead>
                <tr className="border-b border-line-strong">
                  <td className="sticky left-0 z-10 w-[150px] bg-surface p-4" />
                  {countries.map((c) => (
                    <th key={c.id} scope="col" className="p-4 align-bottom">
                      <Link
                        to={paths.country(c.id)}
                        className="focus-ring inline-flex items-center gap-2.5 rounded font-head text-base font-semibold hover:text-accent"
                      >
                        <CountryCode code={c.code} small />
                        {c.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COUNTRY_FACTS.map((fact) => (
                  <tr key={fact} className="border-b border-line last:border-0">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 w-[150px] bg-surface p-4 align-top font-mono text-[12px] font-medium tracking-wide text-muted uppercase shadow-[1px_0_0_var(--border)]"
                    >
                      {w.facts[fact]}
                    </th>
                    {countries.map((c) => (
                      <td key={c.id} className={`p-4 align-top ${c.reference ? 'bg-surface-2/60' : ''}`}>
                        {c.facts[fact]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section aria-labelledby="rezultati" className="mt-20">
        <span className="eyebrow">{w.resultsEyebrow}</span>
        <h2 id="rezultati" className="section-title mt-2 mb-3">
          {w.resultsTitle}
        </h2>
        <p className="mb-6 max-w-[760px] text-muted">{w.resultsIntro}</p>
        <ResultsTable countries={countries} />
      </section>

      {summaryMarkdown !== null && (
        <article className="prose mt-20 max-w-[780px]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{summaryMarkdown}</ReactMarkdown>
        </article>
      )}
    </div>
  );
}
