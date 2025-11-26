/**
 * Game state management for Monster Brawl
 * Handles initialization, state transitions, and game flow
 */

import { GameState, Character, Insult, Comeback } from '../types';
import { INSULTS, COMEBACKS } from '../data/insults';

/**
 * Creates the initial game state with both characters at full health
 * and sets up the first turn for the player
 * 
 * Requirements: 1.1, 6.4, 8.1
 */
export function initializeGame(): GameState {
  // Initialize player character (Little Red Riding Hood)
  const player: Character = {
    id: 'player',
    name: 'Little Red Riding Hood',
    health: 100,
    maxHealth: 100,
    imageUrl: '/RedRidingHood.jpg'
  };

  // Initialize opponent character (Dracula)
  const opponent: Character = {
    id: 'opponent',
    name: 'Dracula',
    health: 100,
    maxHealth: 100,
    imageUrl: '/Dracula.svg'
  };

  // Select 3 random insults for initial player options
  const availableInsults = getRandomInsults(3);

  return {
    player,
    opponent,
    currentTurn: 'player',
    phase: 'player-attack',
    currentInsult: null,
    availableInsults,
    availableComebacks: [],
    message: 'Choose your insult to begin the battle!',
    isAnimating: false
  };
}

/**
 * Selects a specified number of random insults from the insults data
 * 
 * @param count - Number of insults to select
 * @returns Array of randomly selected insults
 */
function getRandomInsults(count: number): Insult[] {
  const shuffled = [...INSULTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, INSULTS.length));
}

/**
 * Selects a specified number of random comebacks from the comebacks data
 * 
 * @param count - Number of comebacks to select
 * @returns Array of randomly selected comebacks
 */
function getRandomComebacks(count: number): Comeback[] {
  const shuffled = [...COMEBACKS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, COMEBACKS.length));
}
/*
*
 * Handles player insult selection during player-attack phase
 * Transitions to opponent-defend phase
 * 
 * Requirements: 1.2, 1.3, 3.5
 */
export function handlePlayerInsultSelection(gameState: GameState, insultId: string): GameState {
  // Find the selected insult
  const selectedInsult = gameState.availableInsults.find(insult => insult.id === insultId);
  if (!selectedInsult) {
    throw new Error(`Invalid insult ID: ${insultId}`);
  }

  // Transition to opponent defend phase
  return {
    ...gameState,
    phase: 'opponent-defend',
    currentTurn: 'opponent',
    currentInsult: selectedInsult,
    availableInsults: [],
    availableComebacks: getRandomComebacks(3), // Opponent gets 3 comeback options
    message: `"${selectedInsult.text}" - Now Dracula must respond!`
  };
}

/**
 * Handles opponent comeback response during opponent-defend phase
 * Evaluates the comeback and applies damage if unsuccessful
 * Transitions to opponent-attack phase
 * 
 * Requirements: 1.2, 1.3, 3.5
 */
export function handleOpponentComebackResponse(gameState: GameState, comebackId: string): GameState {
  if (!gameState.currentInsult) {
    throw new Error('No current insult to respond to');
  }

  const selectedComeback = gameState.availableComebacks.find(comeback => comeback.id === comebackId);
  if (!selectedComeback) {
    throw new Error(`Invalid comeback ID: ${comebackId}`);
  }

  // Evaluate if the comeback is correct
  const isCorrect = selectedComeback.id === gameState.currentInsult.correctComebackId;
  
  let newOpponent = gameState.opponent;
  let message = '';

  if (isCorrect) {
    message = `"${selectedComeback.text}" - Dracula successfully defended!`;
  } else {
    // Apply damage to opponent
    newOpponent = {
      ...gameState.opponent,
      health: Math.max(0, gameState.opponent.health - 20)
    };
    message = `"${selectedComeback.text}" - A weak response! Dracula takes damage!`;
  }

  // Transition to opponent attack phase
  return {
    ...gameState,
    opponent: newOpponent,
    phase: 'opponent-attack',
    currentTurn: 'opponent',
    currentInsult: null,
    availableInsults: getRandomInsults(3), // Opponent gets 3 insult options
    availableComebacks: [],
    message
  };
}

/**
 * Handles opponent insult delivery during opponent-attack phase
 * Transitions to player-defend phase
 * 
 * Requirements: 1.2, 1.3, 3.5
 */
