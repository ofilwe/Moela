# Update Backend CORS - Quick Steps

## Step 1: Get Your Frontend URL

1. **Go to Render dashboard**
2. **Click on your frontend service** (moela-frontend)
3. **Copy the URL** at the top (e.g., `https://moela-frontend.onrender.com` or `https://moela-dating.onrender.com`)

## Step 2: Add FRONTEND_URL to Backend

1. **Go to your backend service** in Render (moela-backend)
2. **Click "Environment" tab** (in the left sidebar or top menu)
3. **Click "Add Environment Variable"**
4. **Add:**
   - **Key:** `FRONTEND_URL`
   - **Value:** Your frontend URL (the one you copied in Step 1)
5. **Click "Save Changes"** or the checkmark
6. **Backend will automatically redeploy** (takes 2-3 minutes)

## Step 3: Verify

After backend redeploys:
1. **Check backend logs** - should show "MongoDB connected successfully"
2. **Visit your frontend URL**
3. **You should see the login page!**

---

## Example

If your frontend URL is: `https://moela-dating.onrender.com`

Then add:
- **Key:** `FRONTEND_URL`
- **Value:** `https://moela-dating.onrender.com`

---

## Why This Is Important

This tells your backend to allow requests from your frontend URL. Without it, you'll get CORS errors when the frontend tries to call the backend API.

---

## After This Step

Your app should be fully working! 🎉


