import { useLayoutEffect, useRef, useState, type ReactNode, type SVGProps } from 'react';
import {
  Apple,
  ArrowRight,
  Banana,
  Bell,
  Bike,
  Bird,
  Bone,
  Bug,
  Bus,
  Car,
  Carrot,
  Cat,
  Cherry,
  Cloud,
  Dog,
  Fish,
  Flower,
  Flower2,
  Grape,
  Heart,
  House,
  Key,
  Leaf,
  Moon,
  Plane,
  Rabbit,
  Rocket,
  Snail,
  Star,
  Sun,
  Turtle,
  Umbrella,
  type LucideIcon,
} from 'lucide-react';
import type { Shape, ToyColor, WorksheetId } from './ids';
import { shapePaths, toyHex } from './shared';
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
                    fontFamily={FONT}
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

// Listovi ispod crtaju celu stranu u jednom SVG-u širine 600; visina ≤ 660 staje na A4 ispod zaglavlja.
const W = 600;
const MUTED = '#6b7280';
const DASH = { fill: 'none', stroke: MUTED, strokeWidth: 2.5, strokeDasharray: '6 7', strokeLinecap: 'round' } as const;

function Page({ height, children }: { height: number; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="block w-full" aria-hidden="true">
      {children}
    </svg>
  );
}

interface PicProps {
  Icon: LucideIcon;
  x: number;
  y: number;
  size: number;
  filled?: boolean;
}

// Sličica centrirana na (x, y); `filled` je pun crni obris (senka).
function Pic({ Icon, x, y, size, filled = false }: PicProps) {
  return <Icon x={x - size / 2} y={y - size / 2} width={size} height={size} color={INK} fill={filled ? INK : 'none'} strokeWidth={2} />;
}

type ShapePathProps = { shape: Shape; x: number; y: number; size: number } & Omit<SVGProps<SVGPathElement>, 'x' | 'y'>;

