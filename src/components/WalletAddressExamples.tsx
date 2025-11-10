import React from 'react';
import { WalletAddressButton } from './WalletAddressButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

/**
 * WalletAddressExamples - Usage Examples for WalletAddressButton
 * 
 * Demonstrates different variants and use cases for the wallet address button
 * following Material Design 3 principles.
 */
export const WalletAddressExamples: React.FC = () => {
  // Example wallet addresses
  const walletAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5';
  const shortAddress = '0x1234567890abcdef1234567890abcdef12345678';

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="mb-2">Wallet Address Button Examples</h1>
          <p className="text-muted-foreground">
            Material Design 3 compliant wallet display with copy functionality
          </p>
        </div>

        {/* Primary Variant Examples */}
        <Card className="border border-[#43586C] rounded-2xl shadow-sm bg-white dark:bg-[#303030]">
          <CardHeader>
            <CardTitle>Primary (Filled) Variant</CardTitle>
            <CardDescription>
              MD3 Filled Button - Use for primary wallet actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* With Icon */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">With wallet icon:</p>
              <WalletAddressButton
                address={walletAddress}
                variant="primary"
                showIcon={true}
              />
            </div>

            {/* Without Icon */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Without wallet icon:</p>
              <WalletAddressButton
                address={walletAddress}
                variant="primary"
                showIcon={false}
              />
            </div>
          </CardContent>
        </Card>

        {/* Outlined Variant Examples */}
        <Card className="border border-[#43586C] rounded-2xl shadow-sm bg-white dark:bg-[#303030]">
          <CardHeader>
            <CardTitle>Outlined Variant (Default)</CardTitle>
            <CardDescription>
              MD3 Outlined Button - Most common use case for wallet display
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Default Outlined */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Standard outlined:</p>
              <WalletAddressButton
                address={walletAddress}
                variant="outlined"
              />
            </div>

            {/* Outlined without Icon */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Outlined without icon:</p>
              <WalletAddressButton
                address={shortAddress}
                variant="outlined"
                showIcon={false}
              />
            </div>
          </CardContent>
        </Card>

        {/* Tonal Variant Examples */}
        <Card className="border border-[#43586C] rounded-2xl shadow-sm bg-white dark:bg-[#303030]">
          <CardHeader>
            <CardTitle>Tonal (Filled Tonal) Variant</CardTitle>
            <CardDescription>
              MD3 Filled Tonal Button - Subtle emphasis for secondary contexts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Tonal with Icon */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Tonal with icon:</p>
              <WalletAddressButton
                address={walletAddress}
                variant="tonal"
                showIcon={true}
              />
            </div>

            {/* Tonal without Icon */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Tonal without icon:</p>
              <WalletAddressButton
                address={walletAddress}
                variant="tonal"
                showIcon={false}
              />
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card className="border border-[#43586C] rounded-2xl shadow-sm bg-white dark:bg-[#303030]">
          <CardHeader>
            <CardTitle>Common Use Cases</CardTitle>
            <CardDescription>
              Real-world examples of wallet button usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Header Integration */}
            <div className="space-y-2">
              <p className="text-sm">In page header (primary action):</p>
              <div className="flex items-center justify-between p-4 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl">
                <div>
                  <h3>Account Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Connected Wallet</p>
                </div>
                <WalletAddressButton
                  address={walletAddress}
                  variant="primary"
                />
              </div>
            </div>

            {/* Card Integration */}
            <div className="space-y-2">
              <p className="text-sm">In profile card (outlined):</p>
              <div className="p-6 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#1E88E5] flex items-center justify-center">
                    <span className="text-white">JD</span>
                  </div>
                  <div>
                    <h4>John Doe</h4>
                    <p className="text-sm text-muted-foreground">Merchant Account</p>
                  </div>
                </div>
                <WalletAddressButton
                  address={walletAddress}
                  variant="outlined"
                  showIcon={true}
                />
              </div>
            </div>

            {/* List Item Integration */}
            <div className="space-y-2">
              <p className="text-sm">In transaction list (tonal):</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-4 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl">
                  <div>
                    <p>Payment from</p>
                    <p className="text-sm text-muted-foreground">Nov 10, 2025</p>
                  </div>
                  <WalletAddressButton
                    address={walletAddress}
                    variant="tonal"
                    showIcon={false}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Responsive */}
            <div className="space-y-2">
              <p className="text-sm">Mobile responsive (full width on mobile):</p>
              <WalletAddressButton
                address={walletAddress}
                variant="outlined"
                className="w-full sm:w-auto"
              />
            </div>
          </CardContent>
        </Card>

        {/* Technical Specifications */}
        <Card className="border border-[#43586C] rounded-2xl shadow-sm bg-white dark:bg-[#303030]">
          <CardHeader>
            <CardTitle>Technical Specifications (MD3 Compliance)</CardTitle>
            <CardDescription>
              Material Design 3 implementation details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-[#43586C]">
                <span className="text-muted-foreground">Border Radius:</span>
                <span className="font-mono">rounded-full (MD3 pill-shaped)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#43586C]">
                <span className="text-muted-foreground">Min Height:</span>
                <span className="font-mono">48px (min-h-12 - MD3 touch target)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#43586C]">
                <span className="text-muted-foreground">Icon Size:</span>
                <span className="font-mono">18px (MD3 standard)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#43586C]">
                <span className="text-muted-foreground">Icon Spacing:</span>
                <span className="font-mono">8px (gap-2 - MD3 standard)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#43586C]">
                <span className="text-muted-foreground">Padding:</span>
                <span className="font-mono">24px × 10px (px-6 py-2.5)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#43586C]">
                <span className="text-muted-foreground">Transition:</span>
                <span className="font-mono">900ms (PYMSTR standard)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#43586C]">
                <span className="text-muted-foreground">Address Format:</span>
                <span className="font-mono">0x1234...5678 (6 + 4 chars)</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Copy Feedback:</span>
                <span className="font-mono">Toast + Check icon (2s)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletAddressExamples;
