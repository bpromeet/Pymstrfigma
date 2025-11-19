# PYMSTR Component & Utility Reference

## 🎯 Overview

This document provides a comprehensive reference of all reusable components and utilities in the PYMSTR dashboard application, following Material Design 3 principles.

---

## 📦 Utility Functions

### `/utils/clipboard.ts`

**Copy to Clipboard Utilities**

```tsx
import { copyToClipboard, copyWithFeedback } from '../utils/clipboard';

// Basic copy with toast notification
copyToClipboard(apiKey);

// Copy with custom success message
copyToClipboard(webhookUrl, undefined, 'Webhook URL copied!');

// Copy with state feedback (for UI icons)
const [copied, setCopied] = useState(false);
copyWithFeedback(text, setCopied);

// In your JSX
{copied ? (
  <Check className="w-4 h-4 text-green-600" />
) : (
  <Copy className="w-4 h-4" />
)}
```

**Features:**
- ✅ Fallback method (no permissions needed)
- ✅ Automatic toast notifications
- ✅ State management for UI feedback
- ✅ 2-second green checkmark pattern
- ✅ Custom success messages

---

### `/utils/address.ts`

**Blockchain Address Utilities**

```tsx
import { truncateAddress, formatAddress, isValidAddress } from '../utils/address';

// Truncate address (default: 0x742d...bEb5)
truncateAddress(walletAddress);

// Custom truncation
truncateAddress(address, 10, 8); // 0x742d35Cc...95f0bEb5

// Format with presets
formatAddress(address, "short");  // 0x742d...bEb5
formatAddress(address, "medium"); // 0x742d35Cc...95f0bEb5
formatAddress(address, "full");   // Full address

// Validate address format
if (isValidAddress(userInput)) {
  // Process valid address
}
```

**Best Practices:**
- ✅ Always truncate addresses in UI
- ✅ Use "short" format for cards/tables
- ✅ Use "medium" format for detail views
- ✅ Only show "full" for copy operations
- ✅ Prevents layout overflow

---

## 🧩 Reusable Components

### `/components/WalletAddressCopyButton.tsx`

**Wallet Address Copy Button** - MD3-compliant button for displaying and copying wallet addresses

```tsx
import { WalletAddressCopyButton } from '../components/WalletAddressCopyButton';

<WalletAddressCopyButton
  address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bE89"
  onCopy={() => console.log('Address copied')}
  className="w-full" // Optional custom classes
/>
```

**Features:**
- ✅ Wallet icon on left
- ✅ Truncated address in center (0x1234...5678)
- ✅ Copy icon on right (green checkmark on copy)
- ✅ Blue pill-shaped button (rounded-full)
- ✅ 200ms transition for instant feedback
- ✅ Fallback clipboard method

**Styling:**
- Background: `#1E88E5` (primary blue)
- Hover: `#1565C0` (darker blue)
- Height: `min-h-12` (48px - MD3 touch target)
- Border radius: `rounded-full` (pill-shaped)
- Checkmark: `text-green-600` (2-second display)

---

### `/components/CryptoIcon.tsx`

**Cryptocurrency Icon Component**

```tsx
import { CryptoIcon } from '../components/CryptoIcon';

<CryptoIcon crypto="USDC" size={24} />
<CryptoIcon crypto="USDT" size={20} />
<CryptoIcon crypto="EURC" size={18} />
```

**Supported Cryptocurrencies:**
- USDC (USD Coin) - Blue circle
- USDT (Tether) - Green circle
- EURC (Euro Coin) - Blue/gold circle

**Props:**
- `crypto`: "USDC" | "USDT" | "EURC"
- `size`: number (default: 24)

---

### `/components/ChainIcon.tsx`

**Blockchain Network Icon Component**

```tsx
import { ChainIcon } from '../components/ChainIcon';

<ChainIcon chain="ethereum" size={24} />
<ChainIcon chain="polygon" size={20} />
<ChainIcon chain="arbitrum" size={18} />
<ChainIcon chain="optimism" size={18} />
<ChainIcon chain="base" size={18} />
```

**Supported Chains:**
- Ethereum - ETH logo
- Polygon - Purple diamond
- Arbitrum - Blue/cyan circle
- Optimism - Red circle
- Base - Blue circle

**Props:**
- `chain`: "ethereum" | "polygon" | "arbitrum" | "optimism" | "base"
- `size`: number (default: 24)

---

### `/components/PageLayout.tsx`

**Universal Page Layout Wrapper** - MD3-compliant layout with navigation integration

```tsx
import PageLayout from '../components/PageLayout';
import { Settings } from 'lucide-react';

<PageLayout>
  <PageLayout.Header
    icon={<Settings className="w-6 h-6 text-[#07D7FF]" />}
    title="Page Title"
    subtitle="Page description"
    action={<Button>Action</Button>} // Optional
  />
  <PageLayout.Content>
    {/* Your page content */}
    <Card>...</Card>
  </PageLayout.Content>
</PageLayout>
```

