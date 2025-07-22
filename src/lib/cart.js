// src/lib/cart.js
import { supabase } from './supabase';

export async function fetchCartItems(userId) {
  const { data, error } = await supabase
    .from('cart')
    .select(`
      id,
      product_id,
      quantity,
      product:product_id (
        name,
        price,
        image
      )
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching cart:', error);
    return [];
  }

  return data;
}
