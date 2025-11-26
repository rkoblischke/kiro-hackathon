/**
 * Combat logic for Monster Brawl
 * Handles combat evaluation and damage application
 */

import { Insult, Comeback, CombatResult } from '../types';

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
      damage: 0,
      message: "Perfect counter! No damage taken."
    };
  } else {
    return {
      success: false,
      damage: 15,
      message: "The comeback failed! Taking damage."
    };
  }
}
