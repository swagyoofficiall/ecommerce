import React from 'react';
import { supabase } from '../lib/supabase';

const AdjustItem = ({ cartItemId, quantity, onChange }) => {
  const updateQuantity = async (newQty) => {
    if (newQty < 1) return;
    await supabase
      .from('cart')
      .update({ quantity: newQty })
      .eq('id', cartItemId);
    onChange && onChange(newQty);
  };

  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      <button onClick={() => updateQuantity(quantity - 1)}>-</button>
      <span>{quantity}</span>
      <button onClick={() => updateQuantity(quantity + 1)}>+</button>
    </div>
  );
};

export default AdjustItem;
