import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Zap, Code, Wallet, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

interface QuickStartGuideProps {
  onBack: () => void;
}

/**
 * QUICK START GUIDE - Documentation Page with Sticky Tabs
 * 
 * CRITICAL PATTERN (from TestDocumentPage):
 * 1. React Fragment <> as root (NO PageLayout, NO div wrapper)
 * 2. Scrollable header section (back button + title)
 * 3. Sticky tabs: sticky top-0 lg:top-16 z-40
 * 4. Tab content with space-y
 */

const QuickStartGuide: React.FC<QuickStartGuideProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('setup');

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* STICKY HEADER WITH BACK BUTTON + TITLE + TABS */}
      <div className="sticky top-0 z-40 bg-white dark:bg-[#0a0a0a] shadow-sm border-b border-[#43586C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button + Title Section */}
          <div className="pt-4 pb-3 border-b border-[#43586C]/10">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-10 mb-4 bg-transparent border border-[#43586C] text-[#1C1B1F] dark:text-[#F6F7F9] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Documents
            </button>
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-[#FF5914]" />
              <h1 className="text-gray-900 dark:text-white">Quick Start Guide</h1>
            </div>
            <p className="text-[#798A9B] mt-1">Get started with PYMSTR in minutes - from setup to your first payment</p>
          </div>

          {/* Tabs Section */}
          <div className="py-3">
            <div className="flex w-full items-center overflow-x-auto scrollbar-hide gap-2">
            <button 
              onClick={() => setActiveTab('setup')} 
              className={`flex-shrink-0 inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'setup' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}
            >
              1. Setup
            </button>
            <button 
              onClick={() => setActiveTab('integration')} 
              className={`flex-shrink-0 inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'integration' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}
            >
              2. Integration
            </button>
            <button 
              onClick={() => setActiveTab('testing')} 
              className={`flex-shrink-0 inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'testing' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}
            >
              3. Testing
            </button>
            <button 
              onClick={() => setActiveTab('production')} 
              className={`flex-shrink-0 inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'production' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}
            >
              4. Go Live
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {activeTab === 'setup' && (
            <>
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-[#07D7FF]" />
                    Step 1: Create Your Account
                  </CardTitle>
                  <CardDescription>Sign up and connect your wallet to get started</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#7DD069] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Sign up with Web3Auth</p>
                        <p className="text-sm text-muted-foreground">Connect using Google, Email, or your Web3 wallet</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#7DD069] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Complete merchant profile</p>
                        <p className="text-sm text-muted-foreground">Add your business details and contact information</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#7DD069] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Configure settlement wallet</p>
                        <p className="text-sm text-muted-foreground">Set up where you want to receive payments</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#E3F2FD] dark:bg-[#1E88E5]/10 border border-[#1E88E5]/20 rounded-xl p-4 mt-4">
                    <p className="text-sm">
                      <strong className="text-[#1E88E5]">💡 Tip:</strong> PYMSTR uses Account Abstraction (AA) with Pimlico, 
                      so your customers don't need gas tokens to pay!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>Supported Networks & Assets</CardTitle>
                  <CardDescription>PYMSTR supports three stablecoins across five EVM chains</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Stablecoins:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#303030] text-[#F6F7F9] border border-[#43586C] text-sm">USDC</span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#303030] text-[#F6F7F9] border border-[#43586C] text-sm">USDT</span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#303030] text-[#F6F7F9] border border-[#43586C] text-sm">EURC</span>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-2">Blockchain Networks:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#303030] text-[#F6F7F9] border border-[#43586C] text-sm">Ethereum</span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#303030] text-[#F6F7F9] border border-[#43586C] text-sm">Polygon</span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#303030] text-[#F6F7F9] border border-[#43586C] text-sm">Arbitrum</span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#303030] text-[#F6F7F9] border border-[#43586C] text-sm">Optimism</span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#303030] text-[#F6F7F9] border border-[#43586C] text-sm">Base</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'integration' && (
            <>
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-[#07D7FF]" />
                    Step 2: Generate API Keys
                  </CardTitle>
                  <CardDescription>Create API credentials to integrate PYMSTR into your application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#7DD069] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Navigate to API Keys section</p>
                        <p className="text-sm text-muted-foreground">Find it in the main navigation menu</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#7DD069] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Create a new API key</p>
                        <p className="text-sm text-muted-foreground">Give it a descriptive name (e.g., "Production", "Staging")</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#7DD069] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Save your secret key</p>
                        <p className="text-sm text-muted-foreground">Store it securely - you won't be able to see it again!</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-4 border border-[#43586C]">
                    <code className="text-sm">
                      <div className="text-[#798A9B]">// Example: Creating a payment session</div>
                      <div className="mt-2">
                        <span className="text-[#F90BD5]">const</span>{' '}
                        <span className="text-[#07D7FF]">response</span> = <span className="text-[#F90BD5]">await</span>{' '}
                        <span className="text-[#7DD069]">fetch</span>(<span className="text-[#FF5914]">'https://api.pymstr.com/v1/payment-links'</span>, {'{'}
                      </div>
                      <div className="ml-4">
                        <span className="text-[#07D7FF]">method</span>: <span className="text-[#FF5914]">'POST'</span>,
                      </div>
                      <div className="ml-4">
                        <span className="text-[#07D7FF]">headers</span>: {'{'}
                      </div>
                      <div className="ml-8">
                        <span className="text-[#FF5914]">'Authorization'</span>: <span className="text-[#FF5914]">'Bearer YOUR_API_KEY'</span>,
                      </div>
                      <div className="ml-8">
                        <span className="text-[#FF5914]">'Content-Type'</span>: <span className="text-[#FF5914]">'application/json'</span>
                      </div>
                      <div className="ml-4">{'}'}</div>
                      <div>{'});'}</div>
                    </code>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-[#07D7FF]" />
                    Integration Options
                  </CardTitle>
                  <CardDescription>Choose how you want to integrate PYMSTR</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-[#43586C] rounded-xl p-4">
                      <h3 className="font-medium mb-2">Payment Links (Manual)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Create one-time payment links directly in the dashboard
                      </p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• No coding required</li>
                        <li>• Perfect for invoicing</li>
                        <li>• Single-use only</li>
                      </ul>
                    </div>

                    <div className="border border-[#43586C] rounded-xl p-4">
                      <h3 className="font-medium mb-2">API Integration</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Generate payment sessions programmatically via API
                      </p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Full automation</li>
                        <li>• E-commerce ready</li>
                        <li>• Dynamic pricing</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'testing' && (
            <>
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>Step 3: Test Your Integration</CardTitle>
                  <CardDescription>Verify everything works before going live</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#7DD069] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Use testnet networks</p>
                        <p className="text-sm text-muted-foreground">Test on Polygon Mumbai, Goerli, or other testnets</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#7DD069] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Get testnet tokens</p>
                        <p className="text-sm text-muted-foreground">Use faucets to get free testnet USDC/USDT</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#7DD069] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Create test payment links</p>
                        <p className="text-sm text-muted-foreground">Test the full payment flow end-to-end</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#7DD069] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Verify webhook delivery</p>
                        <p className="text-sm text-muted-foreground">Ensure your server receives payment notifications</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFF3E0] dark:bg-[#D9C370]/10 border border-[#D9C370]/20 rounded-xl p-4">
                    <p className="text-sm">
                      <strong className="text-[#D9C370]">⚠️ Important:</strong> Always test thoroughly on testnets 
                      before processing real payments. Test error scenarios, refunds, and edge cases.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'production' && (
            <>
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>Step 4: Launch in Production</CardTitle>
                  <CardDescription>Final steps to start accepting real payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#7DD069] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Switch to mainnet</p>
                        <p className="text-sm text-muted-foreground">Configure your integration for Ethereum, Polygon, Arbitrum, Optimism, or Base mainnet</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#7DD069] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Set up webhooks</p>
                        <p className="text-sm text-muted-foreground">Configure webhook URLs to receive payment confirmations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#7DD069] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Monitor your dashboard</p>
                        <p className="text-sm text-muted-foreground">Track payments, view analytics, and manage transactions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#7DD069] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">You're live! 🎉</p>
                        <p className="text-sm text-muted-foreground">Start accepting stablecoin payments from customers worldwide</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#E8F5E9] dark:bg-[#7DD069]/10 border border-[#7DD069]/20 rounded-xl p-4">
                    <p className="text-sm">
                      <strong className="text-[#7DD069]">✅ Success!</strong> Need help? Check our{' '}
                      <a href="#" className="text-[#1E88E5] hover:underline">API Reference</a>,{' '}
                      <a href="#" className="text-[#1E88E5] hover:underline">Code Examples</a>, or{' '}
                      <a href="#" className="text-[#1E88E5] hover:underline">contact support</a>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickStartGuide;
