import express from 'express';
// Correct import statement for named exports
import { createCategory, getAllCategories, deleteCategory, updateCategory, getCategoryById, searchCategoriesByName } from '../controllers/categoryController.js';

const router = express.Router();

// Route for searching categories by name
router.get('/search', searchCategoriesByName);

// Create a new category
router.post('/', createCategory);

// Retrieve all categories
router.get('/', getAllCategories);

// Retrieve a single category by ID
router.get('/:id', getCategoryById);

// Update a category
router.put('/:id', updateCategory);

// Delete a category
router.delete('/:id', deleteCategory);

export default router;
