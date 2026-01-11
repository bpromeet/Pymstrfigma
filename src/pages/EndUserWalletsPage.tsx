import React, { useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Wallet, Send, Download } from "lucide-react";
import { CryptoIcon } from "../components/CryptoIcon";
import { ChainBadge } from "../components/ChainBadge";
import { SendMoneyFlow } from "../components/user-sections/SendMoneyFlow";
import { ReceiveMoneyFlow } from "../components/user-sections/ReceiveMoneyFlow";

interface WalletBalance {
  [crypto: string]: number;
}

interface ChainBalances {
  [crypto: string]: {
    [chain: string]: number;
  };
}

interface WalletData {
  id: string;
  name: string;
  address: string;
  balance: WalletBalance;
  chainBalances?: ChainBalances;
  isDefault: boolean;
  emailNotifications: boolean;
}

interface EndUserWalletsPageProps {
  wallets: WalletData[];
  setWallets: React.Dispatch<React.SetStateAction<WalletData[]>>;
  theme: string;
}

/**
 * EndUserWalletsPage - End User Wallet Management
 * 
 * User-oriented wallet page with:
 * - Quick access to Send/Receive
 * - Clear balance overview
 * - Simple, friendly interface
 */
export default function EndUserWalletsPage({
  wallets,
  setWallets,
  theme,
}: EndUserWalletsPageProps) {
  const mainWallet = wallets.find((w) => w.isDefault);
  
  // Check localStorage for desired view (set by Dashboard navigation)
  const initialView = (() => {
    const savedView = localStorage.getItem('pymstr-wallet-view');
    localStorage.removeItem('pymstr-wallet-view'); // Clear after reading
    return savedView === 'send' || savedView === 'receive' ? savedView : 'wallets';
  })();
  
  const [activeView, setActiveView] = useState<"wallets" | "send" | "receive">(initialView as "wallets" | "send" | "receive");

  if (!mainWallet) {
    return (
      <PageLayout>
        <PageLayout.Header
          icon={<Wallet className="w-6 h-6 text-[#07D7FF]" />}
          title="Wallets"
          subtitle="Your crypto balances"
        />
        <PageLayout.Content>
          <Card className="rounded-2xl shadow-sm bg-white dark:bg-[#303030]">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Wallet className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-gray-900 dark:text-white mb-2">
                  No wallet found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Please contact support
                </p>
              </div>
            </CardContent>
          </Card>
        </PageLayout.Content>
      </PageLayout>
    );
  }

  const totalBalance = Object.values(mainWallet.balance).reduce((sum, val) => sum + val, 0);

  const getCryptoName = (symbol: string) => {
    const names: { [key: string]: string } = {
      USDC: "USD Coin",
      USDT: "Tether",
      EURC: "Euro Coin",
    };
    return names[symbol] || symbol;
  };

  // Show Send Money Flow
  if (activeView === "send") {
    return (
      <PageLayout>
        <PageLayout.Header
          icon={<Send className="w-6 h-6 text-[#1E88E5]" />}
          title="Send Money"
          subtitle="Transfer crypto to another wallet"
        />
        <PageLayout.Content>
          <SendMoneyFlow
            onBack={() => setActiveView("wallets")}
            walletAddress={mainWallet.address}
            availableBalances={mainWallet.balance}
          />
        </PageLayout.Content>
      </PageLayout>
    );
  }

  // Show Receive Money Flow
  if (activeView === "receive") {
    return (
      <PageLayout>
        <PageLayout.Header
          icon={<Download className="w-6 h-6 text-[#07D7FF]" />}
          title="Receive Money"
          subtitle="Get your wallet address and QR code"
        />
        <PageLayout.Content>
          <ReceiveMoneyFlow
            onBack={() => setActiveView("wallets")}
            walletAddress={mainWallet.address}
          />
        </PageLayout.Content>
      </PageLayout>
    );
  }

  // Main Wallets View
  return (
    <PageLayout>
      <PageLayout.Header
        icon={<Wallet className="w-6 h-6 text-[#07D7FF]" />}
        title="Wallets"
        subtitle="Your crypto balances"
      />
      <PageLayout.Content>
        <div className="space-y-6">
          {/* Total Balance Card */}
          <Card className="rounded-2xl bg-gradient-to-br from-[#07D7FF] to-[#06c4e6] text-white border-0 shadow-lg">
            <CardContent className="pt-6 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/80">
                  <Wallet className="w-4 h-4" />
                  <p className="text-sm">Total Balance</p>
                </div>
                <div className="text-4xl font-semibold">
                  ${totalBalance.toLocaleString('en-US', { minimumFractionDecimals: 2, maximumFractionDecimals: 2 })}
                </div>
                <p className="text-sm text-white/70">Across all currencies</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => setActiveView("send")}
              className="px-8 py-3 min-h-12 rounded-full bg-[#1E88E5] text-white hover:bg-[#1565C0] hover:shadow-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-5 h-5" />
              <span className="font-medium">Send</span>
            </Button>
            
            <Button 
              onClick={() => setActiveView("receive")}
              className="px-8 py-3 min-h-12 rounded-full bg-[#07D7FF] text-white hover:bg-[#06c4e6] hover:shadow-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-5 h-5" />
              <span className="font-medium">Receive</span>
            </Button>
          </div>

          {/* Currency Balances */}
          <div className="space-y-3">
            <h3 className="text-gray-900 dark:text-white font-medium">Your Balances</h3>
            
            {Object.entries(mainWallet.balance).map(([crypto, balance]) => {
              // Get chain balances for this crypto
              const chainBalances = mainWallet.chainBalances?.[crypto] || {};
              const chainsWithBalance = Object.entries(chainBalances).filter(([_, bal]) => bal > 0);
              
              return (
                <Card key={crypto} className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="pt-6 pb-6">
                    {/* Card Header - Crypto and Total Balance */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <CryptoIcon symbol={crypto} size={40} />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {crypto}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {getCryptoName(crypto)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {balance.toLocaleString('en-US', { minimumFractionDecimals: 2, maximumFractionDecimals: 2 })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Total Balance
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    {chainsWithBalance.length > 0 && (
                      <div className="border-t border-gray-200 dark:border-gray-700 mb-4" />
                    )}

                    {/* Chain Breakdown */}
                    {chainsWithBalance.length > 0 && (
                      <div className="space-y-3">
                        {chainsWithBalance.map(([chain, chainBalance]) => (
                          <div key={chain} className="flex items-center justify-between">
                            <ChainBadge chain={chain} />
                            <p className="font-medium text-gray-900 dark:text-white">
                              {chainBalance.toLocaleString('en-US', { minimumFractionDecimals: 2, maximumFractionDecimals: 2 })}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
}