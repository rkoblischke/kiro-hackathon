/**
 * Combat logic for Monster Brawl game
 */

import { Character } from '../types';

/**
 * Applies damage to a character and returns the updated character.
 * Ensures health cannot go below 0.
 * 
 * @param character - The character to apply damage to
 * @param damage - The amount of damage to apply
 * @returns A new character object with updated health
 */
export function applyDamage(character: Character, damage: number): Character {
  const newHealth = Math.max(0, character.health - damage);
  
  return {
    ...character,
    health: newHealth
  };
}
