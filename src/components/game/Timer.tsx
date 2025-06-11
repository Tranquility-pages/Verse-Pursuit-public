'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  remainingTime: number;
  isWarning?: boolean;
  isPaused?: boolean;
  onTimeUpdate?: (remainingTime: number) => void;
  onTimeExpired?: () => void;
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({
  remainingTime,
  isWarning = false,
  isPaused = false,
  onTimeUpdate,
  onTimeExpired,
  className = ''
}) => {
  const [displayTime, setDisplayTime] = useState(remainingTime);

  useEffect(() => {
    setDisplayTime(remainingTime);
  }, [remainingTime]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDisplayTime(prev => {
        const newTime = Math.max(0, prev - 1);
        
        // Notify parent of time update
        onTimeUpdate?.(newTime);
        
        // Check if time expired
        if (newTime === 0) {
          onTimeExpired?.();
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, onTimeUpdate, onTimeExpired]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (): number => {
    const maxTime = 30; // Default turn time
    return (displayTime / maxTime) * 100;
  };

  const timerClasses = `
    flex flex-col items-center justify-center
    w-20 h-20 md:w-24 md:h-24
    rounded-full border-4
    ${isWarning 
      ? 'border-red-400 bg-red-50 text-red-700' 
      : 'border-biblical-400 bg-biblical-50 text-biblical-700'
    }
    ${isPaused ? 'opacity-50' : ''}
  `;

  return (
    <div className={`relative ${className}`}>
      {/* Background Circle */}
      <div className={timerClasses}>
        <div className="text-lg md:text-xl font-bold font-mono">
          {formatTime(displayTime)}
        </div>
        {isPaused && (
          <div className="text-xs text-biblical-500">
            PAUSED
          </div>
        )}
      </div>

      {/* Progress Ring */}
      <motion.svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-parchment-200"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className={isWarning ? 'text-red-400' : 'text-biblical-400'}
          style={{
            strokeDasharray: '283', // 2 * π * 45
            strokeDashoffset: `${283 - (283 * getProgressPercentage()) / 100}`,
          }}
          animate={{
            strokeDashoffset: `${283 - (283 * getProgressPercentage()) / 100}`,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </motion.svg>

      {/* Warning Animation */}
      {isWarning && !isPaused && (
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-red-400"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  );
};