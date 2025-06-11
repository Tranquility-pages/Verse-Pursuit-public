'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordTile } from './WordTile';

interface PlayerHandProps {
  words: string[];
  playerName: string;
  isActive?: boolean;
  onWordSelect?: (wordIndex: number, word: string) => void;
  selectedWordIndex?: number | null;
  className?: string;
}

export const PlayerHand: React.FC<PlayerHandProps> = ({
  words,
  playerName,
  isActive = false,
  onWordSelect,
  selectedWordIndex,
  className = ''
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleWordClick = (index: number, word: string) => {
    onWordSelect?.(index, word);
  };

  const handleDragStart = (e: React.DragEvent, index: number, word: string) => {
    setDraggedIndex(index);
    e.dataTransfer.setData('text/plain', word);
    e.dataTransfer.setData('wordIndex', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Player Name */}
      <div className="text-center mb-4">
        <h3 className={`text-lg md:text-xl font-biblical ${
          isActive 
            ? 'text-biblical-700 font-semibold' 
            : 'text-biblical-500'
        }`}>
          {playerName}
          {isActive && (
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2 text-biblical-600"
            >
              (Your Turn)
            </motion.span>
          )}
        </h3>
      </div>

      {/* Word Count */}
      <div className="text-center mb-3">
        <span className="text-sm text-biblical-500">
          {words.length} word{words.length !== 1 ? 's' : ''} remaining
        </span>
      </div>

      {/* Word Tiles */}
      <div className="bg-parchment-100 rounded-lg p-4 border border-parchment-200 shadow-inner">
        <AnimatePresence mode="popLayout">
          <div className="flex flex-wrap gap-2 justify-center min-h-[100px]">
            {words.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-biblical-400 italic text-center py-4 w-full"
              >
                No words remaining
              </motion.div>
            ) : (
              words.map((word, index) => (
                <motion.div
                  key={`${word}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30,
                    delay: index * 0.05
                  }}
                >
                  <WordTile
                    word={word}
                    index={index}
                    isSelected={selectedWordIndex === index}
                    isDragging={draggedIndex === index}
                    onClick={() => handleWordClick(index, word)}
                    onDragStart={(e) => handleDragStart(e, index, word)}
                    onDragEnd={handleDragEnd}
                    className={`${
                      isActive 
                        ? 'cursor-pointer hover:shadow-lg' 
                        : 'cursor-not-allowed opacity-60'
                    }`}
                  />
                </motion.div>
              ))
            )}
          </div>
        </AnimatePresence>
      </div>

    </div>
  );
};