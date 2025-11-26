/**
 * Combat logic for Monster Brawl
 * Handles combat evaluation and damage application
 */

import { Character, Insult, Comeback, CombatResult } from '../types';

/**
 * Evaluates whether a comeback successfully counters an insult
 * 
 * @param insult - The insult being countered
 * @param comeback - The comeback being used
 * @returns CombatResult with success status, damage amount, and message
 * 
 * Requirements: 1.4, 3.2, 4.1, 8.4
 */
export function evaluateCombat(insult: Insult, comeback: Comeback): CombatResult {
  const success = comeback.id === insult.correctComebackId;
  
  if (success) {
    return {
      success: true,
      damage: 0, // Successful comeback prevents damage
      message: "Perfect counter! No damage taken."
    };
  } else {
    return {
      success: false,
      damage: 20, // Failed comeback means defender takes damage
      message: "The comeback failed! Taking damage."
    };
  }
}

/**
 * Applies damage to a character and returns the updated character.
 * Ensures health cannot go below 0.
 * 
 * @param character - The character to apply damage to
 * @param damage - The amount of damage to apply
 * @returns A new character object with updated health
 * 
 * Requirements: 1.5, 3.3, 4.3
 */
export function applyDamage(character: Character, damage: number): Character {
  const newHealth = Math.max(0, character.health - damage);
  
  return {
    ...character,
    health: newHealth
  };
}
