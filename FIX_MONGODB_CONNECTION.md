# Fix MongoDB Connection Error

## The Error
```
MongoDB connection error: Error: querySrv ENOTFOUND _mongodb._tcp.WSXzaq1
```

This means the MongoDB connection string is **incorrect or incomplete**.

---

## Step 1: Get Correct Connection String from MongoDB Atlas

1. **Go to MongoDB Atlas:** https://cloud.mongodb.com
2. **Click "Clusters"** (left sidebar)
3. **Click "Connect"** on your cluster
4. **Choose "Connect your application"**
5. **Driver:** `Node.js`
6. **Version:** `5.5 or later`
7. **Copy the connection string**

**It should look like:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## Step 2: Format the Connection String Correctly

### Replace These Parts:

1. **Replace `<username>`** with your database username
   - Example: `moela-admin`

2. **Replace `<password>`** with your database password
   - The password you created for the database user
   - **Important:** If password has special characters, URL encode them:
     - `@` becomes `%40`
     - `#` becomes `%23`
     - `$` becomes `%24`
     - etc.

3. **Replace `cluster0.xxxxx`** with your actual cluster name
   - Should be something like `cluster0.abc123` or similar
   - **NOT** `WSXzaq1` (this looks wrong)

4. **Add database name** before the `?`
   - After `.mongodb.net/` add `moela-dating`
   - Final: `.mongodb.net/moela-dating?`

### Correct Format:
```
mongodb+srv://moela-admin:YourPassword@cluster0.xxxxx.mongodb.net/moela-dating?retryWrites=true&w=majority
```

---

## Step 3: Update in Render

1. **Go to backend service** in Render
2. **Click "Environment"** tab
3. **Find `MONGODB_URI`**
4. **Click to edit** (or delete and recreate)
5. **Paste the corrected connection string**
6. **Click "Save Changes"**
7. **Backend will auto-redeploy** (2-3 minutes)

---

## Common Mistakes

### ❌ Wrong:
```
mongodb+srv://WSXzaq1  (incomplete)
mongodb://localhost:27017  (wrong - this is local, not Atlas)
mongodb+srv://user:pass@WSXzaq1  (wrong cluster name)
```

### ✅ Correct:
```
mongodb+srv://moela-admin:password@cluster0.abc123.mongodb.net/moela-dating?retryWrites=true&w=majority
```

---

## Step 4: Verify Connection String Parts

Your connection string should have:
- ✅ `mongodb+srv://` at the start
- ✅ Username and password (replaced, not `<username>`)
- ✅ Correct cluster name (from Atlas, not `WSXzaq1`)
- ✅ `.mongodb.net/` in the middle
- ✅ `/moela-dating` before the `?`
- ✅ `?retryWrites=true&w=majority` at the end

---

## Quick Fix Steps

1. **Go to MongoDB Atlas** → Clusters → Connect
2. **Get fresh connection string**
3. **Replace `<username>` and `<password>`**
4. **Add `/moela-dating` before the `?`**
5. **Update `MONGODB_URI` in Render**
6. **Wait for redeploy**

---

## Test After Fix

After backend redeploys:
1. **Check backend logs** - should show "✓ MongoDB connected successfully"
2. **Try login again** - should work now!

---

## If Still Not Working

Share:
1. **Your cluster name** from MongoDB Atlas (the part after `@` and before `.mongodb.net`)
2. **First few characters of connection string** (I can verify format)
3. **Any special characters in your password** (might need URL encoding)


