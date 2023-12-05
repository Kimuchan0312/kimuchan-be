const express = require("express");
const router = express.Router();

const testController = require("../controllers/test.controller");
const { authentication } = require("../middlewares");

// Create a new test
router.post('/', testController.createTest);

// Get all tests
router.get('/', testController.getAllTests);

// Get a single test by ID
router.get('/:id', testController.getTestById);

// Update a test by ID
router.put('/:id', authentication.authenticateUserAndAdmin, testController.updateTestById);

// Delete a test by ID
router.delete('/:id', authentication.authenticateUserAndAdmin, testController.deleteTestById);

// Get tests by Jlpt Level
router.get('/filterByJlptLevel', testController.getTestsByJlptLevel);

module.exports = router;
