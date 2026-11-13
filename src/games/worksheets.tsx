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

// ============================================================================
// NOVI SADRŽAJI: BOJANKE SLOVA (LATINICA I ĆIRILICA), BOJANKE CRTEŽA I RADNI LISTOVI
// ============================================================================

interface LetterColorCard {
  pair: string;
  word: string;
  Icon: LucideIcon;
}

const LATIN_COLOR_CARDS: LetterColorCard[] = [
  { pair: 'A a', word: 'AVION', Icon: Plane },
  { pair: 'B b', word: 'BANANA', Icon: Banana },
  { pair: 'C c', word: 'CVIJET', Icon: Flower2 },
  { pair: 'Č č', word: 'ČAŠA / Čaj', Icon: Bell },
  { pair: 'Ć ć', word: 'ĆILIM / Kuća', Icon: House },
  { pair: 'D d', word: 'DRVO / List', Icon: Leaf },
  { pair: 'Dž dž', word: 'DŽip / Auto', Icon: Car },
  { pair: 'Đ đ', word: 'ĐAK', Icon: Key },
  { pair: 'E e', word: 'EKRAN / Zvijezda', Icon: Star },
  { pair: 'F f', word: 'FENJER / Cvijet', Icon: Flower },
  { pair: 'G g', word: 'GROŽĐE', Icon: Grape },
  { pair: 'H h', word: 'HELIKOPTER', Icon: Plane },
  { pair: 'I i', word: 'IGRAČKA', Icon: Heart },
  { pair: 'J j', word: 'JABUKA', Icon: Apple },
  { pair: 'K k', word: 'KUĆA', Icon: House },
  { pair: 'L l', word: 'LIST', Icon: Leaf },
  { pair: 'Lj lj', word: 'LJUBAV', Icon: Heart },
  { pair: 'M m', word: 'MAČKA', Icon: Cat },
  { pair: 'N n', word: 'NOĆ / Mjesec', Icon: Moon },
  { pair: 'Nj nj', word: 'NJIVA / Sunce', Icon: Sun },
  { pair: 'O o', word: 'OBLAK', Icon: Cloud },
  { pair: 'P p', word: 'PTICA', Icon: Bird },
  { pair: 'R r', word: 'RIBA', Icon: Fish },
  { pair: 'S s', word: 'SUNCE', Icon: Sun },
  { pair: 'Š š', word: 'ŠARGAREPA', Icon: Carrot },
  { pair: 'T t', word: 'TREŠNJA', Icon: Cherry },
  { pair: 'U u', word: 'ULICA / Bus', Icon: Bus },
  { pair: 'V v', word: 'VOZ / Bicikl', Icon: Bike },
  { pair: 'Z z', word: 'ZEC', Icon: Rabbit },
  { pair: 'Ž zz'.replace('zz', 'ž'), word: 'ŽELVA / Kornjača', Icon: Turtle },
];

const CYRILLIC_COLOR_CARDS: LetterColorCard[] = [
  { pair: 'А а', word: 'АВИОН', Icon: Plane },
  { pair: 'Б б', word: 'БАНАНА', Icon: Banana },
  { pair: 'В в', word: 'ВОЗ / БИЦИКЛ', Icon: Bike },
  { pair: 'Г г', word: 'ГРОЖЂЕ', Icon: Grape },
  { pair: 'Д д', word: 'ДРВО / ЛИСТ', Icon: Leaf },
  { pair: 'Ђ ђ', word: 'ЂАК / КЉУЧ', Icon: Key },
  { pair: 'Е е', word: 'ЕКРАН / ЗВИЈЕЗДА', Icon: Star },
  { pair: 'Ж ж', word: 'ЖЕЛВА / КОРЊАЧА', Icon: Turtle },
  { pair: 'З з', word: 'ЗЕЦ', Icon: Rabbit },
  { pair: 'И и', word: 'ИГРАЧКА', Icon: Heart },
  { pair: 'Ј ј', word: 'ЈАБУКА', Icon: Apple },
  { pair: 'К к', word: 'КУЋА', Icon: House },
  { pair: 'Л л', word: 'ЛИСТ', Icon: Leaf },
  { pair: 'Љ љ', word: 'ЉУБАВ', Icon: Heart },
  { pair: 'М м', word: 'МАЧКА', Icon: Cat },
  { pair: 'Н н', word: 'НОЋ / МЈЕСЕЦ', Icon: Moon },
  { pair: 'Њ њ', word: 'ЊИВА / СУНЦЕ', Icon: Sun },
  { pair: 'О о', word: 'ОБЛАК', Icon: Cloud },
  { pair: 'П п', word: 'ПТИЦА', Icon: Bird },
  { pair: 'Р р', word: 'РИБА', Icon: Fish },
  { pair: 'С с', word: 'СУНЦЕ', Icon: Sun },
  { pair: 'Т т', word: 'ТРЕШЊА', Icon: Cherry },
  { pair: 'Ћ ћ', word: 'ЋИЛИМ / КУЋА', Icon: House },
  { pair: 'У у', word: 'УЛИЦА / БУС', Icon: Bus },
  { pair: 'Ф ф', word: 'ФЕНЈЕР / ЦВИЈЕТ', Icon: Flower },
  { pair: 'Х х', word: 'ХЕЛИКОПТЕР', Icon: Plane },
  { pair: 'Ц ц', word: 'ЦВИЈЕТ', Icon: Flower2 },
  { pair: 'Ч ч', word: 'ЧАША / ЗВОНО', Icon: Bell },
  { pair: 'Џ џ', word: 'ЏИП / АУТО', Icon: Car },
  { pair: 'Ш ш', word: 'ШАРГАРЕПА', Icon: Carrot },
];

function coloringLetterPages(cards: readonly LetterColorCard[]): ReactNode[] {
  return chunk(cards, 6).map((pageCards, pageIndex) => (
    <Page key={pageIndex} height={640}>
      {pageCards.map(({ pair, word, Icon }, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 6 + col * 300;
        const y = 6 + row * 212;
        return (
          <g key={pair}>
            <rect x={x} y={y} width="288" height="200" rx="16" fill="#ffffff" stroke={INK} strokeWidth="2.2" />
            {/* Šuplje veliko i malo slovo za bojenje */}
            <text
              x={x + 95}
              y={y + 66}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="66"
              fontWeight="900"
              fontFamily={FONT}
              fill="#ffffff"
              stroke={INK}
              strokeWidth="2.6"
            >
              {pair}
            </text>
            {/* Sličica za bojenje */}
            <circle cx={x + 232} cy={y + 62} r="42" fill="none" stroke={GUIDE} strokeWidth="1.8" strokeDasharray="5 5" />
            <Pic Icon={Icon} x={x + 232} y={y + 62} size={56} />
            {/* Riječ uz slovo */}
            <text
              x={x + 144}
              y={y + 124}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="16"
              fontWeight="800"
              fontFamily={FONT}
              fill={INK}
              letterSpacing="1.5"
            >
              {word}
            </text>
            {/* Linije za pisanje i podebljavanje slova */}
            <line x1={x + 16} x2={x + 272} y1={y + 148} y2={y + 148} stroke={TRACE_GRAY} strokeWidth="1.2" />
            <line x1={x + 16} x2={x + 272} y1={y + 164} y2={y + 164} stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 4" />
            <line x1={x + 16} x2={x + 272} y1={y + 184} y2={y + 184} stroke={INK} strokeWidth="1.6" />
            <text x={x + 22} y={y + 182} fontSize="28" fontFamily={FONT} fontWeight="700" fill={INK}>
              {pair}
            </text>
            <text x={x + 104} y={y + 182} fontSize="28" fontFamily={FONT} fontWeight="700" fill={TRACE_GRAY}>
              {pair}
            </text>
            <text x={x + 186} y={y + 182} fontSize="28" fontFamily={FONT} fontWeight="700" fill={TRACE_GRAY}>
              {pair}
            </text>
          </g>
        );
      })}
    </Page>
  ));
}

const NUMBER_COLORS: [number, ToyColor][] = [
  [1, 'red'],
  [2, 'blue'],
  [3, 'yellow'],
  [4, 'green'],
  [5, 'purple'],
  [6, 'orange'],
];

