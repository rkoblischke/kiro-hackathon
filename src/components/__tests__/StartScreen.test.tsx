/**
 * Tests for StartScreen component
 * Validates: Requirements 1.1, 1.2, 1.3, 1.5
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StartScreen } from '../StartScreen';

describe('StartScreen Component', () => {
  it('renders the game title', () => {
    const mockProceed = vi.fn();
    render(<StartScreen onProceed={mockProceed} />);
    
    const title = screen.getByText(/MONSTER BRAWL/i);
    expect(title).toBeTruthy();
  });

  it('renders the game subtitle', () => {
    const mockProceed = vi.fn();
    render(<StartScreen onProceed={mockProceed} />);
    
    const subtitle = screen.getByText(/Halloween Insult Combat Arena/i);
    expect(subtitle).toBeTruthy();
  });

  it('renders the start button', () => {
    const mockProceed = vi.fn();
    render(<StartScreen onProceed={mockProceed} />);
    
    const button = screen.getByRole('button', { name: /START GAME/i });
    expect(button).toBeTruthy();
  });

  it('calls onProceed when start button is clicked', () => {
    const mockProceed = vi.fn();
    render(<StartScreen onProceed={mockProceed} />);
    
    const button = screen.getByRole('button', { name: /START GAME/i });
    button.click();
    
    expect(mockProceed).toHaveBeenCalledTimes(1);
  });

  it('applies fade-in class after mount', async () => {
    const mockProceed = vi.fn();
    const { container } = render(<StartScreen onProceed={mockProceed} />);
    
    // Wait for the fade-in to be applied (using act to avoid warnings)
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const startScreen = container.querySelector('.start-screen');
    expect(startScreen?.classList.contains('fade-in')).toBe(true);
  });
});
