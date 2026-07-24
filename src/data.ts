import { Player, Fixture, Trophy, FanChant, TacticalNode } from './types';

export const PLAYERS: Player[] = [
  {
    id: 'p1',
    name: "Marcus 'Thunder' Vance",
    position: 'Forward',
    tacticalRole: 'ST',
    number: 9,
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    nationality: 'England',
    age: 24,
    goals: 28,
    assists: 8,
    matches: 32,
    bio: 'The spearhead of Ronz attacking storm. Known for explosive burst speed and clinical rain-swept finishes in critical final minutes.',
    attributes: { speed: 94, shooting: 91, passing: 78, dribbling: 85, defending: 35, physical: 88 }
  },
  {
    id: 'p2',
    name: 'Zackary Ronz',
    position: 'Forward',
    tacticalRole: 'LW',
    number: 7,
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    nationality: 'Portugal',
    age: 26,
    goals: 18,
    assists: 15,
    matches: 31,
    bio: 'A dazzling winger with creative license. His footwork on slippery, rain-swept turf is pure wizardry, creating magic from nothing.',
    attributes: { speed: 96, shooting: 86, passing: 89, dribbling: 95, defending: 40, physical: 76 }
  },
  {
    id: 'p3',
    name: 'Mateo Silvera',
    position: 'Forward',
    tacticalRole: 'RW',
    number: 11,
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
    nationality: 'Argentina',
    age: 23,
    goals: 14,
    assists: 12,
    matches: 29,
    bio: 'An incredibly gifted playmaker who carves inside with his left foot, carving curves into top-bins that defy aerodynamics.',
    attributes: { speed: 91, shooting: 84, passing: 87, dribbling: 92, defending: 42, physical: 70 }
  },
  {
    id: 'p4',
    name: 'Elias Sterling',
    position: 'Midfielder',
    tacticalRole: 'LCM',
    number: 8,
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    nationality: 'Germany',
    age: 28,
    goals: 6,
    assists: 19,
    matches: 33,
    bio: 'The tactical general. Holds the keys to Ronz FC transitions. Distributes and orchestrates high-tempo counters with surgical precision.',
    attributes: { speed: 78, shooting: 80, passing: 94, dribbling: 87, defending: 72, physical: 81 }
  },
  {
    id: 'p5',
    name: 'Koji Takahashi',
    position: 'Midfielder',
    tacticalRole: 'RCM',
    number: 10,
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    nationality: 'Japan',
    age: 25,
    goals: 9,
    assists: 11,
    matches: 30,
    bio: 'An artistic midfielder who visualizes tight spaces on the wet pitch before they appear. Exceptional spatial awareness and vision.',
    attributes: { speed: 82, shooting: 78, passing: 91, dribbling: 90, defending: 64, physical: 72 }
  },
  {
    id: 'p6',
    name: 'Amara Diop',
    position: 'Midfielder',
    tacticalRole: 'DM',
    number: 6,
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop',
    nationality: 'Senegal',
    age: 27,
    goals: 2,
    assists: 5,
    matches: 32,
    bio: 'The impenetrable anchor. Intercepts balls and dominates the midfield physically, shutting down opposition attacks with absolute dominance.',
    attributes: { speed: 80, shooting: 65, passing: 82, dribbling: 79, defending: 89, physical: 92 }
  },
  {
    id: 'p7',
    name: 'Lucas Dubois',
    position: 'Defender',
    tacticalRole: 'LB',
    number: 3,
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop',
    nationality: 'France',
    age: 24,
    goals: 1,
    assists: 7,
    matches: 28,
    bio: 'Relentless speed on the left flank. Provides overlapping support and fires dynamic whipped-crosses into the opponent box.',
    attributes: { speed: 90, shooting: 62, passing: 81, dribbling: 83, defending: 78, physical: 79 }
  },
  {
    id: 'p8',
    name: 'Victor Lindqvist',
    position: 'Defender',
    tacticalRole: 'LCB',
    number: 4,
    photoUrl: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=400&auto=format&fit=crop',
    nationality: 'Sweden',
    age: 29,
    goals: 4,
    assists: 2,
    matches: 34,
    bio: 'The defensive pillar. Imposing height, elite timing in slide tackles, and an unbeatable aerial presence in both penalty areas.',
    attributes: { speed: 74, shooting: 58, passing: 72, dribbling: 68, defending: 92, physical: 90 }
  },
  {
    id: 'p9',
    name: 'Xavier Nkosi',
    position: 'Defender',
    tacticalRole: 'RCB',
    number: 5,
    photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=400&auto=format&fit=crop',
    nationality: 'South Africa',
    age: 27,
    goals: 3,
    assists: 1,
    matches: 31,
    bio: 'A highly cerebral central defender. Noted for impeccable defensive reading, clean standing tackles, and leadership in high-pressure matches.',
    attributes: { speed: 79, shooting: 55, passing: 76, dribbling: 71, defending: 90, physical: 87 }
  },
  {
    id: 'p10',
    name: 'Tariq Al-Fayed',
    position: 'Defender',
    tacticalRole: 'RB',
    number: 2,
    photoUrl: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?q=80&w=400&auto=format&fit=crop',
    nationality: 'Egypt',
    age: 25,
    goals: 2,
    assists: 8,
    matches: 29,
    bio: 'Relentless defensive engine. Runs tirelessly for 90 minutes to shut down opposition wingers and transition into rapid attacks.',
    attributes: { speed: 88, shooting: 60, passing: 83, dribbling: 80, defending: 81, physical: 82 }
  },
  {
    id: 'p11',
    name: "Christian 'The Wall' Meyer",
    position: 'Goalkeeper',
    tacticalRole: 'GK',
    number: 1,
    photoUrl: 'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=400&auto=format&fit=crop',
    nationality: 'Austria',
    age: 31,
    goals: 0,
    assists: 0,
    matches: 34,
    cleanSheets: 18,
    bio: 'A legendary goalkeeper. Master of spatial reading, famed for spectacular acrobatic diving saves in rain-soaked winter stadium conditions.',
    attributes: { speed: 64, shooting: 15, passing: 70, dribbling: 60, defending: 95, physical: 89 }
  }
];

