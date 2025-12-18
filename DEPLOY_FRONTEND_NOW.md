# Deploy Frontend on Render - Step by Step

## Quick Steps

### Step 1: Create Frontend Service
1. **In Render dashboard, click "New +"** (top right)
2. **Select "Web Service"** (not Static Site)

### Step 2: Connect Repository
1. **Find and select:** `ofilwe/Moela`
2. **Click "Connect"**

### Step 3: Configure Frontend
Fill in these fields:

- **Name:** `moela-frontend`
- **Region:** Same as your backend (Virginia US East)
- **Branch:** `main`
- **Root Directory:** `frontend` ⚠️ **Important!**
- **Environment:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run preview -- --port $PORT --host`
- **Plan:** **Free** (select Free, not Starter/Standard)

### Step 4: Add Environment Variable
1. **Scroll down to "Environment Variables"**
2. **Click "Add Environment Variable"**
3. **Add:**
   - **Key:** `VITE_API_URL`
   - **Value:** Your backend URL
     - Go to your backend service in Render
     - Copy the URL (e.g., `https://moela-backend.onrender.com`)
     - Paste it as the value
4. **Click "Add"**

### Step 5: Deploy
1. **Scroll down**
2. **Click "Create Web Service"**
3. **Wait 5-10 minutes** for deployment
4. **Copy the frontend URL** when it's ready

---

## After Frontend Deploys

### Step 6: Update Backend CORS
1. **Go to your backend service** in Render
2. **Click "Environment"** tab
3. **Add new variable:**
   - **Key:** `FRONTEND_URL`
   - **Value:** Your frontend URL (from Step 5)
4. **Click "Save Changes"** (backend will auto-redeploy)

### Step 7: Test Your App
1. **Visit your FRONTEND URL** (not backend!)
2. **You should see the login page**
3. **Create an account and test!**

---

## Important Notes

- ⚠️ **Root Directory must be:** `frontend` (exact, lowercase)
- ⚠️ **Build Command:** `npm install && npm run build` (with `&&`)
- ⚠️ **Start Command:** `npm run preview -- --port $PORT --host`
- ⚠️ **Don't forget the environment variable:** `VITE_API_URL`

---

## Your URLs

After deployment, you'll have:
- **Backend:** `https://moela-backend.onrender.com` (API only)
- **Frontend:** `https://moela-frontend.onrender.com` (your app!)

**Visit the FRONTEND URL to use your app!**