function ColorByNumberSheet({ colorNames }: SheetContext) {
  return (
    <Page height={645}>
      {/* Legenda boja sa brojevima 1-6 */}
      {NUMBER_COLORS.map(([num, color], i) => {
        const x = 50 + i * 100;
        return (
          <g key={num}>
            <circle cx={x} cy="28" r="20" fill={toyHex[color]} stroke={INK} strokeWidth="2" />
            <text x={x} y="29" textAnchor="middle" dominantBaseline="central" fontSize="18" fontWeight="800" fontFamily={FONT} fill="#fff" stroke={INK} strokeWidth="0.6">
              {num}
            </text>
            <text x={x} y="64" textAnchor="middle" fontSize="13.5" fontWeight="700" fontFamily={FONT} fill={INK}>
              {num} = {colorNames[color]}
            </text>
          </g>
        );
      })}
      <Divider y={82} />

      {/* Velika scena za bojenje po brojevima */}
      <rect x="8" y="96" width="584" height="540" rx="20" fill="#fff" stroke={INK} strokeWidth="2.5" />

      {/* Sunce (3 = žuta, 6 = narandžasta) */}
      <circle cx="105" cy="175" r="54" fill="none" stroke={INK} strokeWidth="2.2" strokeDasharray="10 6" />
      <Label x={105} y={132} size={18}>6</Label>
      <circle cx="105" cy="175" r="34" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <Label x={105} y={175} size={24}>3</Label>

      {/* Oblaci (2 = plava) */}
      <path d="M250 185 C225 185, 215 162, 234 148 C234 124, 268 114, 286 132 C305 114, 344 122, 346 148 C368 152, 370 185, 342 185 Z" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <Label x={295} y={158} size={22}>2</Label>

      <path d="M430 175 C410 175, 402 156, 418 144 C418 124, 446 116, 462 130 C478 116, 510 122, 512 144 C530 148, 532 175, 508 175 Z" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <Label x={468} y={152} size={22}>2</Label>

      {/* Kuća: krov (1 = crvena), dimnjak (5 = ljubičasta), zidovi (3 = žuta), vrata (6 = narandžasta), prozori (2 = plava) */}
      <rect x="295" y="230" width="28" height="55" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <Label x={309} y={252} size={18}>5</Label>
      <polygon points="150,320 265,215 380,320" fill="#fff" stroke={INK} strokeWidth="2.8" strokeLinejoin="round" />
      <Label x={265} y={282} size={26}>1</Label>

      <rect x="172" y="320" width="186" height="175" fill="#fff" stroke={INK} strokeWidth="2.8" />
      <Label x={265} y={352} size={24}>3</Label>

      {/* Vrata */}
      <rect x="200" y="395" width="54" height="100" rx="6" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <circle cx="244" cy="448" r="4" fill={INK} />
      <Label x={227} y={445} size={22}>6</Label>

      {/* Prozor */}
      <rect x="278" y="385" width="58" height="58" rx="6" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <line x1="307" x2="307" y1="385" y2="443" stroke={INK} strokeWidth="2" />
      <line x1="278" x2="336" y1="414" y2="414" stroke={INK} strokeWidth="2" />
      <Label x={292} y={400} size={16}>2</Label>
      <Label x={322} y={428} size={16}>2</Label>

      {/* Drvo desno: krošnja (4 = zelena), jabuke (1 = crvena), stablo (6 = narandžasta) */}
      <rect x="462" y="385" width="36" height="110" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <Label x={480} y={445} size={22}>6</Label>
      <circle cx="480" cy="315" r="76" fill="#fff" stroke={INK} strokeWidth="2.8" />
      <Label x={480} y={315} size={26}>4</Label>
      <circle cx="445" cy="285" r="16" fill="#fff" stroke={INK} strokeWidth="2" />
      <Label x={445} y={285} size={16}>1</Label>
      <circle cx="515" cy="295" r="16" fill="#fff" stroke={INK} strokeWidth="2" />
      <Label x={515} y={295} size={16}>1</Label>
      <circle cx="458" cy="355" r="16" fill="#fff" stroke={INK} strokeWidth="2" />
      <Label x={458} y={355} size={16}>1</Label>

      {/* Cvijet lijevo (5 = ljubičasta, 3 = žuta, 4 = zelena) */}
      <line x1="88" x2="88" y1="395" y2="495" stroke={INK} strokeWidth="3" />
      <circle cx="88" cy="340" r="22" fill="#fff" stroke={INK} strokeWidth="2.2" />
      <circle cx="54" cy="374" r="22" fill="#fff" stroke={INK} strokeWidth="2.2" />
      <circle cx="122" cy="374" r="22" fill="#fff" stroke={INK} strokeWidth="2.2" />
      <circle cx="88" cy="408" r="22" fill="#fff" stroke={INK} strokeWidth="2.2" />
      <Label x={88} y={340} size={16}>5</Label>
      <Label x={54} y={374} size={16}>5</Label>
      <Label x={122} y={374} size={16}>5</Label>
      <Label x={88} y={408} size={16}>5</Label>
      <circle cx="88" cy="374" r="20" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <Label x={88} y={374} size={18}>3</Label>

      {/* Livada / trava na dnu (4 = zelena) */}
      <path d="M8 495 L592 495 L592 616 C592 628, 584 636, 572 636 L28 636 C16 636, 8 628, 8 616 Z" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <Label x={110} y={565} size={26}>4</Label>
      <Label x={480} y={565} size={26}>4</Label>

      {/* Staza ispred kuće (6 = narandžasta) */}
      <polygon points="200,495 254,495 288,636 166,636" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <Label x={227} y={565} size={24}>6</Label>
    </Page>
  );
}

function ColoringScenesPages(): ReactNode[] {
  return [
    // Strana 1: Priroda, životinje i veselo dvorište
    <Page key="scene-1" height={640}>
      <rect x="6" y="6" width="588" height="628" rx="22" fill="#fff" stroke={INK} strokeWidth="2.8" />
      {/* Duga i oblaci */}
      <path d="M90 210 A160 160 0 0 1 410 210" fill="none" stroke={INK} strokeWidth="2.4" />
      <path d="M112 210 A138 138 0 0 1 388 210" fill="none" stroke={INK} strokeWidth="2.4" />
      <path d="M134 210 A116 116 0 0 1 366 210" fill="none" stroke={INK} strokeWidth="2.4" />
      <Pic Icon={Cloud} x={95} y={210} size={84} />
      <Pic Icon={Cloud} x={405} y={210} size={84} />
      <Pic Icon={Sun} x={505} y={92} size={96} />
      <Pic Icon={Bird} x={245} y={76} size={56} />

      {/* Kuća i cvijeće u sredini */}
      <Pic Icon={House} x={150} y={365} size={150} />
      <Pic Icon={Flower2} x={310} y={395} size={82} />
      <Pic Icon={Flower} x={405} y={395} size={82} />
      <Pic Icon={Bug} x={515} y={355} size={68} />

      {/* Linija tla */}
      <line x1="6" x2="594" y1="450" y2="450" stroke={INK} strokeWidth="2.5" />

      {/* Životinje u prvom planu */}
      <Pic Icon={Cat} x={95} y={540} size={104} />
      <Pic Icon={Dog} x={235} y={540} size={104} />
      <Pic Icon={Rabbit} x={375} y={540} size={104} />
      <Pic Icon={Snail} x={505} y={548} size={88} />
    </Page>,

    // Strana 2: Putovanje u svemir i morski svijet
    <Page key="scene-2" height={640}>
      {/* Gornji okvir: Svemir */}
      <rect x="6" y="6" width="588" height="304" rx="20" fill="#fff" stroke={INK} strokeWidth="2.6" />
      <Pic Icon={Rocket} x={295} y={158} size={148} />
      <Pic Icon={Moon} x={100} y={108} size={92} />
      <Pic Icon={Star} x={195} y={68} size={54} />
      <Pic Icon={Star} x={420} y={72} size={62} />
      <Pic Icon={Star} x={515} y={175} size={58} />
      <Pic Icon={Star} x={95} y={236} size={52} />
      {/* Planeta sa prstenom */}
      <circle cx="480" cy="238" r="36" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="480" cy="238" rx="68" ry="16" fill="none" stroke={INK} strokeWidth="2.4" />

      {/* Donji okvir: Morski svijet */}
      <rect x="6" y="330" width="588" height="304" rx="20" fill="#fff" stroke={INK} strokeWidth="2.6" />
      <path d="M6 382 Q80 362 154 382 T302 382 T450 382 T594 382" fill="none" stroke={INK} strokeWidth="2.2" />
      <Pic Icon={Fish} x={135} y={465} size={112} />
      <Pic Icon={Turtle} x={335} y={475} size={124} />
      <Pic Icon={Fish} x={505} y={445} size={88} />
      <Pic Icon={Star} x={115} y={582} size={58} />
      <Pic Icon={Star} x={485} y={578} size={62} />
      <circle cx="215" cy="425" r="10" fill="none" stroke={INK} strokeWidth="2" />
      <circle cx="230" cy="402" r="14" fill="none" stroke={INK} strokeWidth="2" />
      <circle cx="430" cy="422" r="12" fill="none" stroke={INK} strokeWidth="2" />
    </Page>,
  ];
}

