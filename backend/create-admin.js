const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createAdmin() {
  try {
    // Get email and password from command line arguments
    const email = process.argv[2];
    const password = process.argv[3];
    
    if (!email || !password) {
      console.log('Usage: node create-admin.js <email> <password>');
      console.log('Example: node create-admin.js admin@moela.com admin123');
      process.exit(1);
    }

    if (password.length < 6) {
      console.error('Error: Password must be at least 6 characters');
      process.exit(1);
    }

    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/moela-dating';
    await mongoose.connect(mongoURI);
    console.log('✓ Connected to MongoDB');

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    
    if (existingUser) {
      // Update existing user to admin
      existingUser.role = 'admin';
      existingUser.password = password; // Will be hashed by pre-save hook
      await existingUser.save();
      console.log(`✓ Updated existing user "${email}" to admin`);
    } else {
      // Create new admin user
      const adminUser = new User({
        email: email.toLowerCase().trim(),
        password: password,
        role: 'admin'
      });
      await adminUser.save();
      console.log(`✓ Created new admin account: ${email}`);
    }

    console.log('\n✓ Admin account ready!');
    console.log(`  Email: ${email}`);
    console.log(`  Role: admin`);
    console.log('\nYou can now login at: http://localhost:3000/login');
    console.log('Then access admin dashboard at: http://localhost:3000/admin');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    if (error.code === 11000) {
      console.error('  Email already exists. Use make-admin.js to update existing user.');
    }
    process.exit(1);
  }
}

createAdmin();

