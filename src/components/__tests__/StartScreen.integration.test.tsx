/**
 * Integration tests for StartScreen with GameContext
 * Validates: Requirements 1.5 (navigation integration)
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StartScreen } from '../StartScreen';
import { GameProvider, useGameContext } from '../../context/GameContext';

// Test component that uses GameContext
function TestWrapper() {
  const { flowState, navigateToCharacterSelection } = useGameContext();
  
  return (
    <div>
      <div data-testid="current-screen">{flowState.currentScreen}</div>
      <StartScreen onProceed={navigateToCharacterSelection} />
    </div>
  );
}

describe('StartScreen Integration', () => {
  it('integrates with GameContext navigation', async () => {
    render(
      <GameProvider>
        <TestWrapper />
      </GameProvider>
    );
    
    // Verify initial screen is 'start'
    const screenIndicator = screen.getByTestId('current-screen');
    expect(screenIndicator.textContent).toBe('start');
    
    // Click the start button
    const button = screen.getByRole('button', { name: /START GAME/i });
    button.click();
    
    // Wait for state update
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Verify navigation to character selection
    expect(screenIndicator.textContent).toBe('character-selection');
  });
});