function ShapePath({ shape, x, y, size, ...rest }: ShapePathProps) {
  return (
    <path
      d={shapePaths[shape]}
      transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 100})`}
      vectorEffect="non-scaling-stroke"
      strokeLinejoin="round"
      {...rest}
    />
  );
}

// Jedan element niza: sličica ili oblik (pun ili prazan), opciono druge veličine.
type Token = { Icon: LucideIcon; size?: number; filled?: boolean } | { shape: Shape; size?: number; filled?: boolean };

function TokenView({ token, x, y, size }: { token: Token; x: number; y: number; size: number }) {
  const s = token.size ?? size;
  if ('Icon' in token) return <Pic Icon={token.Icon} x={x} y={y} size={s} filled={token.filled} />;
  return <ShapePath shape={token.shape} x={x} y={y} size={s} fill={token.filled ? INK : 'none'} stroke={INK} strokeWidth={2.5} />;
}

function Label({ x, y, size, children, anchor = 'middle' }: { x: number; y: number; size: number; children: ReactNode; anchor?: 'start' | 'middle' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} dominantBaseline="central" fontSize={size} fontWeight="700" fontFamily={FONT} fill={INK}>
      {children}
    </text>
  );
}

const Divider = ({ y }: { y: number }) => <line x1="0" x2={W} y1={y} y2={y} stroke={GUIDE} strokeWidth="1.5" />;

const LINE_PAIRS: [LucideIcon, LucideIcon][] = [
  [Dog, Bone],
  [Rabbit, Carrot],
  [Bug, Flower2],
  [Car, House],
];

function LinesSheet() {
  return (
    <Page height={650}>
      {LINE_PAIRS.map(([From, To], i) => {
        const y = 32 + i * 64;
        return (
          <g key={i}>
            <line x1="70" x2="530" y1={y} y2={y} {...DASH} />
            <Pic Icon={From} x={34} y={y} size={44} />
            <Pic Icon={To} x={566} y={y} size={44} />
          </g>
        );
      })}
      <Divider y={262} />
      {Array.from({ length: 6 }, (_, i) => {
        const x = 55 + i * 98;
        return (
          <g key={i}>
            <Pic Icon={Cloud} x={x} y={300} size={44} />
            <line x1={x} x2={x} y1="332" y2="432" {...DASH} />
            <Pic Icon={Flower} x={x} y={462} size={40} />
          </g>
        );
      })}
      <Divider y={500} />
      {Array.from({ length: 4 }, (_, i) => {
        const x = 40 + i * 140;
        return (
          <g key={i}>
            <Pic Icon={Rocket} x={x} y={622} size={40} />
            <line x1={x + 22} y1="598" x2={x + 92} y2="546" {...DASH} />
            <Pic Icon={Moon} x={x + 108} y={532} size={34} />
          </g>
        );
      })}
    </Page>
  );
}

type Wave = 'zigzag' | 'wave' | 'arches' | 'cups' | 'castle' | 'saw' | 'loops';
const WAVES: Wave[] = ['zigzag', 'wave', 'arches', 'cups', 'castle', 'saw', 'loops'];

// Jedan period šare od x do x+p; svaka šara se vraća na istu visinu na kojoj je počela, pa se periodi nadovezuju.
function waveStartY(kind: Wave, y: number, a: number) {
  if (kind === 'wave') return y;
  if (kind === 'cups') return y - a;
  return y + a;
}

function wavePeriod(kind: Wave, x: number, y: number, p: number, a: number): string {
  switch (kind) {
    case 'zigzag':
      return `L${x + p / 2} ${y - a}L${x + p} ${y + a}`;
    case 'wave':
      return `Q${x + p / 4} ${y - 2 * a} ${x + p / 2} ${y}Q${x + (3 * p) / 4} ${y + 2 * a} ${x + p} ${y}`;
    case 'arches':
      return `C${x} ${y - a * 1.6} ${x + p} ${y - a * 1.6} ${x + p} ${y + a}`;
    case 'cups':
      return `C${x} ${y + a * 1.6} ${x + p} ${y + a * 1.6} ${x + p} ${y - a}`;
    case 'castle':
      return `L${x} ${y - a}L${x + p / 2} ${y - a}L${x + p / 2} ${y + a}L${x + p} ${y + a}`;
    case 'saw':
      return `L${x + p} ${y - a}L${x + p} ${y + a}`;
    case 'loops':
      return `C${x + 0.75 * p} ${y + a} ${x + 0.95 * p} ${y - a} ${x + 0.55 * p} ${y - a}C${x + 0.15 * p} ${y - a} ${x + 0.35 * p} ${y + a} ${x + p} ${y + a}`;
  }
}

function WavesSheet() {
  const p = 64;
  const a = 22;
  const x0 = 24;
  const periods = 8;
  return (
    <Page height={650}>
      {WAVES.map((kind, i) => {
        const y = 40 + i * 94;
        const sy = waveStartY(kind, y, a);
        const rest = Array.from({ length: periods - 1 }, (_, k) => wavePeriod(kind, x0 + (k + 1) * p, y, p, a)).join('');
        return (
          <g key={kind}>
            <path d={`M${x0 + p} ${sy}${rest}`} {...DASH} strokeLinejoin="round" />
            <path d={`M${x0} ${sy}${wavePeriod(kind, x0, y, p, a)}`} fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={x0} cy={sy} r="5" fill={INK} />
          </g>
        );
      })}
    </Page>
  );
}

const OUTLINE_SHAPES: Shape[] = ['circle', 'square', 'triangle', 'heart', 'star'];

function OutlinesSheet() {
  return (
    <Page height={630}>
      {OUTLINE_SHAPES.map((shape, r) =>
        [75, 225, 375, 525].map((x, c) =>
          c === 0 ? (
            <ShapePath key={`${shape}-${c}`} shape={shape} x={x} y={62 + r * 126} size={100} fill="none" stroke={INK} strokeWidth={3} />
          ) : (
            <ShapePath key={`${shape}-${c}`} shape={shape} x={x} y={62 + r * 126} size={100} {...DASH} />
          ),
        ),
      )}
    </Page>
  );
}

const SHAPE_COLORS: Record<Shape, ToyColor> = {
  circle: 'red',
  square: 'blue',
  triangle: 'yellow',
  star: 'green',
  heart: 'purple',
};

// Raspored je fiksan (ne nasumičan), da se list isto odštampa svaki put.
const COLOR_FIELD: Shape[] = [
  'star', 'circle', 'heart', 'square', 'triangle',
  'square', 'triangle', 'circle', 'star', 'heart',
  'heart', 'star', 'square', 'triangle', 'circle',
  'circle', 'square', 'triangle', 'heart', 'star',
];
const COLOR_SIZES = [86, 70, 94, 78, 90, 74, 96, 82, 70, 88];

function ColorsSheet({ colorNames }: SheetContext) {
  return (
    <Page height={650}>
      {OUTLINE_SHAPES.map((shape, i) => {
        const x = 60 + i * 120;
        const color = SHAPE_COLORS[shape];
        return (
          <g key={shape}>
            <ShapePath shape={shape} x={x} y={28} size={40} fill={toyHex[color]} stroke={INK} strokeWidth={1.5} />
            <text x={x} y={68} textAnchor="middle" fontSize="16" fontWeight="600" fontFamily={FONT} fill={INK}>
              {colorNames[color]}
            </text>
          </g>
        );
      })}
      <Divider y={92} />
      {COLOR_FIELD.map((shape, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const dx = ((i * 7) % 3) * 8 - 8;
        return (
          <ShapePath
            key={i}
            shape={shape}
            x={60 + col * 120 + dx}
            y={170 + row * 132 + (col % 2) * 12}
            size={COLOR_SIZES[i % COLOR_SIZES.length]}
            fill="none"
            stroke={INK}
            strokeWidth={2.5}
          />
        );
      })}
    </Page>
  );
}

// Sličice poređane u redove od po pet, centrirane oko (cx, cy).
function Group({ Icon, n, cx, cy, size, gap }: { Icon: LucideIcon; n: number; cx: number; cy: number; size: number; gap: number }) {
  const rows = Math.ceil(n / 5);
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const row = Math.floor(i / 5);
        const inRow = Math.min(5, n - row * 5);
        const x = cx + (i % 5) * gap - ((inRow - 1) * gap) / 2;
        const y = cy + row * gap - ((rows - 1) * gap) / 2;
        return <Pic key={i} Icon={Icon} x={x} y={y} size={size} />;
      })}
    </>
  );
}

const COUNT_ROWS: [LucideIcon, number, number[]][] = [
  [Apple, 3, [2, 3, 4]],
  [Fish, 5, [5, 6, 3]],
  [Star, 7, [8, 6, 7]],
  [Flower, 4, [4, 2, 5]],
  [Bird, 9, [7, 9, 8]],
  [Sun, 6, [6, 5, 9]],
];

function CountSheet() {
  return (
    <Page height={640}>
      {COUNT_ROWS.map(([Icon, n, options], i) => {
        const y = 50 + i * 106;
        return (
          <g key={i}>
            {i > 0 && <Divider y={y - 53} />}
            <Group Icon={Icon} n={n} cx={190} cy={y} size={36} gap={46} />
            {options.map((option, k) => (
              <Label key={k} x={440 + k * 58} y={y} size={36}>
                {option}
              </Label>
            ))}
          </g>
        );
      })}
    </Page>
  );
}

const QUANTITIES = [2, 4, 5, 3, 6, 8];

function QuantitySheet() {
  return (
    <Page height={650}>
      {QUANTITIES.map((n, i) => {
        const x = 10 + (i % 2) * 300;
        const y = 10 + Math.floor(i / 2) * 215;
        return (
          <g key={i}>
            <rect x={x} y={y} width="280" height="200" rx="16" fill="none" stroke={INK} strokeWidth="2" />
            <Label x={x + 36} y={y + 38} size={44}>
              {n}
            </Label>
            <rect x={x + 16} y={y + 76} width="248" height="108" rx="10" {...DASH} strokeWidth={1.5} />
          </g>
        );
      })}
    </Page>
  );
}

const ADDITIONS: [LucideIcon, number, number][] = [
  [Apple, 1, 2],
  [Cherry, 2, 2],
  [Fish, 3, 1],
  [Star, 2, 3],
  [Heart, 4, 2],
  [Snail, 3, 4],
];

function AddingSheet() {
  return (
    <Page height={640}>
      {ADDITIONS.map(([Icon, a, b], i) => {
        const y = 50 + i * 106;
        return (
          <g key={i}>
            {i > 0 && <Divider y={y - 53} />}
            <Group Icon={Icon} n={a} cx={95} cy={y} size={32} gap={40} />
            <Label x={205} y={y} size={36}>
              +
            </Label>
            <Group Icon={Icon} n={b} cx={315} cy={y} size={32} gap={40} />
            <Label x={425} y={y} size={36}>
              =
            </Label>
            <rect x="470" y={y - 30} width="60" height="60" rx="10" fill="none" stroke={INK} strokeWidth="2" />
          </g>
        );
      })}
    </Page>
  );
}

const SIZE_ROWS: [LucideIcon, number[]][] = [
  [Fish, [44, 72, 26, 58]],
  [Apple, [58, 30, 74, 44]],
  [Turtle, [28, 48, 60, 74]],
  [Star, [70, 42, 56, 28]],
  [House, [50, 74, 32, 62]],
];

function SizesSheet() {
  return (
    <Page height={640}>
      {SIZE_ROWS.map(([Icon, sizes], r) => {
        const y = 52 + r * 126;
        return (
          <g key={r}>
            {sizes.map((size, c) => (
              <g key={c}>
                <Pic Icon={Icon} x={90 + c * 140} y={y - 4} size={size} />
                <rect x={90 + c * 140 - 18} y={y + 42} width="36" height="34" rx="8" fill="none" stroke={INK} strokeWidth="1.8" />
              </g>
            ))}
          </g>
        );
      })}
    </Page>
  );
}

const PATTERNS: Token[][] = [
  [{ shape: 'circle', filled: true }, { shape: 'circle' }],
  [{ shape: 'square' }, { shape: 'triangle' }],
  [{ shape: 'star' }, { shape: 'star' }, { shape: 'heart', filled: true }],
  [{ Icon: Sun }, { Icon: Moon }, { Icon: Star }],
  [{ shape: 'circle', size: 48 }, { shape: 'circle', size: 24 }],
  [{ Icon: Apple }, { Icon: Cherry }, { Icon: Cherry }],
  [{ shape: 'heart', filled: true }, { shape: 'heart' }, { shape: 'square' }],
];

function PatternSheet() {
  return (
    <Page height={650}>
      {PATTERNS.map((unit, r) => {
        const y = 40 + r * 94;
        return (
          <g key={r}>
            {Array.from({ length: 6 }, (_, k) => (
              <TokenView key={k} token={unit[k % unit.length]} x={36 + k * 60} y={y} size={44} />
            ))}
            {[0, 1, 2].map((k) => (
              <rect key={k} x={392 + k * 70} y={y - 28} width="56" height="56" rx="10" {...DASH} strokeWidth={1.8} />
            ))}
          </g>
        );
      })}
    </Page>
  );
}

const ODD_ROWS: Token[][] = [
  [{ Icon: Apple }, { Icon: Apple }, { Icon: Apple }, { Icon: Fish }, { Icon: Apple }],
  [{ shape: 'circle' }, { shape: 'square' }, { shape: 'circle' }, { shape: 'circle' }, { shape: 'circle' }],
  [{ Icon: Cat }, { Icon: Rabbit }, { Icon: Dog }, { Icon: Bird }, { Icon: Car }],
  [{ Icon: Banana }, { Icon: Fish }, { Icon: Cherry }, { Icon: Grape }, { Icon: Apple }],
  [{ Icon: Car }, { Icon: Bus }, { Icon: Bike }, { Icon: Plane }, { Icon: Flower }],
  [{ Icon: Star }, { Icon: Star }, { Icon: Star }, { Icon: Star }, { Icon: Star, size: 28 }],
];

function OddSheet() {
  return (
    <Page height={640}>
      {ODD_ROWS.map((row, r) => {
        const y = 50 + r * 106;
        return (
          <g key={r}>
            {r > 0 && <Divider y={y - 53} />}
            {row.map((token, c) => (
              <TokenView key={c} token={token} x={70 + c * 115} y={y} size={58} />
            ))}
          </g>
        );
      })}
    </Page>
  );
}

// Lista parova; desna kolona je ispremeštana po `order`.
function PairsSheet({ pairs, order, right }: { pairs: LucideIcon[][]; order: number[]; right: 'pair' | 'shadow' }) {
  return (
    <Page height={630}>
      {pairs.map(([Left], i) => {
        const y = 50 + i * 106;
        return (
          <g key={i}>
            <Pic Icon={Left} x={80} y={y} size={60} />
            <circle cx="148" cy={y} r="7" fill={INK} />
          </g>
        );
      })}
      {order.map((k, i) => {
        const y = 50 + i * 106;
        const [Left, Right] = pairs[k];
        return (
          <g key={i}>
            <circle cx="452" cy={y} r="7" fill={INK} />
            <Pic Icon={right === 'pair' ? Right : Left} x={520} y={y} size={60} filled={right === 'shadow'} />
          </g>
        );
      })}
    </Page>
  );
}

const MATCH_PAIRS = [
  [Dog, Bone],
  [Rabbit, Carrot],
  [Cloud, Umbrella],
  [Key, House],
  [Bug, Flower2],
  [Rocket, Moon],
];
const SHADOW_THINGS = [[Apple], [Fish], [Bell], [Umbrella], [Leaf], [Heart]];

const DIFF_A: (Token | null)[] = [
  { Icon: Cat }, { Icon: Sun }, { Icon: Apple }, { Icon: Fish },
  { Icon: House }, { Icon: Star }, { Icon: Flower }, { Icon: Car },
  { Icon: Bird }, { Icon: Umbrella }, { Icon: Heart }, { Icon: Moon },
];
const DIFF_B: (Token | null)[] = DIFF_A.map((cell, i) => {
  const changes: Record<number, Token | null> = {
    1: { Icon: Cloud },
    2: { Icon: Apple, filled: true },
    4: null,
    6: { Icon: Leaf },
    9: { Icon: Bell },
  };
  return i in changes ? changes[i] : cell;
});

function DifferencesSheet() {
  return (
    <Page height={640}>
      {[DIFF_A, DIFF_B].map((cells, b) => {
        const top = b * 325;
        return (
          <g key={b}>
            <rect x="2" y={top + 2} width={W - 4} height="300" rx="18" fill="none" stroke={INK} strokeWidth="2" />
            {cells.map((cell, i) =>
              cell ? <TokenView key={i} token={cell} x={90 + (i % 4) * 140} y={top + 60 + Math.floor(i / 4) * 92} size={58} /> : null,
            )}
          </g>
        );
      })}
    </Page>
  );
}

type Polyline = [number, number][];

function Grid({ x, y, cols, rows, cell }: { x: number; y: number; cols: number; rows: number; cell: number }) {
  return (
    <g stroke="#d1d5db" strokeWidth="1">
      {Array.from({ length: cols + 1 }, (_, i) => (
        <line key={`c${i}`} x1={x + i * cell} x2={x + i * cell} y1={y} y2={y + rows * cell} />
      ))}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <line key={`r${i}`} x1={x} x2={x + cols * cell} y1={y + i * cell} y2={y + i * cell} />
      ))}
    </g>
  );
}

function Lines({ lines, x, y, cell }: { lines: Polyline[]; x: number; y: number; cell: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <polyline
          key={i}
          points={line.map(([px, py]) => `${x + px * cell},${y + py * cell}`).join(' ')}
          fill="none"
          stroke={INK}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </>
  );
}

// Leva polovina figure na mreži 10×10; osa simetrije je na x = 5.
const SYMMETRY: Polyline[][] = [
  [[[5, 1], [1, 5], [2, 5], [2, 9], [5, 9]], [[4, 9], [4, 6], [5, 6]]],
  [[[5, 3], [4, 1], [2, 1], [1, 2], [1, 4], [5, 9]]],
  [[[5, 0], [2, 4], [3, 4], [1, 7], [4, 7], [4, 9], [5, 9]]],
  [[[5, 0], [3, 3], [3, 7], [1, 9], [3, 9], [3, 8], [5, 8]]],
];

function SymmetrySheet() {
  const cell = 24;
  return (
    <Page height={600}>
      {SYMMETRY.map((lines, i) => {
        const x = 40 + (i % 2) * 280;
        const y = 20 + Math.floor(i / 2) * 310;
        return (
          <g key={i}>
            <Grid x={x} y={y} cols={10} rows={10} cell={cell} />
            <line x1={x + 5 * cell} x2={x + 5 * cell} y1={y - 8} y2={y + 10 * cell + 8} stroke={INK} strokeWidth="2" strokeDasharray="8 6" />
            <Lines lines={lines} x={x} y={y} cell={cell} />
          </g>
        );
      })}
    </Page>
  );
}

const COPY_FIGURES: Polyline[][] = [
  [[[0, 6], [0, 4], [2, 4], [2, 2], [4, 2], [4, 0], [6, 0]]],
  [[[0, 2], [3, 2], [3, 0], [6, 3], [3, 6], [3, 4], [0, 4], [0, 2]]],
  [[[2, 3], [4, 1], [6, 3], [4, 5], [2, 3]], [[2, 3], [0, 1], [0, 5], [2, 3]]],
];

function CopySheet() {
  const cell = 28;
  return (
    <Page height={630}>
      {COPY_FIGURES.map((lines, i) => {
        const y = 20 + i * 214;
        return (
          <g key={i}>
            <Grid x={50} y={y} cols={6} rows={6} cell={cell} />
            <Lines lines={lines} x={50} y={y} cell={cell} />
            <ArrowRight x={276} y={y + 3 * cell - 24} width={48} height={48} color={MUTED} strokeWidth={2} />
            <Grid x={382} y={y} cols={6} rows={6} cell={cell} />
          </g>
        );
      })}
    </Page>
  );
}

interface SheetContext {
  alphabet: readonly string[];
  colorNames: Record<ToyColor, string>;
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
  lines: () => [<LinesSheet key="lines" />],
  waves: () => [<WavesSheet key="waves" />],
  outlines: () => [<OutlinesSheet key="outlines" />],
  colors: (ctx) => [<ColorsSheet key="colors" {...ctx} />],
  count: () => [<CountSheet key="count" />],
  quantity: () => [<QuantitySheet key="quantity" />],
  adding: () => [<AddingSheet key="adding" />],
  sizes: () => [<SizesSheet key="sizes" />],
  pattern: () => [<PatternSheet key="pattern" />],
  odd: () => [<OddSheet key="odd" />],
  match: () => [<PairsSheet key="match" pairs={MATCH_PAIRS} order={[3, 5, 0, 4, 1, 2]} right="pair" />],
  shapes: () => [<PairsSheet key="shapes" pairs={SHADOW_THINGS} order={[2, 4, 1, 5, 0, 3]} right="shadow" />],
  differences: () => [<DifferencesSheet key="differences" />],
  symmetry: () => [<SymmetrySheet key="symmetry" />],
  copy: () => [<CopySheet key="copy" />],
};
