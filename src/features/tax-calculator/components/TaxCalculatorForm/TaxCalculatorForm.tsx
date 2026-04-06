import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatNZD } from '@/features/tax-calculator/lib/taxCalculator';
import { taxCalculatorInputSchema } from '@/features/tax-calculator/schemas/taxCalculatorSchema';
import { useTaxCalculator } from '@/context/taxCalculator/TaxCalculatorContext';

export function TaxCalculatorForm({
  isBandsLoading,
  isBandsError,
}: {
  isBandsLoading: boolean;
  isBandsError: boolean;
}) {
  const [incomeInput, setIncomeInput] = useState<string>('0');
  const [formError, setFormError] = useState<string | null>(null);

  const { setSalary } = useTaxCalculator();

  const disabled = isBandsLoading || isBandsError;

  return (
    <CardContent className="p-6 pt-0">
      <form
        className="grid gap-5"
        onSubmit={(e) => {
          e.preventDefault();

          const parsed = taxCalculatorInputSchema.safeParse({
            income: incomeInput,
          });

          if (!parsed.success) {
            setFormError(parsed.error.issues[0]?.message ?? 'Invalid input.');
            return;
          }

          setFormError(null);
          setSalary(parsed.data.income);
        }}
      >
        <div className="grid gap-2">
          <Label htmlFor="income">Annual income (NZD)</Label>
          <Input
            id="income"
            inputMode="numeric"
            value={incomeInput}
            onChange={(e) => setIncomeInput(e.target.value)}
            aria-invalid={formError ? true : undefined}
            aria-describedby={formError ? 'error-message' : undefined}
            disabled={disabled}
          />
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs text-muted">
              Example: <span className="font-medium text-text">$100,000</span>
            </p>
            <p className="text-xs text-muted">
              Preview:{' '}
              {Number(incomeInput || 0) > 0 ? formatNZD(Number(incomeInput)) : formatNZD(0)}
            </p>
          </div>
        </div>

        {formError ? (
          <div
            id="error-message"
            role="alert"
            className="rounded-xl border border-red-600/30 bg-red-50 px-4 py-3 text-sm text-red-950"
          >
            {formError}
          </div>
        ) : null}

        {isBandsError ? (
          <div
            role="alert"
            className="rounded-xl border border-red-600/30 bg-red-50 px-4 py-3 text-sm text-red-950"
          >
            Failed to load tax bands. Please refresh.
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" variant="outline" disabled={disabled}>
            {isBandsLoading ? 'Loading bands…' : 'Calculate'}
          </Button>
        </div>
      </form>
    </CardContent>
  );
}
