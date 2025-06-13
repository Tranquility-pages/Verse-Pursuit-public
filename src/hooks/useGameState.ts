'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, Verse } from '@/game/types';
import { 
  initializeGame, 
  setupVerse, 
  placeWord, 
  applyHint, 
  purchaseHints, 
  processTurnTimer, 
  endRound 
} from '@/game/engine/GameEngine';
import { 
  determineComputerMove, 
  getComputerMoveDelay, 
  shouldUseHint, 
  shouldPurchaseHints, 
  AIDifficulty 
} from '@/game/ai/ComputerPlayer';
import { getRandomVerse, VerseCategory } from '@/data/verseData';

export interface UseGameStateReturn {
  gameState: GameState | null;
  isLoading: boolean;
  error: string | null;
  
  // Game actions
  startNewGame: (difficulty: 'easy' | 'hard', category: VerseCategory) => void;
  startNewRound: () => void;
  makePlayerMove: (wordIndex: number, slotIndex: number) => void;
  useHintAction: () => void;
  purchaseHintsAction: () => void;
  endRoundAction: () => void;
  
  // Game status
  isPlayerTurn: boolean;
  isRoundComplete: boolean;
  isGameComplete: boolean;
  winner: 'player1' | 'player2' | null;
}

export function useGameState(): UseGameStateReturn {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const aiTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (aiTimeoutRef.current) clearTimeout(aiTimeoutRef.current);
    };
  }, []);

  // AI turn handler - stabilized with useCallback
  const handleAITurn = useCallback((state: GameState) => {
    if (state.players.activePlayer !== 'player2' || !state.round.isActive || state.turn.isPaused) {
      return;
    }

    // Clear any existing AI timeout
    if (aiTimeoutRef.current) {
      clearTimeout(aiTimeoutRef.current);
    }

    // Check if AI should use hint first
    if (shouldUseHint(state)) {
      aiTimeoutRef.current = setTimeout(() => {
        setGameState(prevState => {
          if (!prevState || prevState.players.activePlayer !== 'player2') return prevState;
          return applyHint(prevState);
        });
      }, 500);
      return;
    }

    // Check if AI should purchase hints
    if (shouldPurchaseHints(state)) {
      aiTimeoutRef.current = setTimeout(() => {
        setGameState(prevState => {
          if (!prevState || prevState.players.activePlayer !== 'player2') return prevState;
          return purchaseHints(prevState, 'player2');
        });
      }, 800);
      return;
    }

    // Determine AI move
    const aiMove = determineComputerMove(state);
    
    if (aiMove) {
      const difficulty = (state.config.difficulty as AIDifficulty) || AIDifficulty.EASY;
      const delay = getComputerMoveDelay(state, difficulty);
      
      aiTimeoutRef.current = setTimeout(() => {
        setGameState(prevState => {
          if (!prevState || prevState.players.activePlayer !== 'player2') return prevState;
          return placeWord(prevState, 'player2', aiMove.wordIndex, aiMove.slotIndex);
        });
      }, delay);
    }
  }, [setGameState]);

  // Optimized timer logic - minimal re-renders
  useEffect(() => {
    if (!gameState?.round.isActive || gameState.turn.isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const startTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      timerRef.current = setInterval(() => {
        setGameState(prevState => {
          if (!prevState?.round.isActive || prevState.turn.isPaused) {
            return prevState;
          }
          
          // Only update if time actually changed
          if (prevState.turn.remainingTime <= 0) {
            return prevState;
          }
          
          const newTime = Math.max(0, prevState.turn.remainingTime - 1);
          
          // Create minimal state update - only timer fields
          const newState = {
            ...prevState,
            turn: {
              ...prevState.turn,
              remainingTime: newTime,
              isTimerWarning: newTime <= 10
            }
          };
          
          // Handle time running out
          if (newTime === 0) {
            // Switch players or end turn
            const nextPlayer: 'player1' | 'player2' = newState.players.activePlayer === 'player1' ? 'player2' : 'player1';
            const switchedState = {
              ...newState,
              players: {
                ...newState.players,
                activePlayer: nextPlayer
              },
              turn: {
                ...newState.turn,
                remainingTime: 30, // Reset timer for next player
                isTimerWarning: false
              }
            };
            
            // Trigger AI if it's AI's turn
            if (nextPlayer === 'player2') {
              setTimeout(() => handleAITurn(switchedState), 100);
            }
            
            return switchedState;
          }
          
          return newState;
        });
      }, 1000);
    };

    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState?.round.isActive, gameState?.turn.isPaused, handleAITurn]);

  // Trigger AI turn when it becomes AI's turn
  useEffect(() => {
    if (gameState?.players.activePlayer === 'player2' && gameState.round.isActive && !gameState.turn.isPaused) {
      handleAITurn(gameState);
    }
  }, [gameState, handleAITurn]);

  const startNewGame = useCallback((difficulty: 'easy' | 'hard', category: VerseCategory) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const newGameState = initializeGame('single', difficulty, category, 'You', 'Computer');
      
      // Automatically start the first round
      const verse = getRandomVerse(category);
      const gameWithVerse = setupVerse(newGameState, verse);
      setGameState(gameWithVerse);
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to start new game');
      setIsLoading(false);
    }
  }, []);

  const startNewRound = useCallback(() => {
    if (!gameState) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const verse = getRandomVerse(gameState.config.category as VerseCategory);
      const newState = setupVerse(gameState, verse);
      setGameState(newState);
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to start new round');
      setIsLoading(false);
    }
  }, [gameState]);

  const makePlayerMove = useCallback((wordIndex: number, slotIndex: number) => {
    if (!gameState || gameState.players.activePlayer !== 'player1') return;
    
    try {
      const newState = placeWord(gameState, 'player1', wordIndex, slotIndex);
      setGameState(newState);
    } catch (err) {
      setError('Failed to make move');
    }
  }, [gameState]);

  const useHintAction = useCallback(() => {
    if (!gameState || gameState.players.activePlayer !== 'player1') return;
    
    try {
      const newState = applyHint(gameState);
      setGameState(newState);
    } catch (err) {
      setError('Failed to use hint');
    }
  }, [gameState]);

  const purchaseHintsAction = useCallback(() => {
    if (!gameState || gameState.players.activePlayer !== 'player1') return;
    
    try {
      const newState = purchaseHints(gameState, 'player1');
      setGameState(newState);
    } catch (err) {
      setError('Failed to purchase hints');
    }
  }, [gameState]);

  const endRoundAction = useCallback(() => {
    if (!gameState) return;
    
    try {
      const newState = endRound(gameState);
      setGameState(newState);
    } catch (err) {
      setError('Failed to end round');
    }
  }, [gameState]);

  // Computed values
  const isPlayerTurn = gameState?.players.activePlayer === 'player1';
  const isRoundComplete = gameState ? (!gameState.round.isActive && gameState.round.currentRound > 0) : false;
  const isGameComplete = gameState 
    ? (gameState.players.player1.totalScore + gameState.players.player1.score >= 100 ||
       gameState.players.player2.totalScore + gameState.players.player2.score >= 100)
    : false;
  
  const winner = isGameComplete && gameState
    ? (gameState.players.player1.totalScore + gameState.players.player1.score >= 100 ? 'player1' : 'player2')
    : null;

  return {
    gameState,
    isLoading,
    error,
    startNewGame,
    startNewRound,
    makePlayerMove,
    useHintAction,
    purchaseHintsAction,
    endRoundAction,
    isPlayerTurn,
    isRoundComplete,
    isGameComplete,
    winner,
  };
}