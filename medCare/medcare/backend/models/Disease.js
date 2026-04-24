const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  symptoms: [{
    type: String,
    required: true
  }],
  medicines: [{
    name: String,
    dosage: String,
    duration: String,
    sideEffects: String
  }],
  diet: {
    foodsToEat: [String],
    foodsToAvoid: [String],
    otherGuidance: String
  },
  precautions: [String],
  severity: {
    type: String,
    enum: ['mild', 'moderate', 'severe'],
    default: 'mild'
  },
  category: {
    type: String,
    enum: ['infectious', 'chronic', 'genetic', 'metabolic', 'mental', 'other'],
    default: 'other'
  },
  doctorConsultation: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Disease', diseaseSchema);
