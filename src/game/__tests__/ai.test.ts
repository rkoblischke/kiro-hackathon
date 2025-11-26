import { describe, it, expect } from 'vitest';
import { selectRandomInsult, selectComeback } from '../ai';
import { Insult, Comeback } from '../../types';

describe('AI Selection Functions', () => {
  const mockInsults: Insult[] = [
    { id: 'ins1', text: 'Test insult 1', correctComebackId: 'com1' },
    { id: 'ins2', text: 'Test insult 2', correctComebackId: 'com2' },
    { id: 'ins3', text: 'Test insult 3', correctComebackId: 'com3' }
  ];

  const mockComebacks: Comeback[] = [
    { id: 'com1', text: 'Test comeback 1' },
    { id: 'com2', text: 'Test comeback 2' },
    { id: 'com3', text: 'Test comeback 3' }
  ];

  describe('selectRandomInsult', () => {
    it('should return a valid insult from available options', () => {
      const result = selectRandomInsult(mockInsults);
      
      expect(mockInsults).toContain(result);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('correctComebackId');
    });

    it('should throw error when no insults available', () => {
      expect(() => selectRandomInsult([])).toThrow('No available insults to select from');
    });

    it('should return the only insult when only one available', () => {
      const singleInsult = [mockInsults[0]];
      const result = selectRandomInsult(singleInsult);
      
      expect(result).toBe(mockInsults[0]);
    });
  });

  describe('selectComeback', () => {
    it('should return a valid comeback from available options', () => {
      const result = selectComeback(mockComebacks);
      
      expect(mockComebacks).toContain(result);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('text');
    });

    it('should throw error when no comebacks available', () => {
      expect(() => selectComeback([])).toThrow('No available comebacks to select from');
    });

    it('should return the only comeback when only one available', () => {
      const singleComeback = [mockComebacks[0]];
      const result = selectComeback(singleComeback);
      
      expect(result).toBe(mockComebacks[0]);
    });

    it('should accept optional currentInsult parameter', () => {
      const currentInsult = mockInsults[0];
      const result = selectComeback(mockComebacks, currentInsult);
      
      expect(mockComebacks).toContain(result);
    });
  });
});