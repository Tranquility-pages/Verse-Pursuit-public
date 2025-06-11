import {
  GameState,
  Verse,
  PlacementSlot,
  PlayerState,
  GameMove,
  PlaceWordMove,
  UseHintMove,
  PurchaseHintsMove,
  RequestExchangeMove,
  RespondExchangeMove,
  TimerUpdateMove,
  EndRoundMove
} from '../types';

const DEFAULT_TURN_TIME = 30; // seconds
const TIME_WARNING_THRESHOLD = 10; // seconds
const MAX_HINTS = 5; // Initial hints per round
const HINT_COST = 20; // Points to purchase more hints
const TIMEOUT_PENALTY = 5; // Points penalty for timeout
const QUICK_PLACEMENT_BONUS = 1; // Bonus for placement within 5 seconds
const WINNING_SCORE = 100; // Score needed to win the game
const QUICK_PLACEMENT_TIME = 5000; // 5 seconds in milliseconds

export function initializeGame(
  gameMode: 'single' | 'multi',
  difficulty: 'easy' | 'hard',
  category: string,
  player1Name = 'Player 1',
  player2Name = 'Computer'
): GameState {
  return {
    config: {
      gameMode,
      difficulty,
      category,
    },
    round: {
      isActive: false,
      currentRound: 0,
      currentVerse: null,
      placementSlots: [],
      hints: MAX_HINTS,
      showVerseReference: false,
    },
    game: {
      roundsCompleted: 0,
    },
    players: {
      player1: createInitialPlayerState(player1Name),
      player2: createInitialPlayerState(player2Name),
      activePlayer: 'player1',
    },
    turn: {
      remainingTime: DEFAULT_TURN_TIME,
      isTimerWarning: false,
      turnStartTime: Date.now(),
      isPaused: false,
    },
    wordExchange: {
      isRequested: false,
      requestedBy: null,
      selectedWordIndex: null,
    },
  };
}

function createInitialPlayerState(name: string): PlayerState {
  return {
    name,
    score: 0,
    totalScore: 0,
    words: [],
    consecutiveTimeouts: 0,
    mistakes: 0,
    avatar: '1', // Default avatar
  };
}

