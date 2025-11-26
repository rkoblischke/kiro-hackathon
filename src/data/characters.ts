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
    opponentId: 'dracula'
  },
  {
    id: 'dracula',
    name: 'dracula',
    displayName: 'Count Dracula',
    description: 'The prince of darkness himself',
    imageUrl: '/Dracula.svg',
    thumbnailUrl: '/Dracula.svg',
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
