import React from 'react';
import * as styles from './Banner.module.css';
import { toOptimizedImage } from '../../helpers/general';

const Banner = ({
  maxWidth,
  name,
  subtitle,
  color,
  bgImage,
  height,
  bgColor = 'var(--standard-light-grey)',
  hideSubtitleOnMobile = true,
}) => {
  const customStyling = {
    backgroundColor: bgColor,
    backgroundImage: bgImage ? `url(${toOptimizedImage(bgImage)})` : 'none',
    height,
    color,
  };

  return (
    <div className={styles.root} style={customStyling}>
      <div className={styles.content} style={{ maxWidth }}>
        <h2>{name}</h2>
        {subtitle && (
          <span
            className={`${styles.subtitle} ${
              hideSubtitleOnMobile ? styles.hideSubtitleOnMobile : ''
            }`}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default Banner;
