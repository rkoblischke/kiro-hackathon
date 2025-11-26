import { useEffect, useState } from 'react';
import './LittleRedCharacter.css';

interface LittleRedCharacterProps {
  health: number;
  maxHealth: number;
  combatStage?: 'idle' | 'attacking' | 'defending' | 'hurt' | 'victory';
}

export function LittleRedCharacter({ health, maxHealth, combatStage = 'idle' }: LittleRedCharacterProps) {
  const [animationClass, setAnimationClass] = useState('idle');

  useEffect(() => {
    setAnimationClass(combatStage);
  }, [combatStage]);

  return (
    <div className={`little-red-container ${animationClass}`}>
      <div className="little-red-sprite-wrapper">
        <img 
          src="/RedRidingHood.jpg" 
          alt="Little Red Riding Hood" 
          className="little-red-image"
        />
      </div>
      <div className="health-bar-container">
        <div 
          className="health-bar player" 
          style={{ width: `${(health / maxHealth) * 100}%` }}
        />
      </div>
    </div>
  );
}
