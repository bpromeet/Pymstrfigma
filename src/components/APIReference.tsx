import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ArrowLeft, Copy, CheckCircle, AlertCircle, Globe, Code2, Webhook, BarChart3, DollarSign, Zap, TrendingUp, Building2, Check, X, Menu } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface APIReferenceProps {
  onBack: () => void;
}

const APIReference: React.FC<APIReferenceProps> = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const sections = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'payment-types', label: 'Payment Link Types', icon: Code2 },
    { id: 'authentication', label: 'Authentication', icon: Code2 },
    { id: 'endpoints', label: 'API Endpoints', icon: BarChart3 },
    { id: 'pricing', label: 'Pricing & Fees', icon: DollarSign },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'errors', label: 'Error Codes', icon: AlertCircle },
    { id: 'examples', label: 'Code Examples', icon: Code2 },
    { id: 'rate-limits', label: 'Rate Limits', icon: BarChart3 },
    { id: 'support', label: 'Support', icon: CheckCircle },
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

  const copyToClipboard = (text: string, id: string) => {
    // Fallback method that doesn't require Clipboard API permissions
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      setCopiedCode(id);
      toast('Copied to clipboard!');
      setTimeout(() => setCopiedCode(null), 2000);
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
            <Code2 className="w-6 h-6 text-[#07D7FF]" />
            API Reference
          </h1>
          <p className="text-muted-foreground mt-2">
            Complete documentation for PYMSTR API integration
          </p>
        </div>

        {/* Header - Mobile */}
        <div className="lg:hidden">
          <h1 className="flex items-center gap-3">
            <Code2 className="w-6 h-6 text-[#07D7FF]" />
            API Reference
          </h1>
          <p className="text-muted-foreground mt-2">
            Complete documentation for PYMSTR API integration
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
          <CardDescription>Introduction to PYMSTR API capabilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The PYMSTR API allows you to accept stablecoin payments on your platform. This reference provides detailed information about endpoints, request/response formats, authentication, and webhook integration.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-3xl p-4">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Base URL:</strong> <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">https://api.pymstr.com/v1</code>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Link Types & Architecture */}
      <Card id="payment-types" className="border-2 border-[#07D7FF]/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
              <Globe className="w-4 h-4" />
            </div>
            <span>Payment Link Types & Architecture</span>
          </CardTitle>
          <CardDescription>Understanding manual and API-generated payment links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-[#07D7FF]/10 border border-[#07D7FF]/20 rounded-3xl p-4">
            <h4 className="font-semibold mb-2">Key Concept: Single-Use Payment Links</h4>
            <p className="text-sm text-muted-foreground">
              All PYMSTR payment links are <strong>single-use only</strong>. Once a payment is completed, the link cannot be reused. 
              Each completed payment stores only a <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">txHash</code> (blockchain transaction hash) - 
              no transaction IDs are generated.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Manual Links */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-3xl p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-600 rounded-full">Manual</Badge>
                <h5 className="font-semibold">Manual Payment Links</h5>
              </div>
              <p className="text-sm text-muted-foreground">
                Created directly in the admin dashboard UI for specific transactions.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-3 space-y-2 text-sm">
                <div><strong>Source:</strong> <code className="text-blue-600">"manual"</code></div>
                <div><strong>Created via:</strong> Dashboard UI</div>
                <div><strong>Dashboard tab:</strong> "Manual"</div>
                <div><strong>Use cases:</strong> Invoicing, one-off payments, direct payment requests</div>
              </div>
            </div>

            {/* API Links */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-3xl p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-600 rounded-full">API</Badge>
                <h5 className="font-semibold">API-Generated Payment Links</h5>
              </div>
              <p className="text-sm text-muted-foreground">
                Created programmatically via API for automated payment processing.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-3 space-y-2 text-sm">
                <div><strong>Source:</strong> <code className="text-green-600">"api"</code></div>
                <div><strong>Created via:</strong> POST /payment-links API</div>
                <div><strong>Dashboard tab:</strong> "API"</div>
                <div><strong>Use cases:</strong> E-commerce, automated flows, dynamic pricing</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4 space-y-3">
            <h5 className="font-semibold">API Integration Flow</h5>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-[#07D7FF] mt-0.5">1.</span>
                <span>Customer clicks "Pay with Crypto" on your website (your integration endpoint - permanent & reusable)</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-[#07D7FF] mt-0.5">2.</span>
                <span>Your backend calls PYMSTR API: <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">POST /payment-links</code></span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-[#07D7FF] mt-0.5">3.</span>
                <span>API creates a <strong>new unique payment link</strong> with status "active"</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-[#07D7FF] mt-0.5">4.</span>
                <span>API returns the payment link URL (e.g., <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">pymstr.com/#/pay/PL12345</code>)</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-[#07D7FF] mt-0.5">5.</span>
                <span>You redirect customer to the payment link URL</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-[#07D7FF] mt-0.5">6.</span>
                <span>Customer completes Web3 payment through PYMSTR checkout</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-[#07D7FF] mt-0.5">7.</span>
                <span>Payment link status → "completed" with <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">txHash</code> stored</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-[#07D7FF] mt-0.5">8.</span>
                <span>Link <strong>cannot be reused</strong> - subsequent access attempts show "already used" error</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-[#07D7FF] mt-0.5">9.</span>
                <span>Your webhook receives <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">payment.completed</code> event with txHash</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-3xl p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              <AlertCircle className="w-4 h-4 inline mr-2" />
              <strong>Important:</strong> Your integration endpoint (e.g., your "Pay with Crypto" button) remains permanent and reusable. 
              Each time it's used, you create a <strong>new unique single-use payment link</strong> via the API. The merchant's integration is reusable, 
              but each payment session/link is single-use.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Authentication */}
      <Card id="authentication">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
              <Code2 className="w-4 h-4" />
            </div>
            <span>Authentication</span>
          </CardTitle>
          <CardDescription>Secure your API requests with Bearer token authentication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            All API requests require authentication using an API key. Include your API key in the Authorization header using the Bearer scheme.
          </p>
          
          <div>
            <h4 className="font-semibold text-sm mb-2">Example Request</h4>
            <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
              <pre className="text-xs font-mono">{`curl -X GET https://api.pymstr.com/v1/payment-links \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => copyToClipboard(`curl -X GET https://api.pymstr.com/v1/payment-links \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`, 'auth-example')}
              >
                {copiedCode === 'auth-example' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-3xl p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              <AlertCircle className="w-4 h-4 inline mr-2" />
              <strong>Keep your API keys secure!</strong> Never share them publicly or commit them to version control.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* API Endpoints */}
      <Card id="endpoints">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
              <BarChart3 className="w-4 h-4" />
            </div>
            <span>API Endpoints</span>
          </CardTitle>
          <CardDescription>Core endpoints for payment link management and analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="payment-links" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-full">
              <TabsTrigger value="payment-links" className="rounded-full">Payment Links</TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-full">Analytics</TabsTrigger>
            </TabsList>

            {/* Payment Links Tab */}
            <TabsContent value="payment-links" className="space-y-6 mt-6">
              {/* Create Payment Link */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Create Payment Link</h4>
                  <Badge variant="default" className="bg-green-600 rounded-full">POST</Badge>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-3">
                  <code className="text-sm">/payment-links</code>
                </div>
                <p className="text-sm text-muted-foreground">
                  Create a new single-use payment link for accepting crypto payments. Links created via API are automatically tagged with <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">source: "api"</code> and appear in the "API" tab of your dashboard.
                </p>
                
                <div>
                  <h5 className="font-semibold text-sm mb-3">Request Body Parameters:</h5>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4 space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <code className="text-[#07D7FF] min-w-[140px]">name</code>
                      <Badge variant="secondary" className="rounded-full shrink-0">Optional</Badge>
                      <span className="text-muted-foreground">string - Display name for the payment link</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <code className="text-[#07D7FF] min-w-[140px]">price</code>
                      <Badge variant="destructive" className="rounded-full shrink-0">Required</Badge>
                      <span className="text-muted-foreground">string - Payment amount (e.g., "29.99")</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <code className="text-[#07D7FF] min-w-[140px]">currency</code>
                      <Badge variant="destructive" className="rounded-full shrink-0">Required</Badge>
                      <span className="text-muted-foreground">string - Fiat currency code (USD, EUR, GBP, etc.)</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <code className="text-[#07D7FF] min-w-[140px]">expiresAt</code>
                      <Badge variant="secondary" className="rounded-full shrink-0">Optional</Badge>
                      <span className="text-muted-foreground">number - Minutes until the payment link expires (e.g., 60 for 1 hour, 1440 for 24 hours)</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <code className="text-[#07D7FF] min-w-[140px]">redirectUrl</code>
                      <Badge variant="secondary" className="rounded-full shrink-0">Optional</Badge>
                      <span className="text-muted-foreground">string - URL to redirect after successful payment</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <code className="text-[#07D7FF] min-w-[140px]">acceptedTokens</code>
                      <Badge variant="secondary" className="rounded-full shrink-0">Optional</Badge>
                      <span className="text-muted-foreground">array - Tokens to accept (USDC, USDT, DAI). Defaults to all</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <code className="text-[#07D7FF] min-w-[140px]">acceptedChains</code>
                      <Badge variant="secondary" className="rounded-full shrink-0">Optional</Badge>
                      <span className="text-muted-foreground">array - Chains to accept (ethereum, polygon, arbitrum, optimism, base). Defaults to all</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <code className="text-[#07D7FF] min-w-[140px]">metadata</code>
                      <Badge variant="secondary" className="rounded-full shrink-0">Optional</Badge>
                      <span className="text-muted-foreground">object - Custom key-value data for your reference</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-3xl p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Note:</strong> Payment links created via API are automatically assigned <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">source: "api"</code>. 
                    The link is <strong>single-use only</strong> - once payment is completed, it cannot be reused. Each API call should create a new payment link for each transaction.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-sm mb-2">Response: <Badge className="ml-2 rounded-full">201 Created</Badge></h5>
                  <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
                    <pre className="text-xs font-mono">{`{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Premium Subscription",
    "price": "29.99",
    "currency": "USD",
    "status": "active",
    "source": "api",
    "url": "https://checkout.pymstr.com/550e8400-e29b-41d4-a716-446655440000",
    "expiresAt": 1440,
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
    "price": "29.99",
    "currency": "USD",
    "status": "active",
    "source": "api",
    "url": "https://checkout.pymstr.com/550e8400-e29b-41d4-a716-446655440000",
    "expiresAt": 1440,
    "createdAt": "2025-10-22T10:30:00Z"
  }
}`, 'create-pl-res')}
                    >
                      {copiedCode === 'create-pl-res' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Get Payment Link */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Get Payment Link</h4>
                  <Badge variant="secondary" className="rounded-full">GET</Badge>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-3">
                  <code className="text-sm">/payment-links/{'{id}'}</code>
                </div>
                <p className="text-sm text-muted-foreground">Retrieve details of a specific payment link.</p>
                
                <div>
                  <h5 className="font-semibold text-sm mb-3">Path Parameters:</h5>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4 space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <code className="text-[#07D7FF] min-w-[140px]">id</code>
                      <Badge variant="destructive" className="rounded-full shrink-0">Required</Badge>
                      <span className="text-muted-foreground">string - The unique UUID identifier of the payment link</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-sm mb-2">Response Example (Completed): <Badge className="ml-2 rounded-full">200 OK</Badge></h5>
                  <p className="text-xs text-muted-foreground mb-2">
                    When status is "completed", the link is <strong>single-use and cannot be reused</strong>. It includes <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">txHash</code> but no transaction ID.
                  </p>
                  <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
                    <pre className="text-xs font-mono">{`{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Premium Subscription",
    "price": "29.99",
    "currency": "USD",
    "status": "completed",
    "source": "api",
    "url": "https://checkout.pymstr.com/550e8400-e29b-41d4-a716-446655440000",
    "acceptedTokens": ["USDC", "USDT", "DAI"],
    "acceptedChains": ["ethereum", "polygon", "arbitrum", "optimism", "base"],
    "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "chain": "polygon",
    "token": "USDC",
    "fromAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "expiresAt": 1440,
    "redirectUrl": "https://yoursite.com/success",
    "metadata": {
      "customerId": "cust_12345",
      "planId": "premium_monthly"
    },
    "createdAt": "2025-10-22T10:30:00Z",
    "completedAt": "2025-10-22T10:35:22Z"
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
    "price": "29.99",
    "currency": "USD",
    "status": "completed",
    "source": "api",
    "url": "https://checkout.pymstr.com/550e8400-e29b-41d4-a716-446655440000",
    "acceptedTokens": ["USDC", "USDT", "DAI"],
    "acceptedChains": ["ethereum", "polygon", "arbitrum", "optimism", "base"],
    "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "chain": "polygon",
    "token": "USDC",
    "fromAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "expiresAt": 1440,
    "redirectUrl": "https://yoursite.com/success",
    "metadata": {
      "customerId": "cust_12345",
      "planId": "premium_monthly"
    },
    "createdAt": "2025-10-22T10:30:00Z",
    "completedAt": "2025-10-22T10:35:22Z"
  }
}`, 'get-pl-res')}
                    >
                      {copiedCode === 'get-pl-res' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* List Payment Links */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">List Payment Links</h4>
                  <Badge variant="secondary" className="rounded-full">GET</Badge>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-3">
                  <code className="text-sm">/payment-links</code>
                </div>
                <p className="text-sm text-muted-foreground">Retrieve all payment links with optional filtering.</p>
                
                <div>
                  <h5 className="font-semibold text-sm mb-3">Query Parameters:</h5>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4 space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <code className="text-[#07D7FF] min-w-[140px]">status</code>
                      <Badge variant="secondary" className="rounded-full shrink-0">Optional</Badge>
                      <span className="text-muted-foreground">string - Filter by status: active, completed, expired, inactive</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <code className="text-[#07D7FF] min-w-[140px]">source</code>
                      <Badge variant="secondary" className="rounded-full shrink-0">Optional</Badge>
                      <span className="text-muted-foreground">string - Filter by creation method: manual, api</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <code className="text-[#07D7FF] min-w-[140px]">limit</code>
                      <Badge variant="secondary" className="rounded-full shrink-0">Optional</Badge>
                      <span className="text-muted-foreground">number - Number of results to return (default: 20, max: 100)</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <code className="text-[#07D7FF] min-w-[140px]">offset</code>
                      <Badge variant="secondary" className="rounded-full shrink-0">Optional</Badge>
                      <span className="text-muted-foreground">number - Pagination offset (default: 0)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-sm mb-2">Response: <Badge className="ml-2 rounded-full">200 OK</Badge></h5>
                  <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
                    <pre className="text-xs font-mono">{`{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Premium Subscription",
      "price": "29.99",
      "currency": "USD",
      "status": "completed",
      "source": "api",
      "txHash": "0x1234567890abcdef...",
      "chain": "polygon",
      "token": "USDC",
      "createdAt": "2025-10-22T10:30:00Z",
      "completedAt": "2025-10-22T10:35:22Z"
    },
    {
      "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      "name": "Invoice #1234",
      "price": "9.99",
      "currency": "USD",
      "status": "active",
      "source": "manual",
      "createdAt": "2025-10-20T14:22:00Z"
    },
    {
      "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      "name": "Enterprise Package",
      "price": "199.99",
      "currency": "USD",
      "status": "expired",
      "source": "api",
      "createdAt": "2025-10-15T09:12:00Z",
      "expiresAt": 7200
    }
  ],
  "pagination": {
    "total": 47,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}`}</pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(`{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Premium Subscription",
      "price": "29.99",
      "currency": "USD",
      "status": "completed",
      "source": "api",
      "txHash": "0x1234567890abcdef...",
      "chain": "polygon",
      "token": "USDC",
      "createdAt": "2025-10-22T10:30:00Z",
      "completedAt": "2025-10-22T10:35:22Z"
    },
    {
      "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      "name": "Invoice #1234",
      "price": "9.99",
      "currency": "USD",
      "status": "active",
      "source": "manual",
      "createdAt": "2025-10-20T14:22:00Z"
    },
    {
      "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      "name": "Enterprise Package",
      "price": "199.99",
      "currency": "USD",
      "status": "expired",
      "source": "api",
      "createdAt": "2025-10-15T09:12:00Z",
      "expiresAt": 7200
    }
  ],
  "pagination": {
    "total": 47,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}`, 'list-pl-res')}
                    >
                      {copiedCode === 'list-pl-res' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Delete Payment Link */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Delete Payment Link</h4>
                  <Badge variant="destructive" className="rounded-full">DELETE</Badge>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-3">
                  <code className="text-sm">/payment-links/{'{id}'}</code>
                </div>
                <p className="text-sm text-muted-foreground">Delete a payment link (soft delete - preserves payment data for accounting purposes).</p>
                
                <div>
                  <h5 className="font-semibold text-sm mb-3">Path Parameters:</h5>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4 space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <code className="text-[#07D7FF] min-w-[140px]">id</code>
                      <Badge variant="destructive" className="rounded-full shrink-0">Required</Badge>
                      <span className="text-muted-foreground">string - The unique UUID identifier of the payment link to delete</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-3xl p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>Note:</strong> This is a soft delete. The payment link will be marked as deleted but payment data is preserved for accounting and compliance purposes.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-sm mb-2">Response: <Badge className="ml-2 rounded-full">200 OK</Badge></h5>
                  <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
                    <pre className="text-xs font-mono">{`{
  "success": true,
  "message": "Payment link deleted successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "deleted",
    "deletedAt": "2025-10-22T15:30:00Z"
  }
}`}</pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(`{
  "success": true,
  "message": "Payment link deleted successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "deleted",
    "deletedAt": "2025-10-22T15:30:00Z"
  }
}`, 'delete-pl-res')}
                    >
                      {copiedCode === 'delete-pl-res' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Get Analytics</h4>
                  <Badge variant="secondary" className="rounded-full">GET</Badge>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-3">
                  <code className="text-sm">/analytics</code>
                </div>
                <p className="text-muted-foreground">Retrieve payment analytics and statistics.</p>
                
                <div>
                  <h5 className="font-semibold text-sm mb-2">Query Parameters:</h5>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4 space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <code className="text-[#07D7FF]">period</code>
                      <span className="text-muted-foreground">(required) - Time period: 24h, 7d, 30d, 90d, 1y, all</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <code className="text-[#07D7FF]">groupBy</code>
                      <span className="text-muted-foreground">(optional) - Group data by: day, week, month</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-sm mb-2">Response: <Badge className="ml-2 rounded-full">200 OK</Badge></h5>
                  <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
                    <pre className="text-xs font-mono">{`{
  "success": true,
  "data": {
    "totalVolume": "125847.32",
    "completedPayments": 4521,
    "averagePaymentValue": "27.83",
    "period": "30d",
    "volumeByChain": {
      "ethereum": "45234.12",
      "polygon": "52341.23",
      "arbitrum": "18765.45",
      "optimism": "9506.52"
    },
    "volumeByToken": {
      "USDC": "62341.56",
      "USDT": "45234.12",
      "DAI": "18271.64"
    },
    "timeSeriesData": [
      {
        "date": "2025-10-15",
        "volume": "4532.23",
        "count": 152
      },
      {
        "date": "2025-10-16",
        "volume": "5123.45",
        "count": 168
      }
    ]
  }
}`}</pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(`{
  "success": true,
  "data": {
    "totalVolume": "125847.32",
    "completedPayments": 4521,
    "averagePaymentValue": "27.83",
    "period": "30d",
    "volumeByChain": {
      "ethereum": "45234.12",
      "polygon": "52341.23",
      "arbitrum": "18765.45",
      "optimism": "9506.52"
    },
    "volumeByToken": {
      "USDC": "62341.56",
      "USDT": "45234.12",
      "DAI": "18271.64"
    },
    "timeSeriesData": [
      {
        "date": "2025-10-15",
        "volume": "4532.23",
        "count": 152
      },
      {
        "date": "2025-10-16",
        "volume": "5123.45",
        "count": 168
      }
    ]
  }
}`, 'analytics-res')}
                    >
                      {copiedCode === 'analytics-res' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Pricing & Fees */}
      <Card id="pricing">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
              <DollarSign className="w-4 h-4" />
            </div>
            <span>Pricing & Fees</span>
          </CardTitle>
          <CardDescription>
            Simple, transparent pricing with no hidden fees
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Free Tier */}
            <div className="border-2 border-gray-200 dark:border-gray-800 rounded-3xl p-5 space-y-4 hover:border-[#07D7FF]/30 transition-colors">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold">Free</h4>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-bold">0%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">on first $1,000 processed</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Perfect for testing</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">All core features</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">API access</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Dashboard & Analytics</span>
                </div>
              </div>
            </div>

            {/* Starter Tier */}
            <div className="border-2 border-gray-200 dark:border-gray-800 rounded-3xl p-5 space-y-4 hover:border-[#07D7FF]/30 transition-colors">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold">Starter</h4>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-bold">1.0%</span>
                    <span className="text-sm text-muted-foreground">per transaction</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Up to $50K/month</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Payment Links</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Basic Analytics</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">API access</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Email support</span>
                </div>
              </div>
            </div>

            {/* Professional Tier */}
            <div className="border-2 border-[#07D7FF] rounded-3xl p-5 space-y-4 relative bg-[#07D7FF]/5">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-[#07D7FF] text-white rounded-full">Popular</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-[#07D7FF]" />
                  <h4 className="font-semibold">Professional</h4>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-bold">0.5%</span>
                    <span className="text-sm text-muted-foreground">per transaction</span>
                  </div>
                  <p className="text-xs text-muted-foreground">$50K - $500K/month</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Everything in Starter</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Advanced API</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Webhooks</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Team (up to 5 users)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Priority support</span>
                </div>
              </div>
            </div>

            {/* Enterprise Tier */}
            <div className="border-2 border-gray-200 dark:border-gray-800 rounded-3xl p-5 space-y-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold">Enterprise</h4>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-bold">0.3%</span>
                    <span className="text-sm text-muted-foreground">per transaction</span>
                  </div>
                  <p className="text-xs text-muted-foreground">$500K+/month</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Everything in Pro</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Custom rates available</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Unlimited team</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Dedicated account manager</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">SLA guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Network Gas Fees */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-3xl p-4">
            <h5 className="font-semibold text-sm mb-2 text-blue-800 dark:text-blue-300">Network Gas Fees</h5>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              All blockchain gas fees are covered by PYMSTR infrastructure via Account Abstraction (Pimlico). 
              Your customers only pay the stablecoin amount - no hidden blockchain fees.
            </p>
          </div>

          {/* What's Included */}
          <div className="space-y-3">
            <h5 className="font-semibold">What's Included (All Tiers)</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start space-x-2 text-sm">
                <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold">Supported Assets:</span> USDC, USDT, EURC
                </div>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold">Supported Chains:</span> Ethereum, Polygon, Arbitrum, Optimism, Base
                </div>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold">Settlement:</span> Instant to your wallet
                </div>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold">No hold periods or reserves</span>
                </div>
              </div>
            </div>
          </div>

          {/* No Hidden Fees */}
          <div className="space-y-3">
            <h5 className="font-semibold">No Hidden Fees</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-start space-x-2 text-sm">
                <X className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">No monthly fees</span>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <X className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">No setup fees</span>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <X className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">No chargeback fees</span>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <X className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">No failed transaction fees</span>
              </div>
            </div>
          </div>

          {/* Additional Note */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Blockchain payments are final and irreversible, eliminating chargeback risks. 
              Transaction fees are only charged on completed payments. API access is included in all tiers at no additional cost.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Webhooks */}
      <Card id="webhooks">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
              <Webhook className="w-4 h-4" />
            </div>
            <span>Webhooks</span>
          </CardTitle>
          <CardDescription>Receive real-time notifications for payment events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Webhooks allow you to receive real-time notifications when events occur in your PYMSTR account.
          </p>

          <div>
            <h4 className="font-semibold mb-2">Setting Up Webhooks</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Navigate to Settings → Webhooks in your dashboard</li>
              <li>Click "Add Webhook Endpoint"</li>
              <li>Enter your endpoint URL</li>
              <li>Select events to subscribe to</li>
              <li>Save and copy your webhook secret</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Webhook Events</h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <code className="text-[#07D7FF]">payment.completed</code>
                <span className="text-muted-foreground">- Payment successfully completed</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <code className="text-[#07D7FF]">payment.pending</code>
                <span className="text-muted-foreground">- Payment initiated, waiting for confirmation</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <code className="text-[#07D7FF]">payment.failed</code>
                <span className="text-muted-foreground">- Payment failed or expired</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <code className="text-[#07D7FF]">payment_link.created</code>
                <span className="text-muted-foreground">- New payment link created</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <code className="text-[#07D7FF]">refund.completed</code>
                <span className="text-muted-foreground">- Refund processed</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Webhook Payload Example</h4>
            <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
              <pre className="text-xs font-mono">{`{
  "id": "evt_1a2b3c4d5e",
  "event": "payment.completed",
  "createdAt": "2025-10-22T10:36:15Z",
  "data": {
    "paymentLinkId": "550e8400-e29b-41d4-a716-446655440000",
    "price": "29.99",
    "currency": "USD",
    "token": "USDC",
    "chain": "polygon",
    "txHash": "0x1234567890abcdef...",
    "fromAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  }
}`}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => copyToClipboard(`{
  "id": "evt_1a2b3c4d5e",
  "event": "payment.completed",
  "createdAt": "2025-10-22T10:36:15Z",
  "data": {
    "paymentLinkId": "550e8400-e29b-41d4-a716-446655440000",
    "price": "29.99",
    "currency": "USD",
    "token": "USDC",
    "chain": "polygon",
    "txHash": "0x1234567890abcdef...",
    "fromAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  }
}`, 'webhook-payload')}
              >
                {copiedCode === 'webhook-payload' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Verifying Webhook Signatures</h4>
            <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
              <pre className="text-xs font-mono">{`const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const computedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(computedSignature)
  );
}

app.post('/webhooks/pymstr', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-pymstr-signature'];
  const payload = req.body;
  
  if (!verifyWebhookSignature(payload, signature, process.env.PYMSTR_WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }
  
  const event = JSON.parse(payload);
  
  switch (event.event) {
    case 'payment.completed':
      console.log('Payment completed:', event.data);
      break;
  }
  
  res.status(200).send('Webhook received');
});`}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => copyToClipboard(`const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const computedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(computedSignature)
  );
}

app.post('/webhooks/pymstr', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-pymstr-signature'];
  const payload = req.body;
  
  if (!verifyWebhookSignature(payload, signature, process.env.PYMSTR_WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }
  
  const event = JSON.parse(payload);
  
  switch (event.event) {
    case 'payment.completed':
      console.log('Payment completed:', event.data);
      break;
  }
  
  res.status(200).send('Webhook received');
});`, 'webhook-verify')}
              >
                {copiedCode === 'webhook-verify' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Codes */}
      <Card id="errors">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
              <AlertCircle className="w-4 h-4" />
            </div>
            <span>Error Codes</span>
          </CardTitle>
          <CardDescription>HTTP status codes and error handling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-3">HTTP Status Codes</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Code</th>
                    <th className="text-left py-2 px-3">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 px-3"><code className="text-green-600">200</code></td>
                    <td className="py-2 px-3">OK - Request succeeded</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3"><code className="text-green-600">201</code></td>
                    <td className="py-2 px-3">Created - Resource created successfully</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3"><code className="text-red-600">400</code></td>
                    <td className="py-2 px-3">Bad Request - Invalid parameters</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3"><code className="text-red-600">401</code></td>
                    <td className="py-2 px-3">Unauthorized - Invalid or missing API key</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3"><code className="text-red-600">404</code></td>
                    <td className="py-2 px-3">Not Found - Resource doesn't exist</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3"><code className="text-red-600">429</code></td>
                    <td className="py-2 px-3">Too Many Requests - Rate limit exceeded</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3"><code className="text-red-600">500</code></td>
                    <td className="py-2 px-3">Internal Server Error - Server error</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Error Response Format</h4>
            <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
              <pre className="text-xs font-mono">{`{
  "success": false,
  "error": {
    "code": "invalid_request",
    "message": "The 'price' field must be a positive number",
    "field": "price"
  }
}`}</pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => copyToClipboard(`{
  "success": false,
  "error": {
    "code": "invalid_request",
    "message": "The 'price' field must be a positive number",
    "field": "price"
  }
}`, 'error-format')}
              >
                {copiedCode === 'error-format' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Common Error Codes</h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4 space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <code className="text-red-600">invalid_request</code>
                <span className="text-muted-foreground">- Malformed request or invalid parameters</span>
              </div>
              <div className="flex items-start space-x-2">
                <code className="text-red-600">authentication_failed</code>
                <span className="text-muted-foreground">- Invalid API key</span>
              </div>
              <div className="flex items-start space-x-2">
                <code className="text-red-600">resource_not_found</code>
                <span className="text-muted-foreground">- Requested resource doesn't exist</span>
              </div>
              <div className="flex items-start space-x-2">
                <code className="text-red-600">rate_limit_exceeded</code>
                <span className="text-muted-foreground">- Too many API requests</span>
              </div>
              <div className="flex items-start space-x-2">
                <code className="text-red-600">invalid_chain</code>
                <span className="text-muted-foreground">- Unsupported blockchain network</span>
              </div>
              <div className="flex items-start space-x-2">
                <code className="text-red-600">transaction_failed</code>
                <span className="text-muted-foreground">- Blockchain transaction failed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card id="examples">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
              <Code2 className="w-4 h-4" />
            </div>
            <span>Code Examples</span>
          </CardTitle>
          <CardDescription>Integration examples in different languages</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="javascript" className="w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-full">
              <TabsTrigger value="javascript" className="rounded-full">JavaScript</TabsTrigger>
              <TabsTrigger value="python" className="rounded-full">Python</TabsTrigger>
              <TabsTrigger value="php" className="rounded-full">PHP</TabsTrigger>
              <TabsTrigger value="curl" className="rounded-full">cURL</TabsTrigger>
            </TabsList>

            <TabsContent value="javascript" className="mt-4">
              <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
                <pre className="text-xs font-mono">{`const PYMSTR_API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.pymstr.com/v1';

async function createPaymentLink(data) {
  const response = await fetch(\`\${BASE_URL}/payment-links\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${PYMSTR_API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  return await response.json();
}

// Usage
const paymentLink = await createPaymentLink({
  name: 'Product Purchase',
  description: 'Premium widget',
  price: '49.99',
  currency: 'USD',
  acceptedTokens: ['USDC', 'USDT'],
  acceptedChains: ['polygon', 'arbitrum']
});

console.log('Payment URL:', paymentLink.data.url);`}</pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(`const PYMSTR_API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.pymstr.com/v1';

async function createPaymentLink(data) {
  const response = await fetch(\`\${BASE_URL}/payment-links\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${PYMSTR_API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  return await response.json();
}

// Usage
const paymentLink = await createPaymentLink({
  name: 'Product Purchase',
  description: 'Premium widget',
  price: '49.99',
  currency: 'USD',
  acceptedTokens: ['USDC', 'USDT'],
  acceptedChains: ['polygon', 'arbitrum']
});

console.log('Payment URL:', paymentLink.data.url);`, 'js-example')}
                >
                  {copiedCode === 'js-example' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="python" className="mt-4">
              <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
                <pre className="text-xs font-mono">{`import requests

PYMSTR_API_KEY = 'your_api_key_here'
BASE_URL = 'https://api.pymstr.com/v1'

def create_payment_link(data):
    headers = {
        'Authorization': f'Bearer {PYMSTR_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    response = requests.post(
        f'{BASE_URL}/payment-links',
        json=data,
        headers=headers
    )
    
    return response.json()

# Usage
payment_link = create_payment_link({
    'name': 'Product Purchase',
    'description': 'Premium widget',
    'price': '49.99',
    'currency': 'USD',
    'acceptedTokens': ['USDC', 'USDT'],
    'acceptedChains': ['polygon', 'arbitrum']
})

print('Payment URL:', payment_link['data']['url'])`}</pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(`import requests

PYMSTR_API_KEY = 'your_api_key_here'
BASE_URL = 'https://api.pymstr.com/v1'

def create_payment_link(data):
    headers = {
        'Authorization': f'Bearer {PYMSTR_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    response = requests.post(
        f'{BASE_URL}/payment-links',
        json=data,
        headers=headers
    )
    
    return response.json()

# Usage
payment_link = create_payment_link({
    'name': 'Product Purchase',
    'description': 'Premium widget',
    'price': '49.99',
    'currency': 'USD',
    'acceptedTokens': ['USDC', 'USDT'],
    'acceptedChains': ['polygon', 'arbitrum']
})

print('Payment URL:', payment_link['data']['url'])`, 'python-example')}
                >
                  {copiedCode === 'python-example' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="php" className="mt-4">
              <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
                <pre className="text-xs font-mono">{`<?php

$apiKey = 'your_api_key_here';
$baseUrl = 'https://api.pymstr.com/v1';

function createPaymentLink($data, $apiKey, $baseUrl) {
    $data = [
        'name' => 'Product Purchase',
        'description' => 'Premium widget',
        'price' => '49.99',
        'currency' => 'USD',
        'acceptedTokens' => ['USDC', 'USDT'],
        'acceptedChains' => ['polygon', 'arbitrum']
    ];
    
    $ch = curl_init($baseUrl . '/payment-links');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json'
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

// Usage
$paymentLink = createPaymentLink($data, $apiKey, $baseUrl);
echo 'Payment URL: ' . $paymentLink['data']['url'];

?>`}</pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(`<?php

$apiKey = 'your_api_key_here';
$baseUrl = 'https://api.pymstr.com/v1';

function createPaymentLink($data, $apiKey, $baseUrl) {
    $data = [
        'name' => 'Product Purchase',
        'description' => 'Premium widget',
        'price' => '49.99',
        'currency' => 'USD',
        'acceptedTokens' => ['USDC', 'USDT'],
        'acceptedChains' => ['polygon', 'arbitrum']
    ];
    
    $ch = curl_init($baseUrl . '/payment-links');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json'
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

// Usage
$paymentLink = createPaymentLink($data, $apiKey, $baseUrl);
echo 'Payment URL: ' . $paymentLink['data']['url'];

?>`, 'php-example')}
                >
                  {copiedCode === 'php-example' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="curl" className="mt-4">
              <div className="bg-black text-[#05df72] rounded-3xl p-4 relative overflow-x-auto">
                <pre className="text-xs font-mono">{`# Create a payment link
curl -X POST https://api.pymstr.com/v1/payment-links \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Product Purchase",
    "price": "49.99",
    "currency": "USD",
    "acceptedTokens": ["USDC", "USDT"],
    "acceptedChains": ["polygon", "arbitrum"]
  }'

# Get payment link details
curl -X GET https://api.pymstr.com/v1/payment-links/550e8400-e29b-41d4-a716-446655440000 \\
  -H "Authorization: Bearer YOUR_API_KEY"

# List all payment links
curl -X GET "https://api.pymstr.com/v1/payment-links?status=completed&limit=10" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(`# Create a payment link
curl -X POST https://api.pymstr.com/v1/payment-links \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Product Purchase",
    "price": "49.99",
    "currency": "USD",
    "acceptedTokens": ["USDC", "USDT"],
    "acceptedChains": ["polygon", "arbitrum"]
  }'

# Get payment link details
curl -X GET https://api.pymstr.com/v1/payment-links/550e8400-e29b-41d4-a716-446655440000 \\
  -H "Authorization: Bearer YOUR_API_KEY"

# List all payment links
curl -X GET "https://api.pymstr.com/v1/payment-links?status=completed&limit=10" \\
  -H "Authorization: Bearer YOUR_API_KEY"`, 'curl-example')}
                >
                  {copiedCode === 'curl-example' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Rate Limits */}
      <Card id="rate-limits">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
              <BarChart3 className="w-4 h-4" />
            </div>
            <span>Rate Limits</span>
          </CardTitle>
          <CardDescription>API request limits and throttling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
              <h5 className="font-semibold text-sm mb-2">Standard Plan</h5>
              <p className="text-muted-foreground">100 requests per minute</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
              <h5 className="font-semibold text-sm mb-2">Pro Plan</h5>
              <p className="text-muted-foreground">500 requests per minute</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
              <h5 className="font-semibold text-sm mb-2">Enterprise Plan</h5>
              <p className="text-muted-foreground">Custom rate limits</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Rate Limit Headers</h4>
            <div className="bg-black text-[#05df72] rounded-3xl p-4">
              <pre className="text-xs font-mono">{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1698012345`}</pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card id="support">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
              <CheckCircle className="w-4 h-4" />
            </div>
            <span>Support & Resources</span>
          </CardTitle>
          <CardDescription>Documentation and support channels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-[#07D7FF]/20 bg-[#07D7FF]/5 rounded-3xl p-4">
              <h5 className="font-semibold text-sm mb-2 flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Documentation</span>
              </h5>
              <p className="text-sm text-muted-foreground mb-3">Comprehensive guides and tutorials</p>
              <a href="#" className="text-sm text-[#07D7FF] hover:underline">Visit Docs →</a>
            </div>
            <div className="border-2 border-[#07D7FF]/20 bg-[#07D7FF]/5 rounded-3xl p-4">
              <h5 className="font-semibold text-sm mb-2 flex items-center space-x-2">
                <Code2 className="w-4 h-4" />
                <span>Support</span>
              </h5>
              <p className="text-sm text-muted-foreground mb-3">Get help from our team</p>
              <a href="#" className="text-sm text-[#07D7FF] hover:underline">Contact Support →</a>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default APIReference;
