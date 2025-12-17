# Quick Start Guide

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)
- npm or yarn

## Setup Steps

### 1. Install Dependencies

```bash
npm run install-all
```

This will install dependencies for root, backend, and frontend.

### 2. Configure Environment

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/moela-dating
JWT_SECRET=your-secret-key-change-this-in-production
```

### 3. Start MongoDB

Make sure MongoDB is running:
- **Windows**: Start MongoDB service or run `mongod`
- **Mac/Linux**: `sudo systemctl start mongod` or `brew services start mongodb-community`

### 4. Run the Application

```bash
npm run dev
```

This starts:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

## First Steps

### 1. Create Your Account

1. Go to `http://localhost:3000`
2. Click "Sign Up"
3. Enter your email and password
4. You'll be redirected to the profile page

### 2. Complete Your Profile

Fill out all required fields:
- Basic information (name, age, gender, location)
- Bio
- Hobbies and interests
- Relationship goals
- Lifestyle preferences
- Personality traits

### 3. Generate Matches

1. Go to "Matches" page
2. Click "Generate New Matches"
3. Wait for matches to be calculated

### 4. Admin Approval (For Testing)

To approve matches, you need an admin account:

**Option 1: Using MongoDB Shell**
```javascript
use moela-dating
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

**Option 2: Create Admin User Directly**
1. Register normally
2. Update role in MongoDB as shown above
3. Login as admin
4. Go to Admin Dashboard
5. Approve matches

### 5. Start Conversations

Once matches are approved:
1. Go to Matches page
2. Click "Start Conversation" on an approved match
3. Send messages!

## Testing the App

### User Flow:
1. Register → Complete Profile → Generate Matches → Wait for Admin Approval → Start Conversations

### Admin Flow:
1. Login as Admin → Go to Admin Dashboard → Approve/Reject Matches → Monitor Users

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- Try: `mongodb://127.0.0.1:27017/moela-dating`

### Port Already in Use
- Change `PORT` in backend `.env`
- Update `vite.config.js` proxy target if needed

### CORS Errors
- Ensure backend is running on port 5000
- Check frontend proxy configuration in `vite.config.js`

### No Matches Showing
- Complete your profile (all required fields)
- Generate matches first
- Admin must approve matches before they appear

## Integrating Casesy Styles

1. Copy your casesy CSS files to `frontend/src/styles/`
2. Import them in `frontend/src/index.css`:
   ```css
   @import './styles/casesy/main.css';
   ```
3. Adjust component styles as needed

## Next Steps

- Add photo upload functionality
- Implement real-time messaging with WebSockets
- Add email notifications
- Enhance matching algorithm
- Add search and filters

