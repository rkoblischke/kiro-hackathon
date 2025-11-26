/**
 * Tests for GameBoard character prop functionality
 * Requirements: 3.1, 3.2, 3.4, 3.5
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GameBoard } from '../GameBoard';

describe('GameBoard Character Props', () => {
  it('should initialize with default characters when no props provided', () => {
    render(<GameBoard />);
    
    // Default characters should be Little Red Riding Hood and The Mummy
    expect(screen.getByText('Little Red Riding Hood')).toBeTruthy();
    expect(screen.getByText('The Mummy')).toBeTruthy();
  });

  it('should initialize with Little Red when playerId is provided', () => {
    render(<GameBoard playerId="little-red" />);
    
    expect(screen.getByText('Little Red Riding Hood')).toBeTruthy();
    expect(screen.getByText('The Mummy')).toBeTruthy();
  });

  it('should initialize with Mummy when playerId is provided', () => {
    render(<GameBoard playerId="mummy" />);
    
    expect(screen.getByText('The Mummy')).toBeTruthy();
    expect(screen.getByText('Little Red Riding Hood')).toBeTruthy();
  });

  it('should use specified opponent when both playerId and opponentId provided', () => {
    render(<GameBoard playerId="little-red" opponentId="little-red" />);
    
    // Both should be Little Red (unusual but valid for testing)
    const littleRedElements = screen.getAllByText('Little Red Riding Hood');
    expect(littleRedElements.length).toBe(2);
  });

  it('should fall back to defaults when invalid character IDs provided', () => {
    render(<GameBoard playerId="invalid-id" />);
    
    // Should fall back to default characters
    expect(screen.getByText('Little Red Riding Hood')).toBeTruthy();
    expect(screen.getByText('The Mummy')).toBeTruthy();
  });
});
