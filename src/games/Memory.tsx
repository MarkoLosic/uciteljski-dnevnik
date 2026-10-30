import { useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { RoundDots, shuffle, type GameProps } from './shared';
import { THINGS, THING_NAMES, type Thing } from './things';

const PAIRS_PER_ROUND = [3, 4, 6];
const COLUMNS = [3, 4, 4];

interface Card {
  id: number;
  thing: Thing;
}

function makeDeck(pairs: number): Card[] {
  const things = shuffle(THING_NAMES).slice(0, pairs);
  return shuffle([...things, ...things]).map((thing, id) => ({ id, thing }));
}

export default function Memory({ onWin }: GameProps) {
  const { t } = useLocale();
  const g = t.games;
  const [round, setRound] = useState(0);
  const [deck, setDeck] = useState(() => makeDeck(PAIRS_PER_ROUND[0]));
  const [open, setOpen] = useState<number[]>([]);
  const [found, setFound] = useState<Set<Thing>>(new Set());

  const flip = (card: Card) => {
    if (open.length === 2 || open.includes(card.id) || found.has(card.thing)) return;
    const next = [...open, card.id];
    setOpen(next);
    if (next.length < 2) return;

    const [a, b] = next.map((id) => deck[id]);
    if (a.thing !== b.thing) {
      window.setTimeout(() => setOpen([]), 1000);
      return;
    }
    const nowFound = new Set(found).add(a.thing);
    window.setTimeout(() => {
      setFound(nowFound);
      setOpen([]);
    }, 400);
    if (nowFound.size < PAIRS_PER_ROUND[round]) return;
    window.setTimeout(() => {
      if (round + 1 === PAIRS_PER_ROUND.length) return onWin();
      setRound(round + 1);
      setDeck(makeDeck(PAIRS_PER_ROUND[round + 1]));
      setFound(new Set());
    }, 1100);
  };

  return (
    <div className="grid gap-4">
      <RoundDots total={PAIRS_PER_ROUND.length} current={round} label={g.ui.round(round + 1, PAIRS_PER_ROUND.length)} />
      <div className="game-board grid min-h-[min(68vh,520px)] place-items-center p-3 sm:p-6">
        <ul
          className="grid w-[min(100%,580px)] gap-2.5 sm:gap-4"
          style={{ gridTemplateColumns: `repeat(${COLUMNS[round]}, 1fr)` }}
        >
          {deck.map((card) => {
            const faceUp = open.includes(card.id) || found.has(card.thing);
            const { Icon, color } = THINGS[card.thing];
            return (
              <li key={`${round}-${card.id}`}>
                <button
                  type="button"
                  onClick={() => flip(card)}
                  aria-label={faceUp ? g.things[card.thing] : g.ui.hiddenCard}
                  className={`memory-card focus-ring aspect-[4/5] w-full ${faceUp ? 'is-open' : ''} ${found.has(card.thing) ? 'is-found' : ''}`}
                >
                  <span className="memory-face memory-back" aria-hidden="true">
                    ?
                  </span>
                  <span className="memory-face memory-front" aria-hidden="true">
                    <Icon className="h-3/5 w-3/5" color={color} strokeWidth={2.2} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
