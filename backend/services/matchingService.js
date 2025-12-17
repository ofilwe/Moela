const User = require('../models/User');
const Match = require('../models/Match');

// Calculate age compatibility score (0-100)
const calculateAgeCompatibility = (age1, age2) => {
  const ageDiff = Math.abs(age1 - age2);
  if (ageDiff === 0) return 100;
  if (ageDiff <= 2) return 90;
  if (ageDiff <= 5) return 75;
  if (ageDiff <= 10) return 60;
  if (ageDiff <= 15) return 40;
  return 20;
};

// Calculate hobby similarity score (0-100)
const calculateHobbySimilarity = (hobbies1, hobbies2) => {
  if (!hobbies1 || !hobbies2 || hobbies1.length === 0 || hobbies2.length === 0) {
    return 50; // Neutral score if no hobbies
  }

  const set1 = new Set(hobbies1.map(h => h.toLowerCase().trim()));
  const set2 = new Set(hobbies2.map(h => h.toLowerCase().trim()));
  
  const intersection = [...set1].filter(h => set2.has(h));
  const union = new Set([...set1, ...set2]);
  
  if (union.size === 0) return 50;
  
  return Math.round((intersection.length / union.size) * 100);
};

// Calculate lifestyle compatibility score (0-100)
const calculateLifestyleCompatibility = (lifestyle1, lifestyle2) => {
  let score = 0;
  let factors = 0;

  const factorsToCheck = ['smoking', 'drinking', 'exercise'];
  
  factorsToCheck.forEach(factor => {
    if (lifestyle1[factor] && lifestyle2[factor]) {
      factors++;
      if (lifestyle1[factor] === lifestyle2[factor]) {
        score += 100;
      } else {
        // Partial match for similar preferences
        const values = ['never', 'sometimes', 'regularly'];
        const idx1 = values.indexOf(lifestyle1[factor]);
        const idx2 = values.indexOf(lifestyle2[factor]);
        const diff = Math.abs(idx1 - idx2);
        score += diff === 1 ? 50 : 0;
      }
    }
  });

  return factors > 0 ? Math.round(score / factors) : 50;
};

// Calculate personality match score (0-100)
const calculatePersonalityMatch = (personality1, personality2) => {
  let totalScore = 0;
  let factors = 0;

  const traits = ['introvert', 'adventurous', 'romantic', 'senseOfHumor'];
  
  traits.forEach(trait => {
    if (personality1[trait] !== undefined && personality2[trait] !== undefined) {
      factors++;
      const diff = Math.abs(personality1[trait] - personality2[trait]);
      // Closer values = higher score
      totalScore += 100 - (diff * 10);
    }
  });

  return factors > 0 ? Math.max(0, Math.min(100, Math.round(totalScore / factors))) : 50;
};

// Calculate location proximity score (0-100)
const calculateLocationProximity = (location1, location2) => {
  if (!location1 || !location2) return 50;
  
  // Simple string matching for now (can be enhanced with geocoding)
  const loc1 = location1.toLowerCase().trim();
  const loc2 = location2.toLowerCase().trim();
  
  if (loc1 === loc2) return 100;
  
  // Check if locations share common words (e.g., "Gaborone" in "Gaborone, Botswana")
  const words1 = loc1.split(/[,\s]+/);
  const words2 = loc2.split(/[,\s]+/);
  const commonWords = words1.filter(w => words2.includes(w) && w.length > 2);
  
  if (commonWords.length > 0) return 75;
  
  return 30; // Different locations
};

// Calculate relationship goals match score (0-100)
const calculateRelationshipGoalsMatch = (goal1, goal2) => {
  if (!goal1 || !goal2) return 50;
  
  if (goal1 === goal2) return 100;
  
  // Compatibility matrix
  const compatibility = {
    'serious': { 'serious': 100, 'not-sure': 60, 'casual': 30, 'friendship': 20 },
    'casual': { 'casual': 100, 'not-sure': 70, 'serious': 30, 'friendship': 40 },
    'friendship': { 'friendship': 100, 'not-sure': 50, 'casual': 40, 'serious': 20 },
    'not-sure': { 'not-sure': 100, 'serious': 60, 'casual': 70, 'friendship': 50 }
  };
  
  return compatibility[goal1]?.[goal2] || 50;
};

