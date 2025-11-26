/**
 * Core type definitions for Monster Brawl game
 */

export interface Character {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  imageUrl: string;
}

export type InsultCategory = 'mom' | 'creature' | 'hygiene' | 'pun' | 'fashion' | 'power' | 'social';

export interface CategoryConfig {
  name: string;
  color: string;
  displayName: string;
}

export type CategoryMap = Record<InsultCategory, CategoryConfig>;

export interface Insult {
  id: string;
  text: string;
  correctComebackId: string;
  category: InsultCategory;
}

export interface Comeback {
  id: string;
  text: string;
}

export interface GameState {
  player: Character;
  opponent: Character;
  currentTurn: 'player' | 'opponent';
  phase: 'player-attack' | 'player-defend' | 'opponent-attack' | 'opponent-defend' | 'game-over';
  currentInsult: Insult | null;
  availableInsults: Insult[];
  availableComebacks: Comeback[];
  message: string;
  isAnimating: boolean;
}

export interface CombatResult {
  success: boolean;
  damage: number;
  message: string;
}
