# 🚨 MOBILE LAYOUT & OVERFLOW PREVENTION (MANDATORY)

**CRITICAL: Follow these rules for EVERY component, page, text element, and container to prevent mobile layout bugs.**

## Universal Layout Rules (Apply to Everything)

### 1. Text Overflow Prevention (MANDATORY for all text)

**Rule:** All text must be constrained and truncatable. Never let text break layouts.

**For single-line text (labels, titles, buttons):**
```tsx
// ✅ CORRECT: Truncate with ellipsis
<div className="truncate">Long text that will be cut off...</div>
<span className="truncate">Button label that might overflow</span>

// ✅ CORRECT: With max-width constraint
<p className="max-w-full truncate">Any text content</p>

// ❌ WRONG: No truncation (will overflow on mobile)
<div>Very long text without constraints</div>
```

**For multi-line text (descriptions, paragraphs):**
```tsx
// ✅ CORRECT: Line clamp for multi-line
<p className="line-clamp-2">Long description that will be limited to 2 lines with ellipsis...</p>
<div className="line-clamp-3">Multi-line content constrained to 3 lines</div>

// ✅ CORRECT: Break words if needed
<p className="break-words">VeryLongWordWithoutSpaces_ThatNeedsToBreak</p>

// ❌ WRONG: No line limits
<p>Very long paragraph with no constraints that will break mobile layout</p>
```

### 2. Container Width Constraints (MANDATORY for all containers)

**Rule:** Every container must have a max-width or responsive width constraint.

**Page-level containers:**
```tsx
// ✅ CORRECT: Max-width with auto margins (centered)
<div className="max-w-7xl mx-auto px-4">Page content</div>
<div className="max-w-4xl mx-auto">Narrower content</div>

// ✅ CORRECT: Full width with padding
<div className="w-full px-4">Mobile-optimized content</div>

// ❌ WRONG: No width constraint
<div className="px-4">Content without max-width</div>
```

**Card containers:**
```tsx
// ✅ CORRECT: Full width responsive
<Card className="w-full rounded-2xl">...</Card>

// ✅ CORRECT: Grid with responsive columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card className="rounded-2xl">...</Card>
</div>

// ❌ WRONG: Fixed width that breaks mobile
<Card className="w-[600px]">...</Card>
```

**Button containers inside flex/grid:**
```tsx
// ✅ CORRECT: Full width on mobile, auto on desktop
<Button className="w-full sm:w-auto">Action</Button>

// ✅ CORRECT: Flex with proper constraints
<div className="flex flex-col sm:flex-row gap-3">
  <Button className="flex-1">Left</Button>
  <Button className="flex-1">Right</Button>
</div>

// ❌ WRONG: Fixed width button
<Button className="w-64">Too wide for mobile</Button>
```

### 3. Flex Layout Rules (MANDATORY for flex containers)

**Rule:** Flex children must have `min-w-0` or `flex-shrink` to prevent overflow.

**Basic flex layouts:**
```tsx
// ✅ CORRECT: Flex with min-w-0 to allow shrinking
<div className="flex items-center gap-3">
  <Icon className="flex-shrink-0 w-5 h-5" />
  <div className="min-w-0 flex-1">
    <p className="truncate">Text that can truncate</p>
  </div>
</div>

// ✅ CORRECT: Stack on mobile, row on desktop
<div className="flex flex-col sm:flex-row gap-4">
  <div className="flex-1">Content</div>
  <div className="flex-1">Content</div>
</div>

// ❌ WRONG: Flex without min-w-0 (children will overflow)
<div className="flex items-center gap-3">
  <Icon className="w-5 h-5" />
  <p>Long text without constraints</p>
</div>
```

**Complex nested flex:**
```tsx
// ✅ CORRECT: Nested flex with proper constraints
<div className="flex items-center justify-between gap-4">
  <div className="min-w-0 flex-1 flex items-center gap-3">
    <Icon className="flex-shrink-0 w-5 h-5" />
    <div className="min-w-0">
      <p className="truncate font-medium">Title</p>
      <p className="truncate text-sm text-muted-foreground">Subtitle</p>
    </div>
  </div>
  <Button className="flex-shrink-0">Action</Button>
</div>

// ❌ WRONG: No min-w-0 on text container
<div className="flex items-center justify-between gap-4">
  <div className="flex items-center gap-3">
    <Icon className="w-5 h-5" />
    <div>
      <p className="font-medium">Title that will overflow</p>
      <p className="text-sm">Subtitle that will overflow</p>
    </div>
  </div>
  <Button>Action</Button>
</div>
```

### 4. Button Layout Rules (MANDATORY for all buttons)

**Rule:** Buttons must have responsive sizing and proper text constraints.

