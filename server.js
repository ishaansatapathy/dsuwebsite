const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dsu-registrations';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Connected to MongoDB successfully');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    console.log('🔗 Connection URI:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // Hide credentials
})
.catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    console.error('💡 Make sure:');
    console.error('   1. MongoDB is running (local) or connection string is correct (Atlas)');
    console.error('   2. Your .env file has the correct MONGODB_URI');
    console.error('   3. For Atlas: IP address is whitelisted and credentials are correct');
    process.exit(1);
});

// Routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'DSU Registration API is running!',
        status: 'success'
    });
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
    try {
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            console.error('❌ MongoDB not connected. ReadyState:', mongoose.connection.readyState);
            return res.status(503).json({
                success: false,
                message: 'Database connection unavailable. Please try again later.'
            });
        }

        console.log('📥 Registration request received:', {
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone ? 'provided' : 'not provided',
            password: req.body.password ? 'provided' : 'not provided',
            timestamp: new Date().toISOString()
        });

        const { fullName, email, phone, password } = req.body;

        // Basic validation
        if (!fullName || !email || !password) {
            console.log('❌ Validation failed: Missing required fields');
            return res.status(400).json({
                success: false,
                message: 'Full name, email, and password are required'
            });
        }

        // Validate password length
        if (password.length < 6) {
            console.log('❌ Validation failed: Password too short');
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Check if user already exists
        console.log('🔍 Checking if user exists...');
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            console.log('⚠️ User already exists:', email);
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Create new user
        console.log('📝 Creating new user...');
        const newUser = new User({
            fullName: fullName.trim(),
            email: email.toLowerCase().trim(),
            phone: phone ? phone.trim() : '',
            password: password.trim(), // Storing as plain text for now (you can hash it later)
            registeredAt: new Date()
        });

        // Save to database
        console.log('💾 Saving user to database...');
        const savedUser = await newUser.save();
        console.log('✅ User saved successfully:', {
            id: savedUser._id,
            email: savedUser.email,
            fullName: savedUser.fullName
        });

        // Return success response (don't send password back)
        res.status(201).json({
            success: true,
            message: 'Registration successful!',
            user: {
                id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email,
                phone: savedUser.phone,
                registeredAt: savedUser.registeredAt
            }
        });

    } catch (error) {
        console.error('❌ Registration error:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message
        });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        console.log('📥 Login request received:', {
            username: req.body.username,
            timestamp: new Date().toISOString()
        });

        const { username, password } = req.body;

        // Basic validation
        if (!username || !password) {
            console.log('❌ Validation failed: Missing username or password');
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }

        // Find user by email (username) or by fullName
        console.log('🔍 Searching for user...');
        const user = await User.findOne({
            $or: [
                { email: username.toLowerCase().trim() },
                { fullName: { $regex: new RegExp(username, 'i') } }
            ]
        });

        if (!user) {
            console.log('⚠️ User not found:', username);
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }

        // Check password (plain text comparison for now)
        if (user.password !== password) {
            console.log('⚠️ Invalid password for user:', username);
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }

        console.log('✅ Login successful:', {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        });

        // Return success response (don't send password back)
        res.json({
            success: true,
            message: 'Login successful!',
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone
            }
        });

    } catch (error) {
        console.error('❌ Login error:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message
        });
    }
});

// Get all registrations (optional - for admin purposes)
app.get('/api/registrations', async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ registeredAt: -1 });
        res.json({
            success: true,
            count: users.length,
            users: users
        });
    } catch (error) {
        console.error('Error fetching registrations:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching registrations',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📊 MongoDB URI: ${MONGODB_URI}`);
});

