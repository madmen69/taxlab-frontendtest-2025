import {
  TaxCalculatorContext,
  type TaxCalculatorContextValue,
  type TaxCalculatorProviderProps,
} from '@/context/taxCalculator/TaxCalculatorContext';
import { useCallback, useMemo, useState } from 'react';

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