export const FIXTURES: Fixture[] = [
  {
    id: 'f1',
    opponent: 'City Rangers',
    opponentLogoUrl: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=80&auto=format&fit=crop',
    venue: 'Obsidian Arena (Home)',
    date: '2026-07-25',
    time: '19:45',
    isHome: true,
    status: 'Upcoming',
    competition: 'Super League Premium'
  },
  {
    id: 'f2',
    opponent: 'Metropolis FC',
    opponentLogoUrl: 'https://images.unsplash.com/photo-1431324155629-1a6edd1dec1d?q=80&w=80&auto=format&fit=crop',
    venue: 'Metropolis Ground (Away)',
    date: '2026-07-15',
    time: '20:00',
    isHome: false,
    status: 'Finished',
    score: { home: 1, away: 3 }, // Ronz Won! (Away team was Ronz)
    competition: 'Continental Champions Cup'
  },
  {
    id: 'f3',
    opponent: 'Vanguard United',
    opponentLogoUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=80&auto=format&fit=crop',
    venue: 'Obsidian Arena (Home)',
    date: '2026-08-02',
    time: '17:30',
    isHome: true,
    status: 'Upcoming',
    competition: 'Super League Premium'
  }
];

export const TROPHIES: Trophy[] = [
  {
    id: 't1',
    name: 'Continental Champions Cup',
    count: 3,
    years: ['2023', '2025', '2026'],
    description: 'The absolute pinnacle of continental club football, secured under thunderous rain in memorable finals.',
    iconName: 'Trophy'
  },
  {
    id: 't2',
    name: 'Super League Gold',
    count: 5,
    years: ['2019', '2021', '2022', '2024', '2025'],
    description: 'Awarded to the most consistent, dominant club across a grueling 38-match domestic campaign.',
    iconName: 'Shield'
  },
  {
    id: 't3',
    name: 'Elite Super Cup',
    count: 2,
    years: ['2022', '2025'],
    description: 'The super-charged clash of domestic league and cup champions, establishing supreme bragging rights.',
    iconName: 'Award'
  },
  {
    id: 't4',
    name: 'Rain-Swept Invincibles Shield',
    count: 1,
    years: ['2024'],
    description: 'Commemorating our legendary undefeated home run in games played under storm conditions at Obsidian Arena.',
    iconName: 'Flame'
  }
];

export const CHANTS: FanChant[] = [
  {
    id: 'c1',
    title: 'The Crimson Storm',
    lyrics: "Through the winds and pouring rain,\nWe stand tall, we feel no pain!\nOrange, red, and obsidian deep,\nPromises of victory we always keep!\nOH RONZ FC, THE STORM IS HERE!\nOH RONZ FC, WE KNOW NO FEAR!",
    duration: '0:45',
    tempo: 125,
    mood: 'Epic & Fast'
  },
  {
    id: 'c2',
    title: 'Ronz Till I Die',
    lyrics: "When the sky turns black and dark,\nObsidian field receives our spark!\nFrom the stands we roar as one,\nTill the final battle's won!\nRonz till I die, Ronz till I die,\nUnder the floodlights, our spirits fly!",
    duration: '1:05',
    tempo: 110,
    mood: 'Steady & Deep'
  },
  {
    id: 'c3',
    title: 'Defiance in the Rain',
    lyrics: "Let it pour, let it storm!\nIn the rain, our gold is born!\nEleven giants on the field,\nWe will fight, we will not yield!\nALLEZ ALLEZ, RONZ FOOTBALL CLUB!\nALLEZ ALLEZ, THE SOUL WE LOVE!",
    duration: '0:50',
    tempo: 130,
    mood: 'Relentless & Fast'
  }
];

export const TACTICAL_LINEUP: TacticalNode[] = [
  { role: 'LW', x: 20, y: 18, playerId: 'p2' },
  { role: 'ST', x: 50, y: 10, playerId: 'p1' },
  { role: 'RW', x: 80, y: 18, playerId: 'p3' },
  { role: 'LCM', x: 25, y: 42, playerId: 'p4' },
  { role: 'RCM', x: 75, y: 42, playerId: 'p5' },
  { role: 'DM', x: 50, y: 52, playerId: 'p6' },
  { role: 'LB', x: 15, y: 72, playerId: 'p7' },
  { role: 'LCB', x: 38, y: 76, playerId: 'p8' },
  { role: 'RCB', x: 62, y: 76, playerId: 'p9' },
  { role: 'RB', x: 85, y: 72, playerId: 'p10' },
  { role: 'GK', x: 50, y: 92, playerId: 'p11' }
];