**Features:**
- ✅ Compound component pattern (Header + Content)
- ✅ Automatic navigation rail spacing
- ✅ Responsive padding (mobile/desktop)
- ✅ Max-width container (1280px)
- ✅ Consistent header styling
- ✅ Optional action button (right-aligned)

**Structure:**
- `PageLayout`: Root container with background
- `PageLayout.Header`: Icon + title + subtitle + action
- `PageLayout.Content`: Main content area with padding

**Background Colors:**
- Light mode: `#FFFFFF` (white)
- Dark mode: `#0A0A0A` (very dark/black)

---

### `/components/NavigationRail.tsx`

**Desktop Navigation Rail** - Collapsible side navigation (MD3 Navigation Rail)

```tsx
import { NavigationRail } from '../components/NavigationRail';

const menuItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home /> },
  { id: 'wallets', label: 'Wallets', icon: <Wallet /> },
  // ...
];

<NavigationRail
  items={menuItems}
  activeItem={activeTab}
  onItemClick={setActiveTab}
  isExpanded={isNavExpanded}
  onToggleExpand={setIsNavExpanded}
/>
```

**Features:**
- ✅ Collapsible (80px → 256px)
- ✅ Logo at top
- ✅ User avatar/profile at bottom
- ✅ Active state indicators
- ✅ Smooth 1500ms transitions (layout changes)
- ✅ MD3-compliant styling

---

### `/components/BottomNavigation.tsx`

**Mobile Bottom Navigation Bar** - Fixed bottom navigation (MD3 Bottom Navigation)

```tsx
import { BottomNavigation } from '../components/BottomNavigation';

const navItems: BottomNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home /> },
  { id: 'wallets', label: 'Wallets', icon: <Wallet /> },
  // ...
];

<BottomNavigation
  items={navItems}
  activeItem={activeTab}
  onItemClick={setActiveTab}
/>
```

**Features:**
- ✅ Fixed bottom positioning
- ✅ Mobile only (`md:hidden`)
- ✅ Active state indicators
- ✅ Icon + label format
- ✅ 4-5 primary items maximum

---

### `/components/PymstrLogo.tsx`

**PYMSTR Logo Component** - Responsive logo with light/dark mode support

```tsx
import { PymstrLogo } from '../components/PymstrLogo';

<PymstrLogo size="sm" />   // Small (navigation rail collapsed)
<PymstrLogo size="md" />   // Medium (default)
<PymstrLogo size="lg" />   // Large (landing page)
```

---

## 🎨 UI Components (ShadCN)

All ShadCN components are located in `/components/ui/` and are MD3-compliant.

### Commonly Used Components:

**Buttons:**
```tsx
import { Button } from '../components/ui/button';

// Primary button
<Button className="bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full">
  Create
</Button>

// Outlined button
<Button variant="outline" className="rounded-full">
  Cancel
</Button>
```

**Cards:**
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';

<Card className="rounded-2xl">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
</Card>
```

**Dialogs:**
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

<Dialog open={showDialog} onOpenChange={setShowDialog}>
  <DialogContent className="rounded-3xl">
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

**Tabs (Primary - MD3 Underline):**
```tsx
import { PrimaryTabs, PrimaryTabsList, PrimaryTabsTrigger, PrimaryTabsContent } from '../components/ui/primary-tabs';

<PrimaryTabs defaultValue="terms">
  <PrimaryTabsList>
    <PrimaryTabsTrigger value="terms">Terms</PrimaryTabsTrigger>
    <PrimaryTabsTrigger value="privacy">Privacy</PrimaryTabsTrigger>
  </PrimaryTabsList>
  <PrimaryTabsContent value="terms">...</PrimaryTabsContent>
</PrimaryTabs>
```

**Tabs (Segmented - MD3 Pill):**
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

<Tabs value={filter} onValueChange={setFilter}>
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="all">All</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
    <TabsTrigger value="api">API</TabsTrigger>
  </TabsList>
</Tabs>
```

---

## 🎯 Design System Standards

### Border Radius (MD3)

**Buttons & Interactive:**
- `rounded-full` - All buttons, FABs, badges (MD3 20dp pill)

**Input Fields:**
- `rounded` (4px) - Outlined inputs (MD3 Extra Small)
- `rounded-t` (4px top) - Filled inputs (MD3 standard)

**Cards & Containers:**
- `rounded-2xl` (16px) - Main cards (MD3 Large)
- `rounded-xl` (12px) - Nested sections, dropdowns (MD3 Medium)
- `rounded-lg` (8px) - Small boxes, tables (MD3 Small)

**Dialogs:**
- `rounded-3xl` (24px) - Modal dialogs (MD3 Extra Large)

---

### Colors (MD3 Roles)

**Primary:**
- Primary: `#1E88E5` (Blue 600)
- Primary Hover: `#1565C0` (Blue 800)
- On-Primary: `#FFFFFF` (White)

**Secondary:**
- Secondary: `#07D7FF` (Cyan)
- On-Secondary: `#FFFFFF` (White)

