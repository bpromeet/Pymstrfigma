import React from "react";
import { Card, CardContent } from "../ui/card";
import { CryptoIcon } from "../CryptoIcon";
import { ChainBadge } from "../ChainBadge";

interface CurrencyBalanceCardProps {
  symbol: "USDC" | "USDT" | "EURC";
  name: string;
  totalBalance: number;
  chainBalances: { [chain: string]: number };
  currencySymbol?: string;
}

/**
 * CurrencyBalanceCard - MD3 Compliant Card for Stablecoin Balances
 * 
 * Displays:
 * - Crypto icon and name
 * - Total balance across all chains
 * - Breakdown by blockchain network with ChainBadge
 * 
 * MD3 Compliance:
 * - Large radius (16px): rounded-2xl
 * - Level 1 elevation: shadow-sm
 * - Level 2 elevation on hover: hover:shadow-md
 * - 8dp spacing grid: space-y-3 (12px for chain list)
 * - 4dp sub-grid: mb-4 (16px for divider)
 */
export const CurrencyBalanceCard: React.FC<CurrencyBalanceCardProps> = ({
  symbol,
  name,
  totalBalance,
  chainBalances,
  currencySymbol = "$"
}) => {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="pt-6 pb-6">
        {/* Card Header - Crypto Icon and Total Balance */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <CryptoIcon symbol={symbol} size={40} />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {symbol}
              </p>
              <p className="text-sm text-muted-foreground">
                {name}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {currencySymbol}{totalBalance.toLocaleString('en-US', { minimumFractionDecimals: 2, maximumFractionDecimals: 2 })}
            </p>
            <p className="text-sm text-muted-foreground">
              Total Balance
            </p>
          </div>
        </div>

        {/* Divider - MD3 Outline */}
        <div className="border-t border-gray-200 dark:border-gray-700 mb-4" />

        {/* Chain Breakdown - MD3 12px spacing (space-y-3) */}
        <div className="space-y-3">
          {Object.entries(chainBalances).map(([chain, chainBalance]) => (
            <div key={chain} className="flex items-center justify-between">
              <ChainBadge chain={chain} />
              <p className="font-medium text-gray-900 dark:text-white">
                {currencySymbol}{chainBalance.toLocaleString('en-US', { minimumFractionDecimals: 2, maximumFractionDecimals: 2 })}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
