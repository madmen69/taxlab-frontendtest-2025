import { type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'h-11 w-full rounded-xl border border-border/40 bg-card/60 px-4 text-sm text-text placeholder:text-muted shadow-sm outline-none transition-[border-color,box-shadow,transform] focus-visible:ring-2 focus-visible:ring-primary/45',
        className,
      )}
      {...props}
    />
  );
}
