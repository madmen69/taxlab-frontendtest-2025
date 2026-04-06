import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DataLabel } from '@/components/ui/dataLabel';
import type { BreakDown } from '../../typings';
import { formatNZD } from '../../lib/taxCalculator';
import { TaxBreakdownRow } from './TaxBreakdownRow';

export type TaxBreakdownProps = {
  breakdown: BreakDown;
};

export function TaxBreakdown({ breakdown }: TaxBreakdownProps) {
  return (
    <Card className="animate-fadeInUp">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-text">Tax estimate</h2>
            <p className="mt-1 text-sm text-muted">Progressive tax rate</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted">Effective rate</div>
            <div className="text-xl font-semibold text-text">
              {(breakdown.effectiveRate * 100).toFixed(2)}%
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0 space-y-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <DataLabel label="Taxable income" value={formatNZD(breakdown.taxableIncome)} />
          <div className="hidden sm:block" />
          <DataLabel label="Estimated tax" value={formatNZD(breakdown.taxEstimate)} highlight />
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-card/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted">Bands</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted">Tax rate</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted">
                  Tax collected
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {breakdown.brackets.map((b) => (
                <TaxBreakdownRow key={`${b.bracketStart}-${b.rate}`} bracket={b} />
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-border/60 bg-card/50">
                <td className="px-4 py-3 text-xs font-medium text-muted" colSpan={2}>
                  Total
                </td>
                <td className="px-4 py-3 text-right text-sm font-semibold text-text">
                  {formatNZD(breakdown.taxEstimate)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
