import { useLayoutEffect, useRef, useState, type ReactNode, type SVGProps } from 'react';
import {
  AlarmClock,
  Backpack,
  Bath,
  Bean,
  Bed,
  BookOpen,
  Cake,
  Candy,
  Cookie,
  Croissant,
  CupSoda,
  Droplets,
  Egg,
  GlassWater,
  Hand,
  IceCreamCone,
  Milk,
  Newspaper,
  Package,
  PersonStanding,
  Puzzle,
  Recycle,
  Salad,
  School,
  Snowflake,
  Soup,
  Sprout,
  Sunrise,
  Sunset,
  Toothbrush,
  Utensils,
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
import type { Dictionary } from '../i18n/dictionaries';
import { shapePaths, toyHex } from './shared';
import { PATHS } from './Trace';
import { FIGURES } from './ConnectDots';
import { MAZES } from './Maze';
import { homeWorkbookMath2Pages } from './workbook';
import { writingHandbookPages } from './writingHandbook';
import { winterBreakPackPages } from './packs';
import { wildAnimalsPages } from './wildAnimals';
import {
  basketballPages,
  bicyclePages,
  bunniesPages,
  carsPages,
  earthPages,
  familyPages,
  fathersDayPages,
  forestAnimalsPages,
  fruitVegPages,
  leavesPages,
  mannersPages,
  numbersPages,
  puppiesPages,
  summerPages,
  weatherPages,
} from './imageColoringBooks';

// Papir je uvijek bijel, pa su boje fiksne (ne prate temu sajta) i dovoljno svijetle da se štampaju i crno-bijelo.
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
              // Broj stoji malo van oblika, da ne smeta liniji koju dijete crta.
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
  // Širina uzorka se mjeri u browseru (i ponovo kada se font učita), da se široka slova poput Љ i М ne preklapaju.
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

// Listovi ispod crtaju cijelu stranu u jednom SVG-u širine 600; visina ≤ 660 staje na A4 ispod zaglavlja.
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

// Sličica centrirana na (x, y); `filled` je pun crni obris (sjenka).
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

// Lijeva polovina figure na mreži 10×10; osa simetrije je na x = 5.
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

      {/* Donji dio: prethodnik i sljedbenik */}
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
// NOVI MATEMATIČKI RADNI LISTOVI (RAZLOMCI, GEOMETRIJA, PARNI/NEPARNI, NOVAC, RIMSKI BROJEVI, MNOŽENJE)
// ============================================================================

function MathFractionsSheet() {
  return (
    <Page height={650}>
      {/* 1. Osenči zadati dio */}
      <text x={300} y={28} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        1. Osenči ili oboji zadati dio na svakoj figuri:
      </text>

      {/* 4 figure za bojenje */}
      {/* Krug 1/2 */}
      <g transform="translate(60, 45)">
        <circle cx={40} cy={40} r={38} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <line x1={40} y1={2} x2={40} y2={78} stroke={INK} strokeWidth={2.5} />
        <rect x={22} y={92} width={36} height={36} rx={8} fill="#f9fafb" stroke={INK} strokeWidth={1.8} />
        <text x={40} y={116} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={18} fontWeight="bold">½</text>
      </g>

      {/* Krug 3/4 */}
      <g transform="translate(195, 45)">
        <circle cx={40} cy={40} r={38} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <line x1={40} y1={2} x2={40} y2={78} stroke={INK} strokeWidth={2.5} />
        <line x1={2} y1={40} x2={78} y2={40} stroke={INK} strokeWidth={2.5} />
        <rect x={22} y={92} width={36} height={36} rx={8} fill="#f9fafb" stroke={INK} strokeWidth={1.8} />
        <text x={40} y={116} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={18} fontWeight="bold">¾</text>
      </g>

      {/* Pravougaonik 2/3 */}
      <g transform="translate(330, 45)">
        <rect x={0} y={15} width={90} height={50} rx={4} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <line x1={30} y1={15} x2={30} y2={65} stroke={INK} strokeWidth={2.5} />
        <line x1={60} y1={15} x2={60} y2={65} stroke={INK} strokeWidth={2.5} />
        <rect x={27} y={92} width={36} height={36} rx={8} fill="#f9fafb" stroke={INK} strokeWidth={1.8} />
        <text x={45} y={116} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={18} fontWeight="bold">⅔</text>
      </g>

      {/* Pravougaonik 5/6 */}
      <g transform="translate(465, 45)">
        <rect x={0} y={15} width={90} height={50} rx={4} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <line x1={30} y1={15} x2={30} y2={65} stroke={INK} strokeWidth={2.2} />
        <line x1={60} y1={15} x2={60} y2={65} stroke={INK} strokeWidth={2.2} />
        <line x1={0} y1={40} x2={90} y2={40} stroke={INK} strokeWidth={2.2} />
        <rect x={27} y={92} width={36} height={36} rx={8} fill="#f9fafb" stroke={INK} strokeWidth={1.8} />
        <text x={45} y={116} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={18} fontWeight="bold">⅚</text>
      </g>

      <Divider y={195} />

      {/* 2. Zapiši razlomak za osenčeni dio */}
      <text x={300} y={222} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        2. Upiši razlomak koji odgovara osenčenom dijelu figure:
      </text>

      {/* 4 figure sa osenčenim delovima */}
      {/* Krug 1/4 osenčen */}
      <g transform="translate(60, 240)">
        <circle cx={40} cy={40} r={38} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <path d="M 40 40 L 40 2 A 38 38 0 0 1 78 40 Z" fill="#93c5fd" stroke={INK} strokeWidth={2.5} />
        <line x1={40} y1={2} x2={40} y2={78} stroke={INK} strokeWidth={2.5} />
        <line x1={2} y1={40} x2={78} y2={40} stroke={INK} strokeWidth={2.5} />
        <g transform="translate(25, 90)">
          <rect x={0} y={0} width={30} height={22} rx={4} fill="#fff" stroke={INK} strokeWidth={1.8} />
          <line x1={-4} y1={28} x2={34} y2={28} stroke={INK} strokeWidth={2.5} />
          <rect x={0} y={34} width={30} height={22} rx={4} fill="#fff" stroke={INK} strokeWidth={1.8} />
        </g>
      </g>

      {/* Pravougaonik 2/4 osenčen */}
      <g transform="translate(195, 240)">
        <rect x={0} y={15} width={90} height={50} rx={4} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <rect x={0} y={15} width={45} height={50} rx={0} fill="#93c5fd" stroke={INK} strokeWidth={2.5} />
        <line x1={22.5} y1={15} x2={22.5} y2={65} stroke={INK} strokeWidth={2} />
        <line x1={45} y1={15} x2={45} y2={65} stroke={INK} strokeWidth={2.5} />
        <line x1={67.5} y1={15} x2={67.5} y2={65} stroke={INK} strokeWidth={2} />
        <g transform="translate(30, 90)">
          <rect x={0} y={0} width={30} height={22} rx={4} fill="#fff" stroke={INK} strokeWidth={1.8} />
          <line x1={-4} y1={28} x2={34} y2={28} stroke={INK} strokeWidth={2.5} />
          <rect x={0} y={34} width={30} height={22} rx={4} fill="#fff" stroke={INK} strokeWidth={1.8} />
        </g>
      </g>

      {/* Krug podeljen na 8 (3 osenčena) */}
      <g transform="translate(330, 240)">
        <circle cx={40} cy={40} r={38} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <path d="M 40 40 L 40 2 A 38 38 0 0 1 78 40 L 40 40 L 67 67 A 38 38 0 0 1 40 78 Z" fill="#93c5fd" stroke={INK} strokeWidth={2.5} />
        <line x1={40} y1={2} x2={40} y2={78} stroke={INK} strokeWidth={2.2} />
        <line x1={2} y1={40} x2={78} y2={40} stroke={INK} strokeWidth={2.2} />
        <line x1={13} y1={13} x2={67} y2={67} stroke={INK} strokeWidth={2.2} />
        <line x1={13} y1={67} x2={67} y2={13} stroke={INK} strokeWidth={2.2} />
        <g transform="translate(25, 90)">
          <rect x={0} y={0} width={30} height={22} rx={4} fill="#fff" stroke={INK} strokeWidth={1.8} />
          <line x1={-4} y1={28} x2={34} y2={28} stroke={INK} strokeWidth={2.5} />
          <rect x={0} y={34} width={30} height={22} rx={4} fill="#fff" stroke={INK} strokeWidth={1.8} />
        </g>
      </g>

      {/* Pravougaonik podeljen na 5 (3 osenčena) */}
      <g transform="translate(465, 240)">
        <rect x={0} y={15} width={90} height={50} rx={4} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <rect x={0} y={15} width={54} height={50} fill="#93c5fd" stroke={INK} strokeWidth={2} />
        {[18, 36, 54, 72].map((x) => (
          <line key={x} x1={x} y1={15} x2={x} y2={65} stroke={INK} strokeWidth={2} />
        ))}
        <g transform="translate(30, 90)">
          <rect x={0} y={0} width={30} height={22} rx={4} fill="#fff" stroke={INK} strokeWidth={1.8} />
          <line x1={-4} y1={28} x2={34} y2={28} stroke={INK} strokeWidth={2.5} />
          <rect x={0} y={34} width={30} height={22} rx={4} fill="#fff" stroke={INK} strokeWidth={1.8} />
        </g>
      </g>

      <Divider y={415} />

      {/* 3. Poređenje razlomaka */}
      <text x={300} y={442} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        3. Uporedi razlomke upisivanjem znaka &lt;, &gt; ili = u kružić:
      </text>

      {[
        { l: '¼', r: '¾', y: 485 },
        { l: '⅖', r: '⅘', y: 535 },
        { l: '3/3', r: '1', y: 585 },
      ].map((item, i) => (
        <g key={i}>
          <text x={110} y={item.y + 7} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={22} fontWeight="bold">
            {item.l}
          </text>
          <circle cx={175} cy={item.y} r={18} fill="#fff" stroke={INK} strokeWidth={2} />
          <text x={240} y={item.y + 7} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={22} fontWeight="bold">
            {item.r}
          </text>

          <text x={360} y={item.y + 7} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={22} fontWeight="bold">
            {i === 0 ? '⅚' : i === 1 ? '⅜' : '4/4'}
          </text>
          <circle cx={425} cy={item.y} r={18} fill="#fff" stroke={INK} strokeWidth={2} />
          <text x={490} y={item.y + 7} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={22} fontWeight="bold">
            {i === 0 ? '⅙' : i === 1 ? '⅞' : '2/4'}
          </text>
        </g>
      ))}
    </Page>
  );
}

function MathGeometrySheet() {
  return (
    <Page height={650}>
      {/* 1. Ravne geometrijske figure */}
      <text x={300} y={26} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        1. Prepoznaj figure, napiši njihov naziv i prebroj stranice i tjemena:
      </text>

      <g transform="translate(30, 45)">
        <g transform="translate(0, 0)">
          <rect x={15} y={5} width={65} height={65} rx={2} fill="#f9fafb" stroke={INK} strokeWidth={2.5} />
          <text x={47} y={92} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={13} fontWeight="bold">KVADRAT</text>
          <text x={47} y={112} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={11}>Stranica: [ 4 ]</text>
          <text x={47} y={128} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={11}>Tjemena: [ 4 ]</text>
        </g>

        <g transform="translate(140, 0)">
          <polygon points="47,5 15,70 80,70" fill="#f9fafb" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
          <text x={47} y={92} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={13} fontWeight="bold">TROUGAO</text>
          <text x={47} y={112} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={11}>Stranica: [ &nbsp;&nbsp; ]</text>
          <text x={47} y={128} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={11}>Tjemena: [ &nbsp;&nbsp; ]</text>
        </g>

        <g transform="translate(280, 0)">
          <rect x={5} y={15} width={85} height={50} rx={2} fill="#f9fafb" stroke={INK} strokeWidth={2.5} />
          <text x={47} y={92} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={12} fontWeight="bold">PRAVOUGAONIK</text>
          <text x={47} y={112} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={11}>Stranica: [ &nbsp;&nbsp; ]</text>
          <text x={47} y={128} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={11}>Tjemena: [ &nbsp;&nbsp; ]</text>
        </g>

        <g transform="translate(435, 0)">
          <circle cx={47} cy={38} r={33} fill="#f9fafb" stroke={INK} strokeWidth={2.5} />
          <text x={47} y={92} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={13} fontWeight="bold">KRUG</text>
          <text x={47} y={112} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={11}>Stranica: [ &nbsp;&nbsp; ]</text>
          <text x={47} y={128} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={11}>Tjemena: [ &nbsp;&nbsp; ]</text>
        </g>
      </g>

      <Divider y={195} />

      {/* 2. Geometrijska tijela i predmeti */}
      <text x={300} y={222} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        2. Spoji linijom geometrijsko tijelo sa odgovarajućim predmetom:
      </text>

      <g transform="translate(70, 245)">
        <g transform="translate(0, 0)">
          <rect x={15} y={10} width={38} height={38} fill="#fff" stroke={INK} strokeWidth={2} />
          <polygon points="15,10 32,0 70,0 53,10" fill="#fff" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <polygon points="53,10 70,0 70,38 53,48" fill="#fff" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <text x={110} y={32} fill={INK} fontFamily={FONT} fontSize={14} fontWeight="bold">KOCKA</text>
          <circle cx={185} cy={28} r={5} fill={INK} />
        </g>

        <g transform="translate(0, 55)">
          <circle cx={35} cy={28} r={22} fill="#fff" stroke={INK} strokeWidth={2.2} />
          <ellipse cx={35} cy={28} rx={22} ry={7} fill="none" stroke={INK} strokeWidth={1.5} strokeDasharray="4 3" />
          <text x={110} y={32} fill={INK} fontFamily={FONT} fontSize={14} fontWeight="bold">LOPTA / KUGLA</text>
          <circle cx={185} cy={28} r={5} fill={INK} />
        </g>

        <g transform="translate(0, 110)">
          <ellipse cx={35} cy={12} rx={22} ry={8} fill="#fff" stroke={INK} strokeWidth={2} />
          <line x1={13} y1={12} x2={13} y2={44} stroke={INK} strokeWidth={2} />
          <line x1={57} y1={12} x2={57} y2={44} stroke={INK} strokeWidth={2} />
          <ellipse cx={35} cy={44} rx={22} ry={8} fill="#fff" stroke={INK} strokeWidth={2} />
          <text x={110} y={32} fill={INK} fontFamily={FONT} fontSize={14} fontWeight="bold">VALJAK</text>
          <circle cx={185} cy={28} r={5} fill={INK} />
        </g>

        <g transform="translate(0, 165)">
          <rect x={5} y={15} width={48} height={28} fill="#fff" stroke={INK} strokeWidth={2} />
          <polygon points="5,15 20,5 68,5 53,15" fill="#fff" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <polygon points="53,15 68,5 68,33 53,43" fill="#fff" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <text x={110} y={32} fill={INK} fontFamily={FONT} fontSize={14} fontWeight="bold">KVADAR</text>
          <circle cx={185} cy={28} r={5} fill={INK} />
        </g>
      </g>

      <g transform="translate(360, 245)">
        {[
          { text: 'Konzerva soka', y: 0 },
          { text: 'Kutija za cipele', y: 55 },
          { text: 'Fudbalska lopta', y: 110 },
          { text: 'Drvena kockica za igru', y: 165 },
        ].map((item, i) => (
          <g key={i} transform={`translate(0, ${item.y})`}>
            <circle cx={15} cy={28} r={5} fill={INK} />
            <rect x={35} y={10} width={175} height={36} rx={8} fill="#f9fafb" stroke={INK} strokeWidth={1.8} />
            <text x={122} y={33} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={13} fontWeight="600">
              {item.text}
            </text>
          </g>
        ))}
      </g>

      <Divider y={475} />

      {/* 3. Vrste linija i duž */}
      <text x={300} y={502} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        3. Prepoznaj linije: upiši da li je to Duž, Prava, Poluprava ili Kriva linija:
      </text>

      <g transform="translate(40, 525)">
        <g transform="translate(0, 0)">
          <line x1={15} y1={25} x2={105} y2={25} stroke={INK} strokeWidth={3} />
          <circle cx={15} cy={25} r={4.5} fill={INK} />
          <circle cx={105} cy={25} r={4.5} fill={INK} />
          <text x={15} y={15} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={11} fontWeight="bold">A</text>
          <text x={105} y={15} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={11} fontWeight="bold">B</text>
          <rect x={0} y={45} width={120} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.5} />
          <text x={60} y={63} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={12} fontWeight="bold">DUŽ AB</text>
        </g>

        <g transform="translate(135, 0)">
          <line x1={5} y1={25} x2={115} y2={25} stroke={INK} strokeWidth={3} />
          <text x={110} y={15} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={11} fontWeight="bold">p</text>
          <rect x={0} y={45} width={120} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.5} />
          <text x={60} y={63} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={12}>PRAVA</text>
        </g>

        <g transform="translate(270, 0)">
          <line x1={15} y1={25} x2={115} y2={25} stroke={INK} strokeWidth={3} />
          <circle cx={15} cy={25} r={4.5} fill={INK} />
          <text x={15} y={15} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={11} fontWeight="bold">O</text>
          <text x={110} y={15} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={11} fontWeight="bold">a</text>
          <rect x={0} y={45} width={120} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.5} />
          <text x={60} y={63} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={12}>POLUPRAVA</text>
        </g>

        <g transform="translate(405, 0)">
          <path d="M 10 35 Q 40 5 65 30 T 115 15" fill="none" stroke={INK} strokeWidth={3} />
          <rect x={0} y={45} width={120} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.5} />
          <text x={60} y={63} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={12}>KRIVA LINIJA</text>
        </g>
      </g>
    </Page>
  );
}

