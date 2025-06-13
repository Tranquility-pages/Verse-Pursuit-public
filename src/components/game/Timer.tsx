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

  return (
    <div className={`relative ${className}`}>
      {/* Background Circle */}
      <div className={timerClasses}>
        <div className="text-lg md:text-xl font-bold font-mono">
          {/* TEMPORARILY DISABLED COUNTDOWN NUMBERS TO TEST BLACK FLASH */}
          {/* {formatTime(remainingTime)} */}
          00:30
        </div>
        {isPaused && (
          <div className="text-xs opacity-70">
            PAUSED
          </div>
        )}
      </div>

      {/* Progress Ring */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-gray-200"
        />
        
        {/* Progress circle - ALSO DISABLED TO TEST */}
        {/* <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          className={
            isCritical 
              ? 'text-red-500' 
              : isWarning || isLow
              ? 'text-orange-400'
              : 'text-green-400'
          }
          style={{
            strokeDasharray: '283', // 2 * π * 45
            strokeDashoffset: `${283 - (283 * getProgressPercentage()) / 100}`
          }}
        /> */}
      </svg>


    </div>
  );
};