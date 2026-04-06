import { z } from 'zod';
import type { incomeTaxBandSchema } from '../schemas/incomeTaxBandSchema';
import type { taxCalculatorInputSchema } from '../schemas/taxCalculatorSchema';

export type IncomeTaxBand = z.infer<typeof incomeTaxBandSchema>;
export type TaxCalculatorInput = z.infer<typeof taxCalculatorInputSchema>;

export type TaxEstimateInput = {
  income: number;
  bands: IncomeTaxBand[];
};

export type BreakDown = {
  taxableIncome: number;
  taxEstimate: number;
  effectiveRate: number;
  brackets: Array<{
    bracketStart: number;
    bracketEnd: number | null;
    rate: number;
    amountTaxed: number;
  }>;
};
