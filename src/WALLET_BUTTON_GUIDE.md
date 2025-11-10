# Wallet Address Button Component Guide

## Overview

The `WalletAddressButton` component is a Material Design 3 compliant button that displays a truncated wallet address with copy-to-clipboard functionality. It follows PYMSTR's design system with proper MD3 specifications.

---

## Component Features

✅ **MD3 Compliant Design**
- Pill-shaped button with `rounded-full` (MD3 standard 20dp radius)
- Proper touch targets (48px minimum height)
- MD3 state layers (hover, active, focus)
- 900ms transitions (PYMSTR standard)

✅ **Three Variants**
- **Primary (Filled)**: Blue filled button for primary actions
- **Outlined**: Border-only button (default, most common)
- **Tonal**: Subtle filled button for secondary contexts

✅ **Wallet Address Handling**
- Automatically truncates addresses: `0x1234...5678` (first 6 + last 4 chars)
- Monospace font for better readability
- Full address copied to clipboard on click

✅ **Copy Functionality**
- Click to copy full wallet address
- Visual feedback: Check icon for 2 seconds
- Toast notification on success/error
- Uses native Clipboard API

✅ **Accessibility**
- ARIA labels for screen readers
- Keyboard navigation support
- Focus rings (MD3 compliant)
- 48px minimum touch target

---

## Installation

The component is already created at `/components/WalletAddressButton.tsx`.

### Dependencies

```tsx
import { Copy, Check, Wallet } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
```

---

## Basic Usage

### Import the Component

```tsx
import { WalletAddressButton } from './components/WalletAddressButton';
```

### Simple Example (Outlined - Default)

```tsx
<WalletAddressButton 
  address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5"
/>
```

**Result:** Outlined button with wallet icon, truncated address, and copy icon.

---

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `address` | `string` | **required** | Full wallet address (e.g., "0x1234...") |
| `variant` | `'primary' \| 'outlined' \| 'tonal'` | `'outlined'` | Button style variant (MD3) |
| `showIcon` | `boolean` | `true` | Whether to show wallet icon before address |
| `className` | `string` | `''` | Additional CSS classes for customization |

---

## Variants

### 1. Primary (Filled) Variant

**Use for:** Primary wallet actions, main CTAs

```tsx
<WalletAddressButton
  address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5"
  variant="primary"
/>
```

**Styling:**
- Background: `#1E88E5` (primary blue)
- Text: White
- Hover: Darker blue `#1565C0` + shadow
- Best for: Headers, primary wallet display

---

### 2. Outlined Variant (Default)

**Use for:** Most common use cases, profile cards, lists

```tsx
<WalletAddressButton
  address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5"
  variant="outlined"
/>
```

**Styling:**
- Background: Transparent
- Border: `#1E88E5` (primary blue)
- Text: `#1E88E5`
- Hover: Light blue background `#E3F2FD`
- Best for: Profile sections, transaction lists, account info

---

### 3. Tonal Variant

**Use for:** Secondary contexts, subtle emphasis

```tsx
<WalletAddressButton
  address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5"
  variant="tonal"
/>
```

**Styling:**
- Background: `#303030` (surface level 1)
- Text: `#F6F7F9` (on-surface)
- Hover: Darker surface `#2E3C49` + shadow
- Best for: Lists, embedded displays, secondary sections

---

## Icon Options

### With Wallet Icon (Default)

```tsx
<WalletAddressButton
  address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5"
  showIcon={true}  // or omit (default is true)
/>
```

**Result:** `[Wallet Icon] 0x742d...5678 [Copy Icon]`

---

### Without Wallet Icon

```tsx
<WalletAddressButton
  address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5"
  showIcon={false}
/>
```

**Result:** `0x742d...5678 [Copy Icon]`

---

## Real-World Examples

### Example 1: Page Header (Primary Action)

```tsx
<div className="flex items-center justify-between p-4">
  <div>
    <h2>Account Dashboard</h2>
    <p className="text-sm text-muted-foreground">Connected Wallet</p>
  </div>
  <WalletAddressButton
    address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5"
    variant="primary"
  />
</div>
```

---

### Example 2: Profile Card (Outlined)

```tsx
<Card>
  <CardHeader>
    <div className="flex items-center gap-3">
      <Avatar>JD</Avatar>
      <div>
        <CardTitle>John Doe</CardTitle>
        <CardDescription>Merchant Account</CardDescription>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <WalletAddressButton
      address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5"
      variant="outlined"
    />
  </CardContent>
</Card>
```

---

### Example 3: Transaction List (Tonal)

```tsx
<div className="space-y-2">
  {transactions.map((tx) => (
    <div key={tx.id} className="flex items-center justify-between p-4 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl">
      <div>
        <p>Payment from</p>
        <p className="text-sm text-muted-foreground">{tx.date}</p>
      </div>
      <WalletAddressButton
        address={tx.walletAddress}
        variant="tonal"
        showIcon={false}
      />
    </div>
  ))}
</div>
```

---

### Example 4: Mobile Responsive (Full Width)

