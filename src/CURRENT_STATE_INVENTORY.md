# PYMSTR App.tsx - Current State Inventory
**Date:** 2025-11-12  
**Purpose:** Factual documentation of what currently exists in the codebase  
**Status:** BASELINE - To be reviewed and corrected with user guidance

---

## 1. STATE VARIABLES (App.tsx Root Level)

### 1.1 Navigation & View States
- `activeTab` - Primary app navigation ("admin", "links", "wallet", "reports", etc.)
- `isStandalonePage` - Controls standalone documentation page rendering
- `isMobileMenuOpen` - **HAS NO CORRESPONDING MENU/DRAWER** ⚠️

### 1.2 Theme & UI States
- `theme` - Dark/light mode ("dark" | "light")
- `isNavRailExpanded` - Desktop navigation rail expansion state
- `showCopyTooltip` - Copy feedback tooltip display

### 1.3 Checkout Flow States (17 states)
- `showPaymentForm` - Payment form visibility
- `showWeb3Auth` - Web3 authentication modal
- `selectedCrypto` - Selected cryptocurrency
- `selectedChain` - Selected blockchain network
- `paymentStatus` - Payment status ("pending", "completed", etc.)
- `isConnecting` - Wallet connection loading state
- `connectedWallet` - Connected wallet identifier
- `walletAddress` - User wallet address
- `showCryptoSelection` - Crypto selection modal
- `showFundingOptions` - Funding options modal
- `fundingMethod` - Selected funding method
- `showFundingSuccess` - Funding success modal
- `showQRFunding` - QR code funding modal
- `qrFundingBalance` - QR funding balance amount
- `isCheckingFunds` - Funds check loading state
- `checkFundsClickCount` - Funds check click counter
- `showOnRamper` - OnRamper modal visibility

### 1.4 Payment Links States (8 states)
- `paymentLinks` - Array of payment link objects (INITIAL_PAYMENT_LINKS)
- `paymentLinksTab` - Tab filter ("all", "manual", "api")
- `chainFilter` - Chain filter ("all", "ethereum", "polygon", etc.)
- `currencyFilter` - Currency filter ("all", "USDC", "USDT", "EURC")
- `searchQuery` - Payment links search query
- `reportsSearchQuery` - Reports section search query
- `currentPayment` - Current payment object being processed
- `showPaymentLinkDialog` - Payment link creation dialog visibility
- `paymentLinksRef` - Ref for payment links (used in hash routing)

### 1.5 Wallet Management States (10 states)
- `wallets` - Array of wallet objects (INITIAL_WALLETS)
- `editingWallet` - Wallet being edited
- `showCreateWallet` - Create wallet modal
- `selectedWalletId` - Selected wallet ID
- `walletAction` - Action type ("deposit", "send", "transfer")
- `actionAmount` - Action amount input
- `actionCrypto` - Action cryptocurrency
- `actionChain` - Action blockchain
- `sendType` - Send type ("internal", "external")
- `externalAddress` - External wallet address
- `targetWalletId` - Target wallet for internal transfers

### 1.6 Team Management States (5 states)
- `teamMembers` - Array of team member objects (INITIAL_TEAM_MEMBERS)
- `showAddMember` - Add member modal
- `newMember` - New member form data (INITIAL_NEW_MEMBER)
- `showDeleteConfirm` - Delete confirmation dialog
- `memberToDelete` - Member pending deletion

### 1.7 API Key States (6 states)
- `apiKeys` - Array of API key objects (INITIAL_API_KEYS)
- `showCreateApiKey` - Create API key modal
- `selectedApiKey` - Selected API key ID
- `newApiKey` - New API key form data (INITIAL_NEW_API_KEY)
- `showApiKeySecret` - API key secret visibility
- `apiKeyDetailsTab` - API key details tab ("info", "usage", etc.)

### 1.8 Merchant Config State
- `merchantConfig` - Merchant configuration object (INITIAL_MERCHANT_CONFIG)

---

## 2. MAJOR COMPONENTS IN APP.TSX

### 2.1 Admin Section Components (Inline)
All these are defined as inline components inside App.tsx:

