const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profile: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    age: { type: Number, min: 18, max: 100 },
    gender: { type: String, enum: ['male', 'female', 'other', ''], default: '' },
    interestedIn: { type: String, enum: ['male', 'female', 'both', ''], default: '' },
    work: { type: String, default: '' },
    occupation: { type: String, default: '' },
    hobbies: [{ type: String }],
    bio: { type: String, default: '', maxlength: 500 },
    location: { type: String, default: '' },
    education: { type: String, default: '' },
    relationshipGoals: { type: String, enum: ['serious', 'casual', 'friendship', 'not-sure', ''], default: '' },
    lifestyle: {
      smoking: { type: String, enum: ['never', 'sometimes', 'regularly', ''], default: '' },
      drinking: { type: String, enum: ['never', 'sometimes', 'regularly', ''], default: '' },
      exercise: { type: String, enum: ['never', 'sometimes', 'regularly', ''], default: '' }
    },
    personality: {
      introvert: { type: Number, min: 0, max: 10, default: 5 },
      adventurous: { type: Number, min: 0, max: 10, default: 5 },
      romantic: { type: Number, min: 0, max: 10, default: 5 },
      senseOfHumor: { type: Number, min: 0, max: 10, default: 5 }
    },
    photos: [{ type: String }],
    isProfileComplete: { type: Boolean, default: false }
  },
  subscriptionStatus: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);


