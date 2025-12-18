# Fix Render Free Tier Error

## Common Issues & Solutions

### Issue 1: Plan Selection

When creating a Web Service, make sure:
- **Plan:** Select **"Free"** (not Starter, Standard, or Professional)
- Scroll down if you don't see the Free option
- Free tier shows: "Free - $0/month"

### Issue 2: Service Type

Make sure you're creating:
- ✅ **"Web Service"** (for both backend and frontend)
- ❌ NOT "Static Site" (for frontend)
- ❌ NOT "Background Worker"
- ❌ NOT "Cron Job"

### Issue 3: Build Configuration

**Backend Configuration:**
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- **Plan: Free** (important!)

**Frontend Configuration:**
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Start Command: `npm run preview -- --port $PORT --host`
- **Plan: Free** (important!)

---

## Step-by-Step: Create Free Backend Service

1. **Click "New +"** button
2. **Select "Web Service"** (not Static Site)
3. **Connect repository:** Select `ofilwe/Moela`
4. **Fill in:**
   - Name: `moela-backend`
   - Region: (choose closest, doesn't matter for free)
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Scroll down to "Plan"**
   - **Select "Free"** (should show $0/month)
   - If you don't see Free option, you might need to scroll or it might be at the bottom
6. **Add Environment Variables:**
   - Click "Advanced" if needed
   - Add the environment variables
7. **Click "Create Web Service"**

---

## If You Still See Upgrade Prompt

### Option 1: Check What Service You're Creating
- Are you creating a "Web Service" or something else?
- Make sure it's "Web Service" for both frontend and backend

### Option 2: Check Plan Selection
- Look for "Plan" section
- Select "Free" explicitly
- Free tier should say "$0/month"

### Option 3: What's the Exact Error Message?
- Share the exact error message you see
- This will help identify the issue

### Option 4: Try Creating from Dashboard
1. Go to Render dashboard
2. Click "New +" → "Web Service"
3. Make sure "Free" plan is selected before proceeding

---

## Alternative: Use Render Blueprint

Instead of manual setup, you can use the `render.yaml` file:

1. Go to: https://dashboard.render.com/blueprints
2. Click "New Blueprint Instance"
3. Connect your GitHub repository: `ofilwe/Moela`
4. Render will detect `render.yaml` and create services
5. Then add environment variables in each service

---

## What to Check

1. ✅ Are you creating a "Web Service" (not Static Site)?
2. ✅ Is "Free" plan selected?
3. ✅ Are all required fields filled correctly?
4. ✅ Is there a specific error message? (share it if yes)

Share the exact error message you're seeing, and I'll help you fix it!


