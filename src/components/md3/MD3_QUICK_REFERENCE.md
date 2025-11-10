# MD3 Component Quick Reference Guide

Complete reference for Material Design 3 compliant components in PYMSTR.

## 🎯 What Changed in MD3 Adoption

### ❌ Old (Pre-MD3)
```tsx
// OLD: Pill-shaped inputs (non-standard)
<input className="rounded-full px-6 py-3" />
```

### ✅ New (MD3 Standard)
```tsx
// NEW: MD3 4px radius inputs
<input className="rounded px-4 py-3" />
```

**Summary:**
- ✅ Buttons still use `rounded-full` (MD3 standard for buttons)
- ✅ Inputs now use `rounded` (4px - MD3 Extra Small radius)
- ✅ Cards use `rounded-2xl` (16px - MD3 Large radius)
- ✅ Dialogs use `rounded-3xl` (24px - MD3 Extra Large radius)

---

## 📦 Import Components

```tsx
// Import MD3 Components
import {
  MD3FilledButton,
  MD3OutlinedButton,
  MD3TextButton,
  MD3ErrorButton,
  MD3SuccessButton,
  MD3WarningButton,
  MD3PrimaryFAB,
  MD3SecondaryFAB,
  MD3SmallFAB,
  MD3LargeFAB,
  MD3OutlinedInput,
  MD3OutlinedInputLarge,
  MD3FilledInput,
  MD3OutlinedInputError,
  MD3ElevatedCard,
  MD3FilledCard,
  MD3InteractiveCard,
  MD3NestedSection,
  MD3SmallContainer,
  MD3SuccessBadge,
  MD3ErrorBadge,
  MD3WarningBadge,
  MD3CountBadge,
  MD3ChipBadge,
} from './components/md3/MD3Components';
```

---

## 🔘 Buttons

### Primary Actions (Filled Button)
```tsx
<MD3FilledButton icon={<Plus />}>
  Create Payment Link
</MD3FilledButton>
```
- **Use for:** Primary CTAs, main actions
- **Color:** Blue `#1E88E5` background, white text
- **Hover:** Darker blue `#1565C0` with shadow

### Secondary Actions (Outlined Button)
```tsx
<MD3OutlinedButton icon={<Save />}>
  Save Changes
</MD3OutlinedButton>
```
- **Use for:** Supporting actions
- **Color:** Blue `#1E88E5` border and text, transparent background
- **Hover:** Light blue `#E3F2FD` background

### Tertiary Actions (Text Button)
```tsx
<MD3TextButton icon={<Settings />}>
  Settings
</MD3TextButton>
```
- **Use for:** Optional actions, low emphasis
- **Color:** Gray `#43586C` border, light text
- **Hover:** Gray `#757575` border

### Destructive Actions (Error Button)
```tsx
<MD3ErrorButton icon={<Trash2 />}>
  Delete Payment Link
</MD3ErrorButton>
```
- **Use for:** Delete, remove, destructive actions
- **Color:** Coral red `#DD6B6B` border, fills on hover
- **Hover:** Red background with white text

### Confirmatory Actions (Success Button)
```tsx
<MD3SuccessButton icon={<Check />}>
  Confirm Payment
</MD3SuccessButton>
```
- **Use for:** Confirm, proceed, complete actions
- **Color:** Green `#7DD069` border, fills on hover

### Cautionary Actions (Warning Button)
```tsx
<MD3WarningButton icon={<AlertTriangle />}>
  Archive Link
</MD3WarningButton>
```
- **Use for:** Archive, caution, reversible actions
- **Color:** Gold `#D9C370` border, fills on hover

---

## 🎈 Floating Action Buttons (FABs)

### Primary FAB (Standard 56px)
```tsx
<MD3PrimaryFAB icon={<Plus />} />
```
- **Size:** 56px × 56px (MD3 standard)
- **Color:** Cyan `#07D7FF`
- **Use for:** Main floating action

### Secondary FAB
```tsx
<MD3SecondaryFAB icon={<Download />} />
```
- **Size:** 56px × 56px
- **Color:** Magenta `#F90BD5`
- **Use for:** Alternative quick action

### Small FAB (48px)
```tsx
<MD3SmallFAB icon={<Edit />} />
```
- **Size:** 48px × 48px (meets minimum touch target)
- **Use for:** Compact toolbars

### Large FAB (64px)
```tsx
<MD3LargeFAB icon={<Plus />} />
```
- **Size:** 64px × 64px
- **Use for:** Hero actions, prominent FABs

---

## 📝 Input Fields

### Standard Outlined Input (48px height)
```tsx
<MD3OutlinedInput
  type="text"
  placeholder="Enter value"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```
- **Radius:** `rounded` (4px - MD3 Extra Small)
- **Height:** 48px (h-12)
- **Padding:** 16px horizontal (px-4)
- **Border:** Gray `#43586C`, blue `#1E88E5` on focus

### Large Outlined Input (56px height)
```tsx
<MD3OutlinedInputLarge
  type="text"
  placeholder="Enter value"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```
