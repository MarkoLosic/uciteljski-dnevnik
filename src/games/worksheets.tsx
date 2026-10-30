import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Bug, Carrot, Flower2, Rabbit } from 'lucide-react';
import type { WorksheetId } from './ids';
import { PATHS } from './Trace';
import { FIGURES } from './ConnectDots';
import { MAZES } from './Maze';

// Papir je uvek beo, pa su boje fiksne (ne prate temu sajta) i dovoljno svetle da se štampaju i crno-belo.
const INK = '#111827';
const GUIDE = '#e5e7eb';
const HEDGE = '#bbf7d0';
const HEDGE_EDGE = '#16a34a';

const TRACE_GRAY = '#d1d5db';
const FONT = 'Inter, system-ui, sans-serif';

const figureClass = 'block h-[70mm] w-full';

function TraceSheet() {
  return (
    <>
      {PATHS.map((d) => {
        const [, sx, sy] = /^M(\d+) (\d+)/.exec(d) ?? [];
        const end = d.trim().split(/[ ,]+/).slice(-2).map(Number);
        return (
          <svg key={d} viewBox="0 0 400 260" className={figureClass} aria-hidden="true">
            <path d={d} fill="none" stroke={GUIDE} strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
            <path d={d} fill="none" stroke={INK} strokeWidth="2.5" strokeDasharray="7 7" strokeLinecap="round" />
            <circle cx={Number(sx)} cy={Number(sy)} r="20" fill="#fff" stroke={INK} strokeWidth="2" />
            <Bug x={Number(sx) - 13} y={Number(sy) - 13} width={26} height={26} color={INK} />
            <circle cx={end[0]} cy={end[1]} r="20" fill="#fff" stroke={INK} strokeWidth="2" />
            <Flower2 x={end[0] - 13} y={end[1] - 13} width={26} height={26} color={INK} />
          </svg>
        );
      })}
    </>
  );
}

function DotsSheet() {
  return (
    <>
      {FIGURES.map(({ points }) => {
        const cx = points.reduce((sum, [x]) => sum + x, 0) / points.length;
        const cy = points.reduce((sum, [, y]) => sum + y, 0) / points.length;
        // Okvir obuhvata i brojeve (koji stoje van tačaka), pa se ništa ne odseca.
        const xs = points.map(([x]) => x);
        const ys = points.map(([, y]) => y);
        const pad = 42;
        const box = [Math.min(...xs) - pad, Math.min(...ys) - pad, Math.max(...xs) - Math.min(...xs) + 2 * pad, Math.max(...ys) - Math.min(...ys) + 2 * pad];
        return (
          <svg
            key={points.join()}
            viewBox={box.join(' ')}
            className={`${figureClass} rounded-xl border-[1.5px] border-dashed border-[#d1d5db]`}
            aria-hidden="true"
          >
            {points.map(([x, y], i) => {
              // Broj stoji malo van oblika, da ne smeta liniji koju dete crta.
              const len = Math.hypot(x - cx, y - cy) || 1;
              const lx = x + ((x - cx) / len) * 22;
              const ly = y + ((y - cy) / len) * 22;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r={i === 0 ? 8 : 6} fill={INK} />
                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="20"
                    fontWeight="700"
                    fontFamily="Inter, system-ui, sans-serif"
                    fill={INK}
                  >
                    {i + 1}
                  </text>
                </g>
              );
            })}
          </svg>
        );
      })}
    </>
  );
}

