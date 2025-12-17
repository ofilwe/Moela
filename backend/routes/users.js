const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      gender,
      interestedIn,
      work,
      occupation,
      hobbies,
      bio,
      location,
      education,
      relationshipGoals,
      lifestyle,
      personality,
      photos
    } = req.body;

    const user = await User.findById(req.user._id);

    // Update profile fields
    if (firstName !== undefined) user.profile.firstName = firstName;
    if (lastName !== undefined) user.profile.lastName = lastName;
    if (age !== undefined) user.profile.age = age;
    if (gender !== undefined) user.profile.gender = gender;
    if (interestedIn !== undefined) user.profile.interestedIn = interestedIn;
    if (work !== undefined) user.profile.work = work;
    if (occupation !== undefined) user.profile.occupation = occupation;
    if (hobbies !== undefined) user.profile.hobbies = hobbies;
    if (bio !== undefined) user.profile.bio = bio;
    if (location !== undefined) user.profile.location = location;
    if (education !== undefined) user.profile.education = education;
    if (relationshipGoals !== undefined) user.profile.relationshipGoals = relationshipGoals;
    if (lifestyle !== undefined) {
      if (lifestyle.smoking !== undefined) user.profile.lifestyle.smoking = lifestyle.smoking;
      if (lifestyle.drinking !== undefined) user.profile.lifestyle.drinking = lifestyle.drinking;
      if (lifestyle.exercise !== undefined) user.profile.lifestyle.exercise = lifestyle.exercise;
    }
    if (personality !== undefined) {
      if (personality.introvert !== undefined) user.profile.personality.introvert = personality.introvert;
      if (personality.adventurous !== undefined) user.profile.personality.adventurous = personality.adventurous;
      if (personality.romantic !== undefined) user.profile.personality.romantic = personality.romantic;
      if (personality.senseOfHumor !== undefined) user.profile.personality.senseOfHumor = personality.senseOfHumor;
    }
    if (photos !== undefined) user.profile.photos = photos;

    // Check if profile is complete
    const requiredFields = ['firstName', 'lastName', 'age', 'gender', 'interestedIn', 'bio', 'location'];
    user.profile.isProfileComplete = requiredFields.every(field => {
      if (field === 'age') return user.profile.age && user.profile.age >= 18;
      return user.profile[field] && user.profile[field] !== '';
    });

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

