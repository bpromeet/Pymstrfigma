import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ArrowLeft, Download, Copy, Check } from "lucide-react";
import { CryptoIcon } from "../CryptoIcon";
import { ChainIcon } from "../ChainIcon";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import { truncateAddress } from "../../utils/address";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ReceiveMoneyFlowProps {
  onBack: () => void;
  walletAddress: string;
}

/**
 * ReceiveMoneyFlow - End User Receive Money Component
 * 
 * Shows QR code and wallet address for receiving crypto
 * MD3 compliant with user-friendly language
 */
export const ReceiveMoneyFlow: React.FC<ReceiveMoneyFlowProps> = ({
  onBack,
  walletAddress,
}) => {
  const [selectedCrypto, setSelectedCrypto] = useState<string>("USDC");
  const [selectedChain, setSelectedChain] = useState<string>("Polygon");
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const chains = ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Base"];
  const cryptos = ["USDC", "USDT", "EURC"];

  const copyToClipboard = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      setCopiedAddress(text);
      toast("Address copied to clipboard!");
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      toast("Failed to copy address");
    } finally {
      document.body.removeChild(textarea);
    }
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle>Receive</CardTitle>
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

        {/* QR Code */}
        <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-2xl p-6">
          <div className="bg-white rounded-xl p-6 inline-block mx-auto w-full flex justify-center">
            <QRCode
              value={walletAddress}
              size={200}
              className="mx-auto"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Scan this QR code to send {selectedCrypto} on {selectedChain}
          </p>
        </div>

        {/* Wallet Address */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-900 dark:text-white">
            Your Wallet Address
          </Label>
          <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-4 flex items-center justify-between gap-3">
            <code className="text-sm text-gray-900 dark:text-white break-all flex-1">
              {truncateAddress(walletAddress)}
            </code>
            <Button
              onClick={() => copyToClipboard(walletAddress)}
              className="flex-shrink-0 min-h-10 px-4 rounded-full bg-[#07D7FF] text-white hover:bg-[#06c4e6] transition-all duration-200"
            >
              {copiedAddress === walletAddress ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-[#FFF9E6] dark:bg-[#3D3319] rounded-xl p-4 border-l-4 border-[#D9C370]">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-5 h-5 rounded-full bg-[#D9C370] flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Important
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Only send {selectedCrypto} to this address</li>
                <li>Make sure you're using {selectedChain} network</li>
                <li>Sending wrong currency or network may result in loss of funds</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};