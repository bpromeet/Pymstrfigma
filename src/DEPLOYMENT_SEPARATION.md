# PYMSTR Deployment Separation Guide

## Overview

PYMSTR is now split into **two separate applications**:

1. **Landing Site** (`LandingApp.tsx`) → Deploy to `pymstr.com`
2. **Dashboard App** (`App.tsx`) → Deploy to `app.pymstr.com`

---

## 🌐 Landing Site (pymstr.com)

**Purpose**: Public marketing website with niche-specific landing pages

**Entry Point**: `/LandingApp.tsx`

**Pages Included**:
- Main landing page (`/`)
- Gaming landing (`#/gaming`)
- Creators landing (`#/creators`)
- B2B landing (`#/b2b`)
- High-Risk Merchants landing (`#/high-risk`)

**Build Configuration**:

### Option 1: Vite Build (Recommended)

Create `vite.config.landing.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist-landing',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index-landing.html')
      }
    }
  }
})
```

Build command:
```bash
vite build --config vite.config.landing.ts
```

### Option 2: Figma Site Deployment

1. Upload `/LandingApp.tsx` as main entry
2. Upload all marketing page files from `/pages/Marketing*.tsx`
3. Upload `/index-landing.html` as index
4. Upload `/src/landing-main.tsx` as entry script
5. Set custom domain: `pymstr.com`

**CTAs on Landing**:
All "Get Started" / "Try Now" buttons should link to: `https://app.pymstr.com`

---

## 📊 Dashboard App (app.pymstr.com)

**Purpose**: Merchant and end-user dashboard application

**Entry Point**: `/App.tsx`

