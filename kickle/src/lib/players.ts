import type { Player } from '@/types';

export const PLAYERS: Player[] = [
  // ─── Premier League ───────────────────────────────────────────────────────
  { id: 1,  name: 'Erling Haaland',       club: 'Manchester City',   nationality: 'Norwegian',   position: 'ST',  age: 23, league: 'Premier League',  shirt_number: 9,  preferred_foot: 'Left' },
  { id: 2,  name: 'Mohamed Salah',        club: 'Liverpool',         nationality: 'Egyptian',    position: 'RW',  age: 31, league: 'Premier League',  shirt_number: 11, preferred_foot: 'Left' },
  { id: 3,  name: 'Kevin De Bruyne',      club: 'Manchester City',   nationality: 'Belgian',     position: 'CAM', age: 32, league: 'Premier League',  shirt_number: 17, preferred_foot: 'Right' },
  { id: 4,  name: 'Bukayo Saka',          club: 'Arsenal',           nationality: 'English',     position: 'RW',  age: 22, league: 'Premier League',  shirt_number: 7,  preferred_foot: 'Left' },
  { id: 5,  name: 'Marcus Rashford',      club: 'Manchester United', nationality: 'English',     position: 'LW',  age: 26, league: 'Premier League',  shirt_number: 10, preferred_foot: 'Right' },
  { id: 6,  name: 'Virgil van Dijk',      club: 'Liverpool',         nationality: 'Dutch',       position: 'CB',  age: 32, league: 'Premier League',  shirt_number: 4,  preferred_foot: 'Right' },
  { id: 7,  name: 'Rodri',               club: 'Manchester City',   nationality: 'Spanish',     position: 'CDM', age: 27, league: 'Premier League',  shirt_number: 16, preferred_foot: 'Right' },
  { id: 8,  name: 'Son Heung-min',        club: 'Tottenham',         nationality: 'South Korean', position: 'LW', age: 31, league: 'Premier League',  shirt_number: 7,  preferred_foot: 'Left' },
  { id: 9,  name: 'Gabriel Martinelli',   club: 'Arsenal',           nationality: 'Brazilian',   position: 'LW',  age: 22, league: 'Premier League',  shirt_number: 11, preferred_foot: 'Right' },
  { id: 10, name: 'Phil Foden',           club: 'Manchester City',   nationality: 'English',     position: 'CAM', age: 23, league: 'Premier League',  shirt_number: 47, preferred_foot: 'Left' },
  { id: 11, name: 'Bruno Fernandes',      club: 'Manchester United', nationality: 'Portuguese',  position: 'CAM', age: 29, league: 'Premier League',  shirt_number: 8,  preferred_foot: 'Right' },
  { id: 12, name: 'Alisson Becker',       club: 'Liverpool',         nationality: 'Brazilian',   position: 'GK',  age: 31, league: 'Premier League',  shirt_number: 1,  preferred_foot: 'Right' },
  { id: 13, name: 'Ederson',             club: 'Manchester City',   nationality: 'Brazilian',   position: 'GK',  age: 30, league: 'Premier League',  shirt_number: 31, preferred_foot: 'Left' },
  { id: 14, name: 'Martin Odegaard',      club: 'Arsenal',           nationality: 'Norwegian',   position: 'CAM', age: 25, league: 'Premier League',  shirt_number: 8,  preferred_foot: 'Right' },
  { id: 15, name: 'Trent Alexander-Arnold', club: 'Liverpool',       nationality: 'English',     position: 'RB',  age: 25, league: 'Premier League',  shirt_number: 66, preferred_foot: 'Right' },
  { id: 16, name: 'Cole Palmer',          club: 'Chelsea',           nationality: 'English',     position: 'CAM', age: 21, league: 'Premier League',  shirt_number: 20, preferred_foot: 'Right' },
  { id: 17, name: 'Alexander Isak',       club: 'Newcastle United',  nationality: 'Swedish',     position: 'ST',  age: 24, league: 'Premier League',  shirt_number: 14, preferred_foot: 'Right' },
  { id: 18, name: 'Dominic Solanke',      club: 'Tottenham',         nationality: 'English',     position: 'ST',  age: 26, league: 'Premier League',  shirt_number: 19, preferred_foot: 'Right' },

  // ─── La Liga ──────────────────────────────────────────────────────────────
  { id: 19, name: 'Vinicius Junior',      club: 'Real Madrid',       nationality: 'Brazilian',   position: 'LW',  age: 23, league: 'La Liga',         shirt_number: 7,  preferred_foot: 'Right' },
  { id: 20, name: 'Jude Bellingham',      club: 'Real Madrid',       nationality: 'English',     position: 'CAM', age: 20, league: 'La Liga',         shirt_number: 5,  preferred_foot: 'Right' },
  { id: 21, name: 'Robert Lewandowski',   club: 'Barcelona',         nationality: 'Polish',      position: 'ST',  age: 35, league: 'La Liga',         shirt_number: 9,  preferred_foot: 'Right' },
  { id: 22, name: 'Lamine Yamal',         club: 'Barcelona',         nationality: 'Spanish',     position: 'RW',  age: 16, league: 'La Liga',         shirt_number: 27, preferred_foot: 'Right' },
  { id: 23, name: 'Pedri',               club: 'Barcelona',         nationality: 'Spanish',     position: 'CM',  age: 21, league: 'La Liga',         shirt_number: 8,  preferred_foot: 'Right' },
  { id: 24, name: 'Kylian Mbappé',        club: 'Real Madrid',       nationality: 'French',      position: 'ST',  age: 25, league: 'La Liga',         shirt_number: 9,  preferred_foot: 'Right' },
  { id: 25, name: 'Thibaut Courtois',     club: 'Real Madrid',       nationality: 'Belgian',     position: 'GK',  age: 31, league: 'La Liga',         shirt_number: 1,  preferred_foot: 'Right' },
  { id: 26, name: 'Gavi',                club: 'Barcelona',         nationality: 'Spanish',     position: 'CM',  age: 19, league: 'La Liga',         shirt_number: 6,  preferred_foot: 'Right' },
  { id: 27, name: 'Ferran Torres',        club: 'Barcelona',         nationality: 'Spanish',     position: 'LW',  age: 24, league: 'La Liga',         shirt_number: 7,  preferred_foot: 'Right' },
  { id: 28, name: 'David Alaba',          club: 'Real Madrid',       nationality: 'Austrian',    position: 'CB',  age: 31, league: 'La Liga',         shirt_number: 4,  preferred_foot: 'Left' },
  { id: 29, name: 'Antoine Griezmann',    club: 'Atletico Madrid',   nationality: 'French',      position: 'CF',  age: 32, league: 'La Liga',         shirt_number: 7,  preferred_foot: 'Left' },
  { id: 30, name: 'Alvaro Morata',        club: 'Atletico Madrid',   nationality: 'Spanish',     position: 'ST',  age: 31, league: 'La Liga',         shirt_number: 19, preferred_foot: 'Right' },

  // ─── Bundesliga ───────────────────────────────────────────────────────────
  { id: 31, name: 'Harry Kane',           club: 'Bayern Munich',     nationality: 'English',     position: 'ST',  age: 30, league: 'Bundesliga',      shirt_number: 9,  preferred_foot: 'Right' },
  { id: 32, name: 'Leroy Sané',           club: 'Bayern Munich',     nationality: 'German',      position: 'LW',  age: 28, league: 'Bundesliga',      shirt_number: 10, preferred_foot: 'Right' },
  { id: 33, name: 'Jamal Musiala',        club: 'Bayern Munich',     nationality: 'German',      position: 'CAM', age: 21, league: 'Bundesliga',      shirt_number: 42, preferred_foot: 'Right' },
  { id: 34, name: 'Florian Wirtz',        club: 'Bayer Leverkusen',  nationality: 'German',      position: 'CAM', age: 20, league: 'Bundesliga',      shirt_number: 10, preferred_foot: 'Right' },
  { id: 35, name: 'Granit Xhaka',         club: 'Bayer Leverkusen',  nationality: 'Swiss',       position: 'CDM', age: 31, league: 'Bundesliga',      shirt_number: 34, preferred_foot: 'Left' },
  { id: 36, name: 'Victor Boniface',      club: 'Bayer Leverkusen',  nationality: 'Nigerian',    position: 'ST',  age: 23, league: 'Bundesliga',      shirt_number: 9,  preferred_foot: 'Right' },
  { id: 37, name: 'Manuel Neuer',         club: 'Bayern Munich',     nationality: 'German',      position: 'GK',  age: 38, league: 'Bundesliga',      shirt_number: 1,  preferred_foot: 'Right' },
  { id: 38, name: 'Thomas Müller',        club: 'Bayern Munich',     nationality: 'German',      position: 'CAM', age: 34, league: 'Bundesliga',      shirt_number: 25, preferred_foot: 'Right' },
  { id: 39, name: 'Christopher Nkunku',   club: 'Chelsea',           nationality: 'French',      position: 'CF',  age: 26, league: 'Premier League', shirt_number: 18, preferred_foot: 'Right' },
  { id: 40, name: 'Nico Schlotterbeck',   club: 'Borussia Dortmund', nationality: 'German',      position: 'CB',  age: 24, league: 'Bundesliga',      shirt_number: 4,  preferred_foot: 'Left' },

  // ─── Serie A ──────────────────────────────────────────────────────────────
  { id: 41, name: 'Lautaro Martinez',     club: 'Inter Milan',       nationality: 'Argentinian', position: 'ST',  age: 26, league: 'Serie A',         shirt_number: 10, preferred_foot: 'Right' },
  { id: 42, name: 'Khvicha Kvaratskhelia', club: 'Napoli',           nationality: 'Georgian',    position: 'LW',  age: 23, league: 'Serie A',         shirt_number: 77, preferred_foot: 'Right' },
  { id: 43, name: 'Victor Osimhen',       club: 'Galatasaray',       nationality: 'Nigerian',    position: 'ST',  age: 25, league: 'Serie A',         shirt_number: 9,  preferred_foot: 'Right' },
  { id: 44, name: 'Federico Chiesa',      club: 'Liverpool',         nationality: 'Italian',     position: 'RW',  age: 26, league: 'Premier League', shirt_number: 14, preferred_foot: 'Right' },
  { id: 45, name: 'Nicolò Barella',       club: 'Inter Milan',       nationality: 'Italian',     position: 'CM',  age: 27, league: 'Serie A',         shirt_number: 23, preferred_foot: 'Right' },
  { id: 46, name: 'Dusan Vlahovic',       club: 'Juventus',          nationality: 'Serbian',     position: 'ST',  age: 24, league: 'Serie A',         shirt_number: 9,  preferred_foot: 'Left' },
  { id: 47, name: 'Paulo Dybala',         club: 'AS Roma',           nationality: 'Argentinian', position: 'CAM', age: 30, league: 'Serie A',         shirt_number: 21, preferred_foot: 'Left' },
  { id: 48, name: 'Mike Maignan',         club: 'AC Milan',          nationality: 'French',      position: 'GK',  age: 28, league: 'Serie A',         shirt_number: 16, preferred_foot: 'Right' },
  { id: 49, name: 'Rafael Leao',          club: 'AC Milan',          nationality: 'Portuguese',  position: 'LW',  age: 24, league: 'Serie A',         shirt_number: 10, preferred_foot: 'Right' },
  { id: 50, name: 'Marcus Thuram',        club: 'Inter Milan',       nationality: 'French',      position: 'ST',  age: 26, league: 'Serie A',         shirt_number: 9,  preferred_foot: 'Right' },

  // ─── Ligue 1 ──────────────────────────────────────────────────────────────
  { id: 51, name: 'Ousmane Dembélé',      club: 'PSG',               nationality: 'French',      position: 'RW',  age: 26, league: 'Ligue 1',         shirt_number: 10, preferred_foot: 'Right' },
  { id: 52, name: 'Bradley Barcola',      club: 'PSG',               nationality: 'French',      position: 'LW',  age: 21, league: 'Ligue 1',         shirt_number: 29, preferred_foot: 'Right' },
  { id: 53, name: 'Gianluigi Donnarumma', club: 'PSG',               nationality: 'Italian',     position: 'GK',  age: 25, league: 'Ligue 1',         shirt_number: 99, preferred_foot: 'Right' },
  { id: 54, name: 'Mason Greenwood',      club: 'Marseille',         nationality: 'English',     position: 'RW',  age: 23, league: 'Ligue 1',         shirt_number: 10, preferred_foot: 'Right' },
  { id: 55, name: 'Jonathan David',       club: 'Lille',             nationality: 'Canadian',    position: 'ST',  age: 24, league: 'Ligue 1',         shirt_number: 9,  preferred_foot: 'Right' },
  { id: 56, name: 'Warren Zaire-Emery',   club: 'PSG',               nationality: 'French',      position: 'CM',  age: 17, league: 'Ligue 1',         shirt_number: 33, preferred_foot: 'Right' },
  { id: 57, name: 'Vitinha',              club: 'PSG',               nationality: 'Portuguese',  position: 'CM',  age: 24, league: 'Ligue 1',         shirt_number: 17, preferred_foot: 'Right' },

  // ─── MLS ──────────────────────────────────────────────────────────────────
  { id: 58, name: 'Lionel Messi',         club: 'Inter Miami',       nationality: 'Argentinian', position: 'CF',  age: 36, league: 'MLS',             shirt_number: 10, preferred_foot: 'Left' },
  { id: 59, name: 'Lorenzo Insigne',      club: 'Toronto FC',        nationality: 'Italian',     position: 'LW',  age: 32, league: 'MLS',             shirt_number: 24, preferred_foot: 'Left' },
  { id: 60, name: 'Xherdan Shaqiri',      club: 'Chicago Fire',      nationality: 'Swiss',       position: 'CAM', age: 32, league: 'MLS',             shirt_number: 10, preferred_foot: 'Right' },
  { id: 61, name: 'Riqui Puig',           club: 'LA Galaxy',         nationality: 'Spanish',     position: 'CAM', age: 24, league: 'MLS',             shirt_number: 6,  preferred_foot: 'Right' },
  { id: 62, name: 'Cucho Hernandez',      club: 'Columbus Crew',     nationality: 'Colombian',   position: 'ST',  age: 25, league: 'MLS',             shirt_number: 9,  preferred_foot: 'Right' },
  { id: 63, name: 'Georgios Giakoumakis', club: 'Atlanta United',    nationality: 'Greek',       position: 'ST',  age: 29, league: 'MLS',             shirt_number: 7,  preferred_foot: 'Right' },
  { id: 64, name: 'Luiz Araújo',          club: 'Atlanta United',    nationality: 'Brazilian',   position: 'LW',  age: 27, league: 'MLS',             shirt_number: 11, preferred_foot: 'Right' },
  { id: 65, name: 'Caden Clark',          club: 'New York Red Bulls', nationality: 'American',   position: 'CM',  age: 21, league: 'MLS',             shirt_number: 17, preferred_foot: 'Right' },

  // ─── Saudi Pro League ─────────────────────────────────────────────────────
  { id: 66, name: 'Cristiano Ronaldo',    club: 'Al Nassr',          nationality: 'Portuguese',  position: 'ST',  age: 39, league: 'Saudi Pro League', shirt_number: 7,  preferred_foot: 'Right' },
  { id: 67, name: 'Neymar Jr',            club: 'Al Hilal',          nationality: 'Brazilian',   position: 'LW',  age: 32, league: 'Saudi Pro League', shirt_number: 10, preferred_foot: 'Right' },
  { id: 68, name: 'Karim Benzema',        club: 'Al Ittihad',        nationality: 'French',      position: 'ST',  age: 36, league: 'Saudi Pro League', shirt_number: 9,  preferred_foot: 'Right' },
  { id: 69, name: 'N\'Golo Kanté',        club: 'Al Ittihad',        nationality: 'French',      position: 'CDM', age: 33, league: 'Saudi Pro League', shirt_number: 7,  preferred_foot: 'Right' },
  { id: 70, name: 'Riyad Mahrez',         club: 'Al Ahli',           nationality: 'Algerian',    position: 'RW',  age: 33, league: 'Saudi Pro League', shirt_number: 7,  preferred_foot: 'Left' },
  { id: 71, name: 'Roberto Firmino',      club: 'Al Ahli',           nationality: 'Brazilian',   position: 'CF',  age: 32, league: 'Saudi Pro League', shirt_number: 9,  preferred_foot: 'Right' },
  { id: 72, name: 'Jordan Henderson',     club: 'Ajax',              nationality: 'English',     position: 'CM',  age: 33, league: 'Saudi Pro League', shirt_number: 6,  preferred_foot: 'Right' },
  { id: 73, name: 'Marcelo Brozovic',     club: 'Al Nassr',          nationality: 'Croatian',    position: 'CDM', age: 31, league: 'Saudi Pro League', shirt_number: 18, preferred_foot: 'Right' },
  { id: 74, name: 'Sadio Mané',           club: 'Al Nassr',          nationality: 'Senegalese',  position: 'LW',  age: 32, league: 'Saudi Pro League', shirt_number: 10, preferred_foot: 'Right' },
  { id: 75, name: 'Ruben Neves',          club: 'Al Hilal',          nationality: 'Portuguese',  position: 'CDM', age: 27, league: 'Saudi Pro League', shirt_number: 8,  preferred_foot: 'Right' },
  { id: 76, name: 'Malcom',              club: 'Al Hilal',          nationality: 'Brazilian',   position: 'RW',  age: 26, league: 'Saudi Pro League', shirt_number: 7,  preferred_foot: 'Right' },
  { id: 77, name: 'Kalidou Koulibaly',    club: 'Al Hilal',          nationality: 'Senegalese',  position: 'CB',  age: 32, league: 'Saudi Pro League', shirt_number: 3,  preferred_foot: 'Right' },
  { id: 78, name: 'Fabinho',             club: 'Al Ittihad',        nationality: 'Brazilian',   position: 'CDM', age: 30, league: 'Saudi Pro League', shirt_number: 3,  preferred_foot: 'Right' },
  { id: 79, name: 'Aleksandar Mitrovic',  club: 'Al Hilal',          nationality: 'Serbian',     position: 'ST',  age: 29, league: 'Saudi Pro League', shirt_number: 9,  preferred_foot: 'Right' },
  { id: 80, name: 'Ivan Perisic',         club: 'Al Kholood',        nationality: 'Croatian',    position: 'LW',  age: 35, league: 'Saudi Pro League', shirt_number: 44, preferred_foot: 'Left' },
];

// ─── Deterministic daily player selection ─────────────────────────────────────
export function getDailyPlayer(date: string = new Date().toISOString().slice(0, 10)): Player {
  const epoch = new Date('2024-01-01').getTime();
  const today = new Date(date).getTime();
  const dayIndex = Math.floor((today - epoch) / (1000 * 60 * 60 * 24));
  const shuffled = seededShuffle([...PLAYERS], 42); // seed ensures same order always
  return shuffled[dayIndex % shuffled.length];
}

// Seeded Fisher-Yates shuffle
function seededShuffle<T>(arr: T[], seed: number): T[] {
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getPlayerById(id: number): Player | undefined {
  return PLAYERS.find((p) => p.id === id);
}

export function searchPlayers(query: string): Player[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return PLAYERS.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 8);
}
