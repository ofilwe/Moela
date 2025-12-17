# MongoDB Setup Guide

## Issue: Server Error When Creating Account

The error is likely because **MongoDB is not running**. Here's how to fix it:

## Option 1: Install and Start MongoDB Locally

### Windows:

1. **Download MongoDB Community Server:**
   - Go to: https://www.mongodb.com/try/download/community
   - Download the Windows installer
   - Run the installer and follow the setup wizard

2. **Start MongoDB Service:**
   ```powershell
   # Check if MongoDB service exists
   Get-Service -Name MongoDB -ErrorAction SilentlyContinue
   
   # If service exists, start it
   Start-Service MongoDB
   
   # Or start manually
   mongod --dbpath "C:\data\db"
   ```

3. **Create Data Directory (if needed):**
   ```powershell
   New-Item -ItemType Directory -Path "C:\data\db" -Force
   ```

### Alternative: Use MongoDB as a Windows Service

If MongoDB was installed as a service:
```powershell
# Start the service
net start MongoDB

# Or using PowerShell
Start-Service MongoDB
```

## Option 2: Use MongoDB Atlas (Cloud - Recommended for Testing)

1. **Sign up for free MongoDB Atlas account:**
   - Go to: https://www.mongodb.com/cloud/atlas/register

2. **Create a free cluster** (M0 - Free tier)

3. **Get connection string:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

4. **Update `.env` file:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/moela-dating?retryWrites=true&w=majority
   ```
   Replace `username`, `password`, and the cluster URL with your actual values.

## Option 3: Use Docker (If you have Docker installed)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Verify MongoDB is Running

After starting MongoDB, verify it's running:

```powershell
# Check if port 27017 is listening
Test-NetConnection -ComputerName localhost -Port 27017

# Or check MongoDB service
Get-Service -Name MongoDB
```

## Restart the Backend Server

After MongoDB is running:

1. Stop the current backend server (Ctrl+C)
2. Restart it:
   ```bash
   cd backend
   npm run dev
   ```

You should see: `MongoDB connected successfully`

## Test Account Creation

Once MongoDB is running:
1. Go to http://localhost:3000/register
2. Create an account with any email and password (min 6 characters)
3. You should be redirected to the profile page

## Troubleshooting

### "MongoDB connection error" in console
- MongoDB is not running
- Check if MongoDB service is started
- Verify port 27017 is not blocked by firewall

### "Access denied" error
- Check MongoDB connection string in `.env`
- For Atlas: Ensure your IP is whitelisted in Network Access

### Port already in use
- Another MongoDB instance might be running
- Change the port in MongoDB config or stop the other instance

