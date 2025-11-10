# MD3 Mobile Patterns for PYMSTR

Complete guide to Material Design 3 mobile interface patterns for PYMSTR dashboards and forms.

---

## 🎯 Mobile FAB Positioning (Primary Pattern)

### Standard Bottom-Right FAB (Recommended)

```tsx
// ✅ BEST PRACTICE: Bottom-right FAB for primary actions
<button 
  className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#07D7FF] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#07D7FF] focus:ring-offset-2 transition-all duration-200 flex items-center justify-center md:hidden"
  aria-label="Create payment link"
>
  <Plus className="w-6 h-6" />
</button>
```

**Specifications:**
- **Position**: `fixed bottom-6 right-6` (24px from edges)
- **Size**: `w-14 h-14` (56px × 56px - MD3 standard)
- **Color**: `#07D7FF` (PYMSTR secondary/cyan)
- **Icon**: `w-6 h-6` (24px)
- **Elevation**: `shadow-lg` (Level 3)
- **Z-index**: `z-50` (above content, below overlays)
- **Visibility**: `md:hidden` (mobile only)

**Why Bottom-Right?**
1. ✅ Thumb-reachable for 80%+ users (right-handed)
2. ✅ MD3 standard position
3. ✅ Doesn't block content
4. ✅ Consistent with other Material apps
5. ✅ Natural action flow (swipe up from bottom)

---

## 📱 Mobile Dashboard Layouts

### Layout 1: FAB + Bottom Sheet (Best for Single Primary Action)

**Use when:** You have one main action (e.g., "Create Payment Link")

```tsx
export const MobileDashboardFAB = () => {
  const [showCreateSheet, setShowCreateSheet] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#2E3C49] pb-24">
      {/* Sticky Header */}
      <header className="sticky top-0 bg-white dark:bg-[#303030] border-b border-[#43586C] p-4 z-40 shadow-sm">
        <h1 className="text-xl font-medium">Payment Links</h1>
        
        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#798A9B]" />
          <Input
            placeholder="Search links..."
            className="pl-12 h-12"
          />
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="p-4 space-y-4">
        {/* Payment link cards */}
      </main>

      {/* Primary FAB (Bottom-Right) */}
      <button 
        onClick={() => setShowCreateSheet(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#07D7FF] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center md:hidden"
        aria-label="Create payment link"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Bottom Sheet */}
      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent 
          side="bottom" 
          className="h-[90vh] rounded-t-3xl bg-white dark:bg-[#303030] p-6"
        >
          <SheetHeader className="mb-6">
            <SheetTitle>Create Payment Link</SheetTitle>
          </SheetHeader>
          <PaymentLinkForm />
        </SheetContent>
      </Sheet>
    </div>
  );
};
```

**Pros:**
- ✅ Clean, uncluttered interface
- ✅ FAB stays out of the way
- ✅ Bottom sheet provides full-screen form
- ✅ Easy one-thumb operation

**Cons:**
- ⚠️ Hides secondary actions
- ⚠️ Requires tap to see form

---

### Layout 2: Multiple FABs (Vertical Stack)

**Use when:** You have 2-3 related quick actions

```tsx
export const MobileDashboardMultiFAB = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#2E3C49] pb-24">
      {/* Header & Content */}
      <header className="sticky top-0 bg-white dark:bg-[#303030] border-b border-[#43586C] p-4 z-40">
        <h1 className="text-xl font-medium">Payment Links</h1>
      </header>

      <main className="p-4 space-y-4">
        {/* Content */}
      </main>

      {/* Secondary FAB (Filter) - Above Primary */}
      <button 
        onClick={() => setShowFilter(true)}
        className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full bg-[#303030] text-[#F6F7F9] shadow-lg hover:shadow-xl hover:bg-[#43586C] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center md:hidden"
        aria-label="Filter payment links"
      >
        <Filter className="w-5 h-5" />
      </button>

      {/* Primary FAB (Create) - Bottom Position */}
      <button 
        onClick={() => setShowCreate(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#07D7FF] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center md:hidden"
        aria-label="Create payment link"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};
```

**Spacing:**
- Primary FAB: `bottom-6` (24px from bottom)
- Secondary FAB: `bottom-24` (96px from bottom = 72px gap above primary)
- Tertiary FAB (if needed): `bottom-42` (168px = 72px gap above secondary)

**Sizing:**
- Primary: `w-14 h-14` (56px) with `w-6 h-6` (24px) icon
- Secondary: `w-12 h-12` (48px) with `w-5 h-5` (20px) icon

**Pros:**
- ✅ Multiple quick actions visible
- ✅ Clear action hierarchy
- ✅ Fast access without sheets

**Cons:**
- ⚠️ Takes more screen space
- ⚠️ Can obstruct bottom content
- ⚠️ Maximum 3 FABs (more = cluttered)

---

### Layout 3: Extended FAB (With Label)

**Use when:** Action needs text clarification

