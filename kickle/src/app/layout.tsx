import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'KICKLE – Daily Football Puzzle',
  description: 'Guess the mystery footballer in 8 tries. A daily football guessing game.',
  keywords: 'football, soccer, wordle, puzzle, daily game, premier league, la liga',
  openGraph: {
    title: 'KICKLE – Daily Football Puzzle',
    description: 'Can you identify the mystery footballer? New puzzle every day.',
    type: 'website',
    url: 'https://kickle.app',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KICKLE – Daily Football Puzzle',
    description: 'Guess the mystery footballer in 8 tries.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head />
      <body className="noise">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#1a2030',
              color: '#f1f5f9',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
            },
            success: {
              iconTheme: { primary: '#00d97e', secondary: '#080b0f' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#080b0f' },
            },
          }}
        />
      </body>
    </html>
  );
}
