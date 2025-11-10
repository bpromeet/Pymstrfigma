import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Copy, CheckCircle, Code2, Menu, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CodeExamplesProps {
  onBack?: () => void;
}

const CodeExamples: React.FC<CodeExamplesProps> = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('javascript');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const sections = [
    { id: 'javascript', label: 'JavaScript' },
    { id: 'python', label: 'Python' },
    { id: 'php', label: 'PHP' },
    { id: 'curl', label: 'cURL' },
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
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-sm transition-colors ${
                  activeSection === section.id
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Code2 className="w-4 h-4 shrink-0" />
                <span className="text-left">{section.label}</span>
              </button>
            ))}
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
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Code2 className="w-4 h-4 shrink-0" />
                    <span className="text-left">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        </>
      )}

      {/* Mobile Sticky Header with Back Button and Menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white dark:bg-[#0a0a0a] border-b border-[#43586C] shadow-sm">
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
            Code Examples
          </h1>
          <p className="text-muted-foreground mt-2">
            Integration examples in different programming languages
          </p>
        </div>

        {/* Header - Mobile */}
        <div className="lg:hidden">
          <h1 className="flex items-center gap-3">
            <Code2 className="w-6 h-6 text-[#07D7FF]" />
            Code Examples
          </h1>
          <p className="text-muted-foreground mt-2">
            Integration examples in different programming languages
          </p>
        </div>

        {/* Code Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#07D7FF] text-white">
                <Code2 className="w-4 h-4" />
              </div>
              <span>API Integration Examples</span>
            </CardTitle>
            <CardDescription>Choose your preferred language to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="javascript" className="w-full" onValueChange={setActiveSection}>
              <TabsList className="grid w-full grid-cols-4 rounded-full">
                <TabsTrigger value="javascript" className="rounded-full">JavaScript</TabsTrigger>
                <TabsTrigger value="python" className="rounded-full">Python</TabsTrigger>
                <TabsTrigger value="php" className="rounded-full">PHP</TabsTrigger>
                <TabsTrigger value="curl" className="rounded-full">cURL</TabsTrigger>
              </TabsList>

              <TabsContent value="javascript" id="javascript" className="mt-6 space-y-4">
                <div>
                  <h4 className="mb-3">JavaScript / Node.js Example</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    This example demonstrates how to create a payment link using JavaScript with the Fetch API.
                  </p>
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
  acceptedTokens: ['USDC', 'USDT', 'EURC'],
  acceptedChains: ['polygon', 'arbitrum']
});

console.log('Payment URL:', paymentLink.data.url);`}</pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white rounded-full"
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
  acceptedTokens: ['USDC', 'USDT', 'EURC'],
  acceptedChains: ['polygon', 'arbitrum']
});

console.log('Payment URL:', paymentLink.data.url);`, 'js-example')}
                    >
                      {copiedCode === 'js-example' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="python" id="python" className="mt-6 space-y-4">
                <div>
                  <h4 className="mb-3">Python Example</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    This example uses the requests library to interact with the PYMSTR API.
                  </p>
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
    'acceptedTokens': ['USDC', 'USDT', 'EURC'],
    'acceptedChains': ['polygon', 'arbitrum']
})

print('Payment URL:', payment_link['data']['url'])`}</pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white rounded-full"
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
    'acceptedTokens': ['USDC', 'USDT', 'EURC'],
    'acceptedChains': ['polygon', 'arbitrum']
})

print('Payment URL:', payment_link['data']['url'])`, 'python-example')}
                    >
                      {copiedCode === 'python-example' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="php" id="php" className="mt-6 space-y-4">
                <div>
                  <h4 className="mb-3">PHP Example</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    This example demonstrates payment link creation using PHP with cURL.
                  </p>
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
        'acceptedTokens' => ['USDC', 'USDT', 'EURC'],
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
                      className="absolute top-2 right-2 text-gray-400 hover:text-white rounded-full"
                      onClick={() => copyToClipboard(`<?php

$apiKey = 'your_api_key_here';
$baseUrl = 'https://api.pymstr.com/v1';

function createPaymentLink($data, $apiKey, $baseUrl) {
    $data = [
        'name' => 'Product Purchase',
        'description' => 'Premium widget',
        'price' => '49.99',
        'currency' => 'USD',
        'acceptedTokens' => ['USDC', 'USDT', 'EURC'],
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
                </div>
              </TabsContent>

              <TabsContent value="curl" id="curl" className="mt-6 space-y-4">
                <div>
                  <h4 className="mb-3">cURL Examples</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Command-line examples for testing the API using cURL.
                  </p>
                  <div className="bg-gray-900 text-gray-100 rounded-3xl p-4 relative overflow-x-auto">
                    <pre className="text-xs font-mono">{`# Create a payment link
curl -X POST https://api.pymstr.com/v1/payment-links \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Product Purchase",
    "description": "Premium widget",
    "price": "49.99",
    "currency": "USD",
    "acceptedTokens": ["USDC", "USDT", "EURC"],
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
                      className="absolute top-2 right-2 text-gray-400 hover:text-white rounded-full"
                      onClick={() => copyToClipboard(`# Create a payment link
curl -X POST https://api.pymstr.com/v1/payment-links \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Product Purchase",
    "description": "Premium widget",
    "price": "49.99",
    "currency": "USD",
    "acceptedTokens": ["USDC", "USDT", "EURC"],
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
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              After implementing these code examples, make sure to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-2">
              <li>Replace <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">YOUR_API_KEY</code> with your actual API key from the dashboard</li>
              <li>Test your integration in a development environment first</li>
              <li>Implement webhook handlers to receive payment notifications</li>
              <li>Handle errors appropriately in your application</li>
              <li>Review the security best practices in the API Reference</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeExamples;
