# Add Frontend URL to Backend

## Your Frontend URL
`https://moela-dating.onrender.com`

## Steps to Add to Backend

1. **Go to Render dashboard**
2. **Click on your backend service** (moela-backend)
3. **Click "Environment" tab** (in left sidebar)
4. **Click "Add Environment Variable"**
5. **Add:**
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://moela-dating.onrender.com`
   - (You can include or exclude the trailing `/` - both work)
6. **Click "Save Changes"** or checkmark
7. **Backend will automatically redeploy** (2-3 minutes)

## After Redeploy

1. **Wait for backend to finish redeploying** (check logs)
2. **Visit:** https://moela-dating.onrender.com
3. **You should see the login page!**

## Verify It Worked

After backend redeploys:
- Check backend logs - should show "MongoDB connected successfully"
- Visit frontend URL - should see login/register page
- Try creating an account - should work!

---

## Your URLs Summary

- **Frontend:** https://moela-dating.onrender.com
- **Backend:** (your backend URL from Render)

**Visit the frontend URL to use your app!**


