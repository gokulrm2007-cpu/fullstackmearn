const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, getDBStatus } = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Database
connectDB();

// Root / Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'fullstackmearn-backend',
    version: '1.0.0',
    origin: 'Migrated from laddu repository',
    database: getDBStatus(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/operators', require('./routes/operators.routes'));
app.use('/api/variables', require('./routes/variables.routes'));

// 404 Handler for API
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('[ServerError]', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Express] Server running on http://localhost:${PORT}`);
    console.log(`[Express] Health check: http://localhost:${PORT}/api/health`);
    console.log(`[Express] Operators API: http://localhost:${PORT}/api/operators/demo`);
    console.log(`[Express] Variables API: http://localhost:${PORT}/api/variables`);
  });
}

module.exports = app;
