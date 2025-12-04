# 📋 How Registration Data is Saved to MongoDB

## ✅ Your Setup is Perfect!

You have:
- ✅ MongoDB running on `localhost:27017`
- ✅ Database: `dsu-registrations` 
- ✅ Collection: `users` (where data will be saved)

## 🔄 What Happens When You Register

### Step 1: Fill Registration Form
When you fill out the registration form with:
- Full Name
- Email
- Phone Number  
- Password

### Step 2: Data is Sent to Server
The form sends data to: `http://localhost:5000/api/register`

### Step 3: Server Saves to MongoDB
The server saves your data to:
```
Database: dsu-registrations
Collection: users
```

### Step 4: Data Appears in MongoDB
You'll see your registration data in MongoDB under:
```
localhost:27017
  └── dsu-registrations
      └── users (collection)
          └── Your registration data here!
```

## 🎯 Verify Your Data is Saved

After registering, you can check MongoDB and you'll see documents like:
```json
{
  "_id": "...",
  "fullName": "Your Name",
  "email": "your@email.com",
  "phone": "1234567890",
  "password": "...",
  "registeredAt": "2024-...",
  "createdAt": "2024-...",
  "updatedAt": "2024-..."
}
```

## 🚀 To Start the Server

**Option 1: Double-click the file**
- Double-click `start-server.bat`

**Option 2: Terminal/PowerShell**
```bash
node server.js
```

You should see:
```
✅ Connected to MongoDB successfully
📊 Database: dsu-registrations
🚀 Server is running on http://localhost:5000
```

## ✨ Then Register!

1. Open `index.html` in browser
2. Fill the registration form
3. Click "Register & Continue"
4. ✅ Success! Your data is now in MongoDB!

## 🔍 Check Your Data

After registration, refresh your MongoDB view and you'll see your data in the `users` collection!


