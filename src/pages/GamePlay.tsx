import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Printer, RotateCcw, Star } from 'lucide-react';
import Icon from '../components/Icon';
import NotFound from './NotFound';
import { useLocale } from '../i18n/LocaleContext';
import { GAME_IDS, hasWorksheet, isGameId, worksheetsFor, type GameId, type WorksheetId } from '../games/ids';
import { games } from '../games/registry';
import { usePageMeta } from '../lib/usePageMeta';
import { pageMeta } from '../lib/seo';

export default function GamePlay() {
  const { gameId } = useParams();
  if (!isGameId(gameId)) return <NotFound />;
  return <GameStage key={gameId} id={gameId} />;
}

function GameStage({ id }: { id: GameId }) {
  const { locale, t, paths } = useLocale();
  const g = t.games;
  const { Component, skills } = games[id];
  const text = g.list[id];
  usePageMeta(pageMeta.game(t, id));
  const [attempt, setAttempt] = useState(0);
  const [won, setWon] = useState(false);
  const againRef = useRef<HTMLButtonElement>(null);
  const nextId = GAME_IDS[(GAME_IDS.indexOf(id) + 1) % GAME_IDS.length];
  const availableSheets = worksheetsFor(locale);
  const linkedSheets: WorksheetId[] = hasWorksheet(id)
    ? [id]
    : id === 'coloring'
      ? (['coloringLatin', 'coloringCyrillic'] as WorksheetId[]).filter((s) => availableSheets.includes(s))
      : id === 'letters'
        ? (['initialLetterLatin', 'initialLetterCyrillic'] as WorksheetId[]).filter((s) => availableSheets.includes(s))
        : [];

  const onWin = useCallback(() => setWon(true), []);

  useEffect(() => {
    if (won) againRef.current?.focus();
  }, [won]);

  const playAgain = () => {
    setWon(false);
    setAttempt((n) => n + 1);
  };

  return (
    <div className="wrap max-w-[880px] pt-[96px] sm:pt-[130px]">
      <Link
        to={paths.games}
        className="focus-ring inline-flex items-center gap-2 rounded text-sm font-semibold text-muted transition-colors hover:text-accent"
      >
        <Icon name="back" size={14} />
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
        {linkedSheets.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {linkedSheets.map((sheetId) => (
              <Link
                key={sheetId}
                to={paths.worksheet(sheetId)}
                className="focus-ring inline-flex items-center gap-2 rounded text-sm font-semibold text-accent hover:underline"
              >
                <Printer aria-hidden="true" className="h-4 w-4" />
                {linkedSheets.length > 1 ? g.worksheet.sheets[sheetId].title : g.worksheet.link}
              </Link>
            ))}
          </div>
        )}
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
                  <Icon name="arrow" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
