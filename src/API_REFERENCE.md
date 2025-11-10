# PYMSTR API Reference

## Overview

The PYMSTR API allows you to accept stablecoin payments on your platform. This reference provides detailed information about endpoints, request/response formats, authentication, and webhook integration.

**Base URL:** `https://api.pymstr.com/v1`

**API Version:** v1

---

## Authentication

All API requests require authentication using an API key. Include your API key in the request header:

```
Authorization: Bearer YOUR_API_KEY
```

### Getting Your API Key

1. Log in to your PYMSTR dashboard
2. Navigate to **Settings** → **API Keys**
3. Click **Generate New Key**
4. Store your key securely (it will only be shown once)

---

## Supported Networks & Tokens

### Networks
- **Ethereum** (Chain ID: 1)
- **Polygon** (Chain ID: 137)
- **Arbitrum** (Chain ID: 42161)
- **Optimism** (Chain ID: 10)

### Stablecoins
- **USDC** - USD Coin
- **USDT** - Tether USD
- **DAI** - Dai Stablecoin

---

## Core Endpoints

### 1. Create Payment Link

Create a new payment link for accepting crypto payments.

**Endpoint:** `POST /payment-links`

**Request Body:**
```json
{
  "name": "Premium Subscription",
  "description": "Monthly premium plan subscription",
  "price": "29.99",
  "currency": "USD",
  "acceptedTokens": ["USDC", "USDT", "DAI"],
  "acceptedChains": ["ethereum", "polygon", "arbitrum", "optimism", "base"],
  "expiresAt": "2025-12-31T23:59:59Z",
  "redirectUrl": "https://yoursite.com/success",
  "metadata": {
    "customerId": "cust_12345",
    "planId": "premium_monthly"
  }
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "pl_a1b2c3d4e5f6",
    "linkId": "#PL001",
    "name": "Premium Subscription",
    "description": "Monthly premium plan subscription",
    "price": "29.99",
    "currency": "USD",
    "acceptedTokens": ["USDC", "USDT", "DAI"],
    "acceptedChains": ["ethereum", "polygon", "arbitrum", "optimism"],
    "status": "active",
    "url": "https://checkout.pymstr.com/pl_a1b2c3d4e5f6",
    "createdAt": "2025-10-22T10:30:00Z",
    "expiresAt": "2025-12-31T23:59:59Z",
    "redirectUrl": "https://yoursite.com/success",
    "metadata": {
      "customerId": "cust_12345",
      "planId": "premium_monthly"
    }
  }
}
```

---

### 2. Get Payment Link

Retrieve details of a specific payment link.

**Endpoint:** `GET /payment-links/{linkId}`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "pl_a1b2c3d4e5f6",
    "linkId": "#PL001",
    "name": "Premium Subscription",
    "description": "Monthly premium plan subscription",
    "price": "29.99",
    "currency": "USD",
    "acceptedTokens": ["USDC", "USDT", "DAI"],
    "acceptedChains": ["ethereum", "polygon", "arbitrum", "optimism"],
    "status": "active",
    "url": "https://checkout.pymstr.com/pl_a1b2c3d4e5f6",
    "totalPayments": 145,
    "totalVolume": "4348.55",
    "createdAt": "2025-10-22T10:30:00Z",
    "expiresAt": "2025-12-31T23:59:59Z",
    "redirectUrl": "https://yoursite.com/success",
    "metadata": {
      "customerId": "cust_12345",
      "planId": "premium_monthly"
    }
  }
}
```

---

### 3. List Payment Links

Retrieve all payment links with optional filtering.

**Endpoint:** `GET /payment-links`

**Query Parameters:**
- `status` (optional): Filter by status (`active`, `expired`, `paused`)
- `limit` (optional): Number of results per page (default: 20, max: 100)
- `offset` (optional): Pagination offset (default: 0)
- `sortBy` (optional): Sort field (`createdAt`, `totalVolume`, `totalPayments`)
- `sortOrder` (optional): `asc` or `desc` (default: `desc`)

**Example:** `GET /payment-links?status=active&limit=10&sortBy=totalVolume&sortOrder=desc`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "links": [
      {
        "id": "pl_a1b2c3d4e5f6",
        "linkId": "#PL001",
        "name": "Premium Subscription",
        "price": "29.99",
        "currency": "USD",
        "status": "active",
        "totalPayments": 145,
        "totalVolume": "4348.55",
        "createdAt": "2025-10-22T10:30:00Z"
      }
    ],
    "pagination": {
      "total": 45,
      "limit": 10,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

---

### 4. Delete Payment Link

Delete a payment link (soft delete - preserves transaction history).

**Endpoint:** `DELETE /payment-links/{linkId}`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Payment link deleted successfully"
}
```

