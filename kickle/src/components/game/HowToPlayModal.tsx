'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Props { onClose: () => void; }

const TILES = [
  { result: 'correct', label: 'Club',     desc: 'Exact match' },
  { result: 'close',   label: 'Age 28',   desc: 'Close (within 2 years / 3 shirt numbers / same position group)' },
  { result: 'wrong',   label: 'League',   desc: 'No match' },
];

const COLS = ['Club', 'Nation', 'Pos', 'Age', 'League', '#', 'Foot'];

export default function HowToPlayModal({ onClose }: Props) {
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
          className="w-full max-w-md bg-bg-card border border-border rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[85vh]"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-2xl font-black tracking-widest text-white">HOW TO PLAY</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-bg-hover text-slate-400 hover:text-white transition-colors text-xl">×</button>
          </div>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>Guess the mystery footballer in <strong className="text-white">8 tries</strong>. A new player every day!</p>

            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-semibold">Columns</p>
              <div className="grid grid-cols-7 gap-1 mb-1">
                {COLS.map((c) => (
                  <div key={c} className="text-center text-[9px] font-bold text-slate-400 uppercase bg-bg-secondary rounded px-0.5 py-1">{c}</div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-semibold">Colour Guide</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-tile-green flex items-center justify-center text-white font-bold text-xs flex-shrink-0">✓</div>
                  <p><strong className="text-green-400">Green</strong> — Exact match</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-tile-yellow flex items-center justify-center text-black font-bold text-xs flex-shrink-0">~</div>
                  <p><strong className="text-yellow-400">Yellow</strong> — Close (age ±2, shirt ±3, similar position)</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-tile-gray flex items-center justify-center text-slate-300 font-bold text-xs flex-shrink-0">✗</div>
                  <p><strong className="text-slate-400">Grey</strong> — No match</p>
                </div>
              </div>
            </div>

            <div className="bg-bg-secondary rounded-xl p-3 text-xs text-slate-400 space-y-1">
              <p>⬆️ <strong className="text-white">Arrow on Age/Shirt #</strong> — mystery player is higher (↑) or lower (↓)</p>
              <p>🔴 Position: GK, DEF, MID, ATT grouping for yellow match</p>
              <p>🟡 Hints available — but they reduce your leaderboard score</p>
            </div>

            <p className="text-xs text-slate-500">Sign in to track your streak and compete on the leaderboard!</p>
          </div>

          <button onClick={onClose} className="btn-primary w-full mt-6">Got It — Let's Play!</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