1. **AdminDashboard** (Line 952)
   - Dashboard stats cards (4 cards)
   - Recent transactions table (desktop) / cards (mobile)
   - Mobile FAB for "Create Payment Link" at `bottom-24 right-6`
   - Uses PageLayout wrapper

2. **ReportsAndAnalytics** (Line 1404)
   - Chart cards (2 columns)
   - Transaction history table (desktop) / cards (mobile)
   - Search functionality (uses `reportsSearchQuery`)
   - Uses PageLayout wrapper

3. **WalletManagement** (Line 1670)
   - Main wallet balance display
   - Currency selection (USDC, USDT, EURC)
   - Deposit/Send/Transfer flows
   - ManageCoin component integration (desktop inline, mobile sheet)
   - Network-specific balance breakdown
   - QR code generation for deposits
   - Uses PageLayout wrapper

4. **TeamManagement** (Line 2172)
   - Team members list
   - Add member functionality
   - Role management
   - Delete confirmation
   - Uses PageLayout wrapper

5. **APIConfiguration** (Line 2368)
   - Wrapper that renders APIKeyManagement component (imported from `/components/APIKeyManagement`)

### 2.2 User Section Components (Inline)

1. **UserLogin** (Line 3161)
   - Web3Auth login gate
   - Social login options (Google, Twitter, Email, MetaMask)
   - Login loading state
   - Sets `isUserLoggedIn` state **⚠️ BUT THIS STATE IS NOT DECLARED IN ROOT ⚠️**

2. **UserDashboard** (Line 3294)
   - User wallet overview
   - Transaction history
   - Settings section
   - Uses `userActiveSection` state (declared locally)
   - Desktop: Horizontal tab navigation
   - Mobile: Bottom navigation bar (3 tabs: Wallet, Transactions, Settings)
   - Fixed mobile header with logo, title, theme toggle, avatar

### 2.3 Checkout Flow Component (Inline)

1. **CustomerCheckout** (Line 2530)
   - Payment form for end users
   - Crypto/chain selection
   - Web3 wallet connection
   - Funding options
   - OnRamper integration
   - References `currencyVariant` state **⚠️ THIS STATE IS NOT DECLARED ⚠️**

---

## 3. EXTERNAL COMPONENTS (Imported)

### 3.1 From `/components`
- `PaymentLinkForm` - Payment link creation form
- `APIKeyManagement` - API key management interface
- `WebhookManagement` - Webhook configuration
- `QuickStartGuide` - Quick start documentation
- `APIReference` - API reference docs
- `CodeExamples` - Code examples page
- `MerchantSettings` - Merchant payment settings
- `MerchantProfile` - Merchant profile settings
- `SecuritySettings` - Security configuration
- `BottomNavigation` - **IMPORTED BUT NEVER USED** ⚠️
- `NavigationRail` - Desktop left sidebar navigation
- `PaymentLinksDashboard` - Payment links management page
- `PageLayout` - Layout wrapper with header/content sections
- `WalletMainActionButton` - Wallet action button component
- `NetworkSelector` - Network selection component
- `CryptoSelector` - Cryptocurrency selection component
- `ManageCoin` - Coin management modal/sheet

### 3.2 From `/pages`
- `QuickStartPage` - Standalone quick start page
- `APIReferencePage` - Standalone API reference page
- `CodeExamplesPage` - Standalone code examples page
- `DocumentsPage` - Documentation hub page

---

## 4. NAVIGATION ARCHITECTURE

### 4.1 Desktop Navigation (Admin)
- **Component:** `NavigationRail` (imported from `/components/NavigationRail`)
- **Position:** Fixed left sidebar
- **Behavior:** Expands/collapses on hover (80px → 240px)
- **State:** `isNavRailExpanded`
- **Items:** Dashboard, Links, Wallet, Reports, API, Team, Settings (assumed based on activeTab values)
- **Visibility:** Hidden on checkout and user dashboard pages

