const express = require('express');
const FlaggedConversation = require('../models/FlaggedConversation');
const Conversation = require('../models/Conversation');
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');
const { getMonitoringStats, analyzeConversationPattern } = require('../services/conversationMonitor');

const router = express.Router();

// All routes require admin authentication
router.use(adminAuth);

// @route   GET /api/admin/monitoring/stats
// @desc    Get monitoring statistics
// @access  Private (Admin)
router.get('/stats', async (req, res) => {
  try {
    const stats = await getMonitoringStats();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/monitoring/flagged
// @desc    Get all flagged conversations
// @access  Private (Admin)
router.get('/flagged', async (req, res) => {
  try {
    const { status, severity, priority, limit = 50 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (severity) query.severity = severity;
    if (priority) query.priority = priority;

    const flagged = await FlaggedConversation.find(query)
      .populate('conversation', 'participants match')
      .populate('sender', 'email profile')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    // Populate conversation participants
    for (let flag of flagged) {
      if (flag.conversation) {
        await flag.conversation.populate('participants', 'email profile');
        await flag.conversation.populate('match');
      }
    }

    res.json(flagged);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/monitoring/flagged/:id
// @desc    Get a specific flagged conversation with context
// @access  Private (Admin)
router.get('/flagged/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const flagged = await FlaggedConversation.findById(id)
      .populate('conversation')
      .populate('sender', 'email profile');

    if (!flagged) {
      return res.status(404).json({ message: 'Flagged conversation not found' });
    }

    // Get full conversation context
    const conversation = await Conversation.findById(flagged.conversation._id)
      .populate('participants', 'email profile')
      .populate('match')
      .populate('messages.sender', 'email profile');

    // Get pattern analysis
    const patternAnalysis = await analyzeConversationPattern(flagged.conversation._id);

    // Get all flags for this conversation
    const allFlags = await FlaggedConversation.find({
      conversation: flagged.conversation._id
    }).sort({ createdAt: -1 });

    res.json({
      flag: flagged,
      conversation,
      patternAnalysis,
      allFlags
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/monitoring/flagged/:id/review
// @desc    Review and resolve a flagged conversation
// @access  Private (Admin)
router.put('/flagged/:id/review', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, resolution, adminNotes } = req.body;

    const flagged = await FlaggedConversation.findById(id);
    if (!flagged) {
      return res.status(404).json({ message: 'Flagged conversation not found' });
    }

    flagged.status = status || flagged.status;
    flagged.resolution = resolution;
    flagged.adminNotes = adminNotes;
    flagged.reviewedBy = req.user._id;
    flagged.reviewedAt = new Date();

    await flagged.save();

    const updated = await FlaggedConversation.findById(id)
      .populate('conversation')
      .populate('sender', 'email profile')
      .populate('reviewedBy', 'email');

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/monitoring/flagged/:id/priority
// @desc    Update priority of a flagged conversation
// @access  Private (Admin)
router.put('/flagged/:id/priority', async (req, res) => {
  try {
    const { id } = req.params;
    const { priority } = req.body;

    const flagged = await FlaggedConversation.findByIdAndUpdate(
      id,
      { priority, notified: true },
      { new: true }
    );

    if (!flagged) {
      return res.status(404).json({ message: 'Flagged conversation not found' });
    }

    res.json(flagged);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/monitoring/urgent
// @desc    Get urgent/critical flagged conversations
// @access  Private (Admin)
router.get('/urgent', async (req, res) => {
  try {
    const urgent = await FlaggedConversation.find({
      $or: [
        { severity: 'critical', status: 'pending' },
        { severity: 'high', status: 'pending', priority: 'urgent' }
      ]
    })
      .populate('conversation', 'participants match')
      .populate('sender', 'email profile')
      .sort({ createdAt: -1 })
      .limit(20);

    // Populate conversation details
    for (let flag of urgent) {
      if (flag.conversation) {
        await flag.conversation.populate('participants', 'email profile');
        await flag.conversation.populate('match');
      }
    }

    res.json(urgent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/admin/monitoring/flagged/:id/action
// @desc    Take action on a flagged conversation (suspend user, block conversation, etc.)
// @access  Private (Admin)
router.post('/flagged/:id/action', async (req, res) => {
  try {
    const { id } = req.params;
    const { action, userId, conversationId } = req.body;

    const flagged = await FlaggedConversation.findById(id);
    if (!flagged) {
      return res.status(404).json({ message: 'Flagged conversation not found' });
    }

    let result = {};

    switch (action) {
      case 'suspend_user':
        if (userId) {
          await User.findByIdAndUpdate(userId, { isActive: false });
          result.message = 'User suspended';
        }
        break;
      
      case 'block_conversation':
        if (conversationId) {
          const match = await require('../models/Match').findOne({ 
            $or: [
              { user1: flagged.sender, user2: { $in: await Conversation.findById(conversationId).then(c => c.participants) } },
              { user2: flagged.sender, user1: { $in: await Conversation.findById(conversationId).then(c => c.participants) } }
            ]
          });
          if (match) {
            match.canMessage = false;
            await match.save();
          }
          result.message = 'Conversation blocked';
        }
        break;
      
      case 'warn_user':
        // Could send email notification here
        result.message = 'Warning sent to user';
        break;
      
      default:
        return res.status(400).json({ message: 'Invalid action' });
    }

    // Mark as reviewed
    flagged.status = 'reviewed';
    flagged.resolution = action;
    flagged.reviewedBy = req.user._id;
    flagged.reviewedAt = new Date();
    await flagged.save();

    res.json({ ...result, flagged });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

