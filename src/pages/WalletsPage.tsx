import React, { useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Wallet, ChevronRight, ArrowLeft } from "lucide-react";
import { CryptoIcon } from "../components/CryptoIcon";
import WalletMainActionButton from "../components/WalletMainActionButton";
import { ManageCoin } from "../components/ManageCoin";

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

interface WalletsPageProps {
  wallets: WalletData[];
  setWallets: React.Dispatch<React.SetStateAction<WalletData[]>>;
  theme: string;
}

export default function WalletsPage({
  wallets,
  setWallets,
  theme,
}: WalletsPageProps) {
  const mainWallet = wallets.find((w) => w.isDefault);
  const [selectedCrypto, setSelectedCrypto] = useState<string>("");
  const [showingCurrency, setShowingCurrency] = useState(false);

  if (!mainWallet) {
    return (
      <PageLayout>
        <PageLayout.Header
          icon={<Wallet className="w-6 h-6 text-[#FF5914]" />}
          title="Wallet Management"
          subtitle="Manage your wallet balances and multi-chain crypto assets"
        />
        <PageLayout.Content>
          <Card className="rounded-2xl shadow-sm bg-white dark:bg-[#303030]">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Wallet className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-gray-900 dark:text-white mb-2">
                  No main wallet found
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

  const selectCurrency = (crypto: string) => {
    setSelectedCrypto(crypto);
    setShowingCurrency(true);
  };

  const backToList = () => {
    setShowingCurrency(false);
    setSelectedCrypto("");
  };

  const getCryptoName = (symbol: string) => {
    const names: { [key: string]: string } = {
      USDC: "USD Coin",
      USDT: "Tether",
      EURC: "Euro Coin",
    };
    return names[symbol] || symbol;
  };

  return (
    <PageLayout>
      {!showingCurrency && (
        <PageLayout.Header
          icon={<Wallet className="w-6 h-6 text-[#FF5914]" />}
          title="Wallet Management"
          subtitle="Manage your wallet balances and multi-chain crypto assets"
        />
      )}
      <PageLayout.Content>
        <div className="space-y-6">
          {/* Main Action Button - Wallet Address (Below Header) */}
          {!showingCurrency && (
            <WalletMainActionButton
              address={mainWallet.address}
              showIcon={true}
            />
          )}

          {/* Desktop Back Button */}
          {showingCurrency && (
            <div className="hidden md:flex items-center justify-between">
              <Button
                variant="outline"
                onClick={backToList}
                className="rounded-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          )}

          {!showingCurrency && (
            <>
              <div className="space-y-6">
                <Card className="bg-white dark:bg-[#303030] shadow-sm">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Wallet Header - MD3 Nested Section (Medium radius 12px) with subtle styling */}
                      <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <h3>{mainWallet.name}</h3>
                          <Badge className="bg-[#D4EDDA] text-[#155724] dark:bg-[#032e15] dark:text-[#05df72] rounded-full border-0">
                            Active
                          </Badge>
                        </div>
                      </div>

                      {/* Mobile View - Cards */}
                      <div className="md:hidden space-y-3">
                        {Object.entries(
                          mainWallet.balance,
                        ).map(([crypto, balance]) => (
                          <div
                            key={crypto}
                            onClick={() =>
                              selectCurrency(crypto)
                            }
                            className="cursor-pointer shadow-sm hover:shadow-md rounded-2xl p-4 transition-all bg-white dark:bg-[#303030]"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <CryptoIcon symbol={crypto} />
                                <div>
                                  <p className="text-gray-900 dark:text-white font-medium">
                                    {crypto}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {getCryptoName(crypto)}
                                  </p>
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Balance
                                </p>
                                <p className="font-mono text-gray-900 dark:text-white">
                                  {balance.toFixed(2)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">
                                  USD Value
                                </p>
                                <p className="text-muted-foreground">
                                  ≈ ${balance.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Desktop View - Table */}
                      <div className="hidden md:block shadow-sm rounded-2xl overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="pl-6">
                                Currency
                              </TableHead>
                              <TableHead>Balance</TableHead>
                              <TableHead>USD Value</TableHead>
                              <TableHead className="text-right pr-6">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {Object.entries(
                              mainWallet.balance,
                            ).map(([crypto, balance]) => (
                              <TableRow
                                key={crypto}
                                onClick={() =>
                                  selectCurrency(crypto)
                                }
                                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
                              >
                                <TableCell className="pl-6">
                                  <div className="flex items-center space-x-3">
                                    <CryptoIcon
                                      symbol={crypto}
                                    />
                                    <div>
                                      <p className="text-gray-900 dark:text-white font-medium">
                                        {crypto}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {getCryptoName(
                                          crypto,
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <p className="font-mono text-gray-900 dark:text-white">
                                    {balance.toFixed(2)}
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <p className="text-muted-foreground">
                                    ≈ ${balance.toFixed(2)}{" "}
                                    USD
                                  </p>
                                </TableCell>
                                <TableCell className="text-right pr-6">
                                  <div className="flex items-center justify-end gap-2 text-[#07D7FF]">
                                    <span className="text-sm">
                                      Manage
                                    </span>
                                    <ChevronRight className="w-4 h-4" />
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Desktop: Inline Card - Hidden on Mobile */}
          {showingCurrency && (
            <div className="hidden md:block">
              <ManageCoin
                selectedCrypto={selectedCrypto}
                totalBalance={
                  mainWallet.balance[selectedCrypto] || 0
                }
                chainBalances={
                  mainWallet.chainBalances?.[
                    selectedCrypto
                  ] || {}
                }
                onBack={backToList}
                walletAddress={mainWallet.address}
                variant="desktop"
              />
            </div>
          )}
        </div>
      </PageLayout.Content>

      {/* Mobile: Full Screen View for Manage Crypto */}
      {showingCurrency && (
        <ManageCoin
          selectedCrypto={selectedCrypto}
          totalBalance={
            mainWallet.balance[selectedCrypto] || 0
          }
          chainBalances={
            mainWallet.chainBalances?.[selectedCrypto] || {}
          }
          onBack={backToList}
          walletAddress={mainWallet.address}
          variant="mobile-sheet"
        />
      )}
    </PageLayout>
  );
}