'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlacementSlot, Verse } from '@/game/types';

interface GameBoardProps {
  verse: Verse;
  placementSlots: PlacementSlot[];
  onSlotClick?: (slotIndex: number) => void;
  onSlotDrop?: (slotIndex: number, word: string, wordIndex: number) => void;
  showVerseReference?: boolean;
  className?: string;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  verse,
  placementSlots,
  onSlotClick,
  onSlotDrop,
  showVerseReference = false,
  className = ''
}) => {
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null);

  const handleDragOver = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    setDragOverSlot(slotIndex);
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    setDragOverSlot(null);
    
    const word = e.dataTransfer.getData('text/plain');
    const wordIndex = parseInt(e.dataTransfer.getData('wordIndex'));
    
    if (onSlotDrop && word && !isNaN(wordIndex)) {
      onSlotDrop(slotIndex, word, wordIndex);
    }
  };

  const renderSlot = (slot: PlacementSlot, index: number) => {
    const isEmpty = slot.word === null;
    const isSystemLocked = slot.lockedBy === 'system';
    const isPlayerLocked = slot.lockedBy === 'player1' || slot.lockedBy === 'player2';
    const isHinted = slot.highlightHint;
    const isDragOver = dragOverSlot === index;

    const baseClasses = `
      min-h-[50px] md:min-h-[60px] min-w-[60px] md:min-w-[80px]
      border-2 rounded-lg flex items-center justify-center
      text-center font-biblical text-sm md:text-base
      transition-all duration-200 ease-in-out
      px-2 py-1
    `;

    const stateClasses = isEmpty
      ? isHinted
        ? 'border-yellow-400 bg-yellow-500 bg-opacity-20 border-dashed text-white'
        : isDragOver
        ? 'border-biblical-400 bg-biblical-500 bg-opacity-20 border-dashed text-white'
        : 'border-orange-400 bg-orange-500 bg-opacity-20 border-dashed text-white'
      : isSystemLocked
      ? 'border-biblical-600 bg-biblical-500 bg-opacity-30 text-white'
      : isPlayerLocked
      ? 'border-green-500 bg-green-500 bg-opacity-30 text-white'
      : 'border-red-400 bg-red-500 bg-opacity-30 text-white'; // Incorrect placement

    return (
      <motion.div
        key={index}
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${baseClasses} ${stateClasses}`}
        onClick={() => onSlotClick?.(index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, index)}
        whileHover={isEmpty ? { scale: 1.02 } : {}}
      >
        <span className="break-words">
          {slot.word || ''}
        </span>
        {isHinted && isEmpty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
          />
        )}
      </motion.div>
    );
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Verse Reference */}
      <AnimatePresence>
        {showVerseReference && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-6"
          >
            <h2 className="text-lg md:text-xl font-biblical text-biblical-700">
              {verse.reference}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Board */}
      <div className="bg-transparent rounded-xl p-4 md:p-6">
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center items-center leading-relaxed">
          {placementSlots.map((slot, index) => renderSlot(slot, index))}
        </div>
      </div>

      {/* Verse Category */}
      {verse.category && (
        <div className="text-center mt-4">
          <span className="inline-block px-3 py-1 bg-biblical-100 text-biblical-700 rounded-full text-sm">
            {verse.category}
          </span>
        </div>
      )}
    </div>
  );
};