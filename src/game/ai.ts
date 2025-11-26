/**
 * AI opponent logic for Monster Brawl
 * Handles AI selection of insults and comebacks
 */

import { Insult, Comeback } from '../types';

/**
 * Randomly selects an insult from the available options
 * 
 * @param availableInsults - Array of insults to choose from
 * @returns A randomly selected insult from the available options
 * 
 * Requirements: 3.1, 3.4, 8.2, 8.3
 */
export function selectRandomInsult(availableInsults: Insult[]): Insult {
  if (availableInsults.length === 0) {
    throw new Error('No available insults to select from');
  }
  
  const randomIndex = Math.floor(Math.random() * availableInsults.length);
  return availableInsults[randomIndex];
}

/**
 * Selects a comeback based on difficulty level
 * For now, implements random selection (easy difficulty)
 * Future enhancement: add difficulty parameter for correct vs random selection
 * 
 * @param availableComebacks - Array of comebacks to choose from
 * @param currentInsult - The insult being responded to (for future difficulty implementation)
 * @returns A selected comeback from the available options
 * 
 * Requirements: 3.1, 3.4, 8.2, 8.3
 */
export function selectComeback(availableComebacks: Comeback[], currentInsult?: Insult): Comeback {
  if (availableComebacks.length === 0) {
    throw new Error('No available comebacks to select from');
  }
  
  // For initial implementation, always select randomly (easy difficulty)
  // Future enhancement: use currentInsult.correctComebackId for harder difficulty
  const randomIndex = Math.floor(Math.random() * availableComebacks.length);
  return availableComebacks[randomIndex];
}

/**
 * Generic function to randomly select from any array of options
 * Used internally by other selection functions
 * 
 * @param options - Array of options to choose from
 * @returns A randomly selected option
 */
function selectRandomOption<T>(options: T[]): T {
  if (options.length === 0) {
    throw new Error('No options available to select from');
  }
  
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}