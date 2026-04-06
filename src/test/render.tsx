import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as reactRender } from '@testing-library/react';
import type { ReactNode } from 'react';

export function render(ui: ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return {
    ...reactRender(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>),
  };
}
