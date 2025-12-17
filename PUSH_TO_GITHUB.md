# Push Code to GitHub - Quick Guide

## Step 1: Create GitHub Repository

1. **Go to:** https://github.com/new
2. **Repository name:** `moela-dating-app` (or any name you prefer)
3. **Description:** (optional) "Moela Dating App"
4. **Visibility:** Choose **Private** or **Public**
5. **IMPORTANT:** 
   - ❌ **DO NOT** check "Add a README file"
   - ❌ **DO NOT** check "Add .gitignore" 
   - ❌ **DO NOT** check "Choose a license"
   - We already have these files!
6. Click **"Create repository"**

## Step 2: Push Your Code

After creating the repository, run these commands in PowerShell:

```powershell
cd "C:\Users\Botswana Police\Documents\Moela App"

# Initialize git
git init

# Add all files
git add .

# Create commit
git commit -m "Initial commit - Ready for Render deployment"

# Add remote (REPLACE YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/moela-dating-app.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Replace YOUR_USERNAME
- If your GitHub username is `johndoe`, the command would be:
  ```
  git remote add origin https://github.com/johndoe/moela-dating-app.git
  ```

## Step 3: Authentication

When you run `git push`, you'll be asked for credentials:

**If you have 2FA enabled:**
- Username: Your GitHub username
- Password: **Personal Access Token** (not your GitHub password)

**To create Personal Access Token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: "Render Deployment"
4. Select scope: **`repo`** (check the box)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)
7. Use this token as your password when pushing

**If you don't have 2FA:**
- Username: Your GitHub username
- Password: Your GitHub password

## Step 4: Verify

1. Go to your repository on GitHub
2. You should see all your files:
   - `backend/` folder
   - `frontend/` folder
   - All project files

---

## Quick Commands (Copy & Paste)

**After creating repository on GitHub, replace YOUR_USERNAME and run:**

```powershell
cd "C:\Users\Botswana Police\Documents\Moela App"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/moela-dating-app.git
git branch -M main
git push -u origin main
```

---

## Troubleshooting

**"remote origin already exists"**
- Run: `git remote remove origin`
- Then add it again

**"Authentication failed"**
- Use Personal Access Token instead of password
- Make sure token has `repo` scope

**"Repository not found"**
- Check repository name matches
- Check your GitHub username is correct
- Make sure repository exists on GitHub

