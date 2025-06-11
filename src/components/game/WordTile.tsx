'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WordTileProps {
  word: string;
  index: number;
  isSelected?: boolean;
  isPlaced?: boolean;
  isDragging?: boolean;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  className?: string;
}

export const WordTile: React.FC<WordTileProps> = ({
  word,
  index,
  isSelected = false,
  isPlaced = false,
  isDragging = false,
  onClick,
  onDragStart,
  onDragEnd,
  className = ''
}) => {
  const baseClasses = `
    px-3 py-2 rounded-lg border-2 cursor-pointer select-none
    font-biblical text-sm md:text-base
    transition-all duration-200 ease-in-out
    shadow-md hover:shadow-lg
    min-w-[60px] text-center
  `;

  const stateClasses = isSelected
    ? 'bg-biblical-200 border-biblical-400 text-biblical-800'
    : isPlaced
    ? 'bg-green-100 border-green-400 text-green-800'
    : isDragging
    ? 'bg-biblical-100 border-biblical-300 text-biblical-700 opacity-50'
    : 'bg-parchment-50 border-parchment-300 text-biblical-700 hover:bg-parchment-100 hover:border-parchment-400';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${stateClasses} ${className}`}
      draggable={!isPlaced}
      onClick={onClick}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      data-word={word}
      data-index={index}
    >
      {word}
    </motion.div>
  );
};