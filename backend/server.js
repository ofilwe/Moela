const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL,
  ...(process.env.FRONTEND_URL ? [] : [])
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin/monitoring', require('./routes/monitoring'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/conversations', require('./routes/conversations'));

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/moela-dating';
    console.log('Attempting to connect to MongoDB...');
    console.log(`  URI: ${mongoURI.replace(/\/\/.*@/, '//***:***@')}`); // Hide credentials if any
    await mongoose.connect(mongoURI);
    console.log('✓ MongoDB connected successfully');
    console.log(`  Database: ${mongoose.connection.name}`);
    console.log(`  Ready state: ${mongoose.connection.readyState} (1=connected)`);
  } catch (err) {
    console.error('✗ MongoDB connection error:', err.message);
    console.error('Please ensure MongoDB is running on localhost:27017');
    console.error('Or update MONGODB_URI in .env file to point to your MongoDB instance');
    // Don't exit - let the server start but API calls will fail gracefully
  }
};

// Handle connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


