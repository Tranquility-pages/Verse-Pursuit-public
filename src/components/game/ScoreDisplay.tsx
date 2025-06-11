'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PlayerState } from '@/game/types';

interface ScoreDisplayProps {
  player1: PlayerState;
  player2: PlayerState;
  activePlayer: 'player1' | 'player2';
  className?: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  player1,
  player2,
  activePlayer,
  className = ''
}) => {
  const renderPlayerScore = (player: PlayerState, playerId: 'player1' | 'player2') => {
    const isActive = activePlayer === playerId;
    
    return (
      <motion.div
        layout
        className={`
          flex flex-col items-center p-4 rounded-lg border-2
          ${isActive 
            ? 'border-biblical-400 bg-biblical-50' 
            : 'border-parchment-300 bg-parchment-50'
          }
          transition-colors duration-200
        `}
        whileHover={{ scale: 1.02 }}
      >
        {/* Player Name */}
        <h3 className={`
          text-lg font-biblical font-semibold mb-2
          ${isActive ? 'text-biblical-700' : 'text-biblical-600'}
        `}>
          {player.name}
          {isActive && (
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-1 text-sm"
            >
              ●
            </motion.span>
          )}
        </h3>

        {/* Current Round Score */}
        <div className="text-center mb-3">
          <div className="text-sm text-biblical-500">Round Score</div>
          <motion.div
            key={player.score}
            initial={{ scale: 1.2, color: '#bf9145' }}
            animate={{ scale: 1, color: '#734e2d' }}
            className="text-2xl font-bold text-biblical-800"
          >
            {player.score}
          </motion.div>
        </div>

        {/* Total Score */}
        <div className="text-center mb-3">
          <div className="text-sm text-biblical-500">Total Score</div>
          <motion.div
            key={player.totalScore}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-xl font-semibold text-biblical-700"
          >
            {player.totalScore}
          </motion.div>
        </div>

        {/* Game Stats */}
        <div className="flex justify-center space-x-4 text-xs text-biblical-500">
          <div className="text-center">
            <div className="font-medium">{player.mistakes}</div>
            <div>Mistakes</div>
          </div>
          <div className="text-center">
            <div className="font-medium">{player.consecutiveTimeouts}</div>
            <div>Timeouts</div>
          </div>
        </div>

        {/* Words Remaining */}
        <div className="mt-2 text-center">
          <div className="text-xs text-biblical-500">Words Left</div>
          <div className="text-sm font-medium text-biblical-600">
            {player.words.length}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto ${className}`}>
      {renderPlayerScore(player1, 'player1')}
      {renderPlayerScore(player2, 'player2')}
    </div>
  );
};