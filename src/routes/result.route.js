const express = require("express");
const router = express.Router();

const readingResultController = require("../controllers/result.controller");
const { authentication } = require("../middlewares");

// Create a new reading result
router.post('/', authentication.authenticateUser, readingResultController.createReadingResult);

// Get all reading results
router.get('/', authentication.authenticateUser, readingResultController.getAllReadingResults);

// Get a single reading result by ID
router.get('/:id', authentication.authenticateUser, readingResultController.getReadingResultById);

// Update a reading result by ID
router.put('/:id', authentication.authenticateUser, readingResultController.updateReadingResultById);

// Delete a reading result by ID
router.delete('/:id', authentication.authenticateUser, readingResultController.deleteReadingResultById);

module.exports = router;