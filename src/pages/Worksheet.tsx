import { Link, useParams } from 'react-router-dom';
import { Printer } from 'lucide-react';
import PixelIcon from '../components/PixelIcon';
import NotFound from './NotFound';
import { siteConfig } from '../config/site';
import { useLocale } from '../i18n/LocaleContext';
import { isWorksheetId, worksheetsFor, type WorksheetId } from '../games/ids';
import { worksheets } from '../games/worksheets';
import { usePageMeta } from '../lib/usePageMeta';

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
  const pages = worksheets[id]({ alphabet: ws.alphabet, colorNames: t.games.colorNames });
  usePageMeta({ title: `${ws.eyebrow}: ${title}`, description: text });

  return (
    <div className="wrap max-w-[860px] pt-[130px] print:w-auto print:max-w-none print:p-0">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          to={paths.games}
          className="focus-ring inline-flex items-center gap-2 rounded text-sm font-semibold text-muted transition-colors hover:text-accent"
        >
          <PixelIcon name="back" size={14} />
          {ws.backToGames}
        </Link>
        <button type="button" onClick={() => window.print()} className="btn btn-primary focus-ring">
          <Printer aria-hidden="true" className="h-[18px] w-[18px]" />
          {ws.print}
        </button>
      </div>
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
          </article>
      ))}
    </div>
  );
}
