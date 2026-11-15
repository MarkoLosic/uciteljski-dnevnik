// Vježbanka „Vježbam kod kuće — matematika, 2. razred“: plan vježbanja, 12 dana po jedna strana,
// završni izazov sa diplomom i rješenja za roditelje. Rješenja računskih zadataka se računaju u kodu,
// pa se ne mogu razići sa zadacima. Papir je uvijek bijel, pa su boje fiksne.
import type { ReactNode } from 'react';
import { Bone, Star, type LucideIcon } from 'lucide-react';

const INK = '#111827';

type Op = '+' | '−' | '·';
type Expr = readonly [number, Op, number];

function solve([a, op, b]: Expr): number {
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  return a * b;
}

const exprText = ([a, op, b]: Expr) => `${a} ${op} ${b}`;

// ---------- osnovni dijelovi strane ----------

// Njuško, koker španijel: okrugla glava, duge kovrdžave uši i crni nos. Crtež je naš, da lik bude prepoznatljiv.
function Njusko({ size, className = '' }: { size: number; className?: string }) {
  const fur = '#d4934a';
  const ear = '#a8622a';
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <path
        d="M33 30 C16 28 9 48 10 68 C10 76 12 84 17 88 C19 84 22 90 26 87 C28 92 33 90 34 85 C37 88 41 84 39 78 L40 40 Z"
        fill={ear}
        stroke={INK}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M67 30 C84 28 91 48 90 68 C90 76 88 84 83 88 C81 84 78 90 74 87 C72 92 67 90 66 85 C63 88 59 84 61 78 L60 40 Z"
        fill={ear}
        stroke={INK}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M17 60 q4 4 2 9 M23 70 q4 4 2 9 M83 60 q-4 4 -2 9 M77 70 q-4 4 -2 9" fill="none" stroke={INK} strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="50" cy="47" rx="22" ry="25" fill={fur} stroke={INK} strokeWidth="2" />
      <path d="M40 24 q3 -6 7 -1 q3 -6 7 -1 q3 -5 6 1" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="50" cy="61" rx="13" ry="10.5" fill="#f5d9b0" stroke={INK} strokeWidth="1.6" />
      <circle cx="41.5" cy="45" r="3.6" fill={INK} />
      <circle cx="58.5" cy="45" r="3.6" fill={INK} />
      <circle cx="42.7" cy="43.8" r="1.1" fill="#fff" />
      <circle cx="59.7" cy="43.8" r="1.1" fill="#fff" />
      <path d="M37 39 q4 -3 8 -1 M55 38 q4 -2 8 1" fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
      <ellipse cx="50" cy="56" rx="4.8" ry="3.4" fill={INK} />
      <path d="M50 59.5 v3.5 M50 63 q-4 3.5 -7.5 0.5 M50 63 q4 3.5 7.5 0.5" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M47 65.5 q3 7 6 0 Z" fill="#f472b6" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}


interface DayProps {
  day: number;
  topic: string;
  color: string;
  rule: ReactNode;
  children: ReactNode;
}

function Day({ day, topic, color, rule, children }: DayProps) {
  return (
    <div className="grid gap-[5mm] text-[#111827]">
      <div className="flex items-stretch gap-3">
        <div
          className="flex w-[22mm] shrink-0 flex-col items-center justify-center rounded-xl text-white"
          style={{ background: color }}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider">Dan</span>
          <span className="text-[28px] leading-none font-extrabold">{day}</span>
        </div>
        <div className="flex-1 rounded-xl border-2 px-3 py-2" style={{ borderColor: color }}>
          <p className="text-[17px] font-extrabold leading-tight">{topic}</p>
          <div className="mt-1 flex items-start gap-2 text-[13px] leading-snug">
            <Njusko size={24} className="-mt-0.5 shrink-0" />
            <span>
              <strong>Njuško kaže:</strong> {rule}
            </span>
          </div>
        </div>
      </div>
      {children}
      <SelfCheck color={color} />
    </div>
  );
}

function Task({ n, title, children }: { n: number; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="grid gap-[2mm]">
      <p className="flex gap-2 text-[14.5px] font-semibold leading-snug">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#111827] text-[12px] font-bold">
          {n}
        </span>
        <span>{title}</span>
      </p>
      {children && <div className="pl-8">{children}</div>}
    </section>
  );
}

const Blank = ({ w = 'w-[14mm]' }: { w?: string }) => (
  <span className={`inline-block ${w} border-b-[1.5px] border-[#111827] align-baseline`}>&#8203;</span>
);

function Drill({ items, cols = 3 }: { items: readonly Expr[]; cols?: 3 | 4 }) {
  return (
    <div className={`grid gap-x-6 gap-y-[4.5mm] font-mono text-[16px] ${cols === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
      {items.map((e) => (
        <span key={exprText(e)}>
          {exprText(e)} = <Blank />
        </span>
      ))}
    </div>
  );
}

function AnswerLine({ label = 'Odgovor:' }: { label?: string }) {
  return (
    <p className="mt-[3mm] flex gap-2 text-[14px]">
      <span>{label}</span>
      <span className="flex-1 border-b-[1.5px] border-[#111827]" />
    </p>
  );
}

function CalcAndAnswer() {
  return (
    <>
      <p className="mt-[2mm] flex gap-2 text-[14px]">
        <span>Račun:</span>
        <span className="w-[60mm] border-b-[1.5px] border-[#111827]" />
      </p>
      <AnswerLine />
    </>
  );
}

// Lice za samoprocjenu: mood 1 = nasmijano, 0 = ravno, -1 = tužno.
function FaceIcon({ mood, size = 26 }: { mood: 1 | 0 | -1; size?: number }) {
  const mouth =
    mood === 1 ? 'M8 15.5 Q13 20 18 15.5' : mood === 0 ? 'M8.5 17 H17.5' : 'M8 18.5 Q13 14 18 18.5';
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" aria-hidden="true">
      <circle cx="13" cy="13" r="11.5" fill="none" stroke={INK} strokeWidth="1.6" />
      <circle cx="9" cy="10" r="1.4" fill={INK} />
      <circle cx="17" cy="10" r="1.4" fill={INK} />
      <path d={mouth} fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SelfCheck({ color }: { color: string }) {
  return (
    <div
      className="mt-[1mm] flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-dashed px-3 py-2 text-[13px]"
      style={{ borderColor: color }}
    >
      <span className="flex items-center gap-2 font-semibold">
        Kako mi je išlo? Zaokruži:
        <FaceIcon mood={1} />
        <FaceIcon mood={0} />
        <FaceIcon mood={-1} />
      </span>
      <span>
        Potpis roditelja: <Blank w="w-[38mm]" />
      </span>
    </div>
  );
}

function Icons({ Icon, n, size = 18, color = INK }: { Icon: LucideIcon; n: number; size?: number; color?: string }) {
  return (
    <span className="inline-flex flex-wrap gap-0.5">
      {Array.from({ length: n }, (_, i) => (
        <Icon key={i} aria-hidden="true" width={size} height={size} color={color} strokeWidth={1.8} />
      ))}
    </span>
  );
}

// ---------- sat ----------

function Clock({ hour, minute, hands = true, size = 112 }: { hour: number; minute: number; hands?: boolean; size?: number }) {
  const c = 50;
  const at = (deg: number, len: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [c + len * Math.cos(rad), c + len * Math.sin(rad)] as const;
  };
  const [hx, hy] = at(((hour % 12) + minute / 60) * 30, 24);
  const [mx, my] = at(minute * 6, 36);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx={c} cy={c} r="46" fill="#fff" stroke={INK} strokeWidth="2.5" />
      {Array.from({ length: 60 }, (_, i) => {
        const [x1, y1] = at(i * 6, i % 5 === 0 ? 39 : 42);
        const [x2, y2] = at(i * 6, 45);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={i % 5 === 0 ? 1.8 : 0.7} />;
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const [x, y] = at((i + 1) * 30, 32);
        return (
          <text key={i} x={x} y={y + 3.6} textAnchor="middle" fontSize="10" fontWeight="700" fill={INK} fontFamily="Inter, system-ui, sans-serif">
            {i + 1}
          </text>
        );
      })}
      {hands && (
        <>
          <line x1={c} y1={c} x2={hx} y2={hy} stroke={INK} strokeWidth="4" strokeLinecap="round" />
          <line x1={c} y1={c} x2={mx} y2={my} stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
        </>
      )}
      <circle cx={c} cy={c} r="2.6" fill={INK} />
    </svg>
  );
}

// ---------- novac (KM i feninzi) ----------

function Coin({ label, big = false }: { label: string; big?: boolean }) {
  const s = big ? 52 : 44;
  return (
    <svg width={s} height={s} viewBox="0 0 52 52" aria-label={label} role="img">
      <circle cx="26" cy="26" r="24" fill="#fef3c7" stroke={INK} strokeWidth="2" />
      <circle cx="26" cy="26" r="19" fill="none" stroke={INK} strokeWidth="0.8" strokeDasharray="2 2" />
      <text x="26" y="30" textAnchor="middle" fontSize="11.5" fontWeight="800" fill={INK} fontFamily="Inter, system-ui, sans-serif">
        {label}
      </text>
    </svg>
  );
}

function Note({ label }: { label: string }) {
  return (
    <svg width="92" height="46" viewBox="0 0 92 46" aria-label={label} role="img">
      <rect x="1.5" y="1.5" width="89" height="43" rx="5" fill="#dcfce7" stroke={INK} strokeWidth="2" />
      <rect x="7" y="7" width="78" height="32" rx="3" fill="none" stroke={INK} strokeWidth="0.8" strokeDasharray="3 2" />
      <text x="46" y="29" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK} fontFamily="Inter, system-ui, sans-serif">
        {label}
      </text>
    </svg>
  );
}

function Money({ items }: { items: readonly string[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      {items.map((m, i) => (m.endsWith('KM') && Number.parseInt(m, 10) >= 10 ? <Note key={i} label={m} /> : <Coin key={i} label={m} />))}
    </span>
  );
}

// ---------- podaci i rješenja ----------

const D1_DRILL: Expr[] = [
  [34, '+', 25], [52, '+', 16], [40, '+', 38], [61, '+', 7], [23, '+', 45], [70, '+', 20],
  [13, '+', 84], [56, '+', 30], [44, '+', 44], [5, '+', 72], [31, '+', 57], [26, '+', 63],
];
const D1_PLACE: [number, number][] = [[4, 7], [6, 2], [9, 0], [3, 8]];
const D1_SPLIT = [58, 70, 16];
const D1_TO_TEN = [34, 67, 81, 22];

const D2_DRILL: Expr[] = [
  [78, '−', 25], [96, '−', 43], [59, '−', 30], [87, '−', 6], [64, '−', 24], [100, '−', 40],
  [45, '−', 12], [99, '−', 58], [70, '−', 50], [38, '−', 17], [86, '−', 61], [57, '−', 7],
];
const D2_CHAIN_START = 95;
const D2_CHAIN: Expr[] = [[0, '−', 20], [0, '−', 4], [0, '−', 30], [0, '−', 11]];
const D2_CHECK: [number, number][] = [[76, 34], [89, 27], [58, 15]];

const D3_SPLIT: { a: number; op: '+' | '−'; b: number; first: number }[] = [
  { a: 38, op: '+', b: 7, first: 2 },
  { a: 56, op: '+', b: 8, first: 4 },
  { a: 43, op: '−', b: 6, first: 3 },
  { a: 72, op: '−', b: 5, first: 2 },
];
const D3_DRILL: Expr[] = [
  [47, '+', 28], [39, '+', 36], [65, '+', 19], [28, '+', 54], [73, '−', 38], [91, '−', 47],
  [60, '−', 24], [82, '−', 56], [46, '+', 46], [54, '−', 29], [17, '+', 68], [100, '−', 63],
];

const D4_FILL: [string, number][] = [
  ['8 + 57 = 57 + ___', 8],
  ['23 + 40 = ___ + 23', 40],
  ['___ + 19 = 19 + 70', 70],
  ['5 + 88 = 88 + ___', 5],
];
const D4_EASY: [number, number][] = [[4, 68], [7, 85], [9, 33], [6, 77]];
const D4_LEFT: [number, number][] = [[15, 30], [42, 9], [6, 51], [27, 20]];
const D4_RIGHT_ORDER = [1, 3, 0, 2]; // desna kolona: zamijenjeni sabirci, ispremetani redoslijed

const D5_TWO_WAYS: [number, number, number][] = [[12, 8, 25], [30, 14, 6]];
const D5_TRIPLES: [number, number, number][] = [[7, 3, 46], [15, 9, 5], [34, 8, 2], [6, 23, 4], [18, 7, 2], [41, 9, 30]];

const D6_NUMBERS: [number, number][] = [[47, 74], [60, 59], [38, 38], [91, 19], [55, 65], [80, 8]];
const D6_EXPR: [Expr, Expr | number][] = [
  [[30, '+', 15], 50],
  [[64, '−', 4], 60],
  [[27, '+', 8], 36],
  [[90, '−', 30], [50, '+', 5]],
  [[45, '+', 5], [25, '+', 25]],
  [[73, '−', 9], 70],
];
const D6_ORDER = [58, 85, 15, 51, 80, 8];

const D7_GROUPS: [number, number][] = [[3, 4], [5, 2], [2, 6]];
const D7_TO_PRODUCT: [number, number][] = [[3, 7], [4, 10], [6, 5]];
const D7_TO_SUM: [number, number][] = [[4, 3], [2, 9], [5, 1]];

const D8_DRILL: Expr[] = [
  [2, '·', 6], [5, '·', 4], [10, '·', 7], [3, '·', 3], [4, '·', 5], [2, '·', 9],
  [5, '·', 8], [3, '·', 6], [10, '·', 10], [4, '·', 4], [2, '·', 7], [5, '·', 5],
  [3, '·', 9], [4, '·', 8], [10, '·', 3], [5, '·', 9], [3, '·', 7], [4, '·', 6],
];
const D8_SEQ: [number, number][] = [[5, 5], [4, 4], [3, 3]]; // [početak, korak]
const D8_ZERO_ONE: Expr[] = [[7, '·', 1], [0, '·', 9], [1, '·', 10], [6, '·', 0]];

const D9_READ: [number, number][] = [[3, 0], [7, 30], [11, 0], [12, 30]];
const D9_DRAW: [number, number][] = [[5, 0], [9, 30]];
const D9_FACTS: [string, string][] = [
  ['1 sat = ___ minuta', '60'],
  ['pola sata = ___ minuta', '30'],
  ['1 dan = ___ sata', '24'],
  ['1 sedmica = ___ dana', '7'],
];

const MONTHS = ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'];
const DAYS = ['ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota', 'nedjelja'];
const D10_NEXT = ['mart', 'jul', 'decembar'];
const D10_DAYS_IN = ['januar', 'april', 'jun'];
const DAYS_IN_MONTH: Record<string, number> = { januar: 31, april: 30, jun: 30 };

const D11_PURSES: string[][] = [
  ['2 KM', '2 KM', '1 KM'],
  ['10 KM', '5 KM', '2 KM', '1 KM'],
  ['50 f', '20 f', '20 f', '10 f'],
];
const PURSE_ANSWERS = ['5 KM', '18 KM', '100 feninga = 1 KM'];
const D11_PRICES: [string, number][] = [['sveska', 2], ['olovka', 1], ['bojice', 8], ['ranac', 45]];

const D12_PICTO: [string, number][] = [['Njuško', 8], ['Reks', 5], ['Lola', 3], ['Bubi', 6]];
const D12_BARS: [string, number][] = [['jabuka', 6], ['banana', 4], ['kruška', 2], ['šljiva', 5]];

const MAGIC: (number | null)[][] = [[2, null, 6], [null, 5, null], [4, null, 8]];
const MAGIC_FULL = [[2, 7, 6], [9, 5, 1], [4, 3, 8]];
const PYRAMID_BASE = [12, 15, 9];

const cmp = (a: number, b: number) => (a < b ? '<' : a > b ? '>' : '=');
const value = (x: Expr | number) => (typeof x === 'number' ? x : solve(x));
const list = (xs: (string | number)[]) => xs.join(', ');
const seq = ([start, step]: [number, number]) => [3, 4, 5].map((i) => start + step * i);
const timeText = (h: number, m: number) => `${h}:${String(m).padStart(2, '0')}`;
const sum = (xs: readonly number[]) => xs.reduce((a, b) => a + b, 0);
const sortedNumbers = [...D6_ORDER].sort((a, b) => a - b);
const pyramidMid = [PYRAMID_BASE[0] + PYRAMID_BASE[1], PYRAMID_BASE[1] + PYRAMID_BASE[2]];

function chain(): number[] {
  const out: number[] = [];
  let n = D2_CHAIN_START;
  for (const [, op, b] of D2_CHAIN) {
    n = solve([n, op, b]);
    out.push(n);
  }
  return out;
}

const ANSWERS: [string, string[]][] = [
  ['Dan 1', [
    `1) ${list(D1_DRILL.map(solve))}`,
    `2) ${list(D1_PLACE.map(([d, j]) => d * 10 + j))}; ${D1_SPLIT.map((n) => `${n} = ${Math.floor(n / 10)} D ${n % 10} J`).join('; ')}`,
    `3) ${list(D1_TO_TEN.map((n) => 10 - (n % 10)))}`,
    '4) 32 + 45 = 77 keksića',
  ]],
  ['Dan 2', [
    `1) ${list(D2_DRILL.map(solve))}`,
    `2) ${list(chain())}`,
    `3) ${D2_CHECK.map(([a, b]) => `${a - b} + ${b} = ${a}`).join('; ')}`,
    '4) 68 − 25 = 43 goluba',
  ]],
  ['Dan 3', [
    `1) ${D3_SPLIT.map(({ a, op, b, first }) => `${b - first}, ${op === '+' ? a + b : a - b}`).join('; ')}`,
    `2) ${list(D3_DRILL.map(solve))}`,
    '3) 63 − 27 = 36 koščica',
  ]],
  ['Dan 4', [
    `1) ${list(D4_FILL.map(([, n]) => n))}`,
    `2) ${list(D4_EASY.map(([a, b]) => a + b))}`,
    `3) ${D4_LEFT.map(([a, b]) => `${a} + ${b} = ${b} + ${a} = ${a + b}`).join('; ')}`,
    '4) Da, 25 + 18 = 18 + 25 = 43',
  ]],
  ['Dan 5', [
    `1) ${D5_TWO_WAYS.map((t) => `${sum(t)} i ${sum(t)}`).join('; ')}`,
    `2) ${list(D5_TRIPLES.map(sum))}`,
    '3) 25 + 15 + 18 = 40 + 18 = 58 keksića',
  ]],
  ['Dan 6', [
    `1) ${list(D6_NUMBERS.map(([a, b]) => cmp(a, b)))}`,
    `2) ${list(D6_EXPR.map(([l, r]) => cmp(value(l), value(r))))}`,
    `3) ${list(sortedNumbers)}`,
    '4) 94 i 49',
    '5) 37, 38, 39, 40, 41',
  ]],
  ['Dan 7', [
    `1) ${D7_GROUPS.map(([g, n]) => `${Array(g).fill(n).join(' + ')} = ${g} · ${n} = ${g * n}`).join('; ')}`,
    `2) ${D7_TO_PRODUCT.map(([g, n]) => `${g} · ${n} = ${g * n}`).join('; ')}`,
    `3) ${D7_TO_SUM.map(([g, n]) => `${Array(g).fill(n).join(' + ')} = ${g * n}`).join('; ')}`,
    '4) 2 reda po 5 kružića, ukupno 10',
  ]],
  ['Dan 8', [
    `1) ${list(D8_DRILL.map(solve))}`,
    `2) ${D8_SEQ.map((s) => list(seq(s))).join('; ')}`,
    '3) 4 · 5 = 20 keksića',
    `4) ${list(D8_ZERO_ONE.map(solve))}`,
  ]],
  ['Dan 9', [
    `1) ${list(D9_READ.map(([h, m]) => timeText(h, m)))}`,
    `3) ${list(D9_FACTS.map(([, a]) => a))}`,
    '4) 3 sata',
  ]],
  ['Dan 10', [
    `1) ${list(D10_NEXT.map((m) => MONTHS[(MONTHS.indexOf(m) + 1) % 12]))}`,
    `2) ${list(D10_DAYS_IN.map((m) => DAYS_IN_MONTH[m]))}; februar 28 (u prestupnoj godini 29)`,
    `3) ${DAYS[(DAYS.indexOf('srijeda') + 3) % 7]}; ${DAYS[(DAYS.indexOf('srijeda') + 5) % 7]}`,
    '4) u pola sedam (18:30)',
    '5) 12 mjeseci, 4 godišnja doba',
  ]],
  ['Dan 11', [
    `1) ${list(PURSE_ANSWERS)}`,
    '2) 2 + 8 = 10 KM; 20 − 8 = 12 KM; 3 · 2 = 6 KM',
    '3) npr. 2 KM + 2 KM; 2 KM + 1 KM + 1 KM; 1 KM + 1 KM + 1 KM + 1 KM',
    '4) 50 − 45 = 5 KM',
  ]],
  ['Dan 12', [
    `1) Njuško; ${D12_PICTO[0][1] - D12_PICTO[2][1]}; ${sum(D12_PICTO.map(([, n]) => n))}`,
    `2) jabuka; kruška; ${sum(D12_BARS.map(([, n]) => n))} učenika`,
  ]],
  ['Izazov', [
    `1) ${list([MAGIC_FULL[0][1], MAGIC_FULL[1][0], MAGIC_FULL[1][2], MAGIC_FULL[2][1]])} (zbir 15)`,
    '2) 60 − 25 = 35',
    `3) ${list(pyramidMid)}, vrh ${sum(pyramidMid)}`,
    '4) 14, 17',
    '5) 3 · 6 = 18 KM',
  ]],
];

// ---------- strane ----------

const COLORS = ['#2563eb', '#dc2626', '#7c3aed', '#0d9488', '#ea580c', '#16a34a', '#db2777', '#ca8a04', '#0891b2', '#4f46e5', '#b45309', '#059669'];
const TOPICS = [
  'Sabiranje do 100',
  'Oduzimanje do 100',
  'Prelaz preko desetice',
  'Zamjena mjesta sabiraka',
  'Združivanje sabiraka',
  'Veće, manje, jednako',
  'Množenje je sabiranje istih brojeva',
  'Tablica množenja: 2, 3, 4, 5 i 10',
  'Sat i mjerenje vremena',
  'Dani, mjeseci i kalendar',
  'Novac: KM i feninzi',
  'Grafikoni',
];

function PlanPage() {
  return (
    <div className="grid gap-[5mm] text-[#111827]">
      <div className="flex items-center gap-4 rounded-2xl border-2 border-[#16a34a] bg-[#f0fdf4] p-4">
        <Njusko size={80} className="shrink-0" />
        <p className="text-[15px] leading-snug">
          Zdravo! Ja sam <strong>Njuško</strong>, koker španijel. Volim da njuškam i tražim zakopane koščice, a ti ćeš skupljati zvjezdice. Svaki dan uradi
          <strong> jednu stranu</strong>. Kad je završiš, oboji zvjezdicu pored tog dana.
        </p>
      </div>
      <table className="w-full border-collapse text-[14px]">
        <thead>
          <tr className="text-left">
            <th className="border-2 border-[#111827] px-2 py-1.5">Dan</th>
            <th className="border-2 border-[#111827] px-2 py-1.5">Tema</th>
            <th className="border-2 border-[#111827] px-2 py-1.5">Datum</th>
            <th className="border-2 border-[#111827] px-2 py-1.5 text-center">Zvjezdica</th>
          </tr>
        </thead>
        <tbody>
          {TOPICS.map((topic, i) => (
            <tr key={topic}>
              <td className="border-2 border-[#111827] px-2 py-[1.6mm] font-bold" style={{ color: COLORS[i] }}>
                {i + 1}.
              </td>
              <td className="border-2 border-[#111827] px-2 py-[1.6mm]">{topic}</td>
              <td className="w-[28mm] border-2 border-[#111827]" />
              <td className="w-[24mm] border-2 border-[#111827] text-center">
                <Star aria-hidden="true" className="inline h-6 w-6" strokeWidth={1.6} />
              </td>
            </tr>
          ))}
          <tr>
            <td className="border-2 border-[#111827] px-2 py-[1.6mm] font-bold">★</td>
            <td className="border-2 border-[#111827] px-2 py-[1.6mm] font-semibold">Veliki izazov i diploma</td>
            <td className="border-2 border-[#111827]" />
            <td className="border-2 border-[#111827] text-center">
              <Star aria-hidden="true" className="inline h-6 w-6" strokeWidth={1.6} />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="rounded-xl border-2 border-dashed border-[#6b7280] p-3 text-[13px] leading-snug">
        <p className="font-bold">Za roditelje</p>
        <ul className="mt-1 list-disc pl-5">
          <li>Jedna strana dnevno, 15–20 minuta, u isto vrijeme. Bolje kratko i redovno nego mnogo odjednom.</li>
          <li>Neka dijete naglas objasni kako je računalo; tako se vidi gdje zapinje.</li>
          <li>Diploma i rješenja su na posljednje dvije strane — provjerite zajedno i pohvalite trud, ne samo tačan rezultat.</li>
          <li>Za novac i sat koristite prave kovanice i sat u kući.</li>
        </ul>
      </div>
    </div>
  );
}

function Day1() {
  return (
    <Day day={1} topic={TOPICS[0]} color={COLORS[0]} rule={<>Prvo saberi jedinice, pa desetice. 34 + 25: 4 + 5 = 9, 30 + 20 = 50, ukupno 59.</>}>
      <Task n={1} title="Izračunaj.">
        <Drill items={D1_DRILL} />
      </Task>
      <Task n={2} title="Desetice (D) i jedinice (J). Napiši broj, pa rastavi.">
        <div className="grid grid-cols-4 gap-3 font-mono text-[15px]">
          {D1_PLACE.map(([d, j]) => (
            <span key={`${d}${j}`}>
              {d} D {j} J = <Blank w="w-[10mm]" />
            </span>
          ))}
          {D1_SPLIT.map((n) => (
            <span key={n} className="col-span-1">
              {n} = <Blank w="w-[6mm]" /> D <Blank w="w-[6mm]" /> J
            </span>
          ))}
        </div>
      </Task>
      <Task n={3} title="Koliko nedostaje do sljedeće desetice?">
        <div className="grid grid-cols-4 gap-3 font-mono text-[15px]">
          {D1_TO_TEN.map((n) => (
            <span key={n}>
              {n} + <Blank w="w-[8mm]" /> = {n + 10 - (n % 10)}
            </span>
          ))}
        </div>
      </Task>
      <Task n={4} title="Njuško je u ponedjeljak dobio 32 keksića, a u utorak 45. Koliko je keksića dobio za ta dva dana?">
        <CalcAndAnswer />
      </Task>
    </Day>
  );
}

function Day2() {
  const steps = D2_CHAIN.map(([, op, b]) => `${op} ${b}`);
  return (
    <Day day={2} topic={TOPICS[1]} color={COLORS[1]} rule={<>Oduzimanje provjeravaš sabiranjem: 76 − 34 = 42, jer je 42 + 34 = 76.</>}>
      <Task n={1} title="Izračunaj.">
        <Drill items={D2_DRILL} />
      </Task>
      <Task n={2} title="Njuškov lanac. Računaj redom i upiši broj u svaki kvadrat.">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[15px]">
          <span className="rounded-lg border-2 border-[#111827] bg-[#fee2e2] px-3 py-2 font-bold">{D2_CHAIN_START}</span>
          {steps.map((s) => (
            <span key={s} className="flex items-center gap-2">
              <span className="text-[13px]">→ {s} →</span>
              <span className="inline-block h-10 w-12 rounded-lg border-2 border-[#111827]" />
            </span>
          ))}
        </div>
      </Task>
      <Task n={3} title="Provjeri sabiranjem. Upiši razliku, pa saberi.">
        <div className="grid gap-[2.5mm] font-mono text-[15px]">
          {D2_CHECK.map(([a, b]) => (
            <span key={a}>
              {a} − {b} = <Blank w="w-[10mm]" />   jer je <Blank w="w-[10mm]" /> + {b} = <Blank w="w-[10mm]" />
            </span>
          ))}
        </div>
      </Task>
      <Task n={4} title="U parku je bilo 68 golubova. Kad je Njuško zalajao, 25 golubova je odletjelo. Koliko ih je ostalo?">
        <CalcAndAnswer />
      </Task>
    </Day>
  );
}

function Day3() {
  return (
    <Day day={3} topic={TOPICS[2]} color={COLORS[2]} rule={<>Idi preko desetice u dva koraka: 38 + 7 = 38 + 2 + 5 = 40 + 5 = 45.</>}>
      <Task n={1} title="Računaj u dva koraka.">
        <div className="grid grid-cols-2 gap-x-6 gap-y-[3mm] font-mono text-[15px]">
          {D3_SPLIT.map(({ a, op, b, first }) => (
            <span key={a}>
              {a} {op} {b} = {a} {op} {first} {op} <Blank w="w-[8mm]" /> = <Blank w="w-[10mm]" />
            </span>
          ))}
        </div>
      </Task>
      <Task n={2} title="Izračunaj. Pazi na prelaz preko desetice.">
        <Drill items={D3_DRILL} />
      </Task>
      <Task n={3} title="Njuško je u bašti zakopao 63 koščice. Do proljeća je iskopao 27. Koliko je koščica još zakopano?">
        <CalcAndAnswer />
      </Task>
    </Day>
  );
}

function Day4() {
  return (
    <Day day={4} topic={TOPICS[3]} color={COLORS[3]} rule={<>Kad sabirci zamijene mjesta, zbir ostaje isti: 6 + 39 = 39 + 6 = 45. Lakše je dodati mali broj velikom.</>}>
      <Task n={1} title="Dopuni broj koji nedostaje.">
        <div className="grid grid-cols-2 gap-x-6 gap-y-[3mm] font-mono text-[15px]">
          {D4_FILL.map(([text]) => (
            <span key={text}>{text}</span>
          ))}
        </div>
      </Task>
      <Task n={2} title="Zamijeni mjesta sabircima, pa izračunaj lakše.">
        <div className="grid grid-cols-2 gap-x-6 gap-y-[3mm] font-mono text-[15px]">
          {D4_EASY.map(([a, b]) => (
            <span key={a}>
              {a} + {b} = {b} + {a} = <Blank w="w-[10mm]" />
            </span>
          ))}
        </div>
      </Task>
      <Task n={3} title="Spoji linijom računa koji imaju isti zbir.">
        <div className="grid grid-cols-[1fr_1fr] gap-y-[3mm] font-mono text-[15px]">
          {D4_LEFT.map(([a, b], i) => {
            const [c, d] = D4_LEFT[D4_RIGHT_ORDER[i]];
            return (
              <div key={a} className="contents">
                <span>
                  {a} + {b} <span className="ml-2 inline-block h-2.5 w-2.5 rounded-full bg-[#111827]" />
                </span>
                <span>
                  <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#111827]" /> {d} + {c}
                </span>
              </div>
            );
          })}
        </div>
      </Task>
      <Task n={4} title="Ana je umjesto 18 + 25 sabrala 25 + 18. Da li je dobila isti zbir? Koliki je zbir?">
        <AnswerLine />
      </Task>
    </Day>
  );
}

function Day5() {
  return (
    <Day day={5} topic={TOPICS[4]} color={COLORS[4]} rule={<>Prvo saberi brojeve koji daju deseticu: 26 + 7 + 3 = 26 + (7 + 3) = 26 + 10 = 36.</>}>
      <Task n={1} title="Izračunaj na dva načina. Šta primjećuješ?">
        <div className="grid grid-cols-2 gap-x-6 gap-y-[3mm] font-mono text-[15px]">
          {D5_TWO_WAYS.map(([a, b, c]) => (
            <div key={a} className="grid gap-[2mm]">
              <span>
                ({a} + {b}) + {c} = <Blank w="w-[10mm]" />
              </span>
              <span>
                {a} + ({b} + {c}) = <Blank w="w-[10mm]" />
              </span>
            </div>
          ))}
        </div>
      </Task>
      <Task n={2} title="Zaokruži dva broja koji zajedno daju deseticu. Njih saberi prvo, pa izračunaj.">
        <div className="grid grid-cols-2 gap-x-6 gap-y-[3mm] font-mono text-[15px]">
          {D5_TRIPLES.map(([a, b, c]) => (
            <span key={`${a}${b}${c}`}>
              {a} + {b} + {c} = <Blank w="w-[10mm]" />
            </span>
          ))}
        </div>
      </Task>
      <Task n={3} title="Njuško je dobio tri kese keksića: u prvoj ih je 25, u drugoj 18, a u trećoj 15. Koliko je to keksića? Saberi na lakši način.">
        <CalcAndAnswer />
      </Task>
    </Day>
  );
}

function Day6() {
  return (
    <Day day={6} topic={TOPICS[5]} color={COLORS[5]} rule={<>Prvo uporedi desetice, a ako su iste — jedinice. Otvor znaka gleda prema većem broju: 47 &lt; 74.</>}>
      <Task n={1} title="Upiši znak <, > ili =.">
        <div className="grid grid-cols-3 gap-x-6 gap-y-[3mm] font-mono text-[15px]">
          {D6_NUMBERS.map(([a, b]) => (
            <span key={`${a}-${b}`}>
              {a} ◯ {b}
            </span>
          ))}
        </div>
      </Task>
      <Task n={2} title="Prvo izračunaj, pa uporedi.">
        <div className="grid grid-cols-2 gap-x-6 gap-y-[3mm] font-mono text-[15px]">
          {D6_EXPR.map(([l, r]) => (
            <span key={exprText(l)}>
              {exprText(l)} ◯ {typeof r === 'number' ? r : exprText(r)}
            </span>
          ))}
        </div>
      </Task>
      <Task n={3} title={`Poređaj od najmanjeg do najvećeg: ${D6_ORDER.join(', ')}`}>
        <p className="font-mono text-[15px]">
          {D6_ORDER.map((_, i) => (
            <span key={i}>
              <Blank w="w-[10mm]" />
              {i < D6_ORDER.length - 1 && ' < '}
            </span>
          ))}
        </p>
      </Task>
      <Task n={4} title="Od cifara 4 i 9 napiši najveći i najmanji dvocifreni broj (svaku cifru koristi jednom).">
        <p className="text-[14px]">
          najveći: <Blank /> najmanji: <Blank />
        </p>
      </Task>
      <Task n={5} title="Napiši sve brojeve koji su veći od 36, a manji od 42.">
        <AnswerLine label="" />
      </Task>
    </Day>
  );
}

function Day7() {
  return (
    <Day day={7} topic={TOPICS[6]} color={COLORS[6]} rule={<>3 činije po 4 koščice: 4 + 4 + 4 = 12, kraće 3 · 4 = 12. Prvi broj kaže koliko puta, drugi koliko u svakoj grupi.</>}>
      <Task n={1} title="Koliko je koščica? Napiši kao sabiranje i kao množenje.">
        <div className="grid gap-[3mm]">
          {D7_GROUPS.map(([g, n]) => (
            <div key={`${g}-${n}`} className="flex flex-wrap items-center gap-3">
              <span className="flex gap-2">
                {Array.from({ length: g }, (_, i) => (
                  <span key={i} className="rounded-lg border-2 border-[#db2777] px-1.5 py-1">
                    <Icons Icon={Bone} n={n} size={17} color="#92400e" />
                  </span>
                ))}
              </span>
              <span className="font-mono text-[14px]">
                <Blank w="w-[30mm]" /> = <Blank w="w-[8mm]" /> · <Blank w="w-[8mm]" /> = <Blank w="w-[8mm]" />
              </span>
            </div>
          ))}
        </div>
      </Task>
      <Task n={2} title="Napiši kao množenje i izračunaj.">
        <div className="grid gap-[2.5mm] font-mono text-[15px]">
          {D7_TO_PRODUCT.map(([g, n]) => (
            <span key={`${g}-${n}`}>
              {Array(g).fill(n).join(' + ')} = <Blank w="w-[8mm]" /> · <Blank w="w-[8mm]" /> = <Blank w="w-[10mm]" />
            </span>
          ))}
        </div>
      </Task>
      <Task n={3} title="Napiši kao sabiranje i izračunaj.">
        <div className="grid grid-cols-3 gap-x-6 font-mono text-[15px]">
          {D7_TO_SUM.map(([g, n]) => (
            <span key={`${g}-${n}`}>
              {g} · {n} = <Blank w="w-[26mm]" />
            </span>
          ))}
        </div>
      </Task>
      <Task n={4} title="Nacrtaj 2 · 5 kružića: 2 reda, u svakom redu 5 kružića. Koliko ih je ukupno?">
        <div className="h-[18mm] rounded-lg border-2 border-dashed border-[#9ca3af]" />
      </Task>
    </Day>
  );
}

function Day8() {
  return (
    <Day day={8} topic={TOPICS[7]} color={COLORS[7]} rule={<>Svaki broj puta 1 je taj isti broj, a svaki broj puta 0 je 0. 7 · 1 = 7, 7 · 0 = 0.</>}>
      <Task n={1} title="Izračunaj.">
        <Drill items={D8_DRILL} />
      </Task>
      <Task n={2} title="Nastavi brojanje.">
        <div className="grid gap-[2.5mm] font-mono text-[15px]">
          {D8_SEQ.map(([start, step]) => (
            <span key={start}>
              {[0, 1, 2].map((i) => start + step * i).join(', ')}, <Blank w="w-[9mm]" />, <Blank w="w-[9mm]" />, <Blank w="w-[9mm]" />
            </span>
          ))}
        </div>
      </Task>
      <Task n={3} title="Njuško ima 4 činije. U svakoj je 5 keksića. Koliko je keksića u svim činijama?">
        <CalcAndAnswer />
      </Task>
      <Task n={4} title="Množenje sa 1 i sa 0.">
        <Drill items={D8_ZERO_ONE} cols={4} />
      </Task>
    </Day>
  );
}

function Day9() {
  return (
    <Day day={9} topic={TOPICS[8]} color={COLORS[8]} rule={<>Mala kazaljka pokazuje sate, a velika minute. Kad je velika na 12 — pun sat, kad je na 6 — pola sata.</>}>
      <Task n={1} title="Koliko je sati? Napiši ispod sata.">
        <div className="flex justify-between">
          {D9_READ.map(([h, m]) => (
            <div key={`${h}${m}`} className="flex flex-col items-center gap-1">
              <Clock hour={h} minute={m} size={104} />
              <Blank w="w-[18mm]" />
            </div>
          ))}
        </div>
      </Task>
      <Task n={2} title="Nacrtaj kazaljke.">
        <div className="flex gap-10">
          {D9_DRAW.map(([h, m]) => (
            <div key={`${h}${m}`} className="flex flex-col items-center gap-1">
              <Clock hour={h} minute={m} hands={false} size={104} />
              <span className="font-mono text-[15px] font-bold">{timeText(h, m)}</span>
            </div>
          ))}
        </div>
      </Task>
      <Task n={3} title="Dopuni.">
        <div className="grid grid-cols-2 gap-x-6 gap-y-[2.5mm] text-[15px]">
          {D9_FACTS.map(([text]) => (
            <span key={text}>{text}</span>
          ))}
        </div>
      </Task>
      <Task n={4} title="Njuško je krenuo u šetnju u 2 sata, a vratio se u 5 sati. Koliko je trajala šetnja?">
        <AnswerLine />
      </Task>
    </Day>
  );
}

function Day10() {
  return (
    <Day day={10} topic={TOPICS[9]} color={COLORS[9]} rule={<>Godina ima 12 mjeseci. Mjesece možeš brojati na zglobovima šake: na kvržici je mjesec od 31 dan.</>}>
      <Task n={1} title="Koji mjesec dolazi poslije?">
        <div className="grid grid-cols-3 gap-x-6 text-[15px]">
          {D10_NEXT.map((m) => (
            <span key={m}>
              {m} → <Blank w="w-[22mm]" />
            </span>
          ))}
        </div>
      </Task>
      <Task n={2} title="Pogledaj kalendar. Koliko dana ima mjesec?">
        <div className="grid grid-cols-4 gap-x-4 text-[15px]">
          {[...D10_DAYS_IN, 'februar'].map((m) => (
            <span key={m}>
              {m}: <Blank w="w-[10mm]" />
            </span>
          ))}
        </div>
      </Task>
      <Task n={3} title="Danas je srijeda.">
        <div className="grid gap-[2.5mm] text-[15px]">
          <span>
            Koji će dan biti za 3 dana? <Blank w="w-[30mm]" />
          </span>
          <span>
            Koji je dan bio prije 2 dana? <Blank w="w-[30mm]" />
          </span>
        </div>
      </Task>
      <Task n={4} title="Crtani film počinje u 6 sati uveče i traje pola sata. Kada se završava?">
        <AnswerLine />
      </Task>
      <Task n={5} title="Koliko mjeseci ima godina? Koliko ima godišnjih doba?">
        <p className="text-[15px]">
          mjeseci: <Blank w="w-[10mm]" />   godišnjih doba: <Blank w="w-[10mm]" />
        </p>
      </Task>
    </Day>
  );
}

function Day11() {
  return (
    <Day day={11} topic={TOPICS[10]} color={COLORS[10]} rule={<>1 KM (konvertibilna marka) = 100 feninga (f). Prvo saberi novčanice, pa kovanice.</>}>
      <Task n={1} title="Koliko je novca u novčaniku?">
        <div className="grid gap-[2.5mm]">
          {D11_PURSES.map((items, i) => (
            <div key={i} className="flex flex-wrap items-center gap-3">
              <Money items={items} />
              <span className="text-[15px]">
                = <Blank w="w-[22mm]" />
              </span>
            </div>
          ))}
        </div>
      </Task>
      <Task n={2} title="Cijene u knjižari. Izračunaj.">
        <div className="mb-[2mm] flex flex-wrap gap-2 text-[14px]">
          {D11_PRICES.map(([item, price]) => (
            <span key={item} className="rounded-md border-2 border-[#b45309] px-2 py-0.5">
              {item} <strong>{price} KM</strong>
            </span>
          ))}
        </div>
        <div className="grid gap-[2mm] text-[14.5px]">
          <span>
            Koliko koštaju sveska i bojice zajedno? <Blank w="w-[22mm]" />
          </span>
          <span>
            Imaš 20 KM i kupiš bojice. Koliko ti ostaje? <Blank w="w-[22mm]" />
          </span>
          <span>
            Koliko koštaju 3 sveske? <Blank w="w-[22mm]" />
          </span>
        </div>
      </Task>
      <Task n={3} title="Kako možeš platiti 4 KM kovanicama od 1 KM i 2 KM? Napiši bar dva načina.">
        <AnswerLine label="" />
      </Task>
      <Task n={4} title="Mia, Njuškova vlasnica, plaća ranac novčanicom od 50 KM. Koliko će dobiti kusura?">
        <CalcAndAnswer />
      </Task>
    </Day>
  );
}

function Day12() {
  const max = 8;
  const cell = 9; // mm po jednom učeniku
  return (
    <Day day={12} topic={TOPICS[11]} color={COLORS[11]} rule={<>Grafikon pokazuje brojeve slikom. Uvijek pročitaj šta znači jedan znak ili jedan kvadratić.</>}>
      <Task n={1} title="Psi su u parku tražili sakrivene koščice. Koliko je koji pas pronašao? (jedan znak = 1 koščica)">
        <div className="grid gap-[1.5mm]">
          {D12_PICTO.map(([name, n]) => (
            <div key={name} className="flex items-center gap-3 border-b border-[#e5e7eb] pb-1">
              <span className="w-[24mm] text-[14px] font-semibold">{name}</span>
              <Icons Icon={Bone} n={n} size={18} color="#92400e" />
            </div>
          ))}
        </div>
        <div className="mt-[2mm] grid gap-[2mm] text-[14.5px]">
          <span>
            Ko je pronašao najviše? <Blank w="w-[28mm]" />
          </span>
          <span>
            Koliko je Njuško pronašao više od Lole? <Blank w="w-[14mm]" />
          </span>
          <span>
            Koliko su pronašli svi zajedno? <Blank w="w-[14mm]" />
          </span>
        </div>
      </Task>
      <Task n={2} title="Učenici su glasali za omiljeno voće. Oboji onoliko kvadratića koliko piše u tabeli.">
        <div className="flex items-start gap-6">
          <table className="border-collapse text-[14px]">
            <tbody>
              {D12_BARS.map(([name, n]) => (
                <tr key={name}>
                  <td className="border-2 border-[#111827] px-2 py-0.5">{name}</td>
                  <td className="border-2 border-[#111827] px-3 py-0.5 text-center font-bold">{n}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-end gap-2">
            <div className="flex flex-col-reverse text-right text-[10px]" style={{ height: `${max * cell}mm` }}>
              {Array.from({ length: max }, (_, i) => (
                <span key={i} style={{ height: `${cell}mm` }} className="flex items-center justify-end leading-none">
                  {i + 1}
                </span>
              ))}
            </div>
            {D12_BARS.map(([name]) => (
              <div key={name} className="flex flex-col items-center">
                <div className="flex flex-col-reverse border-l-2 border-b-2 border-[#111827]">
                  {Array.from({ length: max }, (_, i) => (
                    <span key={i} className="block border border-[#9ca3af]" style={{ width: `${cell + 2}mm`, height: `${cell}mm` }} />
                  ))}
                </div>
                <span className="mt-0.5 text-[11px]">{name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[2mm] grid gap-[2mm] text-[14.5px]">
          <span>
            Koje voće je najomiljenije? <Blank w="w-[24mm]" /> A najmanje omiljeno? <Blank w="w-[24mm]" />
          </span>
          <span>
            Koliko je učenika glasalo? <Blank w="w-[14mm]" />
          </span>
        </div>
      </Task>
    </Day>
  );
}

function ChallengePage() {
  return (
    <div className="grid gap-[4mm] text-[#111827]">
      <div className="rounded-xl border-2 border-[#111827] bg-[#fef9c3] px-3 py-2">
        <p className="text-[17px] font-extrabold">Veliki izazov</p>
        <p className="text-[13px]">Ovi zadaci traže malo više razmišljanja. Ne žuri — Njuško vjeruje u tebe!</p>
      </div>
      <Task n={1} title="Čarobni kvadrat: zbir u svakom redu i svakoj koloni je 15. Upiši brojeve koji nedostaju.">
        <table className="border-collapse font-mono text-[20px] font-bold">
          <tbody>
            {MAGIC.map((row, r) => (
              <tr key={r}>
                {row.map((n, c) => (
                  <td key={c} className="h-[13mm] w-[13mm] border-2 border-[#111827] text-center">
                    {n ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Task>
      <Task n={2} title="Zamislio sam broj. Kad mu dodam 25, dobijem 60. Koji sam broj zamislio?">
        <AnswerLine />
      </Task>
      <Task n={3} title="Piramida: svaki broj je zbir dva broja ispod njega.">
        <div className="flex flex-col items-center gap-1 font-mono text-[16px] font-bold">
          <span className="inline-block h-[11mm] w-[18mm] rounded border-2 border-[#111827]" />
          <span className="flex gap-1">
            <span className="inline-block h-[11mm] w-[18mm] rounded border-2 border-[#111827]" />
            <span className="inline-block h-[11mm] w-[18mm] rounded border-2 border-[#111827]" />
          </span>
          <span className="flex gap-1">
            {PYRAMID_BASE.map((n) => (
              <span key={n} className="flex h-[11mm] w-[18mm] items-center justify-center rounded border-2 border-[#111827] bg-[#f3f4f6]">
                {n}
              </span>
            ))}
          </span>
        </div>
      </Task>
      <Task n={4} title="Nastavi niz: 2, 5, 8, 11, ___, ___">
        <AnswerLine label="" />
      </Task>
      <Task n={5} title="Ulaznica za kino košta 6 KM. Mia i dvije drugarice kupuju ulaznice. Koliko plaćaju zajedno?">
        <CalcAndAnswer />
      </Task>
    </div>
  );
}

function DiplomaPage() {
  return (
    <div className="flex min-h-[200mm] flex-col items-center justify-center rounded-3xl border-[5px] border-double border-[#ca8a04] p-8 text-center text-[#111827]">
      <Icons Icon={Star} n={5} size={34} color="#ca8a04" />
      <p className="mt-6 text-[16px] font-bold uppercase tracking-[0.3em] text-[#a16207]">Diploma</p>
      <p className="mt-2 text-[30px] leading-tight font-extrabold">Vrijedni vježbač matematike</p>
      <Njusko size={150} className="mt-6" />
      <p className="mt-6 text-[18px]">
        dobija <Blank w="w-[90mm]" />
      </p>
      <p className="mt-4 max-w-[130mm] text-[16px] leading-snug">
        jer je uradio/la svih 12 dana vježbanja i Veliki izazov. Njuško je ponosan na tebe!
      </p>
      <p className="mt-12 flex w-full justify-between text-[14px]">
        <span>
          Datum: <Blank w="w-[36mm]" />
        </span>
        <span>
          Potpis: <Blank w="w-[46mm]" />
        </span>
      </p>
    </div>
  );
}

function AnswersPage() {
  return (
    <div className="text-[#111827]">
      <p className="mb-[3mm] rounded-lg bg-[#f3f4f6] px-3 py-2 text-[13px]">
        <strong>Rješenja za roditelje.</strong> Brojevi idu redom kojim su zadaci na strani (s lijeva na desno, red po red). Prvo pustite dijete da
        samo provjeri, pa zajedno pogledajte greške.
      </p>
      <div className="columns-2 gap-6 text-[11.5px] leading-snug">
        {ANSWERS.map(([title, lines]) => (
          <div key={title} className="mb-[3mm] break-inside-avoid">
            <p className="font-bold">{title}</p>
            {lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function homeWorkbookMath2Pages(): ReactNode[] {
  return [
    <PlanPage key="plan" />,
    <Day1 key="d1" />,
    <Day2 key="d2" />,
    <Day3 key="d3" />,
    <Day4 key="d4" />,
    <Day5 key="d5" />,
    <Day6 key="d6" />,
    <Day7 key="d7" />,
    <Day8 key="d8" />,
    <Day9 key="d9" />,
    <Day10 key="d10" />,
    <Day11 key="d11" />,
    <Day12 key="d12" />,
    <ChallengePage key="challenge" />,
    <DiplomaPage key="diploma" />,
    <AnswersPage key="answers" />,
  ];
}
