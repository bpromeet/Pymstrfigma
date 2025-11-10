# PYMSTR Design System Implementation

## Overview

This document describes the implementation of PYMSTR's consistent design system following Material Design 3 (MD3) principles. The system provides:

1. **Consistent page backgrounds** across all pages
2. **Shared layout components** for uniform structure
3. **Design token system** for centralized styling
4. **Type-safe design utilities** for predictable styling

---

## Problem Solved

### Before
- Each page implemented its own structure and styling
- Background colors were inconsistent (`#FFFFFF` vs `#FAFAFA` vs `bg-gray-50`)
- Card radius, spacing, and padding varied between pages
- No central source of truth for design tokens
- Difficult to maintain design consistency

### After
- Single source of truth for all design values
- Consistent page structure via `PageLayout` component
- Type-safe design tokens via CSS variables
- Easy to maintain and update globally

---

## Core Components

### 1. CSS Variables & Design Tokens (`/styles/globals.css`)

#### Updated Background Color
```css
:root {
  --background: #FAFAFA;  /* Was #FFFFFF - now consistent with MD3 Surface Dim */
}

.dark {
  --background: #2E3C49;  /* Was #0a0a0a - now consistent with MD3 Surface Dim Dark */
}
```

#### New MD3 Design Tokens
All MD3 color roles are now available as CSS variables:

**Light Mode:**
```css
--md3-primary: #1E88E5;
--md3-on-primary: #FFFFFF;
--md3-primary-container: #E3F2FD;
--md3-surface: #FFFFFF;
--md3-surface-dim: #FAFAFA;
--md3-outline: #43586C;
--md3-error: #DD6B6B;
--md3-success: #7DD069;
--md3-warning: #D9C370;
/* ... and more */
```

**Dark Mode:**
```css
--md3-surface: #0a0a0a;
--md3-surface-dim: #2E3C49;
--md3-surface-bright: #303030;
--md3-on-surface: #F6F7F9;
/* ... and more */
```

#### Tailwind Integration
All tokens are mapped to Tailwind via `@theme inline`:
```css
--color-md3-primary: var(--md3-primary);
--color-md3-surface: var(--md3-surface);
/* Accessible as: bg-md3-primary, text-md3-surface, etc. */
```

---

### 2. PageLayout Component (`/components/PageLayout.tsx`)

Shared layout wrapper that enforces consistent structure across all pages.

#### Basic Usage

```tsx
import PageLayout from './components/PageLayout';

export const MyPage = () => {
  return (
    <PageLayout>
      <PageLayout.Header 
        title="Page Title"
        subtitle="Optional description"
        action={<Button>Action</Button>}
      />
      <PageLayout.Content>
        <PageLayout.Section title="Section Title">
          {/* Your content here */}
        </PageLayout.Section>
      </PageLayout.Content>
    </PageLayout>
  );
};
```

#### PageLayout (Root Container)

**Purpose:** Provides consistent page background and structure.

**MD3 Specifications:**
- Background: `bg-[#FAFAFA] dark:bg-[#2E3C49]` (Surface Dim)
- Min-height: `min-h-screen`
- Automatic dark mode support

**Props:**
```tsx
interface PageLayoutProps {
  children: React.ReactNode;
  className?: string; // Optional additional classes
}
```

**Example:**
```tsx
<PageLayout>
  {/* All page content */}
</PageLayout>
```

---

#### PageLayout.Header

**Purpose:** Consistent sticky header for all pages.

**MD3 Specifications:**
- Background: `bg-white dark:bg-[#303030]` (Surface Level 1)
- Border: `border-b border-[#43586C]` (Outline)
- Position: `sticky top-0 z-40`
- Min-height: `min-h-16` (64px - 8dp grid)
- Padding: `px-6 lg:px-8` (24px/32px)
- Shadow: `shadow-sm` (MD3 Level 1)

**Props:**
```tsx
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode; // CTA button or action element
  className?: string;
}
```

