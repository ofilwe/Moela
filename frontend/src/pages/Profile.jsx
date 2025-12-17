import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import './Profile.css'

const Profile = () => {
  const { user: authUser, fetchUser } = useAuth()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    interestedIn: '',
    work: '',
    occupation: '',
    hobbies: [],
    bio: '',
    location: '',
    education: '',
    relationshipGoals: '',
    lifestyle: {
      smoking: '',
      drinking: '',
      exercise: ''
    },
    personality: {
      introvert: 5,
      adventurous: 5,
      romantic: 5,
      senseOfHumor: 5
    }
  })

  const [hobbyInput, setHobbyInput] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/users/profile')
      setUser(response.data)
      const profile = response.data.profile || {}
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        age: profile.age || '',
        gender: profile.gender || '',
        interestedIn: profile.interestedIn || '',
        work: profile.work || '',
        occupation: profile.occupation || '',
        hobbies: profile.hobbies || [],
        bio: profile.bio || '',
        location: profile.location || '',
        education: profile.education || '',
        relationshipGoals: profile.relationshipGoals || '',
        lifestyle: {
          smoking: profile.lifestyle?.smoking || '',
          drinking: profile.lifestyle?.drinking || '',
          exercise: profile.lifestyle?.exercise || ''
        },
        personality: {
          introvert: profile.personality?.introvert || 5,
          adventurous: profile.personality?.adventurous || 5,
          romantic: profile.personality?.romantic || 5,
          senseOfHumor: profile.personality?.senseOfHumor || 5
        }
      })
    } catch (err) {
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAddHobby = () => {
    if (hobbyInput.trim() && !formData.hobbies.includes(hobbyInput.trim())) {
      setFormData(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, hobbyInput.trim()]
      }))
      setHobbyInput('')
    }
  }

  const handleRemoveHobby = (hobby) => {
    setFormData(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter(h => h !== hobby)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      await axios.put('/api/users/profile', formData)
      setSuccess('Profile updated successfully!')
      await fetchUser()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading profile...</div>
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <div className="container">
          <h1>My Profile</h1>
          <p>Update your information to help us find better matches</p>
        </div>
      </div>

      <div className="container">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="card">
            <h2>Basic Information</h2>
            <div className="grid grid-2">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="18"
                  max="100"
                  required
                />
              </div>
              <div className="form-group">
                <label>Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Interested In *</label>
                <select name="interestedIn" value={formData.interestedIn} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  required
                />
              </div>
            </div>
          </div>

          <div className="card">
            <h2>Work & Education</h2>
            <div className="grid grid-2">
              <div className="form-group">
                <label>Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div className="form-group">
                <label>Work</label>
                <input
                  type="text"
                  name="work"
                  value={formData.work}
                  onChange={handleChange}
                  placeholder="e.g., Tech Company"
                />
              </div>
              <div className="form-group">
                <label>Education</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="e.g., Bachelor's Degree"
                />
              </div>
            </div>
          </div>

          <div className="card">
            <h2>About Me</h2>
            <div className="form-group">
              <label>Bio *</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                maxLength={500}
                required
              />
              <small>{formData.bio.length}/500 characters</small>
            </div>
            <div className="form-group">
              <label>Hobbies & Interests</label>
              <div className="hobby-input">
                <input
                  type="text"
                  value={hobbyInput}
                  onChange={(e) => setHobbyInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHobby())}
                  placeholder="Add a hobby"
                />
                <button type="button" onClick={handleAddHobby} className="btn btn-primary">
                  Add
                </button>
              </div>
              <div className="hobbies-list">
                {formData.hobbies.map((hobby, idx) => (
                  <span key={idx} className="hobby-tag">
                    {hobby}
                    <button type="button" onClick={() => handleRemoveHobby(hobby)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <h2>Relationship Goals</h2>
            <div className="form-group">
              <label>What are you looking for?</label>
              <select name="relationshipGoals" value={formData.relationshipGoals} onChange={handleChange}>
                <option value="">Select</option>
                <option value="serious">Serious Relationship</option>
                <option value="casual">Casual Dating</option>
                <option value="friendship">Friendship</option>
                <option value="not-sure">Not Sure</option>
              </select>
            </div>
          </div>

          <div className="card">
            <h2>Lifestyle</h2>
            <div className="grid grid-3">
              <div className="form-group">
                <label>Smoking</label>
                <select name="lifestyle.smoking" value={formData.lifestyle.smoking} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="never">Never</option>
                  <option value="sometimes">Sometimes</option>
                  <option value="regularly">Regularly</option>
                </select>
              </div>
              <div className="form-group">
                <label>Drinking</label>
                <select name="lifestyle.drinking" value={formData.lifestyle.drinking} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="never">Never</option>
                  <option value="sometimes">Sometimes</option>
                  <option value="regularly">Regularly</option>
                </select>
              </div>
              <div className="form-group">
                <label>Exercise</label>
                <select name="lifestyle.exercise" value={formData.lifestyle.exercise} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="never">Never</option>
                  <option value="sometimes">Sometimes</option>
                  <option value="regularly">Regularly</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>Personality Traits</h2>
            <p className="section-description">Rate yourself from 1-10</p>
            <div className="grid grid-2">
              {Object.entries(formData.personality).map(([trait, value]) => (
                <div key={trait} className="form-group">
                  <label>
                    {trait.charAt(0).toUpperCase() + trait.slice(1).replace(/([A-Z])/g, ' $1')}
                    <span className="trait-value">{value}/10</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={value}
                    onChange={(e) => handleChange({
                      target: { name: `personality.${trait}`, value: parseInt(e.target.value) }
                    })}
                    className="slider"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile

