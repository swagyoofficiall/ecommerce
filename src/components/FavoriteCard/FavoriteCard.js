import React, { useState } from 'react';

import Drawer from '../Drawer';
import QuickView from '../QuickView';

import * as styles from './FavoriteCard.module.css';
import { toOptimizedImage } from '../../helpers/general';

const FavoriteCard = (props) => {
  const {
    color,
    size,
    img,
    alt,
    product_name,
    showConfirmDialog,
  } = props;

  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.imageContainer}>
          <img src={toOptimizedImage(img)} alt={alt || product_name} />
        </div>
        <div className={styles.metaContainer}>
          <h4>{product_name}</h4>
          <span>Color: {color}</span>
          <span>Size: {size}</span>
        </div>
      </div>

      <div className={styles.actionContainer}>
        <span role="presentation" onClick={() => setShowQuickView(true)}>
          Edit
        </span>
        <span role="presentation" onClick={showConfirmDialog}>
          Remove
        </span>
      </div>

      <Drawer visible={showQuickView} close={() => setShowQuickView(false)}>
        <QuickView
          buttonTitle="Update Favorite"
          close={() => setShowQuickView(false)}
        />
      </Drawer>
    </div>
  );
};

export default FavoriteCard;
