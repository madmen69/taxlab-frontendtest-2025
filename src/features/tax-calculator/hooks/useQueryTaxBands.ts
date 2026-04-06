import { useQuery } from '@tanstack/react-query';

import { loadQueryKey, loadTaxBands } from '../api/loadTaxBands';
import type { IncomeTaxBand } from '../typings';
import { incomeTaxBandSchema } from '../schemas/incomeTaxBandSchema';

export function useQueryTaxBands() {
  return useQuery<IncomeTaxBand[], Error>({
    queryKey: loadQueryKey,
    queryFn: async () => {
      const json = await loadTaxBands();
      return incomeTaxBandSchema.array().parse(json);
    },
  });
}
