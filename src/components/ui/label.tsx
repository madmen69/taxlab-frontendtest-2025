/* eslint-disable jsx-a11y/label-has-associated-control */
import { type LabelHTMLAttributes } from 'react';

import { cn } from '@/utils/classnames';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...props }: LabelProps) {
  return <label className={cn('text-sm font-medium text-muted', className)} {...props} />;
}
