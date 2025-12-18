# Debug Login Error

## What Error Are You Seeing?

Please share:
1. **Browser error message** (what shows on screen)
2. **Console error** (F12 → Console tab)
3. **Backend logs** (Render → Backend service → Logs tab)

---

## Common Login Errors

### Error 1: "Invalid credentials"
**Meaning:** Email or password is wrong
**Fix:** 
- Check email is correct
- Check password is correct
- Make sure account exists

### Error 2: "User not found"
**Meaning:** Account doesn't exist
**Fix:**
- Create account first (register)
- Or check email spelling

### Error 3: "Database connection error"
**Meaning:** MongoDB issue
**Fix:**
- Check backend logs for MongoDB errors
- Verify MONGODB_URI is correct
- Check MongoDB Atlas is accessible

### Error 4: "Server error" or 500
**Meaning:** Backend code error
**Fix:**
- Check backend logs for exact error
- Share the error message

### Error 5: CORS error
**Meaning:** Frontend can't reach backend
**Fix:**
- Check VITE_API_URL in frontend
- Check FRONTEND_URL in backend
- Verify backend URL is correct

---

## Quick Debugging Steps

### Step 1: Check Browser Console
1. **Open browser DevTools** (F12)
2. **Go to Console tab**
3. **Try to login**
4. **Copy any red error messages**

### Step 2: Check Network Tab
1. **Open DevTools** (F12)
2. **Go to Network tab**
3. **Try to login**
4. **Click on the `/api/auth/login` request**
5. **Check:**
   - Status code (should be 200, not 500 or 404)
   - Response (what error message shows)
   - Request URL (should be your backend URL)

### Step 3: Check Backend Logs
1. **Go to Render dashboard**
2. **Click backend service**
3. **Click "Logs" tab**
4. **Look for error messages** (usually in red)
5. **Scroll to see recent errors**

---

## Test Account Creation

If login fails, try:
1. **Create a new account** (register)
2. **Use that account to login**
3. **See if it works**

---

## Share These Details

To help fix the error, please share:

1. **What error message do you see?** (exact text)
2. **Browser console error?** (F12 → Console)
3. **Backend logs error?** (from Render)
4. **Are you using an existing account or new one?**
5. **What's the status code?** (Network tab → Status)

With this info, I can give you the exact fix!


