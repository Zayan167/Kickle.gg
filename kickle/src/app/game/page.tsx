'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import GameBoard from '@/components/game/GameBoard';
import SearchBar from '@/components/game/SearchBar';
import HintPanel from '@/components/game/HintPanel';
import ResultModal from '@/components/game/ResultModal';
import HowToPlayModal from '@/components/game/HowToPlayModal';
import StatsModal from '@/components/game/StatsModal';
import ColumnHeaders from '@/components/game/ColumnHeaders';
import { getDailyPlayer, getPlayerById } from '@/lib/players';
import { evaluateGuess, saveLocalState, loadLocalState, updateStatsAfterGame, loadLocalStats, saveLocalStats } from '@/lib/game';
import { formatDate, getDayNumber } from '@/lib/utils';
import type { Player, GuessResult, GameStatus } from '@/types';

const MAX_GUESSES = 8;

interface SavedState {
  date: string;
  mysteryId: number;
  guesses: GuessResult[];
  status: GameStatus;
  hintsUsed: number;
}

export default function GamePage() {
  const today = formatDate(new Date());
  const puzzleNumber = getDayNumber(today);
  const mysteryPlayer = getDailyPlayer(today);

  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showHow, setShowHow] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [revealedHints, setRevealedHints] = useState<string[]>([]);
  const [guessedIds, setGuessedIds] = useState<Set<number>>(new Set());

  // Restore from localStorage
  useEffect(() => {
    const saved = loadLocalState() as SavedState | null;
    if (saved && saved.date === today && saved.mysteryId === mysteryPlayer.id) {
      setGuesses(saved.guesses);
      setStatus(saved.status);
      setHintsUsed(saved.hintsUsed || 0);
      setGuessedIds(new Set(saved.guesses.map((g) => g.player.id)));
      if (saved.status !== 'playing') {
        setTimeout(() => setShowResult(true), 500);
      }
    }
  }, [today, mysteryPlayer.id]);

  const persist = useCallback(
    (g: GuessResult[], s: GameStatus, h: number) => {
      saveLocalState({ date: today, mysteryId: mysteryPlayer.id, guesses: g, status: s, hintsUsed: h });
    },
    [today, mysteryPlayer.id]
  );

  const handleGuess = useCallback(
    (player: Player) => {
      if (status !== 'playing') return;
      if (guessedIds.has(player.id)) {
        toast.error('Already guessed this player!');
        return;
      }

      const result = evaluateGuess(player, mysteryPlayer);
      const newGuesses = [...guesses, result];
      const newGuessedIds = new Set([...guessedIds, player.id]);
      setGuesses(newGuesses);
      setGuessedIds(newGuessedIds);

      let newStatus: GameStatus = 'playing';
      if (result.is_correct) {
        newStatus = 'won';
        toast.success(player.name === mysteryPlayer.name ? '⚽ Got it!' : 'Correct!', { duration: 2000 });
      } else if (newGuesses.length >= MAX_GUESSES) {
        newStatus = 'lost';
      }

      setStatus(newStatus);
      persist(newGuesses, newStatus, hintsUsed);

      if (newStatus !== 'playing') {
        const stats = loadLocalStats();
        const updated = updateStatsAfterGame(stats, newStatus === 'won', newGuesses.length, today);
        saveLocalStats(updated);
        setTimeout(() => setShowResult(true), newStatus === 'won' ? 1800 : 800);
      }
    },
    [status, guessedIds, guesses, mysteryPlayer, hintsUsed, persist, today]
  );

  const handleHint = useCallback(
    (hintType: string) => {
      const newCount = hintsUsed + 1;
      setHintsUsed(newCount);
      setRevealedHints((prev) => [...prev, hintType]);
      persist(guesses, status, newCount);
    },
    [hintsUsed, guesses, status, persist]
  );

  const guessesLeft = MAX_GUESSES - guesses.length;

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Ambient */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand/4 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg-primary/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-black tracking-widest text-brand">
            KICKLE
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowHow(true)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-bg-hover transition-colors text-slate-400 hover:text-white text-lg"
              title="How to play"
            >?</button>
            <button
              onClick={() => setShowStats(true)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-bg-hover transition-colors text-slate-400 hover:text-white text-base"
              title="Stats"
            >📊</button>
            <Link
              href="/leaderboard"
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-bg-hover transition-colors text-slate-400 hover:text-white text-base"
              title="Leaderboard"
            >🏆</Link>
            <Link
              href="/login"
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-bg-hover transition-colors text-slate-400 hover:text-white text-base"
              title="Account"
            >👤</Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col gap-5">

        {/* Puzzle info */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest">Daily Puzzle</p>
            <h1 className="font-display text-2xl font-bold tracking-wide text-white">
              #{puzzleNumber} · {new Date(today).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </h1>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Guesses left</p>
            <p className={`font-display text-2xl font-bold ${guessesLeft <= 2 ? 'text-red-400' : 'text-white'}`}>
              {guessesLeft}/{MAX_GUESSES}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-bg-tertiary rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-brand rounded-full transition-all duration-500"
            style={{ width: `${(guesses.length / MAX_GUESSES) * 100}%` }}
          />
        </div>

        {/* Search */}
        {status === 'playing' && (
          <SearchBar onGuess={handleGuess} guessedIds={guessedIds} />
        )}

        {/* Column headers */}
        <ColumnHeaders />

        {/* Game board */}
        <GameBoard guesses={guesses} />

        {/* Empty rows */}
        {status === 'playing' && Array.from({ length: Math.max(0, MAX_GUESSES - guesses.length) }).map((_, i) => (
          <div key={i} className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 7 }).map((_, j) => (
              <div key={j} className="aspect-square rounded-lg border border-white/4 bg-bg-secondary/40" />
            ))}
          </div>
        ))}

        {/* Hints */}
        {status === 'playing' && (
          <HintPanel
            hintsUsed={hintsUsed}
            revealedHints={revealedHints}
            mysteryPlayer={mysteryPlayer}
            onRevealHint={handleHint}
          />
        )}

        {/* Game over banner (no modal) */}
        {status === 'lost' && !showResult && (
          <div className="card p-4 border-red-500/30 bg-red-500/5 text-center">
            <p className="text-red-400 font-semibold text-sm">The answer was</p>
            <p className="font-display text-2xl font-bold text-white tracking-wide mt-0.5">{mysteryPlayer.name}</p>
            <button onClick={() => setShowResult(true)} className="btn-ghost mt-3 py-2 text-xs">
              View Result
            </button>
          </div>
        )}
      </main>

      {/* Ad slot - bottom */}
      <div className="max-w-2xl mx-auto w-full px-4 pb-6">
        <div className="h-16 rounded-xl border border-dashed border-border flex items-center justify-center text-xs text-slate-700 uppercase tracking-widest">
          {/* Replace with AdSense: <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> */}
          Ad Slot — 728×90
        </div>
      </div>

      {/* Modals */}
      {showResult && (
        <ResultModal
          guesses={guesses}
          mysteryPlayer={mysteryPlayer}
          status={status}
          puzzleNumber={puzzleNumber}
          hintsUsed={hintsUsed}
          onClose={() => setShowResult(false)}
        />
      )}
      {showHow && <HowToPlayModal onClose={() => setShowHow(false)} />}
      {showStats && <StatsModal onClose={() => setShowStats(false)} />}
    </div>
  );
}
