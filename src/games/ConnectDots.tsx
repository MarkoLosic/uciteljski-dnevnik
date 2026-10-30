import { useState, type KeyboardEvent } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { RoundDots, toyHex, useShake, type GameProps } from './shared';

// Svaki oblik je zatvoren poligon; tačke se spajaju redom 1 → N, pa nazad na 1.
const FIGURES: { points: [number, number][]; color: string }[] = [
  { points: [[200, 30], [320, 150], [200, 270], [80, 150]], color: toyHex.orange },
  { points: [[200, 35], [325, 135], [325, 265], [75, 265], [75, 135]], color: toyHex.red },
  { points: [[55, 150], [150, 70], [265, 120], [345, 55], [345, 245], [265, 180], [150, 230]], color: toyHex.blue },
];

export default function ConnectDots({ onWin }: GameProps) {
  const { t } = useLocale();
  const g = t.games;
  const [round, setRound] = useState(0);
  const [next, setNext] = useState(0);
  const { shaking, shake } = useShake();
  const { points, color } = FIGURES[round];
  const complete = next === points.length;

  const tap = (i: number) => {
    if (complete) return;
    if (i !== next) {
      shake(String(i));
      return;
    }
    setNext(next + 1);
    if (next + 1 < points.length) return;
    window.setTimeout(() => {
      if (round + 1 === FIGURES.length) return onWin();
      setRound(round + 1);
      setNext(0);
    }, 1100);
  };

  const onKey = (e: KeyboardEvent<SVGGElement>, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      tap(i);
    }
  };

  const reached = points.slice(0, next);
  const line = complete ? [...points, points[0]] : reached;

  return (
    <div className="grid gap-4">
      <RoundDots total={FIGURES.length} current={round} label={g.ui.round(round + 1, FIGURES.length)} />
      <div className="game-board p-2 sm:p-4">
        <svg viewBox="0 0 400 300" className="block w-full select-none" role="group" aria-label={g.list.dots.title}>
          {complete && (
            <polygon className="pop-in" points={points.map((p) => p.join(',')).join(' ')} fill={color} opacity="0.35" />
          )}
          <polyline
            points={line.map((p) => p.join(',')).join(' ')}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map(([x, y], i) => {
            const done = i < next;
            const isNext = i === next;
            return (
              <g
                key={`${round}-${i}`}
                role="button"
                tabIndex={0}
                aria-label={g.ui.dot(i + 1)}
                aria-disabled={done}
                onPointerDown={() => tap(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`focus-ring cursor-pointer outline-none ${shaking === String(i) ? 'shake' : ''}`}
                style={{ transformOrigin: `${x}px ${y}px`, transformBox: 'view-box' }}
              >
                {isNext && <circle cx={x} cy={y} r="32" fill={color} opacity="0.25" className="pulse-ring" />}
                <circle
                  cx={x}
                  cy={y}
                  r="24"
                  fill={done ? color : 'var(--surface)'}
                  stroke={color}
                  strokeWidth="4"
                />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="24"
                  fontWeight="700"
                  fontFamily="var(--font-head)"
                  fill={done ? '#fff' : 'var(--text)'}
                  pointerEvents="none"
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
