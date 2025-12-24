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
  return (usdAmount / rate).toFixed(2);
};

// Mock wallet balances (in real app, this would come from connected wallet)
// 
// 🦊 METAMASK PAYMENT SCENARIOS (Test with #PL003 - $150.00 USD):
// 
// To test each scenario, modify the balances below and use MetaMask login:
// 
// ✅ SCENARIO 1: Wallet = 0 & MetaMask = 0
//    - USDC polygon: 0.0
//    - Button: "Add USDC + Polygon"
//    - Goes to Screen 3.5/7 → Shows FULL amount (150.00 USDC)
// 
// ✅ SCENARIO 2: Wallet Partial (75 USDC)
//    - USDC polygon: 75.0
//    - Button: "Add USDC to Pay"
//    - Goes to Screen 3.5/7 → Shows MISSING amount (75.00 USDC)
// 
// ✅ SCENARIO 3: Wallet = 0 & MetaMask Partial (75 USDC - INSUFFICIENT)
//    - USDC polygon: 75.0
//    - ❌ NO MetaMask logo/balance displayed (ignored)
//    - Shows: "Balance: 75.00 USDC" (wallet icon, red text)
//    - Button: "Add USDC to Pay"
//    - Goes to Screen 3.5/7 → Shows MISSING amount (75.00 USDC)
// 
// ✅ SCENARIO 4: MetaMask SUFFICIENT (150+ USDC)
//    - USDC polygon: 175.0
//    - Shows: "MetaMask: 175.00 USDC" (MetaMask logo, green text)
//    - Button: "Pay USDC on Polygon"
//    - Can pay directly with MetaMask
// 
export const getWalletBalance = (crypto: string, chain: string): number => {
  const balances: { [key: string]: { [key: string]: number } } = {
    USDC: {
      ethereum: 0.0,    // Zero balance on Ethereum
      polygon: 0.0,     // 🧪 TEST SCENARIO 1: Both = 0 (Change to 75.0 for Scenario 2/3, 175.0 for Scenario 4)
      arbitrum: 75.00,   // PARTIAL BALANCE for PL003 testing ($150 needed, only $75 available)
      optimism: 89.45,
      base: 425.90,      // Has balance on Base
    },
    USDT: {
      ethereum: 0.0,
      polygon: 175.50,   // SUFFICIENT BALANCE for $150 payment (MetaMask example)
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