# 🏗️ PYMSTR Deployment Architecture

## Overview: Two Separate Sites

Your PYMSTR project consists of **two completely independent sites** that should be deployed separately:

---

## 🎯 Site 1: React Application (Main App)

### Purpose:
Your **full-featured Web3 payment processor application** with:
- Merchant admin dashboard
- Payment links management
- Wallet management
- Customer checkout flow
- API keys & webhooks
- Reports & analytics
- Team management
- End-user portal

### Deployment Location:
**✅ SHOULD BE HERE:** `https://pymstr-staging.figma.site/`

### Source Files (Deploy These):
```
/ (root directory)
├── index.html               ← Entry point (loads React)
├── src/
│   └── main.tsx            ← React bootstrap
├── App.tsx                 ← Main application component
├── components/             ← All React components
├── pages/                  ← All page components
├── utils/                  ← Helper functions
├── constants/              ← Mock data
├── styles/
│   └── globals.css        ← Global styles
├── hooks/                  ← Custom React hooks
├── types/                  ← TypeScript types
└── public/                 ← Static assets (avatars, etc.)
```

### Key Files:
- **`/index.html`** - Title: "PYMSTR Dashboard"
- **`/src/main.tsx`** - Bootstraps React app
- **`/App.tsx`** - Contains all app logic, routing, components

### Characteristics:
- ✅ Single Page Application (SPA)
- ✅ React + TypeScript
- ✅ Client-side routing (hash-based: `#/admin`, `#/links`, etc.)
- ✅ Dynamic UI with state management
- ✅ Requires JavaScript to run
- ✅ Loads one HTML file, then React takes over

---

## 📚 Site 2: Standalone Documentation (Static Docs)

### Purpose:
**Public-facing documentation** that can be:
- Linked from blog posts
- Shared in email campaigns
- Referenced in social media
- Accessed without logging in
- Indexed by search engines

### Deployment Location:
**🚀 SHOULD BE DEPLOYED TO:** A separate domain/subdomain:
- `https://docs.pymstr.com` (custom domain)
- OR `https://pymstr-docs.netlify.app` (Netlify)
- OR `https://yourusername.github.io/pymstr-docs/` (GitHub Pages)

**❌ NOT to:** `https://pymstr-staging.figma.site/` (this is for the React app)

### Source Files (Deploy These Separately):
```
/standalone-docs/
├── index.html              ← Landing page
├── quickstart.html         ← Quick Start Guide
├── api-reference.html      ← API Reference
└── code-examples.html      ← Code Examples
```

### Characteristics:
- ✅ Static HTML files (no React)
- ✅ Works without JavaScript
- ✅ Fast loading
- ✅ SEO-friendly
- ✅ Each page is a separate HTML file
- ✅ Can be viewed directly in browser

---

## 🔄 How They Connect

```
┌────────────────────────────────────────┐
│  Main React App                        │
│  https://pymstr-staging.figma.site/    │
│                                        │
│  - Merchant dashboard                 │
│  - Payment links                      │
│  - Checkout flow                      │
│  - Settings                           │
│                                        │
│  Can link TO docs ────────────────────┼──┐
└────────────────────────────────────────┘  │
                                            │
                                            ↓
┌────────────────────────────────────────────────┐
│  Standalone Docs                               │
│  https://docs.pymstr.com (or Netlify)          │
│                                                │
│  - Quick Start Guide                          │
│  - API Reference                              │
│  - Code Examples                              │
│  - Integration Tutorials                      │
│                                                │
│  "Go to Dashboard" button ────────────────────┼──┐
└────────────────────────────────────────────────┘  │
                                                    │
                                                    ↓
                              Back to React app
```

**Round-trip flow:**
1. User visits main app (`pymstr-staging.figma.site`)
2. User clicks "Documentation" link
3. Opens separate docs site (`docs.pymstr.com`)
4. User clicks "Go to Dashboard" button
5. Returns to main app

---

## ❌ Current Problem: Wrong Site Deployed

### What's Happening:
Someone deployed the **standalone docs** to `pymstr-staging.figma.site` instead of the **React app**.

### How to Tell:

**Open:** `https://pymstr-staging.figma.site/`

**If you see:**
```html
<title>PYMSTR Documentation</title>
```
And cards for "Quick Start", "API Reference", "Code Examples"
**→ WRONG SITE DEPLOYED** ❌

**If you see:**
```html
<title>PYMSTR Dashboard</title>
```
And navigation rail with merchant dashboard
**→ CORRECT SITE DEPLOYED** ✅

---

## ✅ Correct Deployment Setup

