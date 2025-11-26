import { useEffect, useState } from 'react';
import './DraculaCharacter.css';

interface DraculaCharacterProps {
  health: number;
  maxHealth: number;
  combatStage?: 'idle' | 'attacking' | 'defending' | 'hurt' | 'victory';
}

export function DraculaCharacter({ health, maxHealth, combatStage = 'idle' }: DraculaCharacterProps) {
  const [animationClass, setAnimationClass] = useState('idle');

  useEffect(() => {
    setAnimationClass(combatStage);
  }, [combatStage]);

  return (
    <div className={`dracula-container ${animationClass}`}>
      <div className="dracula-sprite-wrapper">
        <img 
          src="/Dracula.svg" 
          alt="Dracula" 
          className="dracula-image"
        />
      </div>
      <div className="health-bar-container">
        <div 
          className="health-bar" 
          style={{ width: `${(health / maxHealth) * 100}%` }}
        />
      </div>
    </div>
  );
}
