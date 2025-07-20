import React from 'react';
import { supabase } from '../lib/supabase';
import { X } from 'lucide-react';
import * as styles from './RemoveItem.module.css';

const RemoveItem = ({ itemId, onItemUpdate }) => {
  const removeItem = async () => {
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('id', itemId);

    if (!error && onItemUpdate) {
      onItemUpdate(); // refresh cart
    }
  };

  return (
    <button onClick={removeItem} className={styles.removeButton} aria-label="Remove item">
      <X size={18} />
    </button>
  );
};

export default RemoveItem;
