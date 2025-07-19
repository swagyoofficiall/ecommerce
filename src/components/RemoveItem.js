import React from 'react';
import { supabase } from '../lib/supabase';
import Icon from './Icons/Icon';
import * as styles from './RemoveItem.module.css';

const RemoveItem = ({ cartItemId, onRemove }) => {
  const removeFromCart = async () => {
    await supabase.from('cart').delete().eq('id', cartItemId);
    if (onRemove) onRemove();
  };

  return (
    <button className={styles.root} onClick={removeFromCart}>
      <Icon symbol="close" />
    </button>
  );
};

export default RemoveItem;
