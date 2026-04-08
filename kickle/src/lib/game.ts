import type { Player, GuessResult, TileResult, Position } from '@/types';

// ─── Position groupings for partial match logic ───────────────────────────────
const POSITION_GROUPS: Record<string, string[]> = {
  GK:  ['GK'],
  DEF: ['CB', 'LB', 'RB'],
  MID: ['CDM', 'CM', 'CAM'],
  ATT: ['LW', 'RW', 'ST', 'CF'],
};

function getPositionGroup(pos: Position): string {
  for (const [group, positions] of Object.entries(POSITION_GROUPS)) {
    if (positions.includes(pos)) return group;
  }
  return pos;
}

// ─── Core evaluation ──────────────────────────────────────────────────────────
export function evaluateGuess(guess: Player, mystery: Player): GuessResult {
  // Club
  const club: TileResult = guess.club === mystery.club ? 'correct' : 'wrong';

  // Nationality
  const nationality: TileResult = guess.nationality === mystery.nationality ? 'correct' : 'wrong';

  // Position
  let position: TileResult;
  if (guess.position === mystery.position) {
    position = 'correct';
  } else if (getPositionGroup(guess.position) === getPositionGroup(mystery.position)) {
    position = 'close';
  } else {
    position = 'wrong';
  }

  // Age
  const ageDiff = Math.abs(guess.age - mystery.age);
  let age: TileResult;
  if (guess.age === mystery.age) {
    age = 'correct';
  } else if (ageDiff <= 2) {
    age = 'close';
  } else {
    age = 'wrong';
  }
  const age_direction = guess.age < mystery.age ? 'up' : 'down';

  // League
  const league: TileResult = guess.league === mystery.league ? 'correct' : 'wrong';

  // Shirt number
  const numDiff = Math.abs(guess.shirt_number - mystery.shirt_number);
  let shirt_number: TileResult;
  if (guess.shirt_number === mystery.shirt_number) {
    shirt_number = 'correct';
  } else if (numDiff <= 3) {
    shirt_number = 'close';
  } else {
    shirt_number = 'wrong';
  }
  const shirt_direction = guess.shirt_number < mystery.shirt_number ? 'up' : 'down';

  // Preferred foot
  const preferred_foot: TileResult = guess.preferred_foot === mystery.preferred_foot ? 'correct' : 'wrong';

  const is_correct =
    club === 'correct' &&
    nationality === 'correct' &&
    position === 'correct' &&
    age === 'correct' &&
    league === 'correct' &&
    shirt_number === 'correct' &&
    preferred_foot === 'correct';

  return {
    player: guess,
    club,
    nationality,
    position,
    age,
    age_direction,
    league,
    shirt_number,
    shirt_direction,
    preferred_foot,
    is_correct,
  };
}

// ─── Share string generation ──────────────────────────────────────────────────
const EMOJI_MAP: Record<TileResult, string> = {
  correct: '🟩',
  close:   '🟨',
  wrong:   '⬜',
};

export function generateShareText(
  guesses: GuessResult[],
  puzzleNumber: number,
  won: boolean
): string {
  const rows = guesses.map((g) =>
    [
      EMOJI_MAP[g.club],
      EMOJI_MAP[g.nationality],
      EMOJI_MAP[g.position],
      EMOJI_MAP[g.age],
      EMOJI_MAP[g.league],
      EMOJI_MAP[g.shirt_number],
      EMOJI_MAP[g.preferred_foot],
    ].join('')
  );

  const result = won ? `Won in ${guesses.length}/8` : 'X/8';

  return [
    `KICKLE #${puzzleNumber}`,
    rows.join('\n'),
    result,
    '',
    'Play at kickle.app',
  ].join('\n');
}

// ─── Local storage game state ─────────────────────────────────────────────────
const STORAGE_KEY = 'kickle_game_state';

export function saveLocalState(state: unknown): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadLocalState(): unknown {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearLocalState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

// ─── Stats persistence ────────────────────────────────────────────────────────
const STATS_KEY = 'kickle_stats';

export interface LocalStats {
  games_played: number;
  games_won: number;
  current_streak: number;
  best_streak: number;
  total_guesses: number;
  guess_distribution: Record<string, number>;
  last_played_date: string | null;
}

export const DEFAULT_STATS: LocalStats = {
  games_played: 0,
  games_won: 0,
  current_streak: 0,
  best_streak: 0,
  total_guesses: 0,
  guess_distribution: { '1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0 },
  last_played_date: null,
};

export function loadLocalStats(): LocalStats {
  if (typeof window === 'undefined') return { ...DEFAULT_STATS };
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? { ...DEFAULT_STATS, ...JSON.parse(raw) } : { ...DEFAULT_STATS };
  } catch {
    return { ...DEFAULT_STATS };
  }
}

export function saveLocalStats(stats: LocalStats): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function updateStatsAfterGame(
  stats: LocalStats,
  won: boolean,
  guessCount: number,
  today: string
): LocalStats {
  const wasPlayedToday = stats.last_played_date === today;
  if (wasPlayedToday) return stats; // already updated

  const newStats = { ...stats };
  newStats.games_played += 1;
  newStats.last_played_date = today;

  if (won) {
    newStats.games_won += 1;
    newStats.total_guesses += guessCount;
    newStats.current_streak += 1;
    newStats.best_streak = Math.max(newStats.best_streak, newStats.current_streak);
    const key = String(guessCount);
    newStats.guess_distribution = {
      ...newStats.guess_distribution,
      [key]: (newStats.guess_distribution[key] || 0) + 1,
    };
  } else {
    newStats.current_streak = 0;
  }

  return newStats;
}
