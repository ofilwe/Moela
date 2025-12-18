# Backend Environment Variables - Exact Values

## Add These 4 Environment Variables

When creating your backend service on Render, add these one by one:

---

### 1. NODE_ENV
- **Key:** `NODE_ENV`
- **Value:** `production`
- **Purpose:** Tells Node.js it's running in production mode

---

### 2. MONGODB_URI
- **Key:** `MONGODB_URI`
- **Value:** Your MongoDB Atlas connection string
  - This is the connection string you saved earlier
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/moela-dating?retryWrites=true&w=majority`
  - **Replace username, password, and cluster with your actual values**
- **Purpose:** Connects backend to MongoDB Atlas database

**Example:**
```
mongodb+srv://moela-admin:YourPassword123@cluster0.xxxxx.mongodb.net/moela-dating?retryWrites=true&w=majority
```

---

### 3. JWT_SECRET
- **Key:** `JWT_SECRET`
- **Value:** `dfb0c16d49121148a56927f1b06d94abb1e9f20cac8d9d5971d6f3e78944933c`
- **Purpose:** Secret key for encrypting user authentication tokens

---

### 4. FRONTEND_URL
- **Key:** `FRONTEND_URL`
- **Value:** `https://moela-dating.onrender.com`
- **Purpose:** Allows frontend to communicate with backend (CORS)

---

## How to Add in Render

1. **Click "Add Environment Variable"**
2. **Enter Key** (exactly as shown above)
3. **Enter Value** (exactly as shown, except MONGODB_URI - use your actual connection string)
4. **Click "Add"** or checkmark
5. **Repeat for each variable**

---

## Complete List (Copy-Paste Ready)

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `your_mongodb_connection_string_here` |
| `JWT_SECRET` | `dfb0c16d49121148a56927f1b06d94abb1e9f20cac8d9d5971d6f3e78944933c` |
| `FRONTEND_URL` | `https://moela-dating.onrender.com` |

---

## Important Notes

- **MONGODB_URI:** You need to paste your actual MongoDB Atlas connection string
- **Keys are case-sensitive:** Use exactly `NODE_ENV`, `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`
- **No spaces:** Don't add spaces around the `=` sign
- **No quotes:** Don't wrap values in quotes (Render handles that)

---

## After Adding All 4

1. **Click "Create Web Service"**
2. **Wait 5-10 minutes** for deployment
3. **Check logs** to verify it's working
4. **Test your frontend** - it should connect to backend now!


