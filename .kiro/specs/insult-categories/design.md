# Design Document

## Overview

This design implements a category system for insults in the Monster Brawl game, organizing the existing 100 insults into seven thematic categories (mom jokes, creature jokes, hygiene jokes, pun jokes, fashion jokes, power jokes, and social jokes) with distinct color coding for visual differentiation. The implementation extends the existing type system and updates the UI components to display category-specific colors.

## Architecture

The category system follows a data-driven approach with minimal changes to existing game logic:

1. **Data Layer**: Extend the `Insult` type to include category information
2. **Configuration Layer**: Define category metadata (names, colors) in a centralized location
3. **UI Layer**: Update `DialogueBox` component to apply category-specific styling
4. **Type Safety**: Use TypeScript union types to enforce valid category values

## Components and Interfaces

### Type Definitions

```typescript
// Extended Insult type
export type InsultCategory = 'mom' | 'creature' | 'hygiene' | 'pun' | 'fashion' | 'power' | 'social';

export interface Insult {
  id: string;
  text: string;
  correctComebackId: string;
  category: InsultCategory;
}

// Category configuration
export interface CategoryConfig {
  name: string;
  color: string;
  displayName: string;
}

export type CategoryMap = Record<InsultCategory, CategoryConfig>;
```

### Category Configuration

A centralized configuration object will define category metadata:

```typescript
// src/data/categories.ts
export const INSULT_CATEGORIES: CategoryMap = {
  mom: {
    name: 'mom',
    color: '#FF69B4',  // Hot pink
    displayName: 'Mom Joke'
  },
  creature: {
    name: 'creature',
    color: '#9370DB',  // Medium purple
    displayName: 'Creature Joke'
  },
  hygiene: {
    name: 'hygiene',
    color: '#32CD32',  // Lime green
    displayName: 'Hygiene Joke'
  },
  pun: {
    name: 'pun',
    color: '#FFD700',  // Gold
    displayName: 'Pun Joke'
  },
  fashion: {
    name: 'fashion',
    color: '#FF1493',  // Deep pink
    displayName: 'Fashion Joke'
  },
  power: {
    name: 'power',
    color: '#FF4500',  // Orange red
    displayName: 'Power Joke'
  },
  social: {
    name: 'social',
    color: '#00CED1',  // Dark turquoise
    displayName: 'Social Joke'
  }
};
```

### Insult Data Updates

Each insult in `src/data/insults.ts` will be assigned a category based on its content:

- **Mom jokes**: Insults referencing family, ancestors, or lineage (e.g., "I bet your family tree is just a twig!")
- **Creature jokes**: Insults about supernatural abilities, transformations, or monster characteristics (e.g., "Your bat transformation looks more like a confused pigeon!")
- **Hygiene jokes**: Insults about smell, appearance, or cleanliness (e.g., "Your lair smells like mothballs and regret!")
- **Pun jokes**: Insults with wordplay or clever linguistic twists (e.g., "Your blood type must be 'whine'!")
- **Fashion jokes**: Insults about clothing, style, or appearance choices (e.g., "Your cape is so last century!")
- **Power jokes**: Insults mocking supernatural powers, strength, or abilities (e.g., "Your supernatural powers are supernaturally weak!")
- **Social jokes**: Insults about personality, social skills, or loneliness (e.g., "Your castle must be lonely with that personality!")

### UI Component Updates

The `DialogueBox` component will be enhanced to accept and display category information:

```typescript
interface DialogueBoxProps {
  message: string;
  speaker: 'player' | 'opponent' | 'system';
  category?: InsultCategory;  // Optional for backward compatibility
}
```

The component will apply category-specific colors through:
1. Dynamic CSS classes based on category
2. Inline styles for category colors
3. Border or text color modifications

## Data Models

### Updated Insult Interface

```typescript
export interface Insult {
  id: string;
  text: string;
  correctComebackId: string;
  category: InsultCategory;  // New required field
}
```

### Category Helper Functions