interface InitialItem {
  Icon: LucideIcon;
  choicesLat: [string, string, string];
  choicesCyr: [string, string, string];
  restLat: string;
  restCyr: string;
}

const INITIAL_ITEMS: InitialItem[] = [
  { Icon: Sun, choicesLat: ['S', 'M', 'K'], choicesCyr: ['С', 'М', 'К'], restLat: 'UNCE', restCyr: 'УНЦЕ' },
  { Icon: Apple, choicesLat: ['B', 'J', 'L'], choicesCyr: ['Б', 'Ј', 'Л'], restLat: 'ABUKA', restCyr: 'АБУКА' },
  { Icon: Fish, choicesLat: ['P', 'T', 'R'], choicesCyr: ['П', 'Т', 'Р'], restLat: 'IBA', restCyr: 'ИБА' },
  { Icon: House, choicesLat: ['K', 'G', 'N'], choicesCyr: ['К', 'Г', 'Н'], restLat: 'UĆA', restCyr: 'УЋА' },
  { Icon: Cat, choicesLat: ['V', 'M', 'Z'], choicesCyr: ['В', 'М', 'З'], restLat: 'AČKA', restCyr: 'АЧКА' },
  { Icon: Rabbit, choicesLat: ['S', 'D', 'Z'], choicesCyr: ['С', 'Д', 'З'], restLat: 'EC', restCyr: 'ЕЦ' },
  { Icon: Flower2, choicesLat: ['C', 'Č', 'P'], choicesCyr: ['Ц', 'Ч', 'П'], restLat: 'VIJET', restCyr: 'ВИЈЕТ' },
  { Icon: Dog, choicesLat: ['R', 'P', 'B'], choicesCyr: ['Р', 'П', 'Б'], restLat: 'AS', restCyr: 'АС' },
  { Icon: Bird, choicesLat: ['P', 'T', 'K'], choicesCyr: ['П', 'Т', 'К'], restLat: 'TICA', restCyr: 'ТИЦА' },
  { Icon: Rocket, choicesLat: ['L', 'M', 'R'], choicesCyr: ['Л', 'М', 'Р'], restLat: 'AKETA', restCyr: 'АКЕТА' },
  { Icon: Cloud, choicesLat: ['O', 'U', 'A'], choicesCyr: ['О', 'У', 'А'], restLat: 'BLAK', restCyr: 'БЛАК' },
  { Icon: Leaf, choicesLat: ['N', 'L', 'R'], choicesCyr: ['Н', 'Л', 'Р'], restLat: 'IST', restCyr: 'ИСТ' },
];

function InitialLetterSheet({ script }: { script: 'lat' | 'cyr' }) {
  return (
    <Page height={640}>
      {INITIAL_ITEMS.map((item, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 6 + col * 198;
        const y = 6 + row * 158;
        const choices = script === 'cyr' ? item.choicesCyr : item.choicesLat;
        const rest = script === 'cyr' ? item.restCyr : item.restLat;
        return (
          <g key={i}>
            <rect x={x} y={y} width="192" height="150" rx="14" fill="#fff" stroke={INK} strokeWidth="2" />
            <Pic Icon={item.Icon} x={x + 52} y={y + 52} size={56} />
            {/* 3 kružića sa ponuđenim početnim slovima */}
            {choices.map((ch, k) => (
              <g key={k}>
                <circle cx={x + 124} cy={y + 28 + k * 34} r="14" fill="#fff" stroke={INK} strokeWidth="1.8" />
                <Label x={x + 124} y={y + 28 + k * 34} size={17}>
                  {ch}
                </Label>
              </g>
            ))}
            {/* Linija za upisivanje početnog slova + ostatak riječi */}
            <line x1={x + 22} x2={x + 62} y1={y + 134} y2={y + 134} stroke={INK} strokeWidth="2.5" />
            <text x={x + 68} y={y + 132} fontSize="20" fontWeight="800" fontFamily={FONT} fill={INK} letterSpacing="1.5">
              {rest}
            </text>
          </g>
        );
      })}
    </Page>
  );
}

const LATIN_CASE_PAIRS: [string, string][] = [
  ['A', 'a'],
  ['B', 'b'],
  ['D', 'd'],
  ['E', 'e'],
  ['G', 'g'],
  ['H', 'h'],
  ['M', 'm'],
  ['N', 'n'],
  ['R', 'r'],
  ['Đ', 'đ'],
  ['Č', 'č'],
  ['Ž', 'ž'],
];

const CYRILLIC_CASE_PAIRS: [string, string][] = [
  ['А', 'а'],
  ['Б', 'б'],
  ['В', 'в'],
  ['Г', 'г'],
  ['Д', 'д'],
  ['Ђ', 'ђ'],
  ['Е', 'е'],
  ['Ж', 'ж'],
  ['И', 'и'],
  ['Љ', 'љ'],
  ['Њ', 'њ'],
  ['Ћ', 'ћ'],
];

function LetterMatchSheet({ script }: { script: 'lat' | 'cyr' }) {
  const pairs = script === 'cyr' ? CYRILLIC_CASE_PAIRS : LATIN_CASE_PAIRS;
  const topPairs = pairs.slice(0, 6);
  const shuffledOrder = [2, 5, 0, 4, 1, 3];
  return (
    <Page height={640}>
      {/* Gornji dio: spoji veliko i malo slovo */}
      {topPairs.map(([upper], i) => {
        const y = 38 + i * 54;
        return (
          <g key={upper}>
            <rect x="60" y={y - 22} width="64" height="44" rx="10" fill="#fff" stroke={INK} strokeWidth="2" />
            <Label x={92} y={y} size={26}>
              {upper}
            </Label>
            <circle cx="144" cy={y} r="6" fill={INK} />
          </g>
        );
      })}
      {shuffledOrder.map((pairIdx, i) => {
        const y = 38 + i * 54;
        const [, lower] = topPairs[pairIdx];
        return (
          <g key={lower}>
            <circle cx="456" cy={y} r="6" fill={INK} />
            <rect x="476" y={y - 22} width="64" height="44" rx="10" fill="#fff" stroke={INK} strokeWidth="2" />
            <Label x={508} y={y} size={26}>
              {lower}
            </Label>
          </g>
        );
      })}

      <Divider y={356} />

      {/* Donji dio: kućice za slova (napiši malo slovo pored velikog) */}
      {pairs.map(([upper], i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 14 + col * 196;
        const y = 374 + row * 66;
        return (
          <g key={upper}>
            <rect x={x} y={y} width="180" height="54" rx="12" fill="#fff" stroke={INK} strokeWidth="2" />
            <line x1={x + 90} x2={x + 90} y1={y} y2={y + 54} stroke={GUIDE} strokeWidth="1.8" />
            <Label x={x + 45} y={y + 27} size={28}>
              {upper}
            </Label>
            <line x1={x + 108} x2={x + 162} y1={y + 42} y2={y + 42} stroke={INK} strokeWidth="2" strokeDasharray="5 4" />
          </g>
        );
      })}
    </Page>
  );
}

interface SyllableRow {
  Icon: LucideIcon;
  partsLat: string[];
  partsCyr: string[];
}

