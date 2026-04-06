import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { calculateTaxEstimate } from '@/features/tax-calculator/lib/taxCalculator';
import { TaxBreakdown } from '@/features/tax-calculator/components/TaxBreakdown/TaxBreakdown';

describe('TaxBreakdown', () => {
  it('renders key summary labels', () => {
    const breakdown = calculateTaxEstimate({
      income: 100_000,
      bands: [
        { bandStart: 0, bandEnd: 9875, taxRate: 0.1 },
        { bandStart: 9875, bandEnd: 40125, taxRate: 0.12 },
        { bandStart: 40125, bandEnd: null, taxRate: 0.22 },
      ],
    });

    render(<TaxBreakdown breakdown={breakdown} />);

    expect(screen.getByText('Tax estimate')).toBeInTheDocument();
    expect(screen.getByText('Estimated tax')).toBeInTheDocument();
    expect(screen.getByText('Taxable income')).toBeInTheDocument();
  });
});
