/**
 * Property-based tests for combat logic
 * Using fast-check for property-based testing
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { applyDamage, evaluateCombat } from '../combat';
import { Character, Insult, Comeback } from '../../types';

describe('Combat Properties', () => {
  /**
   * Feature: monster-brawl, Property 1: Combat evaluation correctness
   * Validates: Requirements 1.4, 3.2, 4.1, 8.4
   * 
   * For any insult and comeback pair, the evaluation function should return success 
   * if and only if the comeback's ID matches the insult's correctComebackId
   */
  it('Property 1: Combat evaluation correctness', () => {
    fc.assert(
      fc.property(
        // Generate arbitrary insults
        fc.record({
          id: fc.string(),
          text: fc.string(),
          correctComebackId: fc.string()
        }),
        // Generate arbitrary comebacks
        fc.record({
          id: fc.string(),
          text: fc.string()
        }),
        (insult: Insult, comeback: Comeback) => {
          const result = evaluateCombat(insult, comeback);
          
          // The result should be successful if and only if IDs match
          const shouldSucceed = comeback.id === insult.correctComebackId;
          expect(result.success).toBe(shouldSucceed);
          
          // If successful, damage should be 0
          if (shouldSucceed) {
            expect(result.damage).toBe(0);
          } else {
            // If failed, damage should be positive
            expect(result.damage).toBeGreaterThan(0);
          }
          
          // Result should always have a message
          expect(result.message).toBeTruthy();
          expect(typeof result.message).toBe('string');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: monster-brawl, Property 2: Damage application reduces health
   * Validates: Requirements 1.5
   * 
   * For any character with health > 0, applying damage should reduce their health 
   * by the specified damage amount (minimum 0)
   */
  it('Property 2: Damage application reduces health', () => {
    fc.assert(
      fc.property(
        // Generate arbitrary characters with positive health
        fc.record({
          id: fc.string(),
          name: fc.string(),
          health: fc.integer({ min: 1, max: 200 }),
          maxHealth: fc.constant(100),
          imageUrl: fc.string()
        }),
        // Generate arbitrary non-negative damage values
        fc.integer({ min: 0, max: 200 }),
        (character: Character, damage: number) => {
          const result = applyDamage(character, damage);
          
          // Health should be reduced by damage amount, but not below 0
          const expectedHealth = Math.max(0, character.health - damage);
          expect(result.health).toBe(expectedHealth);
          
          // Health should never be negative
          expect(result.health).toBeGreaterThanOrEqual(0);
          
          // Health should not increase
          expect(result.health).toBeLessThanOrEqual(character.health);
          
          // Other character properties should remain unchanged
          expect(result.id).toBe(character.id);
          expect(result.name).toBe(character.name);
          expect(result.maxHealth).toBe(character.maxHealth);
          expect(result.imageUrl).toBe(character.imageUrl);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: monster-brawl, Property 3: Failed defense applies damage
   * Validates: Requirements 3.3, 4.3
   * 
   * For any combat scenario where the defender selects an incorrect comeback, 
   * the defending character should take damage
   */
  it('Property 3: Failed defense applies damage', () => {
    fc.assert(
      fc.property(
        // Generate arbitrary insults
        fc.record({
          id: fc.string(),
          text: fc.string(),
          correctComebackId: fc.string()
        }),
        // Generate arbitrary comebacks with DIFFERENT id than correctComebackId
        fc.record({
          id: fc.string(),
          text: fc.string()
        }),
        // Generate arbitrary defending character
        fc.record({
          id: fc.string(),
          name: fc.string(),
          health: fc.integer({ min: 1, max: 200 }),
          maxHealth: fc.constant(100),
          imageUrl: fc.string()
        }),
        (insult: Insult, comeback: Comeback, defender: Character) => {
          // Pre-condition: ensure comeback is incorrect (doesn't match insult's correct comeback)
          fc.pre(comeback.id !== insult.correctComebackId);
          
          // Evaluate the combat with incorrect comeback
          const combatResult = evaluateCombat(insult, comeback);
          
          // Combat should fail
          expect(combatResult.success).toBe(false);
          
          // Damage should be positive
          expect(combatResult.damage).toBeGreaterThan(0);
          
          // Apply the damage to the defender
          const damagedDefender = applyDamage(defender, combatResult.damage);
          
          // Defender's health should be reduced
          expect(damagedDefender.health).toBeLessThan(defender.health);
          
          // The reduction should equal the damage amount (or bring health to 0)
          const expectedHealth = Math.max(0, defender.health - combatResult.damage);
          expect(damagedDefender.health).toBe(expectedHealth);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: monster-brawl, Property 4: Successful defense prevents damage
   * Validates: Requirements 4.2
   * 
   * For any combat scenario where the defender selects the correct comeback, 
   * the defending character's health should remain unchanged
   */
  it('Property 4: Successful defense prevents damage', () => {
    fc.assert(
      fc.property(
        // Generate arbitrary insult with a correctComebackId
        fc.record({
          id: fc.string(),
          text: fc.string(),
          correctComebackId: fc.string()
        }),
        // Generate arbitrary defending character
        fc.record({
          id: fc.string(),
          name: fc.string(),
          health: fc.integer({ min: 1, max: 200 }),
          maxHealth: fc.constant(100),
          imageUrl: fc.string()
        }),
        (insult: Insult, defender: Character) => {
          // Create the correct comeback that matches the insult
          const correctComeback: Comeback = {
            id: insult.correctComebackId,
            text: 'A perfect counter!'
          };
          
          // Store the original health
          const originalHealth = defender.health;
          
          // Evaluate the combat with correct comeback
          const combatResult = evaluateCombat(insult, correctComeback);
          
          // Combat should succeed
          expect(combatResult.success).toBe(true);
          
          // Damage should be 0
          expect(combatResult.damage).toBe(0);
          
          // Apply the damage (which should be 0) to the defender
          const defendedCharacter = applyDamage(defender, combatResult.damage);
          
          // Defender's health should remain unchanged
          expect(defendedCharacter.health).toBe(originalHealth);
          
          // All other character properties should remain unchanged
          expect(defendedCharacter.id).toBe(defender.id);
          expect(defendedCharacter.name).toBe(defender.name);
          expect(defendedCharacter.maxHealth).toBe(defender.maxHealth);
          expect(defendedCharacter.imageUrl).toBe(defender.imageUrl);
        }
      ),
      { numRuns: 100 }
    );
  });
});
