import type { ComponentType } from 'react';
import { Balloon, Blocks, Brain, Hash, Rabbit, Repeat, Ruler, Shapes, Spline, Waypoints, type LucideIcon } from 'lucide-react';
import type { GameId, Skill } from './ids';
import type { GameProps } from './shared';
import Balloons from './Balloons';
import ColorSort from './ColorSort';
import ShapeMatch from './ShapeMatch';
import Trace from './Trace';
import ConnectDots from './ConnectDots';
import Maze from './Maze';
import Memory from './Memory';
import Pattern from './Pattern';
import Count from './Count';
import Sizes from './Sizes';

interface GameDefinition {
  Component: ComponentType<GameProps>;
  Icon: LucideIcon;
  color: string; // CSS boja kartice (iz palete sajta, menja se sa temom)
  skills: Skill[];
}

// Redosled je redosled na stranici: od najjednostavnijih pokreta ka igrama koje traže više razmišljanja.
export const games: Record<GameId, GameDefinition> = {
  balloons: { Component: Balloons, Icon: Balloon, color: 'var(--accent)', skills: ['eyeHand', 'fine'] },
  colors: { Component: ColorSort, Icon: Blocks, color: 'var(--cat-amber)', skills: ['fine', 'logic'] },
  shapes: { Component: ShapeMatch, Icon: Shapes, color: 'var(--accent-2)', skills: ['fine', 'logic'] },
  trace: { Component: Trace, Icon: Spline, color: 'var(--cat-purple)', skills: ['fine', 'eyeHand'] },
  dots: { Component: ConnectDots, Icon: Waypoints, color: 'var(--accent)', skills: ['counting', 'eyeHand'] },
  maze: { Component: Maze, Icon: Rabbit, color: 'var(--cat-amber)', skills: ['fine', 'logic'] },
  memory: { Component: Memory, Icon: Brain, color: 'var(--accent-2)', skills: ['memory'] },
  pattern: { Component: Pattern, Icon: Repeat, color: 'var(--cat-purple)', skills: ['logic'] },
  count: { Component: Count, Icon: Hash, color: 'var(--accent)', skills: ['counting'] },
  sizes: { Component: Sizes, Icon: Ruler, color: 'var(--cat-amber)', skills: ['logic', 'eyeHand'] },
};
