import React, { useState, useEffect } from 'react';
import Icon from '../Icons/Icon';
import * as styles from './AdjustItem.module.css';

const AdjustItem = ({ isTransparent, initialQty = 1, onQtyChange }) => {
  const [qty, setQty] = useState(initialQty);

  const handleQtyChange = (newQty) => {
    const safeQty = Math.max(1, newQty);
    setQty(safeQty);
    if (onQtyChange) {
      onQtyChange(safeQty); // notify parent to update cart in Supabase
    }
  };

  const handleInputChange = (e) => {
    const num = parseInt(e.target.value);
    if (!isNaN(num)) {
      handleQtyChange(num);
    }
  };

  return (
    <div className={`${styles.root} ${isTransparent ? styles.transparent : ''}`}>
      <div
        className={styles.iconContainer}
        role="presentation"
        onClick={() => handleQtyChange(qty - 1)}
      >
        <Icon symbol="minus" />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="number"
          value={qty}
          className={isTransparent ? styles.transparentInput : ''}
          onChange={handleInputChange}
          min="1"
        />
      </div>
      <div
        className={styles.iconContainer}
        role="presentation"
        onClick={() => handleQtyChange(qty + 1)}
      >
        <Icon symbol="plus" />
      </div>
    </div>
  );
};

export default AdjustItem;
