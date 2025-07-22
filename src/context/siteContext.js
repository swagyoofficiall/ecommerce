import React, { createContext, useContext } from 'react';

export const SiteContext = createContext();

export const useSiteContext = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteContext must be used within a SiteProvider');
  }
  return context;
};

export const SiteProvider = ({ children, value }) => {
  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
};
