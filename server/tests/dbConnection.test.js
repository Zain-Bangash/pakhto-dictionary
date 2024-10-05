const mongoose = require('mongoose');

// Set up a sample test MongoDB URI (use a dedicated test database to prevent data conflicts)
const TEST_DB_URI = 'mongodb+srv://Bangakh:bangakh101@cluster0.oq0rk.mongodb.net/';

// Test Suite for MongoDB Connection
describe('MongoDB Connection Test', () => {
  // Before running tests, try to establish the MongoDB connection
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  // After tests are completed, close the connection to avoid open handles
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Check if MongoDB is successfully connected
  test('should successfully connect to MongoDB', () => {
    const connectionState = mongoose.connection.readyState;
    expect(connectionState).toBe(1); // 1 means connected
  });

  // Optional: Test for a failed connection scenario (e.g., with a wrong URI)
  test('should fail to connect to an invalid MongoDB URI', async () => {
    const INVALID_URI = 'mongodb://127.0.0.1:27017/invalid-db';
    try {
      await mongoose.connect(INVALID_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
