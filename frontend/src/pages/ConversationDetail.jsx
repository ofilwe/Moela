import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import './ConversationDetail.css'

const ConversationDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [conversation, setConversation] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    fetchConversation()
    const interval = setInterval(fetchConversation, 5000) // Poll every 5 seconds
    return () => clearInterval(interval)
  }, [id])

  useEffect(() => {
    scrollToBottom()
  }, [conversation])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchConversation = async () => {
    try {
      const response = await axios.get(`/api/conversations/${id}`)
      setConversation(response.data)
    } catch (err) {
      console.error('Failed to load conversation:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!message.trim() || sending) return

    setSending(true)
    try {
      await axios.post(`/api/conversations/${id}/messages`, { content: message })
      setMessage('')
      await fetchConversation()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const getOtherUser = () => {
    if (!conversation?.participants) return null
    return conversation.participants.find(p => p._id !== user.id)
  }

  if (loading) {
    return <div className="loading">Loading conversation...</div>
  }

  if (!conversation) {
    return <div className="error">Conversation not found</div>
  }

  const otherUser = getOtherUser()

  return (
    <div className="main-content">
      <div className="conversation-detail">
        <div className="conversation-header-bar">
          <div className="container">
            <button onClick={() => navigate('/conversations')} className="back-btn">
              ← Back
            </button>
            <h2>
              {otherUser?.profile?.firstName} {otherUser?.profile?.lastName}
            </h2>
          </div>
        </div>

        <div className="messages-container">
          <div className="messages-list">
            {conversation.messages && conversation.messages.length > 0 ? (
              conversation.messages.map((msg) => {
                const isOwn = msg.sender._id === user.id
                return (
                  <div key={msg._id} className={`message ${isOwn ? 'own' : 'other'}`}>
                    <div className="message-content">
                      <p>{msg.content}</p>
                      <span className="message-time">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="no-messages">
                <p>No messages yet. Start the conversation!</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="message-input-form">
            <div className="container">
              <div className="message-input-container">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="message-input"
                  disabled={sending}
                />
                <button type="submit" className="btn btn-primary" disabled={sending || !message.trim()}>
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConversationDetail

