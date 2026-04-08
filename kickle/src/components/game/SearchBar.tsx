'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchPlayers } from '@/lib/players';
import type { Player } from '@/types';

interface Props {
  onGuess: (player: Player) => void;
  guessedIds: Set<number>;
}

export default function SearchBar({ onGuess, guessedIds }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Player[]>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const search = useCallback((q: string) => {
    setQuery(q);
    if (q.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    const found = searchPlayers(q).filter((p) => !guessedIds.has(p.id));
    setResults(found);
    setOpen(found.length > 0);
    setActiveIdx(-1);
  }, [guessedIds]);

  const select = useCallback((player: Player) => {
    onGuess(player);
    setQuery('');
    setResults([]);
    setOpen(false);
    setActiveIdx(-1);
    inputRef.current?.focus();
  }, [onGuess]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIdx >= 0 && results[activeIdx]) select(results[activeIdx]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (activeIdx >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[data-item]');
      items[activeIdx]?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIdx]);

  const LEAGUE_COLORS: Record<string, string> = {
    'Premier League': 'text-purple-400',
    'La Liga': 'text-red-400',
    'Bundesliga': 'text-yellow-400',
    'Serie A': 'text-blue-400',
    'Ligue 1': 'text-cyan-400',
    'MLS': 'text-red-300',
    'Saudi Pro League': 'text-green-400',
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <span className="absolute left-3.5 text-slate-500 text-lg">⚽</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => search(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search for a footballer..."
          className="w-full bg-bg-tertiary border border-border text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setResults([]); setOpen(false); }}
            className="absolute right-3.5 text-slate-500 hover:text-white transition-colors text-lg leading-none"
          >×</button>
        )}
      </div>

      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            ref={listRef}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-1.5 bg-bg-card border border-border-bright rounded-xl overflow-hidden shadow-2xl z-50 max-h-60 overflow-y-auto"
          >
            {results.map((player, i) => (
              <button
                key={player.id}
                data-item
                onMouseDown={() => select(player)}
                onMouseEnter={() => setActiveIdx(i)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors text-sm ${
                  i === activeIdx ? 'bg-bg-hover' : 'hover:bg-bg-hover'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-bg-tertiary border border-border flex items-center justify-center text-xs font-bold text-brand flex-shrink-0">
                  {player.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{player.name}</p>
                  <p className="text-xs text-slate-500 truncate">{player.club} · {player.nationality}</p>
                </div>
                <span className={`text-xs font-medium flex-shrink-0 ${LEAGUE_COLORS[player.league] || 'text-slate-400'}`}>
                  {player.league.replace(' League', '').replace('Saudi Pro League', 'SPL')}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
