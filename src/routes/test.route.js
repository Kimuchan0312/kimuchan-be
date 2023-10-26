const express = require("express");
const router = express.Router();

const testController = require("../controllers/test.controller");
const { authentication } = require("../middlewares");

// Create a new test
router.post('/', authentication.authenticateUserAndAdmin, testController.createTest);

// Get all tests
router.get('/', authentication.authenticateUserAndAdmin, testController.getAllTests);

// Get a single test by ID
router.get('/:id', authentication.authenticateUserAndAdmin, testController.getTestById);

// Update a test by ID
router.put('/:id', authentication.authenticateUserAndAdmin, testController.updateTestById);

// Delete a test by ID
router.delete('/:id', authentication.authenticateUserAndAdmin, testController.deleteTestById);

module.exports = router;
