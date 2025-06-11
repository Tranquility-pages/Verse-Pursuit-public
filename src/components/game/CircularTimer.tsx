'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AvatarDisplay } from './AvatarDisplay';

interface CircularTimerProps {
  time: number;
  maxTime?: number;
  isActive?: boolean;
  avatarId?: string;
  playerName?: string;
  score?: number;
  totalScore?: number;
  className?: string;
}

export const CircularTimer: React.FC<CircularTimerProps> = ({
  time,
  maxTime = 30,
  isActive = false,
  avatarId = "1",
  playerName = "",
  score = 0,
  totalScore = 0,
  className = ''
}) => {
  const circleRadius = 28;
  const circleCircumference = 2 * Math.PI * circleRadius;
  
  // Calculate how much of the circle to show based on time remaining
  const timeRatio = time / maxTime;
  const circleFillAmount = circleCircumference * (1 - timeRatio);
  
  // Determine warning state
  const isWarning = time <= 10 && isActive;
  const isCritical = time <= 5 && isActive;

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Timer and Avatar Container */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Timer circle background */}
        <svg
          className="absolute inset-0 w-16 h-16 transform -rotate-90"
          viewBox="0 0 64 64"
        >
          {/* Background circle */}
          <circle
            cx="32"
            cy="32"
            r={circleRadius}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="3"
            fill="transparent"
          />
          
          {/* Timer progress circle - only visible for active player */}
          {isActive && (
            <motion.circle
              cx="32"
              cy="32"
              r={circleRadius}
              stroke={isCritical ? "#EF4444" : isWarning ? "#F59E0B" : "#FFD700"}
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={circleCircumference}
              strokeDashoffset={circleFillAmount}
              strokeLinecap="round"
              animate={{
                strokeDashoffset: circleFillAmount,
                stroke: isCritical ? "#EF4444" : isWarning ? "#F59E0B" : "#FFD700"
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )}
        </svg>
        
        {/* Player Avatar in center of timer */}
        <div className="relative z-10">
          <AvatarDisplay
            avatarId={avatarId}
            name={playerName}
            size={48}
            isActive={isActive}
          />
        </div>
        
        {/* Time remaining overlay - displayed when timer is low */}
        {isActive && time <= 10 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-60 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              className="text-white font-bold text-lg"
              animate={isCritical ? {
                scale: [1, 1.1, 1],
                color: ["#FFFFFF", "#EF4444", "#FFFFFF"]
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {Math.ceil(time)}
            </motion.span>
          </motion.div>
        )}
      </div>
      
      {/* Player info to the right */}
      <div className="flex-1 min-w-0">
        <h3 className={`
          font-medium text-sm truncate
          ${isActive ? 'text-white' : 'text-gray-300'}
        `}>
          {playerName}
          {isActive && (
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-1"
            >
              ●
            </motion.span>
          )}
        </h3>
        
        <div className="flex items-center space-x-2 text-xs">
          <span className={`font-bold ${isActive ? 'text-yellow-300' : 'text-gray-400'}`}>
            {score}
          </span>
          <span className="text-gray-400">
            ({totalScore})
          </span>
        </div>
      </div>
    </div>
  );
};