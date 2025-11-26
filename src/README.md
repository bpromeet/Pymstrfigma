# PYMSTR

**A modern Web3 stablecoin payment processor for merchants and customers**

PYMSTR is a non-custodial, secure cryptocurrency payment platform that enables merchants to accept stablecoin payments while providing customers with a seamless checkout experience. Built with modern web technologies and Web3 integration.

---

## Features

### Merchant Dashboard

- **Analytics & Reporting** - Real-time revenue tracking with multi-chain transaction monitoring and performance metrics using interactive Recharts visualizations
- **Payment Link Management** - Create and manage single-use payment links with tabbed filtering (All, Active, Completed, Expired) via dashboard or API
- **API Key Management** - Generate and manage test and live environment API keys with comprehensive documentation
- **Webhook Management** - Configure webhook endpoints with event subscriptions, signing secrets, delivery tracking, and mobile-optimized interface
- **Team Management** - Add team members with granular role-based permissions (Admin, Limited, View-only)
- **Comprehensive Documentation** - Built-in Quick Start Guide and API Reference with accurate field examples

### Customer Checkout

- **Web3Auth Integration** - Simplified authentication for seamless user onboarding
- **Account Abstraction (ERC-4337)** - Powered by Pimlico for gasless transactions and improved UX
- **Multi-Stablecoin Support** - Accept payments in USDC, USDT, and DAI
- **Multi-Chain Support** - Transactions across Ethereum, Polygon, Arbitrum, Optimism, and Base networks
- **Secure & Non-custodial** - Built with security-first design principles

### Design & UX

