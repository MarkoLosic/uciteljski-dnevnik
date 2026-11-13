import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import CountryCode from './CountryCode';
import { useLocale } from '../i18n/LocaleContext';
import { PISA_OECD_AVERAGE } from '../lib/countries';
import type { CountryMeta } from '../types/country';

interface ResultsTableProps {
  countries: CountryMeta[];
}

const latest = (years: (number | undefined)[]) => Math.max(...years.filter((y): y is number => y !== undefined));

/** PISA, TIMSS i PIRLS po zemljama; najbolji po PISA matematici na vrhu, bez novijeg PISA-a na dnu. */
export default function ResultsTable({ countries }: ResultsTableProps) {
  const { t, paths } = useLocale();
  const w = t.world;
  const pisaYear = PISA_OECD_AVERAGE.year;
  const timssYear = latest(countries.map((c) => c.results.timss?.year));
  const pirlsYear = latest(countries.map((c) => c.results.pirls?.year));

  const rank = (c: CountryMeta) => (c.results.pisa?.year === pisaYear ? c.results.pisa.math : -1);
  const rows = [...countries].sort((a, b) => rank(b) - rank(a));

  const cell = (value: number | undefined, year: number | undefined, columnYear: number): ReactNode => {
    if (value === undefined) {
      return (
        <>
          <span aria-hidden="true" className="text-muted">
            —
          </span>
          <span className="sr-only">{w.notTaken}</span>
        </>
      );
    }
    if (year !== columnYear && year !== undefined) {
      return (
        <span className="whitespace-nowrap text-muted">
          {value}
          <span aria-hidden="true" className="ml-1 text-[11.5px]">
            ({year})
          </span>
          <span className="sr-only">, {w.olderCycle(year)}</span>
        </span>
      );
    }
    return value;
  };

  const head = 'p-3 text-right font-mono text-[12px] font-medium tracking-wide text-muted uppercase';
  const num = 'p-3 text-right tabular-nums';

  return (
    <div className="card overflow-x-auto !p-0" role="region" aria-labelledby="rezultati-naslov" tabIndex={0}>
      <table className="w-full min-w-[720px] border-collapse text-[15px]">
        <caption id="rezultati-naslov" className="sr-only">
          {w.resultsCaption}
        </caption>
        <thead>
          <tr className="border-b border-line">
            <td className="p-3" />
            <th scope="colgroup" colSpan={3} className="p-3 text-center font-head text-[14px] font-semibold">
              {w.pisa} {pisaYear}
            </th>
            <th scope="colgroup" colSpan={2} className="border-l border-line p-3 text-center font-head text-[14px] font-semibold">
              {w.timss} {timssYear}
            </th>
            <th scope="colgroup" className="border-l border-line p-3 text-center font-head text-[14px] font-semibold">
              {w.pirls} {pirlsYear}
            </th>
          </tr>
          <tr className="border-b border-line-strong">
            <td className="p-3" />
            <th scope="col" className={head}>{w.math}</th>
            <th scope="col" className={head}>{w.reading}</th>
            <th scope="col" className={head}>{w.science}</th>
            <th scope="col" className={`${head} border-l border-line`}>{w.math}</th>
            <th scope="col" className={head}>{w.science}</th>
            <th scope="col" className={`${head} border-l border-line`}>{w.reading}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => {
            const { pisa, timss, pirls } = c.results;
            return (
              <tr key={c.id} className={`border-b border-line ${c.reference ? 'bg-surface-2/60' : ''}`}>
                <th scope="row" className="p-3 text-left">
                  <Link
                    to={paths.country(c.id)}
                    className="focus-ring inline-flex items-center gap-2.5 rounded font-medium whitespace-nowrap hover:text-accent"
                  >
                    <CountryCode code={c.code} small />
                    {c.name}
                  </Link>
                </th>
                <td className={num}>{cell(pisa?.math, pisa?.year, pisaYear)}</td>
                <td className={num}>{cell(pisa?.reading, pisa?.year, pisaYear)}</td>
                <td className={num}>{cell(pisa?.science, pisa?.year, pisaYear)}</td>
                <td className={`${num} border-l border-line`}>{cell(timss?.math, timss?.year, timssYear)}</td>
                <td className={num}>{cell(timss?.science, timss?.year, timssYear)}</td>
                <td className={`${num} border-l border-line`}>{cell(pirls?.reading, pirls?.year, pirlsYear)}</td>
              </tr>
            );
          })}
          <tr className="font-medium">
            <th scope="row" className="p-3 text-left font-mono text-[12.5px] tracking-wide text-muted uppercase">
              {w.oecdAverage}
            </th>
            <td className={num}>{PISA_OECD_AVERAGE.math}</td>
            <td className={num}>{PISA_OECD_AVERAGE.reading}</td>
            <td className={num}>{PISA_OECD_AVERAGE.science}</td>
            <td className="border-l border-line p-3 text-muted" colSpan={3}>
              <span className="text-[13px] font-normal">{w.scaleNote}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