function MathEvenOddSheet() {
  const BALLOONS = [
    { n: 4, even: true },
    { n: 7, even: false },
    { n: 12, even: true },
    { n: 15, even: false },
    { n: 18, even: true },
    { n: 21, even: false },
    { n: 26, even: true },
    { n: 33, even: false },
    { n: 40, even: true },
    { n: 47, even: false },
    { n: 52, even: true },
    { n: 65, even: false },
    { n: 78, even: true },
    { n: 81, even: false },
    { n: 94, even: true },
    { n: 99, even: false },
  ];

  return (
    <Page height={650}>
      <rect x={30} y={10} width={540} height={48} rx={10} fill="#f0fdf4" stroke="#16a34a" strokeWidth={2} />
      <text x={300} y={30} textAnchor="middle" fill="#15803d" fontFamily={FONT} fontSize={12.5} fontWeight="bold">
        💡 PARNI brojevi se završavaju sa 0, 2, 4, 6, 8 (mogu se podijeliti u parove).
      </text>
      <text x={300} y={48} textAnchor="middle" fill="#b45309" fontFamily={FONT} fontSize={12.5} fontWeight="bold">
        💡 NEPARNI brojevi se završavaju sa 1, 3, 5, 7, 9 (uvijek ostane 1 samac).
      </text>

      <text x={300} y={82} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        1. Oboji balone: PARNE oboji PLAVO, a NEPARNE ŽUTO:
      </text>

      <g transform="translate(45, 95)">
        {BALLOONS.map((b, i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          const x = col * 130 + 50;
          const y = row * 55 + 24;
          return (
            <g key={i}>
              <ellipse cx={x} cy={y} rx={26} ry={20} fill="#fff" stroke={INK} strokeWidth={2} />
              <polygon points={`${x - 4},${y + 20} ${x + 4},${y + 20} ${x},${y + 25}`} fill={INK} />
              <line x1={x} y1={y + 25} x2={x + 3} y2={y + 35} stroke={INK} strokeWidth={1.5} />
              <text x={x} y={y + 6} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={16} fontWeight="bold">
                {b.n}
              </text>
            </g>
          );
        })}
      </g>

      <Divider y={330} />

      <text x={300} y={355} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        2. Spoji sličice u parove po dvoje i zaokruži tačnu riječ:
      </text>

      <g transform="translate(40, 375)">
        <g transform="translate(0, 0)">
          <text x={10} y={22} fill={INK} fontFamily={FONT} fontSize={14} fontWeight="bold">a) 6 zvjezdica:</text>
          <g transform="translate(130, 8)">
            {[0, 1, 2].map((k) => (
              <g key={k} transform={`translate(${k * 50}, 0)`}>
                <rect x={0} y={0} width={42} height={24} rx={6} fill="#f9fafb" stroke={INK} strokeWidth={1.5} strokeDasharray="4 3" />
                <circle cx={14} cy={12} r={5} fill={INK} />
                <circle cx={28} cy={12} r={5} fill={INK} />
              </g>
            ))}
          </g>
          <rect x={315} y={3} width={90} height={28} rx={6} fill="#dbeafe" stroke="#2563eb" strokeWidth={2} />
          <text x={360} y={22} textAnchor="middle" fill="#1e40af" fontFamily={FONT} fontSize={13} fontWeight="bold">PARAN</text>
          <rect x={415} y={3} width={90} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.5} />
          <text x={460} y={22} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={13}>NEPARAN</text>
        </g>

        <g transform="translate(0, 42)">
          <text x={10} y={22} fill={INK} fontFamily={FONT} fontSize={14} fontWeight="bold">b) 7 krugova:</text>
          <g transform="translate(130, 8)">
            {[0, 1, 2].map((k) => (
              <g key={k} transform={`translate(${k * 45}, 0)`}>
                <rect x={0} y={0} width={38} height={24} rx={6} fill="#f9fafb" stroke={INK} strokeWidth={1.5} strokeDasharray="4 3" />
                <circle cx={12} cy={12} r={5} fill={INK} />
                <circle cx={26} cy={12} r={5} fill={INK} />
              </g>
            ))}
            <circle cx={150} cy={12} r={5} fill={INK} />
          </g>
          <rect x={315} y={3} width={90} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.5} />
          <text x={360} y={22} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={13}>PARAN</text>
          <rect x={415} y={3} width={90} height={28} rx={6} fill="#fef3c7" stroke="#d97706" strokeWidth={2} />
          <text x={460} y={22} textAnchor="middle" fill="#92400e" fontFamily={FONT} fontSize={13} fontWeight="bold">NEPARAN</text>
        </g>

        <g transform="translate(0, 84)">
          <text x={10} y={22} fill={INK} fontFamily={FONT} fontSize={14} fontWeight="bold">c) 8 kvadrata:</text>
          <g transform="translate(130, 8)">
            {[0, 1, 2, 3].map((k) => (
              <g key={k} transform={`translate(${k * 42}, 0)`}>
                <rect x={0} y={0} width={36} height={24} rx={6} fill="#f9fafb" stroke={INK} strokeWidth={1.5} strokeDasharray="4 3" />
                <rect x={8} y={7} width={8} height={8} fill={INK} />
                <rect x={20} y={7} width={8} height={8} fill={INK} />
              </g>
            ))}
          </g>
          <rect x={315} y={3} width={90} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.5} />
          <text x={360} y={22} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={13}>PARAN</text>
          <rect x={415} y={3} width={90} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.5} />
          <text x={460} y={22} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={13}>NEPARAN</text>
        </g>
      </g>

      <Divider y={505} />

      <text x={300} y={530} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        3. Nastavi niz brojeva upisivanjem brojeva koji nedostaju:
      </text>

      <g transform="translate(40, 550)">
        <text x={10} y={22} fill={INK} fontFamily={FONT} fontSize={13.5} fontWeight="bold">
          a) Parni: &nbsp;&nbsp; 2, &nbsp; 4, &nbsp; 6,
        </text>
        <rect x={160} y={2} width={35} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.8} />
        <text x={205} y={22} fill={INK} fontFamily={FONT} fontSize={14}>,</text>
        <rect x={220} y={2} width={35} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.8} />
        <text x={265} y={22} fill={INK} fontFamily={FONT} fontSize={14}>, &nbsp; 12, </text>
        <rect x={315} y={2} width={35} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.8} />
        <text x={360} y={22} fill={INK} fontFamily={FONT} fontSize={14}>, &nbsp; 16.</text>

        <text x={10} y={62} fill={INK} fontFamily={FONT} fontSize={13.5} fontWeight="bold">
          b) Neparni: 1, &nbsp; 3, &nbsp; 5,
        </text>
        <rect x={160} y={42} width={35} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.8} />
        <text x={205} y={62} fill={INK} fontFamily={FONT} fontSize={14}>,</text>
        <rect x={220} y={42} width={35} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.8} />
        <text x={265} y={62} fill={INK} fontFamily={FONT} fontSize={14}>, &nbsp; 11, </text>
        <rect x={315} y={42} width={35} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.8} />
        <text x={360} y={62} fill={INK} fontFamily={FONT} fontSize={14}>, &nbsp; 15.</text>
      </g>
    </Page>
  );
}

function MathMoneySheet() {
  return (
    <Page height={650}>
      <text x={300} y={26} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        1. Prebroj novac u svakom novčaniku i zapiši ukupan iznos:
      </text>

      <g transform="translate(30, 42)">
        <g transform="translate(0, 0)">
          <rect x={0} y={0} width={165} height={85} rx={12} fill="#f9fafb" stroke={INK} strokeWidth={2} />
          <rect x={10} y={10} width={50} height={28} rx={4} fill="#ecfdf5" stroke="#059669" strokeWidth={1.8} />
          <text x={35} y={28} textAnchor="middle" fill="#059669" fontFamily={FONT} fontSize={12} fontWeight="bold">10</text>
          <rect x={68} y={10} width={45} height={28} rx={4} fill="#eff6ff" stroke="#2563eb" strokeWidth={1.8} />
          <text x={90} y={28} textAnchor="middle" fill="#2563eb" fontFamily={FONT} fontSize={12} fontWeight="bold">5</text>
          <circle cx={135} cy={24} r={12} fill="#fef3c7" stroke="#d97706" strokeWidth={1.8} />
          <text x={135} y={28} textAnchor="middle" fill="#92400e" fontFamily={FONT} fontSize={11} fontWeight="bold">2</text>
          <circle cx={40} cy={60} r={11} fill="#fef3c7" stroke="#d97706" strokeWidth={1.8} />
          <text x={40} y={64} textAnchor="middle" fill="#92400e" fontFamily={FONT} fontSize={11} fontWeight="bold">1</text>
          <text x={105} y={66} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="bold">= ____ KM</text>
        </g>

        <g transform="translate(185, 0)">
          <rect x={0} y={0} width={165} height={85} rx={12} fill="#f9fafb" stroke={INK} strokeWidth={2} />
          <rect x={10} y={10} width={55} height={28} rx={4} fill="#fdf2f8" stroke="#db2777" strokeWidth={1.8} />
          <text x={37} y={28} textAnchor="middle" fill="#db2777" fontFamily={FONT} fontSize={12} fontWeight="bold">20</text>
          <rect x={72} y={10} width={50} height={28} rx={4} fill="#ecfdf5" stroke="#059669" strokeWidth={1.8} />
          <text x={97} y={28} textAnchor="middle" fill="#059669" fontFamily={FONT} fontSize={12} fontWeight="bold">10</text>
          <circle cx={145} cy={24} r={12} fill="#fef3c7" stroke="#d97706" strokeWidth={1.8} />
          <text x={145} y={28} textAnchor="middle" fill="#92400e" fontFamily={FONT} fontSize={11} fontWeight="bold">5</text>
          <circle cx={40} cy={60} r={12} fill="#fef3c7" stroke="#d97706" strokeWidth={1.8} />
          <text x={40} y={64} textAnchor="middle" fill="#92400e" fontFamily={FONT} fontSize={11} fontWeight="bold">2</text>
          <text x={105} y={66} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="bold">= ____ KM</text>
        </g>

        <g transform="translate(370, 0)">
          <rect x={0} y={0} width={170} height={85} rx={12} fill="#f9fafb" stroke={INK} strokeWidth={2} />
          <rect x={10} y={10} width={58} height={28} rx={4} fill="#fefce8" stroke="#ca8a04" strokeWidth={1.8} />
          <text x={39} y={28} textAnchor="middle" fill="#ca8a04" fontFamily={FONT} fontSize={12} fontWeight="bold">50</text>
          <rect x={75} y={10} width={55} height={28} rx={4} fill="#fdf2f8" stroke="#db2777" strokeWidth={1.8} />
          <text x={102} y={28} textAnchor="middle" fill="#db2777" fontFamily={FONT} fontSize={12} fontWeight="bold">20</text>
          <circle cx={150} cy={24} r={11} fill="#fef3c7" stroke="#d97706" strokeWidth={1.8} />
          <text x={150} y={28} textAnchor="middle" fill="#92400e" fontFamily={FONT} fontSize={11} fontWeight="bold">1</text>
          <text x={90} y={66} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="bold">= ____ KM</text>
        </g>
      </g>

      <Divider y={150} />

      <text x={300} y={178} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        2. Cjenovnik u školskoj knjižari — izračunaj cijenu svake korpe:
      </text>

      <rect x={35} y={192} width={530} height={36} rx={8} fill="#f3f4f6" stroke={INK} strokeWidth={2} />
      <text x={300} y={215} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={13} fontWeight="bold">
        Sveska: 3 KM &nbsp;|&nbsp; Olovka: 1 KM &nbsp;|&nbsp; Bojice: 6 KM &nbsp;|&nbsp; Pernica: 8 KM &nbsp;|&nbsp; Šestar: 4 KM
      </text>

      <g transform="translate(35, 240)">
        <g transform="translate(0, 0)">
          <rect x={0} y={0} width={530} height={42} rx={8} fill="#fff" stroke={INK} strokeWidth={1.8} />
          <text x={20} y={26} fill={INK} fontFamily={FONT} fontSize={13.5}>
            a) Sveska + Olovka + Bojice = <strong>3 + 1 + 6 =</strong>
          </text>
          <rect x={380} y={7} width={65} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.8} />
          <text x={455} y={26} fill={INK} fontFamily={FONT} fontSize={13.5} fontWeight="bold">KM</text>
        </g>

        <g transform="translate(0, 52)">
          <rect x={0} y={0} width={530} height={42} rx={8} fill="#fff" stroke={INK} strokeWidth={1.8} />
          <text x={20} y={26} fill={INK} fontFamily={FONT} fontSize={13.5}>
            b) Pernica + Šestar + Sveska = <strong>8 + 4 + 3 =</strong>
          </text>
          <rect x={380} y={7} width={65} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.8} />
          <text x={455} y={26} fill={INK} fontFamily={FONT} fontSize={13.5} fontWeight="bold">KM</text>
        </g>

        <g transform="translate(0, 104)">
          <rect x={0} y={0} width={530} height={42} rx={8} fill="#fff" stroke={INK} strokeWidth={1.8} />
          <text x={20} y={26} fill={INK} fontFamily={FONT} fontSize={13.5}>
            c) Dvije sveske + Pernica = <strong>(2 × 3) + 8 = 6 + 8 =</strong>
          </text>
          <rect x={380} y={7} width={65} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.8} />
          <text x={455} y={26} fill={INK} fontFamily={FONT} fontSize={13.5} fontWeight="bold">KM</text>
        </g>
      </g>

      <Divider y={410} />

      <text x={300} y={438} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        3. Izračunaj kusur koji kasir treba da vrati kupcu:
      </text>

      <g transform="translate(35, 455)">
        <g transform="translate(0, 0)">
          <rect x={0} y={0} width={530} height={52} rx={8} fill="#f9fafb" stroke={INK} strokeWidth={1.8} />
          <text x={15} y={22} fill={INK} fontFamily={FONT} fontSize={13}>
            a) Ana je kupila svesku i olovku (4 KM), a platila novčanicom od <strong>10 KM</strong>.
          </text>
          <text x={15} y={42} fill={INK} fontFamily={FONT} fontSize={13} fontWeight="bold">
            Račun: 10 - 4 = _____ KM &nbsp;&nbsp;&nbsp;➔&nbsp;&nbsp;&nbsp; Kusur je: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ] KM
          </text>
        </g>

        <g transform="translate(0, 62)">
          <rect x={0} y={0} width={530} height={52} rx={8} fill="#f9fafb" stroke={INK} strokeWidth={1.8} />
          <text x={15} y={22} fill={INK} fontFamily={FONT} fontSize={13}>
            b) Marko je kupio pernicu i bojice (14 KM), a dao novčanicu od <strong>20 KM</strong>.
          </text>
          <text x={15} y={42} fill={INK} fontFamily={FONT} fontSize={13} fontWeight="bold">
            Račun: 20 - 14 = _____ KM &nbsp;&nbsp;&nbsp;➔&nbsp;&nbsp;&nbsp; Kusur je: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ] KM
          </text>
        </g>

        <g transform="translate(0, 124)">
          <rect x={0} y={0} width={530} height={52} rx={8} fill="#f9fafb" stroke={INK} strokeWidth={1.8} />
          <text x={15} y={22} fill={INK} fontFamily={FONT} fontSize={13}>
            c) Učiteljica je kupila knjigu od 35 KM i platila novčanicom od <strong>50 KM</strong>.
          </text>
          <text x={15} y={42} fill={INK} fontFamily={FONT} fontSize={13} fontWeight="bold">
            Račun: 50 - 35 = _____ KM &nbsp;&nbsp;&nbsp;➔&nbsp;&nbsp;&nbsp; Kusur je: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ] KM
          </text>
        </g>
      </g>
    </Page>
  );
}

