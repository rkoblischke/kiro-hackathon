/**
 * DialogueBox component - Displays insults, comebacks, and game messages
 * Requirements: 2.3, 2.4
 */

import './DialogueBox.css';

interface DialogueBoxProps {
  message: string;
  speaker: 'player' | 'opponent' | 'system';
}

export function DialogueBox({ message, speaker }: DialogueBoxProps) {
  return (
    <div className={`dialogue-box dialogue-box-${speaker}`}>
      <div className="dialogue-content">
        {message}
      </div>
    </div>
  );
}
