import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Copy, Check, Download } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { CryptoIcon } from "../CryptoIcon";
import { ChainIcon } from "../ChainIcon";

interface ReceiveCryptoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletAddress: string;
  copiedItem: string | null;
  onCopy: (text: string) => void;
}

/**
 * ReceiveCryptoDialog - End User Receive Crypto Interface
 * 
 * MD3-compliant dialog for receiving crypto with:
 * - Wallet address display
 * - QR code (placeholder for now)
 * - Currency selection
 * - Chain selection
 * - Copy address functionality
 */
export const ReceiveCryptoDialog: React.FC<ReceiveCryptoDialogProps> = ({
  open,
  onOpenChange,
  walletAddress,
  copiedItem,
  onCopy,
}) => {
  const [selectedCrypto, setSelectedCrypto] = useState("USDC");
  const [selectedChain, setSelectedChain] = useState("polygon");

  const handleDownloadQR = () => {
    toast.success("QR code download coming soon!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-[#303030] rounded-3xl shadow-xl max-w-md">
        <DialogHeader>
          <DialogTitle>Receive Crypto</DialogTitle>
          <DialogDescription>
            Share your wallet address to receive cryptocurrency
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Currency Selection */}
          <div className="space-y-2">
            <Label htmlFor="receive-currency">Currency</Label>
            <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
              <SelectTrigger id="receive-currency" className="rounded h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="USDC" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <CryptoIcon symbol="USDC" />
                    <span>USDC</span>
                  </div>
                </SelectItem>
                <SelectItem value="USDT" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <CryptoIcon symbol="USDT" />
                    <span>USDT</span>
                  </div>
                </SelectItem>
                <SelectItem value="EURC" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <CryptoIcon symbol="EURC" />
                    <span>EURC</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Chain Selection */}
          <div className="space-y-2">
            <Label htmlFor="receive-chain">Blockchain Network</Label>
            <Select value={selectedChain} onValueChange={setSelectedChain}>
              <SelectTrigger id="receive-chain" className="rounded h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="ethereum" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <ChainIcon chain="ethereum" size={20} />
                    <span>Ethereum</span>
                  </div>
                </SelectItem>
                <SelectItem value="polygon" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <ChainIcon chain="polygon" size={20} />
                    <span>Polygon</span>
                  </div>
                </SelectItem>
                <SelectItem value="arbitrum" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <ChainIcon chain="arbitrum" size={20} />
                    <span>Arbitrum</span>
                  </div>
                </SelectItem>
                <SelectItem value="optimism" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <ChainIcon chain="optimism" size={20} />
                    <span>Optimism</span>
                  </div>
                </SelectItem>
                <SelectItem value="base" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <ChainIcon chain="base" size={20} />
                    <span>Base</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* QR Code Placeholder */}
          <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-8 flex items-center justify-center">
            <div className="w-48 h-48 bg-white dark:bg-[#1D2E3F] rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">QR Code</p>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-[#FFF4E5] dark:bg-[#4A3800] rounded-xl p-4">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-[#D9C370] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-[#2E3C49]">!</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#2E3C49] dark:text-[#D9C370]">
                  Important
                </p>
                <p className="text-sm text-[#2E3C49] dark:text-[#D9C370]">
                  Only send {selectedCrypto} on {selectedChain} network to this address. 
                  Sending other tokens may result in permanent loss.
                </p>
              </div>
            </div>
          </div>

          {/* Wallet Address */}
          <div className="space-y-2">
            <Label>Your Wallet Address</Label>
            <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-4">
              <div className="flex items-center justify-between gap-4">
                <code className="text-sm break-all flex-1">
                  {walletAddress}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCopy(walletAddress)}
                  className="rounded-full flex-shrink-0"
                >
                  {copiedItem === walletAddress ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleDownloadQR}
              className="flex-1 min-h-12 rounded-full"
            >
              <Download className="w-[18px] h-[18px] mr-2" />
              Download QR
            </Button>
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full transition-all duration-200"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
