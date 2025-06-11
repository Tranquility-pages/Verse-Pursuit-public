/**
 * Word Tile Color Themes for VersePursuit Web
 * 
 * This file defines predefined color themes that users can select
 * to customize the appearance of their word tiles during gameplay.
 */

export interface WordTileTheme {
  default: string;   // Default word tile color
  selected: string;  // Selected word tile color
  hinted: string;    // Hinted word tile color
  ready: string;     // Ready to place word tile color
  name: string;      // Display name for the theme
  description: string; // Brief description of the theme
}

export const WORD_TILE_THEMES: Record<string, WordTileTheme> = {
  classic: {
    default: '#762D2C',    // Classic maroon
    selected: '#D4AF37',   // Classic gold
    hinted: '#527F3E',     // Classic green
    ready: '#ffb833',      // Classic bright gold
    name: 'Classic',
    description: 'Original VersePursuit colors'
  },
  
  ocean: {
    default: '#2E5984',    // Deep ocean blue
    selected: '#4A90E2',   // Light ocean blue
    hinted: '#20B2AA',     // Light sea green
    ready: '#FFD700',      // Bright gold
    name: 'Ocean',
    description: 'Cool blues and sea greens'
  },
  
  forest: {
    default: '#355E3B',    // Hunter green
    selected: '#6B8E23',   // Olive drab
    hinted: '#32CD32',     // Lime green
    ready: '#FFD700',      // Bright gold
    name: 'Forest',
    description: 'Natural earth tones'
  },
  
  sunset: {
    default: '#8B4513',    // Saddle brown
    selected: '#FF6347',   // Tomato red
    hinted: '#FF8C00',     // Dark orange
    ready: '#FFD700',      // Gold
    name: 'Sunset',
    description: 'Warm oranges and browns'
  },
  
  royal: {
    default: '#483D8B',    // Dark slate blue
    selected: '#9370DB',   // Medium purple
    hinted: '#8A2BE2',     // Blue violet
    ready: '#FFD700',      // Gold
    name: 'Royal',
    description: 'Elegant purples and blues'
  },
  
  contrast: {
    default: '#2F2F2F',    // Dark gray
    selected: '#0066CC',   // Deep blue (high contrast with white text)
    hinted: '#2D5A2D',     // Muted forest green (much easier on the eyes)
    ready: '#CC6600',      // Deep orange (better than bright yellow)
    name: 'High Contrast',
    description: 'Enhanced visibility for accessibility'
  }
};

// Default theme key
export const DEFAULT_THEME_KEY = 'classic';

// Helper function to get theme by key with fallback
export const getWordTileTheme = (themeKey: string): WordTileTheme => {
  return WORD_TILE_THEMES[themeKey] || WORD_TILE_THEMES[DEFAULT_THEME_KEY];
};

// Get all available theme keys
export const getAvailableThemes = (): string[] => {
  return Object.keys(WORD_TILE_THEMES);
};

// Get theme display info for UI
export const getThemeDisplayInfo = (themeKey: string) => {
  const theme = getWordTileTheme(themeKey);
  return {
    key: themeKey,
    name: theme.name,
    description: theme.description,
    previewColor: theme.default
  };
};