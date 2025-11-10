# Layout & Responsive Design Checklist

## ⚠️ CRITICAL: Always Follow These Rules to Prevent Layout Bugs

### 1. Container Width Rules
**Problem**: Content overflows or breaks when nav rail expands
**Solution**: Always use proper max-width + mx-auto

```tsx
✅ CORRECT:
<div className="max-w-7xl mx-auto px-6 lg:px-8">
  {/* Content properly contained and centered */}
</div>

❌ WRONG:
<div className="max-w-7xl px-6 lg:px-8">
  {/* Missing mx-auto - content will overflow on nav rail expansion */}
</div>

❌ WRONG:
<div className="w-full px-6">
  {/* No max-width constraint - content stretches too wide */}
</div>
```

### 2. Responsive Padding with Navigation Rail
**Problem**: Content doesn't adjust when desktop nav rail expands/collapses
**Solution**: Dynamic padding controlled by parent component state

```tsx
✅ CORRECT:
// In App.tsx
const [isNavRailExpanded, setIsNavRailExpanded] = useState(false);

<div 
  className={`${
    activeTab !== "checkout" && activeTab !== "userdashboard" 
      ? isNavRailExpanded ? "md:pl-64" : "md:pl-20"
      : ""
  }`}
  style={{transition: 'padding-left 1500ms ease-out'}}
>
  {/* Content area */}
</div>

❌ WRONG:
<div className="md:pl-20">
  {/* Static padding - doesn't adjust when rail expands to 256px */}
</div>
```

### 3. Card and Content Constraints
**Problem**: Cards overflow their containers
**Solution**: Ensure cards use flex/grid properly with overflow handling

```tsx
✅ CORRECT:
<div className="grid grid-cols-1 gap-6">
  <Card className="overflow-hidden">
    <CardContent className="p-6">
      {/* Content constrained within card */}
    </CardContent>
  </Card>
</div>

✅ CORRECT:
<div className="flex flex-col gap-4">
  <div className="min-w-0 flex-1">
    <p className="truncate">{longText}</p>
  </div>
</div>

❌ WRONG:
<Card className="w-screen">
  {/* Fixed width that ignores container constraints */}
</Card>

❌ WRONG:
<div className="flex">
  <p>{longText}</p>
  {/* No min-w-0 or truncate - text will force container to expand */}
</div>
```

### 4. Flexbox Best Practices
**Problem**: Flex children cause container overflow
**Solution**: Use flex-shrink, min-w-0, and truncate appropriately

```tsx
✅ CORRECT:
<div className="flex items-center gap-3">
  <div className="flex-1 min-w-0">
    <h4 className="truncate">{title}</h4>
  </div>
  <div className="flex-shrink-0">
    <Badge>Status</Badge>
  </div>
</div>

❌ WRONG:
<div className="flex items-center gap-3">
  <div className="flex-1">
    <h4>{title}</h4> {/* No truncate - long titles break layout */}
  </div>
  <div>
    <Badge>Status</Badge> {/* No flex-shrink-0 - badge can compress */}
  </div>
</div>
```

### 5. PageLayout Component Usage
**Problem**: Content doesn't align properly with nav rail
**Solution**: Always use PageLayout wrapper components

```tsx
✅ CORRECT:
<PageLayout>
  <PageLayout.Header
    title="Payment Links"
    subtitle="Manage your payment links"
  />
  <PageLayout.Content>
    <div className="space-y-6">
      {/* Page content */}
    </div>
  </PageLayout.Content>
</PageLayout>

❌ WRONG:
<div className="min-h-screen p-6">
  <h1>Payment Links</h1>
  <div>
    {/* Missing max-width constraints and proper structure */}
  </div>
</div>
```

### 6. Mobile FAB Positioning
**Problem**: FAB overlaps with bottom navigation or content
**Solution**: Use proper fixed positioning with adequate spacing

```tsx
✅ CORRECT:
<button className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full md:hidden">
  {/* bottom-24 = 96px - clears 80px bottom nav + 16px spacing */}
</button>

❌ WRONG:
<button className="fixed bottom-6 right-6 w-14 h-14 rounded-full md:hidden">
  {/* bottom-6 = 24px - overlaps with bottom navigation */}
</button>
```

### 7. Transition Consistency
**Problem**: Jarring animations or slow button interactions
**Solution**: Use PYMSTR two-speed system