function MathRomanNumeralsSheet() {
  const PAIRS = [
    { a: 3, r: 'III' },
    { a: 4, r: 'IV' },
    { a: 7, r: 'VII' },
    { a: 9, r: 'IX' },
    { a: 12, r: 'XII' },
    { a: 14, r: 'XIV' },
    { a: 16, r: 'XVI' },
    { a: 19, r: 'XIX' },
  ];

  return (
    <Page height={650}>
      <rect x={30} y={10} width={540} height={42} rx={8} fill="#f9fafb" stroke={INK} strokeWidth={2} />
      <text x={300} y={36} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={14} fontWeight="bold">
        Osnovni rimski brojevi: &nbsp; I = 1 &nbsp;|&nbsp; V = 5 &nbsp;|&nbsp; X = 10 &nbsp;|&nbsp; L = 50 &nbsp;|&nbsp; C = 100
      </text>

      <text x={300} y={75} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        1. Spoji linijom arapski broj sa odgovarajućim rimskim brojem:
      </text>

      <g transform="translate(30, 90)">
        {PAIRS.map((p, i) => (
          <g key={i} transform={`translate(${i * 68}, 0)`}>
            <circle cx={30} cy={20} r={18} fill="#fff" stroke={INK} strokeWidth={2} />
            <text x={30} y={26} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={16} fontWeight="bold">
              {p.a}
            </text>
            <circle cx={30} cy={45} r={3.5} fill={INK} />
          </g>
        ))}

        {[
          { r: 'IV', id: 1 },
          { r: 'VII', id: 2 },
          { r: 'III', id: 0 },
          { r: 'XIV', id: 5 },
          { r: 'IX', id: 3 },
          { r: 'XIX', id: 7 },
          { r: 'XII', id: 4 },
          { r: 'XVI', id: 6 },
        ].map((p, i) => (
          <g key={i} transform={`translate(${i * 68}, 85)`}>
            <circle cx={30} cy={0} r={3.5} fill={INK} />
            <rect x={8} y={10} width={44} height={32} rx={8} fill="#f3f4f6" stroke={INK} strokeWidth={2} />
            <text x={30} y={32} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={13.5} fontWeight="bold">
              {p.r}
            </text>
          </g>
        ))}
      </g>

      <Divider y={260} />

      <text x={300} y={288} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        2. Zapiši zadate brojeve rimskim ciframa:
      </text>

      <g transform="translate(50, 310)">
        {[
          { n: 2, y: 0 },
          { n: 6, y: 0 },
          { n: 8, y: 0 },
          { n: 11, y: 0 },
          { n: 13, y: 45 },
          { n: 15, y: 45 },
          { n: 17, y: 45 },
          { n: 20, y: 45 },
        ].map((item, i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          const x = col * 130;
          const y = row * 45;
          return (
            <g key={i} transform={`translate(${x}, ${y})`}>
              <text x={20} y={22} fill={INK} fontFamily={FONT} fontSize={15} fontWeight="bold">
                {item.n} =
              </text>
              <rect x={48} y={2} width={50} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={1.8} />
            </g>
          );
        })}
      </g>

      <Divider y={425} />

      <text x={300} y={452} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        3. Izračunaj i zapiši rezultat rimskim brojem:
      </text>

      <g transform="translate(50, 475)">
        {[
          { text: 'V + II = 5 + 2 =', ans: 'VII' },
          { text: 'X + IV = 10 + 4 =', ans: 'XIV' },
          { text: 'IX - IV = 9 - 4 =', ans: 'V' },
          { text: 'XV - VI = 15 - 6 =', ans: 'IX' },
          { text: 'VIII + VII = 8 + 7 =', ans: 'XV' },
          { text: 'XX - XI = 20 - 11 =', ans: 'IX' },
        ].map((item, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const x = col * 260;
          const y = row * 50;
          return (
            <g key={i} transform={`translate(${x}, ${y})`}>
              <text x={10} y={24} fill={INK} fontFamily={FONT} fontSize={13.5} fontWeight="600">
                {item.text}
              </text>
              <rect x={160} y={4} width={55} height={30} rx={6} fill="#fff" stroke={INK} strokeWidth={1.8} />
            </g>
          );
        })}
      </g>
    </Page>
  );
}

function MathMultiplicationGridSheet() {
  return (
    <Page height={650}>
      <text x={300} y={26} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        1. Zbir jednakih sabiraka zapiši kao množenje i izračunaj:
      </text>

      <g transform="translate(40, 42)">
        {[
          { text: '4 + 4 + 4 =', mult: '3 × 4 =' },
          { text: '6 + 6 + 6 + 6 =', mult: '4 × 6 =' },
          { text: '7 + 7 =', mult: '2 × 7 =' },
          { text: '5 + 5 + 5 + 5 + 5 =', mult: '5 × 5 =' },
        ].map((item, i) => {
          const y = i * 36;
          return (
            <g key={i} transform={`translate(0, ${y})`}>
              <text x={20} y={20} fill={INK} fontFamily={FONT} fontSize={14} fontWeight="bold">
                {item.text}
              </text>
              <text x={190} y={20} fill={INK} fontFamily={FONT} fontSize={14} fontWeight="bold">
                {item.mult}
              </text>
              <rect x={260} y={2} width={50} height={26} rx={6} fill="#fff" stroke={INK} strokeWidth={1.8} />
            </g>
          );
        })}
      </g>

      <Divider y={195} />

      <text x={300} y={222} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        2. Izračunaj ukupan broj tačkica pomoću redova i kolona:
      </text>

      <g transform="translate(40, 240)">
        <g transform="translate(0, 0)">
          <g transform="translate(20, 10)">
            {[0, 1, 2].map((r) =>
              [0, 1, 2, 3].map((c) => (
                <circle key={`${r}-${c}`} cx={c * 20} cy={r * 20} r={6} fill={INK} />
              ))
            )}
          </g>
          <text x={125} y={25} fill={INK} fontFamily={FONT} fontSize={13}>3 reda po 4 tačke</text>
          <text x={125} y={48} fill={INK} fontFamily={FONT} fontSize={14} fontWeight="bold">
            3 × 4 = [ &nbsp;&nbsp;&nbsp;&nbsp; ]
          </text>
        </g>

        <g transform="translate(280, 0)">
          <g transform="translate(20, 15)">
            {[0, 1].map((r) =>
              [0, 1, 2, 3, 4, 5].map((c) => (
                <rect key={`${r}-${c}`} x={c * 18} y={r * 18} width={10} height={10} fill={INK} rx={2} />
              ))
            )}
          </g>
          <text x={155} y={25} fill={INK} fontFamily={FONT} fontSize={13}>2 reda po 6 kockica</text>
          <text x={155} y={48} fill={INK} fontFamily={FONT} fontSize={14} fontWeight="bold">
            2 × 6 = [ &nbsp;&nbsp;&nbsp;&nbsp; ]
          </text>
        </g>

        <g transform="translate(130, 85)">
          <g transform="translate(20, 10)">
            {[0, 1, 2, 3].map((r) =>
              [0, 1, 2, 3, 4].map((c) => (
                <circle key={`${r}-${c}`} cx={c * 20} cy={r * 16} r={5} fill={INK} />
              ))
            )}
          </g>
          <text x={150} y={30} fill={INK} fontFamily={FONT} fontSize={13}>4 reda po 5 tačaka</text>
          <text x={150} y={54} fill={INK} fontFamily={FONT} fontSize={14} fontWeight="bold">
            4 × 5 = [ &nbsp;&nbsp;&nbsp;&nbsp; ]
          </text>
        </g>
      </g>

      <Divider y={415} />

      <text x={300} y={442} textAnchor="middle" fill={INK} fontFamily={FONT} fontSize={15} fontWeight="700">
        3. Popuni mini tablicu množenja (pomnoži red sa kolonom):
      </text>

      <g transform="translate(160, 460)">
        {[0, 1, 2, 3, 4, 5].map((r) =>
          [0, 1, 2, 3, 4, 5].map((c) => {
            const isHeader = r === 0 || c === 0;
            const isCorner = r === 0 && c === 0;
            const x = c * 46;
            const y = r * 30;
            const val = isCorner ? '×' : r === 0 ? c : c === 0 ? r : '';
            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={x}
                  y={y}
                  width={46}
                  height={30}
                  fill={isCorner ? '#111827' : isHeader ? '#f3f4f6' : '#fff'}
                  stroke={INK}
                  strokeWidth={1.8}
                />
                <text
                  x={x + 23}
                  y={y + 20}
                  textAnchor="middle"
                  fill={isCorner ? '#fff' : INK}
                  fontFamily={FONT}
                  fontSize={14}
                  fontWeight={isHeader ? 'bold' : 'normal'}
                >
                  {val}
                </text>
              </g>
            );
          })
        )}
      </g>
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
    <div className="test-frame w-full text-[#111827] flex flex-col gap-3.5 print:gap-3 text-sm">
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
      title="Vrste riječi, rečenice, pravopis i čitanje sa razumijevanjem"
      level1={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">1. Na kraju svake rečenice upiši tačku (.), upitnik (?) ili uzvičnik (!) (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 space-y-1 text-xs sm:text-sm">
            <div>a) Danas je prelijep, sunčan i topao proljećni dan [ &nbsp; ]</div>
            <div>b) Da li si ponio pernicu i udžbenik za školu [ &nbsp; ]</div>
            <div>c) Pazi na stepenicama, nemoj trčati [ &nbsp; ]</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">2. Podvuci riječi koje moraju biti napisane velikim početnim slovom (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm italic">
            „učenik marko i njegova sestra jelena žive u banjaluci blizu rijeke vrbas.”
          </div>
        </div>
      }
      level2={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">3. Razvrstaj ponuđene riječi u tabelu: kuća, pjevati, plavo, rijeka, crtati, vesela, drvo, trčati (4 b):</p>
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
            „Juče smo išli na izlet na planinu jahorinu. nismo znali dase tamo još uvijek snijeg nije otopio. Sa nama je išao i pas žuća.”<br />
            <span className="text-gray-500 text-xs">Ispravke: 1) _______________ 2) _______________ 3) _______________ 4) _______________</span>
          </div>
          <p className="font-semibold text-[13px] pt-1">7. Stvaralačko pisanje (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            Napiši 3 povezane rečenice o svom omiljenom godišnjem dobu. Upotrijebi najmanje 3 opisna pridjeva i 1 uzvičnu rečenicu:<br />
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
      title="Živa i neživa priroda, godišnja doba, biljke i životinjski svijet"
      level1={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">1. Poveži linijom živo biće sa njegovim staništem (4 b):</p>
          <div className="grid grid-cols-2 gap-2 bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            <div>• Pastrmka<br />• Vjeverica<br />• Pčela medarica<br />• Krtica</div>
            <div className="text-right">• Rascvjetala livada<br />• Planinska bistra rijeka<br />• Podzemni hodnici u zemlji<br />• Hrastova šuma</div>
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
          <p className="font-semibold text-[13px]">4. Razvrstaj životinje na domaće i divlje i napiši korist domaćih za čovjeka (5 b):</p>
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

function Grade1TestSheet() {
  return (
    <TestFrame
      subject="1. RAZRED · KOMPLEKSNA DIFERENCIRANA PROVJERA"
      title="Matematika (do 20), Početno čitanje i pisanje, Moja okolina"
      level1={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">1. Izračunaj osnovne računske zadatke u prvoj desetici (4 b):</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>4 + 3 = ____</div>
            <div>7 + 2 = ____</div>
            <div>9 - 5 = ____</div>
            <div>10 - 6 = ____</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">2. Spoj riječ sa njenim početnim glasom i slovom (3 b):</p>
          <div className="grid grid-cols-3 gap-2 text-sm bg-white p-2 rounded border border-gray-200 text-center font-medium">
            <div>🍎 JABUKA &nbsp;➔&nbsp; [ &nbsp;<strong>J</strong>&nbsp; ]</div>
            <div>🌞 SUNCE &nbsp;➔&nbsp; [ &nbsp;<strong>S</strong>&nbsp; ]</div>
            <div>🐟 RIBA &nbsp;➔&nbsp; [ &nbsp;<strong>R</strong>&nbsp; ]</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">3. Zaokruži ono što pripada živoj prirodi (3 b):</p>
          <div className="grid grid-cols-4 gap-2 text-sm bg-white p-2 rounded border border-gray-200 text-center font-medium">
            <div className="border border-dashed border-gray-300 rounded p-1">Hrastovo drvo</div>
            <div className="border border-dashed border-gray-300 rounded p-1">Sivi kamen</div>
            <div className="border border-dashed border-gray-300 rounded p-1">Pas štene</div>
            <div className="border border-dashed border-gray-300 rounded p-1">Plastična lopta</div>
          </div>
        </div>
      }
      level2={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">4. Izračunaj sabiranje i oduzimanje u drugoj desetici (4 b):</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>12 + 5 = ____</div>
            <div>18 - 6 = ____</div>
            <div>8 + 6 = ____</div>
            <div>15 - 7 = ____</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">5. Rastavi riječi na slogove crticom i napiši broj slogova (3 b):</p>
          <div className="grid grid-cols-3 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>ŠKOLA ➔ ŠKO-LA (2)</div>
            <div>LEPTIR ➔ ________ ( )</div>
            <div>UČIONICA ➔ ______ ( )</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">6. Dopuni nazive godišnjih doba koja nedostaju (3 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-sm font-medium text-center">
            Proljeće &nbsp;➔&nbsp; ____________________ &nbsp;➔&nbsp; Jesen &nbsp;➔&nbsp; ____________________
          </div>
        </div>
      }
      level3={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">7. Tekstualni zadatak sa računanjem (5 b):</p>
          <div className="bg-white p-2.5 rounded border border-gray-200 text-xs sm:text-sm leading-relaxed">
            <p>
              U školskoj korpi bilo je 8 crvenih i 7 žutih jabuka. Učenici su za užinu pojeli 9 jabuka. Koliko je jabuka ostalo u korpi?
            </p>
            <div className="mt-2 text-xs font-mono text-gray-500">
              1) Ukupno jabuka: _______________________ = _____<br />
              2) Ostalo jabuka: _______________________ = _____<br />
              Odgovor: _________________________________________________________________
            </div>
          </div>
          <p className="font-semibold text-[13px] pt-1">8. Složi date riječi u smislenu rečenicu i prepiši je (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            Riječi: <strong>[ marljivo, školi, u, uči, novi, đak ]</strong><br />
            Rečenica: _________________________________________________________________
          </div>
        </div>
      }
    />
  );
}

function Grade2TestSheet() {
  return (
    <TestFrame
      subject="2. RAZRED · KOMPLEKSNA DIFERENCIRANA PROVJERA"
      title="Sabiranje i oduzimanje do 100, Rečenice i imenice, Priroda i društvo"
      level1={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">1. Izračunaj sabiranje i oduzimanje bez prelaza desetice (4 b):</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>34 + 20 = ____</div>
            <div>52 + 25 = ____</div>
            <div>78 - 30 = ____</div>
            <div>89 - 46 = ____</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">2. Zaokruži sve imenice (riječi koje označavaju bića i predmete) (3 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-sm font-medium flex justify-around">
            <span>Marko</span>
            <span>trči</span>
            <span>knjiga</span>
            <span>plavo</span>
            <span>lastavica</span>
            <span>pjeva</span>
          </div>
          <p className="font-semibold text-[13px] pt-1">3. Razvrstaj životinje na domaće (D) i divlje (Div) (3 b):</p>
          <div className="grid grid-cols-4 gap-2 text-sm bg-white p-2 rounded border border-gray-200 text-center font-medium">
            <div>Krava [ &nbsp; ]</div>
            <div>Vuk [ &nbsp; ]</div>
            <div>Kokoška [ &nbsp; ]</div>
            <div>Lisica [ &nbsp; ]</div>
          </div>
        </div>
      }
      level2={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">4. Izračunaj sa prelazom desetice (4 b):</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>47 + 28 = ____</div>
            <div>39 + 36 = ____</div>
            <div>73 - 38 = ____</div>
            <div>91 - 47 = ____</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">5. Prepoznaj vrstu rečenice i stavi odgovarajući znak na kraju (. ? !) (3 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm space-y-1">
            <div>a) Kako se zove tvoja osnovna škola [ &nbsp; ] ➔ ______________________ rečenica</div>
            <div>b) Sutra svi učenici idu na proljećni izlet [ &nbsp; ] ➔ ______________________ rečenica</div>
            <div>c) Pazi, dolazi automobil [ &nbsp; ] ➔ ______________________ rečenica</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">6. Dopuni 4 osnovne strane svijeta (3 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-sm font-medium text-center">
            Sjever (S) &nbsp;·&nbsp; ____________________ (J) &nbsp;·&nbsp; Istok (I) &nbsp;·&nbsp; ____________________ (Z)
          </div>
        </div>
      }
      level3={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">7. Tekstualni zadatak u dva koraka (5 b):</p>
          <div className="bg-white p-2.5 rounded border border-gray-200 text-xs sm:text-sm leading-relaxed">
            <p>
              U školskoj biblioteci na prvoj polici nalazi se 38 knjiga bajki, a na drugoj polici ima 17 knjiga više nego na prvoj. Koliko se ukupno knjiga bajki nalazi na obje police?
            </p>
            <div className="mt-2 text-xs font-mono text-gray-500">
              1) Druga polica: _______________________ = _____ knjiga<br />
              2) Ukupno na obje: _____________________ = _____ knjiga<br />
              Odgovor: _________________________________________________________________
            </div>
          </div>
          <p className="font-semibold text-[13px] pt-1">8. Pronađi 3 greške i prepiši rečenicu pravilno velikim slovom (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            Netačno: <em>učenik marko i njegova sestra ana žive u sarajevu pored rijeke miljacke.</em><br />
            Pravilno: _________________________________________________________________
          </div>
        </div>
      }
    />
  );
}

