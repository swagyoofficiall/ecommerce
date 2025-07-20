import React, { useState } from 'react';
import * as styles from './ProductCardGrid.module.css';

import Drawer from '../Drawer';
import ProductCard from '../ProductCard';
import QuickView from '../QuickView';
import Slider from '../Slider';
import CurrencyFormatter from '../CurrencyFormatter';

const ProductCardGrid = (props) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const { height, columns = 3, data = [], spacing, showSlider = false } = props;

  const columnCount = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  };

  const renderCards = () => {
    return data.map((product, index) => (
      <ProductCard
        key={index}
        height={height}
        price={<CurrencyFormatter amount={product.price} />}
        imageAlt={product.name}
        name={product.name}
        image={product.image_url}
        meta={product.description || product.meta}
        originalPrice={
          product.original_price ? (
            <CurrencyFormatter amount={product.original_price} />
          ) : null
        }
        slug={product.slug || product.id}
        showQuickView={() => setShowQuickView(true)}
      />
    ));
  };

  return (
    <div className={styles.root} style={columnCount}>
      <div
        className={`${styles.cardGrid} ${
          showSlider === false ? styles.show : ''
        }`}
        style={columnCount}
      >
        {data.length > 0 ? renderCards() : <p>No products found.</p>}
      </div>

      {showSlider === true && (
        <div className={styles.mobileSlider}>
          <Slider spacing={spacing}>{renderCards()}</Slider>
        </div>
      )}

      <Drawer visible={showQuickView} close={() => setShowQuickView(false)}>
        <QuickView close={() => setShowQuickView(false)} />
      </Drawer>
    </div>
  );
};

export default ProductCardGrid;
