const Result = require('../models/SingleReadingResult');

// Create a new result
const createResult = async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to create result', details: error.message });
  }
};

// Get all results
const getAllResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate('user')
      .populate('readingLesson');
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch results', details: error.message });
  }
};

// Get a result by ID
const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate('user')
      .populate('readingLesson');
    if (!result) return res.status(404).json({ error: 'Result not found' });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch result', details: error.message });
  }
};

// Update a result by ID
const updateResultById = async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!result) return res.status(404).json({ error: 'Result not found' });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to update result', details: error.message });
  }
};

// Delete a result by ID
const deleteResultById = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Result not found' });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete result', details: error.message });
  }
};

module.exports = {
  createResult,
  getAllResults,
  getResultById,
  updateResultById,
  deleteResultById,
};