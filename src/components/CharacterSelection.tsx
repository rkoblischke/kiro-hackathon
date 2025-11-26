/**
 * CharacterSelection component - allows players to choose their character
 * Requirements: 2.1, 2.2, 2.4, 2.5, 3.1
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterTemplate } from '../types';
import { CHARACTER_ROSTER } from '../data/characters';
import { CharacterCard } from './CharacterCard';
import { useGameContext } from '../context/GameContext';
import './CharacterSelection.css';

interface CharacterSelectionProps {
  errorMessage?: string;
}

/**
 * CharacterSelection component
 * 
 * Displays the character roster as a grid and allows the player to select
 * their character before starting combat.
 * 
 * Validates: Requirements 2.1, 2.2, 2.4, 2.5, 3.1
 */
export const CharacterSelection: React.FC<CharacterSelectionProps> = ({ errorMessage }) => {
  const navigate = useNavigate();
  const { navigateToCombat } = useGameContext();
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterTemplate | null>(null);
  const [hoveredCharacter, setHoveredCharacter] = useState<CharacterTemplate | null>(null);

  /**
   * Handle character selection
   * Requirement 2.4: Mark character as selected when clicked
   */
  const handleCharacterSelect = (character: CharacterTemplate) => {
    setSelectedCharacter(character);
  };

  /**
   * Handle start button click
   * Requirements 2.5, 3.1: Enable button when character selected, initialize combat
   */
  const handleStartGame = () => {
    if (selectedCharacter) {
      const opponentId = selectedCharacter.opponentId;
      navigateToCombat(selectedCharacter.id, opponentId);
      navigate('/battle');
    }
  };

  /**
   * Check if roster is empty
   * Requirement 7.5: Handle empty roster case
   */
  const isRosterEmpty = CHARACTER_ROSTER.length === 0;

  return (
    <div className="character-selection">
      <div className="character-selection-container">
        <h1 className="character-selection-title">Choose Your Fighter</h1>

        {errorMessage && (
          <div className="character-selection-error" role="alert">
            {errorMessage}
          </div>
        )}

        {isRosterEmpty ? (
          <div className="character-selection-empty" role="alert">
            No characters available
          </div>
        ) : (
          <>
            <div className="character-selection-grid">
              {CHARACTER_ROSTER.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  isSelected={selectedCharacter?.id === character.id}
                  isHovered={hoveredCharacter?.id === character.id}
                  onSelect={() => handleCharacterSelect(character)}
                  onHover={() => setHoveredCharacter(character)}
                  onHoverEnd={() => setHoveredCharacter(null)}
                />
              ))}
            </div>

            <div className="character-selection-actions">
              <button
                className="character-selection-start-button"
                onClick={handleStartGame}
                disabled={!selectedCharacter || isRosterEmpty}
                aria-label="Begin Battle"
              >
                Begin Battle
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
