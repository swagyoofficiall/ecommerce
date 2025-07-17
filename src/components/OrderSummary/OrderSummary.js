import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';

import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import CurrencyFormatter from '../CurrencyFormatter';

import * as styles from './OrderSummary.module.css';

// Currency conversion rates (replace with API later if needed)
const conversionRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
};

const OrderSummary = ({ cartTotal = 0, applyCoupon = () => {}, appliedDiscount = 0 }) => {
  const [couponCode, setCouponCode] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [discountError, setDiscountError] = useState('');
  const [finalTotal, setFinalTotal] = useState(cartTotal);

  useEffect(() => {
    const totalAfterDiscount = Math.max(0, cartTotal - appliedDiscount);
    setFinalTotal(totalAfterDiscount);
  }, [cartTotal, appliedDiscount]);

  const convertAmount = (amountInINR) => {
    const rate = conversionRates[currency] || 1;
    return amountInINR * rate;
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setDiscountError('Please enter a coupon code');
      return;
    }

    setDiscountError('');
    applyCoupon(couponCode);
  };

  return (
    <div className={styles.root}>
      <div className={styles.orderSummary}>
        <span className={styles.title}>Order Summary</span>

        {/* 🌍 Currency Selector */}
        <div style={{ margin: '10px 0' }}>
          <label style={{ fontWeight: 500 }}>Currency:</label>{' '}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
          </select>
        </div>

        {/* Price Breakdown */}
        <div className={styles.calculationContainer}>
          <div className={styles.labelContainer}>
            <span>Subtotal</span>
            <span>
              <CurrencyFormatter
                amount={convertAmount(cartTotal)}
                currency={currency}
              />
            </span>
          </div>

          {appliedDiscount > 0 && (
            <div className={styles.labelContainer}>
              <span>Discount</span>
              <span>- 
                <CurrencyFormatter
                  amount={convertAmount(appliedDiscount)}
                  currency={currency}
                />
              </span>
            </div>
          )}

          <div className={styles.labelContainer}>
            <span>Shipping</span>
            <span>—</span>
          </div>

          <div className={styles.labelContainer}>
            <span>Tax</span>
            <span>—</span>
          </div>
        </div>

        {/* Coupon Input */}
        <div className={styles.couponContainer}>
          <span>Coupon Code</span>
          <FormInputField
            value={couponCode}
            handleChange={(_, val) => setCouponCode(val)}
            id={'couponInput'}
            icon={'arrow'}
          />
          <Button
            onClick={handleApplyCoupon}
            fullWidth
            level={'secondary'}
            style={{ marginTop: '8px' }}
          >
            Apply Coupon
          </Button>
          {discountError && (
            <div style={{ color: 'red', marginTop: '5px' }}>{discountError}</div>
          )}
        </div>

        {/* Total After Discount */}
        <div className={styles.totalContainer}>
          <span>Total:</span>
          <span>
            <CurrencyFormatter
              amount={convertAmount(finalTotal)}
              currency={currency}
            />
          </span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className={styles.actionContainer}>
        <Button
          onClick={() => navigate('/orderConfirm')}
          fullWidth
          level={'primary'}
        >
          Checkout
        </Button>
        <div className={styles.linkContainer}>
          <Link to="/shop">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
