import React from 'react';
import { NotificationProvider } from './src/context/AddItemNotificationProvider';
import { CurrencyProvider } from './src/components/CurrencyFormatter/CurrencyContext';

export const wrapRootElement = ({ element }) => (
  <CurrencyProvider>
    <NotificationProvider>
      {element}
    </NotificationProvider>
  </CurrencyProvider>
);
