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

/**
 * Character template for roster - defines available characters
 */
export interface CharacterTemplate {
  id: string;
  name: string;
  displayName: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  maxHealth: number;
  opponentId: string; // Default opponent for this character
}

/**
 * Game flow state - tracks current screen and selections
 */
export interface GameFlowState {
  currentScreen: 'start' | 'character-selection' | 'combat' | 'game-over';
  selectedCharacterId: string | null;
  selectedOpponentId: string | null;
}

/**
 * Character selection state - manages selection UI
 */
export interface CharacterSelectionState {
  characters: CharacterTemplate[];
  selectedCharacter: CharacterTemplate | null;
  hoveredCharacter: CharacterTemplate | null;
}

export interface Insult {
  id: string;
  text: string;
  correctComebackId: string;
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
