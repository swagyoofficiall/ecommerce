import React from 'react';
import { isNumeric } from '../../helpers/general';

const CurrencyFormatter = ({
  amount,
  appendZero = false,
}) => {
  const selectedCurrency =
    typeof window !== 'undefined'
      ? localStorage.getItem('selectedCurrency') || 'INR'
      : 'INR';

  let displayAmount =
    (typeof amount !== 'number' && parseFloat(amount?.replace(/[^0-9.]/g, ''))) ||
    amount;

  const languageCode =
    typeof window !== 'undefined'
      ? window.navigator.language || 'en-IN'
      : 'en-IN';

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
    <>
      <span>{symbol}</span>
      <span>{formattedPrice}</span>
    </>
  ) : (
    'No price available'
  );
};

export default CurrencyFormatter;
