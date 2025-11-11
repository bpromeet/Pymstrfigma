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
  return (
    <div className={`space-y-2 ${className}`}>
      {options.map((option) => (
        <button
          key={option.crypto.symbol}
          className={`w-full p-3 min-h-12 border rounded-2xl cursor-pointer transition-all duration-200 ${
            selectedCrypto === option.crypto.symbol
              ? "border-[#757575] bg-[#757575] dark:border-[#757575] dark:bg-[#757575]"
              : "border-[#D1D9E1] bg-transparent hover:bg-black/[0.04] dark:hover:bg-white/[0.04] dark:border-[#43586C]"
          }`}
          onClick={() => onCryptoChange(option.crypto.symbol)}
          aria-label={`Select ${option.crypto.name}`}
          aria-pressed={selectedCrypto === option.crypto.symbol}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                {option.crypto.logo}
              </div>
              <div className="text-left">
                <p className={`font-medium ${
                  selectedCrypto === option.crypto.symbol
                    ? "text-white"
                    : "text-foreground"
                }`}>
                  {option.crypto.name}
                </p>
                <p className={`text-sm ${
                  selectedCrypto === option.crypto.symbol
                    ? "text-white/70"
                    : "text-muted-foreground"
                }`}>
                  {option.crypto.symbol}
                </p>
              </div>
            </div>
            <div className="text-right flex items-center gap-3">
              <div>
                <p className={`font-medium ${
                  selectedCrypto === option.crypto.symbol
                    ? "text-white"
                    : "text-foreground"
                }`}>
                  {option.amount} {option.crypto.symbol}
                </p>
                <p className={`text-sm ${
                  selectedCrypto === option.crypto.symbol
                    ? "text-white/70"
                    : "text-muted-foreground"
                }`}>
                  Bal: {option.balance}
                </p>
              </div>
              {option.hasSufficientBalance ? (
                <CheckCircle className={`w-5 h-5 flex-shrink-0 ${
                  selectedCrypto === option.crypto.symbol
                    ? "text-white"
                    : "text-[#7DD069]"
                }`} />
              ) : (
                <AlertCircle className={`w-5 h-5 flex-shrink-0 ${
                  selectedCrypto === option.crypto.symbol
                    ? "text-white"
                    : "text-[#DD6B6B]"
                }`} />
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};