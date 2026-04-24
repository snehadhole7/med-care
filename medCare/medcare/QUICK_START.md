# MedCare - Quick Reference Guide

## 🚀 Getting Started (5 Minutes)

### Terminal 1: Start Backend
```bash
cd backend
npm install              # First time only
npm start              # Starts on http://localhost:5000
```

### Terminal 2: Start MongoDB
```bash
mongod                 # Ensure MongoDB is installed
```

### Terminal 3: Start Frontend Server
```bash
# From project root (medicare folder)
cd frontend

# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server

# Option 3: PHP
php -S localhost:8000
```

### Open in Browser
```
http://localhost:8000
```

---

## 📌 Key Features Quick Access

| Feature | URL | Role | Description |
|---------|-----|------|-------------|
| Home | `/` | Public | Project overview |
| Register | `/pages/register.html` | Public | Create account |
| Login | `/pages/login.html` | Public | User login |
| Disease Check | `/pages/disease-check.html` | User | Symptom checker |
| Dashboard | `/pages/dashboard.html` | User | User profile & appointments |
| Admin Panel | `/pages/admin-dashboard.html` | Admin | System management |

---

## 🧪 Test Credentials

### Create Test Admin
```json
POST http://localhost:5000/api/auth/register
{
  "name": "Admin User",
  "email": "admin@medcare.com",
  "password": "admin123",
  "role": "admin"
}
```

### Create Test Patient
```json
POST http://localhost:5000/api/auth/register
{
  "name": "John Doe",
  "email": "john@medcare.com",
  "password": "john123"
}
```

---

## 🔧 Common API Calls

### Check Disease
```bash
curl -X POST http://localhost:5000/api/diseases/check \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"symptoms":["fever","cough","fatigue"]}'
```

### Get User Profile
```bash
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Analytics (Admin)
```bash
curl http://localhost:5000/api/admin/analytics \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Add Disease (Admin)
```bash
curl -X POST http://localhost:5000/api/admin/diseases \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "name": "Flu",
    "description": "Viral infection",
    "symptoms": ["fever","cough"],
    "severity": "moderate",
    "category": "infectious",
    "medicines": [],
    "diet": {"foodsToEat":[],"foodsToAvoid":[]},
    "precautions": []
  }'
```

---

## 📁 Important Files

### Backend
- `server.js` - Main server file
- `models/User.js` - User schema
- `models/Disease.js` - Disease schema
- `models/Appointment.js` - Appointment schema
- `controllers/*` - Business logic
- `routes/*` - API endpoints
- `.env` - Configuration file

### Frontend
- `index.html` - Home page
- `pages/login.html` - Login page
- `pages/register.html` - Registration
- `pages/disease-check.html` - Symptom checker
- `pages/dashboard.html` - User dashboard
- `pages/admin-dashboard.html` - Admin panel
- `css/style.css` - Styling
- `js/common.js` - Shared utilities

---

## ⚙️ Configuration Files

### .env (Backend)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medicare
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### common.js (Frontend API Config)
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

---

## 🔐 Authentication Flow

1. **Register**: POST `/api/auth/register` → Returns JWT token
2. **Login**: POST `/api/auth/login` → Returns JWT token
3. **Use Token**: Add `Authorization: Bearer <token>` to headers
4. **Token Expires**: Refresh by logging in again

---

## 📊 Database Collections

### Users Collection
```
name, email, password, role, age, gender, phone,
healthHistory[], appointments[], createdAt
```

### Diseases Collection
```
name, description, symptoms[], medicines[], diet,
precautions[], severity, category, doctorConsultation, createdAt, updatedAt
```

### Appointments Collection
```
userId, diseaseId, appointmentDate, appointmentType,
symptoms[], notes, status, report, createdAt
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't start | Check if port 5000 is free, MongoDB is running |
| CORS error | Backend CORS is configured, check API_BASE_URL in common.js |
| Database error | Ensure MongoDB is running, check connection string in .env |
| 404 errors | Verify backend is running, check API endpoints |
| Login fails | Check email/password, ensure database has user |
| No diseases appear | Add sample diseases via admin panel or API |

---

## 📈 Sample Test Symptoms

```
✓ "fever, cough, fatigue" → Common Cold / Influenza
✓ "chest pain, shortness of breath" → Cardiovascular issues
✓ "high blood sugar, excessive thirst" → Diabetes
✓ "severe headache, nausea, light sensitivity" → Migraine
✓ "runny nose, sneezing, sore throat" → Common Cold
```

---

## 📱 File Downloads

All files are in: `c:\Users\DELL\OneDrive\Desktop\medicare\`

Download entire folder to get complete project.

---

## 📞 Project Structure Map

```
medicare/
├── backend/                      (Node.js API)
│   ├── models/                  (Database schemas)
│   ├── controllers/             (Business logic)
│   ├── routes/                  (API endpoints)
│   ├── middleware/              (Authentication)
│   ├── config/                  (Database config)
│   ├── server.js               (Main file)
│   ├── package.json            (Dependencies)
│   └── .env                    (Configuration)
│
├── frontend/                     (Web UI)
│   ├── pages/                  (HTML pages)
│   ├── css/                    (Styling)
│   ├── js/                     (JavaScript)
│   └── index.html              (Home page)
│
├── README.md                    (Full documentation)
├── SETUP.md                     (Setup guide)
├── VIVA_QUESTIONS.md           (Interview preparation)
├── SAMPLE_DATA.js              (Test data)
└── This file                   (Quick reference)
```

---

## ✅ Pre-Launch Checklist

- [ ] Node.js installed
- [ ] MongoDB running
- [ ] Backend dependencies installed (`npm install`)
- [ ] `.env` file configured
- [ ] Backend server running (`npm start`)
- [ ] Frontend server running (http-server/php -S)
- [ ] Can access http://localhost:8000
- [ ] Can register new user
- [ ] Can login
- [ ] Disease checker displays results
- [ ] Admin panel accessible with admin account

---

## 🎓 For College Submission

1. **Code**: All in `medicare/` folder
2. **Documentation**: `README.md` - Complete guide
3. **Setup Instructions**: `SETUP.md` - Quick start
4. **Interview Prep**: `VIVA_QUESTIONS.md` - 20 key questions
5. **Sample Data**: `SAMPLE_DATA.js` - Test diseases
6. **This Guide**: For quick reference

---

## 💡 Pro Tips

1. **Import sample diseases** before showing to evaluator
2. **Test with different symptoms** to show disease matching
3. **Demo admin analytics** to show data visualization
4. **Explain JWT flow** - Shows security knowledge
5. **Talk about MongoDB schema design** - Shows database knowledge
6. **Mention future enhancements** - Shows forward thinking
7. **Have database backed up** - For smooth demo

---

## 📞 Support Resources

- **Backend Issues**: Check `server.js` and error logs
- **Frontend Issues**: Check browser console (F12)
- **Database Issues**: Check MongoDB connection in `.env`
- **API Issues**: Test with Postman or curl
- **Authentication**: Verify JWT token in local storage

---

**Last Updated**: January 2026
**Version**: 1.0.0
**Status**: Ready for submission ✅
