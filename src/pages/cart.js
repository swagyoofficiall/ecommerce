import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

import Brand from '../components/Brand';
import CartItem from '../components/CartItem';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Icon from '../components/Icons/Icon';
import OrderSummary from '../components/OrderSummary';

import * as styles from './cart.module.css';

const supabase = createClient(
  process.env.GATSBY_SUPABASE_URL,
  process.env.GATSBY_SUPABASE_ANON_KEY
);

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items for current user from Supabase
  useEffect(() => {
    async function fetchCart() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (!user) {
          setCartItems([]);
          setLoading(false);
          return;
        }

        // Assuming you have a "cart_items" table linked to users
        // and "products" table for product details

        // Fetch cart items joined with product details
        let { data, error } = await supabase
          .from('cart_items')
          .select(
            `id, quantity,
             product:products (
               id, name, price, image_url, color, size
             )`
          )
          .eq('user_id', user.id);

        if (error) throw error;

        // Map data to shape expected by CartItem component
        const formattedItems = data.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image_url,
          color: item.product.color,
          size: item.product.size,
          alt: item.product.name,
        }));

        setCartItems(formattedItems);
      } catch (error) {
        console.error('Error fetching cart items:', error.message);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className={styles.contentContainer}>
        <Container size={'large'} spacing={'min'}>
          <h3>Loading your cart...</h3>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.contentContainer}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.headerContainer}>
            <div className={styles.shoppingContainer}>
              <Link className={styles.shopLink} to={'/shop'}>
                <Icon symbol={'arrow'}></Icon>
                <span className={styles.continueShopping}>
                  Continue Shopping
                </span>
              </Link>
            </div>
            <Brand />
            <div className={styles.loginContainer}>
              <Link to={'/login'}>Login</Link>
            </div>
          </div>
          <div className={styles.summaryContainer}>
            <h3>My Bag</h3>
            <div className={styles.cartContainer}>
              <div className={styles.cartItemsContainer}>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <CartItem key={item.id} {...item} />
                  ))
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </div>
              <OrderSummary cartItems={cartItems} />
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
