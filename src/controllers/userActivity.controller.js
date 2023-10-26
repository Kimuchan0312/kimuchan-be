const UserActivity = require('../models/UserActivity');

// Create a new user activity
const createUserActivity = async (req, res) => {
  try {
    const userActivity = new UserActivity(req.body);
    await userActivity.save();
    return res.status(201).json(userActivity);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to create user activity', details: error.message });
  }
};

// Get all user activities
const getAllUserActivities = async (req, res) => {
  try {
    const userActivities = await UserActivity.find().populate('user');
    return res.status(200).json(userActivities);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user activities', details: error.message });
  }
};

// Get a user activity by ID
const getUserActivityById = async (req, res) => {
  try {
    const userActivity = await UserActivity.findById(req.params.id).populate('user');
    if (!userActivity) return res.status(404).json({ error: 'User activity not found' });
    return res.status(200).json(userActivity);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user activity', details: error.message });
  }
};

// Update a user activity by ID
const updateUserActivityById = async (req, res) => {
  try {
    const userActivity = await UserActivity.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!userActivity) return res.status(404).json({ error: 'User activity not found' });
    return res.status(200).json(userActivity);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to update user activity', details: error.message });
  }
};

// Delete a user activity by ID
const deleteUserActivityById = async (req, res) => {
  try {
    const userActivity = await UserActivity.findByIdAndDelete(req.params.id);
    if (!userActivity) return res.status(404).json({ error: 'User activity not found' });
    return res.status(200).json(userActivity);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete user activity', details: error.message });
  }
};

module.exports = {
  createUserActivity,
  getAllUserActivities,
  getUserActivityById,
  updateUserActivityById,
  deleteUserActivityById,
};