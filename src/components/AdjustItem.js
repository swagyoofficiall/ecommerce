import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import * as styles from './AdjustItem.module.css';

const AdjustItem = ({ cartItemId, quantity }) => {
  const [count, setCount] = useState(quantity || 1);

  const updateQuantity = async (newQty) => {
    if (newQty < 1) return;
    setCount(newQty);
    await supabase
      .from('cart')
      .update({ quantity: newQty })
      .eq('id', cartItemId);
  };

  return (
    <div className={styles.root}>
      <button onClick={() => updateQuantity(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => updateQuantity(count + 1)}>+</button>
    </div>
  );
};

export default AdjustItem;
