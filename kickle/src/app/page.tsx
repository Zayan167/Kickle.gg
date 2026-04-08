'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import HowToPlayModal from '@/components/game/HowToPlayModal';

const SAMPLE_ROW = [
  { label: 'Club', result: 'wrong' },
  { label: 'Nation', result: 'correct' },
  { label: 'Pos', result: 'close' },
  { label: 'Age', result: 'wrong' },
  { label: 'League', result: 'correct' },
  { label: '#', result: 'close' },
  { label: 'Foot', result: 'wrong' },
];

const colorMap = {
  correct: 'bg-tile-green text-white',
  close:   'bg-tile-yellow text-black',
  wrong:   'bg-tile-gray text-slate-300',
};

export default function LandingPage() {
  const [showHow, setShowHow] = useState(false);

  return (
    <main className="min-h-screen bg-bg-primary flex flex-col items-center px-4 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav className="w-full max-w-4xl flex items-center justify-between py-5">
        <span className="font-display text-3xl font-bold tracking-widest text-brand">KICKLE</span>
        <div className="flex gap-3">
          <Link href="/login" className="btn-ghost py-2 text-xs">Sign In</Link>
          <Link href="/game" className="btn-primary py-2 text-xs">Play Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center pt-10 pb-20 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-brand/10 border border-brand/30 text-brand text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest mb-8">
            ⚽ New puzzle every day
          </span>

          {/* Title */}
          <h1 className="font-display text-[clamp(72px,15vw,120px)] font-black tracking-widest leading-none text-white mb-2">
            KICKLE
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-md mx-auto">
            Identify the mystery footballer from clues. 8 guesses. New player every day.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link href="/game" className="btn-primary px-10 py-4 text-base glow-on-hover">
              Play Today's Puzzle
            </Link>
            <button
              onClick={() => setShowHow(true)}
              className="btn-ghost px-10 py-4 text-base"
            >
              How to Play
            </button>
          </div>

          {/* Demo row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-bg-card border border-border rounded-2xl p-5 max-w-sm mx-auto"
          >
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Example row</p>
            <div className="grid grid-cols-7 gap-1.5">
              {SAMPLE_ROW.map((tile, i) => (
                <motion.div
                  key={tile.label}
                  initial={{ rotateX: 90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                  className={`${colorMap[tile.result as keyof typeof colorMap]} rounded-lg aspect-square flex flex-col items-center justify-center text-[10px] font-bold`}
                >
                  {tile.label}
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-slate-600">
              <span>🟩 Correct</span>
              <span>🟨 Close</span>
              <span>⬜ Wrong</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="w-full max-w-4xl pb-20 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: '🌍', title: '7 Attributes', desc: 'Club, nationality, position, age, league, shirt number & preferred foot' },
          { icon: '📊', title: 'Track Streaks', desc: 'Sign up to save your stats, streaks, and climb the leaderboard' },
          { icon: '🏆', title: 'Leaderboards', desc: 'Compete globally for longest streak and fastest solves' },
        ].map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="card p-6 hover:border-border-bright transition-colors"
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-display text-lg font-bold tracking-wide text-white mb-1">{f.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border py-6 text-center text-xs text-slate-600">
        <div className="flex items-center justify-center gap-6 mb-2">
          <Link href="/game" className="hover:text-slate-400 transition-colors">Play</Link>
          <Link href="/leaderboard" className="hover:text-slate-400 transition-colors">Leaderboard</Link>
          <Link href="/login" className="hover:text-slate-400 transition-colors">Sign In</Link>
        </div>
        <p>© 2024 KICKLE. Not affiliated with any football organization.</p>
      </footer>

      {showHow && <HowToPlayModal onClose={() => setShowHow(false)} />}
    </main>
  );
}
