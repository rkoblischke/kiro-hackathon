# Implementation Plan

- [x] 1. Set up routing infrastructure and character data





  - Install React Router v6 as a dependency
  - Create character roster data structure in `src/data/characters.ts`
  - Add new type definitions to `src/types/index.ts` (CharacterTemplate, GameFlowState, CharacterSelectionState)
  - _Requirements: 7.1, 7.4_

- [x] 1.1 Write property test for character roster extensibility






  - **Property 15: Dynamic roster extensibility**
  - **Validates: Requirements 7.4**

- [x] 2. Create GameContext for global state management





  - Implement GameContext with state for current screen and selected characters
  - Create navigation functions (navigateToStart, navigateToCharacterSelection, navigateToCombat)
  - Add context provider wrapper
  - _Requirements: 3.1, 3.2, 3.3_

- [ ]* 2.1 Write unit tests for GameContext
  - Test context initialization
  - Test navigation functions update state correctly
  - Test state transitions
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 3. Implement StartScreen component





  - Create StartScreen component with title and proceed button
  - Add Halloween-themed styling
  - Implement fade-in animation on mount
  - Connect proceed button to navigation function
  - _Requirements: 1.1, 1.2, 1.3, 1.5_

- [ ]* 3.1 Write unit tests for StartScreen
  - Test component renders title
  - Test proceed button is present
  - Test clicking proceed button triggers navigation
  - _Requirements: 1.2, 1.3, 1.5_

- [ ] 4. Implement CharacterCard component
  - Create CharacterCard component to display individual character
  - Add props for character data, selection state, and hover state
  - Implement hover effects (scale, shadow)
  - Implement selection visual feedback (border, glow)
  - Add click handler
  - _Requirements: 2.2, 2.3, 2.4_

- [ ]* 4.1 Write unit tests for CharacterCard
  - Test card renders character name and image
  - Test hover state applies correct classes
  - Test selection state applies correct classes
  - Test click handler is called
  - _Requirements: 2.2, 2.3, 2.4_

- [ ] 5. Implement CharacterSelection component
  - Create CharacterSelection component with state management
  - Load character roster and display as grid of CharacterCard components
  - Implement character selection logic
  - Add "Begin Battle" button (disabled when no selection)
  - Handle start button click to navigate to combat
  - Display error messages if present
  - _Requirements: 2.1, 2.2, 2.4, 2.5, 3.1_

- [ ]* 5.1 Write property test for roster display completeness
  - **Property 1: Character roster display completeness**
  - **Validates: Requirements 2.1, 2.2, 5.5, 7.2**

- [ ]* 5.2 Write property test for character selection state
  - **Property 2: Character selection state update**
  - **Validates: Requirements 2.4**

- [ ]* 5.3 Write property test for start button enablement
  - **Property 3: Start button enablement**
  - **Validates: Requirements 2.5**

- [ ]* 5.4 Write unit tests for CharacterSelection
  - Test component loads and displays roster
  - Test clicking character updates selection
  - Test start button is disabled without selection
  - Test start button is enabled with selection
  - Test error message display
  - _Requirements: 2.1, 2.4, 2.5_

- [ ] 6. Implement useTestingShortcut hook
  - Create custom hook to parse URL parameters
  - Extract character ID from query string
  - Validate character ID against roster
  - Return shortcut state (shouldBypass, characterId, error)
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ]* 6.1 Write property test for URL shortcut bypass
  - **Property 8: URL shortcut bypass**
  - **Validates: Requirements 4.1, 4.2**

- [ ]* 6.2 Write property test for invalid URL parameter handling
  - **Property 9: Invalid URL parameter handling**
  - **Validates: Requirements 4.3**

- [ ]* 6.3 Write unit tests for useTestingShortcut
  - Test hook with valid character parameter
  - Test hook with invalid character parameter
  - Test hook with no parameter
  - Test hook with malformed parameter
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 7. Add routing to App component
  - Install and configure React Router
  - Define routes for start screen, character selection, and game board
  - Wrap app with GameContext provider
  - Implement testing shortcut logic on mount
  - Add route guards for battle route
  - _Requirements: 1.1, 4.1, 4.2, 4.3_

- [ ]* 7.1 Write unit tests for App routing
  - Test default route shows start screen
  - Test navigation between routes
  - Test URL parameter triggers shortcut
  - _Requirements: 1.1, 4.1_

- [ ] 8. Modify GameBoard to accept character props
  - Add optional playerId and opponentId props to GameBoard
  - Implement character initialization from roster based on IDs
  - Create helper function to convert CharacterTemplate to Character
  - Maintain backward compatibility with default characters
  - _Requirements: 3.1, 3.2, 3.4, 3.5_

