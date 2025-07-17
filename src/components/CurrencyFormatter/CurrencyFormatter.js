import React, { useContext } from 'react';
import { CurrencyContext } from '../../context/CurrencyContext';
import { isNumeric } from '../../helpers/general';

const CurrencyFormatter = ({ amount, appendZero = false }) => {
  const { currency } = useContext(CurrencyContext);

  let displayAmount =
    (typeof amount !== 'number' && parseFloat(amount?.replace(/[^0-9.]/g, ''))) ||
    amount;

  const languageCode =
    typeof window !== 'undefined' ? window.navigator.language : 'en-IN';

  const formatObject = new Intl.NumberFormat(languageCode, {
    style: 'currency',
    currency,
    minimumFractionDigits: appendZero ? 2 : 0,
    maximumFractionDigits: 2,
  });

  let formattedPrice = formatObject.format(displayAmount);

  return isNumeric(amount) ? (
    <>
      <span>{formattedPrice}</span>
    </>
  ) : (
    'No price available'
  );
};

export default CurrencyFormatter;
