/**
 * ActionButtons component - Renders clickable options for player choices
 * Requirements: 1.2, 3.5, 6.2
 */

import './ActionButtons.css';

interface ActionOption {
  id: string;
  text: string;
}

interface ActionButtonsProps {
  options: ActionOption[];
  onSelect: (id: string) => void;
  disabled: boolean;
}

export function ActionButtons({ options, onSelect, disabled }: ActionButtonsProps) {
  return (
    <div className="action-buttons-container">
      {options.map((option) => (
        <button
          key={option.id}
          className="action-button"
          onClick={() => onSelect(option.id)}
          disabled={disabled}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
}
