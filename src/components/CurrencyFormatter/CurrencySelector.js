import React from 'react';
import { useCurrency } from './CurrencyContext';

const currencies = [
  { code: 'INR', label: '₹ INR' },
  { code: 'USD', label: '$ USD' },
  { code: 'EUR', label: '€ EUR' },
  { code: 'GBP', label: '£ GBP' },
  { code: 'AED', label: 'د.إ AED' },
  { code: 'JPY', label: '¥ JPY' },
  { code: 'CAD', label: 'C$ CAD' },
  { code: 'AUD', label: 'A$ AUD' },
];

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div style={{ marginBottom: '1rem' }}>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        style={{
          padding: '8px',
          fontSize: '14px',
          borderRadius: '6px',
        }}
      >
        {currencies.map((curr) => (
          <option key={curr.code} value={curr.code}>
            {curr.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
