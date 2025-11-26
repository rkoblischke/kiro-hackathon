import { useState } from 'react'
import './App.css'
import { Character } from './types'
import { LittleRedCharacter } from './components/LittleRedCharacter'
import { DraculaCharacter } from './components/DraculaCharacter'

const DRACULA: Character = {
  id: 'dracula',
  name: 'Dracula',
  health: 100,
  maxHealth: 100,
  imageUrl: '/Dracula.svg'
}

const LITTLE_RED: Character = {
  id: 'little-red',
  name: 'Little Red Riding Hood',
  health: 100,
  maxHealth: 100,
  imageUrl: '/RedRidingHood.png'
}

type CombatStage = 'idle' | 'attacking' | 'defending' | 'hurt' | 'victory';

function App() {
  const [playerStage, setPlayerStage] = useState<CombatStage>('idle');
  const [opponentStage, setOpponentStage] = useState<CombatStage>('idle');
  const [playerHealth, setPlayerHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(100);

  const triggerAnimation = (stage: CombatStage, isPlayer: boolean) => {
    if (isPlayer) {
      setPlayerStage(stage);
      setTimeout(() => setPlayerStage('idle'), 1000);
    } else {
      setOpponentStage(stage);
      setTimeout(() => setOpponentStage('idle'), 1000);
    }
  };

  const handlePlayerAttack = () => {
    triggerAnimation('attacking', true);
    setTimeout(() => {
      triggerAnimation('hurt', false);
      setOpponentHealth(prev => Math.max(0, prev - 15));
    }, 300);
  };

  const handleOpponentAttack = () => {
    triggerAnimation('attacking', false);
    setTimeout(() => {
      triggerAnimation('hurt', true);
      setPlayerHealth(prev => Math.max(0, prev - 15));
    }, 300);
  };

  return (
    <div className="App">
      {/* Animated Bats */}
      <div className="bat bat1">🦇</div>
      <div className="bat bat2">🦇</div>
      <div className="bat bat3">🦇</div>
      
      {/* Animated Critters */}
      <div className="critter critter1">🕷️</div>
      <div className="critter critter2">🐀</div>
      
      <h1>Monster Brawl</h1>
      <div className="characters">
        <div className="character">
          <h2>{LITTLE_RED.name}</h2>
          <LittleRedCharacter 
            health={playerHealth} 
            maxHealth={LITTLE_RED.maxHealth}
            combatStage={playerStage}
          />
        </div>
        <div className="character opponent">
          <h2>{DRACULA.name}</h2>
          <DraculaCharacter 
            health={opponentHealth} 
            maxHealth={DRACULA.maxHealth}
            combatStage={opponentStage}
          />
        </div>
      </div>
      
      <div className="controls">
        <button onClick={handlePlayerAttack} className="action-button">
          Player Attack
        </button>
        <button onClick={handleOpponentAttack} className="action-button">
          Opponent Attack
        </button>
        <button 
          onClick={() => {
            setPlayerHealth(100);
            setOpponentHealth(100);
            setPlayerStage('idle');
            setOpponentStage('idle');
          }} 
          className="action-button reset"
        >
          Reset
        </button>
      </div>
      
      <p>Halloween Insult Combat - Animation Demo</p>
    </div>
  )
}

export default App
