# Moela Dating App

A modern dating application with intelligent matching and admin-controlled conversations.

## Features

- **User Authentication**: Secure registration and login system
- **Profile Management**: Comprehensive profile creation and editing
- **Intelligent Matching**: Advanced algorithm considering age, hobbies, lifestyle, personality, location, and relationship goals
- **Admin Approval**: Admin-controlled match approval and messaging permissions
- **Messaging System**: Real-time conversations between approved matches
- **Admin Dashboard**: Complete admin panel for managing users and matches

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React 18
- React Router
- Axios for API calls
- Vite for build tooling

## Installation

1. **Clone the repository** (if applicable)

2. **Install dependencies**:
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**:
   - Copy `backend/.env.example` to `backend/.env`
   - Update the values in `.env` file

4. **Start MongoDB**:
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017/moela-dating`

5. **Run the application**:
   ```bash
   npm run dev
   ```
   This will start both backend (port 5000) and frontend (port 3000) servers.

## Project Structure

```
Moela App/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── services/        # Business logic (matching algorithm)
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── contexts/    # React contexts (Auth)
│   │   └── App.jsx      # Main app component
│   └── package.json
└── package.json         # Root package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### User Profile
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Matches
- `GET /api/matches` - Get approved matches for current user
- `POST /api/matches/generate` - Generate matches for current user

### Conversations
- `GET /api/conversations` - Get all conversations
- `GET /api/conversations/:id` - Get specific conversation
- `POST /api/conversations` - Create new conversation
- `POST /api/conversations/:id/messages` - Send message

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/matches/pending` - Get pending matches
- `GET /api/admin/matches/all` - Get all matches
- `PUT /api/admin/matches/:id/approve` - Approve match
- `PUT /api/admin/matches/:id/reject` - Reject match
- `PUT /api/admin/users/:id/status` - Update user status
- `POST /api/admin/matches/generate-all` - Generate matches for all users

## Matching Algorithm

The matching algorithm considers:
- **Age Compatibility** (15%): Age difference scoring
- **Hobby Similarity** (20%): Common interests
- **Lifestyle Compatibility** (15%): Smoking, drinking, exercise preferences
- **Personality Match** (25%): Personality trait compatibility
- **Location Proximity** (10%): Geographic proximity
- **Relationship Goals** (15%): Compatibility of relationship intentions

## Admin Features

- View and approve/reject pending matches
- Enable/disable messaging for matches
- View all users and manage their status
- Generate matches for all users
- Monitor system activity

## Creating an Admin User

To create an admin user, you can use MongoDB directly or create a script:

```javascript
// In MongoDB shell or script
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Development

- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:3000`
- Frontend proxies API requests to backend automatically

## Notes

- The app uses JWT tokens stored in localStorage for authentication
- All routes except auth require authentication
- Admin routes require admin role
- Matches must be approved by admin before users can see them
- Messaging requires admin approval even after match approval

## Future Enhancements

- Real-time messaging with WebSockets
- Photo upload functionality
- Advanced search and filters
- Push notifications
- Mobile app version
- Enhanced matching with machine learning

