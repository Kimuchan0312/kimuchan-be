const TestResult = require('../models/TestResult');

// Create a new test result
const createTestResult = async (req, res) => {
  try {
    const testResult = new TestResult(req.body);
    await testResult.save();
    return res.status(201).json(testResult);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to create test result', details: error.message });
  }
};

// Get all test results
const getAllTestResults = async (req, res) => {
  try {
    const testResults = await TestResult.find()
      .populate('user')
      .populate('test')
      .populate('lessonResults');
    return res.status(200).json(testResults);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch test results', details: error.message });
  }
};

// Get a test result by ID
const getTestResultById = async (req, res) => {
  try {
    const testResult = await TestResult.findById(req.params.id)
      .populate('user')
      .populate('test')
      .populate('lessonResults');
    if (!testResult) return res.status(404).json({ error: 'Test result not found' });
    return res.status(200).json(testResult);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch test result', details: error.message });
  }
};

// Update a test result by ID
const updateTestResultById = async (req, res) => {
  try {
    const testResult = await TestResult.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!testResult) return res.status(404).json({ error: 'Test result not found' });
    return res.status(200).json(testResult);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to update test result', details: error.message });
  }
};

// Delete a test result by ID
const deleteTestResultById = async (req, res) => {
  try {
    const testResult = await TestResult.findByIdAndDelete(req.params.id);
    if (!testResult) return res.status(404).json({ error: 'Test result not found' });
    return res.status(200).json(testResult);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete test result', details: error.message });
  }
};

module.exports = {
  createTestResult,
  getAllTestResults,
  getTestResultById,
  updateTestResultById,
  deleteTestResultById,
};