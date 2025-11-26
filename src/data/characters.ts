/**
 * Character roster data for Monster Brawl
 * This data-driven approach allows new characters to be added without code changes
 */

import { CharacterTemplate } from '../types';

/**
 * Dracula - opponent only character
 */
export const DRACULA_CHARACTER: CharacterTemplate = {
  id: 'dracula',
  name: 'dracula',
  displayName: 'Dracula',
  description: 'The legendary vampire lord',
  imageUrl: '/Dracula.svg',
  thumbnailUrl: '/Dracula.svg',
  maxHealth: 100,
  opponentId: 'little-red'
};

/**
 * All characters including opponents
 */
const ALL_CHARACTERS: CharacterTemplate[] = [
  {
    id: 'little-red',
    name: 'little-red',
    displayName: 'Little Red Riding Hood',
    description: 'A fierce fighter with a sharp tongue',
    imageUrl: '/RedRidingHood.png',
    thumbnailUrl: '/RedRidingHood.png',
    maxHealth: 100,
    opponentId: 'dracula'
  },
  {
    id: 'mummy',
    name: 'mummy',
    displayName: 'The Mummy',
    description: 'An ancient warrior wrapped in mystery',
    imageUrl: '/Mummy.png',
    thumbnailUrl: '/Mummy.png',
    maxHealth: 100,
    opponentId: 'dracula'
  },
  DRACULA_CHARACTER
];

/**
 * Playable character roster (excludes opponent-only characters)
 */
export const CHARACTER_ROSTER: CharacterTemplate[] = [
  {
    id: 'little-red',
    name: 'little-red',
    displayName: 'Little Red Riding Hood',
    description: 'A fierce fighter with a sharp tongue',
    imageUrl: '/RedRidingHood.png',
    thumbnailUrl: '/RedRidingHood.png',
    maxHealth: 100,
    opponentId: 'dracula'
  },
  {
    id: 'mummy',
    name: 'mummy',
    displayName: 'The Mummy',
    description: 'An ancient warrior wrapped in mystery',
    imageUrl: '/Mummy.png',
    thumbnailUrl: '/Mummy.png',
    maxHealth: 100,
    opponentId: 'dracula'
  }
];

/**
 * Helper function to find a character by ID (searches all characters including opponents)
 */
export function getCharacterById(id: string): CharacterTemplate | undefined {
  return ALL_CHARACTERS.find(char => char.id === id);
}

/**
 * Helper function to get default player character
 */
export function getDefaultPlayer(): CharacterTemplate {
  return CHARACTER_ROSTER[0];
}

/**
 * Helper function to get default opponent character
 */
export function getDefaultOpponent(): CharacterTemplate {
  return DRACULA_CHARACTER;
}

/**
 * Converts a CharacterTemplate to a Character instance for combat
 * Requirements: 3.4, 7.3
 * 
 * @param template - Character template from roster
 * @param role - Role in combat ('player' or 'opponent')
 * @returns Character instance ready for combat
 */
export function createCharacterFromTemplate(template: CharacterTemplate, role: 'player' | 'opponent'): import('../types').Character {
  return {
    id: role,
    name: template.displayName,
    health: template.maxHealth,
    maxHealth: template.maxHealth,
    imageUrl: template.imageUrl
  };
}
