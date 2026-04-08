'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { loadLocalStats, type LocalStats, DEFAULT_STATS } from '@/lib/game';

interface Props { onClose: () => void; }

export default function StatsModal({ onClose }: Props) {
  const [stats, setStats] = useState<LocalStats>(DEFAULT_STATS);

  useEffect(() => {
    setStats(loadLocalStats());
  }, []);

  const winPct = stats.games_played > 0
    ? Math.round((stats.games_won / stats.games_played) * 100)
    : 0;

  const avgGuesses = stats.games_won > 0
    ? (stats.total_guesses / stats.games_won).toFixed(1)
    : '-';

  const maxDist = Math.max(...Object.values(stats.guess_distribution), 1);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className="w-full max-w-sm bg-bg-card border border-border rounded-2xl p-6 shadow-2xl"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-2xl font-black tracking-widest text-white">YOUR STATS</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-bg-hover text-slate-400 hover:text-white transition-colors text-xl">×</button>
          </div>

          {/* Summary grid */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {[
              { val: stats.games_played, label: 'Played' },
              { val: `${winPct}%`, label: 'Win %' },
              { val: stats.current_streak, label: 'Streak' },
              { val: stats.best_streak, label: 'Best' },
            ].map((s) => (
              <div key={s.label} className="bg-bg-secondary rounded-xl p-3 text-center">
                <div className="font-display text-2xl font-black text-white">{s.val}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Average */}
          <div className="bg-bg-secondary rounded-xl p-3 flex items-center justify-between mb-5">
            <span className="text-xs text-slate-400 uppercase tracking-wide">Avg Guesses</span>
            <span className="font-display text-xl font-bold text-brand">{avgGuesses}</span>
          </div>

          {/* Distribution */}
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-semibold">Guess Distribution</p>
            <div className="space-y-1.5">
              {[1,2,3,4,5,6,7,8].map((n) => {
                const count = stats.guess_distribution[String(n)] || 0;
                const pct = Math.round((count / maxDist) * 100);
                return (
                  <div key={n} className="flex items-center gap-2 text-xs">
                    <span className="w-3 text-slate-400 text-right">{n}</span>
                    <div className="flex-1 bg-bg-tertiary rounded h-5 overflow-hidden">
                      <motion.div
                        className="h-full bg-brand rounded flex items-center justify-end pr-1.5"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(pct, count > 0 ? 8 : 0)}%` }}
                        transition={{ delay: n * 0.05, duration: 0.5 }}
                      >
                        {count > 0 && <span className="text-[9px] font-bold text-bg-primary">{count}</span>}
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button onClick={onClose} className="btn-ghost w-full mt-5">Close</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
