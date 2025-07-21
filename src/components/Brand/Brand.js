import React from 'react';
import { navigate } from 'gatsby';
import * as styles from './Brand.module.css';

const Brand = () => {
  return (
    <div
      className={styles.root}
      role="presentation"
      onClick={() => navigate('/')}
    >
      {/* Swagyo Animated Logo with Glow + Shimmer */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 100"
        width="220"
        height="65"
        role="img"
        aria-label="Swagyo Logo"
        className={styles.shimmerSvg}
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>

          {/* Animated shimmer mask */}
          <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <mask id="shimmerMask">
            <rect
              x="-100%"
              y="0"
              width="200%"
              height="100%"
              fill="url(#shimmerGradient)"
              className={styles.shimmerRect}
            />
          </mask>
        </defs>

        <g
          fontFamily="Georgia, serif"
          fontWeight="900"
          fontSize="55"
          fill="url(#goldGradient)"
          className={styles.glow}
          mask="url(#shimmerMask)"
        >
          {['S', 'W', 'A', 'G', 'Y', 'O'].map((letter, index) => (
            <text
              key={index}
              x={index * 44}
              y="60"
              className={styles.letter}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {letter}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default Brand;
