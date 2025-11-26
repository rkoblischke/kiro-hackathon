/**
 * HealthBar component - Visual representation of character health
 * Requirements: 2.2
 */

import './HealthBar.css';

interface HealthBarProps {
  current: number;
  max: number;
  label: string;
}

export function HealthBar({ current, max, label }: HealthBarProps) {
  // Calculate health percentage
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  return (
    <div className="health-bar-wrapper">
      <div className="health-bar-label">
        {label}: {current}/{max}
      </div>
      <div className="health-bar-container">
        <div 
          className="health-bar-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
