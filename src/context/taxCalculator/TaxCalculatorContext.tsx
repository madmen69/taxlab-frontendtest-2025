import { createContext, useContext, type ReactNode } from 'react';

import type { IncomeTaxBand } from '@/features/tax-calculator/typings';

export interface TaxCalculatorContextValue {
  salary: number;
  bands: IncomeTaxBand[];
  setSalary: (salary: number) => void;
}

export const TaxCalculatorContext = createContext<TaxCalculatorContextValue | null>(null);

export interface TaxCalculatorProviderProps {
  bands: IncomeTaxBand[];
  children: ReactNode;
}

export function useTaxCalculator() {
  const ctx = useContext(TaxCalculatorContext);
  if (!ctx) {
    throw new Error('useTaxCalculator must be used within a TaxCalculatorProvider');
  }
  return ctx;
}
