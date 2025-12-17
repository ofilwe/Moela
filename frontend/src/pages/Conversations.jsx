import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import './Conversations.css'

const Conversations = () => {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    try {
      const response = await axios.get('/api/conversations')
      setConversations(response.data)
    } catch (err) {
      console.error('Failed to load conversations:', err)
    } finally {
      setLoading(false)
    }
  }

  const getOtherUser = (conversation) => {
    if (!conversation.participants) return null
    return conversation.participants.find(p => p._id !== user.id)
  }

  const getLastMessage = (conversation) => {
    if (!conversation.messages || conversation.messages.length === 0) {
      return 'No messages yet'
    }
    const lastMsg = conversation.messages[conversation.messages.length - 1]
    return lastMsg.content
  }

  if (loading) {
    return <div className="loading">Loading conversations...</div>
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <div className="container">
          <h1>Messages</h1>
          <p>Your conversations</p>
        </div>
      </div>

      <div className="container">
        {conversations.length === 0 ? (
          <div className="no-conversations">
            <h2>No conversations yet</h2>
            <p>Start a conversation with your matches!</p>
            <Link to="/matches" className="btn btn-primary">View Matches</Link>
          </div>
        ) : (
          <div className="conversations-list">
            {conversations.map((conversation) => {
              const otherUser = getOtherUser(conversation)
              if (!otherUser) return null

              return (
                <Link
                  key={conversation._id}
                  to={`/conversations/${conversation._id}`}
                  className="conversation-item"
                >
                  <div className="conversation-avatar">
                    {otherUser.profile?.firstName?.[0] || 'U'}
                  </div>
                  <div className="conversation-content">
                    <div className="conversation-header">
                      <h3>
                        {otherUser.profile?.firstName} {otherUser.profile?.lastName}
                      </h3>
                      <span className="conversation-time">
                        {new Date(conversation.lastMessage).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="conversation-preview">{getLastMessage(conversation)}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Conversations

