// src/helpers/currency.js

export default function formatCurrency(amount) {
  if (typeof amount !== 'number') return '₹0.00';

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
}
