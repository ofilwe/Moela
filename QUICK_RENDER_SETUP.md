# Quick Render Deployment Guide

## 🚀 Fast Track (30 minutes total)

### Step 1: MongoDB Atlas (5 min)
1. Sign up: https://www.mongodb.com/cloud/atlas/register
2. Create **M0 Free** cluster
3. Create database user (save password!)
4. Whitelist IP: Click "Allow Access from Anywhere"
5. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy string, replace `<password>` and `<dbname>` with `moela-dating`
   - **Save this!**

### Step 2: GitHub (5 min)
1. Create repo: https://github.com/new
   - Name: `moela-dating-app`
   - Don't initialize with README
2. Push code:
   ```powershell
   cd "C:\Users\Botswana Police\Documents\Moela App"
   git init
   git add .
   git commit -m "Ready for Render"
   git remote add origin https://github.com/YOUR_USERNAME/moela-dating-app.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Render Backend (10 min)
1. Sign up: https://render.com (use GitHub)
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - **Name:** `moela-backend`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = (your Atlas connection string)
   - `JWT_SECRET` = (generate random string)
6. Click "Create Web Service"
7. **Copy the URL** (e.g., `https://moela-backend.onrender.com`)

### Step 4: Render Frontend (10 min)
1. Click "New +" → "Web Service"
2. Same repo, configure:
   - **Name:** `moela-frontend`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run preview -- --port $PORT --host`
   - **Plan:** Free
3. Add Environment Variable:
   - `VITE_API_URL` = (your backend URL from step 3)
4. Click "Create Web Service"
5. **Copy the frontend URL**

### Step 5: Update Backend CORS
1. Go to backend service → Environment
2. Add: `FRONTEND_URL` = (your frontend URL)
3. Save (auto-redeploys)

### Step 6: Test!
1. Open frontend URL
2. Create account
3. Test features

---

## Generate JWT Secret

Run this to generate a secure JWT secret:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use: https://randomkeygen.com/

---

## Your URLs Will Be:

- **Backend:** `https://moela-backend.onrender.com`
- **Frontend:** `https://moela-frontend.onrender.com`

---

## Need Help?

See `RENDER_DEPLOYMENT_STEPS.md` for detailed instructions.

