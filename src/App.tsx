import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppShell } from '@/components/layout/AppShell';
import { TaxCalculator } from '@/features/tax-calculator/components/TaxCalculator/TaxCalculator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell>
        <header className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-[148px]">
                <img
                  src={'/taxlab-logo.svg'}
                  alt="TaxLab"
                  className="h-8 w-auto select-none"
                  draggable={false}
                />
              </div>
              <div>
                <p className="mt-1 text-sm text-muted">
                  Solve every piece of the tax compliance process
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-8">
          <TaxCalculator />
        </div>

        <footer className="mt-10 text-center text-xs text-muted">
          Tax lab front end test 2025
        </footer>
      </AppShell>
    </QueryClientProvider>
  );
}
