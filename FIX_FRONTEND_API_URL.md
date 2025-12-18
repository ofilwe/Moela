# Fix Frontend API URL

## The Problem

- **Backend URL:** `https://moela-backend.onrender.com` ✅
- **Frontend is calling:** `https://moela.onrender.com` ❌ (wrong!)

The frontend `VITE_API_URL` is set incorrectly.

---

## Step 1: Update Frontend Environment Variable

1. **Go to Render dashboard**
2. **Click on your frontend service** (moela-dating or moela-frontend)
3. **Click "Environment" tab**
4. **Find `VITE_API_URL`**
5. **Edit it:**
   - **Current (wrong):** Probably `https://moela.onrender.com` or similar
   - **Change to:** `https://moela-backend.onrender.com`
6. **Click "Save Changes"**
7. **Frontend will auto-redeploy** (5-10 minutes)

---

## Step 2: Verify After Redeploy

After frontend redeploys:
1. **Open browser DevTools** (F12)
2. **Go to Network tab**
3. **Try to login**
4. **Check the request URL:**
   - Should be: `https://moela-backend.onrender.com/api/auth/login`
   - NOT: `https://moela.onrender.com/api/auth/login`

---

## Step 3: Test Login

1. **Visit:** https://moela-dating.onrender.com
2. **Try to login** (or create account first)
3. **Should work now!**

---

## Important

- **VITE_API_URL** = Backend URL (where API calls go)
- **Frontend URL** = Where users visit your app
- These are **different URLs**!

---

## After Fix

The frontend will now correctly call:
- `https://moela-backend.onrender.com/api/auth/login`
- `https://moela-backend.onrender.com/api/auth/register`
- etc.

Instead of the wrong URL!