**Example:**
```tsx
<PageLayout.Header 
  title="Payment Links"
  subtitle="Manage your payment links and invoices"
  action={
    <Button className="hidden md:inline-flex min-h-12 px-8 py-3 bg-[#1E88E5] text-white rounded-full">
      <Plus className="w-[18px] h-[18px] mr-2" />
      Create Link
    </Button>
  }
/>
```

---

#### PageLayout.Content

**Purpose:** Main content container with consistent max-width and padding.

**MD3 Specifications:**
- Max-width: `max-w-7xl` (1280px) or `max-w-4xl` (narrow)
- Padding: `px-6 lg:px-8` (24px/32px horizontal)
- Spacing: `py-4 md:py-6` (16px/24px vertical)
- Centered: `mx-auto`

**Props:**
```tsx
interface PageContentProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean; // Use max-w-4xl for reading-focused content
}
```

**Example:**
```tsx
{/* Standard width (1280px) */}
<PageLayout.Content>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Cards */}
  </div>
</PageLayout.Content>

{/* Narrow width (896px) for documentation */}
<PageLayout.Content narrow>
  <article>
    {/* Long-form content */}
  </article>
</PageLayout.Content>
```

---

#### PageLayout.Section

**Purpose:** Card-style section wrapper for content grouping.

**MD3 Specifications:**
- Background: `bg-white dark:bg-[#303030]` (Surface Level 1)
- Border radius: `rounded-2xl` (16px - MD3 Large)
- Padding: `p-6` (24px - 8dp grid)
- Shadow: `shadow-sm` (MD3 Level 1)
- Section spacing: `mb-6` (24px between sections)

**Props:**
```tsx
interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}
```

**Example:**
```tsx
<PageLayout.Section 
  title="Active Payment Links"
  description="Links that are currently available for payment"
>
  <div className="space-y-4">
    {/* Payment link cards */}
  </div>
</PageLayout.Section>

<PageLayout.Section title="Archived Links">
  {/* Archived content */}
</PageLayout.Section>
```

---

### 3. Design Tokens (`/components/ui/design-tokens.ts`)

Type-safe utility module for consistent styling across the application.

#### Color Tokens

```tsx
import { MD3_COLORS } from './components/ui/design-tokens';

// Primary color
const buttonClass = `bg-[${MD3_COLORS.primary}] text-[${MD3_COLORS.onPrimary}]`;

// Semantic colors
const errorButton = `border border-[${MD3_COLORS.error}]`;
const successBadge = `bg-[${MD3_COLORS.success}]`;
```

**Available Colors:**
```tsx
MD3_COLORS = {
  // Primary
  primary: '#1E88E5',
  onPrimary: '#FFFFFF',
  primaryContainer: '#E3F2FD',
  primaryHover: '#1565C0',
  
  // Secondary
  secondary: '#07D7FF',
  onSecondary: '#FFFFFF',
  
  // Tertiary
  tertiary: '#F90BD5',
  onTertiary: '#FFFFFF',
  
  // Surface
  surface: '#FFFFFF',
  surfaceDim: '#FAFAFA',
  onSurface: '#1C1B1F',
  
  // Semantic
  error: '#DD6B6B',
  success: '#7DD069',
  warning: '#D9C370',
  
  // Neutral
  outline: '#43586C',
  outlineVariant: '#757575',
}
```

---

#### Border Radius Tokens

```tsx
import { MD3_RADIUS_CLASSES } from './components/ui/design-tokens';

// Use predefined radius classes
<div className={MD3_RADIUS_CLASSES.large}>  {/* rounded-2xl */}
<button className={MD3_RADIUS_CLASSES.full}>  {/* rounded-full */}
<input className={MD3_RADIUS_CLASSES.extraSmall}>  {/* rounded (4px) */}
```

**Available Radius:**
```tsx
MD3_RADIUS_CLASSES = {
  none: 'rounded-none',         // 0px
  extraSmall: 'rounded',        // 4px - Input fields
  small: 'rounded-lg',          // 8px - Small containers
  medium: 'rounded-xl',         // 12px - Dropdowns, nested cards
  large: 'rounded-2xl',         // 16px - Main cards
  extraLarge: 'rounded-3xl',    // 24px - Dialogs
  full: 'rounded-full',         // Pill - Buttons, FABs
}
```

