import { NextRequest, NextResponse } from 'next/server';

// When Supabase is configured, replace demo data with real queries:
// import { createServerClient } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || 'streak';

  // TODO: Replace with real Supabase query:
  /*
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('user_stats')
    .select('user_id, current_streak, best_streak, games_won, total_guesses, profiles(username, avatar_url)')
    .order(category === 'streak' ? 'current_streak' : category === 'best_streak' ? 'best_streak' : 'games_won', { ascending: false })
    .limit(50);
  */

  return NextResponse.json({
    category,
    data: [], // populated when Supabase is connected
    message: 'Connect Supabase to see real leaderboard data',
  });
}