- **Height:** 56px (h-14) - MD3 standard large
- **Use for:** Prominent forms, hero inputs

### Filled Input (MD3 Filled Variant)
```tsx
<MD3FilledInput
  type="text"
  placeholder="Enter value"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```
- **Radius:** `rounded-t` (4px top corners only)
- **Height:** 56px (h-14)
- **Background:** Filled surface color
- **Border:** Bottom border only

### Error State Input
```tsx
<MD3OutlinedInputError
  type="text"
  placeholder="Enter value"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```
- **Border:** Red `#DD6B6B` (2px)
- **Ring:** Red focus ring
- **Use for:** Validation errors

---

## 🎴 Cards & Containers

### Elevated Card (Default)
```tsx
<MD3ElevatedCard>
  <h2>Card Title</h2>
  <p>Card content...</p>
</MD3ElevatedCard>
```
- **Radius:** `rounded-2xl` (16px - MD3 Large)
- **Elevation:** Level 1 shadow
- **Use for:** Main cards, content containers

### Filled Card (Flat with border)
```tsx
<MD3FilledCard>
  <h2>Filled Card</h2>
</MD3FilledCard>
```
- **Radius:** `rounded-2xl` (16px - MD3 Large)
- **Elevation:** Level 0 (no shadow)
- **Border:** Gray `#43586C`
- **Use for:** Alternative card style

### Interactive Card (Clickable)
```tsx
<MD3InteractiveCard onClick={() => console.log('Clicked')}>
  <h2>Clickable Card</h2>
</MD3InteractiveCard>
```
- **Radius:** `rounded-2xl` (16px)
- **Hover:** Elevation increases to Level 2
- **Use for:** Selectable items, navigation cards

### Nested Section (Inside cards)
```tsx
<MD3ElevatedCard>
  <h2>Main Card</h2>
  <MD3NestedSection>
    <p>Nested content with Medium radius</p>
  </MD3NestedSection>
</MD3ElevatedCard>
```
- **Radius:** `rounded-xl` (12px - MD3 Medium)
- **Use for:** Sections within cards

### Small Container (Compact boxes)
```tsx
<MD3SmallContainer>
  <code>Code block or compact info</code>
</MD3SmallContainer>
```
- **Radius:** `rounded-lg` (8px - MD3 Small)
- **Padding:** 12px (p-3)
- **Use for:** Code blocks, inline containers

---

## 🏷️ Badges

### Success Badge
```tsx
<MD3SuccessBadge>Active</MD3SuccessBadge>
```
- **Color:** Green `#7DD069`
- **Use for:** Active, success, completed states

### Error Badge
```tsx
<MD3ErrorBadge>Inactive</MD3ErrorBadge>
```
- **Color:** Coral red `#DD6B6B`
- **Use for:** Error, inactive, failed states

### Warning Badge
```tsx
<MD3WarningBadge>Pending</MD3WarningBadge>
```
- **Color:** Gold `#D9C370`
- **Use for:** Warning, pending, caution states

### Count Badge (Notifications)
```tsx
<div className="relative">
  <Bell />
  <MD3CountBadge className="absolute -top-1 -right-1">
    3
  </MD3CountBadge>
</div>
```
- **Shape:** Circular (6px diameter)
- **Use for:** Notification counts

### Chip Badge (Removable tags)
```tsx
<MD3ChipBadge onRemove={() => console.log('Remove')}>
  USDC
</MD3ChipBadge>
```
- **Shape:** Pill-shaped (rounded-full)
- **Interactive:** Hover state, removable
- **Use for:** Tags, filters, selections

---

## 📐 MD3 Border Radius Scale

| Element | Radius Class | Size | MD3 Role |
|---------|--------------|------|----------|
| **Buttons** | `rounded-full` | 9999px | Pill (20dp standard) |
| **Inputs (Outlined)** | `rounded` | 4px | Extra Small |
| **Inputs (Filled)** | `rounded-t` | 4px top | Extra Small (top only) |
| **Small Containers** | `rounded-lg` | 8px | Small |
| **Nested Sections** | `rounded-xl` | 12px | Medium |
| **Cards** | `rounded-2xl` | 16px | Large |
| **Dialogs** | `rounded-3xl` | 24px | Extra Large |
| **Badges** | `rounded-full` | 9999px | Pill |
| **FABs** | `rounded-full` | 9999px | Circle |

---

## 🎨 MD3 Color Roles

| Role | Light Mode | Dark Mode | Usage |
|------|------------|-----------|-------|
| **Primary** | `#1E88E5` | `#1E88E5` | Primary buttons, links |
| **On-Primary** | `#FFFFFF` | `#FFFFFF` | Text on primary color |
| **Secondary** | `#07D7FF` | `#07D7FF` | FABs, accents |
| **Tertiary** | `#F90BD5` | `#F90BD5` | Special accents |
| **Error** | `#DD6B6B` | `#DD6B6B` | Destructive actions |
| **Success** | `#7DD069` | `#7DD069` | Success states |
| **Warning** | `#D9C370` | `#D9C370` | Caution states |
| **Surface** | `#FFFFFF` | `#394B5C` | Card backgrounds |
| **Background** | `#FAFAFA` | `#2E3C49` | Page backgrounds |
| **Outline** | `#EEEEEE` | `#43586C` | Borders, dividers |

