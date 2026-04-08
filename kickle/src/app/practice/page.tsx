'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import GameBoard from '@/components/game/GameBoard';
import SearchBar from '@/components/game/SearchBar';
import ColumnHeaders from '@/components/game/ColumnHeaders';
import ResultModal from '@/components/game/ResultModal';
import { PLAYERS } from '@/lib/players';
import { evaluateGuess } from '@/lib/game';
import type { Player, GuessResult, GameStatus } from '@/types';

const MAX_GUESSES = 8;

function getRandomPlayer(exclude?: number): Player {
  const pool = PLAYERS.filter((p) => p.id !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function PracticePage() {
  const [mysteryPlayer, setMysteryPlayer] = useState<Player>(() => getRandomPlayer());
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [guessedIds, setGuessedIds] = useState<Set<number>>(new Set());
  const [showResult, setShowResult] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  const handleGuess = useCallback((player: Player) => {
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
      toast.success('Correct! 🎉', { duration: 1500 });
    } else if (newGuesses.length >= MAX_GUESSES) {
      newStatus = 'lost';
    }
    setStatus(newStatus);
    if (newStatus !== 'playing') {
      setTimeout(() => setShowResult(true), newStatus === 'won' ? 1500 : 600);
    }
  }, [status, guessedIds, guesses, mysteryPlayer]);

  const nextRound = () => {
    const next = getRandomPlayer(mysteryPlayer.id);
    setMysteryPlayer(next);
    setGuesses([]);
    setStatus('playing');
    setGuessedIds(new Set());
    setShowResult(false);
    setGamesPlayed((n) => n + 1);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <header className="sticky top-0 z-40 bg-bg-primary/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-black tracking-widest text-brand">KICKLE</Link>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2 py-1 rounded-full">Practice</span>
            <Link href="/game" className="btn-ghost py-2 text-xs">Daily Puzzle</Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest">Practice Mode</p>
            <h1 className="font-display text-2xl font-bold tracking-wide text-white">
              Round {gamesPlayed + 1} · {MAX_GUESSES - guesses.length} guesses left
            </h1>
          </div>
          <button
            onClick={nextRound}
            className="btn-ghost py-2 text-xs"
          >
            Skip →
          </button>
        </div>

        <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl px-4 py-2.5 text-xs text-purple-300">
          🎮 Practice mode — stats don't count toward your daily streak
        </div>

        <div className="w-full bg-bg-tertiary rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${(guesses.length / MAX_GUESSES) * 100}%` }}
          />
        </div>

        {status === 'playing' && (
          <SearchBar onGuess={handleGuess} guessedIds={guessedIds} />
        )}

        <ColumnHeaders />
        <GameBoard guesses={guesses} />

        {status === 'playing' && Array.from({ length: Math.max(0, MAX_GUESSES - guesses.length) }).map((_, i) => (
          <div key={i} className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 7 }).map((_, j) => (
              <div key={j} className="aspect-square rounded-lg border border-white/4 bg-bg-secondary/40" />
            ))}
          </div>
        ))}

        {status === 'lost' && (
          <div className="card p-4 border-red-500/30 bg-red-500/5 text-center">
            <p className="text-red-400 font-semibold text-sm">The answer was</p>
            <p className="font-display text-2xl font-bold text-white tracking-wide mt-0.5">{mysteryPlayer.name}</p>
            <button onClick={nextRound} className="btn-primary mt-3 py-2 text-xs">Next Player →</button>
          </div>
        )}
      </main>

      {showResult && (
        <ResultModal
          guesses={guesses}
          mysteryPlayer={mysteryPlayer}
          status={status}
          puzzleNumber={gamesPlayed + 1}
          hintsUsed={0}
          onClose={() => { setShowResult(false); if (status !== 'playing') nextRound(); }}
        />
      )}
    </div>
  );
}