### 4.2 Mobile Navigation (Admin)
- **Component:** Hamburger menu button in header
- **State:** `isMobileMenuOpen`
- **Problem:** **NO DRAWER/SHEET EXISTS - BUTTON DOES NOTHING** ⚠️
- **Mobile FAB:** Present on Dashboard (line 1379) - `fixed bottom-24 right-6`, navigates to Payment Links

### 4.3 Desktop Navigation (User Dashboard)
- **Component:** Horizontal tab navigation (inline in UserDashboard)
- **Tabs:** Overview, Wallet, Transactions (desktop only, hidden on mobile)
- **State:** `userActiveSection` (local state in UserDashboard)

### 4.4 Mobile Navigation (User Dashboard)
- **Component:** Fixed bottom navigation bar (line 4102)
- **Position:** `fixed bottom-0 left-0 right-0`
- **Tabs:** Wallet, Transactions, Settings (3 tabs)
- **State:** `userActiveSection` (local state in UserDashboard)
- **Styling:** Cyan active state (`#07D7FF/12`), gray inactive

### 4.5 Mobile Header (Admin)
- **Position:** Sticky top header
- **Layout:** 
  - Left: Hamburger menu button (☰) **⚠️ NON-FUNCTIONAL**
  - Center: Page title (dynamic based on activeTab)
  - Right: Theme toggle button (Sun/Moon icon), Avatar dropdown
- **Avatar Dropdown Items:**
  - Profile
  - Settings
  - End User View (switches to userdashboard)
  - Logout

---

## 5. LAYOUT PATTERNS

### 5.1 Desktop Layout (Admin)
- Navigation rail (left, 80px collapsed / 240px expanded)
- Main content area with left margin (`md:ml-20` or `md:ml-[240px]`)
- Top header with page title, theme toggle, avatar
- Content padding: `p-4 md:p-6`

### 5.2 Mobile Layout (Admin)
- No navigation rail
- Sticky top header with hamburger (non-functional), title, controls
- Main content area
- Mobile FAB on Dashboard page only (`bottom-24 right-6`)
- No bottom navigation bar for admin **⚠️**

### 5.3 Desktop Layout (User Dashboard)
- No navigation rail
- Fixed top header (PYMSTR logo, desktop tab nav, theme toggle, avatar dropdown)
- Main content area
- No bottom navigation

### 5.4 Mobile Layout (User Dashboard)
- Fixed top header (PYMSTR logo, title, theme toggle, avatar)
- Main content area with padding (`pt-24` for header clearance, `pb-28` for bottom nav clearance)
- Fixed bottom navigation bar (3 tabs)

### 5.5 Responsive Patterns
- Tables → Cards: Desktop shows tables (`hidden md:block`), mobile shows cards (`md:hidden`)
- Navigation: Desktop uses rail/tabs, mobile uses bottom nav (user) or FAB (admin)
- Dialogs → Sheets: Desktop uses dialogs, mobile uses bottom sheets
- Content width: `max-w-7xl mx-auto` for most sections

---

## 6. HASH ROUTING SYSTEM

### 6.1 Payment Links
- Pattern: `#/pay/{paymentId}`
- Handler: `handleHashChange` useEffect (line 257)
- Logic:
  - Finds payment link by ID
  - If active: Sets currentPayment, switches to "checkout" tab
  - If completed: Shows "already used" toast
  - If not found: Shows "not found" toast

### 6.2 Documentation Pages
- `#/quickstart` → QuickStartPage (standalone)
- `#/api-reference` or `#/apireference` → APIReferencePage (standalone)
- `#/code-example` → CodeExamplesPage (standalone)
- Sets `isStandalonePage` to true (bypasses main app navigation)

---

## 7. KEY BUSINESS LOGIC FLOWS

### 7.1 Payment Link Creation
- Function: Unknown (likely in PaymentLinksDashboard component)
- Form: PaymentLinkForm component
- States: paymentLinks, showPaymentLinkDialog
- Filtering: paymentLinksTab, chainFilter, currencyFilter, searchQuery

### 7.2 Payment Link Completion
- Triggered by hash routing (`#/pay/{id}`)
- Single-use enforcement
- Status update: active → completed
- Stores txHash (no transaction IDs)

