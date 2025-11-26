/**
 * Tests for useTestingShortcut hook
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTestingShortcut } from '../useTestingShortcut';

// Helper to mock window.location
function mockLocation(search: string) {
  delete (window as any).location;
  (window as any).location = { search };
}

describe('useTestingShortcut Hook', () => {
  let originalLocation: any;

  beforeEach(() => {
    // Save original location
    originalLocation = window.location;
  });

  afterEach(() => {
    // Restore original location
    (window as any).location = originalLocation;
  });

  it('returns shouldBypass false when no character parameter is present', () => {
    // Mock window.location.search with no parameters
    mockLocation('');

    const { result } = renderHook(() => useTestingShortcut());

    expect(result.current.shouldBypass).toBe(false);
    expect(result.current.characterId).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('returns shouldBypass true with valid character ID', () => {
    // Mock window.location.search with valid character
    mockLocation('?character=little-red');

    const { result } = renderHook(() => useTestingShortcut());

    expect(result.current.shouldBypass).toBe(true);
    expect(result.current.characterId).toBe('little-red');
    expect(result.current.error).toBe(null);
  });

  it('returns error with invalid character ID', () => {
    // Mock window.location.search with invalid character
    mockLocation('?character=invalid-character');

    const { result } = renderHook(() => useTestingShortcut());

    expect(result.current.shouldBypass).toBe(false);
    expect(result.current.characterId).toBe(null);
    expect(result.current.error).toContain('Invalid character specified');
    expect(result.current.error).toContain('invalid-character');
  });

  it('handles mummy character correctly', () => {
    // Mock window.location.search with mummy character
    mockLocation('?character=mummy');

    const { result } = renderHook(() => useTestingShortcut());

    expect(result.current.shouldBypass).toBe(true);
    expect(result.current.characterId).toBe('mummy');
    expect(result.current.error).toBe(null);
  });
});
