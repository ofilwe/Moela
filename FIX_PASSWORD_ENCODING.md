# Fix MongoDB Password with Special Characters

## The Problem

Your database password has special characters that need to be **URL encoded** in the connection string. The error `WSXzaq1` suggests the password isn't being encoded correctly.

---

## Special Characters That Need Encoding

| Character | Encoded |
|-----------|---------|
| `@` | `%40` |
| `#` | `%23` |
| `$` | `%24` |
| `%` | `%25` |
| `&` | `%26` |
| `+` | `%2B` |
| `=` | `%3D` |
| `?` | `%3F` |
| `/` | `%2F` |
| `:` | `%3A` |
| `;` | `%3B` |
| ` ` (space) | `%20` |

---

## Step 1: Get Your Connection String

1. **Go to MongoDB Atlas** → Clusters → Connect
2. **Copy the connection string:**
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

---

## Step 2: URL Encode Your Password

### Option A: Use Online Tool (Easiest)
1. **Go to:** https://www.urlencoder.org/
2. **Paste your password** in the text box
3. **Click "Encode"**
4. **Copy the encoded password**

### Option B: Manual Encoding
Replace each special character in your password with its encoded version (see table above).

### Option C: Use PowerShell (Quick)
```powershell
[System.Web.HttpUtility]::UrlEncode("YourPasswordHere")
```

---

## Step 3: Build Connection String

Format:
```
mongodb+srv://username:ENCODED_PASSWORD@cluster0.xxxxx.mongodb.net/moela-dating?retryWrites=true&w=majority
```

**Example:**
- Username: `moela-admin`
- Password: `P@ssw0rd#123` (has `@` and `#`)
- Encoded password: `P%40ssw0rd%23123`
- Connection string: `mongodb+srv://moela-admin:P%40ssw0rd%23123@cluster0.xxxxx.mongodb.net/moela-dating?retryWrites=true&w=majority`

---

## Step 4: Update in Render

1. **Go to backend service** → Environment
2. **Find `MONGODB_URI`**
3. **Edit it** with the URL-encoded password
4. **Click "Save Changes"**
5. **Wait for redeploy**

---

## Quick Test: Encode Your Password

I can help you encode it! **What's your password?** (or the special characters in it)

Or use this online tool: https://www.urlencoder.org/

---

## Alternative: Create New User with Simple Password

If encoding is too complicated:

1. **Go to MongoDB Atlas** → Database Access
2. **Create new database user:**
   - Username: `moela-admin2`
   - Password: Use only letters and numbers (no special chars)
   - Example: `MoelaAdmin2024`
3. **Use this new user** in connection string
4. **Update MONGODB_URI** in Render

---

## Example Connection String

**If your password is:** `MyP@ss#123`

**Encoded password:** `MyP%40ss%23123`

**Full connection string:**
```
mongodb+srv://moela-admin:MyP%40ss%23123@cluster0.xxxxx.mongodb.net/moela-dating?retryWrites=true&w=majority
```

---

## After Fixing

1. **Update MONGODB_URI** in Render
2. **Wait for redeploy**
3. **Check backend logs** - should show "✓ MongoDB connected successfully"
4. **Try login again** - should work!


