# Render Environment Variables Guide

## Backend Service Environment Variables

Click "Add Environment Variable" and add these **3 variables** one by one:

### 1. NODE_ENV
- **Key:** `NODE_ENV`
- **Value:** `production`
- **Purpose:** Tells Node.js it's running in production mode

### 2. MONGODB_URI
- **Key:** `MONGODB_URI`
- **Value:** Your MongoDB connection string
  - This is the connection string you saved earlier from MongoDB Atlas
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/moela-dating?retryWrites=true&w=majority`
  - Replace username, password, and cluster details with your actual values
- **Purpose:** Connects backend to your MongoDB Atlas database

### 3. JWT_SECRET
- **Key:** `JWT_SECRET`
- **Value:** `dfb0c16d49121148a56927f1b06d94abb1e9f20cac8d9d5971d6f3e78944933c`
- **Purpose:** Secret key for encrypting user authentication tokens

---

## How to Add Each Variable

1. Click **"Add Environment Variable"**
2. Enter the **Key** (exactly as shown above)
3. Enter the **Value** (the corresponding value)
4. Click **"Add"** or the checkmark
5. Repeat for each variable

---

## Example

After adding all 3, you should see:

```
NODE_ENV = production
MONGODB_URI = mongodb+srv://moela-admin:password@cluster0.xxxxx.mongodb.net/moela-dating?retryWrites=true&w=majority
JWT_SECRET = dfb0c16d49121148a56927f1b06d94abb1e9f20cac8d9d5971d6f3e78944933c
```

---

## Important Notes

- **MONGODB_URI:** Use the connection string you got from MongoDB Atlas
- Make sure there are no spaces around the `=` sign
- Keys are case-sensitive: Use exactly `NODE_ENV`, `MONGODB_URI`, `JWT_SECRET`
- After adding variables, you can click "Create Web Service" to deploy

---

## After Deployment

Once backend is deployed, you'll get a backend URL. Then when deploying frontend, you'll add:
- `VITE_API_URL` = your backend URL


