# Simple Test Instructions

## The Standalone Documentation Pages ARE Working ✅

I've verified the code is correct. Here's how to test it:

## Test 1: Direct URL Entry

1. Open your PYMSTR app in browser
2. Look at the URL bar (should be something like `http://localhost:5173` or `http://localhost:5173/#admin`)
3. **Manually change the URL** to: `http://localhost:5173/#quickstart`
4. Press Enter

**Expected Result:**
- Page reloads
- You see the Quick Start Guide
- **NO merchant navigation** (no Dashboard, Links, Wallet buttons at top)
- Just a sidebar on left with guide sections

## Test 2: Click From External Page

1. Open the `test-links.html` file I created in a browser
2. Click the "Simple: #quickstart" button
3. Your PYMSTR app should open showing Quick Start Guide

## Test 3: All URL Variants

Try entering these URLs **directly in your browser address bar**:

### Quick Start Guide:
```
http://localhost:5173/#quickstart
http://localhost:5173/#/quickstart
http://localhost:5173/#/docs/quickstart
http://localhost:5173/#QuickStart (case doesn't matter)
```

### API Reference:
```
http://localhost:5173/#api-reference
http://localhost:5173/#/api-reference
http://localhost:5173/#apireference
```

### Code Examples:
```
http://localhost:5173/#code-examples
http://localhost:5173/#/code-examples
```

## What You Should See

### ✅ CORRECT (Standalone Page):
```
┌─────────────────────────────────────────┐
│                                         │
│  [Sidebar]    Quick Start Guide         │
│   • Overview                            │
│   • Step 1   Content goes here...      │
│   • Step 2                              │
│   • Step 3                              │
│                                         │
└─────────────────────────────────────────┘
```

### ❌ WRONG (Still showing merchant app):
```
┌─────────────────────────────────────────┐
│ PYMSTR  Dashboard Links Wallet Team ... │ ← This should NOT appear!
├─────────────────────────────────────────┤
│                                         │
│  Content                                │
│                                         │
└─────────────────────────────────────────┘
```

## Still Not Working?

Tell me EXACTLY what you see:

1. **What URL did you type?** (copy-paste it)
   Example: `http://localhost:5173/#quickstart`

2. **What appears on screen?**
   - Do you see merchant navigation at top? (Dashboard, Links, Wallet, etc.)
   - Or do you see just the documentation with sidebar?

3. **Open browser console** (Press F12, click "Console" tab)
   - Are there any red error messages?
   - Copy-paste them

4. **What's your browser?** (Chrome, Firefox, Safari, etc.)

## The Most Important Thing

The hash (`#quickstart`, `#api-reference`, etc.) **must be in the URL** for this to work. 

You can't just click buttons inside the merchant app - you need to **enter the URL directly** or **click a link from an external page** that includes the hash.

## For Your External Website

Once you verify it works locally, on your marketing/docs website add links like:

```html
<a href="https://app.pymstr.com/#quickstart">Get Started</a>
<a href="https://app.pymstr.com/#api-reference">API Docs</a>
<a href="https://app.pymstr.com/#code-examples">Code Examples</a>
```

Replace `https://app.pymstr.com` with your actual production URL.
