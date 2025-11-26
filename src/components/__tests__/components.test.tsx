/**
 * Basic component rendering tests
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Character } from '../Character';
import { HealthBar } from '../HealthBar';
import { DialogueBox } from '../DialogueBox';
import { ActionButtons } from '../ActionButtons';
import { Character as CharacterType } from '../../types';

describe('Component Rendering', () => {
  it('Character component renders without crashing', () => {
    const character: CharacterType = {
      id: 'test',
      name: 'Test Character',
      health: 100,
      maxHealth: 100,
      imageUrl: '/test.jpg'
    };

    const { container } = render(
      <Character 
        character={character}
        isAttacking={false}
        isDefending={false}
        isHurt={false}
      />
    );

    expect(container.querySelector('.character-container')).toBeTruthy();
  });

  it('HealthBar component renders with correct values', () => {
    const { getByText } = render(
      <HealthBar current={75} max={100} label="Test" />
    );

    expect(getByText('75/100 HP')).toBeTruthy();
  });

  it('DialogueBox component renders message', () => {
    const { getByText } = render(
      <DialogueBox message="Test message" speaker="player" />
    );

    expect(getByText('Test message')).toBeTruthy();
  });

  it('ActionButtons component renders options', () => {
    const options = [
      { id: '1', text: 'Option 1' },
      { id: '2', text: 'Option 2' }
    ];

    const { getByText } = render(
      <ActionButtons 
        options={options}
        onSelect={() => {}}
        disabled={false}
      />
    );

    expect(getByText('Option 1')).toBeTruthy();
    expect(getByText('Option 2')).toBeTruthy();
  });
});
