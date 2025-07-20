import React from 'react';
import { navigate } from 'gatsby';

import AdjustItem from '../AdjustItem';
import CurrencyFormatter from '../CurrencyFormatter';
import RemoveItem from '../RemoveItem';

import * as styles from './MiniCartItem.module.css';
import { toOptimizedImage } from '../../helpers/general';

const MiniCartItem = ({
  id,
  name,
  price,
  image,
  color,
  size,
  quantity,
  onItemUpdate, // ✅ callback to refresh cart
}) => {
  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        role={'presentation'}
        onClick={() => navigate(`/product/${id}`)}
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
          <AdjustItem itemId={id} quantity={quantity} onItemUpdate={onItemUpdate} />
        </div>
      </div>

      <div className={styles.closeContainer}>
        <RemoveItem itemId={id} onItemUpdate={onItemUpdate} />
      </div>
    </div>
  );
};

export default MiniCartItem;
