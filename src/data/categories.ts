import { InsultCategory, CategoryConfig, CategoryMap } from '../types';

/**
 * Centralized configuration for insult categories
 * Defines colors and metadata for each category type
 */
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

/**
 * Get the configuration for a specific category
 * @param category - The insult category
 * @returns The category configuration object
 */
export function getCategoryConfig(category: InsultCategory): CategoryConfig {
  return INSULT_CATEGORIES[category];
}

/**
 * Get the color for a specific category
 * @param category - The insult category
 * @returns The hex color code for the category
 */
export function getCategoryColor(category: InsultCategory): string {
  return INSULT_CATEGORIES[category].color;
}

/**
 * Type guard to validate if a string is a valid InsultCategory
 * @param value - The value to check
 * @returns True if the value is a valid InsultCategory
 */
export function isValidCategory(value: string): value is InsultCategory {
  return value === 'mom' || value === 'creature' || value === 'hygiene' || value === 'pun' || value === 'fashion' || value === 'power' || value === 'social';
}
