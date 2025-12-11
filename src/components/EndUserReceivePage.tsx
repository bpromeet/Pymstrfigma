import React, { useState } from 'react';
import { PageLayout } from './PageLayout';
import { ArrowDownToLine, Copy, Check, QrCode } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner';
import { getChainName } from '../utils/helpers';
import { truncateAddress } from '../utils/address';

// Using qrcode.react library
import { QRCodeSVG } from 'qrcode.react';

interface EndUserReceivePageProps {
  wallets?: any[];
}

const EndUserReceivePage: React.FC<EndUserReceivePageProps> = ({ wallets = [] }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USDC');
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Get wallet address for selected currency and chain
  const getWalletAddress = () => {
    const wallet = wallets.find(
      (w) => w.currency === selectedCurrency && w.chain === selectedChain
    );
    return wallet?.address || '0x742d35Cc100205c3bD8Dd84E33E1A66b95f0bEb5';
  };

  const walletAddress = getWalletAddress();

  const copyToClipboard = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      setCopiedItem(text);
      toast('Address copied to clipboard!');
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      toast('Failed to copy address');
    } finally {
      document.body.removeChild(textarea);
    }
  };

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<ArrowDownToLine className="w-6 h-6 text-[#FF5914]" />}
        title="Receive Crypto"
        subtitle="Get your wallet address and QR code"
      />
      <PageLayout.Content>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Currency and Network Selection */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h3 className="font-medium">Select Currency & Network</h3>
              <p className="text-muted-foreground text-sm">
                Choose which wallet address to display
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Currency</label>
                  <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="EURC">EURC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Network</label>
                  <Select value={selectedChain} onValueChange={setSelectedChain}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="arbitrum">Arbitrum</SelectItem>
                      <SelectItem value="optimism">Optimism</SelectItem>
                      <SelectItem value="base">Base</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Card */}
          <Card className="rounded-2xl">
            <CardContent className="p-8">
              <div className="flex flex-col items-center space-y-6">
                {/* QR Code */}
                <div className="bg-white p-6 rounded-2xl">
                  <QRCodeSVG value={walletAddress} size={256} />
                </div>

                {/* Network Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#E3F2FD] dark:bg-[#1565C0]/20 border border-[#1E88E5]/20">
                  <span className="text-sm font-medium text-[#1E88E5]">
                    {selectedCurrency} on {getChainName(selectedChain)}
                  </span>
                </div>

                {/* Wallet Address */}
                <div className="w-full space-y-3">
                  <label className="text-sm font-medium">Your Wallet Address</label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg px-4 py-3 border border-[#43586C]">
                      <code className="text-sm break-all">{walletAddress}</code>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(walletAddress)}
                      variant="outline"
                      className="min-h-12 w-12 rounded-full border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD] p-0 flex items-center justify-center"
                    >
                      {copiedItem === walletAddress ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Short Address for Mobile Display */}
                <div className="sm:hidden w-full text-center">
                  <p className="text-sm text-muted-foreground">Tap to copy</p>
                  <button
                    onClick={() => copyToClipboard(walletAddress)}
                    className="font-mono text-lg mt-2 text-[#1E88E5] hover:underline"
                  >
                    {truncateAddress(walletAddress)}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions Card */}
          <Card className="rounded-2xl bg-[#E3F2FD] dark:bg-[#1565C0]/20 border-[#1E88E5]/20">
            <CardContent className="p-6">
              <div className="space-y-3">
                <h4 className="font-medium text-[#1E88E5]">How to Receive</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E88E5] font-bold">1.</span>
                    <span>Share your wallet address or QR code with the sender</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E88E5] font-bold">2.</span>
                    <span>Ensure the sender is using the same network ({getChainName(selectedChain)})</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E88E5] font-bold">3.</span>
                    <span>Wait for the transaction to be confirmed on the blockchain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E88E5] font-bold">4.</span>
                    <span>Check your wallet balance in the Wallets section</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Warning Card */}
          <Card className="rounded-2xl bg-[#D9C370]/10 dark:bg-[#D9C370]/20 border-[#D9C370]/20">
            <CardContent className="p-6">
              <div className="space-y-2">
                <h4 className="font-medium text-[#D9C370]">⚠️ Important</h4>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  <li>Only receive {selectedCurrency} on {getChainName(selectedChain)} to this address</li>
                  <li>Sending different tokens or using wrong network may result in loss of funds</li>
                  <li>Always verify the network before sharing your address</li>
                  <li>This is a smart contract wallet address</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default EndUserReceivePage;