const SYLLABLE_ROWS: SyllableRow[] = [
  { Icon: Sun, partsLat: ['SU', 'NCE'], partsCyr: ['СУ', 'НЦЕ'] },
  { Icon: Fish, partsLat: ['RI', 'BA'], partsCyr: ['РИ', 'БА'] },
  { Icon: House, partsLat: ['KU', 'ĆA'], partsCyr: ['КУ', 'ЋА'] },
  { Icon: Cat, partsLat: ['MA', 'ČKA'], partsCyr: ['МА', 'ЧКА'] },
  { Icon: Apple, partsLat: ['JA', 'BU', 'KA'], partsCyr: ['ЈА', 'БУ', 'КА'] },
  { Icon: Rocket, partsLat: ['RA', 'KE', 'TA'], partsCyr: ['РА', 'КЕ', 'ТА'] },
];

function SyllablesSheet({ script }: { script: 'lat' | 'cyr' }) {
  const vowels = script === 'cyr' ? ['А', 'Е', 'И', 'О', 'У'] : ['A', 'E', 'I', 'O', 'U'];
  const cons = script === 'cyr' ? ['М', 'С', 'Т', 'К'] : ['M', 'S', 'T', 'K'];
  return (
    <Page height={640}>
      {/* Gornja tablica otvorenih slogova za glasno čitanje */}
      <rect x="8" y="6" width="584" height="128" rx="14" fill="#fff" stroke={INK} strokeWidth="2" />
      {cons.map((c, r) =>
        vowels.map((v, col) => {
          const x = 64 + col * 116;
          const y = 26 + r * 26;
          return (
            <Label key={`${c}${v}`} x={x} y={y} size={18}>
              {c}
              {v}
            </Label>
          );
        }),
      )}

      {/* 6 redova sa sličicama, slogovima i linijama za spajanje u riječ */}
      {SYLLABLE_ROWS.map((row, i) => {
        const y = 178 + i * 82;
        const parts = script === 'cyr' ? row.partsCyr : row.partsLat;
        return (
          <g key={i}>
            {i > 0 && <Divider y={y - 41} />}
            <Pic Icon={row.Icon} x={42} y={y} size={48} />
            {parts.map((part, k) => {
              const bx = 92 + k * 86;
              return (
                <g key={k}>
                  <rect x={bx} y={y - 24} width="64" height="44" rx="10" fill="#fff" stroke={INK} strokeWidth="2" />
                  <Label x={bx + 32} y={y - 2} size={20}>
                    {part}
                  </Label>
                  {/* Luk sloga ispod pravougaonika */}
                  <path d={`M${bx + 8} ${y + 25} Q${bx + 32} ${y + 36} ${bx + 56} ${y + 25}`} fill="none" stroke={MUTED} strokeWidth="1.8" />
                  {k < parts.length - 1 && (
                    <Label x={bx + 75} y={y - 2} size={20}>
                      +
                    </Label>
                  )}
                </g>
              );
            })}
            <Label x={360} y={y - 2} size={22}>
              =
            </Label>
            <line x1="386" x2="584" y1={y + 16} y2={y + 16} stroke={INK} strokeWidth="2.2" />
            <line x1="386" x2="584" y1={y - 12} y2={y - 12} stroke={TRACE_GRAY} strokeWidth="1.2" strokeDasharray="5 5" />
          </g>
        );
      })}
    </Page>
  );
}

const BRIDGE_PAIRS: [string, string][] = [
  ['B b', 'Б б'],
  ['V v', 'В в'],
  ['G g', 'Г г'],
  ['D d', 'Д д'],
  ['Đ đ', 'Ђ ђ'],
  ['Ž ž', 'Ж ж'],
  ['Lj lj', 'Љ љ'],
  ['Nj nj', 'Њ њ'],
];

const BRIDGE_WORDS: [LucideIcon, string, string][] = [
  [Sun, 'SUNCE', 'СУНЦЕ'],
  [Fish, 'RIBA', 'РИБА'],
  [House, 'KUĆA', 'КУЋА'],
  [Apple, 'JABUKA', 'ЈАБУКА'],
  [Bird, 'PTICA', 'ПТИЦА'],
  [Flower2, 'CVIJET', 'ЦВИЈЕТ'],
];

function ScriptBridgeSheet() {
  const order = [3, 0, 5, 1, 7, 2, 6, 4];
  return (
    <Page height={640}>
      {/* Gornji dio: spoji latinično i ćirilično slovo */}
      {BRIDGE_PAIRS.map(([lat], i) => {
        const y = 30 + i * 44;
        return (
          <g key={lat}>
            <rect x="44" y={y - 18} width="84" height="36" rx="8" fill="#fff" stroke={INK} strokeWidth="2" />
            <Label x={86} y={y} size={20}>
              {lat}
            </Label>
            <circle cx="146" cy={y} r="6" fill={INK} />
          </g>
        );
      })}
      {order.map((idx, i) => {
        const y = 30 + i * 44;
        const [, cyr] = BRIDGE_PAIRS[idx];
        return (
          <g key={cyr}>
            <circle cx="454" cy={y} r="6" fill={INK} />
            <rect x="472" y={y - 18} width="84" height="36" rx="8" fill="#fff" stroke={INK} strokeWidth="2" />
            <Label x={514} y={y} size={20}>
              {cyr}
            </Label>
          </g>
        );
      })}

      <Divider y={376} />

      {/* Donji dio: prepiši riječ drugim pismom */}
      {BRIDGE_WORDS.map(([Icon, lat, cyr], i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 12 + col * 296;
        const y = 394 + row * 82;
        const promptWord = i % 2 === 0 ? lat : cyr;
        return (
          <g key={lat}>
            <rect x={x} y={y} width="280" height="70" rx="12" fill="#fff" stroke={INK} strokeWidth="1.8" />
            <Pic Icon={Icon} x={x + 34} y={y + 35} size={40} />
            <Label x={x + 104} y={y + 24} size={18}>
              {promptWord}
            </Label>
            <line x1={x + 68} x2={x + 264} y1={y + 56} y2={y + 56} stroke={INK} strokeWidth="2" />
          </g>
        );
      })}
    </Page>
  );
}

const SUBTRACTIONS: [LucideIcon, number, number][] = [
  [Apple, 5, 2],
  [Cherry, 4, 1],
  [Fish, 6, 3],
  [Star, 7, 2],
  [Heart, 8, 3],
  [Snail, 9, 4],
];

function SubtractionSheet() {
  return (
    <Page height={640}>
      {SUBTRACTIONS.map(([Icon, total, minus], i) => {
        const y = 50 + i * 106;
        return (
          <g key={i}>
            {i > 0 && <Divider y={y - 53} />}
            {Array.from({ length: total }, (_, k) => {
              const cx = 32 + k * 34;
              const crossed = k >= total - minus;
              return (
                <g key={k}>
                  <Pic Icon={Icon} x={cx} y={y} size={28} />
                  {crossed && <line x1={cx - 14} y1={y + 14} x2={cx + 14} y2={y - 14} stroke={INK} strokeWidth="2.8" />}
                </g>
              );
            })}
            <Label x={400} y={y} size={30}>
              {total} − {minus} =
            </Label>
            <rect x="495" y={y - 28} width="58" height="56" rx="10" fill="none" stroke={INK} strokeWidth="2.2" />
          </g>
        );
      })}
    </Page>
  );
}

const COMPARE_ROWS: [LucideIcon, number, number][] = [
  [Apple, 4, 2],
  [Star, 3, 5],
  [Fish, 4, 4],
  [Flower, 6, 3],
  [Bird, 2, 6],
  [Sun, 5, 5],
];

function CompareNumbersSheet() {
  return (
    <Page height={640}>
      {COMPARE_ROWS.map(([Icon, leftN, rightN], i) => {
        const y = 50 + i * 106;
        return (
          <g key={i}>
            {i > 0 && <Divider y={y - 53} />}
            <Group Icon={Icon} n={leftN} cx={135} cy={y} size={32} gap={40} />
            <circle cx="300" cy={y} r="28" fill="#fff" stroke={INK} strokeWidth="2.4" />
            <Group Icon={Icon} n={rightN} cx={465} cy={y} size={32} gap={40} />
          </g>
        );
      })}
    </Page>
  );
}

