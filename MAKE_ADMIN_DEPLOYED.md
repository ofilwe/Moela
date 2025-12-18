# Make Admin Account on Deployed App

## Option 1: Use make-admin.js Script (Easiest)

Since you already have an account, convert it to admin:

### Step 1: Get Your MongoDB Connection String

1. **Go to MongoDB Atlas** → Your cluster → Connect
2. **Copy the connection string** (should be like):
   ```
   mongodb+srv://username:password@dolf.uljhcq0.mongodb.net/moela-dating?retryWrites=true&w=majority
   ```

### Step 2: Create .env File (if not exists)

In your `backend` folder, create/update `.env`:

```env
MONGODB_URI=mongodb+srv://username:ENCODED_PASSWORD@dolf.uljhcq0.mongodb.net/moela-dating?retryWrites=true&w=majority
JWT_SECRET=your-secret-key
PORT=5000
```

**Important:** URL-encode your password if it has special characters!

### Step 3: Run make-admin.js

```bash
cd backend
node make-admin.js your-email@example.com
```

Replace `your-email@example.com` with the email you used to register.

### Step 4: Verify

1. **Login** at https://moela-dating.onrender.com/login
2. **Go to:** https://moela-dating.onrender.com/admin
3. **Should see admin dashboard!**

---

## Option 2: Use MongoDB Compass (Visual)

### Step 1: Connect to MongoDB Atlas

1. **Open MongoDB Compass**
2. **Paste your connection string:**
   ```
   mongodb+srv://username:password@dolf.uljhcq0.mongodb.net/moela-dating
   ```
3. **Click "Connect"**

### Step 2: Update User Role

1. **Click on `moela-dating` database**
2. **Click on `users` collection**
3. **Find your user** (search by email)
4. **Click "Edit Document"**
5. **Find `role` field**
6. **Change from `"user"` to `"admin"`**
7. **Click "Update"**

### Step 3: Verify

1. **Login** at https://moela-dating.onrender.com/login
2. **Go to:** https://moela-dating.onrender.com/admin
3. **Should see admin dashboard!**

---

## Option 3: Create New Admin Account

If you want a separate admin account:

```bash
cd backend
node create-admin.js admin@moela.com yourpassword123
```

Then login with that email/password.

---

## Quick Test

After making yourself admin:
1. **Login** at https://moela-dating.onrender.com/login
2. **Check if you see "Admin" link in navbar**
3. **Visit:** https://moela-dating.onrender.com/admin
4. **Should see admin dashboard with tabs:**
   - Users
   - Matches
   - Monitoring

---

## Troubleshooting

**If admin dashboard doesn't show:**
- Make sure you **logged out and logged back in** (to refresh your token)
- Check MongoDB - user role should be `"admin"` (not `"user"`)
- Check browser console for errors

**If script doesn't work:**
- Make sure `.env` has correct `MONGODB_URI`
- Make sure password is URL-encoded if it has special chars
- Check MongoDB Atlas network access allows your IP


