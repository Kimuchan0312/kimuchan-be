const express = require("express");
const router = express.Router();

const userActivityController = require("../controllers/userActivity.controller");
const { authentication } = require("../middlewares");

// Create a new user activity
router.post('/', authentication.authenticateUser, userActivityController.createUserActivity);

// Get all user activities
router.get('/', authentication.authenticateUser, userActivityController.getAllUserActivities);

// Get a single user activity by ID
router.get('/:id', authentication.authenticateUser, userActivityController.getUserActivityById);

// Update a user activity by ID
router.put('/:id', authentication.authenticateUser, userActivityController.updateUserActivityById);

// Delete a user activity by ID
router.delete('/:id', authentication.authenticateUser, userActivityController.deleteUserActivityById);

module.exports = router;
