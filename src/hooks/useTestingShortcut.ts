/**
 * Custom hook to handle testing shortcuts via URL parameters
 * Allows developers to bypass menus and jump directly to combat with specific characters
 * 
 * Usage: /?character=little-red
 */

import { useMemo } from 'react';
import { getCharacterById } from '../data/characters';

interface TestingShortcutState {
  shouldBypass: boolean;
  characterId: string | null;
  error: string | null;
}

/**
 * Hook to parse and validate URL parameters for testing shortcuts
 * 
 * @returns {TestingShortcutState} Object containing bypass flag, character ID, and error message
 * 
 * Requirements:
 * - 4.1: WHEN the application URL contains a character parameter THEN bypass start screen and character selection
 * - 4.2: WHEN the character parameter specifies a valid character THEN initialize combat with that character
 * - 4.3: WHEN the character parameter specifies an invalid character THEN display error and show character selection
 * - 4.4: WHEN no character parameter is present THEN follow normal flow
 */
export function useTestingShortcut(): TestingShortcutState {
  const shortcutState = useMemo(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const characterParam = urlParams.get('character');

    // No parameter present - normal flow (Requirement 4.4)
    if (!characterParam) {
      return {
        shouldBypass: false,
        characterId: null,
        error: null
      };
    }

    // Validate character ID against roster (Requirement 4.2, 4.3)
    const character = getCharacterById(characterParam);

    if (character) {
      // Valid character - bypass menus (Requirement 4.1, 4.2)
      return {
        shouldBypass: true,
        characterId: characterParam,
        error: null
      };
    } else {
      // Invalid character - show error (Requirement 4.3)
      return {
        shouldBypass: false,
        characterId: null,
        error: `Invalid character specified: "${characterParam}". Please select a character.`
      };
    }
  }, []); // Empty dependency array - only compute once on mount

  return shortcutState;
}
