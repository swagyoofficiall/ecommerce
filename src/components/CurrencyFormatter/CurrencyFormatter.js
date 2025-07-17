// ✅ Multi-currency CurrencyFormatter (your version — confirmed good)
import React from 'react';
import { isNumeric } from '../../helpers/general';

const DEFAULT_CURRENCY = 'INR';
const CURRENCY_LOCALES = {
  INR: 'en-IN',
  USD: 'en-US',
  EUR: 'en-IE',
  GBP: 'en-GB',
  JPY: 'ja-JP',
  AED: 'ar-AE',
  CAD: 'en-CA',
  AUD: 'en-AU',
};

const CurrencyFormatter = ({ amount, currency = DEFAULT_CURRENCY, appendZero = false }) => {
  let displayAmount =
    typeof amount !== 'number'
      ? parseFloat(amount?.toString().replace(/[^0-9.]/g, ''))
      : amount;

  const formatObject = new Intl.NumberFormat(CURRENCY_LOCALES[currency] || 'en-IN', {
    style: 'currency',
    currency: currency || DEFAULT_CURRENCY,
    minimumFractionDigits: appendZero ? 2 : 0,
    maximumFractionDigits: 2,
  });

  let formattedPrice = isNumeric(displayAmount) ? formatObject.format(displayAmount) : 'No price available';

  return <span>{formattedPrice}</span>;
};

export default CurrencyFormatter;
