const express = require('express');
const Conversation = require('../models/Conversation');
const Match = require('../models/Match');
const { auth } = require('../middleware/auth');
const { monitorMessage } = require('../services/conversationMonitor');

const router = express.Router();

// @route   GET /api/conversations
// @desc    Get all conversations for current user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({
      participants: userId
    })
      .populate('participants', 'profile email')
      .populate('match')
      .sort({ lastMessage: -1 });

    res.json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/conversations/:conversationId
// @desc    Get a specific conversation
// @access  Private
router.get('/:conversationId', auth, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: userId
    })
      .populate('participants', 'profile email')
      .populate('match')
      .populate('messages.sender', 'profile email');

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    res.json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/conversations
// @desc    Create a new conversation (only if match is approved and canMessage is true)
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { matchId } = req.body;
    const userId = req.user._id;

    // Check if match exists and is approved
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    if (!match.adminApproved || !match.canMessage) {
      return res.status(403).json({ message: 'Match not approved for messaging' });
    }

    // Check if user is part of the match
    const user1Id = match.user1.toString();
    const user2Id = match.user2.toString();
    if (userId.toString() !== user1Id && userId.toString() !== user2Id) {
      return res.status(403).json({ message: 'Not authorized to create conversation for this match' });
    }

    // Check if conversation already exists
    let conversation = await Conversation.findOne({ match: matchId });
    
    if (!conversation) {
      conversation = new Conversation({
        participants: [match.user1, match.user2],
        match: matchId
      });
      await conversation.save();
    }

    const populatedConversation = await Conversation.findById(conversation._id)
      .populate('participants', 'profile email')
      .populate('match');

    res.status(201).json(populatedConversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/conversations/:conversationId/messages
// @desc    Send a message in a conversation
// @access  Private
router.post('/:conversationId/messages', auth, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // Check if user is a participant
    if (!conversation.participants.includes(userId)) {
      return res.status(403).json({ message: 'Not authorized to send messages in this conversation' });
    }

    // Check if match still allows messaging
    const match = await Match.findById(conversation.match);
    if (!match.canMessage) {
      return res.status(403).json({ message: 'Messaging is not allowed for this match' });
    }

    // Add message
    const newMessage = {
      sender: userId,
      content: content.trim()
    };
    conversation.messages.push(newMessage);
    conversation.lastMessage = new Date();
    await conversation.save();

    // Get the saved message ID
    const savedMessage = conversation.messages[conversation.messages.length - 1];
    const messageId = savedMessage._id;

    // Monitor message for red flags (async, don't block response)
    monitorMessage(content.trim(), userId, conversationId, messageId)
      .then(result => {
        if (result.flagged) {
          console.log(`⚠️ Red flag detected in conversation ${conversationId}: ${result.severity} - ${result.category}`);
          if (result.severity === 'critical' || result.severity === 'high') {
            console.log(`🚨 URGENT: Critical/High severity flag detected - Admin notification needed`);
          }
        }
      })
      .catch(err => {
        console.error('Error monitoring message:', err);
        // Don't fail the request if monitoring fails
      });

    const populatedConversation = await Conversation.findById(conversationId)
      .populate('participants', 'profile email')
      .populate('match')
      .populate('messages.sender', 'profile email');

    res.status(201).json(populatedConversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/conversations/:conversationId/messages/:messageId/read
// @desc    Mark a message as read
// @access  Private
router.put('/:conversationId/messages/:messageId/read', auth, async (req, res) => {
  try {
    const { conversationId, messageId } = req.params;
    const userId = req.user._id;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    const message = conversation.messages.id(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Only mark as read if user is not the sender
    if (message.sender.toString() !== userId.toString()) {
      message.read = true;
      await conversation.save();
    }

    res.json({ message: 'Message marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