**Button with icon and text:**
```tsx
// ✅ CORRECT: Dynamic width with proper spacing
<Button className="px-6 py-2.5 min-h-12 rounded-full">
  <Icon className="w-[18px] h-[18px] mr-2 flex-shrink-0" />
  <span className="truncate">Button Label</span>
</Button>

// ✅ CORRECT: Full width on mobile
<Button className="w-full sm:w-auto min-h-12 rounded-full">
  <Icon className="w-[18px] h-[18px] mr-2" />
  Action
</Button>

// ❌ WRONG: Fixed width button
<Button className="w-48 rounded-full">Fixed Width</Button>

// ❌ WRONG: No truncate on label
<Button className="rounded-full">
  <Icon className="w-[18px] h-[18px] mr-2" />
  Very Long Button Label That Will Overflow
</Button>
```

**Button groups:**
```tsx
// ✅ CORRECT: Responsive button group
<div className="flex flex-col sm:flex-row gap-3">
  <Button className="w-full sm:w-auto rounded-full">Primary</Button>
  <Button className="w-full sm:w-auto rounded-full">Secondary</Button>
</div>

// ✅ CORRECT: Equal-width flex group
<div className="flex gap-3">
  <Button className="flex-1 rounded-full">Cancel</Button>
  <Button className="flex-1 rounded-full">Confirm</Button>
</div>

// ❌ WRONG: Fixed widths
<div className="flex gap-3">
  <Button className="w-32">Cancel</Button>
  <Button className="w-32">Confirm</Button>
</div>
```

### 5. Text Color Inheritance (MANDATORY for nested text)

**Rule:** Always specify text color explicitly, especially inside buttons or interactive elements.

**Inside buttons:**
```tsx
// ✅ CORRECT: Explicit text color
<Button variant="outline" className="rounded-full">
  <div className="flex items-center gap-3">
    <Icon className="w-5 h-5 text-[#07D7FF]" />
    <div className="text-left">
      <div className="font-medium text-foreground">Title</div>
      <div className="text-sm text-muted-foreground">Description</div>
    </div>
  </div>
</Button>

// ❌ WRONG: No explicit color (may be invisible)
<Button variant="outline" className="rounded-full">
  <div className="flex items-center gap-3">
    <Icon className="w-5 h-5" />
    <div className="text-left">
      <div className="font-medium">Title</div>
      <div className="text-sm">Description</div>
    </div>
  </div>
</Button>
```

**Inside cards:**
```tsx
// ✅ CORRECT: Explicit colors for all text
<Card className="rounded-2xl">
  <CardHeader>
    <CardTitle className="text-foreground">Title</CardTitle>
    <CardDescription className="text-muted-foreground">Description</CardDescription>
  </CardHeader>
</Card>

// ❌ WRONG: Relying on inheritance (may fail in dark mode)
<Card className="rounded-2xl">
  <div className="font-bold">Title</div>
  <div className="text-sm">Description</div>
</Card>
```

### 6. Grid Layout Rules (MANDATORY for all grids)

**Rule:** Grids must be responsive with proper column counts at each breakpoint.

**Responsive grids:**
```tsx
// ✅ CORRECT: Mobile-first responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card className="rounded-2xl">Item 1</Card>
  <Card className="rounded-2xl">Item 2</Card>
  <Card className="rounded-2xl">Item 3</Card>
</div>

// ✅ CORRECT: Auto-fit with min-max
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  <div className="min-w-0">Content</div>
</div>

// ❌ WRONG: Fixed columns that break mobile
<div className="grid grid-cols-3 gap-4">
  <Card>Too many columns on mobile</Card>
</div>
```

### 7. Padding & Spacing Rules (MANDATORY for all containers)

**Rule:** Use responsive padding that adapts to screen size.

**Page padding:**
```tsx
// ✅ CORRECT: Responsive horizontal padding
<div className="px-4 sm:px-6 lg:px-8">Content</div>

// ✅ CORRECT: Vertical spacing with mobile optimization
<div className="py-6 md:py-8 lg:py-12">Content</div>

// ❌ WRONG: Fixed padding that's too large on mobile
<div className="px-12 py-8">Content</div>
```

**Card padding:**
```tsx
// ✅ CORRECT: Responsive card padding
<Card className="rounded-2xl p-4 sm:p-6">Content</Card>

// ❌ WRONG: Excessive padding on mobile
<Card className="rounded-2xl p-8">Content</Card>
```

### 8. Touch Target Rules (MANDATORY for interactive elements)

**Rule:** All interactive elements must meet 48px minimum touch target on mobile.

**Buttons:**
```tsx
// ✅ CORRECT: Minimum 48px height on mobile
<Button className="min-h-12 px-6 py-2.5 rounded-full">Action</Button>

// ✅ CORRECT: Responsive touch target
<Button className="min-h-12 sm:min-h-10 rounded-full">Desktop Smaller</Button>

// ❌ WRONG: Too small for mobile touch
<Button className="h-8 px-4 rounded-full">Too Small</Button>
```

**Icon buttons / FABs:**
```tsx
// ✅ CORRECT: 48px minimum
<button className="w-12 h-12 rounded-full">
  <Icon className="w-5 h-5" />
</button>

// ❌ WRONG: Below minimum touch target
<button className="w-8 h-8 rounded-full">
  <Icon className="w-4 h-4" />
</button>
```

---

