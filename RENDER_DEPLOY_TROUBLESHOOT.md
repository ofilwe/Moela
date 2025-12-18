# Render Deploy Troubleshooting

## Check Deploy Logs

1. **Go to your service in Render dashboard**
2. **Click on "Logs" tab**
3. **Look for error messages** (usually in red)
4. **Scroll to see the full error**

Common errors and fixes:

---

## Common Build Errors

### Error 1: "Cannot find module"
**Problem:** Missing dependencies
**Fix:** Make sure `package.json` has all dependencies listed

### Error 2: "Command failed"
**Problem:** Build command issue
**Fix:** Verify Build Command is exactly: `npm install`

### Error 3: "Root directory not found"
**Problem:** Wrong root directory
**Fix:** Make sure Root Directory is exactly: `backend`

### Error 4: "Port already in use" or "EADDRINUSE"
**Problem:** Port configuration
**Fix:** Render sets PORT automatically, but make sure server.js uses `process.env.PORT`

### Error 5: MongoDB connection error
**Problem:** Wrong connection string or IP not whitelisted
**Fix:** 
- Check MONGODB_URI is correct
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`

---

## What You Mentioned: "Mispelled"

What did you misspell? Common issues:

1. **Root Directory:** Should be exactly `backend` (lowercase, no spaces)
2. **Build Command:** Should be exactly `npm install` (not `npm install ` with space)
3. **Start Command:** Should be exactly `npm start` (not `npm start ` with space)
4. **Environment Variable Keys:** Must be exact:
   - `NODE_ENV` (not `node_env` or `NODE_ENV `)
   - `MONGODB_URI` (not `MONGODB_URL` or `mongodb_uri`)
   - `JWT_SECRET` (not `jwt_secret`)

---

## Quick Fix Checklist

Before redeploying, verify:

- [ ] Root Directory: `backend` (exact, no spaces)
- [ ] Build Command: `npm install` (exact, no $)
- [ ] Start Command: `npm start` (exact, no $)
- [ ] Environment Variables:
  - [ ] `NODE_ENV` = `production`
  - [ ] `MONGODB_URI` = (your connection string - check for typos)
  - [ ] `JWT_SECRET` = (the secret we generated)
- [ ] Instance Type: `Free` selected

---

## How to Redeploy

1. **Fix any configuration issues** (check the checklist above)
2. **Click "Manual Deploy"** → **"Deploy latest commit"**
3. **Or make a small change** and push to trigger auto-deploy

---

## Share the Error

If you can, share:
1. **The exact error message** from the logs
2. **What you misspelled** (so we can fix it)
3. **Screenshot of your configuration** (if possible)

This will help me give you the exact fix!


