'use client';

import { motion } from 'framer-motion';
import type { Player } from '@/types';

interface Props {
  hintsUsed: number;
  revealedHints: string[];
  mysteryPlayer: Player;
  onRevealHint: (type: string) => void;
}

const HINTS = [
  { type: 'league',    label: 'Hint 1',  desc: 'Reveal League',    icon: '🏟️' },
  { type: 'position',  label: 'Hint 2',  desc: 'Reveal Position',  icon: '📍' },
  { type: 'initial',   label: 'Hint 3',  desc: 'Reveal First Letter', icon: '🔤' },
];

export default function HintPanel({ hintsUsed, revealedHints, mysteryPlayer, onRevealHint }: Props) {
  const getHintValue = (type: string) => {
    if (type === 'league')   return mysteryPlayer.league;
    if (type === 'position') return mysteryPlayer.position;
    if (type === 'initial')  return `"${mysteryPlayer.name[0]}"`;
    return '';
  };

  return (
    <div className="bg-bg-card border border-border rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Hints</p>
        <span className="text-xs text-slate-600 bg-bg-tertiary px-2 py-0.5 rounded-full">
          Reduces score
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {HINTS.map((hint, i) => {
          const revealed = revealedHints.includes(hint.type);
          const available = i <= hintsUsed && !revealed;
          const locked = i > hintsUsed;

          return (
            <motion.button
              key={hint.type}
              onClick={() => !revealed && !locked && onRevealHint(hint.type)}
              disabled={locked || revealed}
              whileTap={!locked && !revealed ? { scale: 0.96 } : {}}
              className={`relative rounded-xl p-3 text-center transition-all border ${
                revealed
                  ? 'bg-brand/10 border-brand/30 cursor-default'
                  : locked
                  ? 'bg-bg-secondary/40 border-border/50 opacity-40 cursor-not-allowed'
                  : 'bg-bg-secondary border-border hover:border-brand/50 hover:bg-brand/5 cursor-pointer'
              }`}
            >
              <div className="text-xl mb-1">{hint.icon}</div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{hint.label}</p>
              {revealed ? (
                <p className="text-xs font-bold text-brand mt-0.5">{getHintValue(hint.type)}</p>
              ) : (
                <p className="text-[10px] text-slate-500 mt-0.5">{hint.desc}</p>
              )}
              {locked && (
                <span className="absolute top-2 right-2 text-slate-600 text-xs">🔒</span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