function Grade3TestSheet() {
  return (
    <TestFrame
      subject="3. RAZRED · KOMPLEKSNA DIFERENCIRANA PROVJERA"
      title="Tablica množenja i dijeljenja, Vrste riječi, Zavičaj i reljef"
      level1={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">1. Izračunaj osnovne produkte i količnike (4 b):</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>7 × 6 = ____</div>
            <div>8 × 9 = ____</div>
            <div>48 : 6 = ____</div>
            <div>63 : 7 = ____</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">2. Podvuci sve glagole (riječi koje označavaju radnju) u rečenici (3 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-sm font-medium">
            "Djeca veselo trče po parku, pjevaju pjesme i igraju fudbal sa loptom."
          </div>
          <p className="font-semibold text-[13px] pt-1">3. Poveži oblik reljefa sa odgovarajućim opisom (3 b):</p>
          <div className="grid grid-cols-3 gap-2 text-xs bg-white p-2 rounded border border-gray-200 text-center">
            <div><strong>Ravnica</strong> ➔ Plodno ravno tlo</div>
            <div><strong>Brdo</strong> ➔ Uzvišenje do 500 m</div>
            <div><strong>Planina</strong> ➔ Uzvišenje preko 500 m</div>
          </div>
        </div>
      }
      level2={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">4. Izračunaj pazeći na redoslijed operacija i zagrade (4 b):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>a) 82 - 7 × 8 = 82 - ____ = ____</div>
            <div>b) 9 × 6 + 36 : 4 = ____ + ____ = ____</div>
            <div>c) (45 + 18) : 7 = ____ : 7 = ____</div>
            <div>d) 100 - (24 : 3 × 5) = 100 - ____ = ____</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">5. Odredi rod i broj imenica (3 b):</p>
          <div className="grid grid-cols-3 gap-2 font-mono text-xs bg-white p-2 rounded border border-gray-200">
            <div>a) SUNCE (rod: ____, br: ____)</div>
            <div>b) KNJIGE (rod: ____, br: ____)</div>
            <div>c) DJEČAK (rod: ____, br: ____)</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">6. Razvrstaj vode u zavičaju na tekuće (T) i stajaće (S) (3 b):</p>
          <div className="grid grid-cols-5 gap-2 text-xs bg-white p-2 rounded border border-gray-200 text-center font-medium">
            <div>Rijeka [ &nbsp; ]</div>
            <div>Jezero [ &nbsp; ]</div>
            <div>Potok [ &nbsp; ]</div>
            <div>Bara [ &nbsp; ]</div>
            <div>More [ &nbsp; ]</div>
          </div>
        </div>
      }
      level3={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">7. Riješi jednačinu i tekstualni zadatak (5 b):</p>
          <div className="bg-white p-2.5 rounded border border-gray-200 text-xs sm:text-sm leading-relaxed">
            <p>
              Jednačina: <strong>x × 8 = 72</strong> ➔ x = ________________ = _____<br />
              Zadatak: Pekar je ispekao 9 tepsija po 8 kiflica. Ako je prodao 58 kiflica, koliko mu je kiflica ostalo?
            </p>
            <div className="mt-2 text-xs font-mono text-gray-500">
              1) Ukupno kiflica: _____________________ = _____<br />
              2) Ostalo kiflica: _____________________ = _____<br />
              Odgovor: _________________________________________________________________
            </div>
          </div>
          <p className="font-semibold text-[13px] pt-1">8. Orijentacija u prirodi bez kompasa (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm leading-normal">
            Objasni kako pomoću mahovine na stablima drveća i pomoću godova na panju možemo odrediti gdje se nalazi sjever:<br />
            ____________________________________________________________________________________________________
          </div>
        </div>
      }
    />
  );
}

function Grade4TestSheet() {
  return (
    <TestFrame
      subject="4. RAZRED · KOMPLEKSNA DIFERENCIRANA PROVJERA"
      title="Višecifreni brojevi, Geometrija, Rečenica, Ljudsko tijelo i ekologija"
      level1={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">1. Saberi i oduzmi višecifrene brojeve (4 b):</p>
          <div className="grid grid-cols-2 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>35.400 + 24.300 = ___________</div>
            <div>78.650 - 45.230 = ___________</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">2. Podvuci subjekat (jednom crtom) i predikat (dvije crte) (3 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-sm font-medium">
            "Vrijedni učenici četvrtog razreda pažljivo rješavaju kontrolni zadatak."
          </div>
          <p className="font-semibold text-[13px] pt-1">3. Organi u ljudskom tijelu — napiši njihovu glavnu ulogu (3 b):</p>
          <div className="grid grid-cols-3 gap-2 text-xs bg-white p-2 rounded border border-gray-200">
            <div><strong>Srce:</strong> pumpa krv</div>
            <div><strong>Pluća:</strong> disanje i kiseonik</div>
            <div><strong>Mozak:</strong> upravlja tijelom</div>
          </div>
        </div>
      }
      level2={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">4. Pisano množenje i dijeljenje (4 b):</p>
          <div className="grid grid-cols-2 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>342 × 15 = _____________________</div>
            <div>896 : 4 = ______________________</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">5. Geometrija — Obim i površina pravougaonika (3 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm font-mono">
            Pravougaonik ima stranice a = 9 cm i b = 6 cm.<br />
            Obim: O = 2 × (a + b) = 2 × (____ + ____) = ______ cm<br />
            Površina: P = a × b = ____ × ____ = ______ cm²
          </div>
          <p className="font-semibold text-[13px] pt-1">6. Ekosistem i fotosinteza (3 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            Zašto su zelene biljke proizvođači u prirodi i šta one stvaraju procesom fotosinteze?<br />
            _________________________________________________________________
          </div>
        </div>
      }
      level3={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">7. Složeni problem iz geometrije i finansijske pismenosti (5 b):</p>
          <div className="bg-white p-2.5 rounded border border-gray-200 text-xs sm:text-sm leading-relaxed">
            <p>
              Pod dječije sobe ima oblik pravougaonika dužine 5 m i širine 4 m. Kolika je površina poda te sobe? Ako jedan kvadratni metar parketa košta 25 KM, koliko košta parket za cijelu sobu?
            </p>
            <div className="mt-2 text-xs font-mono text-gray-500">
              1) Površina sobe: P = a × b = _____ × _____ = _____ m²<br />
              2) Ukupna cijena parketa: _____ m² × 25 KM = _____ KM<br />
              Odgovor: _________________________________________________________________
            </div>
          </div>
          <p className="font-semibold text-[13px] pt-1">8. Analiza književnog teksta i pouka (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            Napiši u 2 do 3 rečenice pouku basne o cvrčku i mravu. Kako se ta pouka primjenjuje na rad i učenje đaka u školi?<br />
            ____________________________________________________________________________________________________
          </div>
        </div>
      }
    />
  );
}

function Grade5TestSheet() {
  return (
    <TestFrame
      subject="5. RAZRED · KOMPLEKSNA DIFERENCIRANA PROVJERA"
      title="Razlomci i uglovi, Padeži i sintaksa, Geografska karta i biosfera"
      level1={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">1. Saberi i oduzmi razlomke jednakih imenilaca (4 b):</p>
          <div className="grid grid-cols-3 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>3/8 + 4/8 = ____</div>
            <div>9/10 - 3/10 = ____</div>
            <div>1 - 4/7 = ____</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">2. Odredi padež podvučenih riječi (pitanje i naziv padeža) (3 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm space-y-1">
            <div>a) Vidim <u>lijepu pticu</u> na grani ➔ Koga/šta vidim? ➔ Padež: __________________</div>
            <div>b) Idemo prema <u>školskom dvorištu</u> ➔ Kome/čemu idemo? ➔ Padež: ____________</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">3. Geografska karta i razmjernik (3 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            Šta označava razmjernik 1 : 100.000 na geografskoj karti? &nbsp;➔&nbsp; 1 cm na karti u prirodi je: __________ km.
          </div>
        </div>
      }
      level2={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">4. Razlomci sa različitim imeniocima i decimalni brojevi (4 b):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-sm bg-white p-2 rounded border border-gray-200">
            <div>a) 1/2 + 1/4 = ____/4 + 1/4 = ____</div>
            <div>b) 5/6 - 1/3 = 5/6 - ____/6 = ____</div>
            <div>c) 3.65 + 4.8 = ___________</div>
            <div>d) 10 - 3.45 = ___________</div>
          </div>
          <p className="font-semibold text-[13px] pt-1">5. Služba riječi u rečenici (3 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            U rečenici: <em>"Učenici su juče u biblioteci tiho čitali zanimljive knjige."</em> odredi:<br />
            - Priloška odredba za vrijeme: ___________________ &nbsp;|&nbsp; Priloška odredba za mjesto: ___________________<br />
            - Pravi objekat: __________________________________
          </div>
          <p className="font-semibold text-[13px] pt-1">6. Građa Zemlje i reljef (3 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            Nabroj tri glavna sloja unutrašnje građe planete Zemlje:<br />
            1) ________________________ &nbsp;|&nbsp; 2) ________________________ &nbsp;|&nbsp; 3) ________________________
          </div>
        </div>
      }
      level3={
        <div className="space-y-2">
          <p className="font-semibold text-[13px]">7. Geometrija i računanje uglova (5 b):</p>
          <div className="bg-white p-2.5 rounded border border-gray-200 text-xs sm:text-sm leading-relaxed">
            <p>
              a) Dva ugla su komplementna (njihov zbir je 90°). Ako je ugao α = 38°, izračunaj ugao β.<br />
              &nbsp;&nbsp;&nbsp;&nbsp;β = 90° - 38° = _______°<br />
              b) Zbir unutrašnjih uglova u svakom trouglu je 180°. Ako su dva ugla trougla α = 65° i β = 45°, izračunaj treći ugao γ.<br />
              &nbsp;&nbsp;&nbsp;&nbsp;γ = 180° - (65° + 45°) = 180° - _______° = _______°
            </p>
          </div>
          <p className="font-semibold text-[13px] pt-1">8. Književnost i stilske figure (5 b):</p>
          <div className="bg-white p-2 rounded border border-gray-200 text-xs sm:text-sm">
            Prepoznaj stilske figure u sljedećim primjerima:<br />
            a) <em>"Zlatno sunce se tiho nasmijalo planinskim vrhovima."</em> ➔ ___________________________<br />
            b) <em>"Bistar kao gorsko jezero."</em> ➔ ___________________________<br />
            Napiši u 2 rečenice zašto je čitanje knjiga važno za bogaćenje rječnika i mišljenje:<br />
            ____________________________________________________________________________________________________
          </div>
        </div>
      }
    />
  );
}

