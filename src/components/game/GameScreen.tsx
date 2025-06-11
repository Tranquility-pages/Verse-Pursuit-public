'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-biblical-500 text-white rounded-lg hover:bg-biblical-600"
          >
            Retry
          </button>
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
          backgroundImage: `url('/assets/backgrounds/Main_menu_screen.png')`,
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full max-w-md border border-white border-opacity-20"
        >
          <h1 className="text-3xl font-biblical text-center text-biblical-700 mb-8">
            Start New Game
          </h1>

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
            
            {onBackToMenu && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBackToMenu}
                className="w-full py-3 border border-biblical-400 text-biblical-600 rounded-lg font-medium hover:bg-biblical-50 transition-colors"
              >
                Back to Menu
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  if (!gameState) {
    return null;
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('/assets/backgrounds/game_background_desktop.png')`,
      }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-4 md:p-6 bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <img 
              src="/assets/images/bible_icon.png" 
              alt="Verse Pursuit" 
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <h1 className="text-2xl md:text-3xl font-biblical text-white drop-shadow-lg">
              Verse Pursuit
            </h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            {onBackToMenu && (
              <button
                onClick={onBackToMenu}
                className="px-3 py-2 md:px-4 md:py-2 text-white hover:text-yellow-300 transition-colors bg-black bg-opacity-40 rounded-lg backdrop-blur-sm"
              >
                ← Menu
              </button>
            )}
            <button
              onClick={handleNewGame}
              className="px-3 py-2 md:px-4 md:py-2 bg-biblical-600 text-white rounded-lg hover:bg-biblical-700 transition-colors shadow-lg"
            >
              New Game
            </button>
          </div>
        </header>

        {/* Main Game Area */}
        <main className="flex-1 px-4 md:px-6 pb-6">
          {/* Desktop Layout: Side by Side */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 h-full max-w-7xl mx-auto">
            
            {/* Left Sidebar: Game Info & Controls */}
            <div className="lg:col-span-3 space-y-4">
              {/* Round Info Card */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-sm text-biblical-600 font-medium">Round</div>
                  <div className="text-3xl font-bold text-biblical-700">
                    {gameState.round.currentRound}
                  </div>
                </div>
              </div>

              {/* Timer Card */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <Timer
                  remainingTime={gameState.turn.remainingTime}
                  isWarning={gameState.turn.isTimerWarning}
                  isPaused={gameState.turn.isPaused}
                />
              </div>

              {/* Hints Card */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <HintDisplay
                  hintsRemaining={gameState.round.hints}
                  onUseHint={useHintAction}
                  onPurchaseHints={purchaseHintsAction}
                  canUseHint={isPlayerTurn && gameState.round.hints > 0}
                  canPurchaseHint={isPlayerTurn && gameState.players.player1.score >= 20}
                />
              </div>

              {/* Score Card */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <ScoreDisplay
                  player1={gameState.players.player1}
                  player2={gameState.players.player2}
                  activePlayer={gameState.players.activePlayer}
                />
              </div>
            </div>

            {/* Center: Game Board */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {gameState.round.currentVerse && (
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                  <GameBoard
                    verse={gameState.round.currentVerse}
                    placementSlots={gameState.round.placementSlots}
                    onSlotClick={handleSlotClick}
                    onSlotDrop={handleSlotDrop}
                    showVerseReference={gameState.round.showVerseReference}
                  />
                </div>
              )}
            </div>

            {/* Right Sidebar: Player Hand */}
            <div className="lg:col-span-3">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-4 shadow-lg h-full">
                <PlayerHand
                  words={gameState.players.player1.words}
                  playerName={gameState.players.player1.name}
                  isActive={isPlayerTurn}
                  onWordSelect={handleWordSelect}
                  selectedWordIndex={selectedWordIndex}
                />
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout: Stacked */}
          <div className="lg:hidden space-y-4 max-w-4xl mx-auto">
            {/* Top Status Bar */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 text-center shadow-lg">
                <div className="text-xs text-biblical-600">Round</div>
                <div className="text-xl font-bold text-biblical-700">
                  {gameState.round.currentRound}
                </div>
              </div>
              
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <Timer
                  remainingTime={gameState.turn.remainingTime}
                  isWarning={gameState.turn.isTimerWarning}
                  isPaused={gameState.turn.isPaused}
                />
              </div>
              
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <HintDisplay
                  hintsRemaining={gameState.round.hints}
                  onUseHint={useHintAction}
                  onPurchaseHints={purchaseHintsAction}
                  canUseHint={isPlayerTurn && gameState.round.hints > 0}
                  canPurchaseHint={isPlayerTurn && gameState.players.player1.score >= 20}
                />
              </div>
            </div>

            {/* Score Display */}
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <ScoreDisplay
                player1={gameState.players.player1}
                player2={gameState.players.player2}
                activePlayer={gameState.players.activePlayer}
              />
            </div>

            {/* Game Board */}
            {gameState.round.currentVerse && (
              <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <GameBoard
                  verse={gameState.round.currentVerse}
                  placementSlots={gameState.round.placementSlots}
                  onSlotClick={handleSlotClick}
                  onSlotDrop={handleSlotDrop}
                  showVerseReference={gameState.round.showVerseReference}
                />
              </div>
            )}

            {/* Player Hand */}
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <PlayerHand
                words={gameState.players.player1.words}
                playerName={gameState.players.player1.name}
                isActive={isPlayerTurn}
                onWordSelect={handleWordSelect}
                selectedWordIndex={selectedWordIndex}
              />
            </div>
          </div>
        </main>

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
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};