# Push Code to GitHub - Commands for ofilwe

## If Repository Already Created

Run these commands in PowerShell:

```powershell
cd "C:\Users\Botswana Police\Documents\Moela App"

# Initialize git
git init

# Add all files
git add .

# Create commit
git commit -m "Initial commit - Ready for Render deployment"

# Add remote repository
git remote add origin https://github.com/ofilwe/moela-dating-app.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

## Authentication

When you run `git push`, you'll be prompted for credentials:

**Username:** `ofilwe`

**Password:** 
- If you have 2FA: Use **Personal Access Token**
- If no 2FA: Use your GitHub password

### Create Personal Access Token (if needed)

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: "Render Deployment"
4. Select scope: **`repo`**
5. Click "Generate token"
6. **Copy the token** (use this as password)

## After Pushing

Once code is on GitHub:
1. ✅ Verify files are on GitHub
2. ✅ Sign up for Render
3. ✅ Deploy backend with MongoDB connection string
4. ✅ Deploy frontend
5. ✅ Test your app!

