# Implementation Plan

- [x] 1. Set up project structure and dependencies





  - Initialize Node.js project with package.json
  - Install React, TypeScript, Vite, Express, Vitest, and fast-check
  - Create directory structure for components, game logic, data, and tests
  - Configure TypeScript with strict mode
  - Configure Vite for React development
  - Set up basic Express server to serve static files
  - _Requirements: 6.1, 6.4_

- [x] 2. Define core types and data structures





  - Create TypeScript interfaces for Character, Insult, Comeback, GameState, and CombatResult
  - Define insult and comeback data with matching pairs (minimum 6 insults with correct comebacks)
  - Ensure each insult has a correctComebackId that maps to a comeback
  - _Requirements: 8.1, 8.2, 8.3_

- [x] 3. Implement core combat logic




  - [x] 3.1 Create combat evaluation function





    - Write function to check if comeback ID matches insult's correctComebackId
    - Return CombatResult with success boolean and appropriate message
    - _Requirements: 1.4, 3.2, 4.1, 8.4_
  
  - [x] 3.2 Write property test for combat evaluation






    - **Property 1: Combat evaluation correctness**
    - **Validates: Requirements 1.4, 3.2, 4.1, 8.4**
  
  - [x] 3.3 Create damage application function





    - Write function to reduce character health by damage amount
    - Ensure health cannot go below 0
    - Return updated character with new health value
    - _Requirements: 1.5, 3.3, 4.3_
  
  - [x] 3.4 Write property test for damage application






    - **Property 2: Damage application reduces health**
    - **Validates: Requirements 1.5**
  -

  - [x] 3.5 Write property test for failed defense










    - **Property 3: Failed defense applies damage**
    - **Validates: Requirements 3.3, 4.3**
  
  - [x] 3.6 Write property test for successful defense














    - **Property 4: Successful defense prevents damage**
    - **Validates: Requirements 4.2**

- [-] 4. Implement AI opponent logic


  - [x] 4.1 Create AI selection functions



    - Write function to randomly select insult from available options
    - Write function to select comeback (random or correct based on difficulty)
    - Ensure selections always return valid options from provided lists
    - _Requirements: 3.1, 3.4, 8.2, 8.3_
  
  - [ ]* 4.2 Write property test for AI selection
    - **Property 5: AI selection returns valid options**
    - **Validates: Requirements 3.1, 3.4, 8.2, 8.3**

- [x] 5. Implement game state management





  - [x] 5.1 Create game initialization function


    - Initialize both characters with full health (100 HP)
    - Set initial phase to 'player-attack'
    - Load insults and comebacks from data structure
    - Provide 3 random insults as initial available options
    - _Requirements: 1.1, 6.4, 8.1_
  
  - [x] 5.2 Create state transition functions


    - Write function to handle player insult selection
    - Write function to handle opponent comeback response
    - Write function to handle opponent insult delivery
    - Write function to handle player comeback selection
    - Ensure each transition updates phase, turn, and available options correctly
    - _Requirements: 1.2, 1.3, 3.5_
  
  - [ ]* 5.3 Write property test for phase-appropriate options
    - **Property 6: Phase-appropriate options available**
    - **Validates: Requirements 1.2, 3.5**
  
  - [ ]* 5.4 Write property test for state transitions
    - **Property 10: State transitions maintain consistency**
    - **Validates: Requirements 1.3**
  
  - [x] 5.5 Create game over detection function


    - Check if either character's health is <= 0
    - Transition phase to 'game-over' when condition met
    - Set appropriate victory/defeat message
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [ ]* 5.6 Write property test for game over detection
    - **Property 7: Game over detection**
    - **Validates: Requirements 5.1**
  
  - [x] 5.7 Create action blocking logic


    - Implement check to prevent actions when isAnimating is true
    - Implement check to prevent actions when phase is 'game-over'
    - _Requirements: 5.4, 7.5_
  
  - [ ]* 5.8 Write property test for animation blocking
    - **Property 8: Actions blocked during animation**
    - **Validates: Requirements 7.5**
  
  - [ ]* 5.9 Write property test for game over blocking
    - **Property 9: Actions blocked after game over**
    - **Validates: Requirements 5.4**

- [ ] 6. Create React components
  - [ ] 6.1 Build Character component
    - Accept character data and animation state as props
    - Render character image with placeholder
    - Apply CSS classes for attacking, defending, hurt animations
    - _Requirements: 2.1, 7.1, 7.2, 7.3_
  
  - [ ] 6.2 Build HealthBar component
    - Display health as percentage bar
    - Show current/max health numerically
    - Update reactively when health changes
    - _Requirements: 2.2_
  
  - [ ] 6.3 Build DialogueBox component
    - Display insult/comeback text
    - Style differently based on speaker (player/opponent/system)
    - Show game messages and combat results
    - _Requirements: 2.3, 2.4_
  
  - [ ] 6.4 Build ActionButtons component
    - Render list of clickable options (insults or comebacks)
    - Disable buttons when disabled prop is true
    - Handle click events and pass selected ID to parent
    - _Requirements: 1.2, 3.5, 6.2_
  
  - [ ] 6.5 Build GameBoard component
    - Integrate all child components
    - Manage game state using React hooks
    - Orchestrate combat flow and turn progression
    - Handle animation timing and state updates
    - Provide restart functionality
    - _Requirements: 1.1, 1.3, 5.5, 6.3_

- [ ] 7. Implement CSS animations
  - Create keyframe animations for attacking (lunge forward)
  - Create keyframe animations for defending (recoil/block)
  - Create keyframe animations for hurt (shake and flash red)
  - Create keyframe animations for victory (triumphant pose)
  - Create keyframe animations for defeat (collapse)
  - Set animation durations (attack: 800ms, defend: 600ms, hurt: 500ms)
  - Apply cat fighting style with exaggerated movements
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 8. Wire up complete game flow
  - Connect game state management to GameBoard component
  - Implement full combat round: player attack → opponent defend → opponent attack → player defend
  - Ensure animations play in sequence with proper timing
  - Verify game over detection triggers correctly
  - Test restart functionality resets game to initial state
  - _Requirements: 1.1, 1.3, 1.4, 1.5, 5.1, 5.4, 5.5_

- [ ] 9. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Create placeholder assets and styling
  - Add placeholder images for Little Red Riding Hood and Dracula
  - Style game board with Halloween theme (dark colors, spooky fonts)
  - Add basic layout and responsive design
  - Ensure UI is clear and readable
  - _Requirements: 2.1, 6.1_

- [ ] 11. Set up Express server
  - Create server/index.js with Express configuration
  - Serve static files from dist directory
  - Handle routing to serve index.html for all routes
  - Configure port (default 3000)
  - _Requirements: 6.1_

- [ ] 12. Add build and start scripts
  - Configure Vite build command in package.json
  - Add dev script for development server
  - Add start script for production server
  - Test build process creates optimized bundle
  - _Requirements: 6.1_

- [ ] 13. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