- [ ]* 8.1 Write property test for combat initialization
  - **Property 4: Combat initialization with selected character**
  - **Validates: Requirements 3.1**

- [ ]* 8.2 Write property test for opponent assignment
  - **Property 5: Opponent assignment**
  - **Validates: Requirements 3.2**

- [ ]* 8.3 Write property test for character property preservation
  - **Property 6: Character property preservation**
  - **Validates: Requirements 3.4, 7.3**

- [ ]* 8.4 Write property test for combat state initialization
  - **Property 7: Combat state initialization**
  - **Validates: Requirements 3.5**

- [ ]* 8.5 Write unit tests for GameBoard modifications
  - Test GameBoard initializes with provided character IDs
  - Test GameBoard falls back to defaults without IDs
  - Test character properties match template
  - _Requirements: 3.1, 3.2, 3.4_

- [ ] 9. Add return to character selection functionality
  - Add "Return to Character Selection" button in game-over state
  - Implement click handler to reset state and navigate
  - Ensure game state is properly reset
  - Clear character selection on return
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ]* 9.1 Write property test for state reset on return
  - **Property 10: State reset on return**
  - **Validates: Requirements 5.3, 5.4**

- [ ]* 9.2 Write unit tests for return functionality
  - Test button appears in game-over state
  - Test clicking button navigates to character selection
  - Test game state is reset
  - Test character selection is cleared
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 10. Implement screen transition animations
  - Add CSS animations for fade in/out and slide effects
  - Implement transition state management (isTransitioning flag)
  - Block user input during transitions
  - Restore input after transitions complete
  - Ensure transitions complete within 500ms
  - _Requirements: 6.1, 6.2, 6.3, 6.5_

- [ ]* 10.1 Write property test for input blocking during transitions
  - **Property 11: Input blocking during transitions**
  - **Validates: Requirements 6.2**

- [ ]* 10.2 Write property test for input restoration
  - **Property 12: Input restoration after transitions**
  - **Validates: Requirements 6.3**

- [ ]* 10.3 Write property test for transition timing
  - **Property 14: Transition timing constraint**
  - **Validates: Requirements 6.5**

- [ ]* 10.4 Write unit tests for transition animations
  - Test animation classes are applied
  - Test input is blocked during transitions
  - Test input is restored after transitions
  - _Requirements: 6.2, 6.3_

- [ ] 11. Implement responsive layout for new screens
  - Add responsive CSS for StartScreen (mobile, tablet, desktop)
  - Add responsive CSS for CharacterSelection with grid breakpoints
  - Ensure character cards scale appropriately
  - Test layout at minimum viewport (320px)
  - Ensure all elements remain visible and readable
  - _Requirements: 6.4_

- [ ]* 11.1 Write property test for responsive layout integrity
  - **Property 13: Responsive layout integrity**
  - **Validates: Requirements 6.4**

- [ ]* 11.2 Write unit tests for responsive layout
  - Test layout at mobile breakpoint
  - Test layout at tablet breakpoint
  - Test layout at desktop breakpoint
  - _Requirements: 6.4_

- [ ] 12. Add keyboard shortcut for testing
  - Implement keyboard event listener on StartScreen
  - Define shortcut key (e.g., 'T' for test)
  - Navigate to combat with default test character on shortcut
  - _Requirements: 4.5_

- [ ]* 12.1 Write unit tests for keyboard shortcut
  - Test shortcut key triggers navigation
  - Test shortcut initializes with correct character
  - _Requirements: 4.5_

- [ ] 13. Handle edge cases and error states
  - Implement empty roster handling (show message, disable start)
  - Add error message display for invalid URL parameters
  - Handle missing character images with placeholders
  - Handle characters with missing opponent IDs (assign default)
  - Add error boundaries for component failures
  - _Requirements: 4.3, 7.5_

- [ ]* 13.1 Write unit tests for edge cases
  - Test empty roster shows message
  - Test empty roster disables start button
  - Test invalid URL parameter shows error
  - Test missing image shows placeholder
  - Test missing opponent ID assigns default
  - _Requirements: 4.3, 7.5_

- [ ] 14. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ]* 15. Integration testing
  - Test complete flow: start screen → character selection → combat
  - Test URL shortcut flow bypassing menus
  - Test return to character selection after game over
  - Test browser back/forward navigation
  - Test multiple character selections and game rounds
  - _Requirements: All_