const NUMBER_TRAINS: (number | null)[][] = [
  [1, 2, null, 4, 5, null, 7, 8, null, 10],
  [1, null, 3, null, 5, 6, null, 8, 9, null],
  [null, 2, 3, 4, null, 6, 7, null, 9, 10],
];

const NEIGHBORS = [2, 4, 5, 6, 8, 9];

function MissingNumbersSheet() {
  return (
    <Page height={640}>
      {/* Gornji dio: 3 brojevna vozića od 1 do 10 */}
      {NUMBER_TRAINS.map((train, r) => {
        const y = 48 + r * 92;
        return (
          <g key={r}>
            {train.map((val, c) => {
              const x = 14 + c * 58;
              return (
                <g key={c}>
                  {c > 0 && <line x1={x - 8} x2={x} y1={y} y2={y} stroke={INK} strokeWidth="2.5" />}
                  <rect
                    x={x}
                    y={y - 25}
                    width="50"
                    height="50"
                    rx="10"
                    fill="#fff"
                    stroke={INK}
                    strokeWidth="2.2"
                    strokeDasharray={val === null ? '6 5' : undefined}
                  />
                  {val !== null && (
                    <Label x={x + 25} y={y} size={24}>
                      {val}
                    </Label>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}

      <Divider y={310} />

      {/* Donji dio: prethodnik i sledbenik */}
      {NEIGHBORS.map((centerNum, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 26 + col * 300;
        const y = 365 + row * 96;
        return (
          <g key={centerNum}>
            <rect x={x} y={y - 28} width="64" height="56" rx="12" {...DASH} strokeWidth={2} />
            <line x1={x + 72} x2={x + 92} y1={y} y2={y} stroke={INK} strokeWidth="2.2" />
            <circle cx={x + 126} cy={y} r="30" fill="#fff" stroke={INK} strokeWidth="2.4" />
            <Label x={x + 126} y={y} size={28}>
              {centerNum}
            </Label>
            <line x1={x + 160} x2={x + 180} y1={y} y2={y} stroke={INK} strokeWidth="2.2" />
            <rect x={x + 188} y={y - 28} width="64" height="56" rx="12" {...DASH} strokeWidth={2} />
          </g>
        );
      })}
    </Page>
  );
}

// ============================================================================
// VEKTORSKE TEMATSKE BOJANKE ZA ŠTAMPU
// ============================================================================

function ImageColoringSheet({ src, alt, prompt }: { src: string; alt: string; prompt: string }) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full overflow-hidden rounded-2xl border-2 border-[#111827] bg-white p-2 sm:p-4 shadow-xs">
        <img
          src={src}
          alt={alt}
          loading="eager"
          decoding="sync"
          className="mx-auto block h-auto max-h-[740px] w-full object-contain"
          style={{ width: '100%', height: 'auto', maxHeight: '740px', objectFit: 'contain' }}
        />
      </div>
      <p className="mt-3.5 text-center text-sm font-medium text-muted print:text-[#374151]">
        💡 {prompt}
      </p>
    </div>
  );
}

// ============================================================================
// DIFERENCIRANI TESTOVI ZNANJA ZA 3 NIVOA POSTIGNUĆA (A4 ŠTAMPA)
// ============================================================================

function TestFrame({
  subject,
  title,
  level1,
  level2,
  level3,
}: {
  subject: string;
  title: string;
  level1: ReactNode;
  level2: ReactNode;
  level3: ReactNode;
}) {
  return (
    <div className="w-full text-[#111827] flex flex-col gap-3.5 print:gap-3 text-sm">
      {/* Zaglavlje za podatke o učeniku i ocjenjivanje */}
      <div className="rounded-xl border-2 border-[#111827] bg-[#f9fafb] p-3 print:bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold pb-2 border-b border-gray-300">
          <div><span className="text-gray-500 print:text-black">Učenik:</span> _________________</div>
          <div><span className="text-gray-500 print:text-black">Razred:</span> _____ <span className="text-gray-500 print:text-black">Datum:</span> _____</div>
          <div><span className="text-gray-500 print:text-black">Bodovi:</span> _____ / 30</div>
          <div><span className="text-gray-500 print:text-black">Ocjena:</span> _________________</div>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
          <div>
            <span className="text-[10.5px] font-mono uppercase tracking-wider text-accent font-bold">
              DIFERENCIRANA PROVJERA ZNANJA · {subject}
            </span>
            <h2 className="text-base font-extrabold leading-tight">{title}</h2>
          </div>
          <span className="text-[11px] font-semibold text-gray-500 print:text-black">
            Vrijeme rada: 45 min
          </span>
        </div>
      </div>

      {/* Nivo 1: Osnovni */}
      <div className="rounded-xl border-2 border-emerald-600 bg-emerald-50/20 p-3 print:bg-white print:border-gray-800">
        <div className="flex items-center justify-between font-bold text-xs text-emerald-800 print:text-black pb-2 mb-2 border-b border-emerald-200 print:border-gray-300">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-600 print:border print:border-black" />
            NIVO I — OSNOVNI NIVO (Prepoznavanje, direktno računanje i osnovni pojmovi)
          </span>
          <span className="bg-emerald-100 text-emerald-800 print:bg-transparent print:text-black px-2 py-0.5 rounded text-[11px]">
            10 bodova
          </span>
        </div>
        {level1}
      </div>

      {/* Nivo 2: Srednji */}
      <div className="rounded-xl border-2 border-blue-600 bg-blue-50/20 p-3 print:bg-white print:border-gray-800">
        <div className="flex items-center justify-between font-bold text-xs text-blue-800 print:text-black pb-2 mb-2 border-b border-blue-200 print:border-gray-300">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-600 print:border print:border-black" />
            NIVO II — SREDNJI NIVO (Primjena pravila, standardni zadaci u dva koraka)
          </span>
          <span className="bg-blue-100 text-blue-800 print:bg-transparent print:text-black px-2 py-0.5 rounded text-[11px]">
            10 bodova
          </span>
        </div>
        {level2}
      </div>

      {/* Nivo 3: Napredni */}
      <div className="rounded-xl border-2 border-purple-600 bg-purple-50/20 p-3 print:bg-white print:border-gray-800">
        <div className="flex items-center justify-between font-bold text-xs text-purple-800 print:text-black pb-2 mb-2 border-b border-purple-200 print:border-gray-300">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-purple-600 print:border print:border-black" />
            NIVO III — NAPREDNI NIVO (Tekstualni, problemski i logički izazov)
          </span>
          <span className="bg-purple-100 text-purple-800 print:bg-transparent print:text-black px-2 py-0.5 rounded text-[11px]">
            10 bodova
          </span>
        </div>
        {level3}
      </div>

      {/* Podnožje sa skalom bodovanja */}
      <div className="rounded-lg border border-gray-300 p-2 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-gray-600 print:text-black">
        <div>
          <strong>Skala bodovanja:</strong> 0–11 (nedovoljan 1), 12–16 (dovoljan 2), 17–21 (dobar 3), 22–26 (v. dobar 4), 27–30 (odličan 5)
        </div>
        <div className="flex items-center gap-2">
          <span>Samoprocjena:</span>
          <span>😃 Lako</span>
          <span>😐 Srednje</span>
          <span>😟 Teško</span>
        </div>
      </div>
    </div>
  );
}

function DifferentiatedMathTestSheet() {
  return (
    <TestFrame
      subject="MATEMATIKA"
      title="Sabiranje i oduzimanje do 100 sa zagradama i tekstualnim zadatkom"
      level1={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">1. Izračunaj osnovne računske operacije (5 b):</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>a) 14 + 5 = ____</div>
            <div>b) 19 - 7 = ____</div>
            <div>c) 8 + 6 = ____</div>
            <div>d) 15 - 9 = ____</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">2. Upiši broj koji nedostaje u kvadratić (5 b):</p>
          <div className="grid grid-cols-3 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>a) 10 + [ &nbsp; ] = 17</div>
            <div>b) [ &nbsp; ] - 4 = 12</div>
            <div>c) 20 - [ &nbsp; ] = 15</div>
          </div>
        </div>
      }
      level2={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">3. Izračunaj vrijednost izraza poštujući zagrade (4 b):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>a) (34 + 16) - 25 = ____________________</div>
            <div>b) 80 - (24 + 18) = ____________________</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">4. Odredi nepoznati broj x i provjeri tačnost (4 b):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>a) x + 27 = 64 &nbsp;➔&nbsp; x = _______ &nbsp;(Pr: _______)</div>
            <div>b) 75 - x = 38 &nbsp;➔&nbsp; x = _______ &nbsp;(Pr: _______)</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">5. Upiši znak &lt;, &gt; ili = (2 b):</p>
          <div className="grid grid-cols-2 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>45 + 18 &nbsp;[ &nbsp; ]&nbsp; 80 - 15</div>
            <div>62 - 24 &nbsp;[ &nbsp; ]&nbsp; 19 + 19</div>
          </div>
        </div>
      }
      level3={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">6. Složeni tekstualni zadatak (6 b):</p>
          <div className="bg-white p-2.5 rounded border border-gray-200 text-xs sm:text-sm leading-relaxed">
            <p>
              U školskoj biblioteci na prvoj polici ima 46 knjiga. Na drugoj polici ima za 18 knjiga manje nego na prvoj, a na trećoj polici onoliko koliko na prve dvije police zajedno. Koliko ukupno knjiga ima na sve tri police?
            </p>
            <div className="mt-2 text-xs font-mono text-gray-500">
              Račun: __________________________________________________________________<br />
              Odgovor: _________________________________________________________________
            </div>
          </div>
          <p className="font-semibold text-[13px] pt-1">7. Logička zagonetka (4 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            Zbir tri uzastopna broja iznosi 45. Koji su to brojevi? &nbsp;➔&nbsp; <strong>___ + ___ + ___ = 45</strong>
          </div>
        </div>
      }
    />
  );
}

function DifferentiatedGrammarTestSheet() {
  return (
    <TestFrame
      subject="SRPSKI / MATERNJI JEZIK"
      title="Vrste reči, rečenice, pravopis i čitanje sa razumevanjem"
      level1={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">1. Na kraju svake rečenice upiši tačku (.), upitnik (?) ili uzvičnik (!) (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 space-y-1 text-xs sm:text-sm">
            <div>a) Danas je prelep, sunčan i topao prolećni dan [ &nbsp; ]</div>
            <div>b) Da li si poneo pernicu i udžbenik za školu [ &nbsp; ]</div>
            <div>c) Pazi na stepenicama, nemoj trčati [ &nbsp; ]</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">2. Podvuci reči koje moraju biti napisane velikim početnim slovom (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm italic">
            „učenik marko i njegova sestra jelena žive u banjaluci blizu reke vrbas.”
          </div>
        </div>
      }
      level2={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">3. Razvrstaj ponuđene reči u tabelu: kuća, pevati, plavo, reka, crtati, vesela, drvo, trčati (4 b):</p>
          <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded border border-gray-200 text-xs">
            <div><strong>Imenice (bića, predmeti):</strong><br />________________________</div>
            <div><strong>Glagoli (radnja):</strong><br />________________________</div>
            <div><strong>Pridjevi (osobine):</strong><br />________________________</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">4. Odredi rod (muški, ženski, srednji) i broj (jednina, množina) imenicama (4 b):</p>
          <div className="grid grid-cols-2 gap-2 bg-white p-2 rounded border border-gray-200 text-xs font-mono">
            <div>a) jabuke: rod ________, broj ________</div>
            <div>b) sunce: rod ________, broj ________</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">5. Napiši odrični oblik glagola (2 b):</p>
          <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded border border-gray-200 text-xs">
            <div>znam ➔ ____________</div>
            <div>hoću ➔ ____________</div>
            <div>imam ➔ ____________</div>
          </div>
        </div>
      }
      level3={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">6. Pronađi i precrtaj 4 pravopisne greške u tekstu, pa ih pravilno napiši (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm leading-relaxed">
            „Juče smo išli na izlet na planinu jahorinu. nismo znali dase tamo još uvek sneg nije otopio. Sa nama je išao i pas žuća.”<br />
            <span className="text-gray-500 text-xs">Ispravke: 1) _______________ 2) _______________ 3) _______________ 4) _______________</span>
          </div>
          <p className="font-semibold text-[13px] pt-1">7. Stvaralačko pisanje (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            Napiši 3 povezane rečenice o svom omiljenom godišnjem dobu. Upotrijebi najmanje 3 opisna prideva i 1 uzvičnu rečenicu:<br />
            <div className="border-b border-dotted border-gray-400 h-5 mt-1" />
            <div className="border-b border-dotted border-gray-400 h-5 mt-1" />
            <div className="border-b border-dotted border-gray-400 h-5 mt-1" />
          </div>
        </div>
      }
    />
  );
}

