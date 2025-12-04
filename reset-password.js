// Dev helper: reset a user's password (development only)
// Usage: node reset-password.js user@example.com newPassword

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dsu-registrations';

async function main() {
    const email = process.argv[2];
    const newPassword = process.argv[3];
    if (!email || !newPassword) {
        console.error('Usage: node reset-password.js user@example.com newPassword');
        process.exit(1);
    }

    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
        console.error('User not found:', email);
        process.exit(1);
    }

    user.password = newPassword.trim();
    await user.save();
    console.log('Password updated for', email);
    await mongoose.disconnect();
    process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
