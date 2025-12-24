/**
 * PYMSTR Checkout Flow Component
 * 
 * Handles the complete 8-screen checkout experience for end users.
 * Fully migrated to use MD3 design tokens for consistency and maintainability.
 * 
 * Screens:
 * 1. Payment Details + Login CTA
 * 2. Login/Register (Web3Auth)
 * 3. Crypto Selection (USDC/USDT/EURC)
 * 4. Insufficient Balance (Funding Options)
 * 4.5. QR Funding (Scan to Add Funds)
 * 5. Funding Success
 * 6. Payment Confirmation
 * 7. Processing Payment
 * 8. Payment Successful
 */

import React from 'react';
import { Button } from '../ui/button';
import { 
  MD3_COLORS, 
  MD3_RADIUS_CLASSES, 
  MD3_ELEVATION,
  MD3_ICON_SIZES,
  MD3_BUTTON_HEIGHTS,
  MD3_TRANSITIONS,
  MD3_TOUCH_TARGET
} from '../ui/design-tokens';
import {
  ArrowLeft,
  Building2,
  CheckCircle,
  LogIn,
  Loader2,
  Copy,
  Check,
  QrCode,
  CreditCard,
  Wallet,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

// Import wallet logos
import {
  GoogleLogo,
  MetaMaskLogo,
  GithubLogo,
  WalletConnectLogo,
  CoinbaseLogo,
} from '../WalletLogos';

// Import crypto utilities
import { formatPrice } from '../../utils/currency';
import { truncateAddress } from '../../utils/address';
import { copyToClipboard } from '../../utils/clipboard';

interface PaymentLink {
  id: string;
  description: string;
  price: number;
  baseCurrency: 'USD' | 'EUR';
  status: 'active' | 'completed' | 'expired';
  createdAt: string;
  selectedChain?: string;
  selectedCurrency?: string;
  txHash?: string;
}

interface CheckoutFlowProps {
  currentPayment: PaymentLink | null;
  selectedCrypto: string;
  selectedChain: string;
  walletAddress: string;
  paymentStatus: 'pending' | 'processing' | 'completed';
  isCheckingFunds: boolean;
  fundingMethod: string;
  copiedItem: string | null;
  
  // Screen visibility states
  showWeb3Auth: boolean;
  showCryptoSelection: boolean;
  showPaymentForm: boolean;
  showFundingOptions: boolean;
  showFundingSuccess: boolean;
  showQRFunding: boolean;
  
  // Handlers
  onBack: () => void;
  onSelectCrypto: (crypto: string) => void;
  onSelectChain: (chain: string) => void;
  onWalletConnect: (provider: string) => void;
  onConfirmPayment: () => void;
  onSelectFundingMethod: (method: string) => void;
  onContinueFromFunding: () => void;
  onReturnToDashboard: () => void;
  setCopiedItem: (item: string | null) => void;
  setShowWeb3Auth: (show: boolean) => void;
  setShowCryptoSelection: (show: boolean) => void;
  setShowPaymentForm: (show: boolean) => void;
  setShowFundingOptions: (show: boolean) => void;
  setShowFundingSuccess: (show: boolean) => void;
  setShowQRFunding: (show: boolean) => void;
  setFundingMethod: (method: string) => void;
}

export const CheckoutFlow: React.FC<CheckoutFlowProps> = ({
  currentPayment,
  selectedCrypto,
  selectedChain,
  walletAddress,
  paymentStatus,
  isCheckingFunds,
  fundingMethod,
  copiedItem,
  showWeb3Auth,
  showCryptoSelection,
  showPaymentForm,
  showFundingOptions,
  showFundingSuccess,
  showQRFunding,
  onBack,
  onSelectCrypto,
  onSelectChain,
  onWalletConnect,
  onConfirmPayment,
  onSelectFundingMethod,
  onContinueFromFunding,
  onReturnToDashboard,
  setCopiedItem,
  setShowWeb3Auth,
  setShowCryptoSelection,
  setShowPaymentForm,
  setShowFundingOptions,
  setShowFundingSuccess,
  setShowQRFunding,
  setFundingMethod,
}) => {
  if (!currentPayment) return null;

  // Helper to get current screen number for progress indication
  const getCurrentScreenNumber = (): number => {
    if (paymentStatus === 'completed') return 8; // Screen #8: Payment Successful
    if (paymentStatus === 'processing') return 7; // Screen #7: Processing Payment
    if (showPaymentForm && !showFundingOptions) return 6; // Screen #6: Payment Confirmation
    if (showFundingOptions && showFundingSuccess) return 5; // Screen #5: Funding Success
    if (showQRFunding) return 4.5; // Screen #4.5: QR Funding
    if (showFundingOptions && !showFundingSuccess) return 4; // Screen #4: Insufficient Balance
    if (showCryptoSelection) return 3; // Screen #3: Crypto Selection
    if (showWeb3Auth) return 2; // Screen #2: Login/Register
    return 1; // Screen #1: Payment Details
  };

  const currentScreen = getCurrentScreenNumber();

  // Merchant logo component
  const MerchantLogo = () => (
    <div className="flex justify-center">
      <div 
        className={`w-[54px] h-[54px] ${MD3_RADIUS_CLASSES.medium} border-2 border-dashed flex items-center justify-center bg-[${MD3_COLORS.surfaceDim}] dark:bg-[#262626] overflow-hidden`}
        style={{ borderColor: MD3_COLORS.outline }}
      >
        <div className="text-center">
          <Building2 className={`${MD3_ICON_SIZES.large} mx-auto text-muted-foreground`} />
        </div>
      </div>
    </div>
  );

  // Payment amount component
  const PaymentAmount = () => (
    <div className="space-y-0">
      <p className="text-muted-foreground">
        {formatPrice(currentPayment.price, currentPayment.baseCurrency)} •{" "}
        {currentPayment.description}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div 
          className={`bg-white dark:bg-[#303030] ${MD3_RADIUS_CLASSES.large} ${MD3_ELEVATION.level1} p-8`}
        >
          {/* Header with back button */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              {currentScreen !== 8 && (
                <Button
                  variant="ghost"
                  className={`${MD3_RADIUS_CLASSES.full} ${MD3_TRANSITIONS.standard}`}
                  onClick={onBack}
                >
                  <ArrowLeft className={MD3_ICON_SIZES.medium} />
                </Button>
              )}
              <div className="flex-1"></div>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
                <div
                  key={step}
                  className={`h-1 flex-1 ${MD3_RADIUS_CLASSES.full} ${MD3_TRANSITIONS.standard}`}
                  style={{
                    backgroundColor:
                      step <= Math.floor(currentScreen)
                        ? MD3_COLORS.primary
                        : MD3_COLORS.outline,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content based on current screen */}
          {renderScreen()}
        </div>
      </div>
    </div>
  );

  function renderScreen() {
    // Screen #8: Payment Successful
    if (paymentStatus === 'completed') {
      return (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <MerchantLogo />
            <PaymentAmount />
          </div>

          <div className="text-center space-y-6">
            <div 
              className={`w-16 h-16 ${MD3_RADIUS_CLASSES.full} flex items-center justify-center mx-auto`}
              style={{ backgroundColor: `${MD3_COLORS.success}20` }}
            >
              <CheckCircle className={`${MD3_ICON_SIZES.extraLarge}`} style={{ color: MD3_COLORS.success }} />
            </div>
            <div className="space-y-2">
              <h3>Payment Successful!</h3>
              <p className="text-muted-foreground">
                Click User to view Wallet
              </p>
            </div>
            {currentPayment.txHash && (
              <div 
                className={`${MD3_RADIUS_CLASSES.large} p-4 border`}
                style={{ 
                  backgroundColor: `${MD3_COLORS.success}10`,
                  borderColor: `${MD3_COLORS.success}30`
                }}
              >
                <p className="text-sm text-muted-foreground mb-2">
                  Transaction Hash
                </p>
                <div className="flex items-center gap-2">
                  <code className="text-sm flex-1 truncate" style={{ color: MD3_COLORS.success }}>
                    {truncateAddress(currentPayment.txHash)}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    className={MD3_RADIUS_CLASSES.full}
                    onClick={() => {
                      copyToClipboard(currentPayment.txHash || '');
                      setCopiedItem(currentPayment.txHash || '');
                      setTimeout(() => setCopiedItem(null), 2000);
                    }}
                  >
                    {copiedItem === currentPayment.txHash ? (
                      <Check className={`${MD3_ICON_SIZES.small} text-green-600`} />
                    ) : (
                      <Copy className={MD3_ICON_SIZES.small} />
                    )}
                  </Button>
                </div>
              </div>
            )}
            <Button
              className={`w-full ${MD3_TOUCH_TARGET.minimum} px-8 py-3 ${MD3_RADIUS_CLASSES.full} ${MD3_TRANSITIONS.standard}`}
              style={{
                backgroundColor: MD3_COLORS.primary,
                color: MD3_COLORS.onPrimary,
              }}
              onClick={onReturnToDashboard}
            >
              Return to Merchant
            </Button>
          </div>
        </div>
      );
    }

    // Screen #7: Processing Payment
    if (paymentStatus === 'processing') {
      return (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <MerchantLogo />
            <PaymentAmount />
          </div>

          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Loader2 className={`${MD3_ICON_SIZES.extraLarge} animate-spin`} style={{ color: MD3_COLORS.primary }} />
            </div>
            <div className="space-y-2">
              <h3>Processing Payment</h3>
              <p className="text-muted-foreground">
                Please wait while we confirm your transaction on the blockchain...
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Screen #6: Payment Confirmation
    if (showPaymentForm && !showFundingOptions) {
      return (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <MerchantLogo />
            <PaymentAmount />
          </div>

          <div className="space-y-4">
            <div className={`${MD3_RADIUS_CLASSES.large} p-4 border`} style={{ borderColor: MD3_COLORS.outline }}>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span>{formatPrice(currentPayment.price, currentPayment.baseCurrency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Currency</span>
                  <span>{selectedCrypto}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network</span>
                  <span>{selectedChain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wallet</span>
                  <span className="font-mono text-sm">{truncateAddress(walletAddress)}</span>
                </div>
              </div>
            </div>

            <Button
              className={`w-full ${MD3_TOUCH_TARGET.minimum} px-8 py-3 ${MD3_RADIUS_CLASSES.full} ${MD3_TRANSITIONS.standard}`}
              style={{
                backgroundColor: MD3_COLORS.primary,
                color: MD3_COLORS.onPrimary,
              }}
              onClick={onConfirmPayment}
              disabled={isCheckingFunds}
            >
              {isCheckingFunds ? (
                <>
                  <Loader2 className={`${MD3_ICON_SIZES.medium} mr-2 animate-spin`} />
                  Checking Balance...
                </>
              ) : (
                <>Confirm Payment</>
              )}
            </Button>
          </div>
        </div>
      );
    }

    // Screen #5: Funding Success
    if (showFundingOptions && showFundingSuccess) {
      return (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <MerchantLogo />
            <PaymentAmount />
          </div>

          <div className="text-center space-y-6">
            <div 
              className={`w-16 h-16 ${MD3_RADIUS_CLASSES.full} flex items-center justify-center mx-auto`}
              style={{ backgroundColor: `${MD3_COLORS.success}20` }}
            >
              <CheckCircle className={MD3_ICON_SIZES.extraLarge} style={{ color: MD3_COLORS.success }} />
            </div>
            <div className="space-y-2">
              <h3>Funding Method Ready!</h3>
              <p className="text-muted-foreground">
                You can now proceed with adding {selectedCrypto} funds
              </p>
            </div>
            <div 
              className={`${MD3_RADIUS_CLASSES.large} p-6 border`}
              style={{
                backgroundColor: `${MD3_COLORS.success}10`,
                borderColor: `${MD3_COLORS.success}30`
              }}
            >
              <p style={{ color: MD3_COLORS.success }}>
                Your selected funding method is ready to use. Click continue to proceed with the payment.
              </p>
            </div>
            <Button
              className={`w-full ${MD3_TOUCH_TARGET.minimum} px-8 py-3 ${MD3_RADIUS_CLASSES.full} ${MD3_TRANSITIONS.standard}`}
              style={{
                backgroundColor: MD3_COLORS.primary,
                color: MD3_COLORS.onPrimary,
              }}
              onClick={onContinueFromFunding}
            >
              Continue
            </Button>
          </div>
        </div>
      );
    }

    // Screen #4.5: QR Funding
    if (showQRFunding) {
      return (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <MerchantLogo />
            <PaymentAmount />
          </div>

          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h3>Scan QR Code</h3>
              <p className="text-muted-foreground">
                Scan this QR code to add {selectedCrypto} to your wallet
              </p>
            </div>

            <div className={`${MD3_RADIUS_CLASSES.large} p-8 border`} style={{ borderColor: MD3_COLORS.outline }}>
              <div className="w-48 h-48 mx-auto bg-gray-200 dark:bg-gray-700 ${MD3_RADIUS_CLASSES.large} flex items-center justify-center">
                <QrCode className="w-32 h-32 text-gray-400" />
              </div>
            </div>

            <div className={`${MD3_RADIUS_CLASSES.large} p-4 border`} style={{ borderColor: MD3_COLORS.outline }}>
              <div className="flex items-center justify-between">
                <code className="text-sm">{truncateAddress(walletAddress)}</code>
                <Button
                  size="sm"
                  variant="ghost"
                  className={MD3_RADIUS_CLASSES.full}
                  onClick={() => {
                    copyToClipboard(walletAddress);
                    setCopiedItem(walletAddress);
                    setTimeout(() => setCopiedItem(null), 2000);
                  }}
                >
                  {copiedItem === walletAddress ? (
                    <Check className={`${MD3_ICON_SIZES.small} text-green-600`} />
                  ) : (
                    <Copy className={MD3_ICON_SIZES.small} />
                  )}
                </Button>
              </div>
            </div>

            <Button
              className={`w-full ${MD3_TOUCH_TARGET.minimum} px-8 py-3 ${MD3_RADIUS_CLASSES.full} ${MD3_TRANSITIONS.standard}`}
              style={{
                backgroundColor: MD3_COLORS.primary,
                color: MD3_COLORS.onPrimary,
              }}
              onClick={() => {
                setShowQRFunding(false);
                setShowFundingSuccess(true);
                toast('Funding method confirmed');
              }}
            >
              I've Added Funds
            </Button>
          </div>
        </div>
      );
    }

    // Screen #4: Insufficient Balance (Funding Options)
    if (showFundingOptions && !showFundingSuccess) {
      return (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <MerchantLogo />
            <PaymentAmount />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3>Insufficient Balance</h3>
              <p className="text-muted-foreground">
                You don't have enough {selectedCrypto} in your wallet. Choose a funding method below.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className={`w-full ${MD3_TOUCH_TARGET.minimum} flex items-center justify-between ${MD3_RADIUS_CLASSES.full} ${MD3_TRANSITIONS.standard}`}
                style={{ borderColor: MD3_COLORS.outline }}
                onClick={() => onSelectFundingMethod('card')}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className={MD3_ICON_SIZES.medium} />
                  <span>Credit/Debit Card</span>
                </div>
                <ChevronRight className={MD3_ICON_SIZES.small} />
              </Button>

              <Button
                variant="outline"
                className={`w-full ${MD3_TOUCH_TARGET.minimum} flex items-center justify-between ${MD3_RADIUS_CLASSES.full} ${MD3_TRANSITIONS.standard}`}
                style={{ borderColor: MD3_COLORS.outline }}
                onClick={() => onSelectFundingMethod('transfer')}
              >
                <div className="flex items-center gap-3">
                  <Wallet className={MD3_ICON_SIZES.medium} />
                  <span>Transfer from Another Wallet</span>
                </div>
                <ChevronRight className={MD3_ICON_SIZES.small} />
              </Button>

              <Button
                variant="outline"
                className={`w-full ${MD3_TOUCH_TARGET.minimum} flex items-center justify-between ${MD3_RADIUS_CLASSES.full} ${MD3_TRANSITIONS.standard}`}
                style={{ borderColor: MD3_COLORS.outline }}
                onClick={() => onSelectFundingMethod('exchange')}
              >
                <div className="flex items-center gap-3">
                  <ExternalLink className={MD3_ICON_SIZES.medium} />
                  <span>Buy from Exchange</span>
                </div>
                <ChevronRight className={MD3_ICON_SIZES.small} />
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // Screen #3: Crypto Selection
    if (showCryptoSelection) {
      const cryptos = [
        { name: 'USDC', fullName: 'USD Coin' },
        { name: 'USDT', fullName: 'Tether' },
        { name: 'EURC', fullName: 'Euro Coin' },
      ];

      const chains = ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base'];

      return (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <MerchantLogo />
            <PaymentAmount />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3>Select Cryptocurrency</h3>
              <p className="text-muted-foreground">Choose your preferred stablecoin and network</p>
            </div>

            <div className="space-y-3">
              {cryptos.map((crypto) => (
                <Button
                  key={crypto.name}
                  variant="outline"
                  className={`w-full ${MD3_TOUCH_TARGET.minimum} flex items-center justify-between ${MD3_RADIUS_CLASSES.full} ${MD3_TRANSITIONS.standard}`}
                  style={{
                    borderColor: selectedCrypto === crypto.name ? MD3_COLORS.primary : MD3_COLORS.outline,
                    backgroundColor: selectedCrypto === crypto.name ? MD3_COLORS.primaryContainer : 'transparent',
                  }}
                  onClick={() => onSelectCrypto(crypto.name)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${MD3_RADIUS_CLASSES.full} bg-gray-200 dark:bg-gray-700`} />
                    <div className="text-left">
                      <div>{crypto.name}</div>
                      <div className="text-sm text-muted-foreground">{crypto.fullName}</div>
                    </div>
                  </div>
                  {selectedCrypto === crypto.name && (
                    <Check className={MD3_ICON_SIZES.medium} style={{ color: MD3_COLORS.primary }} />
                  )}
                </Button>
              ))}
            </div>

            {selectedCrypto && (
              <>
                <div className="space-y-2 pt-4">
                  <h4>Select Network</h4>
                  <p className="text-sm text-muted-foreground">Choose the blockchain network</p>
                </div>

                <div className="space-y-2">
                  {chains.map((chain) => (
                    <Button
                      key={chain}
                      variant="outline"
                      className={`w-full ${MD3_TOUCH_TARGET.minimum} flex items-center justify-between ${MD3_RADIUS_CLASSES.full} ${MD3_TRANSITIONS.standard}`}
                      style={{
                        borderColor: selectedChain === chain ? MD3_COLORS.primary : MD3_COLORS.outline,
                        backgroundColor: selectedChain === chain ? MD3_COLORS.primaryContainer : 'transparent',
                      }}
                      onClick={() => onSelectChain(chain)}
                    >
                      <span>{chain}</span>
                      {selectedChain === chain && (
                        <Check className={MD3_ICON_SIZES.medium} style={{ color: MD3_COLORS.primary }} />
                      )}
                    </Button>
                  ))}
                </div>

                <Button
                  className={`w-full ${MD3_TOUCH_TARGET.minimum} px-8 py-3 ${MD3_RADIUS_CLASSES.full} ${MD3_TRANSITIONS.standard}`}
                  style={{
                    backgroundColor: MD3_COLORS.primary,
                    color: MD3_COLORS.onPrimary,
                  }}
                  onClick={() => {
                    setShowCryptoSelection(false);
                    setShowPaymentForm(true);
                  }}
                  disabled={!selectedChain}
                >
                  Continue
                </Button>
              </>
            )}
          </div>
        </div>
      );
    }

    // Screen #2: Login/Register (Web3Auth)
    if (showWeb3Auth) {
      const walletOptions = [
        { name: 'Google', logo: GoogleLogo },
        { name: 'Github', logo: GithubLogo },
        { name: 'MetaMask', logo: MetaMaskLogo },
        { name: 'WalletConnect', logo: WalletConnectLogo },
        { name: 'Coinbase', logo: CoinbaseLogo },
      ];

      return (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <MerchantLogo />
            <PaymentAmount />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3>Login or Register</h3>
              <p className="text-muted-foreground">
                Connect your wallet to proceed with payment
              </p>
            </div>

            <div className="space-y-3">
              {walletOptions.map(({ name, logo: Logo }) => (
                <Button
                  key={name}
                  variant="outline"
                  className={`flex items-center justify-start gap-2 ${MD3_RADIUS_CLASSES.full} ${MD3_TOUCH_TARGET.minimum} px-4 ${MD3_TRANSITIONS.standard}`}
                  style={{
                    borderColor: MD3_COLORS.outline,
                  }}
                  onClick={() => onWalletConnect(name)}
                >
                  <Logo className={`${MD3_ICON_SIZES.medium} flex-shrink-0`} />
                  <span className="flex-1 text-left">{name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Screen #1: Payment Details + Login CTA
    return (
      <div className="flex flex-col justify-center h-full space-y-8">
        <div className="text-center space-y-4">
          <MerchantLogo />
          <PaymentAmount />
        </div>

        <div className="space-y-4">
          <Button
            className={`w-full ${MD3_TOUCH_TARGET.minimum} px-8 py-3 ${MD3_RADIUS_CLASSES.full} ${MD3_TRANSITIONS.standard}`}
            style={{
              backgroundColor: MD3_COLORS.primary,
              color: MD3_COLORS.onPrimary,
            }}
            onClick={() => setShowWeb3Auth(true)}
          >
            <LogIn className={`${MD3_ICON_SIZES.medium} mr-2`} />
            Login to Pay
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Secure payment powered by Web3
          </p>
        </div>
      </div>
    );
  }
};
