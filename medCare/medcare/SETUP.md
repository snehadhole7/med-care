# MedCare Project - Setup Instructions

## Quick Start Guide

### 1. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start MongoDB (if using local)
mongod

# Run the server
npm start
```

Server runs on: `http://localhost:5000`

### 2. Frontend Setup

Open `frontend/index.html` in a web browser or use a local server:

```bash
# Using Python (Python 3)
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Access at: `http://localhost:8000`

### 3. Database Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB
# macOS: brew install mongodb-community
# Windows: Download from https://www.mongodb.com/try/download/community

# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `.env` file

### 4. Environment Configuration

Edit `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medicare
JWT_SECRET=change_this_to_a_strong_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### 5. Add Sample Data

**Option A: Using MongoDB Shell**
```bash
mongosh
use medicare
db.diseases.insertMany([...diseases from SAMPLE_DATA.js...])
```

**Option B: Using Admin API**
1. Create admin user via POST `/api/auth/register`
2. Login to get JWT token
3. Use POST `/api/admin/diseases` to add diseases

### 6. Test the System

1. Open `http://localhost:8000`
2. Register a new user
3. Login
4. Try disease checker with symptoms: "fever, cough, fatigue"
5. Book an appointment
6. Login as admin to view analytics

## 🔧 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in .env
- Verify MongoDB port (default: 27017)

### CORS Errors
- Backend CORS middleware is configured
- Ensure frontend and backend URLs match in `common.js`

### API 404 Errors
- Check if backend is running on port 5000
- Verify endpoint paths
- Check authorization headers

### Database Not Found
- Create database manually: `use medicare`
- Or it will auto-create on first insert

## 📚 API Testing

Use Postman or curl to test APIs:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@medcare.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@medcare.com","password":"123456"}'

# Check Disease (with token)
curl -X POST http://localhost:5000/api/diseases/check \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [token]" \
  -d '{"symptoms":["fever","cough"]}'
```

## 📱 File Structure Reminder

```
medicare/
├── backend/          (Node.js API Server)
├── frontend/         (Web UI)
├── README.md        (Full Documentation)
├── SETUP.md         (This file)
└── SAMPLE_DATA.js   (Test data)
```

## ✅ Verification Checklist

- [ ] Node.js installed
- [ ] MongoDB installed/configured
- [ ] Backend dependencies installed
- [ ] .env file configured
- [ ] MongoDB running
- [ ] Backend server running on :5000
- [ ] Frontend accessible on :8000
- [ ] Can register user
- [ ] Can login
- [ ] Disease checker works
- [ ] Can view admin dashboard

## 🆘 Support

If you encounter issues:
1. Check error messages in browser console
2. Check backend server logs
3. Verify MongoDB connection
4. Ensure all ports are available
5. Review API endpoint paths
6. Check authorization headers

---

**Ready to go?** Start the backend and frontend servers and open `http://localhost:8000`!
