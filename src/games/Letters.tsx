import { useState } from 'react';
import { Apple, Bird, Cat, Dog, Fish, Flower2, House, Rabbit, Rocket, Sun, type LucideIcon } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import { RoundDots, shuffle, toyHex, useShake, type GameProps } from './shared';

interface LetterWord {
  Icon: LucideIcon;
  color: string;
  wordLat: string;
  wordCyr: string;
  lat: string;
  cyr: string;
  wrongLat: [string, string];
  wrongCyr: [string, string];
}

const ITEMS: LetterWord[] = [
  { Icon: Sun, color: toyHex.yellow, wordLat: 'SUNCE', wordCyr: 'СУНЦЕ', lat: 'S s', cyr: 'С с', wrongLat: ['M m', 'K k'], wrongCyr: ['М м', 'К к'] },
  { Icon: Apple, color: toyHex.red, wordLat: 'JABUKA', wordCyr: 'ЈАБУКА', lat: 'J j', cyr: 'Ј ј', wrongLat: ['B b', 'L l'], wrongCyr: ['Б б', 'Л л'] },
  { Icon: Fish, color: toyHex.blue, wordLat: 'RIBA', wordCyr: 'РИБА', lat: 'R r', cyr: 'Р р', wrongLat: ['P p', 'T t'], wrongCyr: ['П п', 'Т т'] },
  { Icon: House, color: toyHex.orange, wordLat: 'KUĆA', wordCyr: 'КУЋА', lat: 'K k', cyr: 'К к', wrongLat: ['G g', 'N n'], wrongCyr: ['Г г', 'Н н'] },
  { Icon: Cat, color: toyHex.purple, wordLat: 'MAČKA', wordCyr: 'МАЧКА', lat: 'M m', cyr: 'М м', wrongLat: ['V v', 'Z z'], wrongCyr: ['В в', 'З з'] },
  { Icon: Rabbit, color: toyHex.green, wordLat: 'ZEC', wordCyr: 'ЗЕЦ', lat: 'Z z', cyr: 'З з', wrongLat: ['S s', 'D d'], wrongCyr: ['С с', 'Д д'] },
  { Icon: Flower2, color: toyHex.red, wordLat: 'CVIJET', wordCyr: 'ЦВИЈЕТ', lat: 'C c', cyr: 'Ц ц', wrongLat: ['Č č', 'P p'], wrongCyr: ['Ч ч', 'П п'] },
  { Icon: Dog, color: toyHex.blue, wordLat: 'PAS', wordCyr: 'ПАС', lat: 'P p', cyr: 'П п', wrongLat: ['R r', 'B b'], wrongCyr: ['Р р', 'Б б'] },
  { Icon: Bird, color: toyHex.orange, wordLat: 'PTICA', wordCyr: 'ПТИЦА', lat: 'P p', cyr: 'П п', wrongLat: ['T t', 'K k'], wrongCyr: ['Т т', 'К к'] },
  { Icon: Rocket, color: toyHex.purple, wordLat: 'RAKETA', wordCyr: 'РАКЕТА', lat: 'R r', cyr: 'Р р', wrongLat: ['L l', 'M m'], wrongCyr: ['Л л', 'М м'] },
];

const TOTAL_ROUNDS = 6;

interface RoundData {
  item: LetterWord;
  optionsIndex: number[]; // 0 = correct, 1 = wrong[0], 2 = wrong[1]
}

function makeRounds(): RoundData[] {
  return shuffle(ITEMS)
    .slice(0, TOTAL_ROUNDS)
    .map((item) => ({
      item,
      optionsIndex: shuffle([0, 1, 2]),
    }));
}

export default function Letters({ onWin }: GameProps) {
  const { locale, t } = useLocale();
  const g = t.games;
  const [rounds] = useState<RoundData[]>(makeRounds);
  const [round, setRound] = useState(0);
  const [script, setScript] = useState<'lat' | 'cyr'>(locale === 'sr' ? 'cyr' : 'lat');
  const [solved, setSolved] = useState(false);
  const { shaking, shake } = useShake();

  const current = rounds[round];
  const { Icon, color, wordLat, wordCyr, lat, cyr, wrongLat, wrongCyr } = current.item;
  const word = script === 'cyr' ? wordCyr : wordLat;
  const correctLabel = script === 'cyr' ? cyr : lat;
  const wrongs = script === 'cyr' ? wrongCyr : wrongLat;

  const choose = (optIdx: number) => {
    if (solved) return;
    if (optIdx !== 0) {
      shake(String(optIdx));
      return;
    }
    setSolved(true);
    window.setTimeout(() => {
      if (round + 1 === TOTAL_ROUNDS) return onWin();
      setRound(round + 1);
      setSolved(false);
    }, 900);
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <RoundDots total={TOTAL_ROUNDS} current={round} label={g.ui.round(round + 1, TOTAL_ROUNDS)} />
        <div className="inline-flex rounded-xl border border-line bg-surface p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setScript('lat')}
            className={`focus-ring rounded-lg px-3 py-1.5 transition-colors ${
              script === 'lat' ? 'bg-accent text-accent-ink' : 'text-muted hover:text-ink'
            }`}
          >
            Latinica (A B C)
          </button>
          <button
            type="button"
            onClick={() => setScript('cyr')}
            className={`focus-ring rounded-lg px-3 py-1.5 transition-colors ${
              script === 'cyr' ? 'bg-accent text-accent-ink' : 'text-muted hover:text-ink'
            }`}
          >
            Ћирилица (А Б В)
          </button>
        </div>
      </div>

      <div className="game-board grid min-h-[min(68vh,520px)] content-center gap-8 p-4 sm:p-8">
        <div className="mx-auto flex flex-col items-center gap-5">
          <div
            className={`grid h-36 w-36 place-items-center rounded-3xl border-2 border-line bg-surface shadow-sm sm:h-44 sm:w-44 ${
              solved ? 'bounce-once' : ''
            }`}
          >
            <Icon aria-hidden="true" color={color} strokeWidth={2.2} className="h-24 w-24 sm:h-28 sm:w-28" />
          </div>

          <div className="flex items-center gap-1.5 font-head text-[clamp(28px,6vw,44px)] font-bold tracking-wider">
            <span
              className={`inline-grid h-12 w-12 place-items-center rounded-xl border-2 sm:h-14 sm:w-14 ${
                solved ? 'border-accent bg-accent text-accent-ink' : 'border-dashed border-accent text-accent'
              }`}
            >
              {solved ? word[0] : '?'}
            </span>
            <span>{word.slice(1)}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
          {current.optionsIndex.map((optIdx) => {
            const label = optIdx === 0 ? correctLabel : wrongs[optIdx - 1];
            return (
              <button
                key={`${round}-${optIdx}-${script}`}
                type="button"
                onClick={() => choose(optIdx)}
                className={`toy-piece focus-ring grid h-[clamp(78px,18vw,112px)] min-w-[clamp(96px,22vw,140px)] place-items-center rounded-3xl px-4 font-head text-[clamp(30px,6.5vw,44px)] font-bold ${
                  solved && optIdx === 0 ? 'bg-accent text-accent-ink' : 'bg-surface'
                } ${shaking === String(optIdx) ? 'shake' : ''}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

