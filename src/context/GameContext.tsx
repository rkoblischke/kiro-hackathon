import { createContext, useContext, useState, ReactNode } from 'react';
import { GameFlowState } from '../types';

/**
 * Context value interface for game flow management
 */
interface GameContextValue {
  flowState: GameFlowState;
  navigateToStart: () => void;
  navigateToCharacterSelection: () => void;
  navigateToCombat: (playerId: string, opponentId: string) => void;
  navigateToGameOver: () => void;
  resetGame: () => void;
}

/**
 * Initial game flow state
 */
const initialFlowState: GameFlowState = {
  currentScreen: 'start',
  selectedCharacterId: null,
  selectedOpponentId: null,
};

/**
 * Game Context for managing global game flow state
 */
const GameContext = createContext<GameContextValue | undefined>(undefined);

/**
 * Props for GameProvider component
 */
interface GameProviderProps {
  children: ReactNode;
}

/**
 * GameProvider component that wraps the application and provides game flow state
 * 
 * Manages navigation between screens and tracks selected characters.
 * Validates: Requirements 3.1, 3.2, 3.3
 */
export function GameProvider({ children }: GameProviderProps) {
  const [flowState, setFlowState] = useState<GameFlowState>(initialFlowState);

  /**
   * Navigate to the start screen
   * Resets character selections
   */
  const navigateToStart = () => {
    setFlowState({
      currentScreen: 'start',
      selectedCharacterId: null,
      selectedOpponentId: null,
    });
  };

  /**
   * Navigate to the character selection screen
   * Clears any previous character selections
   */
  const navigateToCharacterSelection = () => {
    setFlowState({
      currentScreen: 'character-selection',
      selectedCharacterId: null,
      selectedOpponentId: null,
    });
  };

  /**
   * Navigate to combat with selected characters
   * 
   * @param playerId - ID of the player's selected character
   * @param opponentId - ID of the opponent character
   */
  const navigateToCombat = (playerId: string, opponentId: string) => {
    setFlowState({
      currentScreen: 'combat',
      selectedCharacterId: playerId,
      selectedOpponentId: opponentId,
    });
  };

  /**
   * Navigate to game over screen
   * Maintains character selections for potential replay
   */
  const navigateToGameOver = () => {
    setFlowState(prev => ({
      ...prev,
      currentScreen: 'game-over',
    }));
  };

  /**
   * Reset the entire game state
   * Returns to start screen with no selections
   */
  const resetGame = () => {
    setFlowState(initialFlowState);
  };

  const value: GameContextValue = {
    flowState,
    navigateToStart,
    navigateToCharacterSelection,
    navigateToCombat,
    navigateToGameOver,
    resetGame,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

/**
 * Hook to access game context
 * 
 * @throws Error if used outside of GameProvider
 * @returns GameContextValue with flow state and navigation functions
 */
export function useGameContext(): GameContextValue {
  const context = useContext(GameContext);
  
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  
  return context;
}
