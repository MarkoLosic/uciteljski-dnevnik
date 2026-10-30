import { useCallback, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import type { Shape, ToyColor } from './ids';

// Boje igračaka su sadržaj igre, ne tema sajta: iste su u tamnoj i svetloj temi.
export const toyHex: Record<ToyColor, string> = {
  red: '#ef4444',
  blue: '#3b82f6',
  yellow: '#facc15',
  green: '#22c55e',
  purple: '#a855f7',
  orange: '#f97316',
};

export interface GameProps {
  onWin: () => void;
}

export function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export const shapePaths: Record<Shape, string> = {
  circle: 'M50 8a42 42 0 1 1 0 84a42 42 0 1 1 0-84z',
  square: 'M14 14h72v72h-72z',
  triangle: 'M50 10l42 78h-84z',
  star: 'M50 6l12.9 27.3 29.9 3.7-22 20.6 5.7 29.6L50 72.6 23.5 87.2l5.7-29.6-22-20.6 29.9-3.7z',
  heart: 'M50 88C20 66 6 50 6 32 6 18 17 8 30 8c9 0 16 5 20 12 4-7 11-12 20-12 13 0 24 10 24 24 0 18-14 34-44 56z',
};

interface ShapeIconProps {
  shape: Shape;
  color?: string;
  outline?: boolean;
  className?: string;
}

export function ShapeIcon({ shape, color = 'currentColor', outline = false, className }: ShapeIconProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <path
        d={shapePaths[shape]}
        fill={outline ? 'none' : color}
        stroke={outline ? color : 'rgba(0,0,0,.18)'}
        strokeWidth={outline ? 5 : 3}
        strokeDasharray={outline ? '10 8' : undefined}
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface RoundDotsProps {
  total: number;
  current: number;
  label: string;
}

export function RoundDots({ total, current, label }: RoundDotsProps) {
  return (
    <div className="flex justify-center gap-2" role="img" aria-label={label}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-3 w-3 rounded-full transition-colors ${i < current ? 'bg-accent' : i === current ? 'bg-accent-2' : 'bg-line-strong'}`}
        />
      ))}
    </div>
  );
}

// Kratko „odmahivanje“ elementa kada dete pogreši — bez kazne, samo znak da pokuša ponovo.
export function useShake() {
  const [shaking, setShaking] = useState<string | null>(null);
  const shake = useCallback((id: string) => {
    setShaking(id);
    window.setTimeout(() => setShaking((current) => (current === id ? null : current)), 450);
  }, []);
  return { shaking, shake };
}

interface DragState {
  id: string;
  startX: number;
  startY: number;
  dx: number;
  dy: number;
}

// Predmet se može prevući prstom/mišem na cilj, ili dodirnuti pa dodirnuti cilj (lakše za najmlađe,
// a radi i sa tastaturom). Cilj se traži preko `data-drop` atributa ispod tačke puštanja.
export function useDragDrop(onDrop: (itemId: string, targetId: string) => void) {
  const [drag, setDrag] = useState<DragState | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const movedRef = useRef(false);

  const itemProps = (id: string) => ({
    onPointerDown: (e: PointerEvent<HTMLElement>) => {
      if (e.button !== 0) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      movedRef.current = false;
      setDrag({ id, startX: e.clientX, startY: e.clientY, dx: 0, dy: 0 });
    },
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      if (!drag || drag.id !== id) return;
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      if (Math.hypot(dx, dy) > 8) movedRef.current = true;
      setDrag({ ...drag, dx, dy });
    },
    onPointerUp: (e: PointerEvent<HTMLElement>) => {
      if (!drag || drag.id !== id) return;
      setDrag(null);
      if (!movedRef.current) return;
      const target = document
        .elementsFromPoint(e.clientX, e.clientY)
        .find((el): el is HTMLElement => el instanceof HTMLElement && el.dataset.drop !== undefined);
      setSelected(null);
      if (target?.dataset.drop) onDrop(id, target.dataset.drop);
    },
    onPointerCancel: () => setDrag(null),
    onClick: () => {
      if (movedRef.current) {
        movedRef.current = false;
        return;
      }
      setSelected((current) => (current === id ? null : id));
    },
    'aria-pressed': selected === id,
    style: {
      touchAction: 'none',
      ...(drag?.id === id
        ? { transform: `translate(${drag.dx}px, ${drag.dy}px) scale(1.08)`, zIndex: 20, transition: 'none', cursor: 'grabbing' }
        : { cursor: 'grab' }),
    } satisfies CSSProperties,
  });

  const targetProps = (targetId: string) => ({
    'data-drop': targetId,
    onClick: () => {
      if (!selected) return;
      onDrop(selected, targetId);
      setSelected(null);
    },
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
      if ((e.key === 'Enter' || e.key === ' ') && selected) {
        e.preventDefault();
        onDrop(selected, targetId);
        setSelected(null);
      }
    },
  });

  return { selected, dragging: drag?.id ?? null, itemProps, targetProps };
}
