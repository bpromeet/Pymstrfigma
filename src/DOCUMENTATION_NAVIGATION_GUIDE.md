# Documentation Navigation Guide

## How to Navigate Back to Documents Page

When you're viewing any documentation page (Quick Start, API Reference, or Code Examples), you have **multiple ways** to return to the Documents page:

---

## 🖥️ **Desktop View** (Screen width ≥ 1024px)

### Method 1: Left Sidebar Button (Primary)
Located at the **top of the left sidebar** (fixed position):
```
┌─────────────────────────┐
│  ← Back to Documents    │  ← Outlined button with arrow icon
│  (Pill-shaped button)   │     Click this to return
├─────────────────────────┤
│  📖 Overview            │
│  🔧 Setup               │
│  🎯 Integration         │
│  ... (navigation menu)  │
└─────────────────────────┘
```
- **Style**: White outlined button with blue border
- **Location**: Top of left sidebar, always visible
- **Action**: Returns to Documents page

### Method 2: Content Area Link (Secondary)
Located **above the page title** in the main content area:
```
   ← Back to Documents  ← Text link with arrow
   ════════════════════════
   
   📘 Developer Quick Start Guide
   Get started with PYMSTR API integration in minutes
   
   [Content...]
```
- **Style**: Small gray text link with arrow icon
- **Location**: Above the main page title
- **Action**: Returns to Documents page

---

## 📱 **Mobile View** (Screen width < 1024px)

### Mobile Header Back Button (Only Method)
Located in the **sticky header at the top**:
```
┌──────────────────────────────────┐
│  ←                           ☰   │  ← Back arrow (left) | Menu (right)
└──────────────────────────────────┘

   📘 Developer Quick Start Guide
   Get started with PYMSTR API...
   
   [Content...]
```
- **Style**: Circular icon button with back arrow
- **Location**: Top-left of sticky header
- **Action**: Returns to Documents page
- **Note**: The header title was removed to keep the mobile UI clean

---

## ✅ **Summary**

| View | Navigation Options | Primary Method |
|------|-------------------|----------------|
| **Desktop** | 1. Sidebar button<br>2. Content link | Sidebar button |
| **Mobile** | 1. Header back arrow | Header back arrow |

---

## 🔍 **Troubleshooting**

### "I don't see the back button!"

**Desktop:**
- Ensure your browser width is ≥ 1024px
- Look at the **left sidebar** (below the main navigation rail)
- The button is at the **very top** of the sidebar
- Or check **above the page title** in the content area

**Mobile:**
- Look at the **top-left** corner of the screen
- The back arrow is in the **sticky header**
- Scroll to top if needed to see the header

### "Nothing happens when I click back!"

- The `onBack` callback is wired to `setActiveTab("documents")`
- This should navigate you back to the Documents page
- If navigation doesn't work, check browser console for errors

---

## 📂 **Technical Implementation**

All three documentation components receive an `onBack` callback prop:

```tsx
// App.tsx routing
case "quickstart":
  return <QuickStartGuide onBack={() => setActiveTab("documents")} />;
case "apireference":
  return <APIReference onBack={() => setActiveTab("documents")} />;
case "codeexamples":
  return <CodeExamples onBack={() => setActiveTab("documents")} />;
```

Each component implements the back navigation in 3 places:
1. **Desktop sidebar** - Outlined button with icon
2. **Desktop content** - Text link above title
3. **Mobile header** - Back arrow icon button

All three trigger the same `onBack()` callback which navigates to the Documents page.

---

## 🎨 **Visual Reference**

### Desktop Layout
```
┌─────────┬────────────────┬────────────────────────────┐
│  Nav    │  Sidebar       │  Main Content              │
│  Rail   │                │                            │
│         │  [← Back to    │  ← Back to Documents       │
│  🏠     │   Documents]   │  ─────────────────────     │
│  📊     │                │                            │
│  💳     │  📖 Overview   │  📘 Quick Start Guide      │
│  👤     │  🔧 Setup      │  Get started with PYMSTR   │
│  ⚙️     │  🎯 Integrate  │                            │
│         │  ...           │  [Content cards...]        │
└─────────┴────────────────┴────────────────────────────┘
```

### Mobile Layout
```
┌──────────────────────────────────┐
│  ←  [sticky header]          ☰   │
├──────────────────────────────────┤
│                                  │
│  📘 Quick Start Guide            │
│  Get started with PYMSTR API     │
│                                  │
│  [Scrollable content...]         │
│                                  │
│                                  │
└──────────────────────────────────┘
```

---

## 📝 **Files Modified**

- `/components/QuickStartGuide.tsx` - Added back navigation
- `/components/APIReference.tsx` - Added back navigation  
- `/components/CodeExamples.tsx` - Added back navigation
- All three implement identical back navigation patterns

**Last Updated:** Based on current implementation with sidebar button, content link, and mobile header arrow.
