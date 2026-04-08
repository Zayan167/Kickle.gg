# ⚽ KICKLE — Daily Football Puzzle Game

> Guess the mystery footballer in 8 tries. Color-coded feedback. New player every day.

---

## 🚀 Quick Start (Local Dev)

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/kickle.git
cd kickle
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials (see Setup below):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Dev Server

```bash
npm run dev
```

Visit **http://localhost:3000** — the game works without Supabase (local storage fallback).

---

## 🗄️ Supabase Setup

### 1. Create Project
- Go to https://supabase.com → New Project
- Note your Project URL and anon key (Settings → API)

### 2. Run Schema

In the Supabase SQL Editor, run:

```sql
-- Copy contents of supabase/schema.sql and execute
```

### 3. Seed Players

```sql
-- Copy contents of supabase/seed.sql and execute
```

### 4. Configure Auth

In Supabase → Authentication → Settings:
- Enable Email provider
- Set Site URL: `https://your-domain.com`
- Add redirect URL: `https://your-domain.com/game`

---

## 🌐 Deploy to Vercel

### Option A: Vercel CLI (fastest)

```bash
npm install -g vercel
vercel login
vercel

# Set environment variables:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_APP_URL

# Deploy to production:
vercel --prod
```

### Option B: GitHub Integration

1. Push repo to GitHub
2. Go to https://vercel.com → New Project → Import from GitHub
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Custom Domain
- Vercel Dashboard → Project → Settings → Domains
- Add your domain (e.g. `kickle.app`)
- Update `NEXT_PUBLIC_APP_URL` env var

---

## 💰 Monetization

### Google AdSense Setup

1. Sign up at https://adsense.google.com
2. Submit your live URL for approval (1–7 days)
3. Replace ad slot divs in `src/app/game/page.tsx`:

```tsx
{/* Replace this: */}
<div className="...">Ad Slot — 728×90</div>

{/* With this: */}
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID" crossOrigin="anonymous"></script>
<ins className="adsbygoogle"
  style={{ display: 'block' }}
  data-ad-client="ca-pub-YOUR_ID"
  data-ad-slot="YOUR_SLOT_ID"
  data-ad-format="auto"
  data-full-width-responsive="true"
/>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

Ad placement locations already built into the UI:
- `src/app/game/page.tsx` — bottom of game (best performing)
- `src/app/leaderboard/page.tsx` — between leaderboard rows
- `src/app/practice/page.tsx` — between rounds

### Premium Features (Future)

The code is structured for premium upsell. To implement:

1. Add Stripe integration (`@stripe/stripe-js`)
2. Create `/api/subscription/route.ts` webhook handler
3. Set `profiles.is_premium = true` on successful payment
4. Gate practice mode, ad-free, supporter badge behind `is_premium` check

---

## 📁 Project Structure

```
kickle/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout
│   │   ├── game/page.tsx         # Main game
│   │   ├── practice/page.tsx     # Practice mode
│   │   ├── login/page.tsx        # Auth page
│   │   ├── leaderboard/page.tsx  # Leaderboard
│   │   ├── profile/page.tsx      # User profile
│   │   └── api/
│   │       ├── daily-player/     # Today's puzzle API
│   │       ├── guess/            # Guess evaluation API
│   │       ├── leaderboard/      # Leaderboard API
│   │       └── stats/            # User stats API
│   ├── components/
│   │   └── game/
│   │       ├── GameBoard.tsx     # Guess rows with tiles
│   │       ├── SearchBar.tsx     # Autocomplete search
│   │       ├── HintPanel.tsx     # Hint system
│   │       ├── ColumnHeaders.tsx # Column labels
│   │       ├── ResultModal.tsx   # Win/lose popup
│   │       ├── HowToPlayModal.tsx
│   │       └── StatsModal.tsx
│   ├── lib/
│   │   ├── players.ts            # Player DB + daily selection
│   │   ├── game.ts               # Guess logic + local storage
│   │   ├── supabase.ts           # Supabase clients
│   │   └── utils.ts              # Helpers
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   └── styles/
│       └── globals.css           # Tailwind + custom styles
├── supabase/
│   ├── schema.sql                # Full DB schema
│   └── seed.sql                  # 80+ player seed data
├── public/                       # Static assets
├── tailwind.config.js
├── next.config.js
├── vercel.json
└── .env.local.example
```

---

## 🎮 Game Logic

### Daily Player Selection
- Deterministic seeded shuffle of all players
- Same player for all users on a given day
- Rotates through full pool before repeating
- No Supabase required — works client-side

### Tile Color Rules
| Attribute     | Green       | Yellow                     | Grey    |
|---------------|-------------|----------------------------|---------|
| Club          | Exact match | —                          | No match |
| Nationality   | Exact match | —                          | No match |
| Position      | Exact match | Same group (DEF/MID/ATT)   | No match |
| Age           | Exact match | Within ±2 years            | >2 years |
| League        | Exact match | —                          | No match |
| Shirt Number  | Exact match | Within ±3                  | >3 away  |
| Preferred Foot| Exact match | —                          | No match |

### Arrows (Age & Shirt Number)
- ↑ = mystery player is HIGHER than your guess
- ↓ = mystery player is LOWER than your guess

---

## 🔮 Future Upgrade Ideas

1. **Image mode** — Show silhouette image, reveal more as guesses used
2. **Career stats mode** — Guess player from goals/assists stats
3. **Multiplayer** — Race against a friend in real-time
4. **Notifications** — Daily push notification "Today's puzzle is ready"
5. **Club/Nation mode** — Guess all players from a specific club/country
6. **Hard mode** — No yellow tiles, binary correct/wrong
7. **Mobile app** — React Native version using same data layer
8. **Twitter bot** — Daily puzzle announcement with spoiler-free results
9. **Themed weeks** — World Cup week, Champions League final week
10. **Player images** — License or use Wikipedia API for headshots

---

## 📝 Adding More Players

Edit `src/lib/players.ts` — add to the `PLAYERS` array:

```typescript
{ id: 81, name: 'New Player', club: 'Club Name', nationality: 'French',
  position: 'ST', age: 25, league: 'Ligue 1', shirt_number: 9, preferred_foot: 'Right' },
```

Also add to `supabase/seed.sql` for the database.

---

## ⚖️ Legal Notes

KICKLE uses player names for puzzle/educational purposes. It is not affiliated with any football club, league, or official organization. Player statistics and club affiliations are approximate and for gameplay only.
