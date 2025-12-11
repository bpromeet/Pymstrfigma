import React, { useState } from 'react';
import { PageLayout } from './PageLayout';
import { Coins, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { getOnRamperNetwork } from '../utils/helpers';

interface EndUserBuyPageProps {
  walletAddress?: string;
}

const EndUserBuyPage: React.FC<EndUserBuyPageProps> = ({ walletAddress = '0x742d35Cc100205c3bD8Dd84E33E1A66b95f0bEb5' }) => {
  const [selectedCrypto, setSelectedCrypto] = useState('USDC');
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const [amount, setAmount] = useState('100');

  // OnRamper widget URL
  const onRamperUrl = `https://widget.onramper.com?apiKey=pk_prod_01JA8K7NMCXHXQZYNT22V3FPJ8&defaultCrypto=${selectedCrypto}&defaultAmount=${amount}&networks=${getOnRamperNetwork(selectedChain)}&wallets=${selectedCrypto}:${walletAddress}&isAddressEditable=false`;

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<Coins className="w-6 h-6 text-[#FF5914]" />}
        title="Buy Crypto"
        subtitle="Purchase stablecoins with credit card or bank transfer"
      />
      <PageLayout.Content>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Configuration Card */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h3 className="font-medium">Purchase Settings</h3>
              <p className="text-muted-foreground text-sm">
                Choose your currency and network
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Currency Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Currency</label>
                  <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
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

                {/* Network Selection */}
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

                {/* Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount (USD)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full h-10 px-4 rounded bg-transparent border border-[#43586C] text-gray-900 dark:text-white placeholder:text-[#798A9B] hover:border-[#757575] focus:border-2 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
                    placeholder="100"
                    min="10"
                    step="10"
                  />
                </div>
              </div>

              {/* Destination Wallet */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Destination Wallet</label>
                <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg px-4 py-3">
                  <code className="text-sm break-all">{walletAddress}</code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* OnRamper Widget Card */}
          <Card className="rounded-2xl">
            <CardContent className="p-0">
              <div className="rounded-2xl overflow-hidden">
                <iframe
                  src={onRamperUrl}
                  title="OnRamper Widget"
                  height="600px"
                  width="100%"
                  allow="accelerometer; autoplay; camera; gyroscope; payment"
                  style={{ border: 'none' }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="rounded-2xl bg-[#E3F2FD] dark:bg-[#1565C0]/20 border-[#1E88E5]/20">
            <CardContent className="p-6">
              <div className="space-y-2">
                <h4 className="font-medium text-[#1E88E5]">How it works</h4>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  <li>Select your preferred currency and network</li>
                  <li>Enter the amount you want to purchase</li>
                  <li>Complete the purchase through our payment partner OnRamper</li>
                  <li>Crypto will be sent directly to your wallet</li>
                  <li>Supported payment methods: Credit card, bank transfer, Apple Pay, Google Pay</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default EndUserBuyPage;