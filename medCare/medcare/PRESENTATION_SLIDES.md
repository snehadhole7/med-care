---
marp: true
paginate: true
theme: default
class: lead
---

# MedCare — Smart Healthcare Management System

- Team / Author: Your Name
- Date: January 2026
- Purpose: Educational project showcasing a full-stack healthcare web app

Notes:
Use the latest date and your name. Replace with institute/company logo on this slide if desired.

---

# Agenda

- Overview & Objectives
- Architecture & Tech Stack
- Core Features (Auth, Disease Check, Appointments, Analytics)
- Database & API Design
- New: Diet Plan Personalization
- Security & Best Practices
- Setup, Demo Flow, and Testing
- Future Work & Q&A

Notes:
High-level roadmap of talk.

---

# Problem & Objectives

- Challenge: Provide an educational healthcare web app to explore full-stack concepts
- Objectives:
  - Symptom-based disease recognition
  - Medicine & diet suggestions, precautions
  - Appointments & health records
  - Role-based access (user/admin) and analytics

Notes:
Emphasize educational purpose and non-medical-disclaimer.

---

# System Overview

- Frontend: Static HTML/CSS/JS, Bootstrap 5
- Backend: Node.js + Express
- Database: MongoDB (local/Atlas). Falls back to mock data when DB is unavailable
- Served together by Express on http://localhost:5000

Notes:
The backend serves static frontend files and APIs.

---

# High-Level Architecture

```
[Browser]
   |
   v
[Frontend (HTML/CSS/JS, Bootstrap)]
   |
   v
[Express API (Node.js)] ----> [MongoDB]
        |                         ^
        |                         |
        +--> Fallback to Mock Data when DB not reachable
```

Notes:
Simple monolithic server with optional DB connectivity.

---

# Tech Stack

- Frontend: HTML5, CSS3, Bootstrap 5, Chart.js
- Backend: Node.js, Express, JWT, bcryptjs, CORS, dotenv
- DB: MongoDB / Mongoose (optional)
- Tooling: nodemon for dev, npm scripts

Notes:
List versions where relevant (see package.json).

---

# Core Features

- Authentication & Role-based access (user/admin)
- Disease Checker by symptoms (ranking + match %)
- Medicine guide, diet recommendations, precautions
- Appointments & health history
- Admin dashboard & analytics

Notes:
Each will have a dedicated slide.

---

# UI Highlights (Screens)

- Home (index.html)
- Login / Register
- Dashboard (overview, quick actions)
- Disease Check (dashboard + standalone page)
- Diet Plan (personalized)

[Add screenshots here]

Notes:
Capture real screenshots from your local app.

---

# Authentication & Authorization

- JWT-based auth (access token)
- bcryptjs password hashing
- Role-based routes (user vs admin)
- Middleware for protected endpoints

Notes:
Mention token storage and expiration (JWT_EXPIRE in .env).

---

# Database Model (MongoDB)

- User: name, email, password, role, age, gender, phone, healthHistory, appointments
- Disease: name, description, symptoms[], medicines[], diet, precautions[], severity, category
- Appointment: userId, diseaseId, appointmentDate, type, symptoms[], notes, status, report

Notes:
Show a sample document if needed.

---

# API Overview (Selected)

- Auth: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me
- Users: GET/PUT /api/users/profile, GET/POST /api/users/appointments, GET/POST /api/users/health-history
- Diseases: GET /api/diseases/all, GET /api/diseases/search?query=..., POST /api/diseases/check
- Admin: CRUD for diseases, list users, appointments, analytics

Notes:
Mention public vs protected routes.

---

# Disease Checker Flow

1) User selects symptoms (smart dropdown + common symptoms)
2) Frontend POSTs to /api/diseases/check
3) Backend tries MongoDB; on failure, falls back to mock data
4) Response ranked by match percentage; details include medicines, diet, precautions

Notes:
See controller: diseaseController.js.

---

# New: Diet Plan Personalization

- From disease results, user clicks "Use for Diet Plan"
- Selection saved to localStorage
- Diet Plan section renders:
  - Daily meals based on foodsToEat (if provided)
  - Foods to Avoid
  - Precautions
  - Diet Notes (if diet is a string in backend data)

Notes:
Implemented in frontend/js/common.js and dashboard.html; standalone page supports saving too.

---

# Analytics (User & System)

- Stats: appointments count, history, profile status
- Charts via Chart.js (placeholders; extend as needed)
- Admin analytics endpoint for trends (users, diseases, appointments)

Notes:
Demo chart is on dashboard; expand with real data.

---

# Security Practices

- Password hashing (bcryptjs)
- JWT auth & role checks
- CORS configured
- .env for secrets (JWT_SECRET, MONGODB_URI)

Notes:
Reiterate educational disclaimer—do not use in production as-is.

---

# Setup & Run

Prerequisites:
- Node.js (v14+), MongoDB (local or Atlas), npm

Steps:
- cd backend
- npm install
- npm run dev (or npm start)
- Visit http://localhost:5000 (API health at /api/health)

Notes:
Update API_BASE_URL in frontend/js/common.js if needed.

---

# Demo Flow (Suggested)

1) Register & Login
2) Dashboard quick actions
3) Disease Check → select symptoms → view results
4) Click "Use for Diet Plan" → open Diet Plan
5) Book an appointment
6) Show admin features (if applicable)

Notes:
Prepare a few typical symptom sets.

---

# Sample Data

- mockData.js for diseases (with diet as string or objects)
- mockUsers.js (in-memory accounts when DB is off)
- mockAppointments.js

Notes:
Explain fallback logs and behavior.

---

# Error Handling & Fallbacks

- DB connection errors logged; app continues with mock data
- Controllers wrap logic with try/catch and user-friendly messages
- Health check endpoint /api/health

Notes:
Show example server logs.

---

# Testing Strategy

- Manual flows (auth, disease check, diet plan, appointments)
- API testing via Postman/Thunder Client
- Future: unit tests for controllers & route handlers

Notes:
List basic happy-path and error-path tests.

---

# Performance & Scalability (Future)

- Cache frequently accessed disease data
- Paginate lists (users, diseases, appointments)
- Split static hosting and API server

Notes:
Discuss trade-offs for an educational app.

---

# Future Enhancements

- AI/ML for better disease prediction
- Telemedicine (video), chat with doctors
- Multi-language, mobile app, wearables integration
- AI-generated diet plans via external LLM API

Notes:
Tie back to project objectives.

---

# Limitations & Disclaimer

- Not for real medical diagnosis
- Mock data, minimal validations
- No production-grade logging/monitoring

Notes:
State clearly to audience.

---

# Project Structure

```
medcare/
  backend/
    models/, controllers/, routes/, server.js, .env, package.json
  frontend/
    index.html, pages/, css/, js/common.js
  *.md docs (README, QUICK_START, etc.)
```

Notes:
Point to key files for reviewers.

---

# Q&A

Thank you!

- Repo/Folder: medCare/medcare
- Dev server: http://localhost:5000

Notes:
Provide contact info if desired.
