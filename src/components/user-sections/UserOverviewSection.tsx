import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Wallet, Send, Download, Check, Share2 } from "lucide-react";
import { toast } from "sonner";
import { truncateAddress } from "../../utils/address";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SendMoneyFlow } from "./SendMoneyFlow";
import { ReceiveMoneyFlow } from "./ReceiveMoneyFlow";
import { CurrencyBalanceCard } from "./CurrencyBalanceCard";
import { PaymentActivityItem } from "./PaymentActivityItem";

/**
 * UserOverviewSection - End User Dashboard Overview
 * 
 * User-oriented dashboard focusing on:
 * - Balance overview (how much money do I have?)
 * - Quick actions (Send/Receive)
 * - Activity feed (recent payments)
 */

interface Payment {
  id: string;
  merchant: string;
  amount: string;
  currency: string;
  crypto: string;
  chain: string;
  date: string;
  status: string;
  txHash: string;
  type: 'sent' | 'received';
}

const UserOverviewSection: React.FC = () => {
  // Mock data - replace with real data from props/context
  const totalBalance = 1234.56;
  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5";
  const balances = {
    USDC: 850.00,
    USDT: 300.00,
    EURC: 84.56
  };

  // Mock chain balances - matches totals above
  const chainBalances = {
    USDC: {
      ethereum: 350.00,
      polygon: 250.00,
      arbitrum: 150.00,
      optimism: 100.00,
    },
    USDT: {
      ethereum: 120.00,
      polygon: 80.00,
      arbitrum: 60.00,
      base: 40.00,
    },
    EURC: {
      polygon: 50.00,
      arbitrum: 34.56,
    },
  };

  const [sharedAddress, setSharedAddress] = useState<string | null>(null);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [showReceiveDialog, setShowReceiveDialog] = useState(false);

  const shareAddress = async (address: string) => {
    // Try native Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My PYMSTR Wallet Address',
          text: `My wallet address: ${address}`,
        });
        setSharedAddress(address);
        toast('Address shared successfully!');
        setTimeout(() => setSharedAddress(null), 2000);
        return;
      } catch (err) {
        // User cancelled or share failed, fall back to copy
        if ((err as Error).name !== 'AbortError') {
          console.log('Share failed, falling back to copy');
        }
      }
    }
    
    // Fallback: Copy to clipboard
    const textarea = document.createElement('textarea');
    textarea.value = address;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      setSharedAddress(address);
      toast('Address copied to clipboard!');
      setTimeout(() => setSharedAddress(null), 2000);
    } catch (err) {
      toast('Failed to share or copy address');
    } finally {
      document.body.removeChild(textarea);
    }
  };

  // Mock recent payments
  const recentPayments: Payment[] = [
    {
      id: "PAY001",
      merchant: "Coffee Shop",
      amount: "5.50",
      currency: "USD",
      crypto: "USDC",
      chain: "Polygon",
      date: "2026-01-05T14:30:00",
      status: "completed",
      txHash: "0xabc123...",
      type: "sent"
    },
    {
      id: "PAY002",
      merchant: "Online Store",
      amount: "49.99",
      currency: "USD",
      crypto: "USDT",
      chain: "Ethereum",
      date: "2026-01-04T10:15:00",
      status: "completed",
      txHash: "0xdef456...",
      type: "sent"
    },
    {
      id: "PAY003",
      merchant: "Friend (John)",
      amount: "50.00",
      currency: "USD",
      crypto: "USDC",
      chain: "Arbitrum",
      date: "2026-01-03T16:45:00",
      status: "completed",
      txHash: "0xghi789...",
      type: "received"
    },
    {
      id: "PAY004",
      merchant: "Monthly Subscription",
      amount: "9.99",
      currency: "USD",
      crypto: "USDC",
      chain: "Polygon",
      date: "2026-01-03T09:00:00",
      status: "completed",
      txHash: "0xjkl012...",
      type: "sent"
    },
    {
      id: "PAY005",
      merchant: "Grocery Store",
      amount: "62.35",
      currency: "USD",
      crypto: "USDT",
      chain: "Base",
      date: "2026-01-02T18:20:00",
      status: "completed",
      txHash: "0xmno345...",
      type: "sent"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getExplorerUrl = (chain: string, txHash: string) => {
    const explorers: { [key: string]: string } = {
      Ethereum: "https://etherscan.io/tx/",
      Polygon: "https://polygonscan.com/tx/",
      Arbitrum: "https://arbiscan.io/tx/",
      Optimism: "https://optimistic.etherscan.io/tx/",
      Base: "https://basescan.org/tx/",
    };
    return `${explorers[chain] || ""}${txHash}`;
  };

  return (
    <div className="space-y-6">
      {/* Total Balance Card */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="pt-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            {/* Left Side - Balance Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Wallet className="w-4 h-4" />
                <p className="text-sm">Total Balance</p>
              </div>
              <div className="text-4xl font-semibold text-gray-900 dark:text-white">
                ${totalBalance.toLocaleString('en-US', { minimumFractionDecimals: 2, maximumFractionDecimals: 2 })}
              </div>
              <p className="text-sm text-muted-foreground mt-2">Across 3 currencies on 5 chains</p>
            </div>

            {/* Wallet Address Button - Below on mobile, Right on desktop */}
            <button
              onClick={() => shareAddress(walletAddress)}
              className="px-10 py-4 h-14 rounded-full bg-[#FAFAFA] dark:bg-[#2E3C49] hover:bg-gray-100 dark:hover:bg-[#1D2E3F] shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 w-full md:w-auto"
              aria-label="Share wallet address"
            >
              <code className="text-sm text-gray-900 dark:text-white font-mono">
                {truncateAddress(walletAddress)}
              </code>
              {sharedAddress === walletAddress ? (
                <Check className="w-6 h-6 text-[#07D7FF]" />
              ) : (
                <Share2 className="w-6 h-6 text-[#07D7FF]" />
              )}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={() => setShowSendDialog(true)}
          className="px-8 py-3 min-h-12 rounded-full bg-[#1E88E5] text-white hover:bg-[#1565C0] hover:shadow-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
        >
          <Send className="w-5 h-5" />
          <span className="font-medium">Send</span>
        </Button>
        
        <Button 
          onClick={() => setShowReceiveDialog(true)}
          className="px-8 py-3 min-h-12 rounded-full bg-[#07D7FF] text-white hover:bg-[#06c4e6] hover:shadow-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
        >
          <Download className="w-5 h-5" />
          <span className="font-medium">Receive</span>
        </Button>
      </div>

      {/* Balance Breakdown - 3 Currency Cards with Chain Details */}
      <div className="space-y-4">
        <h3 className="text-gray-900 dark:text-white font-medium">Your Balances</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* USDC Card */}
          <CurrencyBalanceCard
            symbol="USDC"
            name="USD Coin"
            totalBalance={balances.USDC}
            chainBalances={chainBalances.USDC}
          />
          
          {/* USDT Card */}
          <CurrencyBalanceCard
            symbol="USDT"
            name="Tether"
            totalBalance={balances.USDT}
            chainBalances={chainBalances.USDT}
          />
          
          {/* EURC Card */}
          <CurrencyBalanceCard
            symbol="EURC"
            name="Euro Coin"
            totalBalance={balances.EURC}
            chainBalances={chainBalances.EURC}
            currencySymbol="€"
          />
        </div>
      </div>

      {/* Recent Activity - Payment Feed */}
      <div className="space-y-4">
        <h3 className="text-gray-900 dark:text-white font-medium">Recent Activity</h3>
        
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="pt-6 pb-6">
            <div className="space-y-3">
              {recentPayments.map((payment) => (
                <PaymentActivityItem
                  key={payment.id}
                  payment={payment}
                  formatDate={formatDate}
                  getExplorerUrl={getExplorerUrl}
                />
              ))}
            </div>

            {/* View All Button */}
            <Button 
              variant="outline" 
              className="w-full mt-4 min-h-12 rounded-full"
            >
              View All Transactions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Send Money Dialog */}
      <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" userType="enduser">
          <VisuallyHidden>
            <DialogTitle>Send Money</DialogTitle>
          </VisuallyHidden>
          <SendMoneyFlow 
            onBack={() => setShowSendDialog(false)}
            walletAddress={walletAddress}
            availableBalances={balances}
          />
        </DialogContent>
      </Dialog>

      {/* Receive Money Dialog */}
      <Dialog open={showReceiveDialog} onOpenChange={setShowReceiveDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" userType="enduser">
          <VisuallyHidden>
            <DialogTitle>Receive Money</DialogTitle>
          </VisuallyHidden>
          <ReceiveMoneyFlow 
            onBack={() => setShowReceiveDialog(false)}
            walletAddress={walletAddress}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserOverviewSection;