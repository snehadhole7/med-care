const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mockUsers = require('../data/mockUsers');

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    let existingUser = null;

    try {
      // Try MongoDB first
      existingUser = await User.findOne({ email });
    } catch (dbError) {
      // Fall back to mock data
      console.log('Using mock data for user check');
      existingUser = mockUsers.find(u => u.email === email);
    }

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let savedUser = null;

    try {
      // Try to save to MongoDB
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: role || 'user'
      });

      savedUser = await user.save();
    } catch (dbError) {
      // Fall back to mock data
      console.log('Using mock data for user registration');
      savedUser = {
        _id: Date.now().toString(),
        name,
        email,
        password: hashedPassword,
        role: role || 'user',
        createdAt: new Date()
      };
      mockUsers.push(savedUser);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email, role: savedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    let user = null;

    try {
      // Try MongoDB first
      user = await User.findOne({ email }).select('+password');
    } catch (dbError) {
      // Fall back to mock data
      console.log('Using mock data for login');
      user = mockUsers.find(u => u.email === email);
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Login failed' });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    let user = null;

    try {
      // Try MongoDB first
      user = await User.findById(req.user.id);
    } catch (dbError) {
      // Fall back to mock data
      user = mockUsers.find(u => u._id === req.user.id);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch user' });
  }
};

// Check if email already exists
exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide email' });
    }

    let existingUser = null;

    try {
      // Try MongoDB first
      existingUser = await User.findOne({ email });
    } catch (dbError) {
      // Fall back to mock data
      existingUser = mockUsers.find(u => u.email === email);
    }

    res.status(200).json({
      exists: !!existingUser,
      message: existingUser ? 'Email already registered' : 'Email is available'
    });
  } catch (error) {
    console.error('Check email error:', error);
    res.status(500).json({ message: error.message || 'Failed to check email' });
  }
};
