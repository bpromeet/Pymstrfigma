# PYMSTR Design System Guidelines

**Design Philosophy:** PYMSTR follows Material Design 3 (Material You) principles with full compliance to MD3 specifications. This system combines MD3's structured approach to color, elevation, motion, and typography with PYMSTR's unique navy-cyan-magenta palette and Web3-focused brand identity.

## ⚠️ IMPORTANT: Layout Bug Prevention

**MANDATORY: Before creating ANY component, page, or layout:**
1. **Consult `/guidelines/MOBILE_LAYOUT_RULES.md`** - Complete mobile layout & overflow prevention guide
2. **Check `/LAYOUT_CHECKLIST.md`** - Critical rules for navigation rail, content overflow, responsive breakpoints

**Common mistakes to avoid:**
- Missing `mx-auto` on containers with `max-w-*`
- Static padding when nav rail expands/collapses
- Missing `min-w-0` and `truncate` on flex children
- Using fixed widths instead of responsive utilities
- Wrong transition speeds (200ms for buttons, 1500ms for layouts)
- **No text truncation** → causes mobile overflow
- **No explicit text colors** → invisible text in buttons/cards
- **Fixed button widths** → breaks mobile layout

## MD3 Compliance Overview

PYMSTR achieves **100% Material Design 3 compliance** across all components:

### ✅ Fully Compliant Components

**Buttons (MD3 20dp Pill Radius):**
- All button variants use `rounded-full` - This is the MD3 standard (20dp radius)
- Filled, Outlined, Text, Tonal, and Elevated buttons follow MD3 specifications
- FABs use perfect circles (`rounded-full`) - MD3 standard

**Input Fields (MD3 4dp Radius):**
- Outlined inputs use `rounded` (4px - MD3 Extra Small radius)
- Filled inputs use `rounded-t` (4px top, square bottom - MD3 standard)
- **No pill-shaped inputs** - Pure MD3 compliance

**Cards & Containers:**
- Main cards: `rounded-2xl` (16px - MD3 Large radius)
- Nested sections: `rounded-xl` (12px - MD3 Medium radius)
- Small boxes: `rounded-lg` (8px - MD3 Small radius)

**Dialogs & Menus:**
- Dialogs: `rounded-3xl` (24px - MD3 Extra Large ~28dp)
- Dropdowns: `rounded-xl` (12px - MD3 Medium radius)

**All Other Components:**
- State layers (8%, 12%, 16% opacity)
- Elevation system (Levels 0-5 with MD3 shadows)
- Typography scale (MD3 type roles)
- Motion & easing (MD3 curves)
- 48dp touch targets (MD3 accessibility)
- Color roles (Primary, Secondary, Tertiary, Surface, Error)

### 🎨 PYMSTR Brand Identity

While fully MD3-compliant, PYMSTR maintains unique identity through:
- Navy-cyan-magenta color palette mapped to MD3 roles
- Solid colors (no gradients) for clean Web3 aesthetic
- Custom FAB scale animations
- Web3 payment processor terminology and flows

---

## Layout Architecture (Universal Pattern)

**CRITICAL: PYMSTR uses ONE unified layout pattern for both merchants and end users.**

**⚠️ MANDATORY PAGE STRUCTURE:**
All pages MUST use the `PageLayout` compound component pattern:
- `<PageLayout>` → Root container
- `<PageLayout.Header>` → Icon, title, subtitle, action button
- `<PageLayout.Content>` → Main content area

**DO NOT** use `title` and `subtitle` as direct props on `<PageLayout>`! This is wrong and will not work.

### Universal Navigation Pattern

All users (merchants and end users) experience the **same layout structure**:

**Desktop Layout:**
* **Navigation Rail** (left side, collapsible)
  * Width: 80px collapsed, 256px expanded
  * Contains navigation menu items
  * Toggle button to expand/collapse
  * Logo at top
  * User avatar/profile at bottom
  
* **Top App Bar** (header)
  * Page title and breadcrumbs
  * Action buttons (right-aligned)
  * Search (if applicable)
  
* **Main Content Area**
  * Page content with appropriate padding
  * Responsive max-width containers
  * Follows MD3 grid system

**Mobile Layout:**
* **Top App Bar** (sticky header)
  * Back button (left)
  * Page title (center)
  * Actions (right)
  
* **Main Content Area**
  * Scrollable content
  * Mobile-optimized padding
  
* **Bottom Navigation Bar** (sticky footer)
  * 4-5 primary navigation items
  * Active state indicators
  * Icon + label format

**Floating Action Button (FAB):**
* Primary action for the current screen
* Position: `fixed bottom-6 right-6` (or `bottom-24` if bottom nav exists)
* Mobile only (`md:hidden`)
* Desktop uses toolbar buttons instead

### Navigation Menu Differences

**The ONLY difference between merchant and end user is the navigation menu items:**

**Merchant Navigation Items:**
* Dashboard
* Payment Links
* Wallets
* Reports
* API Keys
* Webhooks
* Team
* Documents (Quick Start, API Reference, Code Examples)
* Settings
* Help
* Legal

**End User Navigation Items:**
* Dashboard
* Wallets
* Transactions
* Settings
* Help
* Legal

**Everything else is identical:**
* Same navigation rail component
* Same top app bar component
* Same content area structure
* Same responsive behavior
* Same mobile bottom navigation component
* Same FAB patterns
* Same page layout wrapper (`PageLayout.tsx`)

### Implementation Guidelines

**DO:**
* ✅ Use `PageLayout` component for ALL pages (merchant and end user)
* ✅ Use `NavigationRail` component for ALL desktop navigation
* ✅ Use `BottomNavigation` component for ALL mobile navigation
* ✅ Pass different `menuItems` prop based on user type
* ✅ Share all layout components between merchant and end user
* ✅ Apply same responsive breakpoints for both user types
* ✅ Use same padding, spacing, and grid system

**DON'T:**
* ❌ Create separate layout components for merchant vs end user
* ❌ Use different navigation patterns for different user types
* ❌ Apply different responsive behavior based on user type
* ❌ Create "standalone" page layouts that bypass the unified pattern
* ❌ Use simple back button headers instead of full navigation (exception: checkout flow only)

### Page Layout Example

```tsx
// ✅ CORRECT: Unified layout for both merchant and end user
import { PageLayout } from '../components/PageLayout';
import { Scale } from 'lucide-react';

export const LegalPage = () => {
  return (
    <PageLayout>
      <PageLayout.Header
        icon={<Scale className="w-6 h-6 text-[#07D7FF]" />}
        title="Legal"
        subtitle="Terms, privacy, and policies"
      />
      <PageLayout.Content>
        {/* Page content - cards, tabs, forms, etc. */}
      </PageLayout.Content>
    </PageLayout>
  );
};

// ❌ WRONG: Standalone layout bypassing navigation
export const LegalPage = () => {
  return (
    <div className="min-h-screen p-4">
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>Legal</h1>
      {/* This breaks the unified pattern */}
    </div>
  );
};
```

### Layout Wrapper Component

All pages MUST use the `PageLayout` component located at `/components/PageLayout.tsx`:

**⚠️ CRITICAL: PageLayout uses a compound component pattern. Do NOT use title/subtitle as direct props!**

```tsx
import { PageLayout } from '../components/PageLayout';
import { IconName } from 'lucide-react';

<PageLayout>
  <PageLayout.Header
    icon={<IconName className="w-6 h-6 text-[#07D7FF]" />}  // Required: Page icon
    title="Page Title"                                        // Required: Page title
    subtitle="Page description"                               // Optional: Subtitle
    action={<Button>Action</Button>}                          // Optional: Right-aligned action button
  />
  <PageLayout.Content>
    {/* Your page content here */}
    {/* Use Cards, Tabs, Forms, etc. */}
  </PageLayout.Content>
</PageLayout>
```

