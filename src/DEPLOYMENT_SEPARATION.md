# PYMSTR Dashboard Deployment Guide

## Overview

This repository contains the **PYMSTR Dashboard Application** only.

The marketing/landing site has been **moved to a separate repository** and is deployed independently.

**Current Repository**:
- 📊 Dashboard App (`App.tsx`) → Deploy to `app.pymstr.com`

**Separate Repository** (not in this workspace):
- 🌐 Landing Site → Deployed to `pymstr.com`

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

### Standard Build (Vite)

```bash
vite build
```

Output: `/dist` directory

### Figma Site Deployment

1. Upload `/App.tsx` as main entry
2. Upload `/index.html` 
3. Upload `/src/main.tsx`
4. Upload all page files from `/pages/`
5. Upload all component files from `/components/`
6. Upload `/utils/` and `/constants/`
7. Upload `/styles/globals.css`
8. Set custom domain: `app.pymstr.com`

**Default Routes**:
- `/` → Dashboard (requires Web3Auth login in production)
- `/#/dev` → Dev mode bypass (for testing only)
- `/#/pay/PL123` → Checkout flow for payment links

---

## 🔄 Dashboard Routes

All routes handled by `App.tsx`:

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

---

## 🚀 Deployment Steps

### Netlify Deployment (Current)

1. Build the app:
   ```bash
   vite build
   ```

2. Deploy `/dist` folder to Netlify

3. Configure:
   - Custom domain: `app.pymstr.com`
   - Build command: `vite build`
   - Publish directory: `dist`

### Alternative: Vercel Deployment

```bash
# Build app
vite build

# Deploy dist to app.pymstr.com
vercel deploy dist --prod
```

---

## 🔗 Links to Marketing Site

The landing site is deployed separately to `pymstr.com`.

If you need to link back to marketing from the dashboard:

```tsx
// Back to marketing site
<Button onClick={() => window.location.href = 'https://pymstr.com'}>
  About PYMSTR
</Button>
```

---

## 🧪 Local Development

### Run Dashboard App

```bash
# Default vite dev server
npm run dev

# Or with specific port
vite --port 3000
```

Access:
- App: `http://localhost:5173` (default Vite port)
- Dev mode: `http://localhost:5173/#/dev` (bypass Web3Auth)

---

## 📁 File Organization

```
/
├── App.tsx                     # Dashboard app entry
├── index.html                  # Main HTML entry
├── src/
│   └── main.tsx                # React mount point
├── pages/                      # Dashboard pages
│   ├── DashboardPage.tsx
│   ├── PaymentLinksPage.tsx
│   ├── WalletsPage.tsx
│   ├── ReportsPage.tsx
│   ├── APIKeysPage.tsx
│   ├── SettingsPage.tsx
│   ├── HelpPage.tsx
│   ├── LegalPage.tsx
│   ├── EndUserDashboardPage.tsx
│   └── ... (18 total pages)
├── components/                 # React components
├── utils/                      # Utilities
│   ├── address.ts              # Address truncation
│   ├── clipboard.ts            # Copy utilities
│   └── helpers.ts              # General helpers
├── constants/                  # Mock data
├── styles/                     # Global styles
│   └── globals.css
└── guidelines/                 # Design system docs
    └── Guidelines.md
```

---

## ✅ Benefits of Separation

1. **No routing conflicts** - Dashboard has clean routes
2. **Faster builds** - Smaller codebase (dashboard-only)
3. **Independent deploys** - Update app without touching landing
4. **Better performance** - No marketing code in dashboard
5. **Clearer architecture** - Single responsibility
6. **Easier maintenance** - Focused codebase

---

## 🎯 Production Checklist

### Dashboard App (app.pymstr.com)
- [x] Remove all marketing pages
- [x] Default route goes to dashboard
- [x] Clean entry point (index.html → main.tsx → App.tsx)
- [x] All dashboard features functional
- [x] 18 pages tested and working
- [ ] Web3Auth integration configured
- [ ] #/dev bypass disabled in production
- [ ] #/pay/* checkout flow tested
- [ ] Deploy to production

---

## 🐛 Troubleshooting

**App not loading?**
- Check that `index.html` exists in root
- Verify `/src/main.tsx` imports App.tsx correctly
- Ensure all page files are uploaded

**Routing not working?**
- Hash routing is handled by App.tsx
- Default route `/` should show dashboard
- Test with `#/dev` for dev mode

**Build errors?**
- Run `npm install` to ensure dependencies
- Check that all imports resolve correctly
- Verify no references to deleted marketing files

**Components not found?**
- Ensure `/components/` folder uploaded
- Check `/utils/` and `/constants/` uploaded
- Verify `/styles/globals.css` is included

---

## 📦 Dependencies

The dashboard uses:
- React 18
- Tailwind CSS 4.0
- Vite (build tool)
- ShadCN UI components
- Lucide React icons
- Web3Auth (authentication)
- Pimlico (Account Abstraction)

All dependencies are managed in `package.json`.

---

## 🎨 Design System

The app follows Material Design 3 principles with PYMSTR brand identity.

See `/guidelines/Guidelines.md` for complete design system documentation.

---

**Status**: ✅ Dashboard-Only Application

This repository is clean, dashboard-focused, and ready for deployment to `app.pymstr.com`!
