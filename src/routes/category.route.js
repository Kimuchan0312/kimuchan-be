const express = require("express");
const router = express.Router();

const categoryController  = require("../controllers/category.controller");
const { authentication } = require("../middlewares");

// Create a new category
router.post('/', authentication.authenticateUserAndAdmin, categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get a single category by ID
router.get('/:id', categoryController.getCategoryById);

// Update a category by ID
router.put('/:id', authentication.authenticateUserAndAdmin, categoryController.updateCategoryById);

// Delete a category by ID
router.delete('/:id', authentication.authenticateUserAndAdmin, categoryController.deleteCategoryById);

module.exports = router;