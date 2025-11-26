import { describe, it, expect } from 'vitest';
import { evaluateCombat } from '../combat';
import { Insult, Comeback } from '../../types';

describe('Combat Evaluation', () => {
  it('should return success when comeback matches insult correctComebackId', () => {
    const insult: Insult = {
      id: 'ins1',
      text: "Your fangs are dull!",
      correctComebackId: 'com1'
    };
    
    const correctComeback: Comeback = {
      id: 'com1',
      text: "At least I have fangs!"
    };
    
    const result = evaluateCombat(insult, correctComeback);
    
    expect(result.success).toBe(true);
    expect(result.damage).toBe(0);
    expect(result.message).toContain('Perfect counter');
  });

  it('should return failure when comeback does not match insult correctComebackId', () => {
    const insult: Insult = {
      id: 'ins1',
      text: "Your fangs are dull!",
      correctComebackId: 'com1'
    };
    
    const wrongComeback: Comeback = {
      id: 'com2',
      text: "Wrong comeback!"
    };
    
    const result = evaluateCombat(insult, wrongComeback);
    
    expect(result.success).toBe(false);
    expect(result.damage).toBeGreaterThan(0);
    expect(result.message).toContain('failed');
  });
});
