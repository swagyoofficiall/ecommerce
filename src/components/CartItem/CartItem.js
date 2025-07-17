import React, { useState, useContext } from 'react';
import Drawer from '../Drawer';
import QuickView from '../QuickView';
import * as styles from './CartItem.module.css';
import { navigate } from 'gatsby';
import { toOptimizedImage } from '../../helpers/general';
import { CurrencyContext } from '../../context/CurrencyContext';

const CartItem = (props) => {
  const {
    id,
    image,
    alt,
    color,
    name,
    size,
    price,
    quantity = 1,
    onQuantityChange,
    onRemove,
  } = props;

  const [showQuickView, setShowQuickView] = useState(false);
  const { currency = 'INR', symbol = '₹', rate = 1 } = useContext(CurrencyContext) || {};
  const convertedPrice = Math.round(price * rate);

  const handleIncrease = () => {
    onQuantityChange(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        role={'presentation'}
        onClick={() => navigate('/product/sample')}
      >
        <img src={toOptimizedImage(image)} alt={alt} />
      </div>

      <div className={styles.itemContainer}>
        <span className={styles.name}>{name}</span>
        <div className={styles.metaContainer}>
          <span>Color: {color}</span>
          <span>Size: {size}</span>
        </div>
        <div
          className={styles.editContainer}
          role={'presentation'}
          onClick={() => setShowQuickView(true)}
        >
          <span>Edit</span>
        </div>
      </div>

      <div className={styles.adjustItemContainer}>
        <div className={styles.adjustWrapper}>
          <button onClick={handleDecrease} className={styles.adjustButton}>−</button>
          <span className={styles.quantity}>{quantity}</span>
          <button onClick={handleIncrease} className={styles.adjustButton}>+</button>
        </div>
      </div>

      <div className={styles.priceContainer}>
        <span>{symbol}{convertedPrice * quantity}.00</span>
      </div>

      <div className={styles.removeContainer}>
        <button onClick={() => onRemove(id)} className={styles.removeButton}>✕</button>
      </div>

      <Drawer visible={showQuickView} close={() => setShowQuickView(false)}>
        <QuickView close={() => setShowQuickView(false)} />
      </Drawer>
    </div>
  );
};

export default CartItem;
