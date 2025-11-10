# PYMSTR Developer Quick Start Guide

Welcome to PYMSTR! This guide will help you integrate Web3 stablecoin payments into your application in minutes.

## Overview

PYMSTR is a Web3 stablecoin payment processor that enables merchants to accept crypto payments across multiple chains with a simple API.

**Supported Stablecoins:** USDC, USDT, DAI  
**Supported Chains:** Ethereum, Polygon, Arbitrum, Optimism, Base

---

## 1. Get Your API Key

1. Log in to your PYMSTR merchant dashboard
2. Navigate to **API** in the main menu
3. Click **Generate New Key**
4. Copy and securely store your API key (it won't be shown again)
5. Add the key to your environment variables:

```bash
PYMSTR_API_KEY=your_api_key_here
```

> **Security Note:** Never commit API keys to version control. Store them in environment variables or secure vaults.

---

## 2. Create Your First Payment Link

### Using the Dashboard (No Code)

1. Click **Generate Payment Link** button on the Dashboard
2. Fill in the payment details:
   - **Name:** (Optional) Internal reference name
   - **Price:** Amount in USD (e.g., 99.99)
   - **Description:** (Optional) What the customer is paying for
   - **Expires In:** Minutes until link expires (e.g., 60 for 1 hour, 1440 for 24 hours)
   - **Accepted Tokens:** Select which stablecoins to accept (USDC, USDT, DAI)
   - **Accepted Chains:** Select which chains to accept (Ethereum, Polygon, Arbitrum, Optimism, Base)
3. Click **Generate Link**
4. Share the generated link with your customer (single-use only)

### Using the API

```bash
curl -X POST https://api.pymstr.com/v1/payment-links \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Subscription",
    "price": "99.99",
    "currency": "USD",
    "description": "Premium Subscription - Monthly",
    "expiresAt": 1440,
    "acceptedTokens": ["USDC", "USDT", "DAI"],
    "acceptedChains": ["ethereum", "polygon", "arbitrum", "optimism", "base"]
  }'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Premium Subscription",
    "price": "99.99",
    "currency": "USD",
    "status": "pending",
    "url": "https://checkout.pymstr.com/550e8400-e29b-41d4-a716-446655440000",
    "expiresAt": 1440,
    "createdAt": "2025-10-22T10:30:00Z"
  }
}
```

---

## 3. Set Up Webhooks

Webhooks notify your server when payment events occur (e.g., payment completed, failed, etc.).

### Configure Webhook Endpoint

1. Go to **Webhooks** in the main menu
2. Click **Add Webhook Endpoint**
3. Enter your webhook URL (e.g., `https://yourapp.com/api/pymstr-webhook`)
4. Select events to subscribe to:
   - `payment.completed`
   - `payment.failed`
   - `payment.pending`
5. Save the endpoint

### Handle Webhook Events

Create an endpoint in your application to receive webhook events:

```javascript
// Node.js/Express example
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
      // Update your database, fulfill order, etc.
      fulfillOrder(event.data.payment_id);
      break;
      
    case 'payment.failed':
      console.log('Payment failed:', event.data);
      // Notify customer, retry logic, etc.
      break;
      
    case 'payment.pending':
      console.log('Payment pending:', event.data);
      // Show pending status to customer
      break;
  }
  
  // Always respond with 200 to acknowledge receipt
  res.status(200).send('Webhook received');
});
```

### Webhook Event Structure

```json
{
  "type": "payment.completed",
  "id": "evt_abc123",
  "created_at": "2025-10-22T10:35:00Z",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Premium Subscription",
    "description": "Premium Subscription - Monthly",
    "price": "99.99",
    "currency": "USD",
    "status": "completed",
    "url": "https://checkout.pymstr.com/550e8400-e29b-41d4-a716-446655440000",
    "acceptedTokens": ["USDC", "USDT", "DAI"],
    "acceptedChains": ["ethereum", "polygon", "arbitrum", "optimism", "base"],
    "txHash": "0xabcd...ef01",
    "chain": "polygon",
    "token": "USDC",
    "fromAddress": "0x1234...5678",
    "expiresAt": 1440,
    "createdAt": "2025-10-22T10:30:00Z",
    "completedAt": "2025-10-22T10:35:22Z"
  }
}
```

---

## 4. Integration Patterns

### Pattern 1: Direct Payment Links (Simplest)

Generate payment links on-demand and redirect customers:

```javascript
// When customer clicks "Pay with Crypto"
async function initiatePayment(price, description) {
  const response = await fetch('https://api.pymstr.com/v1/payment-links', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PYMSTR_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      price: price.toString(),
      currency: 'USD',
      description,
      expiresAt: 60, // expires in 60 minutes
      acceptedTokens: ['USDC', 'USDT', 'DAI'],
      acceptedChains: ['polygon', 'arbitrum'] // lowest fees
    })
  });
  
  const result = await response.json();
  const paymentLink = result.data;
  
  // Redirect customer to payment page
  window.location.href = paymentLink.url;
}
```

### Pattern 2: Embedded Checkout (Coming Soon)

Embed the PYMSTR checkout directly in your application using our SDK.

### Pattern 3: API-Driven Custom UI

Build your own checkout UI using our API endpoints for full control.

---

## 5. Check Payment Status

### Via API

```bash
curl -X GET https://api.pymstr.com/v1/payment-links/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Premium Subscription",
    "description": "Premium Subscription - Monthly",
    "price": "99.99",
    "currency": "USD",
    "status": "completed",
    "url": "https://checkout.pymstr.com/550e8400-e29b-41d4-a716-446655440000",
    "acceptedTokens": ["USDC", "USDT", "DAI"],
    "acceptedChains": ["ethereum", "polygon", "arbitrum", "optimism", "base"],
    "txHash": "0xabcd...ef01",
    "chain": "polygon",
    "token": "USDC",
    "fromAddress": "0x1234...5678",
    "expiresAt": 1440,
    "createdAt": "2025-10-22T10:30:00Z",
    "completedAt": "2025-10-22T10:35:22Z"
  }
}
```

### Via Dashboard

Navigate to **Dashboard** → **Recent Transactions** to view all payment activity.

---

## 6. Testing

### Test Mode

1. In **API** settings, generate a test API key
2. Test keys are prefixed with `test_`
3. Use test mode to create payment links without real transactions
4. Test webhooks using tools like [webhook.site](https://webhook.site)

### Test Payment Flow

1. Create a test payment link
2. Visit the payment URL
3. Connect a test wallet (use Web3Auth social login)
4. Complete the mock payment
5. Verify webhook received on your endpoint
6. Check payment status via API

---

## 7. Best Practices

### Security

- ✅ Always verify webhook signatures
- ✅ Use HTTPS for webhook endpoints
- ✅ Store API keys securely (environment variables, vaults)
- ✅ Rotate API keys periodically
- ❌ Never expose API keys in client-side code
- ❌ Never commit API keys to version control

### Performance

- Use **Polygon** for lowest transaction fees
- Use **USDC** as default (most widely held stablecoin)
- Cache payment status locally, use webhooks for updates
- Implement retry logic for failed API calls

### User Experience

- Clearly display supported chains and currencies
- Show real-time transaction status updates
- Provide transaction hash for blockchain verification
- Support multiple wallet connection methods (Web3Auth makes this easy)

---

## 8. Common Use Cases

### E-commerce Checkout

```javascript
// Create payment on checkout
const payment = await createPaymentLink({
  name: `Order #${order.id}`,
  price: cart.total.toString(),
  currency: 'USD',
  description: `Order #${order.id}`,
  expiresAt: 30, // 30 minutes to complete payment
  acceptedTokens: ['USDC', 'USDT', 'DAI'],
  acceptedChains: ['polygon', 'arbitrum']
});

