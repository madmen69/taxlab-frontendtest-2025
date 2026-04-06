import type { BreakDown, TaxEstimateInput } from '../typings';

export function calculateTaxEstimate({ income, bands: loadedBands }: TaxEstimateInput): BreakDown {
  const taxableIncome = Math.max(0, income);
  const bands = loadedBands;

  const brackets: BreakDown['brackets'] = bands.map((b) => {
    const bandFinish = b.bandEnd ?? taxableIncome;
    const amountTaxed = Math.max(0, Math.min(taxableIncome, bandFinish) - b.bandStart);
    return {
      bracketStart: b.bandStart,
      bracketEnd: b.bandEnd,
      rate: b.taxRate,
      amountTaxed,
    };
  });

  const taxEstimate = brackets.reduce((total, b) => total + b.amountTaxed * b.rate, 0);
  const effectiveRate = income > 0 ? taxEstimate / income : 0;

  return {
    taxableIncome,
    taxEstimate,
    effectiveRate,
    brackets,
  };
}

export function formatNZD(amount: number) {
  return amount.toLocaleString('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    maximumFractionDigits: 0,
  });
}
