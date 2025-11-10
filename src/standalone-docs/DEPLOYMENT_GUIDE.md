# Quick Deployment Guide

## 🎯 Goal
Host these documentation pages on a **separate domain or subdomain** from your React app so you can link to them from external websites, emails, and blog posts.

## ⚡ Fastest Options

### 1. Netlify (Recommended - Easiest)

**Steps:**
1. Go to [netlify.com](https://www.netlify.com)
2. Sign up (free)
3. Drag and drop the `/standalone-docs/` folder into Netlify
4. Done! You get a URL like: `https://pymstr-docs.netlify.app`

**Custom domain (optional):**
- Go to Domain Settings
- Add `docs.yoursite.com`
- Update your DNS records as shown

**Time:** 2 minutes

---

### 2. Vercel

**Steps:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up (free)
3. Click "New Project"
4. Upload the `/standalone-docs/` folder
5. Deploy!

**Time:** 3 minutes

---

### 3. GitHub Pages

**Steps:**
1. Create a GitHub repository (e.g., `pymstr-docs`)
2. Upload all files from `/standalone-docs/` to the repo
3. Go to Settings → Pages
4. Select "Deploy from main branch"
5. Your docs will be at: `https://yourusername.github.io/pymstr-docs/`

**Time:** 5 minutes

---

### 4. Your Existing Website

If you already have a website, just:

1. Copy all `.html` files to your web server
2. Put them in a `/docs/` folder
3. Access via: `https://yoursite.com/docs/quickstart.html`

**Example directory structure:**
```
yourwebsite/
├── index.html (your homepage)
├── about.html
└── docs/
    ├── index.html
    ├── quickstart.html
    ├── api-reference.html
    └── code-examples.html
```

---

## 📝 After Deployment

### Update Links

In each HTML file, replace placeholder URLs:

**Find:** `https://app.pymstr.com`  
**Replace with:** Your actual PYMSTR app URL

**Files to update:**
- All 4 HTML files have this link in the "Go to Dashboard" button

### Test Navigation

Open each page and verify:
- ✅ Sidebar links work
- ✅ Internal anchor links work (e.g., clicking "Step 1" scrolls to that section)
- ✅ "Back" button works
- ✅ "Go to Dashboard" button redirects to your app

---

## 🔗 Recommended URL Structure

After deployment, you'll have URLs like:

```
https://docs.yoursite.com/                    → Landing page
https://docs.yoursite.com/quickstart.html     → Quick Start Guide
https://docs.yoursite.com/api-reference.html  → API Reference
https://docs.yoursite.com/code-examples.html  → Code Examples
```

**Then link to these from:**
- Your marketing website
- Blog posts
- Email campaigns
- Social media
- GitHub README
- Developer newsletters

---

## 🎨 Custom Domain Examples

### Option A: Subdomain
```
docs.pymstr.com          → Documentation
app.pymstr.com           → React application
pymstr.com               → Marketing site
```

### Option B: Subfolder
```
pymstr.com/docs/         → Documentation
pymstr.com/app/          → React application
pymstr.com               → Marketing site (homepage)
```

---

## ⚙️ Advanced: Custom Domain Setup

### Using Netlify with Custom Domain

1. **Deploy to Netlify** (see steps above)
2. **Buy a domain** or use existing one
3. **In Netlify:**
   - Go to Domain Settings
   - Click "Add custom domain"
   - Enter `docs.yoursite.com`
4. **In your DNS provider:**
   - Add a CNAME record:
     ```
     Type: CNAME
     Name: docs
     Value: your-site.netlify.app
     ```
5. **Wait** for DNS propagation (5-30 minutes)
6. **Enable HTTPS** in Netlify (automatic)

### Using Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repo OR upload files directly
3. Deploy
4. Add custom domain in Cloudflare dashboard
5. DNS and HTTPS configured automatically

---

## 🧪 Local Testing Before Deployment

Want to preview first?

**Option 1: Simple Python Server**
```bash
cd standalone-docs
python3 -m http.server 8000
# Open: http://localhost:8000
```

**Option 2: Node.js (npx)**
```bash
cd standalone-docs
npx serve
# Open: http://localhost:3000
```

**Option 3: Just open the file**
```bash
# Mac
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

---

## ✅ Deployment Checklist

Before going live:

- [ ] All HTML files uploaded
- [ ] Links to main app updated with correct URL
- [ ] Custom domain configured (if using one)
- [ ] HTTPS enabled (automatic on Netlify/Vercel)
- [ ] Navigation tested on desktop
- [ ] Navigation tested on mobile
- [ ] All code examples reviewed
- [ ] "Go to Dashboard" button tested

---

## 💰 Cost

All recommended options have **free tiers**:

| Service | Free Tier | Best For |
|---------|-----------|----------|
| Netlify | 100GB bandwidth/month | General use |
| Vercel | 100GB bandwidth/month | React devs |
| GitHub Pages | 1GB storage, 100GB bandwidth/month | Open source |
| Cloudflare Pages | Unlimited | High traffic |

For documentation sites, you'll likely never exceed free limits!

---

## 🚀 Recommended: Netlify Deployment

**Why Netlify?**
- Drag-and-drop deployment (no git needed)
- Automatic HTTPS
- Custom domains (free)
- Fast CDN
- Form handling (if you add contact forms later)
- Easy rollbacks

**Full Tutorial:**

1. Go to [netlify.com](https://www.netlify.com) → Sign up
2. Click "Add new site" → "Deploy manually"
3. Drag the `/standalone-docs/` folder into the upload area
4. Wait 30 seconds
5. Click the generated URL (e.g., `random-name-123.netlify.app`)
6. Your docs are live! 🎉

**Optional: Custom domain**
7. Click "Domain settings"
8. Click "Add custom domain"
9. Enter your domain (e.g., `docs.pymstr.com`)
10. Follow DNS instructions
11. Done!

---

## 📧 Share Your Docs

Once deployed, share links like:

**Email:**
```
Check out our documentation:
https://docs.yoursite.com
```

**Twitter/Social:**
```
📚 New API docs are live!
Quick Start: https://docs.yoursite.com/quickstart.html
API Reference: https://docs.yoursite.com/api-reference.html
```

**GitHub README:**
```markdown
## Documentation

- [Quick Start Guide](https://docs.yoursite.com/quickstart.html)
- [API Reference](https://docs.yoursite.com/api-reference.html)
- [Code Examples](https://docs.yoursite.com/code-examples.html)
```

---

Need help? The files are ready to deploy - just pick your platform and upload! 🚀
