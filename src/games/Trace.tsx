import { useLayoutEffect, useRef, useState, type PointerEvent } from 'react';
import { Bug, Flower2 } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import { RoundDots, toyHex, type GameProps } from './shared';

export const PATHS = [
  'M40 130 C 100 30, 160 30, 200 130 S 300 230, 360 130',
  'M40 200 L 105 70 L 170 200 L 235 70 L 300 200 L 360 80',
  'M40 210 C 40 60, 210 50, 200 150 C 195 215, 115 205, 130 145 C 145 85, 300 50, 360 120',
];

const STEP = 4; // razmak između tačaka uzorka na putanji
const TOLERANCE = 34; // koliko prst sme da odluta od linije (u jedinicama viewBox-a)
const LOOK_AHEAD = 18;

interface Point {
  x: number;
  y: number;
}

export default function Trace({ onWin }: GameProps) {
  const { t } = useLocale();
  const g = t.games;
  const [round, setRound] = useState(0);
  const [progress, setProgress] = useState(0);
  const [samples, setSamples] = useState<Point[]>([]);
  const [length, setLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const drawing = useRef(false);
  const done = useRef(false);
  // Više pokreta prsta može stići pre novog iscrtavanja, pa se napredak čita iz ref-a, ne iz state-a.
  const progressRef = useRef(0);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const points: Point[] = [];
    for (let d = 0; d <= total; d += STEP) {
      const { x, y } = path.getPointAtLength(d);
      points.push({ x, y });
    }
    setSamples(points);
    setLength(total);
    setProgress(0);
    progressRef.current = 0;
    done.current = false;
  }, [round]);

  const toSvg = (e: PointerEvent<SVGSVGElement>): Point | null => {
    const matrix = svgRef.current?.getScreenCTM();
    if (!matrix) return null;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(matrix.inverse());
    return { x: p.x, y: p.y };
  };

  const follow = (e: PointerEvent<SVGSVGElement>) => {
    if (!drawing.current || done.current) return;
    const p = toSvg(e);
    if (!p) return;
    const from = progressRef.current;
    let best = from;
    for (let i = from; i < Math.min(from + LOOK_AHEAD, samples.length); i++) {
      if (Math.hypot(samples[i].x - p.x, samples[i].y - p.y) < TOLERANCE) best = i;
    }
    if (best === from) return;
    progressRef.current = best;
    setProgress(best);
    if (best >= samples.length - 2) {
      done.current = true;
      window.setTimeout(() => (round + 1 === PATHS.length ? onWin() : setRound(round + 1)), 600);
    }
  };

  const start = samples[0] ?? { x: 0, y: 0 };
  const end = samples[samples.length - 1] ?? { x: 0, y: 0 };
  const bee = samples[progress] ?? start;
  const drawn = samples.length > 1 ? (progress / (samples.length - 1)) * length : 0;

  return (
    <div className="grid gap-4">
      <RoundDots total={PATHS.length} current={round} label={g.ui.round(round + 1, PATHS.length)} />
      <div className="game-board p-2 sm:p-4">
        <svg
          ref={svgRef}
          viewBox="0 0 400 260"
          role="img"
          aria-label={g.ui.traceArea}
          className="block w-full select-none"
          style={{ touchAction: 'none' }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            drawing.current = true;
            follow(e);
          }}
          onPointerMove={follow}
          onPointerUp={() => (drawing.current = false)}
          onPointerCancel={() => (drawing.current = false)}
        >
          <path d={PATHS[round]} fill="none" stroke="var(--border-strong)" strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
          <path
            ref={pathRef}
            d={PATHS[round]}
            fill="none"
            stroke="var(--muted)"
            strokeWidth="4"
            strokeDasharray="2 12"
            strokeLinecap="round"
          />
          <path
            d={PATHS[round]}
            fill="none"
            stroke={toyHex.yellow}
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${drawn} ${length + 10}`}
          />
          <circle cx={end.x} cy={end.y} r="26" fill="var(--surface)" stroke={toyHex.purple} strokeWidth="3" />
          <Flower2 x={end.x - 17} y={end.y - 17} width={34} height={34} color={toyHex.purple} aria-hidden="true" />
          <circle cx={bee.x} cy={bee.y} r="24" fill={toyHex.yellow} stroke="rgba(0,0,0,.25)" strokeWidth="2" />
          <Bug x={bee.x - 15} y={bee.y - 15} width={30} height={30} color="#1f2937" aria-hidden="true" />
        </svg>
      </div>
    </div>
  );
}
