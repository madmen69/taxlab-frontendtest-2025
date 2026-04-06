import { describe, it, expect } from 'vitest';
import { calculateTaxEstimate, formatNZD } from './taxCalculator';
import type { TaxEstimateInput } from '../typings';

const bands: TaxEstimateInput['bands'] = [
  { bandStart: 0, bandEnd: 14000, taxRate: 0.115 },
  { bandStart: 14000, bandEnd: 48000, taxRate: 0.21 },
  { bandStart: 48000, bandEnd: 70000, taxRate: 0.315 },
  { bandStart: 70000, bandEnd: null, taxRate: 0.355 },
];

describe('calculateTaxEstimate', () => {
  describe('$100,000 — full breakdown', () => {
    const result = calculateTaxEstimate({ income: 100000, bands });

    it('returns correct taxEstimate', () => {
      expect(result.taxEstimate).toBeCloseTo(26330);
    });

    it('returns correct effectiveRate', () => {
      expect(result.effectiveRate).toBeCloseTo(0.2633, 4);
    });

    it('returns correct taxableIncome', () => {
      expect(result.taxableIncome).toBe(100000);
    });

    it('returns correct amountTaxed per bracket', () => {
      expect(result.brackets[0].amountTaxed).toBe(14000);
      expect(result.brackets[1].amountTaxed).toBe(34000);
      expect(result.brackets[2].amountTaxed).toBe(22000);
      expect(result.brackets[3].amountTaxed).toBe(30000);
    });

    it('returns correct tax collected per bracket', () => {
      expect(result.brackets[0].amountTaxed * result.brackets[0].rate).toBeCloseTo(1610);
      expect(result.brackets[1].amountTaxed * result.brackets[1].rate).toBeCloseTo(7140);
      expect(result.brackets[2].amountTaxed * result.brackets[2].rate).toBeCloseTo(6930);
      expect(result.brackets[3].amountTaxed * result.brackets[3].rate).toBeCloseTo(10650);
    });

    it('returns 4 brackets', () => {
      expect(result.brackets).toHaveLength(4);
    });
  });

  describe('$10,000 — within first band only', () => {
    const result = calculateTaxEstimate({ income: 10000, bands });

    it('only taxes first bracket', () => {
      expect(result.brackets[0].amountTaxed).toBe(10000);
      expect(result.brackets[1].amountTaxed).toBe(0);
      expect(result.brackets[2].amountTaxed).toBe(0);
      expect(result.brackets[3].amountTaxed).toBe(0);
    });

    it('returns correct taxEstimate', () => {
      expect(result.taxEstimate).toBeCloseTo(1150);
    });

    it('returns correct effectiveRate', () => {
      expect(result.effectiveRate).toBeCloseTo(0.115, 4);
    });
  });

  describe('$14,000 — exactly on band boundary', () => {
    const result = calculateTaxEstimate({ income: 14_000, bands });

    it('only taxes first bracket', () => {
      expect(result.brackets[0].amountTaxed).toBe(14000);
      expect(result.brackets[1].amountTaxed).toBe(0);
    });

    it('returns correct taxEstimate', () => {
      expect(result.taxEstimate).toBeCloseTo(1610);
    });
  });

  describe('$70,001 — spans all bands', () => {
    const result = calculateTaxEstimate({ income: 70001, bands });

    it('taxes all four brackets', () => {
      result.brackets.forEach((b) => expect(b.amountTaxed).toBeGreaterThan(0));
    });

    it('top bracket only taxes $1', () => {
      expect(result.brackets[3].amountTaxed).toBe(1);
    });
  });

  describe('$0 — zero income', () => {
    const result = calculateTaxEstimate({ income: 0, bands });

    it('returns zero taxEstimate', () => {
      expect(result.taxEstimate).toBe(0);
    });

    it('returns zero effectiveRate', () => {
      expect(result.effectiveRate).toBe(0);
    });

    it('returns zero amountTaxed for all brackets', () => {
      result.brackets.forEach((b) => expect(b.amountTaxed).toBe(0));
    });
  });

  describe('negative income', () => {
    const result = calculateTaxEstimate({ income: -5000, bands });

    it('clamps taxableIncome to 0', () => {
      expect(result.taxableIncome).toBe(0);
    });

    it('returns zero taxEstimate', () => {
      expect(result.taxEstimate).toBe(0);
    });
  });
});

describe('formatNZD', () => {
  it('formats whole numbers with $ and no decimals', () => {
    expect(formatNZD(100000)).toBe('$100,000');
  });

  it('formats zero', () => {
    expect(formatNZD(0)).toBe('$0');
  });

  it('rounds decimals', () => {
    expect(formatNZD(1610.5)).toBe('$1,611');
  });

  it('formats small amounts', () => {
    expect(formatNZD(14)).toBe('$14');
  });

  it('formats negative amounts', () => {
    expect(formatNZD(-500)).toBe('-$500');
  });
});