```tsx
✅ CORRECT - Button interactions (200ms):
<Button className="transition-all duration-200 hover:bg-[#1565C0]">
  Click Me
</Button>

✅ CORRECT - Layout changes (1500ms):
<div 
  className="w-20 hover:w-64"
  style={{transition: 'width 1500ms ease-out'}}
>
  {/* Nav rail expansion */}
</div>

❌ WRONG:
<Button className="transition-all duration-[1500ms] hover:bg-blue-600">
  {/* Too slow - feels sluggish */}
</Button>
```

---

## Pre-Flight Checklist Before Committing Layout Changes

- [ ] ✅ All containers have `max-w-*` + `mx-auto` for proper centering
- [ ] ✅ Content area has dynamic padding for nav rail: `md:pl-20` → `md:pl-64`
- [ ] ✅ Padding transitions use `1500ms` for smooth theme changes
- [ ] ✅ Flex containers use `min-w-0` and `truncate` for long text
- [ ] ✅ Cards use `overflow-hidden` to prevent content overflow
- [ ] ✅ Buttons use `transition-all duration-200` for instant feedback
- [ ] ✅ Mobile FABs positioned with `bottom-24` (above bottom nav)
- [ ] ✅ PageLayout wrapper used for all admin pages
- [ ] ✅ Responsive breakpoints tested: mobile (< 640px), tablet (768px), desktop (1024px+)
- [ ] ✅ Dark mode tested for color contrast and visibility

---

## Common Layout Bug Patterns to Avoid

### ❌ Bug Pattern 1: Missing mx-auto
**Symptom**: Content shifts left when nav rail expands
**Fix**: Add `mx-auto` to container with `max-w-*`

### ❌ Bug Pattern 2: Static Padding
**Symptom**: Nav rail covers content when expanded
**Fix**: Use dynamic padding controlled by `isNavRailExpanded` state

### ❌ Bug Pattern 3: No Text Truncation
**Symptom**: Long text causes horizontal scroll or overflow
**Fix**: Add `min-w-0` to flex parent, `truncate` to text element

### ❌ Bug Pattern 4: Fixed Widths
**Symptom**: Elements don't resize responsively
**Fix**: Use `w-full`, `flex-1`, or responsive utilities instead of `w-[600px]`

### ❌ Bug Pattern 5: Missing Flex Shrink
**Symptom**: Badges/icons get compressed when container shrinks
**Fix**: Add `flex-shrink-0` to elements that should maintain size

---

## Testing Workflow

1. **Test Desktop Nav Rail Expansion**:
   - Collapsed (80px): Content should have proper left padding
   - Expanded (256px): Content should smoothly shift right
   - No content should overflow or get cut off

2. **Test Responsive Breakpoints**:
   - Mobile (< 640px): Single column, FAB positioned correctly
   - Tablet (768px): Dual column if applicable, nav rail appears
   - Desktop (1024px+): Full layout with nav rail

3. **Test Dark Mode**:
   - All backgrounds transition smoothly (1500ms)
   - Text remains readable with proper contrast
   - Borders visible in both modes

4. **Test Long Content**:
   - Long titles truncate properly
   - Long descriptions wrap or truncate
   - No horizontal scrolling

5. **Test Empty States**:
   - Empty content areas don't collapse
   - Layout maintains structure with no data

---

## Quick Reference: Tailwind Classes

### Container Width
- `max-w-7xl` (1280px) - Standard page content
- `max-w-4xl` (896px) - Narrow reading content
- `max-w-2xl` (672px) - Dialogs
- `mx-auto` - **ALWAYS** pair with max-w-*

### Padding (8dp Grid)
- `p-4` (16px), `p-6` (24px), `p-8` (32px)
- `px-6 lg:px-8` - Responsive horizontal padding
- `py-4 md:py-6` - Responsive vertical padding

### Flexbox
- `flex-1` - Fill available space
- `flex-shrink-0` - Prevent compression
- `min-w-0` - Allow text truncation
- `truncate` - Ellipsis overflow

### Transitions
- `transition-all duration-200` - Button interactions
- `transition-all duration-[1500ms]` - Theme changes (or use inline style)
- `style={{transition: 'width 1500ms ease-out'}}` - Layout changes

### Positioning
- `fixed` - FABs, overlays
- `sticky` - Headers that follow scroll
- `relative` - Positioning context
- `absolute` - Positioned children

---

## When to Update This Checklist

Add new items when:
1. A layout bug is discovered and fixed
2. A new responsive pattern is established
3. A new component type is created
4. Guidelines.md adds layout-related rules

**Last Updated**: November 10, 2025
**Reason**: Fixed nav rail expansion causing content overflow
