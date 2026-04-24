const User = require('../models/User');
const Appointment = require('../models/Appointment');
const mockUsers = require('../data/mockUsers');
const mockAppointments = require('../data/mockAppointments');
const mockData = require('../data/mockData');
const { isValidObjectId } = require('../utils/idValidator');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    let user = null;
    const userId = req.user.id;

    console.log('Getting profile for user:', userId);

    // Check if it's a mock user (string ID)
    if (!isValidObjectId(userId)) {
      user = mockUsers.find(u => u._id === userId || u._id.toString() === userId);
      if (!user) {
        console.log('User not found in mock data. Available users:', mockUsers.map(u => u._id));
        return res.status(404).json({ message: 'User not found' });
      }
      if (!user.appointments) {
        user.appointments = [];
      }
      return res.status(200).json(user);
    }

    try {
      // Try MongoDB for valid ObjectIds
      user = await User.findById(userId).populate('appointments');
    } catch (dbError) {
      // Fall back to mock data
      console.log('Using mock data for profile');
      user = mockUsers.find(u => u._id === userId || u._id.toString() === userId);
      if (user && !user.appointments) {
        user.appointments = [];
      }
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, age, gender, phone } = req.body;
    const userId = req.user.id;
    let user = null;

    // Check if it's a mock user (string ID)
    if (!isValidObjectId(userId)) {
      user = mockUsers.find(u => u._id === userId);
      if (user) {
        user.name = name || user.name;
        user.age = age || user.age;
        user.gender = gender || user.gender;
        user.phone = phone || user.phone;
      }
      return res.status(200).json({ message: 'Profile updated', user });
    }

    try {
      // Try MongoDB for valid ObjectIds
      user = await User.findByIdAndUpdate(
        userId,
        { name, age, gender, phone },
        { new: true, runValidators: true }
      );
    } catch (dbError) {
      // Fall back to mock data
      console.log('Using mock data to update profile');
      user = mockUsers.find(u => u._id === userId);
      if (user) {
        user.name = name || user.name;
        user.age = age || user.age;
        user.gender = gender || user.gender;
        user.phone = phone || user.phone;
      }
    }

    res.status(200).json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user appointments
exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    let appointments = [];

    // Check if it's a mock user (string ID)
    if (!isValidObjectId(userId)) {
      appointments = mockAppointments.filter(a => a.userId === userId || a.userId.toString() === userId).map(apt => {
        const disease = mockData.find(d => d._id.toString() === apt.diseaseId);
        return {
          ...apt,
          diseaseId: disease || null
        };
      });
      return res.status(200).json(appointments);
    }

    try {
      // Try MongoDB for valid ObjectIds
      appointments = await Appointment.find({ userId }).populate('diseaseId');
    } catch (dbError) {
      // Fall back to mock data
      console.log('Using mock data for appointments');
      appointments = mockAppointments.filter(a => a.userId === userId).map(apt => {
        const disease = mockData.find(d => d._id.toString() === apt.diseaseId);
        return {
          ...apt,
          diseaseId: disease || null
        };
      });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Book appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { appointmentDate, appointmentType, diseaseId, symptoms, notes } = req.body;
    const userId = req.user.id;
    let appointment = null;

    // Check if it's a mock user (string ID)
    if (!isValidObjectId(userId)) {
      appointment = {
        _id: Date.now().toString(),
        userId,
        diseaseId,
        appointmentDate: new Date(appointmentDate),
        appointmentType,
        symptoms: symptoms || [],
        notes: notes || '',
        status: 'scheduled',
        report: null,
        createdAt: new Date()
      };
      mockAppointments.push(appointment);
      return res.status(201).json({ message: 'Appointment booked', appointment });
    }

    try {
      // Try MongoDB for valid ObjectIds
      appointment = new Appointment({
        userId,
        diseaseId,
        appointmentDate,
        appointmentType,
        symptoms,
        notes
      });
      await appointment.save();
    } catch (dbError) {
      // Fall back to mock data
      console.log('Using mock data to book appointment');
      appointment = {
        _id: Date.now().toString(),
        userId,
        diseaseId,
        appointmentDate: new Date(appointmentDate),
        appointmentType,
        symptoms: symptoms || [],
        notes: notes || '',
        status: 'scheduled',
        report: null,
        createdAt: new Date()
      };
      mockAppointments.push(appointment);
    }

    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get health history
exports.getHealthHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    let healthHistory = [];

    // Check if it's a mock user (string ID)
    if (!isValidObjectId(userId)) {
      const user = mockUsers.find(u => u._id === userId || u._id.toString() === userId);
      healthHistory = user && user.healthHistory ? user.healthHistory : [];
      return res.status(200).json(healthHistory);
    }

    try {
      // Try MongoDB for valid ObjectIds
      const user = await User.findById(userId);
      healthHistory = user ? user.healthHistory : [];
    } catch (dbError) {
      // Fall back to mock data
      console.log('Using mock data for health history');
      const user = mockUsers.find(u => u._id === userId || u._id.toString() === userId);
      healthHistory = user && user.healthHistory ? user.healthHistory : [];
    }

    res.status(200).json(healthHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add to health history
exports.addToHealthHistory = async (req, res) => {
  try {
    const { disease, status } = req.body;
    const userId = req.user.id;

    // Check if it's a mock user (string ID)
    if (!isValidObjectId(userId)) {
      const user = mockUsers.find(u => u._id === userId || u._id.toString() === userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!user.healthHistory) {
        user.healthHistory = [];
      }

      user.healthHistory.push({
        disease,
        dateIdentified: new Date(),
        status
      });

      return res.status(201).json({ message: 'Added to health history', healthHistory: user.healthHistory });
    }

    try {
      // Try MongoDB for valid ObjectIds
      const user = await User.findById(userId);
      
      user.healthHistory.push({
        disease,
        dateIdentified: new Date(),
        status
      });

      await user.save();
      res.status(201).json({ message: 'Added to health history', healthHistory: user.healthHistory });
    } catch (dbError) {
      // Fall back to mock data
      console.log('Using mock data to add to health history');
      const user = mockUsers.find(u => u._id === userId || u._id.toString() === userId);
      
      if (user) {
        if (!user.healthHistory) {
          user.healthHistory = [];
        }
        user.healthHistory.push({
          disease,
          dateIdentified: new Date(),
          status
        });
        res.status(201).json({ message: 'Added to health history', healthHistory: user.healthHistory });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
