import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand app-brand">
            <div className="app-brand__logo">
              <img src="/logo.png" alt="Moela Logo" />
            </div>
            <div>
              <div className="app-brand__title">Moela</div>
              <div className="app-brand__subtitle">Dating</div>
            </div>
          </Link>
          
          {user ? (
            <div className="navbar-menu">
              <Link to="/matches" className="nav-link">Matches</Link>
              <Link to="/conversations" className="nav-link">Messages</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-link admin-link">Admin</Link>
              )}
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-menu">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