function DifferentiatedNatureTestSheet() {
  return (
    <TestFrame
      subject="PRIRODA I DRUŠTVO / SVET OKO NAS"
      title="Živa i neživa priroda, godišnja doba, biljke i životinjski svet"
      level1={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">1. Poveži linijom živo biće sa njegovim staništem (4 b):</p>
          <div className="grid grid-cols-2 gap-2 bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            <div>• Pastrmka<br />• Veverica<br />• Pčela medarica<br />• Krtica</div>
            <div className="text-right">• Rascvetala livada<br />• Planinska bistra reka<br />• Podzemni hodnici u zemlji<br />• Hrastova šuma</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">2. Zaokruži šta pripada NEŽIVOJ prirodi (3 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm flex flex-wrap gap-3">
            <span>a) vuk</span>
            <span>b) kamen</span>
            <span>c) sunce</span>
            <span>d) maslačak</span>
            <span>e) vazduh i voda</span>
          </div>
          <p className="font-semibold text-[13px] pt-1">3. Napiši 4 glavna dijela biljke (3 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs font-mono">
            1) _____________ &nbsp; 2) _____________ &nbsp; 3) _____________ &nbsp; 4) _____________
          </div>
        </div>
      }
      level2={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">4. Razvrstaj životinje na domaće i divlje i napiši korist domaćih za čoveka (5 b):</p>
          <div className="grid grid-cols-2 gap-2 bg-white p-2 rounded border border-gray-200 text-xs">
            <div>
              <strong>Domaće životinje:</strong> krava, ovca, kokoška<br />
              <span className="text-gray-500">Korist: _______________________________</span>
            </div>
            <div>
              <strong>Divlje životinje:</strong> lisica, medvjed, divlja svinja<br />
              <span className="text-gray-500">Gdje pronalaze hranu: __________________</span>
            </div>
          </div>
          <p className="font-semibold text-[13px] pt-1">5. Dopuni rečenice o kretanju Zemlje i vremenu (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 space-y-1 text-xs">
            <div>a) Dan i noć nastaju zbog obrtanja Zemlje oko ____________________.</div>
            <div>b) Četiri godišnja doba nastaju zbog kretanja Zemlje oko ____________________.</div>
            <div>c) Napiši dva znaka po kojima prepoznajemo jesen u prirodi: ________________________.</div>
          </div>
        </div>
      }
      level3={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">6. Lanac ishrane — poredaj brojevima od 1 do 4 (5 b):</p>
          <div className="bg-white p-2.5 rounded border border-gray-200 text-xs sm:text-sm">
            <div className="flex justify-between items-center mb-2 font-semibold">
              <span>[ &nbsp; ] Žaba</span>
              <span>➔</span>
              <span>[ &nbsp; ] Roda</span>
              <span>➔</span>
              <span>[ &nbsp; ] Zelena trava</span>
              <span>➔</span>
              <span>[ &nbsp; ] Skakavac</span>
            </div>
            <p className="text-xs text-gray-600">
              Šta bi se dogodilo sa skakavcima ako bi iz bare nestale sve žabe? Objasni: __________________________________________________________________
            </p>
          </div>
          <p className="font-semibold text-[13px] pt-1">7. Zaštita životne sredine i ekologija (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            Napiši dva načina kako učenici u školi i kod kuće mogu štedjeti vodu i čuvati prirodu od zagađenja plastičnim otpadom:<br />
            1) ____________________________________________________________________<br />
            2) ____________________________________________________________________
          </div>
        </div>
      }
    />
  );
}

