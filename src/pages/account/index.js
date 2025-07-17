import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

const AccountIndexPage = () => {
  useEffect(() => {
    // Redirect to the user's order history page
    navigate('/account/orders/');
  }, []);

  return null; // No visible content since it's just a redirect
};

export default AccountIndexPage;
