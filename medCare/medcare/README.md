# MedCare - Smart Healthcare Management System

## 📋 Overview

MedCare is a comprehensive web-based healthcare management system designed for educational purposes. It enables users to identify potential diseases based on symptoms, receive medicine suggestions, access diet plans, and manage their healthcare records through an intuitive interface.

**⚠️ Disclaimer:** This system is for educational purposes only and does not replace professional medical advice.

## 🎯 Project Objectives

1. **Symptom-Based Disease Recognition** - Help users identify possible diseases
2. **Treatment Guidance** - Provide medicine, diet, and precaution recommendations
3. **Appointment Management** - Schedule and track medical appointments
4. **Health Analytics** - Monitor disease trends and user statistics
5. **Secure Access** - Role-based authentication and authorization

## 🏗️ System Architecture

### Frontend
- **HTML5, CSS3, JavaScript**
- **Bootstrap 5** - Responsive UI framework
- **Chart.js** - Data visualization
- **RESTful API** - Communication with backend

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication and authorization
- **bcryptjs** - Password encryption

### Database Schema

#### User Collection
```
{
  name, email, password, role (user/admin),
  age, gender, phone,
  healthHistory: [{disease, dateIdentified, status}],
  appointments: [ObjectId],
  createdAt
}
```

#### Disease Collection
```
{
  name, description,
  symptoms: [String],
  medicines: [{name, dosage, duration, sideEffects}],
  diet: {foodsToEat, foodsToAvoid, otherGuidance},
  precautions: [String],
  severity (mild/moderate/severe),
  category (infectious/chronic/genetic/metabolic/mental/other),
  doctorConsultation: Boolean,
  createdAt, updatedAt
}
```

#### Appointment Collection
```
{
  userId: ObjectId,
  diseaseId: ObjectId,
  appointmentDate, appointmentType (checkup/followup/consultation),
  symptoms: [String],
  notes,
  status (scheduled/completed/cancelled),
  report: {diagnosis, prescription, notes},
  createdAt
}
```

## 🔑 Key Features

### 1. Authentication Module
- **Signup & Login** - User registration with email validation
- **JWT Tokens** - Secure session management
- **Role-Based Access** - Separate user and admin interfaces

### 2. User Module
- **Profile Management** - Update personal health information
- **Disease Checker** - Identify diseases based on symptoms
- **Appointment Booking** - Schedule medical consultations
- **Health History** - Track past diagnoses and treatments

### 3. Disease Recognition Module
- **Symptom Matching** - Intelligent symptom-to-disease matching
- **Disease Details** - Complete information about identified diseases
- **Medicine Guide** - Specific medicines with dosages
- **Diet Recommendations** - Foods to eat and avoid

### 4. Admin Module
- **User Management** - View and manage all users
- **Disease Database** - Add/update/delete diseases
- **Appointment Management** - Monitor and update appointments
- **Analytics Dashboard** - View health trends and statistics

