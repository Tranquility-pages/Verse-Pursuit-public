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

        {/* Game Info and Controls Section */}
        <section className="flex-shrink-0 p-4">
          
          {/* Mobile Layout: Stacked */}
          <div className="block lg:hidden">
            {/* Top Row: Round, Timer, Hints */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 text-center">
                <h3 className="text-xs font-medium text-biblical-600 mb-1">Round</h3>
                <div className="text-xl font-bold text-biblical-700">
                  {gameState.round.currentRound}
                </div>
              </div>

              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 flex justify-center">
                <Timer
                  remainingTime={gameState.turn.remainingTime}
                  isWarning={gameState.turn.isTimerWarning}
                  isPaused={gameState.turn.isPaused}
                  className="scale-90"
                />
              </div>

              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3">
                <HintDisplay
                  hintsRemaining={gameState.round.hints}
                  onUseHint={useHintAction}
                  onPurchaseHints={purchaseHintsAction}
                  canUseHint={isPlayerTurn && gameState.round.hints > 0}
                  canPurchaseHint={isPlayerTurn && gameState.players.player1.score >= 20}
                />
              </div>
            </div>

            {/* Players Score Section */}
            <div className="mb-4">
              <ScoreDisplay
                player1={gameState.players.player1}
                player2={gameState.players.player2}
                activePlayer={gameState.players.activePlayer}
              />
            </div>
          </div>

          {/* Desktop Layout: Side panels with game board in center */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 lg:max-w-7xl lg:mx-auto">
            
            {/* Left Panel: Player 1 Info + Controls */}
            <div className="lg:col-span-3 space-y-4">
              {/* Player 1 Score */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <AvatarDisplay
                    avatarId={gameState.players.player1.avatar || "1"}
                    name={gameState.players.player1.name}
                    size={48}
                    isActive={gameState.players.activePlayer === 'player1'}
                  />
                  <div>
                    <h3 className="font-bold text-lg text-biblical-700">You</h3>
                    <div className="text-sm text-biblical-600">
                      {gameState.players.player1.words.length} words left
                    </div>
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <div>
                    <div className="text-xs text-gray-500">Round Score</div>
                    <div className="text-2xl font-bold text-biblical-700">
                      {gameState.players.player1.score}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Total</div>
                    <div className="text-lg font-semibold text-biblical-600">
                      {gameState.players.player1.totalScore}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timer */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 flex justify-center">
                <Timer
                  remainingTime={gameState.turn.remainingTime}
                  isWarning={gameState.turn.isTimerWarning}
                  isPaused={gameState.turn.isPaused}
                />
              </div>

              {/* Round Info */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 text-center">
                <h3 className="text-sm font-medium text-biblical-600 mb-1">Round</h3>
                <div className="text-2xl font-bold text-biblical-700">
                  {gameState.round.currentRound}
                </div>
              </div>
            </div>

            {/* Center: Game Board - will be placed here */}
            <div className="lg:col-span-6">
              {/* Game board will go here */}
            </div>

            {/* Right Panel: Player 2 Info + Hints */}
            <div className="lg:col-span-3 space-y-4">
              {/* Player 2 Score */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <AvatarDisplay
                    avatarId={gameState.players.player2.avatar || "2"}
                    name={gameState.players.player2.name}
                    size={48}
                    isActive={gameState.players.activePlayer === 'player2'}
                  />
                  <div>
                    <h3 className="font-bold text-lg text-biblical-700">Computer</h3>
                    <div className="text-sm text-biblical-600">
                      {gameState.players.player2.words.length} words left
                    </div>
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <div>
                    <div className="text-xs text-gray-500">Round Score</div>
                    <div className="text-2xl font-bold text-biblical-700">
                      {gameState.players.player2.score}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Total</div>
                    <div className="text-lg font-semibold text-biblical-600">
                      {gameState.players.player2.totalScore}
                    </div>
                  </div>
                </div>
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

              {/* Computer Player Hand Preview */}
              {gameState.players.player2.words.length > 0 && (
                <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="text-sm font-medium text-biblical-600 mb-2">Computer Words</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {gameState.players.player2.words.slice(0, 6).map((word, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-100 text-gray-400 text-xs p-1 rounded text-center"
                      >
                        {'•'.repeat(word.length)}
                      </div>
                    ))}
                  </div>
                  {gameState.players.player2.words.length > 6 && (
                    <div className="text-xs text-gray-500 text-center mt-1">
                      +{gameState.players.player2.words.length - 6} more
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Game Board Section */}
        <section className="flex-1 min-h-0 flex items-center">
          {gameState.round.currentVerse && (
            <div className="w-full px-4">
              
              {/* Mobile Layout: Centered game board */}
              <div className="block lg:hidden">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <GameBoard
                    verse={gameState.round.currentVerse}
                    placementSlots={gameState.round.placementSlots}
                    onSlotClick={handleSlotClick}
                    onSlotDrop={handleSlotDrop}
                    showVerseReference={gameState.round.showVerseReference}
                  />
                </div>
              </div>

              {/* Desktop Layout: Game board in center column */}
              <div className="hidden lg:block lg:max-w-7xl lg:mx-auto">
                <div className="lg:grid lg:grid-cols-12 lg:gap-6">
                  {/* Left spacer */}
                  <div className="lg:col-span-3"></div>
                  
                  {/* Center: Game Board */}
                  <div className="lg:col-span-6">
                    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                      <GameBoard
                        verse={gameState.round.currentVerse}
                        placementSlots={gameState.round.placementSlots}
                        onSlotClick={handleSlotClick}
                        onSlotDrop={handleSlotDrop}
                        showVerseReference={gameState.round.showVerseReference}
                      />
                    </div>
                  </div>
                  
                  {/* Right spacer */}
                  <div className="lg:col-span-3"></div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Player Hand Section - Only shown on mobile */}
        <section className="flex-shrink-0 p-4 lg:hidden">
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

        {/* Desktop Player Hand - Positioned at bottom */}
        <section className="hidden lg:block flex-shrink-0 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4">
              <PlayerHand
                words={gameState.players.player1.words}
                playerName="Your Words"
                isActive={isPlayerTurn}
                onWordSelect={handleWordSelect}
                selectedWordIndex={selectedWordIndex}
              />
            </div>
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