**Features Included**:
- ✅ Merchant Dashboard
- ✅ Payment Links Management
- ✅ Wallets Management
- ✅ Reports & Analytics
- ✅ API Keys & Webhooks
- ✅ Team Management
- ✅ Settings
- ✅ Documentation (Quick Start, API Reference, Code Examples)
- ✅ Help & Legal Pages
- ✅ End User Dashboard
- ✅ Checkout Flow (#/pay/*)

**Build Configuration**:

### Option 1: Vite Build (Recommended)

Use existing `vite.config.ts` (default):

```bash
vite build
```

Output: `/dist` directory

### Option 2: Figma Site Deployment

1. Upload `/App.tsx` as main entry
2. Upload all page files from `/pages/` (except Marketing*.tsx)
3. Upload all component files from `/components/`
4. Set custom domain: `app.pymstr.com`

**Default Route**:
- `/` → Dashboard (requires Web3Auth login in production)
- `/#/dev` → Dev mode bypass (for testing only)
- `/#/pay/PL123` → Checkout flow for payment links

---

## 🔄 Routing Summary

### Landing Site Routes (`pymstr.com`)
```
/                → Main landing page
#/gaming         → Gaming niche landing
#/creators       → Creators niche landing
#/b2b            → B2B niche landing
#/high-risk      → High-risk merchants landing
```

All routes handled by `LandingApp.tsx`

### Dashboard App Routes (`app.pymstr.com`)
```
/                → Dashboard (admin view)
#/dev            → Dev mode bypass
#/dashboard      → Dashboard
#/links          → Payment Links
#/wallets        → Wallets
#/reports        → Reports
#/apikeys        → API Keys
#/webhooks       → Webhooks
#/team           → Team Management
#/documents      → Documentation Hub
#/settings       → Settings
#/help           → Help Center
#/legal          → Legal Pages
#/user-dashboard → End User Dashboard
#/pay/PL123      → Checkout Flow
#/quickstart     → Quick Start Guide (standalone)
#/api-reference  → API Reference (standalone)
#/code-examples  → Code Examples (standalone)
```

All routes handled by `App.tsx`

---

## 🚀 Deployment Steps

### Step 1: Deploy Landing Site

**Figma Site**:
1. Create new Figma Site project
2. Upload files:
   - `/LandingApp.tsx`
   - `/pages/Marketing*.tsx` (all 5 files)
   - `/index-landing.html`
   - `/src/landing-main.tsx`
   - `/components/` (shared components)
   - `/styles/globals.css`
3. Set custom domain: `pymstr.com`
4. Publish

**Or use Vercel/Netlify**:
```bash
# Build landing
vite build --config vite.config.landing.ts

# Deploy dist-landing to pymstr.com
vercel deploy dist-landing --prod
```

### Step 2: Deploy Dashboard App

**Figma Site**:
1. Create new Figma Site project
2. Upload files:
   - `/App.tsx`
   - `/pages/` (exclude Marketing*.tsx)
   - `/components/`
   - `/styles/globals.css`
   - `/utils/`
   - `/constants/`
3. Set custom domain: `app.pymstr.com`
4. Publish

**Or use Vercel/Netlify**:
```bash
# Build app
vite build

# Deploy dist to app.pymstr.com
vercel deploy dist --prod
```

---

## ✅ Benefits of Separation

1. **No routing conflicts** - Each app has its own routes
2. **Faster builds** - Smaller codebases
3. **Independent deploys** - Update landing without touching app
4. **Better performance** - Landing loads faster (no dashboard code)
5. **Clearer architecture** - Separation of concerns
6. **Easier maintenance** - Each app has single responsibility

---

## 🔗 Cross-App Links

### From Landing → App
```tsx
// On landing CTA buttons
<Button onClick={() => window.location.href = 'https://app.pymstr.com'}>
  Get Started
</Button>
```

### From App → Landing
```tsx
// Back to marketing site
<Button onClick={() => window.location.href = 'https://pymstr.com'}>
  About PYMSTR
</Button>
```

---

## 🧪 Local Development

### Run Landing Site
```bash
# Option 1: Direct dev server
vite --config vite.config.landing.ts --port 5173

# Option 2: Build and preview
vite build --config vite.config.landing.ts
vite preview dist-landing --port 5173
```

### Run Dashboard App
```bash
# Default vite dev server
vite --port 3000

# Or build and preview
vite build
vite preview --port 3000
```

Access:
- Landing: `http://localhost:5173`
- App: `http://localhost:3000/#/dev` (dev mode bypass)

---

## 📁 File Organization

```
/
├── LandingApp.tsx              # Landing site entry
├── App.tsx                     # Dashboard app entry
├── index-landing.html          # Landing HTML
├── src/
│   └── landing-main.tsx        # Landing React mount
├── pages/
│   ├── Marketing*.tsx          # 5 landing pages
│   ├── Dashboard*.tsx          # Dashboard pages
│   ├── Wallets*.tsx            # etc.
│   └── ...
├── components/                 # Shared components
├── utils/                      # Shared utilities
├── styles/                     # Shared styles
└── vite.config.landing.ts      # Landing build config
```

---

## 🎯 Next Steps

1. ✅ **Landing deployed to `pymstr.com`** - Test all niche pages
2. ✅ **App deployed to `app.pymstr.com`** - Test dashboard login
3. ✅ **Update all CTAs** - Link landing → app
4. ✅ **Test Web3Auth** - Ensure login redirects work
5. ✅ **DNS Configuration** - Point subdomains correctly
6. ✅ **SSL Certificates** - Secure both domains

---

## 🐛 Troubleshooting

**Landing redirects to dashboard?**
- Check that you're deploying `LandingApp.tsx` not `App.tsx`
- Verify `index-landing.html` points to `/src/landing-main.tsx`

**App shows marketing page?**
- Check that `App.tsx` no longer imports Marketing*.tsx
- Verify all marketing routes removed from hash handler

**Cross-origin issues?**
- Both domains must use HTTPS in production
- Configure CORS if app needs to call landing APIs (unlikely)

**Shared components not working?**
- Both apps need access to `/components/`, `/utils/`, `/styles/`
- Ensure build includes all dependencies

---

## 📊 Deployment Checklist

### Landing Site (pymstr.com)
- [ ] Remove all dashboard/app code
- [ ] Keep only marketing pages
- [ ] Update CTAs to link to app.pymstr.com
- [ ] Test all 5 landing pages
- [ ] Verify routing works (#/gaming, #/creators, etc.)
- [ ] Check mobile responsiveness
- [ ] Deploy to production

### Dashboard App (app.pymstr.com)
- [ ] Remove all marketing pages
- [ ] Default route goes to dashboard
- [ ] Web3Auth integration works
- [ ] #/dev bypass works for testing
- [ ] #/pay/* checkout flow works
- [ ] All dashboard features functional
- [ ] Deploy to production

---

**Status**: ✅ Separation Complete

Both apps are now independent and ready for deployment!