---

#### Elevation (Shadow) Tokens

```tsx
import { MD3_ELEVATION } from './components/ui/design-tokens';

<div className={`${MD3_ELEVATION.level1} bg-white`}>  {/* shadow-sm */}
<dialog className={MD3_ELEVATION.level4}>  {/* shadow-xl */}
```

**Available Elevations:**
```tsx
MD3_ELEVATION = {
  level0: 'shadow-none',  // No elevation
  level1: 'shadow-sm',    // Cards, buttons
  level2: 'shadow-md',    // Dialogs, dropdowns
  level3: 'shadow-lg',    // FABs, date pickers
  level4: 'shadow-xl',    // Navigation drawers, modals
  level5: 'shadow-2xl',   // Modal overlays
}
```

---

#### Icon Size Tokens

```tsx
import { MD3_ICON_SIZES } from './components/ui/design-tokens';

<Plus className={MD3_ICON_SIZES.medium} />  {/* w-[18px] h-[18px] - MD3 standard */}
<Settings className={MD3_ICON_SIZES.large} />  {/* w-6 h-6 */}
```

**Available Sizes:**
```tsx
MD3_ICON_SIZES = {
  small: 'w-4 h-4',              // 16px
  medium: 'w-[18px] h-[18px]',  // 18px (MD3 standard)
  regular: 'w-5 h-5',            // 20px
  large: 'w-6 h-6',              // 24px
  extraLarge: 'w-8 h-8',         // 32px
}
```

---

#### Transition Tokens

```tsx
import { MD3_TRANSITIONS } from './components/ui/design-tokens';

<button className={MD3_TRANSITIONS.standard}>  {/* transition-all duration-200 ease-out */}
<dialog className={MD3_TRANSITIONS.emphasized}>  {/* transition-all duration-500 */}
```

**Available Transitions:**
```tsx
MD3_TRANSITIONS = {
  standard: 'transition-all duration-200 ease-out',    // Most transitions
  emphasized: 'transition-all duration-500',           // Large layout changes
  decelerated: 'transition-all duration-200 ease-out', // Elements entering
  accelerated: 'transition-all duration-150 ease-in',  // Elements exiting
}
```

---

## Migration Guide

### Step 1: Update Existing Page

**Before:**
```tsx
const MyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1>My Page</h1>
        <div className="space-y-4">
          {/* Content */}
        </div>
      </div>
    </div>
  );
};
```

**After:**
```tsx
import PageLayout from './components/PageLayout';

const MyPage = () => {
  return (
    <PageLayout>
      <PageLayout.Header title="My Page" />
      <PageLayout.Content>
        <PageLayout.Section>
          {/* Content */}
        </PageLayout.Section>
      </PageLayout.Content>
    </PageLayout>
  );
};
```

---

### Step 2: Replace Hardcoded Values

**Before:**
```tsx
<button className="px-8 py-3 h-12 bg-[#1E88E5] text-white rounded-full shadow-sm hover:shadow-lg transition-all duration-200">
  <Plus className="w-5 h-5 mr-2" />
  Create
</button>
```

**After:**
```tsx
import { MD3_COLORS, MD3_RADIUS_CLASSES, MD3_ELEVATION, MD3_ICON_SIZES, MD3_TRANSITIONS } from './components/ui/design-tokens';

<button className={`px-8 py-3 h-12 bg-[${MD3_COLORS.primary}] text-[${MD3_COLORS.onPrimary}] ${MD3_RADIUS_CLASSES.full} ${MD3_ELEVATION.level1} hover:${MD3_ELEVATION.level3} ${MD3_TRANSITIONS.standard}`}>
  <Plus className={`${MD3_ICON_SIZES.regular} mr-2`} />
  Create
</button>
```

**Or even simpler (recommended for readability):**
```tsx
<button className="px-8 py-3 h-12 bg-[#1E88E5] text-white rounded-full shadow-sm hover:shadow-lg transition-all duration-200">
  <Plus className="w-5 h-5 mr-2" />
  Create
</button>
```
*Note: The design tokens are most useful for dynamic theming or when you need programmatic access to values.*

