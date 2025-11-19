/**
 * Address utility functions for blockchain addresses
 * Following Web3 UX best practices
 */

/**
 * Truncates a blockchain address for display
 * @param address - Full blockchain address (e.g., "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5")
 * @param startChars - Number of characters to show at start (default: 6, includes "0x")
 * @param endChars - Number of characters to show at end (default: 4)
 * @returns Truncated address (e.g., "0x742d...bEb5")
 */
export const truncateAddress = (
  address: string,
  startChars: number = 6,
  endChars: number = 4
): string => {
  if (!address) return "";
  if (address.length <= startChars + endChars) return address;
  
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Validates if a string is a valid Ethereum address
 * @param address - Address to validate
 * @returns True if valid Ethereum address format
 */
export const isValidAddress = (address: string): boolean => {
  if (!address) return false;
  // Basic validation: starts with 0x and is 42 characters long
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Formats an address for display in different contexts
 * @param address - Full blockchain address
 * @param format - Display format ("short" | "medium" | "full")
 * @returns Formatted address
 */
export const formatAddress = (
  address: string,
  format: "short" | "medium" | "full" = "short"
): string => {
  if (!address) return "";
  
  switch (format) {
    case "short":
      return truncateAddress(address, 6, 4); // 0x742d...bEb5
    case "medium":
      return truncateAddress(address, 10, 8); // 0x742d35Cc...95f0bEb5
    case "full":
      return address;
    default:
      return truncateAddress(address, 6, 4);
  }
};
