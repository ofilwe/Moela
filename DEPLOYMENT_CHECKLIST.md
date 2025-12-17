# Deployment Checklist

## Pre-Deployment Steps

### 1. Update Environment Variables

**Backend (.env or Render Environment Variables):**
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moela-dating?retryWrites=true&w=majority
JWT_SECRET=generate-a-random-secret-key-here
FRONTEND_URL=https://your-frontend-url.onrender.com
```

**Frontend (.env.production or Vercel Environment Variables):**
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

### 2. Generate Secure JWT Secret

```powershell
# Windows PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})

# Or use online generator: https://randomkeygen.com/
```

### 3. Update CORS Settings

✅ Already updated in `backend/server.js` to support production URLs

### 4. Test Locally with Production Settings

```powershell
# Backend
cd backend
$env:NODE_ENV="production"
$env:MONGODB_URI="your_atlas_connection_string"
npm start

# Frontend (new terminal)
cd frontend
$env:VITE_API_URL="http://localhost:5000"
npm run build
npm run preview
```

### 5. Create Admin Account

After deployment, create admin account:
```powershell
cd backend
node create-admin.js admin@moela.com securepassword123
```

## Deployment Steps

### Step 1: MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account
- [ ] Create M0 Free cluster
- [ ] Create database user
- [ ] Whitelist IP addresses (0.0.0.0/0 for testing)
- [ ] Copy connection string

### Step 2: GitHub Setup
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Verify .gitignore excludes .env files

### Step 3: Render Backend Deployment
- [ ] Sign up for Render account
- [ ] Connect GitHub repository
- [ ] Create Web Service for backend
- [ ] Set Root Directory: `backend`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `npm start`
- [ ] Add environment variables
- [ ] Deploy and copy URL

### Step 4: Render/Vercel Frontend Deployment
- [ ] Create Web Service (Render) or Project (Vercel)
- [ ] Set Root Directory: `frontend`
- [ ] Set Build Command: `npm install && npm run build`
- [ ] Set Start Command: `npm run preview` (Render) or auto (Vercel)
- [ ] Add environment variables
- [ ] Update backend CORS with frontend URL
- [ ] Deploy

### Step 5: Post-Deployment
- [ ] Test registration
- [ ] Test login
- [ ] Create admin account
- [ ] Test admin dashboard
- [ ] Test matches generation
- [ ] Test conversations
- [ ] Share URL with stakeholders

## Testing Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Profile creation works
- [ ] Matches generation works
- [ ] Admin dashboard accessible
- [ ] Admin can approve matches
- [ ] Conversations work
- [ ] Monitoring system works
- [ ] Mobile responsive

## Security Checklist

- [ ] JWT_SECRET is strong and random
- [ ] MongoDB password is strong
- [ ] Environment variables are set (not in code)
- [ ] CORS is properly configured
- [ ] HTTPS is enabled (automatic on Render/Vercel)

## Performance Checklist

- [ ] Database indexes are created
- [ ] Images are optimized (if added)
- [ ] Frontend is minified
- [ ] API responses are optimized

## Monitoring

- [ ] Check Render logs for errors
- [ ] Monitor MongoDB Atlas usage
- [ ] Set up error alerts (if available)
- [ ] Monitor response times

