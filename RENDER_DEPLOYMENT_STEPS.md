# Step-by-Step: Deploy to Render

## Prerequisites Checklist

Before starting, make sure you have:
- [ ] GitHub account (free)
- [ ] MongoDB Atlas account (free) - https://www.mongodb.com/cloud/atlas/register
- [ ] Render account (free) - https://render.com

---

## Step 1: Set Up MongoDB Atlas (5 minutes)

### 1.1 Create Account & Cluster
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (free)
3. Create **M0 Free** cluster:
   - Click "Build a Database"
   - Choose **M0 Free** tier
   - Select region closest to you
   - Click "Create" (takes 3-5 minutes)

### 1.2 Create Database User
1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `moela-admin` (or your choice)
5. Password: Create a strong password (SAVE IT!)
6. Database User Privileges: **"Atlas admin"**
7. Click **"Add User"**

### 1.3 Whitelist IP Addresses
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for testing)
   - This adds `0.0.0.0/0`
   - For production, restrict to specific IPs later
4. Click **"Confirm"**

### 1.4 Get Connection String
1. Go to **"Clusters"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**, Version: **5.5 or later**
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `moela-dating`
8. **Save this connection string!** You'll need it for Render

**Example:**
```
mongodb+srv://moela-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/moela-dating?retryWrites=true&w=majority
```

---

## Step 2: Push Code to GitHub (10 minutes)

### 2.1 Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `moela-dating-app` (or your choice)
3. Description: "Moela Dating App"
4. Choose **Private** (or Public)
5. **Don't** initialize with README (we have files already)
6. Click **"Create repository"**

### 2.2 Push Your Code
Open PowerShell in your project folder and run:

```powershell
cd "C:\Users\Botswana Police\Documents\Moela App"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Ready for Render deployment"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/moela-dating-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** You may need to authenticate with GitHub (use Personal Access Token if 2FA is enabled)

---

## Step 3: Deploy Backend on Render (10 minutes)

### 3.1 Sign Up for Render
1. Go to: https://render.com
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (easiest)
4. Authorize Render to access your repositories

### 3.2 Create Backend Web Service
1. In Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. Connect your GitHub repository:
   - Click **"Connect account"** if not connected
   - Find and select `moela-dating-app`
   - Click **"Connect"**

### 3.3 Configure Backend Service
Fill in the form:

- **Name:** `moela-backend`
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `backend`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** **Free**

### 3.4 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these one by one:

1. **NODE_ENV**
   - Key: `NODE_ENV`
   - Value: `production`

2. **PORT**
   - Key: `PORT`
   - Value: `10000`
   - (Render sets this automatically, but good to have)

3. **MONGODB_URI**
   - Key: `MONGODB_URI`
   - Value: `your_mongodb_atlas_connection_string`
   - Paste the connection string from Step 1.4

4. **JWT_SECRET**
   - Key: `JWT_SECRET`
   - Value: Generate a random string
   - You can use: https://randomkeygen.com/
   - Or run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

5. **FRONTEND_URL** (add this after frontend is deployed)
   - Key: `FRONTEND_URL`
   - Value: `https://moela-frontend.onrender.com` (or your frontend URL)

### 3.5 Deploy Backend
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Watch the build logs
4. When done, copy the URL (e.g., `https://moela-backend.onrender.com`)
5. **Save this URL!** You'll need it for frontend

---

## Step 4: Deploy Frontend on Render (10 minutes)

### 4.1 Create Frontend Web Service
1. In Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. Select same repository: `moela-dating-app`

### 4.2 Configure Frontend Service
Fill in the form:

- **Name:** `moela-frontend`
- **Region:** Same as backend
- **Branch:** `main`
- **Root Directory:** `frontend`
- **Environment:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run preview -- --port $PORT --host`
- **Plan:** **Free**

### 4.3 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add:

1. **VITE_API_URL**
   - Key: `VITE_API_URL`
   - Value: `https://moela-backend.onrender.com`
   - Use your actual backend URL from Step 3.5

### 4.4 Update Backend CORS
1. Go back to your backend service in Render
2. Go to **"Environment"** tab
3. Update **FRONTEND_URL** with your frontend URL
4. Click **"Save Changes"**
5. This will trigger a redeploy

### 4.5 Deploy Frontend
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. When done, copy the frontend URL

---

## Step 5: Test Your Deployment

### 5.1 Test Frontend
1. Open your frontend URL: `https://moela-frontend.onrender.com`
2. You should see the login page

### 5.2 Create Test Account
1. Click **"Sign Up"**
2. Create an account
3. Complete your profile

### 5.3 Create Admin Account
1. Go to your backend service in Render
2. Click **"Shell"** tab (or use local terminal)
3. Run:
   ```bash
   cd backend
   node create-admin.js admin@moela.com yourpassword123
   ```
4. Or use MongoDB Compass to change a user's role to "admin"

### 5.4 Test Admin Dashboard
1. Logout and login with admin account
2. Go to: `https://moela-frontend.onrender.com/admin`
3. Test all features

---

## Step 6: Share with Stakeholders

### 6.1 Share Frontend URL
- Share: `https://moela-frontend.onrender.com`
- Or your custom domain if configured

### 6.2 Create Test Accounts
- Create accounts for stakeholders
- Or share admin credentials securely

### 6.3 Monitor
- Check Render dashboard for usage
- Monitor MongoDB Atlas for database usage
- Check logs if issues occur

---

## Troubleshooting

### Backend won't start
- Check build logs in Render
- Verify all environment variables are set
- Check MongoDB connection string

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set correctly
- Check backend CORS settings
- Check backend URL is accessible

### MongoDB connection errors
- Verify IP whitelist includes `0.0.0.0/0`
- Check connection string has correct password
- Verify database user has correct permissions

### Slow first load
- Free tier spins down after 15 min inactivity
- First request takes ~30 seconds to wake up
- This is normal for free tier

---

## Next Steps

- [ ] Test all features
- [ ] Create admin account
- [ ] Share with stakeholders
- [ ] Gather feedback
- [ ] Consider custom domain
- [ ] Monitor performance
- [ ] Upgrade plan if needed (for production)

---

## Quick Reference

**Backend URL:** `https://moela-backend.onrender.com`  
**Frontend URL:** `https://moela-frontend.onrender.com`  
**MongoDB Atlas:** https://cloud.mongodb.com  
**Render Dashboard:** https://dashboard.render.com

