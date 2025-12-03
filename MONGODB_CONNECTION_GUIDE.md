# MongoDB Connection Guide

## Option 1: Connect to Local MongoDB

### Step 1: Install MongoDB Locally
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install it on your computer
3. Start MongoDB service (it usually starts automatically)

### Step 2: Connect via MongoDB Compass
1. Open MongoDB Compass
2. Click **"+ Add new connection"** button
3. In the connection string field, enter:
   ```
   mongodb://localhost:27017
   ```
4. Click **"Connect"**
5. You should see your local MongoDB instance

### Step 3: Create Database
1. In MongoDB Compass, click **"CREATE DATABASE"**
2. Database Name: `dsu-registrations`
3. Collection Name: `users` (optional, will be created automatically)
4. Click **"Create Database"**

### Step 4: Update .env File
Create a `.env` file in your project root with:
```
MONGODB_URI=mongodb://localhost:27017/dsu-registrations
PORT=5000
```

---

## Option 2: Connect to MongoDB Atlas (Cloud - Recommended)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** or **"Sign Up"**
3. Create your account

### Step 2: Create a Free Cluster
1. After logging in, click **"Build a Database"**
2. Choose **"FREE"** (M0) tier
3. Select a cloud provider and region (choose closest to you)
4. Click **"Create"** (cluster name is optional)
5. Wait 1-3 minutes for cluster to be created

### Step 3: Create Database User
1. In the **"Security"** section, click **"Database Access"**
2. Click **"+ Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username and password (save these!)
5. Set privileges to **"Atlas admin"** or **"Read and write to any database"**
6. Click **"Add User"**

### Step 4: Whitelist Your IP Address
1. In **"Security"** section, click **"Network Access"**
2. Click **"+ Add IP Address"**
3. Click **"Add Current IP Address"** (or **"Allow Access from Anywhere"** for development: `0.0.0.0/0`)
4. Click **"Confirm"**

### Step 5: Get Connection String
1. Click **"Connect"** button on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<username>` and `<password>` with your database user credentials
5. Add database name at the end: `/dsu-registrations`

**Final connection string should look like:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/dsu-registrations?retryWrites=true&w=majority
```

### Step 6: Connect via MongoDB Compass
1. In MongoDB Atlas, click **"Connect"** → **"Connect using MongoDB Compass"**
2. Copy the connection string
3. Open MongoDB Compass
4. Paste the connection string
5. Replace `<password>` with your actual password
6. Click **"Connect"**

### Step 7: Update .env File
Create a `.env` file in your project root:
```
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/dsu-registrations?retryWrites=true&w=majority
PORT=5000
```

**⚠️ Important:** Never commit your `.env` file to Git! It contains sensitive information.

---

## Testing the Connection

### Step 1: Start Your Backend Server
```bash
npm run server:dev
```

You should see:
```
✅ Connected to MongoDB successfully
🚀 Server is running on http://localhost:5000
📊 MongoDB URI: mongodb://...
```

### Step 2: Test Registration
1. Open your website in browser
2. Fill out the registration form
3. Submit it
4. Check MongoDB Compass - you should see the data in the `users` collection

### Step 3: Verify in MongoDB Compass
1. Open MongoDB Compass
2. Navigate to your database: `dsu-registrations`
3. Click on `users` collection
4. You should see registered users with their data

---

## Troubleshooting

### Error: "MongoServerError: Authentication failed"
- Check your username and password in the connection string
- Make sure you replaced `<username>` and `<password>` with actual values

### Error: "MongoServerError: IP not whitelisted"
- Go to MongoDB Atlas → Network Access
- Add your current IP address or `0.0.0.0/0` for development

### Error: "ECONNREFUSED" or "Connection timeout"
- Make sure MongoDB is running (for local)
- Check your internet connection (for Atlas)
- Verify the connection string is correct

### Error: "Cannot find module 'mongoose'"
- Run: `npm install`

---

## Quick Reference

### Local MongoDB Connection String Format:
```
mongodb://localhost:27017/database-name
```

### MongoDB Atlas Connection String Format:
```
mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```

### Example .env File:
```
MONGODB_URI=mongodb://localhost:27017/dsu-registrations
PORT=5000
```

