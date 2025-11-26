import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { GameProvider, useGameContext } from './context/GameContext'
import { StartScreen } from './components/StartScreen'
import { CharacterSelection } from './components/CharacterSelection'
import { GameBoard } from './components/GameBoard'
import { useTestingShortcut } from './hooks/useTestingShortcut'
import { getCharacterById } from './data/characters'

/**
 * AppContent component - handles routing logic and testing shortcuts
 * Separated from App to access GameContext hooks
 */
function AppContent() {
  const navigate = useNavigate()
  const { flowState, navigateToCharacterSelection, navigateToCombat } = useGameContext()
  const { shouldBypass, characterId, error } = useTestingShortcut()

  /**
   * Handle testing shortcut on mount
   * Requirements 4.1, 4.2, 4.3: URL parameter handling
   */
  useEffect(() => {
    if (shouldBypass && characterId) {
      // Valid character - bypass menus and go directly to combat
      const character = getCharacterById(characterId)
      if (character) {
        navigateToCombat(characterId, character.opponentId)
        navigate('/battle')
      }
    } else if (error) {
      // Invalid character - show error on character selection
      navigate('/select')
    }
  }, [shouldBypass, characterId, error, navigate, navigateToCombat])

  /**
   * Route guard for battle route
   * Requirement 1.1: Ensure proper flow through character selection
   */
  const BattleRoute = () => {
    // Redirect to character selection if no character is selected
    if (!flowState.selectedCharacterId || !flowState.selectedOpponentId) {
      return <Navigate to="/select" replace />
    }
    return (
      <GameBoard 
        playerId={flowState.selectedCharacterId} 
        opponentId={flowState.selectedOpponentId} 
      />
    )
  }

  return (
    <div className="App">
      {/* Animated Bats */}
      <div className="bat bat1">🦇</div>
      <div className="bat bat2">🦇</div>
      <div className="bat bat3">🦇</div>
      
      {/* Animated Critters */}
      <div className="critter critter1">🕷️</div>
      <div className="critter critter2">🐀</div>
      
      <Routes>
        {/* Start Screen - Requirement 1.1 */}
        <Route 
          path="/" 
          element={<StartScreen onProceed={() => {
            navigateToCharacterSelection()
            navigate('/select')
          }} />} 
        />
        
        {/* Character Selection - Requirement 2.1 */}
        <Route 
          path="/select" 
          element={<CharacterSelection errorMessage={error || undefined} />} 
        />
        
        {/* Battle Route with guard - Requirements 3.1, 4.1 */}
        <Route 
          path="/battle" 
          element={<BattleRoute />} 
        />
        
        {/* Fallback to start screen */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

/**
 * App component - Root component with routing and context providers
 * 
 * Sets up React Router and wraps the application with GameContext.
 * Handles testing shortcuts via URL parameters.
 * 
 * Validates: Requirements 1.1, 4.1, 4.2, 4.3
 */
function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </BrowserRouter>
  )
}

export default App
