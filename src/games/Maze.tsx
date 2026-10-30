import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Carrot, Rabbit } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import { RoundDots, toyHex, type GameProps } from './shared';

// S = zec, E = šargarepa, # = živa ograda, . = staza
const MAZES = [
  ['S...#', '###.#', '#...#', '#.###', '#...E'],
  ['S.#...', '.##.#.', '....#.', '#.###.', '#.....', '###.#E'],
  ['S.....#', '#####.#', '...#..#', '.#.#.##', '.#.....', '.#####E'],
];

interface Cell {
  r: number;
  c: number;
}

function find(maze: string[], ch: string): Cell {
  const r = maze.findIndex((row) => row.includes(ch));
  return { r, c: maze[r].indexOf(ch) };
}

const key = ({ r, c }: Cell) => `${r}:${c}`;

export default function Maze({ onWin }: GameProps) {
  const { t } = useLocale();
  const g = t.games;
  const [round, setRound] = useState(0);
  const maze = MAZES[round];
  const [pos, setPos] = useState(() => find(MAZES[0], 'S'));
  const [trail, setTrail] = useState<Set<string>>(() => new Set([key(find(MAZES[0], 'S'))]));
  const gridRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const finished = useRef(false);
  const goal = find(maze, 'E');
  const rows = maze.length;
  const cols = maze[0].length;

  const open = ({ r, c }: Cell) => r >= 0 && r < rows && c >= 0 && c < cols && maze[r][c] !== '#';

  // Prst sme da preskoči više polja odjednom, ali samo pravo i kroz otvorenu stazu.
  const moveTo = (target: Cell) => {
    if (finished.current || (target.r !== pos.r && target.c !== pos.c)) return;
    const dr = Math.sign(target.r - pos.r);
    const dc = Math.sign(target.c - pos.c);
    const steps: Cell[] = [];
    let cur = pos;
    while (cur.r !== target.r || cur.c !== target.c) {
      cur = { r: cur.r + dr, c: cur.c + dc };
      if (!open(cur)) break;
      steps.push(cur);
    }
    if (steps.length === 0) return;
    const last = steps[steps.length - 1];
    setPos(last);
    setTrail((prev) => new Set([...prev, ...steps.map(key)]));
    if (last.r === goal.r && last.c === goal.c) {
      finished.current = true;
      window.setTimeout(() => {
        if (round + 1 === MAZES.length) return onWin();
        const start = find(MAZES[round + 1], 'S');
        setRound(round + 1);
        setPos(start);
        setTrail(new Set([key(start)]));
        finished.current = false;
      }, 700);
    }
  };

  const cellAt = (e: PointerEvent<HTMLDivElement>): Cell | null => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const c = Math.floor(((e.clientX - rect.left) / rect.width) * cols);
    const r = Math.floor(((e.clientY - rect.top) / rect.height) * rows);
    return { r, c };
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, Cell> = {
      ArrowUp: { r: pos.r - 1, c: pos.c },
      ArrowDown: { r: pos.r + 1, c: pos.c },
      ArrowLeft: { r: pos.r, c: pos.c - 1 },
      ArrowRight: { r: pos.r, c: pos.c + 1 },
    };
    const target = moves[e.key];
    if (!target) return;
    e.preventDefault();
    moveTo(target);
  };

  return (
    <div className="grid gap-4">
      <RoundDots total={MAZES.length} current={round} label={g.ui.round(round + 1, MAZES.length)} />
      <div className="game-board grid place-items-center p-3 sm:p-6">
        <div
          ref={gridRef}
          role="application"
          tabIndex={0}
          aria-label={g.ui.maze}
          onKeyDown={onKey}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            dragging.current = true;
            const cell = cellAt(e);
            if (cell) moveTo(cell);
          }}
          onPointerMove={(e) => {
            if (!dragging.current) return;
            const cell = cellAt(e);
            if (cell && (cell.r !== pos.r || cell.c !== pos.c)) moveTo(cell);
          }}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
          className="focus-ring grid w-[min(100%,560px)] gap-1 rounded-xl select-none"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, touchAction: 'none' }}
        >
          {maze.flatMap((row, r) =>
            [...row].map((ch, c) => {
              const wall = ch === '#';
              const here = pos.r === r && pos.c === c;
              const visited = trail.has(key({ r, c }));
              return (
                <div
                  key={`${round}-${r}-${c}`}
                  className="relative grid aspect-square place-items-center rounded-lg"
                  style={{
                    background: wall
                      ? toyHex.green
                      : visited
                        ? `color-mix(in srgb, ${toyHex.yellow} 35%, var(--surface))`
                        : 'var(--surface)',
                  }}
                >
                  {wall && <span className="absolute inset-[18%] rounded-full bg-black/10" />}
                  {ch === 'E' && !here && <Carrot aria-hidden="true" className="h-3/5 w-3/5" color={toyHex.orange} />}
                  {here && <Rabbit aria-hidden="true" className="pop-in h-3/5 w-3/5 text-ink" />}
                </div>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}
