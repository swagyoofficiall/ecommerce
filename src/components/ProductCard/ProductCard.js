import React, { useState } from 'react';
import { navigate } from 'gatsby';
import * as styles from './ProductCard.module.css';

import Icon from '../Icons/Icon';
import CurrencyFormatter from '../CurrencyFormatter';
import { toOptimizedImage } from '../../helpers/general';

const ProductCard = (props) => {
  const [isWishlist, setIsWishlist] = useState(false);
  const {
    image,
    imageAlt = 'Product Image',
    name,
    price,
    originalPrice,
    meta,
    showQuickView,
    slug,
    height = 580,
  } = props;

  const handleRouteToProduct = () => {
    if (slug) {
      navigate(`/product/${slug}`);
    } else {
      console.warn('Product slug is missing.');
    }
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    if (showQuickView) showQuickView();
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsWishlist(!isWishlist);
  };

  return (
    <div className={styles.productCard} onClick={handleRouteToProduct}>
      <div className={styles.imageWrapper} style={{ height }}>
        <img
          src={toOptimizedImage(image)}
          alt={imageAlt}
          className={styles.image}
        />
        <div className={styles.actions}>
          <button onClick={handleFavorite} className={styles.iconBtn}>
            <Icon name={isWishlist ? 'heart-filled' : 'heart'} />
          </button>
          <button onClick={handleQuickView} className={styles.iconBtn}>
            <Icon name="eye" />
          </button>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.priceWrapper}>
          <CurrencyFormatter amount={price} />
          {originalPrice && originalPrice > price && (
            <span className={styles.originalPrice}>
              <CurrencyFormatter amount={originalPrice} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