---

### 5. Create Payment Session

Create a one-time checkout session for direct payment.

**Endpoint:** `POST /sessions`

**Request Body:**
```json
{
  "price": "99.99",
  "currency": "USD",
  "acceptedTokens": ["USDC", "USDT"],
  "acceptedChains": ["ethereum", "polygon"],
  "successUrl": "https://yoursite.com/success",
  "cancelUrl": "https://yoursite.com/cancel",
  "metadata": {
    "orderId": "order_789",
    "items": ["item1", "item2"]
  }
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "sessionId": "sess_x1y2z3a4b5c6",
    "url": "https://checkout.pymstr.com/sess_x1y2z3a4b5c6",
    "expiresAt": "2025-10-22T11:30:00Z"
  }
}
```

---

### 6. Get Transaction

Retrieve details of a specific transaction.

**Endpoint:** `GET /transactions/{transactionId}`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "txn_abc123def456",
    "status": "completed",
    "price": "29.99",
    "currency": "USD",
    "token": "USDC",
    "tokenAmount": "29.99",
    "chain": "polygon",
    "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "fromAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "toAddress": "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    "paymentLinkId": "pl_a1b2c3d4e5f6",
    "metadata": {
      "customerId": "cust_12345",
      "planId": "premium_monthly"
    },
    "createdAt": "2025-10-22T10:35:22Z",
    "completedAt": "2025-10-22T10:36:15Z"
  }
}
```

---

### 7. List Transactions

Retrieve all transactions with optional filtering.

**Endpoint:** `GET /transactions`

**Query Parameters:**
- `status` (optional): Filter by status (`pending`, `completed`, `failed`)
- `paymentLinkId` (optional): Filter by payment link
- `chain` (optional): Filter by blockchain (`ethereum`, `polygon`, `arbitrum`, `optimism`)
- `token` (optional): Filter by token (`USDC`, `USDT`, `DAI`)
- `startDate` (optional): Start date (ISO 8601)
- `endDate` (optional): End date (ISO 8601)
- `limit` (optional): Results per page (default: 20, max: 100)
- `offset` (optional): Pagination offset

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "txn_abc123def456",
        "status": "completed",
        "price": "29.99",
        "currency": "USD",
        "token": "USDC",
        "chain": "polygon",
        "txHash": "0x1234567890abcdef...",
        "createdAt": "2025-10-22T10:35:22Z"
      }
    ],
    "pagination": {
      "total": 1523,
      "limit": 20,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

---

### 8. Get Analytics

Retrieve payment analytics and statistics.

**Endpoint:** `GET /analytics`

**Query Parameters:**
- `period` (required): Time period (`24h`, `7d`, `30d`, `90d`, `1y`, `all`)
- `groupBy` (optional): Group data by (`day`, `week`, `month`)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "totalVolume": "125847.32",
    "totalTransactions": 4521,
    "averageTransactionValue": "27.83",
    "period": "30d",
    "volumeByChain": {
      "ethereum": "45234.12",
      "polygon": "52341.23",
      "arbitrum": "18765.45",
      "optimism": "9506.52"
    },
    "volumeByToken": {
      "USDC": "78234.56",
      "USDT": "32145.67",
      "DAI": "15467.09"
    },
    "transactionsByStatus": {
      "completed": 4478,
      "pending": 23,
      "failed": 20
    },
    "chartData": [
      {
        "date": "2025-10-01",
        "volume": "3245.67",
        "transactions": 123
      },
      {
        "date": "2025-10-02",
        "volume": "4123.89",
        "transactions": 156
      }
    ]
  }
}
```

