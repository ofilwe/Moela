# Free Hosting Guide for Moela Dating App

## Recommended Setup (Easiest & Free)

### Option 1: Render (Recommended - All-in-One)
**Best for:** Full-stack apps with database
- ✅ Free tier available
- ✅ Supports Node.js backend
- ✅ Supports React frontend
- ✅ Easy MongoDB Atlas integration
- ✅ Custom domain support
- ✅ Auto-deploy from GitHub

**Limitations:**
- Free tier spins down after 15 minutes of inactivity
- Takes ~30 seconds to wake up
- 750 hours/month free

### Option 2: Vercel (Frontend) + Render (Backend)
**Best for:** Maximum performance
- ✅ Vercel: Excellent for React apps (free forever)
- ✅ Render: Free backend hosting
- ✅ Fast CDN for frontend
- ✅ Better performance

---

## Step-by-Step: Render (Recommended)

### Prerequisites
1. GitHub account (free)
2. MongoDB Atlas account (free)
3. Render account (free)

### Step 1: Set Up MongoDB Atlas (Free Cloud Database)

1. **Sign up:** https://www.mongodb.com/cloud/atlas/register
2. **Create a free cluster:**
   - Choose "M0 Free" tier
   - Select a region close to you
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Create database user:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `moela-admin`
   - Password: Create a strong password (save it!)
   - Database User Privileges: "Atlas admin"
   - Click "Add User"

4. **Whitelist IP addresses:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for testing)
   - Or add specific IPs for production

5. **Get connection string:**
   - Go to "Clusters" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `moela-dating`
   - Example: `mongodb+srv://moela-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/moela-dating?retryWrites=true&w=majority`

### Step 2: Push Code to GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name: `moela-dating-app`
   - Make it Private (or Public)
   - Click "Create repository"

2. **Push your code:**
   ```powershell
   cd "C:\Users\Botswana Police\Documents\Moela App"
   
   # Initialize git if not already done
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit"
   
   # Add remote (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/moela-dating-app.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

### Step 3: Deploy Backend on Render

1. **Sign up:** https://render.com (use GitHub to sign in)

2. **Create Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `moela-dating-app`
   - Configure:
     - **Name:** `moela-backend`
     - **Root Directory:** `backend`
     - **Environment:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free

3. **Add Environment Variables:**
   - Click "Environment" tab
   - Add these variables:
     ```
     NODE_ENV=production
     PORT=10000
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your-secret-key-change-this-to-something-random
     ```
   - Replace `your_mongodb_atlas_connection_string` with your Atlas connection string
   - Generate a random JWT_SECRET (you can use: `openssl rand -base64 32`)

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy the URL (e.g., `https://moela-backend.onrender.com`)

### Step 4: Deploy Frontend on Render

1. **Create another Web Service:**
   - Click "New +" → "Web Service"
   - Select same repository
   - Configure:
     - **Name:** `moela-frontend`
     - **Root Directory:** `frontend`
     - **Environment:** `Node`
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `npm run preview`
     - **Plan:** Free

2. **Add Environment Variables:**
   ```
   NODE_ENV=production
   VITE_API_URL=https://moela-backend.onrender.com
   ```

3. **Update Frontend API URL:**
   - Edit `frontend/vite.config.js` to use production API URL
   - Or create `frontend/.env.production`:
     ```
     VITE_API_URL=https://moela-backend.onrender.com
     ```

4. **Update Frontend Axios Base URL:**
   - Edit `frontend/src/contexts/AuthContext.jsx`:
     ```javascript
     const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
     axios.defaults.baseURL = API_URL;
     ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment

### Step 5: Update CORS Settings

1. **Edit backend/server.js:**
   ```javascript
   app.use(cors({
     origin: [
       'http://localhost:3000',
       'https://moela-frontend.onrender.com',
       'https://your-custom-domain.com'
     ],
     credentials: true
   }));
   ```

### Step 6: Test Your Deployment

1. **Frontend URL:** `https://moela-frontend.onrender.com`
2. **Backend URL:** `https://moela-backend.onrender.com`
3. **Test registration and login**

---

## Alternative: Vercel (Frontend) + Render (Backend)

### Deploy Frontend on Vercel

1. **Sign up:** https://vercel.com (use GitHub)

2. **Import Project:**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset:** Vite
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`

3. **Environment Variables:**
   ```
   VITE_API_URL=https://moela-backend.onrender.com
   ```

4. **Deploy:**
   - Click "Deploy"
   - Get your URL: `https://moela-dating-app.vercel.app`

**Advantages:**
- ✅ Faster frontend (CDN)
- ✅ Better performance
- ✅ Free forever
- ✅ Custom domains

---

## Quick Setup Scripts

### Update Backend for Production

Create `backend/.env.production`:
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your-random-secret-key-here
```

### Update Frontend for Production

Create `frontend/.env.production`:
```env
VITE_API_URL=https://moela-backend.onrender.com
```

### Update package.json Scripts

**backend/package.json:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

**frontend/package.json:**
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview --port 3000 --host"
  }
}
```

---

## Free Hosting Comparison

| Platform | Frontend | Backend | Database | Free Tier |
|----------|----------|---------|----------|-----------|
| **Render** | ✅ | ✅ | ❌ | 750 hrs/month |
| **Vercel** | ✅ | ⚠️ (limited) | ❌ | Unlimited |
| **Netlify** | ✅ | ⚠️ (functions) | ❌ | 100GB bandwidth |
| **MongoDB Atlas** | ❌ | ❌ | ✅ | 512MB storage |
| **Railway** | ✅ | ✅ | ❌ | $5 credit/month |

---

## Important Notes

### Security
- ✅ Change default JWT_SECRET
- ✅ Use strong MongoDB password
- ✅ Restrict MongoDB IP access in production
- ✅ Use HTTPS (Render/Vercel provide automatically)

### Performance
- ⚠️ Free tier may have cold starts (30s delay)
- ⚠️ Consider upgrading for production
- ✅ Use MongoDB Atlas for better performance

### Custom Domain
- Both Render and Vercel support custom domains
- Add your domain in settings
- Update DNS records

---

## Testing with Stakeholders

1. **Share the frontend URL:**
   - `https://moela-frontend.onrender.com`
   - Or your Vercel URL

2. **Create test accounts:**
   - Use the create-admin.js script on your local machine
   - Or create accounts through the app

3. **Share admin credentials:**
   - Create admin account
   - Share login details securely

4. **Monitor usage:**
   - Check Render dashboard for usage
   - Monitor MongoDB Atlas for database usage

---

## Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check environment variables

### CORS errors
- Update CORS settings in backend
- Add frontend URL to allowed origins

### Build failures
- Check build logs in Render/Vercel
- Verify all dependencies in package.json
- Check Node version compatibility

---

## Next Steps After Deployment

1. ✅ Test all features
2. ✅ Create admin account
3. ✅ Test with stakeholders
4. ✅ Gather feedback
5. ✅ Monitor performance
6. ✅ Consider upgrading if needed

