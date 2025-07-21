import React, { useState } from 'react';
import Drawer from '../Drawer';
import QuickView from '../QuickView';
import * as styles from './FavoriteCard.module.css';
import { toOptimizedImage } from '../../helpers/general';

const FavoriteCard = ({ data, showConfirmDialog }) => {
  const [showQuickView, setShowQuickView] = useState(false);

  const { color, size, products } = data;
  const productTitle = products?.title || 'Untitled';
  const image = products?.image || '/default.jpg';
  const alt = products?.alt_text || 'Product';

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.imageContainer}>
          <img src={toOptimizedImage(image)} alt={alt} />
        </div>
        <div className={styles.metaContainer}>
          <strong>{productTitle}</strong>
          <span>Color: {color}</span>
          <span>Size: {size}</span>
        </div>
      </div>

      <div className={styles.actionContainer}>
        <span role="presentation" onClick={() => setShowQuickView(true)}>Edit</span>
        <span role="presentation" onClick={showConfirmDialog}>Remove</span>
      </div>

      <Drawer visible={showQuickView} close={() => setShowQuickView(false)}>
        <QuickView
          buttonTitle="Update Favorite"
          close={() => setShowQuickView(false)}
          favoriteData={data}
        />
      </Drawer>
    </div>
  );
};

export default FavoriteCard;
