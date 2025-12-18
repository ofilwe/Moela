# Connect MongoDB Compass to MongoDB Atlas

## Step 1: Get Connection String from MongoDB Atlas

1. **Go to MongoDB Atlas:** https://cloud.mongodb.com
2. **Login** to your account
3. **Click "Clusters"** (left sidebar)
4. **Click "Connect"** button on your cluster
5. **Choose "Connect using MongoDB Compass"**
6. **Copy the connection string** (it will look like):
   ```
   mongodb+srv://username:password@dolf.uljhcq0.mongodb.net/
   ```

**OR** if you don't see that option:

1. **Click "Connect"** on your cluster
2. **Choose "Connect your application"**
3. **Driver:** `Node.js`
4. **Version:** `5.5 or later`
5. **Copy the connection string**
6. **Replace `<password>`** with your actual password
7. **Add `/moela-dating`** before the `?` (if not already there)

---

## Step 2: Format the Connection String

Your connection string should look like:
```
mongodb+srv://moela-admin:YOUR_PASSWORD@dolf.uljhcq0.mongodb.net/moela-dating
```

**Important:**
- Replace `moela-admin` with your actual username
- Replace `YOUR_PASSWORD` with your actual password
- **If password has special characters**, you need to URL-encode them:
  - `@` = `%40`
  - `#` = `%23`
  - `$` = `%24`
  - `&` = `%26`
  - etc.

---

## Step 3: Open MongoDB Compass

1. **Open MongoDB Compass** (if not installed, download from mongodb.com/compass)
2. **You'll see a connection screen**

---

## Step 4: Paste Connection String

1. **In MongoDB Compass**, you'll see a field for connection string
2. **Paste your connection string** (the one you formatted in Step 2)
3. **Click "Connect"**

---

## Step 5: Navigate to Your Database

1. **After connecting**, you'll see your databases
2. **Click on `moela-dating`** database
3. **Click on `users`** collection
4. **Find your user** (you can search by email in the filter box)

---

## Step 6: Make User Admin

1. **Click on your user document** to open it
2. **Click "Edit Document"** button (pencil icon)
3. **Find the `role` field**
4. **Change it from:**
   ```json
   "role": "user"
   ```
   **To:**
   ```json
   "role": "admin"
   ```
5. **Click "Update"** button
6. **Done!**

---

## Troubleshooting

### Error: "Authentication failed"
- **Check your username and password** are correct
- **URL-encode special characters** in password
- **Make sure database user exists** in MongoDB Atlas

### Error: "Cannot connect"
- **Check your IP is whitelisted** in MongoDB Atlas:
  - Go to Atlas → Network Access
  - Add your IP or use `0.0.0.0/0` (allows all IPs - less secure but works)

### Can't find connection string option
- **Use "Connect your application"** option instead
- **Copy the connection string** and format it manually

---

## Quick Reference

**Connection String Format:**
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME
```

**Your specific format:**
```
mongodb+srv://moela-admin:YOUR_PASSWORD@dolf.uljhcq0.mongodb.net/moela-dating
```

---

## After Making Admin

1. **Logout** from your app
2. **Login again** (to refresh your token)
3. **Visit:** https://moela-dating.onrender.com/admin
4. **Should see admin dashboard!**


