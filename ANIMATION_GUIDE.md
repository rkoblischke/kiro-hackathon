# Monster Brawl - Character Animation Guide

## Overview
The Dracula and Little Red Riding Hood characters now have dynamic animated states that respond to combat stages using CSS transformations and filters to simulate different poses and actions.

## Animation Technique
Instead of creating multiple SVG/image files, we use advanced CSS techniques:
- **Transform combinations**: scale, skew, rotate, translate
- **Filter effects**: brightness, hue-rotate, saturate, drop-shadow
- **Dual-layer animation**: wrapper + image for complex movements
- **Squash and stretch**: simulates body dynamics and weight

## Combat Stages

### 1. **Idle** (Default)
- **Dracula**: 
  - Defensive "cat fight" stance with hands curled up
  - Gentle floating with subtle breathing effect
  - Horizontal squashing simulates tense, ready posture
- **Little Red**: 
  - Alert ready stance
  - Subtle bobbing motion
  - Slight vertical compression for grounded feel

### 2. **Attacking**
- **Dracula**: 
  - Aggressive lunge forward with skew effect
  - Horizontal stretch simulates arm extension
  - Brightness increase and red glow for intensity
  - Wind-up and follow-through motion
- **Little Red**: 
  - Forward strike with opposite skew direction
  - Similar stretch and brightness effects
  - Crimson glow effect on impact

### 3. **Defending**
- **Dracula**: 
  - Recoils backward with defensive crouch
  - Vertical stretch simulates arms raised
  - Horizontal compression for protective stance
- **Little Red**: 
  - Quick dodge to the side
  - Defensive crouch with vertical stretch
  - Reduced brightness for vulnerability

### 4. **Hurt**
- **Both Characters**:
  - Violent shake with rotation
  - Intense red glow and flash
  - Hue rotation creates pain effect
  - Saturation increase for dramatic impact
  - Multiple shake cycles for impact emphasis

### 5. **Victory**
- **Both Characters**:
  - Triumphant expansion and floating
  - Gentle rotation sway
  - Enhanced glow and brightness
  - Continuous celebration loop

## Technical Implementation

### Components Created
- `DraculaCharacter.tsx` - Animated Dracula component
- `LittleRedCharacter.tsx` - Animated Little Red component
- Corresponding CSS files with advanced keyframe animations

### CSS Techniques Used
```css
/* Dual-layer animation for complex movement */
.character-sprite-wrapper {
  animation: wrapperAnimation;
}
.character-image {
  animation: imageAnimation;
}

/* Transform combinations */
transform: translateX() translateY() scale() rotate() skew();

/* Filter effects for visual states */
filter: drop-shadow() brightness() hue-rotate() saturate();
```

### Props Interface
```typescript
interface CharacterProps {
  health: number;
  maxHealth: number;
  combatStage?: 'idle' | 'attacking' | 'defending' | 'hurt' | 'victory';
}
```

### Usage Example
```tsx
<DraculaCharacter 
  health={opponentHealth} 
  maxHealth={100}
  combatStage="attacking"
/>
```

## Animation Timing
- **Idle**: 2-2.5s infinite loop
- **Attack**: 600ms with auto-return to idle
- **Defend**: 500ms with auto-return to idle
- **Hurt**: 500ms with multiple shake cycles
- **Victory**: 1s infinite celebration loop

## Visual Effects
- **Drop shadows**: Dynamic shadows that change with state
- **Brightness**: Increases during attacks, decreases when defending
- **Hue rotation**: Creates color shifts for pain/power effects
- **Saturation**: Enhances color intensity during dramatic moments
- **Squash & stretch**: Simulates weight, momentum, and body dynamics

## Testing
Use the demo buttons in the app to test different combat stages:
- **Player Attack**: Little Red attacks, Dracula gets hurt
- **Opponent Attack**: Dracula attacks, Little Red gets hurt
- **Reset**: Restore full health and idle states

## Advantages of This Approach
1. **Single asset**: No need for multiple image files
2. **Smooth transitions**: CSS animations are hardware-accelerated
3. **Easy tweaking**: Adjust timing and effects in CSS
4. **Small file size**: No additional images to load
5. **Dynamic effects**: Filters create visual variety from one source

## Future Enhancements
- Add sound effects synchronized with animations
- Implement combo attack sequences
- Add particle effects for impacts (CSS or canvas)
- Create special move animations with unique transforms
- Add screen shake effects for powerful attacks
- Implement damage numbers that float up
