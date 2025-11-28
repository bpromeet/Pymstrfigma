import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { PrimaryTabs, PrimaryTabsList, PrimaryTabsTrigger, PrimaryTabsContent } from './ui/primary-tabs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ArrowLeft, Copy, CheckCircle, AlertCircle, Globe, Code2, Webhook, BarChart3, DollarSign, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { PymstrCodeBlock } from './PymstrCodeBlock';

interface APIReferenceProps {
  onBack?: () => void;
}

const APIReference: React.FC<APIReferenceProps> = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const copyToClipboard = (text: string, id: string) => {
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
      {/* STICKY HEADER WITH BACK BUTTON + TITLE + TABS */}
      <div className="sticky top-0 z-40 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button + Title Section */}
          <div className="pt-4 pb-3">
            {onBack && (
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 px-4 py-2 min-h-10 mb-4 bg-transparent border border-[#43586C] text-[#1C1B1F] dark:text-[#F6F7F9] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200 rounded-full"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Documents
              </button>
            )}
            <div className="flex items-center gap-3">
              <Code2 className="w-6 h-6 text-[#FF5914]" />
              <h1 className="text-gray-900 dark:text-white">API Reference</h1>
            </div>
            <p className="text-[#798A9B] mt-1">Complete API documentation for PYMSTR integration</p>
          </div>

          {/* Tabs Section */}
          <div className="py-3">
            <div className="flex w-full items-center overflow-x-auto scrollbar-hide gap-1">
            <button onClick={() => setActiveTab('overview')} className={`inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'overview' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}>Overview</button>
            <button onClick={() => setActiveTab('payment-types')} className={`inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'payment-types' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}>Payment Types</button>
            <button onClick={() => setActiveTab('authentication')} className={`inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'authentication' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}>Authentication</button>
            <button onClick={() => setActiveTab('endpoints')} className={`inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'endpoints' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}>API Endpoints</button>
            <button onClick={() => setActiveTab('pricing')} className={`inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'pricing' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}>Pricing & Fees</button>
            <button onClick={() => setActiveTab('webhooks')} className={`inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'webhooks' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}>Webhooks</button>
            <button onClick={() => setActiveTab('errors')} className={`inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'errors' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}>Error Codes</button>
            <button onClick={() => setActiveTab('examples')} className={`inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'examples' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}>Code Examples</button>
            <button onClick={() => setActiveTab('rate-limits')} className={`inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'rate-limits' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}>Rate Limits</button>
            <button onClick={() => setActiveTab('support')} className={`inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'support' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}>Support</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white dark:bg-[#0a0a0a]">
        <div className="space-y-4">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span>API Overview</span>
                </CardTitle>
                <CardDescription>PYMSTR REST API specifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 space-y-3">
                  <div className="flex items-start space-x-2">
                    <span className="font-semibold min-w-[140px] flex-shrink-0">Base URL:</span>
                    <code className="text-sm text-muted-foreground break-all">https://api.pymstr.com/v1</code>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="font-semibold min-w-[140px] flex-shrink-0">Protocol:</span>
                    <span className="text-muted-foreground">HTTPS/REST</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="font-semibold min-w-[140px] flex-shrink-0">Format:</span>
                    <span className="text-muted-foreground">JSON</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="font-semibold min-w-[140px] flex-shrink-0">Authentication:</span>
                    <span className="text-muted-foreground">Bearer Token (API Key)</span>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-3xl p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>ℹ️ Note:</strong> All API requests must be made over HTTPS. Requests made over plain HTTP will fail.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Types Tab */}
          {activeTab === 'payment-types' && (
            <Card className="border-2 border-[#07D7FF]/20">
              <CardHeader>
                <CardTitle>Payment Link Types</CardTitle>
                <CardDescription>Manual vs API-generated payment links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  PYMSTR supports two types of payment link creation. Both are single-use and follow the same completion rules.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Manual Payment Links */}
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-3xl p-4 space-y-3">
                    <h4 className="font-semibold">📝 Manual Payment Links</h4>
                    <p className="text-sm text-muted-foreground">
                      Created directly in admin UI for specific transactions.
                    </p>
                    <div className="bg-white dark:bg-blue-900/30 rounded-2xl p-2 text-xs">
                      <code>source: <span className="text-blue-600">"manual"</span></code>
                    </div>
                  </div>

                  {/* API-Generated Payment Links */}
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-3xl p-4 space-y-3">
                    <h4 className="font-semibold">🔗 API-Generated Payment Links</h4>
                    <p className="text-sm text-muted-foreground">
                      Created programmatically via API for automated flows.
                    </p>
                    <div className="bg-white dark:bg-green-900/30 rounded-2xl p-2 text-xs">
                      <code>source: <span className="text-green-600">"api"</span></code>
                    </div>
                  </div>
                </div>

                <div className="bg-[#07D7FF]/10 border border-[#07D7FF]/20 rounded-3xl p-4">
                  <h5 className="font-semibold mb-2">🔐 Single-Use Architecture</h5>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                    <li>✓ Once completed, links cannot be reused</li>
                    <li>✓ Each payment stores only txHash (no transaction IDs)</li>
                    <li>✓ API-generated links follow same single-use rules as manual links</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Authentication Tab */}
          {activeTab === 'authentication' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <span>Authentication</span>
                </CardTitle>
                <CardDescription>API key authentication and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The PYMSTR API uses API keys to authenticate requests. Include your API key in the Authorization header.
                </p>

                <div>
                  <h4 className="font-semibold mb-2">Request Header:</h4>
                  <PymstrCodeBlock
                    code={`Authorization: Bearer YOUR_API_KEY\nContent-Type: application/json`}
                    language="http"
                    copyable
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Example Request:</h4>
                  <PymstrCodeBlock
                    code={`curl -X GET https://api.pymstr.com/v1/payment-links \\\\\n  -H "Authorization: Bearer sk_live_51H..." \\\\\n  -H "Content-Type: application/json"`}
                    language="bash"
                    copyable
                  />
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-3xl p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>⚠️ Security:</strong> Keep your API keys secure! Never share them publicly or commit them to version control.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* API Endpoints Tab */}
          {activeTab === 'endpoints' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <span>API Endpoints</span>
                </CardTitle>
                <CardDescription>Core endpoints for payment link management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tabs for Payment Links and Analytics */}
                <Tabs defaultValue="payment-links">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="payment-links">Payment Links</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>

                  <TabsContent value="payment-links" className="space-y-6 mt-4">
                    {/* Create Payment Link */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-600 hover:bg-green-700">POST</Badge>
                        <code className="text-sm">/payment-links</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Create a new single-use payment link. Links created via API are tagged with <code>source: "api"</code>.
                      </p>

                      <div>
                        <h5 className="font-semibold text-sm mb-2">Request Body:</h5>
                        <PymstrCodeBlock
                          code={`{\n  "name": "Premium Subscription",\n  "price": "99.99",\n  "currency": "USD",\n  "acceptedTokens": ["USDC", "USDT", "EURC"],\n  "acceptedChains": ["polygon", "ethereum", "arbitrum", "optimism", "base"]\n}`}
                          language="json"
                          copyable
                        />
                      </div>

                      <div>
                        <h5 className="font-semibold text-sm mb-2">Response (201 Created):</h5>
                        <PymstrCodeBlock
                          code={`{\n  "success": true,\n  "data": {\n    "id": "550e8400-e29b-41d4-a716-446655440000",\n    "name": "Premium Subscription",\n    "price": "99.99",\n    "currency": "USD",\n    "acceptedTokens": ["USDC", "USDT", "EURC"],\n    "acceptedChains": ["polygon", "ethereum", "arbitrum", "optimism", "base"],\n    "status": "pending",\n    "source": "api",\n    "url": "https://checkout.pymstr.com/550e8400-e29b-41d4-a716-446655440000",\n    "createdAt": "2025-10-22T10:30:00Z"\n  }\n}`}
                          language="json"
                          copyable
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Get Payment Link */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-600 hover:bg-blue-700">GET</Badge>
                        <code className="text-sm">/payment-links/:id</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Retrieve details of a specific payment link, including completion status and txHash if completed.
                      </p>

                      <div>
                        <h5 className="font-semibold text-sm mb-2">Response (200 OK):</h5>
                        <PymstrCodeBlock
                          code={`{\n  "success": true,\n  "data": {\n    "id": "550e8400-e29b-41d4-a716-446655440000",\n    "name": "Premium Subscription",\n    "price": "99.99",\n    "currency": "USD",\n    "acceptedTokens": ["USDC", "USDT", "EURC"],\n    "acceptedChains": ["polygon", "ethereum"],\n    "status": "completed",\n    "source": "api",\n    "token": "USDC",\n    "chain": "polygon",\n    "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",\n    "createdAt": "2025-10-22T10:30:00Z",\n    "completedAt": "2025-10-22T10:35:00Z"\n  }\n}`}
                          language="json"
                          copyable
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* List Payment Links */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-600 hover:bg-blue-700">GET</Badge>
                        <code className="text-sm">/payment-links</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        List all payment links with optional filters (status, source type).
                      </p>

                      <div>
                        <h5 className="font-semibold text-sm mb-2">Query Parameters:</h5>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 space-y-2 text-sm">
                          <div><code>status</code> - Filter by status: <code>pending</code>, <code>completed</code>, <code>expired</code></div>
                          <div><code>source</code> - Filter by source: <code>manual</code>, <code>api</code></div>
                          <div><code>limit</code> - Number of results per page (default: 20, max: 100)</div>
                          <div><code>offset</code> - Pagination offset (default: 0)</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="analytics" className="space-y-6 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-600 hover:bg-blue-700">GET</Badge>
                        <code className="text-sm">/analytics/summary</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Get payment analytics summary including total volume, transaction counts, and trends.
                      </p>

                      <div>
                        <h5 className="font-semibold text-sm mb-2">Response (200 OK):</h5>
                        <PymstrCodeBlock
                          code={`{\n  "success": true,\n  "data": {\n    "totalVolume": "125,847.50",\n    "totalTransactions": 342,\n    "completedTransactions": 328,\n    "pendingTransactions": 14,\n    "averageTransactionValue": "368.12",\n    "topChain": "polygon",\n    "topToken": "USDC"\n  }\n}`}
                          language="json"
                          copyable
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Pricing & Fees Tab */}
          {activeTab === 'pricing' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <span>Pricing & Fees</span>
                </CardTitle>
                <CardDescription>Transaction fees and pricing structure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-3xl p-4 text-center">
                    <p className="text-3xl font-bold text-blue-600">0.5%</p>
                    <p className="text-sm text-muted-foreground mt-1">Per Transaction Fee</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-3xl p-4 text-center">
                    <p className="text-3xl font-bold text-green-600">$0</p>
                    <p className="text-sm text-muted-foreground mt-1">Setup Fee</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-3xl p-4 text-center">
                    <p className="text-3xl font-bold text-purple-600">$0</p>
                    <p className="text-sm text-muted-foreground mt-1">Monthly Fee</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Webhooks Tab */}
          {activeTab === 'webhooks' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
                    <Webhook className="w-4 h-4" />
                  </div>
                  <span>Webhooks</span>
                </CardTitle>
                <CardDescription>Real-time event notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Webhooks allow your application to receive real-time notifications when payment events occur.
                </p>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
                  <h5 className="font-semibold mb-2">Available Events:</h5>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <code className="text-sm">payment.completed</code>
                      <span className="text-sm text-muted-foreground">- Payment confirmed on-chain</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <code className="text-sm">payment.failed</code>
                      <span className="text-sm text-muted-foreground">- Payment failed or rejected</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <code className="text-sm">payment.pending</code>
                      <span className="text-sm text-muted-foreground">- Payment initiated</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">Webhook Payload Example:</h5>
                  <PymstrCodeBlock
                    code={`{\n  "event": "payment.completed",\n  "timestamp": "2025-10-22T10:35:00Z",\n  "data": {\n    "paymentLinkId": "550e8400-e29b-41d4-a716-446655440000",\n    "price": "99.99",\n    "currency": "USD",\n    "token": "USDC",\n    "chain": "polygon",\n    "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",\n    "status": "completed",\n    "completedAt": "2025-10-22T10:35:00Z"\n  }\n}`}
                    language="json"
                    copyable
                  />
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-3xl p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>🔐 Security:</strong> Always verify webhook signatures using the <code>x-pymstr-signature</code> header.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Codes Tab */}
          {activeTab === 'errors' && (
            <Card>
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
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                    <Badge className="bg-green-600 hover:bg-green-700 flex-shrink-0">200</Badge>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">OK</p>
                      <p className="text-sm text-muted-foreground">Request succeeded</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                    <Badge className="bg-green-600 hover:bg-green-700 flex-shrink-0">201</Badge>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">Created</p>
                      <p className="text-sm text-muted-foreground">Resource created successfully</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                    <Badge className="bg-yellow-600 hover:bg-yellow-700 flex-shrink-0">400</Badge>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">Bad Request</p>
                      <p className="text-sm text-muted-foreground">Invalid request parameters</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                    <Badge className="bg-red-600 hover:bg-red-700 flex-shrink-0">401</Badge>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">Unauthorized</p>
                      <p className="text-sm text-muted-foreground">Invalid or missing API key</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                    <Badge className="bg-red-600 hover:bg-red-700 flex-shrink-0">404</Badge>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">Not Found</p>
                      <p className="text-sm text-muted-foreground">Resource does not exist</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                    <Badge className="bg-red-600 hover:bg-red-700 flex-shrink-0">429</Badge>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">Too Many Requests</p>
                      <p className="text-sm text-muted-foreground">Rate limit exceeded</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                    <Badge className="bg-red-600 hover:bg-red-700 flex-shrink-0">500</Badge>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">Internal Server Error</p>
                      <p className="text-sm text-muted-foreground">Server error - contact support</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">Error Response Format:</h5>
                  <PymstrCodeBlock
                    code={`{\n  "success": false,\n  "error": {\n    "code": "INVALID_API_KEY",\n    "message": "The provided API key is invalid or has been revoked",\n    "statusCode": 401\n  }\n}`}
                    language="json"
                    copyable
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Code Examples Tab */}
          {activeTab === 'examples' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <span>Code Examples</span>
                </CardTitle>
                <CardDescription>Integration examples in multiple languages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="javascript">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="php">PHP</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>

                  <TabsContent value="javascript" className="space-y-3 mt-4">
                    <h5 className="font-semibold">Node.js Example:</h5>
                    <PymstrCodeBlock
                      code={`const axios = require('axios');\n\nconst createPaymentLink = async () => {\n  try {\n    const response = await axios.post(\n      'https://api.pymstr.com/v1/payment-links',\n      {\n        name: 'Premium Subscription',\n        price: '99.99',\n        currency: 'USD',\n        acceptedTokens: ['USDC', 'USDT', 'EURC'],\n        acceptedChains: ['polygon', 'ethereum']\n      },\n      {\n        headers: {\n          'Authorization': \`Bearer \${process.env.PYMSTR_API_KEY}\`,\n          'Content-Type': 'application/json'\n        }\n      }\n    );\n    \n    console.log('Payment link created:', response.data.data.url);\n    return response.data;\n  } catch (error) {\n    console.error('Error:', error.response?.data);\n  }\n};\n\ncreatePaymentLink();`}
                      language="javascript"
                      copyable
                    />
                  </TabsContent>

                  <TabsContent value="python" className="space-y-3 mt-4">
                    <h5 className="font-semibold">Python Example:</h5>
                    <PymstrCodeBlock
                      code={`import requests\nimport os\n\ndef create_payment_link():\n    url = 'https://api.pymstr.com/v1/payment-links'\n    headers = {\n        'Authorization': f'Bearer {os.getenv(\"PYMSTR_API_KEY\")}',\n        'Content-Type': 'application/json'\n    }\n    payload = {\n        'name': 'Premium Subscription',\n        'price': '99.99',\n        'currency': 'USD',\n        'acceptedTokens': ['USDC', 'USDT', 'EURC'],\n        'acceptedChains': ['polygon', 'ethereum']\n    }\n    \n    response = requests.post(url, json=payload, headers=headers)\n    \n    if response.status_code == 201:\n        data = response.json()\n        print(f'Payment link created: {data[\"data\"][\"url\"]}')\n        return data\n    else:\n        print(f'Error: {response.json()}')\n\ncreate_payment_link()`}
                      language="python"
                      copyable
                    />
                  </TabsContent>

                  <TabsContent value="php" className="space-y-3 mt-4">
                    <h5 className="font-semibold">PHP Example:</h5>
                    <PymstrCodeBlock
                      code={`<?php\n\n$apiKey = getenv('PYMSTR_API_KEY');\n$url = 'https://api.pymstr.com/v1/payment-links';\n\n$data = [\n    'name' => 'Premium Subscription',\n    'price' => '99.99',\n    'currency' => 'USD',\n    'acceptedTokens' => ['USDC', 'USDT', 'EURC'],\n    'acceptedChains' => ['polygon', 'ethereum']\n];\n\n$options = [\n    'http' => [\n        'header'  => [\n            \"Content-Type: application/json\",\n            \"Authorization: Bearer $apiKey\"\n        ],\n        'method'  => 'POST',\n        'content' => json_encode($data)\n    ]\n];\n\n$context  = stream_context_create($options);\n$result = file_get_contents($url, false, $context);\n\nif ($result !== false) {\n    $response = json_decode($result, true);\n    echo \"Payment link created: \" . $response['data']['url'];\n} else {\n    echo \"Error creating payment link\";\n}\n\n?>`}
                      language="php"
                      copyable
                    />
                  </TabsContent>

                  <TabsContent value="curl" className="space-y-3 mt-4">
                    <h5 className="font-semibold">cURL Example:</h5>
                    <PymstrCodeBlock
                      code={`curl -X POST https://api.pymstr.com/v1/payment-links \\\\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\\\n  -H "Content-Type: application/json" \\\\\n  -d '{\n    "name": "Premium Subscription",\n    "price": "99.99",\n    "currency": "USD",\n    "acceptedTokens": ["USDC", "USDT", "EURC"],\n    "acceptedChains": ["polygon", "ethereum"]\n  }'`}
                      language="bash"
                      copyable
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Rate Limits Tab */}
          {activeTab === 'rate-limits' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <span>Rate Limits</span>
                </CardTitle>
                <CardDescription>API request limits and quotas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-3xl p-4">
                    <p className="text-2xl font-bold text-blue-600">100</p>
                    <p className="text-sm text-muted-foreground mt-1">Requests per minute</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-3xl p-4">
                    <p className="text-2xl font-bold text-green-600">10,000</p>
                    <p className="text-sm text-muted-foreground mt-1">Requests per day</p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
                  <h5 className="font-semibold mb-2">Rate Limit Headers:</h5>
                  <div className="space-y-1 text-sm font-mono">
                    <div className="break-words"><code>X-RateLimit-Limit:</code> Total requests allowed</div>
                    <div className="break-words"><code>X-RateLimit-Remaining:</code> Requests remaining</div>
                    <div className="break-words"><code>X-RateLimit-Reset:</code> Unix timestamp for reset</div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-3xl p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>⚠️ Note:</strong> If you exceed the rate limit, you'll receive a 429 Too Many Requests error. Implement exponential backoff in your retry logic.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span>Support</span>
                </CardTitle>
                <CardDescription>Get help with API integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
                    <h5 className="font-semibold mb-2">📧 Email Support</h5>
                    <p className="text-sm text-muted-foreground mb-2">
                      For technical issues and integration help:
                    </p>
                    <a href="mailto:support@pymstr.com" className="text-[#07D7FF] hover:underline text-sm break-all">
                      support@pymstr.com
                    </a>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
                    <h5 className="font-semibold mb-2">💬 Live Chat</h5>
                    <p className="text-sm text-muted-foreground mb-2">
                      Available Monday-Friday, 9am-5pm EST
                    </p>
                    <Button className="rounded-full">Start Chat</Button>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-3xl p-4">
                  <h5 className="font-semibold mb-2">📚 Additional Resources</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>Quick Start Guide - Get started in 5 minutes</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>Code Examples - Copy-paste integration snippets</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>Help Center - FAQ and troubleshooting</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default APIReference;