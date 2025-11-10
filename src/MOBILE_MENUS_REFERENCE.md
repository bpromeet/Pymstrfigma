# MOBILE MENUS REFERENCE GUIDE

## Three Mobile Menus - Complete Breakdown

PYMSTR has **THREE SEPARATE MOBILE MENUS**. Each serves a different purpose and is located in a different place.

---

## Menu #1: THREE DOTS MENU (More Menu)

**What is it?**
- A bottom sheet that slides up from the bottom of the screen
- Opens when you click the "More" tab (MoreHorizontal icon - three horizontal dots) in the Footer

**Where is it?**
- File: `/components/BottomNavigation.tsx`
- Component: `<Sheet>` with `<SheetContent side="bottom">`
- Lines: ~109-148

**How to trigger it:**
1. Click the "More" tab in the Footer (bottom navigation bar)
2. A bottom sheet slides up from the bottom

**What's inside:**
```
- Links
- Wallets
- API
- Webhooks
- Settings
- Documents
--- separator ---
- Account
- Security
- Legal
- Help
--- separator ---
- Logout
```

**Key identifying code:**
```tsx
// THREE DOTS MENU - Bottom sheet that opens from "More" tab
<Sheet open={showMoreSheet} onOpenChange={setShowMoreSheet}>
  <SheetContent side="bottom" className="h-auto rounded-t-3xl ...">
    <SheetTitle>More Options</SheetTitle>
    // Menu items here
  </SheetContent>
</Sheet>
```

**Visual marker:**
- Opens as a sliding bottom sheet
- Has "More Options" as the title
- Contains 11 menu items with two separators:
  - First separator before Account (groups Account, Security, Legal, Help together)
  - Second separator before Logout

---

## Menu #2: FOOTER (Bottom Navigation Bar)

**What is it?**
- The fixed bottom navigation bar that's always visible on mobile
- Contains 4 tabs for quick navigation

**Where is it?**
- File: `/components/BottomNavigation.tsx`
- Component: `<nav>` with `fixed bottom-0`
- Lines: ~80-106

**What's inside:**
```
1. Dashboard (LayoutDashboard icon)
2. Wallets (Wallet icon)
3. Reports (FileText icon)
4. More (MoreHorizontal icon - three dots)
```

**Key identifying code:**
```tsx
// FOOTER - Fixed bottom navigation bar
<nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#394B5C] border-t border-[#43586C] md:hidden shadow-md">
  <div className="flex items-center justify-around h-20 px-2">
    {/* Dashboard, Wallets, Reports, More tabs */}
  </div>
</nav>
```

**Visual marker:**
- Always visible at the bottom of screen
- 80px tall (h-20)
- 4 icon buttons with labels underneath
- Blue pill background for active tab

---

## Menu #3: AVATAR MENU

**What is it?**
- A dropdown menu that appears when you click the avatar in the top-right corner
- Quick access to user-specific settings and actions

**Where is it?**
- File: `/App.tsx`
- Component: `<DropdownMenu>` triggered by Avatar
- Lines: ~6964-7052

**How to trigger it:**
1. Click the avatar image in the top-right corner of the mobile header
2. Dropdown menu appears below the avatar

**What's inside:**
```
- Wallets
- Team
--- separator ---
- Settings
- Documents
--- separator ---
- Account
- Security
- Legal
- Help
- End User View
--- separator ---
- Logout
```

**Key identifying code:**
```tsx
// AVATAR MENU - Top-right dropdown
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button className="flex items-center gap-2 ...">
      <Avatar className="h-10 w-10">
        // Avatar image
      </Avatar>
    </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-56 ...">
    // Menu items here
  </DropdownMenuContent>
</DropdownMenu>
```

**Visual marker:**
- Triggered by avatar click (top-right)
- Appears as a dropdown (not bottom sheet)
- Shows user info at top (John Doe, john@pymstr.com)
- Contains 11 menu items with 3 separators

---

## Quick Visual Reference

```
┌─────────────────────────────────────┐
│  PYMSTR Logo          🌙  [Avatar] │  ← Click avatar = AVATAR MENU (#3)
│                                     │
│                                     │
│        Main Content Area            │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
├─────────────────────────────────────┤
│  📊      💰      📄      ⋯          │  ← FOOTER (#2) - Bottom Nav Bar
│Dashboard Wallets Reports More       │    Click "More" = THREE DOTS MENU (#1)
└─────────────────────────────────────┘
```

---

## How to Modify Each Menu

### To modify THREE DOTS MENU (#1):
1. Open `/components/BottomNavigation.tsx`
2. Find the `moreItems` array (line ~29)
3. Or find the `<Sheet>` component with comment "THREE DOTS MENU"
4. Make your changes

### To modify FOOTER (#2):
1. Open `/components/BottomNavigation.tsx`
2. Find the `navItems` array (line ~22)
3. Or find the `<nav>` component with comment "FOOTER"
4. Make your changes

### To modify AVATAR MENU (#3):
1. Open `/App.tsx`
2. Search for "AVATAR MENU" comment
3. Find the `<DropdownMenu>` component (around line 6964)
4. Make your changes

---

## Common Mistakes to Avoid

❌ **DON'T** confuse the Three Dots Menu with the Avatar Menu
- Three Dots = Bottom sheet from clicking "More" in Footer
- Avatar Menu = Dropdown from clicking avatar in header

❌ **DON'T** confuse the Three Dots icon with the More tab
- Three Dots Menu = The bottom sheet that OPENS
- More tab = The button in the Footer that TRIGGERS the menu

❌ **DON'T** modify all three menus when asked to change one
- Always clarify WHICH menu needs changes
- Use the numbered reference: Menu #1, #2, or #3

---

## Current Menu Contents (Reference)

### THREE DOTS MENU (#1) - 11 items
1. Links
2. Wallets
3. API
4. Webhooks
5. Settings
6. Documents
7. (separator)
8. Account
9. Security
10. Legal
11. Help
12. (separator)
13. Logout

### FOOTER (#2) - 4 tabs
1. Dashboard
2. Wallets
3. Reports
4. More

### AVATAR MENU (#3) - 11 items
1. Wallets
2. Team
3. (separator)
4. Settings
5. Documents
6. (separator)
7. Account
8. Security
9. Legal
10. Help
11. End User View
12. (separator)
13. Logout

---

## File Locations Summary

| Menu | File | Component Type | Line Range |
|------|------|---------------|------------|
| THREE DOTS MENU (#1) | `/components/BottomNavigation.tsx` | Sheet (bottom) | ~109-148 |
| FOOTER (#2) | `/components/BottomNavigation.tsx` | nav (fixed bottom) | ~80-106 |
| AVATAR MENU (#3) | `/App.tsx` | DropdownMenu | ~6964-7052 |

---

## When User Says "Three Dots Menu"...

They mean **Menu #1** - The bottom sheet that opens when clicking "More" in the Footer.

**NOT:**
- The Footer itself (that's Menu #2)
- The Avatar Menu (that's Menu #3)
- The three vertical dots in desktop navigation (different component)

---

**Last Updated:** Based on current code structure  
**Reference:** See images with numbered circles (1, 2, 3) showing each menu location
