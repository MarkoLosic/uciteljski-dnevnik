import { Link, useParams } from 'react-router-dom';
import { Printer } from 'lucide-react';
import PixelIcon from '../components/PixelIcon';
import NotFound from './NotFound';
import { siteConfig } from '../config/site';
import { useLocale } from '../i18n/LocaleContext';
import { isWorksheetId, worksheetsFor, type WorksheetId } from '../games/ids';
import { worksheets } from '../games/worksheets';
import { usePageMeta } from '../lib/usePageMeta';
import { pageMeta } from '../lib/seo';

export default function Worksheet() {
  const { sheetId } = useParams();
  const { locale } = useLocale();
  if (!isWorksheetId(sheetId) || !worksheetsFor(locale).includes(sheetId)) return <NotFound />;
  return <WorksheetPage id={sheetId} />;
}

function WorksheetPage({ id }: { id: WorksheetId }) {
  const { t, paths } = useLocale();
  const ws = t.games.worksheet;
  const { title, text } = ws.sheets[id];
  const about = ws.about[id];
  const pages = worksheets[id]({ alphabet: ws.alphabet, colorNames: t.games.colorNames, labels: ws.labels });
  usePageMeta(pageMeta.worksheet(t, id));
  const year = new Date().getFullYear();

  return (
    <div className="wrap max-w-[860px] pt-[96px] sm:pt-[130px] print:w-auto print:max-w-none print:p-0">
      <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3 sm:gap-4 print:hidden">
        <Link
          to={paths.worksheets}
          className="focus-ring inline-flex items-center gap-2 rounded text-sm font-semibold text-muted transition-colors hover:text-accent"
        >
          <PixelIcon name="back" size={14} />
          {ws.backToWorksheets}
        </Link>
        <button type="button" onClick={() => window.print()} className="btn btn-primary focus-ring">
          <Printer aria-hidden="true" className="h-[18px] w-[18px]" />
          {ws.print}
        </button>
      </div>
      {/* Bez <h2>: h1 stranice je naslov na samom listu, ispod ovog okvira. */}
      {about && (
        <section className="card mb-6 p-5 sm:p-6 print:hidden" aria-labelledby="o-ovom-listu">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p id="o-ovom-listu" className="font-head text-[18px] font-bold">
              {ws.aboutTitle}
            </p>
            <p className="font-mono text-[12.5px] text-muted">
              {ws.ageLabel}: <span className="text-ink">{about.age}</span>
            </p>
          </div>
          <p className="mt-2 text-[15.5px] leading-relaxed">{about.text}</p>
        </section>
      )}
      <p className="mb-6 text-[15px] text-muted print:hidden">{ws.tip}</p>

      {pages.map((content, i) => (
          <article key={i} className="sheet">
            <header>
              <p className="sheet-eyebrow flex justify-between gap-4">
                <span>
                  {siteConfig.name} · {ws.eyebrow}
                </span>
                {pages.length > 1 && <span>{ws.page(i + 1, pages.length)}</span>}
              </p>
              {i === 0 ? (
                <h1 className="mt-1 font-head text-[26px] leading-tight font-bold">{title}</h1>
              ) : (
                <h2 className="mt-1 font-head text-[22px] leading-tight font-bold">{title}</h2>
              )}
              <div className="mt-4 grid grid-cols-[2fr_1fr] gap-6 text-[14px]">
                <span className="sheet-line">{ws.name}:</span>
                <span className="sheet-line">{ws.date}:</span>
              </div>
              <p className="mt-4 text-[15px] leading-snug">{text}</p>
            </header>
            <div className="mt-4 grid gap-[4mm]">{content}</div>
            <footer className="sheet-footer">
              <span>
                © {year} {siteConfig.author.name} · www.{siteConfig.name}
              </span>
              <span>{ws.copyright}</span>
            </footer>
          </article>
      ))}
    </div>
  );
}
