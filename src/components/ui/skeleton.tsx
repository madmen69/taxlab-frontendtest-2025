import { type HTMLAttributes } from 'react';

import { cn } from '@/utils/classnames';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('animate-pulse rounded-xl !bg-gray-300 shadow-sm', className)} {...props} />
  );
}