---

## Webhooks

Webhooks allow you to receive real-time notifications when events occur in your PYMSTR account.

### Setting Up Webhooks

1. Navigate to **Settings** → **Webhooks** in your dashboard
2. Click **Add Webhook Endpoint**
3. Enter your endpoint URL
4. Select events to subscribe to
5. Save and copy your webhook secret

### Webhook Events

- `payment.completed` - Payment successfully completed
- `payment.pending` - Payment initiated, waiting for confirmation
- `payment.failed` - Payment failed or expired
- `payment_link.created` - New payment link created
- `payment_link.deleted` - Payment link deleted
- `refund.completed` - Refund processed

### Webhook Payload

**Example: `payment.completed`**

```json
{
  "id": "evt_1a2b3c4d5e",
  "event": "payment.completed",
  "createdAt": "2025-10-22T10:36:15Z",
  "data": {
    "transactionId": "txn_abc123def456",
    "paymentLinkId": "pl_a1b2c3d4e5f6",
    "price": "29.99",
    "currency": "USD",
    "token": "USDC",
    "tokenAmount": "29.99",
    "chain": "polygon",
    "txHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "fromAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "toAddress": "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    "metadata": {
      "customerId": "cust_12345",
      "planId": "premium_monthly"
    }
  }
}
```

### Verifying Webhook Signatures

All webhook requests include a signature in the `X-PYMSTR-Signature` header. Verify this signature to ensure the request came from PYMSTR.

**Node.js Example:**
```javascript
const crypto = require('crypto');

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

// Express.js example
app.post('/webhooks/pymstr', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-pymstr-signature'];
  const payload = req.body;
  
  if (!verifyWebhookSignature(payload, signature, process.env.PYMSTR_WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }
  
  const event = JSON.parse(payload);
  
  // Handle the event
  switch (event.event) {
    case 'payment.completed':
      // Process completed payment
      console.log('Payment completed:', event.data);
      break;
    case 'payment.failed':
      // Handle failed payment
      console.log('Payment failed:', event.data);
      break;
  }
  
  res.status(200).send('Webhook received');
});
```

---

## Error Codes

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Resource created |
| 400 | Bad request - Invalid parameters |
| 401 | Unauthorized - Invalid or missing API key |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not found - Resource doesn't exist |
| 429 | Too many requests - Rate limit exceeded |
| 500 | Internal server error |
| 503 | Service unavailable |

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "invalid_request",
    "message": "The 'price' field must be a positive number",
    "field": "price"
  }
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| `invalid_request` | Malformed request or invalid parameters |
| `authentication_failed` | Invalid API key |
| `resource_not_found` | Requested resource doesn't exist |
| `rate_limit_exceeded` | Too many API requests |
| `insufficient_balance` | Insufficient balance for operation |
| `invalid_chain` | Unsupported blockchain network |
| `invalid_token` | Unsupported token |
| `expired_session` | Payment session has expired |
| `transaction_failed` | Blockchain transaction failed |

---

## Rate Limits

- **Standard Plan:** 100 requests per minute
- **Pro Plan:** 500 requests per minute
- **Enterprise Plan:** Custom limits