// ============================================================================
// SPOZNAJA VREMENA I SMISLENE BOJANKE (crtano u kodu, tekst iz rječnika)
// ============================================================================

type SheetLabels = Dictionary['games']['worksheet']['labels'];

function Box({ x, y, w, h, r = 18 }: { x: number; y: number; w: number; h: number; r?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill="#fff" stroke={INK} strokeWidth="2.5" />;
}

// Tačka na krugu; ugao u stepenima, 0 = gore, raste u smeru kazaljke.
function polar(cx: number, cy: number, radius: number, deg: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [cx + radius * Math.sin(a), cy - radius * Math.cos(a)];
}

function StepNumber({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="16" fill="#fff" stroke={INK} strokeWidth="2.2" />
      <Label x={x} y={y} size={17}>
        {n}
      </Label>
    </g>
  );
}

interface ClockFaceProps {
  cx: number;
  cy: number;
  r: number;
  hour?: number; // bez sata = prazan brojčanik na kom dijete crta kazaljke
  minute?: number;
  rim?: boolean;
}

function ClockFace({ cx, cy, r, hour, minute = 0, rim = false }: ClockFaceProps) {
  const big = r >= 100;
  return (
    <g>
      {rim && <circle cx={cx} cy={cy} r={r + 14} fill="#fff" stroke={INK} strokeWidth="2.5" />}
      <circle cx={cx} cy={cy} r={r} fill="#fff" stroke={INK} strokeWidth={big ? 3 : 2.2} />
      {Array.from({ length: big ? 60 : 12 }, (_, i) => {
        const deg = big ? i * 6 : i * 30;
        const isHour = !big || i % 5 === 0;
        const [x1, y1] = polar(cx, cy, r * (isHour ? 0.88 : 0.93), deg);
        const [x2, y2] = polar(cx, cy, r * 0.98, deg);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={isHour ? 2.4 : 1.2} />;
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const [x, y] = polar(cx, cy, r * 0.72, (i + 1) * 30);
        return (
          <Label key={i} x={x} y={y} size={Math.round(r * 0.2)}>
            {i + 1}
          </Label>
        );
      })}
      {hour !== undefined && (
        <>
          <line
            x1={cx}
            y1={cy}
            x2={polar(cx, cy, r * 0.45, ((hour % 12) + minute / 60) * 30)[0]}
            y2={polar(cx, cy, r * 0.45, ((hour % 12) + minute / 60) * 30)[1]}
            stroke={INK}
            strokeWidth={Math.max(4, r * 0.07)}
            strokeLinecap="round"
          />
          <line
            x1={cx}
            y1={cy}
            x2={polar(cx, cy, r * 0.7, minute * 6)[0]}
            y2={polar(cx, cy, r * 0.7, minute * 6)[1]}
            stroke={INK}
            strokeWidth={Math.max(2.5, r * 0.04)}
            strokeLinecap="round"
          />
        </>
      )}
      <circle cx={cx} cy={cy} r={Math.max(4, r * 0.05)} fill={INK} />
    </g>
  );
}

// Dijelovi dana: nebo (gdje je sunce/mesec) i šta tada radimo.
const DAY_SCENES = [
  { key: 'morning', Sky: Sunrise, items: [AlarmClock, Toothbrush, Croissant] },
  { key: 'noon', Sky: Sun, items: [School, Backpack, Soup] },
  { key: 'evening', Sky: Sunset, items: [Bath, Utensils, BookOpen] },
  { key: 'night', Sky: Moon, items: [Bed] },
] as const satisfies readonly { key: keyof SheetLabels['dayParts']; Sky: LucideIcon; items: readonly LucideIcon[] }[];

const panelAt = (i: number) => ({ x: 6 + (i % 2) * 300, y: 6 + Math.floor(i / 2) * 318 });

function DayPartsSheet({ labels }: { labels: SheetLabels }) {
  return (
    <Page height={640}>
      {DAY_SCENES.map(({ key, Sky, items }, i) => {
        const { x, y } = panelAt(i);
        const night = key === 'night';
        return (
          <g key={key}>
            <Box x={x} y={y} w={288} h={308} />
            <Label x={x + 144} y={y + 30} size={22}>
              {labels.dayParts[key].toUpperCase()}
            </Label>
            <Pic Icon={Sky} x={x + (night ? 110 : 144)} y={y + (key === 'noon' ? 100 : 115)} size={night ? 80 : 96} />
            {night && (
              <>
                <Pic Icon={Star} x={x + 200} y={y + 85} size={34} />
                <Pic Icon={Star} x={x + 240} y={y + 135} size={26} />
                <Pic Icon={Star} x={x + 45} y={y + 75} size={24} />
              </>
            )}
            <line x1={x} x2={x + 288} y1={y + 180} y2={y + 180} stroke={INK} strokeWidth="2" />
            {items.length === 1 ? (
              <Pic Icon={items[0]} x={x + 144} y={y + 245} size={100} />
            ) : (
              items.map((Icon, j) => <Pic key={j} Icon={Icon} x={x + 54 + j * 90} y={y + 245} size={66} />)
            )}
          </g>
        );
      })}
    </Page>
  );
}

type Draw = (x: number, y: number, s: number) => ReactNode;

const icon =
  (Icon: LucideIcon): Draw =>
  (x, y, s) => <Pic Icon={Icon} x={x} y={y} size={s} />;

const egg =
  (cracked: boolean): Draw =>
  (x, y, s) => {
    const rx = s * 0.3;
    const ry = s * 0.4;
    const zig = Array.from({ length: 7 }, (_, i) => `${x - rx + (i * 2 * rx) / 6} ${y - 2 + (i % 2 ? -8 : 6)}`).join(' L');
    return (
      <g>
        <ellipse cx={x} cy={y + 4} rx={rx} ry={ry} fill="#fff" stroke={INK} strokeWidth="2.5" />
        {cracked && <path d={`M${zig}`} fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />}
      </g>
    );
  };

// Sneško se pravi u tri koraka: jedna, dvije, pa tri kugle sa šeširom.
const snowman =
  (stage: 1 | 2 | 3): Draw =>
  (x, y, s) => {
    const k = s / 100;
    const ball = (cy: number, r: number) => <circle cx={x} cy={y + cy * k} r={r * k} fill="#fff" stroke={INK} strokeWidth="2.5" />;
    return (
      <g>
        {ball(28, 24)}
        {stage >= 2 && ball(-8, 17)}
        {stage >= 3 && (
          <>
            {ball(-34, 12)}
            <rect x={x - 11 * k} y={y - 58 * k} width={22 * k} height={13 * k} fill="#fff" stroke={INK} strokeWidth="2.2" />
            <line x1={x - 17 * k} x2={x + 17 * k} y1={y - 45 * k} y2={y - 45 * k} stroke={INK} strokeWidth="2.5" />
            <circle cx={x - 4 * k} cy={y - 36 * k} r={1.8 * k} fill={INK} />
            <circle cx={x + 4 * k} cy={y - 36 * k} r={1.8 * k} fill={INK} />
          </>
        )}
      </g>
    );
  };

// Redoslijed je namerno izmešan; tačan: izlazak sunca → sunce → zalazak → mjesec, pasulj → klica → cvijet, jaje → napuklo → ptica, sneško 1 → 2 → 3.
const SEQUENCES: Draw[][] = [
  [icon(Sun), icon(Moon), icon(Sunrise), icon(Sunset)],
  [icon(Sprout), icon(Flower2), icon(Bean)],
  [icon(Bird), egg(false), egg(true)],
  [snowman(3), snowman(1), snowman(2)],
];

function SequenceSheet() {
  return (
    <Page height={644}>
      {SEQUENCES.map((row, i) => {
        const y0 = 4 + i * 160;
        const cw = 588 / row.length;
        return (
          <g key={i}>
            <Box x={6} y={y0} w={588} h={150} />
            {row.map((draw, j) => {
              const cx = 6 + cw * (j + 0.5);
              return (
                <g key={j}>
                  {draw(cx, y0 + 54, 80)}
                  <rect x={cx - 18} y={y0 + 104} width="36" height="36" rx="6" fill="#fff" stroke={INK} strokeWidth="2.2" />
                </g>
              );
            })}
          </g>
        );
      })}
    </Page>
  );
}

const READ_HOURS = [2, 5, 8, 12, 4, 10];
const DRAW_TIMES: [number, number][] = [
  [1, 0],
  [3, 0],
  [6, 0],
  [8, 0],
  [11, 0],
  [12, 0],
  [2, 30],
  [7, 30],
  [9, 30],
];

function clockPages(): ReactNode[] {
  return [
    <Page key="clock-read" height={660}>
      <ClockFace cx={300} cy={136} r={114} hour={9} rim />
      {READ_HOURS.map((hour, i) => {
        const cx = 100 + (i % 3) * 200;
        const cy = i < 3 ? 350 : 545;
        return (
          <g key={i}>
            <ClockFace cx={cx} cy={cy} r={56} hour={hour} />
            <rect x={cx - 55} y={cy + 68} width="110" height="38" rx="8" fill="#fff" stroke={INK} strokeWidth="2" />
            <line x1={cx - 42} x2={cx - 2} y1={cy + 96} y2={cy + 96} stroke={MUTED} strokeWidth="1.5" />
            <Label x={cx + 24} y={cy + 87} size={22}>
              :00
            </Label>
          </g>
        );
      })}
    </Page>,
    <Page key="clock-draw" height={630}>
      {DRAW_TIMES.map(([hour, minute], i) => {
        const cx = 100 + (i % 3) * 200;
        const cy = 120 + Math.floor(i / 3) * 215;
        return (
          <g key={i}>
            <rect x={cx - 48} y={cy - 112} width="96" height="36" rx="10" fill="#fff" stroke={INK} strokeWidth="2" />
            <Label x={cx} y={cy - 94} size={22}>
              {`${hour}:${String(minute).padStart(2, '0')}`}
            </Label>
            <ClockFace cx={cx} cy={cy} r={68} />
          </g>
        );
      })}
    </Page>,
  ];
}

const ROUTINE = [
  { key: 'wakeUp', Icon: AlarmClock },
  { key: 'breakfast', Icon: Croissant },
  { key: 'school', Icon: School },
  { key: 'lunch', Icon: Soup },
  { key: 'play', Icon: Puzzle },
  { key: 'sleep', Icon: Bed },
] as const satisfies readonly { key: keyof SheetLabels['routine']; Icon: LucideIcon }[];

function RoutineSheet({ labels }: { labels: SheetLabels }) {
  return (
    <Page height={636}>
      {ROUTINE.map(({ key, Icon }, i) => {
        const x = 6 + (i % 2) * 300;
        const y = 6 + Math.floor(i / 2) * 212;
        return (
          <g key={key}>
            <Box x={x} y={y} w={288} h={200} />
            <StepNumber x={x + 28} y={y + 28} n={i + 1} />
            <Label x={x + 52} y={y + 29} size={18} anchor="start">
              {labels.routine[key]}
            </Label>
            <Pic Icon={Icon} x={x + 78} y={y + 122} size={92} />
            <ClockFace cx={x + 212} cy={y + 118} r={58} />
          </g>
        );
      })}
    </Page>
  );
}

function WeekSheet({ labels }: { labels: SheetLabels }) {
  const segments = labels.weekdays.map((_, i) => ({ cx: 128 + i * 68, cy: 88 + (i % 2 ? 10 : -10) }));
  return (
    <Page height={640}>
      {[...segments].reverse().map(({ cx, cy }, ri) => {
        const n = segments.length - ri;
        return (
          <g key={n}>
            <line x1={cx - 10} y1={cy + 34} x2={cx - 14} y2={cy + 52} stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
            <line x1={cx + 10} y1={cy + 34} x2={cx + 14} y2={cy + 52} stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx={cx} cy={cy} r="38" fill="#fff" stroke={INK} strokeWidth="2.5" />
            <Label x={cx} y={cy} size={24}>
              {n}
            </Label>
          </g>
        );
      })}
      {/* Glava gusjenice */}
      <path d="M40 52 Q28 22 18 18 M68 50 Q76 20 88 14" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="17" cy="16" r="6" fill="#fff" stroke={INK} strokeWidth="2.2" />
      <circle cx="89" cy="13" r="6" fill="#fff" stroke={INK} strokeWidth="2.2" />
      <circle cx="55" cy="88" r="44" fill="#fff" stroke={INK} strokeWidth="2.8" />
      <circle cx="40" cy="78" r="6" fill={INK} />
      <circle cx="70" cy="78" r="6" fill={INK} />
      <path d="M36 100 Q55 118 74 100" fill="none" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />

      {labels.weekdays.map((day, i) => {
        const y = 172 + i * 44;
        return (
          <g key={day}>
            <circle cx="24" cy={y + 18} r="15" fill="#fff" stroke={INK} strokeWidth="2" />
            <Label x={24} y={y + 18} size={15}>
              {i + 1}
            </Label>
            <Label x={50} y={y + 18} size={19} anchor="start">
              {day}
            </Label>
            <line x1="230" x2="594" y1={y + 32} y2={y + 32} {...DASH} strokeWidth={2} />
          </g>
        );
      })}
      <Divider y={490} />
      {[labels.yesterday, labels.today, labels.tomorrow].map((text, i) => {
        const y = 525 + i * 48;
        return (
          <g key={text}>
            <Label x={6} y={y} size={20} anchor="start">
              {text}
            </Label>
            <line x1="160" x2="594" y1={y + 14} y2={y + 14} stroke={INK} strokeWidth="1.8" />
          </g>
        );
      })}
    </Page>
  );
}

const SEASONS = [
  { key: 'winter', Icon: Snowflake },
  { key: 'spring', Icon: Flower2 },
  { key: 'summer', Icon: Sun },
  { key: 'autumn', Icon: Leaf },
] as const satisfies readonly { key: keyof SheetLabels['seasons']; Icon: LucideIcon }[];

// Godišnji točak: januar je gore, pa zima (dec–feb) zauzima gornju četvrtinu, proljeće desnu, ljeto donju, jesen lijevu.
function YearSheet({ labels }: { labels: SheetLabels }) {
  const cx = 300;
  const cy = 292;
  const outer = 274;
  const mid = 178;
  const inner = 60;
  const radial = (deg: number, from: number, key: string, width = 2.2) => {
    const [x1, y1] = polar(cx, cy, from, deg);
    const [x2, y2] = polar(cx, cy, outer, deg);
    return <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={width} />;
  };
  return (
    <Page height={645}>
      <circle cx={cx} cy={cy} r={outer} fill="#fff" stroke={INK} strokeWidth="3" />
      <circle cx={cx} cy={cy} r={mid} fill="#fff" stroke={INK} strokeWidth="2.5" />
      <circle cx={cx} cy={cy} r={inner} fill="#fff" stroke={INK} strokeWidth="2.5" />
      {Array.from({ length: 12 }, (_, i) => (i % 3 === 1 ? radial(15 + i * 30, inner, `s${i}`, 3) : radial(15 + i * 30, mid, `m${i}`)))}
      {labels.months.map((month, i) => {
        const [x, y] = polar(cx, cy, (outer + mid) / 2, i * 30);
        return (
          <Label key={month} x={x} y={y} size={16}>
            {month}
          </Label>
        );
      })}
      {SEASONS.map(({ key, Icon }, i) => {
        const [x, y] = polar(cx, cy, 120, i * 90);
        return (
          <g key={key}>
            <Pic Icon={Icon} x={x} y={y - 12} size={54} />
            <Label x={x} y={y + 34} size={15}>
              {labels.seasons[key]}
            </Label>
          </g>
        );
      })}
      <Label x={cx} y={cy} size={17}>
        {labels.year}
      </Label>
      <Label x={6} y={622} size={19} anchor="start">
        {labels.birthday}
      </Label>
      <line x1="330" x2="594" y1="636" y2="636" stroke={INK} strokeWidth="1.8" />
    </Page>
  );
}

function Bubbles({ points }: { points: [number, number, number][] }) {
  return (
    <>
      {points.map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#fff" stroke={INK} strokeWidth="2" />
      ))}
    </>
  );
}

