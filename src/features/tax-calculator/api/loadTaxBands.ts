export const loadQueryKey = ['load'] as const;

// Pretends to call a real API (2s delay) and then loads static JSON.
export async function loadTaxBands<T = unknown>(): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch('/income-tax-bands.json', {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to load income tax bands (${response.status} ${response.statusText})`);
  }

  return (await response.json()) as T;
}
