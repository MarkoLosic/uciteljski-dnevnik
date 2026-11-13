import { useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';
import { TOY_COLORS, type ToyColor } from './ids';
import { RoundDots, toyHex, type GameProps } from './shared';

interface SceneInfo {
  latUpper: string;
  latLower: string;
  cyrUpper: string;
  cyrLower: string;
  wordLat: string;
  wordCyr: string;
}

const SCENES: SceneInfo[] = [
  { latUpper: 'A', latLower: 'a', cyrUpper: 'А', cyrLower: 'а', wordLat: 'Jabuka i avion', wordCyr: 'Јабука и авион' },
  { latUpper: 'S', latLower: 's', cyrUpper: 'С', cyrLower: 'с', wordLat: 'Sunce', wordCyr: 'Сунце' },
  { latUpper: 'K', latLower: 'k', cyrUpper: 'К', cyrLower: 'к', wordLat: 'Kuća', wordCyr: 'Кућа' },
  { latUpper: 'R', latLower: 'r', cyrUpper: 'Р', cyrLower: 'р', wordLat: 'Raketa', wordCyr: 'Ракета' },
];

const REGION_COUNT = 6;

export default function Coloring({ onWin }: GameProps) {
  const { locale, t } = useLocale();
  const g = t.games;
  const [round, setRound] = useState(0);
  const [script, setScript] = useState<'lat' | 'cyr'>(locale === 'sr' ? 'cyr' : 'lat');
  const [activeColor, setActiveColor] = useState<ToyColor>('red');
  const [fills, setFills] = useState<Record<number, ToyColor>>({});
  const [done, setDone] = useState(false);

  const scene = SCENES[round];
  const upper = script === 'cyr' ? scene.cyrUpper : scene.latUpper;
  const lower = script === 'cyr' ? scene.cyrLower : scene.latLower;
  const word = script === 'cyr' ? scene.wordCyr : scene.wordLat;

  const paintRegion = (index: number) => {
    if (done) return;
    const next = { ...fills, [index]: activeColor };
    setFills(next);
    if (Object.keys(next).length === REGION_COUNT) {
      setDone(true);
      window.setTimeout(() => {
        if (round + 1 === SCENES.length) return onWin();
        setRound(round + 1);
        setFills({});
        setDone(false);
      }, 850);
    }
  };

  const regionFill = (index: number) => (fills[index] ? toyHex[fills[index]] : '#ffffff');

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <RoundDots total={SCENES.length} current={round} label={g.ui.round(round + 1, SCENES.length)} />
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

      <div className="game-board grid min-h-[min(68vh,540px)] content-between gap-6 p-4 sm:p-7">
        <div className="text-center">
          <span className="inline-block rounded-full border border-line bg-surface px-4 py-1 text-sm font-semibold text-muted">
            {upper} {lower} · {word} ({Object.keys(fills).length}/{REGION_COUNT})
          </span>
        </div>

        <svg
          viewBox="0 0 560 300"
          className={`mx-auto block h-auto w-full max-w-[560px] select-none ${done ? 'bounce-once' : ''}`}
          role="img"
          aria-label={`${upper} ${lower} - ${word}`}
        >
          <rect x="6" y="6" width="548" height="288" rx="24" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />

          {/* Region 0: Veliko slovo */}
          <g onClick={() => paintRegion(0)} className="cursor-pointer transition-transform hover:scale-[1.02]">
            <rect x="24" y="26" width="135" height="190" rx="20" fill={regionFill(0)} stroke="#1e293b" strokeWidth="3.5" />
            <text
              x="91"
              y="148"
              textAnchor="middle"
               dominantBaseline="central"
              fontSize="128"
              fontWeight="800"
              fill={fills[0] ? '#ffffff' : '#ffffff'}
              stroke="#0f172a"
              strokeWidth="4.5"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {upper}
            </text>
          </g>

          {/* Region 1: Malo slovo */}
          <g onClick={() => paintRegion(1)} className="cursor-pointer transition-transform hover:scale-[1.02]">
            <rect x="172" y="76" width="104" height="140" rx="18" fill={regionFill(1)} stroke="#1e293b" strokeWidth="3.5" />
            <text
              x="224"
              y="152"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="96"
              fontWeight="800"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="4"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {lower}
            </text>
          </g>

          {/* Crtež zavisi od runde (Region 2, 3, 4, 5) */}
          {round === 0 && (
            <>
              {/* Jabuka tijelo */}
              <path
                onClick={() => paintRegion(2)}
                className="cursor-pointer"
                d="M410 95 C375 65, 320 90, 325 148 C330 205, 378 238, 410 218 C442 238, 490 205, 495 148 C500 90, 445 65, 410 95 Z"
                fill={regionFill(2)}
                stroke="#0f172a"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* List jabuke */}
              <path
                onClick={() => paintRegion(3)}
                className="cursor-pointer"
                d="M412 88 C425 52, 472 48, 466 82 C452 96, 425 95, 412 88 Z"
                fill={regionFill(3)}
                stroke="#0f172a"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Zvijezda 1 */}
              <polygon
                onClick={() => paintRegion(4)}
                className="cursor-pointer"
                points="330,42 338,60 358,62 343,75 347,94 330,84 313,94 317,75 302,62 322,60"
                fill={regionFill(4)}
                stroke="#0f172a"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Donja traka sa natpisom */}
              <g onClick={() => paintRegion(5)} className="cursor-pointer">
                <rect x="24" y="232" width="512" height="44" rx="14" fill={regionFill(5)} stroke="#0f172a" strokeWidth="3.5" />
                <text x="280" y="255" textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="800" fill="#0f172a">
                  {upper} {lower} — {word.toUpperCase()}
                </text>
              </g>
            </>
          )}

          {round === 1 && (
            <>
              {/* Sunce zraci / vanjski prsten */}
              <circle
                onClick={() => paintRegion(2)}
                className="cursor-pointer"
                cx="415"
                cy="126"
                r="82"
                fill={regionFill(2)}
                stroke="#0f172a"
                strokeWidth="4"
                strokeDasharray="18 8"
              />
              {/* Sunce krug */}
              <circle
                onClick={() => paintRegion(3)}
                className="cursor-pointer"
                cx="415"
                cy="126"
                r="54"
                fill={regionFill(3)}
                stroke="#0f172a"
                strokeWidth="4"
              />
              {/* Oblak */}
              <path
                onClick={() => paintRegion(4)}
                className="cursor-pointer"
                d="M325 198 C305 198, 295 182, 308 168 C306 148, 332 138, 348 152 C362 136, 396 142, 398 164 C416 166, 422 198, 396 198 Z"
                fill={regionFill(4)}
                stroke="#0f172a"
                strokeWidth="3.8"
                strokeLinejoin="round"
              />
              {/* Donja traka */}
              <g onClick={() => paintRegion(5)} className="cursor-pointer">
                <rect x="24" y="232" width="512" height="44" rx="14" fill={regionFill(5)} stroke="#0f172a" strokeWidth="3.5" />
                <text x="280" y="255" textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="800" fill="#0f172a">
                  {upper} {lower} — {word.toUpperCase()}
                </text>
              </g>
            </>
          )}

          {round === 2 && (
            <>
              {/* Krov kuće */}
              <polygon
                onClick={() => paintRegion(2)}
                className="cursor-pointer"
                points="310,115 415,36 520,115"
                fill={regionFill(2)}
                stroke="#0f172a"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Zid kuće */}
              <rect
                onClick={() => paintRegion(3)}
                className="cursor-pointer"
                x="332"
                y="115"
                width="166"
                height="102"
                rx="6"
                fill={regionFill(3)}
                stroke="#0f172a"
                strokeWidth="4"
              />
              {/* Vrata i prozor */}
              <rect
                onClick={() => paintRegion(4)}
                className="cursor-pointer"
                x="356"
                y="148"
                width="46"
                height="69"
                rx="6"
                fill={regionFill(4)}
                stroke="#0f172a"
                strokeWidth="3.5"
              />
              <rect
                onClick={() => paintRegion(5)}
                className="cursor-pointer"
                x="424"
                y="142"
                width="48"
                height="44"
                rx="6"
                fill={regionFill(5)}
                stroke="#0f172a"
                strokeWidth="3.5"
              />
            </>
          )}

          {round === 3 && (
            <>
              {/* Trup rakete */}
              <path
                onClick={() => paintRegion(2)}
                className="cursor-pointer"
                d="M415 34 C452 75, 456 145, 450 185 L380 185 C374 145, 378 75, 415 34 Z"
                fill={regionFill(2)}
                stroke="#0f172a"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Krilca rakete */}
              <path
                onClick={() => paintRegion(3)}
                className="cursor-pointer"
                d="M380 145 L344 192 L380 185 Z M450 145 L486 192 L450 185 Z"
                fill={regionFill(3)}
                stroke="#0f172a"
                strokeWidth="3.8"
                strokeLinejoin="round"
              />
              {/* Prozor rakete */}
              <circle
                onClick={() => paintRegion(4)}
                className="cursor-pointer"
                cx="415"
                cy="118"
                r="24"
                fill={regionFill(4)}
                stroke="#0f172a"
                strokeWidth="3.8"
              />
              {/* Plamen rakete */}
              <path
                onClick={() => paintRegion(5)}
                className="cursor-pointer"
                d="M392 185 L415 226 L438 185 Z"
                fill={regionFill(5)}
                stroke="#0f172a"
                strokeWidth="3.8"
                strokeLinejoin="round"
              />
            </>
          )}
        </svg>

        {/* Paleta boja */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {TOY_COLORS.map((c) => {
            const selected = activeColor === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActiveColor(c)}
                aria-label={g.colorNames[c]}
                aria-pressed={selected}
                className={`focus-ring flex items-center gap-2 rounded-2xl border-2 px-3.5 py-2.5 font-semibold transition-transform ${
                  selected ? 'scale-110 border-ink bg-surface shadow-md' : 'border-transparent bg-surface/70 hover:scale-105'
                }`}
              >
                <span
                  className="h-7 w-7 rounded-full border border-black/20"
                  style={{ background: toyHex[c] }}
                />
                <span className="text-sm capitalize">{g.colorNames[c]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

