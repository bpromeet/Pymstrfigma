import React from 'react';
import { Building2, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface PaymentSuccessScreenProps {
  currentPayment: {
    price: number;
    baseCurrency: string;
    description: string;
  } | null;
  formatPrice: (price: number, currency: string) => string;
  onReturnToMerchant: () => void;
}

export const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({
  currentPayment,
  formatPrice,
  onReturnToMerchant,
}) => {
  return (
    <div className="space-y-6">
      {/* Merchant Logo + Price + Description */}
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
            {formatPrice(currentPayment?.price || 150, currentPayment?.baseCurrency || "USD")} •{" "}
            {currentPayment?.description || "Monthly Subscription"}
          </p>
        </div>
      </div>

      {/* Success Checkmark - MD3 Compliant */}
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-[#7DD069]/20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-[#7DD069]" />
        </div>

        {/* Success Message */}
        <div className="space-y-2">
          <h3 className="text-gray-900 dark:text-white">Payment Successful!</h3>
          <p className="text-muted-foreground">
            Click User to view Wallet
          </p>
        </div>

        {/* Return to Merchant Button - MD3 Filled Button */}
        <Button
          className="w-full min-h-12 px-8 py-3 rounded-full bg-[#1E88E5] hover:bg-[#1565C0] text-white transition-all duration-200"
          onClick={onReturnToMerchant}
        >
          Return to Merchant
        </Button>
      </div>
    </div>
  );
};