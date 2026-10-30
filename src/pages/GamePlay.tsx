import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RotateCcw, Star } from 'lucide-react';
import PixelIcon from '../components/PixelIcon';
import NotFound from './NotFound';
import { useLocale } from '../i18n/LocaleContext';
import { GAME_IDS, isGameId, type GameId } from '../games/ids';
import { games } from '../games/registry';

export default function GamePlay() {
  const { gameId } = useParams();
  if (!isGameId(gameId)) return <NotFound />;
  return <GameStage key={gameId} id={gameId} />;
}

function GameStage({ id }: { id: GameId }) {
  const { t, paths } = useLocale();
  const g = t.games;
  const { Component, skills } = games[id];
  const text = g.list[id];
  const [attempt, setAttempt] = useState(0);
  const [won, setWon] = useState(false);
  const againRef = useRef<HTMLButtonElement>(null);
  const nextId = GAME_IDS[(GAME_IDS.indexOf(id) + 1) % GAME_IDS.length];

  const onWin = useCallback(() => setWon(true), []);

  useEffect(() => {
    if (won) againRef.current?.focus();
  }, [won]);

  const playAgain = () => {
    setWon(false);
    setAttempt((n) => n + 1);
  };

  return (
    <div className="wrap max-w-[880px] pt-[130px]">
      <Link
        to={paths.games}
        className="focus-ring inline-flex items-center gap-2 rounded text-sm font-semibold text-muted transition-colors hover:text-accent"
      >
        <PixelIcon name="back" size={14} />
        {g.back}
      </Link>
      <header className="mt-5 mb-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="cat">
              {g.skills[skill]}
            </span>
          ))}
        </div>
        <h1 className="font-head text-[clamp(30px,4.6vw,48px)] leading-[1.1] font-bold tracking-[-0.03em]">{text.title}</h1>
        <p className="mt-3 max-w-[640px] text-[17px] text-muted">{text.howTo}</p>
      </header>

      <div className="relative">
        <div aria-hidden={won || undefined}>
          <Component key={attempt} onWin={onWin} />
        </div>
        {won && (
          <div
            role="status"
            className="win-overlay absolute inset-0 z-30 grid place-items-center rounded-[24px] p-6 text-center"
          >
            <div>
              <div className="flex justify-center gap-2" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <Star
                    key={i}
                    className="win-star h-12 w-12 sm:h-16 sm:w-16"
                    style={{ animationDelay: `${i * 120}ms` }}
                    fill="#facc15"
                    color="#eab308"
                  />
                ))}
              </div>
              <p className="grad mt-4 font-head text-[clamp(40px,8vw,72px)] leading-none font-bold tracking-[-0.03em]">
                {g.win}
              </p>
              <p className="mt-3 text-lg text-muted">{g.winText}</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <button ref={againRef} type="button" onClick={playAgain} className="btn btn-ghost focus-ring">
                  <RotateCcw aria-hidden="true" className="h-[18px] w-[18px]" />
                  {g.again}
                </button>
                <Link to={paths.game(nextId)} className="btn btn-primary focus-ring">
                  {g.next}: {g.list[nextId].title}
                  <PixelIcon name="arrow" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
