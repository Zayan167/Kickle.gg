'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Supabase auth integration
    try {
      const { createBrowserClient } = await import('@/lib/supabase');
      const supabase = createBrowserClient();

      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
            emailRedirectTo: `${window.location.origin}/game`,
          },
        });
        if (error) throw error;
        toast.success('Check your email to confirm your account!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Welcome back!');
        window.location.href = '/game';
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-brand/5 rounded-full blur-[100px] pointer-events-none" />

      <Link href="/" className="font-display text-4xl font-black tracking-widest text-brand mb-10">
        KICKLE
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Tabs */}
        <div className="flex bg-bg-card border border-border rounded-xl p-1 mb-6">
          {(['login', 'signup'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all ${
                mode === m
                  ? 'bg-brand text-bg-primary'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {m === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-widest mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="YourName"
                required
                className="input-field"
              />
            </div>
          )}
          <div>
            <label className="block text-xs text-slate-400 uppercase tracking-widest mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 uppercase tracking-widest mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-4">
          <Link href="/game" className="text-brand hover:underline">
            Continue as guest →
          </Link>
        </p>

        <p className="text-center text-xs text-slate-600 mt-2">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </main>
  );
}
