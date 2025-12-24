# App.tsx Integration Guide for CheckoutFlow Component

## Changes Required

### 1. Add Import at Top of File

After the existing imports (around line 100-150), add:

```tsx
import { CheckoutFlow } from './components/checkout/CheckoutFlow';
```

### 2. Add Handler Functions

Add these handler functions before the `renderContent()` function (around line 1000-1260):

```tsx
// Checkout back navigation handler
const handleCheckoutBack = () => {
  if (paymentStatus === "completed") return; // No back button on success screen
  
  if (showFundingOptions && showQRFunding) {
    setShowQRFunding(false);
    return;
  }
  
  if (showFundingOptions && !showQRFunding) {
    setShowFundingOptions(false);
    setShowPaymentForm(true);
    return;
  }
  
  if (showPaymentForm) {
    setShowPaymentForm(false);
    setShowCryptoSelection(true);
    return;
  }
  
  if (showCryptoSelection) {
    setShowCryptoSelection(false);
    setShowWeb3Auth(true);
    return;
  }
  
  if (showWeb3Auth) {
    setShowWeb3Auth(false);
    return;
  }
  
  // Screen #1: Go back to admin/close checkout
  setActiveTab("admin");
  setCurrentPayment(null);
  setShowCryptoSelection(false);
  setShowWeb3Auth(false);
  setShowPaymentForm(false);
  setShowFundingOptions(false);
  setShowFundingSuccess(false);
  setShowQRFunding(false);
  setPaymentStatus("pending");
  setFundingMethod("");
  setWalletAddress("");
};

// Funding method selection handler
const handleSelectFundingMethod = (method: string) => {
  setFundingMethod(method);
  
  if (method === 'transfer') {
    setShowQRFunding(true);
    toast('Scan QR code to add funds');
  } else if (method === 'card' || method === 'exchange') {
    // Simulate external funding flow
    setTimeout(() => {
      setShowFundingSuccess(true);
      toast(`${method === 'card' ? 'Card' : 'Exchange'} funding ready`);
    }, 1500);
  }
};

// Continue from funding success handler
const handleContinueFromFunding = () => {
  setShowFundingOptions(false);
  setShowPaymentForm(true);
  setShowFundingSuccess(false);
  setFundingMethod("");
  toast('Ready to proceed with payment');
};

// Return to dashboard handler
const handleReturnToDashboard = () => {
  setActiveTab("admin");
  setCurrentPayment(null);
  setShowCryptoSelection(false);
  setShowWeb3Auth(false);
  setShowPaymentForm(false);
  setShowFundingOptions(false);
  setShowFundingSuccess(false);
  setShowQRFunding(false);
  setPaymentStatus("pending");
  setFundingMethod("");
  setWalletAddress("");
  window.location.hash = "";
};
```

### 3. Replace CustomerCheckout Function

**DELETE:** Lines 1296-2307 (the entire CustomerCheckout function)

**REPLACE WITH:**

```tsx
// Checkout flow component wrapper
const CustomerCheckout = () => {
  return (
    <CheckoutFlow
      currentPayment={currentPayment}
      selectedCrypto={selectedCrypto}
      selectedChain={selectedChain}
      walletAddress={walletAddress}
      paymentStatus={paymentStatus}
      isCheckingFunds={isCheckingFunds}
      fundingMethod={fundingMethod}
      copiedItem={copiedItem}
      showWeb3Auth={showWeb3Auth}
      showCryptoSelection={showCryptoSelection}
      showPaymentForm={showPaymentForm}
      showFundingOptions={showFundingOptions}
      showFundingSuccess={showFundingSuccess}
      showQRFunding={showQRFunding}
      onBack={handleCheckoutBack}
      onSelectCrypto={setSelectedCrypto}
      onSelectChain={setSelectedChain}
      onWalletConnect={handleWalletConnect}
      onConfirmPayment={handlePayment}
      onSelectFundingMethod={handleSelectFundingMethod}
      onContinueFromFunding={handleContinueFromFunding}
      onReturnToDashboard={handleReturnToDashboard}
      setCopiedItem={setCopiedItem}
      setShowWeb3Auth={setShowWeb3Auth}
      setShowCryptoSelection={setShowCryptoSelection}
      setShowPaymentForm={setShowPaymentForm}
      setShowFundingOptions={setShowFundingOptions}
      setShowFundingSuccess={setShowFundingSuccess}
      setShowQRFunding={setShowQRFunding}
      setFundingMethod={setFundingMethod}
    />
  );
};
```

## Summary of Changes

**Lines Added:** ~150 (new handlers + checkout wrapper)
**Lines Removed:** ~1,011 (entire CustomerCheckout inline implementation)
**Net Change:** ~860 lines removed from App.tsx

## Benefits

1. ✅ **Cleaner App.tsx** - 860+ lines removed
2. ✅ **Componentized Checkout** - All checkout logic in dedicated file
3. ✅ **Design Token Migration** - CheckoutFlow uses MD3 tokens
4. ✅ **Better Maintainability** - Easier to modify checkout flow
5. ✅ **Separation of Concerns** - Checkout is now a standalone module

## Testing Checklist

After implementing these changes, test:

- [ ] Navigate to checkout from payment link
- [ ] Progress through all 8 screens
- [ ] Back button works on each screen
- [ ] Wallet connection works
- [ ] Crypto/chain selection works
- [ ] Funding options flow works
- [ ] Payment confirmation works
- [ ] Success screen displays correctly
- [ ] Return to merchant works

## Next Phase

Once checkout integration is verified:
1. Migrate admin dashboard pages to design tokens
2. Migrate end user pages to design tokens
3. Create theme switcher using design tokens
4. Update component library to use tokens