// Main matching function
const calculateMatchScore = (user1, user2) => {
  const profile1 = user1.profile;
  const profile2 = user2.profile;

  // Check gender compatibility
  if (profile1.interestedIn && profile2.gender) {
    if (profile1.interestedIn !== 'both' && profile1.interestedIn !== profile2.gender) {
      return null; // Not compatible
    }
  }
  if (profile2.interestedIn && profile1.gender) {
    if (profile2.interestedIn !== 'both' && profile2.interestedIn !== profile1.gender) {
      return null; // Not compatible
    }
  }

  const ageCompatibility = calculateAgeCompatibility(profile1.age || 25, profile2.age || 25);
  const hobbySimilarity = calculateHobbySimilarity(profile1.hobbies || [], profile2.hobbies || []);
  const lifestyleCompatibility = calculateLifestyleCompatibility(
    profile1.lifestyle || {},
    profile2.lifestyle || {}
  );
  const personalityMatch = calculatePersonalityMatch(
    profile1.personality || {},
    profile2.personality || {}
  );
  const locationProximity = calculateLocationProximity(profile1.location, profile2.location);
  const relationshipGoalsMatch = calculateRelationshipGoalsMatch(
    profile1.relationshipGoals,
    profile2.relationshipGoals
  );

  // Weighted average
  const weights = {
    ageCompatibility: 0.15,
    hobbySimilarity: 0.20,
    lifestyleCompatibility: 0.15,
    personalityMatch: 0.25,
    locationProximity: 0.10,
    relationshipGoalsMatch: 0.15
  };

  const totalScore = Math.round(
    ageCompatibility * weights.ageCompatibility +
    hobbySimilarity * weights.hobbySimilarity +
    lifestyleCompatibility * weights.lifestyleCompatibility +
    personalityMatch * weights.personalityMatch +
    locationProximity * weights.locationProximity +
    relationshipGoalsMatch * weights.relationshipGoalsMatch
  );

  return {
    matchScore: totalScore,
    matchFactors: {
      ageCompatibility,
      hobbySimilarity,
      lifestyleCompatibility,
      personalityMatch,
      locationProximity,
      relationshipGoalsMatch
    }
  };
};

// Find matches for a user
const findMatchesForUser = async (userId, minScore = 60) => {
  try {
    const user = await User.findById(userId);
    if (!user || !user.profile.isProfileComplete) {
      return [];
    }

    // Get all other users with complete profiles
    const otherUsers = await User.find({
      _id: { $ne: userId },
      'profile.isProfileComplete': true,
      isActive: true
    });

    const matches = [];

    for (const otherUser of otherUsers) {
      // Check if match already exists
      const existingMatch = await Match.findOne({
        $or: [
          { user1: userId, user2: otherUser._id },
          { user1: otherUser._id, user2: userId }
        ]
      });

      if (existingMatch) {
        // Update match score
        const matchData = calculateMatchScore(user, otherUser);
        if (matchData && matchData.matchScore >= minScore) {
          existingMatch.matchScore = matchData.matchScore;
          existingMatch.matchFactors = matchData.matchFactors;
          await existingMatch.save();
          matches.push(existingMatch);
        }
      } else {
        // Create new match
        const matchData = calculateMatchScore(user, otherUser);
        if (matchData && matchData.matchScore >= minScore) {
          const match = new Match({
            user1: userId,
            user2: otherUser._id,
            matchScore: matchData.matchScore,
            matchFactors: matchData.matchFactors
          });
          await match.save();
          matches.push(match);
        }
      }
    }

    // Sort by match score descending
    matches.sort((a, b) => b.matchScore - a.matchScore);

    return matches;
  } catch (error) {
    console.error('Error finding matches:', error);
    throw error;
  }
};

module.exports = {
  calculateMatchScore,
  findMatchesForUser
};

