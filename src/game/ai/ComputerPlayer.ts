import { GameState } from '../types';

// Different difficulty levels for the computer player
export enum AIDifficulty {
  EASY = 'easy',
  HARD = 'hard',
}

// Probability that the AI makes the correct move based on difficulty
const CORRECT_MOVE_PROBABILITY = {
  [AIDifficulty.EASY]: 0.7, // 70% chance to make correct move
  [AIDifficulty.HARD]: 0.9, // 90% chance to make correct move
};

// AI response timing - optimized for web
const MOVE_DELAY_RANGE = {
  [AIDifficulty.EASY]: { min: 800, max: 1500 },
  [AIDifficulty.HARD]: { min: 400, max: 800 },
};

// Maximum time AI will wait before making a move
const MAX_THINK_TIME = 2000; // 2 seconds maximum

/**
 * Determines the next move for the computer player
 */
export function determineComputerMove(
  state: GameState
): { wordIndex: number; slotIndex: number } | null {
  try {
    // Basic validation
    if (!state?.round?.isActive || !state?.players || !state?.round?.currentVerse) {
      return null;
    }
    
    // Check if it's AI's turn
    if (state.players.activePlayer !== 'player2' || state.turn?.isPaused) {
      return null;
    }
    
    const playerId = 'player2'; // Computer is always player2
    const availableWords = state.players[playerId]?.words;
    
    if (!availableWords?.length) {
      return null;
    }
    
    // Get difficulty
    const difficulty = (state.config?.difficulty as AIDifficulty) || AIDifficulty.EASY;
    
    // Find empty slots
    const emptySlots = state.round.placementSlots
      .map((slot, index) => ({ slot, index }))
      .filter(({ slot }) => slot?.word === null && slot?.lockedBy === null);
    
    if (emptySlots.length === 0) {
      return null;
    }
    
    // Get verse words
    const verseWords = state.round.currentVerse.text.split(/\s+/);
    
    // Find all possible moves
    const possibleMoves: { wordIndex: number; slotIndex: number; isCorrect: boolean }[] = [];
    
    // Filter to only words that actually appear in the verse
    const realWords = availableWords.filter(word => verseWords.includes(word));
    
    realWords.forEach(word => {
      const wordIndex = availableWords.indexOf(word);
      
      emptySlots.forEach(({ index: slotIndex }) => {
        const correctWord = verseWords[slotIndex];
        possibleMoves.push({
          wordIndex,
          slotIndex,
          isCorrect: word === correctWord,
        });
      });
    });
    
    if (possibleMoves.length === 0) {
      return null;
    }
    
    // Prioritize hinted slots
    const hintedSlots = state.round.placementSlots
      .map((slot, index) => ({ slot, index }))
      .filter(({ slot }) => slot?.word === null && slot?.highlightHint);
    
    if (hintedSlots.length > 0 && Math.random() < 0.8) {
      const hintedMoves = possibleMoves.filter(move => 
        hintedSlots.some(hinted => hinted.index === move.slotIndex)
      );
      
      if (hintedMoves.length > 0) {
        const correctHintedMoves = hintedMoves.filter(move => move.isCorrect);
        if (correctHintedMoves.length > 0) {
          return correctHintedMoves[Math.floor(Math.random() * correctHintedMoves.length)];
        }
      }
    }
    
    // Handle time pressure
    const isTimeRunningOut = state.turn?.remainingTime && state.turn.remainingTime < 8;
    
    if (isTimeRunningOut) {
      const correctMoves = possibleMoves.filter(move => move.isCorrect);
      if (correctMoves.length > 0) {
        return correctMoves[0]; // Take first correct move quickly
      }
      return null; // Skip turn if no correct moves
    }
    
    // Make move based on difficulty
    const shouldMakeCorrectMove = Math.random() < CORRECT_MOVE_PROBABILITY[difficulty];
    
    if (shouldMakeCorrectMove) {
      const correctMoves = possibleMoves.filter(move => move.isCorrect);
      if (correctMoves.length > 0) {
        return correctMoves[Math.floor(Math.random() * correctMoves.length)];
      }
    }
    
    // Fallback: only make correct moves (no incorrect moves)
    const correctMoves = possibleMoves.filter(move => move.isCorrect);
    if (correctMoves.length > 0) {
      return correctMoves[Math.floor(Math.random() * correctMoves.length)];
    }
    
    return null;
  } catch (error) {
    console.error('Error in determineComputerMove:', error);
    return null;
  }
}

/**
 * Gets a random delay time for the AI to make a move based on difficulty
 */
export function getComputerMoveDelay(
  state: GameState, 
  difficulty: AIDifficulty
): number {
  try {
    const validDifficulty = Object.values(AIDifficulty).includes(difficulty) 
      ? difficulty 
      : AIDifficulty.EASY;
    
    const delayRange = MOVE_DELAY_RANGE[validDifficulty];
    const { min, max } = delayRange;
    
    // Get remaining time
    const remainingTime = (state.turn?.remainingTime || 30) * 1000; // Convert to ms
    
    // Adjust delay based on remaining time
    if (remainingTime < 5000) {
      return Math.max(200, remainingTime / 10);
    } else if (remainingTime < 10000) {
      return Math.max(400, min / 2);
    } else if (remainingTime < 15000) {
      return Math.max(600, min);
    }
    
    // Normal delay
    const normalDelay = Math.min(
      Math.floor(Math.random() * (max - min + 1)) + min,
      remainingTime / 2,
      MAX_THINK_TIME
    );
    
    return normalDelay;
  } catch (error) {
    console.error('Error in getComputerMoveDelay:', error);
    return 1000; // Default 1 second
  }
}

/**
 * Determines if the AI should use a hint
 */
export function shouldUseHint(state: GameState): boolean {
  try {
    if (!state.round?.hints || state.round.hints <= 0) {
      return false;
    }
    
    if (state.players?.activePlayer !== 'player2' || state.turn?.isPaused) {
      return false;
    }
    
    const difficulty = (state.config?.difficulty as AIDifficulty) || AIDifficulty.EASY;
    const remainingTime = state.turn?.remainingTime || 30;
    const wordsLength = state.players.player2?.words?.length || 0;
    const consecutiveTimeouts = state.players.player2?.consecutiveTimeouts || 0;
    
    if (difficulty === AIDifficulty.HARD) {
      return (
        (wordsLength > 3 && remainingTime < 15 && Math.random() < 0.6) ||
        (consecutiveTimeouts > 0 && Math.random() < 0.75)
      );
    }
    
    return (
      (remainingTime < 10 && Math.random() < 0.4) ||
      (consecutiveTimeouts > 0 && Math.random() < 0.5)
    );
  } catch (error) {
    console.error('Error in shouldUseHint:', error);
    return false;
  }
}

/**
 * Determines if the AI should purchase more hints
 */
export function shouldPurchaseHints(state: GameState): boolean {
  try {
    if (state.round?.hints && state.round.hints > 0) {
      return false;
    }
    
    if (state.players?.activePlayer !== 'player2' || state.turn?.isPaused) {
      return false;
    }
    
    const score = state.players.player2?.score || 0;
    if (score < 25) {
      return false;
    }
    
    const difficulty = (state.config?.difficulty as AIDifficulty) || AIDifficulty.EASY;
    
    if (difficulty === AIDifficulty.HARD) {
      return score > 30 && Math.random() < 0.8;
    }
    
    return score > 25 && Math.random() < 0.5;
  } catch (error) {
    console.error('Error in shouldPurchaseHints:', error);
    return false;
  }
}