**Tertiary:**
- Tertiary: `#F90BD5` (Magenta)
- On-Tertiary: `#FFFFFF` (White)

**Semantic:**
- Error: `#FF5914` (PYMSTR Orange)
- Success: `#7DD069` (Green)
- Warning: `#D9C370` (Gold)

**Surface:**
- Surface Light: `#FFFFFF` (White)
- Surface Dark: `#0A0A0A` (Very dark/black)
- Surface Level 1: `#303030` (Raised)
- Outline: `#43586C` (Blue-gray)

---

### Transitions (Two-Speed System)

**Fast (200ms) - Interactive Elements:**
```tsx
className="transition-all duration-200"
```
- Button hover/press
- Icon button interactions
- FAB interactions
- Toggle switches
- Checkbox/Radio
- Tab switching
- Dropdown menu items
- List item hovers

**Slow (1500ms) - Layout/Theme:**
```tsx
className="transition-all duration-[1500ms]"
```
- Dark/light mode switching
- Navigation rail expansion
- Page layout shifts
- Modal/Dialog backdrops
- Global color scheme changes

---

### Touch Targets (MD3 Accessibility)

**Minimum Sizes:**
- Mobile: `min-h-12` (48px × 48px)
- Desktop: `min-h-10` (40px) acceptable, prefer 48px

**Responsive Pattern:**
```tsx
className="min-h-12 sm:min-h-10"
```

---

### Mobile FAB Positioning

**Standard (No Bottom Nav):**
```tsx
className="fixed bottom-6 right-6 z-50"
```

**With Bottom Navigation:**
```tsx
className="fixed bottom-24 right-6 z-50"
```
- Clears 64-80px bottom nav bar
- 16-24px margin above nav

**Responsive:**
```tsx
className="fixed bottom-24 md:bottom-6 right-6 z-50"
```

---

## 📋 Copy Button Pattern (Standard)

**Required Implementation:**

```tsx
const [copiedItem, setCopiedItem] = useState<string | null>(null);

const copyToClipboard = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    setCopiedItem(text);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedItem(null), 2000);
  } catch (err) {
    toast.error('Failed to copy to clipboard');
  } finally {
    document.body.removeChild(textarea);
  }
};

// In JSX
<Button onClick={() => copyToClipboard(apiKey)}>
  {copiedItem === apiKey ? (
    <Check className="w-4 h-4 text-green-600" />
  ) : (
    <Copy className="w-4 h-4" />
  )}
</Button>
```

**Key Features:**
- ✅ Green checkmark (`text-green-600`)
- ✅ 2-second display
- ✅ Toast notification
- ✅ Fallback method (cross-browser)
- ✅ State tracking (per-item)

---

## 🚀 Usage Examples

### Complete Payment Link Card

```tsx
import { Card, CardContent } from '../components/ui/card';
import { CryptoIcon } from '../components/CryptoIcon';
import { ChainIcon } from '../components/ChainIcon';
import { truncateAddress } from '../utils/address';
import { copyToClipboard } from '../utils/clipboard';

<Card className="rounded-2xl">
  <CardContent className="p-6">
    <div className="flex items-center gap-3 mb-4">
      <CryptoIcon crypto="USDC" size={24} />
      <ChainIcon chain="polygon" size={20} />
      <span className="font-medium">$50.00 USDC</span>
    </div>
    
    <div className="flex items-center gap-2">
      <code className="text-sm bg-[#FAFAFA] dark:bg-[#2E3C49] px-3 py-2 rounded-lg">
        {truncateAddress(paymentAddress)}
      </code>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => copyToClipboard(paymentAddress)}
      >
        <Copy className="w-4 h-4" />
      </Button>
    </div>
  </CardContent>
</Card>
```

---

## ✅ Component Checklist

Before creating a new component, check if these exist:
- [ ] WalletAddressCopyButton - Wallet address display + copy
- [ ] CryptoIcon - Cryptocurrency icons
- [ ] ChainIcon - Blockchain network icons
- [ ] PageLayout - Page wrapper with header
- [ ] NavigationRail - Desktop side navigation
- [ ] BottomNavigation - Mobile bottom nav
- [ ] PymstrLogo - Brand logo

Before writing clipboard code, use:
- [ ] `/utils/clipboard.ts` - Copy utilities
- [ ] `/utils/address.ts` - Address formatting

---

## 📝 Maintenance

**Cleanup Tasks:**
1. ✅ Removed duplicate TeamManagement.tsx component
2. ✅ Removed unused import from App.tsx
3. ✅ Updated WalletAddressCopyButton with green checkmark
4. ✅ Created shared clipboard utilities
5. ✅ Documented all reusable components

**Future Improvements:**
- [ ] Migrate all copyToClipboard functions to use /utils/clipboard.ts
- [ ] Ensure all address displays use truncateAddress utility
- [ ] Audit and consolidate any remaining duplicate code
- [ ] Create unit tests for utility functions

---

**Last Updated:** November 18, 2025
**Version:** 1.0.0
