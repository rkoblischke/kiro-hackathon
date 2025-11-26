import { useEffect, useState } from 'react';
import './StartScreen.css';

/**
 * Props for StartScreen component
 */
interface StartScreenProps {
  onProceed: () => void;
}

/**
 * StartScreen component - Landing page for Monster Brawl
 * 
 * Displays the game title with Halloween-themed styling and a proceed button.
 * Implements fade-in animation on mount.
 * 
 * Validates: Requirements 1.1, 1.2, 1.3, 1.5
 */
export function StartScreen({ onProceed }: StartScreenProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`start-screen ${isVisible ? 'fade-in' : ''}`}>
      <div className="start-screen-content">
        <h1 className="game-title">
          🎃 MONSTER BRAWL 🎃
        </h1>
        <p className="game-subtitle">
        </p>
        <button 
          className="start-button action-button"
          onClick={onProceed}
        >
          START GAME
        </button>
      </div>
    </div>
  );
}
