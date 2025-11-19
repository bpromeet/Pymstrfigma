# 🧭 PYMSTR Navigation System Guide

**How to control where links redirect in your app**

---

## 📋 OVERVIEW

PYMSTR uses a **state-based navigation system** (not traditional React Router). Navigation is controlled by the `activeTab` state variable in `App.tsx`.

**Current Setup:**
- ✅ No external router (React Router, etc.)
- ✅ Navigation via `activeTab` state
- ✅ URL hash routing for deep links (#/pay/PL123, #/quickstart, etc.)
- ✅ Simple and lightweight

---

## 🎯 HOW NAVIGATION WORKS

### 1. The Core: `activeTab` State

**Location:** `/App.tsx` line 224

```tsx
const [activeTab, setActiveTab] = useState(getInitialTab());
```

**What it does:**
- Stores the current page/view
- Controls which page component renders
- Updates when user clicks navigation items

**Possible values:**
- `"admin"` - Dashboard (merchant)
- `"links"` - Payment Links
- `"wallets"` - Wallets
- `"api"` - API Keys
- `"webhooks"` - Webhooks
- `"settings"` - Payment Settings
- `"reports"` - Reports
- `"documents"` - Documents hub
- `"quickstart"` - Quick Start Guide
- `"api-reference"` - API Reference
- `"code-examples"` - Code Examples
- `"help"` - Help Center
- `"legal"` - Legal Pages
- `"user-dashboard"` - End User Dashboard
- `"user-wallets"` - End User Wallets
- `"user-transactions"` - End User Transactions
- `"user-settings"` - End User Settings
- `"checkout"` - Payment checkout flow
- `"team"` - Team Management

---

## 🔗 HOW TO CHANGE WHERE LINKS GO

### Method 1: Navigation Rail (Desktop Sidebar)

**Component:** `/components/NavigationRail.tsx`

**How it works:**

```tsx
// Line 88-95 in NavigationRail.tsx
{navItems.map((item) => {
  const Icon = item.icon;
  const isActive = normalizedActiveTab === item.id;
  
  return (
    <button
      key={item.id}
      onClick={() => handleNavClick(item.id)}  // ← Triggers navigation
      className={/* ... */}
    >
      <Icon />
      {isExpanded && <span>{item.label}</span>}
    </button>
  );
})}
```

**To add/modify navigation items:**

```tsx
// Edit the defaultNavItems array in NavigationRail.tsx (line 24)
const defaultNavItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Activity },
  { id: 'wallets', label: 'Wallets', icon: Wallet },
  { id: 'links', label: 'Payment Links', icon: LinkIcon },
  // Add new item:
  { id: 'new-page', label: 'New Page', icon: YourIcon },
];
```

**What happens when clicked:**
1. User clicks "Payment Links"
2. `handleNavClick('links')` is called
3. Calls `onNavigate('links')` (passed from App.tsx)
4. Updates `activeTab` to `'links'`
5. App renders `<PaymentLinksPage />`

---

### Method 2: Bottom Navigation (Mobile)

**Component:** `/components/BottomNavigation.tsx`

**How it works:**

```tsx
// App.tsx defines mobile nav items
const endUserBottomNavItems: BottomNavItem[] = [
  { id: 'user-dashboard', label: 'Dashboard', icon: Activity },
  { id: 'user-wallets', label: 'Wallets', icon: Wallet },
  { id: 'user-transactions', label: 'Transactions', icon: Receipt },
  { id: 'more', label: 'More', icon: MoreHorizontal },
];
```

**When clicked:**
1. Calls `onNavigate(itemId)`
2. Updates `activeTab`
3. Shows corresponding page

---

### Method 3: Direct State Update

**Anywhere in App.tsx:**

```tsx
// Change page programmatically
setActiveTab('links'); // Go to Payment Links
setActiveTab('admin'); // Go to Dashboard
setActiveTab('user-wallets'); // Go to End User Wallets
```

**Common use cases:**
- After successful action (create payment link → go to payment links page)
- After login (go to dashboard)
- After logout (go to landing)
- Error handling (redirect to safe page)

---

### Method 4: URL Hash Navigation

**How it works:**

PYMSTR listens to URL hash changes and automatically navigates:

```tsx
// App.tsx lines 301-389
useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash;

    // Payment links: #/pay/PL123
    if (hash.startsWith("#/pay/")) {
      const paymentId = hash.replace("#/pay/", "");
      // Find payment, show checkout
      setActiveTab("checkout");
    }

    // Documentation: #/quickstart
    if (hash.includes("quickstart")) {
      setActiveTab("quickstart");
    }

    // API Reference: #/api-reference
    if (hash.includes("api-reference")) {
      setActiveTab("api-reference");
    }

    // Code Examples: #/code-examples
    if (hash.includes("code-examples")) {
      setActiveTab("code-examples");
    }
  };

  window.addEventListener("hashchange", handleHashChange);
  handleHashChange(); // Run on mount

  return () => window.removeEventListener("hashchange", handleHashChange);
}, []);
```

**Supported hash URLs:**
- `#/dev` → Dashboard (dev mode bypass)
- `#/pay/PL123` → Checkout for payment link PL123
- `#/quickstart` → Quick Start Guide
- `#/api-reference` → API Reference
- `#/code-examples` → Code Examples

**To add new hash routes:**

```tsx
// In the handleHashChange function
if (hash.includes("your-route")) {
  setActiveTab("your-page");
  setIsStandalonePage(true); // If it's a full-page view
}
```

---

## 🛠️ HOW TO ADD A NEW PAGE

### Step 1: Create the Page Component

```tsx
// pages/NewFeaturePage.tsx
import { PageLayout } from '../components/PageLayout';
import { YourIcon } from 'lucide-react';

export const NewFeaturePage = () => {
  return (
    <PageLayout>
      <PageLayout.Header
        icon={<YourIcon className="w-6 h-6 text-[#07D7FF]" />}
        title="New Feature"
        subtitle="Description of your new feature"
      />
      <PageLayout.Content>
        {/* Your content here */}
      </PageLayout.Content>
    </PageLayout>
  );
};
```

### Step 2: Import in App.tsx

```tsx
// At the top of App.tsx
import { NewFeaturePage } from './pages/NewFeaturePage';
```

### Step 3: Add to renderContent()

```tsx
// In App.tsx, find the renderContent() function
const renderContent = () => {
  // ... existing cases

  if (activeTab === 'new-feature') {
    return <NewFeaturePage />;
  }

  // ... rest
};
```

### Step 4: Add Navigation Item

**For Desktop (Navigation Rail):**

```tsx
// components/NavigationRail.tsx
const defaultNavItems: NavigationItem[] = [
  // ... existing items
  { id: 'new-feature', label: 'New Feature', icon: YourIcon },
];
```

**For Mobile (Bottom Nav):**

```tsx
// App.tsx - Add to bottom nav items
const endUserBottomNavItems: BottomNavItem[] = [
  // ... existing items
  { id: 'new-feature', label: 'Feature', icon: YourIcon },
];
```

### Step 5: Test Navigation

```tsx
// Navigate programmatically (for testing)
setActiveTab('new-feature');

// Or click the navigation item you added
```

---

## 📍 NAVIGATION EXAMPLES

### Example 1: Redirect After Action

```tsx
// After creating a payment link, go to payment links page
const handleCreatePaymentLink = async (data) => {
  try {
    const newLink = await createPaymentLink(data);
    setPaymentLinks([...paymentLinks, newLink]);
    toast.success('Payment link created!');
    
    // Redirect to payment links page
    setActiveTab('links');
  } catch (error) {
    toast.error('Failed to create payment link');
  }
};
```

### Example 2: Login Flow

```tsx
const handleLogin = async () => {
  try {
    await performLogin();
    setIsUserLoggedIn(true);
    
    // Redirect to dashboard
    setActiveTab('admin');
  } catch (error) {
    toast.error('Login failed');
  }
};
```

### Example 3: Logout Flow

```tsx
const handleLogout = async () => {
  try {
    await performLogout();
    setIsUserLoggedIn(false);
    
    // Redirect to landing/login
    setActiveTab('landing');
  } catch (error) {
    toast.error('Logout failed');
  }
};
```

### Example 4: Deep Link to Payment

```tsx
// Generate shareable payment link
const paymentLink = `${window.location.origin}/#/pay/${paymentId}`;

// When user visits this URL:
// 1. Hash change detected
// 2. App navigates to checkout
// 3. Loads payment details
// 4. Shows payment form
```

---

## 🎨 NAVIGATION UI COMPONENTS

### Desktop: Navigation Rail

**Component:** `/components/NavigationRail.tsx`  
**Visibility:** `hidden md:flex` (desktop only)  
**Width:** 80px collapsed, 256px expanded  
**Position:** Fixed left side  

**Features:**
- Collapsible (click chevron to expand/collapse)
- Active state indicator (pill background)
- Icon + label when expanded
- Smooth 1500ms transition

### Mobile: Bottom Navigation

**Component:** `/components/BottomNavigation.tsx`  
**Visibility:** `md:hidden` (mobile only)  
**Position:** Fixed bottom  
**Height:** 64px  

**Features:**
- 4-5 primary items
- "More" menu for additional items
- Active state indicator
- Icon + label format

### Header Navigation

**Component:** Built into App.tsx  
**Elements:**
- Page title
- Breadcrumbs
- User profile dropdown
- Action buttons

---

## 🔄 NAVIGATION STATE FLOW

```
User Action (click nav item)
    ↓
handleNavigate(tabId) called
    ↓
setActiveTab(tabId) updates state
    ↓
App re-renders
    ↓
renderContent() checks activeTab
    ↓
Returns correct page component
    ↓
Page displays
```

---

## 🧪 TESTING NAVIGATION

### Method 1: Browser Console

```javascript
// Open browser console on your Figma preview
// Force navigation programmatically

// Go to payment links
window.location.hash = '#/links';

// Go to dashboard
window.location.hash = '#/dashboard';

// Go to a payment checkout
window.location.hash = '#/pay/PL1731878400001';
```

### Method 2: Click Testing

1. Open your app
2. Click navigation items
3. Verify correct page loads
4. Check active state highlighting

### Method 3: Deep Link Testing

1. Share link: `your-url.figma.site/#/pay/PL123`
2. Open in new tab
3. Should load payment checkout directly

---

## 🐛 COMMON NAVIGATION ISSUES

### Issue 1: Navigation Item Doesn't Work

**Problem:** Clicked nav item, nothing happens

**Solution:**
```tsx
// Check if item ID matches case in renderContent()
// Navigation item:
{ id: 'payment-links', label: 'Payment Links', icon: LinkIcon }

// renderContent must check for same ID:
if (activeTab === 'payment-links') {  // Must match exactly!
  return <PaymentLinksPage />;
}
```

### Issue 2: Wrong Page Shows

**Problem:** Clicked "Wallets", shows "Dashboard"

**Solution:**
```tsx
// Check handleNavClick mapping in NavigationRail.tsx
const handleNavClick = (itemId: string) => {
  // Make sure mapping is correct
  const targetTab = itemId === 'dashboard' ? 'admin' : itemId;
  onNavigate(targetTab);
};
```

### Issue 3: Hash URL Doesn't Work

**Problem:** `#/my-page` doesn't navigate

**Solution:**
```tsx
// Add to handleHashChange in App.tsx
if (hash.includes("my-page")) {
  setActiveTab("my-page");
  setIsStandalonePage(true);
}
```

### Issue 4: Navigation Doesn't Update Active State

**Problem:** Nav item doesn't highlight when active

**Solution:**
```tsx
// In NavigationRail.tsx, check isActive logic
const isActive = normalizedActiveTab === item.id;

// Make sure your page's activeTab value matches item.id
// Example: If item.id is 'links', activeTab should be 'links'
```

---

## 📱 MOBILE VS DESKTOP NAVIGATION

### Desktop (Navigation Rail)
- **Always visible** on left side
- **Collapsible** for more screen space
- **All menu items** visible at once
- **No "More" menu** needed

### Mobile (Bottom Navigation)
- **Fixed at bottom** of screen
- **4-5 primary items** max
- **"More" menu** for additional items
- **Icon + label** for clarity

**Responsive Breakpoint:** `md` (768px)

```tsx
// Desktop nav
<nav className="hidden md:flex">

// Mobile nav
<nav className="md:hidden">
```

---

## 🎯 BEST PRACTICES

### 1. Keep Navigation Consistent
- ✅ Same navigation structure across all pages
- ✅ Same navigation items for same user type
- ❌ Don't hide/show nav items randomly

### 2. Use Meaningful IDs
```tsx
// ✅ Good
{ id: 'payment-links', label: 'Payment Links' }

// ❌ Bad
{ id: 'pl', label: 'Payment Links' }
{ id: 'page1', label: 'Payment Links' }
```

### 3. Match IDs Everywhere
```tsx
// Navigation item ID
{ id: 'api-keys', ... }

// renderContent() check
if (activeTab === 'api-keys') {  // Must match!

// Hash route
if (hash.includes('api-keys')) {  // Must match!
```

### 4. Provide Navigation Feedback
```tsx
// Show toast after navigation
const handleNavigate = (tab: string) => {
  setActiveTab(tab);
  toast('Navigated to ' + getPageTitle(tab));
};
```

### 5. Handle Invalid Routes
```tsx
// In renderContent()
if (activeTab === 'non-existent-page') {
  return <NotFoundPage />;
}

// Or redirect to safe page
useEffect(() => {
  const validPages = ['admin', 'links', 'wallets', /* ... */];
  if (!validPages.includes(activeTab)) {
    setActiveTab('admin'); // Redirect to dashboard
    toast.error('Page not found');
  }
}, [activeTab]);
```

---

## 🚀 QUICK REFERENCE

### Common Navigation Commands

```tsx
// Go to dashboard
setActiveTab('admin');

// Go to payment links
setActiveTab('links');

// Go to wallets
setActiveTab('wallets');

// Go to end user dashboard
setActiveTab('user-dashboard');

// Go to checkout
setActiveTab('checkout');

// Using URL hash
window.location.hash = '#/pay/PL123';
window.location.hash = '#/quickstart';
```

### Navigation Components

| Component | Location | Purpose |
|-----------|----------|---------|
| NavigationRail | `/components/NavigationRail.tsx` | Desktop sidebar nav |
| BottomNavigation | `/components/BottomNavigation.tsx` | Mobile bottom nav |
| handleNavigate | App.tsx line 475 | Navigation handler |
| renderContent | App.tsx | Page router |

---

## 🔮 FUTURE: React Router Migration

**Currently:** State-based navigation (simple, lightweight)  
**Future Option:** React Router (more features)

**If you need:**
- Browser back/forward buttons to work
- More complex routing (nested routes)
- Route parameters (e.g., `/payment/:id`)
- Route guards/protection
- Better SEO (URL-based routing)

**Then consider migrating to React Router:**

```tsx
// Future React Router setup
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/links" element={<PaymentLinksPage />} />
    <Route path="/wallets" element={<WalletsPage />} />
    <Route path="/pay/:id" element={<CheckoutPage />} />
  </Routes>
</BrowserRouter>
```

**For now:** Current system works great for MVP! ✅

---

## ❓ FAQ

**Q: Can I use normal HTML links (`<a href>`) for navigation?**  
A: No, use `onClick={() => setActiveTab('page-name')}` instead. HTML links would cause page reload.

**Q: How do I make browser back button work?**  
A: Current system uses hash routing, so back button works for hash changes. For full browser history, migrate to React Router.

**Q: Can I have nested routes (e.g., `/settings/profile`)?**  
A: Not with current system. You can simulate with `activeTab === 'settings-profile'`, or migrate to React Router.

**Q: How do I prevent users from accessing certain pages?**  
A: Add conditional logic in renderContent():
```tsx
if (activeTab === 'admin' && !isAdmin) {
  return <UnauthorizedPage />;
}
```

**Q: Can I open a page in a new tab?**  
A: Yes, using hash URLs:
```tsx
window.open(`${window.location.origin}/#/pay/${paymentId}`, '_blank');
```

---

**Need help with navigation?** Check this guide or ask! 🚀
