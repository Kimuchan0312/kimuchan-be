const express = require("express");
const router = express.Router();

const readingLessonController = require("../controllers/readingLesson.controller");
const { authentication } = require("../middlewares");

// Create a new reading lesson
router.post('/', authentication.authenticateUserAndAdmin, readingLessonController.createReadingLesson);

// Get all reading lessons
router.get('/', readingLessonController.getAllReadingLessons);

// Get a single reading lesson by ID
router.get('/:id', readingLessonController.getReadingLessonById);

// Update a reading lesson by ID
router.put('/:id', authentication.authenticateUserAndAdmin, readingLessonController.updateLessonById);

// Delete a reading lesson by ID
router.delete('/:id', authentication.authenticateUserAndAdmin, readingLessonController.deleteLessonById);

module.exports = router;
