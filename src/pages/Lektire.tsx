import { BookOpen, Lightbulb } from 'lucide-react';
import NotFound from './NotFound';
import { useLocale } from '../i18n/LocaleContext';
import { formatDate } from '../lib/formatDate';
import { pageMeta } from '../lib/seo';
import { usePageMeta } from '../lib/usePageMeta';
import { LEKTIRE } from '../lektire';
import { LEKTIRE_RAZREDI, LEKTIRE_SISTEMI, type Djelo } from '../lektire/types';

export default function Lektire() {
  const { locale } = useLocale();
  if (!LEKTIRE[locale]) return <NotFound />;
  return <LektirePage />;
}

function DjeloText({ djelo }: { djelo: Djelo }) {
  return (
    <>
      {djelo.autor && <span className="text-muted">{djelo.autor}: </span>}
      <cite className="font-semibold not-italic">{djelo.naslov}</cite>
      {djelo.napomena && <span className="text-muted"> ({djelo.napomena})</span>}
    </>
  );
}

function LektirePage() {
  const { locale, t } = useLocale();
  const l = t.lektire;
  const data = LEKTIRE[locale]!;
  usePageMeta(pageMeta.lektire(t));

  return (
    <div className="wrap pt-[130px]">
      <header className="max-w-[760px]">
        <span className="eyebrow">{l.eyebrow}</span>
        <h1 className="page-title mt-2 mb-5">{l.title}</h1>
        <p className="text-lg text-muted sm:text-xl">{data.intro}</p>
        <p className="mt-6 flex items-start gap-2.5 text-[14px] text-muted">
          <i className="status-dot mt-[7px] flex-none" />
          <span>
            {data.note} {l.checked(formatDate(data.checked, locale))}
          </span>
        </p>
      </header>

      <nav aria-label={l.jumpLabel} className="mt-10 flex flex-wrap gap-2">
        {LEKTIRE_RAZREDI.map((r) => (
          <a
            key={r}
            href={`#razred-${r}`}
            className="focus-ring rounded-full border border-line px-4 py-2 font-mono text-[13px] font-medium text-muted transition-colors hover:border-line-strong hover:bg-surface-2 hover:text-ink"
          >
            {l.grade(r)}
          </a>
        ))}
      </nav>

      {LEKTIRE_RAZREDI.map((r) => {
        const razred = data.razredi[r];
        return (
          <section key={r} id={`razred-${r}`} aria-labelledby={`razred-${r}-naslov`} className="mt-16 scroll-mt-[110px]">
            <h2 id={`razred-${r}-naslov`} className="section-title mb-6">
              {l.grade(r)}
            </h2>
            <div className="grid gap-[18px] md:grid-cols-2">
              {LEKTIRE_SISTEMI.map((s) => {
                const spisak = razred[s];
                const sistem = data.sistemi[s];
                return (
                  <section key={s} className="card flex flex-col" aria-labelledby={`razred-${r}-${s}`}>
                    <span className="cat self-start [--c:var(--accent)]">{l.officialTitle}</span>
                    <h3 id={`razred-${r}-${s}`} className="mt-4 font-head text-xl font-semibold tracking-tight">
                      {sistem.naziv}
                    </h3>
                    <p className="mt-1 font-mono text-[12px] text-muted">{sistem.opis}</p>
                    {spisak.djela.length > 0 ? (
                      <ol className="mt-5 grid gap-2.5 text-[15.5px] leading-snug">
                        {spisak.djela.map((d) => (
                          <li key={`${d.autor ?? ''}${d.naslov}`} className="flex gap-3">
                            <BookOpen aria-hidden="true" className="mt-[3px] h-4 w-4 flex-none text-accent" />
                            <span>
                              <DjeloText djelo={d} />
                            </span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="mt-5 text-[15.5px] font-semibold">{l.noList}</p>
                    )}
                    {spisak.napomena && (
                      <p className="mt-5 border-l-2 border-line-strong pl-3.5 text-[14px] text-muted">{spisak.napomena}</p>
                    )}
                  </section>
                );
              })}
            </div>

            <div className="mt-[18px] rounded-[20px] border border-dashed border-line-strong p-5 sm:p-6">
              <h3 className="font-head text-lg font-semibold tracking-tight">{l.recommendedTitle}</h3>
              <p className="mt-1 text-[14px] text-muted">{l.recommendedNote}</p>
              <ul className="mt-4 grid gap-x-8 gap-y-3.5 md:grid-cols-2">
                {razred.preporuke.map((p) => (
                  <li key={p.naslov} className="text-[15px] leading-snug">
                    <DjeloText djelo={p} />
                    <span className="mt-0.5 block text-[14px] text-muted">{p.zasto}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="savjeti" className="mt-20">
        <span className="eyebrow">{l.tipsEyebrow}</span>
        <h2 id="savjeti" className="section-title mt-2 mb-6">
          {l.tipsTitle}
        </h2>
        <ul className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {data.savjeti.map((s) => (
            <li key={s.title} className="card">
              <Lightbulb aria-hidden="true" className="h-5 w-5 text-accent" />
              <h3 className="mt-3 font-head text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[15px] text-muted">{s.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="izvori" className="mt-20 max-w-[780px]">
        <h2 id="izvori" className="font-head text-xl font-semibold tracking-tight">
          {l.sourcesTitle}
        </h2>
        <ul className="mt-4 grid gap-2 text-[14.5px]">
          {data.izvori.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded text-accent underline underline-offset-2 hover:no-underline"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
