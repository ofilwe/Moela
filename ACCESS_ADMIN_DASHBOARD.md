# How to Access Admin Dashboard

## Step 1: Create a User Account

1. Go to http://localhost:3000/register
2. Create an account with your email and password
3. Note your email address (you'll need it for the next step)

## Step 2: Make Your Account an Admin

You need to change your user role from "user" to "admin" in MongoDB.

### Option A: Using MongoDB Compass (Easiest)

1. **Open MongoDB Compass**
2. **Connect to your database:**
   - Connection string: `mongodb://localhost:27017`
   - Click "Connect"

3. **Navigate to your database:**
   - Click on `moela-dating` database
   - Click on `users` collection

4. **Find your user:**
   - Look for the document with your email address
   - Click on it to edit

5. **Change the role:**
   - Find the `role` field
   - Change it from `"user"` to `"admin"`
   - Click "Update"

### Option B: Using MongoDB Shell

1. **Open a terminal/command prompt**
2. **Connect to MongoDB:**
   ```powershell
   mongosh mongodb://localhost:27017/moela-dating
   ```

3. **Update your user:**
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```
   Replace `your-email@example.com` with your actual email.

4. **Verify the change:**
   ```javascript
   db.users.findOne({ email: "your-email@example.com" })
   ```
   Check that `role` is now `"admin"`

## Step 3: Access Admin Dashboard

1. **Logout** from your current session (if logged in)
2. **Login again** at http://localhost:3000/login
   - This refreshes your session with the new admin role

3. **Access Admin Dashboard:**
   - Click "Admin" in the navbar, OR
   - Go directly to: http://localhost:3000/admin

## What You'll See in Admin Dashboard

The admin dashboard has three tabs:

1. **Matches Tab:**
   - View pending matches
   - Approve/reject matches
   - Enable/disable messaging
   - Generate matches for all users

2. **Users Tab:**
   - View all users
   - Activate/deactivate users
   - See profile completion status

3. **Monitoring Tab:**
   - View flagged conversations
   - Review red flag alerts
   - Manage conversation monitoring
   - Take actions on flagged content

## Troubleshooting

### "Access Denied" or Redirected to Matches
- Make sure you logged out and logged back in after changing the role
- Verify the role is actually "admin" in MongoDB (not "Admin" or "ADMIN")
- Check browser console for any errors

### Can't Find Your User in MongoDB
- Make sure you're looking in the `moela-dating` database
- Check the `users` collection
- Verify you created the account successfully

### Admin Link Not Showing in Navbar
- Logout and login again
- Clear browser cache/localStorage
- Check that role is exactly "admin" (lowercase)

## Quick Test

After making yourself admin, you should see:
- "Admin" link in the navbar
- Access to http://localhost:3000/admin
- Three tabs: Matches, Users, Monitoring

