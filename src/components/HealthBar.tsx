/**
 * HealthBar component - Visual representation of character health
 * Requirements: 2.2, 2.6, 2.7
 */

import './HealthBar.css';

interface HealthBarProps {
  current: number;
  max: number;
  label: string;
  position?: 'left' | 'right';
  characterName?: string;
}

export function HealthBar({ current, max, label, position = 'left', characterName }: HealthBarProps) {
  // Calculate health percentage
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  return (
    <div className={`health-bar-wrapper health-bar-${position}`}>
      <div className="health-bar-container">
        <div 
          className="health-bar-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="health-bar-label">
        {current}/{max} HP
      </div>
      {characterName && (
        <div className="health-bar-character-name">
          {characterName}
        </div>
      )}
    </div>
  );
}
