# Fix Database Name - Use moela-dating Instead of test

## Current Status
✅ MongoDB is connecting!
❌ But it's using `test` database instead of `moela-dating`

## The Fix

Your connection string needs to include `/moela-dating` before the `?`

### Current (Wrong):
```
mongodb+srv://username:password@dolf.uljhcq0.mongodb.net/?appName=dolf
```
This connects to the default `test` database.

### Correct:
```
mongodb+srv://username:password@dolf.uljhcq0.mongodb.net/moela-dating?retryWrites=true&w=majority
```
This connects to the `moela-dating` database.

---

## Step 1: Update Connection String in Render

1. **Go to backend service** → Environment
2. **Find `MONGODB_URI`**
3. **Edit it:**
   - Find the part: `dolf.uljhcq0.mongodb.net/?appName=dolf`
   - Change to: `dolf.uljhcq0.mongodb.net/moela-dating?retryWrites=true&w=majority`
   - **Add `/moela-dating`** before the `?`
   - **Replace `?appName=dolf`** with `?retryWrites=true&w=majority`
4. **Click "Save Changes"**
5. **Wait for redeploy** (2-3 minutes)

---

## Step 2: Verify

After redeploy, check backend logs. Should show:
```
✓ MongoDB connected successfully
  Database: moela-dating  ← Should say moela-dating, not test
```

---

## Full Connection String Format

Based on your cluster name `dolf.uljhcq0.mongodb.net`:

```
mongodb+srv://moela-admin:ENCODED_PASSWORD@dolf.uljhcq0.mongodb.net/moela-dating?retryWrites=true&w=majority
```

**Replace:**
- `moela-admin` with your actual username
- `ENCODED_PASSWORD` with your URL-encoded password

---

## After Fix

1. ✅ Backend redeploys
2. ✅ Logs show "Database: moela-dating"
3. ✅ Try login - should work now!
4. ✅ Data will be stored in `moela-dating` database


