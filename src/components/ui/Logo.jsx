import React from 'react';

const Logo = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Light blue segment */}
        <path
          d="M50 50 L50 10 A40 40 0 0 1 90 50 Z"
          fill="#667eea"
          className="opacity-80"
        />
        {/* Light yellow segment */}
        <path
          d="M50 50 L90 50 A40 40 0 0 1 50 90 Z"
          fill="#facc15"
          className="opacity-80"
        />
        {/* Light purple segment */}
        <path
          d="M50 50 L50 90 A40 40 0 0 1 10 50 Z"
          fill="#a855f7"
          className="opacity-80"
        />
        {/* Center circle */}
        <circle
          cx="50"
          cy="50"
          r="15"
          fill="white"
          className="opacity-90"
        />
      </svg>
    </div>
  );
};

export default Logo;
