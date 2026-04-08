// ─── Player ───────────────────────────────────────────────────────────────────

export type PreferredFoot = 'Left' | 'Right' | 'Both';
export type Position = 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LW' | 'RW' | 'ST' | 'CF';
export type League = 'Premier League' | 'La Liga' | 'Bundesliga' | 'Serie A' | 'Ligue 1' | 'MLS' | 'Saudi Pro League';

export interface Player {
  id: number;
  name: string;
  club: string;
  nationality: string;
  position: Position;
  age: number;
  league: League;
  shirt_number: number;
  preferred_foot: PreferredFoot;
  image_url?: string;
}

// ─── Guess Result ─────────────────────────────────────────────────────────────

export type TileResult = 'correct' | 'close' | 'wrong';

export interface GuessResult {
  player: Player;
  club: TileResult;
  nationality: TileResult;
  position: TileResult;
  age: TileResult;
  age_direction?: 'up' | 'down';
  league: TileResult;
  shirt_number: TileResult;
  shirt_direction?: 'up' | 'down';
  preferred_foot: TileResult;
  is_correct: boolean;
}

// ─── Game State ───────────────────────────────────────────────────────────────

export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
  mystery_player_id: number;
  date: string;
  guesses: GuessResult[];
  status: GameStatus;
  hints_used: number;
  is_practice: boolean;
}

// ─── User Stats ───────────────────────────────────────────────────────────────

export interface UserStats {
  games_played: number;
  games_won: number;
  current_streak: number;
  best_streak: number;
  average_guesses: number;
  guess_distribution: Record<string, number>;
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  user_id: string;
  username: string;
  avatar_url?: string;
  value: number;
  rank: number;
}

// ─── Supabase DB types ────────────────────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      players: {
        Row: Player & { created_at: string };
        Insert: Omit<Player, 'id'>;
        Update: Partial<Player>;
      };
      daily_puzzles: {
        Row: {
          id: number;
          date: string;
          player_id: number;
          created_at: string;
        };
        Insert: { date: string; player_id: number };
        Update: { player_id?: number };
      };
      game_sessions: {
        Row: {
          id: string;
          user_id: string | null;
          date: string;
          player_id: number;
          guesses: GuessResult[];
          status: GameStatus;
          hints_used: number;
          guess_count: number;
          is_practice: boolean;
          created_at: string;
          completed_at: string | null;
        };
      };
      user_stats: {
        Row: {
          user_id: string;
          games_played: number;
          games_won: number;
          current_streak: number;
          best_streak: number;
          total_guesses: number;
          guess_distribution: Record<string, number>;
          last_played_date: string | null;
          updated_at: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          username: string;
          avatar_url: string | null;
          is_premium: boolean;
          created_at: string;
        };
      };
    };
  };
}
