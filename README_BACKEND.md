# DSU Website - Backend Setup Guide

## Overview
This backend server handles user registration and stores data in MongoDB.

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   - Copy `env.example.txt` to `.env`
   - Update `MONGODB_URI` with your MongoDB connection string:
     - **Local MongoDB**: `mongodb://localhost:27017/dsu-registrations`
     - **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/dsu-registrations`

3. **Create `.env` file** in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/dsu-registrations
   PORT=5000
   ```

## Running the Server

### Development Mode (with auto-restart)
```bash
npm run server:dev
```

### Production Mode
```bash
npm run server
```

The server will start on `http://localhost:5000` (or the port specified in `.env`)

## API Endpoints

### 1. Register User
- **URL**: `POST /api/register`
- **Body**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Registration successful!",
    "user": {
      "id": "...",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "registeredAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

### 2. Get All Registrations
- **URL**: `GET /api/registrations`
- **Response**: List of all registered users

### 3. Health Check
- **URL**: `GET /api/health`
- **Response**: Server and database status

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/dsu-registrations`

### Option 2: MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string from "Connect" button
4. Replace `<password>` with your database password
5. Add your IP address to whitelist

## Frontend Configuration

The frontend is configured to call the API at `http://localhost:5000/api/register`.

If your backend is running on a different URL, update the `API_URL` in `script.js`:
```javascript
const API_URL = 'http://your-backend-url:port/api/register';
```

## Troubleshooting

1. **Connection Error**: Make sure MongoDB is running and the connection string is correct
2. **Port Already in Use**: Change the `PORT` in `.env` file
3. **CORS Error**: The server has CORS enabled, but make sure the frontend URL is allowed
4. **Module Not Found**: Run `npm install` to install all dependencies

## Database Schema

The User model stores:
- `fullName` (String, required)
- `email` (String, required, unique)
- `phone` (String, optional)
- `password` (String, optional - currently stored as plain text)
- `registeredAt` (Date, auto-generated)
- `createdAt` (Date, auto-generated)
- `updatedAt` (Date, auto-updated)

