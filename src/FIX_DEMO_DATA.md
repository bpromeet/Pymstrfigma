# 🔧 Fix Demo Data - Remove "Alex Johnson / alex@example.com"

## Issue: Hardcoded Demo Names in Navigation

**Location:** `/App.tsx` - Navigation Rail User Profile Dropdown

**Current Code (Lines 3072-3077):**
```tsx
<div className="px-4 py-3 border-b border-[#43586C]">
  <p className="font-medium text-gray-900 dark:text-white">
    {userContext === 'enduser' ? 'Alex Johnson' : 'John Doe'}
  </p>
  <p className="text-sm text-gray-600 dark:text-gray-400">
    {userContext === 'enduser' ? 'alex@example.com' : 'john@pymstr.com'}
  </p>
</div>
```

---

## ✅ Solution Options

### Option 1: Show Real Web3Auth User Data (Recommended)

Replace hardcoded names with actual user data from Web3Auth login.

**Required Changes:**

1. **Add user state management:**
```tsx
// Near top of App.tsx where other state is defined
const [userEmail, setUserEmail] = useState<string>('');
const [userName, setUserName] = useState<string>('');
```

2. **Update after Web3Auth login:**
```tsx
// In your Web3Auth login success handler
const handleWeb3AuthLogin = async () => {
  // ... existing login code ...
  
  // Get user info from Web3Auth
  const userInfo = await web3auth.getUserInfo();
  
  if (userInfo) {
    setUserEmail(userInfo.email || '');
    setUserName(userInfo.name || 'User');
    setIsUserLoggedIn(true);
  }
};
```

3. **Replace dropdown code:**
```tsx
<div className="px-4 py-3 border-b border-[#43586C]">
  <p className="font-medium text-gray-900 dark:text-white">
    {userName || 'User'}
  </p>
  <p className="text-sm text-gray-600 dark:text-gray-400">
    {userEmail || 'No email provided'}
  </p>
</div>
```

---

### Option 2: Use Wallet Address as Fallback

If Web3Auth doesn't provide name/email, show wallet address:

```tsx
import { truncateAddress } from './utils/address';

// In dropdown:
<div className="px-4 py-3 border-b border-[#43586C]">
  <p className="font-medium text-gray-900 dark:text-white">
    {userName || truncateAddress(walletAddress)}
  </p>
  <p className="text-sm text-gray-600 dark:text-gray-400">
    {userEmail || 'Connected Wallet'}
  </p>
</div>
```

---

### Option 3: Environment-Based Demo Data (Development Only)

Keep demo data for development, show real data in production:

```tsx
// Add environment check
const isDevelopment = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';

// In dropdown:
<div className="px-4 py-3 border-b border-[#43586C]">
  <p className="font-medium text-gray-900 dark:text-white">
    {isDevelopment 
      ? (userContext === 'enduser' ? 'Alex Johnson (Demo)' : 'John Doe (Demo)')
      : (userName || truncateAddress(walletAddress))
    }
  </p>
  <p className="text-sm text-gray-600 dark:text-gray-400">
    {isDevelopment
      ? (userContext === 'enduser' ? 'alex@example.com' : 'john@pymstr.com')
      : (userEmail || 'Connected Wallet')
    }
  </p>
</div>
```

---

## 🔍 Other Places with Demo Data

Search for these hardcoded values across the codebase:

### 1. MerchantProfile Component
**Location:** `/components/MerchantProfile.tsx`

**Look for:**
- Merchant name
- Business email
- Contact info

**Fix:** Pass real merchant data as props from App.tsx

---

### 2. Mock Transaction Data
**Location:** `/constants/mockData.ts`

**Contains:**
- Mock transactions
- Mock payment links
- Mock team members
- Mock API keys
- Mock webhook endpoints

**Fix:** 
- For production: Replace with real API calls
- For development: Keep as demo data with clear labels

---

### 3. Team Management
**Location:** `/constants/mockData.ts` (Line 419)

