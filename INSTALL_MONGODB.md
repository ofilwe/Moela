# Installing MongoDB on Windows

## Step-by-Step Installation Guide

### 1. Download MongoDB Community Server

1. Go to: **https://www.mongodb.com/try/download/community**
2. Select:
   - **Version**: Latest (or 7.0+)
   - **Platform**: Windows
   - **Package**: MSI
3. Click **Download**

### 2. Run the Installer

1. Double-click the downloaded `.msi` file
2. Click **Next** on the welcome screen
3. Accept the license agreement
4. Choose **Complete** installation (recommended)
5. **Important**: Check "Install MongoDB as a Service"
   - Service Name: MongoDB
   - Run service as: Network Service User (default)
   - Check "Install MongoDB Compass" (GUI tool - optional but helpful)
6. Click **Install**
7. Wait for installation to complete
8. Click **Finish**

### 3. Verify Installation

After installation, MongoDB should start automatically as a Windows service.

### 4. Start MongoDB (if not running)

Open PowerShell as Administrator and run:

```powershell
# Check if MongoDB service exists
Get-Service -Name MongoDB

# If it exists but is stopped, start it
Start-Service MongoDB

# Verify it's running
Get-Service -Name MongoDB
```

### 5. Test the Connection

Once installed and running, MongoDB will be available at:
- **Host**: localhost
- **Port**: 27017
- **Connection String**: mongodb://localhost:27017

### 6. Restart Your Backend Server

After MongoDB is installed and running:

1. Go back to your terminal where the backend is running
2. Stop it (Ctrl+C) if it's running
3. Restart it:
   ```bash
   cd backend
   npm run dev
   ```

You should see: **"MongoDB connected successfully"**

### 7. Create Your First Account

Once MongoDB is connected:
1. Go to http://localhost:3000/register
2. Create an account
3. It should work now!

## Alternative: Manual Start (if service doesn't work)

If the service doesn't start automatically:

1. Create data directory:
   ```powershell
   New-Item -ItemType Directory -Path "C:\data\db" -Force
   ```

2. Start MongoDB manually:
   ```powershell
   # Navigate to MongoDB bin directory (usually):
   cd "C:\Program Files\MongoDB\Server\7.0\bin"
   
   # Start MongoDB
   .\mongod.exe --dbpath "C:\data\db"
   ```

   Keep this window open while using the app.

## Troubleshooting

### "Access Denied" when starting service
- Run PowerShell as Administrator
- Or use: `net start MongoDB` in Administrator Command Prompt

### Port 27017 already in use
- Another MongoDB instance might be running
- Check: `Get-Process -Name mongod`
- Stop it if needed

### Can't find MongoDB after installation
- Default installation path: `C:\Program Files\MongoDB\Server\[version]\bin`
- Add to PATH if needed, or use full path

