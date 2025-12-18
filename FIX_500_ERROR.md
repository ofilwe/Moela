# Fix 500 Server Error on Login

## The Problem

A 500 error means the backend received the request but failed to process it. Common causes:

1. **MongoDB connection failed**
2. **Missing environment variables**
3. **Database not accessible**
4. **Code error in backend**

---

## Step 1: Check Backend Logs

1. **Go to Render dashboard**
2. **Click on your backend service**
3. **Click "Logs" tab**
4. **Look for error messages** (usually in red)
5. **Scroll to see recent errors**

**Common errors you might see:**
- "MongoDB connection error"
- "MongoServerError"
- "Cannot read property of undefined"
- "ValidationError"

---

## Step 2: Common Fixes

### Fix 1: MongoDB Connection Issue

**Error:** "MongoDB connection error" or "MongoServerError"

**Solution:**
1. **Check MONGODB_URI environment variable:**
   - Go to backend → Environment
   - Verify `MONGODB_URI` is set correctly
   - Make sure connection string includes:
     - Correct username
     - Correct password
     - `/moela-dating` before the `?`
   
2. **Check MongoDB Atlas:**
   - Go to MongoDB Atlas dashboard
   - Verify IP whitelist includes `0.0.0.0/0` (for testing)
   - Check database user is active

3. **Test connection string format:**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/moela-dating?retryWrites=true&w=majority
   ```

### Fix 2: Missing Environment Variables

**Error:** "JWT_SECRET is not defined" or similar

**Solution:**
1. **Verify all 4 environment variables are set:**
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = (your connection string)
   - `JWT_SECRET` = (the secret we generated)
   - `FRONTEND_URL` = `https://moela-dating.onrender.com`

2. **Check for typos in variable names:**
   - Must be exactly: `NODE_ENV`, `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`
   - Case-sensitive!

### Fix 3: Backend Not Running

**Error:** Connection refused or timeout

**Solution:**
1. **Check backend service status:**
   - Should show "Live" or "Running"
   - If "Stopped", click "Manual Deploy"

2. **Check backend URL:**
   - Make sure frontend `VITE_API_URL` matches backend URL
   - Test backend URL directly: `https://your-backend.onrender.com/api/auth/login`
   - Should return an error (not connection refused)

---

## Step 3: Check Frontend Configuration

1. **Verify VITE_API_URL:**
   - Go to frontend service → Environment
   - Check `VITE_API_URL` is set to your backend URL
   - Should be: `https://your-backend.onrender.com` (not frontend URL!)

2. **Check browser console:**
   - Open browser DevTools (F12)
   - Check Network tab
   - See what URL it's trying to call
   - Should be calling backend URL, not frontend

---

## Step 4: Test Backend Directly

Try calling the backend API directly:

1. **Open browser or Postman**
2. **Test:** `https://your-backend.onrender.com/api/auth/login`
3. **Method:** POST
4. **Body (JSON):**
   ```json
   {
     "email": "test@test.com",
     "password": "test123"
   }
   ```
5. **See what error you get**

---

## Quick Debugging Steps

1. ✅ **Check backend logs** - What's the exact error?
2. ✅ **Verify MongoDB connection** - Is it connecting?
3. ✅ **Check environment variables** - All 4 set correctly?
4. ✅ **Test backend URL** - Is it accessible?
5. ✅ **Check frontend VITE_API_URL** - Pointing to backend?

---

## Share the Error

**Please share:**
1. **The exact error from backend logs** (from Render)
2. **What the backend URL is** (so I can verify frontend is calling it)
3. **Any MongoDB connection errors** you see

This will help me give you the exact fix!


