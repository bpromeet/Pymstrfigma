import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

export interface CryptoOption {
  symbol: string;
  name: string;
  logo: React.ReactNode;
}

export interface CryptoSelectorOption {
  crypto: CryptoOption;
  amount: string;
  balance: string;
  hasSufficientBalance: boolean;
}

interface CryptoSelectorProps {
  options: CryptoSelectorOption[];
  selectedCrypto: string;
  onCryptoChange: (cryptoSymbol: string) => void;
  className?: string;
}

/**
 * CryptoSelector - Reusable MD3 list-style selector for cryptocurrency selection
 * 
 * Features:
 * - MD3-compliant rounded rectangle cards (rounded-2xl - 16px radius)
 * - List layout with crypto logo, name, symbol, amount, and balance
 * - Active state: Grey filled background with white text
 * - Hover state: Subtle grey background
 * - 48px minimum touch targets (MD3 requirement)
 * - Shows balance sufficiency indicator (green checkmark or red alert)
 * - Consistent across all crypto selection instances
 * 
 * Usage:
 * ```tsx
 * <CryptoSelector
 *   options={cryptoOptions}
 *   selectedCrypto={selectedCrypto}
 *   onCryptoChange={setSelectedCrypto}
 * />
 * ```
 */
export const CryptoSelector: React.FC<CryptoSelectorProps> = ({
  options,
  selectedCrypto,
  onCryptoChange,
  className = "",
}) => {
  const selectedOption = options.find(opt => opt.crypto.symbol === selectedCrypto);

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Horizontal scrollable coin icons */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {options.map((option) => (
          <button
            key={option.crypto.symbol}
            className={`flex-shrink-0 w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              selectedCrypto === option.crypto.symbol
                ? "border-[#1E88E5] bg-[#E3F2FD] dark:bg-[#1565C0]/20"
                : "border-[#43586C] bg-white dark:bg-[#2E3C49] hover:border-[#757575]"
            }`}
            onClick={() => onCryptoChange(option.crypto.symbol)}
            aria-label={`Select ${option.crypto.name}`}
            aria-pressed={selectedCrypto === option.crypto.symbol}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              {option.crypto.logo}
            </div>
          </button>
        ))}
      </div>

      {/* Detailed box for selected coin */}
      {selectedOption && (
        <div
          className={`w-full p-3 min-h-12 border rounded-2xl transition-all duration-200 border-[#757575] bg-[#757575] dark:border-[#757575] dark:bg-[#757575]`}
        >
          <div className="flex flex-col gap-2">
            {/* Top row: Icon + Coin name + Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  {selectedOption.crypto.logo}
                </div>
                <p className="font-medium text-white">
                  {selectedOption.crypto.symbol}
                </p>
              </div>
              <p className="font-medium text-white">
                {selectedOption.amount} {selectedOption.crypto.symbol}
              </p>
            </div>

            {/* Bottom row: Balance (left) + Icon (right) */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/70">
                Balance: {selectedOption.balance}
              </p>
              {selectedOption.hasSufficientBalance ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0 text-white" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-white" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};