// Desna ruka je ogledalska slika lijeve.
function MirroredPic({ Icon, x, y, size }: { Icon: LucideIcon; x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${2 * x} 0) scale(-1 1)`}>
      <Pic Icon={Icon} x={x} y={y} size={size} />
    </g>
  );
}

function HandWashSheet({ labels }: { labels: SheetLabels }) {
  const steps = ['wet', 'soap', 'rub', 'dry'] as const satisfies readonly (keyof SheetLabels['handWash'])[];
  return (
    <Page height={640}>
      {steps.map((key, i) => {
        const { x, y } = panelAt(i);
        return (
          <g key={key}>
            <Box x={x} y={y} w={288} h={308} />
            <StepNumber x={x + 28} y={y + 30} n={i + 1} />
            <Label x={x + 52} y={y + 31} size={18} anchor="start">
              {labels.handWash[key]}
            </Label>
            {key === 'wet' && (
              <>
                {/* Slavina */}
                <rect x={x + 120} y={y + 62} width="44" height="16" rx="8" fill="#fff" stroke={INK} strokeWidth="2.5" />
                <rect x={x + 136} y={y + 78} width="12" height="14" fill="#fff" stroke={INK} strokeWidth="2.5" />
                <path
                  d={`M${x + 70} ${y + 92} H${x + 196} Q${x + 214} ${y + 92} ${x + 214} ${y + 110} V${y + 124} H${x + 190} V${y + 116} H${x + 70} Z`}
                  fill="#fff"
                  stroke={INK}
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <Pic Icon={Droplets} x={x + 202} y={y + 160} size={44} />
                <Pic Icon={Hand} x={x + 160} y={y + 240} size={96} />
              </>
            )}
            {key === 'soap' && (
              <>
                <rect x={x + 74} y={y + 130} width="140" height="76" rx="28" fill="#fff" stroke={INK} strokeWidth="2.6" />
                <rect x={x + 96} y={y + 148} width="96" height="40" rx="16" fill="#fff" stroke={INK} strokeWidth="2" />
                <Bubbles
                  points={[
                    [x + 86, y + 100, 16],
                    [x + 128, y + 82, 22],
                    [x + 178, y + 96, 13],
                    [x + 222, y + 118, 18],
                    [x + 60, y + 238, 12],
                    [x + 232, y + 240, 15],
                    [x + 200, y + 270, 10],
                  ]}
                />
                <Pic Icon={Hand} x={x + 130} y={y + 258} size={70} />
              </>
            )}
            {key === 'rub' && (
              <>
                <Pic Icon={Hand} x={x + 112} y={y + 175} size={112} />
                <MirroredPic Icon={Hand} x={x + 176} y={y + 185} size={112} />
                <Bubbles
                  points={[
                    [x + 44, y + 90, 14],
                    [x + 246, y + 86, 18],
                    [x + 232, y + 270, 14],
                    [x + 56, y + 268, 18],
                    [x + 146, y + 276, 10],
                  ]}
                />
              </>
            )}
            {key === 'dry' && (
              <>
                {/* Peškir na držaču */}
                <line x1={x + 30} x2={x + 190} y1={y + 72} y2={y + 72} stroke={INK} strokeWidth="5" strokeLinecap="round" />
                <rect x={x + 50} y={y + 72} width="120" height="196" rx="10" fill="#fff" stroke={INK} strokeWidth="2.6" />
                <line x1={x + 50} x2={x + 170} y1={y + 226} y2={y + 226} stroke={INK} strokeWidth="2" />
                <line x1={x + 50} x2={x + 170} y1={y + 242} y2={y + 242} stroke={INK} strokeWidth="2" />
                <Pic Icon={Hand} x={x + 224} y={y + 190} size={80} />
              </>
            )}
          </g>
        );
      })}
    </Page>
  );
}

function TrafficSheet({ labels, colorNames }: { labels: SheetLabels; colorNames: Record<ToyColor, string> }) {
  const lights = [
    { color: colorNames.red, meaning: labels.traffic.stop, cy: 95 },
    { color: colorNames.yellow, meaning: labels.traffic.wait, cy: 220 },
    { color: colorNames.green, meaning: labels.traffic.go, cy: 345 },
  ];
  return (
    <Page height={640}>
      {/* Semafor */}
      <rect x="100" y="420" width="30" height="196" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <rect x="70" y="610" width="90" height="22" rx="6" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <rect x="40" y="20" width="150" height="400" rx="30" fill="#fff" stroke={INK} strokeWidth="3" />
      {lights.map(({ color, meaning, cy }) => (
        <g key={cy}>
          <path d={`M55 ${cy - 30} Q115 ${cy - 78} 175 ${cy - 30}`} fill="none" stroke={INK} strokeWidth="2.2" />
          <circle cx="115" cy={cy} r="50" fill="#fff" stroke={INK} strokeWidth="2.6" />
          <Label x={222} y={cy - 16} size={24} anchor="start">
            {color}
          </Label>
          <Label x={222} y={cy + 18} size={20} anchor="start">
            {meaning}
          </Label>
        </g>
      ))}
      {/* Ulica sa pešačkim prelazom */}
      <line x1="220" x2="594" y1="486" y2="486" stroke={INK} strokeWidth="3" />
      <line x1="220" x2="594" y1="632" y2="632" stroke={INK} strokeWidth="3" />
      {Array.from({ length: 4 }, (_, i) => (
        <rect key={i} x={300 + i * 40} y="496" width="24" height="126" rx="3" fill="#fff" stroke={INK} strokeWidth="2.2" />
      ))}
      <Pic Icon={PersonStanding} x={372} y={446} size={72} />
      <Pic Icon={Car} x={530} y={560} size={88} />
    </Page>
  );
}

const PLATE_FOOD: LucideIcon[] = [Apple, Carrot, Banana, Grape, Fish, Milk, Egg, Cherry];
const SWEETS: LucideIcon[] = [Candy, Cookie, IceCreamCone, Cake, CupSoda];

function FoodSheet({ labels }: { labels: SheetLabels }) {
  return (
    <Page height={640}>
      <circle cx="300" cy="235" r="222" fill="#fff" stroke={INK} strokeWidth="3" />
      <circle cx="300" cy="235" r="190" fill="#fff" stroke={INK} strokeWidth="2.2" />
      <Pic Icon={Salad} x={300} y={225} size={92} />
      {PLATE_FOOD.map((Icon, i) => {
        const [x, y] = polar(300, 225, 122, i * 45);
        return <Pic key={i} Icon={Icon} x={x} y={y} size={70} />;
      })}
      <Label x={300} y={432} size={16}>
        {labels.food.everyday.toUpperCase()}
      </Label>
      <Box x={6} y={474} w={588} h={160} />
      <Label x={300} y={500} size={18}>
        {labels.food.sometimes.toUpperCase()}
      </Label>
      {SWEETS.map((Icon, i) => (
        <Pic key={i} Icon={Icon} x={70 + i * 115} y={574} size={72} />
      ))}
    </Page>
  );
}

const jar: Draw = (x, y, s) => {
  const k = s / 70;
  return (
    <g>
      <rect x={x - 20 * k} y={y - 18 * k} width={40 * k} height={50 * k} rx={10 * k} fill="#fff" stroke={INK} strokeWidth="2.2" />
      <rect x={x - 16 * k} y={y - 30 * k} width={32 * k} height={12 * k} rx={3 * k} fill="#fff" stroke={INK} strokeWidth="2.2" />
    </g>
  );
};

// Izmešano: papir (novine, kutija), plastika (sok, flaša mlijeka), staklo (čaša, tegla).
const WASTE: Draw[] = [icon(Newspaper), icon(CupSoda), icon(GlassWater), icon(Package), icon(Milk), jar];

function RecycleSheet({ labels }: { labels: SheetLabels }) {
  const bins = ['paper', 'plastic', 'glass'] as const satisfies readonly (keyof SheetLabels['bins'])[];
  return (
    <Page height={636}>
      {WASTE.map((draw, i) => {
        const x = 55 + i * 98;
        return (
          <g key={i}>
            {draw(x, 80, 70)}
            <circle cx={x} cy="150" r="7" fill={INK} />
          </g>
        );
      })}
      {bins.map((key, i) => {
        const cx = 110 + i * 190;
        return (
          <g key={key}>
            <circle cx={cx} cy="372" r="7" fill={INK} />
            <path d={`M${cx - 75} 420 L${cx - 60} 630 H${cx + 60} L${cx + 75} 420 Z`} fill="#fff" stroke={INK} strokeWidth="2.8" strokeLinejoin="round" />
            <rect x={cx - 86} y="394" width="172" height="26" rx="8" fill="#fff" stroke={INK} strokeWidth="2.6" />
            <rect x={cx - 22} y="384" width="44" height="10" rx="4" fill="#fff" stroke={INK} strokeWidth="2.2" />
            <Pic Icon={Recycle} x={cx} y={500} size={62} />
            <Label x={cx} y={580} size={19}>
              {labels.bins[key]}
            </Label>
          </g>
        );
      })}
    </Page>
  );
}

type Feeling = keyof SheetLabels['feelings'];

function Face({ cx, cy, r, kind }: { cx: number; cy: number; r: number; kind?: Feeling }) {
  const stroke = { fill: 'none', stroke: INK, strokeWidth: 3, strokeLinecap: 'round' } as const;
  const ex = r * 0.34;
  const ey = cy - r * 0.18;
  const open = kind === 'scared' || kind === 'surprised';
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#fff" stroke={INK} strokeWidth="2.8" />
      {kind &&
        [-1, 1].map((side) => {
          const x = cx + side * ex;
          if (kind === 'calm') return <path key={side} d={`M${x - r * 0.12} ${ey} Q${x} ${ey + r * 0.12} ${x + r * 0.12} ${ey}`} {...stroke} />;
          if (open)
            return (
              <g key={side}>
                <circle cx={x} cy={ey} r={r * 0.14} fill="#fff" stroke={INK} strokeWidth="2.5" />
                <circle cx={x} cy={ey} r={r * 0.05} fill={INK} />
              </g>
            );
          return <circle key={side} cx={x} cy={ey} r={r * 0.08} fill={INK} />;
        })}
      {kind === 'angry' && (
        <>
          <line x1={cx - r * 0.55} y1={cy - r * 0.48} x2={cx - r * 0.16} y2={cy - r * 0.32} {...stroke} />
          <line x1={cx + r * 0.55} y1={cy - r * 0.48} x2={cx + r * 0.16} y2={cy - r * 0.32} {...stroke} />
        </>
      )}
      {open && (
        <>
          <path d={`M${cx - ex - r * 0.16} ${cy - r * 0.46} Q${cx - ex} ${cy - r * 0.6} ${cx - ex + r * 0.16} ${cy - r * 0.46}`} {...stroke} />
          <path d={`M${cx + ex - r * 0.16} ${cy - r * 0.46} Q${cx + ex} ${cy - r * 0.6} ${cx + ex + r * 0.16} ${cy - r * 0.46}`} {...stroke} />
        </>
      )}
      {kind === 'happy' && <path d={`M${cx - r * 0.42} ${cy + r * 0.18} Q${cx} ${cy + r * 0.7} ${cx + r * 0.42} ${cy + r * 0.18}`} {...stroke} />}
      {kind === 'calm' && <path d={`M${cx - r * 0.26} ${cy + r * 0.32} Q${cx} ${cy + r * 0.5} ${cx + r * 0.26} ${cy + r * 0.32}`} {...stroke} />}
      {kind === 'sad' && (
        <>
          <path d={`M${cx - r * 0.34} ${cy + r * 0.5} Q${cx} ${cy + r * 0.16} ${cx + r * 0.34} ${cy + r * 0.5}`} {...stroke} />
          <path
            d={`M${cx + ex} ${ey + r * 0.16} Q${cx + ex + r * 0.1} ${ey + r * 0.34} ${cx + ex} ${ey + r * 0.38} Q${cx + ex - r * 0.1} ${ey + r * 0.34} ${cx + ex} ${ey + r * 0.16} Z`}
            fill="#fff"
            stroke={INK}
            strokeWidth="2"
          />
        </>
      )}
      {kind === 'angry' && <path d={`M${cx - r * 0.3} ${cy + r * 0.48} Q${cx} ${cy + r * 0.28} ${cx + r * 0.3} ${cy + r * 0.48}`} {...stroke} />}
      {kind === 'scared' && (
        <path
          d={`M${cx - r * 0.36} ${cy + r * 0.42} l${r * 0.12} ${-r * 0.1} l${r * 0.12} ${r * 0.1} l${r * 0.12} ${-r * 0.1} l${r * 0.12} ${r * 0.1} l${r * 0.12} ${-r * 0.1} l${r * 0.12} ${r * 0.1}`}
          {...stroke}
          strokeLinejoin="round"
        />
      )}
      {kind === 'surprised' && <ellipse cx={cx} cy={cy + r * 0.38} rx={r * 0.15} ry={r * 0.21} fill="#fff" stroke={INK} strokeWidth="3" />}
    </g>
  );
}

const FEELINGS: Feeling[] = ['happy', 'sad', 'angry', 'scared', 'surprised', 'calm'];

function FeelingsSheet({ labels }: { labels: SheetLabels }) {
  return (
    <Page height={640}>
      {FEELINGS.map((kind, i) => {
        const cx = 100 + (i % 3) * 200;
        const cy = i < 3 ? 86 : 290;
        return (
          <g key={kind}>
            <Face cx={cx} cy={cy} r={66} kind={kind} />
            <Label x={cx} y={cy + 90} size={19}>
              {labels.feelings[kind]}
            </Label>
          </g>
        );
      })}
      <Box x={6} y={424} w={588} h={212} />
      <Label x={300} y={452} size={20}>
        {labels.feelToday}
      </Label>
      <Face cx={300} cy={546} r={76} />
    </Page>
  );
}

// ============================================================================
// MATEMATIKA (mnogo zadataka) I VEŽBE UZ LEKCIJE O VREMENU
// ============================================================================

// Isti zadaci pri svakom otvaranju i štampi: brojevi dolaze iz generatora sa fiksnim semenom.
function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rnd = () => number;
const randInt = (rnd: Rnd, min: number, max: number) => min + Math.floor(rnd() * (max - min + 1));

type Op = '+' | '−' | '·' | ':';

interface Drill {
  a: number;
  op: Op;
  b: number;
  hide: 0 | 1 | 2; // 0 = prvi broj, 1 = drugi broj, 2 = rezultat
}

function solve({ a, op, b }: Drill): number {
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  if (op === '·') return a * b;
  return a / b;
}

// Pravi `count` različitih zadataka; `make` vraća null kada izvučeni brojevi ne odgovaraju pravilu.
function drills(seed: number, count: number, make: (rnd: Rnd) => Drill | null): Drill[] {
  const rnd = seeded(seed);
  const seen = new Set<string>();
  const out: Drill[] = [];
  for (let tries = 0; out.length < count && tries < 20000; tries++) {
    const d = make(rnd);
    if (!d) continue;
    const key = `${d.a}${d.op}${d.b}${d.hide}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(d);
  }
  return out;
}

