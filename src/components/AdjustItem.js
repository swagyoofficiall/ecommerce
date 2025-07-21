import React from 'react';
import { supabase } from '../lib/supabase';
import * as styles from './AdjustItem.module.css';

const AdjustItem = ({ itemId, quantity, onItemUpdate }) => {
  const updateQuantity = async (newQty) => {
    if (newQty < 1) return;

    const { error } = await supabase
      .from('cart')
      .update({ quantity: newQty })
      .eq('id', itemId);

    if (!error && onItemUpdate) {
      onItemUpdate(); // refresh cart
    }
  };

  return (
    <div className={styles.root}>
      <button
        className={styles.button}
        onClick={() => updateQuantity(quantity - 1)}
      >
        -
      </button>
      <span className={styles.qty}>{quantity}</span>
      <button
        className={styles.button}
        onClick={() => updateQuantity(quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

export default AdjustItem;
