export interface PlayerAttributes {
  speed: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

export type PlayerPosition = 'Forward' | 'Midfielder' | 'Defender' | 'Goalkeeper';

export interface Player {
  id: string;
  name: string;
  position: PlayerPosition;
  tacticalRole: string; // e.g. "ST", "LW", "LCM"
  number: number;
  photoUrl: string;
  nationality: string;
  age: number;
  goals: number;
  assists: number;
  matches: number;
  cleanSheets?: number; // GK only
  bio: string;
  attributes: PlayerAttributes;
}

export interface Fixture {
  id: string;
  opponent: string;
  opponentLogoUrl: string;
  venue: string;
  date: string;
  time: string;
  isHome: boolean;
  status: 'Upcoming' | 'Live' | 'Finished';
  score?: {
    home: number;
    away: number;
  };
  competition: string;
}

export interface Trophy {
  id: string;
  name: string;
  count: number;
  years: string[];
  description: string;
  iconName: string; // Lucide icon mapping
}

export interface FanChant {
  id: string;
  title: string;
  lyrics: string;
  duration: string;
  tempo: number; // BPM for sound synthesis
  mood: string;
}

export interface TacticalNode {
  role: string; // e.g. "ST", "LW", "RW", "LCM", "RCM", "DM", "LB", "LCB", "RCB", "RB", "GK"
  x: number;    // % from left
  y: number;    // % from top
  playerId: string;
}