const DRILLS_PER_PAGE = 48;
const per = (make: (rnd: Rnd) => Drill | null, seed: number) => drills(seed, DRILLS_PER_PAGE, make);

const add10 = (rnd: Rnd): Drill | null => {
  const a = randInt(rnd, 0, 10);
  const b = randInt(rnd, 0, 10);
  return a + b <= 10 && a + b > 1 ? { a, op: '+', b, hide: 2 } : null;
};
const sub10 = (rnd: Rnd): Drill | null => {
  const a = randInt(rnd, 2, 10);
  return { a, op: '−', b: randInt(rnd, 0, a), hide: 2 };
};
const missing = (max: number) => (rnd: Rnd): Drill | null => {
  const sum = randInt(rnd, 3, max);
  const a = randInt(rnd, 1, sum - 1);
  const hide = rnd() < 0.5 ? 0 : 1;
  return rnd() < 0.6 ? { a, op: '+', b: sum - a, hide } : { a: sum, op: '−', b: a, hide };
};
// Do 20 bez prelaza: jedinice se ne prelivaju u novu deseticu.
const within20 = (rnd: Rnd): Drill | null => {
  const u1 = randInt(rnd, 0, 9);
  const u2 = randInt(rnd, 1, 9);
  if (rnd() < 0.5) return u1 + u2 <= 9 ? { a: 10 + u1, op: '+', b: u2, hide: 2 } : null;
  return u2 <= u1 ? { a: 10 + u1, op: '−', b: u2, hide: 2 } : null;
};
const across20 = (rnd: Rnd): Drill | null => {
  const a = randInt(rnd, 2, 9);
  const b = randInt(rnd, 2, 9);
  if (a + b <= 10) return null;
  return rnd() < 0.5 ? { a, op: '+', b, hide: 2 } : { a: a + b, op: '−', b, hide: 2 };
};
const within100 = (carry: boolean) => (rnd: Rnd): Drill | null => {
  const a = randInt(rnd, 11, 89);
  const b = rnd() < 0.3 && !carry ? randInt(rnd, 1, 8) * 10 : randInt(rnd, 3, 69);
  const plus = rnd() < 0.5;
  const unitsCarry = plus ? (a % 10) + (b % 10) >= 10 : a % 10 < b % 10;
  if (unitsCarry !== carry) return null;
  if (plus) return a + b <= 99 ? { a, op: '+', b, hide: 2 } : null;
  return a > b ? { a, op: '−', b, hide: 2 } : null;
};
const multiply = (from: number, to: number) => (rnd: Rnd): Drill | null => {
  const t = randInt(rnd, from, to);
  const n = randInt(rnd, 1, 10);
  return rnd() < 0.5 ? { a: t, op: '·', b: n, hide: 2 } : { a: n, op: '·', b: t, hide: 2 };
};
const divide = (from: number, to: number) => (rnd: Rnd): Drill | null => {
  const d = randInt(rnd, from, to);
  const q = randInt(rnd, 1, 10);
  return { a: d * q, op: ':', b: d, hide: 2 };
};

function DrillCell({ drill, x, y }: { drill: Drill; x: number; y: number }) {
  const values = [drill.a, drill.b, solve(drill)];
  // Tri polja za brojeve (desno poravnata) i dva znaka između; skriveno polje je prazan kvadratić.
  const slots = [
    { right: x + 52, sign: drill.op, signX: x + 68 },
    { right: x + 124, sign: '=', signX: x + 140 },
    { right: x + 194, sign: '', signX: 0 },
  ];
  return (
    <g>
      {slots.map((slot, i) => (
        <g key={i}>
          {drill.hide === i ? (
            <rect x={slot.right - 44} y={y - 16} width="44" height="32" rx="6" fill="#fff" stroke={INK} strokeWidth="1.6" />
          ) : (
            <text x={slot.right - 2} y={y} textAnchor="end" dominantBaseline="central" fontSize="22" fontWeight="600" fontFamily={FONT} fill={INK}>
              {values[i]}
            </text>
          )}
          {slot.sign && (
            <Label x={slot.signX} y={y} size={22}>
              {slot.sign}
            </Label>
          )}
        </g>
      ))}
    </g>
  );
}

function DrillPage({ tasks }: { tasks: Drill[] }) {
  const rows = Math.ceil(tasks.length / 3);
  return (
    <Page height={rows * 40 + 8}>
      {[1, 2].map((c) => (
        <line key={c} x1={c * 200} x2={c * 200} y1="4" y2={rows * 40 + 4} stroke={GUIDE} strokeWidth="1.5" />
      ))}
      {tasks.map((drill, i) => (
        <DrillCell key={i} drill={drill} x={(i % 3) * 200} y={24 + Math.floor(i / 3) * 40} />
      ))}
    </Page>
  );
}

const drillPages = (id: string, pages: readonly Drill[][]) => pages.map((tasks, i) => <DrillPage key={`${id}-${i}`} tasks={tasks} />);

const DRILL_SETS = {
  mathAdd10: [per(add10, 101), per(add10, 102)],
  mathSub10: [per(sub10, 201), per(sub10, 202)],
  mathMissing: [per(missing(10), 301), per(missing(20), 302)],
  mathAddSub20: [per(within20, 401), per(across20, 402)],
  mathAddSub100: [per(within100(false), 501), per(within100(true), 502)],
  mathMultiply: [per(multiply(1, 5), 601), per(multiply(6, 10), 602)],
  mathDivide: [per(divide(1, 5), 701), per(divide(6, 10), 702)],
} as const;

// Kućica: broj na krovu, a na svakom spratu dva sabirka od kojih je jedan prazan.
function NumberHouse({ x, y, n, seed }: { x: number; y: number; n: number; seed: number }) {
  const rnd = seeded(seed);
  const parts = [...new Set(Array.from({ length: 12 }, () => randInt(rnd, 0, n)))].slice(0, 4);
  const w = 132;
  const floor = 30;
  return (
    <g>
      <path d={`M${x} ${y + 46} L${x + w / 2} ${y} L${x + w} ${y + 46} Z`} fill="#fff" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      <Label x={x + w / 2} y={y + 30} size={22}>
        {n}
      </Label>
      {parts.map((a, i) => {
        const fy = y + 46 + i * floor;
        const leftShown = i % 2 === 0;
        return (
          <g key={i}>
            <rect x={x} y={fy} width={w / 2} height={floor} fill="#fff" stroke={INK} strokeWidth="2" />
            <rect x={x + w / 2} y={fy} width={w / 2} height={floor} fill="#fff" stroke={INK} strokeWidth="2" />
            <Label x={x + (leftShown ? w / 4 : (3 * w) / 4)} y={fy + floor / 2} size={18}>
              {leftShown ? a : n - a}
            </Label>
          </g>
        );
      })}
    </g>
  );
}

const HOUSES = [5, 6, 7, 8, 9, 10, 10, 12, 14, 15, 18, 20];

function HousesSheet() {
  return (
    <Page height={640}>
      {HOUSES.map((n, i) => (
        <NumberHouse key={i} x={10 + (i % 4) * 148} y={8 + Math.floor(i / 4) * 214} n={n} seed={800 + i} />
      ))}
    </Page>
  );
}

// Piramida: red 0 su osnovni brojevi, svaki sljedeći red je zbir dva susedna ispod. `hidden` su prazne cigle ("red-indeks").
function pyramidRows(base: number[]): number[][] {
  const rows = [base];
  while (rows[rows.length - 1].length > 1) {
    const last = rows[rows.length - 1];
    rows.push(last.slice(1).map((v, i) => v + last[i]));
  }
  return rows;
}

function Pyramid({ x, y, base, hidden, brick }: { x: number; y: number; base: number[]; hidden: string[]; brick: number }) {
  const rows = pyramidRows(base);
  const h = 38;
  return (
    <g>
      {rows.map((row, level) =>
        row.map((value, i) => {
          const bx = x + level * (brick / 2) + i * brick;
          const by = y + (rows.length - 1 - level) * h;
          const show = !hidden.includes(`${level}-${i}`);
          return (
            <g key={`${level}-${i}`}>
              <rect x={bx} y={by} width={brick} height={h} fill="#fff" stroke={INK} strokeWidth="2" />
              {show && (
                <Label x={bx + brick / 2} y={by + h / 2} size={19}>
                  {value}
                </Label>
              )}
            </g>
          );
        }),
      )}
    </g>
  );
}

// Svaka piramida je rešiva: ako fali osnovni broj, poznata je cigla iznad njega.
const PYRAMIDS_20: { base: number[]; hidden: string[] }[] = [
  { base: [2, 3, 1], hidden: ['1-0', '1-1', '2-0'] },
  { base: [4, 1, 5], hidden: ['1-0', '1-1', '2-0'] },
  { base: [3, 3, 2], hidden: ['1-0', '1-1', '2-0'] },
  { base: [5, 2, 4], hidden: ['0-1', '1-1', '2-0'] },
  { base: [1, 6, 3], hidden: ['0-0', '0-2', '2-0'] },
  { base: [2, 5, 4], hidden: ['0-1', '1-1', '2-0'] },
];
const PYRAMIDS_100: { base: number[]; hidden: string[] }[] = [
  { base: [5, 8, 3, 6], hidden: ['1-0', '1-1', '1-2', '2-0', '2-1', '3-0'] },
  { base: [10, 4, 7, 9], hidden: ['1-0', '1-1', '1-2', '2-0', '2-1', '3-0'] },
  { base: [6, 12, 5, 8], hidden: ['1-0', '1-1', '1-2', '2-0', '2-1', '3-0'] },
  { base: [9, 6, 11, 4], hidden: ['0-1', '1-1', '1-2', '2-0', '2-1', '3-0'] },
  { base: [7, 9, 8, 14], hidden: ['0-0', '0-3', '1-1', '2-0', '2-1', '3-0'] },
  { base: [15, 5, 10, 6], hidden: ['0-1', '1-1', '1-2', '2-0', '2-1', '3-0'] },
];

function pyramidPages(): ReactNode[] {
  return [
    <Page key="pyramids-20" height={630}>
      {PYRAMIDS_20.map((p, i) => (
        <Pyramid key={i} x={i % 2 ? 325 : 35} y={20 + Math.floor(i / 2) * 210} brick={80} {...p} />
      ))}
    </Page>,
    <Page key="pyramids-100" height={640}>
      {PYRAMIDS_100.map((p, i) => (
        <Pyramid key={i} x={i % 2 ? 308 : 6} y={14 + Math.floor(i / 2) * 212} brick={70} {...p} />
      ))}
    </Page>,
  ];
}

// Brojevna prava 0–20: tri broja fale, a luk pokazuje skok.
const JUMPS: [number, number][] = [
  [5, 3],
  [8, 6],
  [12, 5],
  [15, -4],
  [11, -7],
  [3, 9],
];

function NumberLineSheet() {
  const step = 21;
  const x0 = 24;
  return (
    <Page height={640}>
      {JUMPS.map(([from, jump], r) => {
        const y = 74 + r * 104;
        const rnd = seeded(900 + r);
        const to = from + jump;
        const gaps = new Set<number>();
        while (gaps.size < 3) {
          const n = randInt(rnd, 1, 19);
          if (n !== from && n !== to) gaps.add(n);
        }
        const fx = x0 + from * step;
        const tx = x0 + to * step;
        const sign = jump > 0 ? '+' : '−';
        return (
          <g key={r}>
            <line x1={x0 - 8} x2={x0 + 20 * step + 12} y1={y} y2={y} stroke={INK} strokeWidth="2.2" />
            <path d={`M${x0 + 20 * step + 12} ${y} l-10 -6 v12 z`} fill={INK} />
            {Array.from({ length: 21 }, (_, n) => {
              const x = x0 + n * step;
              return (
                <g key={n}>
                  <line x1={x} x2={x} y1={y - 7} y2={y + 7} stroke={INK} strokeWidth="1.8" />
                  {gaps.has(n) ? (
                    <rect x={x - 10} y={y + 11} width="20" height="22" rx="4" fill="#fff" stroke={INK} strokeWidth="1.5" />
                  ) : (
                    <Label x={x} y={y + 22} size={13}>
                      {n}
                    </Label>
                  )}
                </g>
              );
            })}
            <path d={`M${fx} ${y - 8} Q${(fx + tx) / 2} ${y - 62} ${tx} ${y - 8}`} fill="none" stroke={INK} strokeWidth="2.2" />
            <path
              d={jump > 0 ? `M${tx} ${y - 8} l-9 -9 M${tx} ${y - 8} l2 -12` : `M${tx} ${y - 8} l9 -9 M${tx} ${y - 8} l-2 -12`}
              stroke={INK}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <Label x={(fx + tx) / 2} y={y - 44} size={16}>
              {`${sign}${Math.abs(jump)}`}
            </Label>
            <Label x={480} y={y} size={18} anchor="start">
              {`${from} ${sign} ${Math.abs(jump)} =`}
            </Label>
            <rect x="558" y={y - 17} width="36" height="34" rx="6" fill="#fff" stroke={INK} strokeWidth="1.8" />
          </g>
        );
      })}
    </Page>
  );
}

function AnswerLines({ labels }: { labels: SheetLabels }) {
  return (
    <div className="mt-[3mm] grid grid-cols-2 gap-6 text-[14px]">
      <span className="sheet-line">{labels.calculation}</span>
      <span className="sheet-line">{labels.answer}</span>
    </div>
  );
}

const WORD_PROBLEMS_PER_PAGE = 5;

function wordProblemPages(labels: SheetLabels): ReactNode[] {
  return chunk(labels.wordProblems, WORD_PROBLEMS_PER_PAGE).map((page, p) => (
    <ol key={p} className="grid gap-[4mm] text-[#111827]">
      {page.map((text, i) => (
        <li key={text} className="rounded-xl border-2 border-[#111827] px-[4mm] py-[3mm]">
          <p className="flex gap-2 text-[15.5px] leading-snug">
            <span className="font-bold">{p * WORD_PROBLEMS_PER_PAGE + i + 1}.</span>
            <span>{text}</span>
          </p>
          <div className="h-[16mm]" />
          <AnswerLines labels={labels} />
        </li>
      ))}
    </ol>
  ));
}

// Čitanje sata: puni sati i pola sata, pa spajanje sa digitalnim zapisom.
const READ_TIMES: [number, number][] = [
  [3, 0],
  [6, 30],
  [9, 0],
  [12, 30],
  [1, 30],
  [4, 0],
  [7, 30],
  [10, 0],
  [2, 30],
  [5, 0],
  [8, 30],
  [11, 30],
];
const MATCH_TIMES: [number, number][] = [
  [4, 30],
  [10, 0],
  [1, 0],
  [7, 30],
  [12, 0],
  [3, 30],
];
const MATCH_ORDER = [3, 0, 5, 2, 4, 1];
const timeText = ([h, m]: [number, number]) => `${h}:${String(m).padStart(2, '0')}`;

