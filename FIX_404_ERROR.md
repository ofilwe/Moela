# Fix "Cannot GET /" and 404 Error

## The Problem

The error "Cannot GET /" means:
- ✅ Your **backend is deployed** and running
- ❌ Your **frontend is NOT deployed** yet (or not configured correctly)

The backend doesn't have a root route (`/`), so when you visit the backend URL directly, you get "Cannot GET /". This is normal!

## Solution: Deploy the Frontend

You need to deploy the **frontend** separately. Here's how:

---

## Step 1: Deploy Frontend on Render

1. **In Render dashboard, click "New +"** → **"Web Service"**
2. **Connect same repository:** `ofilwe/Moela`
3. **Configure Frontend:**
   - **Name:** `moela-frontend`
   - **Region:** Same as backend (Virginia US East)
   - **Branch:** `main`
   - **Root Directory:** `frontend` ⚠️ **Important!**
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run preview -- --port $PORT --host`
   - **Plan:** **Free**
4. **Add Environment Variable:**
   - **Key:** `VITE_API_URL`
   - **Value:** Your backend URL (e.g., `https://moela-backend.onrender.com`)
     - Get this from your backend service in Render
5. **Click "Create Web Service"**
6. **Wait 5-10 minutes** for deployment

---

## Step 2: Update Backend CORS

After frontend is deployed:

1. **Go to your backend service** in Render
2. **Click "Environment"** tab
3. **Add new variable:**
   - **Key:** `FRONTEND_URL`
   - **Value:** Your frontend URL (e.g., `https://moela-frontend.onrender.com`)
4. **Click "Save Changes"** (will auto-redeploy backend)

---

## Step 3: Access Your App

**Don't visit the backend URL!** Visit the **frontend URL** instead:
- Frontend URL: `https://moela-frontend.onrender.com` (or your actual URL)
- Backend URL: `https://moela-backend.onrender.com` (only for API calls)

---

## Quick Checklist

- [ ] Backend deployed ✅ (you have this)
- [ ] Frontend deployed ❌ (you need this)
- [ ] Frontend has `VITE_API_URL` environment variable
- [ ] Backend has `FRONTEND_URL` environment variable
- [ ] Access app via **frontend URL**, not backend URL

---

## Why This Happens

- **Backend URL** (`/api/*` routes) - for API calls only
- **Frontend URL** (`/` route) - your actual app that users see
- You need **both** deployed for the app to work

---

## After Frontend is Deployed

1. Visit your **frontend URL** (not backend)
2. You should see the login page
3. Create an account
4. Test the app!

---

## Troubleshooting

**Still getting 404?**
- Make sure you're visiting the **frontend URL**, not backend
- Check frontend logs in Render
- Verify `VITE_API_URL` is set correctly

**Frontend can't connect to backend?**
- Check `VITE_API_URL` matches your backend URL exactly
- Check backend CORS settings
- Verify backend is running (check backend logs)