```tsx
export const MobileDashboardExtendedFAB = () => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#2E3C49] pb-24">
      {/* Header & Content */}
      <main className="p-4">
        {/* Content */}
      </main>

      {/* Extended FAB (Icon + Label) */}
      <button 
        onClick={() => setShowCreate(true)}
        className="fixed bottom-6 right-6 z-50 px-6 py-3 min-h-14 rounded-full bg-[#07D7FF] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 md:hidden"
        aria-label="Create payment link"
      >
        <Plus className="w-6 h-6" />
        <span className="font-medium">Create Link</span>
      </button>
    </div>
  );
};
```

**Specifications:**
- **Padding**: `px-6 py-3` (24px × 12px)
- **Min-height**: `min-h-14` (56px)
- **Gap**: `gap-2` (8px between icon and text)
- **Width**: Auto (expands to fit text)

**Pros:**
- ✅ Self-explanatory action
- ✅ More prominent
- ✅ Better for first-time users

**Cons:**
- ⚠️ Takes more screen width
- ⚠️ Can obstruct more content
- ⚠️ Only for primary action (don't stack extended FABs)

---

### Layout 4: Sticky Bottom Bar

**Use when:** You have 2-3 equal-priority actions

```tsx
export const MobileDashboardBottomBar = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#2E3C49] pb-24">
      {/* Header & Content */}
      <main className="p-4 space-y-4">
        {/* Content */}
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#303030] border-t border-[#43586C] p-4 z-50 md:hidden shadow-[0px_-2px_8px_rgba(0,0,0,0.1)]">
        <div className="flex gap-3">
          {/* Primary Action */}
          <Button 
            onClick={() => setShowCreate(true)}
            className="flex-1 min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full"
          >
            <Plus className="w-[18px] h-[18px] mr-2" />
            Create
          </Button>
          
          {/* Secondary Action */}
          <Button 
            onClick={() => setShowFilter(true)}
            className="flex-1 min-h-12 bg-transparent border border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD] rounded-full"
          >
            <Filter className="w-[18px] h-[18px] mr-2" />
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};
```

**Specifications:**
- **Position**: `fixed bottom-0 left-0 right-0`
- **Padding**: `p-4` (16px)
- **Border**: `border-t` (top border for separation)
- **Shadow**: Upward shadow for elevation
- **Buttons**: `flex-1` (equal width), `min-h-12` (48px touch target)
- **Gap**: `gap-3` (12px between buttons)

**Pros:**
- ✅ Multiple actions always visible
- ✅ Clear equal-priority actions
- ✅ No overlapping content
- ✅ Good for "Action vs Cancel" patterns

**Cons:**
- ⚠️ Takes permanent screen space (72-80px)
- ⚠️ Reduces content viewport
- ⚠️ Best for max 2-3 buttons

---

### Layout 5: Bottom Sheet Menu (Multiple Options)

**Use when:** Primary action has multiple sub-options

```tsx
export const MobileDashboardSheetMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#2E3C49] pb-24">
      {/* Header & Content */}
      <main className="p-4 space-y-4">
        {/* Content */}
      </main>

      {/* FAB triggers bottom sheet menu */}
      <button 
        onClick={() => setShowMenu(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#07D7FF] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center md:hidden"
        aria-label="Quick actions"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Bottom Sheet with Action Menu */}
      <Sheet open={showMenu} onOpenChange={setShowMenu}>
        <SheetContent 
          side="bottom" 
          className="h-auto rounded-t-3xl bg-white dark:bg-[#303030] p-6"
        >
          <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
          
          <div className="space-y-3">
            <Button className="w-full min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full justify-start px-6">
              <Link className="w-[18px] h-[18px] mr-3" />
              Create Payment Link
            </Button>
            
            <Button className="w-full min-h-12 bg-transparent border border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD] rounded-full justify-start px-6">
              <FileText className="w-[18px] h-[18px] mr-3" />
              Generate Invoice
            </Button>
            
            <Button className="w-full min-h-12 bg-transparent border border-[#43586C] text-[#F6F7F9] hover:bg-white/[0.08] rounded-full justify-start px-6">
              <Download className="w-[18px] h-[18px] mr-3" />
              Export Data
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
```

**Pros:**
- ✅ Single FAB keeps UI clean
- ✅ Multiple options organized
- ✅ Full action context visible
- ✅ Easy to add/remove actions

**Cons:**
- ⚠️ Extra tap to access actions
- ⚠️ Actions hidden initially

---

## 🎨 Mobile Pattern Comparison

| Pattern | Use Case | Primary Action | Secondary Actions | Screen Space |
|---------|----------|----------------|-------------------|--------------|
| **Single FAB** | One main action | Bottom-right FAB | None or in menu | Minimal |
| **Multi-FAB** | 2-3 quick actions | Bottom-right FAB | Stacked above | Moderate |
| **Extended FAB** | Needs text label | Bottom-right extended | None | Moderate |
| **Bottom Bar** | 2-3 equal actions | Left button | Right button(s) | High (permanent) |
| **Sheet Menu** | Multiple sub-options | FAB opens menu | In bottom sheet | Minimal |

---

## 📐 Mobile Touch Targets (MD3 48dp Minimum)

### Touch Target Requirements

**All interactive elements on mobile:**
- ✅ **Minimum**: 48px × 48px (`min-h-12`)
- ✅ **Spacing**: 8px minimum between targets
- ✅ **Standard FAB**: 56px × 56px (exceeds minimum)
- ✅ **Small FAB**: 48px × 48px (meets minimum)
- ✅ **Buttons**: 48px height minimum

### Examples

```tsx
// ✅ CORRECT: 48px minimum touch target
<Button className="min-h-12 px-6 py-2.5 rounded-full">
  Action
</Button>

// ✅ CORRECT: Standard FAB exceeds minimum
<button className="w-14 h-14 rounded-full">
  <Plus className="w-6 h-6" />
</button>

// ❌ WRONG: Too small for mobile
<Button className="h-8 px-4 py-2 rounded-full">
  Action
</Button>
```

---

## 🎯 PYMSTR Mobile Dashboard Recommendations

### For Payment Links Dashboard (Main Screen)

**Recommended Pattern: Single FAB + Bottom Sheet**

```tsx
export const PaymentLinksDashboard = () => {
  const [showCreateSheet, setShowCreateSheet] = useState(false);

  return (
    <>
      {/* Mobile: FAB Bottom-Right */}
      <button 
        onClick={() => setShowCreateSheet(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#07D7FF] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#07D7FF] focus:ring-offset-2 transition-all duration-200 flex items-center justify-center md:hidden"
        aria-label="Create payment link"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Desktop: Toolbar Button */}
      <Button className="hidden md:inline-flex min-h-12 px-8 py-3 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full">
        <Plus className="w-[18px] h-[18px] mr-2" />
        Create Payment Link
      </Button>

      {/* Mobile: Bottom Sheet */}
      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
          <PaymentLinkForm />
        </SheetContent>
      </Sheet>
    </>
  );
};
```

**Why?**
1. ✅ Primary action is "Create Payment Link" (most common)
2. ✅ Clean interface without clutter
3. ✅ Bottom sheet provides full-screen form
4. ✅ Easy thumb reach (bottom-right)
5. ✅ Consistent with MD3 standards

### For Multi-Action Screens

**Recommended Pattern: Multi-FAB (Vertical Stack)**

```tsx
// Filter FAB (secondary)
<button 
  className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full bg-[#303030] text-[#F6F7F9] shadow-lg md:hidden"
  aria-label="Filter"
>
  <Filter className="w-5 h-5" />
</button>

// Create FAB (primary)
<button 
  className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#07D7FF] text-white shadow-lg md:hidden"
  aria-label="Create"
>
  <Plus className="w-6 h-6" />
</button>
```

---

## ✅ Mobile FAB Checklist

When implementing mobile FABs in PYMSTR:

- [ ] **Position**: Bottom-right (`fixed bottom-6 right-6`)
- [ ] **Size**: Standard 56px (`w-14 h-14`) for primary FAB
- [ ] **Color**: Cyan `#07D7FF` (PYMSTR secondary color)
- [ ] **Icon**: 24px (`w-6 h-6`)
- [ ] **Elevation**: Shadow Level 3 (`shadow-lg`)
- [ ] **Hover**: Scale to 105% + shadow-xl
- [ ] **Active**: Scale to 95%
- [ ] **Focus**: Ring `ring-2 ring-[#07D7FF] ring-offset-2`
- [ ] **ARIA**: Label for accessibility
- [ ] **Responsive**: Hidden on desktop (`md:hidden`)
- [ ] **Z-index**: Above content (`z-50`)
- [ ] **Animation**: Transition 200ms
- [ ] **Desktop**: Toolbar button as alternative

---

## 🎉 Summary

**For PYMSTR Mobile:**
1. ✅ Use **bottom-right FAB** for primary actions
2. ✅ **56px size** with cyan color (`#07D7FF`)
3. ✅ Open **bottom sheet** for forms/actions
4. ✅ Hide on desktop, use **toolbar buttons** instead
5. ✅ **48px minimum** touch targets for all mobile elements
6. ✅ **Stack FABs vertically** if multiple actions needed
7. ✅ Keep it **simple** - max 3 FABs per screen

**Pattern Selection:**
- **1 primary action** → Single FAB + Bottom Sheet ✅ Recommended
- **2-3 quick actions** → Multi-FAB (vertical stack)
- **2-3 equal actions** → Sticky Bottom Bar
- **Multiple sub-options** → FAB with Sheet Menu
- **Need text clarification** → Extended FAB

---

**Last Updated:** November 5, 2025  
**MD3 Compliance:** 100%  
**Mobile-First:** Yes
