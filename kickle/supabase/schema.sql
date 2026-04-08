-- ═══════════════════════════════════════════════════════════════
--  KICKLE DATABASE SCHEMA
--  Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── Profiles (extends auth.users) ───────────────────────────────────────────
create table if not exists public.profiles (
  id           uuid references auth.users(id) on delete cascade primary key,
  username     text unique not null,
  avatar_url   text,
  is_premium   boolean default false,
  created_at   timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Players ─────────────────────────────────────────────────────────────────
create table if not exists public.players (
  id             serial primary key,
  name           text not null,
  club           text not null,
  nationality    text not null,
  position       text not null,  -- GK, CB, LB, RB, CDM, CM, CAM, LW, RW, ST, CF
  age            integer not null check (age > 10 and age < 50),
  league         text not null,  -- Premier League, La Liga, etc.
  shirt_number   integer not null check (shirt_number > 0 and shirt_number < 100),
  preferred_foot text not null,  -- Left, Right, Both
  image_url      text,
  is_active      boolean default true,
  created_at     timestamptz default now()
);

create index if not exists players_name_idx on public.players using gin(to_tsvector('english', name));
create index if not exists players_league_idx on public.players(league);

-- ─── Daily Puzzles ────────────────────────────────────────────────────────────
create table if not exists public.daily_puzzles (
  id          serial primary key,
  date        date unique not null,
  player_id   integer references public.players(id) not null,
  created_at  timestamptz default now()
);

create index if not exists daily_puzzles_date_idx on public.daily_puzzles(date);

-- ─── Game Sessions ────────────────────────────────────────────────────────────
create table if not exists public.game_sessions (
  id             uuid default uuid_generate_v4() primary key,
  user_id        uuid references auth.users(id) on delete set null,
  date           date not null,
  player_id      integer references public.players(id) not null,
  guesses        jsonb default '[]',
  status         text not null default 'playing' check (status in ('playing','won','lost')),
  hints_used     integer default 0,
  guess_count    integer default 0,
  is_practice    boolean default false,
  created_at     timestamptz default now(),
  completed_at   timestamptz,
  unique(user_id, date, is_practice)  -- one daily game per user
);

create index if not exists game_sessions_user_idx  on public.game_sessions(user_id);
create index if not exists game_sessions_date_idx  on public.game_sessions(date);
create index if not exists game_sessions_status_idx on public.game_sessions(status);

-- ─── User Stats ───────────────────────────────────────────────────────────────
create table if not exists public.user_stats (
  user_id              uuid references auth.users(id) on delete cascade primary key,
  games_played         integer default 0,
  games_won            integer default 0,
  current_streak       integer default 0,
  best_streak          integer default 0,
  total_guesses        integer default 0,
  guess_distribution   jsonb default '{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0}',
  last_played_date     date,
  updated_at           timestamptz default now()
);

-- Auto-create stats row when profile is created
create or replace function public.handle_new_profile()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.user_stats (user_id) values (new.id);
  return new;
end;
$$;

drop trigger if exists on_profile_created on public.profiles;
create trigger on_profile_created
  after insert on public.profiles
  for each row execute procedure public.handle_new_profile();

-- ─── Function: update user stats after game ───────────────────────────────────
create or replace function public.complete_game(
  p_user_id     uuid,
  p_won         boolean,
  p_guess_count integer,
  p_game_date   date
)
returns void language plpgsql security definer as $$
declare
  v_last_date date;
  v_streak    integer;
begin
  select last_played_date, current_streak
  into v_last_date, v_streak
  from public.user_stats where user_id = p_user_id;

  -- Update streak logic
  if p_won then
    -- Streak continues if played yesterday, resets otherwise
    if v_last_date = p_game_date - interval '1 day' then
      v_streak := v_streak + 1;
    elsif v_last_date = p_game_date then
      -- same day, no change
    else
      v_streak := 1;
    end if;
  else
    v_streak := 0;
  end if;

  update public.user_stats set
    games_played       = games_played + 1,
    games_won          = games_won + (case when p_won then 1 else 0 end),
    current_streak     = v_streak,
    best_streak        = greatest(best_streak, v_streak),
    total_guesses      = total_guesses + (case when p_won then p_guess_count else 0 end),
    guess_distribution = case when p_won then
      jsonb_set(guess_distribution, array[p_guess_count::text],
        ((guess_distribution->>p_guess_count::text)::integer + 1)::text::jsonb)
      else guess_distribution end,
    last_played_date   = p_game_date,
    updated_at         = now()
  where user_id = p_user_id;
end;
$$;

-- ─── Leaderboard view ─────────────────────────────────────────────────────────
create or replace view public.leaderboard as
select
  us.user_id,
  p.username,
  p.avatar_url,
  us.games_played,
  us.games_won,
  us.current_streak,
  us.best_streak,
  us.total_guesses,
  case when us.games_won > 0
    then round(us.total_guesses::numeric / us.games_won, 2)
    else null end as avg_guesses,
  row_number() over (order by us.current_streak desc) as streak_rank,
  row_number() over (order by us.best_streak desc)    as best_streak_rank,
  row_number() over (order by us.games_won desc)      as wins_rank
from public.user_stats us
join public.profiles p on p.id = us.user_id
where us.games_played >= 3;  -- minimum games to appear

-- ─── Row Level Security ───────────────────────────────────────────────────────
alter table public.profiles    enable row level security;
alter table public.user_stats  enable row level security;
alter table public.game_sessions enable row level security;
alter table public.players     enable row level security;
alter table public.daily_puzzles enable row level security;

-- Profiles: users can read all, edit own
create policy "profiles_read_all"   on public.profiles for select using (true);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- User stats: users can read all (leaderboard), edit own
create policy "stats_read_all"   on public.user_stats for select using (true);
create policy "stats_update_own" on public.user_stats for update using (auth.uid() = user_id);

-- Game sessions: users can read/write own
create policy "sessions_own" on public.game_sessions for all using (auth.uid() = user_id);

-- Players & daily_puzzles: everyone can read
create policy "players_read_all"       on public.players       for select using (true);
create policy "daily_puzzles_read_all" on public.daily_puzzles for select using (true);
