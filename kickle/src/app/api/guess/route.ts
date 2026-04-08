import { NextRequest, NextResponse } from 'next/server';
import { getDailyPlayer, getPlayerById } from '@/lib/players';
import { evaluateGuess } from '@/lib/game';
import { formatDate } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { player_id, date } = await req.json();

    if (!player_id) {
      return NextResponse.json({ error: 'player_id required' }, { status: 400 });
    }

    const today = formatDate(new Date());
    const targetDate = date || today;
    const mysteryPlayer = getDailyPlayer(targetDate);
    const guessPlayer = getPlayerById(Number(player_id));

    if (!guessPlayer) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    const result = evaluateGuess(guessPlayer, mysteryPlayer);

    // Only reveal mystery player name if correct or if explicitly requested with game state
    const response = {
      ...result,
      player: guessPlayer, // the guessed player (safe to return)
      mystery_name: result.is_correct ? mysteryPlayer.name : undefined,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