export function handleOpponentInsultDelivery(gameState: GameState, insultId: string): GameState {
  const selectedInsult = gameState.availableInsults.find(insult => insult.id === insultId);
  if (!selectedInsult) {
    throw new Error(`Invalid insult ID: ${insultId}`);
  }

  // Transition to player defend phase
  return {
    ...gameState,
    phase: 'player-defend',
    currentTurn: 'player',
    currentInsult: selectedInsult,
    availableInsults: [],
    availableComebacks: getRandomComebacks(3), // Player gets 3 comeback options
    message: `"${selectedInsult.text}" - Choose your comeback!`
  };
}

/**
 * Handles player comeback selection during player-defend phase
 * Evaluates the comeback and applies damage if unsuccessful
 * Transitions back to player-attack phase for next round
 * 
 * Requirements: 1.2, 1.3, 3.5
 */
export function handlePlayerComebackSelection(gameState: GameState, comebackId: string): GameState {
  if (!gameState.currentInsult) {
    throw new Error('No current insult to respond to');
  }

  const selectedComeback = gameState.availableComebacks.find(comeback => comeback.id === comebackId);
  if (!selectedComeback) {
    throw new Error(`Invalid comeback ID: ${comebackId}`);
  }

  // Evaluate if the comeback is correct
  const isCorrect = selectedComeback.id === gameState.currentInsult.correctComebackId;
  
  let newPlayer = gameState.player;
  let message = '';

  if (isCorrect) {
    message = `"${selectedComeback.text}" - Excellent defense!`;
  } else {
    // Apply damage to player
    newPlayer = {
      ...gameState.player,
      health: Math.max(0, gameState.player.health - 20)
    };
    message = `"${selectedComeback.text}" - Not quite right! You take damage!`;
  }

  // Transition back to player attack phase for next round
  return {
    ...gameState,
    player: newPlayer,
    phase: 'player-attack',
    currentTurn: 'player',
    currentInsult: null,
    availableInsults: getRandomInsults(3), // Player gets new insult options
    availableComebacks: [],
    message
  };
}/**

 * Checks if the game should end based on character health
 * Transitions to game-over phase if either character is defeated
 * 
 * Requirements: 5.1, 5.2, 5.3
 */
export function checkGameOver(gameState: GameState): GameState {
  // Check if either character's health is <= 0
  if (gameState.player.health <= 0) {
    return {
      ...gameState,
      phase: 'game-over',
      message: 'Defeat! Dracula has bested you in combat. Better luck next time!',
      availableInsults: [],
      availableComebacks: [],
      currentInsult: null
    };
  }

  if (gameState.opponent.health <= 0) {
    return {
      ...gameState,
      phase: 'game-over',
      message: 'Victory! You have defeated Dracula with your superior wit!',
      availableInsults: [],
      availableComebacks: [],
      currentInsult: null
    };
  }

  // Game continues
  return gameState;
}

/**
 * Determines if the game is over based on current game state
 * 
 * @param gameState - Current game state
 * @returns true if game is over, false otherwise
 */
export function isGameOver(gameState: GameState): boolean {
  return gameState.phase === 'game-over' || 
         gameState.player.health <= 0 || 
         gameState.opponent.health <= 0;
}/**
 *
 Checks if actions should be blocked based on current game state
 * Actions are blocked during animations or when game is over
 * 
 * Requirements: 5.4, 7.5
 */
export function canPerformAction(gameState: GameState): boolean {
  // Block actions during animations
  if (gameState.isAnimating) {
    return false;
  }

  // Block actions when game is over
  if (gameState.phase === 'game-over') {
    return false;
  }

  return true;
}

/**
 * Wrapper function that checks if an action can be performed before executing it
 * Returns the original state if action is blocked
 * 
 * @param gameState - Current game state
 * @param actionFn - Function to execute if action is allowed
 * @returns Updated game state or original state if blocked
 */
export function executeActionIfAllowed<T extends any[]>(
  gameState: GameState,
  actionFn: (gameState: GameState, ...args: T) => GameState,
  ...args: T
): GameState {
  if (!canPerformAction(gameState)) {
    return gameState; // Return unchanged state if action is blocked
  }

  return actionFn(gameState, ...args);
}

/**
 * Sets the animation state to block further actions
 * 
 * @param gameState - Current game state
 * @param isAnimating - Whether animation is currently playing
 * @returns Updated game state with animation flag
 */
export function setAnimationState(gameState: GameState, isAnimating: boolean): GameState {
  return {
    ...gameState,
    isAnimating
  };
}