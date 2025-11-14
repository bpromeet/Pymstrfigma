import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ArrowLeft, Copy, CheckCircle, Globe, Code2, Webhook, BarChart3, Zap, Menu, ShieldCheck, BookOpen } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface QuickStartGuideProps {
  onBack: () => void;
}

const QuickStartGuide: React.FC<QuickStartGuideProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const sections = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'payment-types', label: 'Payment Link Types', icon: Code2 },
    { id: 'step-1', label: 'Get API Key', icon: Code2 },
    { id: 'step-2', label: 'Create Payment Link', icon: Zap },
    { id: 'step-3', label: 'Set Up Webhooks', icon: Webhook },
    { id: 'step-4', label: 'Integration Patterns', icon: Code2 },
    { id: 'step-5', label: 'Check Payment Status', icon: BarChart3 },
    { id: 'best-practices', label: 'Best Practices', icon: ShieldCheck },
    { id: 'use-cases', label: 'Use Cases', icon: BookOpen },
    { id: 'api-reference', label: 'API Reference', icon: Code2 },
    { id: 'next-steps', label: 'Next Steps', icon: CheckCircle },
  ];

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll spy effect
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const copyToClipboard = (text: string) => {
    // Fallback method that doesn't require Clipboard API permissions
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      toast('Copied to clipboard!');
      setCopiedItem(text);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      toast('Failed to copy to clipboard');
    } finally {
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Sticky Side Navigation - Desktop */}
      <aside className="hidden lg:block fixed left-[120px] top-0 bottom-0 w-80 bg-white dark:bg-[#0a0a0a] overflow-y-auto border-r border-[#43586C]">
        <div className="p-6 space-y-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="rounded-full w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Documents
          </Button>
          
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-sm transition-colors ${
                    activeSection === section.id
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="text-left">{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>



      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 z-50 p-6 overflow-y-auto">
            <div className="space-y-1">
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-sm transition-colors ${
                        activeSection === section.id
                          ? 'bg-black text-white dark:bg-white dark:text-black'
                          : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-left">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>
        </>
      )}

      {/* Mobile Sticky Header with Back Button and Menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white dark:bg-[#0a0a0a] shadow-sm">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.04] active:scale-95 transition-all duration-200"
            aria-label="Back to Documents"
          >
            <ArrowLeft className="w-[18px] h-[18px] text-[#1C1B1F] dark:text-[#F6F7F9]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.04] active:scale-95 transition-all duration-200"
            aria-label="Open navigation menu"
          >
            <Menu className="w-[18px] h-[18px] text-[#1C1B1F] dark:text-[#F6F7F9]" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-[440px] min-h-screen p-6 lg:p-8 space-y-6 pt-20 lg:pt-6">
        {/* Back Button + Header - Desktop */}
        <div className="lg:block hidden">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#1C1B1F] dark:hover:text-[#F6F7F9] mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Documents
          </button>
          <h1 className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-[#07D7FF]" />
            Developer Quick Start Guide
          </h1>
          <p className="text-muted-foreground mt-2">
            Get started with PYMSTR API integration in minutes
          </p>
        </div>

        {/* Header - Mobile */}
        <div className="lg:hidden">
          <h1 className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-[#07D7FF]" />
            Developer Quick Start Guide
          </h1>
          <p className="text-muted-foreground mt-2">
            Get started with PYMSTR API integration in minutes
          </p>
        </div>

        {/* Overview */}
        <Card id="overview">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
              <Globe className="w-4 h-4" />
            </div>
            <span>Overview</span>
          </CardTitle>
          <CardDescription>Introduction to PYMSTR payment processor</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            PYMSTR is a Web3 stablecoin payment processor that enables merchants to accept crypto payments across multiple chains with a simple API.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 space-y-2">
            <div className="flex items-start space-x-2">
              <span className="font-semibold min-w-[180px]">Supported Stablecoins:</span>
              <span className="text-muted-foreground">USDC, USDT, EURC</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-semibold min-w-[180px]">Supported Chains:</span>
              <span className="text-muted-foreground">Ethereum, Polygon, Arbitrum, Optimism, Base</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Understanding Payment Link Types */}
      <Card id="payment-types" className="border-2 border-[#07D7FF]/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
              <Code2 className="w-4 h-4" />
            </div>
            <span>Understanding Payment Link Types</span>
          </CardTitle>
          <CardDescription>Manual vs API-generated payment links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            PYMSTR supports two ways to create payment links, each designed for different use cases. All payment links are single-use and secure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Manual Payment Links */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-3xl p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <span className="text-sm">📝</span>
                </div>
                <h4 className="font-semibold">Manual Payment Links</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Created directly in the admin UI for specific one-off transactions.
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Best for:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Invoicing customers</li>
                  <li>• One-off payment requests</li>
                  <li>• Sending direct payment links</li>
                  <li>• Manual bookkeeping</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-blue-900/30 rounded-2xl p-2 text-xs">
                <code>Source: <span className="text-blue-600">"manual"</span></code>
              </div>
            </div>

            {/* API-Generated Payment Links */}
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-3xl p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
                  <span className="text-sm">🔗</span>
                </div>
                <h4 className="font-semibold">API-Generated Payment Links</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Created programmatically via API for automated payment processing.
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Best for:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• E-commerce checkout integration</li>
                  <li>• Automated payment flows</li>
                  <li>• Dynamic pricing</li>
                  <li>• High-volume transactions</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-green-900/30 rounded-2xl p-2 text-xs">
                <code>Source: <span className="text-green-600">"api"</span></code>
              </div>
            </div>
          </div>

          <div className="bg-[#07D7FF]/10 border border-[#07D7FF]/20 rounded-3xl p-4">
            <h5 className="font-semibold mb-2 flex items-center space-x-2">
              <span>🔐</span>
              <span>Important: Single-Use Architecture</span>
            </h5>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Both types of payment links are single-use:</strong>
              </p>
              <ul className="space-y-1 ml-4">
                <li>✓ Once a payment is completed, the link cannot be reused</li>
                <li>✓ Each payment stores only a txHash (blockchain transaction hash)</li>
                <li>✓ No transaction IDs are generated - only blockchain txHash</li>
                <li>✓ Completed links show the txHash with blockchain explorer link</li>
              </ul>
              <p className="pt-2">
                <strong>For API integration:</strong> Your integration endpoint stays permanent and reusable, 
                but each API call creates a <span className="font-semibold">new unique single-use payment link</span>.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
            <h5 className="font-semibold mb-2">Viewing by Type</h5>
            <p className="text-sm text-muted-foreground mb-3">
              In your Payment Links dashboard, use the tabs to filter:
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="bg-white dark:bg-gray-950 rounded-full px-4 py-2 text-sm">
                <strong>All:</strong> Both manual and API-generated
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-full px-4 py-2 text-sm">
                <strong>Manual:</strong> Only manually created links
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-full px-4 py-2 text-sm">
                <strong>API:</strong> Only API-generated links
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Get Your API Key */}
      <Card id="step-1">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white text-sm">1</span>
            <span>Get Your API Key</span>
          </CardTitle>
          <CardDescription>Generate and configure your API credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Click "Create API Key" button in the API Configuration page</li>
            <li>Fill in the key details (name, environment, permissions)</li>
            <li>Copy and securely store your API key (it won't be shown again)</li>
            <li>Add the key to your environment variables</li>
          </ol>
          <div className="bg-black text-[#05df72] rounded-3xl p-4 relative">
            <code className="text-sm font-mono">PYMSTR_API_KEY=your_api_key_here</code>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard('PYMSTR_API_KEY=your_api_key_here')}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-3xl p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              <strong>Security Note:</strong> Never commit API keys to version control. Store them in environment variables or secure vaults.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Create Your First Payment Link */}
      <Card id="step-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white text-sm">2</span>
            <span>Create Your First Payment Link</span>
          </CardTitle>
          <CardDescription>Generate payment links via dashboard or API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Using the Dashboard (No Code - Manual Links)</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Manually created links are tagged with <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">source: "manual"</code> and appear in the "Manual" tab.
            </p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Click "Generate Payment Link" button on the Dashboard</li>
              <li>Fill in the payment details (name, price, currency, accepted tokens and chains)</li>
              <li>Click "Generate Link"</li>
              <li>Share the generated link with your customer</li>
            </ol>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">Using the API (Programmatic - API Links)</h4>
            <p className="text-xs text-muted-foreground mb-2">
              API-generated links are automatically tagged with <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">source: "api"</code> and appear in the "API" tab.
            </p>
            <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
              <pre className="text-xs font-mono">{`curl -X POST https://api.pymstr.com/v1/payment-links \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Premium Subscription",
    "price": "99.99",
    "currency": "USD",
    "acceptedTokens": ["USDC", "USDT", "EURC"],
    "acceptedChains": ["polygon", "ethereum"]
  }'`}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => copyToClipboard(`curl -X POST https://api.pymstr.com/v1/payment-links \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Premium Subscription",
    "price": "99.99",
    "currency": "USD",
    "acceptedTokens": ["USDC", "USDT", "DAI"],
    "acceptedChains": ["polygon", "ethereum"]
  }'`)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Response:</h4>
            <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
              <pre className="text-xs font-mono">{`{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Premium Subscription",
    "price": "99.99",
    "currency": "USD",
    "acceptedTokens": ["USDC", "USDT", "DAI"],
    "acceptedChains": ["polygon", "ethereum"],
    "status": "pending",
    "url": "https://checkout.pymstr.com/550e8400-e29b-41d4-a716-446655440000",
    "createdAt": "2025-10-22T10:30:00Z"
  }
}`}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => copyToClipboard(`{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Premium Subscription",
    "price": "99.99",
    "currency": "USD",
    "acceptedTokens": ["USDC", "USDT", "DAI"],
    "acceptedChains": ["polygon", "ethereum"],
    "status": "pending",
    "url": "https://checkout.pymstr.com/550e8400-e29b-41d4-a716-446655440000",
    "createdAt": "2025-10-22T10:30:00Z"
  }
}`)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 3: Set Up Webhooks */}
      <Card id="step-3">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white text-sm">3</span>
            <span>Set Up Webhooks</span>
          </CardTitle>
          <CardDescription>Configure real-time event notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Webhooks notify your server when payment events occur (e.g., payment completed, failed, etc.).
          </p>

          <div>
            <h4 className="font-semibold mb-2">Configure Webhook Endpoint</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Go to <strong>Webhooks</strong> in the main menu</li>
              <li>Click "Add Webhook Endpoint"</li>
              <li>Enter your webhook URL (e.g., https://yourapp.com/api/pymstr-webhook)</li>
              <li>Select events to subscribe to</li>
              <li>Save the endpoint</li>
            </ol>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
            <p className="font-semibold text-sm mb-2">Available Events:</p>
            <ul className="space-y-1">
              <li className="text-sm text-muted-foreground flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span><code>payment.completed</code> - Payment successfully confirmed on-chain</span>
              </li>
              <li className="text-sm text-muted-foreground flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span><code>payment.failed</code> - Payment failed or was rejected</span>
              </li>
              <li className="text-sm text-muted-foreground flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span><code>payment.pending</code> - Payment initiated, waiting for confirmation</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Handle Webhook Events (Node.js Example):</h4>
            <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
              <pre className="text-xs font-mono">{`// Node.js/Express example
app.post('/api/pymstr-webhook', express.json(), (req, res) => {
  const event = req.body;
  
  // Verify webhook signature (recommended)
  const signature = req.headers['x-pymstr-signature'];
  if (!verifySignature(signature, req.body)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Handle the event
  switch(event.type) {
    case 'payment.completed':
      console.log('Payment completed:', event.data);
      fulfillOrder(event.data.payment_id);
      break;
      
    case 'payment.failed':
      console.log('Payment failed:', event.data);
      break;
      
    case 'payment.pending':
      console.log('Payment pending:', event.data);
      break;
  }
  
  // Always respond with 200 to acknowledge receipt
  res.status(200).send('Webhook received');
});`}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => copyToClipboard(`app.post('/api/pymstr-webhook', express.json(), (req, res) => {
  const event = req.body;
  const signature = req.headers['x-pymstr-signature'];
  if (!verifySignature(signature, req.body)) {
    return res.status(401).send('Invalid signature');
  }
  switch(event.type) {
    case 'payment.completed':
      fulfillOrder(event.data.payment_id);
      break;
  }
  res.status(200).send('Webhook received');
});`)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 4: Integration Patterns */}
      <Card id="step-4">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white text-sm">4</span>
            <span>Integration Patterns</span>
          </CardTitle>
          <CardDescription>Common implementation approaches</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Pattern 1: Direct Payment Links via API (Recommended)</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Generate payment links on-demand and redirect customers. Your integration endpoint stays permanent, but each customer interaction creates a new unique single-use payment link:
            </p>
            <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
              <pre className="text-xs font-mono">{`// When customer clicks "Pay with Crypto"
async function initiatePayment(price) {
  const response = await fetch('https://api.pymstr.com/v1/payment-links', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${process.env.PYMSTR_API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      price,
      currency: 'USD'
    })
  });
  
  const result = await response.json();
  
  // Redirect customer to payment page
  window.location.href = result.data.url;
}`}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => copyToClipboard(`async function initiatePayment(price) {
  const response = await fetch('https://api.pymstr.com/v1/payment-links', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${process.env.PYMSTR_API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      price,
      currency: 'USD'
    })
  });
  const result = await response.json();
  window.location.href = result.data.url;
}`)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
              <h5 className="font-semibold text-sm mb-2">Pattern 2: Embedded Checkout</h5>
              <p className="text-xs text-muted-foreground">
                Coming soon: Embed the PYMSTR checkout directly in your application using our SDK
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
              <h5 className="font-semibold text-sm mb-2">Pattern 3: API-Driven Custom UI</h5>
              <p className="text-xs text-muted-foreground">
                Build your own checkout UI using our API endpoints for full control
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 5: Check Payment Status */}
      <Card id="step-5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white text-sm">5</span>
            <span>Check Payment Status</span>
          </CardTitle>
          <CardDescription>Monitor payment completion and transaction details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Via API:</h4>
            <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
              <pre className="text-xs font-mono">{`curl -X GET https://api.pymstr.com/v1/payment-links/550e8400-e29b-41d4-a716-446655440000 \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => copyToClipboard(`curl -X GET https://api.pymstr.com/v1/payment-links/550e8400-e29b-41d4-a716-446655440000 \\
  -H "Authorization: Bearer YOUR_API_KEY"`)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Response:</h4>
            <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
              <pre className="text-xs font-mono">{`{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Premium Subscription",
    "price": "99.99",
    "currency": "USD",
    "acceptedTokens": ["USDC", "USDT", "DAI"],
    "acceptedChains": ["polygon", "ethereum"],
    "status": "completed",
    "token": "USDC",
    "chain": "polygon",
    "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "createdAt": "2025-10-22T10:30:00Z",
    "completedAt": "2025-10-22T10:35:00Z"
  }
}`}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => copyToClipboard(`{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Premium Subscription",
    "price": "99.99",
    "currency": "USD",
    "acceptedTokens": ["USDC", "USDT", "DAI"],
    "acceptedChains": ["polygon", "ethereum"],
    "status": "completed",
    "token": "USDC",
    "chain": "polygon",
    "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "createdAt": "2025-10-22T10:30:00Z",
    "completedAt": "2025-10-22T10:35:00Z"
  }
}`)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
            <p className="text-sm">
              <strong>Via Dashboard:</strong> Navigate to Dashboard → Recent Transactions to view all payment activity
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card id="best-practices">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>Best Practices</span>
          </CardTitle>
          <CardDescription>Security and optimization guidelines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <span className="text-green-600">✓</span>
                <span>Security</span>
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Always verify webhook signatures</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Use HTTPS for webhook endpoints</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Store API keys securely (environment variables, vaults)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Rotate API keys periodically</span>
                </li>
              </ul>
              <h4 className="font-semibold mt-4 mb-3 flex items-center space-x-2">
                <span className="text-red-600">✗</span>
                <span>Never Do</span>
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Never expose API keys in client-side code</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Never commit API keys to version control</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Performance & UX</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Use <strong>Polygon</strong> for lowest transaction fees</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Use <strong>USDC</strong> as default (most widely held stablecoin)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Cache payment status locally, use webhooks for updates</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Implement retry logic for failed API calls</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Show real-time transaction status updates</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Provide transaction hash for blockchain verification</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Use Cases */}
      <Card id="use-cases">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
              <BookOpen className="w-4 h-4" />
            </div>
            <span>Common Use Cases</span>
          </CardTitle>
          <CardDescription>Real-world integration examples</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
              <h5 className="font-semibold text-sm mb-2">🛒 E-commerce Checkout</h5>
              <p className="text-xs text-muted-foreground mb-3">
                Integrate crypto payments at checkout for global customers
              </p>
              <div className="bg-white dark:bg-gray-950 rounded-2xl p-2">
                <code className="text-xs font-mono break-all">
                  createPaymentLink(cart.total)
                </code>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
              <h5 className="font-semibold text-sm mb-2">🔄 Subscription Billing</h5>
              <p className="text-xs text-muted-foreground mb-3">
                Generate recurring payment links for subscriptions
              </p>
              <div className="bg-white dark:bg-gray-950 rounded-2xl p-2">
                <code className="text-xs font-mono break-all">
                  chargeSubscription(user)
                </code>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
              <h5 className="font-semibold text-sm mb-2">💝 Donations/Tips</h5>
              <p className="text-xs text-muted-foreground mb-3">
                Accept donations with user-chosen amounts
              </p>
              <div className="bg-white dark:bg-gray-950 rounded-2xl p-2">
                <code className="text-xs font-mono break-all">
                  acceptDonation(amount)
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Reference */}
      <Card id="api-reference">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
              <Code2 className="w-4 h-4" />
            </div>
            <span>API Reference</span>
          </CardTitle>
          <CardDescription>Quick reference for API endpoints</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Base URL</h4>
            <div className="bg-black text-[#05df72] rounded-3xl p-3">
              <code className="text-sm font-mono">https://api.pymstr.com/v1</code>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Authentication</h4>
            <p className="text-sm text-muted-foreground mb-2">
              All API requests require authentication via Bearer token:
            </p>
            <div className="bg-black text-[#05df72] rounded-3xl p-3">
              <code className="text-sm font-mono">Authorization: Bearer YOUR_API_KEY</code>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Core Endpoints</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Endpoint</th>
                    <th className="text-left py-2 px-3">Method</th>
                    <th className="text-left py-2 px-3">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 px-3"><code>/payment-links</code></td>
                    <td className="py-2 px-3">POST</td>
                    <td className="py-2 px-3">Create a new payment link</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3"><code>/payment-links</code></td>
                    <td className="py-2 px-3">GET</td>
                    <td className="py-2 px-3">List all payment links</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3"><code>/payment-links/:id</code></td>
                    <td className="py-2 px-3">GET</td>
                    <td className="py-2 px-3">Get payment link details</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3"><code>/payment-links/:id</code></td>
                    <td className="py-2 px-3">DELETE</td>
                    <td className="py-2 px-3">Delete payment link</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3"><code>/payments/:id</code></td>
                    <td className="py-2 px-3">GET</td>
                    <td className="py-2 px-3">Get payment status</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3"><code>/transactions</code></td>
                    <td className="py-2 px-3">GET</td>
                    <td className="py-2 px-3">List all transactions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card id="next-steps">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
              <CheckCircle className="w-4 h-4" />
            </div>
            <span>Next Steps</span>
          </CardTitle>
          <CardDescription>Your journey to accepting crypto payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-[#07D7FF]/20 bg-[#07D7FF]/5 rounded-3xl p-4">
              <h5 className="font-semibold text-sm mb-2">✅ Create your first payment link</h5>
              <p className="text-xs text-muted-foreground">
                Go back to the API page and create an API key to get started
              </p>
            </div>
            <div className="border-2 border-gray-200 dark:border-gray-800 rounded-3xl p-4">
              <h5 className="font-semibold text-sm mb-2">🔗 Set up webhook endpoint</h5>
              <p className="text-xs text-muted-foreground">
                Navigate to Webhooks to configure event notifications
              </p>
            </div>
            <div className="border-2 border-gray-200 dark:border-gray-800 rounded-3xl p-4">
              <h5 className="font-semibold text-sm mb-2">🧪 Test the complete payment flow</h5>
              <p className="text-xs text-muted-foreground">
                Use test API keys to verify integration works correctly
              </p>
            </div>
            <div className="border-2 border-gray-200 dark:border-gray-800 rounded-3xl p-4">
              <h5 className="font-semibold text-sm mb-2">🚀 Go live with production keys</h5>
              <p className="text-xs text-muted-foreground">
                Switch to production API keys when ready to accept real payments
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="bg-gradient-to-br from-[#07D7FF]/10 to-[#07D7FF]/5 border-[#07D7FF]/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h4 className="font-semibold">Need Help?</h4>
            <p className="text-sm text-muted-foreground">
              Contact us at <strong>developers@pymstr.com</strong> or join our Discord community
            </p>
            <p className="text-xs text-muted-foreground pt-2">
              Welcome to the future of payments! 🚀
            </p>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default QuickStartGuide;