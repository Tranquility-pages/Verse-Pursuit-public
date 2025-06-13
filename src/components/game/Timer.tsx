'use client';

import React from 'react';

interface TimerProps {
  remainingTime: number;
  isWarning?: boolean;
  isPaused?: boolean;
  maxTime?: number;
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({
  remainingTime,
  isWarning = false,
  isPaused = false,
  maxTime = 30,
  className = ''
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (): number => {
    return Math.max(0, (remainingTime / maxTime) * 100);
  };

  // Determine visual state based on remaining time
  const isCritical = remainingTime <= 5;
  const isLow = remainingTime <= 10;
  
  const timerClasses = `
    flex flex-col items-center justify-center
    w-20 h-20 md:w-24 md:h-24
    rounded-full border-4
    ${isCritical 
      ? 'border-red-500 bg-red-50 text-red-700' 
      : isWarning || isLow
      ? 'border-orange-400 bg-orange-50 text-orange-700'
      : 'border-green-400 bg-green-50 text-green-700'
    }
    ${isPaused ? 'opacity-50' : ''}
  `;

  // TEMPORARILY DISABLED TIMER VISUAL TO TEST BLACK FLASH
  return (
    <div className={`relative ${className}`}>
      {/* Simple text display instead of visual timer */}
      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-800 text-white rounded-full flex items-center justify-center">
        <div className="text-lg md:text-xl font-bold font-mono">
          {formatTime(remainingTime)}
        </div>
      </div>
    </div>
  );
};