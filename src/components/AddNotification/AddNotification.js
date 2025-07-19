import { Link } from 'gatsby';
import React, { useContext } from 'react';

import AddItemNotificationContext from '../../context/AddItemNotificationProvider';

import Button from '../Button';
import Icon from '../Icons/Icon';

import * as styles from './AddNotification.module.css';
import { toOptimizedImage } from '../../helpers/general';

const AddNotification = (props) => {
  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotif = ctxAddItemNotification.state?.open;
  const product = ctxAddItemNotification.state?.item;

  if (!product) return null; // no product added

  return (
    <div
      className={`${styles.root} ${
        showNotif === true ? styles.show : styles.hide
      }`}
    >
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <Icon symbol="check" />
        </div>
        <span>Item added to bag</span>
      </div>

      <div className={styles.newItemContainer}>
        <div className={styles.imageContainer}>
          <img
            alt={product.alt || product.name}
            src={toOptimizedImage(product.image)}
          />
        </div>
        <div className={styles.detailContainer}>
          <span className={styles.name}>{product.name}</span>
          <span className={styles.meta}>Color: {product.color}</span>
          <span className={styles.meta}>Size: {product.size}</span>
        </div>
      </div>

      <div className={styles.actionContainer}>
        <Button onClick={props.openCart} level="secondary">
          view my bag
        </Button>
        <Button level="primary" href="/cart">
          checkout
        </Button>
        <div className={styles.linkContainer}>
          <Link to="/shop">continue shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default AddNotification;
