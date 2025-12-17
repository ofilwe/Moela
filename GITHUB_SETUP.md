# GitHub Setup for Render Deployment

## Step 1: Create GitHub Repository

1. **Go to:** https://github.com/new
2. **Repository name:** `moela-dating-app` (or your preferred name)
3. **Description:** "Moela Dating App - Full Stack Application"
4. **Visibility:** 
   - Choose **Private** (only you can see it)
   - Or **Public** (anyone can see it)
5. **Important:** 
   - ❌ **DO NOT** check "Initialize with README"
   - ❌ **DO NOT** add .gitignore or license (we already have these)
6. Click **"Create repository"**

## Step 2: Push Your Code

After creating the repository, GitHub will show you commands. But use these instead:

### Open PowerShell in your project folder and run:

```powershell
cd "C:\Users\Botswana Police\Documents\Moela App"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Ready for Render deployment"

# Add your GitHub repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/moela-dating-app.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### If you get authentication errors:

**Option 1: Use GitHub CLI (if installed)**
```powershell
gh auth login
```

**Option 2: Use Personal Access Token**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: "Render Deployment"
4. Select scopes: `repo` (full control)
5. Click "Generate token"
6. **Copy the token** (you'll only see it once!)
7. When pushing, use token as password:
   ```powershell
   git push -u origin main
   # Username: your_github_username
   # Password: your_personal_access_token
   ```

**Option 3: Use GitHub Desktop**
- Download: https://desktop.github.com
- Sign in and add repository
- Push from GUI

## Step 3: Verify

1. Go to your GitHub repository page
2. You should see all your files:
   - `backend/` folder
   - `frontend/` folder
   - `package.json` files
   - Other project files

## What's Next?

After code is on GitHub:
1. ✅ Sign up for Render
2. ✅ Deploy backend (will use your MongoDB connection string)
3. ✅ Deploy frontend
4. ✅ Test your app!

---

## Troubleshooting

**"Repository not found" error:**
- Check repository name matches
- Verify repository exists on GitHub
- Check you're using correct GitHub username

**"Permission denied" error:**
- You need to authenticate
- Use Personal Access Token (see above)
- Or use GitHub Desktop

**"Large files" warning:**
- Make sure `node_modules/` is in .gitignore (it should be)
- Don't commit `.env` files (they're in .gitignore)

