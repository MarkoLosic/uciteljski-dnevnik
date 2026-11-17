// Paketi: izdanje od više strana složeno od postojećih listova (jedan list = jedan dan),
// uz vlastitu prvu stranu (plan) i posljednju (diploma). Strana uzetog lista ide sa zaglavljem
// tog lista (naslov i uputstvo), pa izgleda i staje na A4 isto kao kad se štampa sama.
import type { ReactNode } from 'react';
import { Snowflake } from 'lucide-react';
import type { WorksheetId } from './ids';
import type { Dictionary } from '../i18n/dictionaries';

const INK = '#111827';
const MUTED = '#6b7280';

type WorksheetDict = Dictionary['games']['worksheet'];

/** Listovi u paketu, redom po danima. Uzima se prva strana svakog lista. */
export const WORKSHEET_PACKS: Partial<Record<WorksheetId, readonly WorksheetId[]>> = {
  // Predškolci i prvaci; samo listovi od jedne strane koji postoje na svim jezicima.
  winterBreakPack: [
    'coloringWinter',
    'maze',
    'count',
    'dots',
    'adding',
    'odd',
    'timeYear',
    'differences',
    'subtraction',
    'symmetry',
    'pattern',
    'copy',
  ],
};

function WinterPlan({ days, ws }: { days: readonly WorksheetId[]; ws: WorksheetDict }) {
  const l = ws.labels.winterPack;
  return (
    <div className="grid gap-[4mm]">
      <p className="font-head text-[17px] font-bold">{l.planHeading}</p>
      <ol className="grid grid-cols-3 gap-[3mm]">
        {days.map((id, i) => (
          <li key={id} className="flex min-h-[33mm] flex-col justify-between rounded-[3mm] border-[1.5px] border-[#111827] p-[3mm]">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: MUTED }}>
                {l.day} {i + 1}
              </p>
              <p className="mt-1 text-[13px] leading-snug font-semibold">{ws.sheets[id].title}</p>
            </div>
            <Snowflake aria-hidden="true" className="mt-2 self-end" width={40} height={40} color={INK} strokeWidth={1.25} />
          </li>
        ))}
      </ol>
      <p className="text-[13.5px] leading-snug">{l.planHint}</p>
      <div className="rounded-[3mm] border-[1.5px] border-dashed p-[3.5mm]" style={{ borderColor: MUTED }}>
        <p className="text-[13px] font-bold">{l.parentsTitle}</p>
        <p className="mt-1 text-[12.5px] leading-snug">{l.parentsText}</p>
      </div>
    </div>
  );
}

// Snješko i pahulje su samo obrisi, da ih dijete oboji.
function Flake({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g stroke={INK} strokeWidth={2} strokeLinecap="round" fill="none">
      {[0, 60, 120].map((deg) => (
        <line
          key={deg}
          x1={x - r * Math.cos((deg * Math.PI) / 180)}
          y1={y - r * Math.sin((deg * Math.PI) / 180)}
          x2={x + r * Math.cos((deg * Math.PI) / 180)}
          y2={y + r * Math.sin((deg * Math.PI) / 180)}
        />
      ))}
    </g>
  );
}

function WinterDiploma({ ws }: { ws: WorksheetDict }) {
  const l = ws.labels.winterPack;
  const line = { stroke: INK, strokeWidth: 1.5 } as const;
  const outline = { stroke: INK, strokeWidth: 2.5, fill: 'none' } as const;
  return (
    <svg viewBox="0 0 600 640" className="block w-full" role="img" aria-label={l.diplomaHeading}>
      <rect x={6} y={6} width={588} height={628} rx={22} fill="none" stroke={INK} strokeWidth={3} />
      <rect x={18} y={18} width={564} height={604} rx={14} fill="none" stroke={INK} strokeWidth={1} strokeDasharray="5 6" />
      {[
        [70, 70, 16],
        [530, 70, 16],
        [70, 570, 16],
        [530, 570, 16],
        [150, 130, 10],
        [450, 130, 10],
      ].map(([x, y, r]) => (
        <Flake key={`${x}-${y}`} x={x} y={y} r={r} />
      ))}
      <text x={300} y={112} textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize={54} fontWeight={700} fill={INK} letterSpacing={6}>
        {l.diplomaHeading}
      </text>
      <text x={300} y={160} textAnchor="middle" fontSize={17} fill={MUTED}>
        {l.diplomaFor}
      </text>
      <line x1={120} x2={480} y1={222} y2={222} {...line} />
      <text x={300} y={262} textAnchor="middle" fontSize={18} fill={INK}>
        {l.diplomaReason}
      </text>

      {/* Snješko */}
      <circle cx={300} cy={490} r={70} {...outline} />
      <circle cx={300} cy={385} r={48} {...outline} />
      <rect x={268} y={300} width={64} height={42} rx={4} {...outline} />
      <line x1={252} x2={348} y1={342} y2={342} stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={284} cy={375} r={4} fill={INK} />
      <circle cx={316} cy={375} r={4} fill={INK} />
      <path d="M300 386 L330 394 L300 398 Z" {...outline} strokeLinejoin="round" />
      <path d="M282 410 Q300 422 318 410" {...outline} strokeLinecap="round" />
      {[460, 490, 520].map((cy) => (
        <circle key={cy} cx={300} cy={cy} r={5} fill={INK} />
      ))}
      <path d="M254 470 L196 430 M206 437 L196 418 M206 437 L186 440" {...outline} strokeLinecap="round" />
      <path d="M346 470 L404 430 M394 437 L404 418 M394 437 L414 440" {...outline} strokeLinecap="round" />

      <line x1={60} x2={230} y1={598} y2={598} {...line} />
      <text x={145} y={616} textAnchor="middle" fontSize={12} fill={MUTED}>
        {ws.date}
      </text>
      <line x1={370} x2={540} y1={598} y2={598} {...line} />
      <text x={455} y={616} textAnchor="middle" fontSize={12} fill={MUTED}>
        {l.signature}
      </text>
    </svg>
  );
}

/** Vlastite strane paketa: prva ide na početak, ostale poslije dnevnih listova. */
export function winterBreakPackPages(ws: WorksheetDict): ReactNode[] {
  const days = WORKSHEET_PACKS.winterBreakPack ?? [];
  return [<WinterPlan key="plan" days={days} ws={ws} />, <WinterDiploma key="diploma" ws={ws} />];
}
