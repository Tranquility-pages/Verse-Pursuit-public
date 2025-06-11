'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useGameState } from '@/hooks/useGameState';
import { GameBoard } from './GameBoard';
import { PlayerHand } from './PlayerHand';
import { Timer } from './Timer';
import { ScoreDisplay } from './ScoreDisplay';
import { HintDisplay } from './HintDisplay';
import { AvatarDisplay } from './AvatarDisplay';
import { VerseCategory, VERSE_CATEGORIES } from '@/data/verseData';

interface GameScreenProps {
  onBackToMenu?: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ onBackToMenu }) => {
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
  const {
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
  } = useGameState();

  // Game setup state
  const [showSetup, setShowSetup] = useState(!gameState);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'hard'>('easy');
  const [selectedCategory, setSelectedCategory] = useState<VerseCategory>('All Verses');

  const handleStartGame = () => {
    startNewGame(selectedDifficulty, selectedCategory);
    setShowSetup(false);
  };

  const handleWordSelect = (wordIndex: number) => {
    if (!isPlayerTurn) return;
    setSelectedWordIndex(wordIndex);
  };

  const handleSlotClick = (slotIndex: number) => {
    if (!isPlayerTurn || selectedWordIndex === null) return;
    
    makePlayerMove(selectedWordIndex, slotIndex);
    setSelectedWordIndex(null);
  };

  const handleSlotDrop = (slotIndex: number, word: string, wordIndex: number) => {
    if (!isPlayerTurn) return;
    
    makePlayerMove(wordIndex, slotIndex);
    setSelectedWordIndex(null);
  };

  const handleNextRound = () => {
    startNewRound();
  };

  const handleNewGame = () => {
    setShowSetup(true);
  };

  const handleExitGame = () => {
    if (onBackToMenu) {
      onBackToMenu();
    } else {
      // Navigate to homepage
      window.location.href = '/';
    }
  };

  // Loading state
  if (isLoading) {
    return React.createElement('div', {
      className: 'flex items-center justify-center min-h-screen bg-parchment-100'
    }, React.createElement(motion.div, {
      animate: { rotate: 360 },
      transition: { duration: 2, repeat: Infinity, ease: 'linear' },
      className: 'w-8 h-8 border-4 border-biblical-400 border-t-transparent rounded-full'
    }));
  }

  // Error state
  if (error) {
    return React.createElement('div', {
      className: 'flex items-center justify-center min-h-screen bg-parchment-100'
    }, React.createElement('div', {
      className: 'text-center bg-white p-8 rounded-lg shadow-lg'
    }, 
      React.createElement('p', { className: 'text-red-600 mb-4' }, error),
      React.createElement('div', { className: 'flex gap-4 justify-center' },
        React.createElement('button', {
          onClick: () => window.location.reload(),
          className: 'px-4 py-2 bg-biblical-500 text-white rounded-lg hover:bg-biblical-600'
        }, 'Retry'),
        React.createElement(Link, {
          href: '/',
          className: 'px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'
        }, 'Back to Home')
      )
    ));
  }

  // Game setup screen
  if (showSetup) {
    return React.createElement('div', {
      className: 'min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-4',
      style: {
        backgroundImage: "url('/assets/backgrounds/game_background_mobile.png')"
      }
    },
      React.createElement('div', { className: 'absolute inset-0 bg-black bg-opacity-40' }),
      React.createElement(motion.div, {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        className: 'relative z-10 bg-gradient-to-b from-yellow-50 to-amber-50 rounded-2xl shadow-2xl p-8 w-full max-w-lg border-4 border-yellow-400'
      },
        React.createElement('div', { className: 'text-center mb-8' },
          React.createElement('h1', { className: 'text-2xl font-biblical text-yellow-800 mb-2' }, 'Verse Pursuit'),
          React.createElement('p', { className: 'text-sm text-yellow-700 italic' }, '"Pursue. Learn. Grow."')
        ),
        React.createElement('div', { className: 'mb-6' },
          React.createElement('h3', { className: 'text-lg font-bold text-yellow-800 mb-4 text-center' }, 'Choose Difficulty'),
          React.createElement('div', { className: 'grid grid-cols-2 gap-3' },
            React.createElement('button', {
              onClick: () => setSelectedDifficulty('easy'),
              className: selectedDifficulty === 'easy' 
                ? 'p-4 rounded-xl border-2 border-yellow-500 bg-yellow-100 shadow-lg text-center'
                : 'p-4 rounded-xl border-2 border-yellow-300 bg-white text-center hover:border-yellow-400'
            },
              React.createElement('div', { className: 'text-lg font-bold text-yellow-800 mb-1' }, 'Easy'),
              React.createElement('div', { className: 'text-xs text-yellow-600' }, '3 pre-filled words')
            ),
            React.createElement('button', {
              onClick: () => setSelectedDifficulty('hard'),
              className: selectedDifficulty === 'hard' 
                ? 'p-4 rounded-xl border-2 border-yellow-500 bg-yellow-100 shadow-lg text-center'
                : 'p-4 rounded-xl border-2 border-yellow-300 bg-white text-center hover:border-yellow-400'
            },
              React.createElement('div', { className: 'text-lg font-bold text-yellow-800 mb-1' }, 'Hard'),
              React.createElement('div', { className: 'text-xs text-yellow-600' }, 'No pre-filled words')
            )
          )
        ),
        React.createElement('div', { className: 'space-y-3' },
          React.createElement('button', {
            onClick: handleStartGame,
            className: 'w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-lg font-bold rounded-xl shadow-lg hover:from-yellow-400 hover:to-amber-400 transition-all border-2 border-yellow-600'
          }, '🎮 Start Game'),
          React.createElement(Link, {
            href: '/',
            className: 'block w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all text-center border-2 border-gray-300'
          }, '← Back to Home')
        )
      )
    );
  }

  if (!gameState) {
    return null;
  }

  // Main Game Screen - using React.createElement to avoid JSX parsing issues
  return React.createElement('div', {
    className: 'h-screen overflow-hidden bg-cover bg-center bg-no-repeat relative',
    style: {
      backgroundImage: "url('/assets/backgrounds/game_background_mobile.png')"
    }
  },
    React.createElement('div', { className: 'absolute inset-0 bg-black bg-opacity-20' }),
    React.createElement('div', { className: 'relative z-10 h-full flex flex-col' },
      
      // Header
      React.createElement('header', { className: 'flex-shrink-0 bg-black bg-opacity-30 backdrop-blur-sm p-4' },
        React.createElement('div', { className: 'flex justify-between items-center' },
          React.createElement('div', { className: 'flex items-center' },
            React.createElement('h1', { className: 'text-xl font-biblical text-white' }, 'Verse Pursuit')
          ),
          React.createElement('div', { className: 'flex items-center gap-3' },
            React.createElement('button', {
              onClick: handleNewGame,
              className: 'px-4 py-2 bg-biblical-600 text-white rounded-lg hover:bg-biblical-700 transition-colors text-sm'
            }, 'New Game'),
            React.createElement('button', {
              onClick: handleExitGame,
              className: 'px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm'
            }, 'Exit')
          )
        )
      ),

      // Desktop Player Profiles - Only show on larger screens
      React.createElement('section', { className: 'hidden lg:flex lg:justify-between lg:items-start lg:p-4 lg:gap-4' },
        // Player 1 Profile with integrated timer
        React.createElement('div', { className: 'bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 w-64' },
          React.createElement('div', { className: 'flex items-center space-x-3 mb-3' },
            React.createElement(AvatarDisplay, {
              avatarId: gameState.players.player1.avatar || "1",
              name: gameState.players.player1.name,
              size: 48,
              isActive: gameState.players.activePlayer === 'player1'
            }),
            React.createElement('div', { className: 'flex-1' },
              React.createElement('h3', { className: 'font-bold text-lg text-biblical-700' }, 'You'),
              React.createElement('div', { className: 'text-sm text-biblical-600' }, gameState.players.player1.words.length + ' words left')
            ),
            // Timer integrated here
            React.createElement('div', { className: 'flex-shrink-0' },
              React.createElement(Timer, {
                remainingTime: gameState.turn.remainingTime,
                isWarning: gameState.turn.isTimerWarning,
                isPaused: gameState.turn.isPaused,
                className: 'scale-75'
              })
            )
          ),
          React.createElement('div', { className: 'text-center space-y-2' },
            React.createElement('div', {},
              React.createElement('div', { className: 'text-xs text-gray-500' }, 'Round Score'),
              React.createElement('div', { className: 'text-2xl font-bold text-biblical-700' }, gameState.players.player1.score)
            ),
            React.createElement('div', {},
              React.createElement('div', { className: 'text-xs text-gray-500' }, 'Total'),
              React.createElement('div', { className: 'text-lg font-semibold text-biblical-600' }, gameState.players.player1.totalScore)
            )
          )
        ),
        
        // Player 2 Profile
        React.createElement('div', { className: 'bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 w-64' },
          React.createElement('div', { className: 'flex items-center space-x-3 mb-3' },
            React.createElement(AvatarDisplay, {
              avatarId: gameState.players.player2.avatar || "2",
              name: gameState.players.player2.name,
              size: 48,
              isActive: gameState.players.activePlayer === 'player2'
            }),
            React.createElement('div', {},
              React.createElement('h3', { className: 'font-bold text-lg text-biblical-700' }, 'Computer'),
              React.createElement('div', { className: 'text-sm text-biblical-600' }, gameState.players.player2.words.length + ' words left')
            )
          ),
          React.createElement('div', { className: 'text-center space-y-2' },
            React.createElement('div', {},
              React.createElement('div', { className: 'text-xs text-gray-500' }, 'Round Score'),
              React.createElement('div', { className: 'text-2xl font-bold text-biblical-700' }, gameState.players.player2.score)
            ),
            React.createElement('div', {},
              React.createElement('div', { className: 'text-xs text-gray-500' }, 'Total'),
              React.createElement('div', { className: 'text-lg font-semibold text-biblical-600' }, gameState.players.player2.totalScore)
            )
          )
        )
      ),

      // Game Board Section
      React.createElement('section', { className: 'flex-1 min-h-0 flex items-center' },
        gameState.round.currentVerse && React.createElement('div', { className: 'w-full px-4' },
          React.createElement('div', { className: 'bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-4 shadow-lg' },
            React.createElement(GameBoard, {
              verse: gameState.round.currentVerse,
              placementSlots: gameState.round.placementSlots,
              onSlotClick: handleSlotClick,
              onSlotDrop: handleSlotDrop,
              showVerseReference: gameState.round.showVerseReference
            })
          )
        )
      ),

      // Player Hand Section with integrated hints
      React.createElement('section', { className: 'flex-shrink-0 p-4' },
        React.createElement('div', { className: 'bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4' },
          // Hints integrated into player hand header
          React.createElement('div', { className: 'flex justify-between items-center mb-4' },
            React.createElement('h3', { className: 'text-lg font-semibold text-biblical-700' }, 
              isPlayerTurn ? 'Your Turn' : 'Computer\'s Turn'
            ),
            React.createElement('div', { className: 'flex items-center gap-2' },
              React.createElement(HintDisplay, {
                hintsRemaining: gameState.round.hints,
                onUseHint: useHintAction,
                onPurchaseHints: purchaseHintsAction,
                canUseHint: isPlayerTurn && gameState.round.hints > 0,
                canPurchaseHint: isPlayerTurn && gameState.players.player1.score >= 20
              })
            )
          ),
          React.createElement(PlayerHand, {
            words: gameState.players.player1.words,
            playerName: gameState.players.player1.name,
            isActive: isPlayerTurn,
            onWordSelect: handleWordSelect,
            selectedWordIndex: selectedWordIndex
          })
        )
      )
    ),

    // Round Complete Modal
    React.createElement(AnimatePresence, {},
      isRoundComplete && React.createElement(motion.div, {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
      },
        React.createElement(motion.div, {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.8, opacity: 0 },
          className: 'bg-white rounded-xl p-8 max-w-md w-full mx-4'
        },
          React.createElement('div', { className: 'text-center' },
            React.createElement('h2', { className: 'text-2xl font-biblical text-biblical-700 mb-4' },
              isGameComplete ? 'Game Complete!' : 'Round Complete!'
            ),
            React.createElement('div', { className: 'space-y-3' },
              !isGameComplete && React.createElement('button', {
                onClick: handleNextRound,
                className: 'w-full py-3 bg-biblical-500 text-white rounded-lg hover:bg-biblical-600 transition-colors'
              }, 'Next Round'),
              React.createElement('button', {
                onClick: handleNewGame,
                className: 'w-full py-3 border border-biblical-400 text-biblical-600 rounded-lg hover:bg-biblical-50 transition-colors'
              }, 'New Game'),
              React.createElement(Link, {
                href: '/',
                className: 'block w-full py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-center'
              }, 'Exit to Home')
            )
          )
        )
      )
    )
  );
};