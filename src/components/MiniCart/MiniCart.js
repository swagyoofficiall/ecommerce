import { Link, navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';

import Button from '../Button';
import CurrencyFormatter from '../CurrencyFormatter';
import MiniCartItem from '../MiniCartItem';

import * as styles from './MiniCart.module.css';
import { fetchCartItems } from '../../lib/cart';
import { supabase } from '../../lib/supabase';

const MiniCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCart = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const items = await fetchCartItems(user.id);
      setCartItems(items);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCart();
  }, []);

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <h4>My Bag</h4>
      </div>

      {loading ? (
        <div className={styles.cartItemsContainer}>Loading...</div>
      ) : (
        <div className={styles.cartItemsContainer}>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <MiniCartItem
                key={item.id}
                item={item}
                onItemUpdate={getCart} // Refresh cart on update
              />
            ))
          )}
        </div>
      )}

      <div className={styles.summaryContainer}>
        <div className={styles.summaryContent}>
          <div className={styles.totalContainer}>
            <span>Total (INR)</span>
            <span>
              <CurrencyFormatter amount={total} appendZero />
            </span>
          </div>
          <span className={styles.taxNotes}>
            Taxes and shipping will be calculated at checkout
          </span>
          <Button onClick={() => navigate('/cart')} level={'primary'} fullWidth>
            checkout
          </Button>
          <div className={styles.linkContainer}>
            <Link to={'/shop'}>continue shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
