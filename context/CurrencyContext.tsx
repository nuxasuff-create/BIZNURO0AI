import React, { createContext, useContext, useState } from 'react';

interface CurrencyContextType {
  currencySymbol: string;
  setCurrencySymbol: (symbol: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currencySymbol, setCurrencySymbol] = useState<string>('৳'); // Default to BDT symbol

  return (
    <CurrencyContext.Provider value={{ currencySymbol, setCurrencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within a CurrencyProvider');
  return context;
};
