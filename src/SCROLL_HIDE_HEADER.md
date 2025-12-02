# Scroll-Hide Header Pattern

## Overview

PYMSTR implements a modern scroll-based header pattern that maximizes screen real estate while maintaining easy access to navigation. This is now a core part of the PYMSTR design system.

## Behavior

**Pattern:**
- **Scroll down** → Header slides up and disappears
- **Scroll up** → Header slides down and reappears  
- **Near top** (< 10px) → Header always visible
- **Smooth transition** → 300ms slide animation

## Implementation

### 1. State Management

```tsx
// In App.tsx
const [showHeader, setShowHeader] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);
```

### 2. Scroll Event Listener

```tsx
// Scroll-hide header (MD3 modern UX pattern)
// Hides header when scrolling down, shows when scrolling up
useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Show header when:
    // - Scrolling up (currentScrollY < lastScrollY)
    // - Near top of page (< 10px)
    if (currentScrollY < lastScrollY || currentScrollY < 10) {
      setShowHeader(true);
    } 
    // Hide header when:
    // - Scrolling down (currentScrollY > lastScrollY)
    // - Past scroll threshold (> 100px)
    else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setShowHeader(false);
    }
    
    setLastScrollY(currentScrollY);
  };

  // Use passive listener for better scroll performance
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, [lastScrollY]);
```

### 3. Header Styling

```tsx
{/* Top Header/App Bar - Scroll-hide pattern (MD3 modern UX)
    - Mobile: Full width with scroll-hide behavior
    - Desktop: Positioned after navigation rail (left-20 or left-64)
    - Slides up when scrolling down, slides down when scrolling up
*/}
<header className={`fixed top-0 left-0 right-0 z-40 bg-white dark:bg-[#0A0A0A] transition-transform duration-300 ${
  showHeader ? 'translate-y-0' : '-translate-y-full'
} ${
  isNavRailExpanded ? 'md:left-64' : 'md:left-20'
}`}>
  {/* Header content */}
</header>
```

### 4. Content Padding

```tsx
{/* Main Content 
    - pt-16 (64px): Accounts for fixed header height
    - pb-24 (96px): Spacing for mobile bottom navigation
    - md:pb-6: Reduced bottom padding on desktop (no bottom nav)
*/}
<main className="pt-16 pb-24 md:pb-6">
  {renderContent()}
</main>
```

## Key Implementation Details

### Positioning

- **Mobile:** `left-0 right-0` (full width)
- **Desktop collapsed rail:** `md:left-20` (80px offset)
- **Desktop expanded rail:** `md:left-64` (256px offset)

### Transitions

- **Header:** `transition-transform duration-300` (smooth slide)
- **Visible state:** `translate-y-0`
- **Hidden state:** `-translate-y-full`

### Scroll Thresholds

- **Hide threshold:** > 100px scroll down
- **Show threshold:** Any scroll up movement
- **Always show:** < 10px from top

### Content Spacing

- Main content needs `pt-16` (64px) to prevent content from hiding under fixed header
- Desktop: Left positioning adjusts automatically based on navigation rail state

## Benefits

✅ **Maximizes screen real estate** - Hides on scroll down for more content  
✅ **Easy access** - Reappears instantly on scroll up  
✅ **Modern UX pattern** - Common in mobile apps and progressive web apps  
✅ **Smooth animations** - 300ms transitions feel natural  
✅ **Responsive** - Adapts to navigation rail on desktop  
✅ **Performance optimized** - Uses passive scroll listeners  

## Design System Integration

This pattern is now documented in:
- `/guidelines/Guidelines.md` - Mobile Layout section
- `/guidelines/Guidelines.md` - Scroll-Hide Header Pattern section (detailed)
- `/App.tsx` - Reference implementation with inline comments

## Testing Checklist

- [ ] Header hides when scrolling down
- [ ] Header shows when scrolling up
- [ ] Header visible when at top of page (< 10px)
- [ ] Smooth 300ms slide animation
- [ ] Desktop: Header starts after navigation rail
- [ ] Desktop: Header position adjusts when rail expands/collapses
- [ ] Mobile: Header full width
- [ ] Content doesn't hide under header (pt-16 padding)
- [ ] No layout shift when header appears/disappears

## Browser Compatibility

✅ Modern browsers (Chrome, Firefox, Safari, Edge)  
✅ Mobile browsers (iOS Safari, Chrome Mobile)  
✅ Uses standard CSS transforms and transitions  
✅ Passive scroll listeners for 60fps performance  

---

**Last Updated:** December 2024  
**Status:** ✅ Production Ready - Core Design System Pattern
