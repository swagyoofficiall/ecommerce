import React from 'react';
import { supabase } from '../lib/supabase';

const RemoveItem = ({ cartItemId, onRemove }) => {
  const removeItem = async () => {
    await supabase.from('cart').delete().eq('id', cartItemId);
    onRemove && onRemove();
  };

  return <button onClick={removeItem}>×</button>;
};

export default RemoveItem;