### 7.3 Wallet Actions
- Deposit: Generates QR code, shows deposit address
- Send: External send to address
- Transfer: Internal transfer between wallets
- States: walletAction, actionAmount, actionCrypto, actionChain, sendType

### 7.4 Team Management
- Add member: handleAddTeamMember (line 849)
- Remove member: handleRemoveTeamMember (line 873)
- Update role: handleUpdateMemberRole (line 890)
- Toggle status: handleToggleMemberStatus (line 900)

### 7.5 API Key Management
- Create key: handleCreateApiKey
- Update key: handleUpdateApiKey
- Delete key: handleDeleteApiKey (line 946)

---

## 8. DEAD CODE / ISSUES IDENTIFIED

### 8.1 Non-Functional Elements
1. **Hamburger Menu Button** (line 4268)
   - State: `isMobileMenuOpen`
   - Problem: No drawer/sheet component exists
   - User clicks button, nothing happens

2. **BottomNavigation Component**
   - Imported on line 167
   - Never used in JSX
   - Dead import

3. **isUserLoggedIn & userLoginMethod States**
   - Used in UserLogin component (line 3170, 3426)
   - Referenced in renderContent (line 4224)
   - **NOT DECLARED AT ROOT LEVEL** ⚠️
   - This is a critical bug

4. **currencyVariant Reference**
   - Used in CustomerCheckout (line 2533)
   - **NOT DECLARED ANYWHERE** ⚠️
   - This will cause runtime errors

### 8.2 Inconsistent Navigation
1. Admin mobile: Has hamburger (non-functional), no bottom nav, has FAB
2. User mobile: No hamburger, has bottom nav, no FAB
3. Desktop admin: Has navigation rail
4. Desktop user: Has horizontal tabs, no navigation rail

### 8.3 Missing States (Referenced but not declared)
- `isUserLoggedIn` - Used in UserLogin and renderContent
- `userLoginMethod` - Used in UserLogin
- `currencyVariant` - Used in CustomerCheckout

---

## 9. RENDERCONENT() SWITCH CASES

Located at line 4145, maps activeTab values to components:

| activeTab Value | Renders Component | Source |
|----------------|-------------------|--------|
| "admin" | AdminDashboard | Inline |
| "links" | PaymentLinksDashboard | Imported |
| "wallet" | WalletManagement | Inline |
| "wallets" | WalletManagement | Inline (duplicate case) |
| "team" | TeamManagement | Inline |
| "reports" | ReportsAndAnalytics | Inline |
| "api" | APIConfiguration | Inline (wrapper) |
| "webhooks" | WebhookManagement | Imported |
| "quickstart" | QuickStartGuide | Imported |
| "apireference" | APIReference | Imported |
| "codeexamples" | CodeExamples | Imported |
| "documents" | DocumentsPage | Imported |
| "settings" | MerchantSettings | Imported |
| "profile" | MerchantProfile | Imported |
| "security" | SecuritySettings | Imported |
| "checkout" | CustomerCheckout | Inline |
| "userdashboard" | UserDashboard OR UserLogin | Inline (conditional) |
| default | AdminDashboard | Inline |

---

## 10. HELPER FUNCTIONS

### 10.1 CryptoIcon Component (Line 412)
- Inline component
- Renders USDC, USDT, EURC logos
- Used throughout the app

### 10.2 Utility Functions (App.tsx level)
- `handleLogout` - Resets all states
- `handlePaymentLinkClick` - Navigates to payment link
- `handleDeleteLink` - Deletes payment link
- `handleDeactivateLink` - Deactivates payment link
- `copyToClipboard` - Copies text to clipboard with toast feedback
- `handleAddTeamMember` - Adds team member
- `handleRemoveTeamMember` - Removes team member
- `handleUpdateMemberRole` - Updates member role
- `handleToggleMemberStatus` - Toggles member active/inactive
- `handleCreateApiKey` - Creates new API key
- `handleUpdateApiKey` - Updates API key
- `handleDeleteApiKey` - Deletes API key

### 10.3 WalletManagement Local Functions
- `getNetworkIcon` - Returns network logo
- `getNetworkName` - Returns network display name
- `getCryptoName` - Returns crypto full name
- `selectCurrency` - Handles currency selection and QR generation

