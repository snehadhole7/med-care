const express = require('express');
const router = express.Router();
const {
  checkDiseaseBySymptoms,
  getDiseaseDetails,
  getAllDiseases,
  searchDiseases,
  getAllSymptoms
} = require('../controllers/diseaseController');
const { protect } = require('../middleware/auth');

// Public routes (no authentication required)
router.get('/all', getAllDiseases);
router.get('/symptoms/all', getAllSymptoms);
router.get('/search', searchDiseases);
router.post('/check', checkDiseaseBySymptoms);
router.get('/:diseaseId', getDiseaseDetails);

module.exports = router;
