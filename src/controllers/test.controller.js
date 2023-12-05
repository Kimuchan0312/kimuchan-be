const Test = require('../models/Test');
const ReadingLesson = require('../models/ReadingLesson');

// Create a new test
const createTest = async (req, res) => {
  try {
    const test = new Test(req.body);
    await test.save();
    return res.status(201).json(test);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to create test', details: error.message });
  }
};

// Get all tests
const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().populate('lessons.readingLesson');
    return res.status(200).json(tests);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch tests', details: error.message });
  }
};

// Get a test by ID
const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate('lessons.readingLesson');
    if (!test) return res.status(404).json({ error: 'Test not found' });
    return res.status(200).json(test);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch test', details: error.message });
  }
};

// Update a test by ID
const updateTestById = async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!test) return res.status(404).json({ error: 'Test not found' });
    return res.status(200).json(test);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to update test', details: error.message });
  }
};

// Delete a test by ID
const deleteTestById = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) return res.status(404).json({ error: 'Test not found' });
    return res.status(200).json(test);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete test', details: error.message });
  }
};

const getTestsByJlptLevel = async (req, res) => {
  try {
    const jlptLevel = req.query.jlptLevel;
  
    if (jlptLevel) {
      // Find ReadingLessons with the specified jlptLevel
      const lessons = await ReadingLesson.find({ jlptLevel });
      const lessonIds = lessons.map(lesson => lesson._id);
  
      // Find Tests that include these ReadingLessons
      const tests = await Test.find({
        'lessons.readingLesson': { $in: lessonIds }
      }).populate('lessons.readingLesson');
  
      res.json(tests);
    } else {
      // Handle the case where jlptLevel is not provided
      res.status(400).json({ error: 'No jlptLevel specified' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch tests', details: error.message });
  }
};


module.exports = {
  createTest,
  getAllTests,
  getTestById,
  updateTestById,
  deleteTestById,
  getTestsByJlptLevel
};