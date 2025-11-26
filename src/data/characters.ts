/**
 * Character roster data for Monster Brawl
 * This data-driven approach allows new characters to be added without code changes
 */

import { CharacterTemplate } from '../types';

export const CHARACTER_ROSTER: CharacterTemplate[] = [
  {
    id: 'little-red',
    name: 'little-red',
    displayName: 'Little Red Riding Hood',
    description: 'A fierce fighter with a sharp tongue',
    imageUrl: '/RedRidingHood.png',
    thumbnailUrl: '/RedRidingHood.png',
    maxHealth: 100,
    opponentId: 'mummy'
  },
  {
    id: 'mummy',
    name: 'mummy',
    displayName: 'The Mummy',
    description: 'An ancient warrior wrapped in mystery',
    imageUrl: '/Mummy.jpg',
    thumbnailUrl: '/Mummy.jpg',
    maxHealth: 100,
    opponentId: 'little-red'
  }
];

/**
 * Helper function to find a character by ID
 */
export function getCharacterById(id: string): CharacterTemplate | undefined {
  return CHARACTER_ROSTER.find(char => char.id === id);
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
  return CHARACTER_ROSTER[1];
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
