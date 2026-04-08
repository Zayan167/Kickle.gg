import { NextResponse } from 'next/server';
import { getDailyPlayer } from '@/lib/players';
import { formatDate, getDayNumber } from '@/lib/utils';

export async function GET() {
  const today = formatDate(new Date());
  const player = getDailyPlayer(today);
  const puzzleNumber = getDayNumber(today);

  // Only return non-identifying info via API (don't expose name/club until game over)
  return NextResponse.json({
    puzzle_number: puzzleNumber,
    date: today,
    player_id: player.id, // used for client-side lookup
  });
}
