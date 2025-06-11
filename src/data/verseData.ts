import { Verse } from '@/game/types';
import versesJson from './bible-verses.json';

// Transform the JSON data to match our Verse interface
const verses: Verse[] = versesJson.map((verse, index) => ({
  id: `verse_${index + 1}`,
  reference: verse.reference,
  text: verse.text,
  category: verse.category
}));

// Categories available in the game
export const VERSE_CATEGORIES = [
  'All Verses',
  'Famous Verses', 
  'General',
  'Psalms',
  'Promises'
] as const;

export type VerseCategory = typeof VERSE_CATEGORIES[number];

// Get verses by category
export function getVersesByCategory(category: VerseCategory): Verse[] {
  if (category === 'All Verses') {
    return verses;
  }
  return verses.filter(verse => verse.category === category);
}

// Get a random verse from a category
export function getRandomVerse(category: VerseCategory = 'All Verses'): Verse {
  const categoryVerses = getVersesByCategory(category);
  const randomIndex = Math.floor(Math.random() * categoryVerses.length);
  return categoryVerses[randomIndex];
}

// Get verse by ID
export function getVerseById(id: string): Verse | null {
  return verses.find(verse => verse.id === id) || null;
}

// Get verse count by category
export function getVersesCount(category: VerseCategory = 'All Verses'): number {
  return getVersesByCategory(category).length;
}

// Get all verses for testing/development
export function getAllVerses(): Verse[] {
  return verses;
}

// Validate verse category
export function isValidCategory(category: string): category is VerseCategory {
  return VERSE_CATEGORIES.includes(category as VerseCategory);
}

export default verses;