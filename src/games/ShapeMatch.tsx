import { useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import type { Shape, ToyColor } from './ids';
import { RoundDots, ShapeIcon, shuffle, toyHex, useDragDrop, useShake, type GameProps } from './shared';

const ROUNDS: Shape[][] = [
  ['circle', 'square', 'triangle'],
  ['circle', 'square', 'triangle', 'star', 'heart'],
];

const pieceColor: Record<Shape, ToyColor> = {
  circle: 'red',
  square: 'blue',
  triangle: 'green',
  star: 'yellow',
  heart: 'purple',
};

export default function ShapeMatch({ onWin }: GameProps) {
  const { t } = useLocale();
  const g = t.games;
  const [round, setRound] = useState(0);
  const [slots, setSlots] = useState(() => shuffle(ROUNDS[0]));
  const [pieces, setPieces] = useState(() => shuffle(ROUNDS[0]));
  const [placed, setPlaced] = useState<Shape[]>([]);
  const { shaking, shake } = useShake();

  const { selected, itemProps, targetProps } = useDragDrop((itemId, targetId) => {
    if (itemId !== targetId) {
      shake(itemId);
      return;
    }
    const shape = itemId as Shape;
    const rest = pieces.filter((p) => p !== shape);
    setPieces(rest);
    setPlaced((list) => [...list, shape]);
    if (rest.length > 0) return;
    window.setTimeout(() => {
      if (round + 1 === ROUNDS.length) return onWin();
      setRound(round + 1);
      setSlots(shuffle(ROUNDS[round + 1]));
      setPieces(shuffle(ROUNDS[round + 1]));
      setPlaced([]);
    }, 700);
  });

  const size = 'h-[clamp(64px,15vw,110px)] w-[clamp(64px,15vw,110px)]';

  return (
    <div className="grid gap-4">
      <RoundDots total={ROUNDS.length} current={round} label={g.ui.round(round + 1, ROUNDS.length)} />
      <div className="game-board grid min-h-[min(68vh,520px)] content-center gap-10 p-4 sm:p-8">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
          {slots.map((shape) => (
            <button
              key={shape}
              type="button"
              {...targetProps(shape)}
              aria-label={g.ui.slot(g.shapeNames[shape])}
              className={`focus-ring grid place-items-center rounded-2xl bg-surface p-1.5 text-muted ${size}`}
            >
              <ShapeIcon
                shape={shape}
                outline={!placed.includes(shape)}
                color={placed.includes(shape) ? toyHex[pieceColor[shape]] : 'currentColor'}
                className={`h-full w-full ${placed.includes(shape) ? 'pop-in' : ''}`}
              />
            </button>
          ))}
        </div>
        <div className="flex min-h-[110px] flex-wrap items-center justify-center gap-3 sm:gap-6">
          {pieces.map((shape) => (
            <button
              key={shape}
              type="button"
              {...itemProps(shape)}
              aria-label={g.ui.piece(g.shapeNames[shape])}
              className={`toy-piece focus-ring rounded-2xl p-1.5 ${size} ${shaking === shape ? 'shake' : ''} ${selected === shape ? 'toy-selected' : ''}`}
            >
              <ShapeIcon shape={shape} color={toyHex[pieceColor[shape]]} className="h-full w-full" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
