import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Matches.css'

const Matches = () => {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [generating, setGenerating] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchMatches()
  }, [])

  const fetchMatches = async () => {
    try {
      const response = await axios.get('/api/matches')
      setMatches(response.data)
    } catch (err) {
      setError('Failed to load matches')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateMatches = async () => {
    setGenerating(true)
    try {
      await axios.post('/api/matches/generate')
      await fetchMatches()
      alert('Matches generated successfully!')
    } catch (err) {
      alert('Failed to generate matches')
    } finally {
      setGenerating(false)
    }
  }

  const handleStartConversation = async (matchId) => {
    try {
      const response = await axios.post('/api/conversations', { matchId })
      navigate(`/conversations/${response.data._id}`)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to start conversation')
    }
  }

  if (loading) {
    return <div className="loading">Loading matches...</div>
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <div className="container">
          <h1>Your Matches</h1>
          <p>People who might be a great match for you</p>
        </div>
      </div>

      <div className="container">
        <div className="matches-actions">
          <button onClick={handleGenerateMatches} className="btn btn-primary" disabled={generating}>
            {generating ? 'Generating...' : 'Generate New Matches'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {matches.length === 0 ? (
          <div className="no-matches">
            <h2>No matches yet</h2>
            <p>Complete your profile and generate matches to see potential partners!</p>
            <button onClick={handleGenerateMatches} className="btn btn-primary" disabled={generating}>
              {generating ? 'Generating...' : 'Generate Matches'}
            </button>
          </div>
        ) : (
          <div className="matches-grid">
            {matches.map((match) => (
              <div key={match._id} className="match-card">
                <div className="match-header">
                  <div className="match-score">
                    <span className="score-value">{match.matchScore}%</span>
                    <span className="score-label">Match</span>
                  </div>
                </div>
                
                <div className="match-content">
                  <h3>{match.otherUser.profile.firstName} {match.otherUser.profile.lastName}</h3>
                  <p className="match-age">{match.otherUser.profile.age} years old</p>
                  <p className="match-location">{match.otherUser.profile.location}</p>
                  
                  {match.otherUser.profile.bio && (
                    <p className="match-bio">{match.otherUser.profile.bio}</p>
                  )}

                  {match.otherUser.profile.hobbies && match.otherUser.profile.hobbies.length > 0 && (
                    <div className="match-hobbies">
                      {match.otherUser.profile.hobbies.slice(0, 3).map((hobby, idx) => (
                        <span key={idx} className="hobby-badge">{hobby}</span>
                      ))}
                    </div>
                  )}

                  <div className="match-factors">
                    <h4>Compatibility Factors:</h4>
                    <div className="factors-list">
                      <div className="factor-item">
                        <span>Age Compatibility</span>
                        <span>{match.matchFactors.ageCompatibility}%</span>
                      </div>
                      <div className="factor-item">
                        <span>Hobby Similarity</span>
                        <span>{match.matchFactors.hobbySimilarity}%</span>
                      </div>
                      <div className="factor-item">
                        <span>Personality Match</span>
                        <span>{match.matchFactors.personalityMatch}%</span>
                      </div>
                      <div className="factor-item">
                        <span>Lifestyle</span>
                        <span>{match.matchFactors.lifestyleCompatibility}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="match-actions">
                  {match.canMessage ? (
                    <button
                      onClick={() => handleStartConversation(match._id)}
                      className="btn btn-primary"
                    >
                      Start Conversation
                    </button>
                  ) : (
                    <button className="btn btn-secondary" disabled>
                      Waiting for Approval
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Matches

