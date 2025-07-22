import React, { useContext } from 'react';
import { CurrencyContext } from '../../context/CurrencyContext';

const CurrencySelector = () => {
  // Safe fallback for SSR (Static Site Generation)
  const context = useContext(CurrencyContext) || {};
  const { currency = 'INR', changeCurrency = () => {} } = context;

  const currencies = [
    { label: 'INR ₹', value: 'INR' },
    { label: 'USD $', value: 'USD' },
    { label: 'EUR €', value: 'EUR' },
    { label: 'AED د.إ', value: 'AED' },
    { label: 'GBP £', value: 'GBP' },
  ];

  return (
    <select
      onChange={(e) => changeCurrency(e.target.value)}
      value={currency}
      style={{ padding: '4px', borderRadius: '5px', margin: '10px' }}
    >
      {currencies.map((curr) => (
        <option key={curr.value} value={curr.value}>
          {curr.label}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
