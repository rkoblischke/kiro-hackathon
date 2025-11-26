# Design Document

## Overview

The start screen and character selection system adds a menu layer to Monster Brawl, allowing players to choose their character before entering combat. This feature transforms the game from a single fixed matchup into a more flexible system that supports multiple characters and provides a professional game flow with proper screen transitions.

The implementation will use React Router for navigation between screens, maintain the existing Halloween aesthetic, and integrate seamlessly with the current combat system. A testing shortcut via URL parameters will enable developers to bypass menus for rapid iteration.

## Architecture

### Technology Stack
- **Frontend**: React 18+ with TypeScript (existing)
- **Routing**: React Router v6 for screen navigation
- **State Management**: React Context API for global game state (character selection, game flow)
- **Styling**: CSS3 with animations (existing approach)
- **Build Tool**: Vite (existing)
- **Testing**: Vitest for unit tests, fast-check for property-based testing (existing)

### Application Structure Enhancement
```
monster-brawl/
├── src/
│   ├── components/
│   │   ├── StartScreen.tsx          # NEW: Landing page
│   │   ├── CharacterSelection.tsx   # NEW: Character picker
│   │   ├── CharacterCard.tsx        # NEW: Individual character display
│   │   ├── GameBoard.tsx            # MODIFIED: Accept character props
│   │   └── ... (existing components)
│   ├── game/
│   │   └── ... (existing game logic)
│   ├── data/
│   │   ├── insults.ts               # Existing
│   │   └── characters.ts            # NEW: Character roster data
│   ├── context/
│   │   └── GameContext.tsx          # NEW: Global game state
│   ├── hooks/
│   │   └── useTestingShortcut.ts    # NEW: URL parameter handling
│   ├── types/
│   │   └── index.ts                 # MODIFIED: Add new types
│   └── App.tsx                      # MODIFIED: Add routing
└── ...
```

### Screen Flow
```
┌─────────────┐
│ Start Screen│
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│Character Selection  │
└──────┬──────────────┘
       │
       ▼
┌─────────────┐      ┌──────────────┐
│ Game Board  │─────▶│ Game Over    │
└─────────────┘      └──────┬───────┘
       ▲                     │
       └─────────────────────┘
         (Return to selection)
```

### Testing Shortcut Flow
```
URL: /?character=little-red
       │
       ▼
┌─────────────────┐
│ Validate Param  │
└────┬────────────┘
     │
     ├─ Valid ──────▶ Game Board (skip menus)
     │
     └─ Invalid ────▶ Character Selection (show error)
```

## Components and Interfaces

### Enhanced Types

```typescript
// Existing Character interface (no changes needed)
interface Character {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  imageUrl: string;
}

// NEW: Character template for roster
interface CharacterTemplate {
  id: string;
  name: string;
  displayName: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  maxHealth: number;
  opponentId: string; // Default opponent for this character
}

// NEW: Game flow state
interface GameFlowState {
  currentScreen: 'start' | 'character-selection' | 'combat' | 'game-over';
  selectedCharacterId: string | null;
  selectedOpponentId: string | null;
}

// NEW: Character selection state
interface CharacterSelectionState {
  characters: CharacterTemplate[];
  selectedCharacter: CharacterTemplate | null;
  hoveredCharacter: CharacterTemplate | null;
}
```

### New Components

**StartScreen**: Landing page component
- Props: `{ onProceed: () => void }`
- State: None (stateless presentation)
- Responsibilities:
  - Display game title with Halloween styling
  - Show "Start Game" or "Enter" button
  - Apply entrance animations
  - Handle proceed action
- Layout: Centered content with title, subtitle, and call-to-action button

**CharacterSelection**: Character picker interface
- Props: `{ onCharacterSelect: (characterId: string) => void, errorMessage?: string }`
- State: `CharacterSelectionState`
- Responsibilities:
  - Load and display character roster
  - Handle character hover effects
  - Track selected character
  - Enable/disable start button based on selection
  - Display error messages from invalid shortcuts
- Layout: Grid of character cards with confirm button at bottom

**CharacterCard**: Individual character display
- Props: `{ character: CharacterTemplate, isSelected: boolean, isHovered: boolean, onSelect: () => void, onHover: () => void, onHoverEnd: () => void }`
- Responsibilities:
  - Render character thumbnail and name
  - Apply visual feedback for hover/selection states
  - Handle click and hover events
