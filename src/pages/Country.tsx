import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CountryCode from '../components/CountryCode';
import EmptyState from '../components/EmptyState';
import Icon from '../components/Icon';
import ShareButtons from '../components/ShareButtons';
import { siteConfig } from '../config/site';
import { useLocale } from '../i18n/LocaleContext';
import { getAllCountries, getCountry, loadCountryContent } from '../lib/countries';
import { formatDate } from '../lib/formatDate';
import { pageMeta } from '../lib/seo';
import { usePageMeta } from '../lib/usePageMeta';
import { COUNTRY_FACTS } from '../types/country';

export default function Country() {
  const { countryId = '' } = useParams();
  const { locale, t, paths } = useLocale();
  const w = t.world;
  const country = getCountry(locale, countryId);
  const key = `${locale}/${countryId}`;
  const [content, setContent] = useState<{ key: string; markdown: string } | null>(null);

  usePageMeta(
    country
      ? pageMeta.country(t, country)
      : { title: w.notFoundTitle, description: w.notFoundMessage, noindex: true },
  );

  useEffect(() => {
    let active = true;
    loadCountryContent(locale, countryId)?.then((markdown) => {
      if (active) setContent({ key, markdown });
    });
    return () => {
      active = false;
    };
  }, [locale, countryId, key]);

  if (!country) {
    return (
      <div className="wrap max-w-[780px] pt-[130px]">
        <EmptyState
          headingLevel={1}
          title={w.notFoundTitle}
          message={w.notFoundMessage}
          actionLabel={`← ${w.allCountries}`}
          actionTo={paths.world}
        />
      </div>
    );
  }

  const markdown = content?.key === key ? content.markdown : null;
  const others = getAllCountries(locale).filter((c) => c.id !== country.id);
  const { pisa, timss, pirls } = country.results;

  return (
    <div className="wrap min-h-[80vh] max-w-[860px] pt-[130px]">
      <Link
        to={paths.world}
        className="focus-ring mb-7 inline-flex items-center gap-2 rounded text-[14.5px] font-medium text-muted transition-colors hover:text-accent"
      >
        <Icon name="back" size={16} />
        {w.allCountries}
      </Link>

      <header className="mb-9 border-b border-line pb-8">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[12.5px] font-medium text-muted">
          <span className="eyebrow">{w.eyebrow}</span>
          {country.reference && <span className="cat [--c:var(--accent)]">{w.reference}</span>}
        </div>
        <h1 className="mt-3.5 mb-4 flex items-center gap-4 font-head text-[clamp(32px,5vw,52px)] leading-[1.1] font-bold tracking-[-0.03em]">
          <CountryCode code={country.code} />
          {country.name}
        </h1>
        <p className="text-[clamp(16.5px,1.6vw,19px)] text-muted">{country.excerpt}</p>
        <p className="mt-4 font-mono text-[12.5px] text-muted">
          {w.checked}: <time dateTime={country.checked}>{formatDate(country.checked, locale)}</time>
        </p>
      </header>

      <aside className="card mb-10 border-l-4 !border-l-accent">
        <h2 className="eyebrow mb-2">{w.keyIdea}</h2>
        <p className="text-lg">{country.keyIdea}</p>
      </aside>

      <dl className="mb-12 grid gap-[18px] sm:grid-cols-2">
        {COUNTRY_FACTS.map((fact) => (
          <div key={fact} className="card">
            <dt className="font-mono text-[12px] font-medium tracking-wide text-muted uppercase">{w.facts[fact]}</dt>
            <dd className="mt-2 text-[15.5px] leading-[1.6]">{country.facts[fact]}</dd>
          </div>
        ))}
        <div className="card sm:col-span-2">
          <dt className="font-mono text-[12px] font-medium tracking-wide text-muted uppercase">{w.resultsTitle}</dt>
          <dd className="mt-3">
            <ul className="grid gap-3 text-[15.5px] sm:grid-cols-3">
              {(
                [
                  [w.pisa, pisa && `${pisa.year}`, pisa && [[w.math, pisa.math], [w.reading, pisa.reading], [w.science, pisa.science]]],
                  [w.timss, timss && `${timss.year}`, timss && [[w.math, timss.math], [w.science, timss.science]]],
                  [w.pirls, pirls && `${pirls.year}`, pirls && [[w.reading, pirls.reading]]],
                ] as const
              ).map(([label, year, scores]) => (
                <li key={label}>
                  <p className="font-head font-semibold">
                    {label}
                    {year && <span className="ml-1.5 font-mono text-[12.5px] font-normal text-muted">{year}</span>}
                  </p>
                  {scores ? (
                    <p className="mt-1 text-muted">
                      {scores.map(([name, value]) => (
                        <span key={name} className="mr-3 inline-block whitespace-nowrap">
                          {name}: <strong className="font-semibold text-ink tabular-nums">{value}</strong>
                        </span>
                      ))}
                    </p>
                  ) : (
                    <p className="mt-1 text-muted">{w.notTaken}</p>
                  )}
                </li>
              ))}
            </ul>
            {country.resultsNote && <p className="mt-3 text-[14px] text-muted">{country.resultsNote}</p>}
          </dd>
        </div>
      </dl>

      <article className="prose max-w-[780px]" aria-busy={markdown === null}>
        {markdown !== null && <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>}
      </article>

      <section aria-labelledby="izvori" className="mt-12 max-w-[780px]">
        <h2 id="izvori" className="eyebrow mb-3">
          {w.sources}
        </h2>
        <ol className="list-decimal space-y-1.5 pl-5 text-[14.5px] text-muted marker:text-accent">
          {country.sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded underline decoration-line-strong underline-offset-[3px] transition-colors hover:text-accent"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </section>

      <ShareButtons
        title={`${country.name} — ${w.title}`}
        url={`${siteConfig.url}${paths.country(country.id)}`}
      />

      {others.length > 0 && (
        <nav aria-labelledby="ostale-zemlje" className="mt-12">
          <h2 id="ostale-zemlje" className="eyebrow mb-4">
            {w.otherCountries}
          </h2>
          <ul className="flex flex-wrap gap-2.5">
            {others.map((c) => (
              <li key={c.id}>
                <Link to={paths.country(c.id)} className="share-btn focus-ring">
                  <CountryCode code={c.code} small />
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