function TimeBox({ cx, y }: { cx: number; y: number }) {
  return (
    <g>
      <rect x={cx - 50} y={y} width="100" height="36" rx="8" fill="#fff" stroke={INK} strokeWidth="2" />
      <Label x={cx} y={y + 17} size={22}>
        :
      </Label>
    </g>
  );
}

function clockReadPages(): ReactNode[] {
  return [
    <Page key="clock-read-half" height={640}>
      {READ_TIMES.map(([h, m], i) => {
        const cx = 75 + (i % 4) * 150;
        const cy = 70 + Math.floor(i / 4) * 214;
        return (
          <g key={i}>
            <ClockFace cx={cx} cy={cy} r={58} hour={h} minute={m} />
            <TimeBox cx={cx} y={cy + 72} />
          </g>
        );
      })}
    </Page>,
    <Page key="clock-match" height={636}>
      {MATCH_TIMES.map(([h, m], i) => {
        const cy = 54 + i * 106;
        const right = MATCH_TIMES[MATCH_ORDER[i]];
        return (
          <g key={i}>
            <ClockFace cx={110} cy={cy} r={46} hour={h} minute={m} />
            <circle cx="180" cy={cy} r="7" fill={INK} />
            <circle cx="420" cy={cy} r="7" fill={INK} />
            <rect x="440" y={cy - 24} width="110" height="48" rx="10" fill="#fff" stroke={INK} strokeWidth="2.2" />
            <Label x={495} y={cy} size={26}>
              {timeText(right)}
            </Label>
          </g>
        );
      })}
    </Page>,
  ];
}

// Računanje sa satom: [sat, minut, koliko sati dodati (negativno = oduzeti)].
const CLOCK_MATH: [number, number, number][] = [
  [3, 0, 2],
  [7, 0, 3],
  [10, 0, 2],
  [11, 0, 3],
  [5, 30, 1],
  [8, 0, -2],
  [1, 0, -1],
  [9, 30, 2],
];

function ClockMathSheet() {
  return (
    <Page height={640}>
      {CLOCK_MATH.map(([h, m, add], i) => {
        const x = (i % 2) * 300;
        const cy = 62 + Math.floor(i / 2) * 156;
        return (
          <g key={i}>
            {i % 2 === 1 && <line x1="300" x2="300" y1={cy - 56} y2={cy + 80} stroke={GUIDE} strokeWidth="1.5" />}
            <ClockFace cx={x + 56} cy={cy} r={48} hour={h} minute={m} />
            <line x1={x + 112} x2={x + 176} y1={cy} y2={cy} stroke={INK} strokeWidth="2.5" />
            <path d={`M${x + 184} ${cy} l-12 -7 v14 z`} fill={INK} />
            <Label x={x + 146} y={cy - 18} size={18}>
              {`${add > 0 ? '+' : '−'}${Math.abs(add)} h`}
            </Label>
            <ClockFace cx={x + 240} cy={cy} r={48} />
            <TimeBox cx={x + 240} y={cy + 56} />
          </g>
        );
      })}
    </Page>
  );
}

// Dani i mjeseci: [indeks dana] za pre/posle, [tri mjeseca, koji fali], [mjesec → doba].
const NEIGHBOUR_DAYS = [1, 3, 4, 6, 2];
const MONTH_GAPS: [number[], number][] = [
  [[0, 1, 2], 1],
  [[4, 5, 6], 1],
  [[8, 9, 10], 2],
  [[10, 11, 0], 1],
  [[2, 3, 4], 0],
  [[6, 7, 8], 1],
];
const MONTHS_TO_MATCH = [0, 6, 3, 9, 11, 4];

function DaysOrderSheet({ labels }: { labels: SheetLabels }) {
  const blank = (cx: number, y: number, w: number) => <rect x={cx - w / 2} y={y - 16} width={w} height="32" rx="7" fill="#fff" stroke={INK} strokeWidth="1.8" />;
  return (
    <Page height={655}>
      <Label x={6} y={14} size={17} anchor="start">
        {labels.daysOrder.neighbours}
      </Label>
      {NEIGHBOUR_DAYS.map((d, i) => {
        const y = 54 + i * 42;
        return (
          <g key={d}>
            {blank(150, y, 180)}
            <Label x={300} y={y} size={19}>
              {labels.weekdays[d]}
            </Label>
            {blank(450, y, 180)}
          </g>
        );
      })}
      <Divider y={262} />
      <Label x={6} y={286} size={17} anchor="start">
        {labels.daysOrder.missingMonth}
      </Label>
      {MONTH_GAPS.map(([months, gap], i) => {
        const x0 = (i % 2) * 300;
        const y = 326 + Math.floor(i / 2) * 44;
        return (
          <g key={i}>
            {i % 2 === 1 && <line x1="300" x2="300" y1={y - 20} y2={y + 20} stroke={GUIDE} strokeWidth="1.5" />}
            <Label x={x0 + 100} y={y + 4} size={16}>
              ,
            </Label>
            <Label x={x0 + 200} y={y + 4} size={16}>
              ,
            </Label>
            {months.map((m, j) =>
              j === gap ? (
                <g key={j}>{blank(x0 + 50 + j * 100, y, 90)}</g>
              ) : (
                <Label key={j} x={x0 + 50 + j * 100} y={y} size={16}>
                  {labels.months[m]}
                </Label>
              ),
            )}
          </g>
        );
      })}
      <Divider y={444} />
      <Label x={6} y={468} size={17} anchor="start">
        {labels.daysOrder.monthSeason}
      </Label>
      {MONTHS_TO_MATCH.map((m, i) => {
        const x = 50 + i * 100;
        return (
          <g key={m}>
            <Label x={x} y={506} size={16}>
              {labels.months[m]}
            </Label>
            <circle cx={x} cy="528" r="6" fill={INK} />
          </g>
        );
      })}
      {SEASONS.map(({ key, Icon }, i) => {
        const x = 90 + i * 140;
        return (
          <g key={key}>
            <circle cx={x} cy="574" r="6" fill={INK} />
            <Pic Icon={Icon} x={x} y={608} size={40} />
            <Label x={x} y={644} size={14}>
              {labels.seasons[key]}
            </Label>
          </g>
        );
      })}
    </Page>
  );
}

// Kalendar: mjesec od 30 dana koji počinje u sredu (pitanja u rječniku su napisana za ovaj raspored).
const CALENDAR_START = 2;
const CALENDAR_DAYS = 30;

function calendarPages(labels: SheetLabels): ReactNode[] {
  const cell = 80;
  const rowH = 54;
  return [
    <div key="calendar" className="grid gap-[5mm]">
      <Page height={6 + 36 + 5 * rowH + 6}>
        {labels.weekdays.map((day, i) => (
          <g key={day}>
            <rect x={20 + i * cell} y="6" width={cell} height="36" fill="#fff" stroke={INK} strokeWidth="2" />
            <Label x={20 + i * cell + cell / 2} y={24} size={15}>
              {day.slice(0, 3)}
            </Label>
          </g>
        ))}
        {Array.from({ length: 35 }, (_, i) => {
          const day = i - CALENDAR_START + 1;
          const x = 20 + (i % 7) * cell;
          const y = 42 + Math.floor(i / 7) * rowH;
          return (
            <g key={i}>
              <rect x={x} y={y} width={cell} height={rowH} fill="#fff" stroke={INK} strokeWidth="1.6" />
              {day >= 1 && day <= CALENDAR_DAYS && (
                <Label x={x + 18} y={y + 17} size={16}>
                  {day}
                </Label>
              )}
            </g>
          );
        })}
      </Page>
      <ol className="grid gap-[3.5mm] text-[15px] text-[#111827]">
        {labels.calendarTasks.map((task, i) => (
          <li key={task} className="flex items-end gap-3">
            <span className="shrink-0">
              <span className="font-bold">{i + 1}.</span> {task}
            </span>
            <span className="sheet-line min-w-[30mm] flex-1" />
          </li>
        ))}
      </ol>
    </div>,
  ];
}

interface SheetContext {
  alphabet: readonly string[];
  colorNames: Record<ToyColor, string>;
  labels: SheetLabels;
  ws: Dictionary['games']['worksheet'];
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
      prompt="Oboji sanke koje jure niz brdo, Sneška Bjelića, toplu zimsku odjeću i pahulje."
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
  coloringHandWash: ({ labels }) => [<HandWashSheet key="coloringHandWash" labels={labels} />],
  coloringTraffic: ({ labels, colorNames }) => [<TrafficSheet key="coloringTraffic" labels={labels} colorNames={colorNames} />],
  coloringFood: ({ labels }) => [<FoodSheet key="coloringFood" labels={labels} />],
  coloringRecycle: ({ labels }) => [<RecycleSheet key="coloringRecycle" labels={labels} />],
  coloringFeelings: ({ labels }) => [<FeelingsSheet key="coloringFeelings" labels={labels} />],
  coloringCircus: () => [
    <ImageColoringSheet
      key="coloringCircus"
      src="/slike/bojanke/cirkus-i-madjionicar.svg"
      alt="Cirkus i mađioničar"
      prompt="Oboji veselu cirkusku šatru, klovna sa balonima, mađioničarskog zeku i slončića na lopti."
    />,
  ],
  coloringJungle: () => [
    <ImageColoringSheet
      key="coloringJungle"
      src="/slike/bojanke/tropska-dzungla.svg"
      alt="Tropska prašuma i papagaj"
      prompt="Oboji tukana sa velikim kljunom, šarenog papagaja aru, tropske cvetove i lijane u živim bojama prirode."
    />,
  ],
  coloringRobot: () => [
    <ImageColoringSheet
      key="coloringRobot"
      src="/slike/bojanke/prijateljski-robot.svg"
      alt="Prijateljski robot i svemirski drugari"
      prompt="Oboji prijateljskog robota sa ekranom i antenom, malog letećeg drona, zvezdice i planetu Saturn."
    />,
  ],
  coloringGarden: () => [
    <ImageColoringSheet
      key="coloringGarden"
      src="/slike/bojanke/veseli-vrt.svg"
      alt="Veseli vrt i povrtnjak"
      prompt="Oboji nasmejano baštensko strašilo, leje sa šargarepom i bundevom, suncokret i kantu za zalivanje."
    />,
  ],
  coloringPirates: () => [
    <ImageColoringSheet
      key="coloringPirates"
      src="/slike/bojanke/gusarski-brod.svg"
      alt="Gusarski brod i ostrvo sa blagom"
      prompt="Oboji veliki gusarski jedrenjak sa jedrima, pusto peščano ostrvo sa palmom i otvorenu škrinju sa blagom."
    />,
  ],
  coloringFair: () => [
    <ImageColoringSheet
      key="coloringFair"
      src="/slike/bojanke/zabavni-park.svg"
      alt="Zabavni park i vrteška"
      prompt="Oboji panoramski točak sa kabinama za posetioce, šarenu vrtešku sa konjićima i kolica sa balonima."
    />,
  ],
  timeDayParts: ({ labels }) => [<DayPartsSheet key="timeDayParts" labels={labels} />],
  timeSequence: () => [<SequenceSheet key="timeSequence" />],
  timeClock: () => clockPages(),
  timeRoutine: ({ labels }) => [<RoutineSheet key="timeRoutine" labels={labels} />],
  timeWeek: ({ labels }) => [<WeekSheet key="timeWeek" labels={labels} />],
  timeYear: ({ labels }) => [<YearSheet key="timeYear" labels={labels} />],
  timeClockRead: () => clockReadPages(),
  timeClockMath: () => [<ClockMathSheet key="timeClockMath" />],
  timeDaysOrder: ({ labels }) => [<DaysOrderSheet key="timeDaysOrder" labels={labels} />],
  timeCalendar: ({ labels }) => calendarPages(labels),
  mathNumberLine: () => [<NumberLineSheet key="mathNumberLine" />],
  mathHouses: () => [<HousesSheet key="mathHouses" />],
  mathAdd10: () => drillPages('mathAdd10', DRILL_SETS.mathAdd10),
  mathSub10: () => drillPages('mathSub10', DRILL_SETS.mathSub10),
  mathMissing: () => drillPages('mathMissing', DRILL_SETS.mathMissing),
  mathAddSub20: () => drillPages('mathAddSub20', DRILL_SETS.mathAddSub20),
  mathPyramids: () => pyramidPages(),
  mathAddSub100: () => drillPages('mathAddSub100', DRILL_SETS.mathAddSub100),
  mathMultiply: () => drillPages('mathMultiply', DRILL_SETS.mathMultiply),
  mathDivide: () => drillPages('mathDivide', DRILL_SETS.mathDivide),
  mathWordProblems: ({ labels }) => wordProblemPages(labels),
  mathFractions: () => [<MathFractionsSheet key="mathFractions" />],
  mathGeometry: () => [<MathGeometrySheet key="mathGeometry" />],
  mathEvenOdd: () => [<MathEvenOddSheet key="mathEvenOdd" />],
  mathMoney: () => [<MathMoneySheet key="mathMoney" />],
  mathRomanNumerals: () => [<MathRomanNumeralsSheet key="mathRomanNumerals" />],
  mathMultiplicationGrid: () => [<MathMultiplicationGridSheet key="mathMultiplicationGrid" />],
  homeWorkbookMath2: () => homeWorkbookMath2Pages(),
  winterBreakPack: ({ ws }) => winterBreakPackPages(ws),
  coloringWildAnimals: ({ labels }) => wildAnimalsPages(labels),
  coloringForestAnimals: ({ labels }) => forestAnimalsPages(labels),
  coloringPuppies: ({ labels }) => puppiesPages(labels),
  coloringBunnies: ({ labels }) => bunniesPages(labels),
  coloringCars: ({ labels }) => carsPages(labels),
  coloringFruitVeg: ({ labels }) => fruitVegPages(labels),
  coloringLeaves: ({ labels }) => leavesPages(labels),
  coloringNumbers: ({ labels }) => numbersPages(labels),
  coloringBasketball: ({ labels }) => basketballPages(labels),
  coloringSummerDays: ({ labels }) => summerPages(labels),
  coloringFamily: ({ labels }) => familyPages(labels),
  coloringFathersDay: ({ labels }) => fathersDayPages(labels),
  coloringEarth: ({ labels }) => earthPages(labels),
  coloringBicycle: ({ labels }) => bicyclePages(labels),
  coloringWeather: ({ labels }) => weatherPages(labels),
  coloringManners: ({ labels }) => mannersPages(labels),
  writingHandbookLatin: () => writingHandbookPages('lat'),
  writingHandbookCyrillic: () => writingHandbookPages('cyr'),
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
  testGrade1: () => [<Grade1TestSheet key="testGrade1" />],
  testGrade2: () => [<Grade2TestSheet key="testGrade2" />],
  testGrade3: () => [<Grade3TestSheet key="testGrade3" />],
  testGrade4: () => [<Grade4TestSheet key="testGrade4" />],
  testGrade5: () => [<Grade5TestSheet key="testGrade5" />],
  testMathOperations: () => [<DifferentiatedMathTestSheet key="testMathOperations" />],
  testLanguageGrammar: () => [<DifferentiatedGrammarTestSheet key="testLanguageGrammar" />],
  testNatureSociety: () => [<DifferentiatedNatureTestSheet key="testNatureSociety" />],
  testReadingComprehension: () => [<DifferentiatedReadingTestSheet key="testReadingComprehension" />],
  testMultiplicationDivision: () => [<DifferentiatedMultiplicationTestSheet key="testMultiplicationDivision" />],
};
