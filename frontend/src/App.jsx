import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Matches from './pages/Matches'
import AdminDashboard from './pages/AdminDashboard'
import Conversations from './pages/Conversations'
import ConversationDetail from './pages/ConversationDetail'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/matches"
              element={
                <PrivateRoute>
                  <Matches />
                </PrivateRoute>
              }
            />
            <Route
              path="/conversations"
              element={
                <PrivateRoute>
                  <Conversations />
                </PrivateRoute>
              }
            />
            <Route
              path="/conversations/:id"
              element={
                <PrivateRoute>
                  <ConversationDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="/" element={<Navigate to="/matches" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

