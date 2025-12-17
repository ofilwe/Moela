# MongoDB Atlas Cluster Setup

## Step-by-Step Cluster Creation

### 1. Choose Deployment Type
- Select **"M0"** (Free Tier)
- This is the free option - perfect for testing

### 2. Choose Cloud Provider & Region
- **Cloud Provider:** AWS, Google Cloud, or Azure (your choice)
- **Region:** Choose the region closest to you
  - For example: `US East (N. Virginia)` or `Europe (Ireland)`
  - This affects latency but free tier works from anywhere

### 3. Cluster Tier Details
- You should see: **"M0 Sandbox"**
- **RAM:** 512 MB (free tier)
- **Storage:** 512 MB (free tier)
- This is enough for testing and small deployments

### 4. Cluster Name (Optional)
- Leave default name or rename to: `Moela-Cluster` or `Cluster0`
- This is just for your reference

### 5. Click "Create Deployment" or "Create Cluster"
- Wait 3-5 minutes for cluster to be created
- You'll see a progress indicator

---

## Important Notes

✅ **Free tier is perfect for:**
- Testing with stakeholders
- Development
- Small user base (< 1000 users)

⚠️ **Free tier limitations:**
- 512 MB storage
- Shared cluster resources
- Cannot be paused (always running)
- No backup retention

✅ **You can upgrade later** if needed for production

---

## What Happens Next

After cluster is created:
1. You'll see your cluster in the dashboard
2. Next step: Create database user
3. Then: Whitelist IP addresses
4. Finally: Get connection string

---

## Troubleshooting

**Can't see M0 option?**
- Make sure you're on the free tier
- Try refreshing the page
- M0 should be available for new accounts

**Region selection:**
- Any region works, but closer is faster
- Free tier available in most regions

**Cluster creation taking long?**
- Normal - takes 3-5 minutes
- Just wait for it to complete

