# 📝 PYMSTR Technical Debt Tracker

**Philosophy:** Ship fast, refactor smart. Track debt, pay it down strategically.

---

## 🎯 DEBT MANAGEMENT STRATEGY

### When to Refactor:
✅ **DO refactor when:**
- Feature gets real user traction (usage data proves it's important)
- Bug rate in a feature becomes problematic
- Feature becomes bottleneck for new features
- Performance issues affect user experience
- Team velocity slows due to code complexity

❌ **DON'T refactor when:**
- Feature has zero users
- "It just feels dirty" (feelings don't pay bills)
- You're procrastinating on hard product decisions
- You haven't validated product-market fit

### Rule of Thumb:
**"No refactoring without usage data"**

---

## 🔴 CRITICAL DEBT (Refactor When Feature Gets Traction)

### 1. App.tsx God Object (2,648 lines)
**Issue:** All state in single component  
**Impact:** Performance, maintainability  
**Refactor Trigger:** When dashboard has 100+ daily active users  
**Effort:** 5-7 days  
**Priority:** Monitor performance metrics

**Recommended Approach:**
- Extract most-used feature first (check analytics)
- Create context provider for that feature
- Test thoroughly
- Repeat for next most-used feature

---

### 2. State Management Chaos (58+ useState hooks)
**Issue:** No state isolation, prop drilling  
**Impact:** Re-render performance, debugging difficulty  
**Refactor Trigger:** App feels sluggish, or when adding 5+ new features  
**Effort:** Included in #1 above  
**Priority:** Same as #1

---

### 3. Missing Error Handling
**Issue:** No try/catch, no error boundaries  
**Impact:** Poor UX when errors occur, hard to debug  
**Refactor Trigger:** When error reports from users increase  
**Effort:** 1-2 days  
**Priority:** **ADD ERROR BOUNDARIES NOW** (2 hours, high ROI)

**Quick Win:**
```tsx
// Add this NOW before shipping (30 minutes)
// components/ErrorBoundary.tsx
import React from 'react';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
    // TODO: Send to error tracking service (Sentry)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-4">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-[#798A9B] mb-6">
              We've been notified and are looking into it.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-[#1E88E5] text-white rounded-full hover:bg-[#1565C0] transition-all duration-200"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrap App in App.tsx:
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

## 🟡 MEDIUM DEBT (Refactor When It Hurts)

### 4. Magic Numbers
**Issue:** Hardcoded values (2000ms, 256px, etc.)  
**Impact:** Hard to maintain, inconsistent  
**Refactor Trigger:** When changing same value in multiple places  
**Effort:** 4 hours  
**Priority:** Low - works fine for now

---

### 5. Missing TypeScript Types
**Issue:** Some `any` types, untyped state  
**Impact:** Less type safety, harder to catch bugs  
**Refactor Trigger:** When TypeScript could have caught a production bug  
**Effort:** 1 day  
**Priority:** Low - add types to new code, fix old code as needed

---

### 6. No Loading States
**Issue:** No spinners during async operations  
**Impact:** Users don't know if app is working  
**Refactor Trigger:** When users report "is it working?" confusion  
**Effort:** 4 hours  
**Priority:** Medium - consider adding basic spinners before launch

**Quick Win (1 hour):**
```tsx
// Add global loading state
const [isLoading, setIsLoading] = useState(false);

// Add to all async operations
const handleAction = async () => {
  setIsLoading(true);
  try {
    await doSomething();
  } finally {
    setIsLoading(false);
  }
};

// Show spinner overlay
{isLoading && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  </div>
)}
```

---

## 🟢 LOW DEBT (Cosmetic, Fix When Bored)

### 7. Inconsistent Formatting
**Issue:** Spacing inconsistencies  
**Impact:** None (readability slightly worse)  
**Refactor Trigger:** Never urgent, fix when setting up CI/CD  
**Effort:** 1 hour (setup Prettier)  
**Priority:** Very Low

---

### 8. Over/Under Commenting
**Issue:** Some redundant comments, some missing docs  
**Impact:** Minimal  
**Refactor Trigger:** When onboarding new developers  
**Effort:** Ongoing  
**Priority:** Very Low

---

## 📊 DEBT TRACKING

### Current Debt Score: **6/10**
- ✅ Features work
- ✅ Code is organized
- ❌ Architecture needs improvement
- ❌ Missing error handling
- ⚠️  Performance concerns at scale

### Acceptable Debt Level for MVP: **7/10**
**Current Status:** ✅ **GOOD ENOUGH TO SHIP**

---

## 🚦 GO/NO-GO CRITERIA

### ✅ READY TO SHIP:
- All features work
- No critical bugs
- Error boundaries added (do this!)
- Basic error handling in user-facing actions
- Analytics/tracking added
- Terms/Privacy pages complete

### ❌ NOT READY YET:
- Critical bugs that block main flows
- Missing error boundaries (add before ship!)
- No way to track user behavior
- Missing legal pages

---

## 📈 REFACTOR ROADMAP (Data-Driven)

### Phase 1: Post-Launch Monitoring (Week 1-4)
**Goal:** Gather data before refactoring anything

**Track:**
- Which features users actually use (Amplitude, Mixpanel, or PostHog)
- Which features have bugs/errors (Sentry or LogRocket)
- Which features users complain about
- Performance metrics (Core Web Vitals)

**Action:**
- ✅ Add analytics to all features
- ✅ Add error tracking (Sentry)
- ✅ Set up performance monitoring
- ❌ Don't refactor anything yet!

---

### Phase 2: Strategic Refactor (Week 5+)
**Goal:** Refactor based on data, not feelings

**If Payment Links has 80% usage:**
- Refactor Payment Links first
- Extract PaymentLinksContext
- Add loading states
- Add comprehensive error handling
- This feature matters - make it bulletproof

**If Wallets has 5% usage:**
- Leave it alone
- Maybe deprecate it
- Don't waste time refactoring unused features

**Prioritization Formula:**
```
Refactor Priority = (Usage %) × (Bug Rate) × (Feature Velocity Impact)

Example:
Payment Links: 80% × 0.3 bugs/day × 0.8 = 19.2 → HIGH PRIORITY
Wallets: 5% × 0.1 bugs/day × 0.2 = 0.1 → IGNORE
```

---

### Phase 3: Scale Refactor (Month 3+)
**Goal:** Refactor for scale when you have traction

**Triggers:**
- 1,000+ daily active users
- Team growing (hiring developers)
- Performance becomes measurable problem
- Feature development velocity drops

**Then do full refactor:**
- Extract all context providers
- Proper state management (React Context or Zustand)
- Error boundaries everywhere
- Comprehensive testing
- Performance optimization

---

## 🎯 NEW FEATURE GUIDELINES

**For all NEW features (starting now):**

### ✅ DO:
1. **Create separate page component** in `/pages`
2. **Use existing utilities** (`useClipboard`, `truncateAddress`, etc.)
3. **Add error handling** (try/catch + toast)
4. **Add loading states** (even simple ones)
5. **Use TypeScript types** for new code
6. **Follow MD3 guidelines** strictly
7. **Test on mobile AND desktop**
8. **Add analytics tracking** (when you set it up)

### ❌ DON'T:
1. **Don't add more state to App.tsx** (it's already too big)
2. **Don't create new utilities** if existing ones work
3. **Don't skip error handling** (it's a 5-minute habit)
4. **Don't use magic numbers** (create constants)
5. **Don't use `any` type** (use proper types)
6. **Don't break MD3 guidelines** (we have a design system!)

### 📝 NEW FEATURE TEMPLATE:

```tsx
// pages/NewFeaturePage.tsx
import { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { toast } from 'sonner';
import { FeatureIcon } from 'lucide-react';

export const NewFeaturePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<YourType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Your logic here
      const result = await doSomething();
      setData(result);
      toast.success('Action completed!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Action failed';
      setError(message);
      toast.error(message);
      console.error('Action failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<FeatureIcon className="w-6 h-6 text-[#07D7FF]" />}
        title="New Feature"
        subtitle="Feature description"
      />
      <PageLayout.Content>
        {isLoading && <Spinner />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {data && <YourContent data={data} />}
      </PageLayout.Content>
    </PageLayout>
  );
};
```

**This prevents making the debt worse!**

---

## 📚 RESOURCES

### Error Tracking (Choose One):
- **Sentry** (Recommended) - Free tier: 5k events/month
- **LogRocket** - Session replay + error tracking
- **Rollbar** - Simple error tracking

### Analytics (Choose One):
- **PostHog** (Recommended) - Open source, generous free tier
- **Amplitude** - Free tier: 10M events/month
- **Mixpanel** - Free tier: 100k events/month

### Performance Monitoring:
- **Vercel Analytics** (if using Vercel)
- **Google Lighthouse** (free)
- **Web Vitals** (free Chrome extension)

---

## 🎓 LESSONS LEARNED

### What We'd Do Differently Next Time:
1. Start with context providers from day 1
2. Add error boundaries immediately
3. Set up analytics before writing code
4. Use Zustand instead of useState for complex state
5. Write types first, code second

### What We Did Right:
1. ✅ Comprehensive Guidelines.md
2. ✅ Component organization
3. ✅ Utility functions (useClipboard, truncateAddress)
4. ✅ MD3 design system adherence
5. ✅ Mobile-responsive from start
6. ✅ Separate concerns (pages, components, utils)

---

## 🚀 DEPLOYMENT CHECKLIST

Before shipping, do these (HIGH ROI, LOW EFFORT):

### Must Do (2-3 hours total):
- [ ] Add ErrorBoundary component (30 min)
- [ ] Add basic loading spinner for async operations (1 hour)
- [ ] Add error handling to critical paths (create payment link, login) (1 hour)
- [ ] Test all features one more time (30 min)

### Should Do (4-5 hours total):
- [ ] Set up Sentry error tracking (1 hour)
- [ ] Set up PostHog analytics (1 hour)
- [ ] Add analytics events to key actions (2 hours)
- [ ] Test on real mobile devices (1 hour)

### Nice to Do (2-3 hours total):
- [ ] Add Prettier + format all files (1 hour)
- [ ] Add meta tags for SEO (1 hour)
- [ ] Add favicon (30 min)

---

## 📝 REFACTOR DECISION LOG

Track refactoring decisions here:

| Date | Feature | Decision | Reason | Outcome |
|------|---------|----------|--------|---------|
| 2025-11-18 | App.tsx | Defer refactor | Need PMF first | TBD |
| _Future_ | Payment Links | Extract context | If 80%+ usage | TBD |

---

**Last Updated:** November 18, 2025  
**Debt Status:** Acceptable for MVP  
**Next Review:** After 30 days of production usage
