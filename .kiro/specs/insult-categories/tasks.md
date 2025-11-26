# Implementation Plan

- [x] 1. Update type definitions and create category configuration




  - [x] 1.1 Add InsultCategory type and update Insult interface in src/types/index.ts


    - Add union type for valid categories
    - Add category field to Insult interface
    - Add CategoryConfig and CategoryMap interfaces
    - _Requirements: 1.1, 1.2, 1.3, 3.4_

  - [x] 1.2 Create category configuration file src/data/categories.ts


    - Define INSULT_CATEGORIES configuration object with colors and metadata
    - Implement getCategoryConfig helper function
    - Implement getCategoryColor helper function
    - Implement isValidCategory type guard
    - _Requirements: 2.1, 3.1, 3.3_

  - [ ]* 1.3 Write property test for category configuration
    - **Property 2: Category colors are unique**
    - **Validates: Requirements 2.1**

- [x] 2. Categorize existing insults





  - [x] 2.1 Assign categories to all 100 insults in src/data/insults.ts


    - Categorize insults as mom, creature, hygiene, pun, fashion, power, or social jokes
    - Add new funny insults if needed to balance categories
    - Review that comebacks properly match their insults
    - Ensure all insults have category field
    - Maintain existing id, text, and correctComebackId fields
    - _Requirements: 1.1, 1.4_

  - [ ]* 2.2 Write property test for insult categorization
    - **Property 1: All insults have valid categories**
    - **Validates: Requirements 1.1, 1.2, 1.3**

  - [ ]* 2.3 Write unit test to verify all 100 insults are categorized
    - Test that insults array has length 100
    - Test that each insult has a category property
    - _Requirements: 1.4_

- [x] 3. Update DialogueBox component for category colors





  - [x] 3.1 Modify DialogueBox component to accept category prop


    - Add optional category prop to DialogueBoxProps interface
    - Import category configuration
    - Apply category-specific styling when category is provided
    - Maintain backward compatibility for non-category messages
    - _Requirements: 2.2, 2.5_

  - [x] 3.2 Update DialogueBox CSS for category color support


    - Add CSS classes or inline styles for category colors
    - Ensure color contrast for readability
    - Maintain existing speaker-based styling as fallback
    - _Requirements: 2.2, 2.3, 2.5_

  - [ ]* 3.3 Write property test for UI color application
    - **Property 3: UI applies category colors correctly**
    - **Validates: Requirements 2.2, 2.5**

  - [ ]* 3.4 Write property test for color consistency
    - **Property 4: Category color consistency**
    - **Validates: Requirements 2.4**

- [x] 4. Update game logic to pass category information




  - [x] 4.1 Modify GameBoard component to pass insult categories to DialogueBox


    - Update DialogueBox usage to include category from currentInsult
    - Handle cases where insult may be null
    - _Requirements: 2.2, 2.4_

  - [ ]* 4.2 Write integration test for category display in game flow
    - Test that categories flow from insult data through game state to UI
    - Verify color styling appears in rendered output
    - _Requirements: 2.2, 2.4, 2.5_

- [x] 5. Checkpoint - Ensure all tests pass





  - Ensure all tests pass, ask the user if questions arise.
