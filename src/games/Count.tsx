import { useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { RoundDots, randomInt, shuffle, useShake, type GameProps } from './shared';
import { THINGS, THING_NAMES, type Thing } from './things';

const RANGES: [number, number][] = [
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 6],
  [5, 8],
];
const GRID = 12; // predmeti se raspoređuju u nasumična polja mreže 4×3 da se ne preklapaju

interface Puzzle {
  thing: Thing;
  count: number;
  cells: number[];
  options: number[];
}

function makePuzzle(round: number): Puzzle {
  const [min, max] = RANGES[round];
  const count = randomInt(min, max);
  const wrong = shuffle([count - 2, count - 1, count + 1, count + 2].filter((n) => n >= 1 && n <= 9)).slice(0, 2);
  return {
    thing: THING_NAMES[randomInt(0, THING_NAMES.length - 1)],
    count,
    cells: shuffle(Array.from({ length: GRID }, (_, i) => i)).slice(0, count),
    options: [...wrong, count].sort((a, b) => a - b),
  };
}

export default function Count({ onWin }: GameProps) {
  const { t } = useLocale();
  const g = t.games;
  const [round, setRound] = useState(0);
  const [puzzle, setPuzzle] = useState(() => makePuzzle(0));
  const [solved, setSolved] = useState(false);
  const { shaking, shake } = useShake();
  const { Icon, color } = THINGS[puzzle.thing];

  const choose = (n: number) => {
    if (solved) return;
    if (n !== puzzle.count) {
      shake(String(n));
      return;
    }
    setSolved(true);
    window.setTimeout(() => {
      if (round + 1 === RANGES.length) return onWin();
      setRound(round + 1);
      setPuzzle(makePuzzle(round + 1));
      setSolved(false);
    }, 900);
  };

  return (
    <div className="grid gap-4">
      <RoundDots total={RANGES.length} current={round} label={g.ui.round(round + 1, RANGES.length)} />
      <div className="game-board grid min-h-[min(68vh,520px)] content-center gap-8 p-3 sm:p-8">
        <div
          role="img"
          aria-label={g.ui.howMany(g.things[puzzle.thing])}
          className="mx-auto grid w-[min(100%,480px)] grid-cols-4 grid-rows-3 gap-2"
        >
          {Array.from({ length: GRID }, (_, cell) => (
            <span key={`${round}-${cell}`} className="grid aspect-square place-items-center">
              {puzzle.cells.includes(cell) && (
                <Icon
                  aria-hidden="true"
                  color={color}
                  strokeWidth={2.2}
                  className={`h-4/5 w-4/5 ${solved ? 'bounce-once' : ''}`}
                  style={{ rotate: `${(cell % 3) * 8 - 8}deg` }}
                />
              )}
            </span>
          ))}
        </div>
        <div className="flex justify-center gap-3 sm:gap-6">
          {puzzle.options.map((n) => (
            <button
              key={`${round}-${n}`}
              type="button"
              onClick={() => choose(n)}
              className={`toy-piece focus-ring grid h-[clamp(72px,17vw,108px)] w-[clamp(72px,17vw,108px)] place-items-center rounded-3xl font-head text-[clamp(36px,8vw,54px)] font-bold ${
                solved && n === puzzle.count ? 'bg-accent text-accent-ink' : 'bg-surface'
              } ${shaking === String(n) ? 'shake' : ''}`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
