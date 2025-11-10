# Using Standalone Docs with Your Figma Staging Site

## ✅ Updated for Your Figma Site!

All HTML documentation files have been **updated** to link to:
```
https://pymstr-staging.figma.site/
```

Instead of the placeholder `https://app.pymstr.com`

## 🎯 How This Works

```
┌──────────────────────────────────────────────────────┐
│  Your Figma Staging Site                             │
│  https://pymstr-staging.figma.site/                  │
│  ├─ React App (merchant dashboard, checkout, etc.)  │
│  └─ Can link TO the external docs ─────────┐        │
└─────────────────────────────────────────────│────────┘
                                              │
                                              ↓
┌──────────────────────────────────────────────────────┐
│  Standalone Documentation (Hosted Separately)        │
│  Example: https://pymstr-docs.netlify.app/           │
│  ├─ index.html (landing)                             │
│  ├─ quickstart.html                                  │
│  ├─ api-reference.html                               │
│  ├─ code-examples.html                               │
│  └─ "Go to Dashboard" buttons link BACK to ─────┐   │
│     https://pymstr-staging.figma.site/          │   │
└─────────────────────────────────────────────────│───┘
                                                  │
                                                  ↓
                            Back to Figma staging site
```

## 🚀 Deployment Steps

### Step 1: Deploy Documentation (2 minutes)

**Option A: Netlify (Recommended)**
1. Go to [netlify.com](https://www.netlify.com)
2. Sign up (free)
3. Click "Add new site" → "Deploy manually"
4. Drag the `/standalone-docs/` folder into Netlify
5. Wait 30 seconds
6. You'll get a URL like: `https://pymstr-docs.netlify.app`

**Option B: GitHub Pages**
1. Create a new GitHub repository (e.g., `pymstr-docs`)
2. Upload all files from `/standalone-docs/` folder
3. Go to Settings → Pages → Enable from main branch
4. Get URL: `https://yourusername.github.io/pymstr-docs/`

**Option C: Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up and click "New Project"
3. Upload `/standalone-docs/` folder
4. Deploy!

### Step 2: Link FROM Your Figma Site TO Docs

Once your docs are deployed, you can add links in your Figma staging site.

**Example: Add to your React app navigation or footer:**

```jsx
// In your App.tsx or a navigation component
<a 
  href="https://pymstr-docs.netlify.app/" 
  target="_blank"
  className="text-gray-600 hover:text-black"
>
  Documentation
</a>

// Or individual doc links:
<a href="https://pymstr-docs.netlify.app/quickstart.html">Quick Start</a>
<a href="https://pymstr-docs.netlify.app/api-reference.html">API Reference</a>
```

### Step 3: Test the Round-Trip

1. **From Figma site:** Click your "Documentation" link
2. **Opens:** Your deployed docs site
3. **Click:** "Go to Dashboard" button in docs
4. **Returns:** To `https://pymstr-staging.figma.site/`

✅ Perfect loop!

## 📧 Share Documentation Links

Once deployed, you can share your docs from anywhere:

**Email Campaigns:**
```
Learn how to integrate PYMSTR:
https://pymstr-docs.netlify.app/quickstart.html
```

**Blog Posts:**
```markdown
Check out our [API Reference](https://pymstr-docs.netlify.app/api-reference.html)
```

**Social Media:**
```
📚 New API documentation is live!
🚀 Quick Start: https://pymstr-docs.netlify.app/quickstart.html
📖 Full API Docs: https://pymstr-docs.netlify.app/api-reference.html
```

**GitHub README:**
```markdown
## Documentation

- [Quick Start Guide](https://pymstr-docs.netlify.app/quickstart.html)
- [API Reference](https://pymstr-docs.netlify.app/api-reference.html)
- [Code Examples](https://pymstr-docs.netlify.app/code-examples.html)
```

## 🔗 Custom Domain (Optional)

Want to use `docs.pymstr.com` instead of `pymstr-docs.netlify.app`?

### On Netlify:
1. After deploying, go to "Domain settings"
2. Click "Add custom domain"
3. Enter `docs.pymstr.com` (or `docs.yourdomain.com`)
4. Update your DNS:
   ```
   Type: CNAME
   Name: docs
   Value: your-site.netlify.app
   ```
5. Wait 5-30 minutes for DNS propagation
6. Netlify auto-enables HTTPS

### On GitHub Pages:
1. After deploying, go to Settings → Pages
2. Add custom domain
3. Update DNS as GitHub instructs
4. Enable HTTPS

## 🧪 Test Locally First

Before deploying, test the docs locally:

```bash
cd standalone-docs
python3 -m http.server 8000
# Open: http://localhost:8000
```

**Click around to verify:**
- ✅ All navigation works
- ✅ "Go to Dashboard" buttons point to Figma site
- ✅ Code examples are readable
- ✅ Mobile responsive

## ✨ What's Already Configured

All the docs are **already updated** with your Figma staging site URL:

✅ `index.html` - "Go to Dashboard" → Figma site  
✅ `quickstart.html` - "Go to Dashboard" → Figma site  
✅ `api-reference.html` - Example API responses show Figma site URLs  
✅ `code-examples.html` - Ready to use  

## 📝 Summary

| What | Where | Purpose |
|------|-------|---------|
| **Figma Staging Site** | `https://pymstr-staging.figma.site/` | Your React app (merchant dashboard, checkout) |
| **Standalone Docs** | Deploy to Netlify/Vercel/GitHub Pages | Public documentation (link from anywhere) |
| **Connection** | Docs link back to Figma site | Users can go back and forth |

## 🎯 Next Steps

1. ✅ Docs are already configured for your Figma site
2. 🚀 Deploy docs to Netlify (2 minutes)
3. 🔗 Add doc links to your Figma site
4. 📧 Share doc links in emails/blog/social media
5. 🎉 Done!

---

**Note:** Your Figma staging site and the documentation are two separate sites that link to each other. This is the standard architecture for app + documentation.
