const User = require('../models/User');
const Disease = require('../models/Disease');
const Appointment = require('../models/Appointment');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID (admin only)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password').populate('appointments');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create disease
exports.createDisease = async (req, res) => {
  try {
    const { name, description, symptoms, medicines, diet, precautions, severity, category } = req.body;

    const disease = new Disease({
      name,
      description,
      symptoms,
      medicines,
      diet,
      precautions,
      severity,
      category
    });

    await disease.save();
    res.status(201).json({ message: 'Disease created', disease });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update disease
exports.updateDisease = async (req, res) => {
  try {
    const disease = await Disease.findByIdAndUpdate(
      req.params.diseaseId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!disease) {
      return res.status(404).json({ message: 'Disease not found' });
    }

    res.status(200).json({ message: 'Disease updated', disease });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete disease
exports.deleteDisease = async (req, res) => {
  try {
    const disease = await Disease.findByIdAndDelete(req.params.diseaseId);

    if (!disease) {
      return res.status(404).json({ message: 'Disease not found' });
    }

    res.status(200).json({ message: 'Disease deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all appointments (admin only)
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('userId', 'name email phone')
      .populate('diseaseId', 'name');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status, diagnosis, prescription, notes } = req.body;
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.appointmentId,
      {
        status,
        report: {
          diagnosis,
          prescription,
          notes
        }
      },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment updated', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get analytics
exports.getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDiseases = await Disease.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    
    const completedAppointments = await Appointment.countDocuments({ status: 'completed' });
    const scheduledAppointments = await Appointment.countDocuments({ status: 'scheduled' });
    
    const diseaseTrends = await Appointment.aggregate([
      {
        $group: {
          _id: '$diseaseId',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.status(200).json({
      totalUsers,
      totalDiseases,
      totalAppointments,
      completedAppointments,
      scheduledAppointments,
      diseaseTrends,
      userGrowth
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
