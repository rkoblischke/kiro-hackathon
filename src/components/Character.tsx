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
}

export function Character({ character, isAttacking, isDefending, isHurt }: CharacterProps) {
  // Determine animation class based on props
  let animationClass = 'idle';
  
  if (isAttacking) {
    animationClass = 'attacking';
  } else if (isDefending) {
    animationClass = 'defending';
  } else if (isHurt) {
    animationClass = 'hurt';
  }

  return (
    <div className={`character-container ${animationClass}`}>
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