```typescript
// Get category configuration
export function getCategoryConfig(category: InsultCategory): CategoryConfig;

// Get category color
export function getCategoryColor(category: InsultCategory): string;

// Validate category
export function isValidCategory(value: string): value is InsultCategory;
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: All insults have valid categories

*For any* insult in the insult data array, that insult should have a category property that is one of the valid category values ('mom', 'creature', 'hygiene', 'pun', 'fashion', 'power', or 'social')

**Validates: Requirements 1.1, 1.2, 1.3**

### Property 2: Category colors are unique

*For any* two different categories in the category configuration, their assigned colors should be different

**Validates: Requirements 2.1**

### Property 3: UI applies category colors correctly

*For any* insult with a category, when rendered in the DialogueBox component, the component should apply styling that includes the color associated with that category

**Validates: Requirements 2.2, 2.5**

### Property 4: Category color consistency

*For any* category value, retrieving the color for that category multiple times should always return the same color value

**Validates: Requirements 2.4**

## Error Handling

### Invalid Category Values

- TypeScript type system will prevent invalid category assignments at compile time
- Runtime validation functions will be provided for dynamic scenarios
- Default fallback behavior: if an invalid category is encountered, log a warning and use a default color

### Missing Category Data

- All insults must have a category assigned during data migration
- If a category is undefined, the system will log an error and apply default styling
- Type system enforces non-nullable category field

### Color Application Failures

- If category color cannot be retrieved, fall back to speaker-based colors (existing behavior)
- Ensure graceful degradation if CSS styling fails
- Maintain readability as primary concern

## Testing Strategy

### Unit Testing

Unit tests will verify:
- Category configuration is properly defined with all required fields
- Helper functions correctly retrieve category data
- Type guards validate category values
- DialogueBox component renders with category props
- All 100 insults have been assigned categories

### Property-Based Testing

Property-based tests will use **fast-check** (JavaScript/TypeScript PBT library) with a minimum of 100 iterations per test.

Each property-based test will:
1. Generate random test data (insults, categories, colors)
2. Verify the correctness property holds across all generated inputs
3. Be tagged with the format: **Feature: insult-categories, Property {number}: {property_text}**

Property tests will verify:
- **Property 1**: All insults in the data array have valid category values
- **Property 2**: All category colors in the configuration are unique
- **Property 3**: DialogueBox applies correct colors based on category
- **Property 4**: Category color retrieval is consistent

### Integration Testing

Integration tests will verify:
- Insult data loads correctly with categories
- Game state properly passes category information to UI components
- Color styling is applied correctly in the rendered DOM
- Category system works with existing combat mechanics

## Implementation Notes

### Data Migration

All 100 existing insults need to be categorized. Suggested distribution:
- **Mom jokes** (~10 insults): Family, ancestors, lineage references
- **Creature jokes** (~25 insults): Supernatural abilities, transformations, monster traits
- **Hygiene jokes** (~10 insults): Smell, appearance, cleanliness
- **Pun jokes** (~20 insults): Wordplay, linguistic humor
- **Fashion jokes** (~15 insults): Clothing, style, appearance choices
- **Power jokes** (~10 insults): Supernatural powers, strength, abilities
- **Social jokes** (~10 insults): Personality, social skills, loneliness

### Color Selection Rationale

Colors chosen for high contrast and thematic appropriateness:
- **Mom jokes (Hot Pink #FF69B4)**: Playful, attention-grabbing
- **Creature jokes (Medium Purple #9370DB)**: Mystical, supernatural
- **Hygiene jokes (Lime Green #32CD32)**: Fresh, clean (ironic for hygiene insults)
- **Pun jokes (Gold #FFD700)**: Clever, valuable wordplay
- **Fashion jokes (Deep Pink #FF1493)**: Stylish, bold, fashionable
- **Power jokes (Orange Red #FF4500)**: Aggressive, energetic, powerful
- **Social jokes (Dark Turquoise #00CED1)**: Cool, social, communicative

### Performance Considerations

- Category lookups are O(1) using object key access
- No performance impact on existing game logic
- Minimal additional memory overhead (7 category configs + category strings per insult)

### Backward Compatibility

- Existing game logic remains unchanged
- DialogueBox component maintains backward compatibility with optional category prop
- System messages and comebacks don't require categories