export function setupVerse(state: GameState, verse: Verse): GameState {
  const words = verse.text.split(/\s+/).filter(word => word.length > 0);
  const placementSlots: PlacementSlot[] = words.map(() => ({
    word: null,
    lockedBy: null,
    highlightHint: false,
  }));
  
  const filledIndices = new Set<number>();
  const firstIndex = 0;
  const lastIndex = words.length - 1;
  
  // Only pre-fill words in EASY mode
  if (state.config.difficulty === 'easy') {
    filledIndices.add(firstIndex);
    filledIndices.add(lastIndex);
    
    placementSlots[firstIndex] = {
      word: words[firstIndex],
      lockedBy: 'system',
      highlightHint: false,
    };
    
    placementSlots[lastIndex] = {
      word: words[lastIndex],
      lockedBy: 'system',
      highlightHint: false,
    };
    
    // Add middle word as third clue
    if (words.length > 2) {
      const middleIndex = Math.floor(words.length / 2);
      if (!filledIndices.has(middleIndex)) {
        filledIndices.add(middleIndex);
        placementSlots[middleIndex] = {
          word: words[middleIndex],
          lockedBy: 'system',
          highlightHint: false,
        };
      }
    }
  }
  
  // Calculate remaining words (words that need to be placed)
  const remainingWords = words.filter((_, index) => !filledIndices.has(index));
  
  // Create deterministic shuffle function for consistent word order
  const deterministicShuffle = (array: string[]): string[] => {
    const shuffled = [...array];
    const seed = verse.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const seedFactor = (i + 1) * seed % 19937;
      const j = Math.floor((seedFactor % 100) / 100 * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  };
  
  const shuffledDistribution = deterministicShuffle(remainingWords);
  
  // Both players get all words needed for the verse
  const player1Words = [...shuffledDistribution];
  const player2Words = [...shuffledDistribution];
  
  return {
    ...state,
    round: {
      ...state.round,
      isActive: true,
      currentRound: state.round.currentRound + 1,
      currentVerse: verse,
      placementSlots,
      hints: MAX_HINTS,
      showVerseReference: false,
    },
    players: {
      ...state.players,
      player1: {
        ...state.players.player1,
        words: player1Words,
        score: 0,
        mistakes: 0,
        consecutiveTimeouts: 0,
      },
      player2: {
        ...state.players.player2,
        words: player2Words,
        score: 0,
        mistakes: 0,
        consecutiveTimeouts: 0,
      },
    },
    turn: {
      remainingTime: DEFAULT_TURN_TIME,
      isTimerWarning: false,
      turnStartTime: Date.now(),
      isPaused: false,
    },
    wordExchange: {
      isRequested: false,
      requestedBy: null,
      selectedWordIndex: null,
    },
  };
}

export function placeWord(
  state: GameState,
  playerId: 'player1' | 'player2',
  wordIndex: number,
  slotIndex: number
): GameState {
  // Validate the move
  if (
    !state.round.isActive ||
    state.players.activePlayer !== playerId ||
    state.turn.isPaused ||
    state.round.placementSlots[slotIndex].word !== null ||
    state.round.placementSlots[slotIndex].lockedBy !== null ||
    wordIndex < 0 ||
    wordIndex >= state.players[playerId].words.length
  ) {
    return state;
  }
  
  const selectedWord = state.players[playerId].words[wordIndex];
  const correctWord = state.round.currentVerse?.text.split(/\s+/)[slotIndex];
  
  // Improved word validation with case-insensitive comparison and punctuation handling
  const normalizeWord = (word: string) => {
    return word.toLowerCase().replace(/[^\w]/g, '');
  };
  
  const isCorrect = normalizeWord(selectedWord) === normalizeWord(correctWord || '');
  
  // Calculate points based on correctness
  let points = 0;
  if (isCorrect) {
    points = selectedWord.length;
    
    // Check for quick placement bonus
    const timeElapsed = Date.now() - state.turn.turnStartTime;
    if (timeElapsed <= QUICK_PLACEMENT_TIME) {
      points += QUICK_PLACEMENT_BONUS;
    }
  }
  
  // Remove word from player's hand
  const newPlayerWords = [...state.players[playerId].words];
  newPlayerWords.splice(wordIndex, 1);
  
  // Update the board slot - place word but only lock if correct
  const newPlacementSlots = [...state.round.placementSlots];
  newPlacementSlots[slotIndex] = {
    word: selectedWord, // Place the selected word (even if incorrect)
    lockedBy: isCorrect ? playerId : null, // Only lock if correct
    highlightHint: false,
  };
  
  // Update player state
  const newPlayerState = {
    ...state.players[playerId],
    words: newPlayerWords,
    score: isCorrect 
      ? state.players[playerId].score + points
      : Math.max(0, state.players[playerId].score - 1), // Penalty for incorrect
    mistakes: isCorrect 
      ? state.players[playerId].mistakes 
      : state.players[playerId].mistakes + 1,
    consecutiveTimeouts: isCorrect ? 0 : state.players[playerId].consecutiveTimeouts,
  };
  
  const newPlayers = {
    ...state.players,
    [playerId]: newPlayerState,
  };
  
  // Check if round is complete (all slots have locked words)
  const isRoundComplete = newPlacementSlots.every(slot => {
    return slot.lockedBy !== null; // Only count locked slots
  });
  
  // Turn management logic:
  // - Correct placement: player continues turn (unless round complete or single-player mode)
  // - Incorrect placement: turn switches immediately
  const nextPlayer = playerId === 'player1' ? 'player2' : 'player1';
  
  let activePlayer: 'player1' | 'player2';
  if (isRoundComplete) {
    // Round complete - next player starts new round
    activePlayer = nextPlayer;
  } else if (isCorrect && state.config.gameMode === 'multi') {
    // Correct placement in multiplayer - player continues
    activePlayer = playerId;
  } else {
    // Incorrect placement OR single-player mode - switch turns
    activePlayer = nextPlayer;
  }
  
  // Show verse reference when round completes
  const showVerseReference = isRoundComplete ? true : state.round.showVerseReference;
  
  // Check if game is complete
  const isGameComplete = 
    newPlayerState.totalScore + newPlayerState.score >= WINNING_SCORE ||
    state.players[nextPlayer].totalScore + state.players[nextPlayer].score >= WINNING_SCORE;
  
  return {
    ...state,
    round: {
      ...state.round,
      placementSlots: newPlacementSlots,
      isActive: !isRoundComplete,
      showVerseReference,
    },
    game: {
      ...state.game,
      roundsCompleted: isRoundComplete ? state.game.roundsCompleted + 1 : state.game.roundsCompleted,
    },
    players: {
      ...newPlayers,
      activePlayer,
    },
    turn: {
      remainingTime: DEFAULT_TURN_TIME,
      isTimerWarning: false,
      turnStartTime: Date.now(),
      isPaused: isRoundComplete || isGameComplete,
    },
  };
}

export function applyHint(state: GameState): GameState {
  if (state.round.hints <= 0 || !state.round.isActive || state.turn.isPaused) {
    return state;
  }
  
  // Find an empty slot that hasn't been hinted
  const emptySlots = state.round.placementSlots
    .map((slot, index) => ({ slot, index }))
    .filter(({ slot }) => slot.word === null && !slot.highlightHint);
  
  if (emptySlots.length === 0) {
    return state;
  }
  
  // Pick a random empty slot to hint
  const randomIndex = Math.floor(Math.random() * emptySlots.length);
  const slotIndex = emptySlots[randomIndex].index;
  
  const newPlacementSlots = [...state.round.placementSlots];
  newPlacementSlots[slotIndex] = {
    ...newPlacementSlots[slotIndex],
    highlightHint: true,
  };
  
  return {
    ...state,
    round: {
      ...state.round,
      placementSlots: newPlacementSlots,
      hints: state.round.hints - 1,
    },
  };
}

export function purchaseHints(state: GameState, playerId: 'player1' | 'player2'): GameState {
  if (!state.round.isActive || state.turn.isPaused) {
    return state;
  }
  
  const player = state.players[playerId];
  
  if (player.score < HINT_COST) {
    return state;
  }
  
  return {
    ...state,
    round: {
      ...state.round,
      hints: state.round.hints + 5,
    },
    players: {
      ...state.players,
      [playerId]: {
        ...player,
        score: player.score - HINT_COST,
      },
    },
  };
}

export function processTurnTimer(
  state: GameState, 
  elapsedSeconds: number
): GameState {
  if (!state.round.isActive || state.turn.isPaused) {
    return state;
  }
  
  const newRemainingTime = Math.max(state.turn.remainingTime - elapsedSeconds, 0);
  const isTimerWarning = newRemainingTime <= TIME_WARNING_THRESHOLD;
  
  // Check for timeout
  if (newRemainingTime === 0) {
    const activePlayer = state.players.activePlayer;
    const nextPlayer = activePlayer === 'player1' ? 'player2' : 'player1';
    
    const consecutiveTimeouts = state.players[activePlayer].consecutiveTimeouts + 1;
    const penalizedScore = Math.max(0, state.players[activePlayer].score - TIMEOUT_PENALTY);
    
    const newPlayerState = {
      ...state.players[activePlayer],
      consecutiveTimeouts,
      score: penalizedScore,
    };
    
    // Check if player has timed out 3 consecutive times
    if (consecutiveTimeouts >= 3) {
      return endRound({
        ...state,
        players: {
          ...state.players,
          [activePlayer]: newPlayerState,
        },
      });
    }
    
    return {
      ...state,
      players: {
        ...state.players,
        [activePlayer]: newPlayerState,
        activePlayer: nextPlayer,
      },
      turn: {
        remainingTime: DEFAULT_TURN_TIME,
        isTimerWarning: false,
        turnStartTime: Date.now(),
        isPaused: false,
      },
    };
  }
  
  return {
    ...state,
    turn: {
      ...state.turn,
      remainingTime: newRemainingTime,
      isTimerWarning,
    },
  };
}

export function endRound(state: GameState): GameState {
  if (!state.round.isActive) {
    return state;
  }
  
  const player1TotalScore = state.players.player1.totalScore + state.players.player1.score;
  const player2TotalScore = state.players.player2.totalScore + state.players.player2.score;
  
  return {
    ...state,
    round: {
      ...state.round,
      isActive: false,
      showVerseReference: true,
    },
    game: {
      ...state.game,
      roundsCompleted: state.game.roundsCompleted + 1,
    },
    players: {
      ...state.players,
      player1: {
        ...state.players.player1,
        totalScore: player1TotalScore,
      },
      player2: {
        ...state.players.player2,
        totalScore: player2TotalScore,
      },
    },
    turn: {
      ...state.turn,
      isPaused: true,
    },
  };
}

export function requestWordExchange(
  state: GameState,
  playerId: 'player1' | 'player2',
  wordIndex: number
): GameState {
  if (!state.round.isActive || state.turn.isPaused) {
    return state;
  }
  
  if (wordIndex < 0 || wordIndex >= state.players[playerId].words.length) {
    return state;
  }
  
  return {
    ...state,
    wordExchange: {
      isRequested: true,
      requestedBy: playerId,
      selectedWordIndex: wordIndex,
    },
  };
}

export function respondToWordExchange(
  state: GameState,
  accepted: boolean
): GameState {
  if (
    !state.round.isActive ||
    !state.wordExchange ||
    !state.wordExchange.isRequested ||
    state.wordExchange.requestedBy === null ||
    state.wordExchange.selectedWordIndex === null
  ) {
    return state;
  }
  
  if (!accepted) {
    return {
      ...state,
      wordExchange: {
        isRequested: false,
        requestedBy: null,
        selectedWordIndex: null,
      },
    };
  }
  
  const requestingPlayer = state.wordExchange.requestedBy;
  const respondingPlayer = requestingPlayer === 'player1' ? 'player2' : 'player1';
  
  const penalizedScore = Math.max(0, state.players[requestingPlayer].score - 5);
  
  const wordIndex = state.wordExchange.selectedWordIndex;
  const selectedWord = state.players[requestingPlayer].words[wordIndex];
  
  const responderWords = state.players[respondingPlayer].words;
  if (responderWords.length === 0) {
    return {
      ...state,
      wordExchange: {
        isRequested: false,
        requestedBy: null,
        selectedWordIndex: null,
      },
    };
  }
  
  const randomIndex = Math.floor(Math.random() * responderWords.length);
  const exchangedWord = responderWords[randomIndex];
  
  const requestingPlayerWords = [...state.players[requestingPlayer].words];
  requestingPlayerWords.splice(wordIndex, 1);
  requestingPlayerWords.push(exchangedWord);
  
  const respondingPlayerWords = [...state.players[respondingPlayer].words];
  respondingPlayerWords.splice(randomIndex, 1);
  respondingPlayerWords.push(selectedWord);
  
  return {
    ...state,
    players: {
      ...state.players,
      [requestingPlayer]: {
        ...state.players[requestingPlayer],
        words: requestingPlayerWords,
        score: penalizedScore,
      },
      [respondingPlayer]: {
        ...state.players[respondingPlayer],
        words: respondingPlayerWords,
      },
    },
    wordExchange: {
      isRequested: false,
      requestedBy: null,
      selectedWordIndex: null,
    },
  };
}

export class GameEngine {
  private validateGameState(state: GameState): boolean {
    return (
      state.round &&
      state.players &&
      this.validatePlacementSlots(state.round.placementSlots)
    );
  }

  private validatePlacementSlots(slots: PlacementSlot[]): boolean {
    return slots.every(slot => {
      const hasValidWord = slot.word === null || typeof slot.word === 'string';
      const hasValidLock = slot.lockedBy === null || 
                          typeof slot.lockedBy === 'string';
      return hasValidWord && hasValidLock;
    });
  }

  private applyMove(state: GameState, move: GameMove): GameState {
    switch (move.type) {
      case 'place_word':
        return placeWord(
          state, 
          move.playerId as 'player1' | 'player2',
          move.wordIndex!, 
          move.slotIndex!
        );
      
      case 'use_hint':
        return applyHint(state);
      
      case 'purchase_hints':
        return purchaseHints(state, move.playerId as 'player1' | 'player2');
      
      case 'request_exchange':
        return requestWordExchange(
          state,
          move.playerId as 'player1' | 'player2',
          move.wordIndex!
        );
      
      case 'respond_exchange':
        return respondToWordExchange(
          state,
          move.accepted!
        );
      
      case 'timer_update':
        return processTurnTimer(
          state,
          move.elapsedSeconds!
        );
      
      case 'end_round':
        return endRound(state);
      
      default:
        console.error('Unknown move type:', move);
        return state;
    }
  }

  public processMove(state: GameState, move: GameMove): GameState {
    if (!this.validateGameState(state)) {
      throw new Error('Invalid game state detected');
    }

    try {
      const newState = this.applyMove(state, move);
      if (!this.validateGameState(newState)) {
        throw new Error('Move resulted in invalid state');
      }
      return newState;
    } catch (error) {
      console.error('Move processing failed:', error);
      throw error;
    }
  }
}