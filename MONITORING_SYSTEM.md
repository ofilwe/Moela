# Intelligent Conversation Monitoring System

## Overview

The Moela dating app now includes an intelligent conversation monitoring system that automatically analyzes messages in real-time and alerts admins about potential red flags, ensuring user safety and platform integrity.

## Features

### 🔍 Real-Time Message Analysis
- Every message sent is automatically analyzed for red flags
- Analysis happens asynchronously (doesn't slow down messaging)
- Multiple detection categories for comprehensive monitoring

### 🚨 Red Flag Detection Categories

1. **Inappropriate Content**
   - Sexual content, explicit language
   - Inappropriate requests

2. **Harassment & Threats**
   - Threatening language
   - Abusive or demeaning comments
   - Violent content

3. **Financial Scams**
   - Money requests
   - Investment schemes
   - Cryptocurrency scams
   - Urgent financial requests

4. **Personal Information Requests**
   - Requests for phone numbers, addresses
   - Credit card or bank information
   - Social security numbers

5. **Spam**
   - Suspicious links
   - Promotional content
   - Phishing attempts

6. **Aggressive Behavior**
   - Excessive use of caps
   - Multiple exclamation marks
   - Demanding language

### 📊 Severity Levels

- **LOW**: Minor issues, may be false positives
- **MEDIUM**: Concerning content, needs review
- **HIGH**: Serious red flags, urgent review needed
- **CRITICAL**: Immediate action required

### 🎯 Intelligent Scoring System

Each message receives a risk score based on:
- Number of red flag patterns detected
- Category of red flags (some are more serious)
- Frequency of matches
- Message length and context
- Pattern analysis across conversation history

### 📈 Pattern Detection

The system tracks patterns across conversations:
- Multiple red flags from the same user
- Escalating severity over time
- Repeated violations
- Automatically flags conversations with critical patterns

## Admin Dashboard Features

### Statistics Overview
- Total flagged conversations
- Critical/High priority flags
- Pending reviews
- Today's flags
- Breakdown by category

### Urgent Alerts
- Critical and high-priority flags highlighted
- Immediate visibility for serious issues
- Quick access to review and take action

### Flag Management
- View all flagged conversations
- See full message context
- Review and resolve flags
- Mark as false positive
- Take actions (suspend user, block conversation, etc.)

## How It Works

### 1. Message Monitoring
When a user sends a message:
```javascript
// Message is sent and saved
// Monitoring service analyzes it in the background
// If red flags detected, creates a FlaggedConversation record
// Admin is notified (via dashboard)
```

### 2. Pattern Analysis
The system checks:
- Individual message flags
- Conversation history
- User behavior patterns
- Escalation detection

### 3. Admin Review
Admins can:
- View flagged messages with context
- See conversation history
- Review pattern analysis
- Take appropriate action

## Admin Actions

When reviewing flagged conversations, admins can:

1. **Mark as Reviewed** - No action needed
2. **Mark as False Positive** - System incorrectly flagged
3. **Suspend User** - Temporarily disable user account
4. **Block Conversation** - Prevent further messaging
5. **Send Warning** - Notify user about inappropriate behavior

## API Endpoints

### Monitoring Statistics
```
GET /api/admin/monitoring/stats
```
Returns overall monitoring statistics

### Get Flagged Conversations
```
GET /api/admin/monitoring/flagged?status=pending&severity=high
```
Get all flagged conversations with filters

### Get Urgent Flags
```
GET /api/admin/monitoring/urgent
```
Get critical and high-priority flags

### Review Flag
```
PUT /api/admin/monitoring/flagged/:id/review
Body: { status, resolution, adminNotes }
```

### Take Action
```
POST /api/admin/monitoring/flagged/:id/action
Body: { action: 'suspend_user' | 'block_conversation' | 'warn_user', userId, conversationId }
```

## Configuration

### Customizing Red Flag Patterns

Edit `backend/services/conversationMonitor.js`:

```javascript
const RED_FLAG_PATTERNS = {
  // Add your custom patterns
  customCategory: [
    /\b(your pattern here)\b/gi,
  ],
};
```

### Adjusting Severity Thresholds

Modify the scoring system in `analyzeMessage()` function:
```javascript
// Current thresholds
if (totalScore >= 50) severity = 'critical';
else if (totalScore >= 30) severity = 'high';
// Adjust these values as needed
```

## Best Practices

1. **Regular Review**: Check the monitoring dashboard daily
2. **False Positives**: Mark false positives to improve system accuracy
3. **Pattern Recognition**: Pay attention to users with multiple flags
4. **Context Matters**: Review full conversations, not just flagged messages
5. **User Safety First**: When in doubt, err on the side of caution

## Future Enhancements

Potential improvements:
- Machine learning for better pattern recognition
- Sentiment analysis
- Image content analysis (when photo sharing is added)
- Automated responses for certain flag types
- Email notifications for critical flags
- User reporting system integration
- Advanced analytics and trends

## Privacy & Security

- All monitoring is done server-side
- Flagged content is only visible to admins
- User privacy is maintained
- No content is stored unnecessarily
- Complies with data protection regulations

## Testing the System

To test the monitoring system:

1. Create two test accounts
2. Start a conversation between them
3. Send messages with red flag keywords:
   - "I need money urgently"
   - "Send me your phone number"
   - "Click here for free prize"
4. Check Admin Dashboard → Monitoring tab
5. Review the flagged messages

## Support

For issues or questions about the monitoring system:
- Check server logs for monitoring errors
- Review flagged conversations for patterns
- Adjust detection patterns as needed
- Contact system administrator for critical issues

