/**
 * CharacterCard component - displays an individual character for selection
 * Requirements: 2.2, 2.3, 2.4
 */

import React from 'react';
import { CharacterTemplate } from '../types';
import './CharacterCard.css';

interface CharacterCardProps {
  character: CharacterTemplate;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: () => void;
  onHoverEnd: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  onHoverEnd
}) => {
  const cardClasses = [
    'character-card',
    isSelected ? 'character-card-selected' : '',
    isHovered ? 'character-card-hover' : ''
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      role="button"
      tabIndex={0}
      aria-label={`Select ${character.displayName}`}
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="character-card-image-container">
        <img
          src={character.thumbnailUrl}
          alt={character.displayName}
          className="character-card-image"
        />
      </div>
      <div className="character-card-content">
        <h3 className="character-card-name">{character.displayName}</h3>
        <p className="character-card-description">{character.description}</p>
      </div>
    </div>
  );
};
