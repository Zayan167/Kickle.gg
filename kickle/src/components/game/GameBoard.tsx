'use client';

import { motion } from 'framer-motion';
import type { GuessResult, TileResult } from '@/types';
import { cn, getTileClasses, truncate, getPositionLabel } from '@/lib/utils';

interface Props {
  guesses: GuessResult[];
}

interface TileProps {
  result: TileResult;
  value: string;
  direction?: 'up' | 'down';
  delay?: number;
}

function Tile({ result, value, direction, delay = 0 }: TileProps) {
  const base = 'aspect-square rounded-lg border flex flex-col items-center justify-center text-center transition-all overflow-hidden';
  const colors = {
    correct: 'bg-tile-green border-tile-green/60 text-white',
    close:   'bg-tile-yellow border-tile-yellow/60 text-gray-900',
    wrong:   'bg-tile-gray border-white/5 text-slate-300',
  };

  return (
    <motion.div
      className={cn(base, colors[result])}
      initial={{ rotateX: 90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ delay, duration: 0.35, ease: 'easeOut' }}
      style={{ perspective: 400 }}
    >
      <span className="text-[9px] sm:text-[10px] font-bold leading-tight px-0.5 break-words text-center max-w-full">
        {truncate(value, 10)}
      </span>
      {direction && (
        <span className="text-[10px] leading-none mt-0.5">
          {direction === 'up' ? '↑' : '↓'}
        </span>
      )}
    </motion.div>
  );
}

export default function GameBoard({ guesses }: Props) {
  if (guesses.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5">
      {guesses.map((g, rowIdx) => (
        <motion.div
          key={rowIdx}
          className="grid grid-cols-7 gap-1.5"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Tile result={g.club}           value={g.player.club}                         delay={rowIdx === guesses.length - 1 ? 0 : 0} />
          <Tile result={g.nationality}    value={g.player.nationality}                  delay={rowIdx === guesses.length - 1 ? 0.1 : 0} />
          <Tile result={g.position}       value={g.player.position}                     delay={rowIdx === guesses.length - 1 ? 0.2 : 0} />
          <Tile result={g.age}            value={String(g.player.age)} direction={g.age !== 'correct' ? g.age_direction : undefined} delay={rowIdx === guesses.length - 1 ? 0.3 : 0} />
          <Tile result={g.league}         value={g.player.league.replace(' League','').replace('Bundesliga','BL').replace('Ligue 1','L1').replace('Saudi Pro League','SPL')} delay={rowIdx === guesses.length - 1 ? 0.4 : 0} />
          <Tile result={g.shirt_number}   value={String(g.player.shirt_number)} direction={g.shirt_number !== 'correct' ? g.shirt_direction : undefined} delay={rowIdx === guesses.length - 1 ? 0.5 : 0} />
          <Tile result={g.preferred_foot} value={g.player.preferred_foot.slice(0, 1)}   delay={rowIdx === guesses.length - 1 ? 0.6 : 0} />
        </motion.div>
      ))}
    </div>
  );
}