### 10.4 UserDashboard Local Functions
- `getTotalBalance` - Calculates total user balance
- `getTotalSpent` - Calculates total spent from transactions
- `getActiveChainCount` - Counts active chains with balance
- `handleUserLogout` - User logout (sets undeclared state)
- `getNetworkIcon`, `getNetworkName`, `getCryptoName` - Same as WalletManagement (duplicated)
- `selectCurrency` - Currency selection with QR generation

---

## 11. MOCK DATA CONSTANTS

Imported from `/constants/mockData`:
- `INITIAL_PAYMENT_LINKS` - Payment links array
- `INITIAL_WALLETS` - Wallets array
- `INITIAL_TEAM_MEMBERS` - Team members array
- `INITIAL_API_KEYS` - API keys array
- `DASHBOARD_STATS` - Dashboard statistics
- `RECENT_TRANSACTIONS` - Recent transactions data
- `CHART_DATA` - Chart data for analytics
- `INITIAL_MERCHANT_CONFIG` - Merchant configuration
- `INITIAL_NEW_MEMBER` - New member form initial values
- `INITIAL_NEW_API_KEY` - New API key form initial values

---

## 12. MATERIAL DESIGN 3 COMPLIANCE STATUS

### ✅ Compliant Areas
- Border radius: Cards use `rounded-2xl` (16px), buttons use `rounded-full`
- Elevation: Cards use `shadow-sm`, dialogs likely use higher levels
- Spacing: Grid system in use (px-4, py-6, etc.)
- Touch targets: Buttons appear to use `min-h-12` on mobile
- Icons: Mix of sizes (w-4, w-5, w-6)

### ⚠️ Needs Verification
- Icon sizes: Need to verify 18dp standard usage
- Transition speeds: Need to check 200ms vs 1500ms compliance
- Input field radius: Need to check for `rounded` (4px) compliance
- State layer opacity: Need to verify 8%/12%/16% usage
- Typography: Need to check for manual font-size/weight overrides

---

## 13. CRITICAL BUGS TO FIX

### Priority 1 (App Breaking)
1. **Missing State Declarations:**
   - `isUserLoggedIn` - Used but not declared
   - `userLoginMethod` - Used but not declared
   - `currencyVariant` - Used but not declared

2. **Non-Functional Hamburger Menu:**
   - Button exists, sets `isMobileMenuOpen` state
   - No drawer/sheet component to open
   - User expectation: Menu should open on mobile

### Priority 2 (UX Issues)
3. **Inconsistent Mobile Navigation:**
   - Admin: Hamburger (broken) + FAB (works)
   - User: Bottom nav (works)
   - Need unified approach

4. **Dead Import:**
   - BottomNavigation imported but never used

### Priority 3 (Code Quality)
5. **Duplicate Functions:**
   - getNetworkIcon, getNetworkName, getCryptoName duplicated in WalletManagement and UserDashboard

6. **Duplicate Switch Case:**
   - "wallet" and "wallets" both render WalletManagement

---

## 14. QUESTIONS FOR USER

1. **Mobile Admin Navigation:** What should happen when user clicks hamburger menu?
   - Should it open a drawer with navigation items?
   - Should we use bottom navigation instead?
   - Should FAB remain?

2. **User Dashboard Bottom Nav:** Current has 3 tabs (Wallet, Transactions, Settings). Image showed Dashboard, Wallets, Reports, More. Which is correct?

3. **Missing States:** How should we handle isUserLoggedIn, userLoginMethod, currencyVariant?
   - Add them to root state?
   - Remove the features that use them?

4. **Logo in Mobile Header:** Should PYMSTR logo appear in admin mobile header, or just hamburger + title?

5. **Bottom Navigation Component:** Should we use the imported BottomNavigation component or the inline one in UserDashboard?

---

**END OF CURRENT STATE INVENTORY**

This document represents the ACTUAL state of the code as of 2025-11-12.
Next step: Walk through each section with user to correct and establish the desired "Source of Truth".
