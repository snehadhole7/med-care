const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getUserAppointments,
  bookAppointment,
  getHealthHistory,
  addToHealthHistory
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.get('/appointments', getUserAppointments);
router.post('/appointments', bookAppointment);
router.get('/health-history', getHealthHistory);
router.post('/health-history', addToHealthHistory);

module.exports = router;
