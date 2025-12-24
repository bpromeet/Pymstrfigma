import React from "react";
import { Building2, Wallet } from "lucide-react";
import { Button } from "../ui/button";

interface ConfirmPaymentScreenProps {
  currentPayment: {
    price: number;
    baseCurrency: string;
    description: string;
  } | null;
  selectedCrypto: string;
  selectedChain: string;
  paymentStatus: string;
  supportedChains: Array<{ id: string; name: string }>;
  formatPrice: (price: number, currency: string) => string;
  calculateCryptoAmount: (price: number, crypto: string) => string;
  onConfirmPayment: () => void;
}

export const ConfirmPaymentScreen: React.FC<ConfirmPaymentScreenProps> = ({
  currentPayment,
  selectedCrypto,
  selectedChain,
  paymentStatus,
  supportedChains,
  formatPrice,
  calculateCryptoAmount,
  onConfirmPayment,
}) => {
  // Show processing state
  if (paymentStatus === "processing") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          {/* Merchant Logo */}
          <div className="flex justify-center">
            <div className="w-[54px] h-[54px] rounded-xl border-2 border-dashed border-[#43586C] flex items-center justify-center bg-[#FAFAFA] dark:bg-[#262626] overflow-hidden">
              <div className="text-center">
                <Building2 className="w-10 h-10 mx-auto text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="space-y-0">
            <p className="text-muted-foreground">
              {formatPrice(currentPayment?.price || 156.78, currentPayment?.baseCurrency)} •{" "}
              {currentPayment?.description || "Payment to CryptoStore"}
            </p>
          </div>
        </div>

        {/* SCREEN #6: Processing Payment */}
        <div className="text-center space-y-6">
          <div className="w-16 h-16 border-4 border-[#1E88E5] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="space-y-2">
            <h3 className="text-muted-foreground">Processing payment...</h3>
            <p className="text-muted-foreground">
              Please wait while we confirm your transaction
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show confirm payment form (default)
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        {/* Merchant Logo */}
        <div className="flex justify-center">
          <div className="w-[54px] h-[54px] rounded-xl border-2 border-dashed border-[#43586C] flex items-center justify-center bg-[#FAFAFA] dark:bg-[#262626] overflow-hidden">
            <div className="text-center">
              <Building2 className="w-10 h-10 mx-auto text-muted-foreground" />
            </div>
          </div>
        </div>
        
        <div className="space-y-0">
          <p className="text-muted-foreground">
            {formatPrice(currentPayment?.price || 156.78, currentPayment?.baseCurrency)} •{" "}
            {currentPayment?.description || "Payment to CryptoStore"}
          </p>
        </div>
      </div>

      {/* Payment Breakdown */}
      <div className="space-y-6">
        <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] p-4 rounded-xl border border-[#43586C]">
          <div className="flex items-center justify-between mb-3">
            <span>Amount:</span>
            <span>
              {calculateCryptoAmount(
                currentPayment?.price || 156.78,
                selectedCrypto,
              )}{" "}
              {selectedCrypto}
            </span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span>
              {supportedChains.find(
                (chain) => chain.id === selectedChain,
              )?.name || "Network"}{" "}
              Fee:
            </span>
            <span>~0.001 {selectedCrypto}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total:</span>
            <span>
              {(
                parseFloat(
                  calculateCryptoAmount(
                    currentPayment?.price || 156.78,
                    selectedCrypto,
                  ),
                ) + 0.001
              ).toFixed(6)}{" "}
              {selectedCrypto}
            </span>
          </div>
        </div>

        <Button
          className="w-full min-h-12 px-8 py-3 rounded-full bg-[#1E88E5] hover:bg-[#1565C0] text-white transition-all duration-200"
          onClick={onConfirmPayment}
        >
          <Wallet className="w-5 h-5 mr-2" />
          Confirm Payment
        </Button>
      </div>
    </div>
  );
};