---

### Step 3: Use PageLayout.Section for Cards

**Before:**
```tsx
<div className="bg-white dark:bg-[#303030] rounded-2xl p-6 shadow-sm">
  <h2>Section Title</h2>
  <p>Content...</p>
</div>
```

**After:**
```tsx
<PageLayout.Section title="Section Title">
  <p>Content...</p>
</PageLayout.Section>
```

---

## Benefits

### 1. Consistency
- All pages use identical backgrounds (`#FAFAFA` / `#2E3C49`)
- All cards use identical radius (`rounded-2xl`)
- All shadows follow MD3 elevation system
- All spacing follows 8dp grid

### 2. Maintainability
- Change design globally by updating CSS variables
- No need to hunt through files for hardcoded values
- Type-safe tokens prevent typos

### 3. Developer Experience
- Clear, semantic component names
- IntelliSense support for design tokens
- Self-documenting code

### 4. Performance
- CSS variables are fast
- No runtime JavaScript for theming
- Efficient dark mode switching

---

## Best Practices

### DO ✅

1. **Use PageLayout for all new pages**
   ```tsx
   <PageLayout>
     <PageLayout.Header title="..." />
     <PageLayout.Content>...</PageLayout.Content>
   </PageLayout>
   ```

2. **Use CSS variables for colors**
   ```tsx
   bg-[#1E88E5]  // Primary color from Guidelines
   border-[#43586C]  // Outline color from Guidelines
   ```

3. **Follow 8dp spacing grid**
   ```tsx
   space-y-2  // 8px
   space-y-4  // 16px
   space-y-6  // 24px
   p-6        // 24px
   ```

4. **Use semantic HTML with PageLayout.Section**
   ```tsx
   <PageLayout.Section title="...">
     {/* Content automatically wrapped in proper card styling */}
   </PageLayout.Section>
   ```

### DON'T ❌

1. **Don't use `bg-background` anymore**
   ```tsx
   // ❌ Old way (resolves to CSS variable)
   <div className="bg-background">
   
   // ✅ New way (explicit MD3 color)
   <PageLayout> {/* Already has correct background */}
   ```

2. **Don't use inconsistent backgrounds**
   ```tsx
   // ❌ Avoid
   bg-white  // Only for cards, not pages
   bg-gray-50  // Not in MD3 palette
   
   // ✅ Use
   <PageLayout>  // Correct page background
   ```

3. **Don't hardcode repeated styling**
   ```tsx
   // ❌ Repetitive
   <div className="bg-white dark:bg-[#303030] rounded-2xl p-6 shadow-sm">
   
   // ✅ Use component
   <PageLayout.Section>
   ```

4. **Don't override typography unless necessary**
   ```tsx
   // ❌ Avoid (globals.css handles this)
   <h1 className="text-2xl font-bold">
   
   // ✅ Let globals.css handle it
   <h1>Title</h1>
   ```

---

## File Structure

```
/styles
  └── globals.css              # CSS variables & MD3 tokens

/components
  ├── PageLayout.tsx           # Shared layout wrapper
  └── ui
      ├── design-tokens.ts     # Type-safe design utilities
      └── [other ui components]

/pages
  ├── QuickStartPage.tsx       # ✅ Updated to use PageLayout
  ├── APIReferencePage.tsx     # ✅ Updated to use PageLayout
  └── CodeExamplesPage.tsx     # ✅ Updated to use PageLayout
```

---

## Next Steps

1. **Migrate remaining pages** to use `PageLayout`
2. **Audit components** for hardcoded colors/spacing
3. **Document component-specific patterns** (buttons, forms, etc.)
4. **Create Storybook stories** for design tokens
5. **Add automated tests** to enforce design consistency

---

## Questions?

Refer to:
- **Guidelines.md** - Full MD3 specifications
- **PageLayout.tsx** - Component source code
- **design-tokens.ts** - All available tokens
- **globals.css** - CSS variable definitions

For design decisions or changes, update `Guidelines.md` first, then implement in the design system.
