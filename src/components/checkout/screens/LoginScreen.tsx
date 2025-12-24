import React from 'react';
import { Button } from '../../ui/button';
import { Building2 } from 'lucide-react';
import { MetaMaskLogo, WalletConnectLogo, CoinbaseLogo, GoogleLogo, TwitterLogo, GithubLogo } from '../../WalletLogos';
import { formatPrice } from '../../../utils/currency';

interface LoginScreenProps {
  currentPayment: {
    price: number;
    baseCurrency: string;
    description: string;
  } | null;
  isConnecting: boolean;
  onWalletConnect: (wallet: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  currentPayment,
  isConnecting,
  onWalletConnect,
}) => {
  return (
    <div className="flex flex-col justify-center h-full space-y-6">
      <div className="text-center space-y-4">
        {/* Merchant Logo */}
        <div className="flex justify-center">
          <div className="w-[54px] h-[54px] rounded-xl border-2 border-dashed border-[#43586C] flex items-center justify-center bg-[#FAFAFA] dark:bg-[#262626] overflow-hidden">
            <div className="text-center">
              <Building2 className="w-10 h-10 mx-auto text-muted-foreground" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-muted-foreground">
            {formatPrice(currentPayment?.price || 156.78, currentPayment?.baseCurrency)} •{" "}
            {currentPayment?.description || "Payment"}
          </p>
          <h3 className="text-muted-foreground not-italic">Select Login</h3>
        </div>
      </div>

      {isConnecting ? (
        <div className="text-center space-y-4 py-8">
          <div className="w-16 h-16 border-4 border-[#1E88E5] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">
            Connecting...
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Social Login Options - 2 Column Grid */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#43586C] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
              onClick={() => onWalletConnect("Google")}
            >
              <GoogleLogo className="w-[18px] h-[18px] flex-shrink-0" />
              <span className="flex-1 text-left">
                Google
              </span>
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#43586C] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
              onClick={() => onWalletConnect("Twitter")}
            >
              <TwitterLogo className="w-[18px] h-[18px] flex-shrink-0" />
              <span className="flex-1 text-left">
                Twitter
              </span>
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#43586C] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
              onClick={() => onWalletConnect("Github")}
            >
              <GithubLogo className="w-[18px] h-[18px] flex-shrink-0" />
              <span className="flex-1 text-left">
                Github
              </span>
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#43586C] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
              onClick={() => onWalletConnect("MetaMask")}
            >
              <MetaMaskLogo className="w-[18px] h-[18px] flex-shrink-0" />
              <span className="flex-1 text-left">
                MetaMask
              </span>
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#43586C] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
              onClick={() => onWalletConnect("WalletConnect")}
            >
              <WalletConnectLogo className="w-[18px] h-[18px] flex-shrink-0" />
              <span className="flex-1 text-left">
                WalletConnect
              </span>
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#43586C] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
              onClick={() => onWalletConnect("Coinbase Wallet")}
            >
              <CoinbaseLogo className="w-[18px] h-[18px] flex-shrink-0" />
              <span className="flex-1 text-left">
                Coinbase
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};