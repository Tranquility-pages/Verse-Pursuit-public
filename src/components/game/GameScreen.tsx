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
import { playSound } from '@/utils/sounds';

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
        // Empty slot - Enhanced touch area for better accuracy
        <span
          key={index}
          className={`inline-block cursor-pointer mx-1 ${slot.highlightHint ? 'relative' : ''}`}
          onClick={() => {
            handleSlotClick(index);
            playSound('word-place', 0.3);
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            handleDrop(e, index);
            playSound('word-place', 0.3);
          }}
          style={{
            borderBottom: slot.highlightHint ? '3px solid #22C55E' : '3px solid #FFA500',
            minWidth: '60px', // Increased touch area
            minHeight: '40px', // Increased height for better touch
            height: 'auto',
            display: 'inline-block',
            backgroundColor: slot.highlightHint ? 'rgba(34, 197, 94, 0.15)' : 'transparent',
            borderRadius: slot.highlightHint ? '4px' : '0',
            padding: '8px 4px', // Add padding to increase touch area
            touchAction: 'manipulation' // Improve touch responsiveness
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
        // Filled word - Keep text white for consistency, increased size by 40%
        <span
          key={index}
          className="inline-block px-2 py-1 text-white font-semibold text-2xl"
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
      className="h-screen flex flex-col bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/backgrounds/game_background_mobile.png')"
      }}
    >
      {/* Top Player Profiles - Translucent/50% transparent like original */}
      <div className="flex-shrink-0 p-3 pt-10">
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
      <div className="flex-1 p-3 min-h-0">
        <div className="bg-black bg-opacity-20 rounded-xl p-4 h-full flex items-center justify-center">
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
      <div className="flex-shrink-0 p-3">
        <div className="flex flex-wrap gap-2 justify-center">
          {gameState.players.player1.words.map((word, index) => {
            // Check if this word should be highlighted due to a hint
            const isHintedWord = gameState.round.placementSlots.some(slot => {
              if (!slot.highlightHint || slot.word !== null) return false;
              // Get the original verse words to match with slot position
              const verseWords = gameState.round.currentVerse?.text.split(/\s+/) || [];
              const slotPosition = gameState.round.placementSlots.indexOf(slot);
              return verseWords[slotPosition]?.toLowerCase() === word.toLowerCase();
            });
            
            return (
              <div
                key={`${word}-${index}`}
                className={`px-4 py-3 rounded-lg font-bold cursor-pointer transition-all relative ${
                  selectedWordIndex === index 
                    ? 'bg-yellow-400 text-black shadow-lg transform scale-105'
                    : isHintedWord
                    ? 'bg-green-500 text-white shadow-lg ring-2 ring-green-300 animate-pulse'
                    : 'bg-red-800 text-white hover:bg-red-700'
                }`}
                style={{ 
                  backgroundColor: selectedWordIndex === index 
                    ? '#FBBF24' 
                    : isHintedWord 
                    ? '#22C55E' 
                    : '#991B1B',
                  color: '#FFFFFF',
                  minHeight: '44px', // Larger touch target
                  minWidth: '44px',
                  touchAction: 'manipulation',
                  userSelect: 'none'
                }}
                onClick={() => {
                  handleWordSelect(index);
                  playSound('word-select', 0.3);
                }}
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', word);
                  e.dataTransfer.setData('wordIndex', index.toString());
                  e.dataTransfer.effectAllowed = 'move';
                  playSound('word-select', 0.2);
                }}
                draggable={isPlayerTurn}
              >
                {word}
                {isHintedWord && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full border border-white" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Buttons - Hint and Menu side by side */}
      <div className="flex-shrink-0 p-3 pb-6">
        <div className="flex gap-3">
          {/* Hint Button - Green with location icon */}
          <button
            onClick={useHintAction}
            disabled={!isPlayerTurn || gameState.round.hints <= 0}
            className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ minHeight: '56px', touchAction: 'manipulation' }}
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

  // DESKTOP LAYOUT - Redesigned to match mobile style
  const DesktopGameLayout = () => (
    <div 
      className="h-screen flex flex-col bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/assets/backgrounds/game_background_mobile.png')"
      }}
    >
      {/* Top Player Profiles - Similar to mobile but side by side */}
      <div className="flex-shrink-0 p-6 pt-8">
        <div className="flex justify-center gap-8 max-w-4xl mx-auto">
          {/* Player 1 */}
          <div className={`rounded-xl p-4 flex items-center gap-4 min-w-80 ${ 
            isPlayerTurn ? 'bg-green-600 bg-opacity-80' : 'bg-gray-600 bg-opacity-50'
          }`}>
            <div className="w-12 h-12 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center">
              <img 
                src="/assets/images/Avatar/1.png" 
                alt="Mark" 
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling!.textContent = 'M';
                }}
              />
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm hidden">M</div>
            </div>
            <div className="flex-1 text-white">
              <div className="font-bold text-lg">Mark</div>
              <div className="text-sm opacity-90">
                {gameState.players.player1.score} ({gameState.players.player1.totalScore}) • {gameState.players.player1.words.length} words left
              </div>
            </div>
            {/* Timer integrated */}
            <div className="flex-shrink-0">
              <Timer
                remainingTime={gameState.turn.remainingTime}
                isWarning={gameState.turn.isTimerWarning}
                isPaused={gameState.turn.isPaused}
                className="scale-90"
              />
            </div>
          </div>
          
          {/* Player 2 */}
          <div className={`rounded-xl p-4 flex items-center gap-4 min-w-80 ${ 
            !isPlayerTurn ? 'bg-green-600 bg-opacity-80' : 'bg-gray-600 bg-opacity-50'
          }`}>
            <div className="w-12 h-12 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center">
              <img 
                src="/assets/images/Avatar/2.png" 
                alt="Scholar" 
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling!.textContent = 'S';
                }}
              />
              <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-sm hidden">S</div>
            </div>
            <div className="flex-1 text-white">
              <div className="font-bold text-lg">Scholar</div>
              <div className="text-sm opacity-90">
                {gameState.players.player2.score} ({gameState.players.player2.totalScore}) • {gameState.players.player2.words.length} words left
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Board - No extra containers, transparent overlay */}
      <div className="flex-1 p-6">
        <div className="bg-black bg-opacity-20 rounded-xl p-6 h-full flex items-center justify-center max-w-4xl mx-auto">
          {gameState.round.currentVerse && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-6">{gameState.round.currentVerse.reference}</h2>
              <div className="bg-white bg-opacity-95 rounded-xl p-6 shadow-lg">
                <GameBoard
                  verse={gameState.round.currentVerse}
                  placementSlots={gameState.round.placementSlots}
                  onSlotClick={handleSlotClick}
                  onSlotDrop={handleSlotDrop}
                  showVerseReference={false}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Word Tiles - Direct layout, no extra containers */}
      <div className="flex-shrink-0 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {gameState.players.player1.words.map((word, index) => {
              // Check if this word should be highlighted due to a hint
              const isHintedWord = gameState.round.placementSlots.some(slot => {
                if (!slot.highlightHint || slot.word !== null) return false;
                const verseWords = gameState.round.currentVerse?.text.split(/\s+/) || [];
                const slotPosition = gameState.round.placementSlots.indexOf(slot);
                return verseWords[slotPosition]?.toLowerCase() === word.toLowerCase();
              });
              
              return (
                <div
                  key={`${word}-${index}`}
                  className={`px-4 py-3 rounded-lg font-bold cursor-pointer transition-all relative ${
                    selectedWordIndex === index 
                      ? 'bg-yellow-400 text-black shadow-lg transform scale-105'
                      : isHintedWord
                      ? 'bg-green-500 text-white shadow-lg ring-2 ring-green-300 animate-pulse'
                      : 'bg-red-800 text-white hover:bg-red-700'
                  }`}
                  style={{ 
                    backgroundColor: selectedWordIndex === index 
                      ? '#FBBF24' 
                      : isHintedWord 
                      ? '#22C55E' 
                      : '#991B1B',
                    color: '#FFFFFF',
                    minHeight: '48px',
                    minWidth: '48px',
                    touchAction: 'manipulation',
                    userSelect: 'none'
                  }}
                  onClick={() => {
                    handleWordSelect(index);
                    playSound('word-select', 0.3);
                  }}
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', word);
                    e.dataTransfer.setData('wordIndex', index.toString());
                    e.dataTransfer.effectAllowed = 'move';
                    playSound('word-select', 0.2);
                  }}
                  draggable={isPlayerTurn}
                >
                  {word}
                  {isHintedWord && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full border border-white" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Buttons - Hint and Menu like mobile */}
      <div className="flex-shrink-0 p-6 pb-8">
        <div className="flex gap-4 justify-center max-w-md mx-auto">
          <button
            onClick={useHintAction}
            disabled={!isPlayerTurn || gameState.round.hints <= 0}
            className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ minHeight: '56px', touchAction: 'manipulation' }}
          >
            <span>📍</span>
            Hint ({gameState.round.hints})
          </button>
          
          <button
            onClick={handleExitGame}
            className="flex-1 bg-amber-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
            style={{ minHeight: '56px', touchAction: 'manipulation' }}
          >
            <span>☰</span>
            Menu
          </button>
        </div>
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

      {/* Round Complete Summary Screen - Exact replica of original app */}
      <AnimatePresence>
        {isRoundComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              backgroundImage: "url('/assets/backgrounds/Round_summary.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm mx-4 h-full flex flex-col py-2"
            >
              {/* Header - At very top */}
              <div className="text-center mb-2 pt-2">
                <h1 className="text-yellow-400 text-xl font-bold">Round Summary</h1>
              </div>

              {/* Player Profiles - Close to header */}
              <div className="bg-black bg-opacity-25 rounded-xl p-4 mb-4 mx-4" style={{ zIndex: 10, position: 'relative' }}>
                <div className="flex items-center justify-between">
                  {/* Player 1 */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-green-500 border-4 border-white flex items-center justify-center mb-2">
                      <img 
                        src="/assets/images/Avatar/1.png" 
                        alt="Mark" 
                        className="w-12 h-12 rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling!.textContent = 'M';
                        }}
                      />
                      <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold hidden">M</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-sm text-white">Mark</div>
                      <div className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold mt-1">
                        Round: {gameState.players.player1.score}
                      </div>
                      <div className="text-xs text-gray-300 mt-1">
                        {gameState.players.player1.totalScore} Total
                      </div>
                    </div>
                  </div>

                  {/* VS */}
                  <div className="bg-amber-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                    VS
                  </div>

                  {/* Player 2 */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center mb-2">
                      <img 
                        src="/assets/images/Avatar/2.png" 
                        alt="Scholar" 
                        className="w-12 h-12 rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling!.textContent = 'S';
                        }}
                      />
                      <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold hidden">S</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-sm text-white">Scholar</div>
                      <div className="bg-blue-400 text-white px-2 py-1 rounded text-xs font-bold mt-1">
                        Round: {gameState.players.player2.score}
                      </div>
                      <div className="text-xs text-gray-300 mt-1">
                        {gameState.players.player2.totalScore} Total
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verse Section - Fully transparent, text on parchment */}
              {gameState.round.currentVerse && (
                <div className="text-center mb-6 mx-4 flex-1 flex flex-col justify-center" style={{ marginTop: '-30px' }}>
                  <h3 className="font-bold text-black mb-4 text-lg">{gameState.round.currentVerse.reference}</h3>
                  <p className="text-base text-gray-700 leading-relaxed max-w-xs mx-auto">
                    {gameState.round.currentVerse.text}
                  </p>
                </div>
              )}

              {/* Winner Section */}
              <div className="bg-blue-800 bg-opacity-70 rounded-xl p-4 mb-6 mx-4 border-2 border-blue-600">
                <div className="text-center">
                  <h3 className="text-yellow-400 font-bold mb-2">Round Winner</h3>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
                      {gameState.players.player1.score > gameState.players.player2.score ? (
                        <img src="/assets/images/Avatar/1.png" alt="Mark" className="w-8 h-8 rounded-full" />
                      ) : (
                        <img src="/assets/images/Avatar/2.png" alt="Scholar" className="w-8 h-8 rounded-full" />
                      )}
                    </div>
                    <div>
                      <div className="text-white font-bold">
                        {gameState.players.player1.score > gameState.players.player2.score ? 'Mark' : 'Scholar'}
                      </div>
                      <div className="text-yellow-400 text-sm">
                        Score: {Math.max(gameState.players.player1.score, gameState.players.player2.score)} points
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mx-4">
                {!isGameComplete && (
                  <button
                    onClick={handleNextRound}
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
                  >
                    Next Round
                  </button>
                )}
                <button
                  onClick={handleExitGame}
                  className="flex-1 bg-amber-800 text-white py-3 rounded-xl font-bold hover:bg-amber-900 transition-colors"
                >
                  Main Menu
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};