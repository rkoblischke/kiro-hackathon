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
  const [playerAnimState, setPlayerAnimState] = useState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });
  const [opponentAnimState, setOpponentAnimState] = useState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });

  // Check for game over after each state change
  useEffect(() => {
    const updatedState = checkGameOver(gameState);
    if (updatedState.phase === 'game-over' && gameState.phase !== 'game-over') {
      setGameState(updatedState);
      
      // Set victory/defeat animations
      if (gameState.player.health <= 0) {
        setPlayerAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: true, isWaiting: false, isReturning: false });
        setOpponentAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: true, isDefeat: false, isWaiting: false, isReturning: false });
      } else if (gameState.opponent.health <= 0) {
        setPlayerAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: true, isDefeat: false, isWaiting: false, isReturning: false });
        setOpponentAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: true, isWaiting: false, isReturning: false });
      }
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

    // Set animation state - move to opponent
    setGameState(prev => setAnimationState(prev, true));
    setPlayerAnimState({ isAttacking: true, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });

    setTimeout(() => {
      // Update game state and switch to waiting
      const newState = handlePlayerInsultSelection(gameState, insultId);
      setGameState(setAnimationState(newState, false));
      setPlayerAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: true, isReturning: false });
    }, 600); // Attack animation duration
  };

  const handleAIComeback = () => {
    if (!gameState.currentInsult) return;

    // AI selects a comeback
    const selectedComeback = selectComeback(gameState.availableComebacks, gameState.currentInsult);
    
    // Set animation state
    setGameState(prev => setAnimationState(prev, true));
    setOpponentAnimState({ isAttacking: false, isDefending: true, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });

    setTimeout(() => {
      // Evaluate comeback
      const newState = handleOpponentComebackResponse(gameState, selectedComeback.id);
      const isCorrect = selectedComeback.id === gameState.currentInsult!.correctComebackId;

      if (!isCorrect) {
        // Opponent takes damage (35) - show hurt animation, player returns
        setOpponentAnimState({ isAttacking: false, isDefending: false, isHurt: true, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });
        setPlayerAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: true });
        setTimeout(() => {
          setGameState(setAnimationState(newState, false));
          setOpponentAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });
          setPlayerAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });
        }, 500);
      } else {
        // Player takes damage (20) from successful comeback - show hurt animation, player returns
        setPlayerAnimState({ isAttacking: false, isDefending: false, isHurt: true, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });
        setOpponentAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });
        setTimeout(() => {
          setGameState(setAnimationState(newState, false));
          setPlayerAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });
        }, 500);
      }
    }, 600); // Defend animation duration
  };

  const handleAIAttack = () => {
    // AI selects an insult
    const selectedInsult = selectRandomInsult(gameState.availableInsults);
    
    // Set animation state - move to player
    setGameState(prev => setAnimationState(prev, true));
    setOpponentAnimState({ isAttacking: true, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });

    setTimeout(() => {
      // Update game state and switch to waiting
      const newState = handleOpponentInsultDelivery(gameState, selectedInsult.id);
      setGameState(setAnimationState(newState, false));
      setOpponentAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: true, isReturning: false });
    }, 600); // Attack animation duration
  };

  const handlePlayerComeback = (comebackId: string) => {
    if (gameState.isAnimating || gameState.phase !== 'player-defend') return;
    if (!gameState.currentInsult) return;

    // Set animation state
    setGameState(prev => setAnimationState(prev, true));
    setPlayerAnimState({ isAttacking: false, isDefending: true, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });

    setTimeout(() => {
      // Evaluate comeback
      const newState = handlePlayerComebackSelection(gameState, comebackId);
      const isCorrect = comebackId === gameState.currentInsult!.correctComebackId;

      if (!isCorrect) {
        // Player takes damage (35) - show hurt animation, opponent returns
        setPlayerAnimState({ isAttacking: false, isDefending: false, isHurt: true, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });
        setOpponentAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: true });
        setTimeout(() => {
          setGameState(setAnimationState(newState, false));
          setPlayerAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });
          setOpponentAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });
        }, 500);
      } else {
        // Opponent takes damage (20) from successful comeback - show hurt animation, opponent returns
        setOpponentAnimState({ isAttacking: false, isDefending: false, isHurt: true, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });
        setPlayerAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });
        setTimeout(() => {
          setGameState(setAnimationState(newState, false));
          setOpponentAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });
        }, 500);
      }
    }, 600); // Defend animation duration
  };

  const handleRestart = () => {
    setGameState(initializeGame());
    setPlayerAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });
    setOpponentAnimState({ isAttacking: false, isDefending: false, isHurt: false, isVictory: false, isDefeat: false, isWaiting: false, isReturning: false });
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
            isVictory={playerAnimState.isVictory}
            isDefeat={playerAnimState.isDefeat}
            isWaiting={playerAnimState.isWaiting}
            isReturning={playerAnimState.isReturning}
            position="player"
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
            isVictory={opponentAnimState.isVictory}
            isDefeat={opponentAnimState.isDefeat}
            isWaiting={opponentAnimState.isWaiting}
            isReturning={opponentAnimState.isReturning}
            position="opponent"
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