## Pre-Flight Checklist (Before Creating Any Component)

**Before writing ANY component, verify:**

- [ ] **Text truncation**: All text has `truncate`, `line-clamp-*`, or `break-words`
- [ ] **Container width**: All containers have `max-w-*` or `w-full`
- [ ] **Flex children**: All flex children have `min-w-0` or `flex-shrink-0`
- [ ] **Button sizing**: All buttons have `min-h-12` on mobile
- [ ] **Text colors**: All nested text has explicit color classes (`text-foreground`, `text-muted-foreground`)
- [ ] **Responsive grids**: Grids use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` pattern
- [ ] **Padding**: Padding is responsive (`px-4 sm:px-6 lg:px-8`)
- [ ] **Touch targets**: Interactive elements are minimum 48px on mobile
- [ ] **Icon sizing**: Icons inside flex have `flex-shrink-0`
- [ ] **Stacking**: Content stacks vertically on mobile (`flex-col sm:flex-row`)

---

## Common Component Templates (Copy-Paste Safe)

### Card with icon, title, description, and action
```tsx
<Card className="w-full rounded-2xl">
  <CardContent className="p-4 sm:p-6">
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0 flex-1 flex items-center gap-3">
        <Icon className="flex-shrink-0 w-6 h-6 text-[#07D7FF]" />
        <div className="min-w-0">
          <h3 className="truncate font-medium text-foreground">Card Title</h3>
          <p className="truncate text-sm text-muted-foreground">Description text</p>
        </div>
      </div>
      <Button className="flex-shrink-0 min-h-12 rounded-full">
        Action
      </Button>
    </div>
  </CardContent>
</Card>
```

### List item with multiple lines
```tsx
<div className="flex items-start gap-3 p-4">
  <Icon className="flex-shrink-0 w-5 h-5 mt-0.5 text-[#07D7FF]" />
  <div className="min-w-0 flex-1">
    <p className="truncate font-medium text-foreground">Primary text</p>
    <p className="line-clamp-2 text-sm text-muted-foreground">
      Secondary text that can wrap to two lines maximum
    </p>
  </div>
  <button className="flex-shrink-0 w-12 h-12 rounded-full">
    <MoreIcon className="w-5 h-5" />
  </button>
</div>
```

### Button with icon (guide/menu item pattern)
```tsx
<Button
  variant="outline"
  className="w-full justify-between rounded-full h-auto py-4"
>
  <div className="flex items-center gap-3 min-w-0">
    <Icon className="flex-shrink-0 w-5 h-5 text-[#07D7FF]" />
    <div className="text-left min-w-0">
      <div className="truncate font-medium text-foreground">Item Title</div>
      <div className="truncate text-sm text-muted-foreground">Item description</div>
    </div>
  </div>
  <ChevronRight className="flex-shrink-0 w-5 h-5 text-muted-foreground" />
</Button>
```

### Form row with label and input
```tsx
<div className="space-y-2">
  <Label htmlFor="field" className="text-foreground">Field Label</Label>
  <Input
    id="field"
    placeholder="Enter value..."
    className="w-full rounded"
  />
  <p className="text-sm text-muted-foreground">Helper text</p>
</div>
```

### Responsive button group
```tsx
<div className="flex flex-col sm:flex-row gap-3">
  <Button className="w-full sm:flex-1 min-h-12 rounded-full bg-transparent border border-[#1E88E5] text-[#1E88E5]">
    Cancel
  </Button>
  <Button className="w-full sm:flex-1 min-h-12 rounded-full bg-[#1E88E5] text-white">
    Confirm
  </Button>
</div>
```

---

## Debugging Mobile Layout Issues

**If you see layout overflow on mobile:**

1. **Check text truncation**: Add `truncate` to any text that might be long
2. **Check flex containers**: Add `min-w-0` to flex children
3. **Check container widths**: Add `w-full` or `max-w-*` to containers
4. **Check button widths**: Change to `w-full sm:w-auto`
5. **Check text colors**: Add explicit `text-foreground` or `text-muted-foreground`
6. **Check grids**: Change to responsive columns (`grid-cols-1 sm:grid-cols-2`)
7. **Check padding**: Reduce on mobile (`p-4 sm:p-6`)

**Quick fix pattern for most issues:**
```tsx
// Add these classes to fix most mobile layout bugs:
className="w-full max-w-full min-w-0 truncate"
```

---

## Summary: The Golden Rules

1. **Every text element** → Add `truncate` or `line-clamp-*`
2. **Every container** → Add `w-full` or `max-w-*`
3. **Every flex child** → Add `min-w-0` or `flex-shrink-0`
4. **Every button** → Add `min-h-12` and responsive width
5. **Every nested text** → Add explicit color (`text-foreground` or `text-muted-foreground`)
6. **Every grid** → Use responsive columns (`grid-cols-1 sm:grid-cols-2`)
7. **Every padding** → Use responsive values (`p-4 sm:p-6`)
8. **Every icon in flex** → Add `flex-shrink-0`

**If you follow these rules, mobile layout bugs will never happen!**
