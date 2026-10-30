import { useMemo, useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import type { Shape, ToyColor } from './ids';
import { RoundDots, ShapeIcon, shuffle, toyHex, useShake, type GameProps } from './shared';

interface Item {
  shape: Shape;
  color: ToyColor;
}

const item = (shape: Shape, color: ToyColor): Item => ({ shape, color });
const same = (a: Item, b: Item) => a.shape === b.shape && a.color === b.color;

// Niz je `unit` ponovljen dok ne dobije `shown` članova; dete bira sledeći.
const ROUNDS: { unit: Item[]; shown: number; extra: Item }[] = [
  { unit: [item('circle', 'red'), item('circle', 'blue')], shown: 5, extra: item('circle', 'green') },
  { unit: [item('star', 'yellow'), item('square', 'green')], shown: 5, extra: item('heart', 'red') },
  { unit: [item('heart', 'red'), item('heart', 'red'), item('triangle', 'blue')], shown: 5, extra: item('square', 'yellow') },
  { unit: [item('circle', 'red'), item('square', 'yellow'), item('triangle', 'blue')], shown: 5, extra: item('star', 'purple') },
  { unit: [item('star', 'purple'), item('circle', 'orange'), item('circle', 'orange')], shown: 4, extra: item('star', 'orange') },
];

export default function Pattern({ onWin }: GameProps) {
  const { t } = useLocale();
  const g = t.games;
  const [round, setRound] = useState(0);
  const [solved, setSolved] = useState(false);
  const { shaking, shake } = useShake();
  const { unit, shown } = ROUNDS[round];
  const sequence = Array.from({ length: shown }, (_, i) => unit[i % unit.length]);
  const answer = unit[shown % unit.length];

  // Ponude se mešaju jednom po rundi, ne pri svakom iscrtavanju.
  const options = useMemo(() => {
    const { unit, shown, extra } = ROUNDS[round];
    const answer = unit[shown % unit.length];
    const unique = [...unit, extra].filter((it, i, all) => all.findIndex((o) => same(o, it)) === i);
    const distractors = unique.filter((it) => !same(it, answer)).slice(0, 2);
    return shuffle([answer, ...distractors]);
  }, [round]);

  const label = (it: Item) => `${g.shapeNames[it.shape]}, ${g.colorNames[it.color]}`;

  const choose = (it: Item, i: number) => {
    if (solved) return;
    if (!same(it, answer)) {
      shake(String(i));
      return;
    }
    setSolved(true);
    window.setTimeout(() => {
      if (round + 1 === ROUNDS.length) return onWin();
      setRound(round + 1);
      setSolved(false);
    }, 900);
  };

  return (
    <div className="grid gap-4">
      <RoundDots total={ROUNDS.length} current={round} label={g.ui.round(round + 1, ROUNDS.length)} />
      <div className="game-board grid min-h-[min(68vh,520px)] content-center gap-10 p-3 sm:p-8">
        <ol className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3" aria-label={g.ui.sequence}>
          {sequence.map((it, i) => (
            <li key={`${round}-${i}`} aria-label={label(it)}>
              <ShapeIcon shape={it.shape} color={toyHex[it.color]} className="h-[clamp(40px,10vw,76px)] w-[clamp(40px,10vw,76px)]" />
            </li>
          ))}
          <li
            aria-label={solved ? label(answer) : g.ui.missing}
            className="grid h-[clamp(48px,11vw,84px)] w-[clamp(48px,11vw,84px)] place-items-center rounded-2xl border-[3px] border-dashed border-accent-2 font-head text-3xl font-bold text-accent-2"
          >
            {solved ? (
              <ShapeIcon shape={answer.shape} color={toyHex[answer.color]} className="pop-in h-[85%] w-[85%]" />
            ) : (
              '?'
            )}
          </li>
        </ol>
        <div className="flex justify-center gap-3 sm:gap-6">
          {options.map((it, i) => (
            <button
              key={`${round}-${i}`}
              type="button"
              onClick={() => choose(it, i)}
              aria-label={label(it)}
              className={`toy-piece focus-ring grid h-[clamp(76px,18vw,120px)] w-[clamp(76px,18vw,120px)] place-items-center rounded-3xl bg-surface p-3 ${shaking === String(i) ? 'shake' : ''}`}
            >
              <ShapeIcon shape={it.shape} color={toyHex[it.color]} className="h-full w-full" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
