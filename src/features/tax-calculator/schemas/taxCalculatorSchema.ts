import { z } from 'zod';

export const taxCalculatorInputSchema = z.object({
  income: z
    .preprocess(
      (v) => {
        if (typeof v === 'string') {
          const trimmed = v.trim();
          if (trimmed === '') return NaN;
          return Number(trimmed);
        }
        return v;
      },
      z
        .number()
        .refine((v) => Number.isFinite(v), { message: 'Enter a valid number.' })
        .min(0, { message: 'Income must be at least 0.' }),
    )
    .transform((v) => Math.round(v)),
});
