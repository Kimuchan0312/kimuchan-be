const ReadingLesson = require("../models/ReadingLesson");

// Create a new lesson
const createReadingLesson = async (req, res) => {
  try {
    const lesson = new ReadingLesson(req.body);
    await lesson.save();
    return res.status(201).json(lesson);
  } catch (error) {
    return res.status(400).json({ error: "Failed to create lesson", details: error.message });
  }
};

// Get all single readings
const getAllReadingLessons = async (req, res) => {
  try {
    const lessons = await ReadingLesson.find();
    return res.status(200).json(lessons);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch lessons", details: error.message });
  }
};

// Get a Single Lesson by ID
const getReadingLessonById = async (req, res) => {
  try {
    const lesson = await ReadingLesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    return res.status(200).json(lesson);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch lesson", details: error.message });
  }
};

// Update a lesson by ID
const updateLessonById = async (req, res) => {
  try {
    const lesson = await ReadingLesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    return res.status(200).json(lesson);
  } catch (error) {
    return res.status(400).json({ error: "Failed to update lesson", details: error.message });
  }
};

// Delete a lesson by ID
const deleteLessonById = async (req, res) => {
  try {
    const lesson = await ReadingLesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    return res.status(200).json(lesson);
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete lesson", details: error.message });
  }
};

module.exports = {
  createReadingLesson,
  getAllReadingLessons,
  getReadingLessonById,
  updateLessonById,
  deleteLessonById,
};