- Layout: Card with image, name, and optional description

### Modified Components

**App**: Root component with routing
- Add React Router setup
- Define routes for each screen
- Wrap with GameContext provider
- Handle testing shortcut on mount

**GameBoard**: Combat interface
- Modify to accept character IDs as props
- Initialize combat with provided characters instead of hardcoded ones
- Add "Return to Character Selection" button in game over state

### Context and Hooks

**GameContext**: Global state management
```typescript
interface GameContextValue {
  flowState: GameFlowState;
  navigateToStart: () => void;
  navigateToCharacterSelection: () => void;
  navigateToCombat: (playerId: string, opponentId: string) => void;
  navigateToGameOver: () => void;
}
```

**useTestingShortcut**: URL parameter handling
```typescript
function useTestingShortcut(): {
  shouldBypassMenus: boolean;
  characterId: string | null;
  error: string | null;
}
```

## Data Models

### Character Roster

The character roster is a data structure containing all available characters:

```typescript
const CHARACTER_ROSTER: CharacterTemplate[] = [
  {
    id: 'little-red',
    name: 'little-red',
    displayName: 'Little Red Riding Hood',
    description: 'A fierce fighter with a sharp tongue',
    imageUrl: '/RedRidingHood.png',
    thumbnailUrl: '/RedRidingHood.png',
    maxHealth: 100,
    opponentId: 'dracula'
  },
  {
    id: 'dracula',
    name: 'dracula',
    displayName: 'Count Dracula',
    description: 'The prince of darkness himself',
    imageUrl: '/Dracula.svg',
    thumbnailUrl: '/Dracula.svg',
    maxHealth: 100,
    opponentId: 'little-red'
  }
  // Future characters can be added here
];
```

### Character Initialization

When combat starts, character templates are converted to character instances:

```typescript
function createCharacterFromTemplate(template: CharacterTemplate): Character {
  return {
    id: template.id,
    name: template.displayName,
    health: template.maxHealth,
    maxHealth: template.maxHealth,
    imageUrl: template.imageUrl
  };
}
```

### URL Parameter Format

Testing shortcut uses query parameters:
- `?character=little-red` - Start with Little Red vs Dracula
- `?character=dracula` - Start with Dracula vs Little Red
- `?character=invalid` - Show error and character selection

### Navigation State Management

The application maintains navigation state through React Router and Context:
1. URL reflects current screen
2. Context stores selected characters
3. Navigation functions update both URL and context
4. Browser back/forward buttons work correctly


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, several properties were identified as logically redundant:
- Properties 2.1, 5.5, and 7.2 all test that all roster characters are displayed
- Properties 3.4 and 7.3 both test that character properties are preserved from roster to combat
- Properties 4.1 and 4.2 both test URL parameter handling for valid characters

These have been consolidated into comprehensive properties that provide unique validation value.

### Properties

Property 1: Character roster display completeness
*For any* character roster, the character selection interface should display all characters from the roster with their names and images
**Validates: Requirements 2.1, 2.2, 5.5, 7.2**

Property 2: Character selection state update
*For any* character in the roster, clicking that character should mark it as selected in the component state
**Validates: Requirements 2.4**

Property 3: Start button enablement
*For any* character selection state where a character is selected, the start game button should be enabled
**Validates: Requirements 2.5**

Property 4: Combat initialization with selected character
*For any* selected character, clicking the start game button should initialize combat with that character as the player
**Validates: Requirements 3.1**

Property 5: Opponent assignment
*For any* player character selection, the system should assign a valid opponent character from the roster
**Validates: Requirements 3.2**

Property 6: Character property preservation
*For any* character template selected, the combat character instance should have properties matching the template (name, maxHealth, imageUrl)
**Validates: Requirements 3.4, 7.3**

Property 7: Combat state initialization
*For any* character pair initialized for combat, the resulting game state should match the expected initial combat state (full health, player-attack phase, available insults)
**Validates: Requirements 3.5**

Property 8: URL shortcut bypass
*For any* valid character ID in the URL parameter, the system should bypass start screen and character selection, initializing combat directly
**Validates: Requirements 4.1, 4.2**

