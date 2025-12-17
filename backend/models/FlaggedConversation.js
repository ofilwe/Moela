const mongoose = require('mongoose');

const flaggedConversationSchema = new mongoose.Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  message: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['inappropriate', 'harassment', 'financial', 'personalInfo', 'spam', 'inappropriateRequests', 'aggressive']
  },
  severity: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'low'
  },
  score: {
    type: Number,
    required: true,
    default: 0
  },
  flags: [{
    category: String,
    pattern: String,
    matches: Number,
    score: Number,
    message: String
  }],
  messageContent: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved', 'false_positive'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['normal', 'urgent'],
    default: 'normal'
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: {
    type: Date
  },
  resolution: {
    type: String,
    enum: ['no_action', 'warning_sent', 'user_suspended', 'conversation_blocked', 'false_positive']
  },
  adminNotes: {
    type: String
  },
  notified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for efficient queries
flaggedConversationSchema.index({ conversation: 1, status: 1 });
flaggedConversationSchema.index({ severity: 1, status: 1 });
flaggedConversationSchema.index({ createdAt: -1 });
flaggedConversationSchema.index({ priority: 1, status: 1 });

module.exports = mongoose.model('FlaggedConversation', flaggedConversationSchema);

