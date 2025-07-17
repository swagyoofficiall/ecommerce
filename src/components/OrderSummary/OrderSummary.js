import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';

import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import CurrencyFormatter from '../CurrencyFormatter';

import * as styles from './OrderSummary.module.css';

// Currency conversion rates (dummy, replace with API later if needed)
const conversionRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
};

const OrderSummary = ({ cartTotal = 0 }) => {
  const [coupon, setCoupon] = useState('');
  const [giftCard, setGiftCard] = useState('');
  const [currency, setCurrency] = useState('INR');

  // Convert based on selected currency
  const convertAmount = (amountInINR) => {
    const rate = conversionRates[currency] || 1;
    return amountInINR * rate;
  };

  const formattedSubtotal = convertAmount(cartTotal);
  const formattedTax = convertAmount(0); // Future: apply tax logic

  return (
    <div className={styles.root}>
      <div className={styles.orderSummary}>
        <span className={styles.title}>order summary</span>

        {/* 🌍 Currency Switcher */}
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

        <div className={styles.calculationContainer}>
          <div className={styles.labelContainer}>
            <span>Subtotal</span>
            <span>
              <CurrencyFormatter
                amount={formattedSubtotal}
                currency={currency}
              />
            </span>
          </div>
          <div className={styles.labelContainer}>
            <span>Shipping</span>
            <span>---</span>
          </div>
          <div className={styles.labelContainer}>
            <span>Tax</span>
            <span>
              <CurrencyFormatter amount={formattedTax} currency={currency} />
            </span>
          </div>
        </div>

        <div className={styles.couponContainer}>
          <span>Coupon Code</span>
          <FormInputField
            value={coupon}
            handleChange={(_, val) => setCoupon(val)}
            id={'couponInput'}
            icon={'arrow'}
          />
          <span>Gift Card</span>
          <FormInputField
            value={giftCard}
            handleChange={(_, val) => setGiftCard(val)}
            id={'giftCardInput'}
            icon={'arrow'}
          />
        </div>

        <div className={styles.totalContainer}>
          <span>Total:</span>
          <span>
            <CurrencyFormatter
              amount={formattedSubtotal + formattedTax}
              currency={currency}
            />
          </span>
        </div>
      </div>

      <div className={styles.actionContainer}>
        <Button
          onClick={() => navigate('/orderConfirm')}
          fullWidth
          level={'primary'}
        >
          checkout
        </Button>
        <div className={styles.linkContainer}>
          <Link to="/shop">CONTINUE SHOPPING</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