### 5. Analytics Module
- **Disease Trends** - Most common diseases by appointment count
- **User Growth** - Track new user registrations over time
- **Appointment Statistics** - Completed vs. scheduled appointments
- **Charts & Reports** - Visual data representation

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medicare
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start the server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Open frontend files in a web server (not file://)
2. Update `API_BASE_URL` in `js/common.js` if backend URL differs
3. Access via `http://localhost:8000` (or your server port)

### MongoDB Setup

Option 1: Local MongoDB
```bash
mongod
```

Option 2: MongoDB Atlas (Cloud)
- Create account at https://www.mongodb.com/cloud/atlas
- Get connection string
- Update MONGODB_URI in .env

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### User Routes (Protected)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/appointments` - Get user appointments
- `POST /api/users/appointments` - Book appointment
- `GET /api/users/health-history` - Get health history
- `POST /api/users/health-history` - Add to health history

### Disease Routes
- `GET /api/diseases/all` - Get all diseases
- `GET /api/diseases/search?query=...` - Search diseases
- `POST /api/diseases/check` - Check disease by symptoms (protected)
- `GET /api/diseases/:diseaseId` - Get disease details (protected)

### Admin Routes (Protected, Admin only)
- `GET /api/admin/users` - List all users
- `GET /api/admin/users/:userId` - Get user details
- `POST /api/admin/diseases` - Create disease
- `PUT /api/admin/diseases/:diseaseId` - Update disease
- `DELETE /api/admin/diseases/:diseaseId` - Delete disease
- `GET /api/admin/appointments` - List all appointments
- `PUT /api/admin/appointments/:appointmentId` - Update appointment
- `GET /api/admin/analytics` - Get analytics data

## 🎯 User Workflows

### Patient/User Workflow
1. **Register** - Create account with email/password
2. **Login** - Authenticate and access dashboard
3. **Check Symptoms** - Enter symptoms to identify diseases
4. **View Details** - Get comprehensive disease information
5. **Book Appointment** - Schedule consultation
6. **Track History** - Monitor health records

### Admin Workflow
1. **Login** - Admin authentication
2. **Add Diseases** - Input disease information
3. **Manage Users** - View user data and profiles
4. **Review Appointments** - Monitor and update appointment status
5. **View Analytics** - Track system usage and trends

## 📊 Sample Disease Data

To populate the database, you can add sample diseases:

```json
{
  "name": "Influenza",
  "description": "Seasonal flu caused by influenza virus",
  "symptoms": ["fever", "cough", "fatigue", "sore throat"],
  "severity": "moderate",
  "category": "infectious",
  "medicines": [
    {
      "name": "Oseltamivir",
      "dosage": "75mg twice daily",
      "duration": "5 days",
      "sideEffects": "Nausea, headache"
    }
  ],
  "diet": {
    "foodsToEat": ["hot soup", "honey", "ginger tea", "fruits"],
    "foodsToAvoid": ["spicy food", "cold items"]
  },
  "precautions": [
    "Rest for 7-10 days",
    "Stay hydrated",
    "Use humidifier"
  ]
}
```

## 🔐 Security Features

1. **Password Hashing** - bcryptjs encryption
2. **JWT Authentication** - Secure token-based auth
3. **Authorization** - Role-based access control
4. **CORS** - Cross-origin request handling
5. **Environment Variables** - Sensitive data protection

## 🎨 Frontend Pages

- **index.html** - Home page with feature overview
- **pages/login.html** - User login
- **pages/register.html** - User registration
- **pages/disease-check.html** - Symptom checker
- **pages/dashboard.html** - User dashboard
- **pages/admin-dashboard.html** - Admin panel

## 🚀 Future Enhancements

1. **AI/ML Integration** - Advanced disease prediction
2. **Doctor Consultation** - Real-time chat with doctors
3. **Prescription Upload** - Digital prescription management
4. **Mobile App** - React Native/Flutter version
5. **Multi-Language** - Support for multiple languages
6. **Telemedicine** - Video consultation feature
7. **Wearable Integration** - Health device data sync
8. **Advanced Analytics** - ML-based health insights

## 📁 Project Structure

```
medicare/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Disease.js
│   │   └── Appointment.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── diseaseController.js
│   │   └── adminController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── diseaseRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── common.js
    ├── pages/
    │   ├── login.html
    │   ├── register.html
    │   ├── disease-check.html
    │   ├── dashboard.html
    │   └── admin-dashboard.html
    └── index.html
```

## 🧪 Testing the System

### Test User Accounts
```
Admin Account:
- Email: admin@medcare.com
- Password: admin123

Patient Account:
- Email: user@medcare.com
- Password: user123
```

### Sample Symptoms to Test
- "fever, cough, fatigue" → Influenza
- "chest pain, shortness of breath" → Cardiovascular issues
- "high blood pressure, fatigue" → Hypertension

## 📞 Support & Contact

For issues or questions about the MedCare system, please refer to the documentation or contact the development team.

## 📄 License

MIT License - Free to use for educational purposes.

## ⚠️ Important Disclaimer

MedCare is an **educational project** and should not be used for actual medical diagnosis or treatment. Always consult with qualified healthcare professionals for medical advice. The disease information provided is for educational purposes only.

---

**Last Updated:** January 2026
**Version:** 1.0.0
