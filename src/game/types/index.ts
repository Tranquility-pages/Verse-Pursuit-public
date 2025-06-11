// Core game types adapted from mobile app

export interface GameState {
  config: {
    gameMode: 'single' | 'multi';
    difficulty: 'easy' | 'hard';
    category: string;
  };
  round: {
    isActive: boolean;
    currentRound: number;
    currentVerse: Verse | null;
    placementSlots: PlacementSlot[];
    hints: number;
    showVerseReference: boolean;
  };
  game: {
    roundsCompleted: number;
  };
  players: {
    player1: PlayerState;
    player2: PlayerState;
    activePlayer: 'player1' | 'player2';
  };
  turn: {
    remainingTime: number;
    isTimerWarning: boolean;
    turnStartTime: number;
    isPaused: boolean;
  };
  wordExchange?: {
    isRequested: boolean;
    requestedBy: 'player1' | 'player2' | null;
    selectedWordIndex: number | null;
  };
}

export interface Verse {
  id: string;
  reference: string;
  text: string;
  category?: string;
}

export interface PlacementSlot {
  word: string | null;
  lockedBy: 'player1' | 'player2' | 'system' | null;
  highlightHint: boolean;
  index?: number;
}

export interface PlayerState {
  name: string;
  score: number;
  totalScore: number;
  words: string[];
  consecutiveTimeouts: number;
  mistakes: number;
  avatar: string;
}

// Game move types for AI and player actions
export interface GameMove {
  type: 'place_word' | 'use_hint' | 'purchase_hints' | 'request_exchange' | 'respond_exchange' | 'timer_update' | 'end_round';
  playerId?: 'player1' | 'player2';
  wordIndex?: number;
  slotIndex?: number;
  accepted?: boolean;
  elapsedSeconds?: number;
}

export interface PlaceWordMove extends GameMove {
  type: 'place_word';
  playerId: 'player1' | 'player2';
  wordIndex: number;
  slotIndex: number;
}

export interface UseHintMove extends GameMove {
  type: 'use_hint';
}

export interface PurchaseHintsMove extends GameMove {
  type: 'purchase_hints';
  playerId: 'player1' | 'player2';
}

export interface RequestExchangeMove extends GameMove {
  type: 'request_exchange';
  playerId: 'player1' | 'player2';
  wordIndex: number;
}

export interface RespondExchangeMove extends GameMove {
  type: 'respond_exchange';
  accepted: boolean;
}

export interface TimerUpdateMove extends GameMove {
  type: 'timer_update';
  elapsedSeconds: number;
}

export interface EndRoundMove extends GameMove {
  type: 'end_round';
}

// AI move interface
export interface AIMove {
  word: string;
  position: number;
  score: number;
  validations: any[];
}

// Game error handling
export interface GameError {
  code: string;
  message: string;
  details?: unknown;
}