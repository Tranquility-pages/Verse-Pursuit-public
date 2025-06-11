'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getWordTileTheme, DEFAULT_THEME_KEY } from '@/utils/WordTileThemes';

interface WordTileProps {
  word: string;
  index: number;
  isSelected?: boolean;
  isPlaced?: boolean;
  isDragging?: boolean;
  isHinted?: boolean;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  className?: string;
  theme?: string;
}

export const WordTile: React.FC<WordTileProps> = ({
  word,
  index,
  isSelected = false,
  isPlaced = false,
  isDragging = false,
  isHinted = false,
  onClick,
  onDragStart,
  onDragEnd,
  className = '',
  theme = DEFAULT_THEME_KEY
}) => {
  const tileTheme = getWordTileTheme(theme);
  
  const baseClasses = `
    px-3 py-2 rounded-lg border-2 cursor-pointer select-none
    font-biblical text-sm md:text-base font-semibold
    transition-all duration-200 ease-in-out
    shadow-md hover:shadow-lg
    min-w-[60px] text-center
  `;

  // Determine background color and text color based on state
  let bgColor = tileTheme.default;
  let textColor = 'white';
  
  if (isSelected) {
    bgColor = tileTheme.selected;
  } else if (isHinted) {
    bgColor = tileTheme.hinted;
  } else if (isPlaced) {
    bgColor = '#22c55e'; // Green for placed tiles
  } else if (isDragging) {
    bgColor = tileTheme.default;
    textColor = 'rgba(255,255,255,0.5)';
  }

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart?.(e);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    onDragEnd?.(e);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: bgColor,
        boxShadow: isSelected ? `0 0 0 3px ${tileTheme.ready}40` : undefined,
      }}
      onClick={onClick}
      data-word={word}
      data-index={index}
      draggable={!isPlaced}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {word}
    </motion.div>
  );
};