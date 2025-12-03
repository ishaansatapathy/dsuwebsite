const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        trim: true,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // This adds createdAt and updatedAt automatically
});

// Create index on email for faster queries
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;

