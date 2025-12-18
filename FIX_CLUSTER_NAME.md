# Fix MongoDB Cluster Name Error

## The Problem

Your connection string has:
```
cluster.mongodb.net
```

But it should have your **actual cluster name**, like:
```
cluster0.xxxxx.mongodb.net
```

The error `_mongodb._tcp.cluster.mongodb.net` means it's trying to connect to a generic "cluster" instead of your specific cluster.

---

## Step 1: Get Correct Connection String from MongoDB Atlas

1. **Go to MongoDB Atlas:** https://cloud.mongodb.com
2. **Click "Clusters"** (left sidebar)
3. **Click "Connect"** button on your cluster
4. **Choose "Connect your application"**
5. **Driver:** `Node.js`
6. **Version:** `5.5 or later`
7. **Copy the connection string**

**It should look like:**
```
mongodb+srv://<username>:<password>@cluster0.XXXXX.mongodb.net/?retryWrites=true&w=majority
```

**Notice:** It should say `cluster0.XXXXX` (with actual letters/numbers), NOT just `cluster`

---

## Step 2: Check Your Cluster Name

In MongoDB Atlas:
1. **Look at your cluster** in the Clusters list
2. **The cluster name** is shown there
3. **It should be something like:** `Cluster0`, `Cluster1`, or similar
4. **The connection string** should match this

---

## Step 3: Format Connection String Correctly

### Replace These Parts:

1. **`<username>`** → Your database username (e.g., `moela-admin`)
2. **`<password>`** → Your database password (URL encoded if has special chars)
3. **`cluster0.XXXXX`** → Your actual cluster name from Atlas
   - Should be like: `cluster0.abc123` or `cluster0.xyz789`
   - **NOT** just `cluster`
4. **Add `/moela-dating`** before the `?`

### Correct Format:
```
mongodb+srv://moela-admin:ENCODED_PASSWORD@cluster0.XXXXX.mongodb.net/moela-dating?retryWrites=true&w=majority
```

---

## Step 4: Update in Render

1. **Go to backend service** → Environment
2. **Find `MONGODB_URI`**
3. **Edit it** with the correct connection string
4. **Make sure cluster name is correct** (not just "cluster")
5. **Click "Save Changes"**
6. **Wait for redeploy** (2-3 minutes)

---

## What to Check

Your connection string should have:
- ✅ `mongodb+srv://` at start
- ✅ Username and password (replaced)
- ✅ **Actual cluster name** like `cluster0.abc123` (not just `cluster`)
- ✅ `.mongodb.net/` in the middle
- ✅ `/moela-dating` before the `?`
- ✅ `?retryWrites=true&w=majority` at end

---

## Quick Fix

1. **Get fresh connection string** from MongoDB Atlas (Clusters → Connect)
2. **Copy the ENTIRE string** (don't modify the cluster name part)
3. **Only replace:**
   - `<username>` with your username
   - `<password>` with your password (URL encoded if needed)
   - Add `/moela-dating` before the `?`
4. **Paste into Render** `MONGODB_URI`
5. **Save and wait for redeploy**

---

## After Fix

Check backend logs - should show:
```
✓ MongoDB connected successfully
  Database: moela-dating
```

Then try login again - should work!


