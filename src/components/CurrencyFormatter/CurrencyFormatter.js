import React, { useEffect, useState } from 'react';
import { isNumeric } from '../../helpers/general';

const supportedCurrencies = ['INR', 'USD', 'EUR', 'GBP', 'AED', 'SAR', 'JPY', 'CAD'];

const CurrencyFormatter = ({
  amount,
  appendZero = false,
  showSelector = false, // ✅ You can enable dropdown wherever needed
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('selectedCurrency') || 'INR';
      setSelectedCurrency(stored);
    }
  }, []);

  const handleCurrencyChange = (e) => {
    const val = e.target.value;
    setSelectedCurrency(val);
    localStorage.setItem('selectedCurrency', val);
  };

  const languageCode =
    typeof window !== 'undefined'
      ? window.navigator.language || 'en-IN'
      : 'en-IN';

  let displayAmount =
    (typeof amount !== 'number' && parseFloat(amount?.replace(/[^0-9.]/g, ''))) ||
    amount;

  const formatObject = new Intl.NumberFormat(languageCode, {
    style: 'currency',
    currency: selectedCurrency,
    minimumFractionDigits: appendZero ? 2 : 0,
    maximumFractionDigits: 2,
  });

  let symbol = selectedCurrency === 'INR' ? '₹' : selectedCurrency;
  let formattedPrice = formatObject.format(displayAmount);

  if ('formatToParts' in formatObject) {
    const parts = formatObject.formatToParts(displayAmount);
    const currencySymbol = parts.find((p) => p.type === 'currency');
    const decimalValue = parts.find((p) => p.type === 'fraction');

    if (currencySymbol) {
      symbol = selectedCurrency === 'INR' ? '₹' : currencySymbol.value;
    }

    formattedPrice = parts
      .filter((p) => p.type !== 'currency')
      .map((p) => p.value)
      .join('');

    if (decimalValue && decimalValue.value === '00' && !appendZero) {
      formattedPrice = formattedPrice.replace(`.${decimalValue.value}`, '');
    }
  }

  return isNumeric(amount) ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>{symbol}{formattedPrice}</span>
      {showSelector && (
        <select
          style={{
            padding: '2px 6px',
            borderRadius: '6px',
            fontSize: '12px',
            cursor: 'pointer',
          }}
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          {supportedCurrencies.map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
      )}
    </div>
  ) : (
    'No price available'
  );
};

export default CurrencyFormatter;
