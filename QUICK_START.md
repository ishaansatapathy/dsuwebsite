# Quick Start Guide - Fix Registration Error

## 🚨 Current Error
"Unable to connect to server" - This means the server is not running.

## ✅ Solution: Start the Server

### Step 1: Open a Terminal/PowerShell
1. Navigate to your project folder:
   ```
   cd "C:\Users\ishaa\OneDrive\Desktop\New folder"
   ```

### Step 2: Check MongoDB Connection
Before starting the server, you need MongoDB running:

**Option A: Using Local MongoDB**
- Make sure MongoDB service is running on your computer
- If not installed, install MongoDB Community Edition

**Option B: Using MongoDB Atlas (Cloud)**
- Check your `.env` file has the correct `MONGODB_URI`
- Format: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dsu-registrations`

### Step 3: Start the Server
Run this command in your terminal:

```bash
node server.js
```

**OR** use npm script:

```bash
npm run server
```

### Step 4: Look for Success Messages
You should see:
```
✅ Connected to MongoDB successfully
📊 Database: dsu-registrations
🚀 Server is running on http://localhost:5000
```

### Step 5: Test Registration Again
1. Go back to your browser
2. Refresh the registration page
3. Fill in the form and submit
4. You should see "Success! Registered in MongoDB"

## 🔧 If MongoDB Connection Fails

### For Local MongoDB:
1. **Start MongoDB Service:**
   - Windows: Open Services, find "MongoDB" and start it
   - Or run: `net start MongoDB` (as Administrator)

2. **Or use MongoDB Atlas (Cloud - Easier):**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get connection string
   - Add to `.env` file

### Check Your .env File
Make sure you have a `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dsu-registrations
```

Or for Atlas:
```
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/dsu-registrations
```

## 🎯 Quick Commands

**Start Server:**
```bash
node server.js
```

**Test MongoDB Connection:**
```bash
node test-connection.js
```

**Check if Server is Running:**
Visit: http://localhost:5000/api/health

**View All Registered Users:**
Visit: http://localhost:5000/api/registrations

## 💡 Tips

1. **Keep the terminal window open** - The server runs in the terminal, don't close it
2. **Check server logs** - They will show you what's happening
3. **Use MongoDB Atlas** - It's free and easier than local MongoDB setup

## 🆘 Still Having Issues?

1. Make sure Node.js is installed: `node --version`
2. Install dependencies: `npm install`
3. Check MongoDB is accessible
4. Look at the error messages in the terminal - they will tell you what's wrong


