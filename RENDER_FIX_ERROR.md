# Fix Render Configuration Error

## Issues to Fix

Looking at your form, here are the problems:

### 1. Root Directory (MISSING - This is the main issue!)
- **Current:** Empty/blank
- **Should be:** `backend`
- **Why:** Render needs to know which folder contains your backend code

### 2. Build Command (Wrong)
- **Current:** `yarn`
- **Should be:** `npm install`
- **Why:** Your project uses npm, not yarn

### 3. Start Command (Wrong)
- **Current:** `yarn start`
- **Should be:** `npm start`
- **Why:** Your project uses npm, not yarn

---

## How to Fix

### Fix Root Directory:
1. Find the **"Root Directory"** field
2. Type: `backend`
3. This tells Render to look in the `backend` folder

### Fix Build Command:
1. Find the **"Build Command"** field
2. Delete `yarn`
3. Type: `npm install`

### Fix Start Command:
1. Find the **"Start Command"** field
2. Delete `yarn start`
3. Type: `npm start`

---

## Correct Configuration Summary

- **Name:** `moela-backend` (or `Moela` is fine)
- **Language:** `Node` ✅
- **Branch:** `main` ✅
- **Region:** `Virginia (US East)` ✅ (or any region)
- **Root Directory:** `backend` ⚠️ **FIX THIS**
- **Build Command:** `npm install` ⚠️ **FIX THIS**
- **Start Command:** `npm start` ⚠️ **FIX THIS**
- **Instance Type:** `Free` ✅
- **Environment Variables:** All 3 added ✅

---

## After Fixing

Once you fix these 3 fields:
1. The error should disappear
2. Click **"Deploy web service"**
3. Wait 5-10 minutes for deployment

---

## Quick Checklist

- [ ] Root Directory: `backend`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Instance Type: `Free` selected
- [ ] All 3 environment variables added

Fix these and the error should go away!


