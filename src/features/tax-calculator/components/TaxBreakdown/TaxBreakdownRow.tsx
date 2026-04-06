import { formatNZD } from '../../lib/taxCalculator';
import type { BreakDown } from '../../typings';

export type TaxBreakdownRowProps = {
  bracket: BreakDown['brackets'][number];
};

export function TaxBreakdownRow({ bracket }: TaxBreakdownRowProps) {
  const isActive = bracket.amountTaxed > 0;
  const bandLabel =
    bracket.bracketEnd !== null
      ? `${formatNZD(bracket.bracketStart)} – ${formatNZD(bracket.bracketEnd)}`
      : `${formatNZD(bracket.bracketStart)} and over`;

  return (
    <tr className={isActive ? 'bg-card/30' : 'opacity-40'}>
      <td className="px-4 py-3 text-xs text-muted">
        <div className="flex items-center gap-2">{bandLabel}</div>
      </td>
      <td className="px-4 py-3 text-right text-xs text-muted">
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            isActive ? 'bg-primary/10 text-primary' : 'bg-border/20 text-muted'
          }`}
        >
          {(bracket.rate * 100).toFixed(2)}%
        </span>
      </td>
      <td className="px-4 py-3 text-right text-xs font-medium text-text">
        {isActive ? formatNZD(bracket.amountTaxed * bracket.rate) : '—'}
      </td>
    </tr>
  );
}