### For Figma Site (`pymstr-staging.figma.site`):

**Deploy from:** Root directory (`/`)  
**Entry point:** `/index.html`  
**Build:** None (Figma Make handles it)  
**Assets:** All folders in root

**DO NOT deploy:**
- `/standalone-docs/` folder
- `*.md` files
- `*.py` files
- `/guidelines/` folder

### For Documentation Site:

**Deploy from:** `/standalone-docs/` folder  
**Deploy to:** Netlify, GitHub Pages, or Vercel  
**Configuration:** None needed (static HTML)  
**Custom domain:** `docs.pymstr.com` (optional)

---

## 📋 Deployment Verification Checklist

### Check 1: View Page Source

**On `pymstr-staging.figma.site`:**

**✅ Correct (React app):**
```html
<!doctype html>
<html lang="en">
  <head>
    <title>PYMSTR Dashboard</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**❌ Wrong (Static docs):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>PYMSTR Documentation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        /* ... lots of inline styles ... */
    </style>
</head>
```

### Check 2: Network Tab (DevTools)

**On `pymstr-staging.figma.site`:**

**✅ Correct (React app):**
- Loads `/src/main.tsx`
- Loads `App.tsx`
- Multiple component files load
- Loads `globals.css`
- React DevTools icon appears

**❌ Wrong (Static docs):**
- No `.tsx` files loaded
- No React
- Just one HTML file with inline styles

### Check 3: React DevTools

**Install:** [React DevTools browser extension](https://react.dev/learn/react-developer-tools)

**On `pymstr-staging.figma.site`:**

**✅ Correct:** React icon lights up in browser toolbar  
**❌ Wrong:** React icon stays gray (no React detected)

---

## 🛠️ How to Fix

### If Wrong Site is Deployed:

1. **Go to Figma project settings**
2. **Find deployment/publish settings**
3. **Change source from:**
   - ❌ `/standalone-docs/` 
   - TO ✅ `/` (root)
4. **Re-publish/deploy**
5. **Wait 2-3 minutes**
6. **Clear browser cache**
7. **Test again**

### If Both Sites are Somehow Deployed:

1. **Check Figma for multiple deployments**
2. **Delete the documentation deployment**
3. **Keep only the React app deployment**
4. **Deploy docs separately to Netlify**

---

## 📱 Mobile Testing

### After Re-deployment:

1. **Clear mobile browser cache completely**
2. **Wait 5-10 minutes (CDN cache)**
3. **Visit site in incognito/private mode first**
4. **If incognito works, regular browser just needs more cache clearing**

### Expected Behavior on Mobile:

**First screen you see:**
- Navigation rail (desktop) or bottom nav (mobile)
- "Dashboard" page
- Charts and stats
- Blue/teal color scheme

**What you should NOT see:**
- Static documentation landing page
- Cards for "Quick Start Guide"
- No React interactivity

---

## 🎯 Summary

| Aspect | React App | Standalone Docs |
|--------|-----------|-----------------|
| **Purpose** | Main application | Public documentation |
| **Technology** | React + TypeScript | Static HTML |
| **Deploy To** | `pymstr-staging.figma.site` | Separate domain |
| **Source Folder** | `/` (root) | `/standalone-docs/` |
| **Entry Point** | `/index.html` → `/src/main.tsx` | `/index.html` (standalone) |
| **Requires JavaScript** | Yes | No |
| **User Login** | Yes (Web3Auth) | No |
| **Dynamic** | Yes | No |
| **SEO** | Limited (SPA) | Excellent |

---

## 🚀 Next Steps

1. **✅ Verify which site is currently deployed**
2. **✅ Re-deploy correct site (React app) if needed**
3. **✅ Clear all caches**
4. **✅ Test on desktop and mobile**
5. **🚀 Deploy standalone docs to separate domain (optional)**
6. **🔧 Fix demo data (Alex Johnson → real user)**
7. **🎉 Launch!**

---

## 📞 Quick Diagnostic

**Run this checklist RIGHT NOW on your phone:**

1. Open: `https://pymstr-staging.figma.site/`
2. Look at browser tab title - what does it say?
   - "PYMSTR Dashboard" → ✅ Correct
   - "PYMSTR Documentation" → ❌ Wrong
3. What do you see on screen?
   - Navigation rail + dashboard → ✅ Correct
   - Cards for docs → ❌ Wrong
4. Try to click around - is it interactive?
   - Yes, pages change → ✅ Correct (React)
   - No, just static page → ❌ Wrong (HTML docs)

**Report these answers and we'll fix it immediately!**
