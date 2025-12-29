import React from 'react';
import { Building2, HelpCircle, Wallet } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { MetaMaskLogo } from '../WalletLogos';

interface CryptoOption {
  symbol: string;
  name: string;
  logo: React.ReactNode;
}

interface ChainOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface CryptoSelectionScreenProps {
  currentPayment: {
    linkId: string;
    price: number;
    currency: string;
    description: string;
    source: 'manual' | 'api';
    merchantName?: string;
  };
  selectedCrypto: string;
  setSelectedCrypto: (crypto: string) => void;
  selectedChain: string;
  setSelectedChain: (chain: string) => void;
  walletAddress: string;
  getWalletBalance: (crypto: string, chain: string) => number;
  onContinue: () => void;
  calculateCryptoAmount: (price: number, crypto: string) => string;
  supportedCryptos: CryptoOption[];
  supportedChains: ChainOption[];
  getAvailableChainsForToken: (token: string) => string[];
  getAvailableTokensForChain: (chain: string) => string[];
  connectedWallet: string;
}

const CryptoSelectionScreen: React.FC<CryptoSelectionScreenProps> = ({
  currentPayment,
  selectedCrypto,
  setSelectedCrypto,
  selectedChain,
  setSelectedChain,
  getWalletBalance,
  onContinue,
  calculateCryptoAmount,
  supportedCryptos,
  supportedChains,
  getAvailableChainsForToken,
  getAvailableTokensForChain,
  connectedWallet,
}) => {
  // Format price display
  const formatPrice = (price: number, currency: string) => {
    const symbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : currency;
    return `${symbol}${price.toFixed(2)}`;
  };

  // Get wallet balance and required amount
  const walletBalance = getWalletBalance(selectedCrypto, selectedChain);
  const requiredAmount = parseFloat(calculateCryptoAmount(currentPayment.price, selectedCrypto));
  const hasSufficient = walletBalance >= requiredAmount;
  const isMetaMask = connectedWallet === "MetaMask";
  
  // Check if MetaMask has SUFFICIENT balance for FULL payment
  const metaMaskSufficient = isMetaMask && walletBalance >= requiredAmount;
  
  // Show balance if:
  // 1. MetaMask is sufficient (show MetaMask balance)
  // 2. Wallet has balance > 0 (show wallet balance, ignore MetaMask if insufficient)
  const shouldShowBalance = metaMaskSufficient || walletBalance > 0;
  
  // Determine which balance to show
  const displayAsMetaMask = metaMaskSufficient;

  // Generate dynamic button text based on balance
  const getButtonText = () => {
    const chainName = supportedChains.find(c => c.id === selectedChain)?.name;
    
    // Scenario 1: Wallet = 0 (both wallet and MetaMask = 0, or MetaMask insufficient)
    if (walletBalance === 0) {
      return `Add ${selectedCrypto} + ${chainName}`;
    }
    
    // Scenario 2 & 4: Has sufficient balance (wallet partial or MetaMask sufficient)
    if (hasSufficient) {
      return `Pay ${selectedCrypto} on ${chainName}`;
    }
    
    // Scenario 3: Partial balance (need to add more)
    return `Add ${selectedCrypto} to Pay`;
  };

  return (
    <div className="flex flex-col pt-0 pb-0 px-0 space-y-4">
      <div className="text-center space-y-4">
        {/* Merchant Logo */}
        <div className="flex justify-center">
          <div className="w-[54px] h-[54px] rounded-xl border-2 border-dashed border-[#43586C] flex items-center justify-center bg-[#FAFAFA] dark:bg-[#262626] overflow-hidden">
            <div className="text-center">
              <Building2 className="w-10 h-10 mx-auto text-muted-foreground" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-muted-foreground">
            {formatPrice(currentPayment.price, currentPayment.currency)} •{" "}
            {currentPayment.description}
          </p>
          <h3 className="text-center text-muted-foreground not-italic">Select to Pay</h3>
        </div>
      </div>

      {/* Side-by-side Dropdowns: Coin and Chain */}
      <div className="grid grid-cols-2 gap-3">
        {/* Coin Selection Dropdown */}
        <div className="space-y-1.5">
          <Label className="text-sm">Stablecoin</Label>
          <Select
            value={selectedCrypto}
            onValueChange={(cryptoSymbol) => {
              setSelectedCrypto(cryptoSymbol);
              // Auto-adjust chain if current one is not available for new token
              const availableChains = getAvailableChainsForToken(cryptoSymbol);
              if (!availableChains.includes(selectedChain)) {
                // Select first available chain for this token
                if (availableChains.length > 0) {
                  setSelectedChain(availableChains[0]);
                }
              }
            }}
          >
            <SelectTrigger className="h-12 rounded-xl bg-transparent border-2 border-[#1E88E5] hover:border-[#1565C0] hover:bg-[#E3F2FD] dark:hover:bg-[#1E88E5]/20 focus:bg-[#E3F2FD] dark:focus:bg-[#1E88E5]/20 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] transition-all duration-200">
              <SelectValue>
                <div className="flex items-center gap-2">
                  {supportedCryptos.find(c => c.symbol === selectedCrypto)?.logo}
                  <span>{selectedCrypto}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-[#262626] rounded-xl">
              {supportedCryptos
                .filter((crypto) => {
                  // First check merchant config - only show tokens enabled for selected chain
                  const availableTokens = getAvailableTokensForChain(selectedChain);
                  return availableTokens.includes(crypto.symbol);
                })
                .map((crypto) => (
                  <SelectItem
                    key={crypto.symbol}
                    value={crypto.symbol}
                    className="cursor-pointer hover:bg-[#E3F2FD] dark:hover:bg-[#1E88E5]/20 rounded-lg my-1"
                  >
                    <div className="flex items-center gap-2">
                      {crypto.logo}
                      <span>{crypto.symbol}</span>
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Chain Selection Dropdown */}
        <div className="space-y-1.5">
          <Label className="text-sm">Chain</Label>
          <Select
            value={selectedChain}
            onValueChange={(chain) => {
              setSelectedChain(chain);
              // Auto-adjust token if current one is not available on new chain
              const availableTokens = getAvailableTokensForChain(chain);
              if (!availableTokens.includes(selectedCrypto)) {
                // Select first available token on this chain
                if (availableTokens.length > 0) {
                  const firstToken = supportedCryptos.find(c => availableTokens.includes(c.symbol));
                  if (firstToken) {
                    setSelectedCrypto(firstToken.symbol);
                  }
                }
              }
            }}
          >
            <SelectTrigger className="h-12 rounded-xl bg-transparent border-2 border-[#1E88E5] hover:border-[#1565C0] hover:bg-[#E3F2FD] dark:hover:bg-[#1E88E5]/20 focus:bg-[#E3F2FD] dark:focus:bg-[#1E88E5]/20 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] transition-all duration-200">
              <SelectValue>
                <div className="flex items-center gap-2">
                  {supportedChains.find(c => c.id === selectedChain)?.icon}
                  <span>{supportedChains.find(c => c.id === selectedChain)?.name}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-[#262626] rounded-xl">
              {getAvailableChainsForToken(selectedCrypto).map((chainId) => {
                const chain = supportedChains.find(c => c.id === chainId);
                if (!chain) return null;
                return (
                  <SelectItem
                    key={chain.id}
                    value={chain.id}
                    className="cursor-pointer hover:bg-[#E3F2FD] dark:hover:bg-[#1E88E5]/20 rounded-lg my-1"
                  >
                    <div className="flex items-center gap-2">
                      {chain.icon}
                      <span>{chain.name}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Result Box - Shows selected coin, amount, and balance */}
      <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-4 border border-[#43586C]">
        <div className="flex items-start gap-3">
          {/* Coin Icon */}
          <div className="flex-shrink-0">
            {supportedCryptos.find(c => c.symbol === selectedCrypto)?.logo}
          </div>
          
          {/* Coin Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-[#1C1B1F] dark:text-[#F6F7F9]">
                {supportedCryptos.find(c => c.symbol === selectedCrypto)?.name}
              </span>
              <span className="text-xs text-muted-foreground">
                on {supportedChains.find(c => c.id === selectedChain)?.name}
              </span>
            </div>
            
            {/* Amount to Pay */}
            <div className="text-2xl font-medium text-[#1C1B1F] dark:text-[#F6F7F9] mb-2">
              {calculateCryptoAmount(currentPayment.price, selectedCrypto)} {selectedCrypto}
            </div>
            
            {/* Balance Display Logic:
                - Show MetaMask ONLY if MetaMask has SUFFICIENT balance (≥ full payment)
                - Otherwise, show Wallet balance (or nothing if wallet = 0)
                - Ignore MetaMask if insufficient
            */}
            {shouldShowBalance && (
              <div className="flex items-center gap-1.5 text-sm">
                {/* Show MetaMask logo ONLY if MetaMask is sufficient, otherwise Wallet icon */}
                {displayAsMetaMask ? (
                  <MetaMaskLogo className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <Wallet className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-muted-foreground">
                  {displayAsMetaMask ? "MetaMask:" : "Balance:"}
                </span>
                <span className={hasSufficient ? "text-[#7DD069]" : "text-[#FF5914]"}>
                  {walletBalance.toFixed(2)} {selectedCrypto}
                </span>
              </div>
            )}
          </div>
          
          {/* Info Icon */}
          <div className="flex-shrink-0">
            <div className="w-5 h-5 rounded-full border border-[#43586C] flex items-center justify-center">
              <HelpCircle className="w-3 h-3 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Button - Dynamic text based on balance */}
      <div className="pt-2">
        <button
          onClick={onContinue}
          className="w-full h-12 px-8 py-3 rounded-full bg-[#1E88E5] hover:bg-[#1565C0] text-white transition-all duration-200 flex items-center justify-center font-medium"
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default CryptoSelectionScreen;