/**
 * Currency formatting utilities for PYMSTR
 */

/**
 * Format a price with the appropriate currency symbol
 * @param price - The numeric price value
 * @param baseCurrency - The base currency code (USD, EUR, AED, JPY, etc.)
 * @returns Formatted price string with currency symbol
 */
export function formatPrice(price: number, baseCurrency?: string): string {
  if (!baseCurrency) {
    return `$${price}`; // Default to USD
  }

  switch (baseCurrency) {
    case 'USD':
      return `$${price}`;
    case 'EUR':
      return `€${price}`;
    case 'JPY':
      return `¥${price}`;
    case 'AED':
      return `${price} AED`;
    default:
      return `${price} ${baseCurrency}`;
  }
}

/**
 * Get the currency symbol for a given currency code
 * @param baseCurrency - The base currency code (USD, EUR, JPY, etc.)
 * @returns Currency symbol string
 */
export function getCurrencySymbol(baseCurrency: string): string {
  switch (baseCurrency) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'JPY':
      return '¥';
    default:
      return '';
  }
}

/**
 * Check if currency symbol should be a suffix (comes after the amount)
 * @param baseCurrency - The base currency code
 * @returns true if symbol should be a suffix
 */
export function isSuffixCurrency(baseCurrency: string): boolean {
  return baseCurrency === 'AED';
}
