import { useState, useEffect } from 'react'
import axios from 'axios'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('matches')
  const [pendingMatches, setPendingMatches] = useState([])
  const [allMatches, setAllMatches] = useState([])
  const [users, setUsers] = useState([])
  const [monitoringStats, setMonitoringStats] = useState(null)
  const [flaggedConversations, setFlaggedConversations] = useState([])
  const [urgentFlags, setUrgentFlags] = useState([])
  const [selectedFlag, setSelectedFlag] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'matches') {
        const [pending, all] = await Promise.all([
          axios.get('/api/admin/matches/pending'),
          axios.get('/api/admin/matches/all')
        ])
        setPendingMatches(pending.data)
        setAllMatches(all.data)
      } else if (activeTab === 'users') {
        const response = await axios.get('/api/admin/users')
        setUsers(response.data)
      } else if (activeTab === 'monitoring') {
        const [stats, flagged, urgent] = await Promise.all([
          axios.get('/api/admin/monitoring/stats'),
          axios.get('/api/admin/monitoring/flagged?status=pending'),
          axios.get('/api/admin/monitoring/urgent')
        ])
        setMonitoringStats(stats.data)
        setFlaggedConversations(flagged.data)
        setUrgentFlags(urgent.data)
      }
    } catch (err) {
      console.error('Failed to fetch data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleApproveMatch = async (matchId, canMessage = true) => {
    try {
      await axios.put(`/api/admin/matches/${matchId}/approve`, { canMessage })
      alert('Match approved successfully!')
      fetchData()
    } catch (err) {
      alert('Failed to approve match')
    }
  }

  const handleRejectMatch = async (matchId) => {
    if (!confirm('Are you sure you want to reject this match?')) return
    
    try {
      await axios.put(`/api/admin/matches/${matchId}/reject`)
      alert('Match rejected')
      fetchData()
    } catch (err) {
      alert('Failed to reject match')
    }
  }

  const handleToggleUserStatus = async (userId, isActive) => {
    try {
      await axios.put(`/api/admin/users/${userId}/status`, { isActive: !isActive })
      fetchData()
    } catch (err) {
      alert('Failed to update user status')
    }
  }

  const handleGenerateAllMatches = async () => {
    setGenerating(true)
    try {
      const response = await axios.post('/api/admin/matches/generate-all')
      alert(response.data.message)
    } catch (err) {
      alert('Failed to generate matches')
    } finally {
      setGenerating(false)
    }
  }

  const handleReviewFlag = async (flagId, status, resolution) => {
    try {
      await axios.put(`/api/admin/monitoring/flagged/${flagId}/review`, {
        status,
        resolution
      })
      alert('Flag reviewed successfully')
      fetchData()
    } catch (err) {
      alert('Failed to review flag')
    }
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Manage matches, users, and system settings</p>
        </div>
      </div>

      <div className="container">
        <div className="admin-tabs">
          <button
            className={activeTab === 'matches' ? 'active' : ''}
            onClick={() => setActiveTab('matches')}
          >
            Matches ({pendingMatches.length} pending)
          </button>
          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            Users ({users.length})
          </button>
          <button
            className={activeTab === 'monitoring' ? 'active' : ''}
            onClick={() => setActiveTab('monitoring')}
          >
            Monitoring
            {urgentFlags.length > 0 && (
              <span className="urgent-badge">{urgentFlags.length}</span>
            )}
          </button>
        </div>

        {activeTab === 'matches' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Pending Matches</h2>
              <button onClick={handleGenerateAllMatches} className="btn btn-primary" disabled={generating}>
                {generating ? 'Generating...' : 'Generate All Matches'}
              </button>
            </div>

            {loading ? (
              <div className="loading">Loading...</div>
            ) : pendingMatches.length === 0 ? (
              <div className="empty-state">No pending matches</div>
            ) : (
              <div className="matches-admin-list">
                {pendingMatches.map((match) => (
                  <div key={match._id} className="admin-match-card">
                    <div className="match-info">
                      <div className="match-users">
                        <div className="user-info">
                          <h4>{match.user1.profile.firstName} {match.user1.profile.lastName}</h4>
                          <p>{match.user1.profile.age} years • {match.user1.profile.location}</p>
                        </div>
                        <div className="match-arrow">↔</div>
                        <div className="user-info">
                          <h4>{match.user2.profile.firstName} {match.user2.profile.lastName}</h4>
                          <p>{match.user2.profile.age} years • {match.user2.profile.location}</p>
                        </div>
                      </div>
                      <div className="match-score-badge">{match.matchScore}% Match</div>
                      <div className="match-factors">
                        <div>Age: {match.matchFactors.ageCompatibility}%</div>
                        <div>Hobbies: {match.matchFactors.hobbySimilarity}%</div>
                        <div>Personality: {match.matchFactors.personalityMatch}%</div>
                        <div>Lifestyle: {match.matchFactors.lifestyleCompatibility}%</div>
                      </div>
                    </div>
                    <div className="match-actions">
                      <button
                        onClick={() => handleApproveMatch(match._id, true)}
                        className="btn btn-primary"
                      >
                        Approve & Allow Messaging
                      </button>
                      <button
                        onClick={() => handleApproveMatch(match._id, false)}
                        className="btn btn-secondary"
                      >
                        Approve (No Messaging)
                      </button>
                      <button
                        onClick={() => handleRejectMatch(match._id)}
                        className="btn btn-outline"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="section-header" style={{ marginTop: '40px' }}>
              <h2>All Approved Matches</h2>
            </div>
            {allMatches.filter(m => m.adminApproved).length === 0 ? (
              <div className="empty-state">No approved matches</div>
            ) : (
              <div className="matches-admin-list">
                {allMatches.filter(m => m.adminApproved).map((match) => (
                  <div key={match._id} className="admin-match-card approved">
                    <div className="match-info">
                      <div className="match-users">
                        <div className="user-info">
                          <h4>{match.user1.profile.firstName} {match.user1.profile.lastName}</h4>
                        </div>
                        <div className="match-arrow">↔</div>
                        <div className="user-info">
                          <h4>{match.user2.profile.firstName} {match.user2.profile.lastName}</h4>
                        </div>
                      </div>
                      <div className="match-score-badge">{match.matchScore}% Match</div>
                      <div className="match-status">
                        {match.canMessage ? '✓ Messaging Enabled' : 'Messaging Disabled'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-section">
            <h2>All Users</h2>
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Location</th>
                      <th>Profile Complete</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.email}</td>
                        <td>{user.profile?.firstName} {user.profile?.lastName}</td>
                        <td>{user.profile?.age || '-'}</td>
                        <td>{user.profile?.location || '-'}</td>
                        <td>{user.profile?.isProfileComplete ? '✓' : '✗'}</td>
                        <td>
                          <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleToggleUserStatus(user._id, user.isActive)}
                            className={`btn btn-sm ${user.isActive ? 'btn-secondary' : 'btn-primary'}`}
                          >
                            {user.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="admin-section">
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <>
                {/* Statistics Dashboard */}
                {monitoringStats && (
                  <div className="monitoring-stats">
                    <div className="stat-card critical">
                      <h3>{monitoringStats.critical || 0}</h3>
                      <p>Critical Flags</p>
                    </div>
                    <div className="stat-card high">
                      <h3>{monitoringStats.high || 0}</h3>
                      <p>High Priority</p>
                    </div>
                    <div className="stat-card pending">
                      <h3>{monitoringStats.pending || 0}</h3>
                      <p>Pending Review</p>
                    </div>
                    <div className="stat-card today">
                      <h3>{monitoringStats.today || 0}</h3>
                      <p>Today's Flags</p>
                    </div>
                  </div>
                )}

                {/* Urgent Flags Alert */}
                {urgentFlags.length > 0 && (
                  <div className="urgent-alert">
                    <h2>🚨 Urgent: {urgentFlags.length} Critical/High Priority Flags</h2>
                    <div className="urgent-flags-list">
                      {urgentFlags.map((flag) => (
                        <div key={flag._id} className="urgent-flag-card">
                          <div className="flag-header">
                            <span className={`severity-badge ${flag.severity}`}>
                              {flag.severity.toUpperCase()}
                            </span>
                            <span className="category-badge">{flag.category}</span>
                            <span className="flag-time">
                              {new Date(flag.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="flagged-message">"{flag.messageContent}"</p>
                          <button
                            onClick={() => setSelectedFlag(flag._id)}
                            className="btn btn-primary btn-sm"
                          >
                            Review
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Flagged Conversations */}
                <div className="section-header">
                  <h2>All Flagged Conversations</h2>
                </div>
                {flaggedConversations.length === 0 ? (
                  <div className="empty-state">No flagged conversations</div>
                ) : (
                  <div className="flagged-list">
                    {flaggedConversations.map((flag) => (
                      <div key={flag._id} className={`flagged-card ${flag.severity}`}>
                        <div className="flagged-header">
                          <div>
                            <span className={`severity-badge ${flag.severity}`}>
                              {flag.severity.toUpperCase()}
                            </span>
                            <span className="category-badge">{flag.category}</span>
                            {flag.priority === 'urgent' && (
                              <span className="priority-badge">URGENT</span>
                            )}
                          </div>
                          <span className="flag-time">
                            {new Date(flag.createdAt).toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flagged-content">
                          <div className="flagged-user">
                            <strong>From:</strong> {flag.sender?.email || 'Unknown'}
                            {flag.sender?.profile?.firstName && (
                              <span> ({flag.sender.profile.firstName} {flag.sender.profile.lastName})</span>
                            )}
                          </div>
                          <div className="flagged-message">
                            <strong>Message:</strong> "{flag.messageContent}"
                          </div>
                          <div className="flag-score">
                            Risk Score: {flag.score} | Matches: {flag.flags?.length || 0}
                          </div>
                        </div>

                        <div className="flagged-actions">
                          <button
                            onClick={() => handleReviewFlag(flag._id, 'reviewed', 'no_action')}
                            className="btn btn-secondary btn-sm"
                          >
                            Mark Reviewed
                          </button>
                          <button
                            onClick={() => handleReviewFlag(flag._id, 'false_positive', 'false_positive')}
                            className="btn btn-outline btn-sm"
                          >
                            False Positive
                          </button>
                          <button
                            onClick={() => setSelectedFlag(flag._id)}
                            className="btn btn-primary btn-sm"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard

