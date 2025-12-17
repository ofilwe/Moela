const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  matchScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  matchFactors: {
    ageCompatibility: { type: Number, default: 0 },
    hobbySimilarity: { type: Number, default: 0 },
    lifestyleCompatibility: { type: Number, default: 0 },
    personalityMatch: { type: Number, default: 0 },
    locationProximity: { type: Number, default: 0 },
    relationshipGoalsMatch: { type: Number, default: 0 }
  },
  adminApproved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  },
  canMessage: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure unique matches
matchSchema.index({ user1: 1, user2: 1 }, { unique: true });

module.exports = mongoose.model('Match', matchSchema);


