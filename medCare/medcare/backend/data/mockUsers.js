// Mock user data for when MongoDB is not available
// This is a mutable array that stores users in memory
const mockUsers = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@medicare.com',
    password: '$2a$10$YIjlrJlh8.5q5h5q5h5q5eFq5q5q5q5q5q5q5q5q', // hashed 'admin123'
    role: 'admin',
    createdAt: new Date(),
    healthHistory: []
  },
  {
    _id: '2',
    name: 'Test User',
    email: 'test@medicare.com',
    password: '$2a$10$q5q5q5q5q5q5q5q5q5q5eFq5q5q5q5q5q5q5q5q5', // hashed 'test123'
    role: 'user',
    createdAt: new Date(),
    healthHistory: []
  }
];

module.exports = mockUsers;
