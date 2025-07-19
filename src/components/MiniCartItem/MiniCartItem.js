import React from 'react';
import { navigate } from 'gatsby';

import AdjustItem from '../AdjustItem';
import CurrencyFormatter from '../CurrencyFormatter';
import RemoveItem from '../RemoveItem';

import * as styles from './MiniCartItem.module.css';
import { toOptimizedImage } from '../../helpers/general';

const MiniCartItem = ({ item }) => {
  if (!item || !item.product) return null;

  const {
    id,
    quantity,
    product: {
      id: productId,
      name,
      price,
      image,
      color,
      size,
    } = {},
  } = item;

  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        role={'presentation'}
        onClick={() => navigate(`/product/${productId}`)}
      >
        <img src={toOptimizedImage(image)} alt={name || 'Product'} />
      </div>

      <div className={styles.detailsContainer}>
        <div className={styles.metaContainer}>
          <span className={styles.name}>{name}</span>
          <div className={styles.priceContainer}>
            <CurrencyFormatter amount={price * quantity} />
          </div>
          {color && <span className={styles.meta}>Color: {color}</span>}
          {size && (
            <span className={styles.meta}>
              Size: <span className={styles.size}>{size}</span>
            </span>
          )}
        </div>

        <div className={styles.adjustItemContainer}>
          <AdjustItem itemId={id} quantity={quantity} />
        </div>
      </div>

      <div className={styles.closeContainer}>
        <RemoveItem itemId={id} />
      </div>
    </div>
  );
};

export default MiniCartItem;
