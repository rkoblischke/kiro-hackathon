import './App.css'
import { GameBoard } from './components/GameBoard'

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
      
      <GameBoard />
    </div>
  )
}

export default App
