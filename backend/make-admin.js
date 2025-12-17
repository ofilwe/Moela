const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function makeAdmin() {
  try {
    // Get email from command line argument
    const email = process.argv[2];
    
    if (!email) {
      console.error('Usage: node make-admin.js <email>');
      console.error('Example: node make-admin.js user@example.com');
      process.exit(1);
    }

    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/moela-dating';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Find and update user
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { $set: { role: 'admin' } },
      { new: true }
    );

    if (!user) {
      console.error(`User with email "${email}" not found!`);
      process.exit(1);
    }

    console.log(`✓ Successfully made ${user.email} an admin!`);
    console.log(`  User ID: ${user._id}`);
    console.log(`  Role: ${user.role}`);
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

makeAdmin();

