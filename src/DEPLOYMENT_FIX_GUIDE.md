# 🚨 URGENT: Fix Figma Deployment Issue

## Problem Identified
Your Figma site (`pymstr-staging.figma.site`) is showing the **wrong files** - either the standalone documentation HTML files or an old cached version instead of your React app.

---

## ✅ What SHOULD Be Deployed to Figma

Your Figma site should deploy the **React application** which consists of:

### Required Files/Folders:
```
/ (root directory)
├── index.html                  ✅ Main entry point (loads React)
├── src/
│   └── main.tsx                ✅ React bootstrap
├── App.tsx                     ✅ Main React component
├── components/                 ✅ All UI components
├── pages/                      ✅ All page components
├── utils/                      ✅ Utility functions
├── constants/                  ✅ Mock data
├── styles/
│   └── globals.css            ✅ Global styles
├── hooks/                      ✅ React hooks
├── types/                      ✅ TypeScript types
└── public/                     ✅ Static assets (avatars, etc.)
```

### ❌ DO NOT Deploy:
```
/ (root directory)
├── standalone-docs/            ❌ These are for a SEPARATE docs site
├── guidelines/                 ❌ Internal documentation
├── *.md files                  ❌ Development documentation
├── *.py files                  ❌ Python scripts
└── *.sh files                  ❌ Shell scripts
```

---

## 🔍 How to Verify Current Deployment

### Step 1: Check What's Currently Live

**On your phone, go to:**
```
https://pymstr-staging.figma.site/
```

**What do you see?**

**Scenario A: You see a static documentation page**
- Title: "PYMSTR Documentation"
- Cards like "Quick Start Guide", "API Reference"
- Dark blue/teal background
- **THIS IS WRONG** ❌

**Scenario B: You see the React app but with "Alex Johnson / alex@example.com"**
- Navigation rail on left
- Dashboard content
- User profile showing "Alex Johnson" and "alex@example.com"
- **THIS IS CORRECT** ✅ (but showing demo data - we'll fix that next)

**Scenario C: You see something completely different**
- **THIS IS WRONG** ❌ (old cached version)

---

## 🛠️ Solution: Deploy the Correct Files

### Option 1: Figma Desktop App (Recommended)

1. **Open Figma Desktop**
2. **Go to your PYMSTR project**
3. **Check the "Publish" settings:**
   - Look for "Website deployment" or "Figma Sites" section
   - Verify the **source folder** is set to ROOT (not `/standalone-docs/`)

4. **Deployment Configuration:**
   ```
   Source:           / (root)
   Entry Point:      /index.html
   Build Command:    (none - Figma Make handles this)
   Output Folder:    (none - deploy from root)
   ```

5. **Re-publish:**
   - Click "Publish" or "Update"
   - Wait for deployment to complete (usually 1-2 minutes)

### Option 2: Via Figma Web

1. **Go to figma.com**
2. **Open your PYMSTR project**
3. **Click "Make" tab (if available)**
4. **Check deployment settings**
5. **Verify source is set to root, not `/standalone-docs/`**
6. **Re-deploy**

---

## 🧹 Clear Cache (Critical!)

After re-deploying, you MUST clear cache:

### On iPhone (Safari):
1. Settings app
2. Safari
3. **"Clear History and Website Data"**
4. Confirm

### On Android (Chrome):
1. Chrome app
2. Settings (three dots)
3. Privacy and Security
4. **"Clear Browsing Data"**
5. Select "Cached images and files"
6. Confirm

### Alternative - Hard Refresh:
1. Open `https://pymstr-staging.figma.site/` on phone
2. Pull down to refresh
3. If still showing old version, wait 5-10 minutes (CDN cache)

---

## 🎯 Fix the "alex@example.com" Demo Data

Once you confirm the React app is loading correctly (even with demo data), we'll fix the hardcoded demo names:

### The Issue:
**File: `/App.tsx` (Line 3076)**

```tsx
// Current (demo data):
{userContext === 'enduser' ? 'Alex Johnson' : 'John Doe'}
{userContext === 'enduser' ? 'alex@example.com' : 'john@pymstr.com'}
```

### The Fix:
We need to replace this with **real user data** from Web3Auth login.

**Two approaches:**

**Approach A: Remove demo data entirely (recommended)**
- Show actual logged-in user's email from Web3Auth
- Show wallet address as username if no name available

**Approach B: Keep demo data for development, hide in production**
- Add environment check
- Show real data in production, demo data in dev

---

## 📋 Deployment Checklist

Complete these steps in order:

- [ ] **Step 1:** Verify current deployment (which scenario above?)
- [ ] **Step 2:** Check Figma deployment settings (is it deploying from root?)
- [ ] **Step 3:** Re-deploy from correct folder (root, not standalone-docs)
- [ ] **Step 4:** Wait 2-3 minutes for deployment
- [ ] **Step 5:** Clear browser cache on phone
- [ ] **Step 6:** Test on phone - do you see the React app?
- [ ] **Step 7:** If still showing old site, wait 10 minutes for CDN cache
- [ ] **Step 8:** Once React app loads, verify which demo data shows (Alex or John)
- [ ] **Step 9:** Report back which scenario you're seeing

---

## 🆘 Still Not Working?

If after following all steps you still see the wrong site:

### Debug Steps:

1. **Check deployment logs in Figma**
   - Look for errors during publish
   - Verify build succeeded

2. **Try incognito/private browsing**
   - This bypasses ALL cache
   - If it works here, it's just a cache issue

3. **Check URL carefully**
   - Make sure you're going to: `https://pymstr-staging.figma.site/`
   - NOT: `https://pymstr-staging.figma.site/standalone-docs/`

4. **Check if multiple sites deployed**
   - You might have accidentally deployed two different sites
   - Check Figma project settings

---

## 🔄 What Happens Next

Once we confirm the React app is loading (even with demo data):

1. ✅ **Fix hardcoded demo names** ("Alex Johnson" → real user data)
2. ✅ **Connect Web3Auth user info** to navigation profile
3. ✅ **Remove all demo/mock data** from production
4. ✅ **Test thoroughly** on both desktop and mobile

---

## 📞 Report Back

After following these steps, please tell me:

1. **Which scenario you saw initially** (A, B, or C above)
2. **What you see now after re-deploying**
3. **Any error messages** from Figma deployment
4. **Screenshot of what you see on phone** (if possible)

Then we'll proceed with fixing the demo data!

---

## 📚 About `/standalone-docs/` Folder

**What it is:**
- Static HTML documentation pages (no React)
- Meant to be hosted on a **separate domain** (like `docs.pymstr.com`)
- Used for **public-facing documentation** that can be linked from blogs, emails, etc.

**What it's NOT:**
- It's NOT your main app
- It should NOT be deployed to `pymstr-staging.figma.site`
- It's completely separate from your React application

**Correct architecture:**
```
pymstr-staging.figma.site        → React App (what you're editing)
docs.pymstr.com (or Netlify)     → Standalone docs (separate deployment)
```

---

## ⚡ Quick Test

To quickly verify which version is deployed, open on your phone:

```
https://pymstr-staging.figma.site/
```

**Look at the page title in browser tab:**
- If it says "PYMSTR Dashboard" → ✅ Correct (React app)
- If it says "PYMSTR Documentation" → ❌ Wrong (standalone docs deployed)

**Look at the page source (view source):**
- If you see `<div id="root"></div>` and `<script type="module" src="/src/main.tsx">` → ✅ Correct
- If you see inline `<style>` tags and no React → ❌ Wrong

---

Ready to proceed? Start with **Step 1** of the checklist and report back what you see!
