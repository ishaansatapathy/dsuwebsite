const mongoose = require('mongoose');

/**
 * Connect to MongoDB using MONGODB_URI from env or fallback.
 * Keeps connection logic in one place and adds improved logging.
 */
async function connectDB(uri) {
  const MONGODB_URI = uri || process.env.MONGODB_URI || 'mongodb://localhost:27017/dsu-registrations';

  if (!MONGODB_URI) {
    console.error('No MongoDB connection string provided (MONGODB_URI)');
    throw new Error('Missing MONGODB_URI');
  }

  try {
    // Use default options; modern mongoose no longer requires legacy flags
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');
    console.log('📊 Database:', mongoose.connection.db && mongoose.connection.db.databaseName);
    return mongoose.connection;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message || err);
    // attach full error for callers that want it
    err.source = 'mongodb-connection';
    throw err;
  }
}

module.exports = { connectDB };
