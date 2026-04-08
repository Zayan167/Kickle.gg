'use client';

import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { generateShareText } from '@/lib/game';
import type { GuessResult, GameStatus, Player } from '@/types';

interface Props {
  guesses: GuessResult[];
  mysteryPlayer: Player;
  status: GameStatus;
  puzzleNumber: number;
  hintsUsed: number;
  onClose: () => void;
}

const EMOJI: Record<string, string> = { correct: '🟩', close: '🟨', wrong: '⬜' };

export default function ResultModal({ guesses, mysteryPlayer, status, puzzleNumber, hintsUsed, onClose }: Props) {
  const won = status === 'won';

  const shareText = generateShareText(guesses, puzzleNumber, won);

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success('Copied to clipboard!');
    } catch {
      toast.error('Could not copy');
    }
  };

  const EmojiGrid = () => (
    <div className="space-y-1 my-4">
      {guesses.map((g, i) => (
        <div key={i} className="flex gap-0.5 justify-center">
          {[g.club, g.nationality, g.position, g.age, g.league, g.shirt_number, g.preferred_foot].map((r, j) => (
            <span key={j} className="text-lg leading-none">{EMOJI[r]}</span>
          ))}
        </div>
      ))}
    </div>
  );

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
          initial={{ y: 60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          {/* Status */}
          <div className="text-center mb-5">
            <div className="text-5xl mb-2">{won ? '🎉' : '😤'}</div>
            <h2 className={`font-display text-3xl font-black tracking-widest ${won ? 'text-brand' : 'text-red-400'}`}>
              {won ? 'NAILED IT!' : 'GAME OVER'}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {won
                ? `You got it in ${guesses.length} guess${guesses.length > 1 ? 'es' : ''}!`
                : `The player was ${mysteryPlayer.name}`}
            </p>
            {hintsUsed > 0 && (
              <span className="inline-block mt-2 text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full px-3 py-1">
                Used {hintsUsed} hint{hintsUsed > 1 ? 's' : ''} (Assisted)
              </span>
            )}
          </div>

          {/* Mystery player card */}
          <div className="bg-bg-secondary rounded-xl p-3 flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-bg-tertiary border border-border flex items-center justify-center text-lg font-bold text-brand flex-shrink-0">
              {mysteryPlayer.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <p className="font-bold text-white text-sm">{mysteryPlayer.name}</p>
              <p className="text-xs text-slate-400">{mysteryPlayer.club} · {mysteryPlayer.nationality}</p>
              <p className="text-xs text-slate-500">{mysteryPlayer.league}</p>
            </div>
          </div>

          {/* Emoji grid */}
          <EmojiGrid />

          {/* Buttons */}
          <div className="space-y-2 mt-4">
            <button
              onClick={copyShare}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2"
            >
              <span>📤</span> Share Result
            </button>
            <button
              onClick={onClose}
              className="w-full btn-ghost py-3"
            >
              Close
            </button>
          </div>

          {/* Next puzzle countdown */}
          <p className="text-center text-xs text-slate-600 mt-4">
            Next puzzle at midnight · KICKLE #{puzzleNumber + 1}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