// Store payment ID with order
await db.orders.update(order.id, {
  pymstr_payment_id: payment.data.id,
  payment_url: payment.data.url
});

// Redirect to payment
redirect(payment.data.url);
```

### Subscription Billing

Generate recurring payment links or integrate with your subscription logic:

```javascript
async function chargeSubscription(user) {
  const payment = await createPaymentLink({
    name: `Monthly Subscription - ${user.email}`,
    price: "29.99",
    currency: 'USD',
    description: `Monthly subscription for ${user.email}`,
    expiresAt: 10080, // 7 days to pay
    acceptedTokens: ['USDC', 'USDT', 'DAI'],
    acceptedChains: ['polygon', 'arbitrum']
  });
  
  // Email payment link to user
  await sendEmail(user.email, {
    subject: 'Your Monthly Subscription Payment',
    paymentUrl: payment.data.url
  });
}
```

### Donation/Tips

```javascript
// Let users choose amount
const payment = await createPaymentLink({
  name: 'Donation',
  price: userChosenAmount.toString(),
  currency: 'USD',
  description: 'Support our project',
  expiresAt: 60, // 1 hour
  acceptedTokens: ['USDC', 'USDT', 'DAI'],
  acceptedChains: ['ethereum', 'polygon', 'arbitrum', 'optimism', 'base']
});
```

---

## 9. API Reference

### Base URL

```
https://api.pymstr.com/v1
```

### Authentication

All API requests require authentication via Bearer token:

```
Authorization: Bearer YOUR_API_KEY
```

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/payment-links` | POST | Create a new payment link |
| `/payment-links` | GET | List all payment links |
| `/payment-links/:id` | GET | Get payment link details |
| `/payment-links/:id` | DELETE | Delete payment link |
| `/analytics` | GET | Get analytics data |

### Webhook Events

| Event | Description |
|-------|-------------|
| `payment.completed` | Payment successfully confirmed on-chain |
| `payment.failed` | Payment failed or was rejected |
| `payment.pending` | Payment initiated, waiting for confirmation |
| `payment.refunded` | Payment was refunded |
| `link.clicked` | Payment link was accessed |

---

## 10. Support & Resources

- **Dashboard:** [https://pymstr.com/dashboard](https://pymstr.com/dashboard)
- **API Documentation:** [https://docs.pymstr.com](https://docs.pymstr.com)
- **Discord Community:** [https://discord.gg/pymstr](https://discord.gg/pymstr)
- **Support Email:** developers@pymstr.com

---

## Next Steps

Now that you've completed the quick start:

1. ✅ Create your first payment link
2. ✅ Set up webhook endpoint
3. ✅ Test the complete payment flow
4. 📚 Explore [full API documentation](https://docs.pymstr.com)
5. 🎨 Customize the checkout experience
6. 🚀 Go live with production API keys

**Welcome to the future of payments! 🚀**
