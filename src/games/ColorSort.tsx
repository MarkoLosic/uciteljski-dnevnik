import { useMemo, useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import type { ToyColor } from './ids';
import { RoundDots, shuffle, toyHex, useDragDrop, useShake, type GameProps } from './shared';

const ROUNDS: { colors: ToyColor[]; perColor: number }[] = [
  { colors: ['red', 'blue', 'yellow'], perColor: 2 },
  { colors: ['red', 'blue', 'yellow', 'green'], perColor: 2 },
];

interface Block {
  id: string;
  color: ToyColor;
}

function makeBlocks(round: number): Block[] {
  const { colors, perColor } = ROUNDS[round];
  return shuffle(colors.flatMap((color) => Array.from({ length: perColor }, (_, i) => ({ id: `${color}-${i}`, color }))));
}

export default function ColorSort({ onWin }: GameProps) {
  const { t } = useLocale();
  const g = t.games;
  const [round, setRound] = useState(0);
  const [blocks, setBlocks] = useState(() => makeBlocks(0));
  const [sorted, setSorted] = useState<Block[]>([]);
  const { shaking, shake } = useShake();
  const baskets = useMemo(() => shuffle(ROUNDS[round].colors), [round]);

  const { selected, itemProps, targetProps } = useDragDrop((itemId, targetId) => {
    const block = blocks.find((b) => b.id === itemId);
    if (!block) return;
    if (block.color !== targetId) {
      shake(itemId);
      return;
    }
    const rest = blocks.filter((b) => b.id !== itemId);
    setBlocks(rest);
    setSorted((list) => [...list, block]);
    if (rest.length > 0) return;
    window.setTimeout(() => {
      if (round + 1 === ROUNDS.length) return onWin();
      setRound(round + 1);
      setBlocks(makeBlocks(round + 1));
      setSorted([]);
    }, 700);
  });

  return (
    <div className="grid gap-4">
      <RoundDots total={ROUNDS.length} current={round} label={g.ui.round(round + 1, ROUNDS.length)} />
      <div className="game-board grid min-h-[min(68vh,520px)] grid-rows-[1fr_auto] gap-6 p-4 sm:p-6">
        <div className="flex flex-wrap content-center items-center justify-center gap-3 sm:gap-5">
          {blocks.map((block) => (
            <button
              key={block.id}
              type="button"
              {...itemProps(block.id)}
              aria-label={g.ui.block(g.colorNames[block.color])}
              className={`toy-piece focus-ring h-[clamp(58px,12vw,84px)] w-[clamp(58px,12vw,84px)] rounded-2xl ${shaking === block.id ? 'shake' : ''} ${selected === block.id ? 'toy-selected' : ''}`}
              style={{ ...itemProps(block.id).style, background: toyHex[block.color] }}
            />
          ))}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2.5 sm:gap-4">
          {baskets.map((color) => (
            <button
              key={color}
              type="button"
              {...targetProps(color)}
              aria-label={g.ui.basket(g.colorNames[color])}
              className="focus-ring flex min-h-[110px] flex-wrap content-end items-end justify-center gap-1 rounded-b-[28px] rounded-t-lg border-4 border-t-[10px] p-2 transition-transform active:scale-95"
              style={{ borderColor: toyHex[color], background: `color-mix(in srgb, ${toyHex[color]} 16%, transparent)` }}
            >
              {sorted
                .filter((b) => b.color === color)
                .map((b) => (
                  <span key={b.id} className="pop-in h-6 w-6 rounded-md sm:h-8 sm:w-8" style={{ background: toyHex[color] }} />
                ))}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
