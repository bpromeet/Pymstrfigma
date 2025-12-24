import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { RefreshCw, Check, Copy, HelpCircle, Building2 } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { truncateAddress } from '../../utils/address';
import { calculateCryptoAmount } from '../../utils/helpers';
import { formatPrice } from '../../utils/currency';

interface Payment {
  id: string;
  price: number;
  baseCurrency: string;
  description: string;
  merchantLogo?: string;
}

interface CryptoOption {
  symbol: string;
  name: string;
  logo: React.ReactNode;
}

interface ChainOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface FundAccountScreenProps {
  // Wallet & Account
  walletAddress: string;
  
  // Crypto & Chain Selection
  selectedCrypto: string;
  selectedChain: string;
  supportedCryptos: CryptoOption[];
  supportedChains: ChainOption[];
  
  // Payment Info
  currentPayment: Payment | null;
  
  // Balance & Funding State
  fundsReceived: boolean;
  getWalletBalance: (crypto: string, chain: string) => number;
  
  // Copy Functionality
  copiedItem: string | null;
  onCopyToClipboard: (text: string) => void;
  setCopiedItem: (text: string | null) => void;
}

export const FundAccountScreen: React.FC<FundAccountScreenProps> = ({
  walletAddress,
  selectedCrypto,
  selectedChain,
  supportedCryptos,
  supportedChains,
  currentPayment,
  fundsReceived,
  getWalletBalance,
  copiedItem,
  onCopyToClipboard,
  setCopiedItem,
}) => {
  return (
    <div className="flex flex-col justify-center flex-1 space-y-6">
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
        
        {/* Price + Description (one line) */}
        <p className="text-muted-foreground">
          {formatPrice(currentPayment?.price || 156.78, currentPayment?.baseCurrency)} • {currentPayment?.description || "Monthly Subscription"}
        </p>
        
        {/* Title */}
        <h3 className="text-muted-foreground">Send {selectedCrypto} to this address</h3>
      </div>

      {/* QR Code + Wallet Address (Horizontal Layout) */}
      <div className="flex gap-3 items-center justify-center">
        {/* QR Code - Left Side */}
        <a 
          href={`https://opensea.io/assets/matic/${walletAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block flex-shrink-0"
          aria-label="Open wallet in OpenSea"
        >
          <div className="bg-white dark:bg-[#303030] hover:bg-[#E3F2FD] dark:hover:bg-[#1E88E5]/20 p-3 rounded-2xl border-2 border-[#43586C] hover:border-[#1E88E5] transition-all duration-200 cursor-pointer h-[88px] flex items-center justify-center">
            <QRCodeCanvas
              value={`https://opensea.io/assets/matic/${walletAddress}`}
              size={64}
              level="H"
              includeMargin={false}
            />
          </div>
        </a>

        {/* Wallet Address Card - Right Side */}
        <div className="flex-1 min-w-0">
          <div className="bg-white dark:bg-[#303030] hover:bg-[#E3F2FD] dark:hover:bg-[#1E88E5]/20 border-2 border-[#43586C] hover:border-[#1E88E5] rounded-2xl p-3 transition-all duration-200 cursor-pointer h-[88px] flex flex-col justify-center">
            <div className="space-y-2">
              <code className="text-xs text-[#1C1B1F] dark:text-[#F6F7F9] block text-center break-all">
                {truncateAddress(walletAddress)}
              </code>
              <Button
                onClick={() => {
                  onCopyToClipboard(walletAddress);
                  setCopiedItem(walletAddress);
                  toast("Address copied to clipboard!");
                  setTimeout(() => setCopiedItem(null), 2000);
                }}
                className="w-full min-h-9 bg-transparent border-none text-[#1E88E5] hover:bg-[#1E88E5]/10 transition-all duration-200 rounded-lg flex items-center justify-center gap-2"
              >
                {copiedItem === walletAddress ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-xs">Copy</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Required Amount Box */}
      <div className={`rounded-xl p-4 border transition-all duration-200 ${
        fundsReceived 
          ? 'bg-[#7DD069]/10 border-[#7DD069]' 
          : 'bg-[#FAFAFA] dark:bg-[#2E3C49] border-[#43586C]'
      }`}>
        <div className="flex items-start gap-3">
          {/* Coin Icon */}
          <div className="flex-shrink-0">
            {supportedCryptos.find(c => c.symbol === selectedCrypto)?.logo}
          </div>
          
          {/* Coin Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-[#1C1B1F] dark:text-[#F6F7F9]">
                {supportedCryptos.find(c => c.symbol === selectedCrypto)?.name}
              </span>
              <span className="text-xs text-muted-foreground">
                on {supportedChains.find(c => c.id === selectedChain)?.name}
              </span>
            </div>
            
            {/* Amount to Fund (Missing Amount Only) */}
            <div className="text-2xl font-medium text-[#1C1B1F] dark:text-[#F6F7F9]">
              {(() => {
                const requiredAmount = parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto));
                const currentBalance = getWalletBalance(selectedCrypto, selectedChain);
                const missingAmount = Math.max(0, requiredAmount - currentBalance);
                return `${missingAmount.toFixed(2)} ${selectedCrypto}`;
              })()}
            </div>
            
            {/* "Required" label - small font like Balance */}
            {!fundsReceived && (
              <div className="text-sm text-muted-foreground mt-1">
                Required
              </div>
            )}
            
            {/* Funds Received Subtitle - Only show when funded */}
            {fundsReceived && (
              <div className="flex items-center gap-1.5 mt-1">
                <Check className="w-3.5 h-3.5 text-[#7DD069]" />
                <span className="text-xs text-[#7DD069] font-medium">
                  Funds received
                </span>
              </div>
            )}
          </div>
          
          {/* Info Icon - Only show when not funded */}
          {!fundsReceived && (
            <div className="flex-shrink-0">
              <div className="w-5 h-5 rounded-full border border-[#43586C] flex items-center justify-center">
                <HelpCircle className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Waiting for Funds Button - Always disabled with loader */}
      <Button
        className="w-full min-h-12 px-8 py-3 bg-[#1E88E5] text-white transition-all duration-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={true}
      >
        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
        Waiting for Funds
      </Button>
    </div>
  );
};