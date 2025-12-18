# Fix Login 500 Error

## The Problem

Frontend is calling: `https://moela.onrender.com/api/auth/login`
But this might not be your backend URL!

---

## Step 1: Check Your Backend URL

1. **Go to Render dashboard**
2. **Find your backend service**
3. **Copy the backend URL** (should be something like `https://moela-backend.onrender.com`)

---

## Step 2: Check Frontend VITE_API_URL

1. **Go to frontend service** in Render
2. **Click "Environment"** tab
3. **Check `VITE_API_URL`:**
   - Should be your **backend URL** (not frontend URL!)
   - Should be like: `https://moela-backend.onrender.com`
   - **NOT:** `https://moela-dating.onrender.com` (that's frontend)

---

## Step 3: Check Backend Logs

1. **Go to backend service** → **Logs** tab
2. **Look for error messages** when you try to login
3. **Share the exact error** you see

Common errors:
- "MongoServerError"
- "Cannot read property"
- "User.findOne is not a function"
- Database connection issues

---

## Step 4: Verify Database

Since MongoDB was connecting to `test` database:
1. **Did you update MONGODB_URI** to include `/moela-dating`?
2. **If not, do that first:**
   - Backend → Environment → MONGODB_URI
   - Should end with: `/moela-dating?retryWrites=true&w=majority`
3. **Then create a new account** (old account might be in `test` database)

---

## Quick Fixes

### Fix 1: Wrong Backend URL
- **Check frontend `VITE_API_URL`** points to backend, not frontend
- **Update if wrong**

### Fix 2: Database Issue
- **Update MONGODB_URI** to use `/moela-dating`
- **Create new account** after fix

### Fix 3: Check Backend Logs
- **Share the exact error** from backend logs
- **This will tell us what's wrong**

---

## What to Share

1. **What's your backend URL?** (from Render dashboard)
2. **What's `VITE_API_URL` set to?** (in frontend environment)
3. **What error in backend logs?** (from Render logs tab)

With this info, I can give you the exact fix!


