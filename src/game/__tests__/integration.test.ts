/**
 * Integration tests for complete game flow
 * Requirements: 1.1, 1.3, 1.4, 1.5, 5.1, 5.4, 5.5
 */

import { describe, it, expect } from 'vitest';
import { 
  initializeGame, 
  handlePlayerInsultSelection,
  handleOpponentComebackResponse,
  handleOpponentInsultDelivery,
  handlePlayerComebackSelection,
  checkGameOver,
  canPerformAction
} from '../gameState';

describe('Complete Game Flow Integration', () => {
  it('should complete a full combat round: player attack → opponent defend → opponent attack → player defend', () => {
    // Initialize game
    let gameState = initializeGame();
    expect(gameState.phase).toBe('player-attack');
    expect(gameState.player.health).toBe(100);
    expect(gameState.opponent.health).toBe(100);

    // Player attack phase
    const playerInsultId = gameState.availableInsults[0].id;
    gameState = handlePlayerInsultSelection(gameState, playerInsultId);
    expect(gameState.phase).toBe('opponent-defend');
    expect(gameState.currentInsult).toBeTruthy();

    // Opponent defend phase - select wrong comeback to ensure damage
    const wrongComebackId = gameState.availableComebacks.find(
      c => c.id !== gameState.currentInsult!.correctComebackId
    )?.id || gameState.availableComebacks[0].id;
    
    const opponentHealthBefore = gameState.opponent.health;
    gameState = handleOpponentComebackResponse(gameState, wrongComebackId);
    expect(gameState.phase).toBe('opponent-attack');
    expect(gameState.opponent.health).toBeLessThan(opponentHealthBefore);

    // Opponent attack phase
    const opponentInsultId = gameState.availableInsults[0].id;
    gameState = handleOpponentInsultDelivery(gameState, opponentInsultId);
    expect(gameState.phase).toBe('player-defend');
    expect(gameState.currentInsult).toBeTruthy();

    // Player defend phase - select wrong comeback to ensure damage
    const wrongPlayerComebackId = gameState.availableComebacks.find(
      c => c.id !== gameState.currentInsult!.correctComebackId
    )?.id || gameState.availableComebacks[0].id;
    
    const playerHealthBefore = gameState.player.health;
    gameState = handlePlayerComebackSelection(gameState, wrongPlayerComebackId);
    expect(gameState.phase).toBe('player-attack');
    expect(gameState.player.health).toBeLessThan(playerHealthBefore);

    // Verify we're back to player attack for next round
    expect(gameState.availableInsults.length).toBe(3);
    expect(gameState.availableComebacks.length).toBe(0);
  });

  it('should detect game over when player health reaches zero', () => {
    let gameState = initializeGame();
    
    // Reduce player health to 0
    gameState = {
      ...gameState,
      player: { ...gameState.player, health: 0 }
    };

    gameState = checkGameOver(gameState);
    expect(gameState.phase).toBe('game-over');
    expect(gameState.message).toContain('Defeat');
    expect(canPerformAction(gameState)).toBe(false);
  });

  it('should detect game over when opponent health reaches zero', () => {
    let gameState = initializeGame();
    
    // Reduce opponent health to 0
    gameState = {
      ...gameState,
      opponent: { ...gameState.opponent, health: 0 }
    };

    gameState = checkGameOver(gameState);
    expect(gameState.phase).toBe('game-over');
    expect(gameState.message).toContain('Victory');
    expect(canPerformAction(gameState)).toBe(false);
  });

  it('should properly reset game state on restart', () => {
    // Simulate a game in progress
    let gameState = initializeGame();
    gameState = {
      ...gameState,
      player: { ...gameState.player, health: 50 },
      opponent: { ...gameState.opponent, health: 30 },
      phase: 'opponent-attack' as const
    };

    // Restart by initializing again
    const newGameState = initializeGame();
    
    expect(newGameState.player.health).toBe(100);
    expect(newGameState.opponent.health).toBe(100);
    expect(newGameState.phase).toBe('player-attack');
    expect(newGameState.currentInsult).toBeNull();
    expect(newGameState.isAnimating).toBe(false);
  });

  it('should block actions during animation', () => {
    let gameState = initializeGame();
    gameState = { ...gameState, isAnimating: true };

    expect(canPerformAction(gameState)).toBe(false);
  });

  it('should block actions after game over', () => {
    let gameState = initializeGame();
    gameState = {
      ...gameState,
      phase: 'game-over' as const,
      player: { ...gameState.player, health: 0 }
    };

    expect(canPerformAction(gameState)).toBe(false);
  });

  it('should maintain proper phase transitions throughout multiple rounds', () => {
    let gameState = initializeGame();
    
    // Round 1
    expect(gameState.phase).toBe('player-attack');
    
    gameState = handlePlayerInsultSelection(gameState, gameState.availableInsults[0].id);
    expect(gameState.phase).toBe('opponent-defend');
    
    gameState = handleOpponentComebackResponse(gameState, gameState.availableComebacks[0].id);
    expect(gameState.phase).toBe('opponent-attack');
    
    gameState = handleOpponentInsultDelivery(gameState, gameState.availableInsults[0].id);
    expect(gameState.phase).toBe('player-defend');
    
    gameState = handlePlayerComebackSelection(gameState, gameState.availableComebacks[0].id);
    expect(gameState.phase).toBe('player-attack');
    
    // Round 2 - verify we can continue
    expect(gameState.availableInsults.length).toBe(3);
    gameState = handlePlayerInsultSelection(gameState, gameState.availableInsults[0].id);
    expect(gameState.phase).toBe('opponent-defend');
  });
});
