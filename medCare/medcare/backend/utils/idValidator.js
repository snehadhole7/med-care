const mongoose = require('mongoose');

/**
 * Check if a value is a valid MongoDB ObjectId
 */
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Safely find a user by ID - works with both ObjectId and string IDs
 */
const safeUserFind = async (id, User, mockUsers) => {
  try {
    if (isValidObjectId(id)) {
      // Try MongoDB first if it's a valid ObjectId
      try {
        return await User.findById(id);
      } catch (err) {
        // Fall back to mock data
        console.log('MongoDB findById failed, using mock data');
      }
    }
    // Fall back to mock data for string IDs
    return mockUsers.find(u => u._id === id || u._id.toString() === id);
  } catch (error) {
    console.log('Error in safeUserFind:', error.message);
    return null;
  }
};

module.exports = { isValidObjectId, safeUserFind };
