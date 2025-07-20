import React from 'react';
import Icon from '../Icons/Icon';
import * as styles from './RemoveItem.module.css';
import supabase from '../../lib/supabase';

const RemoveItem = ({ cartItemId, onRemove }) => {
  const handleRemove = async (e) => {
    e.stopPropagation();

    if (!cartItemId) return;

    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('id', cartItemId);

    if (error) {
      console.error('Failed to remove item:', error.message);
    } else if (onRemove) {
      onRemove(); // optional callback to refresh cart UI
    }
  };

  return (
    <div className={styles.root} onClick={handleRemove} title="Remove Item">
      <Icon symbol="cross" />
    </div>
  );
};

export default RemoveItem;
