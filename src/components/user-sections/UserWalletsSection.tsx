import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface UserWalletsSectionProps {
  copiedItem: string | null;
  onCopy: (text: string) => void;
}

/**
 * UserWalletsSection - End User Wallet Management
 * 
 * Displays:
 * - Wallet address
 * - Balances (USDC, USDT, EURC)
 * - Chain breakdown
 * - Receive/Send actions
 */
const UserWalletsSection: React.FC<UserWalletsSectionProps> = ({ copiedItem, onCopy }) => {
  // Mock wallet data
  const walletAddress = "0x1234...5678";
  const balances = {
    USDC: 500.00,
    USDT: 234.56,
    EURC: 100.00,
  };

  return (
    <div className="space-y-6">
      {/* Wallet Address Card */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Wallet Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <code className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded">
              {walletAddress}
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCopy(walletAddress)}
              className="rounded-full"
            >
              {copiedItem === walletAddress ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Balances */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">USDC Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${balances.USDC.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">USDT Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${balances.USDT.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">EURC Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€{balances.EURC.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button className="flex-1 min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full">
          Receive
        </Button>
        <Button className="flex-1 min-h-12 bg-transparent border border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD] rounded-full">
          Send
        </Button>
      </div>
    </div>
  );
};

export default UserWalletsSection;
