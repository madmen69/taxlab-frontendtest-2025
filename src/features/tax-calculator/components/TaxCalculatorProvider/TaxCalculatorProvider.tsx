import { useCallback, useMemo, useState, type ReactNode } from 'react';
import {
  TaxCalculatorContext,
  type TaxCalculatorContextValue,
} from '@/context/tax-calculator/TaxCalculatorContext';
import type { IncomeTaxBand } from '../../typings';

export interface TaxCalculatorProviderProps {
  bands: IncomeTaxBand[];
  children: ReactNode;
}

export function TaxCalculatorProvider({ bands, children }: TaxCalculatorProviderProps) {
  const [salary, setSalaryState] = useState(0);

  const setSalary = useCallback((value: number) => {
    setSalaryState(value);
  }, []);

  const value = useMemo<TaxCalculatorContextValue>(
    () => ({ salary, bands, setSalary }),
    [salary, bands, setSalary],
  );

  return <TaxCalculatorContext.Provider value={value}>{children}</TaxCalculatorContext.Provider>;
}
