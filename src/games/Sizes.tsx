import { useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { RoundDots, randomInt, shuffle, useShake, type GameProps } from './shared';
import { THINGS, THING_NAMES, type Thing } from './things';

// Veličine u % širine table; razlike su dovoljno velike da ih i najmlađi lako vide.
const ROUNDS = [
  [11, 18, 27],
  [9, 14, 20, 27],
  [7, 11, 15, 20, 25],
];

interface Puzzle {
  thing: Thing;
  order: number[]; // indeksi veličina, izmešani
}

function makePuzzle(round: number): Puzzle {
  return {
    thing: THING_NAMES[randomInt(0, THING_NAMES.length - 1)],
    order: shuffle(ROUNDS[round].map((_, i) => i)),
  };
}

export default function Sizes({ onWin }: GameProps) {
  const { t } = useLocale();
  const g = t.games;
  const [round, setRound] = useState(0);
  const [puzzle, setPuzzle] = useState(() => makePuzzle(0));
  const [placed, setPlaced] = useState(0);
  const { shaking, shake } = useShake();
  const sizes = ROUNDS[round];
  const { Icon, color } = THINGS[puzzle.thing];

  const tap = (sizeIndex: number) => {
    if (sizeIndex < placed) return;
    if (sizeIndex !== placed) {
      shake(String(sizeIndex));
      return;
    }
    setPlaced(placed + 1);
    if (placed + 1 < sizes.length) return;
    window.setTimeout(() => {
      if (round + 1 === ROUNDS.length) return onWin();
      setRound(round + 1);
      setPuzzle(makePuzzle(round + 1));
      setPlaced(0);
    }, 900);
  };

  return (
    <div className="grid gap-4">
      <RoundDots total={ROUNDS.length} current={round} label={g.ui.round(round + 1, ROUNDS.length)} />
      <div className="game-board grid min-h-[min(68vh,520px)] grid-rows-[1fr_auto] gap-4 p-3 sm:p-6">
        <div className="flex flex-wrap items-end justify-center gap-[1%]">
          {puzzle.order.map((sizeIndex) =>
            sizeIndex < placed ? null : (
              <button
                key={`${round}-${sizeIndex}`}
                type="button"
                onClick={() => tap(sizeIndex)}
                aria-label={g.ui.sizeItem(g.things[puzzle.thing], sizeIndex + 1, sizes.length)}
                className={`focus-ring grid place-items-center rounded-2xl p-2.5 transition-transform active:scale-95 ${shaking === String(sizeIndex) ? 'shake' : ''}`}
                style={{ width: `calc(${sizes[sizeIndex]}% + 20px)` }} // + prostor za dodir oko malih sličica
              >
                <Icon aria-hidden="true" color={color} strokeWidth={2} className="h-auto w-full" />
              </button>
            ),
          )}
        </div>
        <ol
          aria-label={g.ui.shelf}
          className="flex min-h-[90px] items-end justify-center gap-[2%] border-b-[10px] px-2 pb-1"
          style={{ borderColor: 'color-mix(in srgb, #a16207 70%, var(--surface))' }}
        >
          {sizes.slice(0, placed).map((size, i) => (
            <li key={`${round}-${i}`} className="pop-in" style={{ width: `${size * 0.8}%` }}>
              <Icon aria-hidden="true" color={color} strokeWidth={2} className="h-auto w-full" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