Property 9: Invalid URL parameter handling
*For any* invalid character ID in the URL parameter, the system should display an error message and show the character selection interface
**Validates: Requirements 4.3**

Property 10: State reset on return
*For any* game state when returning to character selection, the game state should be reset and no character should be selected
**Validates: Requirements 5.3, 5.4**

Property 11: Input blocking during transitions
*For any* screen transition in progress, user input should be blocked until the transition completes
**Validates: Requirements 6.2**

Property 12: Input restoration after transitions
*For any* completed screen transition, user input capability should be restored
**Validates: Requirements 6.3**

Property 13: Responsive layout integrity
*For any* viewport width >= 320px, all UI elements on start screen and character selection should remain visible and properly laid out
**Validates: Requirements 6.4**

Property 14: Transition timing constraint
*For any* screen transition, the transition should complete within 500 milliseconds
**Validates: Requirements 6.5**

Property 15: Dynamic roster extensibility
*For any* character added to the roster data structure, that character should appear in the character selection interface without code changes
**Validates: Requirements 7.4**

## Error Handling

### Input Validation
- Validate character IDs from URL parameters against roster
- Validate character selection state before allowing combat start
- Handle missing or malformed URL parameters gracefully
- Prevent navigation to combat without valid character selection

### Edge Cases
- Empty character roster (should show message, disable start)
- Invalid character ID in URL (show error, redirect to selection)
- Rapid clicking during transitions (ignore duplicate actions)
- Browser back button during combat (handle gracefully)
- Missing character images (show placeholder)
- Character with missing opponent ID (assign default opponent)

### Error Messages
- "Invalid character specified" - for bad URL parameters
- "No characters available" - for empty roster
- "Please select a character" - when trying to start without selection
- Display user-friendly messages in UI
- Log detailed errors to console for debugging

## Testing Strategy

### Unit Testing
The application will use Vitest for unit testing. Unit tests will cover:

- **Component Rendering**: Test that StartScreen, CharacterSelection, and CharacterCard render correctly with props
- **Navigation Logic**: Test that navigation functions update state and routes correctly
- **Character Initialization**: Test conversion from CharacterTemplate to Character instances
- **URL Parameter Parsing**: Test useTestingShortcut hook with various URL formats
- **State Management**: Test GameContext state updates and transitions
- **Edge Cases**: Test empty roster, invalid IDs, missing data

Example unit tests:
- StartScreen renders title and proceed button
- CharacterSelection displays all characters from roster
- Clicking character updates selection state
- Invalid URL parameter shows error message
- Empty roster disables start button

### Property-Based Testing
The application will use fast-check for property-based testing. Property tests will verify universal behaviors across many randomly generated inputs:

- **Roster Display**: Generate random character rosters and verify all are displayed
- **Character Selection**: Generate random character selections and verify state updates
- **Property Preservation**: Generate random character templates and verify properties are preserved in combat
- **URL Shortcuts**: Generate random valid/invalid character IDs and verify correct handling
- **State Transitions**: Generate random navigation sequences and verify state consistency
- **Responsive Layout**: Generate random viewport sizes and verify layout integrity

Each property-based test will:
- Run a minimum of 100 iterations
- Be tagged with a comment referencing the design document property
- Use the format: `// Feature: start-screen-character-selection, Property X: [property text]`

### Integration Testing
- Test complete flow from start screen through character selection to combat
- Test URL shortcut flow bypassing menus
- Test return to character selection after game over
- Test browser navigation (back/forward buttons)
- Test interaction between routing and game state

### Test Organization
```
src/
├── components/
│   └── __tests__/
│       ├── StartScreen.test.tsx
│       ├── CharacterSelection.test.tsx
│       └── CharacterCard.test.tsx
├── context/
│   └── __tests__/
│       └── GameContext.test.tsx
├── hooks/
│   └── __tests__/
│       └── useTestingShortcut.test.ts
└── data/
    └── __tests__/
        ├── characters.test.ts
        └── characters.properties.test.ts
```

## Animation and Transitions

### Screen Transition Animations
- **Fade In**: Start screen and character selection fade in on mount (300ms)
- **Fade Out**: Current screen fades out before navigation (200ms)
- **Slide Up**: Character selection slides up from bottom (400ms)
- **Cross Fade**: Smooth transition between screens (500ms total)

