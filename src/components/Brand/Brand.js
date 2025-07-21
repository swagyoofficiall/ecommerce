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
      {/* Swagyo Logo (Editable if needed) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 100"
        width="200"
        height="60"
        role="img"
        aria-label="Swagyo Logo"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="50"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          fontSize="50"
          fill="url(#goldGradient)"  // change to "#000" for black
        >
          SWAGYO
        </text>
      </svg>
    </div>
  );
};

export default Brand;
