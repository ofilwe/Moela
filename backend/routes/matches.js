const express = require('express');
const Match = require('../models/Match');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const { findMatchesForUser } = require('../services/matchingService');

const router = express.Router();

// @route   GET /api/matches
// @desc    Get matches for current user (admin-approved only)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Get matches where user is involved and admin approved
    const matches = await Match.find({
      $or: [{ user1: userId }, { user2: userId }],
      adminApproved: true
    })
      .populate('user1', 'profile email')
      .populate('user2', 'profile email')
      .sort({ matchScore: -1 });

    // Format matches to show the other user
    const formattedMatches = matches.map(match => {
      const otherUser = match.user1._id.toString() === userId.toString() 
        ? match.user2 
        : match.user1;
      
      return {
        _id: match._id,
        matchScore: match.matchScore,
        matchFactors: match.matchFactors,
        canMessage: match.canMessage,
        otherUser: {
          _id: otherUser._id,
          email: otherUser.email,
          profile: otherUser.profile
        },
        createdAt: match.createdAt
      };
    });

    res.json(formattedMatches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/matches/generate
// @desc    Generate matches for current user
// @access  Private
router.post('/generate', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const minScore = req.body.minScore || 60;

    const matches = await findMatchesForUser(userId, minScore);

    res.json({
      message: `Found ${matches.length} potential matches`,
      matches: matches.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/matches/pending
// @desc    Get pending matches (for admin)
// @access  Private (Admin only - handled in admin route)

module.exports = router;

