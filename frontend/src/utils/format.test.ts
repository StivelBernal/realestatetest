import { formatCurrency } from './format';

describe('Format Utils', () => {
  describe('formatCurrency', () => {
    it('should format a number to USD currency', () => {
      const result = formatCurrency(1000000);
      expect(result).toBe('$1,000,000');
    });

    it('should format zero correctly', () => {
      const result = formatCurrency(0);
      expect(result).toBe('$0');
    });

    it('should format decimal numbers correctly', () => {
      const result = formatCurrency(1500.99);
      expect(result).toBe('$1,500.99');
    });

    it('should format negative numbers correctly', () => {
      const result = formatCurrency(-500);
      expect(result).toBe('-$500');
    });

    it('should format large numbers with proper commas', () => {
      const result = formatCurrency(850000000);
      expect(result).toBe('$850,000,000');
    });

    it('should handle edge case of very small decimal', () => {
      const result = formatCurrency(0.50);
      expect(result).toBe('$0.5');
    });
  });
});