import { Link, useParams } from 'react-router-dom';
import { Printer } from 'lucide-react';
import Icon from '../components/Icon';
import NotFound from './NotFound';
import { siteConfig } from '../config/site';
import { useLocale } from '../i18n/LocaleContext';
import type { ReactNode } from 'react';
import QrCode from '../components/QrCode';
import { isWorksheetId, worksheetsFor, type WorksheetId } from '../games/ids';
import { worksheets } from '../games/worksheets';
import { WORKSHEET_PACKS } from '../games/packs';
import { worksheetOgImage } from '../games/thumbnails';
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
  const ctx = { alphabet: ws.alphabet, colorNames: t.games.colorNames, labels: ws.labels, ws };
  const own = worksheets[id](ctx).map((content) => ({ content, title, text, eyebrow: ws.eyebrow }));
  const pack = WORKSHEET_PACKS[id];
  // Paket: prva vlastita strana, pa po jedna strana svakog lista (sa njegovim zaglavljem), pa ostale vlastite.
  const pages: SheetPage[] = pack
    ? [
        own[0],
        ...pack.map((sid, i) => ({
          content: worksheets[sid](ctx)[0],
          title: ws.sheets[sid].title,
          text: ws.sheets[sid].text,
          eyebrow: `${ws.labels.winterPack.day} ${i + 1}`,
        })),
        ...own.slice(1).map((p) => ({ ...p, title: ws.labels.winterPack.diplomaTitle, text: ws.labels.winterPack.diplomaText })),
      ]
    : own;
  usePageMeta({ ...pageMeta.worksheet(t, id), image: worksheetOgImage(id) });
  const year = new Date().getFullYear();
  // Odštampan list putuje kući; QR vodi roditelja nazad na ovaj list i ostale.
  const qrUrl = `${siteConfig.url}${paths.worksheet(id)}`;

  return (
    <div className="wrap max-w-[860px] pt-[96px] sm:pt-[130px] print:w-auto print:max-w-none print:p-0">
      <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3 sm:gap-4 print:hidden">
        <Link
          to={paths.worksheets}
          className="focus-ring inline-flex items-center gap-2 rounded text-sm font-semibold text-muted transition-colors hover:text-accent"
        >
          <Icon name="back" size={14} />
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

      {pages.map((page, i) => (
          <article key={i} className="sheet">
            <header>
              <div className="flex items-start gap-[5mm]">
                <div className="min-w-0 flex-1">
                  <p className="sheet-eyebrow flex justify-between gap-4">
                    <span>
                      {siteConfig.name} · {page.eyebrow}
                    </span>
                    {pages.length > 1 && <span>{ws.page(i + 1, pages.length)}</span>}
                  </p>
                  {i === 0 ? (
                    <h1 className="mt-1 font-head text-[26px] leading-tight font-bold">{page.title}</h1>
                  ) : (
                    <h2 className="mt-1 font-head text-[22px] leading-tight font-bold">{page.title}</h2>
                  )}
                  <div className="mt-4 grid grid-cols-[2fr_1fr] gap-6 text-[14px]">
                    <span className="sheet-line">{ws.name}:</span>
                    <span className="sheet-line">{ws.date}:</span>
                  </div>
                </div>
                <div className="sheet-qr">
                  <QrCode value={qrUrl} className="block h-[19mm] w-[19mm]" />
                  <span>{ws.qr}</span>
                </div>
              </div>
              <p className="mt-4 text-[15px] leading-snug">{page.text}</p>
            </header>
            <div className="mt-4 grid gap-[4mm]">{page.content}</div>
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

interface SheetPage {
  content: ReactNode;
  title: string;
  text: string;
  eyebrow: string;
}
