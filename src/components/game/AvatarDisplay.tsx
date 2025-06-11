'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AvatarDisplayProps {
  avatarId: string;
  name: string;
  size?: number;
  backgroundColor?: string;
  borderColor?: string;
  isActive?: boolean;
  className?: string;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  avatarId,
  name,
  size = 48,
  backgroundColor = '#762D2C',
  borderColor = '#FFD700',
  isActive = false,
  className = ''
}) => {
  // Get avatar image path based on ID
  const getAvatarSrc = (id: string) => {
    // Map avatar ID to actual image file
    const avatarNumber = parseInt(id) || 1;
    return `/assets/images/Avatar/${avatarNumber}.png`;
  };

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.05 }}
      animate={isActive ? { 
        boxShadow: `0 0 0 3px ${borderColor}`,
        scale: 1.1 
      } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Avatar Container */}
      <div
        className="rounded-full overflow-hidden flex items-center justify-center border-2"
        style={{
          width: size,
          height: size,
          backgroundColor,
          borderColor: isActive ? borderColor : 'rgba(255, 215, 0, 0.5)',
        }}
      >
        {/* Avatar Image */}
        <img
          src={getAvatarSrc(avatarId)}
          alt={`${name} avatar`}
          className="w-full h-full object-cover"
          style={{ width: size, height: size }}
          onError={(e) => {
            // Fallback to generic avatar or initials
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            
            // Show initials instead
            const initialsDiv = target.nextElementSibling as HTMLElement;
            if (initialsDiv) {
              initialsDiv.style.display = 'flex';
            }
          }}
        />
        
        {/* Fallback: Player initials */}
        <div 
          className="absolute inset-0 flex items-center justify-center text-white font-bold"
          style={{ 
            fontSize: size * 0.4,
            display: 'none'
          }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      </div>
      
      {/* Active indicator dot */}
      {isActive && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        />
      )}
    </motion.div>
  );
};