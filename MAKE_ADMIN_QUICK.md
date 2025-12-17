# Quick Way to Make Yourself Admin

## Method 1: Using the Script (Easiest)

1. **Make sure you have an account** (register at http://localhost:3000/register)

2. **Run this command in terminal:**
   ```powershell
   cd "C:\Users\Botswana Police\Documents\Moela App\backend"
   node make-admin.js your-email@example.com
   ```
   Replace `your-email@example.com` with your actual email.

3. **Logout and login again** at http://localhost:3000/login

4. **Access admin dashboard** at http://localhost:3000/admin

## Method 2: Using MongoDB Compass

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Go to: `moela-dating` → `users`
4. Find your user by email
5. Change `role: "user"` to `role: "admin"`
6. Click Update
7. Logout and login again

## Method 3: Direct URL (After Making Admin)

Once you're admin, you can access:
- **Admin Dashboard:** http://localhost:3000/admin
- **Admin Link:** Will appear in navbar after login

## Verify You're Admin

After logging in, you should see:
- "Admin" link in the top navigation bar
- Can access http://localhost:3000/admin without redirect

