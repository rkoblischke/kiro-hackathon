/**
 * GameBoard component - Main game container that orchestrates combat flow
 * Requirements: 1.1, 1.3, 5.5, 6.3
 */

import { useState, useEffect } from 'react';
import { GameState } from '../types';
import { 
  initializeGame, 
  handlePlayerInsultSelection,
  handleOpponentComebackResponse,
  handleOpponentInsultDelivery,
  handlePlayerComebackSelection,
  checkGameOver,
  setAnimationState
} from '../game/gameState';
import { selectRandomInsult, selectComeback } from '../game/ai';
import { Character } from './Character';
import { HealthBar } from './HealthBar';
import { DialogueBox } from './DialogueBox';
import { ActionButtons } from './ActionButtons';
import './GameBoard.css';

export function GameBoard() {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [playerAnimState, setPlayerAnimState] = useState({ isAttacking: false, isDefending: false, isHurt: false });
  const [opponentAnimState, setOpponentAnimState] = useState({ isAttacking: false, isDefending: false, isHurt: false });

  // Check for game over after each state change
  useEffect(() => {
    const updatedState = checkGameOver(gameState);
    if (updatedState.phase === 'game-over' && gameState.phase !== 'game-over') {
      setGameState(updatedState);
    }
  }, [gameState.player.health, gameState.opponent.health]);

  // Handle AI turns automatically
  useEffect(() => {
    if (gameState.isAnimating) return;

    if (gameState.phase === 'opponent-defend') {
      // AI selects comeback after a delay
      const timer = setTimeout(() => {
        handleAIComeback();
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (gameState.phase === 'opponent-attack') {
      // AI selects insult after a delay
      const timer = setTimeout(() => {
        handleAIAttack();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState.phase, gameState.isAnimating]);

  const handlePlayerInsult = (insultId: string) => {
    if (gameState.isAnimating || gameState.phase !== 'player-attack') return;

    // Set animation state
    setGameState(prev => setAnimationState(prev, true));
    setPlayerAnimState({ isAttacking: true, isDefending: false, isHurt: false });

    setTimeout(() => {
      // Update game state
      const newState = handlePlayerInsultSelection(gameState, insultId);
      setGameState(setAnimationState(newState, false));
      setPlayerAnimState({ isAttacking: false, isDefending: false, isHurt: false });
    }, 800); // Attack animation duration
  };

  const handleAIComeback = () => {
    if (!gameState.currentInsult) return;

    // AI selects a comeback
    const selectedComeback = selectComeback(gameState.availableComebacks, gameState.currentInsult);
    
    // Set animation state
    setGameState(prev => setAnimationState(prev, true));
    setOpponentAnimState({ isAttacking: false, isDefending: true, isHurt: false });

    setTimeout(() => {
      // Evaluate comeback
      const newState = handleOpponentComebackResponse(gameState, selectedComeback.id);
      const isCorrect = selectedComeback.id === gameState.currentInsult!.correctComebackId;

      if (!isCorrect) {
        // Opponent takes damage - show hurt animation
        setOpponentAnimState({ isAttacking: false, isDefending: false, isHurt: true });
        setTimeout(() => {
          setGameState(setAnimationState(newState, false));
          setOpponentAnimState({ isAttacking: false, isDefending: false, isHurt: false });
        }, 500);
      } else {
        setGameState(setAnimationState(newState, false));
        setOpponentAnimState({ isAttacking: false, isDefending: false, isHurt: false });
      }
    }, 600); // Defend animation duration
  };

  const handleAIAttack = () => {
    // AI selects an insult
    const selectedInsult = selectRandomInsult(gameState.availableInsults);
    
    // Set animation state
    setGameState(prev => setAnimationState(prev, true));
    setOpponentAnimState({ isAttacking: true, isDefending: false, isHurt: false });

    setTimeout(() => {
      // Update game state
      const newState = handleOpponentInsultDelivery(gameState, selectedInsult.id);
      setGameState(setAnimationState(newState, false));
      setOpponentAnimState({ isAttacking: false, isDefending: false, isHurt: false });
    }, 800); // Attack animation duration
  };

  const handlePlayerComeback = (comebackId: string) => {
    if (gameState.isAnimating || gameState.phase !== 'player-defend') return;
    if (!gameState.currentInsult) return;

    // Set animation state
    setGameState(prev => setAnimationState(prev, true));
    setPlayerAnimState({ isAttacking: false, isDefending: true, isHurt: false });

    setTimeout(() => {
      // Evaluate comeback
      const newState = handlePlayerComebackSelection(gameState, comebackId);
      const isCorrect = comebackId === gameState.currentInsult!.correctComebackId;

      if (!isCorrect) {
        // Player takes damage - show hurt animation
        setPlayerAnimState({ isAttacking: false, isDefending: false, isHurt: true });
        setTimeout(() => {
          setGameState(setAnimationState(newState, false));
          setPlayerAnimState({ isAttacking: false, isDefending: false, isHurt: false });
        }, 500);
      } else {
        setGameState(setAnimationState(newState, false));
        setPlayerAnimState({ isAttacking: false, isDefending: false, isHurt: false });
      }
    }, 600); // Defend animation duration
  };

  const handleRestart = () => {
    setGameState(initializeGame());
    setPlayerAnimState({ isAttacking: false, isDefending: false, isHurt: false });
    setOpponentAnimState({ isAttacking: false, isDefending: false, isHurt: false });
  };

  // Determine dialogue speaker
  const getSpeaker = (): 'player' | 'opponent' | 'system' => {
    if (gameState.phase === 'game-over') return 'system';
    if (gameState.phase === 'player-attack' || gameState.phase === 'opponent-defend') return 'player';
    if (gameState.phase === 'opponent-attack' || gameState.phase === 'player-defend') return 'opponent';
    return 'system';
  };

  // Prepare action options
  const actionOptions = gameState.phase === 'player-attack' || gameState.phase === 'player-defend'
    ? (gameState.phase === 'player-attack' 
        ? gameState.availableInsults.map(i => ({ id: i.id, text: i.text }))
        : gameState.availableComebacks.map(c => ({ id: c.id, text: c.text })))
    : [];

  const handleAction = gameState.phase === 'player-attack' ? handlePlayerInsult : handlePlayerComeback;
  const showActions = (gameState.phase === 'player-attack' || gameState.phase === 'player-defend') && !gameState.isAnimating;

  return (
    <div className="game-board">
      <h1 className="game-title">Monster Brawl</h1>
      
      <div className="characters-container">
        <div className="character-section">
          <h2 className="character-name">{gameState.player.name}</h2>
          <Character 
            character={gameState.player}
            isAttacking={playerAnimState.isAttacking}
            isDefending={playerAnimState.isDefending}
            isHurt={playerAnimState.isHurt}
          />
          <HealthBar 
            current={gameState.player.health}
            max={gameState.player.maxHealth}
            label={gameState.player.name}
          />
        </div>

        <div className="character-section">
          <h2 className="character-name">{gameState.opponent.name}</h2>
          <Character 
            character={gameState.opponent}
            isAttacking={opponentAnimState.isAttacking}
            isDefending={opponentAnimState.isDefending}
            isHurt={opponentAnimState.isHurt}
          />
          <HealthBar 
            current={gameState.opponent.health}
            max={gameState.opponent.maxHealth}
            label={gameState.opponent.name}
          />
        </div>
      </div>

      <DialogueBox 
        message={gameState.message}
        speaker={getSpeaker()}
      />

      {showActions && (
        <ActionButtons 
          options={actionOptions}
          onSelect={handleAction}
          disabled={gameState.isAnimating}
        />
      )}

      {gameState.phase === 'game-over' && (
        <button className="restart-button" onClick={handleRestart}>
          Play Again
        </button>
      )}
    </div>
  );
}