---

## 📏 MD3 Spacing (8dp Grid)

```tsx
// Button Padding (8dp grid)
px-8 py-3  // Large: 32px × 12px
px-6 py-2.5  // Regular: 24px × 10px
px-4 py-2  // Small: 16px × 8px

// Input Padding
px-4 py-3  // Standard: 16px × 12px (48px height)
px-4 py-4  // Large: 16px × 16px (56px height)

// Card Padding
p-6  // Standard: 24px
p-8  // Large: 32px
p-4  // Compact: 16px

// Icon Spacing (MD3 standard)
mr-2  // 8px spacing (MD3 standard between icon and text)
```

---

## 🔥 Common Patterns

### Form with Validation
```tsx
const [email, setEmail] = useState('');
const [error, setError] = useState(false);

return (
  <div className="space-y-2">
    <label className="text-sm font-medium">Email</label>
    {error ? (
      <>
        <MD3OutlinedInputError
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
          }}
        />
        <p className="text-xs text-[#DD6B6B]">Email is required</p>
      </>
    ) : (
      <MD3OutlinedInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    )}
  </div>
);
```

### Card with Actions
```tsx
<MD3ElevatedCard>
  <h2 className="text-xl font-medium mb-4">Payment Link</h2>
  <p className="text-2xl font-semibold text-[#1E88E5] mb-4">$150.00</p>
  
  <div className="flex gap-3">
    <MD3OutlinedButton icon={<Copy />} className="flex-1">
      Copy Link
    </MD3OutlinedButton>
    <MD3ErrorButton icon={<Trash2 />}>
      Delete
    </MD3ErrorButton>
  </div>
</MD3ElevatedCard>
```

### Page with FAB
```tsx
<div className="relative min-h-screen">
  {/* Page content */}
  <div className="max-w-7xl mx-auto p-6">
    {/* ... */}
  </div>

  {/* Floating Action Button */}
  <MD3PrimaryFAB
    icon={<Plus />}
    className="fixed bottom-6 right-6"
    aria-label="Create new"
  />
</div>
```

### Nested Card Layout
```tsx
<MD3ElevatedCard>
  <h2 className="text-xl font-medium mb-6">Settings</h2>
  
  <MD3NestedSection className="mb-4">
    <h3 className="font-medium mb-2">API Key</h3>
    <MD3SmallContainer>
      <code>sk_live_***********</code>
    </MD3SmallContainer>
  </MD3NestedSection>

  <MD3OutlinedButton icon={<Copy />}>
    Copy API Key
  </MD3OutlinedButton>
</MD3ElevatedCard>
```

---

## ✅ MD3 Compliance Checklist

When creating new components, ensure:

- ✅ **Buttons** use `rounded-full` (MD3 pill shape)
- ✅ **Inputs** use `rounded` (4px - not rounded-full!)
- ✅ **Cards** use `rounded-2xl` (16px Large radius)
- ✅ **Nested sections** use `rounded-xl` (12px Medium)
- ✅ **Dialogs** use `rounded-3xl` (24px Extra Large)
- ✅ **Icon size** is 18px for buttons (`w-[18px] h-[18px]`)
- ✅ **Icon spacing** is 8px (`mr-2`) - MD3 standard
- ✅ **Touch targets** are minimum 48px (`min-h-12`)
- ✅ **State layers** use 8%, 12%, 16% opacity
- ✅ **Transitions** use `duration-200` (MD3 standard)
- ✅ **Focus rings** use `ring-2 ring-[#1E88E5]`
- ✅ **Color contrast** meets WCAG AA (4.5:1 minimum)

---

## 📚 Additional Resources

- **Guidelines.md** - Complete design system documentation
- **MD3Components.tsx** - Component library source code
- **MD3Examples.tsx** - Complete usage examples
- [Material Design 3 Docs](https://m3.material.io/) - Official MD3 specification

---

## 🚀 Getting Started

1. **Import components** from `/components/md3/MD3Components`
2. **Use pre-built components** instead of creating custom ones
3. **Follow MD3 spacing** (8dp grid for layout, 4dp for icons)
4. **Always test responsive** (mobile 48px touch targets!)
5. **Maintain accessibility** (ARIA labels, focus rings, contrast)

---

## 💡 Pro Tips

1. **Don't override input radius** - Always use `rounded` (4px) for inputs
2. **Use semantic buttons** - Error/Success/Warning for clarity
3. **Nest sections properly** - Cards → Nested Sections → Small Containers
4. **Icon size matters** - Use 18px for MD3 standard
5. **Touch targets on mobile** - Always 48px minimum (`min-h-12`)
6. **Test dark mode** - All components support dark mode
7. **Use state layers** - Don't create custom hover colors
8. **Follow the grid** - 8px spacing for major elements

---

**Last Updated:** November 5, 2025
**MD3 Compliance:** 100%
**PYMSTR Version:** 1.0.0
