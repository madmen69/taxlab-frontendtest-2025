import { cva, type VariantProps } from 'class-variance-authority';
import { type ButtonHTMLAttributes } from 'react';

import { cn } from '@/utils/classnames';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-[transform,background-color,box-shadow,filter,opacity] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 ring-offset-2 ring-offset-card',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white shadow-[0_10px_30px_rgba(124,58,237,0.35)] hover:brightness-105 active:scale-[0.99] dark:text-slate-950',
        secondary: 'bg-primary/10 text-text hover:bg-primary/15',
        ghost: 'bg-transparent text-muted hover:bg-primary/10',
        outline: 'border border-border bg-transparent text-text hover:bg-primary cursor-pointer',
        destructive: 'bg-red-600 text-white hover:brightness-110',
      },
      size: {
        default: 'h-11 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-12 px-6',
        icon: 'h-11 w-11 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type, ...props }: ButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
