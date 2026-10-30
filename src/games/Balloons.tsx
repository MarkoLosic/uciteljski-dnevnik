import { useEffect, useRef, useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { TOY_COLORS, type ToyColor } from './ids';
import { RoundDots, randomInt, toyHex, type GameProps } from './shared';

const GOAL = 10;
const MAX_ON_SCREEN = 5;

interface Balloon {
  id: number;
  color: ToyColor;
  left: number;
  top: number; // položaj kada su animacije isključene (prefers-reduced-motion)
  duration: number;
  popped: boolean;
}

export default function Balloons({ onWin }: GameProps) {
  const { t } = useLocale();
  const g = t.games;
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const nextId = useRef(0);

  useEffect(() => {
    const spawn = () =>
      setBalloons((list) => {
        if (list.filter((b) => !b.popped).length >= MAX_ON_SCREEN) return list;
        const balloon: Balloon = {
          id: nextId.current++,
          color: TOY_COLORS[randomInt(0, TOY_COLORS.length - 1)],
          left: randomInt(2, 80),
          top: randomInt(5, 60),
          duration: randomInt(70, 100) / 10,
          popped: false,
        };
        return [...list, balloon];
      });
    spawn();
    const timer = window.setInterval(spawn, 1100);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (score === GOAL) onWin();
  }, [score, onWin]);

  const pop = (id: number) => {
    setBalloons((list) => list.map((b) => (b.id === id ? { ...b, popped: true } : b)));
    setScore((s) => Math.min(GOAL, s + 1));
    window.setTimeout(() => setBalloons((list) => list.filter((b) => b.id !== id)), 320);
  };

  const remove = (id: number) => setBalloons((list) => list.filter((b) => b.id !== id || b.popped));

  return (
    <div className="grid gap-4">
      <RoundDots total={GOAL} current={score} label={g.ui.progress(score, GOAL)} />
      <div className="game-board relative h-[min(68vh,520px)] overflow-hidden">
        {balloons.map((b) => (
          <button
            key={b.id}
            type="button"
            disabled={b.popped}
            onPointerDown={() => !b.popped && pop(b.id)}
            onClick={(e) => e.detail === 0 && !b.popped && pop(b.id)}
            onAnimationEnd={() => remove(b.id)}
            aria-label={g.ui.popBalloon(g.colorNames[b.color])}
            className={`balloon focus-ring absolute w-[clamp(64px,17%,110px)] ${b.popped ? 'balloon-popped' : ''}`}
            style={{ left: `${b.left}%`, top: `${b.top}%`, animationDuration: `${b.duration}s` }}
          >
            <svg viewBox="0 0 60 90" aria-hidden="true" className="w-full">
              <path d="M30 62 C 26 72, 34 78, 29 90" fill="none" stroke="var(--muted)" strokeWidth="1.5" />
              <ellipse cx="30" cy="30" rx="26" ry="30" fill={toyHex[b.color]} />
              <ellipse cx="21" cy="19" rx="6" ry="9" fill="rgba(255,255,255,.45)" />
              <path d="M26 59 h8 l-4 6z" fill={toyHex[b.color]} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
