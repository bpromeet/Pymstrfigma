// Helper utility functions for PYMSTR application
// Extracted from App.tsx to reduce file size and improve maintainability

import { toast } from "sonner@2.0.3";

// Blockchain explorer URL mapping
export const getExplorerUrl = (chain: string, txHash: string): string => {
  const explorers: { [key: string]: string } = {
    ethereum: "https://etherscan.io/tx/",
    polygon: "https://polygonscan.com/tx/",
    arbitrum: "https://arbiscan.io/tx/",
    optimism: "https://optimistic.etherscan.io/tx/",
    base: "https://basescan.org/tx/",
  };
  return explorers[chain.toLowerCase()] + txHash;
};

// Chain display name helper
export const getChainName = (chainId: string): string => {
  const chainNames: { [key: string]: string } = {
    ethereum: "Ethereum",
    polygon: "Polygon",
    arbitrum: "Arbitrum",
    optimism: "Optimism",
    base: "Base",
  };
  return chainNames[chainId.toLowerCase()] || chainId.charAt(0).toUpperCase() + chainId.slice(1);
};

// OnRamper network mapping
export const getOnRamperNetwork = (chainId: string): string => {
  const networkMap: { [key: string]: string } = {
    ethereum: "ethereum",
    polygon: "polygon",
    arbitrum: "arbitrum",
    optimism: "optimism",
    base: "base",
  };
  return networkMap[chainId.toLowerCase()] || "ethereum";
};

// Crypto full name helper
export const getCryptoName = (symbol: string): string => {
  const cryptoNames: { [key: string]: string } = {
    USDC: "USD Coin",
    USDT: "Tether",
    EURC: "Euro Coin",
  };
  return cryptoNames[symbol] || symbol;
};

// Copy to clipboard with fallback
export const copyToClipboard = (
  text: string,
  tooltipId?: string,
  setShowCopyTooltip?: (id: string) => void
): void => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    // Toast removed - visual feedback provided by green checkmark in UI

    if (tooltipId && setShowCopyTooltip) {
      setShowCopyTooltip(tooltipId);
      setTimeout(() => {
        setShowCopyTooltip("");
      }, 1000);
    }
  } catch (err) {
    // Only show toast on error
    toast("Failed to copy to clipboard");
  } finally {
    document.body.removeChild(textarea);
  }
};

// Mock exchange rates (in real app, this would come from an API)
export const getExchangeRate = (crypto: string): number => {
  const rates: { [key: string]: number } = {
    USDC: 1.0,
    USDT: 1.001,
    EURC: 0.92,
  };
  return rates[crypto] || 1;
};

// Calculate crypto amount from USD
export const calculateCryptoAmount = (
  usdAmount: number,
  crypto: string
): string => {
  const rate = getExchangeRate(crypto);
  return (usdAmount / rate).toFixed(6);
};

// Mock wallet balances (in real app, this would come from connected wallet)
export const getWalletBalance = (crypto: string, chain: string): number => {
  const balances: { [key: string]: { [key: string]: number } } = {
    USDC: {
      ethereum: 0.0,    // Zero balance on Ethereum
      polygon: 245.67,   // Has balance on Polygon
      arbitrum: 75.00,   // PARTIAL BALANCE for PL003 testing ($150 needed, only $75 available)
      optimism: 89.45,
      base: 425.90,      // Has balance on Base
    },
    USDT: {
      ethereum: 0.0,
      polygon: 0.0,
      arbitrum: 320.15,
      optimism: 0.0,
      base: 180.50,
    },
    EURC: {
      ethereum: 500.78,
      polygon: 0.0,
      arbitrum: 500.78,  // Has sufficient balance on Arbitrum
      optimism: 312.45,
      base: 0.0,         // Zero balance on Base for EURC
    },
  };
  return balances[crypto]?.[chain] || 0;
};