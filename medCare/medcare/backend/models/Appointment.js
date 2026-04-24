const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  diseaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disease'
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentType: {
    type: String,
    enum: ['checkup', 'followup', 'consultation'],
    default: 'checkup'
  },
  symptoms: [String],
  notes: String,
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  report: {
    diagnosis: String,
    prescription: String,
    notes: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
