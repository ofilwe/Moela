const express = require('express');
const Match = require('../models/Match');
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');
const { findMatchesForUser } = require('../services/matchingService');

const router = express.Router();

// All routes require admin authentication
router.use(adminAuth);

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/matches/pending
// @desc    Get all pending matches
// @access  Private (Admin)
router.get('/matches/pending', async (req, res) => {
  try {
    const matches = await Match.find({ adminApproved: false })
      .populate('user1', 'profile email')
      .populate('user2', 'profile email')
      .sort({ matchScore: -1, createdAt: -1 });
    
    res.json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/matches/all
// @desc    Get all matches
// @access  Private (Admin)
router.get('/matches/all', async (req, res) => {
  try {
    const matches = await Match.find()
      .populate('user1', 'profile email')
      .populate('user2', 'profile email')
      .sort({ matchScore: -1, createdAt: -1 });
    
    res.json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/matches/:matchId/approve
// @desc    Approve a match and allow messaging
// @access  Private (Admin)
router.put('/matches/:matchId/approve', async (req, res) => {
  try {
    const { matchId } = req.params;
    const { canMessage } = req.body;

    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    match.adminApproved = true;
    match.approvedBy = req.user._id;
    match.approvedAt = new Date();
    match.canMessage = canMessage !== undefined ? canMessage : true;

    await match.save();

    const populatedMatch = await Match.findById(matchId)
      .populate('user1', 'profile email')
      .populate('user2', 'profile email');

    res.json(populatedMatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/matches/:matchId/reject
// @desc    Reject a match
// @access  Private (Admin)
router.put('/matches/:matchId/reject', async (req, res) => {
  try {
    const { matchId } = req.params;

    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    // Delete the match
    await Match.findByIdAndDelete(matchId);

    res.json({ message: 'Match rejected and deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/users/:userId/status
// @desc    Update user status (active/inactive)
// @access  Private (Admin)
router.put('/users/:userId/status', async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/admin/matches/generate-all
// @desc    Generate matches for all users
// @access  Private (Admin)
router.post('/matches/generate-all', async (req, res) => {
  try {
    const users = await User.find({ 'profile.isProfileComplete': true, isActive: true });
    let totalMatches = 0;

    for (const user of users) {
      const matches = await findMatchesForUser(user._id, 60);
      totalMatches += matches.length;
    }

    res.json({
      message: `Generated matches for ${users.length} users`,
      totalMatches
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