```tsx
{
  id: "5",
  name: "Alex Pending",
  email: "alex@pymstr.com",  // ← Different Alex!
  role: "view-only",
  status: "pending",
  avatar: "AP",
  lastActive: "Never",
}
```

**This is OK** - it's mock team member data, not the logged-in user.

---

## 📋 Implementation Steps

### Step 1: Find Current Web3Auth Integration

Search for where Web3Auth login happens:

```bash
# Search for web3auth in App.tsx
# Look for login handlers
# Find where user data is stored
```

### Step 2: Extract User Info

After successful login:
```tsx
// Get user info from Web3Auth
const userInfo = await web3auth.getUserInfo();

console.log('User Info:', {
  email: userInfo.email,
  name: userInfo.name,
  profileImage: userInfo.profileImage,
  verifier: userInfo.verifier,
  verifierId: userInfo.verifierId,
});
```

### Step 3: Store in State

```tsx
const [loggedInUser, setLoggedInUser] = useState({
  name: '',
  email: '',
  avatar: '',
  walletAddress: '',
});

// After login:
setLoggedInUser({
  name: userInfo.name || 'User',
  email: userInfo.email || '',
  avatar: userInfo.profileImage || '',
  walletAddress: address,
});
```

### Step 4: Update Navigation Dropdown

Replace hardcoded values with state:

```tsx
<div className="px-4 py-3 border-b border-[#43586C]">
  <p className="font-medium text-gray-900 dark:text-white">
    {loggedInUser.name || truncateAddress(loggedInUser.walletAddress)}
  </p>
  <p className="text-sm text-gray-600 dark:text-gray-400">
    {loggedInUser.email || truncateAddress(loggedInUser.walletAddress)}
  </p>
</div>
```

### Step 5: Update Avatar

If Web3Auth provides a profile image:

```tsx
{loggedInUser.avatar ? (
  <img 
    src={loggedInUser.avatar} 
    alt="Profile" 
    className="w-10 h-10 rounded-full"
  />
) : (
  <Avatar>
    <AvatarFallback>
      {loggedInUser.name ? loggedInUser.name[0].toUpperCase() : 'U'}
    </AvatarFallback>
  </Avatar>
)}
```

---

## 🧪 Testing Checklist

After implementing changes:

- [ ] Login with Web3Auth
- [ ] Check navigation dropdown shows correct name
- [ ] Check navigation dropdown shows correct email
- [ ] If no email, verify fallback works (wallet address)
- [ ] Check avatar displays correctly
- [ ] Test on both merchant and end-user contexts
- [ ] Verify demo data doesn't show in production
- [ ] Test logout and re-login flow

---

## 🚨 Common Issues

### Issue 1: Web3Auth doesn't return email
**Solution:** Use wallet address as fallback
```tsx
{userInfo.email || truncateAddress(walletAddress)}
```

### Issue 2: Name is undefined
**Solution:** Use "User" as default
```tsx
{userInfo.name || 'User'}
```

### Issue 3: Profile image fails to load
**Solution:** Use fallback avatar with initials
```tsx
<Avatar>
  <AvatarImage src={userInfo.profileImage} />
  <AvatarFallback>{userName[0]}</AvatarFallback>
</Avatar>
```

---

## ⚡ Quick Fix (Temporary)

If you need a quick fix while implementing the full solution:

**Replace lines 3073-3076 in App.tsx:**

```tsx
// BEFORE:
{userContext === 'enduser' ? 'Alex Johnson' : 'John Doe'}
{userContext === 'enduser' ? 'alex@example.com' : 'john@pymstr.com'}

// AFTER (temporary):
{'Connected User'}
{truncateAddress(walletAddress) || 'Not Connected'}
```

This removes the demo names immediately but doesn't add real user data yet.

---

## 📊 Summary

**Priority 1: Remove hardcoded demo data** ✅  
**Priority 2: Add real Web3Auth user info** ✅  
**Priority 3: Add proper fallbacks** ✅  
**Priority 4: Test thoroughly** ✅  

Once deployment is confirmed working, we'll implement the proper user data integration!

---

Would you like me to proceed with any of these fixes after we confirm the deployment issue is resolved?
