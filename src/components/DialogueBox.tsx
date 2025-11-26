/**
 * DialogueBox component - Displays insults, comebacks, and game messages
 * Requirements: 2.3, 2.4, 2.2, 2.5
 */

import './DialogueBox.css';
import { InsultCategory } from '../types';
import { getCategoryColor } from '../data/categories';

interface DialogueBoxProps {
  message: string;
  speaker: 'player' | 'opponent' | 'system';
  category?: InsultCategory;
}

export function DialogueBox({ message, speaker, category }: DialogueBoxProps) {
  // Apply category-specific styling when category is provided
  const categoryStyle = category ? {
    borderColor: getCategoryColor(category),
    boxShadow: `0 6px 16px rgba(0, 0, 0, 0.7), 0 0 20px ${getCategoryColor(category)}40`
  } : {};

  return (
    <div 
      className={`dialogue-box dialogue-box-${speaker} ${category ? 'dialogue-box-category' : ''}`}
      style={categoryStyle}
    >
      <div className="dialogue-content">
        {message}
      </div>
    </div>
  );
}
