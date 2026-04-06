export type DataLabelProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

export function DataLabel({ label, value, highlight = false }: DataLabelProps) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/50 p-4">
      <div className="text-xs text-muted">{label}</div>
      <div className={`mt-1 text-sm font-semibold ${highlight ? 'text-primary' : 'text-text'}`}>
        {value}
      </div>
    </div>
  );
}
