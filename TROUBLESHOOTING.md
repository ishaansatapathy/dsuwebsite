# MongoDB Not Collecting Data - Troubleshooting Guide

## Step 1: Check if Backend Server is Running

### Start the Server:
```bash
npm run server:dev
```

You should see:
```
✅ Connected to MongoDB successfully
🚀 Server is running on http://localhost:5000
```

**If you see connection errors**, go to Step 2.

---

## Step 2: Test MongoDB Connection

### Run the test script:
```bash
node test-connection.js
```

This will tell you:
- ✅ If MongoDB is connected
- 📝 How many users are in the database
- 👥 List of all registered users

**If connection fails**, check Step 3.

---

## Step 3: Fix MongoDB Connection

### Option A: Local MongoDB

1. **Check if MongoDB is installed and running:**
   - Windows: Check Services (search "Services" in Start menu)
   - Look for "MongoDB Server" service
   - If not running, start it

2. **Verify connection string in `.env` file:**
   ```
   MONGODB_URI=mongodb://localhost:27017/dsu-registrations
   ```

3. **Test connection in MongoDB Compass:**
   - Open MongoDB Compass
   - Connect to: `mongodb://localhost:27017`
   - Create database: `dsu-registrations`

### Option B: MongoDB Atlas (Cloud)

1. **Get your connection string:**
   - Go to https://cloud.mongodb.com
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

2. **Update `.env` file:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dsu-registrations?retryWrites=true&w=majority
   ```
   - Replace `username` and `password` with your actual credentials
   - Make sure `/dsu-registrations` is in the URL

3. **Check IP Whitelist:**
   - Go to Network Access in MongoDB Atlas
   - Add your IP address or `0.0.0.0/0` for development

---

## Step 4: Check Browser Console

1. Open your website
2. Press `F12` to open Developer Tools
3. Go to "Console" tab
4. Try to register
5. Look for errors like:
   - `Failed to fetch` - Backend server not running
   - `CORS error` - CORS issue (should be fixed)
   - `Network error` - Connection problem

---

## Step 5: Check Server Logs

When you register, the server console should show:
```
📥 Registration request received: { fullName: '...', email: '...' }
🔍 Checking if user exists...
📝 Creating new user...
💾 Saving user to database...
✅ User saved successfully: { id: '...', email: '...' }
```

**If you don't see these logs**, the request isn't reaching the server.

---

## Common Issues & Solutions

### Issue 1: "Cannot find module 'mongoose'"
**Solution:** Run `npm install`

### Issue 2: "MongoServerError: Authentication failed"
**Solution:** 
- Check username/password in connection string
- Make sure you replaced `<username>` and `<password>` in Atlas connection string

### Issue 3: "ECONNREFUSED" or "Connection timeout"
**Solution:**
- Local: Make sure MongoDB service is running
- Atlas: Check internet connection and IP whitelist

### Issue 4: Server starts but no data saved
**Solution:**
- Check server logs for errors
- Verify database name in connection string
- Run `node test-connection.js` to verify connection

### Issue 5: "CORS policy" error
**Solution:** Already fixed in server.js with `app.use(cors())`

---

## Quick Test Checklist

- [ ] Backend server is running (`npm run server:dev`)
- [ ] MongoDB connection successful (see server logs)
- [ ] `.env` file exists with correct `MONGODB_URI`
- [ ] Test connection works (`node test-connection.js`)
- [ ] Browser console shows no errors
- [ ] Server logs show registration requests

---

## Still Not Working?

1. **Check server logs** - Look for error messages
2. **Check browser console** - Look for network errors
3. **Run test script** - `node test-connection.js`
4. **Verify MongoDB Compass** - Can you see the database?

If all else fails, share the error messages from:
- Server console
- Browser console (F12)
- Test connection script output

