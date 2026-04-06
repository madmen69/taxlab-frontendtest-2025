import { TaxBreakdown } from '@/features/tax-calculator/components/TaxBreakdown/TaxBreakdown';
import { calculateTaxEstimate } from '@/features/tax-calculator/lib/taxCalculator';
import { useTaxCalculator } from '@/context/taxCalculator/TaxCalculatorContext';

export function TaxCalculatorResults() {
  const { salary, bands } = useTaxCalculator();

  if (salary <= 0) return null;

  const breakdown = calculateTaxEstimate({ income: salary, bands });

  return <TaxBreakdown breakdown={breakdown} />;
}
