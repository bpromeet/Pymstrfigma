import React from 'react';
import { WalletMainActionButton } from './WalletMainActionButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

/**
 * WalletMainActionExample - Demonstrates proper Main Action Button usage
 * 
 * Shows the correct positioning of the wallet main action button:
 * - Left-aligned below page title and subtitle
 * - Close to the navigation rail (left side)
 * - Uses MD3 Primary Filled Button styling (blue)
 */
export const WalletMainActionExample: React.FC = () => {
  // Example wallet addresses
  const walletAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5';
  const secondaryWallet = '0x1234567890abcdef1234567890abcdef12345678';

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#2E3C49]">
      {/* Example 1: Dashboard Header with Wallet Main Action Button */}
      <section className="bg-white dark:bg-[#303030] border-b border-[#43586C] p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <h1 className="mb-2">Account Dashboard</h1>
          
          {/* Subtitle */}
          <p className="text-[#798A9B] mb-6">
            Manage your connected wallet and view transaction history
          </p>
          
          {/* Main Action Button - Left-aligned below title/subtitle */}
          <WalletMainActionButton address={walletAddress} />
        </div>
      </section>

      {/* Example 2: Settings Page with Wallet Button */}
      <section className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="mb-2">Wallet Settings</h1>
            <p className="text-[#798A9B] mb-6">
              Your primary wallet for receiving payments
            </p>
            <WalletMainActionButton 
              address={walletAddress}
              showIcon={true}
            />
          </div>

          {/* Content Below */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="border border-[#43586C] rounded-2xl shadow-sm bg-white dark:bg-[#303030]">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Recent wallet activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl">
                    <div>
                      <p className="text-sm">Payment received</p>
                      <p className="text-xs text-[#798A9B]">2 hours ago</p>
                    </div>
                    <Badge className="bg-[#7DD069] text-white">+$150</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl">
                    <div>
                      <p className="text-sm">Payment received</p>
                      <p className="text-xs text-[#798A9B]">1 day ago</p>
                    </div>
                    <Badge className="bg-[#7DD069] text-white">+$75</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#43586C] rounded-2xl shadow-sm bg-white dark:bg-[#303030]">
              <CardHeader>
                <CardTitle>Wallet Balance</CardTitle>
                <CardDescription>Across all supported chains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#798A9B]">USDC</span>
                    <span>$1,250.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#798A9B]">USDT</span>
                    <span>$850.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#798A9B]">EURC</span>
                    <span>€320.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Example 3: Profile Page Layout */}
      <section className="p-8 bg-white dark:bg-[#303030]">
        <div className="max-w-7xl mx-auto">
          <h1 className="mb-2">Profile</h1>
          <p className="text-[#798A9B] mb-6">
            Manage your merchant profile and wallet connection
          </p>
          
          {/* Main Action Button */}
          <WalletMainActionButton 
            address={walletAddress}
            className="mb-8"
          />

          {/* Profile Card */}
          <Card className="border border-[#43586C] rounded-2xl shadow-sm bg-white dark:bg-[#303030]">
            <CardHeader>
              <CardTitle>Merchant Information</CardTitle>
              <CardDescription>Your business details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-[#798A9B] mb-1 block">Business Name</label>
                <p>Acme Corporation</p>
              </div>
              <div>
                <label className="text-sm text-[#798A9B] mb-1 block">Email</label>
                <p>merchant@acme.com</p>
              </div>
              <div>
                <label className="text-sm text-[#798A9B] mb-1 block">Wallet Address</label>
                <p className="font-mono text-sm text-[#798A9B]">{walletAddress}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Example 4: Payment Links Page with Wallet */}
      <section className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="mb-2">Payment Links</h1>
              <p className="text-[#798A9B] mb-6">
                Connected wallet for receiving payments
              </p>
              <WalletMainActionButton address={walletAddress} />
            </div>
          </div>

          {/* Payment Links List */}
          <div className="grid grid-cols-1 gap-4 mt-8">
            <Card className="border border-[#43586C] rounded-2xl shadow-sm bg-white dark:bg-[#303030]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-1">Coffee Subscription</h3>
                    <p className="text-sm text-[#798A9B]">$50.00 USDC on Polygon</p>
                  </div>
                  <Badge className="bg-[#7DD069] text-white">Active</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#43586C] rounded-2xl shadow-sm bg-white dark:bg-[#303030]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-1">Invoice #1234</h3>
                    <p className="text-sm text-[#798A9B]">$150.00 USDT on Ethereum</p>
                  </div>
                  <Badge className="bg-[#43586C] text-white">Completed</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Example 5: Without Icon */}
      <section className="p-8 bg-white dark:bg-[#303030]">
        <div className="max-w-7xl mx-auto">
          <h1 className="mb-2">Receiving Wallet</h1>
          <p className="text-[#798A9B] mb-6">
            All payments will be sent to this address
          </p>
          
          {/* Main Action Button without icon */}
          <WalletMainActionButton 
            address={secondaryWallet}
            showIcon={false}
          />
        </div>
      </section>

      {/* Implementation Guide Section */}
      <section className="p-8">
        <div className="max-w-7xl mx-auto">
          <Card className="border border-[#43586C] rounded-2xl shadow-sm bg-white dark:bg-[#303030]">
            <CardHeader>
              <CardTitle>Main Action Button Positioning Guide</CardTitle>
              <CardDescription>
                MD3-compliant positioning for wallet main action buttons
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="mb-3">✅ Correct Positioning</h4>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#7DD069] rounded-full"></span>
                    Left-aligned below page title
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#7DD069] rounded-full"></span>
                    Below subtitle/description text
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#7DD069] rounded-full"></span>
                    Close to navigation rail (left side)
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#7DD069] rounded-full"></span>
                    6-8px margin below subtitle
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#7DD069] rounded-full"></span>
                    Uses Primary Filled Button style (blue)
                  </p>
                </div>
              </div>

              <div>
                <h4 className="mb-3">MD3 Button Specifications</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg">
                    <span className="text-[#798A9B]">Background:</span> #1E88E5 (Primary Blue)
                  </div>
                  <div className="p-3 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg">
                    <span className="text-[#798A9B]">Text:</span> #FFFFFF (White)
                  </div>
                  <div className="p-3 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg">
                    <span className="text-[#798A9B]">Border Radius:</span> rounded-full (pill)
                  </div>
                  <div className="p-3 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg">
                    <span className="text-[#798A9B]">Padding:</span> px-8 py-3 (32px × 12px)
                  </div>
                  <div className="p-3 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg">
                    <span className="text-[#798A9B]">Min Height:</span> 48px (min-h-12)
                  </div>
                  <div className="p-3 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg">
                    <span className="text-[#798A9B]">Icon Size:</span> 18px (MD3 standard)
                  </div>
                  <div className="p-3 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg">
                    <span className="text-[#798A9B]">Icon Spacing:</span> 8px (gap-2)
                  </div>
                  <div className="p-3 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg">
                    <span className="text-[#798A9B]">Transition:</span> 900ms
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-3">Usage Example</h4>
                <div className="p-4 bg-[#123653] text-[#07D7FF] rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`<div>
  <h1 className="mb-2">Page Title</h1>
  <p className="text-[#798A9B] mb-6">
    Page subtitle or description
  </p>
  
  {/* Main Action Button - Left-aligned */}
  <WalletMainActionButton 
    address="0x742d...5678"
  />
</div>`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default WalletMainActionExample;
