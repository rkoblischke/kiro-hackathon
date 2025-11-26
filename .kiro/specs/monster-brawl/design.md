# Design Document

## Overview

Monster Brawl is a browser-based Halloween-themed insult combat game built with React and Node.js. The game features turn-based combat between Little Red Riding Hood (player) and Dracula (AI opponent), inspired by Monkey Island's sword fighting mechanics but with a spooky twist and hilarious cat fighting animations.

The application will be a single-page React application with a simple Node.js backend for serving static files. The core game logic runs entirely in the browser, with game state managed through React hooks and context.

## Architecture

### Technology Stack
- **Frontend**: React 18+ with TypeScript
- **Styling**: CSS3 with animations for cat fighting effects
- **Build Tool**: Vite for fast development and optimized production builds
- **Backend**: Node.js with Express for serving the application
- **Testing**: Vitest for unit tests, fast-check for property-based testing

### Application Structure
```
monster-brawl/
├── server/
│   └── index.js           # Express server
├── src/
│   ├── components/        # React components
│   │   ├── GameBoard.tsx
│   │   ├── Character.tsx
│   │   ├── HealthBar.tsx
│   │   ├── DialogueBox.tsx
│   │   └── ActionButtons.tsx
│   ├── game/             # Game logic
│   │   ├── gameState.ts
│   │   ├── combat.ts
│   │   └── ai.ts
│   ├── data/             # Game content
│   │   └── insults.ts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   └── App.tsx           # Root component
└── public/               # Static assets
    └── images/           # Character placeholders
```

## Components and Interfaces

### Core Types

```typescript
interface Character {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  imageUrl: string;
}

interface Insult {
  id: string;
  text: string;
  correctComebackId: string;
}

interface Comeback {
  id: string;
  text: string;
}

interface GameState {
  player: Character;
  opponent: Character;
  currentTurn: 'player' | 'opponent';
  phase: 'player-attack' | 'player-defend' | 'opponent-attack' | 'opponent-defend' | 'game-over';
  currentInsult: Insult | null;
  availableInsults: Insult[];
  availableComebacks: Comeback[];
  message: string;
  isAnimating: boolean;
}

interface CombatResult {
  success: boolean;
  damage: number;
  message: string;
}
```

### Component Interfaces

**GameBoard**: Main container component that manages overall game state
- Props: None (root component)
- State: GameState
- Responsibilities: Orchestrate game flow, handle turn progression

**Character**: Displays character sprite with animations
- Props: `{ character: Character, isAttacking: boolean, isDefending: boolean, isHurt: boolean }`
- Responsibilities: Render character image, apply animation classes

**HealthBar**: Visual representation of character health
- Props: `{ current: number, max: number, label: string }`
- Responsibilities: Display health as percentage bar

**DialogueBox**: Shows insults, comebacks, and game messages
- Props: `{ message: string, speaker: 'player' | 'opponent' | 'system' }`
- Responsibilities: Display text with appropriate styling

**ActionButtons**: Interactive buttons for player choices
- Props: `{ options: Array<{id: string, text: string}>, onSelect: (id: string) => void, disabled: boolean }`
- Responsibilities: Render clickable options, handle selection

## Data Models

### Insult/Comeback Pairing System

The game uses a matching system where each insult has one correct comeback. The data structure maintains these relationships:

```typescript
const INSULTS: Insult[] = [
  { id: 'ins1', text: "Your fangs are as dull as your wit!", correctComebackId: 'com1' },
  { id: 'ins2', text: "I've seen scarier pumpkins!", correctComebackId: 'com2' },
  { id: 'ins3', text: "Your cape is so last century!", correctComebackId: 'com3' },
  // ... more insults
];

const COMEBACKS: Comeback[] = [
  { id: 'com1', text: "At least I have wit to dull!" },
  { id: 'com2', text: "But none as hollow as your head!" },
  { id: 'com3', text: "Fashion is eternal, unlike mortals!" },
  // ... more comebacks
];
```

### Game State Flow

1. **Initialization**: Both characters start at full health (100 HP)
2. **Player Attack Phase**: Player selects from 3 random insults
3. **Opponent Defend Phase**: AI selects comeback, system evaluates
4. **Opponent Attack Phase**: AI selects random insult
5. **Player Defend Phase**: Player selects from 3 random comebacks, system evaluates
6. **Repeat** until one character reaches 0 HP
7. **Game Over**: Display result and restart option

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, several properties were identified as logically redundant:
- Properties 1.4, 3.2, 4.1, and 8.4 all test the same combat evaluation logic
- Properties 3.3 and 4.3 both test damage application on failed defense
- Properties 1.1 and 6.4 both test initialization
- Properties 1.2 and 3.5 both test phase-appropriate option availability
- Properties 3.1, 3.4, 8.2, and 8.3 all test valid selection from data structures

These have been consolidated into comprehensive properties that provide unique validation value.

### Properties

Property 1: Combat evaluation correctness
*For any* insult and comeback pair, the evaluation function should return success if and only if the comeback's ID matches the insult's correctComebackId
**Validates: Requirements 1.4, 3.2, 4.1, 8.4**

