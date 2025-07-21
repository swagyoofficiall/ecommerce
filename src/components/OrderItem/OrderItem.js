import React from 'react';
import { formatINR } from '../../helpers/currency';
import { toOptimizedImage } from '../../helpers/general';

import * as styles from './OrderItem.module.css';
import { isAuth } from '../../helpers/general';

const OrderItem = ({ order, headerStyling }) => {
  const {
    id,
    created_at,
    updated_at,
    status,
    billing_name,
    shipping_address,
    total_amount,
    products = [],
  } = order;

  const user = isAuth();
  const isAdmin = user?.email === 'swagyoofficial@gmail.com';

  return (
    <div className={styles.orderItemContainer}>
      <div className={`${styles.orderHeader} ${headerStyling}`}>
        <span>#{id}</span>
        <span>{new Date(created_at).toLocaleDateString()}</span>
        <span>{new Date(updated_at).toLocaleDateString()}</span>
        <span>{status}</span>
      </div>

      <div className={styles.detailsContainer}>
        <div className={styles.shippingBilling}>
          <div>
            <strong>Billing Name:</strong>
            <p>{billing_name}</p>
          </div>
          <div>
            <strong>Shipping Address:</strong>
            <p>{shipping_address}</p>
          </div>
        </div>

        <div className={styles.productList}>
          {products.map((product, index) => (
            <div key={index} className={styles.productItem}>
              <img
                src={toOptimizedImage(product.image)}
                alt={product.name}
                className={styles.productImage}
              />
              <div>
                <p><strong>{product.name}</strong></p>
                <p>Qty: {product.quantity}</p>
                <p>Price: {formatINR(product.price)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.totalContainer}>
          <strong>Total:</strong> {formatINR(total_amount)}
        </div>

        {isAdmin && (
          <div className={styles.adminControls}>
            <button>Edit Order</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
