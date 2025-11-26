/**
 * SplashAnimation component - Gothic/fairy tale themed splash effect
 * Requirements: 9.1, 9.2, 9.3
 */

import { useEffect, useState } from 'react';
import { SPLASH_WORDS } from '../data/splashWords';
import './SplashAnimation.css';

interface SplashAnimationProps {
  show: boolean;
  onComplete: () => void;
}

export function SplashAnimation({ show, onComplete }: SplashAnimationProps) {
  const [word, setWord] = useState<string>('');

  useEffect(() => {
    if (show) {
      // Randomly select a splash word when shown
      const randomWord = SPLASH_WORDS[Math.floor(Math.random() * SPLASH_WORDS.length)];
      setWord(randomWord);

      // Call onComplete after animation duration (1200ms)
      const timer = setTimeout(() => {
        onComplete();
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) {
    return null;
  }

  return (
    <div className="splash-animation">
      <div className="splash-word">{word}!</div>
    </div>
  );
}
