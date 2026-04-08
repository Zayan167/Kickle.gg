'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { loadLocalStats, type LocalStats, DEFAULT_STATS } from '@/lib/game';

export default function ProfilePage() {
  const [stats, setStats] = useState<LocalStats>(DEFAULT_STATS);
  const [tab, setTab] = useState<'stats' | 'settings'>('stats');

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
    <div className="min-h-screen bg-bg-primary">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-brand/4 rounded-full blur-[100px] pointer-events-none" />

      <header className="sticky top-0 z-40 bg-bg-primary/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-black tracking-widest text-brand">KICKLE</Link>
          <Link href="/game" className="btn-primary py-2 text-xs">Play</Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* Profile header */}
          <div className="card p-6 mb-5 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-brand/15 border border-brand/30 flex items-center justify-center text-2xl font-bold text-brand font-display">
              ?
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl font-black tracking-wide text-white">Guest Player</h1>
              <p className="text-sm text-slate-400 mt-0.5">Sign in to save your progress & compete</p>
              <Link href="/login" className="inline-block mt-2 text-xs text-brand hover:underline">
                Sign in / Create account →
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-bg-card border border-border rounded-xl p-1 mb-5">
            {(['stats', 'settings'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize tracking-wider transition-all ${
                  tab === t ? 'bg-bg-hover text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'stats' && (
            <div className="space-y-4">
              {/* Key stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { val: stats.games_played, label: 'Played', icon: '🎮' },
                  { val: `${winPct}%`,        label: 'Win %',  icon: '✅' },
                  { val: stats.current_streak, label: 'Streak', icon: '🔥' },
                  { val: stats.best_streak,   label: 'Best',   icon: '👑' },
                ].map((s) => (
                  <div key={s.label} className="card p-4 text-center">
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="font-display text-3xl font-black text-white">{s.val}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Avg guesses */}
              <div className="card p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Average Guesses</p>
                  <p className="text-xs text-slate-500">When solved correctly</p>
                </div>
                <div className="font-display text-3xl font-black text-brand">{avgGuesses}</div>
              </div>

              {/* Distribution */}
              <div className="card p-5">
                <h2 className="font-display text-lg font-bold tracking-wide text-white mb-4">Guess Distribution</h2>
                <div className="space-y-2">
                  {[1,2,3,4,5,6,7,8].map((n) => {
                    const count = stats.guess_distribution[String(n)] || 0;
                    const pct = Math.round((count / maxDist) * 100);
                    return (
                      <div key={n} className="flex items-center gap-2 text-sm">
                        <span className="w-4 text-slate-400 text-right font-mono">{n}</span>
                        <div className="flex-1 bg-bg-tertiary rounded-md h-6 overflow-hidden">
                          <motion.div
                            className="h-full bg-brand rounded-md flex items-center justify-end pr-2"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max(pct, count > 0 ? 6 : 0)}%` }}
                            transition={{ delay: n * 0.06, duration: 0.5, ease: 'easeOut' }}
                          >
                            {count > 0 && (
                              <span className="text-[10px] font-bold text-bg-primary">{count}</span>
                            )}
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {tab === 'settings' && (
            <div className="space-y-3">
              <div className="card p-5">
                <h2 className="font-semibold text-white mb-4">Preferences</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Dark mode</span>
                    <div className="w-10 h-5 bg-brand rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 shadow" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Animations</span>
                    <div className="w-10 h-5 bg-brand rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 shadow" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-5 border-brand/20 bg-brand/5">
                <h2 className="font-semibold text-white mb-1">⚡ Premium (coming soon)</h2>
                <p className="text-xs text-slate-400 mb-3">Unlimited practice mode, no ads, supporter badge, and more.</p>
                <button className="btn-ghost py-2 text-xs opacity-50 cursor-not-allowed" disabled>Coming Soon</button>
              </div>

              <div className="card p-5">
                <h2 className="font-semibold text-white mb-3">Account</h2>
                <Link href="/login" className="btn-primary w-full text-center py-2.5 block text-sm">
                  Sign In / Register
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
