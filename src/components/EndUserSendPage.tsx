import React, { useState } from 'react';
import { PageLayout } from './PageLayout';
import { Send, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { getChainName } from '../utils/helpers';

interface EndUserSendPageProps {
  wallets?: any[];
}

const EndUserSendPage: React.FC<EndUserSendPageProps> = ({ wallets = [] }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USDC');
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [sending, setSending] = useState(false);
  const [sendComplete, setSendComplete] = useState(false);

  // Get wallet balance for selected currency and chain
  const getBalance = () => {
    const wallet = wallets.find(
      (w) => w.currency === selectedCurrency && w.chain === selectedChain
    );
    return wallet?.balance || 0;
  };

  const handleSend = () => {
    setSending(true);
    // Simulate sending
    setTimeout(() => {
      setSending(false);
      setSendComplete(true);
      setRecipientAddress('');
      setAmount('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSendComplete(false);
      }, 5000);
    }, 2000);
  };

  const isValidAddress = (address: string) => {
    return address.length === 42 && address.startsWith('0x');
  };

  const canSend = 
    recipientAddress && 
    isValidAddress(recipientAddress) && 
    amount && 
    parseFloat(amount) > 0 && 
    parseFloat(amount) <= getBalance();

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<Send className="w-6 h-6 text-[#FF5914]" />}
        title="Send Crypto"
        subtitle="Transfer stablecoins to any wallet address"
      />
      <PageLayout.Content>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Success Alert */}
          {sendComplete && (
            <Alert className="bg-[#7DD069]/10 border-[#7DD069]/20">
              <CheckCircle className="h-4 w-4 text-[#7DD069]" />
              <AlertDescription className="text-[#7DD069]">
                Transaction sent successfully! It will be confirmed on the blockchain shortly.
              </AlertDescription>
            </Alert>
          )}

          {/* Send Form Card */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h3 className="font-medium">Send Transaction</h3>
              <p className="text-muted-foreground text-sm">
                Enter recipient address and amount
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Currency and Network Selection */}
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

              {/* Balance Display */}
              <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg px-4 py-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Available Balance</span>
                  <span className="font-medium">
                    {getBalance().toFixed(2)} {selectedCurrency}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {getChainName(selectedChain)} Network
                </div>
              </div>

              {/* Recipient Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Recipient Address</label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="w-full h-12 px-4 py-3 rounded bg-transparent border border-[#43586C] text-gray-900 dark:text-white placeholder:text-[#798A9B] hover:border-[#757575] focus:border-2 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
                  placeholder="0x..."
                />
                {recipientAddress && !isValidAddress(recipientAddress) && (
                  <p className="text-sm text-[#FF5914]">Invalid wallet address</p>
                )}
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Amount</label>
                  <button
                    type="button"
                    onClick={() => setAmount(getBalance().toString())}
                    className="text-sm text-[#1E88E5] hover:underline"
                  >
                    Max
                  </button>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full h-12 px-4 py-3 rounded bg-transparent border border-[#43586C] text-gray-900 dark:text-white placeholder:text-[#798A9B] hover:border-[#757575] focus:border-2 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                {amount && parseFloat(amount) > getBalance() && (
                  <p className="text-sm text-[#FF5914]">Insufficient balance</p>
                )}
              </div>

              {/* Warning Alert */}
              {recipientAddress && isValidAddress(recipientAddress) && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please double-check the recipient address. Transactions cannot be reversed.
                  </AlertDescription>
                </Alert>
              )}

              {/* Send Button */}
              <Button
                onClick={handleSend}
                disabled={!canSend || sending}
                className="w-full min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] disabled:bg-[#43586C] disabled:text-[#798A9B] disabled:opacity-38 rounded-full transition-all duration-200"
              >
                {sending ? 'Sending...' : 'Send Transaction'}
              </Button>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="rounded-2xl bg-[#E3F2FD] dark:bg-[#1565C0]/20 border-[#1E88E5]/20">
            <CardContent className="p-6">
              <div className="space-y-2">
                <h4 className="font-medium text-[#1E88E5]">Important Notes</h4>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  <li>Always verify the recipient address before sending</li>
                  <li>Blockchain transactions are irreversible</li>
                  <li>Network fees may apply depending on network congestion</li>
                  <li>Transaction confirmation time varies by network</li>
                  <li>Only send to addresses on the same network</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default EndUserSendPage;