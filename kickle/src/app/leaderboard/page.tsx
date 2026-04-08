'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Category = 'streak' | 'best_streak' | 'wins' | 'avg_guesses';

interface Entry {
  rank: number;
  username: string;
  value: string | number;
  badge?: string;
}

// Demo data — replace with Supabase queries
const DEMO_DATA: Record<Category, Entry[]> = {
  streak: [
    { rank: 1, username: 'FootballGuru', value: 34, badge: '🔥' },
    { rank: 2, username: 'PremierFan99', value: 28, badge: '🔥' },
    { rank: 3, username: 'LaLigaLover',  value: 21, badge: '🔥' },
    { rank: 4, username: 'BalliqIQ',     value: 19 },
    { rank: 5, username: 'TacticsNerd',  value: 17 },
    { rank: 6, username: 'GoalMachine',  value: 15 },
    { rank: 7, username: 'KickleKing',   value: 14 },
    { rank: 8, username: 'UltimateFC',   value: 12 },
    { rank: 9, username: 'Offside_Bob',  value: 11 },
    { rank: 10,username: 'TheSweeper',   value: 10 },
  ],
  best_streak: [
    { rank: 1, username: 'FootballGuru', value: 62, badge: '👑' },
    { rank: 2, username: 'OldKickler',   value: 55, badge: '👑' },
    { rank: 3, username: 'LaLigaLover',  value: 48, badge: '👑' },
    { rank: 4, username: 'PremierFan99', value: 44 },
    { rank: 5, username: 'TacticsNerd',  value: 39 },
    { rank: 6, username: 'GoalMachine',  value: 31 },
    { rank: 7, username: 'KickleKing',   value: 28 },
    { rank: 8, username: 'BalliqIQ',     value: 25 },
    { rank: 9, username: 'UltimateFC',   value: 22 },
    { rank: 10,username: 'TheSweeper',   value: 18 },
  ],
  wins: [
    { rank: 1, username: 'OldKickler',   value: 218, badge: '🏆' },
    { rank: 2, username: 'FootballGuru', value: 192, badge: '🏆' },
    { rank: 3, username: 'PremierFan99', value: 175, badge: '🏆' },
    { rank: 4, username: 'LaLigaLover',  value: 164 },
    { rank: 5, username: 'TacticsNerd',  value: 151 },
    { rank: 6, username: 'BalliqIQ',     value: 138 },
    { rank: 7, username: 'GoalMachine',  value: 127 },
    { rank: 8, username: 'KickleKing',   value: 119 },
    { rank: 9, username: 'UltimateFC',   value: 108 },
    { rank: 10,username: 'TheSweeper',   value: 97 },
  ],
  avg_guesses: [
    { rank: 1, username: 'BalliqIQ',     value: '2.1', badge: '⚡' },
    { rank: 2, username: 'TacticsNerd',  value: '2.4', badge: '⚡' },
    { rank: 3, username: 'FootballGuru', value: '2.7', badge: '⚡' },
    { rank: 4, username: 'LaLigaLover',  value: '3.0' },
    { rank: 5, username: 'KickleKing',   value: '3.1' },
    { rank: 6, username: 'PremierFan99', value: '3.3' },
    { rank: 7, username: 'GoalMachine',  value: '3.5' },
    { rank: 8, username: 'OldKickler',   value: '3.7' },
    { rank: 9, username: 'UltimateFC',   value: '3.8' },
    { rank: 10,username: 'TheSweeper',   value: '4.0' },
  ],
};

const CATS: { key: Category; label: string; icon: string; suffix: string }[] = [
  { key: 'streak',      label: 'Current Streak', icon: '🔥', suffix: 'days' },
  { key: 'best_streak', label: 'Best Streak',    icon: '👑', suffix: 'days' },
  { key: 'wins',        label: 'Total Wins',     icon: '🏆', suffix: 'wins' },
  { key: 'avg_guesses', label: 'Avg Guesses',    icon: '⚡', suffix: 'avg' },
];

const RANK_STYLES = ['text-yellow-400', 'text-slate-300', 'text-amber-600'];

export default function LeaderboardPage() {
  const [active, setActive] = useState<Category>('streak');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(true); }, []);

  const data = DEMO_DATA[active];

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand/4 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg-primary/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-black tracking-widest text-brand">KICKLE</Link>
          <div className="flex gap-2">
            <Link href="/game" className="btn-primary py-2 text-xs">Play Now</Link>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-black tracking-widest text-white mb-1">LEADERBOARD</h1>
          <p className="text-slate-400 text-sm mb-6">Top players worldwide · Updated daily</p>

          {/* Category tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {CATS.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`rounded-xl p-3 text-center transition-all border text-sm font-semibold ${
                  active === c.key
                    ? 'bg-brand/15 border-brand/40 text-brand'
                    : 'bg-bg-card border-border text-slate-400 hover:border-border-bright hover:text-white'
                }`}
              >
                <div className="text-xl mb-1">{c.icon}</div>
                <div className="text-[11px] uppercase tracking-wide leading-tight">{c.label}</div>
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="card overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-12 gap-2 px-4 py-2.5 border-b border-border bg-bg-secondary/50">
              <div className="col-span-1 text-xs text-slate-500 uppercase tracking-widest">#</div>
              <div className="col-span-8 text-xs text-slate-500 uppercase tracking-widest">Player</div>
              <div className="col-span-3 text-xs text-slate-500 uppercase tracking-widest text-right">
                {CATS.find(c => c.key === active)?.suffix}
              </div>
            </div>

            {/* Rows */}
            {loaded && data.map((entry, i) => (
              <motion.div
                key={entry.username}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`grid grid-cols-12 gap-2 px-4 py-3.5 items-center border-b border-border last:border-0 hover:bg-bg-hover transition-colors ${
                  i === 0 ? 'bg-brand/5' : ''
                }`}
              >
                <div className={`col-span-1 font-display text-xl font-bold ${RANK_STYLES[i] || 'text-slate-500'}`}>
                  {i + 1}
                </div>
                <div className="col-span-8 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    i === 0 ? 'bg-brand/20 text-brand border border-brand/30' :
                    i === 1 ? 'bg-slate-400/20 text-slate-300 border border-slate-400/30' :
                    i === 2 ? 'bg-amber-600/20 text-amber-600 border border-amber-600/30' :
                    'bg-bg-secondary text-slate-500 border border-border'
                  }`}>
                    {entry.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white">{entry.username}</span>
                    {entry.badge && <span className="ml-1.5 text-xs">{entry.badge}</span>}
                  </div>
                </div>
                <div className="col-span-3 text-right">
                  <span className={`font-display text-xl font-bold ${i < 3 ? 'text-brand' : 'text-white'}`}>
                    {entry.value}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA to sign in */}
          <div className="mt-6 card p-5 text-center border-brand/20 bg-brand/5">
            <p className="text-sm text-slate-300 mb-3">Sign in to appear on the leaderboard and track your stats!</p>
            <Link href="/login" className="btn-primary py-2.5">Create Free Account</Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
