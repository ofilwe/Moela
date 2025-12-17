# Restart Servers to Fix Registration Error

## The Issue
The User model had enum fields that didn't allow empty strings, causing validation errors when creating new accounts.

## The Fix
Updated the User model to allow empty strings in enum fields (gender, interestedIn, relationshipGoals, lifestyle fields).

## How to Restart

### Option 1: Restart via Terminal

1. **Stop the current backend server:**
   - Find the terminal window running the backend
   - Press `Ctrl+C` to stop it

2. **Restart the backend:**
   ```powershell
   cd "C:\Users\Botswana Police\Documents\Moela App\backend"
   npm run dev
   ```

3. **The frontend should still be running**, but if needed:
   ```powershell
   cd "C:\Users\Botswana Police\Documents\Moela App\frontend"
   npm run dev
   ```

### Option 2: Kill and Restart All Node Processes

If you can't find the terminal windows:

1. **Kill all Node processes:**
   ```powershell
   Get-Process -Name node | Stop-Process -Force
   ```

2. **Restart both servers:**
   ```powershell
   # Terminal 1 - Backend
   cd "C:\Users\Botswana Police\Documents\Moela App\backend"
   npm run dev

   # Terminal 2 - Frontend  
   cd "C:\Users\Botswana Police\Documents\Moela App\frontend"
   npm run dev
   ```

## Verify It's Working

After restarting, you should see in the backend console:
```
✓ MongoDB connected successfully
  Database: moela-dating
  Ready state: 1 (1=connected)
Server running on port 5000
```

Then try creating an account again at http://localhost:3000/register

## What Was Fixed

- Added empty string `''` to all enum fields in the User model
- This allows users to be created with empty profile fields initially
- Users can then fill in their profile later

