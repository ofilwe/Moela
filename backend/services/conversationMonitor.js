const FlaggedConversation = require('../models/FlaggedConversation');

// Red flag keywords and patterns
const RED_FLAG_PATTERNS = {
  // Inappropriate content
  inappropriate: [
    /\b(sex|sexual|nude|naked|porn|xxx|adult)\b/gi,
    /\b(fuck|shit|damn|bitch|asshole)\b/gi,
  ],
  
  // Harassment and threats
  harassment: [
    /\b(kill|die|hurt|harm|threat|violence)\b/gi,
    /\b(stupid|idiot|dumb|ugly|fat|worthless)\b/gi,
  ],
  
  // Financial scams
  financial: [
    /\b(money|pay|send|transfer|bitcoin|crypto|investment|loan)\b/gi,
    /\b(urgent|emergency|help me|need money)\b/gi,
  ],
  
  // Personal information requests
  personalInfo: [
    /\b(phone number|address|home|where do you live|social security)\b/gi,
    /\b(credit card|bank account|password|pin)\b/gi,
  ],
  
  // Spam patterns
  spam: [
    /\b(click here|free|winner|prize|congratulations|limited time)\b/gi,
    /http[s]?:\/\/[^\s]+/gi, // URLs
  ],
  
  // Inappropriate requests
  inappropriateRequests: [
    /\b(send pic|send photo|send image|show me|nude|naked)\b/gi,
    /\b(meet me|come over|my place|your place)\b/gi,
  ],
  
  // Aggressive behavior
  aggressive: [
    /\b(why|why not|what's wrong|you must|you have to)\b/gi,
    /[!]{2,}/g, // Multiple exclamation marks
    /[A-Z]{10,}/g, // ALL CAPS
  ],
};

// Severity levels
const SEVERITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

// Analyze a message for red flags
const analyzeMessage = (messageContent, senderId, conversationId) => {
  const flags = [];
  let severity = SEVERITY_LEVELS.LOW;
  let totalScore = 0;

  // Check each category
  Object.entries(RED_FLAG_PATTERNS).forEach(([category, patterns]) => {
    patterns.forEach(pattern => {
      const matches = messageContent.match(pattern);
      if (matches) {
        const score = getCategoryScore(category, matches.length);
        totalScore += score;
        
        flags.push({
          category,
          pattern: pattern.toString(),
          matches: matches.length,
          score,
          message: messageContent
        });
      }
    });
  });

  // Determine severity based on total score
  if (totalScore >= 50) {
    severity = SEVERITY_LEVELS.CRITICAL;
  } else if (totalScore >= 30) {
    severity = SEVERITY_LEVELS.HIGH;
  } else if (totalScore >= 15) {
    severity = SEVERITY_LEVELS.MEDIUM;
  }

  // Additional checks
  const messageLength = messageContent.length;
  const wordCount = messageContent.split(/\s+/).length;
  
  // Very short messages might be spam
  if (wordCount < 3 && totalScore > 0) {
    severity = Math.max(severity, SEVERITY_LEVELS.MEDIUM);
  }
  
  // Very long messages with flags might be scams
  if (messageLength > 500 && flags.length > 2) {
    severity = Math.max(severity, SEVERITY_LEVELS.HIGH);
  }

  return {
    hasRedFlags: flags.length > 0,
    flags,
    severity,
    score: totalScore,
    analyzedAt: new Date()
  };
};

// Get score for each category
const getCategoryScore = (category, matchCount) => {
  const baseScores = {
    inappropriate: 10,
    harassment: 15,
    financial: 12,
    personalInfo: 8,
    spam: 5,
    inappropriateRequests: 12,
    aggressive: 6
  };
  
  return (baseScores[category] || 5) * Math.min(matchCount, 3);
};

// Check for conversation patterns (multiple red flags over time)
const analyzeConversationPattern = async (conversationId) => {
  const flaggedMessages = await FlaggedConversation.find({
    conversation: conversationId,
    resolved: false
  });

  if (flaggedMessages.length === 0) return null;

  const totalFlags = flaggedMessages.length;
  const criticalFlags = flaggedMessages.filter(f => f.severity === SEVERITY_LEVELS.CRITICAL).length;
  const highFlags = flaggedMessages.filter(f => f.severity === SEVERITY_LEVELS.HIGH).length;

  let patternSeverity = SEVERITY_LEVELS.LOW;
  
  if (criticalFlags >= 2 || totalFlags >= 5) {
    patternSeverity = SEVERITY_LEVELS.CRITICAL;
  } else if (criticalFlags >= 1 || highFlags >= 3 || totalFlags >= 3) {
    patternSeverity = SEVERITY_LEVELS.HIGH;
  } else if (highFlags >= 2 || totalFlags >= 2) {
    patternSeverity = SEVERITY_LEVELS.MEDIUM;
  }

  return {
    totalFlags,
    criticalFlags,
    highFlags,
    patternSeverity,
    flaggedMessages: flaggedMessages.map(f => ({
      id: f._id,
      severity: f.severity,
      category: f.category,
      createdAt: f.createdAt
    }))
  };
};

// Monitor and flag a message
const monitorMessage = async (messageContent, senderId, conversationId, messageId) => {
  const analysis = analyzeMessage(messageContent, senderId, conversationId);

  if (analysis.hasRedFlags) {
    // Save flagged message
    const flaggedConversation = new FlaggedConversation({
      conversation: conversationId,
      message: messageId,
      sender: senderId,
      category: analysis.flags[0].category, // Primary category
      severity: analysis.severity,
      score: analysis.score,
      flags: analysis.flags,
      messageContent: messageContent,
      status: 'pending', // pending, reviewed, resolved, false_positive
      notified: false
    });

    await flaggedConversation.save();

    // Check for conversation patterns
    const patternAnalysis = await analyzeConversationPattern(conversationId);
    
    if (patternAnalysis && patternAnalysis.patternSeverity === SEVERITY_LEVELS.CRITICAL) {
      // Auto-flag conversation for immediate review
      await FlaggedConversation.updateMany(
        { conversation: conversationId, status: 'pending' },
        { $set: { priority: 'urgent', notified: true } }
      );
    }

    return {
      flagged: true,
      severity: analysis.severity,
      category: analysis.flags[0].category,
      patternAnalysis
    };
  }

  return { flagged: false };
};

// Get statistics for admin dashboard
const getMonitoringStats = async () => {
  const total = await FlaggedConversation.countDocuments();
  const pending = await FlaggedConversation.countDocuments({ status: 'pending' });
  const critical = await FlaggedConversation.countDocuments({ severity: SEVERITY_LEVELS.CRITICAL, status: 'pending' });
  const high = await FlaggedConversation.countDocuments({ severity: SEVERITY_LEVELS.HIGH, status: 'pending' });
  const today = await FlaggedConversation.countDocuments({
    createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
  });

  const byCategory = await FlaggedConversation.aggregate([
    { $match: { status: 'pending' } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  return {
    total,
    pending,
    critical,
    high,
    today,
    byCategory
  };
};

module.exports = {
  monitorMessage,
  analyzeMessage,
  analyzeConversationPattern,
  getMonitoringStats,
  SEVERITY_LEVELS
};

