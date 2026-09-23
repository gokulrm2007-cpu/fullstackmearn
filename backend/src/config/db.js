const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (process.env.NODE_ENV === 'test') {
    // In test mode, use in-memory fallback without waiting for network timeout
    isConnected = false;
    return;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fullstackmearn';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB] Notice: Could not establish live MongoDB connection (${error.message}).`);
    console.warn(`[MongoDB] Running in safe in-memory persistence mode.`);
  }
};

const getDBStatus = () => ({
  connected: isConnected,
  database: isConnected ? mongoose.connection.name : 'in-memory-fallback',
  host: isConnected ? mongoose.connection.host : 'local-memory',
});

module.exports = { connectDB, getDBStatus };
