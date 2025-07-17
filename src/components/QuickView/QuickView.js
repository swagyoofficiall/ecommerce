import React, { useState, useContext } from 'react';

import Button from '../Button';
import CurrencyFormatter from '../CurrencyFormatter';
import SizeList from '../SizeList';
import SwatchList from '../SwatchList';

import AddItemNotificationContext from '../../context/AddItemNotificationProvider';
import * as styles from './QuickView.module.css';
import { toOptimizedImage } from '../../helpers/general';

const QuickView = (props) => {
  const {
    close,
    buttonTitle = 'Add to Bag',
    product, // 💡 product is passed as a prop
  } = props;

  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;

  const [activeSwatch, setActiveSwatch] = useState(
    product?.colorOptions?.[0] || ''
  );
  const [activeSize, setActiveSize] = useState(
    product?.sizeOptions?.[0] || ''
  );

  const handleAddToBag = () => {
    close();
    showNotification();
  };

  if (!product) return null;

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <h4>Select Options</h4>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.productContainer}>
          <span className={styles.productName}>{product.name}</span>
          <div className={styles.price}>
            <CurrencyFormatter amount={product.price} />
          </div>
          <div className={styles.productImageContainer}>
            <img
              alt={product.alt}
              src={toOptimizedImage(product.image)}
            />
          </div>
        </div>

        <div className={styles.sectionContainer}>
          <SwatchList
            swatchList={product.colorOptions}
            activeSwatch={activeSwatch}
            setActiveSwatch={setActiveSwatch}
          />
        </div>

        <div className={styles.sectionContainer}>
          <SizeList
            sizeList={product.sizeOptions}
            activeSize={activeSize}
            setActiveSize={setActiveSize}
          />
        </div>

        <Button onClick={handleAddToBag} fullWidth level="primary">
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};

export default QuickView;
