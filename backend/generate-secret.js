const crypto = require('crypto');

// Generate a secure random secret
const secret = crypto.randomBytes(32).toString('hex');
console.log('\n=== JWT Secret Generated ===');
console.log(secret);
console.log('\nCopy this and use it as JWT_SECRET in Render environment variables');
console.log('================================\n');