```tsx
<WalletAddressButton
  address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5"
  variant="outlined"
  className="w-full sm:w-auto"  // Full width on mobile, auto on desktop
/>
```

---

## Address Truncation

The component automatically truncates wallet addresses:

| Full Address | Truncated Display |
|-------------|-------------------|
| `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5` | `0x742d...5678` |
| `0x1234567890abcdef1234567890abcdef12345678` | `0x1234...5678` |

**Format:** First 6 characters + "..." + Last 4 characters

**Note:** The full address is still copied to clipboard when clicked.

---

## Copy Behavior

### User Flow

1. **User clicks button** → Copy icon visible
2. **Address copied to clipboard** → Toast notification appears
3. **Check icon appears** → Visual confirmation (green)
4. **After 2 seconds** → Check icon reverts to copy icon

### Success Toast

```
✅ Wallet address copied to clipboard
```

### Error Toast (if clipboard fails)

```
❌ Failed to copy address
```

---

## MD3 Technical Specifications

### Button Measurements

| Property | Value | MD3 Specification |
|----------|-------|-------------------|
| **Border Radius** | `rounded-full` | MD3 pill-shaped (20dp) |
| **Min Height** | `48px` (`min-h-12`) | MD3 touch target requirement |
| **Padding** | `24px × 10px` (`px-6 py-2.5`) | MD3 button padding |
| **Icon Size** | `18px` (`w-[18px] h-[18px]`) | MD3 standard icon size |
| **Icon Spacing** | `8px` (`gap-2`) | MD3 icon-to-text spacing |
| **Transition** | `900ms` | PYMSTR animation standard |

### State Layers

| State | Effect | MD3 Spec |
|-------|--------|----------|
| **Hover** | Background change + shadow | 8% state layer |
| **Active** | Scale `0.98` | 12% state layer |
| **Focus** | Ring `2px` + offset `2px` | MD3 focus ring |

---

## Accessibility Features

✅ **ARIA Labels**
```tsx
aria-label="Copy wallet address 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5"
```

✅ **Keyboard Navigation**
- Tab to focus
- Enter/Space to activate copy

✅ **Focus Indicators**
- MD3 compliant focus ring
- 2px ring with 2px offset
- Primary blue color

✅ **Touch Targets**
- Minimum 48px height
- Adequate padding for fingers
- Responsive to mobile/desktop

---

## Customization

### Custom Styling

Add additional classes via `className` prop:

```tsx
<WalletAddressButton
  address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5"
  variant="outlined"
  className="w-full sm:w-auto shadow-lg"
/>
```

### Custom Colors (Advanced)

Override variant colors if needed:

```tsx
<WalletAddressButton
  address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5"
  variant="outlined"
  className="border-[#07D7FF] text-[#07D7FF] hover:bg-[#07D7FF]/10"
/>
```

---

## View Live Examples

To see the wallet button in action with all variants:

1. **Run the app**: The component is integrated into App.tsx
2. **Navigate to**: `#/wallet-examples` (or use the navigation if added)
3. **View examples**: All variants, use cases, and specifications

Or import the examples component:

```tsx
import WalletAddressExamples from './components/WalletAddressExamples';

// Use in your page
<WalletAddressExamples />
```

---

## Component File Locations

| File | Description |
|------|-------------|
| `/components/WalletAddressButton.tsx` | Main component implementation |
| `/components/WalletAddressExamples.tsx` | Live examples and use cases |
| `/WALLET_BUTTON_GUIDE.md` | This documentation file |

---

## Best Practices

✅ **Do:**
- Use **outlined variant** for most wallet displays (default)
- Use **primary variant** for main wallet actions in headers
- Use **tonal variant** for lists and embedded contexts
- Always provide the full wallet address (truncation is automatic)
- Use in profile cards, dashboards, transaction lists
- Add responsive classes for mobile (`w-full sm:w-auto`)

❌ **Don't:**
- Don't manually truncate the address (component handles this)
- Don't use for non-wallet addresses (use regular buttons)
- Don't override MD3 touch targets (keep 48px minimum)
- Don't remove copy functionality (core feature)
- Don't use fixed widths that prevent button from expanding

---

## Integration Checklist

- [ ] Import `WalletAddressButton` component
- [ ] Pass full wallet address as `address` prop
- [ ] Choose appropriate `variant` (primary/outlined/tonal)
- [ ] Set `showIcon` based on design needs
- [ ] Add responsive classes if needed (`className`)
- [ ] Test copy functionality
- [ ] Verify toast notifications appear
- [ ] Check mobile touch targets (48px minimum)
- [ ] Test keyboard navigation
- [ ] Validate ARIA labels for accessibility

---

## Support

For questions or issues with the wallet button component:

1. Check `/components/WalletAddressExamples.tsx` for live examples
2. Review this guide for prop usage and variants
3. See `Guidelines.md` for MD3 specifications
4. Test the component at `#/wallet-examples`

---

**Last Updated:** Based on PYMSTR Design System Guidelines (Material Design 3 compliant)
