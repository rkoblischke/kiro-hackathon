/**
 * Tests for CharacterCard component
 * Validates: Requirements 2.2, 2.3, 2.4
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CharacterCard } from '../CharacterCard';
import { CharacterTemplate } from '../../types';

describe('CharacterCard Component', () => {
  const mockCharacter: CharacterTemplate = {
    id: 'test-character',
    name: 'test-character',
    displayName: 'Test Character',
    description: 'A test character for testing',
    imageUrl: '/test.png',
    thumbnailUrl: '/test-thumb.png',
    maxHealth: 100,
    opponentId: 'opponent'
  };

  it('renders character name and image (Requirement 2.2)', () => {
    const mockSelect = vi.fn();
    const mockHover = vi.fn();
    const mockHoverEnd = vi.fn();

    render(
      <CharacterCard
        character={mockCharacter}
        isSelected={false}
        isHovered={false}
        onSelect={mockSelect}
        onHover={mockHover}
        onHoverEnd={mockHoverEnd}
      />
    );

    // Check that character name is displayed
    const name = screen.getByText('Test Character');
    expect(name).toBeTruthy();

    // Check that image is rendered with correct src
    const image = screen.getByAltText('Test Character') as HTMLImageElement;
    expect(image).toBeTruthy();
    expect(image.src).toContain('/test-thumb.png');
  });

  it('applies hover class when isHovered is true (Requirement 2.3)', () => {
    const mockSelect = vi.fn();
    const mockHover = vi.fn();
    const mockHoverEnd = vi.fn();

    const { container } = render(
      <CharacterCard
        character={mockCharacter}
        isSelected={false}
        isHovered={true}
        onSelect={mockSelect}
        onHover={mockHover}
        onHoverEnd={mockHoverEnd}
      />
    );

    const card = container.querySelector('.character-card');
    expect(card?.classList.contains('character-card-hover')).toBe(true);
  });

  it('applies selection class when isSelected is true (Requirement 2.4)', () => {
    const mockSelect = vi.fn();
    const mockHover = vi.fn();
    const mockHoverEnd = vi.fn();

    const { container } = render(
      <CharacterCard
        character={mockCharacter}
        isSelected={true}
        isHovered={false}
        onSelect={mockSelect}
        onHover={mockHover}
        onHoverEnd={mockHoverEnd}
      />
    );

    const card = container.querySelector('.character-card');
    expect(card?.classList.contains('character-card-selected')).toBe(true);
  });

  it('calls onSelect when clicked (Requirement 2.4)', () => {
    const mockSelect = vi.fn();
    const mockHover = vi.fn();
    const mockHoverEnd = vi.fn();

    render(
      <CharacterCard
        character={mockCharacter}
        isSelected={false}
        isHovered={false}
        onSelect={mockSelect}
        onHover={mockHover}
        onHoverEnd={mockHoverEnd}
      />
    );

    const card = screen.getByRole('button', { name: /Select Test Character/i });
    card.click();

    expect(mockSelect).toHaveBeenCalledTimes(1);
  });

  it('renders character description', () => {
    const mockSelect = vi.fn();
    const mockHover = vi.fn();
    const mockHoverEnd = vi.fn();

    render(
      <CharacterCard
        character={mockCharacter}
        isSelected={false}
        isHovered={false}
        onSelect={mockSelect}
        onHover={mockHover}
        onHoverEnd={mockHoverEnd}
      />
    );

    const description = screen.getByText('A test character for testing');
    expect(description).toBeTruthy();
  });
});
