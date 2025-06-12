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
import { PlacementSlot, Verse } from '@/game/types';

interface GameScreenProps {
  onBackToMenu?: () => void;
}

// Mobile-specific GameBoard component that matches original app exactly
const MobileGameBoard: React.FC<{
  verse: Verse;
  placementSlots: PlacementSlot[];
  onSlotClick?: (slotIndex: number) => void;
  onSlotDrop?: (slotIndex: number, word: string, wordIndex: number) => void;
}> = ({ verse, placementSlots, onSlotClick, onSlotDrop }) => {
  const words = verse.text.split(/\s+/);
  
  const handleSlotClick = (index: number) => {
    if (onSlotClick) onSlotClick(index);
  };

  const handleDrop = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    const word = e.dataTransfer.getData('text/plain');
    const wordIndex = parseInt(e.dataTransfer.getData('wordIndex'));
    
    if (onSlotDrop && word && !isNaN(wordIndex)) {
      onSlotDrop(slotIndex, word, wordIndex);
    }
  };

  // Create verse lines like in original app - need to group words into lines
  const createVerseLines = () => {
    const lines: JSX.Element[][] = [];
    let currentLine: JSX.Element[] = [];
    let wordsPerLine = 4; // Approximate words per line based on original
    
    placementSlots.forEach((slot, index) => {
      const isEmpty = slot.word === null;
      
      const element = isEmpty ? (
        // Empty slot - ONE long continuous dash per missing word like original
        <span
          key={index}
          className={`inline-block cursor-pointer mx-1 ${slot.highlightHint ? 'relative' : ''}`}
          onClick={() => handleSlotClick(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, index)}
          style={{
            borderBottom: slot.highlightHint ? '4px solid #22C55E' : '3px dashed #FFA500',
            minWidth: '80px', // One long dash per word
            height: '24px',
            display: 'inline-block',
            backgroundColor: slot.highlightHint ? 'rgba(34, 197, 94, 0.15)' : 'transparent',
            borderRadius: slot.highlightHint ? '4px' : '0'
          }}
        >
          {slot.highlightHint && (
            <div 
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
              style={{ zIndex: 10 }}
            />
          )}
        </span>
      ) : (
        // Filled word - EXACT match to original brown color
        <span
          key={index}
          className="inline-block px-2 py-1 text-gray-800 font-semibold text-lg"
        >
          {slot.word}
        </span>
      );
      
      currentLine.push(element);
      
      // Break into lines based on punctuation or word count
      if (slot.word && (slot.word.includes('.') || slot.word.includes(',') || slot.word.includes(';') || currentLine.length >= wordsPerLine)) {
        lines.push([...currentLine]);
        currentLine = [];
        wordsPerLine = Math.max(3, 6 - lines.length); // Adjust words per line for shorter lines at end
      }
    });
    
    // Add remaining words to final line
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
    
    return lines;
  };

  const verseLines = createVerseLines();

  return (
    <div className="w-full max-w-sm mx-auto px-4">
      <div className="space-y-3">
        {verseLines.map((line, lineIndex) => (
          <div 
            key={lineIndex} 
            className="flex flex-wrap items-center justify-center gap-1 text-lg leading-relaxed min-h-[40px]"
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

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
          backgroundImage: "url('/assets/backgrounds/game_background_mobile.png')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 bg-gradient-to-b from-yellow-50 to-amber-50 rounded-2xl shadow-2xl p-8 w-full max-w-lg border-4 border-yellow-400"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-biblical text-yellow-800 mb-2">Verse Pursuit</h1>
            <p className="text-sm text-yellow-700 italic">"Pursue. Learn. Grow."</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-yellow-800 mb-4 text-center">Choose Difficulty</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedDifficulty('easy')}
                className={selectedDifficulty === 'easy' 
                  ? 'p-4 rounded-xl border-2 border-yellow-500 bg-yellow-100 shadow-lg text-center'
                  : 'p-4 rounded-xl border-2 border-yellow-300 bg-white text-center hover:border-yellow-400'
                }
              >
                <div className="text-lg font-bold text-yellow-800 mb-1">Easy</div>
                <div className="text-xs text-yellow-600">3 pre-filled words</div>
              </button>
              <button
                onClick={() => setSelectedDifficulty('hard')}
                className={selectedDifficulty === 'hard' 
                  ? 'p-4 rounded-xl border-2 border-yellow-500 bg-yellow-100 shadow-lg text-center'
                  : 'p-4 rounded-xl border-2 border-yellow-300 bg-white text-center hover:border-yellow-400'
                }
              >
                <div className="text-lg font-bold text-yellow-800 mb-1">Hard</div>
                <div className="text-xs text-yellow-600">No pre-filled words</div>
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={handleStartGame}
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-lg font-bold rounded-xl shadow-lg hover:from-yellow-400 hover:to-amber-400 transition-all border-2 border-yellow-600"
            >
              🎮 Start Game
            </button>
            <Link
              href="/"
              className="block w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all text-center border-2 border-gray-300"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!gameState) {
    return null;
  }

  // MOBILE LAYOUT - EXACT REPLICA OF ORIGINAL APP
  const MobileGameLayout = () => (
    <div 
      className="h-screen flex flex-col bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/assets/backgrounds/game_background_mobile.png')"
      }}
    >
      {/* Top Player Profiles - Translucent/50% transparent like original */}
      <div className="flex-shrink-0 p-4 pt-12">
        <div className="flex gap-3">
          {/* Player 1 - Active player with 50% transparency */}
          <div className={`flex-1 rounded-xl p-3 flex items-center gap-3 ${
            isPlayerTurn ? 'bg-green-600 bg-opacity-80' : 'bg-gray-600 bg-opacity-50'
          }`}>
            <div className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center">
              <img 
                src="/assets/images/Avatar/1.png" 
                alt="Mark" 
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling!.textContent = 'M';
                }}
              />
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm hidden">M</div>
            </div>
            <div className="text-white">
              <div className="font-bold text-sm">Mark</div>
              <div className="text-xs opacity-90">
                {gameState.players.player1.score} ({gameState.players.player1.totalScore})
              </div>
            </div>
          </div>
          
          {/* Player 2 - Computer with 50% transparency */}
          <div className={`flex-1 rounded-xl p-3 flex items-center gap-3 ${
            !isPlayerTurn ? 'bg-green-600 bg-opacity-80' : 'bg-gray-600 bg-opacity-50'
          }`}>
            <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center">
              <img 
                src="/assets/images/Avatar/2.png" 
                alt="Scholar" 
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling!.textContent = 'S';
                }}
              />
              <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-sm hidden">S</div>
            </div>
            <div className="text-white">
              <div className="font-bold text-sm">Scholar</div>
              <div className="text-xs opacity-90">
                {gameState.players.player2.score} ({gameState.players.player2.totalScore})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Board - Transparent dark overlay like original */}
      <div className="flex-1 p-4">
        <div className="bg-black bg-opacity-20 rounded-xl p-6 h-full flex items-center justify-center">
          {gameState.round.currentVerse && (
            <MobileGameBoard
              verse={gameState.round.currentVerse}
              placementSlots={gameState.round.placementSlots}
              onSlotClick={handleSlotClick}
              onSlotDrop={handleSlotDrop}
            />
          )}
        </div>
      </div>

      {/* Word Tiles - Clean rows, properly spaced with exact original colors */}
      <div className="flex-shrink-0 p-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {gameState.players.player1.words.map((word, index) => (
            <div
              key={`${word}-${index}`}
              className={`px-3 py-2 rounded-lg font-bold cursor-pointer transition-all ${
                selectedWordIndex === index 
                  ? 'bg-yellow-400 text-black shadow-lg transform scale-105' 
                  : 'bg-red-800 text-white hover:bg-red-700'
              }`}
              style={{ 
                backgroundColor: selectedWordIndex === index ? '#FBBF24' : '#991B1B',
                color: selectedWordIndex === index ? '#000000' : '#FFFFFF'
              }}
              onClick={() => handleWordSelect(index)}
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', word);
                e.dataTransfer.setData('wordIndex', index.toString());
                e.dataTransfer.effectAllowed = 'move';
              }}
              draggable={isPlayerTurn}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Buttons - Hint and Menu side by side */}
      <div className="flex-shrink-0 p-4 pb-8">
        <div className="flex gap-3">
          {/* Hint Button - Green with location icon */}
          <button
            onClick={useHintAction}
            disabled={!isPlayerTurn || gameState.round.hints <= 0}
            className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>📍</span>
            Hint
          </button>
          
          {/* Menu Button - Brown with hamburger icon */}
          <button
            onClick={handleExitGame}
            className="flex-1 bg-amber-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <span>☰</span>
            Menu
          </button>
        </div>
      </div>
    </div>
  );

  // DESKTOP LAYOUT - Current layout (you said it's acceptable)
  const DesktopGameLayout = () => (
    <div 
      className="h-screen overflow-hidden bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/assets/backgrounds/game_background_mobile.png')"
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative z-10 h-full flex flex-col">
        
        {/* Header */}
        <header className="flex-shrink-0 bg-black bg-opacity-30 backdrop-blur-sm p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
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
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Exit
              </button>
            </div>
          </div>
        </header>

        {/* Desktop Player Profiles - Only show on larger screens */}
        <section className="flex justify-between items-start p-4 gap-4">
          {/* Player 1 Profile with integrated timer */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 w-64">
            <div className="flex items-center space-x-3 mb-3">
              <AvatarDisplay
                avatarId={gameState.players.player1.avatar || "1"}
                name={gameState.players.player1.name}
                size={48}
                isActive={gameState.players.activePlayer === 'player1'}
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg text-biblical-700">You</h3>
                <div className="text-sm text-biblical-600">{gameState.players.player1.words.length} words left</div>
              </div>
              {/* Timer integrated here */}
              <div className="flex-shrink-0">
                <Timer
                  remainingTime={gameState.turn.remainingTime}
                  isWarning={gameState.turn.isTimerWarning}
                  isPaused={gameState.turn.isPaused}
                  className="scale-75"
                />
              </div>
            </div>
            <div className="text-center space-y-2">
              <div>
                <div className="text-xs text-gray-500">Round Score</div>
                <div className="text-2xl font-bold text-biblical-700">{gameState.players.player1.score}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Total</div>
                <div className="text-lg font-semibold text-biblical-600">{gameState.players.player1.totalScore}</div>
              </div>
            </div>
          </div>
          
          {/* Player 2 Profile */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 w-64">
            <div className="flex items-center space-x-3 mb-3">
              <AvatarDisplay
                avatarId={gameState.players.player2.avatar || "2"}
                name={gameState.players.player2.name}
                size={48}
                isActive={gameState.players.activePlayer === 'player2'}
              />
              <div>
                <h3 className="font-bold text-lg text-biblical-700">Computer</h3>
                <div className="text-sm text-biblical-600">{gameState.players.player2.words.length} words left</div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div>
                <div className="text-xs text-gray-500">Round Score</div>
                <div className="text-2xl font-bold text-biblical-700">{gameState.players.player2.score}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Total</div>
                <div className="text-lg font-semibold text-biblical-600">{gameState.players.player2.totalScore}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Game Board Section */}
        <section className="flex-1 min-h-0 flex items-center">
          {gameState.round.currentVerse && (
            <div className="w-full px-4">
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
          )}
        </section>

        {/* Player Hand Section with integrated hints */}
        <section className="flex-shrink-0 p-4">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4">
            {/* Hints integrated into player hand header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-biblical-700">
                {isPlayerTurn ? 'Your Turn' : 'Computer\'s Turn'}
              </h3>
              <div className="flex items-center gap-2">
                <HintDisplay
                  hintsRemaining={gameState.round.hints}
                  onUseHint={useHintAction}
                  onPurchaseHints={purchaseHintsAction}
                  canUseHint={isPlayerTurn && gameState.round.hints > 0}
                  canPurchaseHint={isPlayerTurn && gameState.players.player1.score >= 20}
                />
              </div>
            </div>
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
    </div>
  );

  return (
    <>
      {/* Mobile Layout - Show only on small screens */}
      <div className="block lg:hidden">
        <MobileGameLayout />
      </div>
      
      {/* Desktop Layout - Show only on large screens */}
      <div className="hidden lg:block">
        <DesktopGameLayout />
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};