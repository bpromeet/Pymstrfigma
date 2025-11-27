import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ArrowLeft, Code2, FileText } from 'lucide-react';
import { PymstrCodeBlock } from './PymstrCodeBlock';

interface CodeExamplesProps {
  onBack?: () => void;
}

const CodeExamples: React.FC<CodeExamplesProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('javascript');

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
              <FileText className="w-6 h-6 text-[#FF5914]" />
              <h1 className="text-gray-900 dark:text-white">Code Examples</h1>
            </div>
            <p className="text-[#798A9B] mt-1">Ready-to-use integration code in multiple languages</p>
          </div>

          {/* Tabs Section */}
          <div className="py-3">
            <div className="flex w-full items-center overflow-x-auto scrollbar-hide gap-1">
            <button onClick={() => setActiveTab('javascript')} className={`inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'javascript' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}>JavaScript / Node.js</button>
            <button onClick={() => setActiveTab('python')} className={`inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'python' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}>Python</button>
            <button onClick={() => setActiveTab('php')} className={`inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'php' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}>PHP</button>
            <button onClick={() => setActiveTab('curl')} className={`inline-flex items-center justify-center whitespace-nowrap px-4 py-3 min-h-12 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:transition-all after:duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${activeTab === 'curl' ? 'text-[#1E88E5] after:bg-[#1E88E5]' : 'text-[#798A9B] after:bg-transparent'}`}>cURL</button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white dark:bg-[#0a0a0a]">
        <div className="space-y-4">
          {/* JavaScript Tab */}
          {activeTab === 'javascript' && (
            <Card>
              <CardHeader>
                <CardTitle>JavaScript / Node.js Examples</CardTitle>
                <CardDescription>Integration using Axios or Fetch API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Create Payment Link */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Create Payment Link</h4>
                  <PymstrCodeBlock
                    code={`const axios = require('axios');

const createPaymentLink = async () => {
  try {
    const response = await axios.post(
      'https://api.pymstr.com/v1/payment-links',
      {
        name: 'Premium Subscription',
        price: '99.99',
        currency: 'USD',
        acceptedTokens: ['USDC', 'USDT', 'EURC'],
        acceptedChains: ['polygon', 'ethereum']
      },
      {
        headers: {
          'Authorization': \`Bearer \${process.env.PYMSTR_API_KEY}\`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Payment link created:', response.data.data.url);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data);
  }
};

createPaymentLink();`}
                    language="javascript"
                    copyable
                  />
                </div>

                {/* Get Payment Link */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Get Payment Link Status</h4>
                  <PymstrCodeBlock
                    code={`const getPaymentLink = async (linkId) => {
  try {
    const response = await axios.get(
      \`https://api.pymstr.com/v1/payment-links/\${linkId}\`,
      {
        headers: {
          'Authorization': \`Bearer \${process.env.PYMSTR_API_KEY}\`
        }
      }
    );
    
    const payment = response.data.data;
    console.log('Status:', payment.status);
    console.log('TxHash:', payment.txHash);
    
    return payment;
  } catch (error) {
    console.error('Error:', error.response?.data);
  }
};

getPaymentLink('550e8400-e29b-41d4-a716-446655440000');`}
                    language="javascript"
                    copyable
                  />
                </div>

                {/* Webhook Handler */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Webhook Event Handler (Express.js)</h4>
                  <PymstrCodeBlock
                    code={`const express = require('express');
const app = express();

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
  
  // Always respond with 200
  res.status(200).send('Webhook received');
});

app.listen(3000);`}
                    language="javascript"
                    copyable
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Python Tab */}
          {activeTab === 'python' && (
            <Card>
              <CardHeader>
                <CardTitle>Python Examples</CardTitle>
                <CardDescription>Integration using requests library</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Create Payment Link */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Create Payment Link</h4>
                  <PymstrCodeBlock
                    code={`import requests
import os

def create_payment_link():
    url = 'https://api.pymstr.com/v1/payment-links'
    headers = {
        'Authorization': f'Bearer {os.getenv("PYMSTR_API_KEY")}',
        'Content-Type': 'application/json'
    }
    payload = {
        'name': 'Premium Subscription',
        'price': '99.99',
        'currency': 'USD',
        'acceptedTokens': ['USDC', 'USDT', 'EURC'],
        'acceptedChains': ['polygon', 'ethereum']
    }
    
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 201:
        data = response.json()
        print(f'Payment link created: {data["data"]["url"]}')
        return data
    else:
        print(f'Error: {response.json()}')

create_payment_link()`}
                    language="python"
                    copyable
                  />
                </div>

                {/* Get Payment Link */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Get Payment Link Status</h4>
                  <PymstrCodeBlock
                    code={`def get_payment_link(link_id):
    url = f'https://api.pymstr.com/v1/payment-links/{link_id}'
    headers = {
        'Authorization': f'Bearer {os.getenv("PYMSTR_API_KEY")}'
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        payment = response.json()['data']
        print(f'Status: {payment["status"]}')
        print(f'TxHash: {payment["txHash"]}')
        return payment
    else:
        print(f'Error: {response.json()}')

get_payment_link('550e8400-e29b-41d4-a716-446655440000')`}
                    language="python"
                    copyable
                  />
                </div>

                {/* Webhook Handler */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Webhook Event Handler (Flask)</h4>
                  <PymstrCodeBlock
                    code={`from flask import Flask, request, jsonify
import hmac
import hashlib

app = Flask(__name__)

@app.route('/api/pymstr-webhook', methods=['POST'])
def webhook():
    event = request.json
    signature = request.headers.get('x-pymstr-signature')
    
    # Verify webhook signature (recommended)
    if not verify_signature(signature, event):
        return 'Invalid signature', 401
    
    # Handle the event
    if event['type'] == 'payment.completed':
        print(f'Payment completed: {event["data"]}')
        fulfill_order(event['data']['payment_id'])
    elif event['type'] == 'payment.failed':
        print(f'Payment failed: {event["data"]}')
    elif event['type'] == 'payment.pending':
        print(f'Payment pending: {event["data"]}')
    
    # Always respond with 200
    return 'Webhook received', 200

if __name__ == '__main__':
    app.run(port=3000)`}
                    language="python"
                    copyable
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* PHP Tab */}
          {activeTab === 'php' && (
            <Card>
              <CardHeader>
                <CardTitle>PHP Examples</CardTitle>
                <CardDescription>Integration using cURL or file_get_contents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Create Payment Link */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Create Payment Link</h4>
                  <PymstrCodeBlock
                    code={`<?php

$apiKey = getenv('PYMSTR_API_KEY');
$url = 'https://api.pymstr.com/v1/payment-links';

$data = [
    'name' => 'Premium Subscription',
    'price' => '99.99',
    'currency' => 'USD',
    'acceptedTokens' => ['USDC', 'USDT', 'EURC'],
    'acceptedChains' => ['polygon', 'ethereum']
];

$options = [
    'http' => [
        'header'  => [
            "Content-Type: application/json",
            "Authorization: Bearer $apiKey"
        ],
        'method'  => 'POST',
        'content' => json_encode($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result !== false) {
    $response = json_decode($result, true);
    echo "Payment link created: " . $response['data']['url'];
} else {
    echo "Error creating payment link";
}

?>`}
                    language="php"
                    copyable
                  />
                </div>

                {/* Get Payment Link */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Get Payment Link Status</h4>
                  <PymstrCodeBlock
                    code={`<?php

$apiKey = getenv('PYMSTR_API_KEY');
$linkId = '550e8400-e29b-41d4-a716-446655440000';
$url = "https://api.pymstr.com/v1/payment-links/$linkId";

$options = [
    'http' => [
        'header' => "Authorization: Bearer $apiKey",
        'method' => 'GET'
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result !== false) {
    $payment = json_decode($result, true)['data'];
    echo "Status: " . $payment['status'] . "\n";
    echo "TxHash: " . $payment['txHash'] . "\n";
} else {
    echo "Error retrieving payment link";
}

?>`}
                    language="php"
                    copyable
                  />
                </div>

                {/* Webhook Handler */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Webhook Event Handler</h4>
                  <PymstrCodeBlock
                    code={`<?php

// webhook.php
$rawBody = file_get_contents('php://input');
$event = json_decode($rawBody, true);
$signature = $_SERVER['HTTP_X_PYMSTR_SIGNATURE'] ?? '';

// Verify webhook signature (recommended)
if (!verifySignature($signature, $rawBody)) {
    http_response_code(401);
    echo 'Invalid signature';
    exit;
}

// Handle the event
switch ($event['type']) {
    case 'payment.completed':
        error_log('Payment completed: ' . json_encode($event['data']));
        fulfillOrder($event['data']['payment_id']);
        break;
        
    case 'payment.failed':
        error_log('Payment failed: ' . json_encode($event['data']));
        break;
        
    case 'payment.pending':
        error_log('Payment pending: ' . json_encode($event['data']));
        break;
}

// Always respond with 200
http_response_code(200);
echo 'Webhook received';

?>`}
                    language="php"
                    copyable
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* cURL Tab */}
          {activeTab === 'curl' && (
            <Card>
              <CardHeader>
                <CardTitle>cURL Examples</CardTitle>
                <CardDescription>Command-line API testing and integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Create Payment Link */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Create Payment Link</h4>
                  <PymstrCodeBlock
                    code={`curl -X POST https://api.pymstr.com/v1/payment-links \\\\\\\\\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\\\\\\\\n  -H "Content-Type: application/json" \\\\\\\\\\n  -d '{\\n    \"name\": \"Premium Subscription\",\\n    \"price\": \"99.99\",\\n    \"currency\": \"USD\",\\n    \"acceptedTokens\": [\"USDC\", \"USDT\", \"EURC\"],\\n    \"acceptedChains\": [\"polygon\", \"ethereum\"]\\n  }'`}
                    language="bash"
                    copyable
                  />
                </div>

                {/* Get Payment Link */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Get Payment Link Status</h4>
                  <PymstrCodeBlock
                    code={`curl -X GET https://api.pymstr.com/v1/payment-links/550e8400-e29b-41d4-a716-446655440000 \\\\\\\\\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\\\\\\\\n  -H "Content-Type: application/json"`}
                    language="bash"
                    copyable
                  />
                </div>

                {/* List Payment Links */}
                <div className="space-y-3">
                  <h4 className="font-semibold">List Payment Links (with filters)</h4>
                  <PymstrCodeBlock
                    code={`# List all payment links
curl -X GET "https://api.pymstr.com/v1/payment-links" \\\\\\\\\\n  -H "Authorization: Bearer YOUR_API_KEY"

# Filter by status
curl -X GET "https://api.pymstr.com/v1/payment-links?status=completed" \\\\\\\\\\n  -H "Authorization: Bearer YOUR_API_KEY"

# Filter by source (API-generated only)
curl -X GET "https://api.pymstr.com/v1/payment-links?source=api" \\\\\\\\\\n  -H "Authorization: Bearer YOUR_API_KEY"

# Pagination
curl -X GET "https://api.pymstr.com/v1/payment-links?limit=20&offset=40" \\\\\\\\\\n  -H "Authorization: Bearer YOUR_API_KEY"`}
                    language="bash"
                    copyable
                  />
                </div>

                {/* Get Analytics */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Get Analytics Summary</h4>
                  <PymstrCodeBlock
                    code={`curl -X GET https://api.pymstr.com/v1/analytics/summary \\\\\\\\\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\\\\\\\\n  -H "Content-Type: application/json"`}
                    language="bash"
                    copyable
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeExamples;