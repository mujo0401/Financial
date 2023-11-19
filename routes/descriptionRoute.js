import express from 'express';
import { createDescription, getAllDescriptions, deleteDescription, updateDescription, getDescriptionById, searchDescriptionsByName } from '../controllers/descriptionController.js';

const router = express.Router();

// Route for searching categories by name
router.get('/search', searchDescriptionsByName);

// Create a new description
router.post('/', createDescription);

// Retrieve all descriptions
router.get('/', getAllDescriptions);

// Retrieve a single description by ID
router.get('/:id', getDescriptionById);

// Update a description
router.put('/:id', updateDescription);

// Delete a description
router.delete('/:id', deleteDescription);

export default router;