**PageLayout Component Structure:**
* **`PageLayout`** (root): Provides page background (white light / #0A0A0A dark)
* **`PageLayout.Header`**: Consistent header with icon, title, subtitle, and optional action button
* **`PageLayout.Content`**: Main content area with consistent padding and max-width (1280px)

The `PageLayout` component automatically handles:
* Navigation rail integration
* Responsive padding based on rail state
* Mobile bottom navigation spacing
* Top app bar with title/subtitle
* Action button positioning
* Content area max-width and centering

### User Type Detection

The app detects user type and shows appropriate navigation items:

```tsx
// In App.tsx or navigation components
const userType = getUserType(); // 'merchant' | 'enduser'

const menuItems = userType === 'merchant' 
  ? merchantNavigationItems 
  : endUserNavigationItems;

<NavigationRail menuItems={menuItems} />
<BottomNavigation menuItems={menuItems} />
```

### Summary

**Key Principle: One Layout, Different Menu Items**

* Same design system → Same components → Same layout → Different navigation menu items
* Merchants and end users share 100% of layout code
* Only difference: Which menu items appear in NavigationRail and BottomNavigation
* Maintains unified PYMSTR brand experience across all user types
* Simpler to maintain, consistent UX, better code reuse

---

## Material Design 3 Foundation

### Color System (MD3 Roles)

PYMSTR's color palette is mapped to Material Design 3 semantic roles for consistency and accessibility.

#### Primary Color Role
* **Primary (Light Mode)**: `#1E88E5` (Blue 600)
  * Main brand color for primary actions
  * High-emphasis buttons, active states
  * Used for: Create actions, primary CTAs, active navigation
  
* **Primary (Dark Mode)**: `#1E88E5` (Blue 600)
  * Maintains same color for brand consistency
  
* **On-Primary**: `#FFFFFF` (White)
  * Text and icons on primary color backgrounds
  * Always white for maximum contrast
  
* **Primary Container (Light)**: `#E3F2FD` (Blue 50)
  * Subtle background for primary-related content
  * Used for: Outlined button hover states, selected items
  
* **Primary Container (Dark)**: `#1565C0` (Blue 800)
  * Darker variant for dark mode containers
  
* **On-Primary Container**: 
  * Light mode: `#1E88E5` (primary blue)
  * Dark mode: `#E3F2FD` (light blue)

#### Secondary Color Role
* **Secondary**: `#07D7FF` (Cyan)
  * Accent color for secondary actions
  * Used for: Links, highlights, secondary emphasis
  
* **On-Secondary**: `#FFFFFF` (White)
  * Text and icons on secondary color
  
* **Secondary Container (Light)**: `rgba(7, 215, 255, 0.12)` (Cyan 12% opacity)
  * Subtle cyan background
  
* **Secondary Container (Dark)**: `rgba(7, 215, 255, 0.16)` (Cyan 16% opacity)

#### Tertiary Color Role
* **Tertiary**: `#F90BD5` (Magenta)
  * Emphasis color for special actions
  * Used for: Accent highlights, special CTAs
  
* **On-Tertiary**: `#FFFFFF` (White)
  
* **Tertiary Container**: `rgba(249, 11, 213, 0.12)` (Magenta 12% opacity)

#### Surface Colors (MD3 Elevation Tiers)
* **Surface Level 0** (Base): 
  * Light mode: `#FFFFFF` (White)
  * Dark mode: `#0a0a0a` (Very dark/black)
  
* **Surface Level 1** (Raised):
  * Light mode: `#FFFFFF` (White)
  * Dark mode: `#303030`
  
* **Surface Level 2** (Elevated):
  * Light mode: `#FFFFFF` with elevation-1
  * Dark mode: `#43586C` (Blue-gray)
  
* **Surface Level 3** (High elevation):
  * Light mode: `#FFFFFF` with elevation-2
  * Dark mode: `#4D6275` (Lighter blue-gray)
  
* **Surface Level 4** (Highest):
  * Light mode: `#FFFFFF` with elevation-3
  * Dark mode: `#576B7D` (Lightest blue-gray)
  
* **On-Surface**: 
  * Light mode: `#1C1B1F` (Near black)
  * Dark mode: `#F6F7F9` (Light text)
  
* **On-Surface Variant**: 
  * Light mode: `#49454F` (Medium gray)
  * Dark mode: `#798A9B` (Blue-gray)

#### Error, Success, Warning (Semantic Colors)
* **Error**: `#FF5914` (PYMSTR Orange)
  * On-Error: `#FFFFFF`
  * Error Container: `rgba(255, 89, 20, 0.12)`
  
* **Success**: `#7DD069` (Green)
  * On-Success: `#FFFFFF`
  * Success Container: `rgba(125, 208, 105, 0.12)`
  
* **Warning**: `#D9C370` (Gold/Yellow)
  * On-Warning: `#2E3C49` (Dark text for contrast)
  * Warning Container: `rgba(217, 195, 112, 0.12)`

#### Neutral Colors
* **Outline (Borders)**: `#43586C` (Blue-gray)
  * Used for: Dividers, borders, separators
  
* **Outline Variant**: `#757575` (Gray)
  * Used for: Secondary borders, subtle dividers
  
* **Surface Dim**: 
  * Light mode: `#EEEEEE` (Light gray)
  * Dark mode: `#1D2E3F` (Deep navy)
  
* **Surface Bright**:
  * Light mode: `#FAFAFA`
  * Dark mode: `#303030`

#### Legacy PYMSTR Colors (Preserved)
* **Deep Navy**: `#123653` - Code blocks, deep accents
* **Unfilled Fields Text**: `#798A9B` - Placeholder text
* **Secondary Button Hover (Dark)**: `#A5ADB5` - Hover feedback

---

### State Layers (MD3 Interaction States)

Material Design 3 uses opacity-based state layers to indicate interactive states. These are applied **on top** of the base color.

#### State Layer Opacity Values

**Hover State:**
* Primary color: `8%` opacity overlay (`rgba(30, 136, 229, 0.08)`)
* Secondary color: `8%` opacity overlay
* Surface: `8%` opacity of on-surface color
* Example: Button hover adds 8% black/white overlay on base color

**Focus State:**
* Primary color: `12%` opacity overlay (`rgba(30, 136, 229, 0.12)`)
* Surface: `12%` opacity
* Use for: Keyboard focus indicators, accessible focus rings

**Pressed/Active State:**
* Primary color: `12%` opacity overlay (`rgba(30, 136, 229, 0.12)`)
* Secondary color: `12%` opacity
* Surface: `12%` opacity
* Use for: Button press, active click state

**Dragged State:**
* Primary color: `16%` opacity overlay (`rgba(30, 136, 229, 0.16)`)
* Use for: Drag-and-drop interactions

**Selected State:**
* Primary color: `12%` opacity overlay
* Use for: Selected list items, active tabs

#### PYMSTR State Layer Implementation

**For solid color buttons (Primary button):**
* Hover: Use pre-calculated darker shade `#1565C0` (equivalent to 10% black overlay)
* Pressed: `#1565C0` with slight scale `scale-[0.98]`
* Focus: Add `ring-2 ring-[#1E88E5] ring-offset-2`

**For outlined buttons:**
* Hover: Add `#E3F2FD` background (primary container)
* Pressed: Darken background to `rgba(227, 242, 253, 0.8)`
* Focus: Add `ring-2 ring-[#1E88E5]`

**For surface elements (cards, dialogs):**
* Hover: Add `bg-black/[0.04]` (light mode) or `bg-white/[0.04]` (dark mode)
* Pressed: `bg-black/[0.08]` or `bg-white/[0.08]`

**Example Implementation:**
```tsx
// MD3 State Layers on Surface
<div className="bg-[#303030] hover:bg-[#303030]/95 active:bg-[#303030]/90 transition-colors duration-200">

// MD3 State Layers on Primary Button (pre-calculated)
<button className="bg-[#1E88E5] hover:bg-[#1565C0] active:scale-[0.98] focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2">

// MD3 State Layers on Outlined Button
<button className="border border-[#1E88E5] hover:bg-[#E3F2FD] active:bg-[#E3F2FD]/80 focus:ring-2 focus:ring-[#1E88E5]">
```

---

### Elevation System (MD3 Levels)

Material Design 3 uses 6 elevation levels (0-5) to create visual hierarchy and depth. Elevation is achieved through **shadows** (light mode) and **surface tint overlays** (dark mode).

#### Elevation Levels

**Level 0 (No elevation):**
* Shadow: None
* Use for: Page backgrounds, flush surfaces
* Dark mode: Base surface color
* Classes: *(no shadow)*

**Level 1 (Low elevation - 1dp):**
* Shadow: `0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)`
* Use for: Cards, contained buttons at rest
* Dark mode: Surface + 5% white overlay
* Classes: `shadow-sm`
* Tailwind: `shadow-[0px_1px_2px_rgba(0,0,0,0.3),0px_1px_3px_1px_rgba(0,0,0,0.15)]`

**Level 2 (Medium elevation - 3dp):**
* Shadow: `0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)`
* Use for: Dialogs, dropdown menus, elevated cards
* Dark mode: Surface + 8% white overlay
* Classes: `shadow-md`
* Tailwind: `shadow-[0px_1px_2px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)]`

**Level 3 (High elevation - 6dp):**
* Shadow: `0px 1px 3px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)`
* Use for: Floating action buttons (FAB), date pickers
* Dark mode: Surface + 11% white overlay
* Classes: `shadow-lg`
* Tailwind: `shadow-[0px_1px_3px_rgba(0,0,0,0.3),0px_4px_8px_3px_rgba(0,0,0,0.15)]`

**Level 4 (Higher elevation - 8dp):**
* Shadow: `0px 2px 3px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)`
* Use for: Navigation drawers, modal dialogs
* Dark mode: Surface + 12% white overlay
* Classes: `shadow-xl`
* Tailwind: `shadow-[0px_2px_3px_rgba(0,0,0,0.3),0px_6px_10px_4px_rgba(0,0,0,0.15)]`

**Level 5 (Highest elevation - 12dp):**
* Shadow: `0px 4px 4px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)`
* Use for: Modal overlays, top-level menus
* Dark mode: Surface + 14% white overlay
* Classes: `shadow-2xl`
* Tailwind: `shadow-[0px_4px_4px_rgba(0,0,0,0.3),0px_8px_12px_6px_rgba(0,0,0,0.15)]`

#### Dark Mode Elevation (Surface Tint)

In dark mode, elevation is indicated by **lightening the surface** with white overlays:

```tsx
// Level 1 (Card)
<div className="bg-[#303030] dark:bg-[#303030] shadow-sm">

// Level 2 (Dialog)
<div className="bg-white dark:bg-[#43586C] shadow-md">

// Level 3 (FAB)
<button className="bg-[#07D7FF] shadow-lg">
```

**PYMSTR Elevation Mapping:**
* **Cards**: Level 1 (`shadow-sm`)
* **Dropdowns/Popovers**: Level 2 (`shadow-md`)
* **FABs/Action Buttons**: Level 3 (`shadow-lg`)
* **Dialogs/Modals**: Level 4 (`shadow-xl`)
* **Overlays**: Level 5 (`shadow-2xl`)

---

### Typography System (MD3 Type Scale)

Material Design 3 uses a structured type scale with specific roles. PYMSTR follows this scale but defers to `styles/globals.css` for implementation.

#### Type Scale Roles

**Display (Hero text, marketing):**
* Display Large: 57px / 64px line-height
* Display Medium: 45px / 52px line-height
* Display Small: 36px / 44px line-height
* Weight: Regular (400)
* Use for: Landing pages, hero sections

**Headline (Section headers):**
* Headline Large: 32px / 40px line-height
* Headline Medium: 28px / 36px line-height
* Headline Small: 24px / 32px line-height
* Weight: Regular (400)
* Use for: Page titles, section headers

**Title (Subsections, card headers):**
* Title Large: 22px / 28px line-height
* Title Medium: 16px / 24px line-height (500 weight)
* Title Small: 14px / 20px line-height (500 weight)
* Weight: Medium (500)
* Use for: Card titles, dialog headers, list headers

**Body (Content text):**
* Body Large: 16px / 24px line-height
* Body Medium: 14px / 20px line-height
* Body Small: 12px / 16px line-height
* Weight: Regular (400)
* Use for: Paragraphs, descriptions, general content

**Label (UI elements):**
* Label Large: 14px / 20px line-height (500 weight)
* Label Medium: 12px / 16px line-height (500 weight)
* Label Small: 11px / 16px line-height (500 weight)
* Weight: Medium (500)
* Use for: Button labels, form labels, captions

#### PYMSTR Typography Rules

**DO NOT override typography** unless explicitly requested:
* Never add: `text-2xl`, `text-lg`, `text-sm`
* Never add: `font-bold`, `font-semibold`, `font-light`
* Never add: `leading-none`, `leading-tight`

All typography is pre-configured in `styles/globals.css` following MD3 scale.

**When typography changes are needed:**
* Use semantic HTML tags (`h1`, `h2`, `h3`, `p`, `label`)
* Typography scales automatically
* For special cases, consult `styles/globals.css`

---

### Motion & Animation (MD3 Easing)

Material Design 3 defines specific easing curves for natural, responsive animations.

**PYMSTR TWO-SPEED TRANSITION SYSTEM: Fast interactions (200ms) + Smooth theme transitions (1500ms)**

PYMSTR uses a **dual-speed transition architecture** for optimal user experience:

1. **Button Interactions (200ms)**: Instant, responsive feedback for clicks, hovers, and interactive elements
2. **Theme Transitions (1500ms)**: Smooth, elegant transitions for dark/light mode and background color changes

This creates the perfect balance: **snappy interactions** + **luxurious theme switching**.

#### Speed Categories

**FAST TRANSITIONS (200ms) - Interactive Elements:**
* **Button hover states**: Background, border, text color changes
* **Button press states**: Scale effects, active states
* **Icon button interactions**: Hover, click feedback
* **FAB interactions**: Hover scale, shadow changes
* **Toggle switches**: State changes
* **Checkbox/Radio interactions**: Check/uncheck
* **Tab switching**: Active state changes
* **Dropdown menu items**: Hover states
* **List item hovers**: Background highlights
* **Tailwind**: `transition-all duration-200`

**SLOW TRANSITIONS (1500ms) - Global Theme Changes:**
* **Dark/light mode switching**: All background colors, text colors, borders
* **Navigation rail expansion**: Width, padding changes
* **Page layout shifts**: Content repositioning
* **Modal/Dialog backdrops**: Fade in/out
* **Global color scheme changes**: Entire app theme transitions
* **CSS Universal Selector**: Set in `styles/globals.css`

#### Easing Curves

**Standard Easing (Interactive - 200ms):**
* Curve: ease-out
* Duration: **200ms**
* Use for: Button hovers, clicks, interactive feedback
* Tailwind: `transition-all duration-200`

**Standard Easing (Theme - 1500ms):**
* Curve: ease-out
* Duration: **1500ms**
* Use for: Dark/light mode, background transitions
* CSS: Set globally in `globals.css`

**Emphasized Easing (Layout Changes - 1500ms):**
* Curve: cubic-bezier(0.05, 0.7, 0.1, 1.0)
* Duration: **1500ms**
* Use for: Navigation rail expansion, large layout changes
* Inline CSS: `style={{transition: 'width 1500ms ease-out'}}`

#### PYMSTR Animation Standards

**Button Interactions (ALWAYS 200ms):**
* Hover: `transition-all duration-200` (fast feedback)
* Press: `active:scale-[0.98] transition-transform duration-200`
* Focus: Instant ring appearance (no transition)
* Background changes: `transition-all duration-200`
* Border changes: `transition-all duration-200`
* Shadow changes: `transition-all duration-200`

**Theme Transitions (ALWAYS 1500ms - Global):**
* Dark/light mode: Universal selector in `globals.css`
* Background colors: Automatic 1500ms from globals
* Text colors: Automatic 1500ms from globals
* Border colors: Automatic 1500ms from globals
* All surface colors: Automatic 1500ms from globals

**Navigation & Layout (1500ms):**
* Navigation rail expansion: `transition-all duration-[1500ms]` or inline style
* Content layout shifts: `transition-all duration-[1500ms]`
* Modal backdrops: `transition: opacity 1500ms ease-out`

**FABs (200ms for interactions):**
* Hover scale: `transition-all duration-200 hover:scale-105`
* Press: `active:scale-95 transition-transform duration-200`
* Shadow: `transition-all duration-200`

**Example Implementation:**
```tsx
// ✅ CORRECT: Button with 200ms interaction (fast & snappy)
<button className="bg-[#1E88E5] hover:bg-[#1565C0] transition-all duration-200 rounded-full">
  Click Me
</button>

// ✅ CORRECT: FAB with 200ms interaction (instant feedback)
<button className="bg-[#07D7FF] hover:scale-105 active:scale-95 transition-all duration-200 rounded-full">
  <Plus className="w-6 h-6" />
</button>

// ✅ CORRECT: Navigation rail with 1500ms layout change (smooth expansion)
<nav 
  className="w-20 hover:w-64"
  style={{transition: 'width 1500ms ease-out, padding 1500ms ease-out'}}
>
  {/* Nav items */}
</nav>

// ✅ CORRECT: Theme toggle (backgrounds transition at 1500ms automatically via globals.css)
<button 
  onClick={toggleDarkMode}
  className="transition-all duration-200 rounded-full"
>
  {/* Button interaction at 200ms, background theme change at 1500ms */}
</button>

// ✅ CORRECT: Modal backdrop (1500ms fade for elegance)
<div 
  className={showModal ? 'opacity-100' : 'opacity-0'}
  style={{transition: 'opacity 1500ms ease-out'}}
/>

// ❌ WRONG: Button with slow 1500ms interaction (feels sluggish)
<button className="transition-all duration-[1500ms] hover:bg-[#1565C0]">
  Don't do this
</button>

// ❌ WRONG: FAB with slow transition (poor UX)
<button className="transition-all duration-[1500ms] hover:scale-105">
  Too slow
</button>
```

**Key Points:**
* ✅ **Always use `duration-200`** for button interactions, hovers, clicks
* ✅ **Always use `1500ms`** for navigation rail, layout changes, modal backdrops
* ✅ **Theme transitions happen automatically** at 1500ms via `globals.css` universal selector
* ✅ **Two-speed system creates perfect UX**: Fast interactions + Smooth theme changes
* ❌ **Never use `duration-[1500ms]` on buttons** - feels sluggish and unresponsive
* ❌ **Never use `duration-200` on nav rail expansion** - feels jarring and abrupt

**Implementation Strategy:**
1. **For buttons/interactions**: Always add `transition-all duration-200` inline
2. **For themes/backgrounds**: Let `globals.css` universal selector handle at 1500ms
3. **For nav rail/layouts**: Use inline styles with `1500ms` for smooth expansion
4. **For modals/backdrops**: Use inline styles with `1500ms` for elegant fades
5. **For Card components**: Built-in `duration-[1500ms]` transition in `/components/ui/card.tsx` provides smooth theme transitions automatically

**Card Component Note:**
The ShadCN Card component (`/components/ui/card.tsx`) has a built-in `transition-all duration-[1500ms]` that makes all card backgrounds, borders, and colors transition smoothly during dark/light mode changes. This creates the signature PYMSTR smooth theme transition feel. You don't need to add transitions to Cards - they're automatic!

---

### Spacing & Layout Grid (8dp/4dp Grid)

Material Design 3 uses an 8dp baseline grid for layouts and a 4dp sub-grid for fine adjustments.

#### 8dp Baseline Grid
All major layout elements align to 8px increments:
* Component heights: 32px, 40px, 48px, 56px, 64px (`h-8`, `h-10`, `h-12`, `h-14`, `h-16`)
* Margins/padding: 8px, 16px, 24px, 32px, 48px (`m-2`, `m-4`, `m-6`, `m-8`, `m-12`)
* Container spacing: 16px, 24px, 32px (`p-4`, `p-6`, `p-8`)

#### 4dp Sub-grid
Fine adjustments use 4px increments:
* Icon sizes: 16px, 20px, 24px (`w-4`, `w-5`, `w-6`)
* Small spacing: 4px, 12px, 20px (`p-1`, `p-3`, `p-5`)
* Text spacing: 4px, 8px, 12px (`space-y-1`, `space-y-2`, `space-y-3`)

#### Tailwind Spacing Scale (4px base)
* `0` = 0px
* `1` = 4px
* `2` = 8px ✓ (8dp grid)
* `3` = 12px
* `4` = 16px ✓ (8dp grid)
* `5` = 20px
* `6` = 24px ✓ (8dp grid)
* `8` = 32px ✓ (8dp grid)
* `10` = 40px ✓ (8dp grid)
* `12` = 48px ✓ (8dp grid)
* `16` = 64px ✓ (8dp grid)

**PYMSTR Grid Rules:**
* All button heights: Multiples of 8px
* All component padding: Prefer 4px/8px/16px/24px
* All margins: Prefer 8px/16px/24px/32px
* Icon sizes: 16px/20px/24px (4dp sub-grid)

---

### Touch Targets (MD3 Accessibility)

Material Design 3 mandates **minimum 48dp (48px) touch targets** for all interactive elements.

#### Minimum Touch Targets
* **All buttons**: 48px × 48px minimum (`min-h-12`)
* **Icon buttons**: 48px × 48px (`w-12 h-12`)
* **List items**: 48px minimum height
* **FABs**: 56px × 56px (`w-14 h-14`) or larger
* **Switches/checkboxes**: 48px minimum hit area

#### PYMSTR Touch Target Implementation
* **Mobile**: Always enforce 48px minimum (`min-h-12`)
* **Desktop**: Can use 40px (`min-h-10`) for compact UIs
* **Responsive**: Use `min-h-12 sm:min-h-10` to adapt

```tsx
// Mobile-first touch target (48px → 40px on desktop)
<button className="px-6 py-2.5 min-h-12 sm:min-h-10 rounded-full">
  Save
</button>

// Always 48px (primary actions)
<button className="px-8 py-3 min-h-12 rounded-full">
  Create
</button>
```

---

## Border Radius (MD3 + PYMSTR)

PYMSTR follows Material Design 3 border radius specifications while maintaining pill-shaped aesthetics for interactive elements.

### MD3 Border Radius Scale

**MD3 Radius Values:**
* **None**: 0dp (0px) - `rounded-none`
* **Extra Small**: 4dp (4px) - `rounded` - Text field corners
* **Small**: 8dp (8px) - `rounded-lg` - Chips, small containers
* **Medium**: 12dp (12px) - `rounded-xl` - Dropdowns, nested cards, tabs
* **Large**: 16dp (16px) - `rounded-2xl` - Main cards, sheets
* **Extra Large**: 28dp (~24px) - `rounded-3xl` - Dialogs, modals
* **Full**: 9999px - `rounded-full` - Pills, FABs, circular buttons

### PYMSTR Border Radius System

**Interactive Elements (MD3 Pill-Shaped Buttons):**
* **Buttons**: `rounded-full` - All button variants use MD3 pill shape (20dp radius standard)
* **Badges**: `rounded-full` - Status badges, count badges
* **Icon buttons / FABs**: `rounded-full` - Perfect circles (MD3 standard)
* **Chips/Tags**: `rounded-full` - Interactive chips

**Input Fields (MD3 Standard - Small Radius):**
* **Outlined Text Fields**: `rounded` (4px - MD3 Extra Small radius)
  * Standard MD3 outlined input with small corner radius
  * Use for: All text inputs, search fields, form fields
  
* **Filled Text Fields**: `rounded-t` (4px top corners, square bottom)
  * Standard MD3 filled input with rounded top, square bottom
  * Use for: Alternative input style, dense forms

**Containers & Surfaces (MD3 Standard):**
* **Main Cards**: `rounded-2xl` (16px) - MD3 Large radius
  * Use for: Primary cards, elevated cards, content containers
  
* **Nested Sections**: `rounded-xl` (12px) - MD3 Medium radius
  * Use for: Inner cards, tabs, list items, card sections
  
* **Small Boxes**: `rounded-lg` (8px) - MD3 Small radius
  * Use for: Compact containers, inline boxes, code blocks
  
* **Dialogs**: `rounded-3xl` (24px) - MD3 Extra Large radius
  * Use for: Modal dialogs, alert dialogs, bottom sheets
  
* **Dropdown Menus**: `rounded-xl` (12px) - MD3 Medium radius
  * Use for: Dropdowns, popovers, context menus, select menus
  
* **Data Tables**: `rounded-lg` (8px) - MD3 Small radius
  * Use for: Table containers, data grids

**Special Cases:**
* **Filled Text Fields (MD3 Standard)**: `rounded-t-2xl` (top corners only) - For standard MD3 filled inputs
* **Bottom Sheets**: `rounded-t-3xl` (top corners only) - For mobile bottom sheets
* **Navigation Drawers**: `rounded-r-2xl` or `rounded-l-2xl` (one side only) - For side navigation

### Border Radius Quick Reference

```tsx
// Buttons & Interactive (MD3 Pill-Shaped)
<button className="rounded-full">     // All buttons (MD3 20dp standard)
<span className="rounded-full">        // Badges, chips, FABs

// Input Fields (MD3 Standard)
<input className="rounded">            // Outlined inputs (4px - Extra Small)
<input className="rounded-t">          // Filled inputs (4px top only)

// Cards & Containers (MD3)
<div className="rounded-2xl">          // Main cards (16px - Large)
<div className="rounded-xl">           // Nested sections (12px - Medium)
<div className="rounded-lg">           // Small boxes (8px - Small)

// Dialogs & Menus (MD3)
<dialog className="rounded-3xl">       // Dialogs (24px - Extra Large)
<div className="rounded-xl">           // Dropdown menus (12px - Medium)
<div className="rounded-lg">           // Tooltips (8px - Small)
```

### Implementation Notes

* **Buttons must always use `rounded-full`** - MD3 standard for buttons (20dp pill shape)
* **Input fields use `rounded`** (4px) - MD3 Extra Small radius for outlined text fields
* **Input fields (filled) use `rounded-t`** (4px top) - MD3 standard filled variant
* **Cards should use `rounded-2xl`** for main containers - MD3 Large radius
* **Nested content uses `rounded-xl`** - MD3 Medium radius for hierarchy
* **Never mix border radius within same component level** - Maintain visual consistency
* **Dialogs use `rounded-3xl`** - Highest container radius for emphasis
* **Dropdowns and menus use `rounded-xl`** - Medium radius for floating elements

This system creates a clear visual hierarchy:
1. **Full radius** (`rounded-full`) - Buttons, FABs, badges, chips (MD3 pill/circular)
2. **Extra Large** (`rounded-3xl` 24px) - Modal dialogs, critical surfaces
3. **Large** (`rounded-2xl` 16px) - Main cards, primary containers
4. **Medium** (`rounded-xl` 12px) - Nested sections, dropdowns, tabs
5. **Small** (`rounded-lg` 8px) - Compact boxes, data tables, code blocks
6. **Extra Small** (`rounded` 4px) - Input fields (MD3 standard text field radius)

---

## Buttons (MD3 + PYMSTR Pill-Shaped)

PYMSTR uses a comprehensive button system following Material Design 3 button variants with pill-shaped styling.

### Design Principles

**Baseline Grid Alignment:**
* All button components align to an **8px baseline grid** (8, 16, 24, 32, 40, 48, 56, 64px, etc.)
* Icons and text within buttons align to a **4px sub-grid** (4, 8, 12, 16, 20, 24px, etc.)
* Use Tailwind spacing scale which is based on 4px increments (1 = 4px, 2 = 8px, 3 = 12px, 4 = 16px, etc.)
* Button heights must be multiples of 8px: `h-8` (32px), `h-10` (40px), `h-12` (48px), `h-14` (56px)

**Touch Targets & Accessibility:**
* **Minimum touch target**: 48px × 48px for all interactive buttons (MD3 requirement)
* For 24px icons (w-6 h-6), ensure total button size is at least 48px × 48px
* For 20px icons (w-5 h-5), ensure adequate padding to reach 48px minimum
* Desktop buttons can be slightly smaller but should maintain comfortable click areas
* Use `min-h-12` (48px) for primary action buttons on mobile

**Dynamic Width Adjustment:**
* Button width **must dynamically adjust** to accommodate label text
* Never use fixed widths that are smaller than the text content
* Use padding-based sizing: `px-4`, `px-6`, `px-8`, `px-10` (not fixed `w-32` or similar)
* Text should never truncate or overflow within buttons
* Allow buttons to expand naturally based on content

**Icon Placement & Spacing (Material Design Spec):**
* Icons are placed on the **leading side** (left/before the text) to communicate action
* **Standard icon-to-text spacing**: `mr-2` (8dp / 8px) - Material Design specification
* Icon sizes within buttons (Material Design recommendations):
  * Small buttons: `w-4 h-4` (16px icons) - compact UI
  * Regular buttons: `w-[18px] h-[18px]` or `w-5 h-5` (18dp / 20px icons) - MD3 standard
  * Large buttons: `w-6 h-6` (24px icons) - prominent actions
* **Never reduce spacing below 8px** - this is the Material Design minimum for optimal readability
* For icons that appear visually unbalanced, adjust icon size rather than spacing

**Visual Balance & Material Design Compliance:**
* **Always maintain 8px spacing** (`mr-2`) between icon and text - Material Design standard
* If an icon appears visually unbalanced, adjust the **icon size** rather than spacing
* Some Lucide icons have more internal whitespace in their bounding box
* For icons that appear too large or too small, use custom sizing: `w-[18px] h-[18px]`
* Goal: Consistent 8px spacing with appropriate icon sizing for visual balance

**State Layers (MD3):**
* Apply MD3 state layer principles to all button variants
* Hover: 8% opacity overlay or pre-calculated color
* Pressed: 12% opacity overlay + scale effect
* Focus: Ring with `ring-2 ring-primary ring-offset-2`
* Disabled: Reduce opacity to 38% (MD3 disabled state)

### Button Variants (MD3 Mapping)

**1. Filled Button (MD3) → Primary Button (PYMSTR)**

Material Design's highest emphasis button.

* **Normal State:**
  * Background: `#1E88E5` (primary blue - MD3 primary role)
  * Text: `#FFFFFF` (on-primary)
  * Icon: `#FFFFFF` (on-primary)
  * Elevation: Level 0 (no shadow at rest)
  * Border radius: `rounded-full` (PYMSTR pill-shaped)
  
* **Hover State:**
  * Background: `#1565C0` (primary + 8% black state layer, pre-calculated)
  * Elevation: Level 1 (`shadow-sm`)
  * Text: `#FFFFFF`
  * Transition: `transition-all duration-200`
  
* **Pressed State:**
  * Background: `#1565C0` (primary + 12% black state layer)
  * Elevation: Level 0
  * Transform: `scale-[0.98]`
  * Transition: `duration-100`
  
* **Focus State:**
  * Background: `#1E88E5`
  * Ring: `ring-2 ring-[#1E88E5] ring-offset-2`
  
* **Disabled State:**
  * Background: `#43586C` (surface variant, muted)
  * Text: `#798A9B` (on-surface variant, muted)
  * Opacity: 38% (MD3 disabled opacity)
  * Cursor: `not-allowed`

**2. Outlined Button (MD3) → Secondary/Outlined Button (PYMSTR)**

Material Design's medium emphasis button for supporting actions.

* **Normal State:**
  * Background: Transparent
  * Border: `1px solid #1E88E5` (primary outline)
  * Text: `#1E88E5` (primary)
  * Icon: `#1E88E5` (primary)
  * Border radius: `rounded-full`
  
* **Hover State:**
  * Background: `#E3F2FD` (primary container - MD3 state layer)
  * Border: `1px solid #1E88E5`
  * Text: `#1E88E5`
  * Transition: `transition-all duration-200`
  
* **Pressed State:**
  * Background: `rgba(227, 242, 253, 0.8)` (primary container + 12% state layer)
  * Border: `1px solid #1E88E5`
  * Text: `#1E88E5`
  
* **Focus State:**
  * Background: Transparent
  * Border: `1px solid #1E88E5`
  * Ring: `ring-2 ring-[#1E88E5]`
  
* **Disabled State:**
  * Background: Transparent
  * Border: `1px solid #43586C` (muted outline)
  * Text: `#798A9B` (muted)
  * Opacity: 38%

**3. Text Button (MD3) → Tertiary Button (PYMSTR)**

Material Design's low emphasis button for optional actions.

* **Normal State:**
  * Background: Transparent
  * Border: `1px solid #43586C` (outline)
  * Text: `#F6F7F9` (on-surface)
  * Border radius: `rounded-full`
  
* **Hover State:**
  * Background: `rgba(117, 117, 117, 0.08)` (8% state layer)
  * Border: `1px solid #757575` (gray accent) or `#07D7FF` (cyan)
  * Text: Accent color matches border
  * Transition: `transition-all duration-200`
  
* **Pressed State:**
  * Background: `rgba(117, 117, 117, 0.12)` (12% state layer)
  * Border: `1px solid #757575`
  
* **Disabled State:**
  * Background: Transparent
  * Border: `1px solid #43586C` (muted)
  * Text: `#798A9B` (muted)
  * Opacity: 38%

**4. Filled Tonal Button (MD3) → Secondary Button (PYMSTR)**

Material Design's filled button with lower emphasis.

* **Normal State:**
  * Background: `#303030` (surface level 1, raised surface)
  * Text: `#F6F7F9` (on-surface)
  * Elevation: Level 0
  * Border radius: `rounded-full`
  
* **Hover State:**
  * Background: `#2E3C49` (darker shade with 8% state layer)
  * Elevation: Level 1 (`shadow-sm`)
  * Text: `#F6F7F9`
  
* **Pressed State:**
  * Background: `#2E3C49` (12% state layer)
  * Elevation: Level 0
  
* **Disabled State:**
  * Background: `#43586C` (muted)
  * Text: `#798A9B` (muted)
  * Opacity: 38%

**5. Elevated Button (MD3) → Secondary Dark Button (PYMSTR)**

Material Design's button with elevation for prominence.

* **Normal State:**
  * Background: `#2E3C49` (surface)
  * Border: `1px solid #43586C` (outline)
  * Text: `#F6F7F9` (on-surface)
  * Elevation: Level 1 (`shadow-sm`)
  * Border radius: `rounded-full`
  
* **Hover State:**
  * Background: `#2E3C49`
  * Border: `1px solid #757575` (gray accent)
  * Text: `#A5ADB5` (lighter gray)
  * Elevation: Level 2 (`shadow-md`)
  
* **Pressed State:**
  * Background: `#2E3C49`
  * Elevation: Level 1
  
* **Disabled State:**
  * Background: `#2E3C49`
  * Border: `#43586C` (muted)
  * Text: `#798A9B` (muted)
  * Elevation: Level 0
  * Opacity: 38%

**6. Small Filled Button → Button with Icon/Tip Badge (PYMSTR)**

Compact button for secondary actions.

* **Normal State:**
  * Background: `#757575` (solid gray)
  * Text: `#FFFFFF` (on-gray)
  * Icon: Included with text
  * Border radius: `rounded-full`
  * Compact padding: `px-4 py-2`
  
* **Hover State:**
  * Background: `#959FA8` (lighter gray with 8% white state layer)
  * Scale: `scale-105`
  * Transition: `transition-all duration-200`
  
* **Pressed State:**
  * Background: `#757575`
  * Scale: `scale-100`
  
* **Disabled State:**
  * Background: `#43586C` (muted)
  * Text: `#798A9B` (muted)
  * Opacity: 38%

### Button Sizes (MD3 Specifications)

**Large Buttons (Primary CTAs):**
* **Padding**: `px-8 py-3` (32px × 12px)
* **Height**: `h-12` (48px) - aligns to 8px grid, meets 48dp touch target
* **Min-height**: `min-h-12` (48px) for touch targets
* **Icon size**: `w-[18px] h-[18px]` (18dp - MD3 standard) or `w-5 h-5` (20px)
* **Icon spacing**: `mr-2` (8px) - MD3 standard
* **Use for**: Primary CTAs, hero actions, prominent create buttons, mobile primary actions

**Regular Buttons (Standard Actions):**
* **Padding**: `px-6 py-2.5` (24px × 10px)
* **Height**: `h-10` (40px) - aligns to 8px grid
* **Min-height**: `min-h-10` (40px) desktop, `min-h-12` (48px) mobile
* **Icon size**: `w-[18px] h-[18px]` (18dp - MD3 standard) or `w-5 h-5` (20px)
* **Icon spacing**: `mr-2` (8px) - MD3 standard
* **Use for**: Standard actions, form submissions, modal actions, edit/save buttons, account actions

**Small Buttons (Secondary/Compact):**
* **Padding**: `px-4 py-2` (16px × 8px) or `px-6 py-2` (24px × 8px)
* **Height**: `h-8` (32px) or `h-9` (36px) - aligns to 8px grid
* **Min-height**: `min-h-8` (32px) desktop, upgrade to `min-h-12` (48px) mobile
* **Icon size**: `w-4 h-4` (16px)
* **Icon spacing**: `mr-1.5` (6px) or `mr-2` (8px)
* **Use for**: Secondary actions, inline forms, toolbars, dense UI areas
* **Important**: On mobile, enforce 48px touch target with `sm:min-h-8`

**Responsive Touch Target Example:**
```tsx
// Small button with responsive touch targets (MD3 compliant)
<Button className="px-4 py-2 min-h-12 sm:min-h-8 rounded-full">
  <Icon className="w-4 h-4 mr-2" />
  Action
</Button>
```

### Implementation Guidelines

**Core Styling (MD3 + PYMSTR):**
* Always use `rounded-full` for pill-shaped design (PYMSTR brand)
* Add MD3 transitions: `transition-all duration-200`
* Ensure proper contrast ratios for accessibility (WCAG AA minimum - 4.5:1)
* Use appropriate cursor states: `cursor-pointer` (normal), `cursor-not-allowed` (disabled)
* All hover effects use solid colors (PYMSTR brand - no gradients)
* Apply MD3 state layers for hover/focus/pressed states

**Grid Alignment (MD3 8dp grid):**
* Button heights must align to 8px grid: `h-8`, `h-10`, `h-12`, `h-14`, `h-16`
* Padding must align to 4px grid: `px-4`, `px-6`, `px-8`, `py-2`, `py-3`, `py-4`
* Icon sizes align to 4px grid: `w-4 h-4` (16px), `w-5 h-5` (20px), `w-6 h-6` (24px)
* Spacing aligns to 4px grid: `mr-1.5` (6px), `mr-2` (8px), `mr-2.5` (10px)

**Touch Targets (MD3 Accessibility - 48dp minimum):**
* Primary action buttons: **Minimum 48px × 48px** (`min-h-12` + adequate padding)
* Secondary action buttons: **Minimum 40px height** desktop, 48px mobile
* Small buttons on mobile: Use responsive classes `min-h-12 sm:min-h-8`
* Icon-only buttons: **Minimum 48px × 48px** (`w-12 h-12` or larger)
* Adequate spacing between adjacent buttons (minimum 8px gap)

**Dynamic Width & Content:**
* Never use fixed widths (`w-32`, `w-48`, etc.) - buttons must expand to fit content
* Use padding-based sizing: `px-4`, `px-6`, `px-8`, `px-10`
* Text must never truncate or overflow
* Multi-line text is acceptable if needed (rare for buttons)
* For very long labels, consider shortening the text rather than forcing a fixed width

**Icon Integration (Material Design Standard - 18dp icons):**
* Icons placed on **leading side** (before text): `<Icon className="w-[18px] h-[18px] mr-2" /> Label`
* **Always use `mr-2` (8px / 8dp)** spacing - MD3 specification
* Match icon size to button size:
  * Small buttons: `w-4 h-4` (16px) - compact UI only
  * Regular buttons: `w-[18px] h-[18px]` (18dp) - MD3 standard, or `w-5 h-5` (20px)
  * Large buttons: `w-6 h-6` (24px) - prominent CTAs
* For visual balance, adjust icon **size** not spacing:
  * Icon too large: Use `w-4 h-4` (16px)
  * Standard: Use `w-[18px] h-[18px]` (18px) - Material Design
  * Icon too small: Use `w-5 h-5` (20px) or `w-6 h-6` (24px)

**Elevation (MD3):**
* Filled buttons: Level 0 at rest, Level 1 on hover
* Elevated buttons: Level 1 at rest, Level 2 on hover
* Outlined/Text buttons: No elevation
* FABs: Level 3 at rest, Level 4 on hover

**Responsive Behavior:**
* On mobile, ensure all buttons meet 48px minimum height (MD3 requirement)
* Use Tailwind responsive variants: `min-h-12 sm:min-h-10`
* Stack buttons vertically on small screens if needed
* Maintain adequate spacing between stacked buttons (e.g., `space-y-3`)
* Consider full-width buttons on mobile for primary actions: `w-full sm:w-auto`

**Example Implementation (MD3 + PYMSTR Two-Speed System):**
```tsx
// Filled Button (Primary) - MD3 Filled Button
// ✅ 200ms for button interaction, 1500ms for theme (automatic via globals.css)
<Button className="px-8 py-3 min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] hover:shadow-sm active:scale-[0.98] focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 transition-all duration-200 rounded-full">
  <Plus className="w-5 h-5 mr-2" />
  Create Payment Link
</Button>

// Outlined Button (Secondary) - MD3 Outlined Button
// ✅ 200ms for instant hover feedback
<Button className="px-6 py-2.5 min-h-10 bg-transparent border border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD] active:bg-[#E3F2FD]/80 focus:ring-2 focus:ring-[#1E88E5] transition-all duration-200 rounded-full">
  <Save className="w-5 h-5 mr-2" />
  Save Changes
</Button>

// Text Button (Tertiary) - MD3 Text Button
// ✅ 200ms for snappy interaction
<Button className="px-6 py-2.5 min-h-10 bg-transparent border border-[#43586C] text-[#F6F7F9] hover:bg-white/[0.08] hover:border-[#757575] hover:text-[#757575] transition-all duration-200 rounded-full">
  <Settings className="w-5 h-5 mr-2" />
  Settings
</Button>

// Filled Tonal (Secondary Button) - MD3 Filled Tonal Button
// ✅ 200ms for responsive feel
<Button className="px-6 py-2.5 min-h-10 bg-[#303030] text-[#F6F7F9] hover:bg-[#2E3C49] hover:shadow-sm transition-all duration-200 rounded-full">
  <Edit className="w-5 h-5 mr-2" />
  Edit
</Button>

// Small Button with Mobile Touch Target (MD3 compliant)
// ✅ 200ms for instant scale feedback
<Button className="px-4 py-2 min-h-12 sm:min-h-8 rounded-full bg-[#757575] text-white hover:bg-[#959FA8] hover:scale-105 transition-all duration-200">
  <Edit className="w-4 h-4 mr-2" />
  Edit
</Button>

// Icon Button (FAB) - MD3 Floating Action Button
// ✅ 200ms for snappy scale and shadow transitions
<Button className="w-12 h-12 rounded-full bg-[#07D7FF] text-white hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200 shadow-md">
  <Plus className="w-5 h-5" />
</Button>
```

---

## Floating Action Buttons (FAB) - MD3 Specification

Circular icon-only buttons for quick actions following Material Design 3 FAB specifications.

### FAB Variants (MD3)

**Primary FAB (Blue):**
* **Normal State:**
  * Background: `#1E88E5` (primary color - blue)
  * Icon: `#FFFFFF` (on-primary)
  * Shape: Perfect circle `w-14 h-14` (56px - MD3 standard)
  * Elevation: Level 3 (`shadow-lg`)
  * Border radius: `rounded-full`
  
* **Hover State:**
  * Background: `#1565C0` (primary hover - darker blue)
  * Elevation: Level 4 (`shadow-xl`)
  * Scale: `scale-105`
  * Transition: `transition-all duration-200`
  
* **Pressed State:**
  * Elevation: Level 3
  * Scale: `scale-95`
  
* **Focus State:**
  * Ring: `ring-2 ring-[#1E88E5] ring-offset-2`

**Secondary FAB (Cyan):**
* **Normal State:**
  * Background: `#07D7FF` (secondary color - cyan)
  * Icon: `#FFFFFF` (on-secondary)
  * Shape: Perfect circle `w-14 h-14` (56px)
  * Elevation: Level 3 (`shadow-lg`)
  
* **Hover State:**
  * Background: Lighter cyan (8% white overlay)
  * Elevation: Level 4 (`shadow-xl`)
  * Scale: `scale-105`

**Surface FAB (Gray):**
* **Normal State:**
  * Background: `#303030` (surface level 1)
  * Icon: `#F6F7F9` (on-surface)
  * Shape: Perfect circle `w-14 h-14` (56px)
  * Elevation: Level 3 (`shadow-lg`)
  
* **Hover State:**
  * Background: `#43586C` (surface + state layer)
  * Elevation: Level 4 (`shadow-xl`)
  * Scale: `scale-105`

### FAB Sizes (MD3)

**Standard FAB:**
* Size: `w-14 h-14` (56px × 56px) - MD3 standard, exceeds 48px minimum ✓
* Icon: `w-6 h-6` (24px)
* Elevation: Level 3
* Use for: Primary floating actions

**Large FAB:**
* Size: `w-16 h-16` (64px × 64px) - MD3 large variant
* Icon: `w-7 h-7` (28px) or `w-8 h-8` (32px)
* Elevation: Level 3
* Use for: Hero actions, prominent FABs

**Small FAB:**
* Size: `w-12 h-12` (48px × 48px) - MD3 small variant, meets minimum ✓
* Icon: `w-5 h-5` (20px)
* Elevation: Level 3
* Use for: Compact toolbars, secondary quick actions

### FAB Implementation

**Elevation & Shadow:**
* At rest: `shadow-lg` (Level 3)
* On hover: `shadow-xl` (Level 4)
* Pressed: Return to `shadow-lg`

**Animation:**
* Hover: `hover:scale-105 hover:shadow-xl transition-all duration-200`
* Press: `active:scale-95 transition-transform duration-100`
* Focus: `focus:ring-2 focus:ring-[color] focus:ring-offset-2`

**Example Implementation (PYMSTR Two-Speed System):**
```tsx
// Primary FAB (Blue) - MD3 Standard
// ✅ 200ms for snappy scale/shadow feedback
<button className="w-14 h-14 rounded-full bg-[#1E88E5] text-white hover:bg-[#1565C0] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 transition-all duration-200 flex items-center justify-center">
  <Plus className="w-6 h-6" />
</button>

// Secondary FAB (Cyan)
// ✅ 200ms for instant interaction
<button className="w-14 h-14 rounded-full bg-[#07D7FF] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center">
  <Video className="w-6 h-6" />
</button>

// Surface FAB (Gray)
// ✅ 200ms for responsive feel
<button className="w-14 h-14 rounded-full bg-[#303030] text-[#F6F7F9] shadow-lg hover:bg-[#43586C] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center">
  <Calendar className="w-6 h-6" />
</button>

// Large FAB
// ✅ 200ms for smooth interaction
<button className="w-16 h-16 rounded-full bg-[#07D7FF] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center">
  <Plus className="w-8 h-8" />
</button>
```

**Usage Guidelines:**
* Use for primary screen actions (create, add, compose)
* Position in bottom-right corner for consistent placement (MD3 guideline)
* Maintain 16px margin from screen edges
* Only one primary FAB per screen
* Secondary FABs can be used for related quick actions
* Icon size: 24px (standard), 20px (small), 28-32px (large)
* Always maintain 48px minimum touch target

---

## Toggle Switch (MD3 Switch Component)

Pill-shaped toggle switch following Material Design 3 switch specifications.

### MD3 Switch States

**OFF State (Unselected):**
* Track Background: `#43586C` (surface variant, outline color)
* Track Width: 52px (MD3 standard)
* Track Height: 32px (MD3 standard)
* Handle: `#798A9B` (on-surface variant) circle, 16px diameter
* Handle Position: Left (8px from edge)
* Border radius: `rounded-full`

**ON State (Selected):**
* Track Background: `#1E88E5` (primary color)
* Handle: `#FFFFFF` (on-primary) circle, 24px diameter (expands on selection)
* Handle Position: Right (aligned to edge)
* Elevation: Handle has Level 1 shadow
* Border radius: `rounded-full`

**Hover State (OFF):**
* Track: `#43586C` with 8% white state layer
* Handle: 8% state layer overlay

**Hover State (ON):**
* Track: `#1E88E5` with 8% white state layer
* Handle: Slight elevation increase

**Disabled State:**
* Track: `#43586C` at 12% opacity (MD3 disabled)
* Handle: `#798A9B` at 38% opacity
* Cursor: `not-allowed`

### MD3 Switch Implementation

**Animation:**
* Handle transition: `transition-all duration-200` (MD3 standard easing)
* Handle position slides smoothly
* Handle size changes from 16px (OFF) to 24px (ON)

**Accessibility:**
* Minimum touch target: 48px × 48px (add invisible padding around 32px track)
* Keyboard focus: `ring-2 ring-[#1E88E5] ring-offset-2`
* ARIA labels: Always include `aria-label` for screen readers

**Example Implementation:**
```tsx
// Use ShadCN Switch component (already MD3-compliant)
import { Switch } from "./components/ui/switch";

<Switch 
  checked={isEnabled}
  onCheckedChange={setIsEnabled}
  className="data-[state=checked]:bg-[#1E88E5] data-[state=unchecked]:bg-[#43586C]"
/>
```

**Usage Guidelines:**
* Use for binary on/off settings
* Always provide clear labels (e.g., "Dark mode", "Notifications")
* Provide immediate visual feedback on toggle
* Use ShadCN Switch from `/components/ui/switch.tsx`
* Track height: 32px (MD3 standard)
* Track width: 52px (MD3 standard)
* Handle size: 16px (OFF) → 24px (ON)

---

## Semantic Action Buttons (Error/Success/Warning)

Pill-shaped buttons for semantic actions following Material Design 3 color roles.

### Error Button (Destructive Actions)

**MD3 Error Role:**
* **Normal State:**
  * Background: Transparent
  * Border: `1px solid #FF5914` (error color)
  * Text: `#FF5914` (error)
  * Icon: `#FF5914`
  * Border radius: `rounded-full`
  
* **Hover State:**
  * Background: `#FF5914` (error - filled on hover)
  * Border: `1px solid #FF5914`
  * Text: `#FFFFFF` (on-error)
  * Elevation: Level 1 (`shadow-sm`)
  * Transition: `transition-all duration-200`
  
* **Pressed State:**
  * Background: `#FF5914` with 12% black state layer
  * Scale: `scale-[0.98]`
  
* **Focus State:**
  * Ring: `ring-2 ring-[#FF5914] ring-offset-2`

### Success Button (Confirmatory Actions)

**MD3 Success Role:**
* **Normal State:**
  * Background: Transparent
  * Border: `1px solid #7DD069` (success color)
  * Text: `#7DD069` (success)
  * Icon: `#7DD069`
  * Border radius: `rounded-full`
  
* **Hover State:**
  * Background: `#7DD069` (success - filled on hover)
  * Border: `1px solid #7DD069`
  * Text: `#FFFFFF` (on-success)
  * Elevation: Level 1 (`shadow-sm`)
  
* **Pressed State:**
  * Background: `#7DD069` with 12% black state layer
  * Scale: `scale-[0.98]`
  
* **Focus State:**
  * Ring: `ring-2 ring-[#7DD069] ring-offset-2`

### Warning Button (Cautionary Actions)

**MD3 Warning Role:**
* **Normal State:**
  * Background: Transparent
  * Border: `1px solid #D9C370` (warning color)
  * Text: `#D9C370` (warning)
  * Icon: `#D9C370`
  * Border radius: `rounded-full`
  
* **Hover State:**
  * Background: `#D9C370` (warning - filled on hover)
  * Border: `1px solid #D9C370`
  * Text: `#2E3C49` (dark text for contrast with yellow)
  * Elevation: Level 1 (`shadow-sm`)
  
* **Pressed State:**
  * Background: `#D9C370` with 12% black state layer
  * Scale: `scale-[0.98]`

### Sizing & Touch Targets (MD3)

* **Padding**: `px-6 py-2.5` (24px × 10px) or `px-8 py-3` (32px × 12px)
* **Height**: `h-10` (40px) or `h-12` (48px) - aligns to 8px grid
* **Min-height**: `min-h-12` (48px) on mobile (MD3 touch target)
* **Icon size**: `w-5 h-5` (20px) or `w-4 h-4` (16px)
* **Icon spacing**: `mr-2` (8px) - MD3 standard

### Usage Guidelines

* **Delete/Remove**: Use Error button (PYMSTR orange `#FF5914`)
* **Confirm/Proceed**: Use Success button (green `#7DD069`)
* **Caution/Archive**: Use Warning button (gold `#D9C370`)
* Always pair with appropriate icons from Lucide React
* Provide clear labels (e.g., "Delete Account", "Confirm Payment")
* Add transition: `transition-all duration-200`
* Ensure 48px minimum touch target on mobile

**Example Implementation (PYMSTR Two-Speed System):**
```tsx
// Error/Delete Button (MD3 Error Role)
// ✅ 200ms for immediate destructive action feedback
<Button className="px-6 py-2.5 min-h-12 bg-transparent border border-[#FF5914] text-[#FF5914] hover:bg-[#FF5914] hover:text-white hover:shadow-sm active:scale-[0.98] focus:ring-2 focus:ring-[#FF5914] focus:ring-offset-2 transition-all duration-200 rounded-full">
  <Trash2 className="w-5 h-5 mr-2" />
  Delete
</Button>

// Success/Confirm Button (MD3 Success Role)
// ✅ 200ms for snappy confirmation
<Button className="px-8 py-3 min-h-12 bg-transparent border border-[#7DD069] text-[#7DD069] hover:bg-[#7DD069] hover:text-white hover:shadow-sm active:scale-[0.98] focus:ring-2 focus:ring-[#7DD069] focus:ring-offset-2 transition-all duration-200 rounded-full">
  <Check className="w-5 h-5 mr-2" />
  Continue
</Button>

// Warning Button (MD3 Warning Role)
// ✅ 200ms for responsive caution feedback
<Button className="px-6 py-2.5 min-h-12 bg-transparent border border-[#D9C370] text-[#D9C370] hover:bg-[#D9C370] hover:text-[#2E3C49] hover:shadow-sm active:scale-[0.98] focus:ring-2 focus:ring-[#D9C370] focus:ring-offset-2 transition-all duration-200 rounded-full">
  <AlertTriangle className="w-5 h-5 mr-2" />
  Archive
</Button>
```

---

## Cards & Containers (MD3 Elevation)

Cards and containers follow Material Design 3 elevation and surface principles.

### Card Variants (MD3)

**Elevated Card (Level 1):**
* Background: 
  * Light mode: `#FFFFFF` (surface)
  * Dark mode: `#303030` (surface level 1)
* Elevation: Level 1 (`shadow-sm`)
* Border radius: `rounded-2xl` (16px - MD3 Large)
* Padding: `p-6` (24px) or `p-8` (32px)

**Filled Card (Level 0):**
* Background:
  * Light mode: `#FAFAFA` (surface dim)
  * Dark mode: `#2E3C49` (surface base)
* Elevation: Level 0 (no shadow)
* Border: `1px solid #43586C` (outline)
* Border radius: `rounded-2xl` (16px - MD3 Large)

**Outlined Card:**
* Background: Transparent
* Border: `1px solid #43586C` (outline)
* Elevation: Level 0
* Border radius: `rounded-2xl` (16px - MD3 Large)

### Nested Sections

* Use `rounded-xl` (12px - MD3 Medium) for nested sections within cards
* Maintain elevation hierarchy (nested sections should not exceed parent elevation)
* Padding: `p-4` (16px) or `p-6` (24px)

### Small Containers / Compact Boxes

* Use `rounded-lg` (8px - MD3 Small) for small containers
* Examples: Code blocks, compact info boxes, inline containers
* Padding: `p-3` (12px) or `p-4` (16px)

### Interactive Cards (Hover States)

**Clickable Card:**
* Normal: Level 1 elevation
* Hover: Level 2 elevation (`shadow-md`) + 8% state layer
* Pressed: Level 0 elevation
* Focus: `ring-2 ring-[#1E88E5] ring-offset-2`

**Example Implementation:**
```tsx
// Elevated Card (MD3 Level 1 - Large radius 16px)
<div className="bg-white dark:bg-[#303030] rounded-2xl p-6 shadow-sm">
  <h2>Card Title</h2>
  <p>Card content...</p>
</div>

// Filled Card (MD3 Level 0 - Large radius 16px)
<div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-2xl p-6 border border-[#43586C]">
  <h2>Filled Card</h2>
</div>

// Interactive Card (Clickable - Large radius 16px)
<div className="bg-white dark:bg-[#303030] rounded-2xl p-6 shadow-sm hover:shadow-md hover:bg-black/[0.04] dark:hover:bg-white/[0.04] active:shadow-sm focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 transition-all duration-200 cursor-pointer">
  <h2>Clickable Card</h2>
</div>

// Nested Section within Card (Medium radius 12px)
<div className="bg-white dark:bg-[#303030] rounded-2xl p-8 shadow-sm">
  <h2>Main Card</h2>
  <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-4 mt-4">
    <p>Nested section</p>
  </div>
</div>

// Small Container Box (Small radius 8px)
<div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg p-3 border border-[#43586C]">
  <code>Small compact box</code>
</div>
```

---

## Dialogs & Modals (MD3 Elevation)

Dialogs follow Material Design 3 modal specifications with high elevation.

### Dialog Variants

**Standard Dialog:**
* Background:
  * Light mode: `#FFFFFF` (surface)
  * Dark mode: `#303030` (surface level 1)
* Elevation: Level 4 (`shadow-xl`)
* Border radius: `rounded-3xl` (24px - MD3 Extra Large)
* Max width: `max-w-md` (28rem / 448px)
* Padding: `p-6` or `p-8`
* Animation: Emphasized easing (400-500ms)

**Full-Screen Dialog:**
* Background: Same as standard
* Elevation: Level 4
* Border radius: None (full-screen)
* Animation: Slide-in from bottom on mobile

**Alert Dialog:**
* Background: Same as standard
* Elevation: Level 5 (`shadow-2xl`) - highest elevation for critical alerts
* Border radius: `rounded-3xl` (24px - MD3 Extra Large)
* Max width: `max-w-sm` (24rem / 384px)

**Bottom Sheet (Mobile):**
* Background: Same as standard
* Elevation: Level 4
* Border radius: `rounded-t-3xl` (24px top corners only)
* Slides from bottom on mobile devices

### Dialog Scrim (Backdrop)

* Background: `rgba(0, 0, 0, 0.5)` (50% black overlay)
* Backdrop blur: `backdrop-blur-sm` (optional)
* Animation: Fade-in 200ms

### Example Implementation

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog";

// Standard Dialog (MD3 Level 4)
<Dialog>
  <DialogContent className="bg-white dark:bg-[#303030] rounded-3xl p-8 shadow-xl max-w-md">
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content...</p>
  </DialogContent>
</Dialog>

// Alert Dialog (MD3 Level 5)
<AlertDialog>
  <AlertDialogContent className="bg-white dark:bg-[#303030] rounded-3xl p-6 shadow-2xl max-w-sm">
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

## Badges (MD3 + PYMSTR)

Badges follow Material Design 3 principles with PYMSTR pill-shaped styling.

### Badge Variants

**Status Badge (Semantic Colors):**
* Success/Active: 
  * Background: `#7DD069` (success)
  * Text: `#FFFFFF` (on-success)
* Error/Inactive:
  * Background: `#FF5914` (error)
  * Text: `#FFFFFF` (on-error)
* Warning/Pending:
  * Background: `#D9C370` (warning)
  * Text: `#2E3C49` (dark text for contrast)
* Border radius: `rounded-full`
* Padding: `px-3 py-1` (12px × 4px)
* Typography: Label Small (11px / 16px line-height, 500 weight)

**Count Badge (Notification):**
* Background: `#FF5914` (error - for urgency)
* Text: `#FFFFFF`
* Shape: Circular `w-6 h-6` (24px) for small counts, pill for larger
* Border radius: `rounded-full`
* Typography: Label Small, centered

**Chip/Tag Badge:**
* Background: `#303030` (surface level 1)
* Text: `#F6F7F9` (on-surface)
* Border: `1px solid #43586C` (outline)
* Border radius: `rounded-full`
* Padding: `px-3 py-1.5`
* Interactive: Add hover state with 8% state layer

### Example Implementation

```tsx
// Success Badge
<span className="inline-flex items-center px-3 py-1 rounded-full bg-[#7DD069] text-white text-[11px] font-medium">
  Active
</span>

// Error Badge
<span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FF5914] text-white text-[11px] font-medium">
  Inactive
</span>

// Count Badge (Notification)
<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FF5914] text-white text-[11px] font-medium">
  3
</span>

// Chip/Tag Badge (Interactive)
<span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#303030] text-[#F6F7F9] border border-[#43586C] text-[11px] font-medium hover:bg-[#43586C] transition-colors duration-200 cursor-pointer">
  USDC
  <X className="w-3 h-3 ml-1.5" />
</span>
```

---

## Input Fields (MD3 Text Fields)

Input fields follow Material Design 3 text field specifications with standard MD3 border radius.

### Text Field Variants

**Outlined Text Field (MD3 Standard):**
* Background: Transparent
* Border: `1px solid #43586C` (outline)
* Border radius: `rounded` (4px - MD3 Extra Small radius)
* Height: `h-12` (48px) or `h-14` (56px - MD3 standard)
* Padding: `px-4 py-3` (16px horizontal)
* Focus: Border `2px solid #1E88E5`, ring `ring-2 ring-[#1E88E5]`
* Error: Border `2px solid #FF5914`, ring `ring-2 ring-[#FF5914]`

**Filled Text Field (MD3 Standard):**
* Background: `#303030` (surface level 1 - dark mode) or `#FAFAFA` (light mode)
* Border: None (bottom border only: `2px solid #43586C`)
* Border radius: `rounded-t` (4px top corners, square bottom - MD3 standard)
* Height: `h-14` (56px - MD3 standard)
* Padding: `px-4 py-4` (16px)
* Focus: Bottom border `2px solid #1E88E5`, no ring
* Error: Bottom border `2px solid #FF5914`

### Input States (MD3)

**Normal State:**
* Border: `#43586C` (outline)
* Text: `#F6F7F9` (on-surface)
* Placeholder: `#798A9B` (on-surface variant)

**Hover State:**
* Border: `#757575` (outline variant)
* Background: 4% state layer overlay

**Focus State:**
* Border: `#1E88E5` (primary) at 2px width
* Ring: `ring-2 ring-[#1E88E5]`
* Label color: `#1E88E5`

**Error State:**
* Border: `#FF5914` (error) at 2px width
* Ring: `ring-2 ring-[#FF5914]`
* Helper text: `#FF5914`

**Disabled State:**
* Border: `#43586C` at 38% opacity
* Background: Surface at 12% opacity
* Text: `#798A9B` at 38% opacity
* Cursor: `not-allowed`

### Example Implementation

```tsx
// Outlined Input (MD3 Standard - 4px radius)
<input 
  type="text"
  placeholder="Enter price"
  className="w-full h-12 px-4 py-3 rounded bg-transparent border border-[#43586C] text-[#F6F7F9] placeholder:text-[#798A9B] hover:border-[#757575] focus:border-2 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none disabled:border-[#43586C]/[0.38] disabled:text-[#798A9B]/[0.38] disabled:cursor-not-allowed transition-all duration-200"
/>

// Outlined Input with Error State (MD3 Standard)
<input 
  type="text"
  placeholder="Enter price"
  className="w-full h-12 px-4 py-3 rounded bg-transparent border-2 border-[#FF5914] text-[#F6F7F9] placeholder:text-[#798A9B] focus:ring-2 focus:ring-[#FF5914] focus:outline-none transition-all duration-200"
/>

// Filled Input (MD3 Standard - Rounded top only)
<input 
  type="text"
  placeholder="Enter price"
  className="w-full h-14 px-4 py-4 rounded-t bg-[#303030] border-b-2 border-[#43586C] text-[#F6F7F9] placeholder:text-[#798A9B] focus:border-b-2 focus:border-[#1E88E5] focus:outline-none transition-all duration-200"
/>

// Large Outlined Input (MD3 Standard - 56px height)
<input 
  type="text"
  placeholder="Enter price"
  className="w-full h-14 px-4 py-4 rounded bg-transparent border border-[#43586C] text-[#F6F7F9] placeholder:text-[#798A9B] hover:border-[#757575] focus:border-2 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
/>
```

---

## Tabs (MD3 Navigation)

Material Design 3 defines two distinct tab patterns for different use cases. Choose the correct pattern based on your content type and number of options.

### Tab Pattern Decision Tree

**Use Primary Tabs (Scrollable with Underline) when:**
- ✅ Content navigation with 3-7 sections
- ✅ Legal/Help/Documentation pages
- ✅ Settings with multiple categories
- ✅ Page-level content switching
- ✅ Mobile-friendly horizontal scrolling needed

**Use Segmented Tabs (Pill Background) when:**
- ✅ Filtering data (All / Manual / API)
- ✅ Toggle between 2-3 views
- ✅ Compact dashboard controls
- ✅ Short labels (1-2 words maximum)
- ✅ Equal visual weight for all options

### Pattern 1: Primary Tabs (MD3 Content Navigation)

**Scrollable horizontal tabs with underline indicator - for 3+ content sections**

**Component Location:** `/components/ui/primary-tabs.tsx`

**MD3 Specifications:**
* **Layout**: Horizontal scrollable strip
* **Container**: Transparent background (no border)
* **Active Indicator**: 3px underline in primary color (`#1E88E5`)
* **Border radius**: None (tabs are text-only)
* **Typography**: Font medium weight
* **Colors**:
  * Inactive: `#798A9B` (muted text)
  * Active: `#1E88E5` (primary blue)
  * Hover: 8% state layer (`bg-black/[0.04]`)
* **Touch targets**: Minimum 48px height
* **Scrolling**: Hidden scrollbar (`scrollbar-hide`)

**Use Cases:**
* Legal page (Terms, Privacy, Cookies, Acceptable Use)
* Help Center (FAQ, Guides, Contact)
* Documentation sections
* Settings categories

**Example Implementation:**

```tsx
import { PrimaryTabs, PrimaryTabsList, PrimaryTabsTrigger, PrimaryTabsContent } from "../components/ui/primary-tabs";

<PrimaryTabs defaultValue="terms" className="space-y-6">
  <PrimaryTabsList>
    <PrimaryTabsTrigger value="terms">Terms of Service</PrimaryTabsTrigger>
    <PrimaryTabsTrigger value="privacy">Privacy Policy</PrimaryTabsTrigger>
    <PrimaryTabsTrigger value="cookies">Cookie Policy</PrimaryTabsTrigger>
    <PrimaryTabsTrigger value="acceptable">Acceptable Use</PrimaryTabsTrigger>
  </PrimaryTabsList>

  <PrimaryTabsContent value="terms">
    <Card className="rounded-2xl">
      {/* Terms content */}
    </Card>
  </PrimaryTabsContent>

  <PrimaryTabsContent value="privacy">
    <Card className="rounded-2xl">
      {/* Privacy content */}
    </Card>
  </PrimaryTabsContent>
</PrimaryTabs>
```

**Mobile Behavior:**
* Tabs scroll horizontally (touch-swipe enabled)
* No wrapping to multiple lines
* Active tab auto-scrolls into view
* Hidden scrollbar for clean appearance

### Pattern 2: Segmented Tabs (MD3 Secondary Navigation)

**Pill-shaped container with filled active state - for 2-3 filters/toggles**

**Component Location:** `/components/ui/tabs.tsx` (existing ShadCN component)

**MD3 Specifications:**
* **Layout**: Grouped pill container
* **Container**: Light background (`bg-muted`)
* **Active State**: Filled pill with card background
* **Border radius**: `rounded-full` (pill-shaped)
* **Typography**: Font medium weight
* **Colors**:
  * Container: `bg-muted`
  * Active: Card background with border
  * Inactive: Transparent

**Use Cases:**
* Payment Links filtering (All / Manual / API)
* Data view toggles (Table / Grid)
* Time range selectors (Day / Week / Month)

**Example Implementation:**

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

<Tabs value={filterTab} onValueChange={setFilterTab}>
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="all">All</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
    <TabsTrigger value="api">API</TabsTrigger>
  </TabsList>

  <TabsContent value="all">
    {/* All items */}
  </TabsContent>
</Tabs>
```

**Mobile Behavior:**
* Full width grid layout
* Equal spacing for all tabs
* Best for 2-3 options maximum
* Cramped with 4+ options (use Primary Tabs instead)

### Tab Pattern Comparison

| Feature | Primary Tabs | Segmented Tabs |
|---------|--------------|----------------|
| **Visual Style** | Underline indicator | Filled pill background |
| **Best For** | Content navigation | Filters / Toggles |
| **Optimal Count** | 3-7 sections | 2-3 options |
| **Mobile** | Scrollable horizontal | Full-width grid |
| **Label Length** | Medium (2-4 words) | Short (1-2 words) |
| **MD3 Pattern** | Primary Tabs | Secondary Tabs / Segmented Button |
| **Use Case** | Legal, Help, Docs | Payment filters, View toggles |

### Guidelines Summary

**DO:**
* ✅ Use Primary Tabs for Legal, Help, and multi-section content pages
* ✅ Use Segmented Tabs for Payment Links filtering (All/Manual/API)
* ✅ Keep Segmented Tab labels short (1-2 words)
* ✅ Use Primary Tabs when you have 4+ options
* ✅ Ensure 48px minimum touch targets on mobile

**DON'T:**
* ❌ Don't use Segmented Tabs for 4+ options (cramped on mobile)
* ❌ Don't use Primary Tabs for simple 2-option toggles
* ❌ Don't mix both patterns on the same page
* ❌ Don't use long labels in Segmented Tabs
* ❌ Don't force grid layout on Primary Tabs

---

## Dropdowns & Menus (MD3 Menu)

Dropdown menus follow Material Design 3 menu specifications.

### Menu Variants

**Standard Menu:**
* Background:
  * Light mode: `#FFFFFF` (surface)
  * Dark mode: `#262626` (as per guidelines - dropdown menu background)
* Elevation: Level 2 (`shadow-md`)
* Border radius: `rounded-xl` (12px - MD3 Medium)
* Padding: `py-2` (8px vertical)
* Max height: `max-h-64` (256px) with scroll

**Menu Item:**
* Height: `h-12` (48px - MD3 touch target)
* Padding: `px-4` (16px horizontal)
* Border radius: `rounded-lg` (8px - MD3 Small, for individual items)
* Hover: 8% state layer (`bg-black/[0.08]` or `bg-white/[0.08]`)
* Selected: 12% state layer + accent color
* Disabled: 38% opacity

**Popover Menu:**
* Background: Same as standard menu
* Elevation: Level 2 (`shadow-md`)
* Border radius: `rounded-xl` (12px - MD3 Medium)
* Arrow/pointer: 8px triangle pointing to trigger element

### Example Implementation

```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./components/ui/dropdown-menu";

// Dropdown Menu (MD3 Level 2 - Medium radius 12px)
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="bg-white dark:bg-[#262626] rounded-xl shadow-md p-2 min-w-[160px]">
    <DropdownMenuItem className="h-12 px-4 rounded-lg hover:bg-black/[0.08] dark:hover:bg-white/[0.08] focus:bg-black/[0.12] dark:focus:bg-white/[0.12] transition-colors duration-200 cursor-pointer">
      <User className="w-[18px] h-[18px] mr-2" />
      Profile
    </DropdownMenuItem>
    <DropdownMenuItem className="h-12 px-4 rounded-lg hover:bg-black/[0.08] dark:hover:bg-white/[0.08] transition-colors duration-200 cursor-pointer">
      <Settings className="w-[18px] h-[18px] mr-2" />
      Settings
    </DropdownMenuItem>
    <DropdownMenuItem className="h-12 px-4 rounded-lg hover:bg-black/[0.08] dark:hover:bg-white/[0.08] transition-colors duration-200 cursor-pointer text-[#FF5914]">
      <LogOut className="w-[18px] h-[18px] mr-2" />
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// Popover Menu (MD3 Medium radius 12px)
<Popover>
  <PopoverTrigger asChild>
    <Button>Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent className="bg-white dark:bg-[#262626] rounded-xl shadow-md p-4 w-80">
    <h3>Popover Title</h3>
    <p>Popover content goes here...</p>
  </PopoverContent>
</Popover>
```

---

## Accessibility (MD3 WCAG Compliance)

PYMSTR follows Material Design 3 accessibility standards and WCAG 2.1 Level AA compliance.

### Color Contrast Requirements

**WCAG AA (Minimum):**
* Normal text (< 18px): 4.5:1 contrast ratio
* Large text (≥ 18px): 3:1 contrast ratio
* UI components: 3:1 contrast ratio
* Active/focus states: 3:1 contrast ratio

**PYMSTR Contrast Validation:**
* `#1E88E5` (primary blue) on `#FFFFFF` (white): **4.54:1** ✓ AA
* `#FFFFFF` (white) on `#1E88E5` (primary blue): **4.54:1** ✓ AA
* `#F6F7F9` (light text) on `#2E3C49` (navy background): **10.5:1** ✓ AAA
* `#FF5914` (error orange) on `#FFFFFF`: **4.1:1** ✓ AA
* `#7DD069` (success green) on `#FFFFFF`: **3.2:1** ✓ AA (large text)

### Focus Indicators (MD3)

**All interactive elements must have visible focus indicators:**
* Keyboard focus: `ring-2 ring-[#1E88E5] ring-offset-2`
* Focus ring width: 2px (MD3 standard)
* Focus ring offset: 2px (spacing between element and ring)
* Never use `outline-none` without adding custom focus ring

**Example:**
```tsx
// Proper focus indicator
<button className="focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 focus:outline-none">
  Click Me
</button>
```

### Touch Targets (MD3 - 48dp Minimum)

**All interactive elements:**
* Minimum size: 48px × 48px (MD3 requirement)
* Spacing between targets: Minimum 8px
* Ensure adequate padding for text buttons to reach 48px height

### Screen Reader Support

**ARIA Labels:**
* All icon-only buttons: Add `aria-label`
* All form inputs: Associate with `<label>` or `aria-label`
* All dialogs: Use `aria-labelledby` and `aria-describedby`
* All menus: Use `role="menu"` and `role="menuitem"`

**Example:**
```tsx
// Icon button with ARIA
<button aria-label="Delete payment link" className="w-12 h-12 rounded-full">
  <Trash2 className="w-5 h-5" />
</button>

// Input with label
<label htmlFor="price" className="sr-only">Price</label>
<input id="price" type="text" placeholder="Enter price" />
```

### Keyboard Navigation

**Tab order:**
* Logical tab order (left-to-right, top-to-bottom)
* Skip links for navigation
* Focusable elements: buttons, links, inputs, selects

**Keyboard shortcuts:**
* Enter/Space: Activate buttons
* Escape: Close dialogs/menus
* Arrow keys: Navigate menus/lists

---

## Terminology

### Payment-Related Fields
* Always use **"price"** (not "amount") for payment values
* Example: "Enter price", "Total price", "Price field"

### Blockchain Terms
* Use "chain" or "blockchain network" consistently
* Supported chains: Ethereum, Polygon, Arbitrum, Optimism, Base

---

## Supported Assets

### Stablecoins
Only these three stablecoins are supported:
* USDC (USD Coin)
* USDT (Tether)
* EURC (Euro Coin)

### Blockchain Networks
Only these five chains are supported:
* Ethereum
* Polygon
* Arbitrum
* Optimism
* Base

---

## Business Rules

### Payment Links
* Payment links are **single-use only** (not reusable)
* Payment links have **no transaction IDs**
* After completion, payment links only have a **txHash** (blockchain transaction hash)
* Once used, payment links cannot be reused

### API Integration & Payment Sessions

#### Two Types of Payment Link Creation

**Manual Payment Links:**
* Created directly in the admin UI under "Payment Links" section
* Merchant manually creates a specific payment link for a specific transaction
* Example: Creating a link for "Coffee Subscription - $50"
* Use case: Invoicing, one-off payments, sending payment requests directly to customers
* Tagged with `source: "manual"`

**API-Generated Payment Links:**
* Created programmatically via API calls from merchant's system
* Merchant integrates PYMSTR checkout into their website/app
* Each customer transaction triggers a new unique payment link creation
* Use case: E-commerce checkout, automated payment processing, dynamic pricing
* Tagged with `source: "api"`

#### API Flow Architecture

1. **Merchant Integration Setup:**
   * Merchant integrates PYMSTR checkout into their website/application
   * Merchant's checkout button/flow remains permanent and reusable
   * Behind the scenes, each payment request creates a new unique session

2. **Payment Session Creation:**
   * Each time a customer initiates payment, merchant's backend calls PYMSTR API
   * API creates a **new unique payment link/session** for that specific transaction
   * API returns the payment link URL (e.g., `pymstr.com/#/pay/PL12345`)
   * Customer is redirected to this unique payment link URL
   * Once payment is completed, that specific link becomes "completed" with txHash
   * Link follows the same single-use rules as manual payment links

3. **Key Distinction:**
   * **Merchant's integration endpoint**: Permanent and reusable (their button/checkout flow)
   * **Each payment session/link generated via API**: Unique and single-use
   * API-generated links follow the **exact same single-use rules** as manual links
   * Both types display txHash after completion and cannot be reused

#### Categorization & Filtering

* Payment links have a `source` property: `"manual"` or `"api"`
* **"All" tab**: Shows all payment links regardless of source
* **"Manual" tab**: Filters to show only manually created links
* **"API" tab**: Filters to show only API-generated links
* Both types follow identical single-use completion rules

#### API Workflow Example

```
1. Customer clicks "Pay with PYMSTR" on merchant's website
2. Merchant backend calls: POST /api/payment-links 
   Body: {price: 50, chain: "Polygon", currency: "USDC"}
3. PYMSTR API returns: {linkId: "PL12345", url: "pymstr.com/#/pay/PL12345", status: "active"}
4. Merchant redirects customer to the returned URL
5. Customer completes Web3 payment through PYMSTR checkout
6. Payment link status updates to "completed" with txHash stored
7. Link cannot be reused - subsequent access attempts show "already used" error
8. Merchant receives webhook notification of completed payment
```

#### Important Notes

* API-generated links are **not reusable** - each API call must create a new link
* The merchant's integration (their checkout button) can be used unlimited times
* Each use creates a new unique payment link via API
* Single-use enforcement applies equally to both manual and API-generated links
* txHash is the only transaction identifier stored after completion (no transaction IDs)

---

## Component Guidelines

### Icons
* Use **Lucide React icons** consistently throughout the application
* Import from: `lucide-react`
* Icon sizes follow 4dp sub-grid: 16px, 18px, 20px, 24px
* MD3 standard icon size: 18dp (`w-[18px] h-[18px]`)
* Large icons: 24px (`w-6 h-6`)
* Small icons: 16px (`w-4 h-4`)

### Copy Buttons (Green Checkmark Pattern)

All copy buttons across the application must follow this standard pattern for consistent visual feedback:

**Required Pattern:**
```tsx
// 1. Add state at component level
const [copiedItem, setCopiedItem] = useState<string | null>(null);

// 2. Update copyToClipboard function
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
    toast('Copied to clipboard!');
    setTimeout(() => setCopiedItem(null), 2000);
  } catch (err) {
    toast('Failed to copy to clipboard');
  } finally {
    document.body.removeChild(textarea);
  }
};

// 3. Render button with conditional icon
<Button onClick={() => copyToClipboard(textToCopy)}>
  {copiedItem === textToCopy ? (
    <Check className="w-4 h-4 text-green-600" />
  ) : (
    <Copy className="w-4 h-4" />
  )}
</Button>
```

**Key Features:**
* ✅ **Green checkmark** (`<Check className="w-4 h-4 text-green-600" />`) on successful copy
* ✅ **2-second display** before reverting to copy icon (`setTimeout 2000ms`)
* ✅ **Toast notification** for accessibility
* ✅ **Fallback method** using `document.execCommand` for cross-browser compatibility
* ✅ **State tracking** to show checkmark only for the specific copied item
* ✅ **Consistent sizing** (`w-4 h-4` for both Copy and Check icons)

**Color Standard:**
* Success checkmark color: `text-green-600` (matches PYMSTR success color `#7DD069` semantic)

**Where Applied:**
* API Key Management - Key copy buttons
* Webhook Management - URL and secret copy buttons
* Merchant Profile - Email copy button
* All documentation code blocks
* Any component with copy functionality

### Address Utilities (Web3 UX Pattern)

All blockchain addresses must be displayed using truncated format with ellipsis for optimal UX. Never show full addresses in UI layouts.

**Utility Location:** `/utils/address.ts`

**Core Functions:**

```tsx
import { truncateAddress, formatAddress, isValidAddress } from '../utils/address';

// Basic truncation (0x742d...bEb5)
truncateAddress(address); // Returns: "0x742d...bEb5"

// Custom truncation
truncateAddress(address, 10, 8); // Returns: "0x742d35Cc...95f0bEb5"

// Format helper with presets
formatAddress(address, "short");  // 0x742d...bEb5
formatAddress(address, "medium"); // 0x742d35Cc...95f0bEb5
formatAddress(address, "full");   // Full address

// Validation
isValidAddress(address); // Returns: true/false
```

**Display Standards:**

**Short Format (Default - Most Common):**
* Start: 6 characters (includes "0x")
* End: 4 characters
* Result: `0x742d...bEb5`
* Use for: Cards, tables, lists, mobile views

**Medium Format (Detail Views):**
* Start: 10 characters
* End: 8 characters
* Result: `0x742d35Cc...95f0bEb5`
* Use for: Dialogs, transaction details, confirmation screens

**Full Format (Copy Only):**
* Show full address only in:
  - Copy/paste contexts (but display truncated)
  - QR codes
  - Debug logs
* Never display full address in regular UI

**Implementation Example:**

```tsx
// ✅ CORRECT: Truncated display with full copy
<div className="flex items-center gap-3">
  <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg px-4 py-3">
    <code className="text-sm">
      {truncateAddress(walletAddress)}
    </code>
  </div>
  <Button onClick={() => onCopy(walletAddress)}>
    <Copy className="w-4 h-4" />
  </Button>
</div>

// ❌ WRONG: Full address breaking layout
<code className="text-sm break-all">
  {walletAddress}
</code>

// ❌ WRONG: Manual truncation without utility
<code>{address.slice(0, 6)}...{address.slice(-4)}</code>
```

**Where Applied:**
* End User Wallets - Wallet address display
* Transaction tables - From/To addresses
* Payment Links - Recipient addresses
* Merchant wallets - All address displays
* Any blockchain address display in UI

**Design System Benefits:**
* ✅ Consistent truncation across entire app
* ✅ Prevents layout overflow
* ✅ Standard Web3 UX pattern
* ✅ Single source of truth for address formatting
* ✅ Easy to extend (add checksumming, ENS resolution, etc.)

---

## Responsive Design (Mobile-First MD3)

Material Design 3 follows a mobile-first approach with responsive breakpoints.

### Breakpoint System
* **Extra Small (xs)**: < 600px (mobile portrait)
* **Small (sm)**: ≥ 640px (Tailwind sm:) - mobile landscape, small tablets
* **Medium (md)**: ≥ 768px (Tailwind md:) - tablets
* **Large (lg)**: ≥ 1024px (Tailwind lg:) - laptops
* **Extra Large (xl)**: ≥ 1280px (Tailwind xl:) - desktops

### Responsive Guidelines
* **Mobile-first approach**: Design for mobile, enhance for desktop
* Always implement responsive designs with proper breakpoints
* Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`
* Test layouts on both mobile and desktop viewports
* Touch targets on mobile: Minimum 48px × 48px (MD3 requirement)
* Desktop touch targets: Can be 40px, but prefer 48px for consistency
* Stack elements vertically on mobile, horizontal on desktop
* Use `w-full sm:w-auto` for responsive button widths
* Mobile navigation: Bottom navigation or drawer
* Desktop navigation: Top app bar or rail

---

## Mobile FAB Positioning (MD3 Standard)

Material Design 3 provides clear guidance for FAB (Floating Action Button) placement on mobile devices.

### Primary FAB Positioning (MD3 Standard)

**Bottom-Right Placement (Recommended):**
```tsx
// MD3 Standard: Bottom-right FAB for primary actions
<button 
  className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#07D7FF] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center md:hidden"
  aria-label="Create payment link"
>
  <Plus className="w-6 h-6" />
</button>
```

**Why Bottom-Right?**
* ✅ **Thumb-reachable** for 80%+ of users (right-handed majority)
* ✅ **MD3 standard** position for primary floating actions
* ✅ **Doesn't obscure content** - floats above scrolling content
* ✅ **Consistent** across Material Design apps
* ✅ **Always visible** - fixed positioning follows scroll
* ✅ **16px margin** from screen edges (bottom-6 right-6 = 24px margin)

**Positioning Rules:**
* Position: `fixed bottom-6 right-6` (24px from bottom and right edges)
* Z-index: `z-50` (above content, below overlays)
* Size: `w-14 h-14` (56px × 56px - MD3 standard FAB)
* Icon: `w-6 h-6` (24px)
* Hide on desktop: `md:hidden`
* Shadow: `shadow-lg` at rest, `shadow-xl` on hover (MD3 Level 3-4)

### ⚠️ CRITICAL: FAB + Bottom Navigation Conflict Prevention

**ALWAYS check for bottom navigation before positioning FABs:**

**Rule: If bottom navigation exists, FABs MUST clear the nav bar height**

**Decision Tree:**
1. **Does the screen have a bottom navigation bar?**
   - ✅ **YES** → Use `bottom-20` (80px) or `bottom-24` (96px) minimum
   - ❌ **NO** → Use standard `bottom-6` (24px)

2. **Standard bottom nav bar heights:**
   - Mobile bottom nav: **64-80px typical**
   - Required FAB clearance: **nav height + 16px margin minimum**
   - Safe default with bottom nav: `bottom-20` (80px) or `bottom-24` (96px)

**Examples:**

```tsx
// ❌ WRONG: FAB with bottom navigation (will overlap nav bar)
<button className="fixed bottom-6 right-6 z-50 ...">
  <Plus />
</button>
{/* Bottom nav bar present at bottom-0 */}

// ✅ CORRECT: FAB clears bottom navigation
<button className="fixed bottom-24 right-6 z-50 ...">
  {/* 96px from bottom clears 64-80px nav bar + 16px margin */}
  <Plus />
</button>

// ✅ ALTERNATIVE: Use bottom sheet pattern (recommended for complex mobile layouts)
<Sheet>
  <SheetTrigger asChild>
    <button className="fixed bottom-24 right-6 z-50 ...">
      <Plus />
    </button>
  </SheetTrigger>
  <SheetContent side="bottom">
    {/* Form content */}
  </SheetContent>
</Sheet>
```

**Pre-Implementation Checklist:**

Before adding a FAB to any mobile layout, verify:
- [ ] Does this screen have bottom navigation? (Dashboard, Wallets, Reports, More bar)
- [ ] If YES: Use `bottom-20` or `bottom-24` (NOT `bottom-6`)
- [ ] If NO: Safe to use `bottom-6`
- [ ] FAB z-index is `z-50` or higher
- [ ] FAB doesn't overlap any interactive elements
- [ ] Test on smallest mobile viewport (320px width)

**Mobile Bottom Navigation Screens (Require Higher FAB Position):**
- Dashboard
- Wallets
- Reports
- Team Management
- Any screen using the primary mobile nav bar

**Desktop/No Bottom Nav Screens (Standard FAB Position):**
- Settings pages (use side navigation rail, no bottom nav)
- Modal overlays
- Full-screen experiences without bottom nav

**When in Doubt:**
- Use `bottom-24` as safe default on mobile
- Use `md:bottom-6` to revert to standard positioning on desktop
- Consider bottom sheet pattern for complex forms/actions

**FAB Positioning Formula:**

Calculate FAB bottom position:
```
FAB bottom = (Bottom Nav Height) + (Desired Margin)

Examples:
- No bottom nav: 0px + 24px = bottom-6
- With 64px bottom nav: 64px + 16px = 80px = bottom-20
- With 80px bottom nav: 80px + 16px = 96px = bottom-24
- Safe default with nav: bottom-24 (96px)
```

**Responsive Pattern:**
```tsx
// Responsive FAB that adapts to layout
<button className="fixed bottom-24 md:bottom-6 right-6 z-50">
  {/* High on mobile (clears nav), standard on desktop */}
</button>
```

### Multiple FABs (Vertical Stack)

When you need secondary actions alongside the primary FAB:

**Vertical Stack (Bottom-Right):**
```tsx
// Secondary FAB (above primary)
<button className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full bg-[#303030] text-[#F6F7F9] shadow-lg md:hidden">
  <Filter className="w-5 h-5" />
</button>

// Primary FAB (main action)
<button className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white shadow-lg md:hidden">
  <Plus className="w-6 h-6" />
</button>
```

**Guidelines:**
* **Primary FAB**: Bottom position (56px size, blue color)
* **Secondary FAB**: 72px above primary (`bottom-24` = 96px, creates 72px gap accounting for FAB size)
* **Tertiary FAB**: 72px above secondary (if needed)
* **Maximum**: 3 FABs in vertical stack (more = use bottom sheet)
* **Sizes**: Primary (56px), Secondary (48px), Tertiary (48px)

### Alternative Mobile Patterns

**1. Extended FAB (With Label):**

Use when label adds clarity to the action:

```tsx
// Extended FAB with text label
<button className="fixed bottom-6 right-6 z-50 px-6 py-3 min-h-14 rounded-full bg-[#1E88E5] text-white hover:bg-[#1565C0] shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 md:hidden">
  <Plus className="w-6 h-6" />
  <span className="font-medium">Create</span>
</button>
```

* Use for: Primary actions that benefit from text clarification
* Size: `min-h-14` (56px height), dynamic width
* Padding: `px-6 py-3`
* Gap: `gap-2` (8px between icon and text)

**2. Bottom-Center FAB:**

Use for better left-handed accessibility:

```tsx
// Bottom-center FAB (ambidextrous)
<button className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white hover:bg-[#1565C0] shadow-lg md:hidden">
  <Plus className="w-6 h-6" />
</button>
```

* Use for: Apps prioritizing left-handed users
* Position: `left-1/2 -translate-x-1/2` (centered)
* Pros: Equally accessible for both hands
* Cons: Can obstruct bottom content

**3. Sticky Bottom Bar (Multiple Equal Actions):**

Use when you have 2-3 actions of equal priority:

```tsx
// Fixed bottom action bar
<div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#303030] border-t border-[#43586C] p-4 z-50 md:hidden">
  <div className="flex gap-3">
    <Button className="flex-1 min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full">
      <Plus className="w-[18px] h-[18px] mr-2" />
      Create
    </Button>
    <Button className="flex-1 min-h-12 bg-transparent border border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD] rounded-full">
      <Filter className="w-[18px] h-[18px] mr-2" />
      Filter
    </Button>
  </div>
</div>
```

* Use for: 2-3 equally important actions
* Position: `fixed bottom-0 left-0 right-0`
* Padding: `p-4` (16px) - adequate touch target spacing
* Button height: `min-h-12` (48px - MD3 touch target)
* Pros: Clear action buttons, multiple choices visible
* Cons: Takes up screen real estate permanently

**4. Bottom Sheet Trigger:**

Use when primary action opens a menu with multiple options:

```tsx
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';

<Sheet>
  <SheetTrigger asChild>
    <button className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white hover:bg-[#1565C0] shadow-lg md:hidden">
      <Plus className="w-6 h-6" />
    </button>
  </SheetTrigger>
  <SheetContent side="bottom" className="h-auto rounded-t-3xl p-6">
    <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
    <div className="space-y-3">
      <Button className="w-full min-h-12 bg-[#1E88E5] text-white rounded-full">
        Create Payment Link
      </Button>
      <Button className="w-full min-h-12 bg-transparent border border-[#1E88E5] text-[#1E88E5] rounded-full">
        Generate Invoice
      </Button>
    </div>
  </SheetContent>
</Sheet>
```

* Use for: Primary action that branches into multiple options
* FAB opens bottom sheet with action menu
* Bottom sheet: `rounded-t-3xl` (MD3 24px top corners)

### Mobile FAB Best Practices

**Positioning:**
* ✅ **Default to bottom-right** unless specific accessibility needs
* ✅ **16-24px margin** from screen edges
* ✅ **Hide on desktop** with `md:hidden` (use toolbar buttons instead)
* ✅ **Above content** with `z-50` or higher
* ❌ **Don't use top-positioned FABs** (violates MD3 guidelines)
* ❌ **Don't use left-positioned FABs** (poor thumb reach for majority)

**Interaction:**
* ✅ **One primary action** per screen maximum
* ✅ **Scale animation** on press (`hover:scale-105 active:scale-95`)
* ✅ **Shadow elevation** change on hover (Level 3 → Level 4)
* ✅ **ARIA label** for accessibility (`aria-label="Create payment link"`)
* ✅ **Focus ring** for keyboard navigation
* ❌ **Don't use for navigation** (use bottom nav bar instead)
* ❌ **Don't use for destructive actions** (use dialog confirmation)

**Visual:**
* ✅ **Primary color** for main FAB (blue `#1E88E5`)
* ✅ **Secondary color** for secondary FABs (cyan `#07D7FF`)
* ✅ **Surface color** for tertiary FABs (gray `#303030`)
* ✅ **56px standard** size for primary FAB
* ✅ **48px size** for secondary FABs
* ✅ **24px icon** for primary FAB
* ✅ **20px icon** for secondary FABs
* ❌ **Don't use filled buttons as FABs** (FABs must be circular)
* ❌ **Don't use badges on FABs** (use separate notification indicator)

### Desktop Alternatives

On desktop, replace mobile FABs with toolbar buttons:

```tsx
// Mobile: FAB
<button className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white hover:bg-[#1565C0] shadow-lg md:hidden">
  <Plus className="w-6 h-6" />
</button>

// Desktop: Toolbar button
<Button className="hidden md:inline-flex min-h-12 px-8 py-3 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full">
  <Plus className="w-[18px] h-[18px] mr-2" />
  Create Payment Link
</Button>
```

**Why?**
* Desktop has more screen space for persistent toolbar buttons
* FABs are primarily for constrained mobile screens
* Desktop users expect actions in headers/toolbars
* Mouse precision makes toolbars more efficient than FABs

### Example: Payment Links Dashboard

```tsx
export const PaymentLinksDashboard = () => {
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#2E3C49] pb-24">
      {/* Mobile Header (Sticky) */}
      <header className="sticky top-0 bg-white dark:bg-[#303030] p-4 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">Payment Links</h1>
          
          {/* Desktop: Toolbar button */}
          <Button className="hidden md:inline-flex min-h-12 px-8 py-3 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full">
            <Plus className="w-[18px] h-[18px] mr-2" />
            Create Link
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-4">
        {/* Payment link cards */}
      </main>

      {/* Mobile: Primary FAB (Bottom-Right) */}
      <button 
        onClick={() => setShowCreateSheet(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white hover:bg-[#1565C0] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 transition-all duration-200 flex items-center justify-center md:hidden"
        aria-label="Create payment link"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Bottom Sheet (Mobile) */}
      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
          {/* Create form */}
        </SheetContent>
      </Sheet>
    </div>
  );
};
```

### Key Takeaways

**For PYMSTR Mobile Dashboards:**
1. **Use bottom-right FAB** for primary action (Create Payment Link)
2. **56px size** (`w-14 h-14`) with primary blue color (`#1E88E5`)
3. **Fixed positioning** (`fixed bottom-6 right-6 z-50`)
4. **Hidden on desktop** (`md:hidden`) - use toolbar button instead
5. **Opens bottom sheet** for form/actions (`SheetContent side="bottom"`)
6. **Secondary FABs** stacked above if needed (filter, search) - use cyan (`#07D7FF`)
7. **48px minimum** touch targets for all mobile actions
8. **Scale animation** on interaction for tactile feedback

---

## Layout Guidelines (MD3 Grid System)

Material Design 3 uses a responsive grid system.

### Grid Specifications

**Mobile (< 600px):**
* Margins: 16px
* Gutters: 16px
* Columns: 4
* Column width: Fluid

**Tablet (600px - 1023px):**
* Margins: 24px
* Gutters: 24px
* Columns: 8
* Column width: Fluid

**Desktop (≥ 1024px):**
* Margins: 24px
* Gutters: 24px
* Columns: 12
* Column width: Fluid

### PYMSTR Layout Rules

* Use flexbox and grid for layouts
* Avoid absolute positioning unless necessary
* Maintain consistent spacing using Tailwind spacing scale
* Use `space-y-*` and `space-x-*` utilities for consistent gaps
* Prefer 8px spacing increments: `space-y-2` (8px), `space-y-4` (16px), `space-y-6` (24px)
* Container max-width: `max-w-7xl` (1280px) for desktop
* Padding: Mobile `px-4` (16px), Desktop `px-6` (24px) or `px-8` (32px)

### ⚠️ CRITICAL: Sticky Header Rules

**NEVER add borders, dividers, or separators to sticky headers unless explicitly requested:**
* ❌ **DO NOT** add `border-b`, `border-t`, or any border classes
* ❌ **DO NOT** add separator lines between sticky header and content
* ❌ **DO NOT** add visual dividers of any kind
* ✅ **DO** use only background color and positioning
* ✅ **DO** check Guidelines.md before adding any visual elements

**Why this rule exists:**
Sticky headers should feel seamless and integrated. Adding borders creates unnecessary visual clutter and breaks the clean Material Design 3 aesthetic. If a border or separator is needed, it must be explicitly specified in the design requirements.

**Correct sticky header implementation:**
```tsx
// ✅ CORRECT - Clean sticky header without borders
<div className="sticky top-0 bg-white dark:bg-[#0A0A0A] p-4 z-10">
  {/* Header content */}
</div>

// ❌ WRONG - Never add borders without explicit request
<div className="sticky top-0 bg-white dark:bg-[#0A0A0A] p-4 z-10 border-b border-gray-200">
  {/* Header content */}
</div>
```

**When in doubt:**
If you're considering adding a border or separator to a sticky header, STOP and verify it's explicitly requested in Guidelines.md or user requirements. If not found, DO NOT add it.

### Documentation Page Pattern (Standard)

**MANDATORY: All documentation pages (Quick Start, API Reference, Code Examples) follow this pattern:**

**Structure:**
```tsx
<div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
  {/* STICKY HEADER WITH BACK BUTTON + TITLE + TABS */}
  <div className="sticky top-0 z-40 bg-white dark:bg-[#0a0a0a]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button + Title Section */}
      <div className="pt-4 pb-3">
        <button onClick={onBack} className="...">
          <ArrowLeft /> Back to Documents
        </button>
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-[#FF5914]" />
          <h1 className="text-gray-900 dark:text-white">Page Title</h1>
        </div>
        <p className="text-[#798A9B] mt-1">Page description</p>
      </div>

      {/* Tabs Section */}
      <div className="py-3">
        <div className="flex w-full items-center overflow-x-auto scrollbar-hide gap-2">
          <button onClick={() => setActiveTab('tab1')} className={...}>
            Tab 1
          </button>
          {/* More tabs */}
        </div>
      </div>
    </div>
  </div>

  {/* Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white dark:bg-[#0a0a0a]">
    <div className="space-y-6">
      {/* Tab content */}
    </div>
  </div>
</div>
```

**Key Requirements:**
- ✅ Sticky header with `sticky top-0 z-40`
- ✅ NO borders on sticky header (unless explicitly requested)
- ✅ Responsive padding: `px-4 sm:px-6 lg:px-8`
- ✅ Content spacing: `space-y-6` (24px between sections)
- ✅ Max width: `max-w-7xl mx-auto`
- ✅ Tab overflow: `overflow-x-auto scrollbar-hide`
- ✅ Background matches page: `bg-white dark:bg-[#0a0a0a]`

### ⚠️ CRITICAL: Mobile Overflow Prevention (Documentation Pages)

**MANDATORY: All documentation pages must prevent horizontal overflow on mobile:**

**Code Blocks & Long Content:**
* ❌ **DO NOT** use inline code blocks without `overflow-x-auto`
* ✅ **DO** use `PymstrCodeBlock` component for all code examples (has built-in overflow handling)
* ✅ **DO** add `overflow-x-auto` to any custom code containers
* ✅ **DO** add `min-w-max` to code elements that shouldn't wrap

**Long Text & URLs:**
* ❌ **DO NOT** put long URLs in plain `<code>` tags without `break-all`
* ✅ **DO** add `break-all` to URLs: `<code className="break-all">https://api.pymstr.com/v1</code>`
* ✅ **DO** add `break-words` to long header names or technical terms
* ✅ **DO** add `break-all` to email addresses: `<a className="break-all">support@pymstr.com</a>`

**Flex Containers:**
* ✅ **DO** add `flex-shrink-0` to badges/icons in flex layouts
* ✅ **DO** add `flex-1 min-w-0` to content divs in flex layouts
* ✅ **DO** ensure long text can wrap or scroll

**Example Patterns:**

```tsx
// ✅ CORRECT: Inline code block with overflow
<div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-4 border border-[#43586C] overflow-x-auto">
  <code className="text-sm block min-w-max">
    {/* Long code here */}
  </code>
</div>

// ✅ CORRECT: Long URL with break-all
<div className="flex items-start space-x-2">
  <span className="font-semibold min-w-[140px] flex-shrink-0">Base URL:</span>
  <code className="text-sm text-muted-foreground break-all">https://api.pymstr.com/v1</code>
</div>

// ✅ CORRECT: Email with break-all
<a href="mailto:support@pymstr.com" className="text-[#07D7FF] hover:underline text-sm break-all">
  support@pymstr.com
</a>

// ✅ CORRECT: Header names with break-words
<div className="break-words"><code>X-RateLimit-Remaining:</code> Requests remaining</div>

// ❌ WRONG: No overflow handling
<div className="bg-[#FAFAFA] rounded-xl p-4">
  <code className="text-sm">
    {/* Long code will overflow on mobile */}
  </code>
</div>

// ❌ WRONG: Long URL without break-all
<code className="text-sm">https://api.pymstr.com/v1/payment-links</code>
```

**Testing Checklist:**
- [ ] All code blocks use `PymstrCodeBlock` or have `overflow-x-auto`
- [ ] All URLs have `break-all` class
- [ ] All emails have `break-all` class
- [ ] All long header names have `break-words` class
- [ ] All flex containers have proper `flex-shrink-0` and `min-w-0` classes
- [ ] Test on 320px width viewport (smallest mobile)

**Example Responsive Layout:**
```tsx
// Responsive container with MD3 margins
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>

// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {/* Cards */}
</div>

// Responsive flex layout
<div className="flex flex-col sm:flex-row gap-4">
  {/* Items */}
</div>
```

### ⚠️ CRITICAL: Documentation Page Routing (MANDATORY)

**PROBLEM:** When creating documentation pages (Quick Start, API Reference, Code Examples), the "Back to Documents" button MUST navigate to the Documents page, NOT dashboard or history.back().

**ROOT CAUSE:** Missing hash route handler in App.tsx causes unknown routes to default to dashboard.

**MANDATORY PATTERN FOR ALL DOCUMENTATION PAGES:**

**1. Component Pattern (QuickStartGuide.tsx, APIReference.tsx, CodeExamples.tsx):**
```tsx
// Component receives onBack prop
interface QuickStartGuideProps {
  onBack: () => void;
}

const QuickStartGuide: React.FC<QuickStartGuideProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <div className="sticky top-0 z-40 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-4 pb-3">
            {/* ✅ CORRECT: Use onBack prop */}
            <button onClick={onBack} className="...">
              <ArrowLeft /> Back to Documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

**2. Page Wrapper Pattern (QuickStartPage.tsx, APIReferencePage.tsx, CodeExamplesPage.tsx):**
```tsx
// ✅ CORRECT: Navigate to #/documents
const QuickStartPage: React.FC = () => {
  const handleBack = () => {
    // Navigate to Documents page by updating URL hash
    // This will trigger the app's navigation system to show the Documents page
    window.location.hash = '#/documents';
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return <QuickStartGuide onBack={handleBack} />;
};

// ❌ WRONG: Using window.history.back()
const QuickStartPage: React.FC = () => {
  return <QuickStartGuide onBack={() => window.history.back()} />;
  // This will go to previous page (could be dashboard, landing, etc.)
};

// ❌ WRONG: Navigate to dashboard
const QuickStartPage: React.FC = () => {
  const navigate = useNavigate();
  return <QuickStartGuide onBack={() => navigate('/dashboard')} />;
  // Button says "Back to Documents" but goes to dashboard!
};
```

**3. Hash Routing in App.tsx (MANDATORY FOR NEW ROUTES):**

When adding a new route, you MUST add it to the hash routing logic in App.tsx:

```tsx
// In App.tsx useEffect hash change handler
useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash;
    const hashLower = hash.toLowerCase();

    // Documentation pages
    if (hashLower.includes("quickstart")) {
      setActiveTab("quickstart");
      setIsStandalonePage(true);
    } else if (hashLower.includes("api-reference") || hashLower.includes("apireference")) {
      setActiveTab("apireference");
      setIsStandalonePage(true);
    } else if (hashLower.includes("code-example")) {
      setActiveTab("codeexamples");
      setIsStandalonePage(true);
    } else if (hashLower.includes("documents")) {
      // ✅ CRITICAL: Add this handler or "Back to Documents" defaults to dashboard!
      setActiveTab("documents");
      setIsStandalonePage(false);
    } else if (hash === "#/pay") {
      setActiveTab("checkout");
      setIsStandalonePage(false);
    } else {
      // Unknown route - defaults to dashboard
      setActiveTab("admin");
      setIsStandalonePage(false);
    }
  };

  handleHashChange();
  window.addEventListener("hashchange", handleHashChange);
  return () => window.removeEventListener("hashchange", handleHashChange);
}, []);
```

**4. App.tsx Switch Case (MANDATORY):**

Ensure the activeTab has a corresponding case:

```tsx
// In App.tsx renderContent()
switch (activeTab) {
  case "quickstart":
    return <QuickStartGuide onBack={() => setActiveTab("documents")} />;
  case "apireference":
    return <APIReference onBack={() => setActiveTab("documents")} />;
  case "codeexamples":
    return <CodeExamples onBack={() => setActiveTab("documents")} />;
  case "documents":
    // ✅ CRITICAL: Must have this case
    return <DocumentsPage onNavigateToQuickStart={...} />;
  default:
    return <DashboardPage />;
}
```

**CHECKLIST FOR NEW DOCUMENTATION PAGES:**

When creating a new documentation page, you MUST:
- [ ] Component accepts `onBack: () => void` prop
- [ ] Component calls `onBack` when clicking "Back to Documents" button
- [ ] Page wrapper calls `window.location.hash = '#/documents'` in handleBack
- [ ] Hash routing in App.tsx includes route handler (e.g., `hashLower.includes("newpage")`)
- [ ] Switch case in App.tsx has corresponding case (e.g., `case "newpage"`)
- [ ] Test that "Back to Documents" navigates to Documents page, NOT dashboard

**WHY THIS MATTERS:**

Without proper hash routing:
1. `window.location.hash = '#/documents'` sets hash to `#/documents`
2. App.tsx `handleHashChange` runs
3. No handler for `documents` found
4. Falls through to `else` block
5. Defaults to `setActiveTab("admin")` (dashboard)
6. User clicks "Back to Documents" but goes to Dashboard 🚨

**NEVER DO:**
- ❌ Use `window.history.back()` for "Back to Documents"
- ❌ Navigate to dashboard when button says "Back to Documents"
- ❌ Forget to add hash route handler in App.tsx
- ❌ Use different navigation logic than pattern above

---

## Summary: MD3 + PYMSTR Integration

PYMSTR successfully integrates Material Design 3 principles while maintaining a unique brand identity:

**Material Design 3 Foundations Applied:**
✓ Color system with semantic roles (primary, secondary, tertiary, error, success)
✓ Elevation system (0-5 levels) with proper shadows and surface tints
✓ State layers (8%, 12%, 16% opacity for hover/focus/pressed)
✓ Typography scale (Display, Headline, Title, Body, Label)
✓ Motion & easing curves (standard, emphasized, decelerated, accelerated)
✓ 8dp/4dp spacing grid system
✓ 48dp minimum touch targets (accessibility)
✓ WCAG 2.1 Level AA compliance
✓ Responsive mobile-first design

**PYMSTR Unique Identity Preserved:**
✓ Pill-shaped buttons (`rounded-full`) - Aligns with MD3 button standard (20dp radius)
✓ Navy-gray-cyan-magenta color palette
✓ Solid color buttons (no gradients)
✓ Distinctive FABs with scale animations
✓ Web3 payment processor aesthetic
✓ MD3-compliant input fields with standard 4px radius

**Full MD3 Compliance:**
✓ Buttons use MD3 pill-shaped radius (20dp) - `rounded-full`
✓ Input fields use MD3 Extra Small radius (4dp) - `rounded` for outlined, `rounded-t` for filled
✓ Cards use MD3 Large radius (16dp) - `rounded-2xl`
✓ Dropdowns use MD3 Medium radius (12dp) - `rounded-xl`
✓ Dialogs use MD3 Extra Large radius (~28dp/24px) - `rounded-3xl`

This design system provides a robust, accessible, and visually cohesive foundation for the PYMSTR application while following industry-standard Material Design 3 best practices.
