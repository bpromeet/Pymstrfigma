# ⚡ QUICK FIX CHECKLIST - Get Your Site Working NOW

## 🎯 Goal
Fix `pymstr-staging.figma.site` showing wrong content on mobile

---

## Step 1: Identify the Problem (2 minutes)

### On Your Phone:

1. **Open:** `https://pymstr-staging.figma.site/`

2. **What do you see?**

   **Option A:** 
   - Title: "PYMSTR Documentation"
   - Cards saying "Quick Start Guide", "API Reference"
   - Blue/purple background
   - → **PROBLEM:** Wrong site deployed ❌
   - → **ACTION:** Go to Step 2

   **Option B:**
   - Navigation rail or bottom nav
   - Dashboard with charts
   - User profile showing "Alex Johnson" and "alex@example.com"
   - → **PROBLEM:** Correct site but demo data ❌
   - → **ACTION:** Go to Step 3

   **Option C:**
   - Something completely different/broken
   - → **PROBLEM:** Old cached version ❌
   - → **ACTION:** Go to Step 4

---

## Step 2: Fix Wrong Site Deployed (5 minutes)

**You have the standalone docs deployed instead of the React app.**

### Fix in Figma:

1. **Open Figma Desktop or Web**
2. **Go to your PYMSTR project**
3. **Find "Publish" or "Make" settings**
4. **Look for deployment configuration:**
   - Source folder: `/standalone-docs/` ❌ (WRONG)
   - Change to: `/` ✅ (CORRECT - root directory)
5. **Click "Publish" or "Update"**
6. **Wait 2-3 minutes**
7. **Go to Step 4 (Clear Cache)**

### Files to Deploy:
- ✅ `/index.html` (root)
- ✅ `/src/main.tsx`
- ✅ `/App.tsx`
- ✅ All `/components/`, `/pages/`, `/utils/` folders
- ❌ NOT `/standalone-docs/` folder

---

## Step 3: Fix Demo Data (10 minutes)

**You have the correct site but it's showing "Alex Johnson / alex@example.com".**

This is hardcoded demo data. Here's the quick fix:

### Edit `/App.tsx`:

**Find this (around line 3073-3076):**
```tsx
<p className="font-medium text-gray-900 dark:text-white">
  {userContext === 'enduser' ? 'Alex Johnson' : 'John Doe'}
</p>
<p className="text-sm text-gray-600 dark:text-gray-400">
  {userContext === 'enduser' ? 'alex@example.com' : 'john@pymstr.com'}
</p>
```

**Replace with:**
```tsx
<p className="font-medium text-gray-900 dark:text-white">
  Connected User
</p>
<p className="text-sm text-gray-600 dark:text-gray-400">
  {walletAddress ? truncateAddress(walletAddress) : 'Not Connected'}
</p>
```

**Then:**
1. Save the file
2. Figma will auto-rebuild
3. Wait 1-2 minutes
4. Go to Step 4 (Clear Cache)

---

## Step 4: Clear ALL Cache (5 minutes)

**This is CRITICAL - must be done thoroughly!**

### On iPhone (Safari):

1. **Settings app** (not Safari app)
2. Scroll down to **"Safari"**
3. Scroll down to **"Clear History and Website Data"**
4. Tap and confirm **"Clear History and Data"**
5. **Wait for confirmation**

### On Android (Chrome):

1. **Open Chrome**
2. Tap **three dots** (top right)
3. **Settings**
4. **Privacy and Security**
5. **Clear Browsing Data**
6. Select:
   - ✅ Cached images and files
   - ✅ Cookies and site data
7. Time range: **"All time"**
8. **Clear Data**

### Verify Cache is Cleared:

1. Close browser app completely (swipe up to kill)
2. Wait 10 seconds
3. Reopen browser
4. Visit site in **Private/Incognito mode first**

---

## Step 5: Test the Fix (2 minutes)

### On Your Phone:

1. **Open Private/Incognito browser tab**
2. **Go to:** `https://pymstr-staging.figma.site/`
3. **Check browser tab title:**
   - Says "PYMSTR Dashboard"? ✅ Good!
   - Says "PYMSTR Documentation"? ❌ Back to Step 2

4. **Check what you see:**
   - Navigation + Dashboard? ✅ Good!
   - Static docs page? ❌ Back to Step 2

5. **Check user profile (if visible):**
   - Shows "Connected User" or wallet address? ✅ Good!
   - Shows "Alex Johnson"? ⚠️ Cache not cleared - back to Step 4

---

## Step 6: Wait for CDN Cache (if needed)

**If incognito works but regular browser doesn't:**

- Figma uses a CDN (Content Delivery Network)
- Cache can take 5-10 minutes to clear globally
- **Solution:** Wait 10 minutes, then try again
- OR keep using incognito until CDN updates

**If incognito ALSO shows wrong site:**

- Re-deployment hasn't finished
- **Solution:** Wait 5 more minutes
- Check Figma deployment status
- Look for errors in Figma publish logs

---

## 🚨 Emergency Troubleshooting

### Still Showing Wrong Site?

1. **Check URL carefully:**
   - `https://pymstr-staging.figma.site/` ✅
   - `https://pymstr-staging.figma.site/standalone-docs/` ❌

2. **Check if multiple sites deployed:**
   - Figma might have two deployments
   - Delete the docs one
   - Keep only the React app one

3. **Try different network:**
   - Switch from WiFi to mobile data
   - CDN might have different cache on different networks

4. **Check deployment logs:**
   - Figma should show build/publish logs
   - Look for errors
   - Make sure build succeeded

---

## ✅ Success Checklist

You're done when:

- [ ] Mobile browser shows "PYMSTR Dashboard" title
- [ ] You see navigation rail or bottom nav
- [ ] Dashboard loads with charts/content
- [ ] No "Alex Johnson" or "alex@example.com" visible
- [ ] Shows real data or "Connected User"
- [ ] Site is interactive (can click around)
- [ ] Works in both regular and incognito browser
- [ ] Desktop and mobile both work

---

## 📞 Report Back

After completing these steps, tell me:

1. **Which scenario you had** (A, B, or C from Step 1)
2. **What steps you completed**
3. **What you see now on mobile**
4. **Any errors from Figma**
5. **Screenshot if possible**

---

## 🎯 Most Likely Scenarios

**90% chance:** 
- Wrong folder deployed (`/standalone-docs/` instead of `/`)
- **Fix:** Step 2 (change deployment source to root)

**9% chance:**
- Correct site but aggressive cache
- **Fix:** Step 4 (clear cache thoroughly)

**1% chance:**
- Correct site with demo data showing
- **Fix:** Step 3 (remove hardcoded names)

---

## ⏱️ Time Estimate

- **Step 1:** 2 minutes (identify)
- **Step 2:** 5 minutes (fix deployment)
- **Step 3:** 10 minutes (fix demo data - if needed)
- **Step 4:** 5 minutes (clear cache)
- **Step 5:** 2 minutes (test)
- **Step 6:** 10 minutes (wait for CDN - if needed)

**Total:** 15-35 minutes depending on scenario

---

## 🆘 Still Stuck?

If after following ALL steps it's still not working:

1. **Take screenshots** of:
   - What you see on mobile
   - Figma deployment settings
   - Browser console errors (if any)

2. **Report these details:**
   - Which step failed
   - What error messages you see
   - What the site shows now

3. **We'll debug further** with that info

---

Start with **Step 1** right now - check your phone and tell me which scenario (A, B, or C) you see! 📱
