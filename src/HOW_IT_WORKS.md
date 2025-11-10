# How the Standalone Documentation Pages Work

## Simple Explanation

I created a system where you can link directly to your documentation pages from external websites, and they will appear **without the merchant navigation**.

## What I Built

### 3 New Page Components
Located in `/pages/` folder:
1. `QuickStartPage.tsx` - Wraps QuickStartGuide component
2. `APIReferencePage.tsx` - Wraps APIReference component  
3. `CodeExamplesPage.tsx` - NEW component with code examples in JS, Python, PHP, cURL

### Updated App.tsx
Added special routing logic:
- When URL has `#quickstart`, `#api-reference`, or `#code-examples`
- App detects it and renders the standalone page
- NO merchant navigation (Dashboard, Links, Wallet, etc.) appears
- Just the documentation with its own sidebar

## How to Test

### Step 1: Run Your App
Start your PYMSTR app normally. Let's say it's at:
```
http://localhost:5173
```

### Step 2: Try These URLs

Open a new browser tab and go to:

```
http://localhost:5173/#quickstart
```

**What you should see:**
- ✅ Quick Start Guide page
- ✅ Sidebar navigation on the left
- ✅ "Back to API" button
- ❌ NO merchant navigation bar at top

### Step 3: Try All Variants

These should ALL work:

**Quick Start:**
- `http://localhost:5173/#quickstart` ✅
- `http://localhost:5173/#/quickstart` ✅
- `http://localhost:5173/#/docs/quickstart` ✅

**API Reference:**
- `http://localhost:5173/#api-reference` ✅
- `http://localhost:5173/#/api-reference` ✅
- `http://localhost:5173/#apireference` ✅

**Code Examples:**
- `http://localhost:5173/#code-examples` ✅
- `http://localhost:5173/#/code-examples` ✅

## How to Use on Your External Website

On your marketing website or any external page, create links like this:

```html
<!-- HTML -->
<a href="https://yourapp.com/#quickstart">Quick Start Guide</a>
<a href="https://yourapp.com/#api-reference">API Reference</a>
<a href="https://yourapp.com/#code-examples">Code Examples</a>
```

```markdown
<!-- Markdown -->
[Quick Start Guide](https://yourapp.com/#quickstart)
[API Reference](https://yourapp.com/#api-reference)
[Code Examples](https://yourapp.com/#code-examples)
```

## What Happens Behind the Scenes

1. User clicks link: `yourapp.com/#quickstart`
2. App loads and `useEffect` hook runs
3. Hook checks `window.location.hash`
4. Finds `#quickstart` in the hash
5. Sets `isStandalonePage = true` and `activeTab = 'quickstart'`
6. App renders `<QuickStartPage />` component
7. Page appears WITHOUT merchant navigation
8. User sees only the documentation

## Debugging

### If It's Not Working:

1. **Check the browser console** for errors
2. **Verify the URL** - make sure hash is there (e.g., `#quickstart`)
3. **Try the test-links.html file** I created - open it and click the links
4. **Check if merchant navigation appears** - if you see Dashboard/Links/Wallet buttons at top, routing isn't working

### Common Issues:

❌ **Problem:** Merchant navigation still appears
✅ **Solution:** Check that `isStandalonePage` is being set to `true` in the useEffect

❌ **Problem:** URL doesn't change when clicking links
✅ **Solution:** Make sure you're using the full URL with hash (not just clicking buttons in the app)

❌ **Problem:** Page is blank
✅ **Solution:** Check browser console for import errors

## The Key Code

In `/App.tsx`, around line 464:

```typescript
useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash.toLowerCase();
    
    if (hash.includes('quickstart')) {
      setActiveTab('quickstart');
      setIsStandalonePage(true);  // This is key!
    }
    // ... more conditions
  };
  
  handleHashChange(); // Run on mount
  window.addEventListener('hashchange', handleHashChange);
}, []);
```

And around line 6130:

```typescript
// Render standalone pages WITHOUT navigation
if (isStandalonePage) {
  if (activeTab === 'quickstart') {
    return <QuickStartPage />;
  }
  // ... etc
}
```

## Questions to Help Debug

1. **What URL are you trying?** (Copy-paste the exact URL)
2. **What do you see?** (Merchant nav or just documentation?)
3. **Any errors in browser console?** (F12 → Console tab)
4. **Where are you running it?** (localhost? production? what port?)

Let me know which step isn't working and I'll help fix it!
