-- ═══════════════════════════════════════════════════════════════
--  KICKLE PLAYER SEED DATA
--  Run AFTER schema.sql
-- ═══════════════════════════════════════════════════════════════

truncate table public.players restart identity cascade;

insert into public.players (name, club, nationality, position, age, league, shirt_number, preferred_foot) values
-- Premier League
('Erling Haaland',           'Manchester City',   'Norwegian',     'ST',  23, 'Premier League',   9,  'Left'),
('Mohamed Salah',            'Liverpool',         'Egyptian',      'RW',  31, 'Premier League',  11, 'Left'),
('Kevin De Bruyne',          'Manchester City',   'Belgian',       'CAM', 32, 'Premier League',  17, 'Right'),
('Bukayo Saka',              'Arsenal',           'English',       'RW',  22, 'Premier League',   7, 'Left'),
('Marcus Rashford',          'Manchester United', 'English',       'LW',  26, 'Premier League',  10, 'Right'),
('Virgil van Dijk',          'Liverpool',         'Dutch',         'CB',  32, 'Premier League',   4, 'Right'),
('Rodri',                    'Manchester City',   'Spanish',       'CDM', 27, 'Premier League',  16, 'Right'),
('Son Heung-min',            'Tottenham',         'South Korean',  'LW',  31, 'Premier League',   7, 'Left'),
('Gabriel Martinelli',       'Arsenal',           'Brazilian',     'LW',  22, 'Premier League',  11, 'Right'),
('Phil Foden',               'Manchester City',   'English',       'CAM', 23, 'Premier League',  47, 'Left'),
('Bruno Fernandes',          'Manchester United', 'Portuguese',    'CAM', 29, 'Premier League',   8, 'Right'),
('Alisson Becker',           'Liverpool',         'Brazilian',     'GK',  31, 'Premier League',   1, 'Right'),
('Ederson',                  'Manchester City',   'Brazilian',     'GK',  30, 'Premier League',  31, 'Left'),
('Martin Odegaard',          'Arsenal',           'Norwegian',     'CAM', 25, 'Premier League',   8, 'Right'),
('Trent Alexander-Arnold',   'Liverpool',         'English',       'RB',  25, 'Premier League',  66, 'Right'),
('Cole Palmer',              'Chelsea',           'English',       'CAM', 21, 'Premier League',  20, 'Right'),
('Alexander Isak',           'Newcastle United',  'Swedish',       'ST',  24, 'Premier League',  14, 'Right'),
-- La Liga
('Vinicius Junior',          'Real Madrid',       'Brazilian',     'LW',  23, 'La Liga',          7, 'Right'),
('Jude Bellingham',          'Real Madrid',       'English',       'CAM', 20, 'La Liga',          5, 'Right'),
('Robert Lewandowski',       'Barcelona',         'Polish',        'ST',  35, 'La Liga',          9, 'Right'),
('Lamine Yamal',             'Barcelona',         'Spanish',       'RW',  16, 'La Liga',         27, 'Right'),
('Pedri',                    'Barcelona',         'Spanish',       'CM',  21, 'La Liga',          8, 'Right'),
('Kylian Mbappe',            'Real Madrid',       'French',        'ST',  25, 'La Liga',          9, 'Right'),
('Thibaut Courtois',         'Real Madrid',       'Belgian',       'GK',  31, 'La Liga',          1, 'Right'),
('Gavi',                     'Barcelona',         'Spanish',       'CM',  19, 'La Liga',          6, 'Right'),
('Antoine Griezmann',        'Atletico Madrid',   'French',        'CF',  32, 'La Liga',          7, 'Left'),
('Alvaro Morata',            'Atletico Madrid',   'Spanish',       'ST',  31, 'La Liga',         19, 'Right'),
-- Bundesliga
('Harry Kane',               'Bayern Munich',     'English',       'ST',  30, 'Bundesliga',       9, 'Right'),
('Leroy Sane',               'Bayern Munich',     'German',        'LW',  28, 'Bundesliga',      10, 'Right'),
('Jamal Musiala',            'Bayern Munich',     'German',        'CAM', 21, 'Bundesliga',      42, 'Right'),
('Florian Wirtz',            'Bayer Leverkusen',  'German',        'CAM', 20, 'Bundesliga',      10, 'Right'),
('Granit Xhaka',             'Bayer Leverkusen',  'Swiss',         'CDM', 31, 'Bundesliga',      34, 'Left'),
('Victor Boniface',          'Bayer Leverkusen',  'Nigerian',      'ST',  23, 'Bundesliga',       9, 'Right'),
('Manuel Neuer',             'Bayern Munich',     'German',        'GK',  38, 'Bundesliga',       1, 'Right'),
('Thomas Muller',            'Bayern Munich',     'German',        'CAM', 34, 'Bundesliga',      25, 'Right'),
('Nico Schlotterbeck',       'Borussia Dortmund', 'German',        'CB',  24, 'Bundesliga',       4, 'Left'),
-- Serie A
('Lautaro Martinez',         'Inter Milan',       'Argentinian',   'ST',  26, 'Serie A',         10, 'Right'),
('Khvicha Kvaratskhelia',    'Napoli',            'Georgian',      'LW',  23, 'Serie A',         77, 'Right'),
('Nicolo Barella',           'Inter Milan',       'Italian',       'CM',  27, 'Serie A',         23, 'Right'),
('Dusan Vlahovic',           'Juventus',          'Serbian',       'ST',  24, 'Serie A',          9, 'Left'),
('Paulo Dybala',             'AS Roma',           'Argentinian',   'CAM', 30, 'Serie A',         21, 'Left'),
('Mike Maignan',             'AC Milan',          'French',        'GK',  28, 'Serie A',         16, 'Right'),
('Rafael Leao',              'AC Milan',          'Portuguese',    'LW',  24, 'Serie A',         10, 'Right'),
('Marcus Thuram',            'Inter Milan',       'French',        'ST',  26, 'Serie A',          9, 'Right'),
-- Ligue 1
('Ousmane Dembele',          'PSG',               'French',        'RW',  26, 'Ligue 1',         10, 'Right'),
('Bradley Barcola',          'PSG',               'French',        'LW',  21, 'Ligue 1',         29, 'Right'),
('Gianluigi Donnarumma',     'PSG',               'Italian',       'GK',  25, 'Ligue 1',         99, 'Right'),
('Mason Greenwood',          'Marseille',         'English',       'RW',  23, 'Ligue 1',         10, 'Right'),
('Jonathan David',           'Lille',             'Canadian',      'ST',  24, 'Ligue 1',          9, 'Right'),
('Warren Zaire-Emery',       'PSG',               'French',        'CM',  17, 'Ligue 1',         33, 'Right'),
('Vitinha',                  'PSG',               'Portuguese',    'CM',  24, 'Ligue 1',         17, 'Right'),
-- MLS
('Lionel Messi',             'Inter Miami',       'Argentinian',   'CF',  36, 'MLS',             10, 'Left'),
('Lorenzo Insigne',          'Toronto FC',        'Italian',       'LW',  32, 'MLS',             24, 'Left'),
('Xherdan Shaqiri',          'Chicago Fire',      'Swiss',         'CAM', 32, 'MLS',             10, 'Right'),
('Riqui Puig',               'LA Galaxy',         'Spanish',       'CAM', 24, 'MLS',              6, 'Right'),
('Cucho Hernandez',          'Columbus Crew',     'Colombian',     'ST',  25, 'MLS',              9, 'Right'),
('Caden Clark',              'New York Red Bulls','American',      'CM',  21, 'MLS',             17, 'Right'),
-- Saudi Pro League
('Cristiano Ronaldo',        'Al Nassr',          'Portuguese',    'ST',  39, 'Saudi Pro League',  7, 'Right'),
('Neymar Jr',                'Al Hilal',          'Brazilian',     'LW',  32, 'Saudi Pro League', 10, 'Right'),
('Karim Benzema',            'Al Ittihad',        'French',        'ST',  36, 'Saudi Pro League',  9, 'Right'),
('N''Golo Kante',            'Al Ittihad',        'French',        'CDM', 33, 'Saudi Pro League',  7, 'Right'),
('Riyad Mahrez',             'Al Ahli',           'Algerian',      'RW',  33, 'Saudi Pro League',  7, 'Left'),
('Roberto Firmino',          'Al Ahli',           'Brazilian',     'CF',  32, 'Saudi Pro League',  9, 'Right'),
('Marcelo Brozovic',         'Al Nassr',          'Croatian',      'CDM', 31, 'Saudi Pro League', 18, 'Right'),
('Sadio Mane',               'Al Nassr',          'Senegalese',    'LW',  32, 'Saudi Pro League', 10, 'Right'),
('Ruben Neves',              'Al Hilal',          'Portuguese',    'CDM', 27, 'Saudi Pro League',  8, 'Right'),
('Malcom',                   'Al Hilal',          'Brazilian',     'RW',  26, 'Saudi Pro League',  7, 'Right'),
('Kalidou Koulibaly',        'Al Hilal',          'Senegalese',    'CB',  32, 'Saudi Pro League',  3, 'Right'),
('Fabinho',                  'Al Ittihad',        'Brazilian',     'CDM', 30, 'Saudi Pro League',  3, 'Right'),
('Aleksandar Mitrovic',      'Al Hilal',          'Serbian',       'ST',  29, 'Saudi Pro League',  9, 'Right');

-- ─── Pre-populate daily puzzles for the first year ────────────────────────────
-- This generates a daily puzzle assignment for Jan 2024 – Dec 2024
-- Using the same seeded shuffle logic as the client
do $$
declare
  v_date date := '2024-01-01';
  v_player_ids integer[];
  v_count integer;
  i integer := 0;
begin
  select array_agg(id order by (id * 1664525 + 1013904223) & x'7fffffff'::integer)
  into v_player_ids from public.players;
  
  v_count := array_length(v_player_ids, 1);
  
  while v_date <= '2025-12-31' loop
    insert into public.daily_puzzles (date, player_id)
    values (v_date, v_player_ids[(i % v_count) + 1])
    on conflict (date) do nothing;
    
    v_date := v_date + 1;
    i := i + 1;
  end loop;
end $$;
