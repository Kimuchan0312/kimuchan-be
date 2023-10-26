const express = require("express");
const router = express.Router();

const testResultController = require("../controllers/testResult.controller");
const { authentication } = require("../middlewares");

// Create a new test result
router.post('/', authentication.authenticateUser, testResultController.createTestResult);

// Get all test results
router.get('/', authentication.authenticateUser, testResultController.getAllTestResults);

// Get a single test result by ID
router.get('/:id', authentication.authenticateUser, testResultController.getTestResultById);

// Update a test result by ID
router.put('/:id', authentication.authenticateUser, testResultController.updateTestResultById);

// Delete a test result by ID
router.delete('/:id', authentication.authenticateUser, testResultController.deleteTestResultById);

module.exports = router;
