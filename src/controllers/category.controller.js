// categoryController.js
const Category = require('../models/Category');

// Create a new category
const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create category', details: error.message });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch categories', details: error.message });
  }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch category', details: error.message });
  }
};

// Update a category by ID
const updateCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update category', details: error.message });
  }
};

// Delete a category by ID
const deleteCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.status(204).send(); // No content
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete category', details: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