function DifferentiatedReadingTestSheet() {
  return (
    <TestFrame
      subject="SRPSKI / BOSANSKI / HRVATSKI JEZIK"
      title="Čitanje sa razumijevanjem: „Vrijedna pčelica Maja i veseli mrav”"
      level1={
        <div className="space-y-2">
          {/* Tekst priče */}
          <div className="bg-amber-50/50 p-2.5 rounded border border-amber-200 text-xs leading-relaxed italic print:bg-white print:border-gray-300">
            „Jednog toplog ljetnog jutra, pčelica Maja je letjela sa cvijeta na cvijet i sakupljala slatki nektar. Pored starog hrasta sjedio je mrav Borko, sunčao se i pjevao. 'Zašto toliko radiš na ovoj vrućini, Majo? Dođi da se igramo!', reče mrav. 'Lijepo je igrati se, Borko, ali ja spremam med za hladnu zimu. Ako sada ne radimo, zimi ćemo gladovati', odgovori pčelica i odletje u košnicu. Kada je pala prva snježna mećava, Borko je shvatio da nema ni zrno hrane. Pokucao je na vrata košnice. Maja ga je ugostila toplim čajem i medom, a Borko je obećao da će od proljeća biti najvrijedniji mrav u šumi.”
          </div>
          <p className="font-semibold text-[13px]">1. Pitanja za provjeru osnovnih činjenica iz priče (10 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 space-y-1.5 text-xs sm:text-sm">
            <div>a) Ko su glavni likovi ove priče? _________________________________________</div>
            <div>
              b) U koje godišnje doba započinje priča? &nbsp;
              <strong>A)</strong> u jesen &nbsp; <strong>B)</strong> u proljeće &nbsp; <strong>C)</strong> u ljeto
            </div>
            <div>c) Šta je pčelica Maja sakupljala na livadi? _________________________________________</div>
          </div>
        </div>
      }
      level2={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">2. Poredaj redoslijed događaja u priči brojevima od 1 do 4 (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 space-y-1 text-xs">
            <div>[ &nbsp; ] Mrav Borko kuca na vrata tople košnice tražeći pomoć.</div>
            <div>[ &nbsp; ] Pčelica Maja vrijedno sakuplja nektar dok se mrav sunča i pjeva.</div>
            <div>[ &nbsp; ] Borko obećava pčelici da će na proljeće postati vrijedan mrav.</div>
            <div>[ &nbsp; ] Pala je prva snježna mećava i mrav je ostao bez ijednog zrna hrane.</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">3. Uzroci i posljedice (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            Zašto je pčelica Maja radila po najvećoj ljetnoj vrućini dok su se drugi odmarali? __________________________________________________________________________________
          </div>
        </div>
      }
      level3={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">4. Poruka priče i pouka (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            Koja je glavna pouka ove priče za djecu? Koju narodnu poslovicu možeš povezati sa ovom pričom? (npr. „Ko radi, ne boji se gladi”) __________________________________________________________________________________
          </div>
          <p className="font-semibold text-[13px] pt-1">5. Tvoje mišljenje i empatija (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            Kako je pčelica Maja postupila prema mravu kada je bio u nevolji i šta to govori o pravom prijateljstvu? Šta bi ti učinio na Majinom mjestu?<br />
            <div className="border-b border-dotted border-gray-400 h-5 mt-1" />
            <div className="border-b border-dotted border-gray-400 h-5 mt-1" />
          </div>
        </div>
      }
    />
  );
}

function DifferentiatedMultiplicationTestSheet() {
  return (
    <TestFrame
      subject="MATEMATIKA"
      title="Množenje i dijeljenje brojeva, redoslijed operacija i jednačine"
      level1={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">1. Izračunaj osnovne proizvode i količnike (6 b):</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>3 × 4 = ____</div>
            <div>5 × 6 = ____</div>
            <div>2 × 9 = ____</div>
            <div>4 × 7 = ____</div>
            <div>12 : 3 = ____</div>
            <div>20 : 5 = ____</div>
            <div>18 : 2 = ____</div>
            <div>28 : 4 = ____</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">2. Zapiši zbir jednakih sabiraka kao proizvod (4 b):</p>
          <div className="grid grid-cols-2 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>a) 4 + 4 + 4 + 4 + 4 = ____ × ____ = ____</div>
            <div>b) 6 + 6 + 6 = ____ × ____ = ____</div>
          </div>
        </div>
      }
      level2={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">3. Izračunaj pazeći na redoslijed operacija (množenje i dijeljenje imaju prednost) (4 b):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>a) 64 - 6 × 7 = 64 - ____ = ____</div>
            <div>b) 8 × 8 + 26 = ____ + 26 = ____</div>
            <div>c) 54 : 6 + 7 × 5 = ____ + ____ = ____</div>
            <div>d) 90 - (45 : 9) = 90 - ____ = ____</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">4. Uporedi izraze upisivanjem znaka &lt;, &gt; ili = (3 b):</p>
          <div className="grid grid-cols-3 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>7 × 8 &nbsp;[ &nbsp; ]&nbsp; 6 × 9</div>
            <div>72 : 8 &nbsp;[ &nbsp; ]&nbsp; 63 : 7</div>
            <div>9 × 4 &nbsp;[ &nbsp; ]&nbsp; 40 - 5</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">5. Odredi nepoznati broj x (3 b):</p>
          <div className="grid grid-cols-2 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>a) x × 6 = 42 ➔ x = 42 : 6 ➔ x = ____</div>
            <div>b) 56 : x = 7 ➔ x = 56 : 7 ➔ x = ____</div>
          </div>
        </div>
      }
      level3={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">6. Tekstualni zadatak u dva koraka (6 b):</p>
          <div className="bg-white p-2.5 rounded border border-gray-200 text-xs sm:text-sm leading-relaxed">
            <p>
              Učiteljica je za školsku priredbu pripremila 5 pakovanja balona, a u svakom pakovanju je bilo po 8 balona. Učenici su ukrasili 4 učionice tako što su u svaku stavili jednak broj balona. Koliko je balona dobila svaka učionica?
            </p>
            <div className="mt-2 text-xs font-mono text-gray-500">
              1) Ukupno balona: ________________________ = _____<br />
              2) Po svakoj učionici: ___________________ = _____<br />
              Odgovor: _________________________________________________________________
            </div>
          </div>
          <p className="font-semibold text-[13px] pt-1">7. Logički zadatak sa dijeljenjem (4 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            Mama je podijelila 27 bombona na troje djece tako da je svako sljedeće dijete dobilo po 2 bombone više od prethodnog. Koliko je bombona dobilo svako dijete? &nbsp;➔&nbsp; <strong>___ + ___ + ___ = 27</strong>
          </div>
        </div>
      }
    />
  );
}

interface SheetContext {
  alphabet: readonly string[];
  colorNames: Record<ToyColor, string>;
}

