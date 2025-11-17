import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { 
  Activity, 
  Download, 
  Send as SendIcon, 
  ArrowLeft,
  AlertCircle 
} from "lucide-react";
import { CryptoIcon } from "./CryptoIcon";
import { ChainIcon } from "./ChainIcon";
import { WalletAddressCopyButton } from "./WalletAddressCopyButton";
import QRCode from "qrcode";

interface ManageCoinProps {
  selectedCrypto: string;
  totalBalance: number;
  chainBalances: Record<string, number>;
  onBack: () => void;
  walletAddress: string;
  variant?: "desktop" | "mobile-sheet";
}

export const ManageCoin: React.FC<ManageCoinProps> = ({
  selectedCrypto,
  totalBalance,
  chainBalances,
  onBack,
  walletAddress,
  variant = "desktop"
}) => {
  const [manageView, setManageView] = useState<"breakdown" | "deposit" | "send">("breakdown");
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum");
  const [qrCode, setQrCode] = useState("");
  const [sendAmt, setSendAmt] = useState("");
  const [sendAddr, setSendAddr] = useState("");

  // Helper functions
  const getCryptoName = (symbol: string) => {
    const names: Record<string, string> = {
      USDC: "USD Coin",
      USDT: "Tether",
      EURC: "Euro Coin"
    };
    return names[symbol] || symbol;
  };

  const getNetworkName = (network: string) => {
    const names: Record<string, string> = {
      ethereum: "Ethereum",
      polygon: "Polygon",
      arbitrum: "Arbitrum",
      optimism: "Optimism",
      base: "Base"
    };
    return names[network] || network;
  };



  // Generate QR code when deposit view is opened
  React.useEffect(() => {
    if (manageView === "deposit" && walletAddress) {
      QRCode.toDataURL(walletAddress)
        .then(setQrCode)
        .catch(console.error);
    }
  }, [manageView, walletAddress]);

  const handleSend = () => {
    console.log(`Sending ${sendAmt} ${selectedCrypto} to ${sendAddr} on ${selectedNetwork}`);
    // Reset form
    setSendAmt("");
    setSendAddr("");
    setManageView("breakdown");
  };

  const renderContent = () => (
    <>
      {/* Breakdown View */}
      {manageView === "breakdown" && (
        <div>
          <h4 className="text-gray-900 dark:text-white mb-4">Balance by Chain</h4>

          {/* Desktop View - Table */}
          <div className="hidden md:block shadow-sm rounded-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Chain</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>USD Value</TableHead>
                  <TableHead className="text-right pr-6">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(chainBalances || {}).map(([chain, balance]) => {
                  const percentage = totalBalance > 0 ? ((balance / totalBalance) * 100).toFixed(1) : 0;
                  if (balance === 0) return null;
                  return (
                    <TableRow key={chain}>
                      <TableCell className="pl-6">
                        <div className="flex items-center space-x-3">
                          <ChainIcon chain={chain} size={32} />
                          <span className="text-gray-900 dark:text-white font-medium">
                            {getNetworkName(chain)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-mono text-gray-900 dark:text-white">
                            {balance.toFixed(2)} {selectedCrypto}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-muted-foreground">≈ ${balance.toFixed(2)}</p>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 text-sm font-medium">
                          {percentage}%
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile View - Cards */}
          <div className="md:hidden space-y-3">
            {Object.entries(chainBalances || {}).map(([chain, balance]) => {
              const percentage = totalBalance > 0 ? ((balance / totalBalance) * 100).toFixed(1) : 0;
              if (balance === 0) return null;
              return (
                <div key={chain} className="bg-white dark:bg-[#303030] rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <ChainIcon chain={chain} size={32} />
                      <span className="text-gray-900 dark:text-white font-medium">
                        {getNetworkName(chain)}
                      </span>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 text-sm font-medium">
                      {percentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Balance</p>
                      <p className="font-mono text-gray-900 dark:text-white">
                        {balance.toFixed(2)} {selectedCrypto}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">USD Value</p>
                      <p className="text-muted-foreground">≈ ${balance.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4 mt-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Multi-Chain Distribution
                </p>
                <p className="text-sm text-muted-foreground">
                  Your {selectedCrypto} balance is distributed across multiple chains. Use the deposit and send tabs to manage funds on specific chains.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deposit View */}
      {manageView === "deposit" && (
        <div className="space-y-6">
          {/* Multi-Chain Address Info Box */}
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-900">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
                  Multi-Chain Address
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Your wallet address works across all supported chains (Ethereum, Polygon, Arbitrum, Optimism, Base). Send {selectedCrypto} from any of these networks to the address below.
                </p>
              </div>
            </div>
          </div>

          {/* Wallet Address Label */}
          <div>
            <Label className="text-gray-600 dark:text-gray-400">Wallet Address ({selectedCrypto})</Label>
          </div>

          {/* Address Copy Button */}
          <div>
            <WalletAddressCopyButton address={walletAddress} />
          </div>

          {/* QR Code Section */}
          <div className="bg-[#1D2E3F] dark:bg-[#1D2E3F] p-8 rounded-2xl">
            <div className="text-center space-y-4">
              <p className="text-white">Scan QR Code to Deposit</p>
              {qrCode && (
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-2xl inline-block">
                    <img src={qrCode} alt="Wallet QR Code" className="w-48 h-48" />
                  </div>
                </div>
              )}
              <p className="text-sm text-gray-400">Use your wallet app to scan</p>
            </div>
          </div>

          {/* Important Warning */}
          <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-2xl border border-orange-200 dark:border-orange-900">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-orange-900 dark:text-orange-200 mb-1">
                  Important
                </p>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Send only {selectedCrypto} to this address on supported EVM chains. Sending other assets or using unsupported networks may result in permanent loss of funds.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send View */}
      {manageView === "send" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Network</Label>
            <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
              <SelectTrigger>
                <SelectValue>
                  <div className="flex items-center space-x-2">
                    <ChainIcon chain={selectedNetwork} size={20} />
                    <span>{getNetworkName(selectedNetwork)}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.keys(chainBalances || {}).map((network) => (
                  <SelectItem key={network} value={network}>
                    <div className="flex items-center space-x-2">
                      <ChainIcon chain={network} size={20} />
                      <span>{getNetworkName(network)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Recipient Address</Label>
            <Input
              placeholder="0x..."
              value={sendAddr}
              onChange={(e) => setSendAddr(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Amount ({selectedCrypto})</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={sendAmt}
              onChange={(e) => setSendAmt(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Available: {chainBalances?.[selectedNetwork]?.toFixed(2) || "0.00"} {selectedCrypto}
            </p>
          </div>

          <Button
            onClick={handleSend}
            disabled={!sendAddr || !sendAmt || parseFloat(sendAmt) <= 0}
            className="w-full min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full transition-all duration-200"
          >
            <SendIcon className="w-[18px] h-[18px] mr-2" />
            <span className="font-medium">Send {sendAmt || "0"} {selectedCrypto}</span>
          </Button>
        </div>
      )}
    </>
  );

  // Mobile sheet variant
  if (variant === "mobile-sheet") {
    return (
      <div className="md:hidden fixed inset-0 bg-white dark:bg-[#0A0A0A] z-50 flex flex-col">
        {/* Sticky Header - Contains Back Button, Coin Info, and Tab Buttons */}
        <div className="sticky top-0 bg-white dark:bg-[#0A0A0A] p-4 z-10">
          {/* Back Button */}
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 px-3 py-2 min-h-10 rounded-full text-gray-900 dark:text-[#F6F7F9] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] transition-all duration-200"
          >
            <ArrowLeft className="w-[18px] h-[18px] mr-2" />
            Back to Wallets
          </Button>
          
          {/* Coin Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <CryptoIcon symbol={selectedCrypto} />
              <div>
                <h2 className="text-xl font-medium">{selectedCrypto}</h2>
                <p className="font-mono text-gray-900 dark:text-white">
                  {totalBalance.toFixed(2)} {selectedCrypto}
                </p>
                <p className="text-sm text-muted-foreground">
                  ≈ ${totalBalance.toFixed(2)} USD
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={manageView} onValueChange={(value) => setManageView(value as "breakdown" | "deposit" | "send")}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="breakdown">
                <Activity className="w-[18px] h-[18px] mr-2" />
                Chains
              </TabsTrigger>
              <TabsTrigger value="deposit">
                <Download className="w-[18px] h-[18px] mr-2" />
                Deposit
              </TabsTrigger>
              <TabsTrigger value="send">
                <SendIcon className="w-[18px] h-[18px] mr-2" />
                Send
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {renderContent()}
        </div>
      </div>
    );
  }

  // Desktop card variant
  return (
    <Card className="bg-white dark:bg-[#303030] shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CryptoIcon symbol={selectedCrypto} />
            <div>
              <CardTitle>{selectedCrypto}</CardTitle>
              <p className="font-mono text-gray-900 dark:text-white">
                {totalBalance.toFixed(2)} {selectedCrypto}
              </p>
              <p className="text-sm text-muted-foreground">
                ≈ ${totalBalance.toFixed(2)} USD
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tabs */}
        <Tabs value={manageView} onValueChange={(value) => setManageView(value as "breakdown" | "deposit" | "send")}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="breakdown">
              <Activity className="w-[18px] h-[18px] mr-2" />
              Chains
            </TabsTrigger>
            <TabsTrigger value="deposit">
              <Download className="w-[18px] h-[18px] mr-2" />
              Deposit
            </TabsTrigger>
            <TabsTrigger value="send">
              <SendIcon className="w-[18px] h-[18px] mr-2" />
              Send
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {renderContent()}
      </CardContent>
    </Card>
  );
};