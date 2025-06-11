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
    return (
      <div className="flex items-center justify-center min-h-screen bg-parchment-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-4 border-biblical-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-parchment-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-biblical-500 text-white rounded-lg hover:bg-biblical-600"
            >
              Retry
            </button>
            <Link 
              href="/"
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Game setup screen
  if (showSetup) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-4"
        style={{
          backgroundImage: `url('/assets/backgrounds/game_background_mobile.png')`,
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Header with exit button */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
          <Link 
            href="/"
            className="flex items-center text-white hover:text-yellow-300 transition-colors"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Exit Game
          </Link>
          
          <div className="flex items-center">
            <img 
              src="/assets/images/bible_icon.png" 
              alt="Verse Pursuit" 
              className="w-8 h-8 mr-3"
            />
            <h1 className="text-xl font-biblical text-white">Verse Pursuit</h1>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full max-w-md border border-white border-opacity-20"
        >
          <h2 className="text-3xl font-biblical text-center text-biblical-700 mb-8">
            Start New Game
          </h2>

          {/* Difficulty Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-biblical-600 mb-3">Difficulty</h3>
            <div className="space-y-2">
              {(['easy', 'hard'] as const).map((difficulty) => (
                <label
                  key={difficulty}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={difficulty}
                    checked={selectedDifficulty === difficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value as 'easy' | 'hard')}
                    className="w-4 h-4 text-biblical-500"
                  />
                  <span className="text-biblical-700 capitalize">
                    {difficulty} {difficulty === 'easy' ? '(3 pre-filled words)' : '(no pre-filled words)'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-biblical-600 mb-3">Category</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as VerseCategory)}
              className="w-full p-3 border border-parchment-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-biblical-400"
            >
              {VERSE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartGame}
              className="w-full py-3 bg-biblical-500 text-white rounded-lg font-medium hover:bg-biblical-600 transition-colors"
            >
              Start Game
            </motion.button>
            
            <Link
              href="/"
              className="block w-full py-3 border border-biblical-400 text-biblical-600 rounded-lg font-medium hover:bg-biblical-50 transition-colors text-center"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!gameState) {
    return null;
  }

  // Main Game Screen - Fixed Height Mobile Layout
  return (
    <div 
      className="h-screen overflow-hidden bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('/assets/backgrounds/game_background_mobile.png')`,
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Fixed layout container */}
      <div className="relative z-10 h-full flex flex-col">
        
        {/* Header with Game Info and Exit Button */}
        <header className="flex-shrink-0 bg-black bg-opacity-30 backdrop-blur-sm p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="/assets/images/bible_icon.png" 
                alt="Verse Pursuit" 
                className="w-8 h-8 mr-3"
              />
              <h1 className="text-xl font-biblical text-white">Verse Pursuit</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleNewGame}
                className="px-4 py-2 bg-biblical-600 text-white rounded-lg hover:bg-biblical-700 transition-colors text-sm"
              >
                New Game
              </button>
              <button
                onClick={handleExitGame}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Exit
              </button>
            </div>
          </div>
        </header>

        {/* Top Section: Both Players' Info */}
        <section className="flex-shrink-0 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            
            {/* Round Info */}
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 text-center">
              <h3 className="text-sm font-medium text-biblical-600 mb-1">Round</h3>
              <div className="text-2xl font-bold text-biblical-700">
                {gameState.round.currentRound}
              </div>
            </div>

            {/* Timer */}
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4">
              <Timer
                remainingTime={gameState.turn.remainingTime}
                isWarning={gameState.turn.isTimerWarning}
                isPaused={gameState.turn.isPaused}
              />
            </div>

            {/* Hints */}
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4">
              <HintDisplay
                hintsRemaining={gameState.round.hints}
                onUseHint={useHintAction}
                onPurchaseHints={purchaseHintsAction}
                canUseHint={isPlayerTurn && gameState.round.hints > 0}
                canPurchaseHint={isPlayerTurn && gameState.players.player1.score >= 20}
              />
            </div>
          </div>
        </section>

        {/* Players Score Section */}
        <section className="flex-shrink-0 px-4 pb-4">
          <div className="max-w-4xl mx-auto">
            <ScoreDisplay
              player1={gameState.players.player1}
              player2={gameState.players.player2}
              activePlayer={gameState.players.activePlayer}
            />
          </div>
        </section>

        {/* Game Board Section - Takes remaining space */}
        <section className="flex-1 px-4 min-h-0 flex items-center">
          {gameState.round.currentVerse && (
            <div className="w-full">
              <GameBoard
                verse={gameState.round.currentVerse}
                placementSlots={gameState.round.placementSlots}
                onSlotClick={handleSlotClick}
                onSlotDrop={handleSlotDrop}
                showVerseReference={gameState.round.showVerseReference}
              />
            </div>
          )}
        </section>

        {/* Player Hand Section */}
        <section className="flex-shrink-0 p-4">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4">
            <PlayerHand
              words={gameState.players.player1.words}
              playerName={gameState.players.player1.name}
              isActive={isPlayerTurn}
              onWordSelect={handleWordSelect}
              selectedWordIndex={selectedWordIndex}
            />
          </div>
        </section>

      </div>

      {/* Round Complete Modal */}
      <AnimatePresence>
        {isRoundComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
            >
              <div className="text-center">
                <h2 className="text-2xl font-biblical text-biblical-700 mb-4">
                  {isGameComplete ? 'Game Complete!' : 'Round Complete!'}
                </h2>
                
                {isGameComplete && winner && (
                  <div className="mb-4">
                    <p className="text-lg text-biblical-600">
                      {winner === 'player1' ? 'You win!' : 'Computer wins!'}
                    </p>
                  </div>
                )}

                <div className="mb-6">
                  <div className="text-sm text-biblical-500 mb-2">Final Scores</div>
                  <div className="space-y-1">
                    <div>
                      You: {gameState.players.player1.totalScore + gameState.players.player1.score}
                    </div>
                    <div>
                      Computer: {gameState.players.player2.totalScore + gameState.players.player2.score}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {!isGameComplete && (
                    <button
                      onClick={handleNextRound}
                      className="w-full py-3 bg-biblical-500 text-white rounded-lg hover:bg-biblical-600 transition-colors"
                    >
                      Next Round
                    </button>
                  )}
                  
                  <button
                    onClick={handleNewGame}
                    className="w-full py-3 border border-biblical-400 text-biblical-600 rounded-lg hover:bg-biblical-50 transition-colors"
                  >
                    New Game
                  </button>
                  
                  <Link
                    href="/"
                    className="block w-full py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-center"
                  >
                    Exit to Home
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};