// Svaki list vraća svoje strane; stranica radnog lista oko svake dodaje zaglavlje i prelom strane.
export const worksheets: Record<WorksheetId, (ctx: SheetContext) => ReactNode[]> = {
  coloringClassroom: () => [
    <ImageColoringSheet
      key="coloringClassroom"
      src="/slike/bojanke/ucionica-i-skola.jpg"
      alt="Moja učionica i škola"
      prompt="Oboji učiteljicu, đake, tablu i školski pribor svojim omiljenim bojama."
    />,
  ],
  coloringSeasons: () => [
    <ImageColoringSheet
      key="coloringSeasons"
      src="/slike/bojanke/cetiri-godisnja-doba.jpg"
      alt="Četiri godišnja doba"
      prompt="Proljeće, ljeto, jesen i zima — oboji svako polje karakterističnim bojama prirode."
    />,
  ],
  coloringSpring: () => [
    <ImageColoringSheet
      key="coloringSpring"
      src="/slike/bojanke/prolece-i-pcelice.jpg"
      alt="Proljeće u cvatu i pčelice"
      prompt="Oboji proljećno cvijeće, veselu pčelicu, leptira i nasmijano sunce."
    />,
  ],
  coloringSummer: () => [
    <ImageColoringSheet
      key="coloringSummer"
      src="/slike/bojanke/leto-na-plazi.jpg"
      alt="Ljeto na plaži i dvorac od pijeska"
      prompt="Oboji dvorac od pijeska, suncobran, šarenu loptu, koficu i veselog račića."
    />,
  ],
  coloringAutumn: () => [
    <ImageColoringSheet
      key="coloringAutumn"
      src="/slike/bojanke/jesen-u-sumi.jpg"
      alt="Jesenja šuma i šumske životinje"
      prompt="Oboji ježića sa jabukom, vjevericu sa žirom, mudru sovu i opalo jesenje lišće."
    />,
  ],
  coloringWinter: () => [
    <ImageColoringSheet
      key="coloringWinter"
      src="/slike/bojanke/zimske-radosti.svg"
      alt="Zimske radosti i sankanje"
      prompt="Oboji sanke koje jure niz brdo, Sneška Belića, toplu zimsku odeću i pahulje."
    />,
  ],
  coloringAnimals: () => [
    <ImageColoringSheet
      key="coloringAnimals"
      src="/slike/bojanke/zivotinje-na-farmi.jpg"
      alt="Domaće životinje na farmi"
      prompt="Oboji kravicu, ovčicu, kucu i pijetla, pa ih imenuj naglas."
    />,
  ],
  coloringSafari: () => [
    <ImageColoringSheet
      key="coloringSafari"
      src="/slike/bojanke/safari-dzungla.svg"
      alt="Safari i divlje životinje"
      prompt="Oboji lavića sa grivom, visoku žirafu, majmunčića na drvetu i afričko sunce."
    />,
  ],
  coloringPets: () => [
    <ImageColoringSheet
      key="coloringPets"
      src="/slike/bojanke/kucni-ljubimci.jpg"
      alt="Kućni ljubimci"
      prompt="Oboji razigrano mače sa klupkom, kucu sa koskom i zlatnu ribicu."
    />,
  ],
  coloringUnderwater: () => [
    <ImageColoringSheet
      key="coloringUnderwater"
      src="/slike/bojanke/podvodni-svet.jpg"
      alt="Podvodni svijet i morske životinje"
      prompt="Oboji veselog delfina, morsku kornjaču, hobotnicu i morske zvijezde u živim morskim tonovima."
    />,
  ],
  coloringSubmarine: () => [
    <ImageColoringSheet
      key="coloringSubmarine"
      src="/slike/bojanke/podmornica-i-blago.svg"
      alt="Podmornica i tajanstveno blago"
      prompt="Oboji istraživačku podmornicu, škrinju sa blagom, zlatnike i morske ribice."
    />,
  ],
  coloringVehicles: () => [
    <ImageColoringSheet
      key="coloringVehicles"
      src="/slike/bojanke/saobracaj-i-vozila.jpg"
      alt="Saobraćaj i prevozna sredstva"
      prompt="Oboji parnu lokomotivu, avion, jedrenjak i auto na putu."
    />,
  ],
  coloringConstruction: () => [
    <ImageColoringSheet
      key="coloringConstruction"
      src="/slike/bojanke/gradjevinske-masine.jpg"
      alt="Građevinske mašine i bageri"
      prompt="Oboji veliki bager sa kašikom, kamion kiper i visoku dizalicu na gradilištu."
    />,
  ],
  coloringDino: () => [
    <ImageColoringSheet
      key="coloringDino"
      src="/slike/bojanke/dinosauri-avantura.jpg"
      alt="Dinosaurusi i praistorijski svijet"
      prompt="Oboji biljojeda dugog vrata, triceratopsa i bebu dinosaurusa koja viri iz jajeta."
    />,
  ],
  coloringCastle: () => [
    <ImageColoringSheet
      key="coloringCastle"
      src="/slike/bojanke/dvorac-i-bajka.jpg"
      alt="Bajkoviti dvorac i zmaj"
      prompt="Oboji kule dvorca, zastavice, veselog zmaja sa cvijetom i dugu na nebu."
    />,
  ],
  coloringSpace: () => [
    <ImageColoringSheet
      key="coloringSpace"
      src="/slike/bojanke/svemir-i-kosmonauti.jpg"
      alt="Kosmos, raketa i astronaut"
      prompt="Oboji astronauta u bestežinskom stanju, raketu, planete sa prstenom i prijateljskog vanzemaljca."
    />,
  ],
  coloringProfessions: () => [
    <ImageColoringSheet
      key="coloringProfessions"
      src="/slike/bojanke/zanimanja-ljudi.svg"
      alt="Zanimanja i profesije"
      prompt="Oboji hrabrog vatrogasca sa šmrkom, ljekara sa stetoskopom i veselog kuvara sa kapom."
    />,
  ],
  coloringSports: () => [
    <ImageColoringSheet
      key="coloringSports"
      src="/slike/bojanke/sport-i-igra.jpg"
      alt="Sport i rekreacija za djecu"
      prompt="Oboji bicikl, fudbalsku loptu, djecu u pokretu i pobjedničke pehare."
    />,
  ],
  coloringMusic: () => [
    <ImageColoringSheet
      key="coloringMusic"
      src="/slike/bojanke/muzika-i-instrumenti.svg"
      alt="Muzički orkestar i instrumenti"
      prompt="Oboji gitaru, dirke klavira, bubnjeve i raspjevane note koje lebde u vazduhu."
    />,
  ],
  coloringBakery: () => [
    <ImageColoringSheet
      key="coloringBakery"
      src="/slike/bojanke/pekara-i-kolaci.svg"
      alt="Slatka pekara i kolačići"
      prompt="Oboji rođendansku tortu sa svjećicama, krofne sa posipom i mafine."
    />,
  ],
  coloringLatin: () => coloringLetterPages(LATIN_COLOR_CARDS),
  coloringCyrillic: () => coloringLetterPages(CYRILLIC_COLOR_CARDS),
  colorByNumber: (ctx) => [<ColorByNumberSheet key="colorByNumber" {...ctx} />],
  coloringScenes: () => ColoringScenesPages(),
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
  initialLetterLatin: () => [<InitialLetterSheet key="initialLetterLatin" script="lat" />],
  initialLetterCyrillic: () => [<InitialLetterSheet key="initialLetterCyrillic" script="cyr" />],
  letterMatchLatin: () => [<LetterMatchSheet key="letterMatchLatin" script="lat" />],
  letterMatchCyrillic: () => [<LetterMatchSheet key="letterMatchCyrillic" script="cyr" />],
  syllablesLatin: () => [<SyllablesSheet key="syllablesLatin" script="lat" />],
  syllablesCyrillic: () => [<SyllablesSheet key="syllablesCyrillic" script="cyr" />],
  scriptBridge: () => [<ScriptBridgeSheet key="scriptBridge" />],
  lines: () => [<LinesSheet key="lines" />],
  waves: () => [<WavesSheet key="waves" />],
  outlines: () => [<OutlinesSheet key="outlines" />],
  colors: (ctx) => [<ColorsSheet key="colors" {...ctx} />],
  count: () => [<CountSheet key="count" />],
  quantity: () => [<QuantitySheet key="quantity" />],
  adding: () => [<AddingSheet key="adding" />],
  subtraction: () => [<SubtractionSheet key="subtraction" />],
  compareNumbers: () => [<CompareNumbersSheet key="compareNumbers" />],
  missingNumbers: () => [<MissingNumbersSheet key="missingNumbers" />],
  sizes: () => [<SizesSheet key="sizes" />],
  pattern: () => [<PatternSheet key="pattern" />],
  odd: () => [<OddSheet key="odd" />],
  match: () => [<PairsSheet key="match" pairs={MATCH_PAIRS} order={[3, 5, 0, 4, 1, 2]} right="pair" />],
  shapes: () => [<PairsSheet key="shapes" pairs={SHADOW_THINGS} order={[2, 4, 1, 5, 0, 3]} right="shadow" />],
  differences: () => [<DifferencesSheet key="differences" />],
  symmetry: () => [<SymmetrySheet key="symmetry" />],
  copy: () => [<CopySheet key="copy" />],
  testMathOperations: () => [<DifferentiatedMathTestSheet key="testMathOperations" />],
  testLanguageGrammar: () => [<DifferentiatedGrammarTestSheet key="testLanguageGrammar" />],
  testNatureSociety: () => [<DifferentiatedNatureTestSheet key="testNatureSociety" />],
  testReadingComprehension: () => [<DifferentiatedReadingTestSheet key="testReadingComprehension" />],
  testMultiplicationDivision: () => [<DifferentiatedMultiplicationTestSheet key="testMultiplicationDivision" />],
};
