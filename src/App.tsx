import './App.css'
import { Character } from './types'

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
  imageUrl: '/RedRidingHood.jpg'
}

function App() {
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
          <img src={LITTLE_RED.imageUrl} alt={LITTLE_RED.name} className="character-image" />
          <div className="health">HP: {LITTLE_RED.health}/{LITTLE_RED.maxHealth}</div>
        </div>
        <div className="character opponent">
          <h2>{DRACULA.name}</h2>
          <img src={DRACULA.imageUrl} alt={DRACULA.name} className="character-image" />
          <div className="health">HP: {DRACULA.health}/{DRACULA.maxHealth}</div>
        </div>
      </div>
      <p>Halloween Insult Combat - Coming Soon!</p>
    </div>
  )
}

export default App
