import React from 'react';
import Attribute from '../Attribute';
import * as styles from './AttributeGrid.module.css';

const AttributeGrid = () => {
  return (
    <div className={styles.root}>
      <Attribute
        icon="delivery"
        title="Free delivery only above 1500"
        subtitle="Click to learn more"
      />
      <Attribute
        icon="cycle"
        title="Returns"
        subtitle="Return goods in 3 days"
      />
      <Attribute
        icon="creditcard"
        title="Secured payment"
        subtitle="Shop safely"
      />
    </div>
  );
};

export default AttributeGrid;