### Character Card Animations
- **Hover Effect**: Scale up slightly (1.05x) with shadow (200ms)
- **Selection Effect**: Border highlight and glow (150ms)
- **Click Feedback**: Brief scale down then up (100ms)

### Animation Timing
- All transitions complete within 500ms maximum
- Input blocked during transitions via `isTransitioning` state
- CSS transitions for performance (GPU-accelerated)
- Fallback for reduced motion preferences

### CSS Animation Classes
```css
.fade-in { animation: fadeIn 300ms ease-in; }
.fade-out { animation: fadeOut 200ms ease-out; }
.slide-up { animation: slideUp 400ms ease-out; }
.character-card-hover { transform: scale(1.05); transition: 200ms; }
.character-card-selected { border: 3px solid gold; box-shadow: 0 0 20px gold; }
```

## Layout and Responsive Design

### Start Screen Layout
```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│         🎃 MONSTER BRAWL 🎃            │
│                                         │
│     Halloween Insult Combat Arena       │
│                                         │
│         [  START GAME  ]                │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

### Character Selection Layout
```
┌─────────────────────────────────────────┐
│         Choose Your Fighter             │
│                                         │
│  ┌────────┐  ┌────────┐  ┌────────┐   │
│  │  🧛    │  │  👧    │  │  🧟    │   │
│  │Dracula │  │Red Hood│  │ Zombie │   │
│  └────────┘  └────────┘  └────────┘   │
│                                         │
│  ┌────────┐  ┌────────┐               │
│  │  🧙    │  │  🐺    │               │
│  │ Witch  │  │  Wolf  │               │
│  └────────┘  └────────┘               │
│                                         │
│         [  BEGIN BATTLE  ]              │
│                                         │
└─────────────────────────────────────────┘
```

### Responsive Breakpoints
- **Mobile** (< 768px): Single column character grid, larger touch targets
- **Tablet** (768px - 1024px): Two column character grid
- **Desktop** (> 1024px): Three column character grid

### Layout Requirements
- Character cards maintain aspect ratio at all sizes
- Minimum card size: 150px x 200px
- Maximum card size: 250px x 350px
- Grid gap: 20px
- Padding: 20px on all sides
- Start button: Minimum 200px wide, 50px tall

## Routing Configuration

### Route Structure
```typescript
const routes = [
  {
    path: '/',
    element: <StartScreen />,
  },
  {
    path: '/select',
    element: <CharacterSelection />,
  },
  {
    path: '/battle',
    element: <GameBoard />,
  }
];
```

### Navigation Guards
- `/battle` route requires selected character (redirect to `/select` if missing)
- URL parameters override normal flow (testing shortcut)
- Browser back button handled gracefully (state preserved)

### URL Parameter Handling
- Query parameter: `?character=<character-id>`
- Parsed on app mount via `useTestingShortcut` hook
- Valid character ID: Skip to `/battle` with that character
- Invalid character ID: Navigate to `/select` with error message
- No parameter: Normal flow through `/` → `/select` → `/battle`

## Integration with Existing System

### GameBoard Modifications
The existing GameBoard component will be modified to:
1. Accept optional `playerId` and `opponentId` props
2. Initialize characters from roster based on IDs
3. Fall back to default characters if no IDs provided (backward compatibility)
4. Add "Return to Character Selection" button in game-over state

### Character Data Integration
The existing character initialization in GameBoard will be replaced with:
```typescript
const playerTemplate = CHARACTER_ROSTER.find(c => c.id === playerId) || DEFAULT_PLAYER;
const opponentTemplate = CHARACTER_ROSTER.find(c => c.id === opponentId) || DEFAULT_OPPONENT;
const player = createCharacterFromTemplate(playerTemplate);
const opponent = createCharacterFromTemplate(opponentTemplate);
```

### Backward Compatibility
- If no routing is active, GameBoard works standalone (existing behavior)
- Default characters used if no selection made
- Existing tests continue to work without modification

## Future Enhancements

While not part of the initial implementation, the architecture supports:
- Character unlock system (locked/unlocked states)
- Character stats and abilities preview
- Multiple opponent selection
- Character customization (colors, accessories)
- Save/load character preferences
- Character-specific insult sets
- Difficulty selection per character
- Tournament mode with multiple fights
- Character animations on selection screen
