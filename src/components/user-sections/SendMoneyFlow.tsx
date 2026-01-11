import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ArrowLeft, Send, AlertCircle, HelpCircle } from "lucide-react";
import { CryptoIcon } from "../CryptoIcon";
import { ChainIcon } from "../ChainIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SendMoneyFlowProps {
  onBack: () => void;
  walletAddress: string;
  availableBalances: {
    [crypto: string]: number;
  };
}

/**
 * SendMoneyFlow - End User Send Money Component
 * 
 * Allows users to send crypto to another wallet address
 * MD3 compliant with user-friendly language
 */
export const SendMoneyFlow: React.FC<SendMoneyFlowProps> = ({
  onBack,
  walletAddress,
  availableBalances,
}) => {
  const [selectedCrypto, setSelectedCrypto] = useState<string>("USDC");
  const [selectedChain, setSelectedChain] = useState<string>("Polygon");
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [step, setStep] = useState<"form" | "confirm" | "success">("form");

  const chains = ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Base"];
  const cryptos = ["USDC", "USDT", "EURC"];

  const availableBalance = availableBalances[selectedCrypto] || 0;
  const estimatedGasFee = 0.50; // Mock gas fee

  const handleSend = () => {
    // Mock send - would call actual blockchain transaction
    setStep("success");
  };

  const isValidAmount = amount && parseFloat(amount) > 0 && parseFloat(amount) <= availableBalance;
  const isValidAddress = recipientAddress.length === 42 && recipientAddress.startsWith("0x");

  if (step === "success") {
    return (
      <div className="space-y-6">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="pt-6 pb-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#7DD069]/10 flex items-center justify-center mx-auto">
                <div className="w-12 h-12 rounded-full bg-[#7DD069] flex items-center justify-center">
                  <span className="text-2xl text-white">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Money Sent Successfully!
                </h3>
                <p className="text-muted-foreground">
                  Your payment has been sent
                </p>
              </div>
              <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {amount} {selectedCrypto}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedChain}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onBack}
                  className="flex-1 min-h-12 rounded-full"
                >
                  Done
                </Button>
                <Button
                  onClick={() => setStep("form")}
                  className="flex-1 min-h-12 rounded-full bg-[#1E88E5] text-white hover:bg-[#1565C0]"
                >
                  Send Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={() => setStep("form")}
          className="min-h-12 rounded-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Confirm Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">You're sending:</span>
                <div className="flex items-center gap-2">
                  <CryptoIcon symbol={selectedCrypto} size={20} />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {amount} {selectedCrypto}
                  </span>
                </div>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-700" />
              <div className="flex justify-between">
                <span className="text-muted-foreground">To address:</span>
                <code className="text-xs text-gray-900 dark:text-white">
                  {recipientAddress.slice(0, 6)}...{recipientAddress.slice(-4)}
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network:</span>
                <div className="flex items-center gap-2">
                  <ChainIcon chain={selectedChain} size={16} />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedChain}
                  </span>
                </div>
              </div>
              {note && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Note:</span>
                  <span className="text-sm text-gray-900 dark:text-white">{note}</span>
                </div>
              )}
            </div>

            <div className="bg-[#FFF9E6] dark:bg-[#3D3319] rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#D9C370]">Estimated Gas Fee:</span>
                <span className="font-semibold text-[#D9C370]">
                  ${estimatedGasFee.toFixed(2)}
                </span>
              </div>
              <div className="h-px bg-[#D9C370]/20" />
              <div className="flex justify-between">
                <span className="font-medium text-gray-900 dark:text-white">Total:</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {amount} {selectedCrypto} + ${estimatedGasFee.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("form")}
                className="flex-1 min-h-12 rounded-full"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSend}
                className="flex-1 min-h-12 rounded-full bg-[#1E88E5] text-white hover:bg-[#1565C0]"
              >
                <Send className="w-[18px] h-[18px] mr-2" />
                Confirm & Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "form") {
    return (
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle>Send</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Side-by-side Dropdowns: Stablecoin and Chain (Checkout Pattern) */}
          <div className="grid grid-cols-2 gap-3">
            {/* Stablecoin Selection Dropdown */}
            <div className="space-y-1.5">
              <Label className="text-sm">Stablecoin</Label>
              <Select
                value={selectedCrypto}
                onValueChange={setSelectedCrypto}
              >
                <SelectTrigger className="h-12 rounded-xl bg-transparent border-2 border-[#07D7FF] hover:border-[#06c4e6] hover:bg-[#07D7FF]/10 focus:bg-[#07D7FF]/10 focus:border-[#07D7FF] focus:ring-2 focus:ring-[#07D7FF] transition-all duration-200">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <CryptoIcon symbol={selectedCrypto} size={20} />
                      <span>{selectedCrypto}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#262626] rounded-xl">
                  {cryptos.map((crypto) => (
                    <SelectItem
                      key={crypto}
                      value={crypto}
                      className="cursor-pointer hover:bg-[#07D7FF]/10 rounded-lg my-1"
                    >
                      <div className="flex items-center gap-2">
                        <CryptoIcon symbol={crypto} size={20} />
                        <span>{crypto}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Chain Selection Dropdown */}
            <div className="space-y-1.5">
              <Label className="text-sm">Chain</Label>
              <Select
                value={selectedChain}
                onValueChange={setSelectedChain}
              >
                <SelectTrigger className="h-12 rounded-xl bg-transparent border-2 border-[#07D7FF] hover:border-[#06c4e6] hover:bg-[#07D7FF]/10 focus:bg-[#07D7FF]/10 focus:border-[#07D7FF] focus:ring-2 focus:ring-[#07D7FF] transition-all duration-200">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <ChainIcon chain={selectedChain} size={20} />
                      <span>{selectedChain}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#262626] rounded-xl">
                  {chains.map((chain) => (
                    <SelectItem
                      key={chain}
                      value={chain}
                      className="cursor-pointer hover:bg-[#07D7FF]/10 rounded-lg my-1"
                    >
                      <div className="flex items-center gap-2">
                        <ChainIcon chain={chain} size={20} />
                        <span>{chain}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Result Box - Shows selected coin and balance (Checkout Pattern) */}
          <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-4 border border-[#43586C]">
            <div className="flex items-start gap-3">
              {/* Coin Icon */}
              <div className="flex-shrink-0">
                <CryptoIcon symbol={selectedCrypto} size={40} />
              </div>
              
              {/* Coin Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-[#1C1B1F] dark:text-[#F6F7F9]">
                    {selectedCrypto}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    on {selectedChain}
                  </span>
                </div>
                
                {/* Available Balance */}
                <div className="text-2xl font-medium text-[#1C1B1F] dark:text-[#F6F7F9] mb-2">
                  {availableBalance.toFixed(2)} {selectedCrypto}
                </div>
                
                {/* Balance Label */}
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="text-muted-foreground">
                    Available Balance
                  </span>
                </div>
              </div>
              
              {/* Info Icon */}
              <div className="flex-shrink-0">
                <div className="w-5 h-5 rounded-full border border-[#43586C] flex items-center justify-center">
                  <HelpCircle className="w-3 h-3 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Recipient Address */}
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              type="text"
              placeholder="0x..."
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className={`rounded ${
                recipientAddress && !isValidAddress
                  ? "border-[#FF5914] focus:border-[#FF5914] focus:ring-[#FF5914]"
                  : ""
              }`}
            />
            {recipientAddress && !isValidAddress && (
              <div className="flex items-center gap-2 text-[#FF5914] text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Please enter a valid wallet address</span>
              </div>
            )}
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="amount">Amount</Label>
              <span className="text-sm text-muted-foreground">
                Available: {availableBalance.toFixed(2)} {selectedCrypto}
              </span>
            </div>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`rounded pr-20 ${
                  amount && !isValidAmount
                    ? "border-[#FF5914] focus:border-[#FF5914] focus:ring-[#FF5914]"
                    : ""
                }`}
              />
              <button
                onClick={() => setAmount(availableBalance.toString())}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-[#1E88E5] text-white text-xs font-medium hover:bg-[#1565C0] transition-all duration-200"
              >
                Max
              </button>
            </div>
            {amount && !isValidAmount && (
              <div className="flex items-center gap-2 text-[#FF5914] text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Insufficient balance or invalid amount</span>
              </div>
            )}
          </div>

          {/* Note (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input
              id="note"
              type="text"
              placeholder="Add a note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="rounded"
            />
          </div>

          {/* Continue Button */}
          <Button
            onClick={() => setStep("confirm")}
            disabled={!isValidAmount || !isValidAddress}
            className="w-full min-h-12 rounded-full bg-[#1E88E5] text-white hover:bg-[#1565C0] disabled:opacity-38 disabled:cursor-not-allowed"
          >
            <Send className="w-[18px] h-[18px] mr-2" />
            Continue
          </Button>
        </CardContent>
      </Card>
    );
  }
};