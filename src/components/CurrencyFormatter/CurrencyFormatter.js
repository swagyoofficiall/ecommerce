import React from 'react';
import { isNumeric } from '../../helpers/general';

const CurrencyFormatter = ({ amount, appendZero = false }) => {
  let displayAmount =
    (typeof amount !== 'number' && parseFloat(amount?.replace(/[^0-9.]/g, ''))) ||
    amount;

  const formatObject = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: appendZero ? 2 : 0,
    maximumFractionDigits: 2,
  });

  let formattedPrice = formatObject.format(displayAmount);

  return isNumeric(amount) ? (
    <span>{formattedPrice}</span>
  ) : (
    'No price available'
  );
};

export default CurrencyFormatter;