function MazeSheet() {
  const cell = 40;
  return (
    <>
      {MAZES.map((maze) => {
        const w = maze[0].length * cell;
        const h = maze.length * cell;
        return (
          <svg key={maze.join()} viewBox={`-4 -4 ${w + 8} ${h + 8}`} className={figureClass} aria-hidden="true">
            <rect x="0" y="0" width={w} height={h} fill="#fff" stroke={INK} strokeWidth="3" />
            {maze.flatMap((row, r) =>
              [...row].map((ch, c) => {
                const x = c * cell;
                const y = r * cell;
                if (ch === '#') {
                  return (
                    <rect key={`${r}-${c}`} x={x + 1} y={y + 1} width={cell - 2} height={cell - 2} rx="8" fill={HEDGE} stroke={HEDGE_EDGE} strokeWidth="1.5" />
                  );
                }
                if (ch === 'S') return <Rabbit key={`${r}-${c}`} x={x + 6} y={y + 6} width={cell - 12} height={cell - 12} color={INK} />;
                if (ch === 'E') return <Carrot key={`${r}-${c}`} x={x + 6} y={y + 6} width={cell - 12} height={cell - 12} color={INK} />;
                return null;
              }),
            )}
          </svg>
        );
      })}
    </>
  );
}

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const CYRILLIC =
  'А а|Б б|В в|Г г|Д д|Ђ ђ|Е е|Ж ж|З з|И и|Ј ј|К к|Л л|Љ љ|М м|Н н|Њ њ|О о|П п|Р р|С с|Т т|Ћ ћ|У у|Ф ф|Х х|Ц ц|Ч ч|Џ џ|Ш ш'.split('|');

interface WritingRowProps {
  model: string;
  lowercase: boolean; // mala slova imaju srednju liniju i silaze ispod osnovne (g, j, p…)
}

// Red za pisanje: crni uzorak, sive kopije za precrtavanje i prazan kraj reda za samostalno pisanje.
function WritingRow({ model, lowercase }: WritingRowProps) {
  const size = 52;
  const width = 600;
  const height = lowercase ? 76 : 60;
  const base = lowercase ? 58 : 52;
  const top = base - size * 0.727;
  const middle = base - size * 0.546;
  // Širina uzorka se meri u browseru (i ponovo kada se font učita), da se široka slova poput Љ i М ne preklapaju.
  const modelRef = useRef<SVGTextElement>(null);
  const [measured, setMeasured] = useState<number | null>(null);
  useLayoutEffect(() => {
    const measure = () => modelRef.current && setMeasured(modelRef.current.getComputedTextLength());
    measure();
    document.fonts?.ready.then(measure);
  }, [model]);
  const slot = (measured ?? model.length * size * 0.7) + 28;
  const copies = Math.max(1, Math.floor((width - 12 - slot * 2) / slot));
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="block w-full" aria-hidden="true">
      <line x1="0" x2={width} y1={top} y2={top} stroke={TRACE_GRAY} strokeWidth="1.5" />
      {lowercase && <line x1="0" x2={width} y1={middle} y2={middle} stroke="#9ca3af" strokeWidth="1.2" strokeDasharray="6 6" />}
      <line x1="0" x2={width} y1={base} y2={base} stroke={INK} strokeWidth="1.8" />
      {Array.from({ length: copies + 1 }, (_, i) => (
        <text key={i} ref={i === 0 ? modelRef : undefined} x={6 + i * slot} y={base} fontSize={size} fontFamily={FONT} fontWeight="500" fill={i === 0 ? INK : TRACE_GRAY}>
          {model}
        </text>
      ))}
    </svg>
  );
}

function chunk<T>(items: readonly T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, i) => items.slice(i * size, i * size + size));
}

const LETTERS_PER_PAGE = 8;

const letterPages = (letters: readonly string[]) =>
  chunk(letters, LETTERS_PER_PAGE).map((page) => (
    <div key={page[0]} className="grid gap-[2mm]">
      {page.map((pair) => (
        <WritingRow key={pair} model={pair} lowercase />
      ))}
    </div>
  ));

interface SheetContext {
  alphabet: readonly string[];
}

// Svaki list vraća svoje strane; stranica radnog lista oko svake dodaje zaglavlje i prelom strane.
export const worksheets: Record<WorksheetId, (ctx: SheetContext) => ReactNode[]> = {
  trace: () => [<TraceSheet key="trace" />],
  dots: () => [<DotsSheet key="dots" />],
  maze: () => [<MazeSheet key="maze" />],
  numbers: () => [
    <div key="numbers" className="grid gap-[2mm]">
      {DIGITS.map((digit) => (
        <WritingRow key={digit} model={digit} lowercase={false} />
      ))}
    </div>,
  ],
  latin: ({ alphabet }) => letterPages(alphabet),
  cyrillic: () => letterPages(CYRILLIC),
};
