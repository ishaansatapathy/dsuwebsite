// Quick test script to check MongoDB connection
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dsu-registrations';

console.log('🔍 Testing MongoDB connection...');
console.log('📍 Connection URI:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log('✅ Connected to MongoDB successfully!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    
    // Test if we can access the users collection
    const User = require('./models/User');
    const userCount = await User.countDocuments();
    console.log(`📝 Current users in database: ${userCount}`);
    
    // List all users
    if (userCount > 0) {
        const users = await User.find().select('-password');
        console.log('\n👥 Registered users:');
        users.forEach((user, index) => {
            console.log(`   ${index + 1}. ${user.fullName} (${user.email}) - Registered: ${user.registeredAt}`);
        });
    }
    
    process.exit(0);
})
.catch((error) => {
    console.error('❌ Connection failed!');
    console.error('Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check if MongoDB is running');
    console.error('   2. Verify your .env file has correct MONGODB_URI');
    console.error('   3. For Atlas: Check IP whitelist and credentials');
    process.exit(1);
});

