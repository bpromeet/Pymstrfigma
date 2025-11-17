import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Send, AlertCircle, Check } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { CryptoIcon } from "../CryptoIcon";
import { ChainIcon } from "../ChainIcon";

interface SendCryptoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * SendCryptoDialog - End User Send Crypto Interface
 * 
 * MD3-compliant dialog for sending crypto with:
 * - Recipient address input
 * - Amount input with balance validation
 * - Currency selection (USDC/USDT/EURC)
 * - Chain selection
 * - Transaction confirmation
 */
export const SendCryptoDialog: React.FC<SendCryptoDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("USDC");
  const [selectedChain, setSelectedChain] = useState("polygon");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock balances - in real app, these would come from props or context
  const balances: { [key: string]: number } = {
    USDC: 500.0,
    USDT: 234.56,
    EURC: 100.0,
  };

  const availableBalance = balances[selectedCrypto] || 0;

  const handleSendMax = () => {
    setAmount(availableBalance.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!recipientAddress) {
      toast.error("Please enter a recipient address");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > availableBalance) {
      toast.error("Insufficient balance");
      return;
    }

    // Basic address validation (starts with 0x, 42 chars)
    if (!recipientAddress.startsWith("0x") || recipientAddress.length !== 42) {
      toast.error("Invalid wallet address format");
      return;
    }

    setIsSubmitting(true);

    // Simulate transaction submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      toast.success("Transaction submitted successfully!");

      // Reset form after 2 seconds and close
      setTimeout(() => {
        setShowSuccess(false);
        setRecipientAddress("");
        setAmount("");
        setSelectedCrypto("USDC");
        setSelectedChain("polygon");
        onOpenChange(false);
      }, 2000);
    }, 2000);
  };

  const resetForm = () => {
    setRecipientAddress("");
    setAmount("");
    setSelectedCrypto("USDC");
    setSelectedChain("polygon");
    setShowSuccess(false);
    setIsSubmitting(false);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="bg-white dark:bg-[#303030] rounded-3xl shadow-xl max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#7DD069] rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl mb-2">Transaction Sent!</h3>
            <p className="text-muted-foreground">
              Your transaction has been submitted to the blockchain
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:bg-[#303030] rounded-3xl shadow-xl max-w-md">
        <DialogHeader>
          <DialogTitle>Send Crypto</DialogTitle>
          <DialogDescription>
            Send cryptocurrency to another wallet address
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Currency Selection */}
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
              <SelectTrigger id="currency" className="rounded h-12">
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
            <Label htmlFor="chain">Blockchain Network</Label>
            <Select value={selectedChain} onValueChange={setSelectedChain}>
              <SelectTrigger id="chain" className="rounded h-12">
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

          {/* Recipient Address */}
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              type="text"
              placeholder="0x..."
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="rounded h-12 font-mono"
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="amount">Amount</Label>
              <span className="text-sm text-muted-foreground">
                Balance: {availableBalance.toFixed(2)} {selectedCrypto}
              </span>
            </div>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded h-12 pr-20"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleSendMax}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 rounded-full text-[#1E88E5] hover:bg-[#E3F2FD]"
              >
                Max
              </Button>
            </div>
            {amount && parseFloat(amount) > availableBalance && (
              <div className="flex items-center gap-1 text-sm text-[#FF5914]">
                <AlertCircle className="w-4 h-4" />
                <span>Insufficient balance</span>
              </div>
            )}
          </div>

          {/* Transaction Summary */}
          {amount && parseFloat(amount) > 0 && (
            <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">You're sending</span>
                <span className="font-medium">
                  {parseFloat(amount).toFixed(2)} {selectedCrypto}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Network</span>
                <span className="font-medium capitalize">{selectedChain}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated fee</span>
                <span className="font-medium">~$0.50</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isSubmitting}
              className="flex-1 min-h-12 rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !recipientAddress ||
                !amount ||
                parseFloat(amount) <= 0 ||
                parseFloat(amount) > availableBalance
              }
              className="flex-1 min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full transition-all duration-200"
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-[18px] h-[18px] mr-2" />
                  Send
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