Rate limit information is included in response headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1698012345
```

---

## Code Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

const PYMSTR_API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.pymstr.com/v1';

// Create a payment link
async function createPaymentLink() {
  try {
    const response = await axios.post(
      `${BASE_URL}/payment-links`,
      {
        name: 'Product Purchase',
        description: 'Premium widget',
        price: '49.99',
        currency: 'USD',
        acceptedTokens: ['USDC', 'USDT'],
        acceptedChains: ['polygon', 'arbitrum']
      },
      {
        headers: {
          'Authorization': `Bearer ${PYMSTR_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Payment link created:', response.data.data.url);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

// Get transaction details
async function getTransaction(transactionId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/transactions/${transactionId}`,
      {
        headers: {
          'Authorization': `Bearer ${PYMSTR_API_KEY}`
        }
      }
    );
    
    return response.data.data;
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}
```

### Python

```python
import requests

PYMSTR_API_KEY = 'your_api_key_here'
BASE_URL = 'https://api.pymstr.com/v1'

headers = {
    'Authorization': f'Bearer {PYMSTR_API_KEY}',
    'Content-Type': 'application/json'
}

# Create a payment link
def create_payment_link():
    payload = {
        'name': 'Product Purchase',
        'description': 'Premium widget',
        'price': '49.99',
        'currency': 'USD',
        'acceptedTokens': ['USDC', 'USDT'],
        'acceptedChains': ['polygon', 'arbitrum']
    }
    
    response = requests.post(
        f'{BASE_URL}/payment-links',
        json=payload,
        headers=headers
    )
    
    if response.status_code == 201:
        data = response.json()
        print(f"Payment link created: {data['data']['url']}")
        return data
    else:
        print(f"Error: {response.json()}")

# Get transaction details
def get_transaction(transaction_id):
    response = requests.get(
        f'{BASE_URL}/transactions/{transaction_id}',
        headers=headers
    )
    
    if response.status_code == 200:
        return response.json()['data']
    else:
        print(f"Error: {response.json()}")
```

### PHP

```php
<?php

$apiKey = 'your_api_key_here';
$baseUrl = 'https://api.pymstr.com/v1';

// Create a payment link
function createPaymentLink($apiKey, $baseUrl) {
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
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 201) {
        $result = json_decode($response, true);
        echo "Payment link created: " . $result['data']['url'] . "\n";
        return $result;
    } else {
        echo "Error: " . $response . "\n";
    }
}

// Get transaction details
function getTransaction($apiKey, $baseUrl, $transactionId) {
    $ch = curl_init($baseUrl . '/transactions/' . $transactionId);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $apiKey
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        return json_decode($response, true)['data'];
    } else {
        echo "Error: " . $response . "\n";
    }
}
```

### cURL

```bash
# Create a payment link
curl -X POST https://api.pymstr.com/v1/payment-links \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Purchase",
    "description": "Premium widget",
    "price": "49.99",
    "currency": "USD",
    "acceptedTokens": ["USDC", "USDT"],
    "acceptedChains": ["polygon", "arbitrum"]
  }'

# Get transaction details
curl -X GET https://api.pymstr.com/v1/transactions/txn_abc123def456 \
  -H "Authorization: Bearer YOUR_API_KEY"

# List all transactions
curl -X GET "https://api.pymstr.com/v1/transactions?status=completed&limit=10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## Testing

### Sandbox Environment

Use the sandbox environment for testing:

**Sandbox Base URL:** `https://api-sandbox.pymstr.com/v1`

### Test Networks

- **Ethereum Sepolia** (Chain ID: 11155111)
- **Polygon Mumbai** (Chain ID: 80001)
- **Arbitrum Sepolia** (Chain ID: 421614)
- **Optimism Sepolia** (Chain ID: 11155420)

### Test Tokens

Request test tokens from our faucet:
- Navigate to **Settings** → **Developer Tools** → **Test Faucet**
- Select network and token
- Receive test tokens to your wallet

---

## Support

- **Documentation:** https://docs.pymstr.com
- **API Status:** https://status.pymstr.com
- **Email:** developers@pymstr.com
- **Discord:** https://discord.gg/pymstr

---

## Changelog

### v1.0.0 (2025-10-22)
- Initial API release
- Payment links and sessions
- Transaction management
- Webhooks
- Analytics endpoints

---

**Last Updated:** October 22, 2025
