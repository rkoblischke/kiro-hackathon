/**
 * Unit tests for game state management functions
 */

import { describe, it, expect } from 'vitest';
import { 
  initializeGame, 
  handlePlayerInsultSelection,
  handleOpponentComebackResponse,
  handleOpponentInsultDelivery,
  handlePlayerComebackSelection,
  checkGameOver,
  isGameOver,
  canPerformAction,
  setAnimationState
} from '../gameState';
import { GameState } from '../../types';

describe('Game State Management', () => {
  describe('initializeGame', () => {
    it('should create initial game state with correct values', () => {
      const gameState = initializeGame();
      
      expect(gameState.player.health).toBe(100);
      expect(gameState.player.maxHealth).toBe(100);
      expect(gameState.player.name).toBe('Little Red Riding Hood');
      
      expect(gameState.opponent.health).toBe(100);
      expect(gameState.opponent.maxHealth).toBe(100);
      expect(gameState.opponent.name).toBe('Dracula');
      
      expect(gameState.phase).toBe('player-attack');
      expect(gameState.currentTurn).toBe('player');
      expect(gameState.availableInsults).toHaveLength(3);
      expect(gameState.availableComebacks).toHaveLength(0);
      expect(gameState.isAnimating).toBe(false);
    });
  });

  describe('handlePlayerInsultSelection', () => {
    it('should transition to opponent-defend phase', () => {
      const initialState = initializeGame();
      const insultId = initialState.availableInsults[0].id;
      
      const newState = handlePlayerInsultSelection(initialState, insultId);
      
      expect(newState.phase).toBe('opponent-defend');
      expect(newState.currentTurn).toBe('opponent');
      expect(newState.currentInsult?.id).toBe(insultId);
      expect(newState.availableComebacks).toHaveLength(3);
      expect(newState.availableInsults).toHaveLength(0);
    });

    it('should throw error for invalid insult ID', () => {
      const initialState = initializeGame();
      
      expect(() => {
        handlePlayerInsultSelection(initialState, 'invalid-id');
      }).toThrow('Invalid insult ID: invalid-id');
    });
  });

  describe('checkGameOver', () => {
    it('should detect player defeat', () => {
      const gameState: GameState = {
        ...initializeGame(),
        player: { ...initializeGame().player, health: 0 }
      };
      
      const result = checkGameOver(gameState);
      
      expect(result.phase).toBe('game-over');
      expect(result.message).toContain('Defeat');
    });

    it('should detect opponent defeat', () => {
      const gameState: GameState = {
        ...initializeGame(),
        opponent: { ...initializeGame().opponent, health: 0 }
      };
      
      const result = checkGameOver(gameState);
      
      expect(result.phase).toBe('game-over');
      expect(result.message).toContain('Victory');
    });

    it('should continue game when both characters have health', () => {
      const gameState = initializeGame();
      
      const result = checkGameOver(gameState);
      
      expect(result.phase).toBe('player-attack');
      expect(result).toEqual(gameState);
    });
  });

  describe('canPerformAction', () => {
    it('should block actions during animation', () => {
      const gameState = setAnimationState(initializeGame(), true);
      
      expect(canPerformAction(gameState)).toBe(false);
    });

    it('should block actions when game is over', () => {
      const gameState: GameState = {
        ...initializeGame(),
        phase: 'game-over'
      };
      
      expect(canPerformAction(gameState)).toBe(false);
    });

    it('should allow actions in normal state', () => {
      const gameState = initializeGame();
      
      expect(canPerformAction(gameState)).toBe(true);
    });
  });

  describe('isGameOver', () => {
    it('should return true when phase is game-over', () => {
      const gameState: GameState = {
        ...initializeGame(),
        phase: 'game-over'
      };
      
      expect(isGameOver(gameState)).toBe(true);
    });

    it('should return true when player health is 0', () => {
      const gameState: GameState = {
        ...initializeGame(),
        player: { ...initializeGame().player, health: 0 }
      };
      
      expect(isGameOver(gameState)).toBe(true);
    });

    it('should return false for active game', () => {
      const gameState = initializeGame();
      
      expect(isGameOver(gameState)).toBe(false);
    });
  });
});