Property 2: Damage application reduces health
*For any* character with health > 0, applying damage should reduce their health by the specified damage amount (minimum 0)
**Validates: Requirements 1.5**

Property 3: Failed defense applies damage
*For any* combat scenario where the defender selects an incorrect comeback, the defending character should take damage
**Validates: Requirements 3.3, 4.3**

Property 4: Successful defense prevents damage
*For any* combat scenario where the defender selects the correct comeback, the defending character's health should remain unchanged
**Validates: Requirements 4.2**

Property 5: AI selection returns valid options
*For any* game state requiring AI selection (insult or comeback), the AI should return an option that exists in the available options list
**Validates: Requirements 3.1, 3.4, 8.2, 8.3**

Property 6: Phase-appropriate options available
*For any* game state in player-attack or player-defend phase, the available options list should be non-empty and contain valid insults or comebacks respectively
**Validates: Requirements 1.2, 3.5**

Property 7: Game over detection
*For any* game state where either character's health reaches zero or below, the game phase should transition to 'game-over'
**Validates: Requirements 5.1**

Property 8: Actions blocked during animation
*For any* game state where isAnimating is true, action functions should not modify game state until animation completes
**Validates: Requirements 7.5**

Property 9: Actions blocked after game over
*For any* game state in 'game-over' phase, combat action functions should not modify character health or phase
**Validates: Requirements 5.4**

Property 10: State transitions maintain consistency
*For any* valid game state transition (e.g., selecting an insult), the resulting state should have consistent phase, turn, and available options
**Validates: Requirements 1.3**

## Error Handling

### Input Validation
- Validate that selected insult/comeback IDs exist in available options
- Prevent actions when game is in invalid state (animating, game over)
- Handle missing or malformed insult/comeback data gracefully

### Edge Cases
- Health cannot go below 0
- Health cannot exceed maxHealth
- Empty insult/comeback lists should be handled (though should never occur in normal flow)
- Rapid clicking during animations should be ignored

### Error Messages
- Display user-friendly messages for any errors
- Log detailed errors to console for debugging
- Provide fallback UI state if critical error occurs

## Testing Strategy

### Unit Testing
The application will use Vitest for unit testing. Unit tests will cover:

- **Game State Management**: Test initialization, state transitions, and state updates
- **Combat Logic**: Test damage calculation, evaluation logic with specific examples
- **AI Behavior**: Test that AI selection functions return valid choices
- **Edge Cases**: Test boundary conditions (health at 0, empty lists, etc.)
- **Component Rendering**: Test that components render with expected props

Example unit tests:
- Initialize game creates characters with full health
- Selecting correct comeback prevents damage
- Health cannot go negative
- Game over triggers when health reaches 0

### Property-Based Testing
The application will use fast-check for property-based testing. Property tests will verify universal behaviors across many randomly generated inputs:

- **Combat Evaluation**: Generate random insult/comeback pairs and verify evaluation logic
- **Damage Application**: Generate random damage values and verify health calculations
- **AI Selection**: Generate random game states and verify AI always returns valid options
- **State Consistency**: Generate random action sequences and verify state remains consistent
- **Phase Transitions**: Generate random game states and verify phase transitions are correct

Each property-based test will:
- Run a minimum of 100 iterations
- Be tagged with a comment referencing the design document property
- Use the format: `// Feature: monster-brawl, Property X: [property text]`

### Integration Testing
- Test complete combat rounds from start to finish
- Test full game flow from initialization to game over
- Test UI interactions trigger correct state changes

### Test Organization
```
src/
├── game/
│   ├── __tests__/
│   │   ├── combat.test.ts
│   │   ├── combat.properties.test.ts
│   │   ├── gameState.test.ts
│   │   └── ai.test.ts
└── components/
    └── __tests__/
        ├── GameBoard.test.tsx
        └── Character.test.tsx
```

## Animation System

### CSS Animation Classes
- `.attacking`: Character lunges forward with exaggerated motion
- `.defending`: Character recoils or blocks
- `.hurt`: Character shakes and flashes red
- `.victory`: Character celebrates with triumphant pose
- `.defeat`: Character collapses dramatically

### Animation Timing
- Attack animations: 800ms
- Defend animations: 600ms
- Hurt animations: 500ms
- Text display delays: 300ms between messages

### Animation Flow
1. Player selects action → trigger animation
2. Set `isAnimating: true` to block further input
3. Display dialogue text
4. Play character animations
5. Update health/state after animation completes
6. Set `isAnimating: false` to allow next action

## Deployment

### Development
```bash
npm install
npm run dev
```
Runs Vite dev server on http://localhost:5173

### Production
```bash
npm run build
npm start
```
Builds optimized bundle and serves via Express on port 3000

### File Structure
- Static assets served from `dist/` after build
- Express server handles routing and serves index.html
- All game logic runs client-side

## Future Enhancements

While not part of the initial implementation, the architecture supports:
- Multiple opponents with different insult sets
- Multiple playable characters
- Difficulty levels (AI intelligence)
- Sound effects and music
- Persistent high scores
- Multiplayer mode
- Custom character/background images
- Expanded insult/comeback library