- **Dark Mode Support** - Full dark/light theme with persistent user preferences
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices with dedicated mobile layouts
- **Pill-shaped Aesthetic** - Modern, fully rounded UI components (rounded-full) with consistent branding throughout
- **Brand Colors** - Distinctive orange (#FF5914) accent throughout the application

---

## Supported Blockchain Infrastructure

### Stablecoins

- **USDC** (USD Coin)
- **USDT** (Tether)
- **EURC** (EUR Stablecoin)

### Blockchain Networks

- **Ethereum** - Primary network
- **Polygon** - Low-cost, fast transactions
- **Arbitrum** - Layer 2 scaling solution
- **Optimism** - Optimistic rollup network

All analytics and reporting display multi-chain transaction data in a unified dashboard.

---

## Tech Stack

- **React** - Modern UI library with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework with custom design tokens
- **Shadcn/ui** - High-quality, accessible component library
- **Recharts** - Data visualization for analytics
- **Lucide Icons** - Beautiful, consistent icon set
- **Web3Auth** - Simplified Web3 authentication
- **Pimlico** - Account Abstraction infrastructure (ERC-4337 bundler and paymaster services)
- **Sonner** - Toast notifications

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager
- Modern web browser with Web3 wallet extension (optional)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pymstr.git
cd pymstr
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

---

## Project Structure

```plaintext
├── App.tsx                        # Main application component with routing
├── components/
│   ├── APIKeyManagement.tsx       # API key generation and management
│   ├── APIReference.tsx           # Comprehensive API documentation
│   ├── QuickStartGuide.tsx        # Developer quick start with examples
│   ├── WebhookManagement.tsx      # Webhook configuration (mobile-optimized)
│   ├── PaymentLinkForm.tsx        # Payment link creation form
│   ├── figma/
│   │   └── ImageWithFallback.tsx  # Image component with fallback
│   └── ui/                        # Shadcn UI components (40+ components)
├── styles/
│   └── globals.css                # Tailwind v4 config & global styles
├── guidelines/
│   └── Guidelines.md              # Development guidelines
├── API_REFERENCE.md               # Detailed API documentation
├── DEVELOPER_QUICKSTART.md        # Quick start for developers
└── README.md                      # This file
```

---

## Usage

### For Merchants

1. **Dashboard** - View real-time analytics and multi-chain transaction data
2. **Create Payment Links** - Generate single-use payment links with custom prices and descriptions
3. **Manage API Keys** - Create test and live environment API keys for integration
4. **Configure Webhooks** - Set up webhook endpoints to receive real-time event notifications
5. **Team Collaboration** - Invite team members and assign appropriate access levels
6. **API Integration** - Use comprehensive documentation to integrate PYMSTR into your systems

### For Customers

1. **Access Payment Link** - Navigate to merchant-provided payment link
2. **Login/Register** - Authenticate via Web3Auth
3. **Select Payment Method** - Choose your preferred stablecoin (USDC, USDT, DAI) and chain
4. **Confirm Payment** - Review and confirm transaction

### URL Routing

Payment links use UUID v4 format and follow this pattern:

```
https://yoursite.com/#/pay/{uuid}
```

Example:

```
https://pymstr.com/#/pay/550e8400-e29b-41d4-a716-446655440000
```

---

## API Integration

### Field Naming Conventions

PYMSTR uses consistent field naming across all API endpoints:

- **`price`** - Always used for payment amounts (not "amount")
- **`currency`** - Always "USD" for fiat representation (not individual stablecoin names)
- **`acceptedTokens`** - Array of stablecoins merchant accepts (e.g., ["USDC", "USDT", "DAI"])
- **`acceptedChains`** - Array of blockchain networks merchant accepts (e.g., ["ethereum", "polygon"])
- **`token`** - Specific stablecoin used in a completed payment (e.g., "USDC")
- **`chain`** - Specific blockchain network used in a completed payment (e.g., "ethereum")

### Payment Link Characteristics

- **UUID v4 Format** - All payment link IDs use standard UUID v4 format (no prefixes)
- **Single-Use Only** - Payment links cannot be reused after completion
- **Immutable** - Once created, payment link parameters cannot be modified
- **Transaction Hash** - Completed payments include `txHash` (blockchain transaction hash), no separate transaction IDs

### API Keys

Generate production and test API keys from the API Configuration page. Each environment is isolated for safe development.

### Webhook Configuration

Configure webhook endpoints to receive real-time payment notifications:

**Available Events:**

- `payment.completed` - Successful payment processed
- `payment.failed` - Payment attempt failed
- `payment.pending` - Payment initiated, awaiting confirmation
- `payment.expired` - Payment link expired before completion
- `refund.completed` - Refund successfully processed
- `refund.failed` - Refund attempt failed

**Key Features:**

- API key association for proper event routing
- Webhook signing secrets for signature verification
- Delivery attempt tracking with retry policy
- Test webhook functionality
- Mobile-optimized management interface

### Quick Start Example

Create a payment link with minimum required fields:

```bash
curl -X POST https://api.pymstr.com/v1/payment-links \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "price": "99.99",
    "currency": "USD"
  }'
```

For complete API documentation, see [API_REFERENCE.md](API_REFERENCE.md) and [DEVELOPER_QUICKSTART.md](DEVELOPER_QUICKSTART.md).

### Security Best Practices

- Never expose API keys in client-side code
- Use environment variables for sensitive credentials
- Rotate API keys regularly
- Implement webhook signature validation using the provided signing secret
- Use test environment for development and staging

---

## Account Abstraction with Pimlico

PYMSTR leverages Pimlico's infrastructure to provide seamless Account Abstraction (ERC-4337) capabilities:

### Key Benefits

- **Gasless Transactions** - Pay network fees in stablecoins instead of native tokens
- **Batch Transactions** - Combine multiple operations into a single transaction
- **Session Keys** - Enable time-limited permissions for improved security
- **Social Recovery** - Recover accounts without seed phrases

### Integration

Pimlico provides the bundler and paymaster services that power smart contract wallets, enabling:

- Sponsored transactions for better user onboarding
- Token-based gas payments (pay fees in USDC/USDT instead of ETH/MATIC)
- Improved transaction success rates with ERC-4337 compliance
- Multi-chain support across Ethereum, Polygon, Arbitrum, Optimism, and Base

For production deployment, configure your Pimlico API keys in the environment variables.

---

## Mobile Optimization

PYMSTR is fully optimized for mobile devices with:

- **Responsive Tables** - Desktop tables convert to mobile-friendly card layouts
- **Touch-Optimized Buttons** - Full-width buttons on mobile with proper spacing
- **Responsive Dialogs** - Dialogs sized at 95vw on mobile with scrollable content
- **Flexible Layouts** - Smart stacking of UI elements on smaller screens
- **WebhookManagement** - Specially optimized for mobile with responsive secret display and action buttons

---

## Dark Mode

PYMSTR includes full dark mode support with:

- Automatic theme persistence via localStorage
- Smooth color transitions
- Theme-aware components throughout
- Accessible color contrast ratios

Toggle dark mode using the sun/moon icon in the navigation bar.

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Security & Privacy

PYMSTR is built with security as a top priority:

- **Non-custodial** - Users maintain full control of their funds
- **No PII storage** - Minimal personal information collection (not designed for sensitive data)
- **Secure by design** - Best practices for Web3 authentication
- **Transparent transactions** - All blockchain transactions are verifiable on-chain
- **Webhook security** - HMAC SHA-256 signature verification for webhook authenticity
- **Environment isolation** - Separate test and live environments

**Important**: PYMSTR (built with Figma Make) is not designed for collecting PII or securing highly sensitive data. For production use, implement additional security measures including proper API authentication, rate limiting, and comprehensive security audits.

---

## Component Documentation

### Key Components

- **APIKeyManagement** - Full API key lifecycle management with test/live environments
- **APIReference** - Comprehensive, interactive API documentation
- **QuickStartGuide** - Developer onboarding with corrected code examples
- **WebhookManagement** - Mobile-optimized webhook configuration with delivery tracking
- **PaymentLinkForm** - Payment link creation with validation

### Design Patterns

- **Responsive Tables → Cards** - Desktop tables automatically convert to mobile card layouts
- **Full-width Mobile Buttons** - Better touch targets on small screens
- **Pill-shaped Components** - All buttons, badges, and inputs use `rounded-full`
- **Consistent Spacing** - Tailwind spacing scale used throughout

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and component patterns
- Use TypeScript for type safety
- Maintain the pill-shaped (rounded-full) design aesthetic
- Test on both desktop and mobile viewports
- Ensure dark mode compatibility
- Use proper field naming conventions (price, not amount; currency as USD)
- Mobile-optimize all new features
- Update documentation for new features

---

## Roadmap

See [FEATURE_ROADMAP.md](FEATURE_ROADMAP.md) for the complete feature roadmap.

Highlights:

- [ ] Multi-currency fiat support (EUR, GBP, JPY)
- [ ] Advanced analytics with custom date ranges
- [ ] Recurring payment support
- [ ] Invoice generation and PDF exports
- [ ] Multi-language support
- [ ] Enhanced fraud detection
- [ ] Smart contract wallet deployment via Pimlico
- [ ] Integration marketplace for e-commerce platforms

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support

For support, questions, or feedback:

- Email: support@pymstr.com
- Documentation: https://docs.pymstr.com
- Community: https://discord.gg/pymstr

---

## Acknowledgments

- Built with [Shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)
- Charts powered by [Recharts](https://recharts.org)
- Account Abstraction by [Pimlico](https://pimlico.io)
- Authentication by [Web3Auth](https://web3auth.io)
- Design inspired by modern Web3 payment platforms

---

**Made with 🧡 by the PYMSTR team**