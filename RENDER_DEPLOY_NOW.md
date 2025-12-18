# Deploy to Render - Final Steps

## ✅ What's Done
- ✅ MongoDB Atlas cluster created
- ✅ Connection string ready
- ✅ Code pushed to GitHub: https://github.com/ofilwe/Moela

## 🚀 Deploy to Render (15 minutes)

### Step 1: Sign Up for Render
1. Go to: https://render.com
2. Click **"Get Started for Free"**
3. **Sign up with GitHub** (easiest - click "Continue with GitHub")
4. Authorize Render to access your repositories

### Step 2: Deploy Backend First

1. **Click "New +"** → **"Web Service"**
2. **Connect Repository:**
   - Find and select **"ofilwe/Moela"**
   - Click **"Connect"**
3. **Configure Backend:**
   - **Name:** `moela-backend`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** **Free**
4. **Add Environment Variables:**
   Click **"Advanced"** → Add these:
   
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `MONGODB_URI` | Your MongoDB connection string |
   | `JWT_SECRET` | `dfb0c16d49121148a56927f1b06d94abb1e9f20cac8d9d5971d6f3e78944933c` |
   
5. **Click "Create Web Service"**
6. **Wait 5-10 minutes** for deployment
7. **Copy the backend URL** (e.g., `https://moela-backend.onrender.com`)

### Step 3: Deploy Frontend

1. **Click "New +"** → **"Web Service"**
2. **Select same repository:** `ofilwe/Moela`
3. **Configure Frontend:**
   - **Name:** `moela-frontend`
   - **Region:** Same as backend
   - **Branch:** `main`
   - **Root Directory:** `frontend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run preview -- --port $PORT --host`
   - **Plan:** **Free**
4. **Add Environment Variable:**
   - Key: `VITE_API_URL`
   - Value: Your backend URL from Step 2 (e.g., `https://moela-backend.onrender.com`)
5. **Click "Create Web Service"**
6. **Wait 5-10 minutes** for deployment
7. **Copy the frontend URL**

### Step 4: Update Backend CORS

1. Go to your **backend service** in Render
2. Click **"Environment"** tab
3. Add new variable:
   - Key: `FRONTEND_URL`
   - Value: Your frontend URL from Step 3
4. Click **"Save Changes"** (will auto-redeploy)

### Step 5: Test!

1. Open your frontend URL
2. Create an account
3. Test the app!

---

## 📝 Your URLs Will Be:

- **Backend:** `https://moela-backend.onrender.com`
- **Frontend:** `https://moela-frontend.onrender.com`

(Actual URLs will be shown after deployment)

---

## 🔑 Environment Variables Summary

### Backend:
- `NODE_ENV` = `production`
- `MONGODB_URI` = (your MongoDB connection string)
- `JWT_SECRET` = `dfb0c16d49121148a56927f1b06d94abb1e9f20cac8d9d5971d6f3e78944933c`
- `FRONTEND_URL` = (add after frontend deploys)

### Frontend:
- `VITE_API_URL` = (your backend URL)

---

## ⚠️ Important Notes

- Free tier may take 30 seconds to wake up (spins down after 15 min inactivity)
- First deployment takes 5-10 minutes
- Watch the build logs for any errors
- Both services must be on same region

---

## 🎉 After Deployment

1. ✅ Test registration
2. ✅ Create admin account (use create-admin.js locally or MongoDB Compass)
3. ✅ Share frontend URL with stakeholders
4. ✅ Test all features

Good luck! 🚀


