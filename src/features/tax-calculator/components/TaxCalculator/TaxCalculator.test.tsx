import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import { TaxCalculator } from '@/features/tax-calculator/components/TaxCalculator/TaxCalculator';
import { formatNZD } from '@/features/tax-calculator/lib/taxCalculator';
import { render } from '@/test/render';

let mockBandsQuery: {
  data: Array<{ bandStart: number; bandEnd: number | null; taxRate: number }> | undefined;
  isLoading: boolean;
  isError: boolean;
} = {
  data: [
    { bandStart: 0, bandEnd: 9875, taxRate: 0.1 },
    { bandStart: 9875, bandEnd: 40125, taxRate: 0.12 },
    { bandStart: 40125, bandEnd: null, taxRate: 0.22 },
  ],
  isLoading: false,
  isError: false,
};

vi.mock('@/features/tax-calculator/hooks/useQueryTaxBands', () => {
  return {
    useQueryTaxBands: () => mockBandsQuery,
  };
});

describe('TaxCalculator', () => {
  it('shows a validation error for negative income', async () => {
    const user = userEvent.setup();

    mockBandsQuery = { ...mockBandsQuery, isLoading: false, isError: false };
    render(<TaxCalculator />);

    const incomeInput = screen.getByLabelText('Annual income (NZD)');
    await user.clear(incomeInput);
    await user.type(incomeInput, '-10');

    await user.click(screen.getByRole('button', { name: 'Calculate' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Income must be at least 0.');
  });

  it('renders skeleton while bands are loading', async () => {
    mockBandsQuery = { data: undefined, isLoading: true, isError: false };
    render(<TaxCalculator />);

    expect(screen.getByTestId('tax-result-skeleton')).toBeInTheDocument();
  });

  it('shows a breakdown after calculate', async () => {
    const user = userEvent.setup();
    const income = 100_000;

    mockBandsQuery = {
      data: [
        { bandStart: 0, bandEnd: 9875, taxRate: 0.1 },
        { bandStart: 9875, bandEnd: 40125, taxRate: 0.12 },
        { bandStart: 40125, bandEnd: null, taxRate: 0.22 },
      ],
      isLoading: false,
      isError: false,
    };
    render(<TaxCalculator />);

    const incomeInput = screen.getByLabelText('Annual income (NZD)');
    await user.clear(incomeInput);
    await user.type(incomeInput, String(income));

    await user.click(screen.getByRole('button', { name: 'Calculate' }));

    const totalCell = await screen.findByRole('cell', { name: formatNZD(17_790) });
    expect(totalCell).toBeInTheDocument();
  });
});
