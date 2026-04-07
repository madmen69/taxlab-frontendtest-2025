import { Card, CardHeader } from '@/components/ui/card';

import { TaxCalculatorForm } from '@/features/tax-calculator/components/TaxCalculatorForm/TaxCalculatorForm';
import { TaxCalculatorProvider } from '@/features/tax-calculator/components/TaxCalculatorProvider/TaxCalculatorProvider';
import { TaxCalculatorResults } from '@/features/tax-calculator/components/TaxCalculatorResults/TaxCalculatorResults';
import { TaxResultSkeleton } from '@/features/tax-calculator/components/TaxResultSkeleton/TaxResultSkeleton';
import { useQueryTaxBands } from '@/features/tax-calculator/hooks/useQueryTaxBands';

export function TaxCalculator() {
  const { isLoading, isError, data } = useQueryTaxBands();
  const bands = data ?? [];

  return (
    <TaxCalculatorProvider bands={bands}>
      <div className="grid gap-5">
        <Card className="animate-fadeInUp">
          <CardHeader className="p-6 pb-4">
              <h2 className="text-lg font-semibold text-text">Tax estimator</h2>
          </CardHeader>
          <TaxCalculatorForm isBandsLoading={isLoading} isBandsError={isError} />
        </Card>

        <div>{isLoading ? <TaxResultSkeleton /> : <TaxCalculatorResults />}</div>
      </div>
    </TaxCalculatorProvider>
  );
}
