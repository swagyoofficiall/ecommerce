import React, { useState, useContext } from 'react';
import AdjustItem from '../AdjustItem';
import CurrencyFormatter from '../CurrencyFormatter';
import Drawer from '../Drawer';
import RemoveItem from '../RemoveItem';
import QuickView from '../QuickView';
import * as styles from './CartItem.module.css';
import { navigate } from 'gatsby';
import { toOptimizedImage } from '../../helpers/general';

import { CurrencyContext } from '../../context/CurrencyContext';

const CartItem = (props) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const { image, alt, color, name, size, price } = props;

  // Currency context fallback is INR ₹
  const { currency = 'INR', rate = 1 } = useContext(CurrencyContext) || {};

  // Convert price based on selected currency rate
  const convertedPrice = parseFloat(price) * rate;

  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        role="presentation"
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
          role="presentation"
          onClick={() => setShowQuickView(true)}
        >
          <span>Edit</span>
        </div>
      </div>
      <div className={styles.adjustItemContainer}>
        <AdjustItem />
      </div>
      <div className={styles.priceContainer}>
        <CurrencyFormatter amount={convertedPrice} currency={currency} appendZero />
      </div>
      <div className={styles.removeContainer}>
        <RemoveItem />
      </div>

      <Drawer visible={showQuickView} close={() => setShowQuickView(false)}>
        <QuickView close={() => setShowQuickView(false)} />
      </Drawer>
    </div>
  );
};

export default CartItem;
