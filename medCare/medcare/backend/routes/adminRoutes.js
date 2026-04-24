const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createDisease,
  updateDisease,
  deleteDisease,
  getAllAppointments,
  updateAppointmentStatus,
  getAnalytics
} = require('../controllers/adminController');
const { protect, authorizeAdmin } = require('../middleware/auth');

// All routes require authentication and admin role
router.use(protect);
router.use(authorizeAdmin);

// User management
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);

// Disease management
router.post('/diseases', createDisease);
router.put('/diseases/:diseaseId', updateDisease);
router.delete('/diseases/:diseaseId', deleteDisease);

// Appointment management
router.get('/appointments', getAllAppointments);
router.put('/appointments/:appointmentId', updateAppointmentStatus);

// Analytics
router.get('/analytics', getAnalytics);

module.exports = router;
