/**
 * Character component - Displays character sprite with animations
 * Requirements: 2.1, 7.1, 7.2, 7.3
 */

import { Character as CharacterType } from '../types';
import './Character.css';

interface CharacterProps {
  character: CharacterType;
  isAttacking: boolean;
  isDefending: boolean;
  isHurt: boolean;
  isVictory?: boolean;
  isDefeat?: boolean;
  isWaiting?: boolean;
  isReturning?: boolean;
  position?: 'player' | 'opponent';
}

export function Character({ character, isAttacking, isDefending, isHurt, isVictory, isDefeat, isWaiting, isReturning, position = 'player' }: CharacterProps) {
  // Determine animation class based on props
  let animationClass = 'idle';
  
  if (isVictory) {
    animationClass = 'victory';
  } else if (isDefeat) {
    animationClass = 'defeat';
  } else if (isReturning) {
    animationClass = 'returning';
  } else if (isWaiting) {
    animationClass = 'waiting';
  } else if (isAttacking) {
    animationClass = 'attacking';
  } else if (isDefending) {
    animationClass = 'defending';
  } else if (isHurt) {
    animationClass = 'hurt';
  }

  return (
    <div className={`character-container ${animationClass} ${position}`}>
      <div className="character-sprite-wrapper">
        <img 
          src={character.imageUrl} 
          alt={character.name} 
          className="character-image"
        />
      </div>
    </div>
  );
}
