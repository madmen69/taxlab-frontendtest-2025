import { type ReactNode } from 'react';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-float" />
        <div className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-primary2/25 blur-3xl animate-float [animation-delay:1.2s]" />
        <div className="absolute left-1/2 top-[70%] h-56 w-56 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl animate-float [animation-delay:2.2s]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 py-10">{children}</div>
    </div>
  );
}
