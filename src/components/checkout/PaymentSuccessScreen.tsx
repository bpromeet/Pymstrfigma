import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface PaymentSuccessScreenProps {
  onReturnToMerchant: () => void;
}

export const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({
  onReturnToMerchant,
}) => {
  return (
    <div className="text-center space-y-6">
      {/* Success Checkmark - MD3 Compliant */}
      <div className="w-16 h-16 bg-[#7DD069]/20 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-[#7DD069]" />
      </div>

      {/* Success Message */}
      <div className="space-y-2">
        <h3 className="text-muted-foreground">Payment Successful!</h3>
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
  );
};