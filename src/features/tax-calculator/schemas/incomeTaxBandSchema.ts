import { z } from 'zod';

export const incomeTaxBandSchema = z.object({
  bandStart: z.coerce.number(),
  bandEnd: z.coerce.number().nullable(),
  taxRate: z.coerce.number(),
});
