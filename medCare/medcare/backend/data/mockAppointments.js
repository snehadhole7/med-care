// Mock appointments data for when MongoDB is unavailable
const mockAppointments = [
  {
    _id: Date.now().toString(),
    userId: '1',
    diseaseId: '5',
    appointmentDate: new Date(Date.now() + 86400000),
    appointmentType: 'checkup',
    symptoms: ['fever', 'cough'],
    notes: 'Regular checkup',
    status: 'scheduled',
    report: null,
    createdAt: new Date()
  }
];

module.exports = mockAppointments;
